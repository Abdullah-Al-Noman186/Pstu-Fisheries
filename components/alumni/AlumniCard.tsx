
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Alumni } from "@/types";
import {
  FaLinkedin,
  FaMapMarkerAlt,
  FaBriefcase,
  FaGraduationCap,
  // FaArrowUpRightFromSquare,
} from "react-icons/fa";

interface Props {
  alumni: Alumni;
  index?: number;
  onClick?: () => void;
}

const departmentStyles: Record<
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
    glow: "hover:shadow-[0_20px_55px_rgba(8,145,178,0.11)]",
    dot: "bg-[#0891B2]",
  },
  FBG: {
    accent: "text-[#087A68]",
    accentSoft: "bg-[#2DD4BF]/[0.10]",
    border: "border-[#2DD4BF]/25",
    glow: "hover:shadow-[0_20px_55px_rgba(45,212,191,0.11)]",
    dot: "bg-[#2DD4BF]",
  },
  FMN: {
    accent: "text-[#6D5CC6]",
    accentSoft: "bg-[#8B7ED8]/[0.08]",
    border: "border-[#8B7ED8]/20",
    glow: "hover:shadow-[0_20px_55px_rgba(139,126,216,0.11)]",
    dot: "bg-[#8B7ED8]",
  },
  FST: {
    accent: "text-[#A16207]",
    accentSoft: "bg-[#F59E0B]/[0.09]",
    border: "border-[#F59E0B]/20",
    glow: "hover:shadow-[0_20px_55px_rgba(245,158,11,0.11)]",
    dot: "bg-[#F59E0B]",
  },
  MFO: {
    accent: "text-[#075985]",
    accentSoft: "bg-[#087EA4]/[0.08]",
    border: "border-[#087EA4]/20",
    glow: "hover:shadow-[0_20px_55px_rgba(8,126,164,0.11)]",
    dot: "bg-[#087EA4]",
  },
};

const defaultStyle = {
  accent: "text-[#087EA4]",
  accentSoft: "bg-[#0891B2]/[0.08]",
  border: "border-[#0891B2]/20",
  glow: "hover:shadow-[0_20px_55px_rgba(8,145,178,0.11)]",
  dot: "bg-[#0891B2]",
};

export default function AlumniCard({
  alumni,
  index = 0,
  onClick,
}: Props) {
  const style =
    departmentStyles[alumni.department || ""] ?? defaultStyle;

  const batchLabel = alumni.batch
    ? `Batch '${String(alumni.batch).slice(-2)}`
    : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.05, 0.3),
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -6,
        transition: {
          duration: 0.25,
          ease: "easeOut",
        },
      }}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? `View ${alumni.name}'s alumni profile` : undefined}
      onKeyDown={(event) => {
        if (onClick && (event.key === "Enter" || event.key === " ")) {
          if (event.target !== event.currentTarget) return;
          event.preventDefault();
          onClick();
        }
      }}
      className="group relative cursor-pointer rounded-[24px] focus-visible:outline-offset-4"
    >
      {/* =====================================================
          OUTER GLOW
      ====================================================== */}
      <div
        className={`pointer-events-none absolute -inset-1 rounded-[25px] ${style.accentSoft} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-80`}
      />

      {/* =====================================================
          CARD
      ====================================================== */}
      <div
        className={`relative isolate overflow-hidden rounded-[24px] border border-[#087EA4]/10 bg-white/80 shadow-[0_10px_35px_rgba(8,126,164,0.055)] backdrop-blur-xl transition-all duration-500 group-hover:border-[#087EA4]/15 ${style.glow}`}
      >
        {/* ===================================================
            TOP ACCENT
        ==================================================== */}
        <div
          className={`absolute inset-x-6 top-0 h-[2px] bg-gradient-to-r from-transparent via-current to-transparent ${style.accent} opacity-30 transition-opacity duration-500 group-hover:opacity-75`}
        />

        {/* ===================================================
            BACKGROUND ATMOSPHERE
        ==================================================== */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className={`absolute -right-20 -top-20 h-48 w-48 rounded-full ${style.accentSoft} opacity-50 blur-[75px] transition-all duration-700 group-hover:scale-125 group-hover:opacity-90`}
          />

          <div className="absolute -bottom-24 -left-20 h-40 w-40 rounded-full bg-[#2DD4BF]/[0.035] blur-[65px]" />

          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0891B2]/[0.025] to-transparent" />
        </div>

        {/* ===================================================
            CONTENT
        ==================================================== */}
        <div className="relative z-10 p-5">
          {/* =================================================
              PROFILE HEADER
          ================================================== */}
          <div className="flex items-start gap-3.5">
            {/* Avatar */}
            <div className="relative shrink-0">
              {/* Avatar glow */}
              <div
                className={`absolute -inset-2.5 rounded-[22px] ${style.accentSoft} opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100`}
              />

              {alumni.photo ? (
                <div
                  className={`relative h-[72px] w-[72px] overflow-hidden rounded-[19px] border ${style.border} bg-[#F0FAFC] shadow-[0_10px_25px_rgba(8,126,164,0.10)] transition-transform duration-500 group-hover:scale-[1.035]`}
                >
                  <Image
                    src={alumni.photo}
                    alt={alumni.name}
                    fill
                    sizes="72px"
                    className="object-cover"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#075985]/10 via-transparent to-white/10" />
                </div>
              ) : (
                <div
                  className={`relative flex h-[72px] w-[72px] items-center justify-center rounded-[19px] border ${style.border} ${style.accentSoft} shadow-sm`}
                >
                  <span
                    className={`font-display text-2xl font-bold ${style.accent}`}
                  >
                    {alumni.name?.[0]?.toUpperCase() || "A"}
                  </span>
                </div>
              )}

              {/* Alumni marker */}
              <div
                className={`absolute -bottom-2 -right-2 flex h-7 w-7 items-center justify-center rounded-xl border ${style.border} bg-white shadow-[0_5px_15px_rgba(8,126,164,0.10)]`}
              >
                <FaGraduationCap
                  size={10}
                  className={style.accent}
                />
              </div>
            </div>

            {/* Name / Position */}
            <div className="min-w-0 flex-1 pt-0.5">
              <h3 className="truncate font-display text-[15px] font-bold tracking-tight text-[#123B4A] transition-colors duration-300 group-hover:text-[#075985]">
                {alumni.name}
              </h3>

              {alumni.currentPosition && (
                <div className="mt-1.5 flex min-w-0 items-center gap-1.5">
                  <FaBriefcase
                    size={8}
                    className={`${style.accent} shrink-0 opacity-70`}
                  />

                  <p className="truncate text-[10px] font-medium leading-5 text-[#55727D]">
                    {alumni.currentPosition}
                  </p>
                </div>
              )}
              {alumni.presentStatus && (
                <span className="mt-2 inline-flex rounded-full bg-[#0891B2]/[0.08] px-2.5 py-1 text-[9px] font-semibold text-[#087EA4]">
                  {alumni.presentStatus}
                </span>
              )}
            </div>

            {/* LinkedIn */}
            {alumni.linkedin &&
              alumni.linkedin !== "#" && (
                <a
                  href={alumni.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${alumni.name} LinkedIn profile`}
                  onClick={(event) =>
                    event.stopPropagation()
                  }
                  className="relative z-30 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[#087EA4]/10 bg-white text-[#55727D] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#087EA4]/20 hover:bg-[#087EA4]/[0.06] hover:text-[#087EA4]"
                >
                  <FaLinkedin size={13} />
                </a>
              )}
          </div>

          {/* =================================================
              ORGANIZATION
          ================================================== */}
          {alumni.organization && (
            <div className="mt-5 flex items-center gap-2.5 rounded-xl border border-[#087EA4]/10 bg-[#F0FAFC]/55 px-3 py-2.5">
              <span
                className={`h-1.5 w-1.5 shrink-0 rounded-full ${style.dot}`}
              />

              <p className="truncate text-[10px] font-semibold tracking-wide text-[#55727D]">
                {alumni.organization}
              </p>
            </div>
          )}

          {/* =================================================
              BOTTOM METADATA
          ================================================== */}
          <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#087EA4]/10 pt-4">
            {/* Batch */}
            <div className="flex min-w-0 items-center gap-2">
              {batchLabel ? (
                <span
                  className={`inline-flex items-center gap-1.5 rounded-lg border ${style.border} ${style.accentSoft} px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.08em] ${style.accent}`}
                >
                  <FaGraduationCap size={8} />
                  {batchLabel}
                </span>
              ) : (
                <span className="text-[9px] font-medium text-[#55727D]/45">
                  Alumni Profile
                </span>
              )}
            </div>

            {/* Location */}
            {alumni.location && (
              <div className="flex min-w-0 max-w-[45%] items-center gap-1.5">
                <FaMapMarkerAlt
                  size={8}
                  className={`${style.accent} shrink-0 opacity-65`}
                />

                <span className="truncate text-[9px] font-medium text-[#55727D]">
                  {alumni.location.split(",")[0]}
                </span>
              </div>
            )}
          </div>

          {/* =================================================
              VIEW PROFILE
          ================================================== */}
          <div className="mt-4 flex items-center justify-between border-t border-[#087EA4]/10 pt-3.5">
            <span
              className={`text-[9px] font-bold uppercase tracking-[0.16em] ${style.accent} opacity-65 transition-opacity duration-300 group-hover:opacity-100`}
            >
              View Alumni Profile
            </span>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onClick?.();
              }}
              aria-label={`View ${alumni.name}'s profile`}
              className={`flex h-7 w-7 items-center justify-center rounded-lg border ${style.border} ${style.accentSoft} ${style.accent} transition-all duration-300 group-hover:translate-x-0.5`}
            >
              {/* <FaArrowUpRightFromSquare size={9} /> */}
            </button>
          </div>
        </div>

        {/* ===================================================
            BOTTOM HOVER LINE
        ==================================================== */}
        <div
          className={`absolute inset-x-6 bottom-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-transparent via-current to-transparent ${style.accent} opacity-70 transition-transform duration-500 group-hover:scale-x-100`}
        />
      </div>
    </motion.article>
  );
}

