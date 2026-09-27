"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Teacher, Department, DEPARTMENTS } from "@/types";
import {
  FaEnvelope,
  FaBook,
  FaPhone,
  // FaChalkboardTeacher,
  FaArrowUpRightFromSquare,
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
    accent: "text-cyan-300",
    accentSoft: "bg-cyan-400/[0.08]",
    border: "border-cyan-300/20",
    glow: "group-hover:shadow-[0_0_35px_rgba(34,211,238,0.07)]",
    dot: "bg-cyan-300",
  },
  FBG: {
    accent: "text-emerald-300",
    accentSoft: "bg-emerald-400/[0.08]",
    border: "border-emerald-300/20",
    glow: "group-hover:shadow-[0_0_35px_rgba(52,211,153,0.07)]",
    dot: "bg-emerald-300",
  },
  FMN: {
    accent: "text-violet-300",
    accentSoft: "bg-violet-400/[0.08]",
    border: "border-violet-300/20",
    glow: "group-hover:shadow-[0_0_35px_rgba(167,139,250,0.07)]",
    dot: "bg-violet-300",
  },
  FST: {
    accent: "text-amber-300",
    accentSoft: "bg-amber-400/[0.08]",
    border: "border-amber-300/20",
    glow: "group-hover:shadow-[0_0_35px_rgba(251,191,36,0.07)]",
    dot: "bg-amber-300",
  },
  MFO: {
    accent: "text-sky-300",
    accentSoft: "bg-sky-400/[0.08]",
    border: "border-sky-300/20",
    glow: "group-hover:shadow-[0_0_35px_rgba(56,189,248,0.07)]",
    dot: "bg-sky-300",
  },
};

const fallbackStyle = {
  accent: "text-cyan-300",
  accentSoft: "bg-cyan-400/[0.08]",
  border: "border-cyan-300/20",
  glow: "group-hover:shadow-[0_0_35px_rgba(34,211,238,0.07)]",
  dot: "bg-cyan-300",
};

export default function TeacherCard({
  teacher,
  index = 0,
  onClick,
}: Props) {
  const style = deptStyles[teacher.department || ""] ?? fallbackStyle;

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.05, 0.3),
        ease: "easeOut",
      }}
      whileHover={{
        y: -5,
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      onClick={onClick}
      className={`group relative isolate cursor-pointer overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-xl transition-[border-color,box-shadow] duration-500 ${style.glow}`}
    >
      {/* =====================================================
          BACKGROUND ATMOSPHERE
      ====================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className={`absolute -right-20 -top-20 h-48 w-48 rounded-full ${style.accentSoft} opacity-40 blur-[70px] transition-opacity duration-500 group-hover:opacity-70`}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.018] via-transparent to-transparent" />

        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.025), transparent 45%)",
          }}
        />
      </div>

      {/* =====================================================
          TOP ACCENT
      ====================================================== */}
      <div
        className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-current to-transparent ${style.accent} opacity-25 transition-opacity duration-500 group-hover:opacity-60`}
      />

      {/* =====================================================
          HOD
      ====================================================== */}
      {teacher.isHOD && (
        <div
          className={`absolute left-4 top-4 z-20 inline-flex items-center gap-1.5 rounded-full border ${style.border} ${style.accentSoft} px-2.5 py-1 backdrop-blur-xl`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${style.dot} shadow-[0_0_8px_currentColor]`}
          />

          <span
            className={`text-[8px] font-semibold uppercase tracking-[0.18em] ${style.accent}`}
          >
            Head of Department
          </span>
        </div>
      )}

      {/* =====================================================
          PROFILE AREA
      ====================================================== */}
      <div className="relative z-10 flex flex-col items-center px-5 pb-5 pt-7 text-center">
        {/* Avatar */}
        <div className="relative mb-5">
          <div
            className={`absolute -inset-2 rounded-[22px] ${style.accentSoft} opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100`}
          />

          {teacher.photo ? (
            <div
              className={`relative h-[88px] w-[88px] overflow-hidden rounded-[20px] border ${style.border} bg-slate-900 shadow-2xl transition-transform duration-500 group-hover:scale-[1.025]`}
            >
              <Image
                src={teacher.photo}
                alt={teacher.name}
                fill
                sizes="88px"
                className="object-cover"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          ) : (
            <div
              className={`relative flex h-[88px] w-[88px] items-center justify-center rounded-[20px] border ${style.border} ${style.accentSoft} shadow-2xl`}
            >
              <span
                className={`font-display text-3xl font-semibold ${style.accent}`}
              >
                {teacher.name?.[0]?.toUpperCase()}
              </span>
            </div>
          )}

          {/* Small academic marker */}
          <div
            className={`absolute -bottom-2 -right-2 flex h-7 w-7 items-center justify-center rounded-xl border border-white/[0.08] bg-[#071321] shadow-lg`}
          >
            {/* <FaChalkboardTeacher
              className={style.accent}
              size={10}
            /> */}
          </div>
        </div>

        {/* =================================================
            NAME
        ================================================== */}
        <h3 className="max-w-[220px] font-display text-sm font-semibold leading-5 text-slate-100 transition-colors duration-300 group-hover:text-white">
          {teacher.name}
        </h3>

        {/* Designation */}
        {teacher.designation && (
          <p
            className={`mt-1.5 line-clamp-2 text-[10px] font-medium leading-4 ${style.accent}`}
          >
            {teacher.designation}
          </p>
        )}

        {/* =================================================
            DEPARTMENT
        ================================================== */}
        {teacher.department && (
          <div
            className={`mt-4 inline-flex max-w-full items-center gap-2 rounded-lg border ${style.border} ${style.accentSoft} px-2.5 py-1.5`}
          >
            <span
              className={`h-1 w-1 shrink-0 rounded-full ${style.dot}`}
            />

            <span
              className={`truncate text-[9px] font-medium uppercase tracking-[0.08em] ${style.accent}`}
            >
              {teacher.department}
            </span>

            <span className="max-w-[130px] truncate text-[9px] text-slate-600">
              {DEPARTMENTS[teacher.department as Department]}
            </span>
          </div>
        )}

        {/* =================================================
            RESEARCH
        ================================================== */}
        {teacher.researchAreas && teacher.researchAreas.length > 0 && (
          <div className="mt-4 w-full border-t border-white/[0.05] pt-4">
            <p className="mb-2 text-left text-[8px] font-medium uppercase tracking-[0.18em] text-slate-700">
              Research interests
            </p>

            <p className="line-clamp-2 text-left text-[10px] leading-5 text-slate-500">
              {teacher.researchAreas.join(" · ")}
            </p>
          </div>
        )}

        {/* =================================================
            FOOTER
        ================================================== */}
        <div className="mt-4 flex w-full items-center justify-between border-t border-white/[0.05] pt-3">
          {/* Publications */}
          {teacher.publications ? (
            <div className="flex items-center gap-1.5 text-[9px] text-slate-600">
              <FaBook size={9} className="text-slate-700" />
              <span>
                {teacher.publications} paper
                {teacher.publications !== 1 ? "s" : ""}
              </span>
            </div>
          ) : (
            <span />
          )}

          {/* Contact */}
          <div className="flex items-center gap-1">
            {teacher.email && (
              <a
                href={`mailto:${teacher.email}`}
                onClick={(e) => e.stopPropagation()}
                aria-label={`Email ${teacher.name}`}
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.05] bg-white/[0.02] text-slate-600 transition-all duration-300 hover:border-cyan-300/20 hover:bg-cyan-400/[0.07] hover:text-cyan-300"
              >
                <FaEnvelope size={9} />
              </a>
            )}

            {teacher.phone && (
              <a
                href={`tel:${teacher.phone}`}
                onClick={(e) => e.stopPropagation()}
                aria-label={`Call ${teacher.name}`}
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.05] bg-white/[0.02] text-slate-600 transition-all duration-300 hover:border-cyan-300/20 hover:bg-cyan-400/[0.07] hover:text-cyan-300"
              >
                <FaPhone size={9} />
              </a>
            )}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClick?.();
              }}
              aria-label={`View ${teacher.name}'s profile`}
              className={`flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.05] bg-white/[0.02] text-slate-600 transition-all duration-300 hover:${style.accent} hover:border-white/[0.1]`}
            >
              <FaArrowUpRightFromSquare size={9} />
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================
          HOVER LINE
      ====================================================== */}
      <div
        className={`absolute inset-x-5 bottom-0 h-px origin-center scale-x-0 bg-current ${style.accent} opacity-50 transition-transform duration-500 group-hover:scale-x-100`}
      />
    </motion.article>
  );
}