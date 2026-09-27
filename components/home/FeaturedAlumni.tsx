"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

import {
  FaLinkedin,
  FaArrowRight,
  FaMapMarkerAlt,
  FaBriefcase,
  FaGraduationCap,
  FaQuoteLeft,
  FaEye,
  FaCompass,
} from "react-icons/fa";

import LoadingSpinner from "@/components/ui/LoadingSpinner";
import AlumniModal from "@/components/alumni/AlumniModal";
import { Alumni } from "@/types";

/* =========================================================
   DEPARTMENT STYLES
========================================================= */

const deptStyles: Record<
  string,
  {
    accent: string;
    light: string;
    text: string;
    border: string;
    label: string;
  }
> = {
  AQC: {
    accent: "#087EA4",
    light: "#087EA4",
    text: "text-[#087EA4]",
    border: "border-[#087EA4]/15",
    label: "Aquaculture",
  },

  FBG: {
    accent: "#0891B2",
    light: "#0891B2",
    text: "text-[#0891B2]",
    border: "border-[#0891B2]/15",
    label: "Fisheries Biology & Genetics",
  },

  FMN: {
    accent: "#075985",
    light: "#075985",
    text: "text-[#075985]",
    border: "border-[#075985]/15",
    label: "Fisheries Management",
  },

  FST: {
    accent: "#D97706",
    light: "#F59E0B",
    text: "text-[#B45309]",
    border: "border-[#F59E0B]/20",
    label: "Fisheries Science & Technology",
  },

  MFO: {
    accent: "#0891B2",
    light: "#2DD4BF",
    text: "text-[#087EA4]",
    border: "border-[#2DD4BF]/20",
    label: "Marine Fisheries & Oceanography",
  },
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function FeaturedAlumni() {
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedAlumni, setSelectedAlumni] = useState<Alumni | null>(null);

  /* =========================================================
     FETCH ALUMNI
  ========================================================= */

  useEffect(() => {
    axios
      .get("/api/alumni")
      .then(({ data }) => {
        if (data.success) {
          setAlumni(data.data.slice(0, 6));
        }
      })
      .catch((error) => {
        console.error("Failed to load alumni:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      {/* =========================================================
          ALUMNI SECTION
      ========================================================= */}

      <section className="relative overflow-hidden bg-[#F0FAFC] py-24 sm:py-28">

        {/* =======================================================
            BACKGROUND
        ======================================================= */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          {/* Top-left aqua glow */}

          <div
            className="
              absolute
              -left-40
              -top-40
              h-[500px]
              w-[500px]
              rounded-full
              bg-[#2DD4BF]/10
              blur-[120px]
            "
          />

          {/* Bottom-right ocean glow */}

          <div
            className="
              absolute
              -bottom-48
              -right-40
              h-[550px]
              w-[550px]
              rounded-full
              bg-[#087EA4]/10
              blur-[140px]
            "
          />

          {/* Center glow */}

          <motion.div
            className="
              absolute
              left-1/2
              top-[45%]
              h-[400px]
              w-[400px]
              -translate-x-1/2
              rounded-full
              bg-[#0891B2]/[0.035]
              blur-[120px]
            "
            animate={{
              scale: [1, 1.12, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Subtle grid */}

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(8,126,164,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(8,126,164,0.35) 1px, transparent 1px)",
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

          {/* Bottom fade */}

          <div
            className="
              absolute
              inset-x-0
              bottom-0
              h-32
              bg-gradient-to-t
              from-[#F0FAFC]
              to-transparent
            "
          />
        </div>

        {/* =======================================================
            CONTENT
        ======================================================= */}

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* =====================================================
              SECTION HEADER
          ===================================================== */}

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
            className="mx-auto mb-16 max-w-3xl"
          >

            {/* Eyebrow */}

            <div className="mb-5 flex items-center gap-3">

              <span className="h-px w-9 bg-gradient-to-r from-transparent to-[#0891B2]" />

              <span
                className="
                  rounded-full
                  border
                  border-[#087EA4]/10
                  bg-white
                  px-4
                  py-2
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.25em]
                  text-[#087EA4]
                  shadow-[0_5px_20px_rgba(7,89,133,0.05)]
                "
              >
                Our Community
              </span>

              <span className="h-px w-9 bg-gradient-to-l from-transparent to-[#0891B2]" />

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
              People who carry{" "}
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
                PSTU
              </span>{" "}
              forward.
            </h2>

            {/* Accent */}

            <div
              className="
                mt-5
                h-1
                w-20
                rounded-full
                bg-gradient-to-r
                from-[#075985]
                via-[#0891B2]
                to-[#2DD4BF]
              "
            />

            {/* Description */}

            <p
              className="
                mt-6
                max-w-2xl
                text-sm
                leading-7
                text-[#55727D]
                sm:text-base
              "
            >
              From fisheries and marine research to government, academia,
              and industry — our alumni continue to extend the reach of
              the Faculty far beyond graduation.
            </p>
          </motion.div>

          {/* =====================================================
              LOADING
          ===================================================== */}

          {loading ? (
            <div className="flex min-h-[320px] items-center justify-center">

              <div
                className="
                  rounded-2xl
                  border
                  border-[#087EA4]/10
                  bg-white
                  px-10
                  py-10
                  shadow-[0_20px_60px_rgba(7,89,133,0.08)]
                "
              >
                <LoadingSpinner />
              </div>

            </div>
          ) : alumni.length === 0 ? (

            /* ===================================================
               EMPTY STATE
            =================================================== */

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="
                mx-auto
                max-w-xl
                rounded-[2rem]
                border
                border-[#087EA4]/10
                bg-white
                p-12
                text-center
                shadow-[0_20px_60px_rgba(7,89,133,0.08)]
              "
            >

              <div
                className="
                  mx-auto
                  mb-6
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#0891B2]/10
                  text-[#087EA4]
                "
              >
                <FaGraduationCap size={24} />
              </div>

              <h3
                className="
                  font-display
                  text-lg
                  font-semibold
                  text-[#123B4A]
                "
              >
                No alumni profiles yet
              </h3>

              <p
                className="
                  mx-auto
                  mt-3
                  max-w-sm
                  text-sm
                  leading-6
                  text-[#55727D]
                "
              >
                Alumni profiles will appear here once graduates register
                and complete their profiles.
              </p>

            </motion.div>

          ) : (

            /* ===================================================
               ALUMNI GRID
            =================================================== */

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {alumni.map((person, i) => {

                const dept =
                  deptStyles[person.department || ""] || {
                    accent: "#087EA4",
                    light: "#0891B2",
                    text: "text-[#087EA4]",
                    border: "border-[#087EA4]/15",
                    label: "Faculty of Fisheries",
                  };

                return (
                  <motion.article
                    key={person._id}
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    whileHover={{
                      y: -8,
                    }}
                    transition={{
                      duration: 0.55,
                      delay: i * 0.07,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    viewport={{
                      once: true,
                      margin: "-50px",
                    }}
                    onClick={() => setSelectedAlumni(person)}
                    className="
                      group
                      relative
                      cursor-pointer
                      overflow-hidden
                      rounded-[1.6rem]
                      border
                      border-[#087EA4]/10
                      bg-white
                      shadow-[0_12px_40px_rgba(7,89,133,0.07)]
                      transition-all
                      duration-500
                      hover:border-[#087EA4]/20
                      hover:shadow-[0_25px_65px_rgba(7,89,133,0.13)]
                    "
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedAlumni(person);
                      }
                    }}
                    aria-label={`View profile of ${person.name}`}
                  >

                    {/* =================================================
                        TOP COLOR STRIP
                    ================================================= */}

                    <div
                      className="absolute inset-x-0 top-0 h-1"
                      style={{
                        background: `linear-gradient(90deg, ${dept.accent}, ${dept.light})`,
                      }}
                    />

                    {/* =================================================
    PHOTO AREA
================================================= */}

<div className="relative h-[210px] overflow-hidden bg-[#EAF7FA]">

  {/* Soft department background */}

  <div
    className="
      absolute
      inset-0
      bg-gradient-to-br
      from-white
      via-[#F0FAFC]
      to-[#E5F6FA]
    "
  />

  {/* Department glow */}

  <div
    className="
      absolute
      -right-16
      -top-20
      h-52
      w-52
      rounded-full
      opacity-20
      blur-3xl
      transition-transform
      duration-700
      group-hover:scale-125
    "
    style={{
      backgroundColor: dept.light,
    }}
  />

  <div
    className="
      absolute
      -bottom-24
      -left-16
      h-52
      w-52
      rounded-full
      opacity-10
      blur-3xl
    "
    style={{
      backgroundColor: dept.accent,
    }}
  />

  {/* =================================================
      FULL PHOTO
  ================================================= */}

  {person.photo ? (
    <div className="absolute inset-0 flex items-center justify-center p-3">

      <Image
        src={person.photo}
        alt={person.name}
        fill
        sizes="
          (max-width: 768px) 100vw,
          (max-width: 1024px) 50vw,
          33vw
        "
        className="
          object-contain
          object-center
          p-3
          transition-transform
          duration-700
          group-hover:scale-[1.03]
        "
      />

    </div>
  ) : (
    <div className="relative flex h-full items-center justify-center">

      <div
        className="
          flex
          h-24
          w-24
          items-center
          justify-center
          rounded-full
          border-4
          border-white
          bg-white
          text-3xl
          font-bold
          shadow-[0_15px_40px_rgba(7,89,133,0.12)]
        "
        style={{
          color: dept.accent,
        }}
      >
        {person.name?.[0]?.toUpperCase() || "A"}
      </div>

    </div>
  )}

  {/* =================================================
      TOP RIGHT LINKEDIN
  ================================================= */}

  {person.linkedin &&
    person.linkedin !== "#" && (
      <a
        href={person.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="
          absolute
          right-5
          top-5
          z-20
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-xl
          border
          border-white/80
          bg-white/95
          text-[#087EA4]
          shadow-[0_6px_20px_rgba(7,89,133,0.12)]
          transition-all
          duration-300
          hover:scale-105
          hover:bg-[#087EA4]
          hover:text-white
        "
        aria-label={`${person.name} LinkedIn profile`}
      >
        <FaLinkedin size={14} />
      </a>
    )}

  {/* =================================================
      DEPARTMENT BADGE
  ================================================= */}

  {/* {person.department && (
    <div className="absolute bottom-4 left-5 z-20">

      <span
        className="
          inline-flex
          items-center
          rounded-full
          border
          border-white/80
          bg-white/95
          px-3
          py-1.5
          text-[9px]
          font-bold
          uppercase
          tracking-[0.12em]
          shadow-[0_5px_15px_rgba(7,89,133,0.08)]
        "
        style={{
          color: dept.accent,
        }}
      >
        {person.department}
      </span>

    </div>
  )} */}

</div>

                    {/* =================================================
                        CARD CONTENT
                    ================================================= */}

                    <div className="p-6">

                      {/* Name */}

                      <div className="flex items-start justify-between gap-4">

                        <div className="min-w-0">

                          <h3
                            className="
                              font-display
                              text-lg
                              font-bold
                              tracking-[-0.02em]
                              text-[#123B4A]
                              transition-colors
                              duration-300
                              group-hover:text-[#087EA4]
                            "
                          >
                            {person.name}
                          </h3>

                          {person.currentPosition && (
                            <div
                              className="
                                mt-2
                                flex
                                items-start
                                gap-2
                                text-xs
                                leading-5
                                text-[#55727D]
                              "
                            >
                              <FaBriefcase
                                size={10}
                                className="mt-1 shrink-0 text-[#0891B2]"
                              />

                              <span className="line-clamp-2">
                                {person.currentPosition}
                              </span>
                            </div>
                          )}

                        </div>

                        {/* View icon */}

                        <div
                          className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-[#087EA4]/10
                            bg-[#F0FAFC]
                            text-[#55727D]
                            transition-all
                            duration-300
                            group-hover:border-[#087EA4]/20
                            group-hover:bg-[#087EA4]
                            group-hover:text-white
                          "
                        >
                          <FaEye size={12} />
                        </div>

                      </div>

                      {/* =================================================
                          META ROW
                      ================================================= */}

                      <div
                        className="
                          mt-5
                          flex
                          flex-wrap
                          items-center
                          gap-2
                        "
                      >

                        {person.batch && (
                          <span
                            className="
                              inline-flex
                              items-center
                              gap-1.5
                              rounded-full
                              bg-[#F0FAFC]
                              px-3
                              py-1.5
                              text-[9px]
                              font-bold
                              uppercase
                              tracking-[0.1em]
                              text-[#55727D]
                            "
                          >
                            <FaGraduationCap
                              size={9}
                              className="text-[#087EA4]"
                            />

                            Batch &apos;
                            {String(person.batch).slice(-2)}
                          </span>
                        )}

                        {person.department && (
                          <span
                            className={`
                              rounded-full
                              border
                              px-3
                              py-1.5
                              text-[9px]
                              font-bold
                              uppercase
                              tracking-[0.1em]
                              ${dept.border}
                              ${dept.text}
                            `}
                          >
                            {person.department}
                          </span>
                        )}

                      </div>

                      {/* =================================================
                          ORGANIZATION
                      ================================================= */}

                      {person.organization && (
                        <div
                          className="
                            mt-5
                            rounded-xl
                            border
                            border-[#087EA4]/[0.07]
                            bg-[#F8FCFD]
                            px-4
                            py-3
                          "
                        >

                          <p
                            className="
                              text-[8px]
                              font-bold
                              uppercase
                              tracking-[0.18em]
                              text-[#55727D]/60
                            "
                          >
                            Currently with
                          </p>

                          <p
                            className="
                              mt-1
                              truncate
                              text-xs
                              font-medium
                              text-[#123B4A]
                            "
                          >
                            {person.organization}
                          </p>

                        </div>
                      )}

                      {/* =================================================
                          TESTIMONIAL
                      ================================================= */}

                      {person.testimonial && (
                        <div className="mt-5">

                          <div
                            className="
                              relative
                              rounded-xl
                              border
                              border-[#087EA4]/[0.07]
                              bg-[#F8FCFD]
                              p-4
                            "
                          >

                            <FaQuoteLeft
                              size={12}
                              className="mb-2 text-[#0891B2]/30"
                            />

                            <p
                              className="
                                line-clamp-3
                                text-xs
                                italic
                                leading-5
                                text-[#55727D]
                              "
                            >
                              {person.testimonial}
                            </p>

                          </div>

                        </div>
                      )}

                      {/* =================================================
                          FOOTER
                      ================================================= */}

                      <div
                        className="
                          mt-5
                          flex
                          items-center
                          justify-between
                          border-t
                          border-[#087EA4]/[0.07]
                          pt-4
                        "
                      >

                        {person.location ? (
                          <span
                            className="
                              flex
                              max-w-[60%]
                              items-center
                              gap-1.5
                              truncate
                              text-[10px]
                              text-[#55727D]
                            "
                          >
                            <FaMapMarkerAlt
                              size={9}
                              className="shrink-0 text-[#0891B2]"
                            />

                            {person.location.split(",")[0]}
                          </span>
                        ) : (
                          <span />
                        )}

                        <span
                          className="
                            flex
                            items-center
                            gap-2
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-[0.1em]
                            text-[#55727D]/60
                            transition-colors
                            duration-300
                            group-hover:text-[#087EA4]
                          "
                        >
                          View profile

                          <FaArrowRight
                            size={9}
                            className="
                              transition-transform
                              duration-300
                              group-hover:translate-x-1
                            "
                          />
                        </span>

                      </div>

                    </div>

                    {/* =================================================
                        BOTTOM ACCENT
                    ================================================= */}

                    <div
                      className="
                        absolute
                        bottom-0
                        left-0
                        h-1
                        w-0
                        transition-all
                        duration-500
                        group-hover:w-full
                      "
                      style={{
                        background: `linear-gradient(90deg, ${dept.accent}, ${dept.light})`,
                      }}
                    />

                  </motion.article>
                );
              })}

            </div>
          )}

          {/* =========================================================
              VIEW ALL
          ========================================================= */}

          {!loading && alumni.length > 0 && (
            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.25,
              }}
              viewport={{
                once: true,
              }}
              className="mt-14 flex justify-center"
            >

              <Link
                href="/alumni"
                className="
                  group
                  inline-flex
                  items-center
                  gap-4
                  rounded-xl
                  border
                  border-[#087EA4]/10
                  bg-white
                  px-5
                  py-3
                  text-xs
                  font-semibold
                  text-[#123B4A]
                  shadow-[0_10px_30px_rgba(7,89,133,0.06)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#087EA4]/20
                  hover:shadow-[0_15px_40px_rgba(7,89,133,0.1)]
                "
              >

                <span>
                  Explore the alumni network
                </span>

                <span
                  className="
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-lg
                    bg-[#F0FAFC]
                    text-[#087EA4]
                    transition-all
                    duration-300
                    group-hover:bg-[#087EA4]
                    group-hover:text-white
                  "
                >
                  <FaArrowRight
                    size={10}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-0.5
                    "
                  />
                </span>

              </Link>

            </motion.div>
          )}

          {/* =========================================================
              FOOTER STATEMENT
          ========================================================= */}

          <motion.div
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            transition={{
              duration: 0.8,
              delay: 0.4,
            }}
            viewport={{
              once: true,
            }}
            className="mt-16 flex items-center justify-center gap-4"
          >

            <span
              className="
                h-px
                w-10
                bg-gradient-to-r
                from-transparent
                to-[#087EA4]/15
              "
            />

            <div
              className="
                flex
                items-center
                gap-2
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.22em]
                text-[#55727D]/50
              "
            >
              <FaCompass
                size={9}
                className="text-[#0891B2]"
              />

              Connected beyond graduation
            </div>

            <span
              className="
                h-px
                w-10
                bg-gradient-to-l
                from-transparent
                to-[#087EA4]/15
              "
            />

          </motion.div>

        </div>
      </section>

      {/* ===========================================================
          ALUMNI MODAL
      =========================================================== */}

      <AlumniModal
        alumni={selectedAlumni}
        onClose={() => setSelectedAlumni(null)}
      />
    </>
  );
}