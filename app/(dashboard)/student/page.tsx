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
      "border-blue-400/10 bg-blue-400/[0.06] text-blue-300",
  },
  {
    icon: <FaLayerGroup />,
    color:
      "border-violet-400/10 bg-violet-400/[0.06] text-violet-300",
  },
  {
    icon: <FaGraduationCap />,
    color:
      "border-teal-400/10 bg-teal-400/[0.06] text-teal-300",
  },
  {
    icon: <FaChartLine />,
    color:
      "border-cyan-400/10 bg-cyan-400/[0.06] text-cyan-300",
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
    <main className="relative min-h-screen text-white">
      {/* =========================================================
          ATMOSPHERIC BACKGROUND
      ========================================================= */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-cyan-400/[0.025] blur-[130px]" />

        <div className="absolute -right-40 top-[30%] h-[500px] w-[500px] rounded-full bg-sky-400/[0.025] blur-[150px]" />

        <div className="absolute bottom-[-220px] left-[35%] h-[450px] w-[450px] rounded-full bg-cyan-500/[0.018] blur-[140px]" />

        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
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
          <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.05]">
            <FaGraduationCap className="text-sm text-cyan-300" />
          </div>

          <div>
            <p className="mb-1 text-[10px] uppercase tracking-[0.24em] text-cyan-300/50">
              Student portal
            </p>

            <h1 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              My Academic Record
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500">
              View your academic information and student records.
            </p>
          </div>
        </div>

        <div className="mt-7 h-px bg-gradient-to-r from-white/[0.08] via-white/[0.04] to-transparent" />
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
                className="h-32 animate-pulse rounded-2xl border border-white/[0.05] bg-white/[0.025]"
              />
            ))}
          </div>

          <div className="h-72 animate-pulse rounded-2xl border border-white/[0.05] bg-white/[0.025]" />
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
                <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-300/50">
                  Academic overview
                </p>

                <h2 className="mt-1 font-display text-lg font-bold text-white">
                  Current Record
                </h2>
              </div>

              <span className="hidden text-[9px] uppercase tracking-[0.16em] text-slate-700 sm:block">
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
                    className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5 text-center backdrop-blur-sm transition-all duration-300 hover:border-white/[0.10] hover:bg-white/[0.035]"
                  >
                    <div
                      className={`mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-xl border ${style.color} text-sm`}
                    >
                      {style.icon}
                    </div>

                    <p className="truncate font-display text-xl font-bold text-white sm:text-2xl">
                      {s.value}
                    </p>

                    <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-slate-600">
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
            className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.025] backdrop-blur-sm"
          >
            {/* Top accent */}
            <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent" />

            {/* Glow */}
            <div className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full bg-cyan-400/[0.025] blur-[90px]" />

            {/* Header */}
            <div className="relative flex items-center justify-between border-b border-white/[0.05] px-5 py-5 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.05] text-cyan-300">
                  <FaUser className="text-sm" />
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-cyan-300/50">
                    Personal details
                  </p>

                  <h3 className="mt-0.5 font-display text-sm font-bold text-white">
                    Student Information
                  </h3>
                </div>
              </div>

              <span className="hidden text-[9px] uppercase tracking-[0.16em] text-slate-700 sm:block">
                Profile
              </span>
            </div>

            {/* Information rows */}
            <div className="relative divide-y divide-white/[0.04] px-5 sm:px-6">
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
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.05] bg-white/[0.02] text-[10px] text-slate-600 transition-colors group-hover:border-cyan-400/10 group-hover:text-cyan-300/70">
                      {item.icon}
                    </span>

                    <span className="text-xs uppercase tracking-[0.08em] text-slate-600">
                      {item.label}
                    </span>
                  </div>

                  <span className="break-words text-sm font-medium text-slate-300 sm:max-w-[65%] sm:text-right">
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
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

            <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.22em] text-slate-700">
              <span className="h-1 w-1 rounded-full bg-cyan-400/40" />
              Academic Record · PSTU
            </div>

            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
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
          className="rounded-2xl border border-white/[0.06] bg-white/[0.025] px-6 py-16 text-center backdrop-blur-sm"
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.05] text-cyan-300">
            <FaUser />
          </div>

          <h2 className="mt-5 font-display text-lg font-bold text-white">
            No academic record found
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-500">
            Your student profile information could not be loaded. Please
            update your profile and try again.
          </p>
        </motion.div>
      )}
    </main>
  );
}