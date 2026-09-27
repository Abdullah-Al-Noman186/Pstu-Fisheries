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

const roleColors: Record<string, string> = {
  admin: "border-red-400/10 bg-red-400/[0.06] text-red-300",
  teacher: "border-teal-400/10 bg-teal-400/[0.06] text-teal-300",
  alumni: "border-amber-400/10 bg-amber-400/[0.06] text-amber-300",
  student: "border-blue-400/10 bg-blue-400/[0.06] text-blue-300",
};

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
      color: "border-blue-400/10 bg-blue-400/[0.06] text-blue-300",
    },
    {
      title: "Manage Alumni",
      desc: "Update alumni records",
      href: "/admin/alumni",
      icon: <FaUserGraduate />,
      color: "border-emerald-400/10 bg-emerald-400/[0.06] text-emerald-300",
    },
    {
      title: "Manage News",
      desc: "Publish news and notices",
      href: "/admin/news",
      icon: <FaNewspaper />,
      color: "border-violet-400/10 bg-violet-400/[0.06] text-violet-300",
    },
    {
      title: "Research",
      desc: "Add and manage publications",
      href: "/admin/research",
      icon: <FaFlask />,
      color: "border-amber-400/10 bg-amber-400/[0.06] text-amber-300",
    },
  ],

  teacher: [
    {
      title: "My Profile",
      desc: "Update your faculty profile",
      href: "/profile",
      icon: <FaUser />,
      color: "border-blue-400/10 bg-blue-400/[0.06] text-blue-300",
    },
    {
      title: "Publications",
      desc: "Manage your research papers",
      href: "/teacher",
      icon: <FaFlask />,
      color: "border-teal-400/10 bg-teal-400/[0.06] text-teal-300",
    },
  ],

  student: [
    {
      title: "My Profile",
      desc: "Update your student profile",
      href: "/profile",
      icon: <FaUser />,
      color: "border-blue-400/10 bg-blue-400/[0.06] text-blue-300",
    },
    {
      title: "My Record",
      desc: "View your academic info",
      href: "/student",
      icon: <FaChalkboardTeacher />,
      color: "border-violet-400/10 bg-violet-400/[0.06] text-violet-300",
    },
  ],

  alumni: [
    {
      title: "My Profile",
      desc: "Update your alumni profile",
      href: "/profile",
      icon: <FaUser />,
      color: "border-blue-400/10 bg-blue-400/[0.06] text-blue-300",
    },
    {
      title: "Alumni Page",
      desc: "View your public alumni page",
      href: "/alumni-profile",
      icon: <FaUsers />,
      color: "border-emerald-400/10 bg-emerald-400/[0.06] text-emerald-300",
    },
  ],
};

const mainStatStyles = [
  {
    icon: <FaUsers />,
    color: "border-blue-400/10 bg-blue-400/[0.06] text-blue-300",
  },
  {
    icon: <FaChalkboardTeacher />,
    color: "border-teal-400/10 bg-teal-400/[0.06] text-teal-300",
  },
  {
    icon: <FaUserGraduate />,
    color: "border-amber-400/10 bg-amber-400/[0.06] text-amber-300",
  },
  {
    icon: <FaFlask />,
    color: "border-violet-400/10 bg-violet-400/[0.06] text-violet-300",
  },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const { stats, loading, error, refetch } = useStats();

  const cards = roleCards[user?.role || "student"] || [];
  const isAdmin = user?.role === "admin";

  return (
    <div className="relative space-y-8 text-white">
      {/* =========================================================
          ATMOSPHERIC BACKGROUND
      ========================================================= */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-cyan-400/[0.025] blur-[130px]" />

        <div className="absolute right-[-180px] top-[25%] h-[500px] w-[500px] rounded-full bg-sky-400/[0.025] blur-[150px]" />

        <div className="absolute bottom-[-220px] left-[35%] h-[450px] w-[450px] rounded-full bg-cyan-500/[0.018] blur-[140px]" />

        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
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
        className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.025] p-6 backdrop-blur-sm sm:p-7"
      >
        {/* Cyan accent */}
        <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-cyan-300/70 via-cyan-400/20 to-transparent" />

        {/* Glow */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-cyan-400/[0.06] blur-[80px]" />

        <div className="relative">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />

            <span className="text-[10px] uppercase tracking-[0.24em] text-cyan-300/60">
              Faculty Dashboard
            </span>
          </div>

          <h1 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Welcome back,{" "}
            <span className="text-cyan-300">{user?.name}</span>
          </h1>

          <p className="mt-2 text-sm text-slate-500">
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
          transition={{ duration: 0.45, delay: 0.08 }}
        >
          {/* Section heading */}
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="mb-1 text-[10px] uppercase tracking-[0.24em] text-cyan-300/50">
                System overview
              </p>

              <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
                Live Database Stats
              </h2>
            </div>

            <button
              onClick={refetch}
              disabled={loading}
              className="group inline-flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3.5 py-2 text-xs text-slate-500 backdrop-blur-sm transition-all hover:border-cyan-400/20 hover:bg-cyan-400/[0.04] hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FaSync
                className={loading ? "animate-spin" : "transition-transform group-hover:rotate-180"}
                size={11}
              />
              Refresh
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-2xl border border-red-400/10 bg-red-400/[0.04] p-4 text-sm text-red-300">
              Failed to load stats: {error}
            </div>
          )}

          {/* Loading skeleton */}
          {loading ? (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="h-32 animate-pulse rounded-2xl border border-white/[0.05] bg-white/[0.025]"
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
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: i * 0.05,
                        }}
                        className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.10] hover:bg-white/[0.035]"
                      >
                        <div className="mb-4 flex items-center justify-between">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-xl border ${style.color} text-base`}
                          >
                            {style.icon}
                          </div>

                          <FaChartLine className="text-[10px] text-slate-700 transition-colors group-hover:text-cyan-400/40" />
                        </div>

                        <p className="font-display text-2xl font-bold tracking-tight text-white">
                          {stat.value}
                        </p>

                        <p className="mt-1 text-[11px] text-slate-500">
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
                        "border-blue-400/10 bg-blue-400/[0.06] text-blue-300",
                    },
                    {
                      label: "Teachers",
                      value: stats.byRole.teacher,
                      icon: <FaChalkboardTeacher />,
                      color:
                        "border-teal-400/10 bg-teal-400/[0.06] text-teal-300",
                    },
                    {
                      label: "Alumni",
                      value: stats.byRole.alumni,
                      icon: <FaUserGraduate />,
                      color:
                        "border-amber-400/10 bg-amber-400/[0.06] text-amber-300",
                    },
                    {
                      label: "Admins",
                      value: stats.byRole.admin,
                      icon: <FaUserShield />,
                      color:
                        "border-red-400/10 bg-red-400/[0.06] text-red-300",
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.15 + i * 0.05,
                      }}
                      className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 backdrop-blur-sm transition-colors hover:bg-white/[0.035]"
                    >
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${item.color} text-sm`}
                      >
                        {item.icon}
                      </div>

                      <div className="min-w-0">
                        <p className="font-display text-xl font-bold text-white">
                          {item.value}
                        </p>

                        <p className="text-[10px] uppercase tracking-[0.12em] text-slate-600">
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
                  <div className="rounded-2xl border border-cyan-400/[0.08] bg-cyan-400/[0.025] p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.06] text-cyan-300">
                        <FaCalendarAlt />
                      </div>

                      <div>
                        <p className="font-display text-xl font-bold text-white">
                          {stats.newToday}
                        </p>

                        <p className="text-[10px] uppercase tracking-[0.1em] text-slate-600">
                          New today
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-teal-400/[0.08] bg-teal-400/[0.025] p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-teal-400/10 bg-teal-400/[0.06] text-teal-300">
                        <FaCalendarAlt />
                      </div>

                      <div>
                        <p className="font-display text-xl font-bold text-white">
                          {stats.newThisMonth}
                        </p>

                        <p className="text-[10px] uppercase tracking-[0.1em] text-slate-600">
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
                  <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.025] backdrop-blur-sm">
                    <div className="flex items-center justify-between border-b border-white/[0.05] px-5 py-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-300/50">
                          Activity
                        </p>

                        <h3 className="mt-1 font-display text-sm font-bold text-white">
                          Recent Signups
                        </h3>
                      </div>

                      <span className="text-[10px] uppercase tracking-[0.12em] text-slate-600">
                        Last 5
                      </span>
                    </div>

                    <div className="divide-y divide-white/[0.04]">
                      {stats.recentUsers.map((u, i) => (
                        <motion.div
                          key={u._id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: i * 0.05,
                          }}
                          className="group flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-white/[0.025]"
                        >
                          {u.photo ? (
                            <Image
                              src={u.photo}
                              alt={u.name}
                              width={36}
                              height={36}
                              className="h-9 w-9 shrink-0 rounded-full border border-white/[0.08] object-cover"
                            />
                          ) : (
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cyan-400/10 bg-cyan-400/[0.06] text-sm font-bold text-cyan-300">
                              {u.name?.[0]?.toUpperCase()}
                            </div>
                          )}

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-slate-200">
                              {u.name}
                            </p>

                            <p className="truncate text-xs text-slate-600">
                              {u.email}
                            </p>
                          </div>

                          <div className="flex shrink-0 items-center gap-3">
                            <span
                              className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold capitalize ${
                                roleColors[u.role] ||
                                "border-white/[0.06] bg-white/[0.03] text-slate-400"
                              }`}
                            >
                              {u.role}
                            </span>

                            <span className="hidden text-[10px] text-slate-700 sm:block">
                              {format(new Date(u.createdAt), "dd MMM")}
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
          <p className="mb-1 text-[10px] uppercase tracking-[0.24em] text-cyan-300/50">
            Workspace
          </p>

          <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
            Quick Actions
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: i * 0.08,
              }}
            >
              <Link
                href={card.href}
                className="group relative block overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.10] hover:bg-white/[0.035]"
              >
                {/* Hover glow */}
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-400/[0.035] blur-[50px] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative flex items-start justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border ${card.color} text-lg`}
                  >
                    {card.icon}
                  </div>

                  <FaArrowRight
                    size={11}
                    className="mt-2 text-slate-700 transition-all duration-300 group-hover:translate-x-1 group-hover:text-cyan-300"
                  />
                </div>

                <div className="relative mt-5">
                  <h3 className="font-display font-bold text-white">
                    {card.title}
                  </h3>

                  <p className="mt-1 text-sm leading-relaxed text-slate-500">
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
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            delay: 0.2,
          }}
        >
          <div className="mb-5">
            <p className="mb-1 text-[10px] uppercase tracking-[0.24em] text-cyan-300/50">
              Faculty overview
            </p>

            <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
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
                  "border-blue-400/10 bg-blue-400/[0.06] text-blue-300",
              },
              {
                label: "Alumni Network",
                value: stats.totalAlumni,
                icon: <FaUserGraduate />,
                color:
                  "border-amber-400/10 bg-amber-400/[0.06] text-amber-300",
              },
              {
                label: "Publications",
                value: stats.totalResearch,
                icon: <FaFlask />,
                color:
                  "border-teal-400/10 bg-teal-400/[0.06] text-teal-300",
              },
              {
                label: "News & Events",
                value: stats.totalNews,
                icon: <FaNewspaper />,
                color:
                  "border-violet-400/10 bg-violet-400/[0.06] text-violet-300",
              },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: i * 0.06,
                }}
                className="group rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5 text-center backdrop-blur-sm transition-all duration-300 hover:border-white/[0.10] hover:bg-white/[0.035]"
              >
                <div
                  className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl border ${s.color} text-lg`}
                >
                  {s.icon}
                </div>

                <p className="font-display text-2xl font-bold text-white">
                  {s.value}
                </p>

                <p className="mt-1 text-[10px] uppercase tracking-[0.1em] text-slate-600">
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
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.22em] text-slate-700">
          <span className="h-1 w-1 rounded-full bg-cyan-400/40" />
          Faculty of Fisheries · PSTU
        </div>

        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>
    </div>
  );
}