"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import {
  FaFish, FaBars, FaTimes, FaChevronDown,
  FaUser, FaSignOutAlt, FaTachometerAlt,
  FaCog, FaGraduationCap, FaPhone, FaEnvelope
} from "react-icons/fa";
import { DEPARTMENTS, Department } from "@/types";
import Image from "next/image";

const deptKeys = Object.keys(DEPARTMENTS) as Department[];

const navLinks = [
  { label: "Home",        href: "/" },
  {
    label: "Departments", href: "/departments",
    children: deptKeys.map(code => ({ label: DEPARTMENTS[code], code, href: `/departments/${code}` }))
  },
  { label: "Teachers",   href: "/teachers" },
  { label: "Our Alumni", href: "/Ouralumni" },
  { label: "Research",   href: "/research" },
];

const roleColor: Record<string, string> = {
  admin:   "from-red-500 to-rose-600",
  teacher: "from-teal-500 to-emerald-600",
  alumni:  "from-amber-500 to-orange-600",
  student: "from-blue-500 to-cyan-600",
};

const deptColors: Record<string, string> = {
  AQC: "text-blue-400",
  FBG: "text-emerald-400",
  FMN: "text-violet-400",
  FST: "text-amber-400",
  MFO: "text-cyan-400",
};

export default function Navbar() {
  const [scrolled, setScrolled]         = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [deptOpen, setDeptOpen]         = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [deptDropdownOpen, setDeptDropdownOpen] = useState(false);
  const { user, signOut, loading }      = useAuth();
  const pathname = usePathname();
  const router   = useRouter();
  const deptRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("#user-dropdown")) setDropdownOpen(false);
      if (deptRef.current && !deptRef.current.contains(e.target as Node)) setDeptDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setDropdownOpen(false);
    router.push("/");
  };

  const firstName = user?.name?.split(" ")[0] || "";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "shadow-2xl shadow-black/30" : ""
        }`}
        style={{
          background: "#0f2d6e",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
        }}>

        {/* ── Top bar ── */}
        <div className={`w-full transition-all duration-300 overflow-hidden ${
          scrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100"
        }`}>
          <div
            className="text-xs text-blue-200/70 py-1.5 px-6 flex justify-between items-center"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse inline-block" />
              Patuakhali Science and Technology University
            </span>
            <span className="hidden md:flex items-center gap-5">
              <a href="tel:+880" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <FaPhone size={9} /> +880-0441-XXXXXX
              </a>
              <a href="mailto:fisheries@pstu.ac.bd" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <FaEnvelope size={9} /> fisheries@pstu.ac.bd
              </a>
            </span>
          </div>
        </div>

        {/* ── Main nav row ── */}
        <nav className="w-full px-4 sm:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
              <img src="/logo.png" alt="PSTU Logo" width={46} height={46} className="rounded-full object-cover  transition-all" />
              <div className="hidden sm:block">
                <p className="text-white font-display font-bold text-sm leading-tight tracking-wide">
                  Faculty of Fisheries
                </p>
                <p className="text-blue-300/70 text-[10px] tracking-widest uppercase font-medium">
                  PSTU · Bangladesh
                </p>
              </div>
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label} className="relative" ref={deptRef}>
                    <button
                      onClick={() => setDeptDropdownOpen(!deptDropdownOpen)}
                      className="flex items-center gap-1 px-3 py-2 text-blue-100/80 hover:text-white text-sm font-medium rounded-lg hover:bg-white/8 transition-all duration-200">
                      {link.label}
                      <FaChevronDown className={`text-[10px] opacity-60 transition-transform duration-300 ${deptDropdownOpen ? "rotate-180" : ""}`} />
                    </button>

                    <AnimatePresence>
                      {deptDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.97 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 z-50">
                          <div
                            className="rounded-2xl overflow-hidden shadow-2xl shadow-black/50"
                            style={{
                              background: "linear-gradient(135deg, rgba(8,15,50,0.97) 0%, rgba(12,30,80,0.97) 100%)",
                              backdropFilter: "blur(24px)",
                              border: "1px solid rgba(255,255,255,0.1)",
                            }}>
                            <div className="p-2">
                              <p className="text-[10px] text-blue-400/60 font-semibold uppercase tracking-widest px-3 py-2">
                                Departments
                              </p>
                              {(link.children as { label: string; code: string; href: string }[]).map(child => (
                                <Link key={child.href} href={child.href}
                                  onClick={() => setDeptDropdownOpen(false)}
                                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors group/item">
                                  <span className={`font-mono font-bold text-xs ${deptColors[child.code] || "text-blue-400"}`}>
                                    {child.code}
                                  </span>
                                  <span className="text-sm text-blue-100/80 group-hover/item:text-white transition-colors">
                                    {child.label}
                                  </span>
                                </Link>
                              ))}
                            </div>
                            <div className="p-2" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                              <Link href="/departments"
                                onClick={() => setDeptDropdownOpen(false)}
                                className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-blue-300/70 hover:text-white text-xs font-medium transition-all hover:bg-white/5">
                                View All Departments →
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link key={link.href} href={link.href}
                    className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      pathname === link.href
                        ? "text-white"
                        : "text-blue-100/70 hover:text-white hover:bg-white/5"
                    }`}>
                    {pathname === link.href && (
                      <motion.div layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg"
                        style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.12)" }}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.4 }} />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                )
              )}
            </div>

            {/* Auth */}
            <div className="hidden lg:flex items-center gap-3">
              {loading ? (
                <div className="w-32 h-9 rounded-full animate-pulse" style={{ background: "rgba(255,255,255,0.08)" }} />
              ) : user ? (
                <div id="user-dropdown" className="relative">
                  <button onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2.5 rounded-full pl-1.5 pr-4 py-1.5 text-white text-sm transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(255,255,255,0.12)",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}>
                    {user.photo ? (
                      <Image key={user.photo} src={user.photo} alt={user.name}
                        width={28} height={28}
                        className="rounded-full object-cover w-7 h-7 ring-2 ring-white/20" />
                    ) : (
                      <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${roleColor[user.role] || "from-blue-500 to-cyan-600"} flex items-center justify-center text-white text-xs font-bold`}>
                        {user.name?.[0]?.toUpperCase()}
                      </div>
                    )}
                    <div className="text-left">
                      <p className="text-xs font-semibold leading-tight max-w-[80px] truncate">{firstName}</p>
                      <p className="text-blue-300/60 text-[10px] capitalize">{user.role}</p>
                    </div>
                    <FaChevronDown className={`text-blue-300/60 text-[10px] transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-60 z-50">
                        <div
                          className="rounded-2xl overflow-hidden shadow-2xl shadow-black/60"
                          style={{
                            background: "linear-gradient(135deg, rgba(8,15,50,0.98) 0%, rgba(12,30,80,0.98) 100%)",
                            backdropFilter: "blur(24px)",
                            border: "1px solid rgba(255,255,255,0.1)",
                          }}>

                          <div className="p-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                            <div className="flex items-center gap-3">
                              {user.photo ? (
                                <Image key={user.photo} src={user.photo} alt={user.name}
                                  width={40} height={40}
                                  className="rounded-xl object-cover w-10 h-10 ring-2 ring-white/10 flex-shrink-0" />
                              ) : (
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${roleColor[user.role] || "from-blue-500 to-cyan-600"} flex items-center justify-center text-white font-bold flex-shrink-0`}>
                                  {user.name?.[0]?.toUpperCase()}
                                </div>
                              )}
                              <div className="min-w-0">
                                <p className="font-semibold text-white text-sm truncate">{user.name}</p>
                                <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-full text-white bg-gradient-to-r ${roleColor[user.role] || "from-blue-500 to-cyan-600"} capitalize mt-0.5`}>
                                  {user.role}
                                </span>
                              </div>
                            </div>
                            {user.department && (
                              <div className="mt-2 flex items-center gap-1.5 text-blue-300/60 text-xs">
                                <FaGraduationCap size={10} />
                                {DEPARTMENTS[user.department as Department] || user.department}
                              </div>
                            )}
                          </div>

                          <div className="p-2">
                            {[
                              { href: "/dashboard", icon: <FaTachometerAlt size={12} />, label: "Dashboard" },
                              { href: "/profile",   icon: <FaUser size={12} />,          label: "My Profile" },
                              ...(user.role === "admin" ? [{ href: "/admin", icon: <FaCog size={12} />, label: "Admin Panel" }] : []),
                            ].map(item => (
                              <Link key={item.href} href={item.href} onClick={() => setDropdownOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150 ${
                                  pathname === item.href
                                    ? "text-white bg-white/10"
                                    : "text-blue-200/70 hover:text-white hover:bg-white/5"
                                }`}>
                                <span className="text-blue-400/70">{item.icon}</span>
                                {item.label}
                              </Link>
                            ))}
                          </div>

                          <div className="p-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                            <button onClick={handleSignOut}
                              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400/80 hover:text-red-300 hover:bg-red-500/10 transition-all duration-150">
                              <FaSignOutAlt size={12} /> Sign Out
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/login"
                    className="text-blue-200/70 hover:text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/5 transition-all duration-200">
                    Sign In
                  </Link>
                  <Link href="/register"
                    className="text-white text-sm font-semibold px-5 py-2 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg"
                    style={{
                      background: "linear-gradient(135deg, #14b8a6 0%, #0ea5e9 100%)",
                      boxShadow: "0 4px 15px rgba(14,165,233,0.25)",
                    }}>
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile toggle */}
            <button
              className="lg:hidden relative w-9 h-9 flex items-center justify-center text-white rounded-xl transition-all"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
              onClick={() => setMobileOpen(!mobileOpen)}>
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <FaTimes size={16} />
                  </motion.div>
                ) : (
                  <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <FaBars size={16} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden overflow-hidden">
              <div
                className="px-4 py-4 space-y-1"
                style={{
                  background: "linear-gradient(135deg, rgba(8,15,50,0.98) 0%, rgba(12,30,80,0.98) 100%)",
                  backdropFilter: "blur(24px)",
                  borderTop: "1px solid rgba(255,255,255,0.05)",
                }}>

                {user && (
                  <div className="flex items-center gap-3 rounded-2xl px-4 py-3 mb-3"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    {user.photo ? (
                      <Image key={user.photo} src={user.photo} alt={user.name} width={38} height={38}
                        className="rounded-xl object-cover ring-2 ring-white/10 flex-shrink-0" />
                    ) : (
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${roleColor[user.role] || "from-blue-500 to-cyan-600"} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                        {user.name?.[0]?.toUpperCase()}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-semibold truncate">{user.name}</p>
                      <p className="text-blue-300/60 text-xs capitalize">{user.role}</p>
                    </div>
                    <Link href="/dashboard" onClick={() => setMobileOpen(false)}
                      className="text-xs text-white px-3 py-1.5 rounded-lg flex-shrink-0 transition-colors"
                      style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.1)" }}>
                      Dashboard
                    </Link>
                  </div>
                )}

                {navLinks.map(link =>
                  link.children ? (
                    <div key={link.label}>
                      <button onClick={() => setDeptOpen(!deptOpen)}
                        className="w-full flex justify-between items-center px-3 py-3 text-blue-100/80 text-sm font-medium rounded-xl hover:bg-white/5 transition-colors">
                        {link.label}
                        <FaChevronDown className={`text-[10px] text-blue-300/50 transition-transform duration-300 ${deptOpen ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {deptOpen && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }} className="overflow-hidden ml-3">
                            <div className="py-1 space-y-0.5" style={{ borderLeft: "1px solid rgba(255,255,255,0.08)", paddingLeft: "12px" }}>
                              {(link.children as { label: string; code: string; href: string }[]).map(c => (
                                <Link key={c.href} href={c.href} onClick={() => setMobileOpen(false)}
                                  className="flex items-center gap-2.5 py-2 px-3 rounded-lg hover:bg-white/5 transition-colors">
                                  <span className={`font-mono font-bold text-[10px] ${deptColors[c.code] || "text-blue-400"}`}>{c.code}</span>
                                  <span className="text-blue-200/70 text-xs">{c.label}</span>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                      className={`flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-colors ${
                        pathname === link.href
                          ? "text-white"
                          : "text-blue-100/70 hover:bg-white/5 hover:text-white"
                      }`}
                      style={pathname === link.href ? {
                        background: "rgba(255,255,255,0.1)",
                        border: "1px solid rgba(255,255,255,0.1)"
                      } : {}}>
                      {link.label}
                    </Link>
                  )
                )}

                <div className="pt-3 space-y-1" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  {user ? (
                    <>
                      <Link href="/profile" onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 px-3 py-3 text-blue-200/70 text-sm hover:bg-white/5 hover:text-white rounded-xl transition-colors">
                        <FaUser size={13} /> My Profile
                      </Link>
                      {user.role === "admin" && (
                        <Link href="/admin" onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-3 px-3 py-3 text-blue-200/70 text-sm hover:bg-white/5 hover:text-white rounded-xl transition-colors">
                          <FaCog size={13} /> Admin Panel
                        </Link>
                      )}
                      <button onClick={() => { handleSignOut(); setMobileOpen(false); }}
                        className="w-full flex items-center gap-3 px-3 py-3 text-red-400/80 text-sm hover:bg-red-500/10 rounded-xl transition-colors">
                        <FaSignOutAlt size={13} /> Sign Out
                      </button>
                    </>
                  ) : (
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <Link href="/login" onClick={() => setMobileOpen(false)}
                        className="text-center text-blue-100/80 hover:text-white py-3 rounded-xl text-sm font-medium transition-all hover:bg-white/5"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                        Sign In
                      </Link>
                      <Link href="/register" onClick={() => setMobileOpen(false)}
                        className="text-center text-white py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                        style={{ background: "linear-gradient(135deg, #14b8a6 0%, #0ea5e9 100%)" }}>
                        Register
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer */}
      <div className="h-24" />
    </>
  );
}