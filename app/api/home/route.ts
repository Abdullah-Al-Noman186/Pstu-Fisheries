import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { toPublicAlumni } from "@/lib/studentRecords";
import Student from "@/models/Student";
import Alumni from "@/models/Alumni";
import Profile from "@/models/Profile";
import Teacher from "@/models/Teacher";
import Archive from "@/models/Archive";

export const dynamic = "force-dynamic";

const publicCacheHeaders = {
  "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120",
};

type RawRecord = Record<string, any>;

function recordKey(record: RawRecord) {
  return String(record.studentId ?? record.student_id ?? record.id_no ?? record.uid ?? record._id ?? "");
}

function scoreAlumni(person: RawRecord) {
  return Number(Boolean(person.isFeatured)) * 1000 +
    (Array.isArray(person.achievements) ? person.achievements.length : 0) * 10 +
    Number(Boolean(person.currentPosition)) * 3 +
    Number(Boolean(person.organization)) * 2;
}

export async function GET() {
  try {
    await connectDB();

    const [students, studentProfiles, alumni, alumniProfiles, totalTeachers, archive, totalArchive] = await Promise.all([
      Student.collection.find({}, { projection: { _id: 1, studentId: 1, student_id: 1, id_no: 1 } }).toArray(),
      Profile.collection.find({ role: "student", studentRecord: { $exists: true } }, { projection: { uid: 1, studentId: 1, studentRecord: 1 } }).toArray(),
      Alumni.collection.find({}, { projection: {
        _id: 1, uid: 1, studentId: 1, student_id: 1, id_no: 1, name: 1, nameBn: 1, name_bn: 1,
        batch: 1, batch_no: 1, session: 1, department: 1, photo: 1, photoDriveUrl: 1,
        currentPosition: 1, job_title: 1, organization: 1, location: 1, email: 1, linkedin: 1,
        achievements: 1, testimonial: 1, bio: 1, currentCity: 1, currentCountry: 1,
        permanentAddress: 1, permanent_address: 1, presentStatus: 1, present_status: 1,
        phone: 1, isFeatured: 1,
      } }).toArray(),
      Profile.collection.find({ role: "alumni", studentRecord: { $exists: true } }, { projection: {
        uid: 1, name: 1, email: 1, photo: 1, department: 1, batch: 1, currentPosition: 1,
        organization: 1, location: 1, linkedin: 1, achievements: 1, testimonial: 1, bio: 1,
        studentId: 1, studentRecord: 1,
      } }).toArray(),
      Teacher.countDocuments({}),
      Archive.find({}).sort({ createdAt: -1 }).limit(3).select("title description image category year location createdAt").lean(),
      Archive.countDocuments({}),
    ]);

    const studentIds = new Set<string>();
    for (const student of students) {
      const key = recordKey(student);
      if (key) studentIds.add(key);
    }
    for (const profile of studentProfiles) {
      const key = recordKey({ ...(profile.studentRecord || {}), studentId: profile.studentId, uid: profile.uid });
      if (key) studentIds.add(key);
    }

    const alumniById = new Map<string, RawRecord>();
    for (const record of alumni) {
      const key = recordKey(record);
      if (key) alumniById.set(key, toPublicAlumni(record) as RawRecord);
    }
    for (const profile of alumniProfiles) {
      const record = profile.studentRecord || {};
      const profileRecord = {
        ...record,
        uid: profile.uid,
        studentId: record.studentId ?? record.id_no ?? profile.studentId,
        name: profile.name || record.name,
        nameBn: record.nameBn ?? record.name_bn,
        email: profile.email || record.email,
        photo: profile.photo || record.photo,
        department: profile.department || record.department,
        batch: profile.batch ?? record.batch ?? record.batch_no,
        currentPosition: profile.currentPosition || record.currentPosition || record.job_title,
        organization: profile.organization || record.organization,
        location: profile.location || record.location,
        linkedin: profile.linkedin || record.linkedin,
        achievements: profile.achievements || record.achievements,
        testimonial: profile.testimonial || record.testimonial,
        bio: profile.bio || record.bio,
      };
      const key = recordKey(profileRecord);
      if (key) alumniById.set(key, toPublicAlumni(profileRecord) as RawRecord);
    }

    const alumniRecords = Array.from(alumniById.values());
    const batchCounts = new Map<string, number>();
    for (const person of alumniRecords) {
      const batch = String(person.batch ?? "").trim();
      if (batch && batch !== "0") batchCounts.set(batch, (batchCounts.get(batch) || 0) + 1);
    }

    const batches = Array.from(batchCounts, ([batch, count]) => ({ batch, count }))
      .sort((a, b) => Number(b.batch) - Number(a.batch));
    const featuredAlumni = alumniRecords
      .sort((a, b) => scoreAlumni(b) - scoreAlumni(a))
      .slice(0, 6);

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          totalStudents: studentIds.size,
          totalAlumni: alumniRecords.length,
          totalTeachers,
          totalArchive,
        },
        batches,
        featuredAlumni,
        archive,
      },
    }, { headers: publicCacheHeaders });
  } catch (error: any) {
    console.error("Home data error:", error.message);
    return NextResponse.json({ success: false, error: "Could not load homepage data." }, { status: 500 });
  }
}
