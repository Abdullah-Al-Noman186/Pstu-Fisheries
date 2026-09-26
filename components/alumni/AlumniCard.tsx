"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Alumni } from "@/types";
import {
  FaLinkedin, FaMapMarkerAlt, FaBriefcase,
  FaGraduationCap, FaPhone, FaEnvelope,
} from "react-icons/fa";

interface Props {
  alumni: Alumni;
  index?: number;
  onClick?: () => void;
}

const deptGradients: Record<string, string> = {
  AQC: "from-blue-600 to-cyan-500",
  FBG: "from-emerald-600 to-teal-500",
  FMN: "from-violet-600 to-purple-500",
  FST: "from-amber-600 to-orange-500",
  MFO: "from-cyan-600 to-blue-500",
};

export default function AlumniCard({ alumni, index = 0, onClick }: Props) {
  const grad = deptGradients[alumni.department || ""] || "from-ocean-700 to-ocean-500";

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="relative isolate overflow-hidden rounded-2xl shadow-lg cursor-pointer"
      style={{ isolation: "isolate" }}>

      <div className={`absolute inset-0 bg-gradient-to-br ${grad}`} />
      <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-white/10" />
      <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-white/10" />

      {/* "View details" hint on hover */}
      <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-end justify-center pb-3 z-20">
        <span className="text-white text-xs font-semibold bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
          Click to view details
        </span>
      </div>

      <div className="relative z-10 p-5 text-white">
        {/* Avatar + name + linkedin */}
        <div className="mb-4 flex items-start gap-3">
          <div className="relative shrink-0">
            {alumni.photo ? (
              <div className="relative h-14 w-14 overflow-hidden rounded-2xl ring-2 ring-white/40">
                <Image src={alumni.photo} alt={alumni.name} fill className="object-cover" />
              </div>
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-xl font-bold ring-2 ring-white/40">
                {alumni.name?.[0]?.toUpperCase() || "A"}
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate font-display text-sm font-bold">{alumni.name}</h3>
            {alumni.currentPosition && (
              <p className="mt-1 flex items-center gap-1 truncate text-xs text-white/80">
                <FaBriefcase size={9} /> {alumni.currentPosition}
              </p>
            )}
          </div>

          {alumni.linkedin && alumni.linkedin !== "#" && (
            <a href={alumni.linkedin} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/20 transition hover:scale-110 hover:bg-white/30 z-30 relative">
              <FaLinkedin size={13} />
            </a>
          )}
        </div>

        {/* Organization */}
        {alumni.organization && (
          <div className="mb-3 rounded-xl bg-white/15 px-3 py-2">
            <p className="truncate text-xs font-medium text-white/90">{alumni.organization}</p>
          </div>
        )}

        {/* Phone + email */}
        {(alumni.phone || alumni.email) && (
          <div className="mb-3 space-y-1.5 rounded-xl bg-white/10 px-3 py-2.5">
            {alumni.phone && (
              <a href={`tel:${alumni.phone}`} onClick={e => e.stopPropagation()}
                className="flex items-center gap-2 text-xs font-medium text-white/85 transition hover:text-white">
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/20">
                  <FaPhone size={9} />
                </span>
                <span className="truncate">{alumni.phone}</span>
              </a>
            )}
            {alumni.email && (
              <a href={`mailto:${alumni.email}`} onClick={e => e.stopPropagation()}
                className="flex items-center gap-2 text-xs font-medium text-white/85 transition hover:text-white">
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/20">
                  <FaEnvelope size={9} />
                </span>
                <span className="truncate">{alumni.email}</span>
              </a>
            )}
          </div>
        )}

        {/* Dept + batch + location */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/20 pt-3">
          <div className="flex flex-wrap gap-2">
            {/* {alumni.department && (
              <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-bold">
                <FaGraduationCap size={9} /> {alumni.department}
              </span>
            )} */}
            {alumni.batch && (
              <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold text-white/90">
                Batch &apos;{String(alumni.batch).slice(-2)}
              </span>
            )}
          </div>
          {alumni.location && (
            <span className="flex items-center gap-1 text-[10px] text-white/75 truncate max-w-[45%]">
              <FaMapMarkerAlt size={9} /> {alumni.location.split(",")[0]}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}