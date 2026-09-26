import { NextResponse } from "next/server";

export async function GET() {
  const results: Record<string, string> = {};

  results["MONGODB_URI"]                 = process.env.MONGODB_URI                  ? `✅ SET (${process.env.MONGODB_URI.slice(0, 40)}...)` : "❌ MISSING";
  results["FIREBASE_ADMIN_PROJECT_ID"]   = process.env.FIREBASE_ADMIN_PROJECT_ID    ? "✅ SET" : "❌ MISSING";
  results["FIREBASE_ADMIN_CLIENT_EMAIL"] = process.env.FIREBASE_ADMIN_CLIENT_EMAIL  ? "✅ SET" : "❌ MISSING";
  results["FIREBASE_ADMIN_PRIVATE_KEY"]  = process.env.FIREBASE_ADMIN_PRIVATE_KEY   ? "✅ SET" : "❌ MISSING";

  // Test MongoDB
  try {
    const { connectDB } = await import("@/lib/mongodb");
    await connectDB();
    results["MongoDB"] = "✅ CONNECTED";
  } catch (e: any) {
    results["MongoDB"] = `❌ FAILED: ${e.message}`;
  }

  // Test Profile model
  try {
    const { connectDB } = await import("@/lib/mongodb");
    await connectDB();
    const Profile = (await import("@/models/Profile")).default;
    const count = await Profile.countDocuments({});
    results["Profile collection"] = `✅ OK — ${count} documents`;
  } catch (e: any) {
    results["Profile collection"] = `❌ FAILED: ${e.message}`;
  }

  // Test Teacher query (same as /api/teachers)
  try {
    const { connectDB } = await import("@/lib/mongodb");
    await connectDB();
    const Profile = (await import("@/models/Profile")).default;
    const teachers = await Profile.find({ role: "teacher" });
    results["Teachers query"] = `✅ OK — ${teachers.length} teachers found`;
  } catch (e: any) {
    results["Teachers query"] = `❌ FAILED: ${e.message}`;
  }

  // Test Alumni query
  try {
    const { connectDB } = await import("@/lib/mongodb");
    await connectDB();
    const Profile = (await import("@/models/Profile")).default;
    const alumni = await Profile.find({ role: "alumni" });
    results["Alumni query"] = `✅ OK — ${alumni.length} alumni found`;
  } catch (e: any) {
    results["Alumni query"] = `❌ FAILED: ${e.message}`;
  }

  return NextResponse.json(results, { status: 200 });
}