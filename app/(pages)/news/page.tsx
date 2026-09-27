
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
  }
> = {
  news: {
    accent: "text-cyan-300",
    soft: "bg-cyan-400/[0.08]",
    border: "border-cyan-400/[0.12]",
  },

  notice: {
    accent: "text-rose-300",
    soft: "bg-rose-400/[0.08]",
    border: "border-rose-400/[0.12]",
  },

  event: {
    accent: "text-emerald-300",
    soft: "bg-emerald-400/[0.08]",
    border: "border-emerald-400/[0.12]",
  },

  achievement: {
    accent: "text-amber-300",
    soft: "bg-amber-400/[0.08]",
    border: "border-amber-400/[0.12]",
  },
};

export default function NewsPage() {
  const [activeCat, setActiveCat] = useState<Category>("all");

  const {
    news,
    loading,
  } = useNews(
    activeCat === "all" ? undefined : activeCat,
    50
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020b18] pt-20 text-white">

      {/* =====================================================
          ATMOSPHERIC BACKGROUND
      ====================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Top left glow */}
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-cyan-400/[0.045] blur-[130px]" />

        {/* Right side glow */}
        <div className="absolute -right-40 top-[35%] h-[520px] w-[520px] rounded-full bg-cyan-400/[0.025] blur-[140px]" />

        {/* Bottom glow */}
        <div className="absolute bottom-[-250px] left-[30%] h-[500px] w-[500px] rounded-full bg-sky-500/[0.02] blur-[140px]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
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
              className="group mb-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-500 transition-colors hover:text-slate-200"
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
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

              {/* Heading */}
              <div className="max-w-4xl">

                {/* Label */}
                <div className="mb-5 flex items-center gap-3">

                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] bg-cyan-400/[0.08]">
                    <FaNewspaper className="text-sm text-cyan-300" />
                  </span>

                  <span className="text-[10px] uppercase tracking-[0.22em] text-slate-600">
                    Faculty updates
                  </span>

                </div>

                <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                  News & Events
                </h1>

                <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
                  Latest news, notices, events, achievements, and important
                  updates from the Faculty of Fisheries.
                </p>

              </div>

              {/* News marker */}
              <div className="hidden shrink-0 md:block">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-white/[0.06] bg-cyan-400/[0.06]">
                  <FaNewspaper className="text-2xl text-cyan-300/70" />
                </div>
              </div>

            </div>

            {/* Divider */}
            <div className="mt-10 h-px bg-gradient-to-r from-white/[0.10] via-white/[0.05] to-transparent" />
          </motion.div>

        </div>
      </section>

      {/* =====================================================
          NEWS CONTENT
      ====================================================== */}
      <section className="relative px-4 pb-24 sm:px-6">
        <div className="mx-auto max-w-6xl">

          {/* =================================================
              SECTION HEADER
          ================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
          >

            <div>
              <p className="mb-2 text-[10px] uppercase tracking-[0.24em] text-cyan-300 opacity-70">
                Latest updates
              </p>

              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                News & announcements
              </h2>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/50" />
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
                category !== "all"
                  ? categoryStyles[category]
                  : null;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCat(category)}
                  className={`
                    rounded-lg border px-3.5 py-2
                    text-[10px] font-semibold uppercase
                    tracking-[0.14em]
                    transition-all duration-200

                    ${
                      isActive
                        ? categoryStyle
                          ? `${categoryStyle.soft} ${categoryStyle.accent} ${categoryStyle.border}`
                          : "border-cyan-400/[0.15] bg-cyan-400/[0.08] text-cyan-300"
                        : "border-white/[0.06] bg-white/[0.02] text-slate-600 hover:border-white/[0.10] hover:bg-white/[0.04] hover:text-slate-300"
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
                  <div className="grid gap-4 md:grid-cols-2">

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
                            y: -3,
                          }}
                          className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.025] backdrop-blur-sm transition-colors duration-300 hover:border-white/[0.10] hover:bg-white/[0.035]"
                        >

                          {/* Top accent */}
                          <div
                            className={`h-px w-full ${
                              style?.accent
                                ? style.accent.replace(
                                    "text-",
                                    "bg-"
                                  )
                                : "bg-cyan-400"
                            } opacity-40`}
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
                                      : "border-white/[0.06] bg-white/[0.03] text-slate-400"
                                  }
                                `}
                              >
                                {item.category}
                              </span>

                              {/* Date */}
                              <span className="flex shrink-0 items-center gap-1.5 text-[10px] text-slate-600">
                                <FaCalendar className="text-cyan-400/50" />

                                {format(
                                  new Date(item.publishedAt),
                                  "dd MMM yyyy"
                                )}
                              </span>

                            </div>

                            {/* Title */}
                            <h3 className="mb-3 line-clamp-2 font-display text-base font-semibold leading-snug text-slate-100 transition-colors duration-200 group-hover:text-cyan-200 sm:text-lg">
                              {item.title}
                            </h3>

                            {/* Excerpt */}
                            <p className="mb-6 line-clamp-3 text-xs leading-relaxed text-slate-500 sm:text-sm">
                              {item.excerpt}
                            </p>

                            {/* Bottom */}
                            <div className="flex items-center justify-between">

                              <Link
                                href={`/news/${item.slug}`}
                                className="group/link inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 transition-colors hover:text-cyan-300"
                              >
                                Read article

                                <FaArrowRight
                                  size={8}
                                  className="transition-transform duration-300 group-hover/link:translate-x-1"
                                />
                              </Link>

                              {/* Small indicator */}
                              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/30 transition-all duration-300 group-hover:bg-cyan-300/70" />

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
                    className="rounded-2xl border border-white/[0.06] bg-white/[0.02] py-24 text-center"
                  >
                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.025]">
                      <FaNewspaper className="text-lg text-slate-600" />
                    </div>

                    <h3 className="font-display text-lg font-semibold text-slate-300">
                      No posts found
                    </h3>

                    <p className="mt-2 text-xs text-slate-600">
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
      <section className="relative border-t border-white/[0.05] px-4 py-10 sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">

          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-600 transition-colors hover:text-slate-300"
          >
            <FaArrowLeft
              size={9}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            Home
          </Link>

          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-cyan-300 opacity-50">
            NEWS
            <FaArrowRight size={8} />
          </div>

        </div>
      </section>

    </main>
  );
}

