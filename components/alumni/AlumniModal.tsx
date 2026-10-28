
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
  FaCheckCircle,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@/contexts/AuthContext";

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
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const reportProfile = async () => {
    if (!user) {
      toast.error("Sign in to report a profile.");
      return;
    }
    const message = window.prompt("What information is incorrect? Please describe it in at least 10 characters.");
    if (!message?.trim()) return;
    try {
      await axios.post("/api/profile/report", { targetUid: alumni?.uid, message });
      toast.success("Report sent to the faculty team for review.");
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Could not send the report.");
    }
  };

  if (!mounted) return null;

  return createPortal((
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
            className="fixed inset-0 z-[70] bg-[#123B4A]/45 backdrop-blur-sm"
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
            className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-5"
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label={`${alumni.name} alumni profile`}
              onClick={(event) => event.stopPropagation()}
              className="relative flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border border-white/70 bg-white shadow-[0_28px_80px_rgba(8,59,74,0.28)] sm:max-h-[92vh] sm:rounded-3xl"
            >
              <div className="absolute inset-x-0 top-0 z-20 h-1 bg-gradient-to-r from-[#075985] via-[#087EA4] to-[#2DD4BF]" />

              {/* =====================================================
                  HEADER
              ===================================================== */}
              <div className="relative z-10 shrink-0 border-b border-[#E4EFF2] bg-white px-5 pb-5 pt-7 sm:px-7 sm:pb-6 sm:pt-8">
                {/* Close */}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close alumni profile"
                  className="absolute right-4 top-5 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-[#DCEBF0] bg-white text-[#55727D] transition-colors hover:border-[#087EA4]/30 hover:bg-[#EAF5F8] hover:text-[#087EA4] sm:right-6 sm:top-6"
                >
                  <FaTimes size={12} />
                </button>

                <div className="flex items-start gap-4 pr-10 sm:gap-5">
                  {/* =================================================
                      AVATAR
                  ================================================= */}
                  <div className="relative shrink-0">
                    {alumni.photo ? (
                      <div className="relative h-24 w-24 overflow-hidden rounded-2xl border border-[#DCEBF0] bg-[#F0FAFC] shadow-sm sm:h-32 sm:w-32">
                        <Image
                          src={alumni.photo}
                          alt={alumni.name}
                          fill
                          sizes="(min-width: 640px) 128px, 96px"
                          className="object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-[#075985]/10 to-transparent" />
                      </div>
                    ) : (
                      <div
                        className={`flex h-24 w-24 items-center justify-center rounded-2xl border ${style.border} ${style.accentSoft} ${style.accent} text-3xl font-semibold sm:h-32 sm:w-32`}
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
                    {alumni.isVerified && <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700"><FaCheckCircle aria-hidden="true" /> Verified PSTU record</span>}
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
              <div className="relative min-h-0 flex-1 overflow-y-auto bg-[#F7FAFB]">
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
              <div className="relative z-20 shrink-0 border-t border-[#E4EFF2] bg-white px-5 py-4 sm:px-7">
                <div className="flex gap-3">
                  {alumni.uid && (
                    <button type="button" onClick={() => void reportProfile()} className="min-h-11 flex-1 rounded-xl border border-[#DCEBF0] px-3 py-3 text-xs font-semibold text-[#55727D] hover:bg-[#EAF5F8]" aria-label={`Report incorrect information for ${alumni.name}`}>
                      Report incorrect info
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={onClose}
                    className="group flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-[#DCEBF0] bg-white py-3 text-xs font-semibold text-[#466671] transition-colors hover:border-[#087EA4]/30 hover:bg-[#EAF5F8] hover:text-[#087EA4]"
                  >
                  <FaTimes
                    size={9}
                    className="transition-transform duration-300 group-hover:rotate-90"
                  />
                  Close Profile
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  ), document.body);
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

