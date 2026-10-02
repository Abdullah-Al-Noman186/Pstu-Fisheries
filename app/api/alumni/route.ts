import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Alumni from "@/models/Alumni";
import Profile from "@/models/Profile";
import { toPublicAlumni } from "@/lib/studentRecords";

export const dynamic = "force-dynamic";
const publicCacheHeaders = { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120" };

export async function GET() {
  try {
    await connectDB();
    const [saved, profiles] = await Promise.all([
      Alumni.find({}).lean(),
      Profile.find({ studentRecord: { $exists: true } }).lean(),
    ]);
    const byId = new Map<string, Record<string, any>>();
    saved.forEach((r: any) => byId.set(String(r.studentId || r.uid || r._id), { ...toPublicAlumni(r), status: "alumni" }));
    profiles.forEach((p: any) => byId.set(String(p.studentRecord?.id_no), { ...p.studentRecord, uid: p.uid, name: p.name, email: p.email, photo: p.photo || p.studentRecord?.photo, status: p.role === "alumni" ? "alumni" : "current_student" }));
    return NextResponse.json({ success: true, data: Array.from(byId.values()).filter((record) => record.status === "alumni").map(toPublicAlumni) }, { headers: publicCacheHeaders });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
