import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Profile from "@/models/Profile";
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
    return NextResponse.json({ success: true, data: profile });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const uid = await getUID(req);
    if (!uid) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    await connectDB();
    const body    = await req.json();
    const profile = await Profile.findOneAndUpdate(
      { uid },
      { ...body, uid },
      { new: true, upsert: true }
    );
    return NextResponse.json({ success: true, data: profile });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}