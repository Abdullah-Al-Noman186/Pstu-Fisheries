"use client";

import { motion } from "framer-motion";
import ProfileForm from "@/components/dashboard/ProfileForm";

export default function ProfilePage() {
  return (
    <main className="relative min-h-screen text-white">
      {/* =========================================================
          ATMOSPHERIC BACKGROUND
      ========================================================= */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-cyan-400/[0.025] blur-[130px]" />

        <div className="absolute -right-40 top-[30%] h-[500px] w-[500px] rounded-full bg-sky-400/[0.025] blur-[150px]" />

        <div className="absolute bottom-[-220px] left-[35%] h-[450px] w-[450px] rounded-full bg-cyan-500/[0.018] blur-[140px]" />

        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* =========================================================
          HEADER
      ========================================================= */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative mb-8"
      >
        <div className="flex items-start gap-4">
          {/* Accent marker */}
          <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.05]">
            <div className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
          </div>

          <div>
            <p className="mb-1 text-[10px] uppercase tracking-[0.24em] text-cyan-300/50">
              Account settings
            </p>

            <h1 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              My Profile
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500">
              Update your personal and professional information.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-7 h-px bg-gradient-to-r from-white/[0.08] via-white/[0.04] to-transparent" />
      </motion.section>

      {/* =========================================================
          PROFILE FORM
      ========================================================= */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.45,
          delay: 0.1,
        }}
        className="relative"
      >
        {/* Subtle section label */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-slate-600">
              Personal information
            </p>
          </div>

          <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.16em] text-slate-700">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/40" />
            PSTU
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.025] p-1 backdrop-blur-sm">
          {/* Top cyan accent */}
          <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent" />

          {/* Soft glow */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full bg-cyan-400/[0.025] blur-[90px]" />

          <div className="relative">
            <ProfileForm />
          </div>
        </div>
      </motion.section>

      {/* =========================================================
          FOOTER MARKER
      ========================================================= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex items-center gap-3 pt-8"
      >
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.22em] text-slate-700">
          <span className="h-1 w-1 rounded-full bg-cyan-400/40" />
          Faculty of Fisheries · PSTU
        </div>

        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </motion.div>
    </main>
  );
}