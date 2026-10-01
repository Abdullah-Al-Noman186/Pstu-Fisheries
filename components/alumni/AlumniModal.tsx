
"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Alumni } from "@/types";
import {
  FaLinkedin,
  FaMapMarkerAlt,
  FaBriefcase,
  FaPhone,
  FaEnvelope,
  FaTimes,
  FaTrophy,
  FaQuoteLeft,
  FaCalendarAlt,
  FaGraduationCap,
} from "react-icons/fa";
import { useEffect } from "react";

interface Props {
  alumni: Alumni | null;
  onClose: () => void;
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
    glow: "bg-[#0891B2]/[0.07]",
    dot: "bg-[#0891B2]",
  },
  FBG: {
    accent: "text-[#087A68]",
    accentSoft: "bg-[#2DD4BF]/[0.10]",
    border: "border-[#2DD4BF]/25",
    glow: "bg-[#2DD4BF]/[0.07]",
    dot: "bg-[#2DD4BF]",
  },
  FMN: {
    accent: "text-[#6D5CC6]",
    accentSoft: "bg-[#8B7ED8]/[0.08]",
    border: "border-[#8B7ED8]/20",
    glow: "bg-[#8B7ED8]/[0.07]",
    dot: "bg-[#8B7ED8]",
  },
  FST: {
    accent: "text-[#A16207]",
    accentSoft: "bg-[#F59E0B]/[0.09]",
    border: "border-[#F59E0B]/20",
    glow: "bg-[#F59E0B]/[0.06]",
    dot: "bg-[#F59E0B]",
  },
  MFO: {
    accent: "text-[#075985]",
    accentSoft: "bg-[#087EA4]/[0.08]",
    border: "border-[#087EA4]/20",
    glow: "bg-[#087EA4]/[0.07]",
    dot: "bg-[#087EA4]",
  },
};

const defaultStyle = {
  accent: "text-[#087EA4]",
  accentSoft: "bg-[#0891B2]/[0.08]",
  border: "border-[#0891B2]/20",
  glow: "bg-[#0891B2]/[0.07]",
  dot: "bg-[#0891B2]",
};

export default function AlumniModal({ alumni, onClose }: Props) {
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
    if (alumni) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [alumni]);

  const style =
    departmentStyles[alumni?.department || ""] || defaultStyle;

  return (
    <AnimatePresence>
      {alumni && (
        <>
          {/* =========================================================
              BACKDROP
          ========================================================= */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-[#123B4A]/35 backdrop-blur-md"
            onClick={onClose}
          />

          {/* =========================================================
              MODAL WRAPPER
          ========================================================= */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
              y: 18,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.96,
              y: 18,
            }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5"
          >
            <div
              onClick={(event) => event.stopPropagation()}
              className="relative flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-[28px] border border-[#087EA4]/10 bg-white shadow-[0_30px_100px_rgba(8,59,74,0.22)]"
            >
              {/* =====================================================
                  AMBIENT BACKGROUND
              ===================================================== */}
              <div
                className={`pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full ${style.glow} blur-[90px]`}
              />

              <div className="pointer-events-none absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-[#2DD4BF]/[0.05] blur-[100px]" />

              {/* Subtle grid */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.035]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(8,126,164,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(8,126,164,0.8) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />

              {/* Top accent */}
              <div className="absolute inset-x-0 top-0 z-20 h-1 bg-gradient-to-r from-[#075985] via-[#087EA4] to-[#2DD4BF]" />

              {/* =====================================================
                  HEADER
              ===================================================== */}
              <div className="relative z-10 shrink-0 border-b border-[#087EA4]/10 bg-white/85 px-5 pb-6 pt-6 backdrop-blur-xl sm:px-7 sm:pb-7">
                {/* Close */}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close alumni profile"
                  className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-xl border border-[#087EA4]/10 bg-[#F0FAFC]/80 text-[#55727D] transition-all duration-300 hover:border-[#087EA4]/20 hover:bg-[#0891B2]/[0.08] hover:text-[#087EA4] sm:right-5 sm:top-5"
                >
                  <FaTimes size={12} />
                </button>

                <div className="flex items-start gap-4 pr-10 sm:gap-5">
                  {/* =================================================
                      AVATAR
                  ================================================= */}
                  <div className="relative shrink-0">
                    {alumni.photo ? (
                      <div className="relative h-[84px] w-[84px] overflow-hidden rounded-[22px] border border-[#087EA4]/10 bg-[#F0FAFC] shadow-[0_10px_30px_rgba(8,126,164,0.10)] sm:h-[96px] sm:w-[96px]">
                        <Image
                          src={alumni.photo}
                          alt={alumni.name}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-[#075985]/20 to-transparent" />
                      </div>
                    ) : (
                      <div
                        className={`flex h-[84px] w-[84px] items-center justify-center rounded-[22px] border ${style.border} ${style.accentSoft} ${style.accent} text-3xl font-semibold shadow-sm sm:h-[96px] sm:w-[96px]`}
                      >
                        {alumni.name?.[0]?.toUpperCase() || "A"}
                      </div>
                    )}

                    {/* Graduation badge */}
                    <span
                      className={`absolute -bottom-2 -right-2 flex h-7 w-7 items-center justify-center rounded-lg border-2 border-white ${style.accentSoft} ${style.accent} shadow-sm`}
                    >
                      <FaGraduationCap size={11} />
                    </span>

                    {/* Status dot */}
                    <span
                      className={`absolute -right-1.5 top-2 h-3.5 w-3.5 rounded-full border-2 border-white ${style.dot}`}
                    />
                  </div>

                  {/* =================================================
                      IDENTITY
                  ================================================= */}
                  <div className="min-w-0 flex-1 pt-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      {alumni.department && (
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-lg border ${style.border} ${style.accentSoft} px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] ${style.accent}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${style.dot}`}
                          />
                          {alumni.department}
                        </span>
                      )}

                      {alumni.batch && (
                        <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#087EA4]/10 bg-[#F0FAFC] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#55727D]">
                          <FaCalendarAlt size={8} />
                          Batch &apos;{String(alumni.batch).slice(-2)}
                        </span>
                      )}
                    </div>

                    <h2 className="font-display text-xl font-bold leading-tight tracking-tight text-[#123B4A] sm:text-2xl">
                      {alumni.name}
                    </h2>
                    {alumni.nameBn && (
                      <p lang="bn" className="mt-1 text-sm text-[#55727D]">
                        {alumni.nameBn}
                      </p>
                    )}

                    {alumni.currentPosition && (
                      <p className="mt-2 flex items-center gap-2 text-xs leading-5 text-[#55727D] sm:text-sm">
                        <FaBriefcase
                          size={9}
                          className={`shrink-0 ${style.accent}`}
                        />
                        <span>{alumni.currentPosition}</span>
                      </p>
                    )}

                    {alumni.linkedin &&
                      alumni.linkedin !== "#" && (
                        <a
                          href={alumni.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(event) =>
                            event.stopPropagation()
                          }
                          className={`mt-3 inline-flex items-center gap-2 rounded-lg border ${style.border} ${style.accentSoft} px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] ${style.accent} transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm`}
                        >
                          <FaLinkedin size={11} />
                          LinkedIn Profile
                        </a>
                      )}
                  </div>
                </div>
              </div>

              {/* =====================================================
                  SCROLLABLE BODY
              ===================================================== */}
              <div className="relative min-h-0 flex-1 overflow-y-auto bg-[#F0FAFC]/35">
                <div className="relative z-10 px-5 py-5 sm:px-7 sm:py-6">
                  {/* =================================================
                      LOCATION
                  ================================================= */}
                  {alumni.location && (
                    <div className="mb-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#55727D]">
                      <FaMapMarkerAlt
                        size={9}
                        className={`${style.accent}`}
                      />
                      <span>{alumni.location}</span>
                    </div>
                  )}

                  {alumni.permanentAddress && (
                    <div className="mb-5 rounded-2xl border border-[#087EA4]/10 bg-white p-4">
                      <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#087EA4]">
                        Permanent address
                      </p>
                      <p className="mt-1.5 text-sm leading-6 text-[#55727D]">
                        {alumni.permanentAddress}
                      </p>
                    </div>
                  )}

                  {(alumni.currentCity || alumni.currentCountry) && (
                    <div className="mb-5 rounded-2xl border border-[#087EA4]/10 bg-white p-4">
                      <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#087EA4]">
                        Present location
                      </p>
                      <p className="mt-1.5 text-sm text-[#55727D]">
                        {[alumni.currentCity, alumni.currentCountry].filter(Boolean).join(", ")}
                      </p>
                    </div>
                  )}

                  {/* =================================================
                      ORGANIZATION
                  ================================================= */}
                  {alumni.organization && (
                    <div
                      className={`mb-4 rounded-2xl border ${style.border} ${style.accentSoft} p-4 shadow-[0_8px_25px_rgba(8,126,164,0.035)]`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${style.border} bg-white/70 ${style.accent}`}
                        >
                          <FaBriefcase size={12} />
                        </div>

                        <div className="min-w-0">
                          <p
                            className={`text-[9px] font-bold uppercase tracking-[0.16em] ${style.accent}`}
                          >
                            Current Organization
                          </p>

                          <p className="mt-1 text-sm font-semibold text-[#123B4A]">
                            {alumni.organization}
                          </p>

                          {alumni.currentPosition && (
                            <p className="mt-1 text-[11px] text-[#55727D]">
                              {alumni.currentPosition}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* =================================================
                      CONTACT
                  ================================================= */}
                  {(alumni.email || alumni.phone) && (
                    <div className="mb-6 grid gap-3 sm:grid-cols-2">
                      {alumni.email && (
                        <a
                          href={`mailto:${alumni.email}`}
                          onClick={(event) =>
                            event.stopPropagation()
                          }
                          className="group flex min-w-0 items-center gap-3 rounded-2xl border border-[#087EA4]/10 bg-white p-3.5 shadow-[0_8px_25px_rgba(8,126,164,0.035)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0891B2]/20 hover:shadow-[0_12px_30px_rgba(8,145,178,0.08)]"
                        >
                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#087EA4]/10 bg-[#F0FAFC] ${style.accent} transition-colors`}
                          >
                            <FaEnvelope size={11} />
                          </span>

                          <span className="min-w-0">
                            <span className="block text-[9px] font-bold uppercase tracking-[0.14em] text-[#55727D]/65">
                              Email
                            </span>

                            <span className="mt-0.5 block truncate text-[11px] font-medium text-[#55727D] transition-colors group-hover:text-[#087EA4]">
                              {alumni.email}
                            </span>
                          </span>
                        </a>
                      )}

                      {alumni.phone && (
                        <a
                          href={`tel:${alumni.phone}`}
                          onClick={(event) =>
                            event.stopPropagation()
                          }
                          className="group flex min-w-0 items-center gap-3 rounded-2xl border border-[#087EA4]/10 bg-white p-3.5 shadow-[0_8px_25px_rgba(8,126,164,0.035)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0891B2]/20 hover:shadow-[0_12px_30px_rgba(8,145,178,0.08)]"
                        >
                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#087EA4]/10 bg-[#F0FAFC] ${style.accent} transition-colors`}
                          >
                            <FaPhone size={10} />
                          </span>

                          <span className="min-w-0">
                            <span className="block text-[9px] font-bold uppercase tracking-[0.14em] text-[#55727D]/65">
                              Phone
                            </span>

                            <span className="mt-0.5 block truncate text-[11px] font-medium text-[#55727D] transition-colors group-hover:text-[#087EA4]">
                              {alumni.phone}
                            </span>
                          </span>
                        </a>
                      )}
                    </div>
                  )}

                  {/* =================================================
                      TESTIMONIAL
                  ================================================= */}
                  {alumni.testimonial && (
                    <section className="mb-6">
                      <SectionLabel
                        icon={<FaQuoteLeft size={9} />}
                        label="Alumni Perspective"
                        accent={style.accent}
                      />

                      <div className="relative overflow-hidden rounded-2xl border border-[#087EA4]/10 bg-white p-5 shadow-[0_8px_28px_rgba(8,126,164,0.035)]">
                        {/* Accent bar */}
                        <div
                          className={`absolute bottom-0 left-0 top-0 w-1 ${style.dot}`}
                        />

                        <FaQuoteLeft
                          className={`mb-3 ${style.accent} opacity-25`}
                          size={20}
                        />

                        <p className="text-sm leading-7 text-[#55727D]">
                          {alumni.testimonial}
                        </p>
                      </div>
                    </section>
                  )}

                  {/* =================================================
                      ACHIEVEMENTS
                  ================================================= */}
                  {alumni.achievements &&
                    alumni.achievements.length > 0 && (
                      <section>
                        <SectionLabel
                          icon={<FaTrophy size={9} />}
                          label="Achievements"
                          accent="text-[#A16207]"
                        />

                        <div className="space-y-2.5">
                          {alumni.achievements.map(
                            (achievement, index) => (
                              <motion.div
                                key={`${achievement}-${index}`}
                                initial={{
                                  opacity: 0,
                                  x: -8,
                                }}
                                animate={{
                                  opacity: 1,
                                  x: 0,
                                }}
                                transition={{
                                  delay: index * 0.04,
                                }}
                                className="flex items-start gap-3 rounded-xl border border-[#087EA4]/10 bg-white px-3.5 py-3 shadow-[0_5px_18px_rgba(8,126,164,0.025)]"
                              >
                                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#F59E0B]/15 bg-[#F59E0B]/[0.08] text-[#A16207]">
                                  <FaTrophy size={9} />
                                </span>

                                <span className="text-xs leading-5 text-[#55727D]">
                                  {achievement}
                                </span>
                              </motion.div>
                            )
                          )}
                        </div>
                      </section>
                    )}
                </div>
              </div>

              {/* =====================================================
                  FOOTER
              ===================================================== */}
              <div className="relative z-20 shrink-0 border-t border-[#087EA4]/10 bg-white/95 px-5 py-4 backdrop-blur-xl sm:px-7">
                <button
                  type="button"
                  onClick={onClose}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl border border-[#087EA4]/10 bg-[#F0FAFC] py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#55727D] transition-all duration-300 hover:border-[#087EA4]/20 hover:bg-[#0891B2]/[0.07] hover:text-[#087EA4]"
                >
                  <FaTimes
                    size={9}
                    className="transition-transform duration-300 group-hover:rotate-90"
                  />
                  Close Profile
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

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
    <div
      className={`mb-3 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] ${accent}`}
    >
      {icon}

      <span>{label}</span>

      <span className="h-px flex-1 bg-[#087EA4]/10" />
    </div>
  );
}

