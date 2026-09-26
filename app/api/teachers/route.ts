import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Profile from "@/models/Profile";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const department = searchParams.get("department");

    const query: Record<string, any> = { role: "teacher" };
    if (department) query.department = department;

    const teachers = await Profile.find(query).sort({ name: 1 });
    return NextResponse.json({ success: true, data: teachers });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}