
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
    <section className="relative min-h-screen overflow-hidden bg-ocean-950 text-white">

      {/* =========================================================
          BACKGROUND EFFECTS
      ========================================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Top-right ocean glow */}
        <motion.div
          className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-ocean-700/20 blur-[110px]"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.45, 0.7, 0.45],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Bottom-left teal glow */}
        <motion.div
          className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-teal-500/15 blur-[110px]"
          animate={{
            x: [0, 40, 0],
            y: [0, -25, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Center glow */}
        <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ocean-600/10 blur-[120px]" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

        {/* Floating fish */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-ocean-600/20"
            style={{
              left: `${5 + i * 13}%`,
              top: `${18 + (i % 4) * 19}%`,
              fontSize: `${1 + i * 0.25}rem`,
            }}
            animate={{
              y: [0, -18, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          >
            <FaFish />
          </motion.div>
        ))}
      </div>

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-6 lg:px-8 lg:pt-36">

        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">

          {/* =====================================================
              LEFT SIDE
          ===================================================== */}

          <div>

            {/* University badge */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-ocean-700/70 bg-ocean-800/50 px-4 py-2.5 shadow-xl backdrop-blur-xl">

                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-500/10">
                  <FaFish className="text-xs text-teal-400" />
                </span>

                <span className="text-sm font-medium text-ocean-300">
                  Patuakhali Science and Technology University
                </span>
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="max-w-4xl text-5xl font-display font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
            >
              Faculty of{" "}

              <span className="bg-gradient-to-r from-ocean-400 to-teal-400 bg-clip-text text-transparent">
                Fisheries
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-7 max-w-2xl text-lg leading-8 text-ocean-300"
            >
              Advancing aquatic sciences through world-class education,
              cutting-edge research, and sustainable fisheries management
              across Bangladesh and beyond.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-9 flex flex-wrap gap-4"
            >
              <Link
                href="/departments"
                className="group inline-flex items-center gap-3 rounded-xl border border-ocean-500/30 bg-ocean-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-ocean-950/40 transition-all duration-300 hover:-translate-y-1 hover:bg-ocean-500"
              >
                Explore Departments

                <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/Ouralumni"
                className="group inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.06] px-6 py-3.5 font-semibold text-white shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.1]"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-500/10">
                  <FaPlay className="ml-0.5 text-[10px] text-teal-400" />
                </span>

                Our Alumni
              </Link>
            </motion.div>

            {/* Bottom information */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-10 flex items-center gap-3 text-sm text-ocean-500"
            >
              <span className="h-px w-10 bg-ocean-700" />

              Education

              <span className="text-ocean-700">•</span>

              Research

              <span className="text-ocean-700">•</span>

              Sustainability
            </motion.div>
          </div>

          {/* =====================================================
              RIGHT GLASSMORPHISM PANEL
          ===================================================== */}

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.25,
            }}
            className="relative"
          >

            {/* Glow behind card */}
            <div className="absolute -inset-5 rounded-[2rem] bg-ocean-600/10 blur-3xl" />

            {/* Main glass card */}
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-ocean-800/30 p-5 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-6">

              {/* Top glass reflection */}
              <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

              {/* Card header */}
              <div className="mb-6 flex items-center justify-between">

                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.25em] text-teal-400/80">
                    Faculty Overview
                  </p>

                  <h2 className="mt-1 text-xl font-semibold text-white">
                    Fisheries at PSTU
                  </h2>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-ocean-700 bg-ocean-800/60 backdrop-blur-xl">
                  <FaFish className="text-teal-400" />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">

                {stats.map((stat, index) => {
                  const Icon = stat.icon;

                  return (
                    <motion.div
                      key={stat.label}
                      initial={{
                        opacity: 0,
                        scale: 0.92,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      transition={{
                        duration: 0.5,
                        delay: 0.45 + index * 0.1,
                      }}
                      className="group rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4 backdrop-blur-xl transition-all duration-300 hover:border-teal-400/20 hover:bg-white/[0.07]"
                    >

                      <div className="mb-4 flex items-center justify-between">

                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ocean-700/50">
                          <Icon className="text-sm text-teal-400" />
                        </div>

                        <span className="h-1.5 w-1.5 rounded-full bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.7)]" />

                      </div>

                      <p className="text-3xl font-display font-bold text-white">
                        {stat.value}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-ocean-400">
                        {stat.label}
                      </p>

                    </motion.div>
                  );
                })}
              </div>

              {/* Research section */}
              <div className="mt-3 rounded-2xl border border-ocean-700/50 bg-ocean-900/40 p-5">

                <div className="flex items-start gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-teal-400/10 bg-teal-500/10">
                    <FaGlobeAsia className="text-teal-400" />
                  </div>

                  <div>

                    <p className="text-sm font-semibold text-white">
                      Research & Innovation
                    </p>

                    <p className="mt-1 text-xs leading-5 text-ocean-400">
                      Exploring aquatic ecosystems, fisheries resources,
                      marine environments and sustainable solutions.
                    </p>

                  </div>

                </div>
              </div>

              {/* Card footer */}
              <div className="mt-5 flex items-center gap-3">

                <div className="h-px flex-1 bg-ocean-700/60" />

                <span className="text-[9px] uppercase tracking-[0.3em] text-ocean-600">
                  PSTU • Fisheries
                </span>

                <div className="h-px flex-1 bg-ocean-700/60" />

              </div>
            </div>
          </motion.div>
        </div>

        {/* =========================================================
            DEPARTMENT SECTION
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

            <span className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.25em] text-ocean-500">
              Academic Departments
            </span>

            <div className="h-px flex-1 bg-ocean-800" />

          </div>

          {/* Department cards */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">

            {departments.map((dept) => (
              <Link
                key={dept.code}
                href={`/departments/${dept.code.toLowerCase()}`}
                className="group relative overflow-hidden rounded-xl border border-white/[0.08] bg-ocean-800/30 px-4 py-4 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-teal-400/20 hover:bg-ocean-700/40"
              >

                {/* Hover glow */}
                <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-teal-400/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative flex items-center gap-3">

                  <span className="rounded-lg border border-teal-400/10 bg-teal-500/10 px-2 py-1 font-mono text-[10px] font-bold tracking-wider text-teal-400">
                    {dept.code}
                  </span>

                  <span className="text-xs font-medium leading-5 text-ocean-300 transition-colors group-hover:text-white">
                    {dept.name}
                  </span>

                </div>

                {/* Hover line */}
                <div className="mt-3 h-px w-0 bg-gradient-to-r from-ocean-400 to-teal-400 transition-all duration-500 group-hover:w-full" />

              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* =========================================================
          BOTTOM FADE
      ========================================================= */}

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-ocean-950 to-transparent" />

    </section>
  );
}

