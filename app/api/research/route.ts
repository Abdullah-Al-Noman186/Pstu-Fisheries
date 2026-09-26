import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Research from "@/models/Research";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const query: Record<string, unknown> = {};
    const department = searchParams.get("department");
    const type       = searchParams.get("type");
    if (department) query.department = department;
    if (type)       query.type = type;
    const research = await Research.find(query).sort({ year: -1 });
    return NextResponse.json({ success: true, data: research });
  } catch {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body     = await req.json();
    const research = await Research.create(body);
    return NextResponse.json({ success: true, data: research }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}