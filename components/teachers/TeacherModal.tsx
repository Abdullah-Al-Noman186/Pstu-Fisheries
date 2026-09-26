"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Teacher, Department, DEPARTMENTS } from "@/types";
import {
  FaTimes, FaEnvelope, FaPhone, FaBook,
  FaFlask, FaGraduationCap, FaCalendarAlt,
  FaChalkboardTeacher, FaUniversity
} from "react-icons/fa";
import { useEffect } from "react";

const deptGradients: Record<string, string> = {
  AQC: "from-blue-700 via-blue-600 to-cyan-600",
  FBG: "from-emerald-700 via-emerald-600 to-teal-500",
  FMN: "from-violet-700 via-violet-600 to-purple-500",
  FST: "from-amber-700 via-amber-600 to-orange-500",
  MFO: "from-cyan-700 via-cyan-600 to-blue-500",
};

interface Props {
  teacher: Teacher | null;
  onClose: () => void;
}

export default function TeacherModal({ teacher, onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = teacher ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [teacher]);

  const grad = deptGradients[teacher?.department || ""] || "from-blue-700 via-blue-600 to-cyan-600";

  return (
    <AnimatePresence>
      {teacher && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/65 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 24 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl pointer-events-auto"
              onClick={e => e.stopPropagation()}>

              {/* ── Header ── */}
              <div className={`relative bg-gradient-to-br ${grad} p-6 overflow-hidden`}>
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-sm" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/10 blur-sm" />

                {/* Close */}
                <button onClick={onClose}
                  className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-all hover:scale-110">
                  <FaTimes size={13} />
                </button>

                {/* HOD badge */}
                {teacher.isHOD && (
                  <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white text-[9px] font-bold px-2.5 py-1 rounded-full border border-white/30 tracking-widest">
                    HEAD OF DEPARTMENT
                  </div>
                )}

                {/* Avatar + name */}
                <div className="relative z-10 flex items-end gap-4 mt-6">
                  <div className="relative flex-shrink-0">
                    {teacher.photo ? (
                      <div className="relative w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-white/30 shadow-xl">
                        <Image src={teacher.photo} alt={teacher.name} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-2xl bg-white/15 backdrop-blur-sm ring-4 ring-white/30 flex items-center justify-center shadow-xl">
                        <span className="text-white font-display font-bold text-3xl">
                          {teacher.name?.[0]?.toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 pb-1">
                    <h2 className="font-display font-bold text-white text-xl leading-tight mb-1">
                      {teacher.name}
                    </h2>
                    {teacher.designation && (
                      <p className="text-white/75 text-sm font-medium">{teacher.designation}</p>
                    )}
                    {teacher.department && (
                      <span className="inline-flex items-center gap-1.5 mt-2 bg-white/15 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20">
                        <FaGraduationCap size={9} />
                        {teacher.department} — {DEPARTMENTS[teacher.department as Department]}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* ── Body ── */}
              <div className="bg-white rounded-b-3xl">

                {/* Quick stats */}
                <div className="grid grid-cols-3 divide-x divide-gray-100 border-b border-gray-100">
                  {[
                    { icon: <FaBook className="text-ocean-500" size={14} />, value: teacher.publications || "—", label: "Papers" },
                    { icon: <FaCalendarAlt className="text-teal-500" size={14} />, value: teacher.joinYear || "—", label: "Joined" },
                    { icon: <FaFlask className="text-violet-500" size={14} />, value: teacher.researchAreas?.length || "—", label: "Research Areas" },
                  ].map((s, i) => (
                    <div key={i} className="flex flex-col items-center py-4 px-3">
                      {s.icon}
                      <p className="font-display font-bold text-gray-900 text-lg mt-1 leading-none">{s.value}</p>
                      <p className="text-gray-400 text-[10px] mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>

                <div className="px-6 py-5 space-y-4">

                  {/* Contact */}
                  {(teacher.email || teacher.phone) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {teacher.email && (
                        <a href={`mailto:${teacher.email}`}
                          className="flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors group">
                          <div className="w-8 h-8 rounded-lg bg-blue-100 group-hover:bg-blue-200 flex items-center justify-center flex-shrink-0 transition-colors">
                            <FaEnvelope className="text-blue-600" size={13} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] text-blue-400 font-medium">Email</p>
                            <p className="text-xs font-semibold text-gray-900 truncate">{teacher.email}</p>
                          </div>
                        </a>
                      )}
                      {teacher.phone && (
                        <a href={`tel:${teacher.phone}`}
                          className="flex items-center gap-3 p-3 bg-green-50 hover:bg-green-100 rounded-xl transition-colors group">
                          <div className="w-8 h-8 rounded-lg bg-green-100 group-hover:bg-green-200 flex items-center justify-center flex-shrink-0 transition-colors">
                            <FaPhone className="text-green-600" size={13} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] text-green-400 font-medium">Phone</p>
                            <p className="text-xs font-semibold text-gray-900 truncate">{teacher.phone}</p>
                          </div>
                        </a>
                      )}
                    </div>
                  )}

                  {/* Bio */}
                  {teacher.bio && (
                    <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-ocean-400">
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <FaChalkboardTeacher size={10} /> About
                      </p>
                      <p className="text-gray-600 text-sm leading-relaxed">{teacher.bio}</p>
                    </div>
                  )}

                  {/* Research areas */}
                  {teacher.researchAreas && teacher.researchAreas.length > 0 && (
                    <div>
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <FaFlask size={10} className="text-violet-400" /> Research Areas
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {teacher.researchAreas.map((area, i) => (
                          <span key={i}
                            className="text-xs bg-violet-50 text-violet-700 font-medium px-3 py-1.5 rounded-full border border-violet-100">
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Education */}
                  {teacher.education && teacher.education.length > 0 && (
                    <div>
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <FaUniversity size={10} className="text-ocean-400" /> Education
                      </p>
                      <div className="space-y-3">
                        {teacher.education.map((edu, i) => (
                          <div key={i} className="flex gap-3">
                            <div className="w-8 h-8 rounded-lg bg-ocean-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <FaGraduationCap className="text-ocean-500" size={12} />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900 leading-tight">{edu.degree}</p>
                              <p className="text-xs text-gray-500">{edu.institution}</p>
                              <p className="text-[10px] text-gray-400 mt-0.5">{edu.year}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="px-6 pb-5">
                  <button onClick={onClose}
                    className="w-full py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-medium transition-colors">
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}