"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaFish,
  FaArrowRight,
  FaPlay,
  FaMicroscope,
  FaWater,
  FaGlobeAsia,
  FaFlask,
  FaChevronRight,
} from "react-icons/fa";

const departments = [
  {
    code: "AQC",
    name: "Aquaculture",
  },
  {
    code: "FBG",
    name: "Fisheries Biology & Genetics",
  },
  {
    code: "FMN",
    name: "Fisheries Management",
  },
  {
    code: "FST",
    name: "Fisheries Technology",
  },
  {
    code: "MFO",
    name: "Marine Fisheries & Oceanography",
  },
];

const stats = [
  {
    value: "05",
    label: "Departments",
    icon: FaMicroscope,
  },
  {
    value: "30+",
    label: "Faculty Members",
    icon: FaFlask,
  },
  {
    value: "500+",
    label: "Alumni Network",
    icon: FaGlobeAsia,
  },
  {
    value: "200+",
    label: "Research Papers",
    icon: FaWater,
  },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#020b18] text-white">

      {/* =========================================================
          ATMOSPHERIC BACKGROUND
      ========================================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Deep ocean gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(20,184,166,0.10),transparent_30%),radial-gradient(circle_at_85%_15%,rgba(14,165,233,0.12),transparent_32%),radial-gradient(circle_at_50%_100%,rgba(8,47,73,0.65),transparent_50%)]" />

        {/* Large atmospheric glow */}
        <motion.div
          className="absolute -right-40 -top-48 h-[620px] w-[620px] rounded-full bg-cyan-500/[0.07] blur-[140px]"
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Teal atmospheric glow */}
        <motion.div
          className="absolute -bottom-60 -left-40 h-[650px] w-[650px] rounded-full bg-teal-500/[0.06] blur-[150px]"
          animate={{
            x: [0, 40, 0],
            y: [0, -25, 0],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Center light */}
        <div className="absolute left-[48%] top-[42%] h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-sky-400/[0.035] blur-[130px]" />

        {/* Subtle technical grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Floating fish */}
        {[...Array(9)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-cyan-300/[0.08]"
            style={{
              left: `${4 + i * 11}%`,
              top: `${16 + (i % 5) * 17}%`,
              fontSize: `${0.8 + i * 0.18}rem`,
            }}
            animate={{
              y: [0, -15, 0],
              x: [0, 12, 0],
              rotate: [0, 2, 0],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeInOut",
            }}
          >
            <FaFish />
          </motion.div>
        ))}

        {/* Fine noise-like highlight */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,11,24,0.25)_100%)]" />
      </div>

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-24 pt-32 sm:px-6 lg:px-8 lg:pt-36">

        <div className="grid items-center gap-16 lg:grid-cols-[1.08fr_0.92fr]">

          {/* =====================================================
              LEFT SIDE
          ===================================================== */}

          <div>

            {/* University identity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div
                className="
                  group mb-7 inline-flex items-center gap-3
                  rounded-full
                  border border-white/[0.09]
                  bg-white/[0.035]
                  px-3 py-2
                  shadow-[0_8px_40px_rgba(0,0,0,0.18)]
                  backdrop-blur-2xl
                  transition-all duration-500
                  hover:border-teal-300/20
                  hover:bg-white/[0.055]
                "
              >
                <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-teal-300/10 bg-teal-400/[0.08]">
                  <span className="absolute inset-0 rounded-full bg-teal-400/10 blur-md" />
                  <FaFish className="relative text-xs text-teal-300" />
                </span>

                <span className="pr-2 text-xs font-medium tracking-wide text-slate-300 sm:text-sm">
                  Patuakhali Science and Technology University
                </span>

                <span className="hidden h-4 w-px bg-white/10 sm:block" />

                <span className="hidden text-[10px] uppercase tracking-[0.2em] text-teal-300/70 sm:block">
                  PSTU
                </span>
              </div>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="
                max-w-4xl
                font-display
                text-5xl
                font-bold
                leading-[0.98]
                tracking-[-0.04em]
                sm:text-6xl
                lg:text-[5.4rem]
              "
            >
              Faculty of{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-cyan-300 via-teal-300 to-emerald-300 bg-clip-text text-transparent">
                  Fisheries
                </span>

                {/* Hand-drawn-ish underline */}
                <motion.span
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "85%", opacity: 1 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.8,
                    ease: "easeOut",
                  }}
                  className="absolute -bottom-2 left-1/2 h-px -translate-x-1/2 bg-gradient-to-r from-transparent via-teal-300/70 to-transparent"
                />
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="
                mt-8
                max-w-2xl
                text-base
                leading-8
                text-slate-400
                sm:text-lg
              "
            >
              Advancing aquatic sciences through education, research,
              innovation, and responsible stewardship of the waters that
              sustain our communities.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              {/* Primary */}
              <Link
                href="/departments"
                className="
                  group relative inline-flex items-center gap-3
                  overflow-hidden
                  rounded-xl
                  border border-teal-300/20
                  bg-gradient-to-br from-teal-400/20 to-cyan-400/10
                  px-6 py-3.5
                  font-semibold
                  text-white
                  shadow-[0_10px_35px_rgba(20,184,166,0.12)]
                  backdrop-blur-xl
                  transition-all duration-500
                  hover:-translate-y-1
                  hover:border-teal-300/40
                  hover:shadow-[0_15px_45px_rgba(20,184,166,0.18)]
                "
              >
                {/* Shine */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.12] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                <span className="relative">
                  Explore Departments
                </span>

                <span className="relative flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.07]">
                  <FaArrowRight className="text-[10px] transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </Link>

              {/* Secondary */}
              <Link
                href="/Ouralumni"
                className="
                  group inline-flex items-center gap-3
                  rounded-xl
                  border border-white/[0.09]
                  bg-white/[0.035]
                  px-5 py-3.5
                  font-medium
                  text-slate-200
                  shadow-[0_8px_30px_rgba(0,0,0,0.15)]
                  backdrop-blur-2xl
                  transition-all duration-500
                  hover:-translate-y-1
                  hover:border-white/[0.16]
                  hover:bg-white/[0.06]
                "
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-teal-300/10 bg-teal-400/[0.07]">
                  <FaPlay className="ml-0.5 text-[9px] text-teal-300" />
                </span>

                <span>Meet Our Alumni</span>
              </Link>
            </motion.div>

            {/* Philosophy */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="mt-10 flex items-center gap-3"
            >
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-teal-400/40" />

              <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500">
                Education
              </span>

              <span className="text-teal-400/30">•</span>

              <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500">
                Research
              </span>

              <span className="text-teal-400/30">•</span>

              <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500">
                Sustainability
              </span>
            </motion.div>
          </div>

          {/* =====================================================
              PREMIUM GLASS PANEL
          ===================================================== */}

          <motion.div
            initial={{ opacity: 0, x: 45 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >

            {/* Ambient glow */}
            <div className="absolute -inset-10 rounded-[3rem] bg-teal-400/[0.035] blur-[70px]" />

            {/* Decorative orbit */}
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full border border-white/[0.04]" />
            <div className="pointer-events-none absolute -right-3 -top-3 h-20 w-20 rounded-full border border-teal-300/[0.05]" />

            {/* Main glass */}
            <div
              className="
                relative overflow-hidden
                rounded-[2rem]
                border border-white/[0.11]
                bg-white/[0.035]
                p-5
                shadow-[0_30px_90px_rgba(0,0,0,0.35)]
                backdrop-blur-[30px]
                sm:p-6
              "
            >

              {/* Glass reflection */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/[0.07] to-transparent" />

              {/* Diagonal reflection */}
              <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-32 rotate-[35deg] bg-white/[0.025] blur-2xl" />

              {/* Inner border */}
              <div className="pointer-events-none absolute inset-1 rounded-[1.8rem] border border-white/[0.025]" />

              {/* Header */}
              <div className="relative mb-6 flex items-center justify-between">

                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-300 shadow-[0_0_12px_rgba(45,212,191,0.8)]" />

                    <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-teal-300/80">
                      Faculty Overview
                    </p>
                  </div>

                  <h2 className="mt-2 text-xl font-semibold tracking-tight text-white">
                    Fisheries at PSTU
                  </h2>
                </div>

                <div
                  className="
                    flex h-12 w-12 items-center justify-center
                    rounded-2xl
                    border border-white/[0.08]
                    bg-white/[0.045]
                    shadow-inner
                    backdrop-blur-xl
                  "
                >
                  <FaFish className="text-teal-300" />
                </div>
              </div>

              {/* Stats */}
              <div className="relative grid grid-cols-2 gap-3">

                {stats.map((stat, index) => {
                  const Icon = stat.icon;

                  return (
                    <motion.div
                      key={stat.label}
                      initial={{
                        opacity: 0,
                        scale: 0.94,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.55,
                        delay: 0.45 + index * 0.1,
                      }}
                      className="
                        group relative overflow-hidden
                        rounded-2xl
                        border border-white/[0.07]
                        bg-black/[0.12]
                        p-4
                        backdrop-blur-xl
                        transition-all duration-500
                        hover:-translate-y-1
                        hover:border-teal-300/20
                        hover:bg-white/[0.045]
                      "
                    >

                      {/* Card glow */}
                      <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-teal-400/[0.07] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                      <div className="relative mb-5 flex items-center justify-between">

                        <div
                          className="
                            flex h-9 w-9 items-center justify-center
                            rounded-xl
                            border border-teal-300/10
                            bg-teal-400/[0.06]
                          "
                        >
                          <Icon className="text-xs text-teal-300" />
                        </div>

                        <span className="h-1.5 w-1.5 rounded-full bg-teal-300/70 shadow-[0_0_9px_rgba(45,212,191,0.5)]" />
                      </div>

                      <p className="relative text-3xl font-bold tracking-tight text-white">
                        {stat.value}
                      </p>

                      <p className="relative mt-1 text-xs leading-5 text-slate-500">
                        {stat.label}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Research feature */}
              <div
                className="
                  group relative mt-3 overflow-hidden
                  rounded-2xl
                  border border-white/[0.07]
                  bg-gradient-to-br from-teal-400/[0.055] to-white/[0.015]
                  p-5
                  backdrop-blur-xl
                "
              >
                {/* Accent line */}
                <div className="absolute bottom-0 left-0 top-0 w-px bg-gradient-to-b from-transparent via-teal-300/40 to-transparent" />

                <div className="flex items-start gap-4">

                  <div
                    className="
                      flex h-11 w-11 shrink-0 items-center justify-center
                      rounded-xl
                      border border-teal-300/10
                      bg-teal-400/[0.07]
                    "
                  >
                    <FaGlobeAsia className="text-sm text-teal-300" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      Research & Innovation
                    </p>

                    <p className="mt-1.5 max-w-sm text-xs leading-5 text-slate-500">
                      Exploring aquatic ecosystems, fisheries resources,
                      marine environments and sustainable solutions.
                    </p>
                  </div>

                  <FaChevronRight className="ml-auto mt-1 text-[9px] text-slate-600 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-teal-300" />
                </div>
              </div>

              {/* Footer */}
              <div className="mt-5 flex items-center gap-3">

                <div className="h-px flex-1 bg-white/[0.06]" />

                <span className="text-[8px] uppercase tracking-[0.35em] text-slate-600">
                  PSTU • Fisheries
                </span>

                <div className="h-px flex-1 bg-white/[0.06]" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* =========================================================
            DEPARTMENTS
        ========================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.65,
          }}
          className="mt-20"
        >

          {/* Section heading */}
          <div className="mb-5 flex items-center gap-4">

            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-teal-300/70">
                Explore
              </span>

              <p className="mt-1 text-sm font-medium text-slate-400">
                Academic Departments
              </p>
            </div>

            <div className="h-px flex-1 bg-gradient-to-r from-white/[0.08] to-transparent" />
          </div>

          {/* Department cards */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">

            {departments.map((dept, index) => (
              <Link
                key={dept.code}
                href={`/departments/${dept.code.toLowerCase()}`}
                className="
                  group relative overflow-hidden
                  rounded-2xl
                  border border-white/[0.07]
                  bg-white/[0.025]
                  px-4 py-4
                  backdrop-blur-xl
                  transition-all duration-500
                  hover:-translate-y-1
                  hover:border-teal-300/20
                  hover:bg-white/[0.045]
                "
              >

                {/* Hover light */}
                <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-teal-300/[0.08] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                {/* Index */}
                <span className="absolute right-3 top-3 text-[9px] font-mono text-white/[0.08] transition-colors group-hover:text-teal-300/20">
                  0{index + 1}
                </span>

                <div className="relative flex items-center gap-3">

                  <span
                    className="
                      rounded-lg
                      border border-teal-300/10
                      bg-teal-400/[0.055]
                      px-2 py-1
                      font-mono
                      text-[10px]
                      font-bold
                      tracking-wider
                      text-teal-300
                    "
                  >
                    {dept.code}
                  </span>

                  <span className="text-xs font-medium leading-5 text-slate-400 transition-colors group-hover:text-white">
                    {dept.name}
                  </span>
                </div>

                {/* Bottom accent */}
                <div className="mt-4 h-px w-0 bg-gradient-to-r from-cyan-300/60 via-teal-300/50 to-transparent transition-all duration-700 group-hover:w-full" />
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#020b18] via-[#020b18]/60 to-transparent" />
    </section>
  );
}