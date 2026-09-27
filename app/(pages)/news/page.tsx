
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCalendar,
  FaNewspaper,
} from "react-icons/fa";

import { useNews } from "@/hooks/useNews";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const categories = [
  "all",
  "news",
  "notice",
  "event",
  "achievement",
] as const;

type Category = (typeof categories)[number];

const categoryStyles: Record<
  Exclude<Category, "all">,
  {
    accent: string;
    soft: string;
    border: string;
    dot: string;
  }
> = {
  news: {
    accent: "text-[#087EA4]",
    soft: "bg-[#0891B2]/[0.08]",
    border: "border-[#0891B2]/15",
    dot: "bg-[#0891B2]",
  },

  notice: {
    accent: "text-[#C2415B]",
    soft: "bg-[#C2415B]/[0.07]",
    border: "border-[#C2415B]/15",
    dot: "bg-[#C2415B]",
  },

  event: {
    accent: "text-[#087A68]",
    soft: "bg-[#2DD4BF]/[0.10]",
    border: "border-[#2DD4BF]/20",
    dot: "bg-[#2DD4BF]",
  },

  achievement: {
    accent: "text-[#A16207]",
    soft: "bg-[#F59E0B]/[0.08]",
    border: "border-[#F59E0B]/15",
    dot: "bg-[#F59E0B]",
  },
};

export default function NewsPage() {
  const [activeCat, setActiveCat] = useState<Category>("all");

  const { news, loading } = useNews(
    activeCat === "all" ? undefined : activeCat,
    50
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F0FAFC] pt-20 text-[#123B4A]">
      {/* =====================================================
          ATMOSPHERIC OCEAN BACKGROUND
      ====================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top-left ocean glow */}
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#0891B2]/[0.07] blur-[130px]" />

        {/* Right aqua glow */}
        <div className="absolute -right-40 top-[35%] h-[520px] w-[520px] rounded-full bg-[#2DD4BF]/[0.07] blur-[140px]" />

        {/* Bottom ocean glow */}
        <div className="absolute bottom-[-250px] left-[30%] h-[500px] w-[500px] rounded-full bg-[#087EA4]/[0.045] blur-[140px]" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(8,126,164,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(8,126,164,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* =====================================================
          HEADER
      ====================================================== */}
      <section className="relative px-4 pb-16 pt-12 sm:px-6 md:pb-20 md:pt-16">
        <div className="mx-auto max-w-6xl">
          {/* Back navigation */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/"
              className="group mb-10 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-[#55727D] transition-colors hover:text-[#087EA4]"
            >
              <FaArrowLeft
                size={10}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />

              Home
            </Link>
          </motion.div>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="relative"
          >
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              {/* Heading */}
              <div className="max-w-4xl">
                {/* Label */}
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#087EA4]/10 bg-[#0891B2]/[0.08] shadow-sm">
                    <FaNewspaper className="text-sm text-[#087EA4]" />
                  </span>

                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#55727D]">
                    Faculty updates
                  </span>
                </div>

                <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-[#123B4A] sm:text-5xl md:text-6xl">
                  News & Events
                </h1>

                <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#55727D] sm:text-base">
                  Latest news, notices, events, achievements, and important
                  updates from the Faculty of Fisheries.
                </p>
              </div>

              {/* News marker */}
              <div className="hidden shrink-0 md:block">
                <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-3xl border border-[#087EA4]/10 bg-[#0891B2]/[0.06] shadow-[0_15px_40px_rgba(8,126,164,0.08)]">
                  <div className="absolute -right-5 -top-5 h-16 w-16 rounded-full bg-[#2DD4BF]/20 blur-xl" />

                  <FaNewspaper className="relative text-2xl text-[#087EA4]/70" />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="mt-10 h-px bg-gradient-to-r from-[#087EA4]/20 via-[#0891B2]/10 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          NEWS CONTENT
      ====================================================== */}
      <section className="relative px-4 pb-24 sm:px-6">
        <div className="mx-auto max-w-6xl">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#087EA4]">
                Latest updates
              </p>

              <h2 className="font-display text-2xl font-bold text-[#123B4A] sm:text-3xl">
                News & announcements
              </h2>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 text-xs font-medium text-[#55727D]">
              <span className="h-2 w-2 rounded-full bg-[#0891B2]/60" />

              Faculty updates
            </div>
          </motion.div>

          {/* =================================================
              CATEGORY FILTER
          ================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="mb-10 flex flex-wrap gap-2"
          >
            {categories.map((category) => {
              const isActive = activeCat === category;

              const categoryStyle =
                category !== "all" ? categoryStyles[category] : null;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCat(category)}
                  className={`
                    rounded-xl border px-3.5 py-2
                    text-[10px] font-semibold uppercase
                    tracking-[0.14em]
                    transition-all duration-200

                    ${
                      isActive
                        ? categoryStyle
                          ? `${categoryStyle.soft} ${categoryStyle.accent} ${categoryStyle.border} shadow-sm`
                          : "border-[#087EA4]/15 bg-[#0891B2]/[0.08] text-[#087EA4] shadow-sm"
                        : "border-[#087EA4]/10 bg-white/60 text-[#55727D] hover:border-[#087EA4]/20 hover:bg-white hover:text-[#087EA4]"
                    }
                  `}
                >
                  {category === "all" ? "All updates" : category}
                </button>
              );
            })}
          </motion.div>

          {/* =================================================
              NEWS LIST
          ================================================== */}
          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCat}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                {news.length > 0 ? (
                  <div className="grid gap-5 md:grid-cols-2">
                    {news.map((item, index) => {
                      const style =
                        categoryStyles[
                          item.category as Exclude<Category, "all">
                        ];

                      return (
                        <motion.article
                          key={item._id}
                          initial={{
                            opacity: 0,
                            y: 20,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            duration: 0.4,
                            delay: index * 0.04,
                          }}
                          whileHover={{
                            y: -4,
                          }}
                          className="group relative overflow-hidden rounded-2xl border border-[#087EA4]/10 bg-white/75 shadow-[0_12px_40px_rgba(8,126,164,0.05)] backdrop-blur-sm transition-all duration-300 hover:border-[#087EA4]/20 hover:bg-white hover:shadow-[0_18px_50px_rgba(8,126,164,0.09)]"
                        >
                          {/* Top accent */}
                          <div
                            className={`h-1 w-full ${
                              style?.dot ?? "bg-[#087EA4]"
                            } opacity-60`}
                          />

                          <div className="p-5 sm:p-6">
                            {/* Meta */}
                            <div className="mb-5 flex items-center justify-between gap-3">
                              {/* Category */}
                              <span
                                className={`
                                  rounded-md border px-2.5 py-1
                                  text-[9px] font-bold uppercase
                                  tracking-[0.14em]
                                  ${
                                    style
                                      ? `${style.soft} ${style.accent} ${style.border}`
                                      : "border-[#087EA4]/10 bg-[#F0FAFC] text-[#55727D]"
                                  }
                                `}
                              >
                                {item.category}
                              </span>

                              {/* Date */}
                              <span className="flex shrink-0 items-center gap-1.5 text-[10px] font-medium text-[#55727D]">
                                <FaCalendar className="text-[#0891B2]/70" />

                                {format(
                                  new Date(item.publishedAt),
                                  "dd MMM yyyy"
                                )}
                              </span>
                            </div>

                            {/* Title */}
                            <h3 className="mb-3 line-clamp-2 font-display text-base font-semibold leading-snug text-[#123B4A] transition-colors duration-200 group-hover:text-[#087EA4] sm:text-lg">
                              {item.title}
                            </h3>

                            {/* Excerpt */}
                            <p className="mb-6 line-clamp-3 text-xs leading-relaxed text-[#55727D] sm:text-sm">
                              {item.excerpt}
                            </p>

                            {/* Bottom */}
                            <div className="flex items-center justify-between">
                              <Link
                                href={`/news/${item.slug}`}
                                className="group/link inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#55727D] transition-colors hover:text-[#087EA4]"
                              >
                                Read article

                                <FaArrowRight
                                  size={8}
                                  className="transition-transform duration-300 group-hover/link:translate-x-1"
                                />
                              </Link>

                              {/* Small indicator */}
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  style?.dot ?? "bg-[#0891B2]"
                                } opacity-40 transition-all duration-300 group-hover:opacity-80`}
                              />
                            </div>
                          </div>
                        </motion.article>
                      );
                    })}
                  </div>
                ) : (
                  /* =================================================
                     EMPTY STATE
                  ================================================== */
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="rounded-2xl border border-[#087EA4]/10 bg-white/70 py-24 text-center shadow-[0_12px_40px_rgba(8,126,164,0.04)]"
                  >
                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-[#087EA4]/10 bg-[#F0FAFC]">
                      <FaNewspaper className="text-lg text-[#55727D]/60" />
                    </div>

                    <h3 className="font-display text-lg font-semibold text-[#123B4A]">
                      No posts found
                    </h3>

                    <p className="mt-2 text-xs text-[#55727D]">
                      There are no updates available in this category.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* =====================================================
          BOTTOM NAVIGATION
      ====================================================== */}
      <section className="relative border-t border-[#087EA4]/10 bg-white/40 px-4 py-10 sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#55727D] transition-colors hover:text-[#087EA4]"
          >
            <FaArrowLeft
              size={9}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            Home
          </Link>

          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#087EA4] opacity-70">
            NEWS

            <FaArrowRight size={8} />
          </div>
        </div>
      </section>
    </main>
  );
}

