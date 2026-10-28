"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Alumni } from "@/types";
import {
  FaArrowRight,
  FaBriefcase,
  FaGraduationCap,
  FaLinkedin,
  FaMapMarkerAlt,
  FaCheckCircle,
} from "react-icons/fa";

interface Props {
  alumni: Alumni;
  index?: number;
  onClick?: () => void;
}

export default function AlumniCard({ alumni, index = 0, onClick }: Props) {
  const batch = alumni.batch ? `Batch ${alumni.batch}` : "Alumni";

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.24) }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? `View ${alumni.name}'s alumni profile` : undefined}
      onKeyDown={(event) => {
        if (onClick && (event.key === "Enter" || event.key === " ")) {
          if (event.target !== event.currentTarget) return;
          event.preventDefault();
          onClick();
        }
      }}
      className="group h-full cursor-pointer rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087EA4]"
    >
      <div className="relative flex h-full min-h-[245px] flex-col overflow-hidden rounded-2xl border border-[#DCEBF0] bg-white shadow-[0_8px_24px_rgba(18,59,74,0.06)] transition-all duration-300 group-hover:border-[#9ACBD9] group-hover:shadow-[0_18px_38px_rgba(18,59,74,0.12)]">
        <div className="h-1 w-full bg-gradient-to-r from-[#075985] via-[#087EA4] to-[#2DD4BF] opacity-75 transition-opacity group-hover:opacity-100" />

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="relative h-[84px] w-[84px] shrink-0 overflow-hidden rounded-xl border border-[#DCEBF0] bg-[#F0FAFC] shadow-sm sm:h-24 sm:w-24">
              {alumni.photo ? (
                <Image
                  src={alumni.photo}
                  alt={alumni.name}
                  fill
                  sizes="96px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center font-display text-2xl font-semibold text-[#087EA4]">
                  {alumni.name?.[0]?.toUpperCase() || "A"}
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1 pt-1">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF5F8] px-2.5 py-1 text-[10px] font-semibold tracking-wide text-[#087EA4]">
                <FaGraduationCap size={10} />
                {batch}
              </span>
              <h3 className="mt-2 line-clamp-2 font-display text-base font-semibold leading-snug text-[#123B4A] transition-colors group-hover:text-[#087EA4]">
                {alumni.name}
              </h3>
              {alumni.nameBn && (
                <p lang="bn" className="mt-0.5 truncate text-xs text-[#6B8791]">
                  {alumni.nameBn}
                </p>
              )}
              {alumni.isVerified && <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-bold text-emerald-700" aria-label="Verified PSTU profile"><FaCheckCircle aria-hidden="true" /> Verified PSTU record</span>}
            </div>

            {alumni.linkedin && alumni.linkedin !== "#" && (
              <a
                href={alumni.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${alumni.name} LinkedIn profile`}
                onClick={(event) => event.stopPropagation()}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#DCEBF0] text-[#55727D] transition-colors hover:border-[#087EA4]/30 hover:bg-[#EAF5F8] hover:text-[#087EA4]"
              >
                <FaLinkedin size={14} />
              </a>
            )}
          </div>

          <div className="mt-5 space-y-2.5 border-t border-[#E7F0F3] pt-4">
            {(alumni.currentPosition || alumni.presentStatus) && (
              <div className="flex items-start gap-2.5 text-sm text-[#466671]">
                <FaBriefcase className="mt-1 shrink-0 text-[#087EA4]" size={12} />
                <span className="line-clamp-2 leading-5">
                  {alumni.currentPosition || alumni.presentStatus}
                  {alumni.currentPosition && alumni.presentStatus
                    ? ` · ${alumni.presentStatus}`
                    : ""}
                </span>
              </div>
            )}
            {alumni.organization && (
              <p className="line-clamp-2 pl-[22px] text-xs leading-5 text-[#6B8791]">
                {alumni.organization}
              </p>
            )}
            {(alumni.location || alumni.permanentAddress) && (
              <div className="flex items-start gap-2.5 text-xs leading-5 text-[#6B8791]">
                <FaMapMarkerAlt className="mt-1 shrink-0 text-[#087EA4]" size={11} />
                <span className="line-clamp-1">
                  {alumni.location || alumni.permanentAddress}
                </span>
              </div>
            )}
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-[#E7F0F3] pt-4 mt-5">
            <span className="text-xs font-semibold text-[#087EA4]">View profile</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EAF5F8] text-[#087EA4] transition-all duration-300 group-hover:translate-x-1 group-hover:bg-[#087EA4] group-hover:text-white">
              <FaArrowRight size={11} />
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
