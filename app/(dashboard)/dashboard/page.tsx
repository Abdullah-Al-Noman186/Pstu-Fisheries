
"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useStats } from "@/hooks/useStats";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import {
  FaUser,
  FaFlask,
  FaUsers,
  FaNewspaper,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaUserShield,
  FaSync,
  FaCalendarAlt,
  FaArrowRight,
  FaChartLine,
} from "react-icons/fa";

/* ================================================================
   ROLE COLORS
================================================================ */

const roleColors: Record<string, string> = {
  admin:
    "border-[#C2415B]/15 bg-[#C2415B]/[0.07] text-[#C2415B]",
  teacher:
    "border-[#2DD4BF]/20 bg-[#2DD4BF]/[0.10] text-[#087A68]",
  alumni:
    "border-[#F59E0B]/20 bg-[#F59E0B]/[0.08] text-[#A16207]",
  student:
    "border-[#0891B2]/20 bg-[#0891B2]/[0.08] text-[#087EA4]",
};

/* ================================================================
   QUICK ACTIONS BY ROLE
================================================================ */

const roleCards: Record<
  string,
  {
    title: string;
    desc: string;
    href: string;
    icon: React.ReactNode;
    color: string;
  }[]
> = {
  admin: [
    {
      title: "Manage Teachers",
      desc: "Add, edit, remove faculty",
      href: "/admin/teachers",
      icon: <FaChalkboardTeacher />,
      color:
        "border-[#0891B2]/20 bg-[#0891B2]/[0.08] text-[#087EA4]",
    },
    {
      title: "Manage Alumni",
      desc: "Update alumni records",
      href: "/admin/alumni",
      icon: <FaUserGraduate />,
      color:
        "border-[#2DD4BF]/20 bg-[#2DD4BF]/[0.10] text-[#087A68]",
    },
    {
      title: "Manage News",
      desc: "Publish news and notices",
      href: "/admin/news",
      icon: <FaNewspaper />,
      color:
        "border-[#8B7ED8]/20 bg-[#8B7ED8]/[0.08] text-[#6D5CC6]",
    },
    {
      title: "Research",
      desc: "Add and manage publications",
      href: "/admin/research",
      icon: <FaFlask />,
      color:
        "border-[#F59E0B]/20 bg-[#F59E0B]/[0.08] text-[#A16207]",
    },
  ],

  teacher: [
    {
      title: "My Profile",
      desc: "Update your faculty profile",
      href: "/profile",
      icon: <FaUser />,
      color:
        "border-[#0891B2]/20 bg-[#0891B2]/[0.08] text-[#087EA4]",
    },
    {
      title: "Publications",
      desc: "Manage your research papers",
      href: "/teacher",
      icon: <FaFlask />,
      color:
        "border-[#2DD4BF]/20 bg-[#2DD4BF]/[0.10] text-[#087A68]",
    },
  ],

  student: [
    {
      title: "My Profile",
      desc: "Update your student profile",
      href: "/profile",
      icon: <FaUser />,
      color:
        "border-[#0891B2]/20 bg-[#0891B2]/[0.08] text-[#087EA4]",
    },
    {
      title: "My Record",
      desc: "View your academic info",
      href: "/student",
      icon: <FaChalkboardTeacher />,
      color:
        "border-[#8B7ED8]/20 bg-[#8B7ED8]/[0.08] text-[#6D5CC6]",
    },
  ],

  alumni: [
    {
      title: "My Profile",
      desc: "Update your alumni profile",
      href: "/profile",
      icon: <FaUser />,
      color:
        "border-[#0891B2]/20 bg-[#0891B2]/[0.08] text-[#087EA4]",
    },
    {
      title: "Alumni Page",
      desc: "View your public alumni page",
      href: "/alumni-profile",
      icon: <FaUsers />,
      color:
        "border-[#2DD4BF]/20 bg-[#2DD4BF]/[0.10] text-[#087A68]",
    },
  ],
};

/* ================================================================
   MAIN STAT ICON STYLES
================================================================ */

const mainStatStyles = [
  {
    icon: <FaUsers />,
    color:
      "border-[#0891B2]/20 bg-[#0891B2]/[0.08] text-[#087EA4]",
  },
  {
    icon: <FaChalkboardTeacher />,
    color:
      "border-[#2DD4BF]/20 bg-[#2DD4BF]/[0.10] text-[#087A68]",
  },
  {
    icon: <FaUserGraduate />,
    color:
      "border-[#F59E0B]/20 bg-[#F59E0B]/[0.08] text-[#A16207]",
  },
  {
    icon: <FaFlask />,
    color:
      "border-[#8B7ED8]/20 bg-[#8B7ED8]/[0.08] text-[#6D5CC6]",
  },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const { stats, loading, error, refetch } = useStats();

  const cards = roleCards[user?.role || "student"] || [];
  const isAdmin = user?.role === "admin";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F0FAFC] text-[#123B4A]">
      {/* =========================================================
          ATMOSPHERIC BACKGROUND
      ========================================================= */}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* Ocean glow */}
        <div className="absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-[#0891B2]/[0.07] blur-[130px]" />

        {/* Sky glow */}
        <div className="absolute right-[-180px] top-[20%] h-[500px] w-[500px] rounded-full bg-[#087EA4]/[0.045] blur-[150px]" />

        {/* Seafoam glow */}
        <div className="absolute bottom-[-220px] left-[35%] h-[450px] w-[450px] rounded-full bg-[#2DD4BF]/[0.055] blur-[140px]" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(8,126,164,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(8,126,164,0.8) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* =========================================================
          WELCOME
      ========================================================= */}

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative overflow-hidden rounded-[26px] border border-[#087EA4]/10 bg-white/80 p-6 shadow-[0_15px_45px_rgba(8,126,164,0.055)] backdrop-blur-xl sm:p-7"
      >
        {/* Left accent */}
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#075985] via-[#087EA4] to-[#2DD4BF]" />

        {/* Glow */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[#0891B2]/[0.08] blur-[80px]" />

        <div className="relative">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0891B2] shadow-[0_0_12px_rgba(8,145,178,0.35)]" />

            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#087EA4]/70">
              Faculty Dashboard
            </span>
          </div>

          <h1 className="font-display text-2xl font-bold tracking-tight text-[#123B4A] sm:text-3xl">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-[#075985] via-[#087EA4] to-[#0891B2] bg-clip-text text-transparent">
              {user?.name}
            </span>
          </h1>

          <p className="mt-2 text-sm capitalize text-[#55727D]">
            {user?.role} · Faculty of Fisheries, PSTU
            {user?.department && ` · ${user.department}`}
          </p>
        </div>
      </motion.section>

      {/* =========================================================
          ADMIN DATABASE STATS
      ========================================================= */}

      {isAdmin && (
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            delay: 0.08,
          }}
        >
          {/* Section heading */}
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.24em] text-[#087EA4]/65">
                System Overview
              </p>

              <h2 className="font-display text-xl font-bold text-[#123B4A] sm:text-2xl">
                Live Database Stats
              </h2>
            </div>

            <button
              onClick={refetch}
              disabled={loading}
              className="group inline-flex items-center gap-2 rounded-xl border border-[#087EA4]/10 bg-white/80 px-3.5 py-2 text-xs font-medium text-[#55727D] shadow-sm backdrop-blur-sm transition-all hover:border-[#0891B2]/25 hover:bg-[#0891B2]/[0.05] hover:text-[#087EA4] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FaSync
                className={
                  loading
                    ? "animate-spin"
                    : "transition-transform group-hover:rotate-180"
                }
                size={11}
              />
              Refresh
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-2xl border border-[#C2415B]/15 bg-[#C2415B]/[0.06] p-4 text-sm text-[#C2415B]">
              Failed to load stats: {error}
            </div>
          )}

          {/* Loading skeleton */}
          {loading ? (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="h-32 animate-pulse rounded-2xl border border-[#087EA4]/10 bg-white/70"
                />
              ))}
            </div>
          ) : (
            stats && (
              <>
                {/* =================================================
                    MAIN COUNTS
                ================================================= */}

                <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                  {[
                    {
                      label: "Registered Users",
                      value: stats.totalUsers,
                    },
                    {
                      label: "Faculty Members",
                      value: stats.totalTeachers,
                    },
                    {
                      label: "Alumni Profiles",
                      value: stats.totalAlumni,
                    },
                    {
                      label: "Publications",
                      value: stats.totalResearch,
                    },
                  ].map((stat, i) => {
                    const style = mainStatStyles[i];

                    return (
                      <motion.div
                        key={stat.label}
                        initial={{
                          opacity: 0,
                          scale: 0.96,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                        }}
                        transition={{
                          duration: 0.3,
                          delay: i * 0.05,
                        }}
                        className="group relative overflow-hidden rounded-2xl border border-[#087EA4]/10 bg-white/80 p-5 shadow-[0_10px_30px_rgba(8,126,164,0.045)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-[#087EA4]/20 hover:shadow-[0_16px_38px_rgba(8,126,164,0.08)]"
                      >
                        {/* Hover glow */}
                        <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#0891B2]/[0.06] blur-[40px] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                        <div className="relative mb-4 flex items-center justify-between">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-xl border ${style.color} text-base`}
                          >
                            {style.icon}
                          </div>

                          <FaChartLine className="text-[10px] text-[#55727D]/30 transition-colors group-hover:text-[#0891B2]/50" />
                        </div>

                        <p className="relative font-display text-2xl font-bold tracking-tight text-[#123B4A]">
                          {stat.value}
                        </p>

                        <p className="relative mt-1 text-[11px] font-medium text-[#55727D]">
                          {stat.label}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>

                {/* =================================================
                    USERS BY ROLE
                ================================================= */}

                <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                  {[
                    {
                      label: "Students",
                      value: stats.byRole.student,
                      icon: <FaUser />,
                      color:
                        "border-[#0891B2]/20 bg-[#0891B2]/[0.08] text-[#087EA4]",
                    },
                    {
                      label: "Teachers",
                      value: stats.byRole.teacher,
                      icon: <FaChalkboardTeacher />,
                      color:
                        "border-[#2DD4BF]/20 bg-[#2DD4BF]/[0.10] text-[#087A68]",
                    },
                    {
                      label: "Alumni",
                      value: stats.byRole.alumni,
                      icon: <FaUserGraduate />,
                      color:
                        "border-[#F59E0B]/20 bg-[#F59E0B]/[0.08] text-[#A16207]",
                    },
                    {
                      label: "Admins",
                      value: stats.byRole.admin,
                      icon: <FaUserShield />,
                      color:
                        "border-[#C2415B]/15 bg-[#C2415B]/[0.07] text-[#C2415B]",
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{
                        opacity: 0,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.3,
                        delay: 0.15 + i * 0.05,
                      }}
                      className="group flex items-center gap-3 rounded-2xl border border-[#087EA4]/10 bg-white/80 p-4 shadow-[0_8px_25px_rgba(8,126,164,0.035)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-[#087EA4]/20 hover:shadow-[0_12px_30px_rgba(8,126,164,0.06)]"
                    >
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${item.color} text-sm`}
                      >
                        {item.icon}
                      </div>

                      <div className="min-w-0">
                        <p className="font-display text-xl font-bold text-[#123B4A]">
                          {item.value}
                        </p>

                        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#55727D]/70">
                          {item.label}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* =================================================
                    SIGNUPS
                ================================================= */}

                <div className="mb-5 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-[#0891B2]/15 bg-[#0891B2]/[0.05] p-4 shadow-[0_8px_25px_rgba(8,145,178,0.035)] backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#0891B2]/15 bg-white/70 text-[#087EA4]">
                        <FaCalendarAlt />
                      </div>

                      <div>
                        <p className="font-display text-xl font-bold text-[#123B4A]">
                          {stats.newToday}
                        </p>

                        <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#55727D]/75">
                          New today
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[#2DD4BF]/15 bg-[#2DD4BF]/[0.06] p-4 shadow-[0_8px_25px_rgba(45,212,191,0.035)] backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#2DD4BF]/20 bg-white/70 text-[#087A68]">
                        <FaCalendarAlt />
                      </div>

                      <div>
                        <p className="font-display text-xl font-bold text-[#123B4A]">
                          {stats.newThisMonth}
                        </p>

                        <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#55727D]/75">
                          This month
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* =================================================
                    RECENT SIGNUPS
                ================================================= */}

                {stats.recentUsers.length > 0 && (
                  <div className="overflow-hidden rounded-2xl border border-[#087EA4]/10 bg-white/80 shadow-[0_10px_30px_rgba(8,126,164,0.045)] backdrop-blur-xl">
                    <div className="flex items-center justify-between border-b border-[#087EA4]/10 px-5 py-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#087EA4]/65">
                          Activity
                        </p>

                        <h3 className="mt-1 font-display text-sm font-bold text-[#123B4A]">
                          Recent Signups
                        </h3>
                      </div>

                      <span className="rounded-full border border-[#087EA4]/10 bg-[#F0FAFC] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#55727D]">
                        Last 5
                      </span>
                    </div>

                    <div className="divide-y divide-[#087EA4]/[0.07]">
                      {stats.recentUsers.map((u, i) => (
                        <motion.div
                          key={u._id}
                          initial={{
                            opacity: 0,
                            x: -10,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          transition={{
                            duration: 0.3,
                            delay: i * 0.05,
                          }}
                          className="group flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-[#F0FAFC]/70"
                        >
                          {u.photo ? (
                            <Image
                              src={u.photo}
                              alt={u.name}
                              width={36}
                              height={36}
                              className="h-9 w-9 shrink-0 rounded-full border border-[#087EA4]/10 object-cover"
                            />
                          ) : (
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#0891B2]/15 bg-[#0891B2]/[0.08] text-sm font-bold text-[#087EA4]">
                              {u.name?.[0]?.toUpperCase()}
                            </div>
                          )}

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-[#123B4A]">
                              {u.name}
                            </p>

                            <p className="truncate text-xs text-[#55727D]">
                              {u.email}
                            </p>
                          </div>

                          <div className="flex shrink-0 items-center gap-3">
                            <span
                              className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold capitalize ${
                                roleColors[u.role] ||
                                "border-[#087EA4]/10 bg-[#F0FAFC] text-[#55727D]"
                              }`}
                            >
                              {u.role}
                            </span>

                            <span className="hidden text-[10px] font-medium text-[#55727D]/70 sm:block">
                              {format(
                                new Date(u.createdAt),
                                "dd MMM"
                              )}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )
          )}
        </motion.section>
      )}

      {/* =========================================================
          QUICK ACTIONS
      ========================================================= */}

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.45,
          delay: isAdmin ? 0.25 : 0.1,
        }}
      >
        <div className="mb-5">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.24em] text-[#087EA4]/65">
            Workspace
          </p>

          <h2 className="font-display text-xl font-bold text-[#123B4A] sm:text-2xl">
            Quick Actions
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.3,
                delay: i * 0.08,
              }}
            >
              <Link
                href={card.href}
                className="group relative block overflow-hidden rounded-[22px] border border-[#087EA4]/10 bg-white/80 p-5 shadow-[0_10px_30px_rgba(8,126,164,0.045)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#087EA4]/20 hover:shadow-[0_18px_42px_rgba(8,126,164,0.09)]"
              >
                {/* Hover glow */}
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#0891B2]/[0.07] blur-[50px] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[#075985] via-[#087EA4] to-[#2DD4BF] transition-all duration-500 group-hover:w-full" />

                <div className="relative flex items-start justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border ${card.color} text-lg`}
                  >
                    {card.icon}
                  </div>

                  <FaArrowRight
                    size={11}
                    className="mt-2 text-[#55727D]/45 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#087EA4]"
                  />
                </div>

                <div className="relative mt-5">
                  <h3 className="font-display font-bold text-[#123B4A]">
                    {card.title}
                  </h3>

                  <p className="mt-1 text-sm leading-relaxed text-[#55727D]">
                    {card.desc}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* =========================================================
          NON-ADMIN FACULTY STATS
      ========================================================= */}

      {!isAdmin && stats && (
        <motion.section
          initial={{
            opacity: 0,
            y: 18,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.45,
            delay: 0.2,
          }}
        >
          <div className="mb-5">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.24em] text-[#087EA4]/65">
              Faculty Overview
            </p>

            <h2 className="font-display text-xl font-bold text-[#123B4A] sm:text-2xl">
              Faculty at a Glance
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              {
                label: "Faculty Members",
                value: stats.totalTeachers,
                icon: <FaChalkboardTeacher />,
                color:
                  "border-[#0891B2]/20 bg-[#0891B2]/[0.08] text-[#087EA4]",
              },
              {
                label: "Alumni Network",
                value: stats.totalAlumni,
                icon: <FaUserGraduate />,
                color:
                  "border-[#F59E0B]/20 bg-[#F59E0B]/[0.08] text-[#A16207]",
              },
              {
                label: "Publications",
                value: stats.totalResearch,
                icon: <FaFlask />,
                color:
                  "border-[#2DD4BF]/20 bg-[#2DD4BF]/[0.10] text-[#087A68]",
              },
              {
                label: "News & Events",
                value: stats.totalNews,
                icon: <FaNewspaper />,
                color:
                  "border-[#8B7ED8]/20 bg-[#8B7ED8]/[0.08] text-[#6D5CC6]",
              },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{
                  opacity: 0,
                  scale: 0.96,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 0.3,
                  delay: i * 0.06,
                }}
                className="group rounded-2xl border border-[#087EA4]/10 bg-white/80 p-5 text-center shadow-[0_10px_30px_rgba(8,126,164,0.045)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-[#087EA4]/20 hover:shadow-[0_15px_35px_rgba(8,126,164,0.075)]"
              >
                <div
                  className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl border ${s.color} text-lg`}
                >
                  {s.icon}
                </div>

                <p className="font-display text-2xl font-bold text-[#123B4A]">
                  {s.value}
                </p>

                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#55727D]/75">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* =========================================================
          FOOTER MARKER
      ========================================================= */}

      <div className="flex items-center gap-3 pt-2">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#087EA4]/10 to-transparent" />

        <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#55727D]/60">
          <span className="h-1 w-1 rounded-full bg-[#0891B2]/50" />
          Faculty of Fisheries · PSTU
        </div>

        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#087EA4]/10 to-transparent" />
      </div>
    </main>
  );
}

