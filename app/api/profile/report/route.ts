import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import { connectDB } from "@/lib/mongodb";
import ProfileReport from "@/models/ProfileReport";
import Profile from "@/models/Profile";
import User from "@/models/User";

async function requireAdmin(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  if (!token) return null;
  try {
    const decoded = await adminAuth().verifyIdToken(token);
    const user = await User.findOne({ uid: decoded.uid }).select({ role: 1 }).lean().exec() as unknown as { role?: string } | null;
    return user?.role === "admin" ? decoded.uid : null;
  } catch { return null; }
}

export async function GET(req: NextRequest) {
  const adminUid = await requireAdmin(req);
  if (!adminUid) return NextResponse.json({ success: false, error: "Admin access required." }, { status: 403 });
  try {
    await connectDB();
    const reports = await ProfileReport.find({ status: { $ne: "resolved" } }).sort({ createdAt: -1 }).limit(100).lean();
    const targetUids = Array.from(new Set(reports.map((report) => report.targetUid)));
    const profiles = await Profile.find({ uid: { $in: targetUids } }).select({ uid: 1, name: 1, role: 1 }).lean();
    const profileByUid = new Map(profiles.map((profile) => [profile.uid, profile]));
    return NextResponse.json({ success: true, data: reports.map((report) => ({ ...report, target: profileByUid.get(report.targetUid) || null })) });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Could not load reports." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const adminUid = await requireAdmin(req);
  if (!adminUid) return NextResponse.json({ success: false, error: "Admin access required." }, { status: 403 });
  try {
    await connectDB();
    const body = await req.json();
    const status = String(body.status || "");
    if (!(["reviewed", "resolved"] as string[]).includes(status)) return NextResponse.json({ success: false, error: "Invalid report status." }, { status: 400 });
    const report = await ProfileReport.findByIdAndUpdate(body.id, { $set: { status } }, { new: true });
    if (!report) return NextResponse.json({ success: false, error: "Report not found." }, { status: 404 });
    return NextResponse.json({ success: true, data: report });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Could not update the report." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("auth_token")?.value;
    if (!token) return NextResponse.json({ success: false, error: "Sign in to report a profile." }, { status: 401 });
    const reporter = await adminAuth().verifyIdToken(token);
    const body = await req.json();
    const targetUid = String(body.targetUid || "").trim();
    const message = String(body.message || "").trim();
    if (!targetUid || targetUid === reporter.uid) return NextResponse.json({ success: false, error: "Choose a valid profile to report." }, { status: 400 });
    if (message.length < 10 || message.length > 500) return NextResponse.json({ success: false, error: "Explain the issue in 10–500 characters." }, { status: 400 });

    await connectDB();
    const target = await Profile.exists({ uid: targetUid });
    if (!target) return NextResponse.json({ success: false, error: "That profile is no longer available." }, { status: 404 });
    await ProfileReport.create({ reporterUid: reporter.uid, targetUid, message });
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Could not send the report." }, { status: 500 });
  }
}
