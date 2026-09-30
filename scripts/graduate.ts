import { connectDB } from "../lib/mongodb";
import Alumni from "../models/Alumni";
import Student from "../models/Student";
import Profile from "../models/Profile";

// usage: npx tsx --env-file=.env.local scripts/graduate.ts 15
async function main() {
  const batch = Number(process.argv[2]);
  if (!batch) throw new Error("Usage: graduate.ts <batch number>");
  await connectDB();

  const students: any[] = await Student.find({ batch }).lean();
  if (!students.length) { console.log("No students in that batch."); process.exit(0); }

  await Alumni.bulkWrite(students.map((s) => {
    const doc = Object.fromEntries(Object.entries({
      name: s.name, batch: s.batch, studentId: s.studentId, regNo: s.regNo,
      session: s.session, nameBn: s.nameBn, gender: s.gender, department: s.department,
      photo: s.photo, photoDriveUrl: s.photoDriveUrl, email: s.email, phone: s.phone,
      permanentAddress: s.address, dob: s.dob, isRegistered: s.isRegistered, uid: s.uid,
    }).filter(([, v]) => v !== "" && v != null));
    return { updateOne: { filter: { studentId: s.studentId }, update: { $set: doc }, upsert: true } };
  }));

  await Profile.updateMany({ batch, role: "student" }, { $set: { role: "alumni" } });
  await Student.deleteMany({ batch });
  console.log(`Moved ${students.length} students of batch ${batch} to alumni.`);
  process.exit(0);
}
main().catch((e) => { console.error(e); process.exit(1); });