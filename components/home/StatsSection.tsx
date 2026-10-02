"use client";

import { useHomeData } from "@/contexts/HomeDataContext";
import {
  FaUserGraduate,
  FaBook,
  FaGlobe,
  FaArrowUp,
  FaUsers,
  FaArchive,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function StatsSection() {
  const { data: homeData } = useHomeData();

  const formatCount = (value: number | null | undefined) =>
    value == null || !Number.isFinite(value) ? "—" : value.toLocaleString();

  const stats = [
    { value: "5", label: "Departments", description: "Academic disciplines", icon: FaBook },
    { value: formatCount(homeData?.stats.totalTeachers), label: "Faculty Members", description: "Teachers and researchers", icon: FaUserGraduate },
    { value: formatCount(homeData?.stats.totalAlumni), label: "Alumni Network", description: "Profiles in the alumni directory", icon: FaGlobe },
    { value: formatCount(homeData?.stats.totalStudents), label: "Current Students", description: "Profiles in the student directory", icon: FaUsers },
    { value: formatCount(homeData?.stats.totalArchive), label: "Archive Stories", description: "Stories shared by the faculty", icon: FaArchive },
  ];

  return (
    <section className="relative overflow-hidden bg-[#F0FAFC] py-20 sm:py-24">

      {/* =====================================================
          BACKGROUND OCEAN ATMOSPHERE
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0">

        {/* Soft top transition */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#D9F3FA] to-transparent" />

        {/* Ocean blue glow */}
        <div
          className="
            absolute
            left-[5%]
            top-[25%]
            h-80
            w-80
            rounded-full
            bg-[#22C1DC]/10
            blur-[110px]
          "
        />

        {/* Aqua glow */}
        <div
          className="
            absolute
            right-[5%]
            top-[15%]
            h-96
            w-96
            rounded-full
            bg-[#2DD4BF]/10
            blur-[130px]
          "
        />

        {/* Bottom blue glow */}
        <div
          className="
            absolute
            bottom-[-120px]
            left-1/2
            h-96
            w-[700px]
            -translate-x-1/2
            rounded-full
            bg-[#0891B2]/8
            blur-[120px]
          "
        />

        {/* Subtle ocean grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(#075985 1px, transparent 1px),
              linear-gradient(90deg, #075985 1px, transparent 1px)
            `,
            backgroundSize: "70px 70px",
          }}
        />

        {/* Floating bubbles */}
        <div className="absolute left-[15%] top-[30%] h-3 w-3 rounded-full border border-[#0891B2]/20" />
        <div className="absolute left-[22%] top-[65%] h-5 w-5 rounded-full border border-[#0891B2]/15" />
        <div className="absolute right-[18%] top-[40%] h-4 w-4 rounded-full border border-[#2DD4BF]/20" />
        <div className="absolute right-[12%] bottom-[25%] h-2 w-2 rounded-full bg-[#22C1DC]/20" />
      </div>

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            SECTION INTRO
        ===================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="
            mb-10
            flex
            flex-col
            gap-5
            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >

          <div>

            {/* Small label */}
            <div className="mb-3 flex items-center gap-3">

              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#0891B2]" />

              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.3em]
                  text-[#087EA4]
                "
              >
                By the numbers
              </span>

              <span className="h-1.5 w-1.5 rounded-full bg-[#2DD4BF]" />

            </div>

            {/* Heading */}
            <h2
              className="
                max-w-xl
                text-2xl
                font-bold
                tracking-tight
                text-[#123B4A]
                sm:text-3xl
              "
            >
              A community built around{" "}

              <span
                className="
                  bg-gradient-to-r
                  from-[#087EA4]
                  via-[#0891B2]
                  to-[#0D9488]
                  bg-clip-text
                  text-transparent
                "
              >
                knowledge & impact.
              </span>
            </h2>

          </div>

          {/* Description */}
          <p
            className="
              max-w-sm
              text-sm
              leading-6
              text-[#55727D]
            "
          >
            A snapshot of the people, research and academic community shaping
            the future of fisheries and aquatic sciences.
          </p>

        </motion.div>

        {/* =====================================================
            GLASS STAT PANEL
        ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.98,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            overflow-hidden
            rounded-[2rem]
            border
            border-[#087EA4]/10
            bg-white/70
            shadow-[0_25px_70px_rgba(8,126,164,0.10)]
            backdrop-blur-[28px]
          "
        >

          {/* =================================================
              GLASS REFLECTION
          ================================================= */}

          <div
            className="
              pointer-events-none
              absolute
              inset-x-0
              top-0
              h-32
              bg-gradient-to-b
              from-white/90
              to-transparent
            "
          />

          {/* Top ocean shine */}
          <div
            className="
              pointer-events-none
              absolute
              left-1/4
              top-0
              h-px
              w-1/2
              bg-gradient-to-r
              from-transparent
              via-[#22C1DC]/40
              to-transparent
            "
          />

          {/* Right glass reflection */}
          <div
            className="
              pointer-events-none
              absolute
              -right-32
              -top-40
              h-80
              w-40
              rotate-[35deg]
              bg-[#22C1DC]/[0.025]
              blur-2xl
            "
          />

          {/* Inner border */}
          <div
            className="
              pointer-events-none
              absolute
              inset-1
              rounded-[1.9rem]
              border
              border-[#087EA4]/[0.04]
            "
          />

          {/* =================================================
              STATS GRID
          ================================================= */}

          <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">

            {stats.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <motion.div
                  key={stat.label}
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.3,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  className={`
                    group
                    relative
                    min-h-[190px]
                    p-6
                    sm:p-7

                    ${
                      index < stats.length - 1
                        ? "border-b border-[#087EA4]/[0.08] lg:border-b-0 lg:border-r"
                        : ""
                    }

                    ${
                      index === 1
                        ? "md:border-r md:border-[#087EA4]/[0.08] lg:border-r"
                        : ""
                    }

                    ${
                      index === 2
                        ? "md:border-b md:border-[#087EA4]/[0.08] lg:border-b-0"
                        : ""
                    }

                    transition-all
                    duration-500
                    hover:bg-[#E8F8FB]/70
                  `}
                >

                  {/* =================================================
                      HOVER GLOW
                  ================================================= */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      -right-10
                      -top-10
                      h-28
                      w-28
                      rounded-full
                      bg-[#22C1DC]/15
                      opacity-0
                      blur-3xl
                      transition-opacity
                      duration-500
                      group-hover:opacity-100
                    "
                  />

                  {/* =================================================
                      TOP ROW
                  ================================================= */}

                  <div className="relative flex items-center justify-between">

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
                        bg-gradient-to-br
                        from-[#E8F8FB]
                        to-white
                        text-[#087EA4]
                        shadow-[0_5px_20px_rgba(8,126,164,0.08)]
                        transition-all
                        duration-500

                        group-hover:border-[#0891B2]/25
                        group-hover:bg-[#D9F3FA]
                        group-hover:text-[#075985]
                        group-hover:shadow-[0_8px_25px_rgba(8,126,164,0.15)]
                      "
                    >
                      <Icon className="text-sm" />
                    </div>

                    {/* Index */}
                    <span
                      className="
                        font-mono
                        text-[9px]
                        tracking-widest
                        text-[#087EA4]/25
                        transition-colors
                        duration-300
                        group-hover:text-[#087EA4]/50
                      "
                    >
                      0{index + 1}
                    </span>

                  </div>

                  {/* =================================================
                      NUMBER
                  ================================================= */}

                  <div className="relative mt-7 flex items-end gap-2">

                    <span
                      className="
                        text-4xl
                        font-bold
                        tracking-[-0.04em]
                        text-[#123B4A]
                        transition-all
                        duration-500
                        group-hover:text-[#075985]
                      "
                    >
                      {stat.value}
                    </span>

                    <FaArrowUp
                      className="
                        mb-2
                        text-[8px]
                        text-[#0891B2]/50
                        transition-all
                        duration-500
                        group-hover:-translate-y-1
                        group-hover:text-[#0891B2]
                      "
                    />

                  </div>

                  {/* =================================================
                      LABEL
                  ================================================= */}

                  <p
                    className="
                      relative
                      mt-1
                      text-sm
                      font-semibold
                      text-[#164E63]
                      transition-colors
                      duration-300
                      group-hover:text-[#075985]
                    "
                  >
                    {stat.label}
                  </p>

                  {/* =================================================
                      DESCRIPTION
                  ================================================= */}

                  <p
                    className="
                      relative
                      mt-1
                      text-[11px]
                      leading-5
                      text-[#66838D]
                      transition-colors
                      duration-300
                      group-hover:text-[#55727D]
                    "
                  >
                    {stat.description}
                  </p>

                  {/* =================================================
                      BOTTOM ACCENT
                  ================================================= */}

                  <div
                    className="
                      absolute
                      bottom-0
                      left-6
                      h-[2px]
                      w-0
                      rounded-full
                      bg-gradient-to-r
                      from-[#0891B2]
                      to-[#2DD4BF]
                      transition-all
                      duration-700
                      group-hover:w-16
                    "
                  />

                </motion.div>
              );
            })}

          </div>

          {/* =================================================
              BOTTOM GLASS HIGHLIGHT
          ================================================= */}

          <div
            className="
              pointer-events-none
              absolute
              bottom-0
              left-0
              right-0
              h-px
              bg-gradient-to-r
              from-transparent
              via-[#0891B2]/20
              to-transparent
            "
          />

        </motion.div>

        {/* =====================================================
            FOOTNOTE
        ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
            delay: 0.5,
          }}
          className="mt-5 flex items-center justify-between"
        >

          <div className="flex items-center gap-2">

            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#0891B2]
                shadow-[0_0_10px_rgba(8,145,178,0.5)]
              "
            />

            <span
              className="
                text-[9px]
                font-medium
                uppercase
                tracking-[0.25em]
                text-[#55727D]
              "
            >
              PSTU • Faculty of Fisheries
            </span>

          </div>

          <span
            className="
              hidden
              text-[9px]
              font-medium
              uppercase
              tracking-[0.25em]
              text-[#7A969E]
              sm:block
            "
          >
            Education · Research · Sustainability
          </span>

        </motion.div>

      </div>
    </section>
  );
}
