
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaLinkedin,
  FaMapMarkerAlt,
  FaBriefcase,
  FaTrophy,
  FaArrowLeft,
  FaGraduationCap,
  FaQuoteLeft,
} from "react-icons/fa";
import { DEPARTMENTS, Department } from "@/types";

interface AlumniProfile {
  name: string;
  currentPosition?: string;
  organization?: string;
  location?: string;
  department?: Department;
  batch?: string | number;
  linkedin?: string;
  bio?: string;
  achievements?: string[];
  testimonial?: string;
}

export default function AlumniProfilePage() {
  const [profile, setProfile] = useState<AlumniProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("/api/profile");

        if (data.success) {
          setProfile(data.data);
        }
      } catch (error) {
        console.error("Failed to load alumni profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020b18] text-white">

      {/* =====================================================
          ATMOSPHERIC BACKGROUND
      ====================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Top-left glow */}
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-cyan-400/[0.045] blur-[130px]" />

        {/* Right glow */}
        <div className="absolute -right-40 top-[35%] h-[520px] w-[520px] rounded-full bg-cyan-400/[0.025] blur-[140px]" />

        {/* Bottom glow */}
        <div className="absolute bottom-[-250px] left-[30%] h-[500px] w-[500px] rounded-full bg-sky-500/[0.02] blur-[140px]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* =====================================================
          PAGE CONTENT
      ====================================================== */}
      <div className="relative mx-auto max-w-5xl px-4 pb-20 pt-28 sm:px-6">

        {/* =================================================
            BACK / LABEL
        ================================================== */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="mb-10 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-600">
            <FaGraduationCap className="text-cyan-400/50" />
            Alumni community
          </p>
        </motion.div>

        {/* =================================================
            TITLE
        ================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mb-10"
        >
          <p className="mb-3 text-[10px] uppercase tracking-[0.24em] text-cyan-300 opacity-70">
            Personal profile
          </p>

          <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            My Alumni Profile
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-500">
            Your public profile within the Faculty of Fisheries alumni
            community.
          </p>

          <div className="mt-8 h-px bg-gradient-to-r from-white/[0.10] via-white/[0.05] to-transparent" />
        </motion.div>

        {/* =================================================
            LOADING
        ================================================== */}
        {loading && (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="h-7 w-7 animate-spin rounded-full border-2 border-white/[0.08] border-t-cyan-300" />

              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-600">
                Loading profile
              </p>
            </div>
          </div>
        )}

        {/* =================================================
            NO PROFILE
        ================================================== */}
        {!loading && !profile && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-20 text-center"
          >
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-white/[0.06] bg-cyan-400/[0.04]">
              <FaGraduationCap className="text-xl text-cyan-300/50" />
            </div>

            <h2 className="font-display text-lg font-semibold text-slate-300">
              Profile unavailable
            </h2>

            <p className="mt-2 text-xs text-slate-600">
              We could not load your alumni profile at this time.
            </p>
          </motion.div>
        )}

        {/* =================================================
            PROFILE
        ================================================== */}
        {!loading && profile && (
          <div className="space-y-5">

            {/* =================================================
                MAIN PROFILE CARD
            ================================================== */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-sm"
            >

              {/* Accent line */}
              <div className="h-px w-full bg-gradient-to-r from-cyan-400/60 via-sky-400/20 to-transparent" />

              {/* Background glow */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-400/[0.035] blur-[80px]" />

              <div className="relative p-6 sm:p-8">

                {/* Label */}
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] bg-cyan-400/[0.07]">
                    <FaGraduationCap className="text-sm text-cyan-300" />
                  </div>

                  <div>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-cyan-300/60">
                      Alumni
                    </p>

                    <p className="text-[10px] uppercase tracking-[0.16em] text-slate-600">
                      Faculty of Fisheries · PSTU
                    </p>
                  </div>
                </div>

                {/* Name */}
                <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {profile.name}
                </h2>

                {/* Position */}
                {profile.currentPosition && (
                  <div className="mt-4 flex items-start gap-3 text-sm text-slate-400">
                    <FaBriefcase className="mt-0.5 shrink-0 text-cyan-400/50" />

                    <span>
                      {profile.currentPosition}

                      {profile.organization && (
                        <>
                          <span className="mx-1.5 text-slate-700">at</span>
                          <span className="text-slate-300">
                            {profile.organization}
                          </span>
                        </>
                      )}
                    </span>
                  </div>
                )}

                {/* Location */}
                {profile.location && (
                  <div className="mt-2 flex items-center gap-3 text-sm text-slate-500">
                    <FaMapMarkerAlt className="shrink-0 text-cyan-400/40" />
                    {profile.location}
                  </div>
                )}

                {/* Meta */}
                <div className="mt-6 flex flex-wrap items-center gap-2">

                  {profile.department && (
                    <span className="rounded-md border border-cyan-400/[0.12] bg-cyan-400/[0.06] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-300">
                      {DEPARTMENTS[profile.department as Department]}
                    </span>
                  )}

                  {profile.batch && (
                    <span className="rounded-md border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                      Batch {profile.batch}
                    </span>
                  )}

                  {profile.linkedin && (
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn profile"
                      className="flex h-8 w-8 items-center justify-center rounded-md border border-white/[0.06] bg-white/[0.025] text-slate-500 transition-all duration-200 hover:border-cyan-400/[0.15] hover:bg-cyan-400/[0.06] hover:text-cyan-300"
                    >
                      <FaLinkedin size={14} />
                    </a>
                  )}

                </div>

              </div>
            </motion.section>

            {/* =================================================
                ABOUT
            ================================================== */}
            {profile.bio && (
              <motion.section
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-7"
              >
                <div className="mb-5">
                  <p className="mb-2 text-[9px] uppercase tracking-[0.22em] text-cyan-300/60">
                    Profile
                  </p>

                  <h3 className="font-display text-xl font-bold text-white">
                    About
                  </h3>
                </div>

                <p className="text-sm leading-7 text-slate-500">
                  {profile.bio}
                </p>
              </motion.section>
            )}

            {/* =================================================
                ACHIEVEMENTS
            ================================================== */}
            {profile.achievements &&
              profile.achievements.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.15 }}
                  className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-7"
                >

                  <div className="mb-6">
                    <p className="mb-2 text-[9px] uppercase tracking-[0.22em] text-amber-300/60">
                      Milestones
                    </p>

                    <h3 className="flex items-center gap-3 font-display text-xl font-bold text-white">
                      <FaTrophy className="text-sm text-amber-300/70" />
                      Achievements
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {profile.achievements.map(
                      (achievement, index) => (
                        <motion.div
                          key={`${achievement}-${index}`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.35,
                            delay: 0.2 + index * 0.05,
                          }}
                          className="flex items-start gap-4 rounded-xl border border-white/[0.04] bg-white/[0.015] p-4"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300/50" />

                          <p className="text-sm leading-relaxed text-slate-500">
                            {achievement}
                          </p>
                        </motion.div>
                      )
                    )}
                  </div>

                </motion.section>
              )}

            {/* =================================================
                TESTIMONIAL
            ================================================== */}
            {profile.testimonial && (
              <motion.section
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2 }}
                className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-7"
              >

                <FaQuoteLeft className="absolute right-7 top-7 text-3xl text-cyan-400/[0.06]" />

                <p className="mb-5 text-[9px] uppercase tracking-[0.22em] text-cyan-300/60">
                  Alumni voice
                </p>

                <blockquote className="relative max-w-3xl text-sm italic leading-7 text-slate-500 sm:text-base">
                  &ldquo;{profile.testimonial}&rdquo;
                </blockquote>

              </motion.section>
            )}

          </div>
        )}

      </div>

      {/* =====================================================
          BOTTOM
      ====================================================== */}
      <section className="relative border-t border-white/[0.05] px-4 py-8 sm:px-6">
        <div className="mx-auto flex max-w-5xl items-center justify-between">

          <span className="text-[9px] uppercase tracking-[0.18em] text-slate-700">
            Alumni network
          </span>

          <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.18em] text-cyan-300/40">
            PSTU
            {/* <FaArrowRight size={7} /> */}
          </div>

        </div>
      </section>

    </main>
  );
}

