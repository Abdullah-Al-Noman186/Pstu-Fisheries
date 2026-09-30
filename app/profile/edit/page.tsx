"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import toast from "react-hot-toast";
import "@/lib/firebase";

import {
  FaArrowLeft,
  FaBriefcase,
  FaBuilding,
  FaCalendarAlt,
  FaCheckCircle,
  FaEnvelope,
  FaFish,
  FaGlobeAsia,
  FaGraduationCap,
  FaIdCard,
  FaInfoCircle,
  FaLink,
  FaMapMarkerAlt,
  FaPhone,
  FaRegAddressCard,
  FaSave,
  FaUser,
  FaUserGraduate,
} from "react-icons/fa";

/* =========================================================
   OPTIONS
========================================================= */

const DEPTS = [
  { v: "AQC", l: "Aquaculture (AQC)" },
  { v: "FBG", l: "Fish Biology & Genetics (FBG)" },
  { v: "FMN", l: "Fisheries Management (FMN)" },
  { v: "FST", l: "Fish Science & Technology (FST)" },
  { v: "MFO", l: "Marine Fisheries & Oceanography (MFO)" },
];

const GENDERS = ["Male", "Female", "Other"];

const STATUSES = [
  "Job holder",
  "Higher Study",
  "Job Seeker",
  "Business",
  "Running Student",
  "Running Students",
  "Other",
];

/* =========================================================
   TYPES
========================================================= */

type Profile = {
  batch_no: string | number;
  batch_session: string;
  id_no: string;
  reg_no: string;

  name: string;
  name_bn: string;

  degree: string;
  job_title: string;
  organization: string;
  location: string;

  contact: string;

  registered: boolean;

  photo: string;
  bio: string;
  linkedin: string;

  department: string;

  email: string;
  phone: string;

  current_city: string;
  current_country: string;

  gender: string;
  present_status: string;

  permanent_address: string;
  alt_phone: string;

  dob: string;

  serial_no: string;
  form_timestamp: string;
  username: string;
  status: string;

  achievementsText: string;

  [key: string]: any;
};

/* =========================================================
   DEFAULT PROFILE
========================================================= */

const EMPTY_PROFILE: Profile = {
  batch_no: "",
  batch_session: "",
  id_no: "",
  reg_no: "",

  name: "",
  name_bn: "",

  degree: "",
  job_title: "",
  organization: "",
  location: "",

  contact: "",

  registered: true,

  photo: "",
  bio: "",
  linkedin: "",

  department: "",

  email: "",
  phone: "",

  current_city: "",
  current_country: "",

  gender: "",
  present_status: "",

  permanent_address: "",
  alt_phone: "",

  dob: "",

  serial_no: "",
  form_timestamp: "",
  username: "",
  status: "",

  achievementsText: "",
};

/* =========================================================
   STYLES
========================================================= */

const inputCls =
  "w-full rounded-2xl border border-[#087EA4]/10 bg-[#F0FAFC]/65 px-4 py-3.5 text-sm text-[#123B4A] outline-none transition-all placeholder:text-[#55727D]/45 hover:border-[#087EA4]/20 focus:border-[#0891B2]/40 focus:bg-white focus:ring-4 focus:ring-[#0891B2]/[0.07]";

const labelCls =
  "mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#55727D]";

const cardCls =
  "rounded-[28px] border border-[#087EA4]/10 bg-white/90 shadow-[0_20px_70px_rgba(8,126,164,0.07)] backdrop-blur-xl";

/* =========================================================
   INPUT
========================================================= */

type InputProps = {
  p: Profile;
  set: (key: string, value: any) => void;
  k: string;
  label: string;
  placeholder?: string;
  type?: string;
  icon?: React.ReactNode;
};

function Input({
  p,
  set,
  k,
  label,
  placeholder,
  type = "text",
  icon,
}: InputProps) {
  return (
    <div>
      <label className={labelCls}>
        {icon}
        {label}
      </label>

      <input
        type={type}
        value={p[k] ?? ""}
        onChange={(e) => set(k, e.target.value)}
        placeholder={placeholder}
        className={inputCls}
      />
    </div>
  );
}

/* =========================================================
   SELECT
========================================================= */

type SelectProps = {
  p: Profile;
  set: (key: string, value: any) => void;
  k: string;
  label: string;
  options: { v: string; l: string }[];
  icon?: React.ReactNode;
};

function Select({
  p,
  set,
  k,
  label,
  options,
  icon,
}: SelectProps) {
  const current = p[k] ?? "";

  const list =
    current &&
    !options.some((option) => option.v === current)
      ? [...options, { v: current, l: current }]
      : options;

  return (
    <div>
      <label className={labelCls}>
        {icon}
        {label}
      </label>

      <select
        value={current}
        onChange={(e) => set(k, e.target.value)}
        className={inputCls}
      >
        <option value="">Select {label}</option>

        {list.map((option) => (
          <option key={option.v} value={option.v}>
            {option.l}
          </option>
        ))}
      </select>
    </div>
  );
}

/* =========================================================
   TEXTAREA
========================================================= */

type AreaProps = {
  p: Profile;
  set: (key: string, value: any) => void;
  k: string;
  label: string;
  rows?: number;
  placeholder?: string;
  icon?: React.ReactNode;
};

function Area({
  p,
  set,
  k,
  label,
  rows = 4,
  placeholder,
  icon,
}: AreaProps) {
  return (
    <div>
      <label className={labelCls}>
        {icon}
        {label}
      </label>

      <textarea
        rows={rows}
        value={p[k] ?? ""}
        onChange={(e) => set(k, e.target.value)}
        placeholder={placeholder}
        className={`${inputCls} resize-y`}
      />
    </div>
  );
}

/* =========================================================
   SECTION
========================================================= */

function Section({
  title,
  description,
  icon,
  children,
}: {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className={`${cardCls} overflow-hidden`}>
      <div className="border-b border-[#087EA4]/10 px-6 py-5 sm:px-8">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F0FAFC] text-[#087EA4]">
            {icon}
          </div>

          <div>
            <h2 className="text-sm font-bold text-[#123B4A]">
              {title}
            </h2>

            {description && (
              <p className="mt-1 text-xs leading-5 text-[#55727D]">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-5 p-6 sm:p-8">{children}</div>
    </section>
  );
}

/* =========================================================
   PROFILE PREVIEW
========================================================= */

function ProfilePreview({ p }: { p: Profile }) {
  const displayName = p.name || "Your Name";

  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((x) => x[0])
    .join("")
    .toUpperCase();

  return (
    <div className="sticky top-28">
      <div className={`${cardCls} overflow-hidden`}>
        {/* cover */}
        <div className="relative h-28 overflow-hidden bg-gradient-to-br from-[#075985] via-[#087EA4] to-[#0891B2]">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full border border-white/20" />
          <div className="absolute -bottom-16 -left-8 h-32 w-32 rounded-full border border-white/10" />

          <div className="absolute left-5 top-5 flex items-center gap-2 text-white/90">
            <FaFish />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
              PSTU Fisheries
            </span>
          </div>
        </div>

        <div className="px-6 pb-6">
          {/* profile photo */}
          <div className="-mt-12 mb-4 flex items-end justify-between">
            {p.photo ? (
              <img
                src={p.photo}
                alt={displayName}
                className="h-24 w-24 rounded-3xl border-4 border-white object-cover shadow-xl"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-white bg-[#F0FAFC] text-xl font-bold text-[#087EA4] shadow-xl">
                {initials || <FaUser />}
              </div>
            )}

            {p.present_status && (
              <span className="mb-1 rounded-full bg-[#E8FBF7] px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-[#087EA4]">
                {p.present_status}
              </span>
            )}
          </div>

          <h3 className="text-xl font-bold text-[#123B4A]">
            {displayName}
          </h3>

          {p.name_bn && (
            <p className="mt-1 text-sm text-[#55727D]">
              {p.name_bn}
            </p>
          )}

          {p.job_title && (
            <p className="mt-4 text-sm font-semibold text-[#087EA4]">
              {p.job_title}
            </p>
          )}

          {p.organization && (
            <p className="mt-1 flex items-start gap-2 text-xs leading-5 text-[#55727D]">
              <FaBuilding className="mt-0.5 shrink-0" />
              {p.organization}
            </p>
          )}

          {p.location && (
            <p className="mt-2 flex items-start gap-2 text-xs leading-5 text-[#55727D]">
              <FaMapMarkerAlt className="mt-0.5 shrink-0" />
              {p.location}
            </p>
          )}

          <div className="my-5 h-px bg-[#087EA4]/10" />

          <div className="grid grid-cols-2 gap-2">
            <PreviewItem
              label="Batch"
              value={String(p.batch_no || "—")}
            />

            <PreviewItem
              label="Session"
              value={p.batch_session || "—"}
            />

            <PreviewItem
              label="Student ID"
              value={p.id_no || "—"}
            />

            <PreviewItem
              label="Reg No"
              value={p.reg_no || "—"}
            />
          </div>

          {p.department && (
            <div className="mt-4 rounded-2xl bg-[#F0FAFC] p-4">
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#55727D]/70">
                Department
              </p>

              <p className="mt-1 text-sm font-semibold text-[#123B4A]">
                {DEPTS.find((d) => d.v === p.department)?.l ||
                  p.department}
              </p>
            </div>
          )}

          {p.email && (
            <div className="mt-4 flex items-center gap-3 text-xs text-[#55727D]">
              <FaEnvelope className="text-[#0891B2]" />
              <span className="truncate">{p.email}</span>
            </div>
          )}

          {p.phone && (
            <div className="mt-2 flex items-center gap-3 text-xs text-[#55727D]">
              <FaPhone className="text-[#0891B2]" />
              <span>{p.phone}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   PREVIEW ITEM
========================================================= */

function PreviewItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-[#087EA4]/10 bg-[#F0FAFC]/70 p-3">
      <p className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#55727D]/70">
        {label}
      </p>

      <p className="mt-1 truncate text-xs font-semibold text-[#123B4A]">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function EditProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [p, setP] = useState<Profile | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* -----------------------------------------
     LOAD PROFILE
  ----------------------------------------- */

  useEffect(() => {
    const unsub = onAuthStateChanged(
      getAuth(),
      async (u) => {
        if (!u) {
          router.replace("/login");
          return;
        }

        try {
          setUser(u);

          const token = await u.getIdToken();

          const res = await fetch("/api/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await res.json().catch(() => ({}));

          if (res.status === 404) {
            toast.error(
              "Link your profile first with your Student ID and Reg No."
            );

            router.replace("/login?tab=claim");
            return;
          }

          if (!res.ok) {
            throw new Error(
              data.error || "Could not load profile"
            );
          }

          const profile = {
            ...EMPTY_PROFILE,
            ...(data.profile || {}),
          };

          profile.achievementsText = Array.isArray(
            data.profile?.achievements
          )
            ? data.profile.achievements.join("\n")
            : data.profile?.achievementsText || "";

          setP(profile);
        } catch (error: any) {
          toast.error(
            error?.message || "Could not load profile"
          );
        } finally {
          setLoading(false);
        }
      }
    );

    return () => unsub();
  }, [router]);

  /* -----------------------------------------
     SET FIELD
  ----------------------------------------- */

  const set = (key: string, value: any) => {
    setP((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        [key]: value,
      };
    });
  };

  /* -----------------------------------------
     SAVE
  ----------------------------------------- */

  const save = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !p) return;

    setSaving(true);

    try {
      const token = await user.getIdToken();

      const body = {
        ...p,

        achievements: (p.achievementsText || "")
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
      };

      delete body.achievementsText;

      const res = await fetch("/api/me", {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(body),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Save failed");
      }

      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  /* -----------------------------------------
     LOADING
  ----------------------------------------- */

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F0FAFC] px-6 pt-28">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 animate-pulse items-center justify-center rounded-2xl bg-white text-[#087EA4] shadow-lg">
            <FaFish />
          </div>

          <p className="mt-4 text-sm font-medium text-[#55727D]">
            Loading your profile...
          </p>
        </div>
      </main>
    );
  }

  if (!p) return null;

  const f = { p, set };

  const departmentName =
    DEPTS.find((d) => d.v === p.department)?.l ||
    p.department ||
    "Department not selected";

  return (
    <main className="min-h-screen bg-[#F0FAFC] px-4 pb-20 pt-28 sm:px-6">
      {/* background decoration */}
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute -left-32 top-32 h-80 w-80 rounded-full bg-[#2DD4BF]/10 blur-3xl" />
        <div className="absolute -right-32 top-96 h-96 w-96 rounded-full bg-[#0891B2]/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* =========================================
            TOP BAR
        ========================================= */}

        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <button
              type="button"
              onClick={() => router.back()}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#087EA4]/10 bg-white px-4 py-2 text-xs font-semibold text-[#55727D] shadow-sm transition hover:border-[#087EA4]/20 hover:text-[#087EA4]"
            >
              <FaArrowLeft />
              Back
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#087EA4] text-white shadow-[0_10px_25px_rgba(8,126,164,0.18)]">
                <FaUser />
              </div>

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#0891B2]">
                  Faculty of Fisheries
                </p>

                <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#123B4A] sm:text-3xl">
                  Edit your profile
                </h1>
              </div>
            </div>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#55727D]">
              Keep your Faculty profile complete and up to date.
              All profile information can be edited here.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-[#087EA4]/10 bg-white px-4 py-3 shadow-sm">
            <FaCheckCircle className="text-[#0891B2]" />

            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#55727D]/70">
                Profile status
              </p>

              <p className="text-xs font-semibold text-[#123B4A]">
                {p.registered ? "Registered" : "Not registered"}
              </p>
            </div>
          </div>
        </div>

        {/* =========================================
            PROFILE SUMMARY
        ========================================= */}

        <div className="mb-8 overflow-hidden rounded-[30px] border border-[#087EA4]/10 bg-white shadow-[0_20px_70px_rgba(8,126,164,0.07)]">
          <div className="relative overflow-hidden bg-gradient-to-r from-[#075985] via-[#087EA4] to-[#0891B2] px-6 py-7 text-white sm:px-8">
            <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full border border-white/10" />
            <div className="absolute -bottom-24 left-1/3 h-52 w-52 rounded-full border border-white/10" />

            <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/65">
                  Profile identity
                </p>

                <h2 className="mt-2 text-xl font-bold">
                  {p.name || "Your name"}
                </h2>

                <p className="mt-1 text-sm text-white/75">
                  {departmentName}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                <SummaryBox
                  label="Batch"
                  value={String(p.batch_no || "—")}
                />

                <SummaryBox
                  label="Session"
                  value={p.batch_session || "—"}
                />

                <SummaryBox
                  label="Student ID"
                  value={p.id_no || "—"}
                />

                <SummaryBox
                  label="Reg No"
                  value={p.reg_no || "—"}
                />
              </div>
            </div>
          </div>
        </div>

        {/* =========================================
            MAIN GRID
        ========================================= */}

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_330px]">
          {/* =====================================
              FORM
          ===================================== */}

          <form onSubmit={save} className="space-y-7">
            {/* =====================================
                IDENTITY
            ===================================== */}

            <Section
              title="Identity & academic record"
              description="These values identify your official Faculty record."
              icon={<FaIdCard />}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Input
                  {...f}
                  k="batch_no"
                  label="Batch number"
                  placeholder="e.g. 19"
                  icon={<FaGraduationCap />}
                />

                <Input
                  {...f}
                  k="batch_session"
                  label="Batch session"
                  placeholder="e.g. 2025-26"
                  icon={<FaCalendarAlt />}
                />

                <Input
                  {...f}
                  k="id_no"
                  label="Student ID"
                  placeholder="e.g. 2504068"
                  icon={<FaIdCard />}
                />

                <Input
                  {...f}
                  k="reg_no"
                  label="Registration number"
                  placeholder="e.g. 13728"
                  icon={<FaRegAddressCard />}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Input
                  {...f}
                  k="name"
                  label="Full name"
                  placeholder="Your full name"
                  icon={<FaUser />}
                />

                <Input
                  {...f}
                  k="name_bn"
                  label="Name in Bengali"
                  placeholder="আপনার নাম"
                  icon={<FaUser />}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Select
                  {...f}
                  k="department"
                  label="Department"
                  options={DEPTS}
                  icon={<FaFish />}
                />

                <Select
                  {...f}
                  k="present_status"
                  label="Present status"
                  options={STATUSES.map((status) => ({
                    v: status,
                    l: status,
                  }))}
                  icon={<FaUserGraduate />}
                />
              </div>
            </Section>

            {/* =====================================
                PERSONAL
            ===================================== */}

            <Section
              title="Personal information"
              description="Basic personal information displayed on your Faculty profile."
              icon={<FaUser />}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Select
                  {...f}
                  k="gender"
                  label="Gender"
                  options={GENDERS.map((gender) => ({
                    v: gender,
                    l: gender,
                  }))}
                  icon={<FaUser />}
                />

                <Input
                  {...f}
                  k="dob"
                  label="Date of birth"
                  type="date"
                  icon={<FaCalendarAlt />}
                />
              </div>

              <Area
                {...f}
                k="bio"
                label="Short bio"
                rows={5}
                placeholder="Write a short introduction about yourself, your academic interests, career, research or professional background..."
                icon={<FaInfoCircle />}
              />
            </Section>

            {/* =====================================
                CONTACT
            ===================================== */}

            <Section
              title="Contact information"
              description="Your communication and contact details."
              icon={<FaPhone />}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Input
                  {...f}
                  k="email"
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  icon={<FaEnvelope />}
                />

                <Input
                  {...f}
                  k="phone"
                  label="Phone"
                  placeholder="01XXXXXXXXX"
                  icon={<FaPhone />}
                />

                <Input
                  {...f}
                  k="alt_phone"
                  label="Alternative phone"
                  placeholder="01XXXXXXXXX"
                  icon={<FaPhone />}
                />

                <Input
                  {...f}
                  k="contact"
                  label="Other contact"
                  placeholder="Optional contact information"
                  icon={<FaPhone />}
                />
              </div>

              <Input
                {...f}
                k="permanent_address"
                label="Permanent address"
                placeholder="Village, Upazila, District"
                icon={<FaMapMarkerAlt />}
              />
            </Section>

            {/* =====================================
                CAREER / ACADEMIC
            ===================================== */}

            <Section
              title="Academic & professional"
              description="Your degree, career position and professional affiliation."
              icon={<FaBriefcase />}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Input
                  {...f}
                  k="degree"
                  label="Degree"
                  placeholder="e.g. BSc, MS, PhD"
                  icon={<FaGraduationCap />}
                />

                <Input
                  {...f}
                  k="job_title"
                  label="Job title"
                  placeholder="e.g. Associate Professor"
                  icon={<FaBriefcase />}
                />
              </div>

              <Input
                {...f}
                k="organization"
                label="Organization"
                placeholder="University, company, research institute..."
                icon={<FaBuilding />}
              />

              <Input
                {...f}
                k="location"
                label="Workplace / department / current location"
                placeholder="e.g. Dept. of Marine Fisheries and Oceanography"
                icon={<FaMapMarkerAlt />}
              />
            </Section>

            {/* =====================================
                CURRENT LOCATION
            ===================================== */}

            <Section
              title="Current location"
              description="Where you currently live or are based."
              icon={<FaGlobeAsia />}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Input
                  {...f}
                  k="current_city"
                  label="Current city"
                  placeholder="e.g. Dhaka"
                  icon={<FaMapMarkerAlt />}
                />

                <Input
                  {...f}
                  k="current_country"
                  label="Current country"
                  placeholder="e.g. Bangladesh"
                  icon={<FaGlobeAsia />}
                />
              </div>
            </Section>

            {/* =====================================
                PHOTO / SOCIAL
            ===================================== */}

            <Section
              title="Photo & social profile"
              description="Links used to display your profile and professional presence."
              icon={<FaLink />}
            >
              <Input
                {...f}
                k="photo"
                label="Profile photo URL"
                placeholder="https://..."
                icon={<FaUser />}
              />

              <Input
                {...f}
                k="linkedin"
                label="LinkedIn profile"
                placeholder="https://linkedin.com/in/..."
                icon={<FaLink />}
              />
            </Section>

            {/* =====================================
                ACHIEVEMENTS
            ===================================== */}

            <Section
              title="Achievements"
              description="Add academic, professional, research or extracurricular achievements."
              icon={<FaCheckCircle />}
            >
              <Area
                {...f}
                k="achievementsText"
                label="Achievements"
                rows={6}
                placeholder={`BSc in Fisheries
Dean's Award
Research publication
University scholarship`}
                icon={<FaCheckCircle />}
              />
            </Section>

            {/* =====================================
                SYSTEM INFORMATION
            ===================================== */}

            <Section
              title="Account & record information"
              description="These fields are also editable as requested. They are kept separate because they are system/data-record fields."
              icon={<FaRegAddressCard />}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Input
                  {...f}
                  k="serial_no"
                  label="Serial number"
                  placeholder="Optional"
                />

                <Input
                  {...f}
                  k="username"
                  label="Username"
                  placeholder="Username / email"
                />

                <Input
                  {...f}
                  k="status"
                  label="Record status"
                  placeholder="e.g. alumni / current_student"
                />

                <Input
                  {...f}
                  k="form_timestamp"
                  label="Form timestamp"
                  placeholder="YYYY/MM/DD..."
                />
              </div>

              <div className="rounded-2xl border border-[#087EA4]/10 bg-[#F0FAFC] p-4">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={Boolean(p.registered)}
                    onChange={(e) =>
                      set("registered", e.target.checked)
                    }
                    className="h-4 w-4 rounded border-[#087EA4]/20 text-[#087EA4] focus:ring-[#0891B2]"
                  />

                  <span>
                    <span className="block text-xs font-semibold text-[#123B4A]">
                      Registered profile
                    </span>

                    <span className="mt-0.5 block text-[11px] text-[#55727D]">
                      Indicates whether this profile has been registered.
                    </span>
                  </span>
                </label>
              </div>
            </Section>

            {/* =====================================
                SAVE
            ===================================== */}

            <div className="sticky bottom-4 z-20">
              <div className="rounded-2xl border border-[#087EA4]/10 bg-white/90 p-3 shadow-[0_15px_50px_rgba(8,126,164,0.14)] backdrop-blur-xl">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#087EA4] px-6 py-4 text-sm font-bold text-white shadow-[0_10px_30px_rgba(8,126,164,0.2)] transition-all hover:bg-[#075985] hover:shadow-[0_14px_35px_rgba(8,126,164,0.25)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Saving changes...
                    </>
                  ) : (
                    <>
                      <FaSave />
                      Save profile changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* =====================================
              LIVE PREVIEW
          ===================================== */}

          <aside className="hidden lg:block">
            <ProfilePreview p={p} />
          </aside>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   SUMMARY BOX
========================================================= */

function SummaryBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-[90px] rounded-xl border border-white/15 bg-white/10 px-3 py-2.5 backdrop-blur-md">
      <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-white/55">
        {label}
      </p>

      <p className="mt-1 truncate text-xs font-bold text-white">
        {value}
      </p>
    </div>
  );
}