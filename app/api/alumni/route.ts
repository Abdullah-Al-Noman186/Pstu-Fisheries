import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Alumni from "@/models/Alumni";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();

    const data = await Alumni.find({})
      .select(
        "name batch session department photo currentPosition organization location linkedin achievements testimonial isFeatured presentStatus"
      )
      .lean();

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to load alumni" },
      { status: 500 }
    );
  }
}