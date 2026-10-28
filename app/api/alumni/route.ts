import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Alumni from "@/models/Alumni";
import Profile from "@/models/Profile";
import { toPublicAlumni } from "@/lib/studentRecords";

export const dynamic = "force-dynamic";
const publicCacheHeaders = { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120" };

export async function GET(req: Request) {
  try {
    await connectDB();
    const [saved, profiles] = await Promise.all([
      Alumni.find({}).lean(),
      Profile.find({ studentRecord: { $exists: true } }).lean(),
    ]);
    const byId = new Map<string, Record<string, any>>();
    const privacyByUid = new Map<string, any>(profiles.map((profile: any) => [profile.uid, profile.privacy || {}]));
    saved.forEach((r: any) => {
      const publicRecord = toPublicAlumni(r);
      const privacy = privacyByUid.get(String(r.uid || "")) || {};
      byId.set(String(r.studentId || r.uid || r._id), {
        ...publicRecord,
        email: privacy.showEmail ? publicRecord.email : "",
        phone: privacy.showPhone ? publicRecord.phone : "",
        permanentAddress: privacy.showAddress ? publicRecord.permanentAddress : "",
        status: "alumni",
      });
    });
    profiles.forEach((p: any) => {
      const privacy = p.privacy || {};
      byId.set(String(p.studentRecord?.id_no), {
        ...p.studentRecord,
        uid: p.uid,
        name: p.name,
        email: privacy.showEmail ? p.email : "",
        phone: privacy.showPhone ? p.studentRecord?.phone || "" : "",
        contact: privacy.showPhone ? p.studentRecord?.contact || "" : "",
        permanent_address: privacy.showAddress ? p.studentRecord?.permanent_address || "" : "",
        permanentAddress: privacy.showAddress ? p.studentRecord?.permanent_address || "" : "",
        photo: p.photo || p.studentRecord?.photo,
        isRegistered: true,
        status: p.role === "alumni" ? "alumni" : "current_student",
      });
    });
    const batchParam = new URL(req.url).searchParams.get("batch");
    const requestedBatch = batchParam ? Number(batchParam) : NaN;
    const records = Array.from(byId.values()).filter((record) => record.status === "alumni").map(toPublicAlumni);
    const result = Number.isFinite(requestedBatch) && requestedBatch > 0 ? records.filter((record) => Number(record.batch) === requestedBatch) : records;
    return NextResponse.json({ success: true, data: result, total: result.length }, { headers: publicCacheHeaders });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
