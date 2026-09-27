"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

import {
  FaLinkedin,
  FaArrowRight,
  FaMapMarkerAlt,
  FaBriefcase,
  FaGraduationCap,
  FaQuoteLeft,
  FaEye,
  FaCompass,
} from "react-icons/fa";

import LoadingSpinner from "@/components/ui/LoadingSpinner";
import AlumniModal from "@/components/alumni/AlumniModal";
import { Alumni } from "@/types";

/* =========================================================
   DEPARTMENT ACCENTS
========================================================= */

const deptStyles: Record<
  string,
  {
    accent: string;
    soft: string;
    label: string;
  }
> = {
  AQC: {
    accent: "bg-cyan-400",
    soft: "bg-cyan-400/10",
    label: "Aquaculture",
  },
  FBG: {
    accent: "bg-emerald-400",
    soft: "bg-emerald-400/10",
    label: "Fisheries Biology & Genetics",
  },
  FMN: {
    accent: "bg-violet-400",
    soft: "bg-violet-400/10",
    label: "Fisheries Management",
  },
  FST: {
    accent: "bg-amber-400",
    soft: "bg-amber-400/10",
    label: "Fisheries Science & Technology",
  },
  MFO: {
    accent: "bg-sky-400",
    soft: "bg-sky-400/10",
    label: "Marine Fisheries & Oceanography",
  },
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function FeaturedAlumni() {
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedAlumni, setSelectedAlumni] = useState<Alumni | null>(null);

  /* =========================================================
     FETCH ALUMNI
  ========================================================= */

  useEffect(() => {
    axios
      .get("/api/alumni")
      .then(({ data }) => {
        if (data.success) {
          setAlumni(data.data.slice(0, 6));
        }
      })
      .catch((error) => {
        console.error("Failed to load alumni:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      {/* =========================================================
          ALUMNI SECTION
      ========================================================= */}

      <section className="relative overflow-hidden bg-[#020b18] py-24">
        {/* =======================================================
            ATMOSPHERE
        ======================================================= */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Top-left ocean light */}
          <div className="absolute -left-48 -top-48 h-[520px] w-[520px] rounded-full bg-cyan-500/[0.055] blur-[120px]" />

          {/* Bottom-right teal light */}
          <div className="absolute -bottom-56 -right-48 h-[520px] w-[520px] rounded-full bg-teal-400/[0.045] blur-[120px]" />

          {/* Center atmospheric glow */}
          <div className="absolute left-1/2 top-[45%] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-ocean-500/[0.025] blur-[120px]" />

          {/* Fine grid */}
          <div
            className="absolute inset-0 opacity-[0.018]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(125,211,252,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,0.8) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />

          {/* Very subtle top fade */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ocean-950/50 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* =====================================================
              SECTION HEADER
          ===================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            viewport={{
              once: true,
            }}
            className="mx-auto mb-16 max-w-3xl"
          >
            {/* Eyebrow */}
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-cyan-400/60" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-300/70">
                Our Community
              </span>

              <span className="h-px w-8 bg-cyan-400/60" />
            </div>

            {/* Heading */}
            <div className="relative">
              <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
                People who carry{" "}
                <span className="text-cyan-300">PSTU</span> forward.
              </h2>

              {/* Small decorative line */}
              <div className="mt-5 h-px w-24 bg-gradient-to-r from-cyan-400/80 to-transparent" />
            </div>

            {/* Description */}
            <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              From fisheries and marine research to government, academia, and
              industry — our alumni continue to extend the reach of the Faculty
              far beyond graduation.
            </p>
          </motion.div>

          {/* =====================================================
              LOADING
          ===================================================== */}

          {loading ? (
            <div className="flex min-h-[320px] items-center justify-center">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] px-10 py-10 backdrop-blur-xl">
                <LoadingSpinner />
              </div>
            </div>
          ) : alumni.length === 0 ? (
            /* ===================================================
               EMPTY STATE
            =================================================== */

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="mx-auto max-w-xl rounded-[2rem] border border-white/[0.08] bg-white/[0.025] p-12 text-center shadow-2xl backdrop-blur-2xl"
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-300/10 bg-cyan-400/[0.07] text-cyan-300">
                <FaGraduationCap size={24} />
              </div>

              <h3 className="font-display text-lg font-semibold text-white">
                No alumni profiles yet
              </h3>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
                Alumni profiles will appear here once graduates register and
                complete their profiles.
              </p>
            </motion.div>
          ) : (
            /* ===================================================
               ALUMNI GRID
            =================================================== */

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {alumni.map((person, i) => {
                const dept =
                  deptStyles[person.department || ""] || {
                    accent: "bg-cyan-400",
                    soft: "bg-cyan-400/10",
                    label: "Faculty of Fisheries",
                  };

                return (
                  <motion.article
                    key={person._id}
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    whileHover={{
                      y: -6,
                    }}
                    transition={{
                      duration: 0.55,
                      delay: i * 0.07,
                    }}
                    viewport={{
                      once: true,
                      margin: "-50px",
                    }}
                    onClick={() => setSelectedAlumni(person)}
                    className="group relative isolate min-h-[410px] cursor-pointer overflow-hidden rounded-[1.75rem] border border-white/[0.075] bg-white/[0.025] shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-2xl transition-all duration-500 hover:border-white/[0.14] hover:bg-white/[0.04] hover:shadow-[0_28px_80px_rgba(0,0,0,0.3)]"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedAlumni(person);
                      }
                    }}
                    aria-label={`View profile of ${person.name}`}
                  >
                    {/* =================================================
                        GLASS REFLECTION
                    ================================================= */}

                    <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/[0.045] to-transparent" />

                    {/* =================================================
                        DEPARTMENT ATMOSPHERE
                    ================================================= */}

                    <div
                      className={`pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full ${dept.soft} blur-[70px] transition-transform duration-700 group-hover:scale-125`}
                    />

                    <div
                      className={`pointer-events-none absolute -bottom-28 -left-24 h-56 w-56 rounded-full ${dept.soft} blur-[70px]`}
                    />

                    {/* =================================================
                        TOP ACCENT
                    ================================================= */}

                    <div
                      className={`absolute left-6 right-6 top-0 h-px opacity-50 ${dept.accent}`}
                    />

                    {/* =================================================
                        CARD CONTENT
                    ================================================= */}

                    <div className="relative z-10 flex min-h-[410px] flex-col p-6">
                      {/* =================================================
                          HEADER
                      ================================================= */}

                      <div className="flex items-start gap-4">
                        {/* Avatar */}
                        <div className="relative shrink-0">
                          {person.photo ? (
                            <div className="relative h-[72px] w-[72px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-xl ring-1 ring-white/[0.05] transition-transform duration-500 group-hover:scale-[1.03]">
                              <Image
                                src={person.photo}
                                alt={person.name}
                                fill
                                sizes="72px"
                                className="object-cover"
                              />

                              {/* Image glass */}
                              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            </div>
                          ) : (
                            <div className="flex h-[72px] w-[72px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.045] text-2xl font-semibold text-white shadow-xl ring-1 ring-white/[0.05]">
                              {person.name?.[0]?.toUpperCase() || "A"}
                            </div>
                          )}

                          {/* Small status marker */}
                          <span
                            className={`absolute -bottom-1.5 -right-1.5 h-4 w-4 rounded-full border-[3px] border-[#071321] ${dept.accent}`}
                          />
                        </div>

                        {/* Name */}
                        <div className="min-w-0 flex-1 pt-1">
                          <h3 className="truncate font-display text-base font-semibold text-white">
                            {person.name}
                          </h3>

                          {person.currentPosition && (
                            <p className="mt-1.5 flex items-center gap-1.5 truncate text-xs text-slate-400">
                              <FaBriefcase
                                size={9}
                                className="shrink-0 text-cyan-400/70"
                              />
                              {person.currentPosition}
                            </p>
                          )}

                          {person.organization && (
                            <p className="mt-1 truncate text-[11px] text-slate-500">
                              {person.organization}
                            </p>
                          )}
                        </div>

                        {/* LinkedIn */}
                        {person.linkedin && person.linkedin !== "#" && (
                          <a
                            href={person.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.035] text-slate-400 backdrop-blur-xl transition-all duration-300 hover:border-cyan-300/20 hover:bg-white/[0.08] hover:text-cyan-300"
                            aria-label={`${person.name} LinkedIn profile`}
                          >
                            <FaLinkedin size={13} />
                          </a>
                        )}
                      </div>

                      {/* =================================================
                          DEPARTMENT / BATCH
                      ================================================= */}

                      <div className="mt-6 flex items-center gap-2">
                        {/* {person.department && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.07] bg-white/[0.035] px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${dept.accent}`}
                            />

                            {person.department}
                          </span>
                        )} */}

                        {person.batch && (
                          <span className="rounded-full border border-white/[0.07] bg-white/[0.035] px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                            Batch &apos;{String(person.batch).slice(-2)}
                          </span>
                        )}
                      </div>

                      {/* =================================================
                          ORGANIZATION
                      ================================================= */}

                      {person.organization && (
                        <div className="mt-4 border-l border-white/[0.08] pl-3">
                          <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-slate-600">
                            Currently with
                          </p>

                          <p className="mt-1 truncate text-xs text-slate-300">
                            {person.organization}
                          </p>
                        </div>
                      )}

                      {/* =================================================
                          TESTIMONIAL
                      ================================================= */}

                      {person.testimonial ? (
                        <div className="mt-auto pt-7">
                          <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 transition-all duration-300 group-hover:bg-white/[0.04]">
                            <FaQuoteLeft
                              size={12}
                              className="mb-3 text-cyan-400/30"
                            />

                            <p className="line-clamp-3 text-xs italic leading-5 text-slate-400">
                              {person.testimonial}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-auto" />
                      )}

                      {/* =================================================
                          FOOTER
                      ================================================= */}

                      <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
                        {/* Location */}
                        {person.location ? (
                          <span className="flex max-w-[55%] items-center gap-1.5 truncate text-[10px] text-slate-500">
                            <FaMapMarkerAlt
                              size={9}
                              className="shrink-0 text-cyan-400/50"
                            />

                            {person.location.split(",")[0]}
                          </span>
                        ) : (
                          <span />
                        )}

                        {/* View */}
                        <span className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-600 transition-colors duration-300 group-hover:text-cyan-300/80">
                          <FaEye size={9} />

                          View profile
                        </span>
                      </div>
                    </div>

                    {/* =================================================
                        HOVER EDGE
                    ================================================= */}

                    <div
                      className={`absolute bottom-0 left-0 h-px w-0 ${dept.accent} opacity-70 transition-all duration-500 group-hover:w-full`}
                    />
                  </motion.article>
                );
              })}
            </div>
          )}

          {/* =========================================================
              VIEW ALL
          ========================================================= */}

          {!loading && alumni.length > 0 && (
            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.25,
              }}
              viewport={{
                once: true,
              }}
              className="mt-14 flex justify-center"
            >
              <Link
                href="/alumni"
                onClick={(e) => e.stopPropagation()}
                className="group inline-flex items-center gap-4 rounded-xl border border-white/[0.09] bg-white/[0.035] px-5 py-3 text-xs font-semibold text-slate-300 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300/20 hover:bg-white/[0.06] hover:text-white"
              >
                <span>Explore the alumni network</span>

                <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] transition-all duration-300 group-hover:border-cyan-300/20 group-hover:bg-cyan-400/10">
                  <FaArrowRight
                    size={10}
                    className="text-cyan-300 transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </motion.div>
          )}

          {/* =========================================================
              FOOTER STATEMENT
          ========================================================= */}

          <motion.div
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            transition={{
              duration: 0.8,
              delay: 0.4,
            }}
            viewport={{
              once: true,
            }}
            className="mt-16 flex items-center justify-center gap-4"
          >
            <span className="h-px w-10 bg-white/[0.08]" />

            <div className="flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.25em] text-slate-600">
              <FaCompass size={9} className="text-cyan-400/40" />

              Connected beyond graduation
            </div>

            <span className="h-px w-10 bg-white/[0.08]" />
          </motion.div>
        </div>
      </section>

      {/* ===========================================================
          ALUMNI MODAL
      =========================================================== */}

      <AlumniModal
        alumni={selectedAlumni}
        onClose={() => setSelectedAlumni(null)}
      />
    </>
  );
}