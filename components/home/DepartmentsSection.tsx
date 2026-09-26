
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import {
  GiShrimp,
  GiFishingHook,
  GiSharkFin,
  GiWheat,
  GiWaves,
} from "react-icons/gi";
import { Department, DEPARTMENTS } from "@/types";

const deptInfo: Record<
  Department,
  {
    icon: React.ReactNode;
    desc: string;
    color: string;
    iconBg: string;
    glow: string;
    border: string;
  }
> = {
  AQC: {
    icon: <GiShrimp size={30} />,
    desc: "Culture techniques for fish, shrimp, prawn & other aquatic organisms.",
    color: "text-blue-600",
    iconBg: "bg-blue-50/80 group-hover:bg-blue-100/80",
    glow: "bg-blue-400/10",
    border: "group-hover:border-blue-200",
  },

  FBG: {
    icon: <GiFishingHook size={30} />,
    desc: "Study of fish biology, genetics, breeding, and biodiversity conservation.",
    color: "text-emerald-600",
    iconBg: "bg-emerald-50/80 group-hover:bg-emerald-100/80",
    glow: "bg-emerald-400/10",
    border: "group-hover:border-emerald-200",
  },

  FMN: {
    icon: <GiWheat size={30} />,
    desc: "Sustainable management of fisheries resources, policy, and environmental impact.",
    color: "text-violet-600",
    iconBg: "bg-violet-50/80 group-hover:bg-violet-100/80",
    glow: "bg-violet-400/10",
    border: "group-hover:border-violet-200",
  },

  FST: {
    icon: <GiSharkFin size={30} />,
    desc: "Post-harvest technology, fish processing, quality control, and value-added products.",
    color: "text-amber-600",
    iconBg: "bg-amber-50/80 group-hover:bg-amber-100/80",
    glow: "bg-amber-400/10",
    border: "group-hover:border-amber-200",
  },

  MFO: {
    icon: <GiWaves size={30} />,
    desc: "Marine ecosystem, oceanography, deep-sea fisheries, and coastal resource management.",
    color: "text-cyan-600",
    iconBg: "bg-cyan-50/80 group-hover:bg-cyan-100/80",
    glow: "bg-cyan-400/10",
    border: "group-hover:border-cyan-200",
  },
};

const deptKeys = Object.keys(DEPARTMENTS) as Department[];

export default function DepartmentsSection() {
  return (
    <section className="relative overflow-hidden bg-wave-gradient py-24">

      {/* =========================================================
          BACKGROUND DECORATION
      ========================================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Top glow */}
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-ocean-500/5 blur-3xl" />

        {/* Bottom glow */}
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-teal-500/5 blur-3xl" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,70,110,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(0,70,110,0.7) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* =======================================================
            SECTION HEADER
        ======================================================= */}

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
            duration: 0.6,
          }}
          viewport={{
            once: true,
          }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          {/* Small label */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-ocean-200/70 bg-white/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-ocean-600 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
            Academic Excellence
          </div>

          <h2 className="section-title">
            Our Departments
          </h2>

          <div className="wave-divider mx-auto mt-4" />

          <p className="section-sub mx-auto mt-4">
            Five specialized departments driving excellence in fisheries
            education, research, innovation, and sustainable aquatic resource
            management.
          </p>
        </motion.div>

        {/* =======================================================
            DEPARTMENT GRID
        ======================================================= */}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {deptKeys.map((key, i) => {
            const info = deptInfo[key];

            return (
              <motion.div
                key={key}
                initial={{
                  opacity: 0,
                  y: 35,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.08,
                }}
                viewport={{
                  once: true,
                  margin: "-50px",
                }}
              >

                <Link
                  href={`/departments/${key.toLowerCase()}`}
                  className={`group relative block h-full overflow-hidden rounded-3xl border border-white/70 bg-white/45 p-7 shadow-[0_8px_40px_rgba(0,50,80,0.06)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/65 hover:shadow-[0_20px_50px_rgba(0,50,80,0.12)] ${info.border}`}
                >

                  {/* =================================================
                      CARD GLOW
                  ================================================= */}

                  <div
                    className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full ${info.glow} opacity-0 blur-3xl transition-all duration-500 group-hover:opacity-100`}
                  />

                  {/* Top glass reflection */}
                  <div className="pointer-events-none absolute left-8 right-8 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

                  {/* =================================================
                      ICON
                  ================================================= */}

                  <div
                    className={`relative mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/80 ${info.iconBg} ${info.color} shadow-sm backdrop-blur-md transition-all duration-500 group-hover:scale-105 group-hover:shadow-md`}
                  >
                    {info.icon}

                    {/* Small indicator */}
                    <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-teal-400 opacity-0 shadow-[0_0_10px_rgba(45,212,191,0.5)] transition-opacity duration-300 group-hover:opacity-100" />
                  </div>

                  {/* =================================================
                      DEPARTMENT NAME
                  ================================================= */}

                  <div className="relative mb-3 flex items-start gap-2">

                    <span
                      className={`mt-0.5 rounded-md bg-white/70 px-2 py-1 font-mono text-xs font-bold ${info.color} backdrop-blur-sm`}
                    >
                      {key}
                    </span>

                    <span className="mt-1 text-gray-300">
                      ·
                    </span>

                    <h3 className="font-display text-base font-bold leading-tight text-gray-900">
                      {DEPARTMENTS[key]}
                    </h3>
                  </div>

                  {/* =================================================
                      DESCRIPTION
                  ================================================= */}

                  <p className="relative mb-7 min-h-[68px] text-sm leading-6 text-gray-500">
                    {info.desc}
                  </p>

                  {/* =================================================
                      LEARN MORE
                  ================================================= */}

                  <div className="relative flex items-center justify-between border-t border-gray-200/60 pt-5">

                    <span
                      className={`inline-flex items-center gap-2 text-sm font-semibold ${info.color} transition-all duration-300`}
                    >
                      Explore Department

                      <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1.5" />
                    </span>

                    <span className="text-[10px] font-medium uppercase tracking-widest text-gray-400">
                      PSTU
                    </span>

                  </div>

                  {/* Bottom hover line */}
                  <div
                    className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-ocean-500 to-teal-400 transition-all duration-500 group-hover:w-full`}
                  />

                </Link>
              </motion.div>
            );
          })}

          {/* =======================================================
              CTA CARD
          ======================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 35,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.55,
              delay: 0.4,
            }}
            viewport={{
              once: true,
            }}
          >

            <div className="group relative flex h-full min-h-[280px] flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/20 bg-ocean-gradient p-7 text-center shadow-xl shadow-ocean-900/10">

              {/* Decorative glow */}
              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-teal-400/20 blur-3xl transition-transform duration-700 group-hover:scale-150" />

              <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-ocean-400/20 blur-3xl" />

              {/* Glass layer */}
              <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-[1px]" />

              <div className="relative z-10">

                {/* Icon */}
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md">
                  <GiWaves
                    size={28}
                    className="text-teal-300"
                  />
                </div>

                <p className="font-display text-xl font-bold text-white">
                  Ready to dive in?
                </p>

                <p className="mx-auto mb-6 mt-2 max-w-xs text-sm leading-6 text-ocean-200">
                  Discover every department and find the academic path that
                  matches your passion.
                </p>

                <Link
                  href="/departments"
                  className="group/btn inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-ocean-700 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-ocean-50"
                >
                  All Departments

                  <FaArrowRight className="text-xs transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>

              </div>
            </div>

          </motion.div>
        </div>

        {/* =======================================================
            BOTTOM INFORMATION
        ======================================================= */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          transition={{
            duration: 0.7,
            delay: 0.4,
          }}
          viewport={{
            once: true,
          }}
          className="mt-14 flex items-center justify-center gap-4 text-xs uppercase tracking-[0.2em] text-ocean-400"
        >
          <span className="h-px w-12 bg-ocean-200" />

          Fisheries • Research • Innovation

          <span className="h-px w-12 bg-ocean-200" />
        </motion.div>

      </div>
    </section>
  );
}

