import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import News from "@/models/News";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const slug     = searchParams.get("slug");
    const limit    = Number(searchParams.get("limit")) || 20;
    const query: Record<string, unknown> = { isPublished: true };
    if (category) query.category = category;
    if (slug)     query.slug = slug;
    const news = await News.find(query).sort({ publishedAt: -1 }).limit(limit);
    return NextResponse.json({ success: true, data: news });
  } catch {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const news = await News.create(body);
    return NextResponse.json({ success: true, data: news }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}