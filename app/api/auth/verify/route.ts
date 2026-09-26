import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Profile from "@/models/Profile";

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

    let user = await User.findOne({ uid: decoded.uid });
    if (!user) {
      user = await User.create({
        uid:   decoded.uid,
        name:  decoded.name || decoded.email?.split("@")[0] || "User",
        email: decoded.email,
        photo: decoded.picture || "",
        role:  "student",
      });
      await Profile.findOneAndUpdate(
        { uid: decoded.uid },
        {
          uid:   decoded.uid,
          name:  user.name,
          email: user.email,
          photo: user.photo,
          role:  "student",
        },
        { upsert: true, new: true }
      );
    }

    const response = NextResponse.json({ success: true, user });
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