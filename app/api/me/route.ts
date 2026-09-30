import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { verifyUser } from "@/lib/verifyUser";
import Alumni from "@/models/Alumni";
import Student from "@/models/Student";
import Profile from "@/models/Profile";

const DEPTS = ["AQC", "FBG", "FMN", "FST", "MFO"];
const GENDERS = ["Male", "Female", "Other"];

/* text fields and their max length */
const TEXT_COMMON: Record<string, number> = {
  nameBn: 120,
  presentStatus: 60,
  permanentAddress: 300,
  currentCity: 100,
  currentCountry: 100,
  bio: 1000,
};
const TEXT_ALUMNI: Record<string, number> = {
  degree: 100,
  currentPosition: 150,
  organization: 200,
  location: 200,
  testimonial: 1000,
};

async function findMine(uid: string) {
  const a = await Alumni.findOne({ uid });
  if (a) return { kind: "alumni" as const, rec: a, Model: Alumni };
  const s = await Student.findOne({ uid });
  if (s) return { kind: "student" as const, rec: s, Model: Student };
  return null;
}

export async function GET(req: Request) {
  const user = await verifyUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const mine = await findMine(user.uid);
  if (!mine) {
    return NextResponse.json({ error: "No linked profile", needsClaim: true }, { status: 404 });
  }
  return NextResponse.json({ kind: mine.kind, profile: mine.rec.toObject() });
}

export async function PUT(req: Request) {
  const user = await verifyUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const mine = await findMine(user.uid);
  if (!mine) return NextResponse.json({ error: "No linked profile" }, { status: 404 });

  const body = await req.json().catch(() => ({}));
  const str = (v: any, max = 300) => String(v ?? "").trim().slice(0, max);
  const bad = (msg: string) => NextResponse.json({ error: msg }, { status: 400 });

  const set: Record<string, any> = {};
  const unset: Record<string, 1> = {};

  /* plain text fields */
  const textFields = { ...TEXT_COMMON, ...(mine.kind === "alumni" ? TEXT_ALUMNI : {}) };
  for (const [key, max] of Object.entries(textFields)) {
    if (key in body) set[key] = str(body[key], max);
  }

  /* email */
  if ("email" in body) {
    const v = str(body.email, 200);
    if (v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return bad("Enter a valid email address");
    set.email = v;
  }

  /* phones */
  for (const key of ["phone", "altPhone"]) {
    if (key in body) {
      const v = str(body[key], 30).replace(/[\s\-()]/g, "");
      if (v && !/^\+?\d{10,15}$/.test(v)) {
        return bad(`${key === "phone" ? "Phone" : "Alternative phone"} number looks invalid`);
      }
      set[key] = v;
    }
  }

  /* date of birth */
  if ("dob" in body) {
    const v = str(body.dob, 10);
    if (v) {
      const d = new Date(v);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(v) || Number.isNaN(d.getTime()) || d > new Date() || d.getFullYear() < 1950) {
        return bad("Enter a valid date of birth");
      }
    }
    set.dob = v;
  }

  /* gender */
  if ("gender" in body) {
    const v = str(body.gender, 20);
    if (v && !GENDERS.includes(v)) return bad("Invalid gender");
    set.gender = v;
  }

  /* links */
  if ("linkedin" in body && mine.kind === "alumni") {
    let v = str(body.linkedin, 300);
    if (v && !/^https?:\/\//i.test(v)) v = "https://" + v;
    set.linkedin = v;
  }
  if ("photo" in body) {
    const v = str(body.photo, 500);
    if (v && !/^https?:\/\//i.test(v)) return bad("Photo must be a link starting with http");
    set.photo = v;
  }

  /* department (empty = remove) */
  if ("department" in body) {
    const v = str(body.department, 10);
    if (v === "") unset.department = 1;
    else if (DEPTS.includes(v)) set.department = v;
    else return bad("Invalid department");
  }

  /* achievements */
  if ("achievements" in body) {
    const raw = Array.isArray(body.achievements) ? body.achievements : String(body.achievements).split("\n");
    set.achievements = raw.map((x: any) => str(x, 300)).filter(Boolean).slice(0, 20);
  }

  /* student-only numbers */
  if (mine.kind === "student") {
    if ("semester" in body && body.semester !== "") {
      const n = Number(body.semester);
      if (Number.isNaN(n) || n < 1 || n > 12) return bad("Semester must be between 1 and 12");
      set.semester = n;
    }
    if ("cgpa" in body && body.cgpa !== "") {
      const n = Number(body.cgpa);
      if (Number.isNaN(n) || n < 0 || n > 4) return bad("CGPA must be between 0 and 4");
      set.cgpa = n;
    }
  }

  const update: any = { $set: set };
  if (Object.keys(unset).length) update.$unset = unset;

  const updated = await mine.Model.findByIdAndUpdate(mine.rec._id, update, {
    new: true,
    runValidators: true,
  });

  await Profile.updateOne({ uid: user.uid }, update);

  return NextResponse.json({ ok: true, profile: updated.toObject() });
}