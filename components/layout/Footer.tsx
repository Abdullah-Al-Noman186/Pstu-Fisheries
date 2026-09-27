"use client";

import Link from "next/link";
import {
  FaFish,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaArrowRight,
} from "react-icons/fa";

import { DEPARTMENTS, Department } from "@/types";

const deptKeys = Object.keys(DEPARTMENTS) as Department[];

const quickLinks = [
  ["About Faculty", "/about"],
  ["Faculty Members", "/teachers"],
  ["Alumni Network", "/alumni"],
  ["Research Publications", "/research"],
  ["News & Events", "/news"],
  ["Contact Us", "/contact"],
];

const socialLinks = [
  {
    label: "Facebook",
    icon: FaFacebook,
    href: "#",
  },
  {
    label: "Twitter",
    icon: FaTwitter,
    href: "#",
  },
  {
    label: "LinkedIn",
    icon: FaLinkedin,
    href: "#",
  },
  {
    label: "YouTube",
    icon: FaYoutube,
    href: "#",
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#010814] text-slate-400">
      {/* =========================================================
          ATMOSPHERE
      ========================================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Upper ocean glow */}
        <div className="absolute -left-56 -top-48 h-[520px] w-[520px] rounded-full bg-cyan-500/[0.035] blur-[130px]" />

        {/* Lower teal glow */}
        <div className="absolute -bottom-56 -right-48 h-[500px] w-[500px] rounded-full bg-teal-400/[0.025] blur-[130px]" />

        {/* Fine grid */}
        <div
          className="absolute inset-0 opacity-[0.014]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(125,211,252,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,0.8) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Top fade */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-cyan-400/[0.025] to-transparent" />
      </div>

      {/* =========================================================
          TOP EDGE
      ========================================================= */}

      <div className="relative h-px w-full bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 lg:px-8">
        {/* =======================================================
            MAIN FOOTER
        ======================================================= */}

        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.15fr]">
          {/* =====================================================
              BRAND
          ===================================================== */}

          <div>
            <div className="flex items-center gap-3">
              {/* Logo */}
              <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/10 bg-cyan-400/[0.06] shadow-lg">
                <div className="absolute inset-0 rounded-2xl bg-cyan-400/[0.04] blur-md" />

                <FaFish
                  size={17}
                  className="relative text-cyan-300"
                />
              </div>

              {/* Brand text */}
              <div>
                <p className="font-display text-sm font-semibold text-white">
                  Faculty of Fisheries
                </p>

                <p className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-cyan-400/60">
                  PSTU · Bangladesh
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-sm text-sm leading-7 text-slate-500">
              Advancing fisheries education, research, innovation, and
              sustainable aquatic resource management for a changing world.
            </p>

            {/* Social */}
            <div className="mt-7 flex items-center gap-2.5">
              {socialLinks.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="group flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-slate-500 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300/20 hover:bg-cyan-400/[0.07] hover:text-cyan-300"
                >
                  <Icon
                    size={13}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* =====================================================
              DEPARTMENTS
          ===================================================== */}

          <div>
            <FooterHeading>Departments</FooterHeading>

            <ul className="space-y-3.5">
              {deptKeys.map((key) => (
                <li key={key}>
                  <Link
                    href={`/departments/${key.toLowerCase()}`}
                    className="group flex items-start gap-3 text-xs leading-5 text-slate-500 transition-colors duration-300 hover:text-cyan-300"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan-400/30 transition-all duration-300 group-hover:bg-cyan-300 group-hover:shadow-[0_0_8px_rgba(103,232,249,0.6)]" />

                    <span>{DEPARTMENTS[key]}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* =====================================================
              QUICK LINKS
          ===================================================== */}

          <div>
            <FooterHeading>Explore</FooterHeading>

            <ul className="space-y-3.5">
              {quickLinks.map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group flex items-center gap-3 text-xs text-slate-500 transition-colors duration-300 hover:text-cyan-300"
                  >
                    <span className="h-px w-3 bg-white/[0.1] transition-all duration-300 group-hover:w-5 group-hover:bg-cyan-400/50" />

                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* =====================================================
              CONTACT
          ===================================================== */}

          <div>
            <FooterHeading>Find Us</FooterHeading>

            <div className="space-y-4">
              {/* Address */}
              <div className="flex gap-3">
                <ContactIcon>
                  <FaMapMarkerAlt size={11} />
                </ContactIcon>

                <p className="text-xs leading-6 text-slate-500">
                  Faculty of Fisheries,
                  <br />
                  Patuakhali Science and Technology University,
                  <br />
                  Dumki, Patuakhali-8602, Bangladesh
                </p>
              </div>

              {/* Phone */}
              <a
                href="tel:+8800441XXXXXX"
                className="group flex items-center gap-3 text-xs text-slate-500 transition-colors duration-300 hover:text-cyan-300"
              >
                <ContactIcon>
                  <FaPhone size={10} />
                </ContactIcon>

                <span>+880-0441-XXXXXX</span>
              </a>

              {/* Email */}
              <a
                href="mailto:fisheries@pstu.ac.bd"
                className="group flex items-center gap-3 text-xs text-slate-500 transition-colors duration-300 hover:text-cyan-300"
              >
                <ContactIcon>
                  <FaEnvelope size={10} />
                </ContactIcon>

                <span>fisheries@pstu.ac.bd</span>
              </a>
            </div>
          </div>
        </div>

        {/* =======================================================
            LOWER BRAND STATEMENT
        ======================================================= */}

        <div className="mt-14 border-t border-white/[0.06] pt-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* Left */}
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-cyan-400/30" />

              <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-slate-600">
                Knowledge · Research · Sustainability
              </span>
            </div>

            {/* University */}
            <p className="text-xs text-slate-600">
              Patuakhali Science and Technology University
            </p>
          </div>

          {/* =====================================================
              COPYRIGHT
          ===================================================== */}

          <div className="mt-7 flex flex-col gap-3 border-t border-white/[0.04] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[10px] text-slate-700">
              © {new Date().getFullYear()} Faculty of Fisheries, PSTU. All
              rights reserved.
            </p>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.15em] text-slate-600 transition-colors duration-300 hover:text-cyan-300"
            >
              Get in touch

              <FaArrowRight
                size={8}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* =========================================================
   FOOTER HEADING
========================================================= */

function FooterHeading({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <h4 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-300">
        {children}
      </h4>

      <div className="mt-3 h-px w-7 bg-cyan-400/40" />
    </div>
  );
}

/* =========================================================
   CONTACT ICON
========================================================= */

function ContactIcon({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.025] text-cyan-400/60">
      {children}
    </span>
  );
}