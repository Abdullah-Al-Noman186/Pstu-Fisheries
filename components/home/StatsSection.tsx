
"use client";

import { useEffect, useState } from "react";
import { useHomeData } from "@/contexts/HomeDataContext";
import {
  FaUserGraduate,
  FaBook,
  FaGlobe,
  FaArrowUp,
  FaUsers,
  FaArchive,
  FaArrowRight,
} from "react-icons/fa";
import { motion } from "framer-motion";

function CountUp({
  value,
  duration = 1800,
}: {
  value: number | null | undefined;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (value == null || !Number.isFinite(value)) return;

    setStarted(false);
    setCount(0);

    const startDelay = window.setTimeout(() => {
      setStarted(true);
    }, 100);

    return () => window.clearTimeout(startDelay);
  }, [value]);

  useEffect(() => {
    if (!started || value == null || !Number.isFinite(value)) return;

    let animationFrame: number;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out animation
      const easedProgress = 1 - Math.pow(1 - progress, 4);

      setCount(Math.floor(easedProgress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [started, value, duration]);

  if (value == null || !Number.isFinite(value)) {
    return <>—</>;
  }

  return <>{count.toLocaleString()}</>;
}

export default function StatsSection() {
  const { data: homeData } = useHomeData();

  const stats = [
    {
      value: 5,
      label: "Departments",
      description: "Academic disciplines",
      icon: FaBook,
    },
    {
      value: homeData?.stats.totalTeachers,
      label: "Faculty Members",
      description: "Teachers & researchers",
      icon: FaUserGraduate,
    },
    {
      value: homeData?.stats.totalAlumni,
      label: "Alumni Network",
      description: "Graduates in our community",
      icon: FaGlobe,
    },
    {
      value: homeData?.stats.totalStudents,
      label: "Current Students",
      description: "Students shaping tomorrow",
      icon: FaUsers,
    },
    {
      value: homeData?.stats.totalArchive,
      label: "Archive Stories",
      description: "Memories shared by faculty",
      icon: FaArchive,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#F0FAFC] py-16 sm:py-20 lg:py-24">
      {/* =========================================================
          BACKGROUND
      ========================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-52 bg-gradient-to-b from-[#D9F3FA]/70 to-transparent" />

        <div className="absolute -left-32 top-24 h-72 w-72 rounded-full bg-[#0891B2]/[0.045] blur-[100px]" />

        <div className="absolute -right-24 top-16 h-80 w-80 rounded-full bg-[#2DD4BF]/[0.055] blur-[110px]" />

        <div className="absolute bottom-[-180px] left-1/2 h-96 w-[700px] -translate-x-1/2 rounded-full bg-[#087EA4]/[0.035] blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: `
              linear-gradient(#075985 1px, transparent 1px),
              linear-gradient(90deg, #075985 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* =========================================================
          CONTENT
      ========================================================== */}

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-10 flex flex-col gap-6 sm:mb-12 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[#0891B2]" />

              <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#087EA4] sm:text-[10px]">
                Our community
              </span>

              <span className="h-1.5 w-1.5 rounded-full bg-[#2DD4BF]" />
            </div>

            <h2 className="text-[2rem] font-bold leading-[1.1] tracking-[-0.045em] text-[#123B4A] sm:text-4xl lg:text-[2.8rem]">
              One faculty.
              <br className="hidden sm:block" />{" "}
              <span className="bg-gradient-to-r from-[#075985] via-[#087EA4] to-[#0891B2] bg-clip-text text-transparent">
                Thousands of connections.
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-6 text-[#55727D] sm:text-[15px]">
              A growing academic community connecting students, faculty and
              alumni across generations through knowledge, research and
              shared experiences.
            </p>
          </div>

          <div className="flex items-center gap-3 lg:mb-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#087EA4]/10 bg-white shadow-[0_8px_25px_rgba(8,126,164,0.07)]">
              <span className="h-2 w-2 rounded-full bg-[#2DD4BF] shadow-[0_0_12px_rgba(45,212,191,0.55)]" />
            </div>

            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#087EA4]">
                PSTU
              </p>

              <p className="mt-0.5 text-xs text-[#55727D]">
                Faculty of Fisheries
              </p>
            </div>
          </div>
        </motion.div>

        {/* =========================================================
            STATS
        ========================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.07,
                  ease: "easeOut",
                }}
                className={`
                  group relative overflow-hidden
                  rounded-[1.35rem]
                  border border-[#087EA4]/[0.09]
                  bg-white
                  px-5 py-6
                  shadow-[0_10px_35px_rgba(7,89,133,0.055)]
                  transition-all duration-500
                  hover:-translate-y-1
                  hover:border-[#0891B2]/20
                  hover:shadow-[0_20px_45px_rgba(7,89,133,0.10)]
                  sm:px-6 sm:py-7
                  ${index === 4 ? "sm:col-span-2 lg:col-span-1" : ""}
                `}
              >
                {/* Hover glow */}
                <div
                  className="
                    pointer-events-none
                    absolute -right-16 -top-16
                    h-36 w-36
                    rounded-full
                    bg-[#2DD4BF]/[0.09]
                    opacity-0
                    blur-3xl
                    transition-opacity duration-500
                    group-hover:opacity-100
                  "
                />

                {/* Icon + index */}
                <div className="relative flex items-start justify-between">
                  <div
                    className="
                      flex h-10 w-10 items-center justify-center
                      rounded-xl
                      border border-[#087EA4]/10
                      bg-[#F0FAFC]
                      text-[#087EA4]
                      transition-all duration-500
                      group-hover:border-[#0891B2]/20
                      group-hover:bg-[#E8F8FB]
                      group-hover:text-[#075985]
                    "
                  >
                    <Icon className="text-[13px]" />
                  </div>

                  <span className="font-mono text-[9px] tracking-[0.2em] text-[#087EA4]/25">
                    0{index + 1}
                  </span>
                </div>

                {/* =================================================
                    ANIMATED NUMBER
                ================================================== */}

                <div className="relative mt-7 flex items-center gap-2">
                  <span
                    className="
                      min-w-0
                      text-[2.35rem]
                      font-bold
                      leading-none
                      tracking-[-0.055em]
                      text-[#123B4A]
                      tabular-nums
                      transition-colors
                      duration-300
                      group-hover:text-[#075985]
                      sm:text-[2.55rem]
                    "
                  >
                    <CountUp value={stat.value} duration={1800} />
                  </span>

                  <FaArrowUp
                    className="
                      text-[8px]
                      text-[#0891B2]/55
                      transition-transform
                      duration-300
                      group-hover:-translate-y-1
                    "
                  />
                </div>

                {/* Label */}
                <p className="relative mt-3 text-sm font-semibold text-[#164E63]">
                  {stat.label}
                </p>

                {/* Description */}
                <p className="relative mt-1.5 text-[11px] leading-5 text-[#66838D]">
                  {stat.description}
                </p>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-5 h-[2px] w-0 rounded-full bg-gradient-to-r from-[#075985] via-[#087EA4] to-[#2DD4BF] transition-all duration-500 group-hover:w-12" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* =========================================================
            BOTTOM IDENTITY
        ========================================================== */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-7 flex flex-col gap-4 border-t border-[#087EA4]/[0.08] pt-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0891B2] shadow-[0_0_10px_rgba(8,145,178,0.45)]" />

            <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#55727D]">
              PSTU · Faculty of Fisheries
            </span>
          </div>

          <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.18em] text-[#7A969E]">
            <span>Education</span>
            <span className="text-[#2DD4BF]">•</span>
            <span>Research</span>
            <span className="text-[#2DD4BF]">•</span>
            <span>Sustainability</span>
          </div>

          <motion.a
            href="/Ouralumni"
            whileHover={{ x: 3 }}
            className="group hidden items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#087EA4] sm:flex"
          >
            Explore alumni

            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#087EA4]/10 bg-white transition-all duration-300 group-hover:border-[#087EA4] group-hover:bg-[#087EA4] group-hover:text-white">
              <FaArrowRight className="text-[8px]" />
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

