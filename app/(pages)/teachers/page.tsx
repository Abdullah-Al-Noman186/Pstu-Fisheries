
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  DEPARTMENTS,
  Department,
  Teacher,
} from "@/types";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import {
  FaChalkboardTeacher,
  FaUsers,
  FaArrowRight,
} from "react-icons/fa";
import TeacherCard from "@/components/teachers/TeacherCard";
import TeacherModal from "@/components/teachers/TeacherModal";

const deptKeys = ["ALL", ...Object.keys(DEPARTMENTS)] as const;

const departmentStyles: Record<
  string,
  {
    text: string;
    border: string;
    bg: string;
    glow: string;
  }
> = {
  AQC: {
    text: "text-[#087EA4]",
    border: "border-[#0891B2]/20",
    bg: "bg-[#0891B2]/[0.08]",
    glow: "shadow-[0_0_30px_rgba(8,145,178,0.08)]",
  },
  FBG: {
    text: "text-[#087A68]",
    border: "border-[#2DD4BF]/20",
    bg: "bg-[#2DD4BF]/[0.10]",
    glow: "shadow-[0_0_30px_rgba(45,212,191,0.08)]",
  },
  FMN: {
    text: "text-[#6D5CC6]",
    border: "border-[#8B7ED8]/20",
    bg: "bg-[#8B7ED8]/[0.08]",
    glow: "shadow-[0_0_30px_rgba(139,126,216,0.08)]",
  },
  FST: {
    text: "text-[#A16207]",
    border: "border-[#F59E0B]/20",
    bg: "bg-[#F59E0B]/[0.08]",
    glow: "shadow-[0_0_30px_rgba(245,158,11,0.08)]",
  },
  MFO: {
    text: "text-[#075985]",
    border: "border-[#087EA4]/20",
    bg: "bg-[#087EA4]/[0.08]",
    glow: "shadow-[0_0_30px_rgba(8,126,164,0.08)]",
  },
};

const defaultDepartmentStyle = {
  text: "text-[#087EA4]",
  border: "border-[#0891B2]/20",
  bg: "bg-[#0891B2]/[0.08]",
  glow: "shadow-[0_0_25px_rgba(8,145,178,0.06)]",
};

export default function TeachersPage() {
  const [activeDept, setActiveDept] = useState("ALL");
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTeacher, setSelectedTeacher] =
    useState<Teacher | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const url =
      activeDept === "ALL"
        ? "/api/teachers"
        : `/api/teachers?department=${activeDept}`;

    axios
      .get(url)
      .then(({ data }) => {
        if (data.success) {
          setTeachers(data.data);
        } else {
          setError(data.error || "Failed to load faculty members.");
        }
      })
      .catch((err) => {
        setError(
          err?.response?.data?.error ||
            err?.message ||
            "Something went wrong while loading faculty members."
        );
      })
      .finally(() => setLoading(false));
  }, [activeDept]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F0FAFC] text-[#123B4A]">
      {/* =========================================================
          BACKGROUND ATMOSPHERE
      ========================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Left ocean glow */}
        <div className="absolute -left-72 top-0 h-[650px] w-[650px] rounded-full bg-[#0891B2]/[0.07] blur-[150px]" />

        {/* Right deep-ocean glow */}
        <div className="absolute -right-72 top-[30%] h-[650px] w-[650px] rounded-full bg-[#087EA4]/[0.045] blur-[150px]" />

        {/* Bottom seafoam glow */}
        <div className="absolute bottom-0 left-1/3 h-[500px] w-[500px] rounded-full bg-[#2DD4BF]/[0.055] blur-[150px]" />

        {/* Subtle academic grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(8,126,164,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(8,126,164,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Top ocean wash */}
        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-[#0891B2]/[0.045] to-transparent" />
      </div>

      {/* =========================================================
          MODAL
      ========================================================== */}
      <TeacherModal
        teacher={selectedTeacher}
        onClose={() => setSelectedTeacher(null)}
      />

      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative z-10 border-b border-[#087EA4]/10 pt-28 pb-14 sm:pt-32 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#087EA4]/15 bg-white/70 px-4 py-2 shadow-[0_8px_30px_rgba(8,126,164,0.06)] backdrop-blur-xl"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#0891B2] shadow-[0_0_10px_rgba(8,145,178,0.35)]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#087EA4]">
                Faculty & Researchers
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="font-display text-4xl font-semibold tracking-tight text-[#123B4A] sm:text-5xl lg:text-6xl"
            >
              The people behind
              <span className="block bg-gradient-to-r from-[#075985] via-[#087EA4] to-[#0891B2] bg-clip-text text-transparent">
                the knowledge.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#55727D] sm:text-base"
            >
              Meet the professors, researchers, and academic minds shaping
              fisheries education, aquatic science, and sustainable resource
              management at PSTU.
            </motion.p>

            {/* Metadata */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 flex items-center justify-center gap-6 text-[10px] font-medium uppercase tracking-[0.18em] text-[#55727D]/70"
            >
              <span>Faculty of Fisheries</span>

              <span className="h-1 w-1 rounded-full bg-[#0891B2]/50" />

              <span>PSTU</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CONTENT
      ========================================================== */}
      <section className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* =====================================================
              DEPARTMENT FILTER
          ====================================================== */}
          <div className="mb-10">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#55727D]/70">
                  Browse by discipline
                </p>

                <p className="mt-1 text-xs text-[#55727D]">
                  Explore faculty members across the university&apos;s
                  departments.
                </p>
              </div>

              <div className="hidden items-center gap-2 text-[#55727D]/65 sm:flex">
                <FaUsers size={11} />

                <span className="text-[10px] font-medium uppercase tracking-[0.15em]">
                  Faculty Directory
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {deptKeys.map((key) => {
                const isActive = activeDept === key;

                const style =
                  key === "ALL"
                    ? defaultDepartmentStyle
                    : departmentStyles[key] ??
                      defaultDepartmentStyle;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveDept(key)}
                    className={[
                      "group relative overflow-hidden rounded-xl border px-4 py-2.5",
                      "text-left text-xs transition-all duration-300",
                      "backdrop-blur-xl",
                      isActive
                        ? `${style.bg} ${style.border} ${style.text} ${style.glow}`
                        : "border-[#087EA4]/10 bg-white/65 text-[#55727D]/70 shadow-sm hover:border-[#087EA4]/20 hover:bg-white hover:text-[#087EA4]",
                    ].join(" ")}
                  >
                    <span className="relative z-10">
                      {key === "ALL"
                        ? "All Departments"
                        : `${key} — ${
                            DEPARTMENTS[key as Department]
                          }`}
                    </span>

                    {isActive && (
                      <motion.span
                        layoutId="activeDepartment"
                        className="absolute inset-x-3 bottom-0 h-px bg-current opacity-50"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* =====================================================
              ERROR
          ====================================================== */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-red-200/80 bg-red-50/80 px-6 py-10 text-center shadow-sm"
            >
              <p className="text-sm font-medium text-red-600">
                {error}
              </p>

              <button
                type="button"
                onClick={() => setActiveDept(activeDept)}
                className="mt-5 inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
              >
                Try Again
                <FaArrowRight size={8} />
              </button>
            </motion.div>
          )}

          {/* =====================================================
              LOADING
          ====================================================== */}
          {loading && (
            <div className="flex min-h-[350px] items-center justify-center py-12">
              <LoadingSpinner message="Loading faculty members..." />
            </div>
          )}

          {/* =====================================================
              RESULTS
          ====================================================== */}
          {!loading && !error && (
            <>
              {/* Result header */}
              <div className="mb-7 flex flex-col gap-3 border-y border-[#087EA4]/10 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-[#55727D]">
                  <span className="font-semibold text-[#123B4A]">
                    {teachers.length}
                  </span>{" "}
                  faculty member
                  {teachers.length !== 1 ? "s" : ""}
                </p>

                <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#55727D]/60">
                  {activeDept === "ALL"
                    ? "All departments"
                    : `${DEPARTMENTS[activeDept as Department]}`}
                  {" · "}
                  Click a profile to explore
                </p>
              </div>

              {/* =================================================
                  EMPTY STATE
              ================================================== */}
              {teachers.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center rounded-3xl border border-[#087EA4]/10 bg-white/60 px-6 py-28 text-center shadow-[0_20px_60px_rgba(8,126,164,0.045)]"
                >
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#087EA4]/10 bg-[#0891B2]/[0.07]">
                    <FaChalkboardTeacher
                      className="text-[#087EA4]/55"
                      size={24}
                    />
                  </div>

                  <h2 className="text-lg font-semibold text-[#123B4A]">
                    No faculty members yet
                  </h2>

                  <p className="mt-2 max-w-md text-sm leading-6 text-[#55727D]">
                    Faculty members will appear here once they register
                    and complete their profile.
                  </p>

                  {activeDept !== "ALL" && (
                    <button
                      type="button"
                      onClick={() => setActiveDept("ALL")}
                      className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[#087EA4]/15 bg-white px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#087EA4] shadow-sm transition-all hover:border-[#087EA4]/25 hover:bg-[#0891B2]/[0.04]"
                    >
                      View All Faculty
                      <FaArrowRight size={8} />
                    </button>
                  )}
                </motion.div>
              ) : (
                <>
                  {/* =================================================
                      TEACHER GRID
                  ================================================== */}
                  <motion.div
                    layout
                    className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                  >
                    {teachers.map((teacher, index) => (
                      <motion.div
                        key={teacher._id}
                        layout
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.45,
                          delay: Math.min(
                            index * 0.045,
                            0.35
                          ),
                        }}
                        className="group relative"
                      >
                        {/* Hover glow */}
                        <div className="pointer-events-none absolute -inset-1 rounded-[22px] bg-[#0891B2]/[0.055] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

                        <div className="relative overflow-hidden rounded-[22px]">
                          {/* Top hover accent */}
                          <div className="pointer-events-none absolute inset-x-5 top-0 z-10 h-px bg-gradient-to-r from-transparent via-[#0891B2]/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                          <TeacherCard
                            teacher={teacher}
                            index={index}
                            onClick={() =>
                              setSelectedTeacher(teacher)
                            }
                          />
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* =================================================
                      BOTTOM NAVIGATION HINT
                  ================================================== */}
                  <div className="mt-14 flex justify-center">
                    <div className="inline-flex items-center gap-3 border-t border-[#087EA4]/10 pt-5 text-[10px] font-medium uppercase tracking-[0.18em] text-[#55727D]/55">
                      <span>Faculty Directory</span>

                      <FaArrowRight
                        size={8}
                        className="text-[#0891B2]/50"
                      />

                      <span>Explore Profiles</span>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}

