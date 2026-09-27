
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
    <main className="relative min-h-screen overflow-hidden bg-[#020b18] pt-20 text-white">
      {/* Atmospheric background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className={`absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full ${style.glow} blur-[130px]`}
        />

        <div className="absolute -right-40 top-[35%] h-[520px] w-[520px] rounded-full bg-cyan-400/[0.025] blur-[140px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* Header */}
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
              className="group mb-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-500 transition-colors hover:text-slate-200"
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
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-4xl">

                {/* Department code */}
                <div className="mb-5 flex items-center gap-3">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] ${style.soft}`}
                  >
                    <span
                      className={`font-mono text-xs font-bold ${style.accent}`}
                    >
                      {deptKey}
                    </span>
                  </span>

                  <span className="text-[10px] uppercase tracking-[0.22em] text-slate-600">
                    Academic Department
                  </span>
                </div>

                <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                  {deptName}
                </h1>

                <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
                  {style.description}
                </p>
              </div>

              {/* Department marker */}
              <div className="hidden shrink-0 md:block">
                <div
                  className={`flex h-24 w-24 items-center justify-center rounded-2xl border border-white/[0.06] ${style.soft}`}
                >
                  <span
                    className={`font-mono text-2xl font-bold tracking-wider ${style.accent}`}
                  >
                    {deptKey}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-10 h-px bg-gradient-to-r from-white/[0.10] via-white/[0.05] to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Faculty */}
      <section className="relative px-4 pb-24 sm:px-6">
        <div className="mx-auto max-w-6xl">

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <p
                className={`mb-2 text-[10px] uppercase tracking-[0.24em] ${style.accent} opacity-70`}
              >
                Academic community
              </p>

              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                Faculty & teachers
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-600">
              <span
                className={`h-1.5 w-1.5 rounded-full ${style.soft.replace(
                  "/[0.08]",
                  "/50"
                )}`}
              />

              Department faculty
            </div>
          </motion.div>

          <DeptTeachers deptKey={deptKey} />
        </div>
      </section>

      {/* Bottom navigation */}
      <section className="relative border-t border-white/[0.05] px-4 py-10 sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">

          <Link
            href="/departments"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-600 transition-colors hover:text-slate-300"
          >
            <FaArrowLeft
              size={9}
              className="transition-transform group-hover:-translate-x-1"
            />

            Departments
          </Link>

          <div
            className={`flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] ${style.accent} opacity-50`}
          >
            {deptKey}
            <FaArrowRight size={8} />
          </div>

        </div>
      </section>
    </main>
  );
}

