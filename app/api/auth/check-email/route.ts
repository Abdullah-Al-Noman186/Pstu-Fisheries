import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req: NextRequest) {
  try {
    const email = (req.nextUrl.searchParams.get("email") || "").trim().toLowerCase();
    if (!email.includes("@")) return NextResponse.json({ registered: false }, { status: 400 });
    await connectDB();
    const registered = Boolean(await User.exists({ email }));
    return NextResponse.json({ registered });
  } catch (error: any) {
    return NextResponse.json({ registered: false, error: error.message }, { status: 500 });
  }
}
