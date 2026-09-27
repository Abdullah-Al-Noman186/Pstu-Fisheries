"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Alumni } from "@/types";
import {
  FaLinkedin,
  FaMapMarkerAlt,
  FaBriefcase,
  FaPhone,
  FaEnvelope,
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
    accent: "text-cyan-300",
    accentSoft: "bg-cyan-400/[0.08]",
    border: "border-cyan-300/20",
    glow: "bg-cyan-400/[0.045]",
    dot: "bg-cyan-300",
  },
  FBG: {
    accent: "text-emerald-300",
    accentSoft: "bg-emerald-400/[0.08]",
    border: "border-emerald-300/20",
    glow: "bg-emerald-400/[0.045]",
    dot: "bg-emerald-300",
  },
  FMN: {
    accent: "text-violet-300",
    accentSoft: "bg-violet-400/[0.08]",
    border: "border-violet-300/20",
    glow: "bg-violet-400/[0.045]",
    dot: "bg-violet-300",
  },
  FST: {
    accent: "text-amber-300",
    accentSoft: "bg-amber-400/[0.08]",
    border: "border-amber-300/20",
    glow: "bg-amber-400/[0.045]",
    dot: "bg-amber-300",
  },
  MFO: {
    accent: "text-sky-300",
    accentSoft: "bg-sky-400/[0.08]",
    border: "border-sky-300/20",
    glow: "bg-sky-400/[0.045]",
    dot: "bg-sky-300",
  },
};

const defaultStyle = {
  accent: "text-cyan-300",
  accentSoft: "bg-cyan-400/[0.08]",
  border: "border-cyan-300/20",
  glow: "bg-cyan-400/[0.045]",
  dot: "bg-cyan-300",
};

export default function AlumniCard({
  alumni,
  index = 0,
  onClick,
}: Props) {
  const style =
    departmentStyles[alumni.department || ""] || defaultStyle;

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
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="group relative cursor-pointer"
    >
      {/* Soft department glow */}
      <div
        className={`pointer-events-none absolute -inset-1 rounded-[22px] ${style.glow} opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100`}
      />

      {/* Card */}
      <div className="relative isolate overflow-hidden rounded-[20px] border border-white/[0.07] bg-[#06111f]/90 backdrop-blur-xl transition-all duration-500 group-hover:border-white/[0.12] group-hover:bg-[#071525]">
        {/* Very subtle top accent */}
        <div
          className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-current to-transparent ${style.accent} opacity-30`}
        />

        {/* Background atmosphere */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-cyan-400/[0.025] blur-3xl transition-all duration-700 group-hover:bg-cyan-400/[0.045]" />

        <div className="relative p-5">
          {/* Header */}
          <div className="flex items-start gap-3.5">
            {/* Avatar */}
            <div className="relative shrink-0">
              {alumni.photo ? (
                <div className="relative h-[68px] w-[68px] overflow-hidden rounded-[17px] border border-white/[0.09] bg-white/[0.03]">
                  <Image
                    src={alumni.photo}
                    alt={alumni.name}
                    fill
                    sizes="68px"
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              ) : (
                <div
                  className={`flex h-[68px] w-[68px] items-center justify-center rounded-[17px] border ${style.border} ${style.accentSoft} ${style.accent} text-xl font-semibold`}
                >
                  {alumni.name?.[0]?.toUpperCase() || "A"}
                </div>
              )}

              {/* Online/accent indicator */}
              <span
                className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-[#06111f] ${style.dot}`}
              />
            </div>

            {/* Name + position */}
            <div className="min-w-0 flex-1 pt-0.5">
              <h3 className="truncate font-display text-[15px] font-semibold tracking-tight text-slate-100 transition-colors group-hover:text-white">
                {alumni.name}
              </h3>

              {alumni.currentPosition && (
                <p className="mt-1.5 flex items-center gap-1.5 truncate text-[11px] leading-5 text-slate-500">
                  <FaBriefcase
                    size={8}
                    className={`${style.accent} shrink-0 opacity-60`}
                  />
                  <span className="truncate">
                    {alumni.currentPosition}
                  </span>
                </p>
              )}
            </div>

            {/* LinkedIn */}
            {alumni.linkedin && alumni.linkedin !== "#" && (
              <a
                href={alumni.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${alumni.name} LinkedIn profile`}
                onClick={(event) => event.stopPropagation()}
                className={`relative z-30 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-slate-600 transition-all duration-300 hover:border-cyan-300/20 hover:bg-cyan-400/[0.08] hover:text-cyan-300`}
              >
                <FaLinkedin size={13} />
              </a>
            )}
          </div>

          {/* Organization */}
          {alumni.organization && (
            <div className="mt-5 flex items-center gap-2.5 border-l border-white/[0.08] pl-3">
              <div
                className={`h-1.5 w-1.5 shrink-0 rounded-full ${style.dot} opacity-60`}
              />

              <p className="truncate text-[11px] font-medium tracking-wide text-slate-400">
                {alumni.organization}
              </p>
            </div>
          )}

          {/* Contact */}
          {(alumni.phone || alumni.email) && (
            <div className="mt-4 grid gap-2">
              {alumni.phone && (
                <a
                  href={`tel:${alumni.phone}`}
                  onClick={(event) => event.stopPropagation()}
                  className="group/contact flex min-w-0 items-center gap-2.5 rounded-xl border border-white/[0.045] bg-white/[0.018] px-3 py-2 transition-all duration-300 hover:border-white/[0.08] hover:bg-white/[0.035]"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-white/[0.035] text-slate-600 transition-colors group-hover/contact:text-slate-300">
                    <FaPhone size={8} />
                  </span>

                  <span className="truncate text-[10px] text-slate-600 transition-colors group-hover/contact:text-slate-400">
                    {alumni.phone}
                  </span>
                </a>
              )}

              {alumni.email && (
                <a
                  href={`mailto:${alumni.email}`}
                  onClick={(event) => event.stopPropagation()}
                  className="group/contact flex min-w-0 items-center gap-2.5 rounded-xl border border-white/[0.045] bg-white/[0.018] px-3 py-2 transition-all duration-300 hover:border-white/[0.08] hover:bg-white/[0.035]"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-white/[0.035] text-slate-600 transition-colors group-hover/contact:text-slate-300">
                    <FaEnvelope size={8} />
                  </span>

                  <span className="truncate text-[10px] text-slate-600 transition-colors group-hover/contact:text-slate-400">
                    {alumni.email}
                  </span>
                </a>
              )}
            </div>
          )}

          {/* Bottom metadata */}
          <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/[0.055] pt-4">
            <div className="flex min-w-0 items-center gap-2">
              {alumni.batch && (
                <span
                  className={`inline-flex items-center rounded-lg border ${style.border} ${style.accentSoft} px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.08em] ${style.accent}`}
                >
                  Batch &apos;{String(alumni.batch).slice(-2)}
                </span>
              )}

              {alumni.department && (
                <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-slate-700">
                  {alumni.department}
                </span>
              )}
            </div>

            {alumni.location && (
              <span className="flex min-w-0 max-w-[42%] items-center gap-1.5 text-[9px] text-slate-600">
                <FaMapMarkerAlt
                  size={8}
                  className="shrink-0 text-slate-700"
                />
                <span className="truncate">
                  {alumni.location.split(",")[0]}
                </span>
              </span>
            )}
          </div>

          {/* Hover footer */}
          <div className="mt-4 flex items-center justify-between opacity-0 transition-all duration-300 group-hover:opacity-100">
            <span
              className={`text-[9px] font-medium uppercase tracking-[0.16em] ${style.accent} opacity-70`}
            >
              View profile
            </span>

            <span
              className={`flex h-6 w-6 items-center justify-center rounded-lg border ${style.border} ${style.accentSoft} ${style.accent} transition-transform duration-300 group-hover:translate-x-0.5`}
            >
              {/* <FaArrowUpRightFromSquare size={8} /> */}
            </span>
          </div>
        </div>

        {/* Bottom hover line */}
        <div
          className={`absolute inset-x-5 bottom-0 h-px origin-left scale-x-0 ${style.accent} bg-current opacity-40 transition-transform duration-500 group-hover:scale-x-100`}
        />
      </div>
    </motion.article>
  );
}