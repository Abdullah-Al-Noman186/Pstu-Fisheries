"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight, FaArchive, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { useHomeData } from "@/contexts/HomeDataContext";

export default function ArchiveSection() {
  const { data, loading } = useHomeData();
  const stories = data?.archive ?? [];

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24">
      <div className="pointer-events-none absolute -right-32 -top-28 h-96 w-96 rounded-full bg-[#2DD4BF]/10 blur-[110px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-36 h-96 w-96 rounded-full bg-[#087EA4]/[0.07] blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <div className="mb-3 flex items-center gap-2 text-[#087EA4]"><FaArchive size={11} /><span className="text-[10px] font-bold uppercase tracking-[0.25em]">Faculty Archive</span></div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-[#123B4A] sm:text-4xl">Stories from our community</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#55727D]">Research, fieldwork, achievements, and moments from across the Faculty of Fisheries.</p>
          </div>
          <Link href="/archive" className="group inline-flex items-center gap-3 rounded-xl border border-[#087EA4]/10 bg-white px-4 py-3 text-xs font-bold text-[#087EA4] shadow-sm transition hover:-translate-y-0.5 hover:border-[#2DD4BF]/40 hover:shadow-md">
            Explore archive <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#087EA4]/[0.07] transition group-hover:bg-[#087EA4] group-hover:text-white"><FaArrowRight size={9} /></span>
          </Link>
        </motion.div>

        {stories.length ? (
          <div className="grid gap-5 md:grid-cols-3">
            {stories.map((story, index) => (
              <motion.article key={story._id || story.id || story.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.08 }} className="group overflow-hidden rounded-3xl border border-[#087EA4]/10 bg-white shadow-[0_12px_36px_rgba(7,89,133,0.07)] transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(7,89,133,0.13)]">
                <Link href="/archive" className="block">
                  <div className="relative h-52 overflow-hidden bg-gradient-to-br from-[#087EA4] to-[#2DD4BF]">
                    {story.image && <Image src={story.image} alt={story.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#082D3A]/70 via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-white/15 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur">{story.category}</span>
                  </div>
                  <div className="p-5">
                    <div className="mb-3 flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-medium text-[#55727D]"><span className="flex items-center gap-1.5"><FaCalendarAlt className="text-[#087EA4]" />{story.year || (story.createdAt ? new Date(story.createdAt).getFullYear() : "Faculty story")}</span>{story.location && <span className="flex items-center gap-1.5"><FaMapMarkerAlt className="text-[#087EA4]" />{story.location}</span>}</div>
                    <h3 className="line-clamp-2 text-base font-bold leading-6 text-[#123B4A] transition-colors group-hover:text-[#087EA4]">{story.title}</h3>
                    <p className="mt-2 line-clamp-3 text-xs leading-6 text-[#55727D]">{story.description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#087EA4]">Read in archive <FaArrowRight size={9} className="transition group-hover:translate-x-1" /></span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        ) : loading ? (
          <div className="rounded-3xl border border-dashed border-[#087EA4]/20 bg-[#F0FAFC]/60 px-6 py-12 text-center text-sm text-[#55727D]">Loading archive stories…</div>
        ) : (
          <div className="rounded-3xl border border-dashed border-[#087EA4]/20 bg-[#F0FAFC]/60 px-6 py-12 text-center text-sm text-[#55727D]">Archive stories will appear here when published.</div>
        )}
      </div>
    </section>
  );
}
