"use client";

import { useEffect, useState } from "react";
import { useHomeData } from "@/contexts/HomeDataContext";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FaArrowRight, FaChevronLeft, FaChevronRight, FaGraduationCap, FaUsers } from "react-icons/fa";

export default function AlumniBatchesSlider() {
  const { data, loading } = useHomeData();
  const [activePage, setActivePage] = useState(0);
  const batches = data?.batches ?? [];

  const pages = Math.max(1, Math.ceil(batches.length / 3));
  const visibleBatches = batches.slice(activePage * 3, activePage * 3 + 3);

  useEffect(() => {
    setActivePage((current) => Math.min(current, pages - 1));
    if (pages < 2) return;
    const timer = window.setInterval(() => setActivePage((current) => (current + 1) % pages), 6000);
    return () => window.clearInterval(timer);
  }, [pages]);

  const move = (direction: number) => setActivePage((current) => (current + direction + pages) % pages);

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.45 }}
      className="mt-16 lg:mt-20"
      aria-label="Alumni batches"
    >
      <div className="rounded-[1.75rem] border border-white/70 bg-white/75 p-5 shadow-[0_20px_60px_rgba(7,89,133,0.12)] backdrop-blur-xl sm:p-6">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2 text-[#087EA4]">
              <FaGraduationCap size={12} />
              <span className="text-[10px] font-bold uppercase tracking-[0.24em]">Alumni network</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-[#123B4A] sm:text-2xl">Explore alumni batches</h2>
            <p className="mt-1 text-xs text-[#55727D]">Graduates building impact across Bangladesh and beyond.</p>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <button type="button" onClick={() => move(-1)} disabled={pages < 2} aria-label="Previous batches" className="grid h-9 w-9 place-items-center rounded-full border border-[#087EA4]/15 bg-white text-[#087EA4] transition hover:bg-[#087EA4] hover:text-white disabled:opacity-40"><FaChevronLeft size={10} /></button>
            <button type="button" onClick={() => move(1)} disabled={pages < 2} aria-label="Next batches" className="grid h-9 w-9 place-items-center rounded-full border border-[#087EA4]/15 bg-white text-[#087EA4] transition hover:bg-[#087EA4] hover:text-white disabled:opacity-40"><FaChevronRight size={10} /></button>
          </div>
        </div>

        {visibleBatches.length ? (
          <AnimatePresence mode="wait">
            <motion.div key={activePage} initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -14 }} transition={{ duration: 0.25 }} className="grid gap-3 sm:grid-cols-3">
              {visibleBatches.map(({ batch, count }) => (
                <Link key={batch} href="/Ouralumni" className="group flex items-center justify-between rounded-2xl border border-[#087EA4]/10 bg-gradient-to-br from-white to-[#F0FAFC] p-4 transition hover:-translate-y-0.5 hover:border-[#2DD4BF]/50 hover:shadow-lg">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#55727D]">Graduating class</p>
                    <p className="mt-1 text-2xl font-black tracking-tight text-[#075985]">{batch}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-[11px] font-medium text-[#55727D]"><FaUsers size={10} className="text-[#0891B2]" />{count.toLocaleString()} alumni</p>
                  </div>
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[#087EA4]/8 text-[#087EA4] transition group-hover:bg-[#087EA4] group-hover:text-white"><FaArrowRight size={10} /></span>
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>
        ) : loading ? (
          <div className="rounded-2xl border border-dashed border-[#087EA4]/20 bg-white/60 px-5 py-8 text-center text-sm text-[#55727D]">Loading alumni batches…</div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[#087EA4]/20 bg-white/60 px-5 py-8 text-center text-sm text-[#55727D]">
            Alumni batches will appear here as alumni profiles are added.
          </div>
        )}

        <div className="mt-5 flex items-center justify-between">
          <div className="flex gap-1.5" aria-label={`${pages} batch pages`}>
            {Array.from({ length: pages }, (_, index) => (
              <button key={index} type="button" aria-label={`Show batch page ${index + 1}`} onClick={() => setActivePage(index)} className={`h-1.5 rounded-full transition-all ${index === activePage ? "w-6 bg-[#087EA4]" : "w-1.5 bg-[#087EA4]/25"}`} />
            ))}
          </div>
          <Link href="/Ouralumni" className="inline-flex items-center gap-2 text-xs font-bold text-[#087EA4] hover:text-[#075985]">View alumni <FaArrowRight size={9} /></Link>
        </div>
      </div>
    </motion.section>
  );
}
