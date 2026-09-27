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
  // FaArrowUpRightFromSquare,
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
    accent: "text-cyan-300",
    accentSoft: "bg-cyan-400/[0.08]",
    border: "border-cyan-300/20",
    glow: "bg-cyan-400/[0.05]",
    dot: "bg-cyan-300",
  },
  FBG: {
    accent: "text-emerald-300",
    accentSoft: "bg-emerald-400/[0.08]",
    border: "border-emerald-300/20",
    glow: "bg-emerald-400/[0.05]",
    dot: "bg-emerald-300",
  },
  FMN: {
    accent: "text-violet-300",
    accentSoft: "bg-violet-400/[0.08]",
    border: "border-violet-300/20",
    glow: "bg-violet-400/[0.05]",
    dot: "bg-violet-300",
  },
  FST: {
    accent: "text-amber-300",
    accentSoft: "bg-amber-400/[0.08]",
    border: "border-amber-300/20",
    glow: "bg-amber-400/[0.05]",
    dot: "bg-amber-300",
  },
  MFO: {
    accent: "text-sky-300",
    accentSoft: "bg-sky-400/[0.08]",
    border: "border-sky-300/20",
    glow: "bg-sky-400/[0.05]",
    dot: "bg-sky-300",
  },
};

const defaultStyle = {
  accent: "text-cyan-300",
  accentSoft: "bg-cyan-400/[0.08]",
  border: "border-cyan-300/20",
  glow: "bg-cyan-400/[0.05]",
  dot: "bg-cyan-300",
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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-[#000611]/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal wrapper */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 18 }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5"
          >
            <div
              onClick={(event) => event.stopPropagation()}
              className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#06111f] shadow-[0_30px_100px_rgba(0,0,0,0.55)]"
            >
              {/* Ambient glow */}
              <div
                className={`pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full ${style.glow} blur-[90px]`}
              />

              <div className="pointer-events-none absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-cyan-400/[0.018] blur-[100px]" />

              {/* Top accent */}
              <div
                className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-current to-transparent ${style.accent} opacity-40`}
              />

              {/* Header */}
              <div className="relative shrink-0 border-b border-white/[0.06] px-5 pb-6 pt-5 sm:px-7 sm:pb-7">
                {/* Close */}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close alumni profile"
                  className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-slate-600 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.06] hover:text-slate-300 sm:right-5 sm:top-5"
                >
                  <FaTimes size={12} />
                </button>

                <div className="flex items-start gap-4 pr-10 sm:gap-5">
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    {alumni.photo ? (
                      <div className="relative h-[82px] w-[82px] overflow-hidden rounded-[20px] border border-white/[0.1] bg-white/[0.03] shadow-xl sm:h-[92px] sm:w-[92px]">
                        <Image
                          src={alumni.photo}
                          alt={alumni.name}
                          fill
                          sizes="92px"
                          className="object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                      </div>
                    ) : (
                      <div
                        className={`flex h-[82px] w-[82px] items-center justify-center rounded-[20px] border ${style.border} ${style.accentSoft} ${style.accent} text-3xl font-semibold sm:h-[92px] sm:w-[92px]`}
                      >
                        {alumni.name?.[0]?.toUpperCase() || "A"}
                      </div>
                    )}

                    <span
                      className={`absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-[#06111f] ${style.dot}`}
                    />
                  </div>

                  {/* Identity */}
                  <div className="min-w-0 flex-1 pt-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      {alumni.department && (
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-lg border ${style.border} ${style.accentSoft} px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] ${style.accent}`}
                        >
                          {alumni.department}
                        </span>
                      )}

                      {alumni.batch && (
                        <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.025] px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.12em] text-slate-600">
                          <FaCalendarAlt size={8} />
                          Batch &apos;{String(alumni.batch).slice(-2)}
                        </span>
                      )}
                    </div>

                    <h2 className="font-display text-xl font-semibold leading-tight tracking-tight text-slate-100 sm:text-2xl">
                      {alumni.name}
                    </h2>

                    {alumni.currentPosition && (
                      <p className="mt-2 flex items-center gap-2 text-xs leading-5 text-slate-500 sm:text-sm">
                        <FaBriefcase
                          size={9}
                          className={`shrink-0 ${style.accent} opacity-60`}
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
                          className={`mt-3 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] ${style.accent} opacity-60 transition-opacity hover:opacity-100`}
                        >
                          <FaLinkedin size={11} />
                          LinkedIn Profile
                          {/* <FaArrowUpRightFromSquare size={8} /> */}
                        </a>
                      )}
                  </div>
                </div>
              </div>

              {/* Scrollable body */}
              <div className="relative min-h-0 flex-1 overflow-y-auto">
                <div className="px-5 py-5 sm:px-7 sm:py-6">
                  {/* Location */}
                  {alumni.location && (
                    <div className="mb-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.13em] text-slate-600">
                      <FaMapMarkerAlt
                        size={9}
                        className={`${style.accent} opacity-60`}
                      />
                      <span>{alumni.location}</span>
                    </div>
                  )}

                  {/* Organization */}
                  {alumni.organization && (
                    <div
                      className={`mb-4 rounded-2xl border ${style.border} ${style.accentSoft} p-4`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.05] bg-white/[0.025] ${style.accent}`}
                        >
                          <FaBriefcase size={12} />
                        </div>

                        <div className="min-w-0">
                          <p
                            className={`text-[9px] font-semibold uppercase tracking-[0.16em] ${style.accent} opacity-60`}
                          >
                            Current organization
                          </p>

                          <p className="mt-1 text-sm font-medium text-slate-200">
                            {alumni.organization}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Contact */}
                  {(alumni.email || alumni.phone) && (
                    <div className="mb-5 grid gap-2 sm:grid-cols-2">
                      {alumni.email && (
                        <a
                          href={`mailto:${alumni.email}`}
                          onClick={(event) =>
                            event.stopPropagation()
                          }
                          className="group flex min-w-0 items-center gap-3 rounded-2xl border border-white/[0.055] bg-white/[0.018] p-3.5 transition-all duration-300 hover:border-white/[0.1] hover:bg-white/[0.035]"
                        >
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/[0.05] bg-white/[0.025] text-slate-600 transition-colors group-hover:text-slate-300">
                            <FaEnvelope size={11} />
                          </span>

                          <span className="min-w-0">
                            <span className="block text-[9px] uppercase tracking-[0.14em] text-slate-700">
                              Email
                            </span>

                            <span className="mt-0.5 block truncate text-[11px] font-medium text-slate-500 transition-colors group-hover:text-slate-300">
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
                          className="group flex min-w-0 items-center gap-3 rounded-2xl border border-white/[0.055] bg-white/[0.018] p-3.5 transition-all duration-300 hover:border-white/[0.1] hover:bg-white/[0.035]"
                        >
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/[0.05] bg-white/[0.025] text-slate-600 transition-colors group-hover:text-slate-300">
                            <FaPhone size={10} />
                          </span>

                          <span className="min-w-0">
                            <span className="block text-[9px] uppercase tracking-[0.14em] text-slate-700">
                              Phone
                            </span>

                            <span className="mt-0.5 block truncate text-[11px] font-medium text-slate-500 transition-colors group-hover:text-slate-300">
                              {alumni.phone}
                            </span>
                          </span>
                        </a>
                      )}
                    </div>
                  )}

                  {/* Testimonial */}
                  {alumni.testimonial && (
                    <section className="mb-5">
                      <SectionLabel
                        icon={<FaQuoteLeft size={9} />}
                        label="Alumni perspective"
                        accent={style.accent}
                      />

                      <div className="relative overflow-hidden rounded-2xl border border-white/[0.055] bg-white/[0.018] p-5">
                        <div
                          className={`absolute left-0 top-0 h-full w-px ${style.accent} bg-current opacity-50`}
                        />

                        <FaQuoteLeft
                          className={`mb-3 ${style.accent} opacity-30`}
                          size={18}
                        />

                        <p className="text-sm leading-7 text-slate-400">
                          {alumni.testimonial}
                        </p>
                      </div>
                    </section>
                  )}

                  {/* Achievements */}
                  {alumni.achievements &&
                    alumni.achievements.length > 0 && (
                      <section>
                        <SectionLabel
                          icon={<FaTrophy size={9} />}
                          label="Achievements"
                          accent="text-amber-300"
                        />

                        <div className="space-y-2">
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
                                className="flex items-start gap-3 rounded-xl border border-white/[0.05] bg-white/[0.018] px-3.5 py-3"
                              >
                                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-amber-400/[0.07] text-amber-300/70">
                                  <FaTrophy size={9} />
                                </span>

                                <span className="text-xs leading-5 text-slate-500">
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

              {/* Footer */}
              <div className="relative shrink-0 border-t border-white/[0.055] bg-[#06111f]/95 px-5 py-4 backdrop-blur-xl sm:px-7">
                <button
                  type="button"
                  onClick={onClose}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] py-3 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-600 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.05] hover:text-slate-300"
                >
                  <FaTimes
                    size={9}
                    className="transition-transform duration-300 group-hover:rotate-90"
                  />
                  Close profile
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
      className={`mb-3 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] ${accent} opacity-60`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}