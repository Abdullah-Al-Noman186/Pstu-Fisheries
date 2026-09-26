"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Alumni, DEPARTMENTS, Department } from "@/types";
import {
  FaLinkedin, FaMapMarkerAlt, FaBriefcase,
  FaGraduationCap, FaPhone, FaEnvelope,
  FaTimes, FaTrophy, FaQuoteLeft, FaCalendarAlt
} from "react-icons/fa";
import { useEffect } from "react";

const deptGradients: Record<string, string> = {
  AQC: "from-blue-600 to-cyan-500",
  FBG: "from-emerald-600 to-teal-500",
  FMN: "from-violet-600 to-purple-500",
  FST: "from-amber-600 to-orange-500",
  MFO: "from-cyan-600 to-blue-500",
};

interface Props {
  alumni: Alumni | null;
  onClose: () => void;
}

export default function AlumniModal({ alumni, onClose }: Props) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent body scroll when modal open
  useEffect(() => {
    if (alumni) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [alumni]);

  const grad = deptGradients[alumni?.department || ""] || "from-ocean-700 to-ocean-500";

  return (
    <AnimatePresence>
      {alumni && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">

            <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl pointer-events-auto"
              onClick={e => e.stopPropagation()}>

              {/* ── Header with gradient ── */}
              <div className={`relative bg-gradient-to-br ${grad} p-6 overflow-hidden`}>
                {/* Decorative circles */}
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
                <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/10" />

                {/* Close button */}
                <button onClick={onClose}
                  className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all hover:scale-110">
                  <FaTimes size={14} />
                </button>

                {/* Avatar + name */}
                <div className="relative z-10 flex items-end gap-4">
                  <div className="relative flex-shrink-0">
                    {alumni.photo ? (
                      <div className="relative w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-white/40 shadow-xl">
                        <Image src={alumni.photo} alt={alumni.name} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm ring-4 ring-white/40 flex items-center justify-center shadow-xl">
                        <span className="text-white font-display font-bold text-3xl">
                          {alumni.name?.[0]?.toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 pb-1">
                    <h2 className="font-display font-bold text-white text-xl leading-tight mb-1">
                      {alumni.name}
                    </h2>
                    {alumni.currentPosition && (
                      <p className="text-white/80 text-sm flex items-center gap-1.5">
                        <FaBriefcase size={11} className="flex-shrink-0" />
                        {alumni.currentPosition}
                      </p>
                    )}
                    {alumni.linkedin && alumni.linkedin !== "#" && (
                      <a href={alumni.linkedin} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-2 text-white/70 hover:text-white text-xs transition-colors">
                        <FaLinkedin size={12} /> LinkedIn Profile
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* ── Body ── */}
              <div className="bg-white rounded-b-3xl">

                {/* Tags row */}
                <div className="flex flex-wrap gap-2 px-6 py-4 border-b border-gray-100">
                  {/* {alumni.department && (
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full text-white bg-gradient-to-r ${grad}`}>
                      <FaGraduationCap size={10} />
                      {alumni.department} — {DEPARTMENTS[alumni.department as Department]}
                    </span>
                  )} */}
                  {alumni.batch && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-ocean-100 text-ocean-700">
                      <FaCalendarAlt size={10} />
                      Batch {alumni.batch}
                    </span>
                  )}
                  {alumni.location && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-gray-100 text-gray-600">
                      <FaMapMarkerAlt size={10} />
                      {alumni.location}
                    </span>
                  )}
                </div>

                {/* Info grid */}
                <div className="px-6 py-4 space-y-3">

                  {/* Organization */}
                  {alumni.organization && (
                    <div className="flex items-start gap-3 p-3 bg-ocean-50 rounded-xl">
                      <div className="w-8 h-8 rounded-lg bg-ocean-100 flex items-center justify-center flex-shrink-0">
                        <FaBriefcase className="text-ocean-600" size={13} />
                      </div>
                      <div>
                        <p className="text-xs text-ocean-400 font-medium mb-0.5">Organization</p>
                        <p className="text-sm font-semibold text-gray-900">{alumni.organization}</p>
                      </div>
                    </div>
                  )}

                  {/* Contact row */}
                  {(alumni.email || alumni.phone) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {alumni.email && (
                        <a href={`mailto:${alumni.email}`}
                          className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors group">
                          <div className="w-8 h-8 rounded-lg bg-blue-100 group-hover:bg-blue-200 flex items-center justify-center flex-shrink-0 transition-colors">
                            <FaEnvelope className="text-blue-600" size={13} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs text-blue-400 font-medium mb-0.5">Email</p>
                            <p className="text-xs font-semibold text-gray-900 truncate">{alumni.email}</p>
                          </div>
                        </a>
                      )}
                      {alumni.phone && (
                        <a href={`tel:${alumni.phone}`}
                          className="flex items-center gap-3 p-3 bg-green-50 rounded-xl hover:bg-green-100 transition-colors group">
                          <div className="w-8 h-8 rounded-lg bg-green-100 group-hover:bg-green-200 flex items-center justify-center flex-shrink-0 transition-colors">
                            <FaPhone className="text-green-600" size={13} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs text-green-400 font-medium mb-0.5">Phone</p>
                            <p className="text-xs font-semibold text-gray-900 truncate">{alumni.phone}</p>
                          </div>
                        </a>
                      )}
                    </div>
                  )}

                  {/* Testimonial */}
                  {alumni.testimonial && (
                    <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-ocean-400">
                      <FaQuoteLeft className="text-ocean-300 mb-2" size={16} />
                      <p className="text-gray-600 text-sm italic leading-relaxed">
                        {alumni.testimonial}
                      </p>
                    </div>
                  )}

                  {/* Achievements */}
                  {alumni.achievements && alumni.achievements.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <FaTrophy className="text-amber-500" size={11} /> Achievements
                      </p>
                      <div className="space-y-2">
                        {alumni.achievements.map((a, i) => (
                          <div key={i} className="flex items-center gap-2 p-2.5 bg-amber-50 rounded-lg">
                            <span className="text-amber-500 flex-shrink-0">🏆</span>
                            <span className="text-sm text-gray-700">{a}</span>
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
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}