import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Profile from "@/models/Profile";
import User from "@/models/User";
import Student from "@/models/Student";
import Alumni from "@/models/Alumni";
import { adminAuth } from "@/lib/firebase-admin";
import { toPublicStudent } from "@/lib/studentRecords";

const variants = (value: string) => Array.from(new Set([value, value.replace(/^0+/, "") || "0", Number(value)]));

async function lookupRecord(studentId: string, regNo: string, email: string, preferredRole: string) {
  const models = preferredRole === "alumni"
    ? [{ Model: Alumni, kind: "alumni" as const }, { Model: Student, kind: "student" as const }]
    : [{ Model: Student, kind: "student" as const }, { Model: Alumni, kind: "alumni" as const }];

  if (studentId) {
    for (const { Model, kind } of models) {
      const idFields = ["studentId", "id_no", "student_id"];
      const clauses: Record<string, unknown>[] = [
        { $or: idFields.map((field) => ({ [field]: { $in: variants(studentId) } })) },
      ];
      if (regNo) {
        clauses.push({ $or: ["regNo", "reg_no", "registration_no"].map((field) => ({ [field]: { $in: variants(regNo) } })) });
      }
      const record = await Model.collection.findOne({ $and: clauses });
      if (record) return { record, kind, Model };
    }
  }

  if (!email) return null;
  const escapedEmail = email.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const emailPattern = new RegExp(`^${escapedEmail}$`, "i");
  const matches = (await Promise.all(models.map(async ({ Model, kind }) => ({
    kind,
    Model,
    records: (await Model.collection.find({ email: emailPattern }).limit(2).toArray()).filter((record) =>
      Boolean(record.studentId ?? record.id_no ?? record.student_id) &&
      Boolean(record.regNo ?? record.reg_no ?? record.registration_no)
    ),
  })))).flatMap(({ kind, Model, records }) => records.map((record) => ({ record, kind, Model })));
  return matches.length === 1 ? matches[0] : null;
}

async function getUID(req: NextRequest): Promise<string | null> {
  const token = req.cookies.get("auth_token")?.value;
  if (!token) return null;
  try {
    const decoded = await adminAuth().verifyIdToken(token);
    return decoded.uid;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  try {
    const uid = await getUID(req);
    if (!uid) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    await connectDB();
    let profile = await Profile.findOne({ uid });
    const account = profile || await User.findOne({ uid });
    if (!account) return NextResponse.json({ success: true, data: null });

    const savedRecord = (profile?.studentRecord || {}) as Record<string, any>;
    const studentId = String(savedRecord.id_no || profile?.studentId || "");
    const regNo = String(savedRecord.reg_no || profile?.regNo || "");
    const email = String(profile?.email || account.email || "").trim().toLowerCase();
    const match = await lookupRecord(studentId, regNo, email, profile?.role || account.role || "student");
    if (!match) {
      return NextResponse.json({ success: true, data: profile ? {
        ...savedRecord,
        name: profile.name || savedRecord.name || "",
        email,
        photo: profile.photo || savedRecord.photo || "",
        id_no: savedRecord.id_no || profile.studentId || "",
        reg_no: savedRecord.reg_no || profile.regNo || "",
        status: profile.role === "alumni" ? "alumni" : "current_student",
        batch_no: savedRecord.batch_no ?? profile.batch ?? "",
        batch_session: savedRecord.batch_session || "",
      } : null });
    }

    const matchedRecord = match.record as Record<string, any>;
    const oldUid = String(matchedRecord.uid || "");
    if (oldUid && oldUid !== uid) {
      const oldOwner: { email?: string } | null = await User.findOne({ uid: oldUid }).select("email").lean() as { email?: string } | null;
      if (oldOwner?.email && String(oldOwner.email).trim().toLowerCase() !== email) {
        return NextResponse.json({ success: true, data: null });
      }
    }

    const rawId = matchedRecord.studentId ?? matchedRecord.id_no ?? matchedRecord.student_id ?? studentId;
    const rawRegNo = matchedRecord.regNo ?? matchedRecord.reg_no ?? matchedRecord.registration_no ?? regNo;
    const currentStatus = match.kind === "alumni" ? "alumni" : "current_student";
    const publicRecord: Record<string, any> = {
      ...toPublicStudent({ ...matchedRecord, uid, email: matchedRecord.email || email, role: match.kind }),
      id_no: String(rawId || ""),
      reg_no: String(rawRegNo || ""),
      email,
      status: currentStatus,
    };

    const linkResult = await match.Model.collection.updateOne(
      { _id: matchedRecord._id, uid: matchedRecord.uid ?? { $exists: false } },
      { $set: { uid, isRegistered: true, ...(matchedRecord.email ? {} : { email }) } },
    );
    if (!linkResult.matchedCount) return NextResponse.json({ success: true, data: null });
    if (!profile) profile = new Profile({ uid, email, role: match.kind, name: publicRecord.name, studentId: String(rawId || ""), regNo: String(rawRegNo || "") });
    profile.role = match.kind;
    profile.name = String(publicRecord.name || profile.name || "PSTU User");
    profile.email = email;
    profile.photo = String(publicRecord.photo || profile.photo || "");
    profile.studentId = String(rawId || profile.studentId || "");
    profile.regNo = String(rawRegNo || profile.regNo || "");
    profile.batch = Number(publicRecord.batch_no || profile.batch || 0);
    profile.department = String(publicRecord.department || profile.department || "");
    profile.studentRecord = publicRecord;
    await profile.save();
    await User.updateOne({ uid }, { $set: { role: match.kind, name: profile.name, photo: profile.photo } });

    return NextResponse.json({ success: true, data: {
      ...publicRecord,
      name: profile.name,
      email,
      photo: profile.photo,
      status: currentStatus,
      batch_no: publicRecord.batch_no ?? profile.batch ?? "",
    } });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const uid = await getUID(req);
    if (!uid) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    await connectDB();
    const body = await req.json();
    const allowed = ["name_bn", "gender", "dob", "permanent_address", "phone", "alt_phone", "contact", "linkedin", "present_status", "job_title", "organization", "location", "degree", "current_city", "current_country", "photo", "bio", "status"];
    const update = Object.fromEntries(allowed.filter((key) => typeof body[key] === "string").map((key) => [key, body[key].trim()]));
    if (update.status && !["alumni", "current_student"].includes(update.status)) return NextResponse.json({ success: false, error: "Invalid status" }, { status: 400 });
    const current = await Profile.findOne({ uid });
    if (!current?.studentRecord?.id_no) return NextResponse.json({ success: false, error: "Claim your student record before editing it" }, { status: 409 });
    const record = { ...(current.studentRecord as Record<string, any>), ...update };
    delete record.status;
    record.status = update.status || (current.role === "alumni" ? "alumni" : "current_student");
    const newRole = record.status === "alumni" ? "alumni" : "student";
    const profile = await Profile.findOneAndUpdate(
      { uid },
      { $set: { studentRecord: record, role: newRole, name: record.name, email: record.email, photo: record.photo } },
      { new: true, upsert: true }
    );

    const mapped = {
      uid, name: record.name, batch: Number(record.batch_no || 0), studentId: record.id_no,
      regNo: record.reg_no, session: record.batch_session, nameBn: record.name_bn,
      gender: record.gender, photo: record.photo, photoDriveUrl: record.photo,
      currentPosition: record.job_title, organization: record.organization, location: record.location,
      email: record.email, linkedin: record.linkedin, phone: record.phone, contact: record.contact, altPhone: record.alt_phone,
      dob: record.dob, permanentAddress: record.permanent_address, currentCity: record.current_city,
      currentCountry: record.current_country, presentStatus: record.present_status, degree: record.degree,
      bio: record.bio, department: record.department, isRegistered: true,
    };
    if (newRole === "alumni") {
      await Student.deleteOne({ uid });
      await Alumni.findOneAndUpdate({ uid }, { $set: mapped }, { upsert: true, new: true, setDefaultsOnInsert: true });
    } else {
      await Alumni.deleteOne({ uid });
      await Student.findOneAndUpdate({ uid }, { $set: { ...mapped, address: record.permanent_address } }, { upsert: true, new: true, setDefaultsOnInsert: true });
    }
    await Promise.all([
      User.updateOne({ uid }, { $set: { name: record.name, email: record.email, photo: record.photo, role: newRole } }),
    ]);

    return NextResponse.json({ success: true, data: { ...record, status: record.status, _id: profile._id.toString() } });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
