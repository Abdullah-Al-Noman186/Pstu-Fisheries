
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import {
  FaBars,
  FaTimes,
  FaChevronDown,
  FaUser,
  FaSignOutAlt,
  FaTachometerAlt,
  FaCog,
  FaGraduationCap,
  FaPhone,
  FaEnvelope,
  FaFish,
  FaArrowRight,
} from "react-icons/fa";
import { DEPARTMENTS, Department } from "@/types";
import Image from "next/image";

const deptKeys = Object.keys(DEPARTMENTS) as Department[];

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Departments",
    href: "/departments",
    children: deptKeys.map((code) => ({
      label: DEPARTMENTS[code],
      code,
      href: `/departments/${code}`,
    })),
  },
  { label: "Teachers", href: "/teachers" },
  { label: "Our Alumni", href: "/Ouralumni" },
  { label: "Research", href: "/research" },
];

const roleColor: Record<string, string> = {
  admin: "from-red-500 to-rose-600",
  teacher: "from-teal-500 to-emerald-500",
  alumni: "from-amber-400 to-orange-500",
  student: "from-blue-500 to-cyan-500",
};

const deptColors: Record<string, string> = {
  AQC: "text-[#087EA4] bg-[#087EA4]/10 border-[#087EA4]/15",
  FBG: "text-emerald-600 bg-emerald-500/10 border-emerald-500/15",
  FMN: "text-violet-600 bg-violet-500/10 border-violet-500/15",
  FST: "text-amber-600 bg-amber-500/10 border-amber-500/15",
  MFO: "text-cyan-600 bg-cyan-500/10 border-cyan-500/15",
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [deptOpen, setDeptOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [deptDropdownOpen, setDeptDropdownOpen] = useState(false);

  const { user, signOut, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const deptRef = useRef<HTMLDivElement>(null);

  /* ============================================================
     SCROLL
  ============================================================ */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* ============================================================
     CLOSE DROPDOWNS ON OUTSIDE CLICK
  ============================================================ */

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (!target.closest("#user-dropdown")) {
        setDropdownOpen(false);
      }

      if (
        deptRef.current &&
        !deptRef.current.contains(e.target as Node)
      ) {
        setDeptDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* ============================================================
     CLOSE MOBILE MENU WHEN ROUTE CHANGES
  ============================================================ */

  useEffect(() => {
    setMobileOpen(false);
    setDeptOpen(false);
    setDeptDropdownOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  /* ============================================================
     SIGN OUT
  ============================================================ */

  const handleSignOut = async () => {
    await signOut();

    setDropdownOpen(false);
    setMobileOpen(false);

    router.push("/");
  };

  const firstName = user?.name?.split(" ")[0] || "";

  return (
    <>
      {/* ========================================================
          NAVBAR
      ======================================================== */}

      <header className="fixed inset-x-0 top-0 z-50 w-full">
        <div
          className={`
            relative w-full
            border-b
            transition-all duration-500
            ${
              scrolled
                ? "border-[#087EA4]/10 bg-white/95 shadow-[0_8px_35px_rgba(7,89,133,0.10)]"
                : "border-[#087EA4]/8 bg-[#F0FAFC]/95 shadow-[0_5px_25px_rgba(7,89,133,0.06)]"
            }
            backdrop-blur-2xl
          `}
        >
          {/* ==================================================
              BACKGROUND OCEAN GLOW
          ================================================== */}

          <div className="pointer-events-none absolute -left-20 -top-24 h-48 w-48 rounded-full bg-[#2DD4BF]/10 blur-[80px]" />

          <div className="pointer-events-none absolute -right-20 -top-24 h-48 w-48 rounded-full bg-[#087EA4]/10 blur-[80px]" />

          <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[#2DD4BF]/30 to-transparent" />

          {/* ==================================================
              TOP INFORMATION BAR
          ================================================== */}

          <div
            className={`
              overflow-hidden
              transition-all duration-500
              ${
                scrolled
                  ? "max-h-0 opacity-0"
                  : "max-h-10 opacity-100"
              }
            `}
          >
            <div className="flex items-center justify-between border-b border-[#087EA4]/7 px-5 py-2 sm:px-7 lg:px-10">
              <span className="flex items-center gap-2 text-[10px] font-medium text-[#55727D]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2DD4BF] opacity-50" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#2DD4BF]" />
                </span>

                Patuakhali Science and Technology University
              </span>

              <div className="hidden items-center gap-5 text-[10px] text-[#55727D] md:flex">
                <a
                  href="tel:+880"
                  className="flex items-center gap-1.5 transition-colors hover:text-[#087EA4]"
                >
                  <FaPhone size={8} />
                  +880-0441-XXXXXX
                </a>

                <a
                  href="mailto:fisheries@pstu.ac.bd"
                  className="flex items-center gap-1.5 transition-colors hover:text-[#087EA4]"
                >
                  <FaEnvelope size={8} />
                  fisheries@pstu.ac.bd
                </a>
              </div>
            </div>
          </div>

          {/* ==================================================
              MAIN NAVIGATION
          ================================================== */}

          <nav className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex h-[72px] items-center justify-between gap-4">
              {/* =================================================
                  LOGO
              ================================================= */}

              <Link
                href="/"
                className="group flex shrink-0 items-center gap-3"
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-[#2DD4BF]/20 blur-xl transition-all duration-500 group-hover:bg-[#2DD4BF]/35" />

                  <div
                    className="
                      relative flex h-11 w-11
                      items-center justify-center
                      overflow-hidden rounded-full
                      border border-[#087EA4]/10
                      bg-white
                      shadow-[0_5px_18px_rgba(7,89,133,0.10)]
                      transition-all duration-300
                      group-hover:scale-105
                      group-hover:border-[#087EA4]/25
                    "
                  >
                    <img
                      src="/logo.png"
                      alt="PSTU Logo"
                      width={46}
                      height={46}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                <div className="hidden sm:block">
                  <p className="text-sm font-bold leading-tight tracking-wide text-[#123B4A]">
                    Faculty of Fisheries
                  </p>

                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#087EA4]">
                      PSTU
                    </span>

                    <span className="h-1 w-1 rounded-full bg-[#2DD4BF]" />

                    <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#55727D]">
                      Bangladesh
                    </span>
                  </div>
                </div>
              </Link>

              {/* =================================================
                  DESKTOP NAVIGATION
              ================================================= */}

              <div className="hidden items-center gap-1 lg:flex">
                {navLinks.map((link) =>
                  link.children ? (
                    <div
                      key={link.label}
                      className="relative"
                      ref={deptRef}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setDeptDropdownOpen((open) => !open)
                        }
                        className={`
                          group relative flex items-center gap-2
                          rounded-xl px-3.5 py-2.5
                          text-sm font-semibold
                          transition-all duration-200
                          ${
                            pathname.startsWith("/departments")
                              ? "bg-[#087EA4]/8 text-[#075985]"
                              : "text-[#55727D] hover:bg-[#087EA4]/5 hover:text-[#123B4A]"
                          }
                        `}
                      >
                        {link.label}

                        <FaChevronDown
                          className={`
                            text-[9px]
                            transition-transform duration-300
                            ${
                              deptDropdownOpen
                                ? "rotate-180 text-[#087EA4]"
                                : "text-[#55727D]"
                            }
                          `}
                        />

                        {pathname.startsWith("/departments") && (
                          <span className="absolute bottom-1 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-[#2DD4BF]" />
                        )}
                      </button>

                      {/* =================================================
                          DEPARTMENT DROPDOWN
                      ================================================= */}

                      <AnimatePresence>
                        {deptDropdownOpen && (
                          <motion.div
                            initial={{
                              opacity: 0,
                              y: 10,
                              scale: 0.97,
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                              scale: 1,
                            }}
                            exit={{
                              opacity: 0,
                              y: 8,
                              scale: 0.98,
                            }}
                            transition={{
                              duration: 0.18,
                              ease: "easeOut",
                            }}
                            className="
                              absolute left-1/2 top-full
                              z-[100] mt-3 w-[360px]
                              -translate-x-1/2
                            "
                          >
                            <div
                              className="
                                relative overflow-hidden
                                rounded-2xl
                                border border-[#087EA4]/10
                                bg-white/98
                                shadow-[0_25px_70px_rgba(7,89,133,0.16)]
                                backdrop-blur-2xl
                              "
                            >
                              {/* Decorative glow */}

                              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#2DD4BF]/10 blur-[65px]" />

                              <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-[#087EA4]/8 blur-[65px]" />

                              {/* Header */}

                              <div className="relative border-b border-[#087EA4]/8 px-5 pb-4 pt-5">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#087EA4]/10 bg-[#087EA4]/8 text-[#087EA4]">
                                      <FaFish size={13} />
                                    </div>

                                    <div>
                                      <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#0891B2]">
                                        Explore
                                      </p>

                                      <p className="mt-0.5 text-sm font-bold text-[#123B4A]">
                                        Fisheries Departments
                                      </p>
                                    </div>
                                  </div>

                                  <span className="rounded-full bg-[#F0FAFC] px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-[#55727D]">
                                    {deptKeys.length} Departments
                                  </span>
                                </div>
                              </div>

                              {/* Department list */}

                              <div className="relative p-2">
                                {(
                                  link.children as {
                                    label: string;
                                    code: string;
                                    href: string;
                                  }[]
                                ).map((child) => (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    onClick={() =>
                                      setDeptDropdownOpen(false)
                                    }
                                    className="
                                      group/item
                                      flex items-center gap-3
                                      rounded-xl px-3 py-3
                                      transition-all duration-200
                                      hover:bg-[#F0FAFC]
                                    "
                                  >
                                    <div
                                      className={`
                                        flex h-10 w-10 shrink-0
                                        items-center justify-center
                                        rounded-xl
                                        border
                                        font-mono text-[10px]
                                        font-bold
                                        transition-all duration-200
                                        group-hover/item:scale-105
                                        ${deptColors[child.code] || "text-[#087EA4] bg-[#087EA4]/10 border-[#087EA4]/15"}
                                      `}
                                    >
                                      {child.code}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                      <p className="truncate text-sm font-semibold text-[#55727D] transition-colors group-hover/item:text-[#123B4A]">
                                        {child.label}
                                      </p>

                                      <p className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.08em] text-[#55727D]/55">
                                        Academic department
                                      </p>
                                    </div>

                                    <FaArrowRight
                                      size={10}
                                      className="
                                        -translate-x-1
                                        text-transparent
                                        transition-all duration-200
                                        group-hover/item:translate-x-0
                                        group-hover/item:text-[#087EA4]
                                      "
                                    />
                                  </Link>
                                ))}
                              </div>

                              {/* Footer */}

                              <div className="border-t border-[#087EA4]/8 p-2">
                                <Link
                                  href="/departments"
                                  onClick={() =>
                                    setDeptDropdownOpen(false)
                                  }
                                  className="
                                    group flex items-center
                                    justify-center gap-2
                                    rounded-xl px-3 py-2.5
                                    text-xs font-semibold
                                    text-[#55727D]
                                    transition-all
                                    hover:bg-[#F0FAFC]
                                    hover:text-[#087EA4]
                                  "
                                >
                                  View all departments

                                  <FaArrowRight
                                    size={9}
                                    className="transition-transform duration-200 group-hover:translate-x-1"
                                  />
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="group relative rounded-xl px-3.5 py-2.5 text-sm font-semibold"
                    >
                      {pathname === link.href && (
                        <motion.div
                          layoutId="nav-pill"
                          className="
                            absolute inset-0
                            rounded-xl
                            border border-[#087EA4]/10
                            bg-[#087EA4]/8
                          "
                          transition={{
                            type: "spring",
                            bounce: 0.18,
                            duration: 0.45,
                          }}
                        />
                      )}

                      {pathname !== link.href && (
                        <span className="absolute inset-0 -z-10 rounded-xl bg-[#087EA4]/0 transition-all duration-200 group-hover:bg-[#087EA4]/5" />
                      )}

                      <span
                        className={`
                          relative z-10 transition-colors duration-200
                          ${
                            pathname === link.href
                              ? "text-[#075985]"
                              : "text-[#55727D] group-hover:text-[#123B4A]"
                          }
                        `}
                      >
                        {link.label}
                      </span>

                      {pathname === link.href && (
                        <motion.span
                          layoutId="active-dot"
                          className="
                            absolute bottom-1 left-1/2
                            h-0.5 w-4
                            -translate-x-1/2
                            rounded-full
                            bg-[#2DD4BF]
                            shadow-[0_0_10px_rgba(45,212,191,0.45)]
                          "
                        />
                      )}
                    </Link>
                  )
                )}
              </div>

              {/* =================================================
                  AUTH AREA
              ================================================= */}

              <div className="hidden items-center gap-3 lg:flex">
                {loading ? (
                  <div className="h-10 w-32 animate-pulse rounded-full bg-[#087EA4]/5" />
                ) : user ? (
                  <div id="user-dropdown" className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setDropdownOpen((open) => !open)
                      }
                      className="
                        group flex items-center gap-2.5
                        rounded-full
                        border border-[#087EA4]/10
                        bg-white
                        py-1.5 pl-1.5 pr-3
                        shadow-[0_4px_16px_rgba(7,89,133,0.07)]
                        transition-all duration-200
                        hover:border-[#087EA4]/20
                        hover:shadow-[0_6px_22px_rgba(7,89,133,0.12)]
                      "
                    >
                      {user.photo ? (
                        <Image
                          key={user.photo}
                          src={user.photo}
                          alt={user.name}
                          width={30}
                          height={30}
                          className="h-7 w-7 rounded-full object-cover ring-1 ring-[#087EA4]/10"
                        />
                      ) : (
                        <div
                          className={`
                            flex h-7 w-7 items-center
                            justify-center rounded-full
                            bg-gradient-to-br
                            ${roleColor[user.role] || "from-blue-500 to-cyan-500"}
                            text-xs font-bold text-white
                          `}
                        >
                          {user.name?.[0]?.toUpperCase()}
                        </div>
                      )}

                      <div className="max-w-[90px] text-left">
                        <p className="truncate text-xs font-bold leading-tight text-[#123B4A]">
                          {firstName}
                        </p>

                        <p className="mt-0.5 truncate text-[9px] capitalize text-[#55727D]">
                          {user.role}
                        </p>
                      </div>

                      <FaChevronDown
                        className={`
                          ml-0.5 text-[9px] text-[#55727D]
                          transition-transform duration-300
                          ${
                            dropdownOpen
                              ? "rotate-180 text-[#087EA4]"
                              : ""
                          }
                        `}
                      />
                    </button>

                    {/* =================================================
                        USER DROPDOWN
                    ================================================= */}

                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{
                            opacity: 0,
                            y: 10,
                            scale: 0.97,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                          }}
                          exit={{
                            opacity: 0,
                            y: 8,
                            scale: 0.98,
                          }}
                          transition={{ duration: 0.16 }}
                          className="
                            absolute right-0 top-full
                            z-[100] mt-3 w-[280px]
                          "
                        >
                          <div
                            className="
                              relative overflow-hidden
                              rounded-2xl
                              border border-[#087EA4]/10
                              bg-white
                              shadow-[0_25px_70px_rgba(7,89,133,0.16)]
                              backdrop-blur-2xl
                            "
                          >
                            <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#2DD4BF]/10 blur-[60px]" />

                            {/* Profile */}

                            <div className="relative border-b border-[#087EA4]/8 p-4">
                              <div className="flex items-center gap-3">
                                {user.photo ? (
                                  <Image
                                    key={user.photo}
                                    src={user.photo}
                                    alt={user.name}
                                    width={44}
                                    height={44}
                                    className="h-11 w-11 rounded-xl object-cover ring-1 ring-[#087EA4]/10"
                                  />
                                ) : (
                                  <div
                                    className={`
                                      flex h-11 w-11
                                      items-center justify-center
                                      rounded-xl
                                      bg-gradient-to-br
                                      ${roleColor[user.role] || "from-blue-500 to-cyan-500"}
                                      font-bold text-white
                                    `}
                                  >
                                    {user.name?.[0]?.toUpperCase()}
                                  </div>
                                )}

                                <div className="min-w-0">
                                  <p className="truncate text-sm font-bold text-[#123B4A]">
                                    {user.name}
                                  </p>

                                  <span
                                    className={`
                                      mt-1 inline-flex rounded-full
                                      bg-gradient-to-r
                                      ${roleColor[user.role] || "from-blue-500 to-cyan-500"}
                                      px-2 py-0.5
                                      text-[8px] font-bold uppercase
                                      tracking-wider text-white
                                    `}
                                  >
                                    {user.role}
                                  </span>
                                </div>
                              </div>

                              {user.department && (
                                <div className="mt-3 flex items-center gap-2 rounded-xl border border-[#087EA4]/8 bg-[#F0FAFC] px-3 py-2 text-[10px] font-medium text-[#55727D]">
                                  <FaGraduationCap
                                    className="text-[#087EA4]"
                                    size={11}
                                  />

                                  <span className="truncate">
                                    {DEPARTMENTS[
                                      user.department as Department
                                    ] || user.department}
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Links */}

                            <div className="border-b border-[#087EA4]/8 p-2">
                              {[
                                {
                                  href: "/dashboard",
                                  icon: (
                                    <FaTachometerAlt size={12} />
                                  ),
                                  label: "Dashboard",
                                },
                                {
                                  href: "/profile",
                                  icon: <FaUser size={12} />,
                                  label: "My Profile",
                                },
                                ...(user.role === "admin"
                                  ? [
                                      {
                                        href: "/admin",
                                        icon: <FaCog size={12} />,
                                        label: "Admin Panel",
                                      },
                                    ]
                                  : []),
                              ].map((item) => (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  onClick={() =>
                                    setDropdownOpen(false)
                                  }
                                  className={`
                                    group flex items-center gap-3
                                    rounded-xl px-3 py-2.5
                                    text-sm font-medium
                                    transition-all duration-150
                                    ${
                                      pathname === item.href
                                        ? "bg-[#087EA4]/8 text-[#075985]"
                                        : "text-[#55727D] hover:bg-[#F0FAFC] hover:text-[#123B4A]"
                                    }
                                  `}
                                >
                                  <span
                                    className={`
                                      transition-colors
                                      ${
                                        pathname === item.href
                                          ? "text-[#087EA4]"
                                          : "text-[#55727D] group-hover:text-[#087EA4]"
                                      }
                                    `}
                                  >
                                    {item.icon}
                                  </span>

                                  {item.label}
                                </Link>
                              ))}
                            </div>

                            {/* Sign out */}

                            <div className="p-2">
                              <button
                                type="button"
                                onClick={handleSignOut}
                                className="
                                  group flex w-full items-center
                                  gap-3 rounded-xl px-3 py-2.5
                                  text-sm font-medium
                                  text-red-500/70
                                  transition-all
                                  hover:bg-red-50
                                  hover:text-red-600
                                "
                              >
                                <FaSignOutAlt
                                  size={12}
                                  className="transition-transform group-hover:-translate-x-0.5"
                                />

                                Sign Out
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link
                      href="/login"
                      className="
                        rounded-xl px-4 py-2.5
                        text-sm font-semibold
                        text-[#55727D]
                        transition-all
                        hover:bg-[#087EA4]/5
                        hover:text-[#123B4A]
                      "
                    >
                      Sign In
                    </Link>

                    <Link
                      href="/register"
                      className="
                        group relative overflow-hidden
                        rounded-xl
                        bg-[#087EA4]
                        px-5 py-2.5
                        text-sm font-bold
                        text-white
                        shadow-[0_7px_20px_rgba(8,126,164,0.20)]
                        transition-all duration-300
                        hover:-translate-y-0.5
                        hover:bg-[#075985]
                        hover:shadow-[0_10px_28px_rgba(8,126,164,0.28)]
                      "
                    >
                      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                      <span className="relative">
                        Register
                      </span>
                    </Link>
                  </div>
                )}
              </div>

              {/* =================================================
                  MOBILE BUTTON
              ================================================= */}

              <button
                type="button"
                className="
                  relative flex h-10 w-10
                  items-center justify-center
                  rounded-xl
                  border border-[#087EA4]/10
                  bg-white
                  text-[#075985]
                  shadow-[0_4px_14px_rgba(7,89,133,0.07)]
                  transition-all
                  hover:border-[#087EA4]/20
                  hover:bg-[#F0FAFC]
                  lg:hidden
                "
                onClick={() =>
                  setMobileOpen((open) => !open)
                }
                aria-label="Toggle navigation"
                aria-expanded={mobileOpen}
              >
                <AnimatePresence mode="wait">
                  {mobileOpen ? (
                    <motion.div
                      key="close"
                      initial={{
                        rotate: -90,
                        opacity: 0,
                      }}
                      animate={{
                        rotate: 0,
                        opacity: 1,
                      }}
                      exit={{
                        rotate: 90,
                        opacity: 0,
                      }}
                      transition={{ duration: 0.15 }}
                    >
                      <FaTimes size={16} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="open"
                      initial={{
                        rotate: 90,
                        opacity: 0,
                      }}
                      animate={{
                        rotate: 0,
                        opacity: 1,
                      }}
                      exit={{
                        rotate: -90,
                        opacity: 0,
                      }}
                      transition={{ duration: 0.15 }}
                    >
                      <FaBars size={16} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </nav>

          {/* ====================================================
              MOBILE MENU
          ===================================================== */}

          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{
                  height: 0,
                  opacity: 0,
                }}
                animate={{
                  height: "auto",
                  opacity: 1,
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.25,
                  ease: "easeOut",
                }}
                className="overflow-hidden bg-white lg:hidden"
              >
                <div className="border-t border-[#087EA4]/8 px-4 pb-5 pt-3">
                  {/* Mobile user */}

                  {user && (
                    <div
                      className="
                        mb-3 flex items-center gap-3
                        rounded-2xl
                        border border-[#087EA4]/10
                        bg-[#F0FAFC]
                        px-4 py-3
                      "
                    >
                      {user.photo ? (
                        <Image
                          key={user.photo}
                          src={user.photo}
                          alt={user.name}
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-xl object-cover ring-1 ring-[#087EA4]/10"
                        />
                      ) : (
                        <div
                          className={`
                            flex h-10 w-10 shrink-0
                            items-center justify-center
                            rounded-xl
                            bg-gradient-to-br
                            ${roleColor[user.role] || "from-blue-500 to-cyan-500"}
                            text-sm font-bold text-white
                          `}
                        >
                          {user.name?.[0]?.toUpperCase()}
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-[#123B4A]">
                          {user.name}
                        </p>

                        <p className="mt-0.5 text-[10px] capitalize text-[#55727D]">
                          {user.role}
                        </p>
                      </div>

                      <Link
                        href="/dashboard"
                        onClick={() =>
                          setMobileOpen(false)
                        }
                        className="
                          shrink-0 rounded-lg
                          bg-[#087EA4]/8
                          px-3 py-1.5
                          text-[10px] font-bold
                          text-[#087EA4]
                          transition-colors
                          hover:bg-[#087EA4]/15
                        "
                      >
                        Dashboard
                      </Link>
                    </div>
                  )}

                  {/* Navigation */}

                  <div className="space-y-1">
                    {navLinks.map((link) =>
                      link.children ? (
                        <div key={link.label}>
                          <button
                            type="button"
                            onClick={() =>
                              setDeptOpen((open) => !open)
                            }
                            className={`
                              flex w-full items-center
                              justify-between
                              rounded-xl px-3 py-3
                              text-sm font-semibold
                              transition-all
                              ${
                                pathname.startsWith(
                                  "/departments"
                                )
                                  ? "bg-[#087EA4]/8 text-[#075985]"
                                  : "text-[#55727D] hover:bg-[#F0FAFC] hover:text-[#123B4A]"
                              }
                            `}
                          >
                            {link.label}

                            <FaChevronDown
                              className={`
                                text-[9px]
                                transition-transform duration-300
                                ${
                                  deptOpen
                                    ? "rotate-180 text-[#087EA4]"
                                    : "text-[#55727D]"
                                }
                              `}
                            />
                          </button>

                          <AnimatePresence>
                            {deptOpen && (
                              <motion.div
                                initial={{
                                  height: 0,
                                  opacity: 0,
                                }}
                                animate={{
                                  height: "auto",
                                  opacity: 1,
                                }}
                                exit={{
                                  height: 0,
                                  opacity: 0,
                                }}
                                transition={{
                                  duration: 0.2,
                                }}
                                className="overflow-hidden"
                              >
                                <div className="ml-3 space-y-1 border-l border-[#087EA4]/15 py-1 pl-3">
                                  {(
                                    link.children as {
                                      label: string;
                                      code: string;
                                      href: string;
                                    }[]
                                  ).map((child) => (
                                    <Link
                                      key={child.href}
                                      href={child.href}
                                      onClick={() =>
                                        setMobileOpen(false)
                                      }
                                      className="
                                        flex items-center gap-3
                                        rounded-lg px-3 py-2.5
                                        transition-colors
                                        hover:bg-[#F0FAFC]
                                      "
                                    >
                                      <span
                                        className={`
                                          rounded-md px-1.5 py-1
                                          font-mono text-[9px]
                                          font-bold
                                          ${
                                            deptColors[
                                              child.code
                                            ] ||
                                            "text-[#087EA4] bg-[#087EA4]/10 border-[#087EA4]/15"
                                          }
                                        `}
                                      >
                                        {child.code}
                                      </span>

                                      <span className="text-xs font-medium text-[#55727D]">
                                        {child.label}
                                      </span>
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() =>
                            setMobileOpen(false)
                          }
                          className={`
                            flex items-center
                            rounded-xl px-3 py-3
                            text-sm font-semibold
                            transition-all
                            ${
                              pathname === link.href
                                ? "border border-[#087EA4]/10 bg-[#087EA4]/8 text-[#075985]"
                                : "text-[#55727D] hover:bg-[#F0FAFC] hover:text-[#123B4A]"
                            }
                          `}
                        >
                          {link.label}
                        </Link>
                      )
                    )}
                  </div>

                  {/* Mobile account */}

                  <div className="mt-3 border-t border-[#087EA4]/8 pt-3">
                    {user ? (
                      <div className="space-y-1">
                        <Link
                          href="/profile"
                          onClick={() =>
                            setMobileOpen(false)
                          }
                          className="
                            flex items-center gap-3
                            rounded-xl px-3 py-3
                            text-sm font-medium
                            text-[#55727D]
                            transition-all
                            hover:bg-[#F0FAFC]
                            hover:text-[#123B4A]
                          "
                        >
                          <FaUser
                            size={13}
                            className="text-[#087EA4]"
                          />
                          My Profile
                        </Link>

                        {user.role === "admin" && (
                          <Link
                            href="/admin"
                            onClick={() =>
                              setMobileOpen(false)
                            }
                            className="
                              flex items-center gap-3
                              rounded-xl px-3 py-3
                              text-sm font-medium
                              text-[#55727D]
                              transition-all
                              hover:bg-[#F0FAFC]
                              hover:text-[#123B4A]
                            "
                          >
                            <FaCog
                              size={13}
                              className="text-[#087EA4]"
                            />
                            Admin Panel
                          </Link>
                        )}

                        <button
                          type="button"
                          onClick={handleSignOut}
                          className="
                            flex w-full items-center gap-3
                            rounded-xl px-3 py-3
                            text-sm font-medium
                            text-red-500/70
                            transition-all
                            hover:bg-red-50
                            hover:text-red-600
                          "
                        >
                          <FaSignOutAlt size={13} />
                          Sign Out
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href="/login"
                          onClick={() =>
                            setMobileOpen(false)
                          }
                          className="
                            rounded-xl
                            border border-[#087EA4]/10
                            bg-white
                            py-3
                            text-center
                            text-sm font-semibold
                            text-[#55727D]
                            shadow-sm
                            transition-all
                            hover:bg-[#F0FAFC]
                            hover:text-[#123B4A]
                          "
                        >
                          Sign In
                        </Link>

                        <Link
                          href="/register"
                          onClick={() =>
                            setMobileOpen(false)
                          }
                          className="
                            rounded-xl
                            bg-[#087EA4]
                            py-3
                            text-center
                            text-sm font-bold
                            text-white
                            shadow-[0_6px_18px_rgba(8,126,164,0.18)]
                            transition-all
                            hover:bg-[#075985]
                          "
                        >
                          Register
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* ========================================================
          NAVBAR SPACER
      ======================================================== */}

      <div className="h-[108px]" />
    </>
  );
}
