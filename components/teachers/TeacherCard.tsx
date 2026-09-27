
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Teacher, Department, DEPARTMENTS } from "@/types";
import {
  FaEnvelope,
  FaBook,
  FaPhone,
  FaArrowUpRightFromSquare,
  FaGraduationCap,
} from "react-icons/fa6";

interface Props {
  teacher: Teacher;
  index?: number;
  onClick?: () => void;
}

const deptStyles: Record<
  string,
  {
    accent: string;
    accentSoft: string;
    border: string;
    glow: string;
    dot: string;
  }
> = {
  AQC: {
    accent: "text-[#087EA4]",
    accentSoft: "bg-[#0891B2]/[0.08]",
    border: "border-[#0891B2]/20",
    glow: "hover:shadow-[0_20px_55px_rgba(8,145,178,0.12)]",
    dot: "bg-[#0891B2]",
  },
  FBG: {
    accent: "text-[#087A68]",
    accentSoft: "bg-[#2DD4BF]/[0.10]",
    border: "border-[#2DD4BF]/25",
    glow: "hover:shadow-[0_20px_55px_rgba(45,212,191,0.12)]",
    dot: "bg-[#2DD4BF]",
  },
  FMN: {
    accent: "text-[#6D5CC6]",
    accentSoft: "bg-[#8B7ED8]/[0.08]",
    border: "border-[#8B7ED8]/20",
    glow: "hover:shadow-[0_20px_55px_rgba(139,126,216,0.12)]",
    dot: "bg-[#8B7ED8]",
  },
  FST: {
    accent: "text-[#A16207]",
    accentSoft: "bg-[#F59E0B]/[0.09]",
    border: "border-[#F59E0B]/20",
    glow: "hover:shadow-[0_20px_55px_rgba(245,158,11,0.12)]",
    dot: "bg-[#F59E0B]",
  },
  MFO: {
    accent: "text-[#075985]",
    accentSoft: "bg-[#087EA4]/[0.08]",
    border: "border-[#087EA4]/20",
    glow: "hover:shadow-[0_20px_55px_rgba(8,126,164,0.12)]",
    dot: "bg-[#087EA4]",
  },
};

const fallbackStyle = {
  accent: "text-[#087EA4]",
  accentSoft: "bg-[#0891B2]/[0.08]",
  border: "border-[#0891B2]/20",
  glow: "hover:shadow-[0_20px_55px_rgba(8,145,178,0.12)]",
  dot: "bg-[#0891B2]",
};

export default function TeacherCard({
  teacher,
  index = 0,
  onClick,
}: Props) {
  const style =
    deptStyles[teacher.department || ""] ?? fallbackStyle;

  const departmentName = teacher.department
    ? DEPARTMENTS[teacher.department as Department]
    : "";

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.05, 0.3),
        ease: "easeOut",
      }}
      whileHover={{
        y: -6,
        transition: {
          duration: 0.25,
          ease: "easeOut",
        },
      }}
      onClick={onClick}
      className={`group relative isolate cursor-pointer overflow-hidden rounded-[24px] border border-[#087EA4]/10 bg-white/80 shadow-[0_10px_35px_rgba(8,126,164,0.055)] backdrop-blur-xl transition-all duration-500 ${style.glow}`}
    >
      {/* =====================================================
          BACKGROUND ATMOSPHERE
      ====================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Department glow */}
        <div
          className={`absolute -right-16 -top-16 h-44 w-44 rounded-full ${style.accentSoft} opacity-60 blur-[65px] transition-all duration-700 group-hover:scale-125 group-hover:opacity-90`}
        />

        <div className="absolute -bottom-20 -left-16 h-36 w-36 rounded-full bg-[#2DD4BF]/[0.035] blur-[60px] transition-opacity duration-700 group-hover:opacity-80" />

        {/* Soft top gradient */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0891B2]/[0.025] to-transparent" />

        {/* Hover wash */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0891B2]/[0.025] via-transparent to-[#2DD4BF]/[0.02] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      {/* =====================================================
          TOP ACCENT LINE
      ====================================================== */}
      <div
        className={`absolute inset-x-6 top-0 h-[2px] bg-gradient-to-r from-transparent via-current to-transparent ${style.accent} opacity-30 transition-opacity duration-500 group-hover:opacity-80`}
      />

      {/* =====================================================
          HOD BADGE
      ====================================================== */}
      {teacher.isHOD && (
        <div
          className={`absolute left-4 top-4 z-20 inline-flex items-center gap-1.5 rounded-full border ${style.border} ${style.accentSoft} px-2.5 py-1.5 backdrop-blur-md`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${style.dot} shadow-[0_0_8px_currentColor]`}
          />

          <span
            className={`text-[8px] font-bold uppercase tracking-[0.16em] ${style.accent}`}
          >
            Head of Department
          </span>
        </div>
      )}

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <div className="relative z-10 flex flex-col px-5 pb-5 pt-7">
        {/* =================================================
            PROFILE
        ================================================== */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-5">
            {/* Avatar glow */}
            <div
              className={`absolute -inset-3 rounded-[26px] ${style.accentSoft} opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100`}
            />

            {teacher.photo ? (
              <div
                className={`relative h-[92px] w-[92px] overflow-hidden rounded-[24px] border ${style.border} bg-[#F0FAFC] shadow-[0_12px_30px_rgba(8,126,164,0.10)] transition-transform duration-500 group-hover:scale-[1.035]`}
              >
                <Image
                  src={teacher.photo}
                  alt={teacher.name}
                  fill
                  sizes="92px"
                  className="object-cover"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#075985]/10 via-transparent to-white/10" />
              </div>
            ) : (
              <div
                className={`relative flex h-[92px] w-[92px] items-center justify-center rounded-[24px] border ${style.border} ${style.accentSoft} shadow-[0_12px_30px_rgba(8,126,164,0.08)]`}
              >
                <span
                  className={`font-display text-3xl font-semibold ${style.accent}`}
                >
                  {teacher.name?.[0]?.toUpperCase()}
                </span>
              </div>
            )}

            {/* Academic badge */}
            <div
              className={`absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-xl border ${style.border} bg-white shadow-[0_6px_18px_rgba(8,126,164,0.12)]`}
            >
              <FaGraduationCap
                size={11}
                className={style.accent}
              />
            </div>
          </div>

          {/* =================================================
              NAME
          ================================================== */}
          <h3 className="max-w-[230px] font-display text-[15px] font-bold leading-5 text-[#123B4A] transition-colors duration-300 group-hover:text-[#075985]">
            {teacher.name}
          </h3>

          {/* =================================================
              DESIGNATION
          ================================================== */}
          {teacher.designation && (
            <p
              className={`mt-1.5 line-clamp-2 text-[10px] font-semibold leading-4 ${style.accent}`}
            >
              {teacher.designation}
            </p>
          )}

          {/* =================================================
              DEPARTMENT
          ================================================== */}
          {teacher.department && (
            <div
              className={`mt-4 inline-flex max-w-full items-center gap-2 rounded-xl border ${style.border} ${style.accentSoft} px-3 py-1.5`}
            >
              <span
                className={`h-1.5 w-1.5 shrink-0 rounded-full ${style.dot}`}
              />

              <span
                className={`text-[9px] font-bold uppercase tracking-[0.08em] ${style.accent}`}
              >
                {teacher.department}
              </span>

              {departmentName && (
                <>
                  <span className="h-3 w-px bg-[#087EA4]/10" />

                  <span className="max-w-[125px] truncate text-[9px] font-medium text-[#55727D]">
                    {departmentName}
                  </span>
                </>
              )}
            </div>
          )}
        </div>

        {/* =====================================================
            RESEARCH
        ====================================================== */}
        {teacher.researchAreas &&
          teacher.researchAreas.length > 0 && (
            <div className="mt-5 border-t border-[#087EA4]/10 pt-4">
              <div className="mb-2 flex items-center gap-2">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${style.dot}`}
                />

                <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#55727D]/70">
                  Research Interests
                </p>
              </div>

              <p className="line-clamp-2 text-left text-[10px] leading-5 text-[#55727D]">
                {teacher.researchAreas.join(" · ")}
              </p>
            </div>
          )}

        {/* =====================================================
            FOOTER
        ====================================================== */}
        <div className="mt-5 flex items-center justify-between border-t border-[#087EA4]/10 pt-3.5">
          {/* Publications */}
          <div>
            {teacher.publications ? (
              <div className="flex items-center gap-1.5 text-[9px] font-medium text-[#55727D]">
                <FaBook
                  size={9}
                  className={style.accent}
                />

                <span>
                  {teacher.publications} paper
                  {teacher.publications !== 1 ? "s" : ""}
                </span>
              </div>
            ) : (
              <span className="text-[9px] text-[#55727D]/40">
                Faculty Profile
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            {teacher.email && (
              <a
                href={`mailto:${teacher.email}`}
                onClick={(e) => e.stopPropagation()}
                aria-label={`Email ${teacher.name}`}
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#087EA4]/10 bg-white text-[#55727D] shadow-sm transition-all duration-300 hover:border-[#0891B2]/25 hover:bg-[#0891B2]/[0.06] hover:text-[#087EA4]"
              >
                <FaEnvelope size={10} />
              </a>
            )}

            {teacher.phone && (
              <a
                href={`tel:${teacher.phone}`}
                onClick={(e) => e.stopPropagation()}
                aria-label={`Call ${teacher.name}`}
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#087EA4]/10 bg-white text-[#55727D] shadow-sm transition-all duration-300 hover:border-[#0891B2]/25 hover:bg-[#0891B2]/[0.06] hover:text-[#087EA4]"
              >
                <FaPhone size={10} />
              </a>
            )}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClick?.();
              }}
              aria-label={`View ${teacher.name}'s profile`}
              className={`flex h-8 w-8 items-center justify-center rounded-xl border ${style.border} ${style.accentSoft} ${style.accent} shadow-sm transition-all duration-300 hover:-translate-y-0.5`}
            >
              <FaArrowUpRightFromSquare size={10} />
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM HOVER LINE
      ====================================================== */}
      <div
        className={`absolute inset-x-6 bottom-0 h-[2px] origin-center scale-x-0 bg-gradient-to-r from-transparent via-current to-transparent ${style.accent} opacity-70 transition-transform duration-500 group-hover:scale-x-100`}
      />
    </motion.article>
  );
}

