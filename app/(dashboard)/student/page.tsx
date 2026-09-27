
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { DEPARTMENTS, Department } from "@/types";
import {
  FaIdCard,
  FaLayerGroup,
  FaGraduationCap,
  FaChartLine,
  FaUser,
  FaEnvelope,
  FaBuilding,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

interface StudentProfile {
  studentId?: string;
  batch?: string | number;
  semester?: string | number;
  cgpa?: string | number;
  name?: string;
  email?: string;
  department?: Department;
  phone?: string;
  address?: string;
}

const statStyles = [
  {
    icon: <FaIdCard />,
    color:
      "border-[#0891B2]/20 bg-[#0891B2]/[0.08] text-[#087EA4]",
  },
  {
    icon: <FaLayerGroup />,
    color:
      "border-[#8B7ED8]/20 bg-[#8B7ED8]/[0.08] text-[#6D5CC6]",
  },
  {
    icon: <FaGraduationCap />,
    color:
      "border-[#2DD4BF]/20 bg-[#2DD4BF]/[0.10] text-[#087A68]",
  },
  {
    icon: <FaChartLine />,
    color:
      "border-[#087EA4]/20 bg-[#087EA4]/[0.08] text-[#075985]",
  },
];

export default function StudentPage() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("/api/profile");

        if (data.success) {
          setProfile(data.data);
        }
      } catch (error) {
        console.error("Failed to load student profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const stats = profile
    ? [
        {
          label: "Student ID",
          value: profile.studentId || "—",
        },
        {
          label: "Batch",
          value: profile.batch || "—",
        },
        {
          label: "Semester",
          value: profile.semester || "—",
        },
        {
          label: "CGPA",
          value: profile.cgpa || "—",
        },
      ]
    : [];

  return (
    <main className="relative min-h-screen text-[#123B4A]">
      {/* =========================================================
          ATMOSPHERIC BACKGROUND
      ========================================================= */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* Top-left ocean glow */}
        <div className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-[#0891B2]/[0.07] blur-[130px]" />

        {/* Right ocean glow */}
        <div className="absolute -right-40 top-[30%] h-[500px] w-[500px] rounded-full bg-[#087EA4]/[0.045] blur-[150px]" />

        {/* Bottom seafoam glow */}
        <div className="absolute bottom-[-220px] left-[35%] h-[450px] w-[450px] rounded-full bg-[#2DD4BF]/[0.055] blur-[140px]" />

        {/* Soft center glow */}
        <div className="absolute left-[45%] top-[10%] h-[260px] w-[260px] rounded-full bg-[#075985]/[0.025] blur-[120px]" />

        {/* Ocean grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(8,126,164,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(8,126,164,0.8) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* =========================================================
          PAGE HEADER
      ========================================================= */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mb-8"
      >
        <div className="flex items-start gap-4">
          {/* Header icon */}
          <div className="relative mt-1 flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[14px] border border-[#087EA4]/12 bg-white/75 text-[#087EA4] shadow-[0_8px_25px_rgba(8,126,164,0.055)] backdrop-blur-xl">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0891B2]/50 to-transparent" />

            <FaGraduationCap className="text-sm" />
          </div>

          <div>
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#087EA4]/65">
              Student portal
            </p>

            <h1 className="font-display bg-gradient-to-r from-[#075985] via-[#087EA4] to-[#0891B2] bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-3xl">
              My Academic Record
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#55727D]">
              View your academic information and student records.
            </p>
          </div>
        </div>

        <div className="mt-7 h-px bg-gradient-to-r from-[#087EA4]/15 via-[#087EA4]/[0.06] to-transparent" />
      </motion.section>

      {/* =========================================================
          LOADING STATE
      ========================================================= */}
      {loading && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-32 animate-pulse rounded-[22px] border border-[#087EA4]/10 bg-white/65 shadow-[0_8px_30px_rgba(8,126,164,0.035)]"
              />
            ))}
          </div>

          <div className="h-72 animate-pulse rounded-[24px] border border-[#087EA4]/10 bg-white/65 shadow-[0_8px_30px_rgba(8,126,164,0.035)]" />
        </div>
      )}

      {/* =========================================================
          PROFILE CONTENT
      ========================================================= */}
      {!loading && profile && (
        <div className="space-y-5">
          {/* =====================================================
              ACADEMIC SUMMARY
          ===================================================== */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#087EA4]/65">
                  Academic overview
                </p>

                <h2 className="mt-1 font-display text-lg font-bold text-[#123B4A]">
                  Current Record
                </h2>
              </div>

              <span className="hidden text-[9px] font-semibold uppercase tracking-[0.16em] text-[#55727D]/60 sm:block">
                PSTU · Fisheries
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {stats.map((s, i) => {
                const style = statStyles[i];

                return (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: i * 0.06,
                    }}
                    className="group relative overflow-hidden rounded-[22px] border border-[#087EA4]/10 bg-white/80 p-5 text-center shadow-[0_10px_35px_rgba(8,126,164,0.05)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#087EA4]/15 hover:shadow-[0_18px_45px_rgba(8,126,164,0.09)]"
                  >
                    {/* Top accent */}
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#087EA4]/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Icon */}
                    <div
                      className={`mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-xl border ${style.color} text-sm`}
                    >
                      {style.icon}
                    </div>

                    {/* Value */}
                    <p className="truncate font-display text-xl font-bold text-[#123B4A] sm:text-2xl">
                      {s.value}
                    </p>

                    {/* Label */}
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#55727D]/70">
                      {s.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* =====================================================
              STUDENT INFORMATION
          ===================================================== */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.15,
            }}
            className="relative overflow-hidden rounded-[24px] border border-[#087EA4]/10 bg-white/80 shadow-[0_15px_45px_rgba(8,126,164,0.055)] backdrop-blur-xl"
          >
            {/* Top accent */}
            <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#087EA4]/35 to-transparent" />

            {/* Bottom accent */}
            <div className="absolute bottom-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-[#2DD4BF]/25 to-transparent" />

            {/* Glow */}
            <div className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full bg-[#0891B2]/[0.045] blur-[90px]" />

            {/* Header */}
            <div className="relative flex items-center justify-between border-b border-[#087EA4]/10 px-5 py-5 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-[#0891B2]/15 bg-[#0891B2]/[0.08] text-[#087EA4]">
                  <div className="absolute inset-x-0 top-0 h-px bg-[#0891B2]/30" />

                  <FaUser className="text-sm" />
                </div>

                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#087EA4]/65">
                    Personal details
                  </p>

                  <h3 className="mt-0.5 font-display text-sm font-bold text-[#123B4A]">
                    Student Information
                  </h3>
                </div>
              </div>

              <span className="hidden text-[9px] font-semibold uppercase tracking-[0.16em] text-[#55727D]/55 sm:block">
                Profile
              </span>
            </div>

            {/* Information rows */}
            <div className="relative divide-y divide-[#087EA4]/[0.07] px-5 sm:px-6">
              {[
                {
                  label: "Full Name",
                  value: profile.name || "—",
                  icon: <FaUser />,
                },
                {
                  label: "Email",
                  value: profile.email || "—",
                  icon: <FaEnvelope />,
                },
                {
                  label: "Department",
                  value: profile.department
                    ? DEPARTMENTS[profile.department as Department]
                    : "—",
                  icon: <FaBuilding />,
                },
                {
                  label: "Phone",
                  value: profile.phone || "—",
                  icon: <FaPhone />,
                },
                {
                  label: "Address",
                  value: profile.address || "—",
                  icon: <FaMapMarkerAlt />,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="group flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                >
                  {/* Label */}
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#087EA4]/10 bg-[#F0FAFC]/70 text-[10px] text-[#55727D] transition-all duration-200 group-hover:border-[#0891B2]/20 group-hover:bg-[#0891B2]/[0.07] group-hover:text-[#087EA4]">
                      {item.icon}
                    </span>

                    <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#55727D]/75">
                      {item.label}
                    </span>
                  </div>

                  {/* Value */}
                  <span className="break-words text-sm font-medium text-[#123B4A] sm:max-w-[65%] sm:text-right">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* =====================================================
              STATUS FOOTER
          ===================================================== */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="flex items-center gap-3 pt-2"
          >
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#087EA4]/10 to-transparent" />

            <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#55727D]/60">
              <span className="h-1 w-1 rounded-full bg-[#0891B2]/65" />
              Academic Record · PSTU
            </div>

            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#087EA4]/10 to-transparent" />
          </motion.div>
        </div>
      )}

      {/* =========================================================
          NO PROFILE
      ========================================================= */}
      {!loading && !profile && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden rounded-[24px] border border-[#087EA4]/10 bg-white/80 px-6 py-16 text-center shadow-[0_15px_45px_rgba(8,126,164,0.05)] backdrop-blur-xl"
        >
          {/* Top accent */}
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#087EA4]/30 to-transparent" />

          {/* Glow */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-[#0891B2]/[0.045] blur-[70px]" />

          <div className="relative mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-[#0891B2]/15 bg-[#0891B2]/[0.08] text-[#087EA4]">
            <FaUser />
          </div>

          <h2 className="relative mt-5 font-display text-lg font-bold text-[#123B4A]">
            No academic record found
          </h2>

          <p className="relative mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#55727D]">
            Your student profile information could not be loaded. Please
            update your profile and try again.
          </p>
        </motion.div>
      )}
    </main>
  );
}

