"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowRight, FaCompass } from "react-icons/fa";
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
    focus: string;
    color: string;
    iconBg: string;
    glow: string;
    border: string;
  }
> = {
  AQC: {
    icon: <GiShrimp size={30} />,
    desc: "Culture techniques for fish, shrimp, prawn & other aquatic organisms.",
    focus: "Aquatic production",
    color: "text-blue-500",
    iconBg: "bg-blue-400/[0.08]",
    glow: "bg-blue-400/[0.12]",
    border: "group-hover:border-blue-300/25",
  },

  FBG: {
    icon: <GiFishingHook size={30} />,
    desc: "Study of fish biology, genetics, breeding, and biodiversity conservation.",
    focus: "Biology & genetics",
    color: "text-emerald-500",
    iconBg: "bg-emerald-400/[0.08]",
    glow: "bg-emerald-400/[0.12]",
    border: "group-hover:border-emerald-300/25",
  },

  FMN: {
    icon: <GiWheat size={30} />,
    desc: "Sustainable management of fisheries resources, policy, and environmental impact.",
    focus: "Resources & policy",
    color: "text-violet-400",
    iconBg: "bg-violet-400/[0.08]",
    glow: "bg-violet-400/[0.12]",
    border: "group-hover:border-violet-300/25",
  },

  FST: {
    icon: <GiSharkFin size={30} />,
    desc: "Post-harvest technology, fish processing, quality control, and value-added products.",
    focus: "Food & technology",
    color: "text-amber-400",
    iconBg: "bg-amber-400/[0.08]",
    glow: "bg-amber-400/[0.12]",
    border: "group-hover:border-amber-300/25",
  },

  MFO: {
    icon: <GiWaves size={30} />,
    desc: "Marine ecosystem, oceanography, deep-sea fisheries, and coastal resource management.",
    focus: "Ocean & coasts",
    color: "text-cyan-400",
    iconBg: "bg-cyan-400/[0.08]",
    glow: "bg-cyan-400/[0.12]",
    border: "group-hover:border-cyan-300/25",
  },
};

const deptKeys = Object.keys(DEPARTMENTS) as Department[];

export default function DepartmentsSection() {
  return (
    <section className="relative overflow-hidden bg-[#020b18] py-24 sm:py-28">

      {/* =========================================================
          ATMOSPHERIC BACKGROUND
      ========================================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Soft ocean atmosphere */}
        <div className="absolute -left-48 top-0 h-[500px] w-[500px] rounded-full bg-cyan-400/[0.045] blur-[140px]" />

        <div className="absolute -right-48 bottom-0 h-[550px] w-[550px] rounded-full bg-teal-400/[0.045] blur-[150px]" />

        <motion.div
          className="absolute left-[42%] top-[35%] h-80 w-80 rounded-full bg-sky-400/[0.025] blur-[130px]"
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Soft radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(2,11,24,0.35)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* =========================================================
            HEADER
        ========================================================= */}

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
            duration: 0.7,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >

          {/* Eyebrow */}
          <div className="mb-5 inline-flex items-center gap-3">

            <span className="h-px w-8 bg-gradient-to-r from-transparent to-teal-300/60" />

            <span className="
              rounded-full
              border border-white/[0.08]
              bg-white/[0.035]
              px-4 py-2
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.28em]
              text-teal-300/80
              backdrop-blur-xl
            ">
              Academic Ecosystem
            </span>

            <span className="h-px w-8 bg-gradient-to-l from-transparent to-teal-300/60" />

          </div>

          <h2 className="
            font-display
            text-3xl
            font-bold
            tracking-[-0.03em]
            text-white
            sm:text-4xl
            lg:text-5xl
          ">
            Where curiosity meets the{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-teal-300 to-emerald-300 bg-clip-text text-transparent">
              aquatic world.
            </span>
          </h2>

          <p className="
            mx-auto
            mt-5
            max-w-2xl
            text-sm
            leading-7
            text-slate-500
            sm:text-base
          ">
            Five specialized departments bring together scientists, educators,
            researchers, and students working across the many dimensions of
            fisheries and aquatic sciences.
          </p>
        </motion.div>

        {/* =========================================================
            DEPARTMENT GRID
        ========================================================= */}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

          {deptKeys.map((key, i) => {
            const info = deptInfo[key];

            return (
              <motion.div
                key={key}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{
                  once: true,
                  margin: "-60px",
                }}
              >
                <Link
                  href={`/departments/${key.toLowerCase()}`}
                  className={`
                    group
                    relative
                    block
                    h-full
                    min-h-[310px]
                    overflow-hidden
                    rounded-[1.7rem]
                    border
                    border-white/[0.08]
                    bg-white/[0.025]
                    p-6
                    shadow-[0_20px_60px_rgba(0,0,0,0.18)]
                    backdrop-blur-[28px]
                    transition-all
                    duration-500
                    hover:-translate-y-2
                    hover:bg-white/[0.045]
                    hover:shadow-[0_28px_80px_rgba(0,0,0,0.28)]
                    ${info.border}
                  `}
                >

                  {/* =================================================
                      GLASS REFLECTION
                  ================================================= */}

                  <div className="
                    pointer-events-none
                    absolute
                    inset-x-5
                    top-0
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-white/[0.25]
                    to-transparent
                  " />

                  <div className="
                    pointer-events-none
                    absolute
                    -right-20
                    -top-24
                    h-56
                    w-32
                    rotate-[35deg]
                    bg-white/[0.018]
                    blur-2xl
                  " />

                  {/* Inner glass border */}
                  <div className="
                    pointer-events-none
                    absolute
                    inset-1
                    rounded-[1.6rem]
                    border
                    border-white/[0.025]
                  " />

                  {/* =================================================
                      DEPARTMENT NUMBER
                  ================================================= */}

                  <div className="relative flex items-center justify-between">

                    <span className="
                      font-mono
                      text-[9px]
                      font-medium
                      tracking-[0.3em]
                      text-white/[0.18]
                      transition-colors
                      duration-300
                      group-hover:text-teal-300/30
                    ">
                      0{i + 1}
                    </span>

                    <span className="
                      text-[9px]
                      uppercase
                      tracking-[0.25em]
                      text-slate-600
                    ">
                      PSTU
                    </span>

                  </div>

                  {/* =================================================
                      ICON
                  ================================================= */}

                  <div
                    className={`
                      relative
                      mt-6
                      flex
                      h-[4.3rem]
                      w-[4.3rem]
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-white/[0.08]
                      ${info.iconBg}
                      ${info.color}
                      shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]
                      backdrop-blur-xl
                      transition-all
                      duration-500
                      group-hover:scale-105
                      group-hover:border-white/[0.13]
                    `}
                  >

                    {/* Icon glow */}
                    <div
                      className={`
                        pointer-events-none
                        absolute
                        inset-0
                        rounded-2xl
                        ${info.glow}
                        opacity-0
                        blur-xl
                        transition-opacity
                        duration-500
                        group-hover:opacity-100
                      `}
                    />

                    <span className="relative">
                      {info.icon}
                    </span>

                    {/* Live indicator */}
                    <span className="
                      absolute
                      -right-1
                      -top-1
                      h-2.5
                      w-2.5
                      rounded-full
                      border-2
                      border-[#071421]
                      bg-teal-300
                      opacity-0
                      shadow-[0_0_12px_rgba(45,212,191,0.7)]
                      transition-opacity
                      duration-500
                      group-hover:opacity-100
                    " />

                  </div>

                  {/* =================================================
                      NAME
                  ================================================= */}

                  <div className="relative mt-6">

                    <div className="flex items-center gap-2">

                      <span
                        className={`
                          rounded-md
                          border
                          border-white/[0.07]
                          bg-white/[0.035]
                          px-2
                          py-1
                          font-mono
                          text-[9px]
                          font-bold
                          tracking-wider
                          ${info.color}
                          backdrop-blur-xl
                        `}
                      >
                        {key}
                      </span>

                      <span className="h-px flex-1 bg-white/[0.05]" />

                    </div>

                    <h3 className="
                      mt-3
                      max-w-[18rem]
                      font-display
                      text-lg
                      font-semibold
                      leading-snug
                      tracking-tight
                      text-white
                    ">
                      {DEPARTMENTS[key]}
                    </h3>

                  </div>

                  {/* =================================================
                      DESCRIPTION
                  ================================================= */}

                  <p className="
                    relative
                    mt-3
                    min-h-[72px]
                    max-w-[20rem]
                    text-sm
                    leading-6
                    text-slate-500
                    transition-colors
                    duration-300
                    group-hover:text-slate-400
                  ">
                    {info.desc}
                  </p>

                  {/* =================================================
                      FOCUS TAG
                  ================================================= */}

                  <div className="relative mt-5 flex items-center justify-between">

                    <span className="
                      rounded-full
                      border
                      border-white/[0.06]
                      bg-white/[0.025]
                      px-3
                      py-1.5
                      text-[9px]
                      uppercase
                      tracking-[0.18em]
                      text-slate-500
                    ">
                      {info.focus}
                    </span>

                    <span className={`
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/[0.07]
                      bg-white/[0.025]
                      ${info.color}
                      transition-all
                      duration-500
                      group-hover:translate-x-1
                      group-hover:border-white/[0.13]
                      group-hover:bg-white/[0.06]
                    `}>
                      <FaArrowRight className="text-[9px]" />
                    </span>

                  </div>

                  {/* Bottom accent */}
                  <div className="
                    absolute
                    bottom-0
                    left-0
                    h-px
                    w-0
                    bg-gradient-to-r
                    from-cyan-300/70
                    via-teal-300/50
                    to-transparent
                    transition-all
                    duration-700
                    group-hover:w-1/2
                  " />

                </Link>
              </motion.div>
            );
          })}

          {/* =========================================================
              CTA CARD
          ========================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.4,
            }}
            viewport={{
              once: true,
            }}
          >
            <div
              className="
                group
                relative
                flex
                h-full
                min-h-[310px]
                flex-col
                justify-between
                overflow-hidden
                rounded-[1.7rem]
                border
                border-teal-300/[0.12]
                bg-gradient-to-br
                from-teal-400/[0.09]
                via-white/[0.025]
                to-cyan-400/[0.04]
                p-7
                shadow-[0_25px_70px_rgba(0,0,0,0.25)]
                backdrop-blur-[30px]
              "
            >

              {/* Ambient glows */}
              <div className="
                absolute
                -right-24
                -top-24
                h-64
                w-64
                rounded-full
                bg-teal-300/[0.09]
                blur-[80px]
                transition-transform
                duration-1000
                group-hover:scale-125
              " />

              <div className="
                absolute
                -bottom-24
                -left-24
                h-56
                w-56
                rounded-full
                bg-cyan-300/[0.07]
                blur-[80px]
              " />

              {/* Glass reflection */}
              <div className="
                pointer-events-none
                absolute
                inset-x-6
                top-0
                h-px
                bg-gradient-to-r
                from-transparent
                via-white/[0.3]
                to-transparent
              " />

              <div className="relative z-10">

                {/* Compass icon */}
                <div className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-teal-300/15
                  bg-teal-300/[0.07]
                  text-teal-300
                  shadow-[0_0_30px_rgba(45,212,191,0.08)]
                  backdrop-blur-xl
                ">
                  <FaCompass className="text-sm" />
                </div>

                <p className="
                  mt-7
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.28em]
                  text-teal-300/70
                ">
                  Your journey starts here
                </p>

                <h3 className="
                  mt-3
                  max-w-[16rem]
                  font-display
                  text-2xl
                  font-semibold
                  leading-tight
                  tracking-tight
                  text-white
                ">
                  Find the field that feels like yours.
                </h3>

                <p className="
                  mt-3
                  max-w-sm
                  text-sm
                  leading-6
                  text-slate-500
                ">
                  Explore our departments, meet the people behind the work,
                  and discover where your curiosity can take you.
                </p>

              </div>

              {/* CTA */}
              <div className="relative z-10 mt-8">

                <Link
                  href="/departments"
                  className="
                    group/btn
                    inline-flex
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-white/[0.12]
                    bg-white/[0.08]
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    shadow-lg
                    backdrop-blur-xl
                    transition-all
                    duration-400
                    hover:-translate-y-1
                    hover:border-teal-300/25
                    hover:bg-white/[0.12]
                  "
                >
                  Explore all departments

                  <span className="
                    flex
                    h-6
                    w-6
                    items-center
                    justify-center
                    rounded-full
                    bg-teal-300/[0.1]
                  ">
                    <FaArrowRight className="
                      text-[9px]
                      text-teal-300
                      transition-transform
                      duration-300
                      group-hover/btn:translate-x-0.5
                    " />
                  </span>
                </Link>

              </div>

            </div>
          </motion.div>

        </div>

        {/* =========================================================
            BOTTOM STATEMENT
        ========================================================= */}

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
          className="mt-14 flex items-center justify-center gap-4"
        >

          <span className="h-px w-12 bg-gradient-to-r from-transparent to-white/[0.08]" />

          <span className="
            text-[9px]
            uppercase
            tracking-[0.3em]
            text-slate-600
          ">
            Fisheries • Research • Innovation
          </span>

          <span className="h-px w-12 bg-gradient-to-l from-transparent to-white/[0.08]" />

        </motion.div>

      </div>
    </section>
  );
}