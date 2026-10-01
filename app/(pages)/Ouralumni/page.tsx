"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Alumni } from "@/types";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import {
  FaSearch,
  FaUserGraduate,
  FaTimes,
  FaArrowRight,
  FaArrowLeft,
  FaUsers,
  FaSortAlphaDown,
} from "react-icons/fa";
import AlumniCard from "@/components/alumni/AlumniCard";
import AlumniModal from "@/components/alumni/AlumniModal";

/* ---------------------------------------------------------------
   Types + helpers
---------------------------------------------------------------- */

interface Member {
  _id: string;
  name: string;
  nameBn?: string;
  email?: string;
  phone?: string;
  batch: number;
  session?: string;
  department?: string;
  photo?: string;
  currentPosition?: string;
  organization?: string;
  location?: string;
  linkedin?: string;
  achievements?: string[];
  testimonial?: string;
  presentStatus?: string;
  permanentAddress?: string;
  currentCity?: string;
  currentCountry?: string;
  isFeatured?: boolean;
}

const PREVIEW_COUNT = 6; // profiles per batch in the "all batches" overview
const PAGE_SIZE = 12; // profiles per page in a batch / search list

// "Md. Rakib Hasan" is sorted under R, not M
const sortKey = (name?: string) =>
  (name || "")
    .trim()
    .replace(/^(?:md|mst|most|mosammat|mohammad|mohammed|mohd)(?:\.\s*|\s+)/i, "")
    .trim();

const sortAZ = (list: Member[]) =>
  [...list].sort(
    (a, b) =>
      sortKey(a.name).localeCompare(sortKey(b.name), "en", { sensitivity: "base" }) ||
      (a.name || "").localeCompare(b.name || "", "en", { sensitivity: "base" })
  );

const ordinal = (n: number) => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

const sessionOf = (batch: number, session?: string) =>
  session || `${2006 + batch}-${String(2007 + batch).slice(2)}`;

/* 1 ... 4 5 6 ... 12 */
function getPageList(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "...")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) pages.push("...");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push("...");
  pages.push(total);
  return pages;
}

/* ---------------------------------------------------------------
   Card grid (outside the page so it never remounts)
---------------------------------------------------------------- */

function AlumniGrid({
  items,
  onSelect,
}: {
  items: Member[];
  onSelect: (m: Member) => void;
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {items.map((m, index) => (
        <motion.div
          key={m._id}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.3) }}
          className="group relative"
        >
          <div className="pointer-events-none absolute -inset-1 rounded-[22px] bg-[#0891B2]/[0.055] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
          <div className="relative overflow-hidden rounded-[22px]">
            <div className="pointer-events-none absolute inset-x-5 top-0 z-10 h-px bg-gradient-to-r from-transparent via-[#0891B2]/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <AlumniCard
              alumni={m as unknown as Alumni}
              index={index}
              onClick={() => onSelect(m)}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------
   Pagination
---------------------------------------------------------------- */

function Pagination({
  page,
  totalPages,
  totalItems,
  pageSize,
  onChange,
}: {
  page: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onChange: (p: number) => void;
}) {
  if (totalPages <= 1) return null;

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalItems);

  const base =
    "flex h-9 min-w-[2.25rem] items-center justify-center rounded-xl border px-3 text-xs font-semibold transition-all";
  const idle =
    "border-[#087EA4]/12 bg-white/80 text-[#55727D] hover:border-[#087EA4]/30 hover:text-[#087EA4]";
  const active =
    "border-[#087EA4] bg-[#087EA4] text-white shadow-[0_8px_24px_rgba(8,126,164,0.22)]";
  const disabled = "cursor-not-allowed opacity-40 hover:border-[#087EA4]/12 hover:text-[#55727D]";

  return (
    <nav
      aria-label="Pagination"
      className="mt-12 flex flex-col items-center gap-4"
    >
      <p className="text-xs text-[#55727D]">
        Showing{" "}
        <span className="font-semibold text-[#123B4A]">
          {from}–{to}
        </span>{" "}
        of <span className="font-semibold text-[#123B4A]">{totalItems}</span>
      </p>

      <div className="flex flex-wrap items-center justify-center gap-1.5">
        <button
          type="button"
          onClick={() => onChange(page - 1)}
          disabled={page === 1}
          aria-label="Previous page"
          className={`${base} ${idle} ${page === 1 ? disabled : ""} gap-2`}
        >
          <FaArrowLeft size={9} />
          <span className="hidden sm:inline">Prev</span>
        </button>

        {getPageList(page, totalPages).map((p, i) =>
          p === "..." ? (
            <span
              key={`dots-${i}`}
              className="flex h-9 w-6 items-center justify-center text-xs text-[#55727D]/60"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => onChange(p)}
              aria-label={`Page ${p}`}
              aria-current={p === page ? "page" : undefined}
              className={`${base} ${p === page ? active : idle}`}
            >
              {p}
            </button>
          )
        )}

        <button
          type="button"
          onClick={() => onChange(page + 1)}
          disabled={page === totalPages}
          aria-label="Next page"
          className={`${base} ${idle} ${page === totalPages ? disabled : ""} gap-2`}
        >
          <span className="hidden sm:inline">Next</span>
          <FaArrowRight size={9} />
        </button>
      </div>
    </nav>
  );
}

/* ---------------------------------------------------------------
   Page
---------------------------------------------------------------- */

export default function AlumniPage() {
  const [search, setSearch] = useState("");
  const [activeBatch, setActiveBatch] = useState<number | "all">("all");
  const [page, setPage] = useState(1);
  const [alumni, setAlumni] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Member | null>(null);

  const listTopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get("/api/alumni")
      .then(({ data }) => {
        if (data.success) setAlumni(data.data);
        else setError(data.error || "Failed to load alumni.");
      })
      .catch((err) =>
        setError(
          err?.response?.data?.error ||
            err?.message ||
            "Something went wrong while loading alumni."
        )
      )
      .finally(() => setLoading(false));
  }, []);

  /* back to page 1 whenever the search or batch changes */
  useEffect(() => {
    setPage(1);
  }, [search, activeBatch]);

  /* search across all batches */
  const searched = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return alumni;
    return alumni.filter(
      (m) =>
        m.name?.toLowerCase().includes(q) ||
        m.organization?.toLowerCase().includes(q) ||
        m.currentPosition?.toLowerCase().includes(q) ||
        m.location?.toLowerCase().includes(q) ||
        `batch ${m.batch}`.includes(q)
    );
  }, [alumni, search]);

  /* batch list + counts (counts follow the search) */
  const batches = useMemo(
    () => Array.from(new Set(alumni.map((m) => m.batch))).sort((a, b) => a - b),
    [alumni]
  );

  const counts = useMemo(() => {
    const map: Record<number, number> = {};
    searched.forEach((m) => {
      map[m.batch] = (map[m.batch] || 0) + 1;
    });
    return map;
  }, [searched]);

  /* what is shown */
  const visible = useMemo(
    () =>
      sortAZ(
        activeBatch === "all" ? searched : searched.filter((m) => m.batch === activeBatch)
      ),
    [searched, activeBatch]
  );

  const grouped = useMemo(() => {
    const map = new Map<number, Member[]>();
    visible.forEach((m) => {
      if (!map.has(m.batch)) map.set(m.batch, []);
      map.get(m.batch)!.push(m);
    });
    return Array.from(map.entries()).sort((a, b) => a[0] - b[0]);
  }, [visible]);

  const overviewMode = activeBatch === "all" && !search.trim();

  /* pagination (batch / search lists only) */
  const totalPages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = useMemo(
    () => visible.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE),
    [visible, safePage]
  );

  const goToPage = (p: number) => {
    const next = Math.min(Math.max(1, p), totalPages);
    setPage(next);
    requestAnimationFrame(() =>
      listTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    );
  };

  const batchInfo =
    activeBatch !== "all"
      ? {
          session: sessionOf(activeBatch, alumni.find((m) => m.batch === activeBatch)?.session),
          total: alumni.filter((m) => m.batch === activeBatch).length,
          withWork: visible.filter((m) => m.organization || m.currentPosition).length,
        }
      : null;

  const clearAll = () => {
    setSearch("");
    setActiveBatch("all");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F0FAFC] text-[#123B4A]">
      {/* ATMOSPHERE */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-72 top-0 h-[650px] w-[650px] rounded-full bg-[#0891B2]/[0.07] blur-[150px]" />
        <div className="absolute -right-72 top-[22%] h-[650px] w-[650px] rounded-full bg-[#087EA4]/[0.045] blur-[150px]" />
        <div className="absolute bottom-0 left-1/3 h-[500px] w-[500px] rounded-full bg-[#2DD4BF]/[0.055] blur-[150px]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(8,126,164,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(8,126,164,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-[#0891B2]/[0.045] to-transparent" />
      </div>

      {/* MODAL */}
      <AlumniModal
        alumni={selected as unknown as Alumni | null}
        onClose={() => setSelected(null)}
      />

      {/* HERO */}
      <section className="relative z-10 border-b border-[#087EA4]/10 pb-14 pt-28 sm:pb-16 sm:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#087EA4]/15 bg-white/70 px-4 py-2 shadow-[0_8px_30px_rgba(8,126,164,0.06)] backdrop-blur-xl"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#0891B2] shadow-[0_0_10px_rgba(8,145,178,0.35)]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#087EA4]">
                Alumni Network
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="font-display text-4xl font-semibold tracking-tight text-[#123B4A] sm:text-5xl lg:text-6xl"
            >
              Where our graduates
              <span className="block bg-gradient-to-r from-[#075985] via-[#087EA4] to-[#0891B2] bg-clip-text text-transparent">
                make an impact.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#55727D] sm:text-base"
            >
              Explore the growing network of Faculty of Fisheries graduates working across
              research, industry, government, conservation, and aquatic sciences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 flex items-center justify-center gap-5 text-[10px] font-medium uppercase tracking-[0.18em] text-[#55727D]/70"
            >
              <span>Faculty of Fisheries</span>
              <span className="h-1 w-1 rounded-full bg-[#0891B2]/50" />
              <span>PSTU</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* SEARCH */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto max-w-2xl"
          >
            <div className="relative">
              <FaSearch
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#087EA4]/50"
                size={12}
              />
              <input
                type="text"
                placeholder="Search by name, position, organization, location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-[#087EA4]/12 bg-white/80 py-3.5 pl-11 pr-11 text-sm text-[#123B4A] shadow-[0_12px_40px_rgba(8,126,164,0.055)] outline-none backdrop-blur-xl transition-all duration-300 placeholder:text-[#55727D]/55 focus:border-[#0891B2]/30 focus:bg-white focus:ring-4 focus:ring-[#0891B2]/[0.06]"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-[#55727D]/60 transition-colors hover:bg-[#0891B2]/[0.08] hover:text-[#087EA4]"
                >
                  <FaTimes size={10} />
                </button>
              )}
            </div>
          </motion.div>

          {/* BATCH FILTER */}
          {!loading && !error && batches.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-8"
            >
              <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-[#55727D]/70">
                Browse by batch
              </p>

              <div className="flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible">
                <button
                  type="button"
                  onClick={() => setActiveBatch("all")}
                  className={`shrink-0 rounded-xl border px-4 py-2 text-xs font-semibold transition-all ${
                    activeBatch === "all"
                      ? "border-[#087EA4] bg-[#087EA4] text-white shadow-[0_8px_24px_rgba(8,126,164,0.22)]"
                      : "border-[#087EA4]/12 bg-white/80 text-[#55727D] hover:border-[#087EA4]/30 hover:text-[#087EA4]"
                  }`}
                >
                  All batches
                  <span className="ml-1.5 opacity-70">{searched.length}</span>
                </button>

                {batches.map((b) => {
                  const isActive = activeBatch === b;
                  const n = counts[b] || 0;
                  return (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setActiveBatch(b)}
                      className={`shrink-0 rounded-xl border px-4 py-2 text-xs font-semibold transition-all ${
                        isActive
                          ? "border-[#087EA4] bg-[#087EA4] text-white shadow-[0_8px_24px_rgba(8,126,164,0.22)]"
                          : n === 0
                          ? "border-[#087EA4]/8 bg-white/40 text-[#55727D]/40"
                          : "border-[#087EA4]/12 bg-white/80 text-[#55727D] hover:border-[#087EA4]/30 hover:text-[#087EA4]"
                      }`}
                    >
                      Batch {b}
                      <span className="ml-1.5 opacity-70">{n}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ERROR */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto mt-10 max-w-3xl rounded-2xl border border-red-300/30 bg-red-50/70 px-6 py-10 text-center shadow-sm"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <FaTimes className="text-red-500" size={16} />
              </div>
              <p className="text-sm font-medium text-red-600">{error}</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-5 inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
              >
                Try Again
                <FaArrowRight size={8} />
              </button>
            </motion.div>
          )}

          {/* LOADING */}
          {loading && (
            <div className="flex min-h-[300px] items-center justify-center py-12">
              <LoadingSpinner message="Loading alumni..." />
            </div>
          )}

          {/* RESULTS */}
          {!loading && !error && (
            <>
              {/* SELECTED BATCH HEADER */}
              {batchInfo && (
                <motion.div
                  key={`batch-${activeBatch}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 overflow-hidden rounded-3xl border border-[#087EA4]/10 bg-white/70 p-6 shadow-[0_20px_60px_rgba(8,126,164,0.06)] backdrop-blur-xl sm:p-8"
                >
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0891B2]">
                        Session {batchInfo.session}
                      </p>
                      <h2 className="mt-1 text-3xl font-semibold tracking-tight text-[#123B4A]">
                        {ordinal(activeBatch as number)} Batch
                      </h2>
                      <p className="mt-2 flex items-center gap-2 text-xs text-[#55727D]">
                        <FaSortAlphaDown size={11} className="text-[#0891B2]/70" />
                        Profiles sorted alphabetically
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <div className="rounded-2xl border border-[#087EA4]/10 bg-[#F0FAFC] px-5 py-3 text-center">
                        <p className="text-2xl font-semibold text-[#087EA4]">{batchInfo.total}</p>
                        <p className="text-[9px] uppercase tracking-[0.15em] text-[#55727D]">Alumni</p>
                      </div>
                      <div className="rounded-2xl border border-[#087EA4]/10 bg-[#F0FAFC] px-5 py-3 text-center">
                        <p className="text-2xl font-semibold text-[#087EA4]">{batchInfo.withWork}</p>
                        <p className="text-[9px] uppercase tracking-[0.15em] text-[#55727D]">With workplace</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* anchor used when changing page */}
              <div ref={listTopRef} className="scroll-mt-28" />

              {/* RESULT BAR */}
              <div className="mb-7 mt-8 flex flex-col gap-3 border-y border-[#087EA4]/10 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-[#55727D]">
                  <span className="font-semibold text-[#123B4A]">{visible.length}</span> alumni
                  {activeBatch !== "all" && <> in batch {activeBatch}</>}
                  {search && (
                    <>
                      {" "}
                      matching <span className="font-medium text-[#087EA4]">“{search}”</span>
                    </>
                  )}
                  {!overviewMode && totalPages > 1 && (
                    <span className="ml-2 text-[#55727D]/70">
                      • Page {safePage} of {totalPages}
                    </span>
                  )}
                </p>

                <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.15em] text-[#55727D]/60">
                  <FaUsers className="text-[#0891B2]/60" size={9} />
                  <span>Click a profile to explore</span>
                </div>
              </div>

              {/* EMPTY */}
              {visible.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center rounded-3xl border border-[#087EA4]/10 bg-white/60 px-6 py-28 text-center shadow-[0_20px_60px_rgba(8,126,164,0.045)]"
                >
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#087EA4]/10 bg-[#0891B2]/[0.07]">
                    <FaUserGraduate className="text-[#087EA4]/60" size={24} />
                  </div>
                  <h2 className="text-lg font-semibold text-[#123B4A]">
                    {search || activeBatch !== "all" ? "No alumni found" : "No alumni yet"}
                  </h2>
                  <p className="mt-2 max-w-md text-sm leading-6 text-[#55727D]">
                    {search || activeBatch !== "all"
                      ? "Try a different search term or another batch."
                      : "Alumni will appear here once they are added to the directory."}
                  </p>
                  {(search || activeBatch !== "all") && (
                    <button
                      type="button"
                      onClick={clearAll}
                      className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[#087EA4]/15 bg-white px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#087EA4] shadow-sm transition-all hover:border-[#087EA4]/25 hover:bg-[#0891B2]/[0.04]"
                    >
                      Clear filters
                      <FaArrowRight size={8} />
                    </button>
                  )}
                </motion.div>
              ) : overviewMode ? (
                /* ALL BATCHES: one section per batch, A-Z inside, preview only */
                <div className="space-y-14">
                  {grouped.map(([batch, list]) => (
                    <div key={batch}>
                      <div className="mb-5 flex items-end justify-between gap-4 border-b border-[#087EA4]/10 pb-3">
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0891B2]">
                            Session {sessionOf(batch, list[0]?.session)}
                          </p>
                          <h3 className="mt-0.5 text-xl font-semibold text-[#123B4A]">
                            {ordinal(batch)} Batch
                            <span className="ml-2 text-sm font-normal text-[#55727D]">
                              {list.length} alumni
                            </span>
                          </h3>
                        </div>

                        {list.length > PREVIEW_COUNT && (
                          <button
                            type="button"
                            onClick={() => {
                              setActiveBatch(batch);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-[#087EA4]/15 bg-white px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#087EA4] shadow-sm transition-all hover:border-[#087EA4]/30"
                          >
                            View all {list.length}
                            <FaArrowRight size={8} />
                          </button>
                        )}
                      </div>

                      <AlumniGrid items={list.slice(0, PREVIEW_COUNT)} onSelect={setSelected} />
                    </div>
                  ))}
                </div>
              ) : (
                /* ONE BATCH or SEARCH: A-Z, paginated */
                <>
                  <AlumniGrid
                    key={`${activeBatch}-${search}-${safePage}`}
                    items={pageItems}
                    onSelect={setSelected}
                  />

                  <Pagination
                    page={safePage}
                    totalPages={totalPages}
                    totalItems={visible.length}
                    pageSize={PAGE_SIZE}
                    onChange={goToPage}
                  />
                </>
              )}

              {visible.length > 0 && (
                <div className="mt-14 flex justify-center">
                  <div className="inline-flex items-center gap-3 border-t border-[#087EA4]/10 pt-5 text-[10px] font-medium uppercase tracking-[0.18em] text-[#55727D]/55">
                    <span>Alumni Directory</span>
                    <FaArrowRight size={8} className="text-[#0891B2]/50" />
                    <span>Explore Profiles</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
