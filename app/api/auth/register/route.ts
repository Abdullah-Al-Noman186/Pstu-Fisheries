import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Profile from "@/models/Profile";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, name, email, role, department, studentId, batch } = body;

    if (!token) {
      return NextResponse.json({ success: false, error: "No token" }, { status: 400 });
    }

    let decoded;
    try {
      decoded = await adminAuth().verifyIdToken(token);
    } catch (err: any) {
      console.error("Token verify failed:", err.message);
      return NextResponse.json({ success: false, error: "Invalid token" }, { status: 401 });
    }

    await connectDB();

    const user = await User.findOneAndUpdate(
      { uid: decoded.uid },
      { uid: decoded.uid, name, email, role, department: department || undefined },
      { upsert: true, new: true }
    );

    const profileData: Record<string, any> = {
      uid: decoded.uid, name, email, role,
      department: department || undefined,
    };
    if (role === "student") {
      profileData.studentId = studentId;
      profileData.batch     = batch;
    }

    await Profile.findOneAndUpdate(
      { uid: decoded.uid },
      profileData,
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, user });

  } catch (err: any) {
    console.error("Register route error:", err.message);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}