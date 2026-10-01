"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  FaFish,
  FaArrowRight,
  FaMicroscope,
  FaWater,
  FaGlobeAsia,
  FaFlask,
} from "react-icons/fa";

const departments = [
  {
    code: "AQC",
    name: "Aquaculture",
    icon: FaWater,
  },
  {
    code: "FBG",
    name: "Fisheries Biology & Genetics",
    icon: FaFish,
  },
  {
    code: "FMN",
    name: "Fisheries Management",
    icon: FaGlobeAsia,
  },
  {
    code: "FST",
    name: "Fisheries Technology",
    icon: FaFlask,
  },
  {
    code: "MFO",
    name: "Marine Fisheries & Oceanography",
    icon: FaMicroscope,
  },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#F0FAFC] text-[#123B4A]">
     

      {/* =====================================================
    BACKGROUND IMAGE
===================================================== */}

<div className="absolute inset-0 z-0">
  <Image
    src="/faculty.png"
    alt="Faculty of Fisheries building, PSTU"
    fill
    priority
    className="object-cover object-center"
    sizes="100vw"
  />

  {/* Minimal overall wash */}
  <div className="absolute inset-0 bg-white/10" />

  {/* Text readability only where needed */}
  <div
    className="
      absolute
      inset-y-0
      left-0
      w-full
      bg-gradient-to-r
      from-[#F0FAFC]/85
      via-[#F0FAFC]/40
      to-transparent
      lg:w-[58%]
    "
  />

  {/* Very subtle right-side ocean tint */}
  <div
    className="
      absolute
      inset-0
      bg-gradient-to-br
      from-transparent
      via-transparent
      to-[#087EA4]/10
    "
  />

  {/* Bottom transition */}
  <div
    className="
      absolute
      inset-x-0
      bottom-0
      h-32
      bg-gradient-to-t
      from-[#F0FAFC]/70
      to-transparent
    "
  />
</div>

      {/* =====================================================
          SUBTLE GRID
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[1]
          opacity-[0.035]
        "
        style={{
          backgroundImage: `
            linear-gradient(#087EA4 1px, transparent 1px),
            linear-gradient(90deg, #087EA4 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* =====================================================
          DECORATIVE OCEAN ORBS
      ===================================================== */}

      <motion.div
        animate={{
          y: [0, -15, 0],
          x: [0, 8, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          right-[12%]
          top-[18%]
          z-[2]
          hidden
          h-20
          w-20
          rounded-full
          border
          border-white/60
          bg-white/20
          backdrop-blur-md
          lg:block
        "
      />

      <motion.div
        animate={{
          y: [0, 12, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          right-[22%]
          top-[35%]
          z-[2]
          hidden
          h-8
          w-8
          rounded-full
          bg-[#2DD4BF]/20
          blur-sm
          lg:block
        "
      />

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-4
          pb-16
          pt-28
          sm:px-6
          sm:pt-32
          lg:px-8
          lg:pb-20
          lg:pt-40
        "
      >
        {/* ===================================================
            HERO CONTENT
        =================================================== */}

        <div className="max-w-3xl">
          {/* University badge */}

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="
              mb-7
              inline-flex
              items-center
              gap-3
              rounded-full
              border
              border-[#087EA4]/15
              bg-white/75
              px-3
              py-2
              shadow-[0_8px_30px_rgba(7,89,133,0.08)]
              backdrop-blur-xl
            "
          >
            <span
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                bg-[#087EA4]
                text-white
                shadow-[0_5px_15px_rgba(8,126,164,0.25)]
              "
            >
              <FaFish className="text-xs" />
            </span>

            <span
              className="
                text-xs
                font-semibold
                tracking-wide
                text-[#123B4A]
                sm:text-sm
              "
            >
              Patuakhali Science and Technology University
            </span>

            <span
              className="
                hidden
                h-4
                w-px
                bg-[#087EA4]/15
                sm:block
              "
            />

            <span
              className="
                hidden
                text-[10px]
                font-bold
                tracking-[0.2em]
                text-[#087EA4]
                sm:block
              "
            >
              PSTU
            </span>
          </motion.div>

          {/* =================================================
              MAIN HEADING
          ================================================= */}

          <motion.h1
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.75,
              delay: 0.08,
            }}
            className="
              max-w-3xl
              font-display
              text-5xl
              font-bold
              leading-[0.98]
              tracking-[-0.04em]
              text-[#123B4A]
              sm:text-6xl
              lg:text-[5.5rem]
            "
          >
            Faculty of{" "}
            <span className="relative inline-block">
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
                Fisheries
              </span>

              <motion.span
                initial={{
                  width: 0,
                }}
                animate={{
                  width: "82%",
                }}
                transition={{
                  duration: 0.9,
                  delay: 0.85,
                  ease: "easeOut",
                }}
                className="
                  absolute
                  -bottom-2
                  left-1/2
                  h-[3px]
                  -translate-x-1/2
                  rounded-full
                  bg-gradient-to-r
                  from-transparent
                  via-[#2DD4BF]
                  to-transparent
                "
              />
            </span>
          </motion.h1>

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <motion.p
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.2,
            }}
            className="
              mt-7
              max-w-2xl
              text-base
              leading-8
              text-[#23647c]
              sm:text-lg
              sm:leading-8
            "
          >
            Advancing aquatic sciences through education, research,
            innovation, and responsible stewardship of the waters that
            sustain our communities.
          </motion.p>

          {/* =================================================
              BUTTONS
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.3,
            }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            {/* Primary */}

            <Link
              href="/departments"
              className="
                group
                relative
                inline-flex
                items-center
                gap-3
                overflow-hidden
                rounded-xl
                bg-[#087EA4]
                px-6
                py-3.5
                font-semibold
                text-white
                shadow-[0_12px_30px_rgba(8,126,164,0.22)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-[#075985]
                hover:shadow-[0_18px_40px_rgba(7,89,133,0.25)]
              "
            >
              {/* Button shine */}

              <span
                className="
                  absolute
                  inset-0
                  -translate-x-full
                  bg-gradient-to-r
                  from-transparent
                  via-white/20
                  to-transparent
                  transition-transform
                  duration-700
                  group-hover:translate-x-full
                "
              />

              <span className="relative">
                Explore Departments
              </span>

              <span
                className="
                  relative
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-full
                  bg-white/15
                  transition-all
                  duration-300
                  group-hover:bg-white/20
                "
              >
                <FaArrowRight
                  className="
                    text-[10px]
                    transition-transform
                    duration-300
                    group-hover:translate-x-0.5
                  "
                />
              </span>
            </Link>

            {/* Secondary */}

            <Link
              href="/Ouralumni"
              className="
                group
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                border-[#087EA4]/15
                bg-white/75
                px-6
                py-3.5
                font-medium
                text-[#075985]
                shadow-[0_8px_25px_rgba(7,89,133,0.06)]
                backdrop-blur-xl
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-[#2DD4BF]/40
                hover:bg-white
                hover:shadow-[0_12px_30px_rgba(7,89,133,0.1)]
              "
            >
              <span>Meet Our Alumni</span>

              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#2DD4BF]
                  transition-transform
                  group-hover:scale-125
                "
              />
            </Link>
          </motion.div>

          {/* =================================================
              TAGLINE
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.8,
              delay: 0.5,
            }}
            className="mt-10 flex items-center gap-3"
          >
            <span className="h-[2px] w-8 rounded-full bg-[#2DD4BF]" />

            <span
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.28em]
                text-[#55727D]
              "
            >
              Education
            </span>

            <span className="text-[#2DD4BF]">•</span>

            <span
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.28em]
                text-[#55727D]
              "
            >
              Research
            </span>

            <span className="text-[#2DD4BF]">•</span>

            <span
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.28em]
                text-[#55727D]
              "
            >
              Sustainability
            </span>
          </motion.div>
        </div>

        {/* ===================================================
            DEPARTMENTS
        =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.55,
          }}
          className="mt-20 lg:mt-24"
        >
          {/* Section heading */}

          <div className="mb-6 flex items-end justify-between gap-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2DD4BF]" />

                <span
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.28em]
                    text-[#087EA4]
                  "
                >
                  Explore
                </span>
              </div>

              <h2
                className="
                  mt-1.5
                  text-xl
                  font-bold
                  tracking-tight
                  text-[#123B4A]
                  sm:text-2xl
                "
              >
                Academic Departments
              </h2>
            </div>

            <Link
              href="/departments"
              className="
                group
                hidden
                items-center
                gap-2
                text-xs
                font-semibold
                text-[#087EA4]
                sm:flex
              "
            >
              View all

              <FaArrowRight
                className="
                  text-[9px]
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </Link>
          </div>

          {/* =================================================
              DEPARTMENT CARDS
          ================================================= */}

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {departments.map((dept, i) => {
              const Icon = dept.icon;

              return (
                <Link
                  key={dept.code}
                  href={`/departments/${dept.code.toLowerCase()}`}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    border-[#087EA4]/10
                    bg-white/80
                    p-4
                    shadow-[0_8px_30px_rgba(7,89,133,0.06)]
                    backdrop-blur-xl
                    transition-all
                    duration-300
                    hover:-translate-y-1.5
                    hover:border-[#2DD4BF]/40
                    hover:bg-white
                    hover:shadow-[0_18px_40px_rgba(7,89,133,0.12)]
                  "
                >
                  {/* Top glow */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      -right-10
                      -top-10
                      h-24
                      w-24
                      rounded-full
                      bg-[#2DD4BF]/10
                      blur-2xl
                      opacity-0
                      transition-opacity
                      duration-500
                      group-hover:opacity-100
                    "
                  />

                  {/* Card number */}

                  <span
                    className="
                      absolute
                      right-4
                      top-3
                      font-mono
                      text-[9px]
                      font-medium
                      text-[#087EA4]/15
                      transition-colors
                      duration-300
                      group-hover:text-[#087EA4]/35
                    "
                  >
                    0{i + 1}
                  </span>

                  {/* Icon */}

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-[#087EA4]/10
                      bg-[#F0FAFC]
                      text-[#087EA4]
                      transition-all
                      duration-300
                      group-hover:border-[#2DD4BF]/30
                      group-hover:bg-[#2DD4BF]/10
                      group-hover:text-[#075985]
                    "
                  >
                    <Icon className="text-sm" />
                  </div>

                  {/* Code */}

                  <div className="mt-4">
                    <span
                      className="
                        text-[10px]
                        font-bold
                        tracking-[0.18em]
                        text-[#0891B2]
                      "
                    >
                      {dept.code}
                    </span>

                    <h3
                      className="
                        mt-1.5
                        pr-4
                        text-sm
                        font-semibold
                        leading-5
                        text-[#123B4A]
                        transition-colors
                        duration-300
                        group-hover:text-[#075985]
                      "
                    >
                      {dept.name}
                    </h3>
                  </div>

                  {/* Arrow */}

                  <div
                    className="
                      mt-4
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <div
                      className="
                        h-[2px]
                        w-7
                        rounded-full
                        bg-[#2DD4BF]/50
                        transition-all
                        duration-500
                        group-hover:w-12
                        group-hover:bg-[#2DD4BF]
                      "
                    />

                    <div
                      className="
                        flex
                        h-6
                        w-6
                        items-center
                        justify-center
                        rounded-full
                        bg-[#F0FAFC]
                        text-[#087EA4]
                        opacity-0
                        transition-all
                        duration-300
                        group-hover:translate-x-0.5
                        group-hover:opacity-100
                      "
                    >
                      <FaArrowRight className="text-[8px]" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </motion.div>

        {/* ===================================================
            MOBILE VIEW ALL
        =================================================== */}

        <div className="mt-5 flex justify-center sm:hidden">
          <Link
            href="/departments"
            className="
              inline-flex
              items-center
              gap-2
              text-xs
              font-semibold
              text-[#087EA4]
            "
          >
            View all departments
            <FaArrowRight className="text-[9px]" />
          </Link>
        </div>
      </div>
    </section>
  );
}