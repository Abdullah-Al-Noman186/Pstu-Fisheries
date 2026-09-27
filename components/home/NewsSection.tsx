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
    bg: string;
    border: string;
    icon: React.ReactNode;
  }
> = {
  news: {
    label: "News",
    dot: "bg-[#087EA4]",
    text: "text-[#087EA4]",
    bg: "bg-[#087EA4]/[0.07]",
    border: "border-[#087EA4]/15",
    icon: <FaNewspaper size={9} />,
  },

  notice: {
    label: "Notice",
    dot: "bg-[#E11D48]",
    text: "text-[#BE123C]",
    bg: "bg-[#E11D48]/[0.07]",
    border: "border-[#E11D48]/15",
    icon: <FaBullhorn size={9} />,
  },

  event: {
    label: "Event",
    dot: "bg-[#059669]",
    text: "text-[#047857]",
    bg: "bg-[#059669]/[0.07]",
    border: "border-[#059669]/15",
    icon: <FaRegCalendarCheck size={9} />,
  },

  achievement: {
    label: "Achievement",
    dot: "bg-[#D97706]",
    text: "text-[#B45309]",
    bg: "bg-[#D97706]/[0.07]",
    border: "border-[#D97706]/15",
    icon: <FaTrophy size={9} />,
  },
};

export default function NewsSection() {
  const { news, loading } = useNews(undefined, 6);

  return (
    <section className="relative overflow-hidden bg-[#F0FAFC] py-24">
      {/* =======================================================
          BACKGROUND ATMOSPHERE
      ======================================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top-right ocean glow */}
        <div className="absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-[#2DD4BF]/10 blur-[110px]" />

        {/* Bottom-left blue glow */}
        <div className="absolute -bottom-48 -left-48 h-[500px] w-[500px] rounded-full bg-[#087EA4]/[0.07] blur-[120px]" />

        {/* Center subtle glow */}
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0891B2]/[0.035] blur-[120px]" />

        {/* Fine ocean grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(8,126,164,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(8,126,164,0.8) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Top atmospheric fade */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/60 to-transparent" />

        {/* Bottom atmospheric fade */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#F0FAFC] to-transparent" />
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
              <span className="h-px w-9 bg-[#087EA4]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#087EA4]">
                From the Faculty
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-display text-4xl font-bold tracking-tight text-[#123B4A] sm:text-5xl">
              News &{" "}
              <span className="bg-gradient-to-r from-[#087EA4] via-[#0891B2] to-[#2DD4BF] bg-clip-text text-transparent">
                Events
              </span>
            </h2>

            {/* Accent */}
            <div className="mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-[#087EA4] to-[#2DD4BF]" />

            <p className="mt-5 max-w-xl text-sm leading-7 text-[#55727D] sm:text-base">
              Stay connected with the latest academic activities, notices,
              achievements, events, and stories from the Faculty of Fisheries.
            </p>
          </div>

          {/* Desktop link */}
          <Link
            href="/news"
            className="
              group hidden shrink-0 items-center gap-3
              rounded-xl
              border border-[#087EA4]/10
              bg-white
              px-4 py-3
              text-xs font-semibold
              text-[#55727D]
              shadow-[0_8px_30px_rgba(7,89,133,0.06)]
              transition-all duration-300
              hover:-translate-y-0.5
              hover:border-[#087EA4]/25
              hover:text-[#087EA4]
              md:flex
            "
          >
            <span>All news</span>

            <span
              className="
                flex h-7 w-7 items-center justify-center
                rounded-lg
                bg-[#087EA4]/[0.07]
                text-[#087EA4]
                transition-all duration-300
                group-hover:bg-[#087EA4]
                group-hover:text-white
              "
            >
              <FaArrowRight
                size={9}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </span>
          </Link>
        </motion.div>

        {/* =====================================================
            LOADING
        ===================================================== */}

        {loading ? (
          <div className="flex min-h-[320px] items-center justify-center">
            <div
              className="
                rounded-2xl
                border border-[#087EA4]/10
                bg-white
                px-10 py-10
                shadow-[0_15px_50px_rgba(7,89,133,0.07)]
              "
            >
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
            className="
              mx-auto max-w-xl
              rounded-[2rem]
              border border-[#087EA4]/10
              bg-white
              p-12
              text-center
              shadow-[0_20px_60px_rgba(7,89,133,0.07)]
            "
          >
            <div
              className="
                mx-auto mb-5
                flex h-14 w-14
                items-center justify-center
                rounded-2xl
                bg-[#087EA4]/[0.07]
                text-[#087EA4]
              "
            >
              <FaNewspaper size={20} />
            </div>

            <h3 className="font-display text-lg font-semibold text-[#123B4A]">
              Nothing published yet
            </h3>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#55727D]">
              News, notices, events, and achievements will appear here when
              they are published.
            </p>
          </motion.div>
        ) : (
          /* ===================================================
             NEWS GRID
          =================================================== */

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                    y: -6,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.07,
                  }}
                  viewport={{
                    once: true,
                    margin: "-50px",
                  }}
                  className="
                    group relative overflow-hidden
                    rounded-[1.5rem]
                    border border-[#087EA4]/10
                    bg-white
                    shadow-[0_12px_40px_rgba(7,89,133,0.055)]
                    transition-all duration-500
                    hover:border-[#087EA4]/20
                    hover:shadow-[0_22px_60px_rgba(7,89,133,0.11)]
                  "
                >
                  {/* =================================================
                      TOP COLOR ACCENT
                  ================================================= */}

                  <div
                    className={`
                      absolute left-0 right-0 top-0
                      h-1
                      ${category.dot}
                      opacity-70
                      transition-all duration-500
                      group-hover:h-1.5
                    `}
                  />

                  {/* =================================================
                      SOFT CATEGORY GLOW
                  ================================================= */}

                  <div
                    className={`
                      pointer-events-none
                      absolute -right-20 -top-20
                      h-48 w-48
                      rounded-full
                      ${category.bg}
                      blur-[70px]
                      transition-transform duration-700
                      group-hover:scale-125
                    `}
                  />

                  {/* =================================================
                      CARD CONTENT
                  ================================================= */}

                  <div className="relative z-10 flex min-h-[300px] flex-col p-6">
                    {/* Category + date */}
                    <div className="mb-7 flex items-center justify-between gap-3">
                      {/* Category */}
                      <span
                        className={`
                          inline-flex items-center gap-2
                          rounded-full
                          border
                          ${category.border}
                          ${category.bg}
                          px-3 py-1.5
                          text-[9px]
                          font-bold
                          uppercase
                          tracking-[0.15em]
                          ${category.text}
                        `}
                      >
                        <span
                          className={`
                            flex h-4 w-4
                            items-center justify-center
                            rounded-full
                            ${category.bg}
                          `}
                        >
                          {category.icon}
                        </span>

                        {category.label}
                      </span>

                      {/* Date */}
                      <span className="flex shrink-0 items-center gap-1.5 text-[10px] font-medium text-[#55727D]/70">
                        <FaCalendar
                          size={9}
                          className="text-[#087EA4]/60"
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

                    <h3
                      className="
                        font-display
                        text-base
                        font-bold
                        leading-6
                        text-[#123B4A]
                        transition-colors duration-300
                        group-hover:text-[#087EA4]
                      "
                    >
                      {item.title}
                    </h3>

                    {/* =================================================
                        DIVIDER
                    ================================================= */}

                    <div
                      className="
                        my-5
                        h-0.5
                        w-10
                        rounded-full
                        bg-[#087EA4]/15
                        transition-all duration-500
                        group-hover:w-16
                        group-hover:bg-[#087EA4]/50
                      "
                    />

                    {/* =================================================
                        EXCERPT
                    ================================================= */}

                    <p className="line-clamp-3 text-xs leading-6 text-[#55727D]">
                      {item.excerpt}
                    </p>

                    {/* =================================================
                        READ MORE
                    ================================================= */}

                    <div className="mt-auto pt-7">
                      <Link
                        href={`/news/${item.slug}`}
                        className="
                          inline-flex items-center gap-2
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-[0.16em]
                          text-[#55727D]
                          transition-all duration-300
                          hover:text-[#087EA4]
                        "
                      >
                        Read story

                        <span
                          className="
                            flex h-7 w-7
                            items-center justify-center
                            rounded-lg
                            border border-[#087EA4]/10
                            bg-[#087EA4]/[0.04]
                            transition-all duration-300
                            group-hover:border-[#087EA4]/20
                            group-hover:bg-[#087EA4]
                            group-hover:text-white
                          "
                        >
                          <FaArrowRight
                            size={8}
                            className="
                              transition-transform duration-300
                              group-hover:translate-x-0.5
                            "
                          />
                        </span>
                      </Link>
                    </div>
                  </div>

                  {/* =================================================
                      BOTTOM HOVER LINE
                  ================================================= */}

                  <div
                    className={`
                      absolute bottom-0 left-0
                      h-0.5
                      w-0
                      ${category.dot}
                      opacity-80
                      transition-all duration-500
                      group-hover:w-full
                    `}
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
              className="
                group inline-flex items-center gap-3
                rounded-xl
                border border-[#087EA4]/10
                bg-white
                px-5 py-3
                text-xs font-bold
                text-[#55727D]
                shadow-[0_8px_25px_rgba(7,89,133,0.06)]
                transition-all duration-300
                hover:border-[#087EA4]/20
                hover:text-[#087EA4]
              "
            >
              <span>View all news</span>

              <span
                className="
                  flex h-7 w-7
                  items-center justify-center
                  rounded-lg
                  bg-[#087EA4]/[0.07]
                  text-[#087EA4]
                  transition-all duration-300
                  group-hover:bg-[#087EA4]
                  group-hover:text-white
                "
              >
                <FaArrowRight
                  size={9}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
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
          <span className="h-px w-10 bg-[#087EA4]/15" />

          <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#55727D]/60">
            Stories from the Faculty
          </span>

          <span className="h-px w-10 bg-[#087EA4]/15" />
        </motion.div>
      </div>
    </section>
  );
}