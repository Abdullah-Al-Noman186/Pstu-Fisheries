import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { verifyUser } from "@/lib/verifyUser";
import Alumni from "@/models/Alumni";
import Student from "@/models/Student";
import Profile from "@/models/Profile";
import User from "@/models/User";

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

  // this login is already linked -> nothing to do
  const linkedAlumni = await Alumni.findOne({ uid: user.uid });
  const linkedStudent = linkedAlumni ? null : await Student.findOne({ uid: user.uid });
  const already = linkedAlumni || linkedStudent;
  if (already) {
    const kind = linkedAlumni ? "alumni" : "student";
    if (String(already.studentId || "").trim().padStart(7, "0") !== studentId || String(already.regNo || "").trim().padStart(5, "0") !== regNo) {
      return NextResponse.json({ error: "This account is already connected to a different PSTU record" }, { status: 409 });
    }
    const existingProfile = await Profile.findOne({ uid: user.uid });
    if (!existingProfile?.studentRecord?.id_no) {
      const record = {
        id_no: already.studentId, reg_no: already.regNo, name: already.name,
        batch_no: already.batch, batch_session: already.session, name_bn: already.nameBn,
        degree: already.degree, job_title: already.currentPosition, organization: already.organization,
        location: already.location, contact: already.contact, photo: already.photo || already.photoDriveUrl,
        bio: already.bio, linkedin: already.linkedin, email: already.email || user.email,
        phone: already.phone, current_city: already.currentCity, current_country: already.currentCountry,
        gender: already.gender, present_status: already.presentStatus,
        permanent_address: already.permanentAddress || already.address, dob: already.dob,
        alt_phone: already.altPhone, status: kind === "alumni" ? "alumni" : "current_student",
      };
      await Profile.findOneAndUpdate({ uid: user.uid }, { $set: { uid: user.uid, role: kind, name: already.name, email: user.email, studentId: already.studentId, batch: already.batch, studentRecord: record } }, { upsert: true, new: true });
    }
    await User.updateOne({ uid: user.uid }, { $set: { role: kind } });
    return NextResponse.json({ ok: true, kind });
  }

  let kind: "alumni" | "student" = "alumni";
  let rec: any = await Alumni.findOne({ studentId, regNo });
  if (!rec) {
    rec = await Student.findOne({ studentId, regNo });
    kind = "student";
  }
  if (!rec) {
    return NextResponse.json({ error: "No MongoDB record matches this Student ID and Registration number" }, { status: 404 });
  }
  if (rec.uid && rec.uid !== user.uid) {
    return NextResponse.json({ error: "This profile is already claimed" }, { status: 409 });
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
