"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Alumni, DEPARTMENTS, Department } from "@/types";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import {
  FaSearch,
  FaUserGraduate,
  FaFilter,
  FaTimes,
  FaArrowRight,
} from "react-icons/fa";
import AlumniCard from "@/components/alumni/AlumniCard";
import AlumniModal from "@/components/alumni/AlumniModal";

const deptKeys = ["ALL", ...Object.keys(DEPARTMENTS)] as const;

const departmentStyles: Record<
  string,
  {
    text: string;
    border: string;
    bg: string;
    glow: string;
  }
> = {
  AQC: {
    text: "text-cyan-300",
    border: "border-cyan-300/20",
    bg: "bg-cyan-400/[0.08]",
    glow: "shadow-[0_0_25px_rgba(34,211,238,0.06)]",
  },
  FBG: {
    text: "text-emerald-300",
    border: "border-emerald-300/20",
    bg: "bg-emerald-400/[0.08]",
    glow: "shadow-[0_0_25px_rgba(52,211,153,0.06)]",
  },
  FMN: {
    text: "text-violet-300",
    border: "border-violet-300/20",
    bg: "bg-violet-400/[0.08]",
    glow: "shadow-[0_0_25px_rgba(167,139,250,0.06)]",
  },
  FST: {
    text: "text-amber-300",
    border: "border-amber-300/20",
    bg: "bg-amber-400/[0.08]",
    glow: "shadow-[0_0_25px_rgba(251,191,36,0.06)]",
  },
  MFO: {
    text: "text-sky-300",
    border: "border-sky-300/20",
    bg: "bg-sky-400/[0.08]",
    glow: "shadow-[0_0_25px_rgba(56,189,248,0.06)]",
  },
};

export default function AlumniPage() {
  const [activeDept, setActiveDept] = useState("ALL");
  const [search, setSearch] = useState("");
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAlumni, setSelectedAlumni] = useState<Alumni | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const url =
      activeDept === "ALL"
        ? "/api/alumni"
        : `/api/alumni?department=${activeDept}`;

    axios
      .get(url)
      .then(({ data }) => {
        if (data.success) {
          setAlumni(data.data);
        } else {
          setError(data.error);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [activeDept]);

  const filtered = alumni.filter((alumniMember) => {
    const query = search.toLowerCase().trim();

    if (!query) return true;

    return (
      alumniMember.name.toLowerCase().includes(query) ||
      alumniMember.organization?.toLowerCase().includes(query) ||
      alumniMember.currentPosition?.toLowerCase().includes(query) ||
      alumniMember.location?.toLowerCase().includes(query)
    );
  });

  const clearSearch = () => {
    setSearch("");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020b18] text-white">
      {/* =========================================================
          ATMOSPHERE
      ========================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-72 top-0 h-[650px] w-[650px] rounded-full bg-cyan-500/[0.035] blur-[150px]" />

        <div className="absolute -right-72 top-[25%] h-[650px] w-[650px] rounded-full bg-blue-500/[0.025] blur-[150px]" />

        <div className="absolute bottom-0 left-1/3 h-[500px] w-[500px] rounded-full bg-teal-400/[0.02] blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(125,211,252,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,0.7) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-cyan-400/[0.025] to-transparent" />
      </div>

      {/* =========================================================
          MODAL
      ========================================================== */}
      <AlumniModal
        alumni={selectedAlumni}
        onClose={() => setSelectedAlumni(null)}
      />

      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative z-10 border-b border-white/[0.05] pt-32 pb-16 sm:pt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/10 bg-cyan-400/[0.04] px-4 py-2 backdrop-blur-xl"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.7)]" />

              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-cyan-300/70">
                Alumni Network
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Where our graduates
              <span className="block text-cyan-300">
                make an impact.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base"
            >
              Explore the growing network of Faculty of Fisheries graduates
              working across research, industry, government, conservation,
              and aquatic sciences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 flex items-center justify-center gap-6 text-[10px] uppercase tracking-[0.18em] text-slate-600"
            >
              <span>Faculty of Fisheries</span>
              <span className="h-1 w-1 rounded-full bg-cyan-400/30" />
              <span>PSTU</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CONTENT
      ========================================================== */}
      <section className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* =====================================================
              SEARCH
          ====================================================== */}
          <div className="mx-auto max-w-2xl">
            <div className="relative">
              <FaSearch
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400/40"
                size={12}
              />

              <input
                type="text"
                placeholder="Search by name, position, organization..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full rounded-2xl border border-white/[0.07] bg-white/[0.025] py-3.5 pl-11 pr-11 text-xs text-slate-200 outline-none backdrop-blur-xl transition-all duration-300 placeholder:text-slate-700 focus:border-cyan-300/20 focus:bg-white/[0.035] focus:ring-4 focus:ring-cyan-400/[0.025]"
              />

              {search && (
                <button
                  type="button"
                  onClick={clearSearch}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-white/[0.05] hover:text-slate-300"
                >
                  <FaTimes size={10} />
                </button>
              )}
            </div>
          </div>

          {/* =====================================================
              DEPARTMENT FILTER
          ====================================================== */}
          <div className="mt-8">
            <div className="mb-4 flex items-center justify-center gap-2 text-[9px] uppercase tracking-[0.18em] text-slate-700">
              <FaFilter size={8} />
              <span>Filter by department</span>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {deptKeys.map((key) => {
                const isActive = activeDept === key;

                const style =
                  key === "ALL"
                    ? {
                        text: "text-cyan-300",
                        border: "border-cyan-300/20",
                        bg: "bg-cyan-400/[0.08]",
                        glow:
                          "shadow-[0_0_25px_rgba(34,211,238,0.06)]",
                      }
                    : departmentStyles[key] ?? {
                        text: "text-cyan-300",
                        border: "border-cyan-300/20",
                        bg: "bg-cyan-400/[0.08]",
                        glow: "",
                      };

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveDept(key)}
                    className={[
                      "relative overflow-hidden rounded-xl border px-4 py-2.5",
                      "text-xs backdrop-blur-xl transition-all duration-300",
                      isActive
                        ? `${style.bg} ${style.border} ${style.text} ${style.glow}`
                        : "border-white/[0.06] bg-white/[0.02] text-slate-600 hover:border-white/[0.12] hover:bg-white/[0.035] hover:text-slate-300",
                    ].join(" ")}
                  >
                    {key === "ALL"
                      ? "All Alumni"
                      : `${key} — ${DEPARTMENTS[key as Department]}`}

                    {isActive && (
                      <motion.span
                        layoutId="activeAlumniDepartment"
                        className="absolute inset-x-3 bottom-0 h-px bg-current opacity-50"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* =====================================================
              ERROR
          ====================================================== */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 rounded-2xl border border-red-400/10 bg-red-400/[0.035] px-6 py-10 text-center"
            >
              <p className="text-sm text-red-300/80">{error}</p>
            </motion.div>
          )}

          {/* =====================================================
              LOADING
          ====================================================== */}
          {loading && (
            <div className="py-12">
              <LoadingSpinner message="Loading alumni..." />
            </div>
          )}

          {/* =====================================================
              RESULTS
          ====================================================== */}
          {!loading && !error && (
            <>
              {/* Result bar */}
              <div className="mt-10 mb-7 flex flex-col gap-3 border-y border-white/[0.05] py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-slate-500">
                  <span className="text-slate-300">{filtered.length}</span>{" "}
                  alumni
                  {search && (
                    <>
                      {" "}
                      matching{" "}
                      <span className="text-cyan-300/70">
                        “{search}”
                      </span>
                    </>
                  )}
                </p>

                <p className="text-[10px] uppercase tracking-[0.15em] text-slate-700">
                  Click a profile to explore
                </p>
              </div>

              {/* =================================================
                  EMPTY
              ================================================== */}
              {filtered.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center border-y border-white/[0.05] py-28 text-center"
                >
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.025]">
                    <FaUserGraduate
                      className="text-cyan-400/40"
                      size={24}
                    />
                  </div>

                  <h2 className="text-lg font-medium text-slate-300">
                    {search || activeDept !== "ALL"
                      ? "No alumni found"
                      : "No alumni registered yet"}
                  </h2>

                  <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
                    {search || activeDept !== "ALL"
                      ? "Try a different search term or department."
                      : "Alumni will appear here once they register and complete their profile."}
                  </p>

                  {(search || activeDept !== "ALL") && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearch("");
                        setActiveDept("ALL");
                      }}
                      className="mt-5 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.15em] text-cyan-400/70 transition-colors hover:text-cyan-300"
                    >
                      Clear filters
                      <FaArrowRight size={8} />
                    </button>
                  )}
                </motion.div>
              ) : (
                <>
                  {/* =================================================
                      ALUMNI GRID
                  ================================================== */}
                  <motion.div
                    layout
                    className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
                  >
                    {filtered.map((alumniMember, index) => (
                      <motion.div
                        key={alumniMember._id}
                        layout
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.45,
                          delay: Math.min(index * 0.045, 0.35),
                        }}
                        className="group relative"
                      >
                        <div className="pointer-events-none absolute -inset-1 rounded-[22px] bg-cyan-400/[0.025] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

                        <div className="relative">
                          <AlumniCard
                            alumni={alumniMember}
                            index={index}
                            onClick={() =>
                              setSelectedAlumni(alumniMember)
                            }
                          />
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Bottom hint */}
                  <div className="mt-14 flex justify-center">
                    <div className="inline-flex items-center gap-3 border-t border-white/[0.05] pt-5 text-[10px] uppercase tracking-[0.18em] text-slate-700">
                      <span>Alumni directory</span>
                      <FaArrowRight
                        size={8}
                        className="text-cyan-400/40"
                      />
                      <span>Explore profiles</span>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}