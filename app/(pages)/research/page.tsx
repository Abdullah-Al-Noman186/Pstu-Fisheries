"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Research } from "@/types";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import {
  FaExternalLinkAlt,
  FaBook,
  FaUsers,
  FaFlask,
  FaArrowRight,
} from "react-icons/fa";

const types = [
  "ALL",
  "journal",
  "conference",
  "thesis",
  "book",
] as const;

const typeStyles: Record<
  string,
  {
    text: string;
    bg: string;
    border: string;
    dot: string;
  }
> = {
  journal: {
    text: "text-cyan-300",
    bg: "bg-cyan-400/[0.08]",
    border: "border-cyan-300/20",
    dot: "bg-cyan-300",
  },
  conference: {
    text: "text-violet-300",
    bg: "bg-violet-400/[0.08]",
    border: "border-violet-300/20",
    dot: "bg-violet-300",
  },
  thesis: {
    text: "text-emerald-300",
    bg: "bg-emerald-400/[0.08]",
    border: "border-emerald-300/20",
    dot: "bg-emerald-300",
  },
  book: {
    text: "text-amber-300",
    bg: "bg-amber-400/[0.08]",
    border: "border-amber-300/20",
    dot: "bg-amber-300",
  },
};

const defaultTypeStyle = {
  text: "text-cyan-300",
  bg: "bg-cyan-400/[0.08]",
  border: "border-cyan-300/20",
  dot: "bg-cyan-300",
};

export default function ResearchPage() {
  const [research, setResearch] = useState<Research[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeType, setActiveType] = useState("ALL");

  useEffect(() => {
    setLoading(true);

    const q = activeType !== "ALL" ? `?type=${activeType}` : "";

    axios
      .get(`/api/research${q}`)
      .then(({ data }) => {
        if (data.success) {
          setResearch(data.data);
        }
      })
      .finally(() => setLoading(false));
  }, [activeType]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020b18] text-white">
      {/* ───────────────── Background atmosphere ───────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-72 top-0 h-[650px] w-[650px] rounded-full bg-cyan-500/[0.035] blur-[150px]" />

        <div className="absolute -right-72 top-[22%] h-[650px] w-[650px] rounded-full bg-blue-500/[0.025] blur-[150px]" />

        <div className="absolute bottom-0 left-1/3 h-[500px] w-[500px] rounded-full bg-teal-400/[0.02] blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(125,211,252,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,0.7) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-cyan-400/[0.025] to-transparent" />
      </div>

      {/* ───────────────── Hero ───────────────── */}
      <section className="relative z-10 border-b border-white/[0.05] pt-32 pb-16 sm:pt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/10 bg-cyan-400/[0.04] px-4 py-2 backdrop-blur-xl"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.7)]" />

              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-cyan-300/70">
                Research & Publications
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Ideas that move
              <span className="block text-cyan-300">
                aquatic science forward.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base"
            >
              Explore research, publications, theses, conference papers,
              and academic contributions from the Faculty of Fisheries.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 flex items-center justify-center gap-6 text-[10px] uppercase tracking-[0.18em] text-slate-600"
            >
              <span>Research archive</span>

              <span className="h-1 w-1 rounded-full bg-cyan-400/30" />

              <span>PSTU</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───────────────── Content ───────────────── */}
      <section className="relative z-10">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Filter */}
          <div className="mb-10">
            <div className="mb-4 flex items-center justify-center gap-2 text-[9px] uppercase tracking-[0.18em] text-slate-700">
              <FaFlask size={8} />
              <span>Publication type</span>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {types.map((type) => {
                const isActive = activeType === type;

                const style =
                  type === "ALL"
                    ? defaultTypeStyle
                    : typeStyles[type] || defaultTypeStyle;

                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setActiveType(type)}
                    className={[
                      "relative overflow-hidden rounded-xl border px-4 py-2.5",
                      "text-xs capitalize backdrop-blur-xl",
                      "transition-all duration-300",
                      isActive
                        ? `${style.bg} ${style.border} ${style.text} shadow-[0_0_25px_rgba(34,211,238,0.04)]`
                        : "border-white/[0.06] bg-white/[0.02] text-slate-600 hover:border-white/[0.12] hover:bg-white/[0.035] hover:text-slate-300",
                    ].join(" ")}
                  >
                    {type === "ALL" ? "All Publications" : type}

                    {isActive && (
                      <motion.span
                        layoutId="activeResearchType"
                        className="absolute inset-x-3 bottom-0 h-px bg-current opacity-50"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Result bar */}
          {!loading && (
            <div className="mb-6 flex items-center justify-between border-y border-white/[0.05] py-4">
              <p className="text-xs text-slate-500">
                <span className="text-slate-300">{research.length}</span>{" "}
                {research.length === 1
                  ? "publication"
                  : "publications"}
              </p>

              <p className="text-[10px] uppercase tracking-[0.15em] text-slate-700">
                {activeType === "ALL"
                  ? "Complete archive"
                  : `${activeType} archive`}
              </p>
            </div>
          )}

          {/* Loading */}
          {loading ? (
            <div className="py-20">
              <LoadingSpinner message="Loading publications..." />
            </div>
          ) : (
            <div className="space-y-4">
              {research.map((item, index) => {
                const style =
                  typeStyles[item.type] || defaultTypeStyle;

                return (
                  <motion.article
                    key={item._id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: Math.min(index * 0.045, 0.3),
                    }}
                    className="group relative"
                  >
                    {/* Hover glow */}
                    <div
                      className={`pointer-events-none absolute -inset-1 rounded-[22px] ${style.bg} opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-60`}
                    />

                    <div className="relative overflow-hidden rounded-[20px] border border-white/[0.07] bg-[#06111f]/85 backdrop-blur-xl transition-all duration-500 group-hover:border-white/[0.12] group-hover:bg-[#071525]">
                      {/* Top accent */}
                      <div
                        className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-current to-transparent ${style.text} opacity-25`}
                      />

                      <div className="p-5 sm:p-6">
                        <div className="flex items-start gap-5">
                          {/* Publication marker */}
                          <div className="hidden shrink-0 sm:flex">
                            <div
                              className={`flex h-11 w-11 items-center justify-center rounded-xl border ${style.border} ${style.bg} ${style.text}`}
                            >
                              <FaBook size={14} />
                            </div>
                          </div>

                          <div className="min-w-0 flex-1">
                            {/* Metadata */}
                            <div className="mb-3 flex flex-wrap items-center gap-2">
                              <span
                                className={`inline-flex items-center gap-1.5 rounded-lg border ${style.border} ${style.bg} px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] ${style.text}`}
                              >
                                <span
                                  className={`h-1.5 w-1.5 rounded-full ${style.dot}`}
                                />
                                {item.type}
                              </span>

                              <span className="text-[10px] text-slate-700">
                                {item.year}
                              </span>

                              {item.department && (
                                <>
                                  <span className="h-1 w-1 rounded-full bg-slate-800" />

                                  <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-slate-600">
                                    {item.department}
                                  </span>
                                </>
                              )}
                            </div>

                            {/* Title */}
                            <h2 className="max-w-4xl font-display text-sm font-semibold leading-6 tracking-tight text-slate-200 transition-colors duration-300 group-hover:text-white sm:text-base">
                              {item.title}
                            </h2>

                            {/* Authors */}
                            {item.authors?.length > 0 && (
                              <div className="mt-3 flex items-start gap-2 text-xs leading-5 text-slate-600">
                                <FaUsers
                                  size={10}
                                  className={`mt-1 shrink-0 ${style.text} opacity-50`}
                                />

                                <span>
                                  {item.authors.join(", ")}
                                </span>
                              </div>
                            )}

                            {/* Journal */}
                            {item.journal && (
                              <div
                                className={`mt-2 flex items-center gap-2 text-[11px] italic ${style.text} opacity-60`}
                              >
                                <FaBook size={9} />
                                <span>{item.journal}</span>
                              </div>
                            )}

                            {/* Abstract */}
                            {item.abstract && (
                              <p className="mt-4 line-clamp-2 max-w-4xl text-xs leading-6 text-slate-600">
                                {item.abstract}
                              </p>
                            )}
                          </div>

                          {/* External link */}
                          {item.link && (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="Open publication"
                              onClick={(event) =>
                                event.stopPropagation()
                              }
                              className={`relative z-20 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.02] text-slate-700 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.05] hover:${style.text}`}
                            >
                              <FaExternalLinkAlt size={11} />
                            </a>
                          )}
                        </div>

                        {/* Bottom line */}
                        <div className="mt-5 flex items-center justify-between border-t border-white/[0.045] pt-4">
                          <span className="text-[9px] uppercase tracking-[0.16em] text-slate-700">
                            Faculty of Fisheries
                          </span>

                          <span
                            className={`flex items-center gap-1.5 text-[9px] uppercase tracking-[0.14em] ${style.text} opacity-0 transition-all duration-300 group-hover:opacity-60`}
                          >
                            View publication
                            <FaArrowRight size={7} />
                          </span>
                        </div>
                      </div>

                      {/* Bottom hover line */}
                      <div
                        className={`absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 bg-current ${style.text} opacity-40 transition-transform duration-500 group-hover:scale-x-100`}
                      />
                    </div>
                  </motion.article>
                );
              })}

              {/* Empty */}
              {research.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center border-y border-white/[0.05] py-28 text-center"
                >
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.025]">
                    <FaBook
                      className="text-cyan-400/30"
                      size={22}
                    />
                  </div>

                  <h2 className="text-lg font-medium text-slate-300">
                    No publications found
                  </h2>

                  <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
                    There are currently no publications available for
                    this category.
                  </p>

                  {activeType !== "ALL" && (
                    <button
                      type="button"
                      onClick={() => setActiveType("ALL")}
                      className="mt-5 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.15em] text-cyan-400/70 transition-colors hover:text-cyan-300"
                    >
                      View all publications
                      <FaArrowRight size={8} />
                    </button>
                  )}
                </motion.div>
              )}

              {/* Directory footer */}
              {research.length > 0 && (
                <div className="mt-12 flex justify-center">
                  <div className="inline-flex items-center gap-3 border-t border-white/[0.05] pt-5 text-[10px] uppercase tracking-[0.18em] text-slate-700">
                    <span>Research archive</span>

                    <FaArrowRight
                      size={8}
                      className="text-cyan-400/40"
                    />

                    <span>Faculty of Fisheries</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}