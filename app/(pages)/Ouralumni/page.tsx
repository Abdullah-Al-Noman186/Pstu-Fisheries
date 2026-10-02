"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
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
  FaBriefcase,
  FaGraduationCap,
  FaGlobeAsia,
  FaChevronDown,
} from "react-icons/fa";

import AlumniCard from "@/components/alumni/AlumniCard";
import AlumniModal from "@/components/alumni/AlumniModal";

/* =========================================================
   TYPES
========================================================= */

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

/* =========================================================
   CONSTANTS
========================================================= */

const PREVIEW_COUNT = 6;
const PAGE_SIZE = 12;

/* =========================================================
   HELPERS
========================================================= */

const sortKey = (name?: string) =>
  (name || "")
    .trim()
    .replace(
      /^(md|mst|most|mosammat|mohammad|mohammed|mohd)(?:\.\s*|\s+)/i,
      ""
    )
    .trim();

const sortAZ = (list: Member[]) =>
  [...list].sort(
    (a, b) =>
      sortKey(a.name).localeCompare(sortKey(b.name), "en", {
        sensitivity: "base",
      }) ||
      (a.name || "").localeCompare(b.name || "", "en", {
        sensitivity: "base",
      })
  );

const ordinal = (n: number) => {
  const suffixes = ["th", "st", "nd", "rd"];
  const value = n % 100;

  return (
    n +
    (suffixes[(value - 20) % 10] ||
      suffixes[value] ||
      suffixes[0])
  );
};

const sessionOf = (batch: number, session?: string) =>
  session ||
  `${2006 + batch}-${String(2007 + batch).slice(2)}`;

function getPageList(
  current: number,
  total: number
): (number | "...")[] {
  if (total <= 7) {
    return Array.from(
      { length: total },
      (_, i) => i + 1
    );
  }

  const pages: (number | "...")[] = [1];

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  if (start > 2) {
    pages.push("...");
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < total - 1) {
    pages.push("...");
  }

  pages.push(total);

  return pages;
}

/* =========================================================
   COUNT UP
========================================================= */

function CountUp({
  value,
  duration = 1300,
}: {
  value: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-30px",
  });

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const target = Math.max(0, Math.floor(value));

    let frame = 0;

    const start = performance.now();

    const animate = (time: number) => {
      const progress = Math.min(
        (time - start) / duration,
        1
      );

      const eased =
        1 - Math.pow(1 - progress, 4);

      setCount(Math.floor(target * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
    </span>
  );
}

/* =========================================================
   ALUMNI GRID
========================================================= */

function AlumniGrid({
  items,
  onSelect,
}: {
  items: Member[];
  onSelect: (member: Member) => void;
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((member, index) => (
        <motion.div
          key={member._id}
          layout
          initial={{
            opacity: 0,
            y: 18,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
            delay: Math.min(index * 0.035, 0.3),
          }}
          className="group relative"
        >
          <div className="pointer-events-none absolute -inset-1 rounded-[25px] bg-[#0891B2]/[0.055] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

          <div className="relative overflow-hidden rounded-[25px]">
            <div className="pointer-events-none absolute inset-x-6 top-0 z-10 h-px bg-gradient-to-r from-transparent via-[#0891B2]/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <AlumniCard
              alumni={member as unknown as Alumni}
              index={index}
              onClick={() => onSelect(member)}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* =========================================================
   PAGINATION
========================================================= */

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
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(
    page * pageSize,
    totalItems
  );

  const base =
    "flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 text-xs font-semibold transition-all";

  const idle =
    "border-[#087EA4]/12 bg-white/80 text-[#55727D] hover:border-[#087EA4]/30 hover:text-[#087EA4]";

  const active =
    "border-[#087EA4] bg-[#087EA4] text-white shadow-[0_8px_24px_rgba(8,126,164,0.22)]";

  const disabled =
    "cursor-not-allowed opacity-40";

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
        of{" "}
        <span className="font-semibold text-[#123B4A]">
          {totalItems}
        </span>
      </p>

      <div className="flex flex-wrap items-center justify-center gap-1.5">
        <button
          type="button"
          onClick={() => onChange(page - 1)}
          disabled={page === 1}
          aria-label="Previous page"
          className={`${base} ${idle} ${
            page === 1 ? disabled : ""
          } gap-2`}
        >
          <FaArrowLeft size={9} />
          <span className="hidden sm:inline">
            Prev
          </span>
        </button>

        {getPageList(page, totalPages).map(
          (item, index) =>
            item === "..." ? (
              <span
                key={`dots-${index}`}
                className="flex h-10 w-6 items-center justify-center text-xs text-[#55727D]/50"
              >
                …
              </span>
            ) : (
              <button
                key={item}
                type="button"
                onClick={() => onChange(item)}
                aria-label={`Page ${item}`}
                aria-current={
                  item === page
                    ? "page"
                    : undefined
                }
                className={`${base} ${
                  item === page
                    ? active
                    : idle
                }`}
              >
                {item}
              </button>
            )
        )}

        <button
          type="button"
          onClick={() => onChange(page + 1)}
          disabled={page === totalPages}
          aria-label="Next page"
          className={`${base} ${idle} ${
            page === totalPages
              ? disabled
              : ""
          } gap-2`}
        >
          <span className="hidden sm:inline">
            Next
          </span>
          <FaArrowRight size={9} />
        </button>
      </div>
    </nav>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  icon,
  value,
  label,
}: {
  icon: ReactNode;
  value: number;
  label: string;
}) {
  return (
    <div className="group rounded-2xl border border-[#087EA4]/10 bg-white/75 p-4 shadow-[0_12px_40px_rgba(8,126,164,0.045)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#087EA4]/20 hover:shadow-[0_18px_50px_rgba(8,126,164,0.09)]">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0891B2]/[0.08] text-[#087EA4] transition-colors group-hover:bg-[#087EA4] group-hover:text-white">
          {icon}
        </div>

        <div>
          <p className="text-2xl font-semibold tracking-tight text-[#123B4A]">
            <CountUp value={value} />
          </p>

          <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#55727D]/70">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function AlumniPage() {
  const [search, setSearch] = useState("");

  const [activeBatch, setActiveBatch] =
    useState<number | "all">("all");

  const [page, setPage] = useState(1);

  const [alumni, setAlumni] =
    useState<Member[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [selected, setSelected] =
    useState<Member | null>(null);

  const listTopRef =
    useRef<HTMLDivElement>(null);

  /* =====================================================
     FETCH
  ===================================================== */

  useEffect(() => {
    let mounted = true;

    setLoading(true);
    setError(null);

    axios
      .get("/api/alumni")
      .then(({ data }) => {
        if (!mounted) return;

        if (data.success) {
          setAlumni(
            Array.isArray(data.data)
              ? data.data
              : []
          );
        } else {
          setError(
            data.error ||
              "Failed to load alumni."
          );
        }
      })
      .catch((err) => {
        if (!mounted) return;

        setError(
          err?.response?.data?.error ||
            err?.message ||
            "Something went wrong while loading alumni."
        );
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  /* =====================================================
     RESET PAGE
  ===================================================== */

  useEffect(() => {
    setPage(1);
  }, [search, activeBatch]);

  /* =====================================================
     SEARCH
  ===================================================== */

  const searched = useMemo(() => {
    const query = search
      .toLowerCase()
      .trim();

    if (!query) return alumni;

    return alumni.filter((member) => {
      const searchable = [
        member.name,
        member.nameBn,
        member.organization,
        member.currentPosition,
        member.location,
        member.currentCity,
        member.currentCountry,
        member.department,
        `batch ${member.batch}`,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchable.includes(query);
    });
  }, [alumni, search]);

  /* =====================================================
     BATCHES
  ===================================================== */

  const batches = useMemo(
    () =>
      Array.from(
        new Set(
          alumni.map(
            (member) => member.batch
          )
        )
      ).sort((a, b) => a - b),
    [alumni]
  );

  /* =====================================================
     COUNTS
  ===================================================== */

  const counts = useMemo(() => {
    const map: Record<
      number,
      number
    > = {};

    searched.forEach((member) => {
      map[member.batch] =
        (map[member.batch] || 0) + 1;
    });

    return map;
  }, [searched]);

  /* =====================================================
     VISIBLE
  ===================================================== */

  const visible = useMemo(
    () =>
      sortAZ(
        activeBatch === "all"
          ? searched
          : searched.filter(
              (member) =>
                member.batch ===
                activeBatch
            )
      ),
    [searched, activeBatch]
  );

  /* =====================================================
     GROUPED
  ===================================================== */

  const grouped = useMemo(() => {
    const map = new Map<
      number,
      Member[]
    >();

    visible.forEach((member) => {
      if (!map.has(member.batch)) {
        map.set(member.batch, []);
      }

      map
        .get(member.batch)!
        .push(member);
    });

    return Array.from(
      map.entries()
    ).sort((a, b) => a[0] - b[0]);
  }, [visible]);

  const overviewMode =
    activeBatch === "all" &&
    !search.trim();

  /* =====================================================
     STATS
  ===================================================== */

  const totalAlumni = alumni.length;

  const totalBatches = batches.length;

  const organizations = useMemo(
    () =>
      new Set(
        alumni
          .map(
            (member) =>
              member.organization
                ?.trim()
          )
          .filter(Boolean)
      ).size,
    [alumni]
  );

  const countries = useMemo(
    () =>
      new Set(
        alumni
          .map(
            (member) =>
              member.currentCountry
                ?.trim()
          )
          .filter(Boolean)
      ).size,
    [alumni]
  );

  /* =====================================================
     PAGINATION
  ===================================================== */

  const totalPages = Math.max(
    1,
    Math.ceil(
      visible.length / PAGE_SIZE
    )
  );

  const safePage = Math.min(
    page,
    totalPages
  );

  const pageItems = useMemo(
    () =>
      visible.slice(
        (safePage - 1) * PAGE_SIZE,
        safePage * PAGE_SIZE
      ),
    [visible, safePage]
  );

  const goToPage = (nextPage: number) => {
    const next = Math.min(
      Math.max(1, nextPage),
      totalPages
    );

    setPage(next);

    requestAnimationFrame(() => {
      listTopRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  /* =====================================================
     BATCH INFO
  ===================================================== */

  const batchInfo =
    activeBatch !== "all"
      ? {
          session: sessionOf(
            activeBatch,
            alumni.find(
              (member) =>
                member.batch ===
                activeBatch
            )?.session
          ),

          total: alumni.filter(
            (member) =>
              member.batch ===
              activeBatch
          ).length,

          withWork: visible.filter(
            (member) =>
              member.organization ||
              member.currentPosition
          ).length,
        }
      : null;

  /* =====================================================
     CLEAR
  ===================================================== */

  const clearAll = () => {
    setSearch("");
    setActiveBatch("all");
  };

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F0FAFC] text-[#123B4A]">
      {/* =================================================
          BACKGROUND ATMOSPHERE
      ================================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-72 -top-48 h-[650px] w-[650px] rounded-full bg-[#0891B2]/[0.065] blur-[150px]" />

        <div className="absolute -right-72 top-[20%] h-[650px] w-[650px] rounded-full bg-[#087EA4]/[0.045] blur-[150px]" />

        <div className="absolute bottom-0 left-1/3 h-[500px] w-[500px] rounded-full bg-[#2DD4BF]/[0.05] blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(8,126,164,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(8,126,164,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-[#0891B2]/[0.045] to-transparent" />
      </div>

      {/* =================================================
          MODAL
      ================================================= */}

      <AlumniModal
        alumni={
          selected as unknown as
            Alumni | null
        }
        onClose={() => setSelected(null)}
      />

      {/* =================================================
          HERO
      ================================================= */}

      <section className="relative z-10 border-b border-[#087EA4]/10 pb-14 pt-28 sm:pb-18 sm:pt-32 lg:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_.85fr]">
            {/* LEFT */}
            <div>
              <motion.div
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#087EA4]/15 bg-white/75 px-4 py-2 shadow-[0_8px_30px_rgba(8,126,164,0.06)] backdrop-blur-xl"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2DD4BF] opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0891B2]" />
                </span>

                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#087EA4]">
                  Alumni Network
                </span>
              </motion.div>

              <motion.h1
                initial={{
                  opacity: 0,
                  y: 22,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.65,
                  delay: 0.08,
                }}
                className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-[#123B4A] sm:text-5xl lg:text-6xl xl:text-7xl"
              >
                A community that
                <span className="block bg-gradient-to-r from-[#075985] via-[#087EA4] to-[#0891B2] bg-clip-text text-transparent">
                  keeps moving forward.
                </span>
              </motion.h1>

              <motion.p
                initial={{
                  opacity: 0,
                  y: 18,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.16,
                }}
                className="mt-6 max-w-2xl text-sm leading-7 text-[#55727D] sm:text-base"
              >
                Explore the graduates of the
                Faculty of Fisheries and discover
                where their education, research,
                leadership, and experience have
                taken them.
              </motion.p>

              {/* STATS */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.24,
                }}
                className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4"
              >
                <StatCard
                  icon={<FaUsers />}
                  value={totalAlumni}
                  label="Alumni"
                />

                <StatCard
                  icon={<FaGraduationCap />}
                  value={totalBatches}
                  label="Batches"
                />

                <StatCard
                  icon={<FaBriefcase />}
                  value={organizations}
                  label="Organizations"
                />

                <StatCard
                  icon={<FaGlobeAsia />}
                  value={countries}
                  label="Countries"
                />
              </motion.div>
            </div>

            {/* RIGHT FEATURE PANEL */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.96,
                x: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.15,
              }}
              className="relative hidden lg:block"
            >
              <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-[#2DD4BF]/10 via-[#087EA4]/10 to-transparent blur-3xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/70 p-7 shadow-[0_30px_80px_rgba(8,126,164,0.1)] backdrop-blur-2xl">
                {/* Decorative circle */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full border-[30px] border-[#0891B2]/[0.05]" />

                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#55727D]/70">
                        Faculty of Fisheries
                      </p>

                      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#123B4A]">
                        Alumni Directory
                      </h2>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#087EA4]/10 text-[#087EA4]">
                      <FaUserGraduate />
                    </div>
                  </div>

                  <div className="mt-7 overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#075985] via-[#087EA4] to-[#0891B2] p-6 text-white shadow-[0_20px_45px_rgba(8,126,164,0.2)]">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs font-medium text-white/65">
                          Connected alumni
                        </p>

                        <p className="mt-1 text-5xl font-semibold tracking-tight">
                          <CountUp
                            value={
                              totalAlumni
                            }
                          />
                        </p>
                      </div>

                      <FaUsers className="mb-2 text-2xl text-white/25" />
                    </div>

                    <div className="mt-5 h-px bg-white/10" />

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-white/60">
                        Across
                      </span>

                      <span className="text-sm font-semibold">
                        <CountUp
                          value={
                            totalBatches
                          }
                        />{" "}
                        batches
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-[#087EA4]/10 bg-[#F0FAFC] p-4">
                      <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#55727D]/70">
                        Latest batch
                      </p>

                      <p className="mt-1 text-lg font-semibold text-[#123B4A]">
                        {batches[
                          batches.length - 1
                        ] ?? "—"}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-[#087EA4]/10 bg-[#F0FAFC] p-4">
                      <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#55727D]/70">
                        Directory
                      </p>

                      <p className="mt-1 text-lg font-semibold text-[#087EA4]">
                        Open
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =================================================
          DIRECTORY CONTENT
      ================================================= */}

      <section className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          {/* SEARCH PANEL */}
          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="relative mx-auto max-w-4xl"
          >
            <div className="absolute -inset-1 rounded-[1.6rem] bg-gradient-to-r from-[#2DD4BF]/10 via-[#087EA4]/10 to-[#0891B2]/10 blur-xl" />

            <div className="relative rounded-[1.5rem] border border-[#087EA4]/10 bg-white/80 p-2 shadow-[0_20px_60px_rgba(8,126,164,0.06)] backdrop-blur-xl">
              <div className="relative">
                <FaSearch
                  className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[#087EA4]/55"
                  size={13}
                />

                <input
                  type="text"
                  placeholder="Search by name, position, organization, location..."
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value
                    )
                  }
                  className="w-full rounded-[1.15rem] bg-[#F7FCFD] py-4 pl-12 pr-12 text-sm font-medium text-[#123B4A] outline-none transition-all placeholder:text-[#55727D]/50 focus:bg-white focus:ring-4 focus:ring-[#0891B2]/[0.06]"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() =>
                      setSearch("")
                    }
                    aria-label="Clear search"
                    className="absolute right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-[#55727D]/60 transition hover:bg-[#0891B2]/[0.08] hover:text-[#087EA4]"
                  >
                    <FaTimes size={10} />
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* =================================================
              BATCH FILTER
          ================================================= */}

          {!loading &&
            !error &&
            batches.length > 0 && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.1,
                }}
                className="mt-9"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#087EA4]">
                      Explore the network
                    </p>

                    <p className="mt-1 text-sm font-medium text-[#55727D]">
                      Browse alumni by batch
                    </p>
                  </div>

                  {activeBatch !== "all" && (
                    <button
                      type="button"
                      onClick={() =>
                        setActiveBatch(
                          "all"
                        )
                      }
                      className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#087EA4] transition hover:text-[#075985]"
                    >
                      Clear batch
                    </button>
                  )}
                </div>

                {/* NO DROPDOWN + NO SCROLLBAR */}
                <div className="flex flex-wrap gap-2">
                  {/* ALL */}
                  <button
                    type="button"
                    onClick={() =>
                      setActiveBatch(
                        "all"
                      )
                    }
                    aria-pressed={
                      activeBatch ===
                      "all"
                    }
                    className={`group inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold transition-all duration-200 ${
                      activeBatch ===
                      "all"
                        ? "border-[#087EA4] bg-[#087EA4] text-white shadow-[0_8px_24px_rgba(8,126,164,0.2)]"
                        : "border-[#087EA4]/10 bg-white/75 text-[#55727D] hover:-translate-y-0.5 hover:border-[#087EA4]/25 hover:text-[#087EA4]"
                    }`}
                  >
                    <FaUsers
                      size={10}
                    />

                    <span>
                      All batches
                    </span>

                    <span
                      className={`rounded-full px-2 py-0.5 text-[9px] ${
                        activeBatch ===
                        "all"
                          ? "bg-white/15 text-white"
                          : "bg-[#F0FAFC] text-[#55727D]"
                      }`}
                    >
                      {searched.length}
                    </span>
                  </button>

                  {batches.map(
                    (batch) => {
                      const active =
                        activeBatch ===
                        batch;

                      const count =
                        counts[
                          batch
                        ] || 0;

                      return (
                        <button
                          key={batch}
                          type="button"
                          onClick={() =>
                            setActiveBatch(
                              batch
                            )
                          }
                          aria-pressed={
                            active
                          }
                          className={`group inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold transition-all duration-200 ${
                            active
                              ? "border-[#087EA4] bg-[#087EA4] text-white shadow-[0_8px_24px_rgba(8,126,164,0.2)]"
                              : "border-[#087EA4]/10 bg-white/75 text-[#55727D] hover:-translate-y-0.5 hover:border-[#087EA4]/25 hover:text-[#087EA4]"
                          }`}
                        >
                          <FaGraduationCap
                            size={10}
                            className={
                              active
                                ? "text-white"
                                : "text-[#087EA4]/70"
                            }
                          />

                          <span>
                            Batch{" "}
                            {batch}
                          </span>

                          <span
                            className={`rounded-full px-2 py-0.5 text-[9px] ${
                              active
                                ? "bg-white/15 text-white"
                                : "bg-[#F0FAFC] text-[#55727D]"
                            }`}
                          >
                            {count}
                          </span>
                        </button>
                      );
                    }
                  )}
                </div>
              </motion.div>
            )}

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="mx-auto mt-10 max-w-3xl rounded-3xl border border-red-300/30 bg-red-50/70 px-6 py-12 text-center shadow-sm"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <FaTimes
                  className="text-red-500"
                  size={16}
                />
              </div>

              <p className="text-sm font-medium text-red-600">
                {error}
              </p>

              <button
                type="button"
                onClick={() =>
                  window.location.reload()
                }
                className="mt-5 inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
              >
                Try Again
                <FaArrowRight size={8} />
              </button>
            </motion.div>
          )}

          {/* =================================================
              LOADING
          ================================================= */}

          {loading && (
            <div className="flex min-h-[350px] items-center justify-center py-12">
              <LoadingSpinner message="Loading alumni..." />
            </div>
          )}

          {/* =================================================
              RESULTS
          ================================================= */}

          {!loading && !error && (
            <>
              {/* SELECTED BATCH */}
              {batchInfo && (
                <motion.div
                  key={`batch-${activeBatch}`}
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="mt-10 overflow-hidden rounded-[2rem] border border-[#087EA4]/10 bg-white/75 shadow-[0_20px_70px_rgba(8,126,164,0.055)] backdrop-blur-xl"
                >
                  <div className="relative overflow-hidden p-6 sm:p-8">
                    <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#0891B2]/[0.05] blur-2xl" />

                    <div className="relative flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0891B2]">
                          Session{" "}
                          {
                            batchInfo.session
                          }
                        </p>

                        <h2 className="mt-1 text-3xl font-semibold tracking-tight text-[#123B4A]">
                          {ordinal(
                            activeBatch as number
                          )}{" "}
                          Batch
                        </h2>

                        <p className="mt-2 flex items-center gap-2 text-xs text-[#55727D]">
                          <FaSortAlphaDown
                            size={11}
                            className="text-[#0891B2]/70"
                          />

                          Profiles sorted
                          alphabetically
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-2xl border border-[#087EA4]/10 bg-[#F0FAFC] px-5 py-4 text-center">
                          <p className="text-2xl font-semibold text-[#087EA4]">
                            <CountUp
                              value={
                                batchInfo.total
                              }
                            />
                          </p>

                          <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.15em] text-[#55727D]">
                            Alumni
                          </p>
                        </div>

                        <div className="rounded-2xl border border-[#087EA4]/10 bg-[#F0FAFC] px-5 py-4 text-center">
                          <p className="text-2xl font-semibold text-[#087EA4]">
                            <CountUp
                              value={
                                batchInfo.withWork
                              }
                            />
                          </p>

                          <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.15em] text-[#55727D]">
                            With workplace
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div
                ref={listTopRef}
                className="scroll-mt-28"
              />

              {/* RESULT BAR */}
              <div className="mb-7 mt-9 flex flex-col gap-3 border-y border-[#087EA4]/10 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-[#55727D]">
                  <span className="font-bold text-[#123B4A]">
                    {visible.length}
                  </span>{" "}
                  alumni

                  {activeBatch !==
                    "all" && (
                    <>
                      {" "}
                      in batch{" "}
                      <span className="font-semibold text-[#087EA4]">
                        {activeBatch}
                      </span>
                    </>
                  )}

                  {search && (
                    <>
                      {" "}
                      matching{" "}
                      <span className="font-medium text-[#087EA4]">
                        “{search}”
                      </span>
                    </>
                  )}

                  {!overviewMode &&
                    totalPages > 1 && (
                      <span className="ml-2 text-[#55727D]/60">
                        • Page{" "}
                        {safePage} of{" "}
                        {totalPages}
                      </span>
                    )}
                </p>

                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#55727D]/55">
                  <FaUsers
                    className="text-[#0891B2]/60"
                    size={9}
                  />
                  Click a profile
                  to explore
                </div>
              </div>

              {/* =================================================
                  EMPTY
              ================================================= */}

              {visible.length === 0 ? (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="flex flex-col items-center justify-center rounded-[2rem] border border-[#087EA4]/10 bg-white/65 px-6 py-28 text-center shadow-[0_20px_60px_rgba(8,126,164,0.045)]"
                >
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#087EA4]/10 bg-[#0891B2]/[0.07]">
                    <FaUserGraduate
                      className="text-[#087EA4]/60"
                      size={24}
                    />
                  </div>

                  <h2 className="text-lg font-semibold text-[#123B4A]">
                    {search ||
                    activeBatch !==
                      "all"
                      ? "No alumni found"
                      : "No alumni yet"}
                  </h2>

                  <p className="mt-2 max-w-md text-sm leading-6 text-[#55727D]">
                    {search ||
                    activeBatch !==
                      "all"
                      ? "Try a different search term or another batch."
                      : "Alumni will appear here once they are added to the directory."}
                  </p>

                  {(search ||
                    activeBatch !==
                      "all") && (
                    <button
                      type="button"
                      onClick={clearAll}
                      className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[#087EA4]/15 bg-white px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#087EA4] shadow-sm transition-all hover:border-[#087EA4]/25 hover:bg-[#0891B2]/[0.04]"
                    >
                      Clear filters
                      <FaArrowRight size={8} />
                    </button>
                  )}
                </motion.div>
              ) : overviewMode ? (
                /* =================================================
                   ALL BATCHES OVERVIEW
                ================================================= */

                <div className="space-y-16">
                  {grouped.map(
                    ([batch, list]) => (
                      <section
                        key={batch}
                        className="relative"
                      >
                        <div className="mb-6 flex flex-col gap-4 border-b border-[#087EA4]/10 pb-4 sm:flex-row sm:items-end sm:justify-between">
                          <div>
                            <div className="flex items-center gap-3">
                              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#087EA4]/10 text-xs font-bold text-[#087EA4]">
                                {batch}
                              </span>

                              <div>
                                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#0891B2]">
                                  Session{" "}
                                  {sessionOf(
                                    batch,
                                    list[0]
                                      ?.session
                                  )}
                                </p>

                                <h3 className="mt-0.5 text-xl font-semibold tracking-tight text-[#123B4A]">
                                  {ordinal(
                                    batch
                                  )}{" "}
                                  Batch
                                </h3>
                              </div>
                            </div>

                            <p className="mt-2 text-xs text-[#55727D]">
                              {list.length}{" "}
                              alumni in
                              this batch
                            </p>
                          </div>

                          {list.length >
                            PREVIEW_COUNT && (
                            <button
                              type="button"
                              onClick={() => {
                                setActiveBatch(
                                  batch
                                );

                                window.scrollTo(
                                  {
                                    top: 0,
                                    behavior:
                                      "smooth",
                                  }
                                );
                              }}
                              className="inline-flex w-fit items-center gap-2 rounded-xl border border-[#087EA4]/15 bg-white px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#087EA4] shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#087EA4]/30 hover:shadow-md"
                            >
                              View all{" "}
                              {list.length}
                              <FaArrowRight
                                size={8}
                              />
                            </button>
                          )}
                        </div>

                        <AlumniGrid
                          items={list.slice(
                            0,
                            PREVIEW_COUNT
                          )}
                          onSelect={
                            setSelected
                          }
                        />
                      </section>
                    )
                  )}
                </div>
              ) : (
                /* =================================================
                   SEARCH / BATCH MODE
                ================================================= */

                <>
                  <AlumniGrid
                    key={`${activeBatch}-${search}-${safePage}`}
                    items={pageItems}
                    onSelect={setSelected}
                  />

                  <Pagination
                    page={safePage}
                    totalPages={
                      totalPages
                    }
                    totalItems={
                      visible.length
                    }
                    pageSize={
                      PAGE_SIZE
                    }
                    onChange={
                      goToPage
                    }
                  />
                </>
              )}

              {/* FOOTER MARK */}
              {visible.length > 0 && (
                <div className="mt-16 flex justify-center">
                  <div className="inline-flex items-center gap-3 border-t border-[#087EA4]/10 pt-5 text-[9px] font-bold uppercase tracking-[0.2em] text-[#55727D]/45">
                    <span>
                      Alumni Directory
                    </span>

                    <span className="h-1 w-1 rounded-full bg-[#0891B2]/50" />

                    <span>
                      Faculty of Fisheries
                    </span>

                    <span className="h-1 w-1 rounded-full bg-[#0891B2]/50" />

                    <span>PSTU</span>
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