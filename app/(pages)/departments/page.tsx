"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { DEPARTMENTS, Department } from "@/types";
import {
  FaArrowRight,
  FaFish,
  FaWater,
  FaDna,
  FaLeaf,
  FaFlask,
  FaGlobeAsia,
} from "react-icons/fa";

const deptKeys = Object.keys(DEPARTMENTS) as Department[];

const deptStyles: Record<
  Department,
  {
    accent: string;
    accentText: string;
    soft: string;
    border: string;
    icon: React.ReactNode;
    label: string;
    number: string;
  }
> = {
  AQC: {
    accent: "bg-[#087EA4]",
    accentText: "text-[#087EA4]",
    soft: "bg-[#087EA4]/[0.08]",
    border: "border-[#087EA4]/20",
    icon: <FaFish />,
    label: "Aquatic production",
    number: "01",
  },

  FBG: {
    accent: "bg-emerald-500",
    accentText: "text-emerald-600",
    soft: "bg-emerald-500/[0.08]",
    border: "border-emerald-500/20",
    icon: <FaDna />,
    label: "Aquatic life & genetics",
    number: "02",
  },

  FMN: {
    accent: "bg-violet-500",
    accentText: "text-violet-600",
    soft: "bg-violet-500/[0.08]",
    border: "border-violet-500/20",
    icon: <FaGlobeAsia />,
    label: "Fisheries management",
    number: "03",
  },

  FST: {
    accent: "bg-amber-500",
    accentText: "text-amber-600",
    soft: "bg-amber-500/[0.08]",
    border: "border-amber-500/20",
    icon: <FaFlask />,
    label: "Fisheries technology",
    number: "04",
  },

  MFO: {
    accent: "bg-[#0891B2]",
    accentText: "text-[#0891B2]",
    soft: "bg-[#0891B2]/[0.08]",
    border: "border-[#0891B2]/20",
    icon: <FaWater />,
    label: "Marine systems & oceanography",
    number: "05",
  },
};

export default function DepartmentsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F0FAFC] pt-20 text-[#123B4A]">
      {/* =========================================================
          BACKGROUND
      ========================================================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Ocean glow */}
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#087EA4]/[0.07] blur-[130px]" />

        <div className="absolute right-[-180px] top-[30%] h-[520px] w-[520px] rounded-full bg-[#2DD4BF]/[0.07] blur-[140px]" />

        <div className="absolute bottom-[-200px] left-[25%] h-[500px] w-[500px] rounded-full bg-[#0891B2]/[0.045] blur-[140px]" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(7,89,133,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(7,89,133,0.8) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative px-4 pb-16 pt-14 sm:px-6 md:pb-20 md:pt-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-end gap-10 lg:grid-cols-[1fr_320px]">
            {/* Hero text */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
            >
              {/* Eyebrow */}
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-10 bg-[#087EA4]" />

                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#087EA4]">
                  Faculty of Fisheries • PSTU
                </span>
              </div>

              {/* Heading */}
              <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-[#123B4A] sm:text-5xl md:text-6xl lg:text-[68px]">
                Five fields.
                <span className="block bg-gradient-to-r from-[#087EA4] via-[#0891B2] to-[#2DD4BF] bg-clip-text text-transparent">
                  One aquatic future.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-[#55727D] sm:text-base md:text-lg">
                Explore the specialized departments shaping education,
                research, innovation, and sustainable fisheries at
                Patuakhali Science and Technology University.
              </p>
            </motion.div>

            {/* Department count card */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15 }}
              className="relative overflow-hidden rounded-3xl border border-[#087EA4]/10 bg-white/80 p-6 shadow-[0_20px_60px_rgba(8,126,164,0.08)] backdrop-blur-xl"
            >
              {/* Glow */}
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#2DD4BF]/20 blur-3xl" />

              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#087EA4]/10 text-[#087EA4]">
                  <FaFish size={20} />
                </div>

                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#55727D]">
                  Academic divisions
                </p>

                <div className="mt-1 flex items-end gap-2">
                  <span className="font-display text-5xl font-bold text-[#123B4A]">
                    {deptKeys.length}
                  </span>

                  <span className="mb-2 text-sm font-medium text-[#55727D]">
                    departments
                  </span>
                </div>

                <div className="mt-5 h-px bg-[#087EA4]/10" />

                <p className="mt-4 text-xs leading-5 text-[#55727D]">
                  Diverse academic disciplines connected by one shared
                  aquatic mission.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-12 h-px bg-gradient-to-r from-[#087EA4]/40 via-[#087EA4]/10 to-transparent"
          />
        </div>
      </section>

      {/* =========================================================
          DEPARTMENTS
      ========================================================= */}
      <section className="relative px-4 pb-24 sm:px-6">
        <div className="mx-auto max-w-6xl">
          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#087EA4]">
                Explore the faculty
              </p>

              <h2 className="font-display text-2xl font-bold text-[#123B4A] sm:text-3xl">
                Find your field
              </h2>
            </div>

            <p className="text-xs text-[#55727D]">
              Click a department to explore its academic profile
            </p>
          </motion.div>

          {/* Department grid */}
          <div className="grid gap-5 md:grid-cols-2">
            {deptKeys.map((key, index) => {
              const style = deptStyles[key];

              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  viewport={{ once: true, amount: 0.15 }}
                  className={key === "MFO" ? "md:col-span-2" : ""}
                >
                  <Link
                    href={`/departments/${key.toLowerCase()}`}
                    className="group relative block h-full overflow-hidden rounded-3xl border border-[#087EA4]/10 bg-white/80 shadow-[0_10px_40px_rgba(8,126,164,0.05)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-[#087EA4]/20 hover:shadow-[0_20px_60px_rgba(8,126,164,0.12)]"
                  >
                    {/* Top gradient line */}
                    <div
                      className={`absolute left-0 right-0 top-0 h-[3px] ${style.accent} opacity-70 transition-opacity duration-300 group-hover:opacity-100`}
                    />

                    {/* Decorative glow */}
                    <div
                      className={`pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full ${style.soft} opacity-0 blur-[60px] transition-all duration-500 group-hover:opacity-100`}
                    />

                    <div className="relative flex h-full flex-col p-6 sm:p-7">
                      {/* Top row */}
                      <div className="flex items-start justify-between">
                        {/* Department icon */}
                        <div
                          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${style.soft} ${style.accentText} transition-transform duration-500 group-hover:scale-110`}
                        >
                          <span className="text-xl">
                            {style.icon}
                          </span>
                        </div>

                        {/* Number */}
                        <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#9AB2BA]">
                          {style.number}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="mt-7 flex-1">
                        <div className="mb-3 flex flex-wrap items-center gap-3">
                          <span
                            className={`rounded-lg border ${style.border} ${style.soft} px-2.5 py-1 font-mono text-[10px] font-bold tracking-widest ${style.accentText}`}
                          >
                            {key}
                          </span>

                          <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#8BA3AB]">
                            Department
                          </span>
                        </div>

                        <h3 className="max-w-xl font-display text-xl font-bold leading-tight text-[#123B4A] transition-colors duration-300 group-hover:text-[#087EA4] sm:text-2xl">
                          {DEPARTMENTS[key]}
                        </h3>

                        <p className="mt-3 max-w-xl text-sm leading-6 text-[#55727D]">
                          {style.label}
                        </p>
                      </div>

                      {/* Bottom */}
                      <div className="mt-8 flex items-center justify-between border-t border-[#087EA4]/10 pt-5">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8BA3AB] transition-colors duration-300 group-hover:text-[#087EA4]">
                          Explore department
                        </span>

                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-xl border border-[#087EA4]/10 bg-[#F0FAFC] text-[#55727D] transition-all duration-300 group-hover:border-[#087EA4]/20 group-hover:bg-[#087EA4] group-hover:text-white`}
                        >
                          <FaArrowRight
                            size={11}
                            className="transition-transform duration-300 group-hover:translate-x-0.5"
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* =====================================================
              BOTTOM STATEMENT
          ===================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            viewport={{ once: true }}
            className="mt-14 overflow-hidden rounded-3xl border border-[#087EA4]/10 bg-white/70 shadow-[0_15px_50px_rgba(8,126,164,0.05)] backdrop-blur-xl"
          >
            <div className="relative px-6 py-8 text-center sm:px-10 sm:py-10">
              {/* Decorative circles */}
              <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2DD4BF]/10 blur-3xl" />

              <div className="relative">
                <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#087EA4]/10 text-[#087EA4]">
                  <FaWater size={16} />
                </div>

                <p className="font-display text-lg font-bold text-[#123B4A] sm:text-xl">
                  Different disciplines. One shared ecosystem.
                </p>

                <p className="mx-auto mt-2 max-w-2xl text-xs leading-6 text-[#55727D] sm:text-sm">
                  From aquatic production and genetics to fisheries management,
                  technology, marine science, and oceanography — each
                  department contributes to a stronger aquatic future.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Final divider */}
          <div className="mt-12 flex items-center gap-4">
            <span className="h-px flex-1 bg-[#087EA4]/10" />

            <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#8BA3AB]">
              Faculty of Fisheries • PSTU
            </span>

            <span className="h-px flex-1 bg-[#087EA4]/10" />
          </div>
        </div>
      </section>
    </main>
  );
}