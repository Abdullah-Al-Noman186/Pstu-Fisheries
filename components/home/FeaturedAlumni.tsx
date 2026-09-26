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
} from "react-icons/fa";

import LoadingSpinner from "@/components/ui/LoadingSpinner";
import AlumniModal from "@/components/alumni/AlumniModal";
import { Alumni } from "@/types";

const deptGradients: Record<string, string> = {
  AQC: "from-blue-600 to-cyan-500",
  FBG: "from-emerald-600 to-teal-500",
  FMN: "from-violet-600 to-purple-500",
  FST: "from-amber-600 to-orange-500",
  MFO: "from-cyan-600 to-blue-500",
};

export default function FeaturedAlumni() {
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);

  // Selected alumni for modal
  const [selectedAlumni, setSelectedAlumni] = useState<Alumni | null>(null);

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

      <section className="relative overflow-hidden py-24 fish-scale-bg">
        {/* =========================================================
            BACKGROUND DECORATION
        ========================================================= */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Ocean glow */}
          <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-ocean-400/10 blur-3xl" />

          {/* Teal glow */}
          <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-teal-400/10 blur-3xl" />

          {/* Middle ocean glow */}
          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ocean-500/5 blur-3xl" />

          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,80,120,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(0,80,120,0.7) 1px, transparent 1px)",
              backgroundSize: "70px 70px",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* =========================================================
              SECTION HEADER
          ========================================================= */}

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
              duration: 0.6,
            }}
            viewport={{
              once: true,
            }}
            className="mx-auto mb-14 max-w-2xl text-center"
          >
            {/* Small label */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-ocean-200/70 bg-white/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-ocean-600 shadow-sm backdrop-blur-md">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal-500" />

              Our Community
            </div>

            {/* Title */}
            <h2 className="section-title">Alumni Network</h2>

            {/* Divider */}
            <div className="wave-divider mx-auto mt-4" />

            {/* Description */}
            <p className="section-sub mx-auto mt-4">
              Our graduates making waves in fisheries, research, academia,
              government, and industry worldwide.
            </p>
          </motion.div>

          {/* =========================================================
              LOADING
          ========================================================= */}

          {loading ? (
            <div className="flex min-h-[280px] items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : alumni.length === 0 ? (
            /* =======================================================
               EMPTY STATE
            ======================================================= */

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto max-w-lg rounded-3xl border border-white/70 bg-white/50 p-10 text-center shadow-xl backdrop-blur-xl"
            >
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-ocean-gradient text-white shadow-lg">
                <FaGraduationCap size={25} />
              </div>

              <p className="mb-2 font-display text-lg font-bold text-gray-900">
                No alumni profiles yet
              </p>

              <p className="text-sm leading-6 text-gray-500">
                Alumni profiles will appear here once graduates register and
                complete their profiles.
              </p>
            </motion.div>
          ) : (
            /* =======================================================
               ALUMNI GRID
            ======================================================= */

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {alumni.map((person, i) => {
                const grad =
                  deptGradients[person.department || ""] ||
                  "from-ocean-700 to-ocean-500";

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
                      y: -8,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.08,
                    }}
                    viewport={{
                      once: true,
                      margin: "-50px",
                    }}
                    onClick={() => setSelectedAlumni(person)}
                    className="group relative isolate cursor-pointer overflow-hidden rounded-3xl shadow-xl transition-all duration-500 hover:shadow-2xl"
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
                        DEPARTMENT GRADIENT
                    ================================================= */}

                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${grad}`}
                    />

                    {/* =================================================
                        DECORATIVE CIRCLES
                    ================================================= */}

                    <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10 transition-transform duration-700 group-hover:scale-125" />

                    <div className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-white/10 transition-transform duration-700 group-hover:scale-125" />

                    {/* Additional decorative glow */}
                    <div className="pointer-events-none absolute right-5 top-24 h-20 w-20 rounded-full bg-white/5 blur-xl transition-all duration-700 group-hover:scale-150 group-hover:bg-white/10" />

                    <div className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />

                    {/* =================================================
                        GLASS OVERLAY
                    ================================================= */}

                    <div className="absolute inset-0 bg-black/5 backdrop-blur-[1px]" />

                    {/* Glass highlight */}
                    <div className="pointer-events-none absolute left-6 right-6 top-0 h-px bg-white/30" />

                    {/* =================================================
                        CONTENT
                    ================================================= */}

                    <div className="relative z-10 flex min-h-[350px] flex-col p-5 text-white">
                      {/* =================================================
                          HEADER
                      ================================================= */}

                      <div className="mb-5 flex items-start gap-3">
                        {/* Avatar */}
                        <div className="relative shrink-0">
                          {person.photo ? (
                            <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-white/30 bg-white/10 shadow-xl ring-2 ring-white/30 transition-transform duration-500 group-hover:scale-105">
                              <Image
                                src={person.photo}
                                alt={person.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/30 bg-white/20 text-2xl font-bold shadow-xl backdrop-blur-md ring-2 ring-white/30 transition-transform duration-500 group-hover:scale-105">
                              {person.name?.[0]?.toUpperCase() || "A"}
                            </div>
                          )}

                          {/* Online/profile indicator */}
                          <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white/70 bg-teal-400 shadow-lg" />
                        </div>

                        {/* Name / position */}
                        <div className="min-w-0 flex-1">
                          <h3 className="truncate font-display text-base font-bold">
                            {person.name}
                          </h3>

                          {person.currentPosition && (
                            <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-white/80">
                              <FaBriefcase size={9} />
                              {person.currentPosition}
                            </p>
                          )}

                          {person.organization && (
                            <p className="mt-1 truncate text-xs text-white/65">
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
                            className="relative z-30 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-white/15 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/25"
                            aria-label={`${person.name} LinkedIn profile`}
                          >
                            <FaLinkedin size={14} />
                          </a>
                        )}
                      </div>

                      {/* =================================================
                          ORGANIZATION
                      ================================================= */}

                      {person.organization && (
                        <div className="mb-3 rounded-xl border border-white/10 bg-white/10 px-3 py-2.5 backdrop-blur-md transition-all duration-300 group-hover:bg-white/15">
                          <div className="flex items-center gap-2">
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/10">
                              <FaBriefcase size={10} />
                            </div>

                            <div className="min-w-0">
                              <p className="truncate text-xs font-medium text-white/90">
                                {person.organization}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* =================================================
                          CONTACT
                      ================================================= */}

                      {(person.phone || person.email) && (
                        <div className="mb-3 space-y-1.5 rounded-xl border border-white/10 bg-white/10 px-3 py-2.5 backdrop-blur-md">
                          {person.email && (
                            <a
                              href={`mailto:${person.email}`}
                              onClick={(e) => e.stopPropagation()}
                              className="flex min-w-0 items-center gap-2 text-xs text-white/75 transition-colors hover:text-white"
                            >
                              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-white/10">
                                ✉
                              </span>

                              <span className="truncate">{person.email}</span>
                            </a>
                          )}

                          {person.phone && (
                            <a
                              href={`tel:${person.phone}`}
                              onClick={(e) => e.stopPropagation()}
                              className="flex min-w-0 items-center gap-2 text-xs text-white/75 transition-colors hover:text-white"
                            >
                              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-white/10">
                                ☎
                              </span>

                              <span className="truncate">{person.phone}</span>
                            </a>
                          )}
                        </div>
                      )}

                      {/* =================================================
                          TESTIMONIAL
                      ================================================= */}

                      {person.testimonial && (
                        <div className="mb-4 mt-auto rounded-xl border border-white/10 bg-white/10 p-3.5 backdrop-blur-md transition-all duration-300 group-hover:bg-white/15">
                          <FaQuoteLeft
                            className="mb-2 text-white/40"
                            size={13}
                          />

                          <p className="line-clamp-3 text-xs italic leading-5 text-white/80">
                            {person.testimonial}
                          </p>
                        </div>
                      )}

                      {/* If there is no testimonial, push bottom content down */}
                      {!person.testimonial && <div className="mt-auto" />}

                      {/* =================================================
                          BOTTOM META
                      ================================================= */}

                      <div className="flex items-center justify-between gap-2 border-t border-white/20 pt-3">
                        <div className="flex flex-wrap gap-2">
                          {/* {person.department && (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/15 px-2.5 py-1 text-[10px] font-bold backdrop-blur-md">
                              <FaGraduationCap size={9} />

                              {person.department}
                            </span>
                          )} */}

                          {person.batch && (
                            <span className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-white/85">
                              Batch &apos;
                              {String(person.batch).slice(-2)}
                            </span>
                          )}
                        </div>

                        {person.location && (
                          <span className="flex max-w-[42%] items-center gap-1 truncate text-[10px] text-white/70">
                            <FaMapMarkerAlt size={9} />

                            {person.location.split(",")[0]}
                          </span>
                        )}
                      </div>

                      {/* =================================================
                          VIEW PROFILE HOVER
                      ================================================= */}

                      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-full justify-center pb-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-4 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur-md">
                          <FaEye size={11} />
                          View Profile
                        </span>
                      </div>
                    </div>

                    {/* =================================================
                        HOVER BOTTOM LINE
                    ================================================= */}

                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-white/70 transition-all duration-500 group-hover:w-full" />
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
                duration: 0.5,
                delay: 0.3,
              }}
              viewport={{
                once: true,
              }}
              className="mt-12 text-center"
            >
              <Link
                href="/alumni"
                onClick={(e) => e.stopPropagation()}
                className="group inline-flex items-center gap-3 rounded-xl border border-ocean-200 bg-white/60 px-6 py-3.5 text-sm font-semibold text-ocean-700 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-ocean-300 hover:bg-white hover:shadow-xl"
              >
                View All Alumni

                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ocean-100 transition-transform duration-300 group-hover:translate-x-1">
                  <FaArrowRight className="text-[10px] text-ocean-600" />
                </span>
              </Link>
            </motion.div>
          )}

          {/* =========================================================
              FOOTER LABEL
          ========================================================= */}

          <motion.div
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            transition={{
              duration: 0.7,
              delay: 0.4,
            }}
            viewport={{
              once: true,
            }}
            className="mt-14 flex items-center justify-center gap-4 text-xs uppercase tracking-[0.2em] text-ocean-400"
          >
            <span className="h-px w-12 bg-ocean-200" />

            Connected Beyond Graduation

            <span className="h-px w-12 bg-ocean-200" />
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