import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Teacher from "@/models/Teacher";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id }  = await params;
    const teacher = await Teacher.findById(id);
    if (!teacher) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: teacher });
  } catch {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id }  = await params;
    const body    = await req.json();
    const teacher = await Teacher.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ success: true, data: teacher });
  } catch {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    await Teacher.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Deleted" });
  } catch {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}