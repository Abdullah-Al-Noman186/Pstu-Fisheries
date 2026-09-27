"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Teacher, Department, DEPARTMENTS } from "@/types";
import {
  FaTimes,
  FaEnvelope,
  FaPhone,
  FaBook,
  FaFlask,
  FaGraduationCap,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaUniversity,
} from "react-icons/fa";

interface Props {
  teacher: Teacher | null;
  onClose: () => void;
}

const deptStyles: Record<
  string,
  {
    accent: string;
    soft: string;
    border: string;
    glow: string;
    dot: string;
  }
> = {
  AQC: {
    accent: "text-cyan-300",
    soft: "bg-cyan-400/[0.08]",
    border: "border-cyan-300/20",
    glow: "rgba(34,211,238,0.10)",
    dot: "bg-cyan-300",
  },
  FBG: {
    accent: "text-emerald-300",
    soft: "bg-emerald-400/[0.08]",
    border: "border-emerald-300/20",
    glow: "rgba(52,211,153,0.10)",
    dot: "bg-emerald-300",
  },
  FMN: {
    accent: "text-violet-300",
    soft: "bg-violet-400/[0.08]",
    border: "border-violet-300/20",
    glow: "rgba(167,139,250,0.10)",
    dot: "bg-violet-300",
  },
  FST: {
    accent: "text-amber-300",
    soft: "bg-amber-400/[0.08]",
    border: "border-amber-300/20",
    glow: "rgba(251,191,36,0.10)",
    dot: "bg-amber-300",
  },
  MFO: {
    accent: "text-sky-300",
    soft: "bg-sky-400/[0.08]",
    border: "border-sky-300/20",
    glow: "rgba(56,189,248,0.10)",
    dot: "bg-sky-300",
  },
};

const fallbackStyle = {
  accent: "text-cyan-300",
  soft: "bg-cyan-400/[0.08]",
  border: "border-cyan-300/20",
  glow: "rgba(34,211,238,0.10)",
  dot: "bg-cyan-300",
};

export default function TeacherModal({ teacher, onClose }: Props) {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = teacher ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [teacher]);

  const style =
    deptStyles[teacher?.department || ""] ?? fallbackStyle;

  return (
    <AnimatePresence>
      {teacher && (
        <>
          {/* =====================================================
              BACKDROP
          ====================================================== */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-[#000611]/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* =====================================================
              MODAL WRAPPER
          ====================================================== */}
          <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.96,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: 20,
              }}
              transition={{
                duration: 0.28,
                ease: "easeOut",
              }}
              className="pointer-events-auto relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-[#06111f] shadow-2xl"
              onClick={(event) => event.stopPropagation()}
              style={{
                boxShadow: `0 30px 100px rgba(0,0,0,0.55), 0 0 80px ${style.glow}`,
              }}
            >
              {/* =================================================
                  MODAL ATMOSPHERE
              ================================================== */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div
                  className={`absolute -right-32 -top-32 h-[380px] w-[380px] rounded-full ${style.soft} opacity-50 blur-[110px]`}
                />

                <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-cyan-400/[0.025] blur-[120px]" />

                <div
                  className="absolute inset-0 opacity-[0.015]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(125,211,252,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,0.8) 1px, transparent 1px)",
                    backgroundSize: "70px 70px",
                  }}
                />
              </div>

              {/* =================================================
                  HEADER
              ================================================== */}
              <div className="relative shrink-0 border-b border-white/[0.06]">
                {/* Top accent */}
                <div
                  className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-current to-transparent ${style.accent} opacity-60`}
                />

                <div className="relative px-5 pb-6 pt-7 sm:px-7">
                  {/* Close */}
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close profile"
                    className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.035] text-slate-500 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.07] hover:text-white sm:right-5 sm:top-5"
                  >
                    <FaTimes size={11} />
                  </button>

                  {/* HOD */}
                  {teacher.isHOD && (
                    <div
                      className={`mb-5 inline-flex items-center gap-2 rounded-full border ${style.border} ${style.soft} px-3 py-1.5`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${style.dot} shadow-[0_0_9px_currentColor]`}
                      />

                      <span
                        className={`text-[8px] font-semibold uppercase tracking-[0.2em] ${style.accent}`}
                      >
                        Head of Department
                      </span>
                    </div>
                  )}

                  {/* Profile */}
                  <div className="flex items-center gap-4 pr-8 sm:gap-5">
                    {/* Avatar */}
                    <div className="relative shrink-0">
                      <div
                        className={`absolute -inset-2 rounded-[25px] ${style.soft} opacity-70 blur-xl`}
                      />

                      {teacher.photo ? (
                        <div
                          className={`relative h-20 w-20 overflow-hidden rounded-[20px] border ${style.border} bg-slate-900 shadow-xl sm:h-24 sm:w-24`}
                        >
                          <Image
                            src={teacher.photo}
                            alt={teacher.name}
                            fill
                            sizes="96px"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div
                          className={`relative flex h-20 w-20 items-center justify-center rounded-[20px] border ${style.border} ${style.soft} sm:h-24 sm:w-24`}
                        >
                          <span
                            className={`font-display text-3xl font-semibold ${style.accent}`}
                          >
                            {teacher.name?.[0]?.toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Identity */}
                    <div className="min-w-0">
                      <h2 className="font-display text-lg font-semibold leading-tight text-white sm:text-2xl">
                        {teacher.name}
                      </h2>

                      {teacher.designation && (
                        <p
                          className={`mt-1.5 text-xs font-medium sm:text-sm ${style.accent}`}
                        >
                          {teacher.designation}
                        </p>
                      )}

                      {teacher.department && (
                        <div
                          className={`mt-3 inline-flex max-w-full items-center gap-2 rounded-lg border ${style.border} ${style.soft} px-2.5 py-1.5`}
                        >
                          <FaGraduationCap
                            size={9}
                            className={style.accent}
                          />

                          <span
                            className={`truncate text-[9px] font-medium uppercase tracking-[0.08em] ${style.accent}`}
                          >
                            {teacher.department}
                          </span>

                          <span className="max-w-[180px] truncate text-[9px] text-slate-500">
                            {
                              DEPARTMENTS[
                                teacher.department as Department
                              ]
                            }
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* =================================================
                  SCROLLABLE BODY
              ================================================== */}
              <div className="relative min-h-0 flex-1 overflow-y-auto">
                <div className="px-5 py-5 sm:px-7">
                  {/* =================================================
                      QUICK STATS
                  ================================================== */}
                  <div className="grid grid-cols-3 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                    <StatItem
                      icon={<FaBook size={11} />}
                      value={teacher.publications || "—"}
                      label="Papers"
                      accent={style.accent}
                    />

                    <StatItem
                      icon={<FaCalendarAlt size={11} />}
                      value={teacher.joinYear || "—"}
                      label="Joined"
                      accent={style.accent}
                      border
                    />

                    <StatItem
                      icon={<FaFlask size={11} />}
                      value={teacher.researchAreas?.length || "—"}
                      label="Research Areas"
                      accent={style.accent}
                      border
                    />
                  </div>

                  {/* =================================================
                      CONTACT
                  ================================================== */}
                  {(teacher.email || teacher.phone) && (
                    <section className="mt-6">
                      <SectionLabel
                        icon={<FaChalkboardTeacher size={9} />}
                        label="Contact"
                      />

                      <div className="grid gap-2.5 sm:grid-cols-2">
                        {teacher.email && (
                          <a
                            href={`mailto:${teacher.email}`}
                            className="group flex min-w-0 items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 transition-all duration-300 hover:border-cyan-300/15 hover:bg-cyan-400/[0.04]"
                          >
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-cyan-300/10 bg-cyan-400/[0.06]">
                              <FaEnvelope
                                className="text-cyan-300/70"
                                size={11}
                              />
                            </div>

                            <div className="min-w-0">
                              <p className="text-[8px] font-medium uppercase tracking-[0.16em] text-slate-600">
                                Email
                              </p>

                              <p className="mt-1 truncate text-[11px] font-medium text-slate-300 transition-colors group-hover:text-white">
                                {teacher.email}
                              </p>
                            </div>
                          </a>
                        )}

                        {teacher.phone && (
                          <a
                            href={`tel:${teacher.phone}`}
                            className="group flex min-w-0 items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 transition-all duration-300 hover:border-emerald-300/15 hover:bg-emerald-400/[0.04]"
                          >
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-emerald-300/10 bg-emerald-400/[0.06]">
                              <FaPhone
                                className="text-emerald-300/70"
                                size={11}
                              />
                            </div>

                            <div className="min-w-0">
                              <p className="text-[8px] font-medium uppercase tracking-[0.16em] text-slate-600">
                                Phone
                              </p>

                              <p className="mt-1 truncate text-[11px] font-medium text-slate-300 transition-colors group-hover:text-white">
                                {teacher.phone}
                              </p>
                            </div>
                          </a>
                        )}
                      </div>
                    </section>
                  )}

                  {/* =================================================
                      ABOUT
                  ================================================== */}
                  {teacher.bio && (
                    <section className="mt-6">
                      <SectionLabel
                        icon={<FaChalkboardTeacher size={9} />}
                        label="About"
                      />

                      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
                        <p className="text-xs leading-6 text-slate-400">
                          {teacher.bio}
                        </p>
                      </div>
                    </section>
                  )}

                  {/* =================================================
                      RESEARCH
                  ================================================== */}
                  {teacher.researchAreas &&
                    teacher.researchAreas.length > 0 && (
                      <section className="mt-6">
                        <SectionLabel
                          icon={<FaFlask size={9} />}
                          label="Research Areas"
                        />

                        <div className="flex flex-wrap gap-2">
                          {teacher.researchAreas.map((area, index) => (
                            <span
                              key={index}
                              className={`rounded-lg border ${style.border} ${style.soft} px-3 py-2 text-[10px] font-medium ${style.accent}`}
                            >
                              {area}
                            </span>
                          ))}
                        </div>
                      </section>
                    )}

                  {/* =================================================
                      EDUCATION
                  ================================================== */}
                  {teacher.education &&
                    teacher.education.length > 0 && (
                      <section className="mt-6">
                        <SectionLabel
                          icon={<FaUniversity size={9} />}
                          label="Education"
                        />

                        <div className="space-y-2.5">
                          {teacher.education.map((edu, index) => (
                            <div
                              key={index}
                              className="flex gap-3 rounded-xl border border-white/[0.05] bg-white/[0.018] p-3"
                            >
                              <div
                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${style.border} ${style.soft}`}
                              >
                                <FaGraduationCap
                                  className={style.accent}
                                  size={11}
                                />
                              </div>

                              <div className="min-w-0">
                                <p className="text-xs font-semibold leading-5 text-slate-200">
                                  {edu.degree}
                                </p>

                                <p className="mt-0.5 text-[11px] text-slate-500">
                                  {edu.institution}
                                </p>

                                <p className="mt-1 text-[9px] uppercase tracking-[0.12em] text-slate-700">
                                  {edu.year}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}
                </div>

                {/* =================================================
                    FOOTER
                ================================================== */}
                <div className="sticky bottom-0 border-t border-white/[0.06] bg-[#06111f]/95 px-5 py-4 backdrop-blur-xl sm:px-7">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full rounded-xl border border-white/[0.07] bg-white/[0.025] py-3 text-xs font-medium text-slate-500 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.05] hover:text-slate-200"
                  >
                    Close Profile
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ===============================================================
   STAT ITEM
================================================================ */

function StatItem({
  icon,
  value,
  label,
  accent,
  border = false,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  accent: string;
  border?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center px-3 py-4 ${
        border ? "border-l border-white/[0.06]" : ""
      }`}
    >
      <span className={accent}>{icon}</span>

      <p className="mt-1.5 font-display text-base font-semibold leading-none text-slate-200">
        {value}
      </p>

      <p className="mt-1 text-[8px] uppercase tracking-[0.14em] text-slate-700">
        {label}
      </p>
    </div>
  );
}

/* ===============================================================
   SECTION LABEL
================================================================ */

function SectionLabel({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <span className="text-cyan-400/50">{icon}</span>

      <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-600">
        {label}
      </span>

      <span className="h-px flex-1 bg-white/[0.05]" />
    </div>
  );
}