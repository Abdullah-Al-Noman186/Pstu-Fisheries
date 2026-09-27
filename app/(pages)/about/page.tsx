"use client";

import { motion } from "framer-motion";
import {
  FaFish,
  FaEye,
  FaBullseye,
  FaHistory,
  FaArrowRight,
  FaWater,
  FaLeaf,
  FaLightbulb,
  FaShieldAlt,
} from "react-icons/fa";

const values = [
  {
    title: "Excellence",
    description: "A commitment to high standards in education and research.",
    icon: FaFish,
    accent: "text-[#087EA4]",
    bg: "bg-[#087EA4]/[0.06]",
    border: "border-[#087EA4]/15",
  },
  {
    title: "Sustainability",
    description: "Protecting aquatic resources for generations to come.",
    icon: FaLeaf,
    accent: "text-[#0891B2]",
    bg: "bg-[#0891B2]/[0.06]",
    border: "border-[#0891B2]/15",
  },
  {
    title: "Innovation",
    description: "Turning scientific ideas into meaningful solutions.",
    icon: FaLightbulb,
    accent: "text-[#075985]",
    bg: "bg-[#075985]/[0.05]",
    border: "border-[#075985]/15",
  },
  {
    title: "Integrity",
    description: "Building knowledge through responsibility and trust.",
    icon: FaShieldAlt,
    accent: "text-[#2DD4BF]",
    bg: "bg-[#2DD4BF]/[0.07]",
    border: "border-[#2DD4BF]/20",
  },
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F0FAFC] text-[#123B4A]">
      {/* =========================================================
          BACKGROUND ATMOSPHERE
      ========================================================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Ocean Blue Glow */}
        <div className="absolute -left-72 top-0 h-[650px] w-[650px] rounded-full bg-[#0891B2]/[0.08] blur-[150px]" />

        {/* Deep Ocean Glow */}
        <div className="absolute -right-72 top-[25%] h-[650px] w-[650px] rounded-full bg-[#075985]/[0.06] blur-[150px]" />

        {/* Seafoam Glow */}
        <div className="absolute bottom-0 left-1/3 h-[500px] w-[500px] rounded-full bg-[#2DD4BF]/[0.07] blur-[150px]" />

        {/* Subtle Grid */}
        <div
          className="absolute inset-0 opacity-[0.45]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(7,89,133,0.065) 1px, transparent 1px), linear-gradient(90deg, rgba(7,89,133,0.065) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Top Atmosphere */}
        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-[#0891B2]/[0.06] to-transparent" />

        {/* Center Soft Glow */}
        <div className="absolute left-1/2 top-[45%] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#2DD4BF]/[0.025] blur-[120px]" />
      </div>

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative z-10 border-b border-[#087EA4]/10 pb-20 pt-32 sm:pt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            {/* Faculty Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#087EA4]/15 bg-white/70 px-4 py-2 shadow-[0_8px_30px_rgba(7,89,133,0.06)] backdrop-blur-xl"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#0891B2] shadow-[0_0_10px_rgba(8,145,178,0.45)]" />

              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#087EA4]">
                Faculty of Fisheries
              </span>
            </motion.div>

            {/* Fish Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="relative mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#087EA4]/15 bg-white shadow-[0_15px_40px_rgba(7,89,133,0.08)]"
            >
              <div className="absolute inset-0 rounded-2xl bg-[#2DD4BF]/15 blur-xl" />

              <FaFish className="relative text-2xl text-[#087EA4]" />
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl font-semibold tracking-tight text-[#075985] sm:text-5xl lg:text-6xl"
            >
              Understanding water.
              <span className="block bg-gradient-to-r from-[#087EA4] via-[#0891B2] to-[#2DD4BF] bg-clip-text text-transparent">
                Shaping the future.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-[#55727D] sm:text-base"
            >
              PSTU&apos;s Faculty of Fisheries is dedicated to advancing
              aquatic science through education, research, innovation,
              and responsible resource management.
            </motion.p>

            {/* Hero Keywords */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="mt-9 flex items-center justify-center gap-6 text-[10px] uppercase tracking-[0.18em] text-[#55727D]"
            >
              <span>Education</span>

              <span className="h-1 w-1 rounded-full bg-[#0891B2]/40" />

              <span>Research</span>

              <span className="h-1 w-1 rounded-full bg-[#0891B2]/40" />

              <span>Impact</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}
      <section className="relative z-10">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">

          {/* =====================================================
              INTRO
          ===================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-14 max-w-3xl text-center"
          >
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#087EA4]">
              Who we are
            </p>

            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-[#075985] sm:text-3xl">
              A faculty shaped by the aquatic world.
            </h2>

            <p className="mt-5 text-sm leading-7 text-[#55727D]">
              Located in Dumki, Patuakhali, the Faculty of Fisheries
              operates within one of Bangladesh&apos;s most important
              aquatic and coastal regions. Our academic community brings
              together multiple disciplines to understand, manage, and
              sustainably develop aquatic resources.
            </p>
          </motion.div>

          {/* =====================================================
              VISION + MISSION
          ===================================================== */}
          <div className="grid gap-5 md:grid-cols-2">
            <InfoPanel
              icon={<FaEye size={18} />}
              eyebrow="Our vision"
              title="A center of excellence for aquatic science."
              text="To be a globally recognized center of excellence in fisheries education, research, and innovation, contributing to sustainable aquatic resource management and food security in Bangladesh and beyond."
              accent="cyan"
              direction="left"
            />

            <InfoPanel
              icon={<FaBullseye size={18} />}
              eyebrow="Our mission"
              title="Education with purpose. Research with impact."
              text="To provide high-quality fisheries education through cutting-edge curriculum, foster research that addresses real-world challenges, and produce graduates who lead transformation in the fisheries sector."
              accent="teal"
              direction="right"
            />
          </div>

          {/* =====================================================
              HISTORY
          ===================================================== */}
          <motion.section
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55 }}
            className="mt-20"
          >
            <div className="mb-7 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#087EA4]/12 bg-white text-[#087EA4] shadow-[0_8px_25px_rgba(7,89,133,0.05)]">
                <FaHistory size={14} />
              </div>

              <div>
                <p className="text-[9px] uppercase tracking-[0.18em] text-[#55727D]">
                  Our story
                </p>

                <h2 className="mt-1 font-display text-xl font-semibold text-[#075985]">
                  A growing academic community
                </h2>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[22px] border border-[#087EA4]/12 bg-white p-6 shadow-[0_20px_60px_rgba(7,89,133,0.07)] backdrop-blur-xl sm:p-8">
              {/* Accent */}
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#087EA4] via-[#0891B2] to-[#2DD4BF]" />

              <div className="relative space-y-6 pl-2 sm:pl-3">
                <p className="text-sm leading-7 text-[#55727D]">
                  The Faculty of Fisheries at Patuakhali Science and
                  Technology University (PSTU) was established with the
                  vision of advancing fisheries science education in the
                  coastal region of Bangladesh. Located in Dumki,
                  Patuakhali — the heart of Bangladesh&apos;s fishing belt
                  — our faculty is uniquely positioned to address the
                  challenges and opportunities of this vital sector.
                </p>

                <div className="h-px w-full bg-[#087EA4]/10" />

                <p className="text-sm leading-7 text-[#55727D]">
                  Over the years, we have grown to house five specialized
                  departments: Aquaculture (AQC), Fisheries Biology &
                  Genetics (FBG), Fisheries Management (FMN), Fisheries
                  Technology (FST), and Marine Fisheries & Oceanography
                  (MFO). Our graduates now serve in government agencies,
                  research institutions, the private sector, and NGOs
                  across Bangladesh and internationally.
                </p>
              </div>
            </div>
          </motion.section>

          {/* =====================================================
              DEPARTMENTS
          ===================================================== */}
          <motion.section
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55 }}
            className="mt-20"
          >
            <div className="mb-8 flex items-end justify-between gap-5">
              <div>
                <p className="text-[9px] uppercase tracking-[0.18em] text-[#087EA4]">
                  Academic scope
                </p>

                <h2 className="mt-2 font-display text-2xl font-semibold text-[#075985]">
                  Five fields. One aquatic community.
                </h2>
              </div>

              <FaWater
                className="hidden text-[#0891B2]/30 sm:block"
                size={28}
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {[
                ["01", "Aquaculture", "AQC"],
                ["02", "Fisheries Biology & Genetics", "FBG"],
                ["03", "Fisheries Management", "FMN"],
                ["04", "Fisheries Technology", "FST"],
                ["05", "Marine Fisheries & Oceanography", "MFO"],
              ].map(([number, name, code], index) => (
                <motion.div
                  key={code}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.06,
                  }}
                  className="group relative overflow-hidden rounded-2xl border border-[#087EA4]/10 bg-white p-4 shadow-[0_10px_30px_rgba(7,89,133,0.045)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0891B2]/25 hover:shadow-[0_18px_40px_rgba(7,89,133,0.09)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] text-[#55727D]/60">
                      {number}
                    </span>

                    <span className="text-[9px] font-semibold tracking-[0.12em] text-[#087EA4]">
                      {code}
                    </span>
                  </div>

                  <h3 className="mt-7 min-h-[48px] text-xs font-medium leading-5 text-[#55727D] transition-colors group-hover:text-[#123B4A]">
                    {name}
                  </h3>

                  <div className="mt-4 h-px w-6 bg-[#0891B2]/40 transition-all duration-300 group-hover:w-full" />
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* =====================================================
              VALUES
          ===================================================== */}
          <motion.section
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55 }}
            className="mt-20"
          >
            <div className="mx-auto mb-9 max-w-2xl text-center">
              <p className="text-[9px] uppercase tracking-[0.18em] text-[#087EA4]">
                What guides us
              </p>

              <h2 className="mt-2 font-display text-2xl font-semibold text-[#075985]">
                Principles behind the work.
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => {
                const Icon = value.icon;

                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.07,
                    }}
                    className={`group rounded-2xl border ${value.border} ${value.bg} p-5 shadow-[0_10px_30px_rgba(7,89,133,0.035)] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_18px_40px_rgba(7,89,133,0.08)]`}
                  >
                    <Icon
                      className={`${value.accent} mb-5 opacity-80 transition-transform duration-300 group-hover:scale-110`}
                      size={18}
                    />

                    <h3 className="font-display text-sm font-semibold text-[#123B4A]">
                      {value.title}
                    </h3>

                    <p className="mt-2 text-[11px] leading-5 text-[#55727D]">
                      {value.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* =====================================================
              CLOSING STATEMENT
          ===================================================== */}
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-20"
          >
            <div className="relative overflow-hidden rounded-[24px] border border-[#087EA4]/12 bg-white px-6 py-10 text-center shadow-[0_25px_70px_rgba(7,89,133,0.08)] backdrop-blur-xl sm:px-10">
              {/* Decorative Glow */}
              <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 rounded-full bg-[#0891B2]/[0.06] blur-[80px]" />

              {/* Bottom Glow */}
              <div className="pointer-events-none absolute bottom-0 left-1/2 h-20 w-60 -translate-x-1/2 rounded-full bg-[#2DD4BF]/[0.05] blur-[60px]" />

              <div className="relative">
                <p className="text-[9px] uppercase tracking-[0.2em] text-[#087EA4]">
                  Looking ahead
                </p>

                <h2 className="mx-auto mt-3 max-w-2xl font-display text-2xl font-semibold tracking-tight text-[#075985] sm:text-3xl">
                  From the rivers of Bangladesh to the wider aquatic world.
                </h2>

                <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#55727D]">
                  We continue to build knowledge, develop people, and
                  contribute to a more sustainable future for aquatic
                  resources.
                </p>

                <div className="mt-7 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-[#087EA4]">
                  <span>Learn</span>

                  <FaArrowRight
                    size={8}
                    className="text-[#2DD4BF]"
                  />

                  <span>Research</span>

                  <FaArrowRight
                    size={8}
                    className="text-[#2DD4BF]"
                  />

                  <span>Impact</span>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </section>
    </main>
  );
}

/* ===============================================================
   INFO PANEL
================================================================ */

function InfoPanel({
  icon,
  eyebrow,
  title,
  text,
  accent,
  direction,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  text: string;
  accent: "cyan" | "teal";
  direction: "left" | "right";
}) {
  const isTeal = accent === "teal";

  return (
    <motion.article
      initial={{
        opacity: 0,
        x: direction === "left" ? -18 : 18,
      }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className={`group relative overflow-hidden rounded-[22px] border ${
        isTeal
          ? "border-[#2DD4BF]/20"
          : "border-[#0891B2]/15"
      } bg-white p-6 shadow-[0_20px_55px_rgba(7,89,133,0.07)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_65px_rgba(7,89,133,0.10)] sm:p-7`}
    >
      {/* Corner Glow */}
      <div
        className={`absolute -right-16 -top-16 h-40 w-40 rounded-full ${
          isTeal
            ? "bg-[#2DD4BF]/[0.08]"
            : "bg-[#0891B2]/[0.07]"
        } blur-3xl transition-opacity duration-500 group-hover:opacity-100`}
      />

      {/* Bottom Accent */}
      <div
        className={`absolute bottom-0 left-0 h-1 w-0 ${
          isTeal ? "bg-[#2DD4BF]" : "bg-[#0891B2]"
        } transition-all duration-500 group-hover:w-full`}
      />

      <div className="relative">
        {/* Icon */}
        <div
          className={`mb-6 flex h-11 w-11 items-center justify-center rounded-xl border ${
            isTeal
              ? "border-[#2DD4BF]/20 bg-[#2DD4BF]/[0.08] text-[#0891B2]"
              : "border-[#0891B2]/15 bg-[#0891B2]/[0.06] text-[#087EA4]"
          }`}
        >
          {icon}
        </div>

        {/* Eyebrow */}
        <p
          className={`text-[9px] font-semibold uppercase tracking-[0.18em] ${
            isTeal ? "text-[#0891B2]" : "text-[#087EA4]"
          }`}
        >
          {eyebrow}
        </p>

        {/* Title */}
        <h2 className="mt-2 max-w-md font-display text-xl font-semibold leading-7 text-[#075985]">
          {title}
        </h2>

        {/* Text */}
        <p className="mt-4 text-sm leading-7 text-[#55727D]">
          {text}
        </p>

        {/* Animated Line */}
        <div
          className={`mt-6 h-px w-10 ${
            isTeal ? "bg-[#2DD4BF]/50" : "bg-[#0891B2]/40"
          } transition-all duration-500 group-hover:w-full`}
        />
      </div>
    </motion.article>
  );
}