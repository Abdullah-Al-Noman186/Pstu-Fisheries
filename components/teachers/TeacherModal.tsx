
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
    accent: "text-[#087EA4]",
    soft: "bg-[#0891B2]/[0.08]",
    border: "border-[#0891B2]/20",
    glow: "rgba(8,145,178,0.12)",
    dot: "bg-[#0891B2]",
  },
  FBG: {
    accent: "text-[#087A68]",
    soft: "bg-[#2DD4BF]/[0.10]",
    border: "border-[#2DD4BF]/25",
    glow: "rgba(45,212,191,0.12)",
    dot: "bg-[#2DD4BF]",
  },
  FMN: {
    accent: "text-[#6D5CC6]",
    soft: "bg-[#8B7ED8]/[0.08]",
    border: "border-[#8B7ED8]/20",
    glow: "rgba(139,126,216,0.12)",
    dot: "bg-[#8B7ED8]",
  },
  FST: {
    accent: "text-[#A16207]",
    soft: "bg-[#F59E0B]/[0.09]",
    border: "border-[#F59E0B]/20",
    glow: "rgba(245,158,11,0.12)",
    dot: "bg-[#F59E0B]",
  },
  MFO: {
    accent: "text-[#075985]",
    soft: "bg-[#087EA4]/[0.08]",
    border: "border-[#087EA4]/20",
    glow: "rgba(8,126,164,0.12)",
    dot: "bg-[#087EA4]",
  },
};

const fallbackStyle = {
  accent: "text-[#087EA4]",
  soft: "bg-[#0891B2]/[0.08]",
  border: "border-[#0891B2]/20",
  glow: "rgba(8,145,178,0.12)",
  dot: "bg-[#0891B2]",
};

export default function TeacherModal({
  teacher,
  onClose,
}: Props) {
  /* ============================================================
     ESCAPE KEY
  ============================================================ */
  useEffect(() => {
    if (!teacher) return;

    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [teacher, onClose]);

  /* ============================================================
     BODY SCROLL LOCK
  ============================================================ */
  useEffect(() => {
    if (teacher) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

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
            className="fixed inset-0 z-50 bg-[#123B4A]/35 backdrop-blur-md"
            onClick={onClose}
          />

          {/* =====================================================
              MODAL POSITION
          ====================================================== */}
          <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.97,
                y: 18,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.97,
                y: 18,
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
              onClick={(event) => event.stopPropagation()}
              className="pointer-events-auto relative flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-[28px] border border-[#087EA4]/10 bg-white shadow-[0_30px_100px_rgba(8,59,74,0.22)]"
              style={{
                boxShadow: `
                  0 30px 100px rgba(8,59,74,0.22),
                  0 0 70px ${style.glow}
                `,
              }}
            >
              {/* =================================================
                  MODAL ATMOSPHERE
              ================================================== */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {/* Department glow */}
                <div
                  className={`absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full ${style.soft} opacity-70 blur-[120px]`}
                />

                <div className="absolute -bottom-44 -left-44 h-[430px] w-[430px] rounded-full bg-[#2DD4BF]/[0.035] blur-[120px]" />

                {/* Grid */}
                <div
                  className="absolute inset-0 opacity-[0.035]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(8,126,164,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(8,126,164,0.5) 1px, transparent 1px)",
                    backgroundSize: "70px 70px",
                  }}
                />

                {/* Top wash */}
                <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#0891B2]/[0.035] to-transparent" />
              </div>

              {/* =================================================
                  TOP ACCENT
              ================================================== */}
              <div
                className={`absolute inset-x-0 top-0 z-30 h-[2px] bg-gradient-to-r from-transparent via-current to-transparent ${style.accent}`}
              />

              {/* =================================================
                  HEADER
              ================================================== */}
              <header className="relative shrink-0 border-b border-[#087EA4]/10 bg-white/80 backdrop-blur-xl">
                <div className="relative px-5 pb-6 pt-6 sm:px-8 sm:pb-7 sm:pt-7">
                  {/* Close */}
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close profile"
                    className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-xl border border-[#087EA4]/10 bg-white text-[#55727D] shadow-sm transition-all duration-300 hover:border-[#087EA4]/20 hover:bg-[#F0FAFC] hover:text-[#075985] sm:right-6 sm:top-6"
                  >
                    <FaTimes size={12} />
                  </button>

                  {/* HOD */}
                  {teacher.isHOD && (
                    <motion.div
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`mb-5 inline-flex items-center gap-2 rounded-full border ${style.border} ${style.soft} px-3 py-1.5`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${style.dot}`}
                      />

                      <span
                        className={`text-[8px] font-bold uppercase tracking-[0.18em] ${style.accent}`}
                      >
                        Head of Department
                      </span>
                    </motion.div>
                  )}

                  {/* Profile header */}
                  <div className="flex items-center gap-4 pr-10 sm:gap-6">
                    {/* Avatar */}
                    <div className="relative shrink-0">
                      <div
                        className={`absolute -inset-3 rounded-[28px] ${style.soft} opacity-80 blur-xl`}
                      />

                      {teacher.photo ? (
                        <div
                          className={`relative h-[82px] w-[82px] overflow-hidden rounded-[23px] border ${style.border} bg-[#F0FAFC] shadow-[0_12px_30px_rgba(8,126,164,0.12)] sm:h-[104px] sm:w-[104px]`}
                        >
                          <Image
                            src={teacher.photo}
                            alt={teacher.name}
                            fill
                            sizes="104px"
                            className="object-cover"
                          />

                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#075985]/10 via-transparent to-white/10" />
                        </div>
                      ) : (
                        <div
                          className={`relative flex h-[82px] w-[82px] items-center justify-center rounded-[23px] border ${style.border} ${style.soft} sm:h-[104px] sm:w-[104px]`}
                        >
                          <span
                            className={`font-display text-3xl font-semibold sm:text-4xl ${style.accent}`}
                          >
                            {teacher.name?.[0]?.toUpperCase()}
                          </span>
                        </div>
                      )}

                      {/* Academic marker */}
                      <div
                        className={`absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-xl border ${style.border} bg-white shadow-[0_6px_18px_rgba(8,126,164,0.12)]`}
                      >
                        <FaGraduationCap
                          size={12}
                          className={style.accent}
                        />
                      </div>
                    </div>

                    {/* Identity */}
                    <div className="min-w-0">
                      <h2 className="font-display text-xl font-bold leading-tight text-[#123B4A] sm:text-2xl">
                        {teacher.name}
                      </h2>

                      {teacher.designation && (
                        <p
                          className={`mt-1.5 text-xs font-semibold sm:text-sm ${style.accent}`}
                        >
                          {teacher.designation}
                        </p>
                      )}

                      {teacher.department && (
                        <div
                          className={`mt-3 inline-flex max-w-full items-center gap-2 rounded-xl border ${style.border} ${style.soft} px-3 py-1.5`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${style.dot}`}
                          />

                          <span
                            className={`text-[9px] font-bold uppercase tracking-[0.08em] ${style.accent}`}
                          >
                            {teacher.department}
                          </span>

                          <span className="h-3 w-px bg-[#087EA4]/10" />

                          <span className="max-w-[190px] truncate text-[9px] font-medium text-[#55727D]">
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
              </header>

              {/* =================================================
                  SCROLLABLE CONTENT
              ================================================== */}
              <div className="relative min-h-0 flex-1 overflow-y-auto">
                <div className="relative px-5 py-6 sm:px-8 sm:py-7">
                  {/* =================================================
                      QUICK STATS
                  ================================================== */}
                  <div className="grid grid-cols-3 overflow-hidden rounded-2xl border border-[#087EA4]/10 bg-white/80 shadow-[0_8px_25px_rgba(8,126,164,0.045)]">
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
                      value={
                        teacher.researchAreas?.length || "—"
                      }
                      label="Research Areas"
                      accent={style.accent}
                      border
                    />
                  </div>

                  {/* =================================================
                      CONTACT
                  ================================================== */}
                  {(teacher.email || teacher.phone) && (
                    <section className="mt-7">
                      <SectionLabel
                        icon={<FaChalkboardTeacher size={9} />}
                        label="Contact Information"
                        accent={style.accent}
                      />

                      <div className="grid gap-3 sm:grid-cols-2">
                        {teacher.email && (
                          <a
                            href={`mailto:${teacher.email}`}
                            className="group flex min-w-0 items-center gap-3 rounded-2xl border border-[#087EA4]/10 bg-white/75 p-3.5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0891B2]/20 hover:bg-[#0891B2]/[0.025] hover:shadow-[0_10px_30px_rgba(8,145,178,0.08)]"
                          >
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#0891B2]/15 bg-[#0891B2]/[0.07]">
                              <FaEnvelope
                                className="text-[#087EA4]"
                                size={11}
                              />
                            </div>

                            <div className="min-w-0">
                              <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-[#55727D]/60">
                                Email
                              </p>

                              <p className="mt-1 truncate text-[11px] font-semibold text-[#123B4A] transition-colors group-hover:text-[#087EA4]">
                                {teacher.email}
                              </p>
                            </div>
                          </a>
                        )}

                        {teacher.phone && (
                          <a
                            href={`tel:${teacher.phone}`}
                            className="group flex min-w-0 items-center gap-3 rounded-2xl border border-[#087EA4]/10 bg-white/75 p-3.5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#2DD4BF]/25 hover:bg-[#2DD4BF]/[0.035] hover:shadow-[0_10px_30px_rgba(45,212,191,0.08)]"
                          >
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#2DD4BF]/20 bg-[#2DD4BF]/[0.08]">
                              <FaPhone
                                className="text-[#087A68]"
                                size={11}
                              />
                            </div>

                            <div className="min-w-0">
                              <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-[#55727D]/60">
                                Phone
                              </p>

                              <p className="mt-1 truncate text-[11px] font-semibold text-[#123B4A] transition-colors group-hover:text-[#087A68]">
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
                    <section className="mt-7">
                      <SectionLabel
                        icon={<FaChalkboardTeacher size={9} />}
                        label="About"
                        accent={style.accent}
                      />

                      <div className="rounded-2xl border border-[#087EA4]/10 bg-white/75 p-4 shadow-sm">
                        <p className="text-xs leading-6 text-[#55727D]">
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
                      <section className="mt-7">
                        <SectionLabel
                          icon={<FaFlask size={9} />}
                          label="Research Areas"
                          accent={style.accent}
                        />

                        <div className="flex flex-wrap gap-2">
                          {teacher.researchAreas.map(
                            (area, index) => (
                              <motion.span
                                key={index}
                                initial={{
                                  opacity: 0,
                                  y: 5,
                                }}
                                animate={{
                                  opacity: 1,
                                  y: 0,
                                }}
                                transition={{
                                  duration: 0.25,
                                  delay: index * 0.035,
                                }}
                                className={`rounded-xl border ${style.border} ${style.soft} px-3 py-2 text-[10px] font-semibold ${style.accent}`}
                              >
                                {area}
                              </motion.span>
                            )
                          )}
                        </div>
                      </section>
                    )}

                  {/* =================================================
                      EDUCATION
                  ================================================== */}
                  {teacher.education &&
                    teacher.education.length > 0 && (
                      <section className="mt-7">
                        <SectionLabel
                          icon={<FaUniversity size={9} />}
                          label="Education"
                          accent={style.accent}
                        />

                        <div className="space-y-3">
                          {teacher.education.map(
                            (edu, index) => (
                              <motion.div
                                key={index}
                                initial={{
                                  opacity: 0,
                                  x: -8,
                                }}
                                animate={{
                                  opacity: 1,
                                  x: 0,
                                }}
                                transition={{
                                  duration: 0.3,
                                  delay: index * 0.06,
                                }}
                                className="group flex gap-3 rounded-2xl border border-[#087EA4]/10 bg-white/75 p-3.5 shadow-sm transition-all duration-300 hover:border-[#087EA4]/20 hover:shadow-[0_10px_30px_rgba(8,126,164,0.06)]"
                              >
                                <div
                                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${style.border} ${style.soft}`}
                                >
                                  <FaGraduationCap
                                    className={style.accent}
                                    size={12}
                                  />
                                </div>

                                <div className="min-w-0">
                                  <p className="text-xs font-bold leading-5 text-[#123B4A]">
                                    {edu.degree}
                                  </p>

                                  <p className="mt-0.5 text-[11px] font-medium text-[#55727D]">
                                    {edu.institution}
                                  </p>

                                  {edu.year && (
                                    <div className="mt-1.5 inline-flex rounded-md bg-[#F0FAFC] px-2 py-1">
                                      <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#55727D]/70">
                                        {edu.year}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            )
                          )}
                        </div>
                      </section>
                    )}
                </div>

                {/* =================================================
                    FOOTER
                ================================================== */}
                <div className="sticky bottom-0 border-t border-[#087EA4]/10 bg-white/90 px-5 py-4 backdrop-blur-xl sm:px-8">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full rounded-xl border border-[#087EA4]/15 bg-[#F0FAFC] py-3 text-xs font-bold text-[#087EA4] transition-all duration-300 hover:border-[#087EA4]/25 hover:bg-[#0891B2]/[0.06] hover:text-[#075985]"
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
        border ? "border-l border-[#087EA4]/10" : ""
      }`}
    >
      <span className={accent}>{icon}</span>

      <p className="mt-1.5 font-display text-base font-bold leading-none text-[#123B4A]">
        {value}
      </p>

      <p className="mt-1 text-[8px] font-semibold uppercase tracking-[0.14em] text-[#55727D]/65">
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
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  accent: string;
}) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <span className={accent}>{icon}</span>

      <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#55727D]/75">
        {label}
      </span>

      <span className="h-px flex-1 bg-[#087EA4]/10" />
    </div>
  );
}

