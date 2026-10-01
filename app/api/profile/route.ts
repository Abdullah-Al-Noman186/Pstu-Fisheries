import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Profile from "@/models/Profile";
import User from "@/models/User";
import Student from "@/models/Student";
import Alumni from "@/models/Alumni";
import { adminAuth } from "@/lib/firebase-admin";

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
    const profile = await Profile.findOne({ uid });
    const record = profile?.studentRecord || {};
    return NextResponse.json({ success: true, data: profile ? {
      ...record,
      name: profile.name || record.name || "",
      email: profile.email || record.email || "",
      photo: profile.photo || record.photo || "",
      id_no: record.id_no || "",
      reg_no: record.reg_no || "",
      status: profile.role === "alumni" ? "alumni" : "current_student",
      batch_no: record.batch_no ?? profile.batch ?? "",
      batch_session: record.batch_session || "",
    } : null });
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
