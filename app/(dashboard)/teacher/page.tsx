"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaFlask,
  FaBook,
  FaUsers,
  FaGraduationCap,
  FaQuoteLeft,
} from "react-icons/fa";

interface TeacherProfile {
  name?: string;
  publications?: number;
  researchAreas?: string[];
  bio?: string;
}

const statStyles = [
  {
    icon: <FaBook />,
    color:
      "border-blue-400/10 bg-blue-400/[0.06] text-blue-300",
  },
  {
    icon: <FaFlask />,
    color:
      "border-violet-400/10 bg-violet-400/[0.06] text-violet-300",
  },
  {
    icon: <FaUsers />,
    color:
      "border-teal-400/10 bg-teal-400/[0.06] text-teal-300",
  },
];

export default function TeacherPage() {
  const [profile, setProfile] = useState<TeacherProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("/api/profile");

        if (data.success) {
          setProfile(data.data);
        }
      } catch (error) {
        console.error("Failed to load teacher profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

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
          HEADER
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
              Faculty workspace
            </p>

            <h1 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              My Academic Page
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500">
              Manage your academic profile, research areas and publications.
            </p>
          </div>
        </div>

        <div className="mt-7 h-px bg-gradient-to-r from-white/[0.08] via-white/[0.04] to-transparent" />
      </motion.section>

      {/* =========================================================
          LOADING
      ========================================================= */}
      {loading && (
        <div className="space-y-5">
          <div className="grid grid-cols-3 gap-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-32 animate-pulse rounded-2xl border border-white/[0.05] bg-white/[0.025]"
              />
            ))}
          </div>

          <div className="h-32 animate-pulse rounded-2xl border border-white/[0.05] bg-white/[0.025]" />

          <div className="h-44 animate-pulse rounded-2xl border border-white/[0.05] bg-white/[0.025]" />
        </div>
      )}

      {/* =========================================================
          PROFILE
      ========================================================= */}
      {!loading && profile && (
        <div className="space-y-5">
          {/* =====================================================
              STATS
          ===================================================== */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <div className="mb-4 flex items-end justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-300/50">
                  Academic overview
                </p>

                <h2 className="mt-1 font-display text-lg font-bold text-white">
                  Research Snapshot
                </h2>
              </div>

              <span className="hidden text-[9px] uppercase tracking-[0.16em] text-slate-700 sm:block">
                Faculty · PSTU
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  label: "Publications",
                  value: profile.publications || 0,
                },
                {
                  label: "Research Areas",
                  value: profile.researchAreas?.length || 0,
                },
                {
                  label: "Students",
                  value: "—",
                },
              ].map((s, i) => {
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
                    className="group rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5 text-center backdrop-blur-sm transition-all duration-300 hover:border-white/[0.10] hover:bg-white/[0.035]"
                  >
                    <div
                      className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl border ${style.color} text-sm`}
                    >
                      {style.icon}
                    </div>

                    <p className="font-display text-2xl font-bold text-white">
                      {s.value}
                    </p>

                    <p className="mt-1 text-[10px] uppercase tracking-[0.1em] text-slate-600">
                      {s.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* =====================================================
              RESEARCH AREAS
          ===================================================== */}
          {profile.researchAreas &&
            profile.researchAreas.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.12,
                }}
                className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.025] p-6 backdrop-blur-sm"
              >
                {/* Accent */}
                <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-violet-300/50 via-violet-400/10 to-transparent" />

                {/* Glow */}
                <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-violet-400/[0.025] blur-[70px]" />

                <div className="relative">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-400/10 bg-violet-400/[0.05] text-violet-300">
                      <FaFlask className="text-sm" />
                    </div>

                    <div>
                      <p className="text-[9px] uppercase tracking-[0.2em] text-violet-300/50">
                        Research
                      </p>

                      <h3 className="mt-0.5 font-display text-sm font-bold text-white">
                        Research Areas
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {profile.researchAreas.map((area, i) => (
                      <motion.span
                        key={`${area}-${i}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.25,
                          delay: i * 0.04,
                        }}
                        className="rounded-full border border-cyan-400/[0.10] bg-cyan-400/[0.04] px-3 py-1.5 text-xs font-medium text-cyan-300/80 transition-colors hover:border-cyan-400/20 hover:bg-cyan-400/[0.07] hover:text-cyan-200"
                      >
                        {area}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.section>
            )}

          {/* =====================================================
              BIO
          ===================================================== */}
          {profile.bio && (
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.18,
              }}
              className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.025] p-6 backdrop-blur-sm"
            >
              {/* Top accent */}
              <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent" />

              <div className="relative">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.05] text-cyan-300">
                    <FaQuoteLeft className="text-xs" />
                  </div>

                  <div>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-cyan-300/50">
                      Faculty profile
                    </p>

                    <h3 className="mt-0.5 font-display text-sm font-bold text-white">
                      About
                    </h3>
                  </div>
                </div>

                <p className="max-w-3xl text-sm leading-7 text-slate-400">
                  {profile.bio}
                </p>
              </div>
            </motion.section>
          )}

          {/* =====================================================
              FOOTER
          ===================================================== */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.25,
            }}
            className="flex items-center gap-3 pt-2"
          >
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

            <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.22em] text-slate-700">
              <span className="h-1 w-1 rounded-full bg-cyan-400/40" />
              Academic Faculty · PSTU
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
            <FaGraduationCap />
          </div>

          <h2 className="mt-5 font-display text-lg font-bold text-white">
            No academic profile found
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-500">
            Your faculty profile could not be loaded. Please update your
            profile and try again.
          </p>
        </motion.div>
      )}
    </main>
  );
}