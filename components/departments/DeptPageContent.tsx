
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Department } from "@/types";
import DeptTeachers from "@/components/departments/DeptTeachers";

interface Props {
  deptKey: Department;
  deptName: string;
  style: {
    accent: string;
    soft: string;
    glow: string;
    description: string;
  };
}

export default function DeptPageContent({
  deptKey,
  deptName,
  style,
}: Props) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F0FAFC] pt-20 text-[#123B4A]">
      {/* =========================================================
          ATMOSPHERIC OCEAN BACKGROUND
      ========================================================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Left ocean glow */}
        <div
          className={`absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full ${style.glow} blur-[130px]`}
        />

        {/* Right aqua glow */}
        <div className="absolute -right-40 top-[35%] h-[520px] w-[520px] rounded-full bg-[#2DD4BF]/[0.07] blur-[140px]" />

        {/* Bottom ocean glow */}
        <div className="absolute -bottom-60 left-1/3 h-[500px] w-[500px] rounded-full bg-[#087EA4]/[0.04] blur-[150px]" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(8,126,164,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(8,126,164,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* =========================================================
          HEADER
      ========================================================= */}
      <section className="relative px-4 pb-16 pt-12 sm:px-6 md:pb-20 md:pt-16">
        <div className="mx-auto max-w-6xl">
          {/* Back navigation */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/departments"
              className="group mb-10 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-[#55727D] transition-colors hover:text-[#087EA4]"
            >
              <FaArrowLeft
                size={10}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />

              All Departments
            </Link>
          </motion.div>

          {/* Department heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="relative"
          >
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div className="max-w-4xl">
                {/* Department code */}
                <div className="mb-5 flex items-center gap-3">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border border-[#087EA4]/10 ${style.soft} shadow-sm`}
                  >
                    <span
                      className={`font-mono text-xs font-bold ${style.accent}`}
                    >
                      {deptKey}
                    </span>
                  </span>

                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#55727D]">
                    Academic Department
                  </span>
                </div>

                {/* Department title */}
                <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-[#123B4A] sm:text-5xl md:text-6xl">
                  {deptName}
                </h1>

                {/* Description */}
                <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#55727D] sm:text-base">
                  {style.description}
                </p>
              </div>

              {/* Department marker */}
              <div className="hidden shrink-0 md:block">
                <div
                  className={`relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-3xl border border-[#087EA4]/10 ${style.soft} shadow-[0_15px_40px_rgba(8,126,164,0.08)]`}
                >
                  {/* Decorative circle */}
                  <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-[#2DD4BF]/20 blur-xl" />

                  <span
                    className={`relative font-mono text-2xl font-bold tracking-wider ${style.accent}`}
                  >
                    {deptKey}
                  </span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="mt-10 h-px bg-gradient-to-r from-[#087EA4]/20 via-[#0891B2]/10 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          FACULTY
      ========================================================= */}
      <section className="relative px-4 pb-24 sm:px-6">
        <div className="mx-auto max-w-6xl">
          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <p
                className={`mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] ${style.accent} opacity-80`}
              >
                Academic community
              </p>

              <h2 className="font-display text-2xl font-bold text-[#123B4A] sm:text-3xl">
                Faculty & Teachers
              </h2>
            </div>

            {/* Faculty indicator */}
            <div className="flex items-center gap-2 text-xs font-medium text-[#55727D]">
              <span
                className={`h-2 w-2 rounded-full ${style.accent.replace(
                  "text-",
                  "bg-"
                )} opacity-70`}
              />

              Department faculty
            </div>
          </motion.div>

          {/* Faculty cards */}
          <div className="rounded-3xl border border-[#087EA4]/10 bg-white/70 p-3 shadow-[0_20px_60px_rgba(8,126,164,0.06)] backdrop-blur-sm sm:p-5">
            <DeptTeachers deptKey={deptKey} />
          </div>
        </div>
      </section>

      {/* =========================================================
          BOTTOM NAVIGATION
      ========================================================= */}
      <section className="relative border-t border-[#087EA4]/10 bg-white/40 px-4 py-10 sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          {/* Departments */}
          <Link
            href="/departments"
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#55727D] transition-colors hover:text-[#087EA4]"
          >
            <FaArrowLeft
              size={9}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            Departments
          </Link>

          {/* Current department */}
          <div
            className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] ${style.accent} opacity-70`}
          >
            {deptKey}

            <FaArrowRight
              size={8}
              className="transition-transform duration-300"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

