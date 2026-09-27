"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaArrowRight,
  FaUniversity,
  FaFish,
  FaCompass,
  FaGlobeAsia,
} from "react-icons/fa";

const contactItems = [
  {
    icon: FaMapMarkerAlt,
    title: "Visit us",
    label: "Campus Address",
    text: "Faculty of Fisheries, PSTU, Dumki, Patuakhali-8602, Bangladesh",
    accent: "#087EA4",
  },
  {
    icon: FaPhone,
    title: "Call us",
    label: "Telephone",
    text: "+880-0441-XXXXXX",
    href: "tel:+8800441XXXXXX",
    accent: "#0891B2",
  },
  {
    icon: FaEnvelope,
    title: "Email us",
    label: "General Enquiries",
    text: "fisheries@pstu.ac.bd",
    href: "mailto:fisheries@pstu.ac.bd",
    accent: "#2DD4BF",
  },
  {
    icon: FaClock,
    title: "Office hours",
    label: "Working Hours",
    text: "Sunday–Thursday\n9:00 AM – 5:00 PM",
    accent: "#075985",
  },
];

const departments = [
  {
    code: "AQC",
    name: "Aquaculture",
    email: "aqc@pstu.ac.bd",
  },
  {
    code: "FBG",
    name: "Fisheries Biology & Genetics",
    email: "fbg@pstu.ac.bd",
  },
  {
    code: "FMN",
    name: "Fisheries Management",
    email: "fmn@pstu.ac.bd",
  },
  {
    code: "FST",
    name: "Fisheries Technology",
    email: "fst@pstu.ac.bd",
  },
  {
    code: "MFO",
    name: "Marine Fisheries & Oceanography",
    email: "mfo@pstu.ac.bd",
  },
];

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F0FAFC] text-[#123B4A]">
      {/* =========================================================
          BACKGROUND ATMOSPHERE
      ========================================================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Large Ocean Glow */}
        <div className="absolute -left-64 -top-64 h-[700px] w-[700px] rounded-full bg-[#0891B2]/[0.08] blur-[150px]" />

        {/* Right Seafoam Glow */}
        <div className="absolute -right-64 top-[25%] h-[600px] w-[600px] rounded-full bg-[#2DD4BF]/[0.07] blur-[150px]" />

        {/* Bottom Deep Ocean Glow */}
        <div className="absolute bottom-0 left-1/3 h-[500px] w-[500px] rounded-full bg-[#075985]/[0.045] blur-[150px]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(7,89,133,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(7,89,133,0.06) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Top Gradient */}
        <div className="absolute inset-x-0 top-0 h-[450px] bg-gradient-to-b from-[#0891B2]/[0.055] to-transparent" />
      </div>

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative z-10 px-4 pb-16 pt-32 sm:px-6 sm:pt-36">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            {/* Eyebrow */}
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-[#0891B2]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#087EA4]">
                Faculty of Fisheries • PSTU
              </span>
            </div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-[#075985] sm:text-5xl md:text-6xl"
            >
              Let&apos;s stay
              <span className="block bg-gradient-to-r from-[#087EA4] via-[#0891B2] to-[#2DD4BF] bg-clip-text text-transparent">
                connected.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mt-6 max-w-2xl text-sm leading-7 text-[#55727D] sm:text-base md:text-lg"
            >
              Whether you are a prospective student, researcher, alumni,
              academic partner, or visitor, find the right way to connect
              with the Faculty of Fisheries at PSTU.
            </motion.p>
          </motion.div>

          {/* Hero Divider */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-10 h-px bg-gradient-to-r from-[#0891B2]/50 via-[#087EA4]/10 to-transparent"
          />
        </div>
      </section>

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}
      <section className="relative z-10 px-4 pb-24 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">

            {/* =====================================================
                LEFT COLUMN
            ===================================================== */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {/* Section Heading */}
              <div className="mb-7">
                <p className="mb-2 text-[10px] uppercase tracking-[0.24em] text-[#087EA4]">
                  Find us
                </p>

                <h2 className="font-display text-2xl font-bold text-[#075985] sm:text-3xl">
                  Faculty information
                </h2>

                <p className="mt-3 max-w-md text-sm leading-6 text-[#55727D]">
                  Connect directly with the Faculty of Fisheries through
                  our official contact channels.
                </p>
              </div>

              {/* =================================================
                  CONTACT CARDS
              ================================================= */}
              <div className="space-y-3">
                {contactItems.map((item, index) => {
                  const Icon = item.icon;

                  const content = (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.35,
                        delay: index * 0.06,
                      }}
                      viewport={{ once: true }}
                      className="group relative overflow-hidden rounded-2xl border border-[#087EA4]/10 bg-white p-5 shadow-[0_10px_35px_rgba(7,89,133,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0891B2]/25 hover:shadow-[0_18px_45px_rgba(7,89,133,0.09)]"
                    >
                      {/* Left Accent */}
                      <div
                        className="absolute left-0 top-0 h-full w-1"
                        style={{
                          backgroundColor: item.accent,
                          opacity: 0.7,
                        }}
                      />

                      {/* Hover Glow */}
                      <div
                        className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
                        style={{
                          backgroundColor: item.accent,
                        }}
                      />

                      <div className="relative flex items-start gap-4">
                        {/* Icon */}
                        <div
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border"
                          style={{
                            color: item.accent,
                            backgroundColor: `${item.accent}10`,
                            borderColor: `${item.accent}20`,
                          }}
                        >
                          <Icon size={15} />
                        </div>

                        <div className="min-w-0">
                          <p className="mb-1 text-[9px] uppercase tracking-[0.18em] text-[#55727D]">
                            {item.label}
                          </p>

                          <h3 className="mb-1 text-sm font-semibold text-[#123B4A]">
                            {item.title}
                          </h3>

                          <p className="whitespace-pre-line text-sm leading-relaxed text-[#55727D]">
                            {item.text}
                          </p>
                        </div>

                        {item.href && (
                          <FaArrowRight
                            size={10}
                            className="ml-auto mt-2 shrink-0 text-[#087EA4]/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#087EA4]"
                          />
                        )}
                      </div>
                    </motion.div>
                  );

                  return item.href ? (
                    <a key={item.title} href={item.href}>
                      {content}
                    </a>
                  ) : (
                    <div key={item.title}>{content}</div>
                  );
                })}
              </div>

              {/* =================================================
                  QUICK ACTIONS
              ================================================= */}
              <div className="mt-7 grid grid-cols-2 gap-3">
                <a
                  href="mailto:fisheries@pstu.ac.bd"
                  className="group flex items-center justify-center gap-2 rounded-xl border border-[#087EA4]/15 bg-white px-4 py-3 text-xs font-semibold text-[#087EA4] shadow-[0_8px_25px_rgba(7,89,133,0.04)] transition-all hover:border-[#0891B2]/30 hover:bg-[#F0FAFC] hover:shadow-[0_12px_30px_rgba(7,89,133,0.08)]"
                >
                  <FaEnvelope size={12} />
                  Email Faculty
                  <FaArrowRight
                    size={9}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>

                <a
                  href="tel:+8800441XXXXXX"
                  className="group flex items-center justify-center gap-2 rounded-xl border border-[#087EA4]/15 bg-[#087EA4] px-4 py-3 text-xs font-semibold text-white shadow-[0_10px_25px_rgba(8,126,164,0.15)] transition-all hover:bg-[#075985]"
                >
                  <FaPhone size={11} />
                  Call Faculty
                  <FaArrowRight
                    size={9}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>
              </div>
            </motion.div>

            {/* =====================================================
                RIGHT COLUMN
            ===================================================== */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* =================================================
                  LOCATION CARD
              ================================================= */}
              <div className="relative overflow-hidden rounded-[28px] border border-[#087EA4]/12 bg-white p-6 shadow-[0_25px_70px_rgba(7,89,133,0.08)] sm:p-8">
                {/* Decorative Glow */}
                <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[#2DD4BF]/10 blur-[80px]" />

                <div className="relative">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <p className="mb-2 text-[10px] uppercase tracking-[0.24em] text-[#087EA4]">
                        Our location
                      </p>

                      <h2 className="font-display text-2xl font-bold text-[#075985]">
                        Dumki, Patuakhali
                      </h2>

                      <p className="mt-2 max-w-md text-sm leading-6 text-[#55727D]">
                        Situated in the coastal region of Bangladesh,
                        our campus provides a unique academic environment
                        for fisheries and aquatic sciences.
                      </p>
                    </div>

                    <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#0891B2]/15 bg-[#0891B2]/[0.06] text-[#087EA4] sm:flex">
                      <FaMapMarkerAlt size={18} />
                    </div>
                  </div>

                  {/* Map-style Visual */}
                  <div className="relative mt-7 h-48 overflow-hidden rounded-2xl border border-[#087EA4]/10 bg-[#F0FAFC]">
                    {/* Grid */}
                    <div
                      className="absolute inset-0 opacity-60"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(7,89,133,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(7,89,133,0.07) 1px, transparent 1px)",
                        backgroundSize: "32px 32px",
                      }}
                    />

                    {/* Decorative Water Shapes */}
                    <div className="absolute -left-10 top-10 h-32 w-56 rotate-[-12deg] rounded-[50%] bg-[#0891B2]/[0.07]" />

                    <div className="absolute -right-16 bottom-[-20px] h-32 w-64 rotate-[8deg] rounded-[50%] bg-[#2DD4BF]/[0.08]" />

                    {/* Route Lines */}
                    <div className="absolute left-[18%] top-[32%] h-px w-[65%] rotate-[12deg] bg-[#087EA4]/20" />

                    <div className="absolute left-[30%] top-[62%] h-px w-[45%] rotate-[-18deg] bg-[#0891B2]/20" />

                    {/* Location Point */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-[#087EA4]/20 bg-white shadow-[0_12px_35px_rgba(7,89,133,0.15)]">
                        <div className="absolute inset-2 animate-pulse rounded-full bg-[#0891B2]/10" />

                        <FaMapMarkerAlt className="relative text-xl text-[#087EA4]" />
                      </div>
                    </div>

                    {/* Label */}
                    <div className="absolute bottom-4 left-4 rounded-xl border border-white/80 bg-white/90 px-3 py-2 shadow-[0_8px_25px_rgba(7,89,133,0.08)] backdrop-blur-md">
                      <div className="flex items-center gap-2">
                        <FaCompass className="text-[#0891B2]" size={11} />

                        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#123B4A]">
                          PSTU Campus
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="mt-5 flex items-start gap-3 rounded-xl border border-[#087EA4]/10 bg-[#F0FAFC] p-4">
                    <FaMapMarkerAlt className="mt-1 shrink-0 text-[#087EA4]" size={13} />

                    <p className="text-xs leading-5 text-[#55727D]">
                      Faculty of Fisheries, Patuakhali Science and
                      Technology University, Dumki, Patuakhali-8602,
                      Bangladesh
                    </p>
                  </div>
                </div>
              </div>

              {/* =================================================
                  DEPARTMENT DIRECTORY
              ================================================= */}
              <div className="relative overflow-hidden rounded-[28px] border border-[#087EA4]/12 bg-white shadow-[0_20px_60px_rgba(7,89,133,0.07)]">
                {/* Header */}
                <div className="border-b border-[#087EA4]/10 p-6 sm:p-7">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="mb-2 text-[10px] uppercase tracking-[0.24em] text-[#087EA4]">
                        Direct contact
                      </p>

                      <h2 className="font-display text-xl font-bold text-[#075985] sm:text-2xl">
                        Department directory
                      </h2>

                      <p className="mt-2 text-xs leading-5 text-[#55727D]">
                        Reach the department most relevant to your enquiry.
                      </p>
                    </div>

                    <div className="hidden h-11 w-11 items-center justify-center rounded-xl border border-[#0891B2]/15 bg-[#0891B2]/[0.06] text-[#087EA4] sm:flex">
                      <FaUniversity size={16} />
                    </div>
                  </div>
                </div>

                {/* Departments */}
                <div>
                  {departments.map((department, index) => (
                    <a
                      key={department.code}
                      href={`mailto:${department.email}`}
                      className={`group flex items-center gap-4 px-6 py-4 transition-all duration-300 hover:bg-[#F0FAFC] sm:px-7 ${
                        index !== departments.length - 1
                          ? "border-b border-[#087EA4]/[0.07]"
                          : ""
                      }`}
                    >
                      {/* Code */}
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#087EA4]/10 bg-[#F0FAFC] font-mono text-[9px] font-semibold text-[#087EA4] transition-colors group-hover:border-[#0891B2]/25 group-hover:bg-white">
                        {department.code}
                      </div>

                      {/* Department */}
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-[#123B4A] sm:text-sm">
                          {department.name}
                        </p>

                        <p className="mt-1 truncate text-[10px] text-[#55727D]">
                          {department.email}
                        </p>
                      </div>

                      {/* Arrow */}
                      <FaArrowRight
                        size={10}
                        className="shrink-0 text-[#087EA4]/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#087EA4]"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CONNECT / CLOSING SECTION
      ========================================================= */}
      <section className="relative border-t border-[#087EA4]/10 px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[28px] border border-[#087EA4]/12 bg-white px-6 py-10 shadow-[0_20px_60px_rgba(7,89,133,0.06)] sm:px-10">
            {/* Glow */}
            <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-96 -translate-x-1/2 rounded-full bg-[#0891B2]/[0.06] blur-[80px]" />

            <div className="relative flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
              {/* Text */}
              <div className="max-w-xl">
                <div className="mb-3 flex items-center gap-2">
                  <FaFish className="text-[#0891B2]" size={13} />

                  <p className="text-[9px] uppercase tracking-[0.22em] text-[#087EA4]">
                    Faculty of Fisheries
                  </p>
                </div>

                <h2 className="font-display text-2xl font-bold tracking-tight text-[#075985] sm:text-3xl">
                  Knowledge grows through connection.
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#55727D]">
                  We welcome academic enquiries, research collaboration,
                  student questions, alumni connections, and professional
                  partnerships.
                </p>
              </div>

              {/* CTA */}
              <Link
                href="/about"
                className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-xl border border-[#087EA4]/20 bg-[#087EA4] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(8,126,164,0.15)] transition-all duration-300 hover:bg-[#075985] hover:shadow-[0_15px_35px_rgba(7,89,133,0.20)]"
              >
                Explore Faculty
                <FaArrowRight
                  size={11}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER LINE
      ========================================================= */}
      <div className="relative z-10 flex items-center justify-center gap-2 pb-8 text-[10px] uppercase tracking-[0.18em] text-[#55727D]">
        <FaGlobeAsia className="text-[#0891B2]/60" size={11} />
        <span>PSTU • Dumki, Patuakhali • Bangladesh</span>
      </div>
    </main>
  );
}