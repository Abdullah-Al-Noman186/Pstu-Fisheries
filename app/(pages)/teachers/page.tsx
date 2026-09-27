"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { DEPARTMENTS, Department, Teacher } from "@/types";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { FaChalkboardTeacher, FaUsers, FaArrowRight } from "react-icons/fa";
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
    text: "text-cyan-300",
    border: "border-cyan-300/20",
    bg: "bg-cyan-400/[0.08]",
    glow: "shadow-[0_0_30px_rgba(34,211,238,0.08)]",
  },
  FBG: {
    text: "text-emerald-300",
    border: "border-emerald-300/20",
    bg: "bg-emerald-400/[0.08]",
    glow: "shadow-[0_0_30px_rgba(52,211,153,0.08)]",
  },
  FMN: {
    text: "text-violet-300",
    border: "border-violet-300/20",
    bg: "bg-violet-400/[0.08]",
    glow: "shadow-[0_0_30px_rgba(167,139,250,0.08)]",
  },
  FST: {
    text: "text-amber-300",
    border: "border-amber-300/20",
    bg: "bg-amber-400/[0.08]",
    glow: "shadow-[0_0_30px_rgba(251,191,36,0.08)]",
  },
  MFO: {
    text: "text-sky-300",
    border: "border-sky-300/20",
    bg: "bg-sky-400/[0.08]",
    glow: "shadow-[0_0_30px_rgba(56,189,248,0.08)]",
  },
};

export default function TeachersPage() {
  const [activeDept, setActiveDept] = useState("ALL");
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(
    null
  );

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
          setError(data.error);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [activeDept]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020b18] text-white">
      {/* =========================================================
          ATMOSPHERE
      ========================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-72 top-0 h-[650px] w-[650px] rounded-full bg-cyan-500/[0.035] blur-[150px]" />

        <div className="absolute -right-72 top-[30%] h-[650px] w-[650px] rounded-full bg-blue-500/[0.025] blur-[150px]" />

        <div className="absolute bottom-0 left-1/3 h-[500px] w-[500px] rounded-full bg-teal-400/[0.02] blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(125,211,252,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,0.7) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-cyan-400/[0.025] to-transparent" />
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
      <section className="relative z-10 border-b border-white/[0.05] pt-32 pb-16 sm:pt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/10 bg-cyan-400/[0.04] px-4 py-2 backdrop-blur-xl"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.7)]" />

              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-cyan-300/70">
                Faculty & Researchers
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              The people behind
              <span className="block text-cyan-300">
                the knowledge.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base"
            >
              Meet the professors, researchers, and academic minds shaping
              fisheries education, aquatic science, and sustainable resource
              management at PSTU.
            </motion.p>

            {/* Small metadata */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 flex items-center justify-center gap-6 text-[10px] uppercase tracking-[0.18em] text-slate-600"
            >
              <span>Faculty of Fisheries</span>
              <span className="h-1 w-1 rounded-full bg-cyan-400/30" />
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
              FILTER
          ====================================================== */}
          <div className="mb-10">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-600">
                  Browse by discipline
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Explore faculty members across the university's departments.
                </p>
              </div>

              <div className="hidden items-center gap-2 text-slate-600 sm:flex">
                <FaUsers size={11} />
                <span className="text-[10px] uppercase tracking-[0.15em]">
                  Faculty directory
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {deptKeys.map((key) => {
                const isActive = activeDept === key;
                const style =
                  key === "ALL"
                    ? {
                        text: "text-cyan-300",
                        border: "border-cyan-300/20",
                        bg: "bg-cyan-400/[0.08]",
                        glow: "shadow-[0_0_25px_rgba(34,211,238,0.06)]",
                      }
                    : departmentStyles[key] ?? {
                        text: "text-cyan-300",
                        border: "border-cyan-300/20",
                        bg: "bg-cyan-400/[0.08]",
                        glow: "",
                      };

                return (
                  <button
                    key={key}
                    onClick={() => setActiveDept(key)}
                    className={[
                      "group relative overflow-hidden rounded-xl border px-4 py-2.5",
                      "text-left text-xs transition-all duration-300",
                      "backdrop-blur-xl",
                      isActive
                        ? `${style.bg} ${style.border} ${style.text} ${style.glow}`
                        : "border-white/[0.06] bg-white/[0.02] text-slate-500 hover:border-white/[0.12] hover:bg-white/[0.035] hover:text-slate-300",
                    ].join(" ")}
                  >
                    <span className="relative z-10">
                      {key === "ALL"
                        ? "All Departments"
                        : `${key} — ${DEPARTMENTS[key as Department]}`}
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
              className="rounded-2xl border border-red-400/10 bg-red-400/[0.035] px-6 py-10 text-center"
            >
              <p className="text-sm text-red-300/80">{error}</p>
            </motion.div>
          )}

          {/* =====================================================
              LOADING
          ====================================================== */}
          {loading && (
            <div className="py-12">
              <LoadingSpinner message="Loading faculty members..." />
            </div>
          )}

          {/* =====================================================
              RESULTS
          ====================================================== */}
          {!loading && !error && (
            <>
              {/* Result header */}
              <div className="mb-7 flex flex-col gap-3 border-y border-white/[0.05] py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-slate-500">
                  <span className="text-slate-300">{teachers.length}</span>{" "}
                  faculty member
                  {teachers.length !== 1 ? "s" : ""}
                </p>

                <p className="text-[10px] uppercase tracking-[0.15em] text-slate-700">
                  Click a profile to explore
                </p>
              </div>

              {/* Empty state */}
              {teachers.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center border-y border-white/[0.05] py-28 text-center"
                >
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.025]">
                    <FaChalkboardTeacher
                      className="text-cyan-400/40"
                      size={24}
                    />
                  </div>

                  <h2 className="text-lg font-medium text-slate-300">
                    No faculty members yet
                  </h2>

                  <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
                    Faculty members will appear here once they register and
                    complete their profile.
                  </p>
                </motion.div>
              ) : (
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
                        delay: Math.min(index * 0.045, 0.35),
                      }}
                      className="group relative"
                    >
                      {/* subtle card glow */}
                      <div className="pointer-events-none absolute -inset-1 rounded-[22px] bg-cyan-400/[0.025] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

                      <div className="relative">
                        <TeacherCard
                          teacher={teacher}
                          index={index}
                          onClick={() => setSelectedTeacher(teacher)}
                        />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Bottom navigation hint */}
              {teachers.length > 0 && (
                <div className="mt-14 flex justify-center">
                  <div className="inline-flex items-center gap-3 border-t border-white/[0.05] pt-5 text-[10px] uppercase tracking-[0.18em] text-slate-700">
                    <span>Faculty directory</span>
                    <FaArrowRight size={8} className="text-cyan-400/40" />
                    <span>Explore profiles</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}