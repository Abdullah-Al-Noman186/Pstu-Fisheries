"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useStats } from "@/hooks/useStats";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import {
  FaUser, FaFlask, FaUsers, FaNewspaper,
  FaChalkboardTeacher, FaUserGraduate,
  FaUserShield, FaSync, FaCalendarAlt
} from "react-icons/fa";

const roleColors: Record<string, string> = {
  admin:   "bg-red-100 text-red-700",
  teacher: "bg-teal-100 text-teal-700",
  alumni:  "bg-amber-100 text-amber-700",
  student: "bg-blue-100 text-blue-700",
};

const roleCards: Record<string, {
  title: string; desc: string; href: string;
  icon: React.ReactNode; color: string
}[]> = {
  admin: [
    { title: "Manage Teachers", desc: "Add, edit, remove faculty",     href: "/admin/teachers", icon: <FaChalkboardTeacher />, color: "bg-blue-50 text-blue-600" },
    { title: "Manage Alumni",   desc: "Update alumni records",          href: "/admin/alumni",   icon: <FaUserGraduate />,      color: "bg-emerald-50 text-emerald-600" },
    { title: "Manage News",     desc: "Publish news and notices",       href: "/admin/news",     icon: <FaNewspaper />,         color: "bg-violet-50 text-violet-600" },
    { title: "Research",        desc: "Add and manage publications",    href: "/admin/research", icon: <FaFlask />,             color: "bg-amber-50 text-amber-600" },
  ],
  teacher: [
    { title: "My Profile",      desc: "Update your faculty profile",   href: "/profile", icon: <FaUser />,  color: "bg-blue-50 text-blue-600" },
    { title: "Publications",    desc: "Manage your research papers",   href: "/teacher", icon: <FaFlask />, color: "bg-teal-50 text-teal-600" },
  ],
  student: [
    { title: "My Profile",      desc: "Update your student profile",   href: "/profile", icon: <FaUser />,             color: "bg-blue-50 text-blue-600" },
    { title: "My Record",       desc: "View your academic info",       href: "/student", icon: <FaChalkboardTeacher />, color: "bg-violet-50 text-violet-600" },
  ],
  alumni: [
    { title: "My Profile",      desc: "Update your alumni profile",    href: "/profile",        icon: <FaUser />,  color: "bg-blue-50 text-blue-600" },
    { title: "Alumni Page",     desc: "View your public alumni page",  href: "/alumni-profile", icon: <FaUsers />, color: "bg-emerald-50 text-emerald-600" },
  ],
};

export default function DashboardPage() {
  const { user }                        = useAuth();
  const { stats, loading, error, refetch } = useStats();
  const cards                           = roleCards[user?.role || "student"] || [];
  const isAdmin                         = user?.role === "admin";

  return (
    <div className="space-y-6">

      {/* ── Welcome banner ── */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="bg-ocean-gradient text-white rounded-2xl p-6">
          <p className="text-ocean-200 text-sm mb-1">Welcome back,</p>
          <h1 className="text-2xl font-display font-bold">{user?.name}</h1>
          <p className="text-ocean-200 text-sm mt-1 capitalize">
            {user?.role} · Faculty of Fisheries, PSTU
            {user?.department && ` · ${user.department}`}
          </p>
        </div>
      </motion.div>

      {/* ── Admin: Live stats from MongoDB ── */}
      {isAdmin && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-ocean-900 text-lg">Live Database Stats</h2>
            <button onClick={refetch}
              className="flex items-center gap-2 text-xs text-ocean-500 hover:text-ocean-700 border border-ocean-200 hover:border-ocean-400 px-3 py-1.5 rounded-lg transition-all">
              <FaSync className={loading ? "animate-spin" : ""} /> Refresh
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm mb-4">
              Failed to load stats: {error}
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse bg-white rounded-2xl border border-ocean-100 h-24" />
              ))}
            </div>
          ) : stats && (
            <>
              {/* Main counts */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {[
                  { label: "Registered Users",  value: stats.totalUsers,    icon: <FaUsers />,            color: "bg-blue-50 text-blue-600",    border: "border-blue-100" },
                  { label: "Faculty Members",   value: stats.totalTeachers, icon: <FaChalkboardTeacher />,color: "bg-teal-50 text-teal-600",    border: "border-teal-100" },
                  { label: "Alumni Profiles",   value: stats.totalAlumni,   icon: <FaUserGraduate />,     color: "bg-amber-50 text-amber-600",  border: "border-amber-100" },
                  { label: "Publications",      value: stats.totalResearch, icon: <FaFlask />,            color: "bg-violet-50 text-violet-600",border: "border-violet-100" },
                ].map((stat, i) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className={`bg-white rounded-2xl border ${stat.border} p-5`}>
                    <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center text-lg mb-3`}>
                      {stat.icon}
                    </div>
                    <p className="text-2xl font-display font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Users by role */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {[
                  { label: "Students",  value: stats.byRole.student, icon: <FaUser />,        color: "bg-blue-100 text-blue-700" },
                  { label: "Teachers",  value: stats.byRole.teacher, icon: <FaChalkboardTeacher />, color: "bg-teal-100 text-teal-700" },
                  { label: "Alumni",    value: stats.byRole.alumni,  icon: <FaUserGraduate />, color: "bg-amber-100 text-amber-700" },
                  { label: "Admins",    value: stats.byRole.admin,   icon: <FaUserShield />,   color: "bg-red-100 text-red-700" },
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-ocean-100 p-4 flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl ${item.color} flex items-center justify-center text-sm flex-shrink-0`}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xl font-display font-bold text-gray-900">{item.value}</p>
                      <p className="text-xs text-gray-400">{item.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* New signups */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-ocean-50 rounded-2xl border border-ocean-100 p-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-ocean-100 text-ocean-600 flex items-center justify-center flex-shrink-0">
                    <FaCalendarAlt />
                  </div>
                  <div>
                    <p className="text-xl font-display font-bold text-ocean-900">{stats.newToday}</p>
                    <p className="text-xs text-ocean-500">New signups today</p>
                  </div>
                </div>
                <div className="bg-teal-50 rounded-2xl border border-teal-100 p-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center flex-shrink-0">
                    <FaCalendarAlt />
                  </div>
                  <div>
                    <p className="text-xl font-display font-bold text-teal-900">{stats.newThisMonth}</p>
                    <p className="text-xs text-teal-500">New signups this month</p>
                  </div>
                </div>
              </div>

              {/* Recent signups table */}
              {stats.recentUsers.length > 0 && (
                <div className="bg-white rounded-2xl border border-ocean-100 overflow-hidden">
                  <div className="px-5 py-4 border-b border-ocean-50 flex items-center justify-between">
                    <h3 className="font-display font-bold text-ocean-900 text-sm">Recent Signups</h3>
                    <span className="text-xs text-ocean-400">Last 5 registrations</span>
                  </div>
                  <div className="divide-y divide-ocean-50">
                    {stats.recentUsers.map((u, i) => (
                      <motion.div key={u._id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        className="flex items-center gap-3 px-5 py-3 hover:bg-ocean-50 transition-colors">
                        {u.photo ? (
                          <Image src={u.photo} alt={u.name} width={36} height={36}
                            className="rounded-full object-cover flex-shrink-0" />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-ocean-gradient flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                            {u.name?.[0]?.toUpperCase()}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{u.name}</p>
                          <p className="text-xs text-gray-400 truncate">{u.email}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${roleColors[u.role] || "bg-gray-100 text-gray-600"}`}>
                            {u.role}
                          </span>
                          <span className="text-xs text-gray-400 hidden sm:block">
                            {format(new Date(u.createdAt), "dd MMM")}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </motion.div>
      )}

      {/* ── Role-based quick action cards ── */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: isAdmin ? 0.3 : 0.1 }}>
        <h2 className="font-display font-bold text-ocean-900 text-lg mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {cards.map((card, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}>
              <Link href={card.href}
                className="block card-fish p-5 hover:-translate-y-0.5 transition-transform duration-200">
                <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center mb-4 text-xl`}>
                  {card.icon}
                </div>
                <h3 className="font-display font-bold text-gray-900 mb-1">{card.title}</h3>
                <p className="text-gray-500 text-sm">{card.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Non-admin: personal stats ── */}
      {!isAdmin && stats && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}>
          <h2 className="font-display font-bold text-ocean-900 text-lg mb-4">Faculty at a Glance</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Faculty Members",  value: stats.totalTeachers, icon: <FaChalkboardTeacher />, color: "bg-blue-50 text-blue-600" },
              { label: "Alumni Network",   value: stats.totalAlumni,   icon: <FaUserGraduate />,      color: "bg-amber-50 text-amber-600" },
              { label: "Publications",     value: stats.totalResearch, icon: <FaFlask />,             color: "bg-teal-50 text-teal-600" },
              { label: "News & Events",    value: stats.totalNews,     icon: <FaNewspaper />,         color: "bg-violet-50 text-violet-600" },
            ].map((s, i) => (
              <div key={i} className="card-fish p-5 text-center">
                <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center text-lg mx-auto mb-3`}>
                  {s.icon}
                </div>
                <p className="text-2xl font-display font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}