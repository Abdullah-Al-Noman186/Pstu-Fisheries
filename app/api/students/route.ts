import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Student from "@/models/Student";
import Profile from "@/models/Profile";
import { toPublicStudent } from "@/lib/studentRecords";

export const dynamic = "force-dynamic";
const publicCacheHeaders = { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120" };

export async function GET() {
  try {
    await connectDB();
    const [saved, profiles] = await Promise.all([
      Student.find({}).lean(),
      Profile.find({ studentRecord: { $exists: true } }).lean(),
    ]);
    const byId = new Map<string, Record<string, any>>();
    const privacyByUid = new Map<string, any>(profiles.map((profile: any) => [profile.uid, profile.privacy || {}]));
    saved.forEach((r: any) => {
      const publicRecord: Record<string, any> = toPublicStudent(r);
      const privacy = privacyByUid.get(String(r.uid || "")) || {};
      byId.set(String(r.studentId || r.id_no || r._id), {
        ...publicRecord,
        email: privacy.showEmail ? publicRecord.email : "",
        phone: privacy.showPhone ? publicRecord.phone : "",
        contact: privacy.showPhone ? publicRecord.contact : "",
        permanent_address: privacy.showAddress ? publicRecord.permanent_address : "",
        status: "current_student",
      });
    });
    profiles.forEach((p: any) => {
      const privacy = p.privacy || {};
      byId.set(String(p.studentRecord?.id_no), {
        ...p.studentRecord,
        name: p.name,
        email: privacy.showEmail ? p.email : "",
        phone: privacy.showPhone ? p.studentRecord?.phone || "" : "",
        contact: privacy.showPhone ? p.studentRecord?.contact || "" : "",
        permanent_address: privacy.showAddress ? p.studentRecord?.permanent_address || "" : "",
        photo: p.photo || p.studentRecord?.photo,
        isRegistered: true,
        status: p.role === "alumni" ? "alumni" : "current_student",
      });
    });
    return NextResponse.json({ success: true, data: Array.from(byId.values()).map(toPublicStudent).filter((r) => r.status === "current_student") }, { headers: publicCacheHeaders });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
