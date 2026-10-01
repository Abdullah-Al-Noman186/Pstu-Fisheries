import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { verifyUser } from "@/lib/verifyUser";
import Alumni from "@/models/Alumni";
import Student from "@/models/Student";
import Profile from "@/models/Profile";
import User from "@/models/User";

const variants = (value: string) => Array.from(new Set([value, value.replace(/^0+/, "") || "0", Number(value)]));

async function findMongoRecord(Model: any, studentId: string, regNo: string) {
  const direct = await Model.findOne({ studentId, regNo });
  if (direct) return direct;

  // Support records imported directly with the original snake_case JSON keys.
  const raw = await Model.collection.findOne({
    $and: [
      { $or: ["studentId", "id_no", "student_id"].map((key) => ({ [key]: { $in: variants(studentId) } })) },
      { $or: ["regNo", "reg_no", "registration_no"].map((key) => ({ [key]: { $in: variants(regNo) } })) },
    ],
  });
  if (!raw) return null;

  const fields = {
    studentId: String(raw.studentId ?? raw.id_no ?? raw.student_id ?? ""),
    regNo: String(raw.regNo ?? raw.reg_no ?? raw.registration_no ?? ""),
    name: String(raw.name ?? "Student"),
    batch: Number(raw.batch ?? raw.batch_no ?? raw.batchNo ?? 0),
    session: raw.session ?? raw.batch_session,
    nameBn: raw.nameBn ?? raw.name_bn,
    photo: raw.photo,
    photoDriveUrl: raw.photoDriveUrl ?? raw.photo_drive_url ?? raw.photo,
    email: raw.email,
    phone: raw.phone,
    contact: raw.contact,
    altPhone: raw.altPhone ?? raw.alt_phone,
    gender: raw.gender,
    dob: raw.dob,
    address: raw.address ?? raw.permanent_address,
    permanentAddress: raw.permanentAddress ?? raw.permanent_address,
    currentCity: raw.currentCity ?? raw.current_city,
    currentCountry: raw.currentCountry ?? raw.current_country,
    presentStatus: raw.presentStatus ?? raw.present_status,
    linkedin: raw.linkedin,
    currentPosition: raw.currentPosition ?? raw.job_title,
    organization: raw.organization,
    location: raw.location,
    degree: raw.degree,
    bio: raw.bio,
    department: raw.department,
    uid: raw.uid,
    isRegistered: raw.isRegistered ?? raw.registered ?? false,
  };
  const normalized = Object.fromEntries(Object.entries(fields).filter(([, value]) => value !== undefined));
  await Model.collection.updateOne({ _id: raw._id }, { $set: normalized });
  return Model.findById(raw._id);
}

export async function POST(req: Request) {
  const user = await verifyUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const studentId = String(body.studentId || "").trim().padStart(7, "0");
  const regNo = String(body.regNo || "").trim().padStart(5, "0");
  if (!/^\d{7}$/.test(studentId) || !/^\d{5}$/.test(regNo)) {
    return NextResponse.json(
      { error: "Enter a valid Student ID (7 digits) and Reg No (5 digits)" },
      { status: 400 }
    );
  }

  await connectDB();

  const linkedAlumni = await Alumni.findOne({ uid: user.uid });
  const linkedStudent = linkedAlumni ? null : await Student.findOne({ uid: user.uid });
  let kind: "alumni" | "student" = "alumni";
  let rec: any = await findMongoRecord(Alumni, studentId, regNo);
  if (!rec) {
    rec = await findMongoRecord(Student, studentId, regNo);
    kind = "student";
  }
  if (!rec) {
    return NextResponse.json({ error: "No MongoDB record matches this Student ID and Registration number" }, { status: 404 });
  }
  if (rec.uid && rec.uid !== user.uid) {
    return NextResponse.json({ error: "This profile is already claimed" }, { status: 409 });
  }

  // A user can correct a previous link by proving the new ID and registration pair.
  if (linkedAlumni && (kind !== "alumni" || String(linkedAlumni._id) !== String(rec._id))) {
    await Alumni.updateOne({ _id: linkedAlumni._id, uid: user.uid }, { $unset: { uid: "" }, $set: { isRegistered: false } });
  }
  if (linkedStudent && (kind !== "student" || String(linkedStudent._id) !== String(rec._id))) {
    await Student.updateOne({ _id: linkedStudent._id, uid: user.uid }, { $unset: { uid: "" }, $set: { isRegistered: false } });
  }

  rec.uid = user.uid;
  if (!rec.email && user.email) rec.email = user.email;
  rec.isRegistered = true;
  await rec.save();

  const record = {
    id_no: studentId, reg_no: regNo, name: rec.name, batch_no: rec.batch,
    batch_session: rec.session, name_bn: rec.nameBn, degree: rec.degree,
    job_title: rec.currentPosition, organization: rec.organization, location: rec.location,
    contact: rec.contact, photo: rec.photo || rec.photoDriveUrl, bio: rec.bio,
    linkedin: rec.linkedin, email: rec.email || user.email, phone: rec.phone,
    current_city: rec.currentCity, current_country: rec.currentCountry,
    gender: rec.gender, present_status: rec.presentStatus,
    permanent_address: rec.permanentAddress, dob: rec.dob, alt_phone: rec.altPhone,
    status: kind === "alumni" ? "alumni" : "current_student",
  };
  record.email = record.email || user.email;
  await Profile.findOneAndUpdate(
    { uid: user.uid },
    {
      uid: user.uid,
      role: kind,
      name: rec.name,
      email: user.email,
      studentId,
      batch: rec.batch,
      department: rec.department,
      studentRecord: { ...record, email: user.email || record.email },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  await User.updateOne({ uid: user.uid }, { $set: { role: kind, name: rec.name, email: user.email } });

  return NextResponse.json({ ok: true, kind });
}
