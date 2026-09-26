import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Alumni from "@/models/Alumni";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const alumni = await Alumni.findById(id);
    if (!alumni) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: alumni });
  } catch {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const body   = await req.json();
    const alumni = await Alumni.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ success: true, data: alumni });
  } catch {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    await Alumni.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Deleted" });
  } catch {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}