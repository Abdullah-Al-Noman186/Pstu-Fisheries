import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Alumni from "@/models/Alumni";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const alumni = await Alumni.findById(params.id);
    if (!alumni) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: alumni });
  } catch {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const body   = await req.json();
    const alumni = await Alumni.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json({ success: true, data: alumni });
  } catch {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    await Alumni.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true, message: "Deleted" });
  } catch {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}