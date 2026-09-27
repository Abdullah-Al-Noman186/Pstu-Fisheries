"use client";

import {
  FaUserGraduate,
  FaBook,
  FaAward,
  FaFlask,
  FaGlobe,
  FaArrowUp,
} from "react-icons/fa";
import { motion } from "framer-motion";

const stats = [
  {
    value: "5",
    label: "Departments",
    description: "Academic disciplines",
    icon: FaBook,
  },
  {
    value: "30+",
    label: "Faculty Members",
    description: "Teachers & researchers",
    icon: FaUserGraduate,
  },
  {
    value: "500+",
    label: "Alumni Worldwide",
    description: "A growing global network",
    icon: FaGlobe,
  },
  {
    value: "200+",
    label: "Publications",
    description: "Research & knowledge",
    icon: FaFlask,
  },
  {
    value: "15+",
    label: "Years of Excellence",
    description: "Building our legacy",
    icon: FaAward,
  },
];

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-[#020b18] py-20 sm:py-24">

      {/* =====================================================
          BACKGROUND ATMOSPHERE
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0">

        {/* Top transition from hero */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#020b18] to-transparent" />

        {/* Soft ocean glow */}
        <div className="absolute left-[10%] top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-teal-400/[0.045] blur-[120px]" />

        <div className="absolute right-[8%] top-1/3 h-80 w-80 rounded-full bg-cyan-400/[0.04] blur-[130px]" />

        {/* Very subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            SECTION INTRO
        ===================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-teal-400/70" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-teal-300/80">
                By the numbers
              </span>
            </div>

            <h2 className="max-w-xl text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              A community built around{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                knowledge & impact.
              </span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-6 text-slate-500">
            A snapshot of the people, research and academic community shaping
            the future of fisheries and aquatic sciences.
          </p>
        </motion.div>

        {/* =====================================================
            GLASS STAT PANEL
        ===================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative overflow-hidden
            rounded-[2rem]
            border border-white/[0.09]
            bg-white/[0.025]
            shadow-[0_30px_80px_rgba(0,0,0,0.25)]
            backdrop-blur-[28px]
          "
        >

          {/* =================================================
              GLASS REFLECTION
          ================================================= */}

          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/[0.055] to-transparent" />

          <div className="pointer-events-none absolute -right-32 -top-40 h-80 w-40 rotate-[35deg] bg-white/[0.018] blur-2xl" />

          {/* Inner glass border */}
          <div className="pointer-events-none absolute inset-1 rounded-[1.9rem] border border-white/[0.025]" />

          {/* =================================================
              STATS GRID
          ================================================= */}

          <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">

            {stats.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <motion.div
                  key={stat.label}
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.3,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  className={`
                    group relative
                    min-h-[190px]
                    p-6
                    sm:p-7
                    ${index < stats.length - 1
                      ? "border-b border-white/[0.06] lg:border-b-0 lg:border-r"
                      : ""}
                    ${index === 1
                      ? "md:border-r md:border-white/[0.06] lg:border-r"
                      : ""}
                    ${index === 2
                      ? "md:border-b md:border-white/[0.06] lg:border-b-0"
                      : ""}
                    transition-colors duration-500
                    hover:bg-white/[0.025]
                  `}
                >

                  {/* Hover glow */}
                  <div className="
                    pointer-events-none
                    absolute -right-10 -top-10
                    h-28 w-28
                    rounded-full
                    bg-teal-300/[0.07]
                    opacity-0
                    blur-3xl
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                  " />

                  {/* Top row */}
                  <div className="relative flex items-center justify-between">

                    <div className="
                      flex h-10 w-10
                      items-center justify-center
                      rounded-xl
                      border border-white/[0.07]
                      bg-white/[0.035]
                      text-teal-300
                      shadow-inner
                      backdrop-blur-xl
                      transition-all
                      duration-500
                      group-hover:border-teal-300/20
                      group-hover:bg-teal-300/[0.06]
                    ">
                      <Icon className="text-sm" />
                    </div>

                    {/* Tiny index */}
                    <span className="
                      font-mono
                      text-[9px]
                      tracking-widest
                      text-white/[0.12]
                      transition-colors
                      group-hover:text-teal-300/30
                    ">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Number */}
                  <div className="relative mt-7 flex items-end gap-2">

                    <span className="
                      text-4xl
                      font-bold
                      tracking-[-0.04em]
                      text-white
                      transition-all
                      duration-500
                      group-hover:text-teal-50
                    ">
                      {stat.value}
                    </span>

                    <FaArrowUp className="
                      mb-2
                      text-[8px]
                      text-teal-300/40
                      transition-all
                      duration-500
                      group-hover:-translate-y-1
                      group-hover:text-teal-300
                    " />
                  </div>

                  {/* Label */}
                  <p className="
                    relative
                    mt-1
                    text-sm
                    font-medium
                    text-slate-300
                    transition-colors
                    duration-300
                    group-hover:text-white
                  ">
                    {stat.label}
                  </p>

                  {/* Human detail */}
                  <p className="
                    relative
                    mt-1
                    text-[11px]
                    leading-5
                    text-slate-600
                    transition-colors
                    duration-300
                    group-hover:text-slate-500
                  ">
                    {stat.description}
                  </p>

                  {/* Bottom accent */}
                  <div className="
                    absolute
                    bottom-0
                    left-6
                    h-px
                    w-0
                    bg-gradient-to-r
                    from-teal-300/60
                    to-transparent
                    transition-all
                    duration-700
                    group-hover:w-16
                  " />

                </motion.div>
              );
            })}
          </div>

          {/* Bottom glass highlight */}
          <div className="
            pointer-events-none
            absolute
            bottom-0
            left-0
            right-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-white/[0.12]
            to-transparent
          " />
        </motion.div>

        {/* =====================================================
            SMALL FOOTNOTE
        ===================================================== */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-5 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-300 shadow-[0_0_10px_rgba(45,212,191,0.7)]" />

            <span className="text-[9px] uppercase tracking-[0.25em] text-slate-600">
              PSTU • Faculty of Fisheries
            </span>
          </div>

          <span className="hidden text-[9px] uppercase tracking-[0.25em] text-slate-700 sm:block">
            Education · Research · Sustainability
          </span>
        </motion.div>

      </div>
    </section>
  );
}