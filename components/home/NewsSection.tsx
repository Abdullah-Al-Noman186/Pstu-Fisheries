"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { format } from "date-fns";
import {
  FaCalendar,
  FaArrowRight,
  FaBullhorn,
  FaTrophy,
  FaNewspaper,
  FaRegCalendarCheck,
} from "react-icons/fa";

import { useNews } from "@/hooks/useNews";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

/* =========================================================
   CATEGORY STYLES
========================================================= */

const categoryStyles: Record<
  string,
  {
    label: string;
    dot: string;
    text: string;
    glow: string;
    icon: React.ReactNode;
  }
> = {
  news: {
    label: "News",
    dot: "bg-cyan-400",
    text: "text-cyan-300",
    glow: "bg-cyan-400/[0.07]",
    icon: <FaNewspaper size={9} />,
  },

  notice: {
    label: "Notice",
    dot: "bg-rose-400",
    text: "text-rose-300",
    glow: "bg-rose-400/[0.07]",
    icon: <FaBullhorn size={9} />,
  },

  event: {
    label: "Event",
    dot: "bg-emerald-400",
    text: "text-emerald-300",
    glow: "bg-emerald-400/[0.07]",
    icon: <FaRegCalendarCheck size={9} />,
  },

  achievement: {
    label: "Achievement",
    dot: "bg-amber-400",
    text: "text-amber-300",
    glow: "bg-amber-400/[0.07]",
    icon: <FaTrophy size={9} />,
  },
};

export default function NewsSection() {
  const { news, loading } = useNews(undefined, 6);

  return (
    <section className="relative overflow-hidden bg-[#020b18] py-24">
      {/* =======================================================
          BACKGROUND ATMOSPHERE
      ======================================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Ocean glow */}
        <div className="absolute -right-48 -top-48 h-[520px] w-[520px] rounded-full bg-cyan-500/[0.045] blur-[120px]" />

        {/* Lower teal glow */}
        <div className="absolute -bottom-56 -left-48 h-[500px] w-[500px] rounded-full bg-teal-400/[0.035] blur-[120px]" />

        {/* Center glow */}
        <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ocean-500/[0.025] blur-[110px]" />

        {/* Fine grid */}
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(125,211,252,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,0.8) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Top fade */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ocean-950/50 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* =====================================================
            HEADER
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
          className="mb-14 flex items-end justify-between gap-8"
        >
          <div>
            {/* Eyebrow */}
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-cyan-400/60" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-300/70">
                From the Faculty
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              News & <span className="text-cyan-300">Events</span>
            </h2>

            <div className="mt-5 h-px w-20 bg-gradient-to-r from-cyan-400/70 to-transparent" />

            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
              Stay connected with the latest academic activities, notices,
              achievements, events, and stories from the Faculty of Fisheries.
            </p>
          </div>

          {/* Desktop link */}
          <Link
            href="/news"
            className="group hidden shrink-0 items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-3 text-xs font-semibold text-slate-400 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300/20 hover:bg-white/[0.05] hover:text-white md:flex"
          >
            <span>All news</span>

            <span className="flex h-6 w-6 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.035] transition-all duration-300 group-hover:border-cyan-300/20 group-hover:bg-cyan-400/10">
              <FaArrowRight
                size={9}
                className="text-cyan-300 transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </span>
          </Link>
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
        ) : news.length === 0 ? (
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
            className="mx-auto max-w-xl rounded-[2rem] border border-white/[0.08] bg-white/[0.025] p-12 text-center backdrop-blur-2xl"
          >
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/10 bg-cyan-400/[0.06] text-cyan-300">
              <FaNewspaper size={20} />
            </div>

            <h3 className="font-display text-lg font-semibold text-white">
              Nothing published yet
            </h3>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
              News, notices, events, and achievements will appear here when
              they are published.
            </p>
          </motion.div>
        ) : (
          /* ===================================================
             NEWS GRID
          =================================================== */

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {news.slice(0, 6).map((item, i) => {
              const category =
                categoryStyles[item.category?.toLowerCase()] ||
                categoryStyles.news;

              return (
                <motion.article
                  key={item._id}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  whileHover={{
                    y: -5,
                  }}
                  transition={{
                    duration: 0.55,
                    delay: i * 0.07,
                  }}
                  viewport={{
                    once: true,
                    margin: "-50px",
                  }}
                  className="group relative overflow-hidden rounded-[1.6rem] border border-white/[0.075] bg-white/[0.025] shadow-[0_18px_55px_rgba(0,0,0,0.16)] backdrop-blur-2xl transition-all duration-500 hover:border-white/[0.14] hover:bg-white/[0.04] hover:shadow-[0_25px_70px_rgba(0,0,0,0.28)]"
                >
                  {/* =================================================
                      GLASS REFLECTION
                  ================================================= */}

                  <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/[0.035] to-transparent" />

                  {/* =================================================
                      CATEGORY GLOW
                  ================================================= */}

                  <div
                    className={`pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full ${category.glow} blur-[70px] transition-transform duration-700 group-hover:scale-125`}
                  />

                  {/* =================================================
                      TOP LINE
                  ================================================= */}

                  <div
                    className={`absolute left-6 right-6 top-0 h-px ${category.dot} opacity-40`}
                  />

                  {/* =================================================
                      CARD CONTENT
                  ================================================= */}

                  <div className="relative z-10 flex min-h-[290px] flex-col p-6">
                    {/* Category + date */}
                    <div className="mb-7 flex items-center justify-between gap-3">
                      {/* Category */}
                      <span
                        className={`inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.035] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.15em] ${category.text}`}
                      >
                        <span
                          className={`flex h-4 w-4 items-center justify-center rounded-full ${category.glow}`}
                        >
                          {category.icon}
                        </span>

                        {category.label}
                      </span>

                      {/* Date */}
                      <span className="flex shrink-0 items-center gap-1.5 text-[10px] text-slate-600">
                        <FaCalendar
                          size={9}
                          className="text-cyan-400/50"
                        />

                        {format(
                          new Date(item.publishedAt),
                          "dd MMM yyyy"
                        )}
                      </span>
                    </div>

                    {/* =================================================
                        TITLE
                    ================================================= */}

                    <h3 className="font-display text-base font-semibold leading-6 text-slate-100 transition-colors duration-300 group-hover:text-cyan-200">
                      {item.title}
                    </h3>

                    {/* =================================================
                        DIVIDER
                    ================================================= */}

                    <div className="my-5 h-px w-10 bg-white/[0.08] transition-all duration-500 group-hover:w-16 group-hover:bg-cyan-400/40" />

                    {/* =================================================
                        EXCERPT
                    ================================================= */}

                    <p className="line-clamp-3 text-xs leading-6 text-slate-500">
                      {item.excerpt}
                    </p>

                    {/* =================================================
                        READ MORE
                    ================================================= */}

                    <div className="mt-auto pt-7">
                      <Link
                        href={`/news/${item.slug}`}
                        className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 transition-all duration-300 hover:text-cyan-300"
                      >
                        Read story

                        <span className="flex h-6 w-6 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.025] transition-all duration-300 group-hover:border-cyan-300/20 group-hover:bg-cyan-400/[0.08]">
                          <FaArrowRight
                            size={8}
                            className="transition-transform duration-300 group-hover:translate-x-0.5"
                          />
                        </span>
                      </Link>
                    </div>
                  </div>

                  {/* =================================================
                      BOTTOM HOVER LINE
                  ================================================= */}

                  <div
                    className={`absolute bottom-0 left-0 h-px w-0 ${category.dot} opacity-70 transition-all duration-500 group-hover:w-full`}
                  />
                </motion.article>
              );
            })}
          </div>
        )}

        {/* =====================================================
            MOBILE / BOTTOM VIEW ALL
        ===================================================== */}

        {!loading && news.length > 0 && (
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
            className="mt-12 flex justify-center md:hidden"
          >
            <Link
              href="/news"
              className="group inline-flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.025] px-5 py-3 text-xs font-semibold text-slate-400 backdrop-blur-xl transition-all duration-300 hover:border-cyan-300/20 hover:bg-white/[0.05] hover:text-white"
            >
              <span>View all news</span>

              <span className="flex h-6 w-6 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.035]">
                <FaArrowRight
                  size={9}
                  className="text-cyan-300 transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          </motion.div>
        )}

        {/* =====================================================
            FOOTER STATEMENT
        ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          transition={{
            duration: 0.8,
            delay: 0.35,
          }}
          viewport={{
            once: true,
          }}
          className="mt-16 flex items-center justify-center gap-4"
        >
          <span className="h-px w-10 bg-white/[0.08]" />

          <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-slate-600">
            Stories from the Faculty
          </span>

          <span className="h-px w-10 bg-white/[0.08]" />
        </motion.div>
      </div>
    </section>
  );
}