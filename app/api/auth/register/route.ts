import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Profile from "@/models/Profile";
import { findPstuRecord } from "@/lib/findPstuRecord";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, name, email, department, studentId, regNo, batch } = body;

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

    if (!decoded.email || String(decoded.email).toLowerCase() !== String(email || "").trim().toLowerCase()) {
      return NextResponse.json({ success: false, error: "The account email does not match the registration email." }, { status: 400 });
    }
    const match = await findPstuRecord(String(studentId || ""), String(regNo || ""));
    if (!match || (match.record.uid && match.record.uid !== decoded.uid)) {
      return NextResponse.json({ success: false, error: "Student ID and Registration number do not match an available MongoDB record." }, { status: 409 });
    }
    const linkedRole = match.kind;
    const linkedName = String(match.record.name || name || "PSTU User");
    const linkedBatch = Number(match.record.batch ?? match.record.batch_no ?? batch ?? 0);

    const user = await User.findOneAndUpdate(
      { uid: decoded.uid },
      { uid: decoded.uid, name: linkedName, email: decoded.email.toLowerCase(), role: linkedRole, department: department || match.record.department || undefined },
      { upsert: true, new: true }
    );

    const profileData: Record<string, any> = {
      uid: decoded.uid, name: linkedName, email: decoded.email.toLowerCase(), role: linkedRole,
      department: department || match.record.department || undefined,
      studentId: String(match.record.studentId ?? match.record.id_no ?? match.record.student_id ?? studentId),
      batch: linkedBatch,
    };

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
