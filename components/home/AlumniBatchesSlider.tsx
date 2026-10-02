
"use client";

import { useEffect, useState } from "react";
import { useHomeData } from "@/contexts/HomeDataContext";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaGraduationCap,
  FaUsers,
} from "react-icons/fa";

export default function AlumniBatchesSlider() {
  const { data, loading } = useHomeData();

  const [activePage, setActivePage] = useState(0);

  const batches = data?.batches ?? [];

  const pages = Math.max(1, Math.ceil(batches.length / 3));

  const visibleBatches = batches.slice(
    activePage * 3,
    activePage * 3 + 3
  );

  useEffect(() => {
    setActivePage((current) => Math.min(current, pages - 1));

    if (pages < 2) return;

    const timer = window.setInterval(() => {
      setActivePage((current) => (current + 1) % pages);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [pages]);

  const move = (direction: number) => {
    setActivePage(
      (current) => (current + direction + pages) % pages
    );
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay: 0.35,
        ease: "easeOut",
      }}
      className="mt-14 w-full sm:mt-16 lg:mt-20"
      aria-label="Alumni batches"
    >
      {/* =========================================================
          HEADER
      ========================================================= */}

      <div className="mb-7 flex flex-col gap-5 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          {/* Eyebrow */}

          <div className="mb-3 flex items-center gap-2">
            <span className="h-px w-7 bg-[#2DD4BF]" />

            <span className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.28em] text-[#087EA4] sm:text-[10px]">
              <FaGraduationCap size={10} />
              Alumni Network
            </span>
          </div>

          {/* Heading */}

          <h2
            className="
              text-2xl
              font-bold
              tracking-[-0.035em]
              text-[#123B4A]
              sm:text-3xl
              lg:text-[2.15rem]
            "
          >
            Generations of{" "}
            <span className="text-[#087EA4]">Fisheries</span>
          </h2>

          <p
            className="
              mt-2
              max-w-xl
              text-xs
              leading-6
              text-[#55727D]
              sm:text-sm
            "
          >
            Connecting graduates across generations and celebrating
            the people who carry the Faculty of Fisheries forward.
          </p>
        </div>

        {/* =====================================================
            DESKTOP CONTROLS
        ===================================================== */}

        <div className="flex items-center justify-between gap-4 sm:justify-end">
          <Link
            href="/Ouralumni"
            className="
              group inline-flex
              items-center gap-2
              text-[10px]
              font-bold
              uppercase
              tracking-[0.16em]
              text-[#087EA4]
              transition-colors
              hover:text-[#075985]
              sm:text-xs
            "
          >
            View all alumni

            <span
              className="
                flex h-7 w-7
                items-center justify-center
                rounded-full
                bg-[#087EA4]/8
                transition-all
                duration-300
                group-hover:bg-[#087EA4]
                group-hover:text-white
              "
            >
              <FaArrowRight
                size={8}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </span>
          </Link>

          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={() => move(-1)}
              disabled={pages < 2}
              aria-label="Previous alumni batches"
              className="
                grid h-9 w-9
                place-items-center
                rounded-full
                border border-[#087EA4]/15
                bg-white
                text-[#087EA4]
                transition-all
                duration-300
                hover:border-[#087EA4]
                hover:bg-[#087EA4]
                hover:text-white
                disabled:pointer-events-none
                disabled:opacity-30
              "
            >
              <FaChevronLeft size={9} />
            </button>

            <button
              type="button"
              onClick={() => move(1)}
              disabled={pages < 2}
              aria-label="Next alumni batches"
              className="
                grid h-9 w-9
                place-items-center
                rounded-full
                bg-[#087EA4]
                text-white
                shadow-[0_8px_20px_rgba(8,126,164,0.16)]
                transition-all
                duration-300
                hover:bg-[#075985]
                disabled:pointer-events-none
                disabled:opacity-30
              "
            >
              <FaChevronRight size={9} />
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================
          BATCH CARDS
      ========================================================= */}

      {visibleBatches.length ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{
              opacity: 0,
              x: 18,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -18,
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
            className="
              grid
              gap-4
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {visibleBatches.map(({ batch, count }, index) => (
              <Link
                key={batch}
                href="/Ouralumni"
                className="
                  group relative
                  overflow-hidden
                  rounded-2xl
                  border border-[#087EA4]/10
                  bg-white
                  p-5
                  shadow-[0_8px_30px_rgba(7,89,133,0.045)]
                  transition-all
                  duration-300
                  hover:-translate-y-1.5
                  hover:border-[#2DD4BF]/50
                  hover:shadow-[0_18px_40px_rgba(7,89,133,0.11)]
                  sm:p-6
                "
              >
                {/* =================================================
                    TOP LINE
                ================================================= */}

                <div className="flex items-center justify-between">
                  <span
                    className="
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.2em]
                      text-[#55727D]
                    "
                  >
                    Graduating Class
                  </span>

                  <span
                    className="
                      text-[10px]
                      font-bold
                      text-[#087EA4]/35
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* =================================================
                    YEAR
                ================================================= */}

                <div className="mt-5 flex items-end justify-between gap-4">
                  <div>
                    <p
                      className="
                        text-[2.4rem]
                        font-black
                        leading-none
                        tracking-[-0.055em]
                        text-[#075985]
                        sm:text-[2.65rem]
                      "
                    >
                      {batch}
                    </p>

                    <div className="mt-3 flex items-center gap-2">
                      <span
                        className="
                          flex h-7 w-7
                          items-center justify-center
                          rounded-lg
                          bg-[#0891B2]/8
                          text-[#0891B2]
                        "
                      >
                        <FaUsers size={10} />
                      </span>

                      <span className="text-[11px] font-medium text-[#55727D]">
                        {count.toLocaleString()} alumni
                      </span>
                    </div>
                  </div>

                  {/* Arrow */}

                  <span
                    className="
                      flex h-11 w-11
                      shrink-0
                      items-center justify-center
                      rounded-full
                      border border-[#087EA4]/12
                      bg-[#F0FAFC]
                      text-[#087EA4]
                      transition-all
                      duration-300
                      group-hover:border-[#087EA4]
                      group-hover:bg-[#087EA4]
                      group-hover:text-white
                      group-hover:shadow-[0_8px_20px_rgba(8,126,164,0.18)]
                    "
                  >
                    <FaArrowRight
                      size={10}
                      className="
                        transition-transform
                        duration-300
                        group-hover:translate-x-0.5
                      "
                    />
                  </span>
                </div>

                {/* =================================================
                    BOTTOM ACCENT
                ================================================= */}

                <div
                  className="
                    absolute
                    bottom-0
                    left-0
                    h-[3px]
                    w-full
                    origin-left
                    scale-x-0
                    bg-gradient-to-r
                    from-[#075985]
                    via-[#087EA4]
                    to-[#2DD4BF]
                    transition-transform
                    duration-500
                    group-hover:scale-x-100
                  "
                />
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>
      ) : loading ? (
        /* =========================================================
           LOADING
        ========================================================= */

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="
                h-36
                animate-pulse
                rounded-2xl
                border border-[#087EA4]/8
                bg-white/70
              "
            />
          ))}
        </div>
      ) : (
        /* =========================================================
           EMPTY STATE
        ========================================================= */

        <div
          className="
            rounded-2xl
            border border-dashed
            border-[#087EA4]/15
            bg-white
            px-5 py-10
            text-center
          "
        >
          <div
            className="
              mx-auto mb-3
              flex h-10 w-10
              items-center justify-center
              rounded-full
              bg-[#087EA4]/8
              text-[#087EA4]
            "
          >
            <FaUsers size={13} />
          </div>

          <p className="text-sm font-semibold text-[#123B4A]">
            Alumni batches are coming soon
          </p>

          <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-[#55727D]">
            Alumni profiles will appear here as the community grows.
          </p>
        </div>
      )}

      {/* =========================================================
          PAGINATION
      ========================================================= */}

      <div className="mt-6 flex items-center justify-between">
        {/* Progress */}

        <div
          className="flex items-center gap-1.5"
          aria-label={`${pages} alumni batch pages`}
        >
          {Array.from({ length: pages }, (_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Show alumni batch page ${index + 1}`}
              aria-current={
                index === activePage ? "page" : undefined
              }
              onClick={() => setActivePage(index)}
              className={`
                h-1.5 rounded-full
                transition-all duration-300
                ${
                  index === activePage
                    ? "w-7 bg-[#087EA4]"
                    : "w-1.5 bg-[#087EA4]/20 hover:bg-[#087EA4]/40"
                }
              `}
            />
          ))}
        </div>

        {/* Mobile controls */}

        <div className="flex items-center gap-2 sm:hidden">
          <button
            type="button"
            onClick={() => move(-1)}
            disabled={pages < 2}
            aria-label="Previous alumni batches"
            className="
              grid h-8 w-8
              place-items-center
              rounded-full
              border border-[#087EA4]/12
              bg-white
              text-[#087EA4]
              disabled:opacity-30
            "
          >
            <FaChevronLeft size={8} />
          </button>

          <button
            type="button"
            onClick={() => move(1)}
            disabled={pages < 2}
            aria-label="Next alumni batches"
            className="
              grid h-8 w-8
              place-items-center
              rounded-full
              bg-[#087EA4]
              text-white
              disabled:opacity-30
            "
          >
            <FaChevronRight size={8} />
          </button>
        </div>
      </div>
    </motion.section>
  );
}

