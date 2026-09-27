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

const deptKeys = Object.keys(DEPARTMENTS) as Department[];

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

  const set = <K extends keyof Profile>(field: K, value: Profile[K]) => {
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

    setPreview(URL.createObjectURL(file));
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

      // Save photo immediately
      await axios.put("/api/profile", {
        ...profile,
        photo: url,
      });

      // Update AuthContext → Navbar + Sidebar
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
            className="h-40 animate-pulse rounded-2xl border border-white/[0.05] bg-white/[0.025]"
          />
        ))}
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] px-6 py-16 text-center backdrop-blur-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.05] text-cyan-300">
          <FaUser />
        </div>

        <h3 className="mt-5 font-display text-lg font-bold text-white">
          Profile not found
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          We could not load your profile information.
        </p>
      </div>
    );
  }

  const photoSrc = preview || profile.photo || null;

  return (
    <form onSubmit={handleSave} className="space-y-5">
      {/* =========================================================
          PROFILE HEADER / AVATAR
      ========================================================= */}
      <section className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.025] p-6 backdrop-blur-sm sm:p-7">
        {/* Accent */}
        <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-cyan-300/60 via-cyan-400/10 to-transparent" />

        {/* Glow */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full bg-cyan-400/[0.035] blur-[90px]" />

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
          {/* Avatar */}
          <div
            className="group relative h-24 w-24 shrink-0 cursor-pointer"
            onClick={handlePhotoClick}
          >
            {photoSrc ? (
              <Image
                key={photoSrc}
                src={photoSrc}
                alt={profile.name || "Profile photo"}
                width={96}
                height={96}
                className="h-24 w-24 rounded-2xl border border-white/[0.08] object-cover transition-all duration-300 group-hover:border-cyan-300/30"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.06] text-4xl font-bold text-cyan-300 transition-all duration-300 group-hover:border-cyan-300/30">
                {profile.name?.[0]?.toUpperCase() || "U"}
              </div>
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-black/65 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
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
              <div className="absolute bottom-0 left-0 right-0 h-1.5 overflow-hidden rounded-b-2xl bg-white/20">
                <div
                  className="h-full bg-cyan-300 transition-all duration-200"
                  style={{
                    width: `${uploadProgress}%`,
                  }}
                />
              </div>
            )}
          </div>

          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handlePhotoChange}
            className="hidden"
          />

          {/* User info */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-display text-xl font-bold text-white">
                {profile.name || "Your Name"}
              </h2>

              <span className="rounded-full border border-cyan-400/10 bg-cyan-400/[0.05] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-cyan-300">
                {profile.role || "User"}
              </span>
            </div>

            {profile.department && (
              <p className="mt-1 text-sm text-slate-400">
                {DEPARTMENTS[profile.department as Department]}
              </p>
            )}

            <p className="mt-1 flex items-center gap-2 text-xs text-slate-600">
              <FaEnvelope className="text-[9px]" />
              {profile.email}
            </p>

            <button
              type="button"
              onClick={handlePhotoClick}
              disabled={uploading}
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3.5 py-2 text-xs font-medium text-slate-400 transition-all hover:border-cyan-400/20 hover:bg-cyan-400/[0.04] hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
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

            <p className="mt-2 text-[10px] text-slate-700">
              JPG, PNG or WebP · Maximum 5MB
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          BASIC INFORMATION
      ========================================================= */}
      <section className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.025] p-6 backdrop-blur-sm sm:p-7">
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

          {/* Department intentionally hidden/disabled */}
          <div />
        </div>

        {/* Address */}
        <div className="mt-4">
          <Field
            label="Address"
            value={profile.address}
            onChange={(v) => set("address", v)}
            placeholder="Your address"
            icon={<FaMapMarkerAlt />}
          />
        </div>

        {/* Bio */}
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
        <section className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.025] p-6 backdrop-blur-sm sm:p-7">
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
              // icon={<FaBook />}
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

            <p className="mt-2 text-[10px] text-slate-700">
              Separate multiple research areas with commas.
            </p>
          </div>
        </section>
      )}

      {/* =========================================================
          STUDENT FIELDS
      ========================================================= */}
      {profile.role === "student" && (
        <section className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.025] p-6 backdrop-blur-sm sm:p-7">
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
        <section className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.025] p-6 backdrop-blur-sm sm:p-7">
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

          {/* Testimonial */}
          <div className="mt-4">
            <TextAreaField
              label="Testimonial"
              value={profile.testimonial}
              onChange={(v) => set("testimonial", v)}
              placeholder="Share your experience at PSTU Fisheries..."
              rows={4}
            />
          </div>

          {/* Achievements */}
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

            <p className="mt-2 text-[10px] text-slate-700">
              Separate multiple achievements with commas.
            </p>
          </div>
        </section>
      )}

      {/* =========================================================
          SAVE AREA
      ========================================================= */}
      <div className="flex flex-col gap-3 border-t border-white/[0.05] pt-5 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={saving || uploading}
          className="group inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-300/20 bg-cyan-400/[0.08] px-5 py-2.5 text-sm font-semibold text-cyan-200 transition-all duration-300 hover:border-cyan-300/30 hover:bg-cyan-400/[0.13] hover:text-cyan-100 disabled:cursor-not-allowed disabled:opacity-50"
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
          <p className="flex items-center gap-2 text-xs text-slate-500">
            <FaSpinner className="animate-spin text-cyan-300" />
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
      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.05] text-sm text-cyan-300">
        {icon}
      </div>

      <div>
        <p className="text-[9px] uppercase tracking-[0.2em] text-cyan-300/50">
          {eyebrow}
        </p>

        <h3 className="mt-0.5 font-display text-sm font-bold text-white">
          {title}
        </h3>
      </div>
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
      <label className="mb-1.5 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.1em] text-slate-500">
        {icon && <span className="text-[9px] text-slate-600">{icon}</span>}
        {label}
      </label>

      <input
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full rounded-xl
          border border-white/[0.07]
          bg-white/[0.025]
          px-4 py-2.5
          text-sm text-slate-200
          placeholder:text-slate-700
          outline-none
          transition-all duration-200
          focus:border-cyan-400/30
          focus:bg-cyan-400/[0.025]
          focus:ring-2
          focus:ring-cyan-400/[0.05]
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
      <label className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.1em] text-slate-500">
        {label}
      </label>

      <textarea
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="
          w-full resize-none rounded-xl
          border border-white/[0.07]
          bg-white/[0.025]
          px-4 py-3
          text-sm leading-relaxed text-slate-200
          placeholder:text-slate-700
          outline-none
          transition-all duration-200
          focus:border-cyan-400/30
          focus:bg-cyan-400/[0.025]
          focus:ring-2
          focus:ring-cyan-400/[0.05]
        "
      />
    </div>
  );
}