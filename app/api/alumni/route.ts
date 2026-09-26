import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Profile from "@/models/Profile";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const department = searchParams.get("department");
    const featured   = searchParams.get("featured");

    const query: Record<string, any> = { role: "alumni" };
    if (department) query.department = department;

    const alumni = await Profile.find(query).sort({ batch: -1, name: 1 });
    return NextResponse.json({ success: true, data: alumni });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}