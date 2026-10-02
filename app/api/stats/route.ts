import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Teacher from "@/models/Teacher";
import Alumni from "@/models/Alumni";
import News from "@/models/News";
import Research from "@/models/Research";

export async function GET() {
  try {
    await connectDB();

    const [
      totalUsers,
      totalTeachers,
      totalAlumni,
      totalNews,
      totalResearch,
      studentCount,
      teacherUserCount,
      alumniUserCount,
      adminCount,
    ] = await Promise.all([
      User.countDocuments({}),
      Teacher.countDocuments({}),
      Alumni.countDocuments({}),
      News.countDocuments({ isPublished: true }),
      Research.countDocuments({}),
      User.countDocuments({ role: "student" }),
      User.countDocuments({ role: "teacher" }),
      User.countDocuments({ role: "alumni" }),
      User.countDocuments({ role: "admin" }),
    ]);

    // Users registered today
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const newToday = await User.countDocuments({ createdAt: { $gte: todayStart } });

    // Users registered this month
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);
    const newThisMonth = await User.countDocuments({ createdAt: { $gte: monthStart } });

    // Recent signups (last 5)
    const recentUsers = await User.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name email role department createdAt photo");

    return NextResponse.json({
      success: true,
      data: {
        totalUsers,
        totalTeachers,
        totalAlumni,
        totalNews,
        totalResearch,
        byRole: {
          student: studentCount,
          teacher: teacherUserCount,
          alumni:  alumniUserCount,
          admin:   adminCount,
        },
        newToday,
        newThisMonth,
        recentUsers,
      }
    }, { headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120" } });
  } catch (error: any) {
    console.error("Stats error:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
