
"use client";

import { motion } from "framer-motion";
import ProfileForm from "@/components/dashboard/ProfileForm";

export default function ProfilePage() {
  return (
    <main className="relative min-h-screen text-[#123B4A]">
      {/* =========================================================
          ATMOSPHERIC BACKGROUND
      ========================================================= */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* Top-left ocean glow */}
        <div className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-[#0891B2]/[0.07] blur-[130px]" />

        {/* Right ocean glow */}
        <div className="absolute -right-40 top-[30%] h-[500px] w-[500px] rounded-full bg-[#087EA4]/[0.045] blur-[150px]" />

        {/* Bottom seafoam glow */}
        <div className="absolute bottom-[-220px] left-[35%] h-[450px] w-[450px] rounded-full bg-[#2DD4BF]/[0.055] blur-[140px]" />

        {/* Soft center glow */}
        <div className="absolute left-[45%] top-[10%] h-[260px] w-[260px] rounded-full bg-[#075985]/[0.025] blur-[120px]" />

        {/* Ocean grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(8,126,164,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(8,126,164,0.8) 1px, transparent 1px)",
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
          <div className="relative mt-1 flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[14px] border border-[#087EA4]/12 bg-white/75 shadow-[0_8px_25px_rgba(8,126,164,0.055)] backdrop-blur-xl">
            {/* Small gradient accent */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0891B2]/50 to-transparent" />

            <div className="h-2 w-2 rounded-full bg-[#0891B2] shadow-[0_0_14px_rgba(8,145,178,0.45)]" />
          </div>

          <div>
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#087EA4]/65">
              Account settings
            </p>

            <h1 className="font-display bg-gradient-to-r from-[#075985] via-[#087EA4] to-[#0891B2] bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-3xl">
              My Profile
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#55727D]">
              Update your personal and professional information.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-7 h-px bg-gradient-to-r from-[#087EA4]/15 via-[#087EA4]/[0.06] to-transparent" />
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
        {/* Section label */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#55727D]/75">
              Personal information
            </p>
          </div>

          <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#55727D]/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0891B2] shadow-[0_0_8px_rgba(8,145,178,0.35)]" />
            PSTU
          </div>
        </div>

        {/* Form shell */}
        <div className="relative overflow-hidden rounded-[26px] border border-[#087EA4]/10 bg-white/75 p-1 shadow-[0_18px_55px_rgba(8,126,164,0.055)] backdrop-blur-xl">
          {/* Top ocean accent */}
          <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#087EA4]/35 to-transparent" />

          {/* Bottom accent */}
          <div className="pointer-events-none absolute bottom-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-[#2DD4BF]/25 to-transparent" />

          {/* Soft glow */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full bg-[#0891B2]/[0.045] blur-[90px]" />

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
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#087EA4]/10 to-transparent" />

        <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#55727D]/60">
          <span className="h-1 w-1 rounded-full bg-[#0891B2]/65" />
          Faculty of Fisheries · PSTU
        </div>

        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#087EA4]/10 to-transparent" />
      </motion.div>
    </main>
  );
}

