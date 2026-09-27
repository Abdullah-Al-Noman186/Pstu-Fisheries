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
    <footer className="relative overflow-hidden bg-[#F0FAFC] text-[#55727D]">
      {/* =========================================================
          ATMOSPHERE
      ========================================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Ocean blue glow */}
        <div className="absolute -left-56 -top-52 h-[520px] w-[520px] rounded-full bg-[#087EA4]/[0.06] blur-[130px]" />

        {/* Seafoam glow */}
        <div className="absolute -bottom-56 -right-48 h-[500px] w-[500px] rounded-full bg-[#2DD4BF]/[0.08] blur-[130px]" />

        {/* Aqua glow */}
        <div className="absolute left-1/2 top-1/3 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-[#0891B2]/[0.025] blur-[120px]" />

        {/* Fine ocean grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(8,126,164,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(8,126,164,0.35) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Soft top fade */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#087EA4]/[0.035] to-transparent" />
      </div>

      {/* =========================================================
          TOP EDGE
      ========================================================= */}

      <div className="relative h-px w-full bg-gradient-to-r from-transparent via-[#087EA4]/40 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 lg:px-8">
        {/* =======================================================
            MAIN FOOTER
        ======================================================= */}

        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.15fr]">
          {/* =====================================================
              BRAND
          ===================================================== */}

          <div>
            {/* Logo + Brand */}
            <div className="flex items-center gap-3">
              {/* Logo */}
              <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-[#087EA4]/15 bg-white shadow-[0_8px_30px_rgba(8,126,164,0.08)]">
                <div className="absolute inset-0 rounded-2xl bg-[#2DD4BF]/10 blur-md" />

                <FaFish
                  size={17}
                  className="relative text-[#087EA4]"
                />
              </div>

              {/* Brand text */}
              <div>
                <p className="font-display text-sm font-semibold text-[#123B4A]">
                  Faculty of Fisheries
                </p>

                <p className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-[#0891B2]">
                  PSTU · Bangladesh
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="mt-6 max-w-sm text-sm leading-7 text-[#55727D]">
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
                  className="group flex h-9 w-9 items-center justify-center rounded-xl border border-[#087EA4]/10 bg-white text-[#55727D] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0891B2]/30 hover:bg-[#087EA4] hover:text-white hover:shadow-[0_8px_20px_rgba(8,126,164,0.15)]"
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
                    className="group flex items-start gap-3 text-xs leading-5 text-[#55727D] transition-colors duration-300 hover:text-[#087EA4]"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#2DD4BF] transition-all duration-300 group-hover:scale-125 group-hover:bg-[#087EA4] group-hover:shadow-[0_0_8px_rgba(45,212,191,0.5)]" />

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
                    className="group flex items-center gap-3 text-xs text-[#55727D] transition-colors duration-300 hover:text-[#087EA4]"
                  >
                    <span className="h-px w-3 bg-[#087EA4]/20 transition-all duration-300 group-hover:w-5 group-hover:bg-[#0891B2]" />

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

                <p className="text-xs leading-6 text-[#55727D]">
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
                className="group flex items-center gap-3 text-xs text-[#55727D] transition-colors duration-300 hover:text-[#087EA4]"
              >
                <ContactIcon>
                  <FaPhone size={10} />
                </ContactIcon>

                <span>+880-0441-XXXXXX</span>
              </a>

              {/* Email */}
              <a
                href="mailto:fisheries@pstu.ac.bd"
                className="group flex items-center gap-3 text-xs text-[#55727D] transition-colors duration-300 hover:text-[#087EA4]"
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

        <div className="mt-14 border-t border-[#087EA4]/10 pt-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* Left */}
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#2DD4BF]" />

              <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-[#55727D]">
                Knowledge · Research · Sustainability
              </span>
            </div>

            {/* University */}
            <p className="text-xs text-[#55727D]">
              Patuakhali Science and Technology University
            </p>
          </div>

          {/* =====================================================
              COPYRIGHT
          ===================================================== */}

          <div className="mt-7 flex flex-col gap-3 border-t border-[#087EA4]/[0.07] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[10px] text-[#55727D]/80">
              © {new Date().getFullYear()} Faculty of Fisheries, PSTU. All
              rights reserved.
            </p>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.15em] text-[#55727D] transition-colors duration-300 hover:text-[#087EA4]"
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
      <h4 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#123B4A]">
        {children}
      </h4>

      <div className="mt-3 h-px w-7 bg-gradient-to-r from-[#087EA4] to-[#2DD4BF]" />
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
    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#087EA4]/10 bg-white text-[#087EA4] shadow-sm">
      {children}
    </span>
  );
}