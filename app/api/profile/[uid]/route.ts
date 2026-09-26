import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Profile from "@/models/Profile";

export async function GET(_: NextRequest, { params }: { params: { uid: string } }) {
  try {
    await connectDB();
    const profile = await Profile.findOne({ uid: params.uid });
    if (!profile) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: profile });
  } catch {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}