
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
  admin: "from-red-400 to-rose-600",
  teacher: "from-teal-400 to-emerald-500",
  alumni: "from-amber-400 to-orange-500",
  student: "from-blue-400 to-cyan-500",
};

const deptColors: Record<string, string> = {
  AQC: "text-blue-300",
  FBG: "text-emerald-300",
  FMN: "text-violet-300",
  FST: "text-amber-300",
  MFO: "text-cyan-300",
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

  /* ------------------------------------------------------------
     Scroll state
  ------------------------------------------------------------ */

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

  /* ------------------------------------------------------------
     Outside click
  ------------------------------------------------------------ */

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

  /* ------------------------------------------------------------
     Sign out
  ------------------------------------------------------------ */

  const handleSignOut = async () => {
    await signOut();

    setDropdownOpen(false);
    setMobileOpen(false);

    router.push("/");
  };

  const firstName = user?.name?.split(" ")[0] || "";

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 w-full">
        <div
          className={`
            relative w-full
            overflow-visible
            border-b
            transition-all duration-500
            ${
              scrolled
                ? "border-white/[0.07] bg-[#020b18]/90 shadow-[0_12px_45px_rgba(0,0,0,0.35)]"
                : "border-white/[0.08] bg-[#06182a]/85 shadow-[0_8px_30px_rgba(0,0,0,0.20)]"
            }
            backdrop-blur-2xl
          `}
        >
          {/* =====================================================
              ATMOSPHERIC NAVBAR GLOW
          ====================================================== */}

          <div className="pointer-events-none absolute -left-24 -top-28 h-56 w-56 rounded-full bg-cyan-400/[0.035] blur-[100px]" />

          <div className="pointer-events-none absolute -right-24 -top-24 h-52 w-52 rounded-full bg-sky-400/[0.025] blur-[100px]" />

          {/* Top glass highlight */}

          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/15 to-transparent" />

          {/* =====================================================
              TOP INFORMATION BAR
          ====================================================== */}

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
            <div className="flex items-center justify-between border-b border-white/[0.045] px-5 py-2 sm:px-7">
              <span className="flex items-center gap-2 text-[10px] text-slate-500">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-50" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-300" />
                </span>

                Patuakhali Science and Technology University
              </span>

              <span className="hidden items-center gap-5 text-[10px] text-slate-600 md:flex">
                <a
                  href="tel:+880"
                  className="flex items-center gap-1.5 transition-colors hover:text-slate-300"
                >
                  <FaPhone size={8} />
                  +880-0441-XXXXXX
                </a>

                <a
                  href="mailto:fisheries@pstu.ac.bd"
                  className="flex items-center gap-1.5 transition-colors hover:text-slate-300"
                >
                  <FaEnvelope size={8} />
                  fisheries@pstu.ac.bd
                </a>
              </span>
            </div>
          </div>

          {/* =====================================================
              MAIN NAVIGATION
          ====================================================== */}

          <nav className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex h-[68px] items-center justify-between gap-4">
              {/* =================================================
                  LOGO
              ================================================== */}

              <Link
                href="/"
                className="group flex shrink-0 items-center gap-3"
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-cyan-400/[0.10] blur-lg transition-all duration-500 group-hover:bg-cyan-400/[0.20]" />

                  <div
                    className="
                      relative flex h-10 w-10
                      items-center justify-center
                      overflow-hidden rounded-full
                      border border-white/[0.10]
                      bg-white/[0.035]
                      shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
                      transition-all duration-300
                      group-hover:scale-105
                      group-hover:border-cyan-300/20
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
                  <p className="font-display text-sm font-bold leading-tight tracking-wide text-white">
                    Faculty of Fisheries
                  </p>

                  <div className="mt-0.5 flex items-center gap-1.5">
                    <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-cyan-300/65">
                      PSTU
                    </span>

                    <span className="h-0.5 w-0.5 rounded-full bg-white/20" />

                    <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-slate-600">
                      Bangladesh
                    </span>
                  </div>
                </div>
              </Link>

              {/* =================================================
                  DESKTOP NAVIGATION
              ================================================== */}

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
                        className="
                          group relative flex items-center gap-2
                          rounded-xl px-3.5 py-2.5
                          text-sm font-medium
                          text-slate-500
                          transition-all duration-200
                          hover:bg-white/[0.035]
                          hover:text-slate-200
                        "
                      >
                        {link.label}

                        <FaChevronDown
                          className={`
                            text-[9px]
                            text-slate-700
                            transition-transform duration-300
                            ${
                              deptDropdownOpen
                                ? "rotate-180 text-cyan-300/70"
                                : ""
                            }
                          `}
                        />
                      </button>

                      {/* Department dropdown */}

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
                              z-[100] mt-3 w-[340px]
                              -translate-x-1/2
                            "
                          >
                            <div
                              className="
                                relative overflow-hidden
                                rounded-2xl
                                border border-white/[0.07]
                                bg-[#061522]/95
                                shadow-[0_25px_70px_rgba(0,0,0,0.55)]
                                backdrop-blur-2xl
                              "
                            >
                              {/* Glow */}

                              <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-cyan-400/[0.05] blur-[70px]" />

                              <div className="pointer-events-none absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-sky-400/[0.035] blur-[70px]" />

                              {/* Header */}

                              <div className="relative border-b border-white/[0.05] px-5 pb-4 pt-5">
                                <div className="flex items-center gap-3">
                                  <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.05] text-cyan-300">
                                    <FaFish size={12} />
                                  </div>

                                  <div>
                                    <p className="text-[9px] uppercase tracking-[0.22em] text-cyan-300/45">
                                      Explore
                                    </p>

                                    <p className="mt-0.5 text-sm font-semibold text-white">
                                      Departments
                                    </p>
                                  </div>
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
                                      hover:bg-white/[0.04]
                                    "
                                  >
                                    <div
                                      className={`
                                        flex h-9 w-9 shrink-0
                                        items-center justify-center
                                        rounded-xl
                                        border border-white/[0.06]
                                        bg-white/[0.025]
                                        font-mono text-[10px]
                                        font-bold
                                        transition-all duration-200
                                        group-hover/item:border-white/[0.10]
                                        group-hover/item:bg-white/[0.05]
                                        ${deptColors[child.code] || "text-cyan-300"}
                                      `}
                                    >
                                      {child.code}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                      <p className="truncate text-sm font-medium text-slate-400 transition-colors group-hover/item:text-white">
                                        {child.label}
                                      </p>

                                      <p className="mt-0.5 text-[9px] uppercase tracking-[0.08em] text-slate-700">
                                        Academic department
                                      </p>
                                    </div>

                                    <span className="translate-x-[-4px] text-transparent transition-all duration-200 group-hover/item:translate-x-0 group-hover/item:text-cyan-300/70">
                                      →
                                    </span>
                                  </Link>
                                ))}
                              </div>

                              {/* Footer */}

                              <div className="border-t border-white/[0.05] p-2">
                                <Link
                                  href="/departments"
                                  onClick={() =>
                                    setDeptDropdownOpen(false)
                                  }
                                  className="
                                    group flex items-center
                                    justify-center gap-2
                                    rounded-xl px-3 py-2.5
                                    text-xs font-medium
                                    text-slate-600
                                    transition-all
                                    hover:bg-white/[0.035]
                                    hover:text-slate-300
                                  "
                                >
                                  View all departments

                                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                                    →
                                  </span>
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
                      className="group relative rounded-xl px-3.5 py-2.5 text-sm font-medium"
                    >
                      {pathname === link.href && (
                        <motion.div
                          layoutId="nav-pill"
                          className="
                            absolute inset-0
                            rounded-xl
                            border border-cyan-300/[0.08]
                            bg-cyan-400/[0.06]
                            shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]
                          "
                          transition={{
                            type: "spring",
                            bounce: 0.18,
                            duration: 0.45,
                          }}
                        />
                      )}

                      {pathname !== link.href && (
                        <span className="absolute inset-0 -z-10 rounded-xl bg-white/0 transition-all duration-200 group-hover:bg-white/[0.035]" />
                      )}

                      <span
                        className={`
                          relative z-10 transition-colors duration-200
                          ${
                            pathname === link.href
                              ? "text-cyan-200"
                              : "text-slate-500 group-hover:text-slate-200"
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
                            bg-cyan-300
                            shadow-[0_0_10px_rgba(103,232,249,0.55)]
                          "
                        />
                      )}
                    </Link>
                  )
                )}
              </div>

              {/* =================================================
                  AUTH AREA
              ================================================== */}

              <div className="hidden items-center gap-3 lg:flex">
                {loading ? (
                  <div className="h-10 w-32 animate-pulse rounded-full border border-white/[0.06] bg-white/[0.025]" />
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
                        border border-white/[0.07]
                        bg-white/[0.025]
                        py-1.5 pl-1.5 pr-3
                        text-white
                        shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]
                        transition-all duration-200
                        hover:border-white/[0.12]
                        hover:bg-white/[0.05]
                      "
                    >
                      {user.photo ? (
                        <Image
                          key={user.photo}
                          src={user.photo}
                          alt={user.name}
                          width={30}
                          height={30}
                          className="h-7 w-7 rounded-full object-cover ring-1 ring-white/10"
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
                        <p className="truncate text-xs font-semibold leading-tight text-slate-200">
                          {firstName}
                        </p>

                        <p className="mt-0.5 truncate text-[9px] capitalize text-slate-600">
                          {user.role}
                        </p>
                      </div>

                      <FaChevronDown
                        className={`
                          ml-0.5 text-[9px] text-slate-700
                          transition-transform duration-300
                          ${
                            dropdownOpen
                              ? "rotate-180 text-cyan-300/70"
                              : ""
                          }
                        `}
                      />
                    </button>

                    {/* User dropdown */}

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
                            z-[100] mt-3 w-[270px]
                          "
                        >
                          <div
                            className="
                              relative overflow-hidden
                              rounded-2xl
                              border border-white/[0.07]
                              bg-[#061522]/95
                              shadow-[0_25px_70px_rgba(0,0,0,0.55)]
                              backdrop-blur-2xl
                            "
                          >
                            {/* Glow */}

                            <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-400/[0.05] blur-[60px]" />

                            {/* Profile */}

                            <div className="relative border-b border-white/[0.05] p-4">
                              <div className="flex items-center gap-3">
                                {user.photo ? (
                                  <Image
                                    key={user.photo}
                                    src={user.photo}
                                    alt={user.name}
                                    width={44}
                                    height={44}
                                    className="h-11 w-11 rounded-xl object-cover ring-1 ring-white/10"
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
                                  <p className="truncate text-sm font-semibold text-white">
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
                                <div className="mt-3 flex items-center gap-2 rounded-xl border border-white/[0.05] bg-white/[0.025] px-3 py-2 text-[10px] text-slate-600">
                                  <FaGraduationCap
                                    className="text-cyan-300/50"
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

                            <div className="border-b border-white/[0.05] p-2">
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
                                    text-sm transition-all duration-150
                                    ${
                                      pathname === item.href
                                        ? "bg-cyan-400/[0.06] text-cyan-200"
                                        : "text-slate-500 hover:bg-white/[0.035] hover:text-slate-200"
                                    }
                                  `}
                                >
                                  <span
                                    className={`
                                      transition-colors
                                      ${
                                        pathname === item.href
                                          ? "text-cyan-300"
                                          : "text-slate-700 group-hover:text-cyan-300/70"
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
                                  text-sm text-red-300/60
                                  transition-all
                                  hover:bg-red-400/[0.05]
                                  hover:text-red-300
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
                        text-sm font-medium
                        text-slate-500
                        transition-all
                        hover:bg-white/[0.035]
                        hover:text-slate-200
                      "
                    >
                      Sign In
                    </Link>

                    <Link
                      href="/register"
                      className="
                        group relative overflow-hidden
                        rounded-xl
                        border border-cyan-300/15
                        bg-cyan-400/[0.08]
                        px-5 py-2.5
                        text-sm font-semibold
                        text-cyan-100
                        shadow-[0_8px_25px_rgba(34,211,238,0.06)]
                        transition-all duration-300
                        hover:-translate-y-0.5
                        hover:border-cyan-300/25
                        hover:bg-cyan-400/[0.13]
                        hover:shadow-[0_10px_30px_rgba(34,211,238,0.10)]
                      "
                    >
                      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                      <span className="relative">
                        Register
                      </span>
                    </Link>
                  </div>
                )}
              </div>

              {/* =================================================
                  MOBILE BUTTON
              ================================================== */}

              <button
                type="button"
                className="
                  relative flex h-10 w-10
                  items-center justify-center
                  rounded-xl
                  border border-white/[0.07]
                  bg-white/[0.025]
                  text-slate-300
                  shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]
                  transition-all
                  hover:border-cyan-300/15
                  hover:bg-white/[0.05]
                  hover:text-white
                  lg:hidden
                "
                onClick={() => setMobileOpen((open) => !open)}
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

          {/* =====================================================
              MOBILE MENU
          ====================================================== */}

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
                className="overflow-hidden lg:hidden"
              >
                <div className="border-t border-white/[0.05] px-4 pb-4 pt-3">
                  {/* Mobile user */}

                  {user && (
                    <div
                      className="
                        mb-3 flex items-center gap-3
                        rounded-2xl
                        border border-white/[0.06]
                        bg-white/[0.025]
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
                          className="h-10 w-10 rounded-xl object-cover ring-1 ring-white/10"
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
                        <p className="truncate text-sm font-semibold text-white">
                          {user.name}
                        </p>

                        <p className="mt-0.5 text-[10px] capitalize text-slate-600">
                          {user.role}
                        </p>
                      </div>

                      <Link
                        href="/dashboard"
                        onClick={() => setMobileOpen(false)}
                        className="
                          shrink-0 rounded-lg
                          border border-white/[0.07]
                          bg-white/[0.025]
                          px-3 py-1.5
                          text-[10px] font-medium
                          text-slate-400
                          transition-colors
                          hover:border-cyan-300/10
                          hover:bg-cyan-400/[0.05]
                          hover:text-cyan-200
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
                            className="
                              flex w-full items-center
                              justify-between
                              rounded-xl px-3 py-3
                              text-sm font-medium
                              text-slate-500
                              transition-all
                              hover:bg-white/[0.035]
                              hover:text-slate-200
                            "
                          >
                            {link.label}

                            <FaChevronDown
                              className={`
                                text-[9px] text-slate-700
                                transition-transform duration-300
                                ${
                                  deptOpen
                                    ? "rotate-180 text-cyan-300/70"
                                    : ""
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
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="ml-3 space-y-1 border-l border-white/[0.07] py-1 pl-3">
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
                                        hover:bg-white/[0.035]
                                      "
                                    >
                                      <span
                                        className={`
                                          font-mono text-[10px]
                                          font-bold
                                          ${deptColors[child.code] || "text-cyan-300"}
                                        `}
                                      >
                                        {child.code}
                                      </span>

                                      <span className="text-xs text-slate-500">
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
                          onClick={() => setMobileOpen(false)}
                          className={`
                            flex items-center
                            rounded-xl px-3 py-3
                            text-sm font-medium
                            transition-all
                            ${
                              pathname === link.href
                                ? "border border-cyan-300/[0.08] bg-cyan-400/[0.06] text-cyan-200"
                                : "text-slate-500 hover:bg-white/[0.035] hover:text-slate-200"
                            }
                          `}
                        >
                          {link.label}
                        </Link>
                      )
                    )}
                  </div>

                  {/* Mobile account */}

                  <div className="mt-3 border-t border-white/[0.05] pt-3">
                    {user ? (
                      <div className="space-y-1">
                        <Link
                          href="/profile"
                          onClick={() => setMobileOpen(false)}
                          className="
                            flex items-center gap-3
                            rounded-xl px-3 py-3
                            text-sm text-slate-500
                            transition-all
                            hover:bg-white/[0.035]
                            hover:text-slate-200
                          "
                        >
                          <FaUser size={13} />
                          My Profile
                        </Link>

                        {user.role === "admin" && (
                          <Link
                            href="/admin"
                            onClick={() => setMobileOpen(false)}
                            className="
                              flex items-center gap-3
                              rounded-xl px-3 py-3
                              text-sm text-slate-500
                              transition-all
                              hover:bg-white/[0.035]
                              hover:text-slate-200
                            "
                          >
                            <FaCog size={13} />
                            Admin Panel
                          </Link>
                        )}

                        <button
                          type="button"
                          onClick={handleSignOut}
                          className="
                            flex w-full items-center gap-3
                            rounded-xl px-3 py-3
                            text-sm text-red-300/60
                            transition-all
                            hover:bg-red-400/[0.05]
                            hover:text-red-300
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
                          onClick={() => setMobileOpen(false)}
                          className="
                            rounded-xl
                            border border-white/[0.07]
                            bg-white/[0.025]
                            py-3
                            text-center
                            text-sm font-medium
                            text-slate-500
                            transition-all
                            hover:bg-white/[0.05]
                            hover:text-slate-200
                          "
                        >
                          Sign In
                        </Link>

                        <Link
                          href="/register"
                          onClick={() => setMobileOpen(false)}
                          className="
                            rounded-xl
                            border border-cyan-300/15
                            bg-cyan-400/[0.08]
                            py-3
                            text-center
                            text-sm font-semibold
                            text-cyan-100
                            transition-all
                            hover:bg-cyan-400/[0.13]
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

      {/* Navbar spacer */}

      <div className="h-24" />
    </>
  );
}

