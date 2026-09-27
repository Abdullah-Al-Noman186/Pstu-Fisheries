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
    accent: "text-cyan-300",
    bg: "bg-cyan-400/[0.07]",
    border: "border-cyan-300/15",
  },
  {
    title: "Sustainability",
    description: "Protecting aquatic resources for generations to come.",
    icon: FaLeaf,
    accent: "text-emerald-300",
    bg: "bg-emerald-400/[0.07]",
    border: "border-emerald-300/15",
  },
  {
    title: "Innovation",
    description: "Turning scientific ideas into meaningful solutions.",
    icon: FaLightbulb,
    accent: "text-amber-300",
    bg: "bg-amber-400/[0.07]",
    border: "border-amber-300/15",
  },
  {
    title: "Integrity",
    description: "Building knowledge through responsibility and trust.",
    icon: FaShieldAlt,
    accent: "text-violet-300",
    bg: "bg-violet-400/[0.07]",
    border: "border-violet-300/15",
  },
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020b18] text-white">
      {/* ───────────────── Background atmosphere ───────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-72 top-0 h-[650px] w-[650px] rounded-full bg-cyan-500/[0.035] blur-[150px]" />

        <div className="absolute -right-72 top-[25%] h-[650px] w-[650px] rounded-full bg-blue-500/[0.025] blur-[150px]" />

        <div className="absolute bottom-0 left-1/3 h-[500px] w-[500px] rounded-full bg-teal-400/[0.02] blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(125,211,252,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,0.7) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-cyan-400/[0.025] to-transparent" />
      </div>

      {/* ───────────────── Hero ───────────────── */}
      <section className="relative z-10 border-b border-white/[0.05] pt-32 pb-20 sm:pt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-300/10 bg-cyan-400/[0.04] px-4 py-2 backdrop-blur-xl"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.7)]" />

              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-cyan-300/70">
                Faculty of Fisheries
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-300/10 bg-cyan-400/[0.035]"
            >
              <FaFish className="text-2xl text-cyan-300/80" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Understanding water.
              <span className="block text-cyan-300">
                Shaping the future.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base"
            >
              PSTU&apos;s Faculty of Fisheries is dedicated to advancing
              aquatic science through education, research, innovation,
              and responsible resource management.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="mt-9 flex items-center justify-center gap-6 text-[10px] uppercase tracking-[0.18em] text-slate-600"
            >
              <span>Education</span>

              <span className="h-1 w-1 rounded-full bg-cyan-400/30" />

              <span>Research</span>

              <span className="h-1 w-1 rounded-full bg-cyan-400/30" />

              <span>Impact</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───────────────── Main content ───────────────── */}
      <section className="relative z-10">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-14 max-w-3xl text-center"
          >
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-cyan-300/50">
              Who we are
            </p>

            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-slate-100 sm:text-3xl">
              A faculty shaped by the aquatic world.
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-500">
              Located in Dumki, Patuakhali, the Faculty of Fisheries
              operates within one of Bangladesh&apos;s most important
              aquatic and coastal regions. Our academic community brings
              together multiple disciplines to understand, manage, and
              sustainably develop aquatic resources.
            </p>
          </motion.div>

          {/* Vision + Mission */}
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

          {/* ───────────────── History ───────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55 }}
            className="mt-20"
          >
            <div className="mb-7 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-cyan-300/70">
                <FaHistory size={14} />
              </div>

              <div>
                <p className="text-[9px] uppercase tracking-[0.18em] text-slate-700">
                  Our story
                </p>

                <h2 className="mt-1 font-display text-xl font-semibold text-slate-200">
                  A growing academic community
                </h2>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[22px] border border-white/[0.07] bg-[#06111f]/80 p-6 backdrop-blur-xl sm:p-8">
              {/* Accent */}
              <div className="absolute left-0 top-0 h-full w-px bg-cyan-300/30" />

              <div className="relative space-y-6 pl-2 sm:pl-3">
                <p className="text-sm leading-7 text-slate-500">
                  The Faculty of Fisheries at Patuakhali Science and
                  Technology University (PSTU) was established with the
                  vision of advancing fisheries science education in the
                  coastal region of Bangladesh. Located in Dumki,
                  Patuakhali — the heart of Bangladesh&apos;s fishing belt
                  — our faculty is uniquely positioned to address the
                  challenges and opportunities of this vital sector.
                </p>

                <div className="h-px w-full bg-white/[0.05]" />

                <p className="text-sm leading-7 text-slate-500">
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

          {/* ───────────────── Departments ───────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55 }}
            className="mt-20"
          >
            <div className="mb-8 flex items-end justify-between gap-5">
              <div>
                <p className="text-[9px] uppercase tracking-[0.18em] text-cyan-300/40">
                  Academic scope
                </p>

                <h2 className="mt-2 font-display text-2xl font-semibold text-slate-100">
                  Five fields. One aquatic community.
                </h2>
              </div>

              <FaWater
                className="hidden text-cyan-300/20 sm:block"
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
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.018] p-4 transition-all duration-300 hover:border-cyan-300/15 hover:bg-white/[0.03]"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] text-slate-700">
                      {number}
                    </span>

                    <span className="text-[9px] font-semibold tracking-[0.12em] text-cyan-300/50">
                      {code}
                    </span>
                  </div>

                  <h3 className="mt-7 min-h-[48px] text-xs font-medium leading-5 text-slate-400 transition-colors group-hover:text-slate-200">
                    {name}
                  </h3>

                  <div className="mt-4 h-px w-6 bg-cyan-300/30 transition-all duration-300 group-hover:w-full" />
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* ───────────────── Values ───────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55 }}
            className="mt-20"
          >
            <div className="mx-auto mb-9 max-w-2xl text-center">
              <p className="text-[9px] uppercase tracking-[0.18em] text-cyan-300/40">
                What guides us
              </p>

              <h2 className="mt-2 font-display text-2xl font-semibold text-slate-100">
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
                    className={`group rounded-2xl border ${value.border} ${value.bg} p-5 transition-all duration-300 hover:bg-white/[0.035]`}
                  >
                    <Icon
                      className={`${value.accent} mb-5 opacity-70 transition-transform duration-300 group-hover:scale-110`}
                      size={18}
                    />

                    <h3 className="font-display text-sm font-semibold text-slate-200">
                      {value.title}
                    </h3>

                    <p className="mt-2 text-[11px] leading-5 text-slate-600">
                      {value.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* ───────────────── Closing statement ───────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-20"
          >
            <div className="relative overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#06111f]/70 px-6 py-10 text-center backdrop-blur-xl sm:px-10">
              <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 rounded-full bg-cyan-400/[0.035] blur-[80px]" />

              <div className="relative">
                <p className="text-[9px] uppercase tracking-[0.2em] text-cyan-300/40">
                  Looking ahead
                </p>

                <h2 className="mx-auto mt-3 max-w-2xl font-display text-2xl font-semibold tracking-tight text-slate-100 sm:text-3xl">
                  From the rivers of Bangladesh to the wider aquatic world.
                </h2>

                <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-600">
                  We continue to build knowledge, develop people, and
                  contribute to a more sustainable future for aquatic
                  resources.
                </p>

                <div className="mt-7 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-cyan-300/60">
                  <span>Learn</span>
                  <FaArrowRight size={8} />
                  <span>Research</span>
                  <FaArrowRight size={8} />
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
        isTeal ? "border-teal-300/10" : "border-cyan-300/10"
      } bg-[#06111f]/80 p-6 backdrop-blur-xl transition-all duration-500 hover:bg-[#071525] sm:p-7`}
    >
      <div
        className={`absolute -right-16 -top-16 h-40 w-40 rounded-full ${
          isTeal ? "bg-teal-400/[0.035]" : "bg-cyan-400/[0.035]"
        } blur-3xl transition-opacity duration-500 group-hover:opacity-100`}
      />

      <div className="relative">
        <div
          className={`mb-6 flex h-11 w-11 items-center justify-center rounded-xl border ${
            isTeal
              ? "border-teal-300/15 bg-teal-400/[0.06] text-teal-300"
              : "border-cyan-300/15 bg-cyan-400/[0.06] text-cyan-300"
          }`}
        >
          {icon}
        </div>

        <p
          className={`text-[9px] font-semibold uppercase tracking-[0.18em] ${
            isTeal ? "text-teal-300/50" : "text-cyan-300/50"
          }`}
        >
          {eyebrow}
        </p>

        <h2 className="mt-2 max-w-md font-display text-xl font-semibold leading-7 text-slate-200">
          {title}
        </h2>

        <p className="mt-4 text-sm leading-7 text-slate-500">
          {text}
        </p>

        <div
          className={`mt-6 h-px w-10 ${
            isTeal ? "bg-teal-300/30" : "bg-cyan-300/30"
          } transition-all duration-500 group-hover:w-full`}
        />
      </div>
    </motion.article>
  );
}