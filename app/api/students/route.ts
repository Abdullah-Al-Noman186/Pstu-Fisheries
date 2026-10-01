import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Student from "@/models/Student";
import Profile from "@/models/Profile";
import { toPublicStudent } from "@/lib/studentRecords";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();
    const [saved, profiles] = await Promise.all([
      Student.find({}).lean(),
      Profile.find({ studentRecord: { $exists: true } }).lean(),
    ]);
    const byId = new Map<string, Record<string, any>>();
    saved.forEach((r: any) => byId.set(String(r.studentId), { ...toPublicStudent(r), status: "current_student" }));
    profiles.forEach((p: any) => byId.set(String(p.studentRecord?.id_no), { ...p.studentRecord, name: p.name, email: p.email, photo: p.photo || p.studentRecord?.photo, status: p.role === "alumni" ? "alumni" : "current_student" }));
    return NextResponse.json({ success: true, data: Array.from(byId.values()).map(toPublicStudent).filter((r) => r.status === "current_student") });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
