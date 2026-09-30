import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { verifyUser } from "@/lib/verifyUser";
import Alumni from "@/models/Alumni";
import Student from "@/models/Student";
import Profile from "@/models/Profile";

export async function POST(req: Request) {
  const user = await verifyUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!user.email_verified) {
    return NextResponse.json({ error: "Please verify your email first" }, { status: 403 });
  }

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
  const already =
    (await Alumni.findOne({ uid: user.uid })) || (await Student.findOne({ uid: user.uid }));
  if (already) return NextResponse.json({ ok: true });

  let kind: "alumni" | "student" = "alumni";
  let rec: any = await Alumni.findOne({ studentId, regNo });
  if (!rec) {
    rec = await Student.findOne({ studentId, regNo });
    kind = "student";
  }
  if (!rec) {
    return NextResponse.json(
      { error: "No record matches this Student ID and Reg No" },
      { status: 404 }
    );
  }
  if (rec.uid && rec.uid !== user.uid) {
    return NextResponse.json({ error: "This profile is already claimed" }, { status: 409 });
  }

  rec.uid = user.uid;
  if (!rec.email && user.email) rec.email = user.email;
  rec.isRegistered = true;
  await rec.save();

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
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  return NextResponse.json({ ok: true, kind });
}