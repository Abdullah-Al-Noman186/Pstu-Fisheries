
"use client";

import { useEffect, useState } from "react";
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
    glow: string;
  }
> = {
  journal: {
    text: "text-[#087EA4]",
    bg: "bg-[#0891B2]/[0.08]",
    border: "border-[#0891B2]/20",
    dot: "bg-[#0891B2]",
    glow: "shadow-[0_0_25px_rgba(8,145,178,0.08)]",
  },
  conference: {
    text: "text-[#6D5CC6]",
    bg: "bg-[#8B7ED8]/[0.08]",
    border: "border-[#8B7ED8]/20",
    dot: "bg-[#8B7ED8]",
    glow: "shadow-[0_0_25px_rgba(139,126,216,0.08)]",
  },
  thesis: {
    text: "text-[#087A68]",
    bg: "bg-[#2DD4BF]/[0.10]",
    border: "border-[#2DD4BF]/20",
    dot: "bg-[#2DD4BF]",
    glow: "shadow-[0_0_25px_rgba(45,212,191,0.08)]",
  },
  book: {
    text: "text-[#A16207]",
    bg: "bg-[#F59E0B]/[0.08]",
    border: "border-[#F59E0B]/20",
    dot: "bg-[#F59E0B]",
    glow: "shadow-[0_0_25px_rgba(245,158,11,0.08)]",
  },
};

const defaultTypeStyle = {
  text: "text-[#087EA4]",
  bg: "bg-[#0891B2]/[0.08]",
  border: "border-[#0891B2]/20",
  dot: "bg-[#0891B2]",
  glow: "shadow-[0_0_25px_rgba(8,145,178,0.08)]",
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
      .catch(() => {
        setResearch([]);
      })
      .finally(() => setLoading(false));
  }, [activeType]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F0FAFC] text-[#123B4A]">
      {/* =========================================================
          BACKGROUND ATMOSPHERE
      ========================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Ocean glow */}
        <div className="absolute -left-72 top-0 h-[650px] w-[650px] rounded-full bg-[#0891B2]/[0.07] blur-[150px]" />

        {/* Deep ocean glow */}
        <div className="absolute -right-72 top-[22%] h-[650px] w-[650px] rounded-full bg-[#087EA4]/[0.045] blur-[150px]" />

        {/* Seafoam glow */}
        <div className="absolute bottom-0 left-1/3 h-[500px] w-[500px] rounded-full bg-[#2DD4BF]/[0.055] blur-[150px]" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(8,126,164,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(8,126,164,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Top wash */}
        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-[#0891B2]/[0.045] to-transparent" />
      </div>

      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative z-10 border-b border-[#087EA4]/10 pt-28 pb-14 sm:pt-32 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#087EA4]/15 bg-white/70 px-4 py-2 shadow-[0_8px_30px_rgba(8,126,164,0.06)] backdrop-blur-xl"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#0891B2] shadow-[0_0_10px_rgba(8,145,178,0.35)]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#087EA4]">
                Research & Publications
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="font-display text-4xl font-semibold tracking-tight text-[#123B4A] sm:text-5xl lg:text-6xl"
            >
              Ideas that move
              <span className="block bg-gradient-to-r from-[#075985] via-[#087EA4] to-[#0891B2] bg-clip-text text-transparent">
                aquatic science forward.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#55727D] sm:text-base"
            >
              Explore research, publications, theses, conference papers,
              and academic contributions from the Faculty of Fisheries.
            </motion.p>

            {/* Institution */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 flex items-center justify-center gap-6 text-[10px] font-medium uppercase tracking-[0.18em] text-[#55727D]/70"
            >
              <span>Research Archive</span>

              <span className="h-1 w-1 rounded-full bg-[#0891B2]/50" />

              <span>PSTU</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CONTENT
      ========================================================== */}
      <section className="relative z-10">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          {/* =====================================================
              FILTER
          ====================================================== */}
          <div className="mb-10">
            <div className="mb-4 flex items-center justify-center gap-2 text-[9px] font-medium uppercase tracking-[0.18em] text-[#55727D]/60">
              <FaFlask size={8} />
              <span>Publication Type</span>
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
                        ? `${style.bg} ${style.border} ${style.text} ${style.glow}`
                        : "border-[#087EA4]/10 bg-white/65 text-[#55727D]/65 shadow-sm hover:border-[#087EA4]/20 hover:bg-white hover:text-[#087EA4]",
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

          {/* =====================================================
              RESULT BAR
          ====================================================== */}
          {!loading && (
            <div className="mb-6 flex items-center justify-between border-y border-[#087EA4]/10 py-4">
              <p className="text-xs text-[#55727D]">
                <span className="font-semibold text-[#123B4A]">
                  {research.length}
                </span>{" "}
                {research.length === 1
                  ? "publication"
                  : "publications"}
              </p>

              <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#55727D]/60">
                {activeType === "ALL"
                  ? "Complete Archive"
                  : `${activeType} Archive`}
              </p>
            </div>
          )}

          {/* =====================================================
              LOADING
          ====================================================== */}
          {loading ? (
            <div className="flex min-h-[350px] items-center justify-center py-20">
              <LoadingSpinner message="Loading publications..." />
            </div>
          ) : (
            <div className="space-y-4">
              {/* =================================================
                  PUBLICATION LIST
              ================================================== */}
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
                      className={`pointer-events-none absolute -inset-1 rounded-[22px] ${style.bg} opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-70`}
                    />

                    <div className="relative overflow-hidden rounded-[20px] border border-[#087EA4]/10 bg-white/75 shadow-[0_12px_40px_rgba(8,126,164,0.045)] backdrop-blur-xl transition-all duration-500 group-hover:border-[#087EA4]/20 group-hover:bg-white group-hover:shadow-[0_18px_50px_rgba(8,126,164,0.08)]">
                      {/* Top accent */}
                      <div
                        className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-current to-transparent ${style.text} opacity-30`}
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

                              <span className="text-[10px] font-medium text-[#55727D]/70">
                                {item.year}
                              </span>

                              {item.department && (
                                <>
                                  <span className="h-1 w-1 rounded-full bg-[#087EA4]/20" />

                                  <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-[#55727D]/65">
                                    {item.department}
                                  </span>
                                </>
                              )}
                            </div>

                            {/* Title */}
                            <h2 className="max-w-4xl font-display text-sm font-semibold leading-6 tracking-tight text-[#123B4A] transition-colors duration-300 group-hover:text-[#075985] sm:text-base">
                              {item.title}
                            </h2>

                            {/* Authors */}
                            {item.authors?.length > 0 && (
                              <div className="mt-3 flex items-start gap-2 text-xs leading-5 text-[#55727D]">
                                <FaUsers
                                  size={10}
                                  className={`mt-1 shrink-0 ${style.text} opacity-60`}
                                />

                                <span>
                                  {item.authors.join(", ")}
                                </span>
                              </div>
                            )}

                            {/* Journal */}
                            {item.journal && (
                              <div
                                className={`mt-2 flex items-center gap-2 text-[11px] italic ${style.text} opacity-75`}
                              >
                                <FaBook size={9} />
                                <span>{item.journal}</span>
                              </div>
                            )}

                            {/* Abstract */}
                            {item.abstract && (
                              <p className="mt-4 line-clamp-2 max-w-4xl text-xs leading-6 text-[#55727D]">
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
                              className="relative z-20 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#087EA4]/10 bg-[#F0FAFC] text-[#55727D]/60 transition-all duration-300 hover:border-[#087EA4]/20 hover:bg-[#0891B2]/[0.07] hover:text-[#087EA4]"
                            >
                              <FaExternalLinkAlt size={11} />
                            </a>
                          )}
                        </div>

                        {/* Bottom line */}
                        <div className="mt-5 flex items-center justify-between border-t border-[#087EA4]/10 pt-4">
                          <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#55727D]/60">
                            Faculty of Fisheries
                          </span>

                          <span
                            className={`flex items-center gap-1.5 text-[9px] font-medium uppercase tracking-[0.14em] ${style.text} opacity-0 transition-all duration-300 group-hover:opacity-80`}
                          >
                            View Publication
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

              {/* =================================================
                  EMPTY STATE
              ================================================== */}
              {research.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center rounded-3xl border border-[#087EA4]/10 bg-white/60 px-6 py-28 text-center shadow-[0_20px_60px_rgba(8,126,164,0.045)]"
                >
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#087EA4]/10 bg-[#0891B2]/[0.07]">
                    <FaBook
                      className="text-[#087EA4]/50"
                      size={22}
                    />
                  </div>

                  <h2 className="text-lg font-semibold text-[#123B4A]">
                    No publications found
                  </h2>

                  <p className="mt-2 max-w-md text-sm leading-6 text-[#55727D]">
                    There are currently no publications available for
                    this category.
                  </p>

                  {activeType !== "ALL" && (
                    <button
                      type="button"
                      onClick={() => setActiveType("ALL")}
                      className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[#087EA4]/15 bg-white px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#087EA4] shadow-sm transition-all hover:border-[#087EA4]/25 hover:bg-[#0891B2]/[0.04]"
                    >
                      View All Publications
                      <FaArrowRight size={8} />
                    </button>
                  )}
                </motion.div>
              )}

              {/* =================================================
                  FOOTER
              ================================================== */}
              {research.length > 0 && (
                <div className="mt-12 flex justify-center">
                  <div className="inline-flex items-center gap-3 border-t border-[#087EA4]/10 pt-5 text-[10px] font-medium uppercase tracking-[0.18em] text-[#55727D]/55">
                    <span>Research Archive</span>

                    <FaArrowRight
                      size={8}
                      className="text-[#0891B2]/50"
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

