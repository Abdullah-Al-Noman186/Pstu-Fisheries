
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import {
  FaChevronDown,
  FaUser,
  FaSignOutAlt,
  FaTachometerAlt,
  FaCog,
  FaPhone,
  FaEnvelope,
  FaHome,
  FaUserGraduate,
  FaUsers,
  FaArchive,
} from "react-icons/fa";
import Image from "next/image";

const navLinks = [
  { label: "Home", mobileLabel: "Home", href: "/", icon: FaHome },
  { label: "Our Alumni", mobileLabel: "Alumni", href: "/Ouralumni", icon: FaUserGraduate },
  { label: "Our Students", mobileLabel: "Students", href: "/ourstudent", icon: FaUsers },
  { label: "Archive", mobileLabel: "Archive", href: "/archive", icon: FaArchive },
];

const roleColor: Record<string, string> = {
  admin: "from-[#075985] to-[#087EA4]",
  teacher: "from-[#087EA4] to-[#2DD4BF]",
  alumni: "from-[#087EA4] to-[#0891B2]",
  student: "from-[#087EA4] to-[#2DD4BF]",
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { user, signOut, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  /* ============================================================
     SCROLL
  ============================================================ */

  useEffect(() => {
    let frame = 0;
    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        frame = 0;
      });
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  /* ============================================================
     CLOSE USER DROPDOWN ON OUTSIDE CLICK
  ============================================================ */

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (!target.closest("#user-dropdown")) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDropdownOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  /* ============================================================
     CLOSE PROFILE MENU WHEN ROUTE CHANGES
  ============================================================ */

  useEffect(() => {
    setDropdownOpen(false);
  }, [pathname]);

  /* ============================================================
     SIGN OUT
  ============================================================ */

  const handleSignOut = async () => {
    await signOut();

    setDropdownOpen(false);

    router.push("/");
  };

  const displayName = user?.name || user?.email?.split("@")[0] || "";

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

          <nav aria-label="Primary navigation" className="w-full px-4 sm:px-6 lg:px-8">
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
                    <Image
                      src="/logo.png"
                      alt="PSTU Logo"
                      width={46}
                      height={46}
                      priority
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                <div className="min-w-0">
                  <p className="truncate text-xs font-bold leading-tight tracking-wide text-[#123B4A] sm:text-sm">
                    Faculty of Fisheries
                  </p>

                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-[#087EA4] sm:text-[9px] sm:tracking-[0.18em]">
                      PSTU
                    </span>

                    <span className="h-1 w-1 rounded-full bg-[#2DD4BF]" />

                    <span className="text-[8px] font-medium uppercase tracking-[0.12em] text-[#55727D] sm:text-[9px] sm:tracking-[0.18em]">
                      Bangladesh
                    </span>
                  </div>
                </div>
              </Link>

              {/* =================================================
                  DESKTOP NAVIGATION
              ================================================= */}

              <div className="hidden items-center gap-1 lg:flex">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={pathname === link.href ? "page" : undefined}
                    className="group relative rounded-xl px-3.5 py-2.5 text-sm font-semibold"
                  >
                    {/* Active background */}

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

                    {/* Hover background */}

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

                    {/* Active indicator */}

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
                ))}
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
                      aria-expanded={dropdownOpen}
                      aria-haspopup="true"
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

                      <div className="max-w-[150px] text-left">
                        <p className="truncate text-xs font-bold leading-tight text-[#123B4A]">
                          {displayName}
                        </p>

                        <p className="mt-0.5 truncate text-[9px] capitalize text-[#55727D]">
                          {user.role === "student" ? "Current student" : user.role}
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
                                    {user.role === "student" ? "Current student" : user.role}
                                  </span>
                                </div>
                              </div>
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
                  <Link
                    href="/login"
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
                    Sign In
                  </Link>
                )}
              </div>

            </div>
          </nav>

          
        </div>
      </header>

      <nav
        aria-label="Mobile navigation"
        className="fixed inset-x-0 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-[60] mx-auto grid w-[min(96vw,30rem)] grid-cols-5 rounded-2xl border border-[#DCEBF0] bg-white/95 p-2 shadow-[0_12px_36px_rgba(18,59,74,0.18)] backdrop-blur-xl lg:hidden"
      >
        {navLinks.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              aria-label={link.label}
              className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl px-1 transition-colors ${active ? "bg-[#EAF5F8] text-[#087EA4]" : "text-[#66828C] hover:bg-[#F7FAFB] hover:text-[#123B4A]"}`}
            >
              <Icon size={17} aria-hidden="true" />
              <span className="text-[10px] font-semibold leading-none">{link.mobileLabel}</span>
            </Link>
          );
        })}
        <Link
          href={user ? "/dashboard" : "/login"}
          aria-label={user ? "Dashboard" : "Sign in"}
          aria-current={user ? (pathname === "/dashboard" ? "page" : undefined) : (pathname === "/login" ? "page" : undefined)}
          className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl px-1 transition-colors ${pathname === "/dashboard" ? "bg-[#EAF5F8] text-[#087EA4]" : "text-[#66828C] hover:bg-[#F7FAFB] hover:text-[#123B4A]"}`}
        >
          <FaUser size={16} aria-hidden="true" />
          <span className="text-[10px] font-semibold leading-none">{user ? "Account" : "Sign in"}</span>
        </Link>
      </nav>

      {/* ========================================================
          NAVBAR SPACER
      ======================================================== */}

      <div aria-hidden="true" className="h-[108px]" />
    </>
  );
}

