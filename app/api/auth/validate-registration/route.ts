import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { findPstuRecord } from "@/lib/findPstuRecord";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = String(body.email || "").trim().toLowerCase();
    const studentId = String(body.studentId || "").trim();
    const regNo = String(body.regNo || "").trim();
    if (!email.includes("@") || !studentId || !regNo) {
      return NextResponse.json({ success: false, error: "Enter a valid email, Student ID, and Registration number." }, { status: 400 });
    }

    await connectDB();
    if (await User.findOne({ email })) {
      return NextResponse.json({ success: false, error: "This email is already registered. Sign in instead." }, { status: 409 });
    }
    const match = await findPstuRecord(studentId, regNo);
    if (!match) {
      return NextResponse.json({ success: false, error: "Student ID and Registration number do not match a MongoDB student record. No account was created." }, { status: 404 });
    }
    if (match.record.uid) {
      return NextResponse.json({ success: false, error: "This PSTU record is already connected to an account." }, { status: 409 });
    }

    return NextResponse.json({ success: true, name: match.record.name || "PSTU User", role: match.kind });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Could not validate the PSTU record." }, { status: 500 });
  }
}
