import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { adminAuth } from "@/lib/firebase-admin";
import Archive, { ARCHIVE_CATEGORIES } from "@/models/Archive";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();
    const archive = await Archive.find({}).sort({ createdAt: -1 }).limit(200).lean();
    return NextResponse.json({ success: true, archive });
  } catch (error: any) {
    console.error("Archive read failed:", error.message);
    return NextResponse.json({ success: false, error: "Could not load archive stories." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("auth_token")?.value;
    if (!token) return NextResponse.json({ success: false, error: "Sign in before publishing an archive story." }, { status: 401 });

    let decoded;
    try {
      decoded = await adminAuth().verifyIdToken(token);
    } catch {
      return NextResponse.json({ success: false, error: "Your session has expired. Sign in again." }, { status: 401 });
    }

    await connectDB();
    const user = await User.findOne({ uid: decoded.uid })
      .select({ name: 1, photo: 1 })
      .lean()
      .exec() as unknown as { name?: string; photo?: string } | null;
    if (!user) return NextResponse.json({ success: false, error: "Your account could not be verified." }, { status: 403 });

    const body = await req.json();
    const title = String(body.title || "").trim();
    const description = String(body.description || "").trim();
    const image = String(body.image || "").trim();
    const category = String(body.category || "");
    const year = String(body.year || "").trim();
    const location = String(body.location || "").trim();

    if (!title || title.length > 160) return NextResponse.json({ success: false, error: "Enter a title up to 160 characters." }, { status: 400 });
    if (!description || description.length > 5000) return NextResponse.json({ success: false, error: "Enter a description up to 5,000 characters." }, { status: 400 });
    if (!ARCHIVE_CATEGORIES.includes(category as (typeof ARCHIVE_CATEGORIES)[number])) return NextResponse.json({ success: false, error: "Choose a valid archive category." }, { status: 400 });
    if (!/^https:\/\/res\.cloudinary\.com\//i.test(image)) return NextResponse.json({ success: false, error: "Upload an archive image before publishing." }, { status: 400 });

    const archive = await Archive.create({
      title,
      description,
      image,
      category,
      year: year.slice(0, 4),
      location,
      author: { name: user.name || decoded.name || "Faculty member", photo: user.photo || decoded.picture || "" },
      postedBy: decoded.uid,
    });

    return NextResponse.json({ success: true, archive }, { status: 201 });
  } catch (error: any) {
    console.error("Archive publish failed:", error.message);
    return NextResponse.json({ success: false, error: "Could not publish this archive story." }, { status: 500 });
  }
}
