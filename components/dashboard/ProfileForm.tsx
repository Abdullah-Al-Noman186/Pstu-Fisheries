
"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { DEPARTMENTS, Department } from "@/types";
import {
  FaSave,
  FaUser,
  FaCamera,
  FaSpinner,
  FaGraduationCap,
  FaFlask,
  FaUsers,
  FaBriefcase,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaIdCard,
} from "react-icons/fa";
import Image from "next/image";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { useAuth } from "@/contexts/AuthContext";

interface Profile {
  name?: string;
  email?: string;
  role?: string;
  department?: Department;
  phone?: string;
  address?: string;
  bio?: string;
  photo?: string;

  designation?: string;
  joinYear?: number;
  publications?: number;
  researchAreas?: string[];

  studentId?: string;
  batch?: number;
  semester?: number;
  cgpa?: number;

  currentPosition?: string;
  organization?: string;
  location?: string;
  linkedin?: string;
  testimonial?: string;
  achievements?: string[];
}

const roleStyles: Record<
  string,
  {
    text: string;
    bg: string;
    border: string;
  }
> = {
  admin: {
    text: "text-[#C2415B]",
    bg: "bg-[#C2415B]/[0.07]",
    border: "border-[#C2415B]/15",
  },
  teacher: {
    text: "text-[#087EA4]",
    bg: "bg-[#0891B2]/[0.08]",
    border: "border-[#0891B2]/18",
  },
  student: {
    text: "text-[#6D5CC6]",
    bg: "bg-[#8B7ED8]/[0.08]",
    border: "border-[#8B7ED8]/18",
  },
  alumni: {
    text: "text-[#A16207]",
    bg: "bg-[#F59E0B]/[0.08]",
    border: "border-[#F59E0B]/18",
  },
};

export default function ProfileForm() {
  const { refreshUser } = useAuth();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    axios
      .get("/api/profile")
      .then(({ data }) => {
        if (data.success) {
          setProfile(data.data);
        }
      })
      .catch(() => {
        toast.error("Failed to load profile.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const set = <K extends keyof Profile>(
    field: K,
    value: Profile[K]
  ) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePhotoClick = () => {
    fileRef.current?.click();
  };

  const handlePhotoChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Select an image file.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Maximum image size is 5MB.");
      e.target.value = "";
      return;
    }

    const localPreview = URL.createObjectURL(file);

    setPreview(localPreview);
    setUploading(true);
    setUploadProgress(0);

    const timer = setInterval(() => {
      setUploadProgress((p) => (p < 85 ? p + 10 : p));
    }, 200);

    try {
      const url = await uploadToCloudinary(file);

      clearInterval(timer);

      setUploadProgress(100);
      setPreview(url);
      set("photo", url);

      await axios.put("/api/profile", {
        ...profile,
        photo: url,
      });

      await refreshUser();

      toast.success("Profile photo updated.");
    } catch {
      clearInterval(timer);

      toast.error("Photo upload failed.");
      setPreview(null);
    } finally {
      setUploading(false);

      setTimeout(() => {
        setUploadProgress(0);
      }, 300);

      URL.revokeObjectURL(localPreview);
    }

    e.target.value = "";
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!profile) return;

    setSaving(true);

    try {
      await axios.put("/api/profile", profile);

      await refreshUser();

      toast.success("Profile saved successfully.");
    } catch {
      toast.error("Failed to save profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-5">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-40 animate-pulse rounded-[24px] border border-[#087EA4]/10 bg-white/70"
          />
        ))}
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="relative overflow-hidden rounded-[24px] border border-[#087EA4]/10 bg-white/80 px-6 py-16 text-center shadow-[0_15px_45px_rgba(8,126,164,0.06)] backdrop-blur-xl">
        <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#2DD4BF]/10 blur-[70px]" />

        <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#0891B2]/15 bg-[#0891B2]/[0.08] text-[#087EA4]">
          <FaUser />
        </div>

        <h3 className="relative mt-5 font-display text-lg font-bold text-[#123B4A]">
          Profile not found
        </h3>

        <p className="relative mt-2 text-sm text-[#55727D]">
          We could not load your profile information.
        </p>
      </div>
    );
  }

  const photoSrc = preview || profile.photo || null;

  const currentRoleStyle =
    roleStyles[profile.role || ""] || {
      text: "text-[#087EA4]",
      bg: "bg-[#0891B2]/[0.08]",
      border: "border-[#0891B2]/15",
    };

  return (
    <form onSubmit={handleSave} className="space-y-5">
      {/* =========================================================
          PROFILE HEADER
      ========================================================= */}
      <section className="relative overflow-hidden rounded-[26px] border border-[#087EA4]/10 bg-white/80 p-6 shadow-[0_15px_45px_rgba(8,126,164,0.06)] backdrop-blur-xl sm:p-7">
        <div className="pointer-events-none absolute -right-28 -top-28 h-64 w-64 rounded-full bg-[#0891B2]/[0.07] blur-[90px]" />

        <div className="pointer-events-none absolute -bottom-28 left-1/3 h-52 w-52 rounded-full bg-[#2DD4BF]/[0.05] blur-[80px]" />

        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#075985] via-[#087EA4] to-[#2DD4BF]" />

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
          {/* Avatar */}
          <div
            className="group relative h-28 w-28 shrink-0 cursor-pointer"
            onClick={handlePhotoClick}
          >
            {photoSrc ? (
              <div className="relative h-28 w-28 overflow-hidden rounded-[24px] border border-[#087EA4]/15 bg-[#F0FAFC] shadow-[0_12px_30px_rgba(8,126,164,0.10)]">
                <Image
                  key={photoSrc}
                  src={photoSrc}
                  alt={profile.name || "Profile photo"}
                  fill
                  sizes="112px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#123B4A]/25 to-transparent" />
              </div>
            ) : (
              <div className="flex h-28 w-28 items-center justify-center rounded-[24px] border border-[#0891B2]/15 bg-[#0891B2]/[0.08] text-4xl font-bold text-[#087EA4] shadow-[0_12px_30px_rgba(8,126,164,0.08)]">
                {profile.name?.[0]?.toUpperCase() || "U"}
              </div>
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-[24px] bg-[#123B4A]/65 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              {uploading ? (
                <>
                  <FaSpinner className="mb-1 animate-spin text-lg text-white" />
                  <span className="text-[10px] font-bold text-white">
                    {uploadProgress}%
                  </span>
                </>
              ) : (
                <>
                  <FaCamera className="mb-1 text-lg text-white" />
                  <span className="text-[10px] font-semibold text-white">
                    Change
                  </span>
                </>
              )}
            </div>

            {/* Upload progress */}
            {uploading && (
              <div className="absolute bottom-0 left-0 right-0 h-1.5 overflow-hidden rounded-b-[24px] bg-white/50">
                <div
                  className="h-full bg-[#2DD4BF] transition-all duration-200"
                  style={{
                    width: `${uploadProgress}%`,
                  }}
                />
              </div>
            )}

            <span className="absolute -bottom-1.5 -right-1.5 flex h-8 w-8 items-center justify-center rounded-xl border-4 border-white bg-[#087EA4] text-white shadow-lg">
              <FaCamera size={11} />
            </span>
          </div>

          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handlePhotoChange}
            className="hidden"
          />

          {/* User information */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-display text-xl font-bold tracking-tight text-[#123B4A] sm:text-2xl">
                {profile.name || "Your Name"}
              </h2>

              <span
                className={`rounded-full border ${currentRoleStyle.border} ${currentRoleStyle.bg} px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.13em] ${currentRoleStyle.text}`}
              >
                {profile.role || "User"}
              </span>
            </div>

            {profile.department && (
              <p className="mt-1.5 text-sm font-medium text-[#55727D]">
                {DEPARTMENTS[profile.department as Department]}
              </p>
            )}

            <p className="mt-1.5 flex items-center gap-2 text-xs text-[#55727D]/75">
              <FaEnvelope className="text-[9px] text-[#087EA4]" />
              {profile.email}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handlePhotoClick}
                disabled={uploading}
                className="inline-flex items-center gap-2 rounded-xl border border-[#087EA4]/15 bg-[#087EA4]/[0.06] px-3.5 py-2 text-xs font-semibold text-[#087EA4] transition-all duration-300 hover:border-[#087EA4]/25 hover:bg-[#087EA4]/[0.10] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {uploading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Uploading {uploadProgress}%
                  </>
                ) : (
                  <>
                    <FaCamera />
                    {photoSrc ? "Change Photo" : "Upload Photo"}
                  </>
                )}
              </button>

              <span className="text-[10px] text-[#55727D]/60">
                JPG, PNG or WebP · Maximum 5MB
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          BASIC INFORMATION
      ========================================================= */}
      <section className="relative overflow-hidden rounded-[24px] border border-[#087EA4]/10 bg-white/80 p-6 shadow-[0_12px_40px_rgba(8,126,164,0.045)] backdrop-blur-xl sm:p-7">
        <SectionHeader
          icon={<FaUser />}
          eyebrow="Personal details"
          title="Basic Information"
        />

        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="Full Name"
            value={profile.name}
            onChange={(v) => set("name", v)}
            icon={<FaUser />}
          />

          <Field
            label="Email"
            value={profile.email}
            onChange={(v) => set("email", v)}
            type="email"
            icon={<FaEnvelope />}
          />

          <Field
            label="Phone"
            value={profile.phone}
            onChange={(v) => set("phone", v)}
            placeholder="+880 XXXXXXXXXX"
            icon={<FaPhone />}
          />

          <div />
        </div>

        <div className="mt-4">
          <Field
            label="Address"
            value={profile.address}
            onChange={(v) => set("address", v)}
            placeholder="Your address"
            icon={<FaMapMarkerAlt />}
          />
        </div>

        <div className="mt-4">
          <TextAreaField
            label="Bio"
            value={profile.bio}
            onChange={(v) => set("bio", v)}
            placeholder="A short bio about yourself..."
            rows={4}
          />
        </div>
      </section>

      {/* =========================================================
          TEACHER FIELDS
      ========================================================= */}
      {profile.role === "teacher" && (
        <section className="relative overflow-hidden rounded-[24px] border border-[#0891B2]/12 bg-white/80 p-6 shadow-[0_12px_40px_rgba(8,126,164,0.045)] backdrop-blur-xl sm:p-7">
          <SectionHeader
            icon={<FaFlask />}
            eyebrow="Faculty profile"
            title="Academic Information"
          />

          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="Designation"
              value={profile.designation}
              onChange={(v) => set("designation", v)}
              placeholder="e.g. Professor"
              icon={<FaGraduationCap />}
            />

            <Field
              label="Join Year"
              value={profile.joinYear}
              onChange={(v) =>
                set("joinYear", v ? Number(v) : undefined)
              }
              type="number"
              placeholder="e.g. 2010"
            />

            <Field
              label="Publications"
              value={profile.publications}
              onChange={(v) =>
                set("publications", v ? Number(v) : undefined)
              }
              type="number"
              placeholder="Number of papers"
            />
          </div>

          <div className="mt-4">
            <TextField
              label="Research Areas"
              value={
                Array.isArray(profile.researchAreas)
                  ? profile.researchAreas.join(", ")
                  : ""
              }
              onChange={(v) =>
                set(
                  "researchAreas",
                  v
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean)
                )
              }
              placeholder="e.g. Aquaculture, Genetics, Marine Biology"
            />

            <p className="mt-2 text-[10px] text-[#55727D]/60">
              Separate multiple research areas with commas.
            </p>
          </div>
        </section>
      )}

      {/* =========================================================
          STUDENT FIELDS
      ========================================================= */}
      {profile.role === "student" && (
        <section className="relative overflow-hidden rounded-[24px] border border-[#8B7ED8]/12 bg-white/80 p-6 shadow-[0_12px_40px_rgba(8,126,164,0.045)] backdrop-blur-xl sm:p-7">
          <SectionHeader
            icon={<FaGraduationCap />}
            eyebrow="Academic profile"
            title="Student Information"
          />

          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="Student ID"
              value={profile.studentId}
              onChange={(v) => set("studentId", v)}
              placeholder="e.g. 2021331001"
              icon={<FaIdCard />}
            />

            <Field
              label="Batch Year"
              value={profile.batch}
              onChange={(v) =>
                set("batch", v ? Number(v) : undefined)
              }
              type="number"
              placeholder="e.g. 2021"
            />

            <Field
              label="Semester"
              value={profile.semester}
              onChange={(v) =>
                set("semester", v ? Number(v) : undefined)
              }
              type="number"
              placeholder="1–8"
            />

            <Field
              label="CGPA"
              value={profile.cgpa}
              onChange={(v) =>
                set("cgpa", v ? Number(v) : undefined)
              }
              type="number"
              placeholder="e.g. 3.75"
            />
          </div>
        </section>
      )}

      {/* =========================================================
          ALUMNI FIELDS
      ========================================================= */}
      {profile.role === "alumni" && (
        <section className="relative overflow-hidden rounded-[24px] border border-[#F59E0B]/12 bg-white/80 p-6 shadow-[0_12px_40px_rgba(8,126,164,0.045)] backdrop-blur-xl sm:p-7">
          <SectionHeader
            icon={<FaUsers />}
            eyebrow="Alumni profile"
            title="Alumni Information"
          />

          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="Current Position"
              value={profile.currentPosition}
              onChange={(v) => set("currentPosition", v)}
              placeholder="e.g. Senior Scientist"
              icon={<FaBriefcase />}
            />

            <Field
              label="Organization"
              value={profile.organization}
              onChange={(v) => set("organization", v)}
              placeholder="e.g. BFRI"
            />

            <Field
              label="Location"
              value={profile.location}
              onChange={(v) => set("location", v)}
              placeholder="e.g. Dhaka, Bangladesh"
              icon={<FaMapMarkerAlt />}
            />

            <Field
              label="LinkedIn URL"
              value={profile.linkedin}
              onChange={(v) => set("linkedin", v)}
              placeholder="https://linkedin.com/in/..."
              type="url"
            />

            <Field
              label="Batch Year"
              value={profile.batch}
              onChange={(v) =>
                set("batch", v ? Number(v) : undefined)
              }
              type="number"
              placeholder="e.g. 2015"
            />
          </div>

          <div className="mt-4">
            <TextAreaField
              label="Testimonial"
              value={profile.testimonial}
              onChange={(v) => set("testimonial", v)}
              placeholder="Share your experience at PSTU Fisheries..."
              rows={4}
            />
          </div>

          <div className="mt-4">
            <TextField
              label="Achievements"
              value={
                Array.isArray(profile.achievements)
                  ? profile.achievements.join(", ")
                  : ""
              }
              onChange={(v) =>
                set(
                  "achievements",
                  v
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean)
                )
              }
              placeholder="e.g. National Award 2022, Best Researcher 2023"
            />

            <p className="mt-2 text-[10px] text-[#55727D]/60">
              Separate multiple achievements with commas.
            </p>
          </div>
        </section>
      )}

      {/* =========================================================
          SAVE AREA
      ========================================================= */}
      <div className="flex flex-col gap-3 border-t border-[#087EA4]/10 pt-5 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={saving || uploading}
          className="group inline-flex items-center justify-center gap-2 rounded-xl border border-[#087EA4]/20 bg-[#087EA4] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(8,126,164,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#075985] hover:shadow-[0_12px_30px_rgba(8,126,164,0.20)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? (
            <>
              <FaSpinner className="animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <FaSave className="transition-transform group-hover:scale-110" />
              Save Profile
            </>
          )}
        </button>

        {uploading && (
          <p className="flex items-center gap-2 text-xs text-[#55727D]">
            <FaSpinner className="animate-spin text-[#087EA4]" />
            Uploading photo... {uploadProgress}%
          </p>
        )}
      </div>
    </form>
  );
}

/* =============================================================
   SECTION HEADER
============================================================= */

function SectionHeader({
  icon,
  eyebrow,
  title,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="relative mb-6 flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#0891B2]/15 bg-[#0891B2]/[0.08] text-sm text-[#087EA4]">
        {icon}
      </div>

      <div>
        <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#087EA4]/65">
          {eyebrow}
        </p>

        <h3 className="mt-0.5 font-display text-sm font-bold text-[#123B4A] sm:text-base">
          {title}
        </h3>
      </div>

      <div className="ml-2 h-px flex-1 bg-gradient-to-r from-[#087EA4]/12 to-transparent" />
    </div>
  );
}

/* =============================================================
   TEXT INPUT
============================================================= */

function TextField({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  icon,
}: {
  label: string;
  value?: string | number;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#55727D]">
        {icon && (
          <span className="text-[9px] text-[#087EA4]/70">
            {icon}
          </span>
        )}

        {label}
      </label>

      <input
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full rounded-xl
          border border-[#087EA4]/12
          bg-[#F0FAFC]/65
          px-4 py-2.5
          text-sm text-[#123B4A]
          placeholder:text-[#55727D]/45
          outline-none
          transition-all duration-200
          focus:border-[#087EA4]/35
          focus:bg-white
          focus:ring-4
          focus:ring-[#0891B2]/[0.07]
        "
      />
    </div>
  );
}

/* =============================================================
   FIELD ALIAS
============================================================= */

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  icon,
}: {
  label: string;
  value?: string | number;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  icon?: React.ReactNode;
}) {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      icon={icon}
    />
  );
}

/* =============================================================
   TEXTAREA
============================================================= */

function TextAreaField({
  label,
  value,
  onChange,
  placeholder = "",
  rows = 4,
}: {
  label: string;
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.1em] text-[#55727D]">
        {label}
      </label>

      <textarea
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="
          w-full resize-none rounded-xl
          border border-[#087EA4]/12
          bg-[#F0FAFC]/65
          px-4 py-3
          text-sm leading-relaxed text-[#123B4A]
          placeholder:text-[#55727D]/45
          outline-none
          transition-all duration-200
          focus:border-[#087EA4]/35
          focus:bg-white
          focus:ring-4
          focus:ring-[#0891B2]/[0.07]
        "
      />
    </div>
  );
}

