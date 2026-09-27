"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { DEPARTMENTS, Department } from "@/types";
import { FaArrowRight } from "react-icons/fa";

const deptKeys = Object.keys(DEPARTMENTS) as Department[];

const deptStyles: Record<
  Department,
  {
    accent: string;
    soft: string;
    glow: string;
    label: string;
  }
> = {
  AQC: {
    accent: "text-cyan-300",
    soft: "bg-cyan-400/[0.07]",
    glow: "bg-cyan-400/[0.04]",
    label: "Aquatic production",
  },
  FBG: {
    accent: "text-emerald-300",
    soft: "bg-emerald-400/[0.07]",
    glow: "bg-emerald-400/[0.04]",
    label: "Aquatic life & genetics",
  },
  FMN: {
    accent: "text-violet-300",
    soft: "bg-violet-400/[0.07]",
    glow: "bg-violet-400/[0.04]",
    label: "Fisheries management",
  },
  FST: {
    accent: "text-amber-300",
    soft: "bg-amber-400/[0.07]",
    glow: "bg-amber-400/[0.04]",
    label: "Fisheries technology",
  },
  MFO: {
    accent: "text-sky-300",
    soft: "bg-sky-400/[0.07]",
    glow: "bg-sky-400/[0.04]",
    label: "Marine systems & oceanography",
  },
};

export default function DepartmentsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020b18] pt-20 text-white">
      {/* Atmospheric background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-cyan-500/[0.045] blur-[130px]" />

        <div className="absolute right-[-180px] top-[35%] h-[520px] w-[520px] rounded-full bg-teal-400/[0.035] blur-[140px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* Hero */}
      <section className="relative px-4 pb-16 pt-16 sm:px-6 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-cyan-400/70" />

              <span className="text-[11px] uppercase tracking-[0.25em] text-cyan-300/80">
                Faculty of Fisheries • PSTU
              </span>
            </div>

            <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              Five fields.
              <span className="block text-cyan-300">
                One aquatic future.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base md:text-lg">
              Explore the specialized departments shaping education, research,
              innovation, and sustainable fisheries at PSTU.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-10 h-px bg-gradient-to-r from-cyan-400/50 via-white/[0.08] to-transparent"
          />
        </div>
      </section>

      {/* Departments */}
      <section className="relative px-4 pb-24 sm:px-6">
        <div className="mx-auto max-w-6xl">
          {/* Intro row */}
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-[10px] uppercase tracking-[0.24em] text-cyan-300/60">
                Academic divisions
              </p>

              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                Find your field
              </h2>
            </div>

            <span className="text-xs text-slate-600">
              {deptKeys.length} specialized departments
            </span>
          </div>

          <div className="space-y-3">
            {deptKeys.map((key, i) => {
              const style = deptStyles[key];

              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.07,
                  }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={`/departments/${key.toLowerCase()}`}
                    className="group relative block overflow-hidden rounded-2xl border border-white/[0.06] bg-[#06111f]/75 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.12] hover:bg-[#071525]"
                  >
                    {/* Department accent */}
                    <div
                      className={`absolute inset-y-0 left-0 w-[2px] ${style.soft}`}
                    />

                    {/* Ambient department glow */}
                    <div
                      className={`pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full ${style.glow} opacity-0 blur-[70px] transition-opacity duration-500 group-hover:opacity-100`}
                    />

                    <div className="relative flex items-center gap-5 px-5 py-5 sm:px-7 sm:py-6">
                      {/* Number */}
                      <div className="hidden shrink-0 sm:block">
                        <span className="font-mono text-[11px] tracking-[0.18em] text-slate-700">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Department code */}
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] ${style.soft}`}
                      >
                        <span
                          className={`font-mono text-xs font-bold ${style.accent}`}
                        >
                          {key}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <h2 className="font-display text-base font-bold text-slate-100 transition-colors duration-300 group-hover:text-white sm:text-lg">
                            {DEPARTMENTS[key]}
                          </h2>

                          <span
                            className={`hidden text-[10px] uppercase tracking-[0.15em] opacity-0 transition-all duration-300 group-hover:opacity-100 sm:inline ${style.accent}`}
                          >
                            {style.label}
                          </span>
                        </div>

                        <p className="mt-1 text-xs text-slate-600">
                          Department of Fisheries • PSTU
                        </p>
                      </div>

                      {/* Arrow */}
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.02] text-slate-600 transition-all duration-300 group-hover:border-white/[0.12] group-hover:bg-white/[0.05] group-hover:${style.accent}`}
                      >
                        <FaArrowRight
                          size={11}
                          className="transition-transform duration-300 group-hover:translate-x-0.5"
                        />
                      </div>
                    </div>

                    {/* Bottom hover line */}
                    <div
                      className={`absolute bottom-0 left-0 h-px w-0 ${style.soft} transition-all duration-500 group-hover:w-full`}
                    />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-10 flex items-center gap-3"
          >
            <span className="h-px flex-1 bg-white/[0.05]" />

            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-700">
              Explore a department to learn more
            </span>

            <span className="h-px flex-1 bg-white/[0.05]" />
          </motion.div>
        </div>
      </section>
    </main>
  );
}