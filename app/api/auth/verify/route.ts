import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Profile from "@/models/Profile";
import Student from "@/models/Student";
import Alumni from "@/models/Alumni";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token } = body;

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

    const user = await User.findOne({ uid: decoded.uid });
    if (!user) return NextResponse.json({ success: false, error: "This email is not registered. Register with your PSTU ID and Registration number first." }, { status: 403 });

    const [profile, student, alumni] = await Promise.all([
      Profile.findOne({ uid: decoded.uid }).lean(),
      Student.findOne({ uid: decoded.uid }).lean(),
      Alumni.findOne({ uid: decoded.uid }).lean(),
    ]) as any[];
    const currentUser = {
      ...user.toObject(),
      name: student?.name || alumni?.name || profile?.name || decoded.name || user.name || decoded.email?.split("@")[0] || "User",
      photo: profile?.photo || student?.photo || alumni?.photo || decoded.picture || user.photo || "",
      role: profile?.role || (student ? "student" : alumni ? "alumni" : user.role),
      department: profile?.department || user.department,
    };

    const response = NextResponse.json({ success: true, user: currentUser });
    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure:   process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge:   60 * 60 * 24 * 7,
    });
    return response;

  } catch (err: any) {
    console.error("Verify route error:", err.message);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
