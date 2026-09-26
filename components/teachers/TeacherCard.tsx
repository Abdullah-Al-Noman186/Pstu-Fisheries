"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Teacher, Department, DEPARTMENTS } from "@/types";
import { FaEnvelope, FaBook, FaPhone, FaChalkboardTeacher } from "react-icons/fa";

interface Props {
  teacher: Teacher;
  index?: number;
  onClick?: () => void;
}

const deptGradients: Record<string, string> = {
  AQC: "from-blue-700 via-blue-600 to-cyan-600",
  FBG: "from-emerald-700 via-emerald-600 to-teal-500",
  FMN: "from-violet-700 via-violet-600 to-purple-500",
  FST: "from-amber-700 via-amber-600 to-orange-500",
  MFO: "from-cyan-700 via-cyan-600 to-blue-500",
};

const deptAccent: Record<string, string> = {
  AQC: "text-cyan-300",
  FBG: "text-emerald-300",
  FMN: "text-violet-300",
  FST: "text-amber-300",
  MFO: "text-cyan-300",
};

export default function TeacherCard({ teacher, index = 0, onClick }: Props) {
  const grad   = deptGradients[teacher.department || ""] || "from-blue-700 via-blue-600 to-cyan-600";
  const accent = deptAccent[teacher.department || ""]   || "text-cyan-300";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      onClick={onClick}
      className="relative isolate overflow-hidden rounded-2xl shadow-xl cursor-pointer group"
      style={{ isolation: "isolate" }}>

      {/* ── Gradient background ── */}
      <div className={`absolute inset-0 bg-gradient-to-br ${grad}`} />

      {/* ── Decorative shapes ── */}
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/8 blur-md" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/8 blur-md" />
      <div className="absolute top-6 right-20 w-2 h-2 rounded-full bg-white/30" />
      <div className="absolute bottom-10 left-16 w-1.5 h-1.5 rounded-full bg-white/20" />

      {/* ── Hover overlay hint ── */}
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-center pb-3 z-20">
        <span className="text-white text-[10px] font-semibold bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
          Click to view profile
        </span>
      </div>

      {/* ── Glass content ── */}
      <div className="relative z-10 p-5 flex flex-col items-center text-center">

        {/* HOD badge */}
        {teacher.isHOD && (
          <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-0.5 rounded-full border border-white/30 tracking-wider">
            HOD
          </div>
        )}

        {/* Avatar */}
        <div className="relative mb-4 mt-1">
          {teacher.photo ? (
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-white/30 shadow-xl">
              <Image src={teacher.photo} alt={teacher.name} fill className="object-cover" />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-white/15 backdrop-blur-sm ring-4 ring-white/30 flex items-center justify-center shadow-xl">
              <span className="text-white font-display font-bold text-2xl">
                {teacher.name?.[0]?.toUpperCase()}
              </span>
            </div>
          )}
          {/* Department dot */}
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white/20 backdrop-blur-sm ring-2 ring-white/30 flex items-center justify-center">
            <FaChalkboardTeacher className="text-white" size={8} />
          </div>
        </div>

        {/* Name */}
        <h3 className="font-display font-bold text-white text-sm leading-tight mb-0.5 px-2">
          {teacher.name}
        </h3>

        {/* Designation */}
        {teacher.designation && (
          <p className={`text-[11px] font-medium mb-3 ${accent}`}>
            {teacher.designation}
          </p>
        )}

        {/* Department pill */}
        {teacher.department && (
          <span className="inline-flex items-center gap-1 bg-white/15 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/20 mb-3">
            {teacher.department} — {DEPARTMENTS[teacher.department as Department]}
          </span>
        )}

        {/* Research areas */}
        {teacher.researchAreas && teacher.researchAreas.length > 0 && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2 mb-3 w-full">
            <p className="text-white/70 text-[10px] line-clamp-2 leading-relaxed">
              {teacher.researchAreas.join(" · ")}
            </p>
          </div>
        )}

        {/* Divider */}
        <div className="w-full border-t border-white/15 mb-3" />

        {/* Stats + contact */}
        <div className="flex items-center justify-center gap-4 w-full">
          {teacher.publications && (
            <span className="flex items-center gap-1 text-white/70 text-[10px]">
              <FaBook size={9} className="text-white/50" />
              {teacher.publications} papers
            </span>
          )}
          {teacher.email && (
            <a href={`mailto:${teacher.email}`}
              onClick={e => e.stopPropagation()}
              className="flex items-center gap-1 text-white/70 hover:text-white text-[10px] transition-colors">
              <FaEnvelope size={9} className="text-white/50" />
              Email
            </a>
          )}
          {teacher.phone && (
            <a href={`tel:${teacher.phone}`}
              onClick={e => e.stopPropagation()}
              className="flex items-center gap-1 text-white/70 hover:text-white text-[10px] transition-colors">
              <FaPhone size={9} className="text-white/50" />
              Call
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}