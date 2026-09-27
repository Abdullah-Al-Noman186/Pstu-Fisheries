
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
    hoverBorder: string;
  }
> = {
  AQC: {
    icon: <GiShrimp size={28} />,
    desc: "Culture techniques for fish, shrimp, prawn & other aquatic organisms.",
    focus: "Aquatic production",
    color: "text-[#087EA4]",
    iconBg: "bg-[#087EA4]/[0.08]",
    hoverBorder: "hover:border-[#087EA4]/25",
  },

  FBG: {
    icon: <GiFishingHook size={28} />,
    desc: "Study of fish biology, genetics, breeding, and biodiversity conservation.",
    focus: "Biology & genetics",
    color: "text-[#0891B2]",
    iconBg: "bg-[#0891B2]/[0.08]",
    hoverBorder: "hover:border-[#0891B2]/25",
  },

  FMN: {
    icon: <GiWheat size={28} />,
    desc: "Sustainable management of fisheries resources, policy, and environmental impact.",
    focus: "Resources & policy",
    color: "text-[#075985]",
    iconBg: "bg-[#075985]/[0.07]",
    hoverBorder: "hover:border-[#075985]/25",
  },

  FST: {
    icon: <GiSharkFin size={28} />,
    desc: "Post-harvest technology, fish processing, quality control, and value-added products.",
    focus: "Food & technology",
    color: "text-[#B45309]",
    iconBg: "bg-[#F59E0B]/[0.08]",
    hoverBorder: "hover:border-[#F59E0B]/25",
  },

  MFO: {
    icon: <GiWaves size={28} />,
    desc: "Marine ecosystem, oceanography, deep-sea fisheries, and coastal resource management.",
    focus: "Ocean & coasts",
    color: "text-[#0891B2]",
    iconBg: "bg-[#2DD4BF]/[0.10]",
    hoverBorder: "hover:border-[#2DD4BF]/35",
  },
};

const deptKeys = Object.keys(DEPARTMENTS) as Department[];

export default function DepartmentsSection() {
  return (
    <section className="relative overflow-hidden bg-[#F0FAFC] py-24 sm:py-28">

      {/* =========================================================
          BACKGROUND
      ========================================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Large ocean glow */}

        <div
          className="
            absolute
            -left-56
            -top-48
            h-[620px]
            w-[620px]
            rounded-full
            bg-[#2DD4BF]/[0.07]
            blur-[140px]
          "
        />

        {/* Right ocean glow */}

        <div
          className="
            absolute
            -right-56
            bottom-[-180px]
            h-[650px]
            w-[650px]
            rounded-full
            bg-[#087EA4]/[0.07]
            blur-[150px]
          "
        />

        {/* Small aqua glow */}

        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.35, 0.65, 0.35],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            right-[18%]
            top-[18%]
            h-48
            w-48
            rounded-full
            bg-[#0891B2]/[0.06]
            blur-[90px]
          "
        />

        {/* Subtle grid */}

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(#087EA4 1px, transparent 1px),
              linear-gradient(90deg, #087EA4 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Top fade */}

        <div
          className="
            absolute
            inset-x-0
            top-0
            h-32
            bg-gradient-to-b
            from-white/70
            to-transparent
          "
        />
      </div>

      {/* =========================================================
          CONTENT
      ========================================================= */}

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* =======================================================
            HEADER
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

            <span
              className="
                h-px
                w-8
                bg-gradient-to-r
                from-transparent
                to-[#2DD4BF]
              "
            />

            <span
              className="
                rounded-full
                border
                border-[#087EA4]/10
                bg-white/80
                px-4
                py-2
                text-[10px]
                font-bold
                uppercase
                tracking-[0.28em]
                text-[#087EA4]
                shadow-[0_5px_20px_rgba(7,89,133,0.05)]
                backdrop-blur-xl
              "
            >
              Academic Ecosystem
            </span>

            <span
              className="
                h-px
                w-8
                bg-gradient-to-l
                from-transparent
                to-[#2DD4BF]
              "
            />

          </div>

          {/* Heading */}

          <h2
            className="
              font-display
              text-3xl
              font-bold
              tracking-[-0.035em]
              text-[#123B4A]
              sm:text-4xl
              lg:text-5xl
            "
          >
            Where curiosity meets the{" "}
            <span
              className="
                bg-gradient-to-r
                from-[#075985]
                via-[#087EA4]
                to-[#0891B2]
                bg-clip-text
                text-transparent
              "
            >
              aquatic world.
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-sm
              leading-7
              text-[#55727D]
              sm:text-base
            "
          >
            Five specialized departments bring together scientists,
            educators, researchers, and students working across the
            many dimensions of fisheries and aquatic sciences.
          </p>

        </motion.div>

        {/* =======================================================
            DEPARTMENT GRID
        ======================================================= */}

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

          {deptKeys.map((key, i) => {
            const info = deptInfo[key];

            return (
              <motion.div
                key={key}
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
                  delay: i * 0.07,
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
                    min-h-[305px]
                    overflow-hidden
                    rounded-[1.5rem]
                    border
                    border-[#087EA4]/10
                    bg-white/85
                    p-6
                    shadow-[0_12px_40px_rgba(7,89,133,0.06)]
                    backdrop-blur-xl
                    transition-all
                    duration-500
                    hover:-translate-y-2
                    hover:bg-white
                    hover:shadow-[0_24px_55px_rgba(7,89,133,0.12)]
                    ${info.hoverBorder}
                  `}
                >

                  {/* =================================================
                      TOP SHINE
                  ================================================= */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-x-6
                      top-0
                      h-px
                      bg-gradient-to-r
                      from-transparent
                      via-[#087EA4]/20
                      to-transparent
                    "
                  />

                  {/* =================================================
                      BACKGROUND HOVER GLOW
                  ================================================= */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      -right-20
                      -top-20
                      h-48
                      w-48
                      rounded-full
                      bg-[#2DD4BF]/[0.08]
                      opacity-0
                      blur-[70px]
                      transition-opacity
                      duration-500
                      group-hover:opacity-100
                    "
                  />

                  {/* =================================================
                      NUMBER
                  ================================================= */}

                  <div className="relative flex items-center justify-between">

                    <span
                      className="
                        font-mono
                        text-[9px]
                        font-semibold
                        tracking-[0.3em]
                        text-[#087EA4]/20
                        transition-colors
                        duration-300
                        group-hover:text-[#087EA4]/40
                      "
                    >
                      0{i + 1}
                    </span>

                    <span
                      className="
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.25em]
                        text-[#55727D]/35
                      "
                    >
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
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-[#087EA4]/10
                      ${info.iconBg}
                      ${info.color}
                      shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]
                      transition-all
                      duration-500
                      group-hover:scale-105
                      group-hover:-rotate-2
                      group-hover:border-[#2DD4BF]/30
                    `}
                  >

                    {/* Icon glow */}

                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        rounded-2xl
                        bg-[#2DD4BF]/10
                        opacity-0
                        blur-xl
                        transition-opacity
                        duration-500
                        group-hover:opacity-100
                      "
                    />

                    <span className="relative z-10">
                      {info.icon}
                    </span>

                  </div>

                  {/* =================================================
                      CODE + LINE
                  ================================================= */}

                  <div className="relative mt-6 flex items-center gap-2">

                    <span
                      className={`
                        rounded-md
                        border
                        border-[#087EA4]/10
                        bg-[#F0FAFC]
                        px-2
                        py-1
                        font-mono
                        text-[9px]
                        font-bold
                        tracking-wider
                        ${info.color}
                      `}
                    >
                      {key}
                    </span>

                    <span
                      className="
                        h-px
                        flex-1
                        bg-gradient-to-r
                        from-[#087EA4]/10
                        to-transparent
                      "
                    />

                  </div>

                  {/* =================================================
                      NAME
                  ================================================= */}

                  <h3
                    className="
                      relative
                      mt-3
                      max-w-[18rem]
                      font-display
                      text-lg
                      font-bold
                      leading-snug
                      tracking-tight
                      text-[#123B4A]
                      transition-colors
                      duration-300
                      group-hover:text-[#075985]
                    "
                  >
                    {DEPARTMENTS[key]}
                  </h3>

                  {/* =================================================
                      DESCRIPTION
                  ================================================= */}

                  <p
                    className="
                      relative
                      mt-3
                      min-h-[72px]
                      max-w-[20rem]
                      text-sm
                      leading-6
                      text-[#55727D]
                    "
                  >
                    {info.desc}
                  </p>

                  {/* =================================================
                      BOTTOM ROW
                  ================================================= */}

                  <div className="relative mt-5 flex items-center justify-between">

                    <span
                      className="
                        rounded-full
                        border
                        border-[#087EA4]/10
                        bg-[#F0FAFC]
                        px-3
                        py-1.5
                        text-[9px]
                        font-medium
                        uppercase
                        tracking-[0.16em]
                        text-[#55727D]
                      "
                    >
                      {info.focus}
                    </span>

                    <span
                      className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#087EA4]/10
                        bg-[#F0FAFC]
                        text-[#087EA4]
                        transition-all
                        duration-300
                        group-hover:translate-x-1
                        group-hover:border-[#2DD4BF]/30
                        group-hover:bg-[#2DD4BF]/10
                      "
                    >
                      <FaArrowRight className="text-[9px]" />
                    </span>

                  </div>

                  {/* =================================================
                      BOTTOM ACCENT
                  ================================================= */}

                  <div
                    className="
                      absolute
                      bottom-0
                      left-0
                      h-[2px]
                      w-0
                      rounded-r-full
                      bg-gradient-to-r
                      from-[#087EA4]
                      via-[#0891B2]
                      to-[#2DD4BF]
                      transition-all
                      duration-700
                      group-hover:w-2/3
                    "
                  />

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
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.35,
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
                min-h-[305px]
                flex-col
                justify-between
                overflow-hidden
                rounded-[1.5rem]
                border
                border-[#087EA4]/15
                bg-gradient-to-br
                from-[#075985]
                via-[#087EA4]
                to-[#0891B2]
                p-7
                shadow-[0_20px_55px_rgba(7,89,133,0.18)]
                transition-all
                duration-500
                hover:-translate-y-2
                hover:shadow-[0_28px_65px_rgba(7,89,133,0.24)]
              "
            >

              {/* =================================================
                  CTA DECORATION
              ================================================= */}

              <div
                className="
                  absolute
                  -right-24
                  -top-24
                  h-64
                  w-64
                  rounded-full
                  bg-[#2DD4BF]/20
                  blur-[70px]
                  transition-transform
                  duration-1000
                  group-hover:scale-125
                "
              />

              <div
                className="
                  absolute
                  -bottom-24
                  -left-20
                  h-52
                  w-52
                  rounded-full
                  bg-white/10
                  blur-[70px]
                "
              />

              {/* Pattern */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  opacity-[0.07]
                "
                style={{
                  backgroundImage:
                    "linear-gradient(45deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />

              {/* Top reflection */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-x-7
                  top-0
                  h-px
                  bg-gradient-to-r
                  from-transparent
                  via-white/40
                  to-transparent
                "
              />

              {/* =================================================
                  CTA CONTENT
              ================================================= */}

              <div className="relative z-10">

                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-white/20
                    bg-white/10
                    text-[#D9FFFA]
                    backdrop-blur-xl
                    transition-transform
                    duration-500
                    group-hover:rotate-12
                  "
                >
                  <FaCompass className="text-sm" />
                </div>

                <p
                  className="
                    mt-7
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.28em]
                    text-[#A7FFF1]
                  "
                >
                  Your journey starts here
                </p>

                <h3
                  className="
                    mt-3
                    max-w-[17rem]
                    font-display
                    text-2xl
                    font-bold
                    leading-tight
                    tracking-tight
                    text-white
                  "
                >
                  Find the field that feels like yours.
                </h3>

                <p
                  className="
                    mt-3
                    max-w-sm
                    text-sm
                    leading-6
                    text-white/70
                  "
                >
                  Explore our departments, meet the people behind
                  the work, and discover where your curiosity can take you.
                </p>

              </div>

              {/* =================================================
                  CTA BUTTON
              ================================================= */}

              <div className="relative z-10 mt-8">

                <Link
                  href="/departments"
                  className="
                    group/btn
                    inline-flex
                    items-center
                    gap-3
                    rounded-xl
                    bg-white
                    px-5
                    py-3
                    text-sm
                    font-bold
                    text-[#075985]
                    shadow-[0_10px_30px_rgba(0,0,0,0.12)]
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:bg-[#F0FAFC]
                    hover:shadow-[0_15px_35px_rgba(0,0,0,0.18)]
                  "
                >
                  Explore all departments

                  <span
                    className="
                      flex
                      h-6
                      w-6
                      items-center
                      justify-center
                      rounded-full
                      bg-[#087EA4]/10
                      transition-colors
                      group-hover/btn:bg-[#2DD4BF]/20
                    "
                  >
                    <FaArrowRight
                      className="
                        text-[9px]
                        text-[#087EA4]
                        transition-transform
                        duration-300
                        group-hover/btn:translate-x-0.5
                      "
                    />
                  </span>

                </Link>

              </div>

              {/* Bottom accent */}

              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  h-[2px]
                  w-0
                  bg-gradient-to-r
                  from-[#2DD4BF]
                  via-white
                  to-transparent
                  transition-all
                  duration-700
                  group-hover:w-3/4
                "
              />

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
            delay: 0.3,
          }}
          viewport={{
            once: true,
          }}
          className="mt-14 flex items-center justify-center gap-4"
        >

          <span
            className="
              h-px
              w-12
              bg-gradient-to-r
              from-transparent
              to-[#087EA4]/15
            "
          />

          <span
            className="
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.3em]
              text-[#55727D]/60
            "
          >
            Fisheries • Research • Innovation
          </span>

          <span
            className="
              h-px
              w-12
              bg-gradient-to-l
              from-transparent
              to-[#087EA4]/15
            "
          />

        </motion.div>

      </div>
    </section>
  );
}

