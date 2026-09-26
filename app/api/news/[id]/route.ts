import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import News from "@/models/News";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const body   = await req.json();
    const news   = await News.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ success: true, data: news });
  } catch {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    await News.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Deleted" });
  } catch {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}