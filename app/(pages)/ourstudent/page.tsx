"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@/contexts/AuthContext";
import ModalPortal from "@/components/ui/ModalPortal";
import {
  FaArrowRight,
  FaBookOpen,
  FaEnvelope,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaPhone,
  FaSearch,
  FaTimes,
  FaUserGraduate,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";

/* =========================================================
   TYPES
========================================================= */

interface Student {
  id?: string;
  uid?: string;
  isVerified?: boolean;

  name?: string;
  name_bn?: string;
  bangla_name?: string;

  photo?: string;

  id_no?: string;
  student_id?: string;

  reg_no?: string;
  registration_no?: string;

  batch_no?: string | number;
  batch?: string | number;

  batch_session?: string;
  session?: string;

  present_status?: string;
  currentPosition?: string;
  job_title?: string;
  organization?: string;
  location?: string;
  current_city?: string;
  current_country?: string;

  current_semester?: string;
  semester?: string;

  email?: string;
  phone?: string;

  permanent_address?: string;
  permanentAddress?: string;
  address?: string;

  status?: string;
}

/* =========================================================
   HELPERS
========================================================= */

function getImageUrl(photo?: string) {
  if (!photo) return "";

  if (
    photo.startsWith("/") ||
    photo.startsWith("https://res.cloudinary.com") ||
    photo.startsWith("http://res.cloudinary.com")
  ) {
    return photo;
  }

  const driveId = photo.match(/(?:\/d\/|[?&]id=)([^/&?]+)/)?.[1];

  if (driveId) {
    return `https://drive.google.com/uc?export=view&id=${driveId}`;
  }

  return photo;
}

function getStudentName(student: Student) {
  return (
    student.name?.trim() ||
    student.name_bn?.trim() ||
    student.bangla_name?.trim() ||
    "Unnamed Student"
  );
}

function getBanglaName(student: Student) {
  return (
    student.name_bn?.trim() ||
    student.bangla_name?.trim() ||
    ""
  );
}

function getStudentId(student: Student) {
  return (
    student.id_no?.toString().trim() ||
    student.student_id?.toString().trim() ||
    "Not available"
  );
}

function getRegistration(student: Student) {
  return (
    student.reg_no?.toString().trim() ||
    student.registration_no?.toString().trim() ||
    "Not available"
  );
}

function getBatch(student: Student) {
  return (
    student.batch_no?.toString().trim() ||
    student.batch?.toString().trim() ||
    "Unknown"
  );
}

function getBatchOrdinal(batch: string) {
  const number = Number(batch);
  const lastTwo = number % 100;
  const suffix = lastTwo >= 11 && lastTwo <= 13 ? "th" : ({ 1: "st", 2: "nd", 3: "rd" } as Record<number, string>)[number % 10] || "th";
  return `${number}${suffix}`;
}

function getSession(student: Student) {
  return (
    student.batch_session?.trim() ||
    student.session?.trim() ||
    "Not available"
  );
}

function getSemester(student: Student) {
  return (
    student.current_semester?.trim() ||
    student.semester?.trim() ||
    "Not available"
  );
}

function getAddress(student: Student) {
  return (
    student.permanent_address?.trim() ||
    student.permanentAddress?.trim() ||
    student.address?.trim() ||
    "Not available"
  );
}

function getInitials(name: string) {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (!parts.length) return "ST";

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

/* =========================================================
   COUNT UP
========================================================= */

function CountUp({
  value,
  duration = 1500,
}: {
  value: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-40px",
  });

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const target = Math.max(0, Math.floor(value));

    let frame = 0;
    const start = performance.now();

    const animate = (time: number) => {
      const elapsed = time - start;

      const progress = Math.min(
        elapsed / duration,
        1
      );

      // Smooth ease-out
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
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
    </span>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function OurStudentPage() {
  const previewCount = 6;
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [expandedBatch, setExpandedBatch] = useState<string | null>(null);
  const [activeBatch, setActiveBatch] = useState("all");

  const [selectedStudent, setSelectedStudent] =
    useState<Student | null>(null);

  /* =====================================================
     FETCH STUDENTS
  ===================================================== */

  useEffect(() => {
    let mounted = true;

    const loadStudents = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "/api/students",
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch students"
          );
        }

        const result = await response.json();

        if (!mounted) return;

        if (
          result?.success &&
          Array.isArray(result.data)
        ) {
          setStudents(result.data);
        } else if (Array.isArray(result)) {
          setStudents(result);
        } else {
          setStudents([]);
        }
      } catch (error) {
        console.error(
          "Student fetch error:",
          error
        );

        if (mounted) {
          setStudents([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadStudents();

    return () => {
      mounted = false;
    };
  }, []);

  /* =====================================================
     CURRENT STUDENTS
  ===================================================== */

  const currentStudents = useMemo(() => {
    return students.filter((student) => {
      if (!student.status) return true;

      return (
        student.status.toLowerCase() ===
        "current_student"
      );
    });
  }, [students]);

  const batches = useMemo(
    () => Array.from(new Set(currentStudents.map(getBatch).filter((batch) => batch !== "Unknown"))).sort((a, b) => Number(b) - Number(a)),
    [currentStudents]
  );

  /* =====================================================
     SEARCH STUDENTS
  ===================================================== */

  const filteredStudents = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    return currentStudents.filter((student) => {
      if (!query) return true;
      const batch = getBatch(student);
      const searchableText = [
        getStudentName(student),
        getBanglaName(student),
        getStudentId(student),
        getRegistration(student),
        batch,
        getSession(student),
        getSemester(student),
        getAddress(student),
        student.email || "",
        student.phone || "",
        student.present_status || "",
        student.job_title || student.currentPosition || "",
        student.organization || "",
        student.current_city || "",
        student.current_country || "",
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    }).sort((a, b) => {
      const first = getStudentName(a).toLowerCase();
      const second = getStudentName(b).toLowerCase();
      return first.localeCompare(second);
    });
  }, [currentStudents, search]);

  const groupedStudents = useMemo(() => {
    const grouped = new Map<string, Student[]>();
    filteredStudents.forEach((student) => {
      const batch = getBatch(student);
      if (!grouped.has(batch)) grouped.set(batch, []);
      grouped.get(batch)!.push(student);
    });
    return Array.from(grouped.entries()).sort(([a], [b]) => {
      if (a === "Unknown") return 1;
      if (b === "Unknown") return -1;
      return Number(a) - Number(b);
    });
  }, [filteredStudents]);

  const visibleGroups = activeBatch !== "all"
    ? groupedStudents.filter(([batch]) => batch === activeBatch)
    : groupedStudents;
  const visibleStudentCount = activeBatch === "all"
    ? filteredStudents.length
    : filteredStudents.filter((student) => getBatch(student) === activeBatch).length;

  useEffect(() => {
    setExpandedBatch(null);
    setActiveBatch("all");
  }, [search]);

  /* =====================================================
     MODAL
  ===================================================== */

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedStudent(null);
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleEscape
      );
  }, []);

  useEffect(() => {
    if (selectedStudent) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedStudent]);

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <main className="min-h-screen overflow-hidden bg-[#F0FAFC] text-[#123B4A]">
      {/* =================================================
          HERO
      ================================================= */}

      <section className="relative isolate">
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#2DD4BF]/20 blur-3xl" />

          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#087EA4]/15 blur-3xl" />

          <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#0891B2]/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-12 pt-16 sm:px-6 lg:px-8 lg:pb-16 lg:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
            {/* LEFT */}
            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
              }}
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#BFE6ED] bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#087EA4] shadow-sm backdrop-blur">
                <FaUserGraduate />
                Faculty Student Directory
              </div>

              <h1 className="page-title max-w-3xl">
                Meet the students of{" "}
                <span className="bg-gradient-to-r from-[#075985] via-[#087EA4] to-[#0891B2] bg-clip-text text-transparent">
                  Fisheries
                </span>
              </h1>

              <p className="page-lead mt-6">
                Explore our student community by
                batch, discover academic information,
                and connect with the people shaping
                the future of fisheries and aquatic
                sciences.
              </p>

              {/* HERO STATS */}
              <div className="mt-9 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3">
                <StatCard
                  icon={<FaUsers />}
                  value={
                    currentStudents.length
                  }
                  label="Students"
                />

                <StatCard
                  icon={<FaGraduationCap />}
                  value={batches.length}
                  label="Batches"
                />

                <StatCard
                  icon={<FaBookOpen />}
                  value={currentStudents.length}
                  label="Directory"
                  className="col-span-2 sm:col-span-1"
                />
              </div>
            </motion.div>

            {/* RIGHT VISUAL */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
                x: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.15,
              }}
              className="relative hidden lg:block"
            >
              <div className="relative mx-auto max-w-md">
                <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-[#2DD4BF]/20 via-[#087EA4]/10 to-transparent blur-2xl" />

                <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/75 p-6 shadow-[0_30px_80px_rgba(8,126,164,0.14)] backdrop-blur-xl">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#55727D]">
                        Student Community
                      </p>

                      <h3 className="mt-1 text-xl font-black text-[#123B4A]">
                        Our Students
                      </h3>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#087EA4]/10 text-[#087EA4]">
                      <FaUsers />
                    </div>
                  </div>

                  <div className="rounded-2xl bg-gradient-to-br from-[#075985] to-[#087EA4] p-6 text-white">
                    <p className="text-sm font-medium text-white/75">
                      Current students
                    </p>

                    <div className="mt-2 text-5xl font-black tracking-tight">
                      <CountUp
                        value={
                          currentStudents.length
                        }
                      />
                    </div>

                    <p className="mt-2 text-sm text-white/70">
                      across{" "}
                      <span className="font-bold text-white">
                        <CountUp
                          value={batches.length}
                        />
                      </span>{" "}
                      batches
                    </p>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <MiniStat
                      label="Latest batch"
                      value={
                        batches[0] || "—"
                      }
                    />

                    <MiniStat
                      label="Directory"
                      value="Open"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* =================================================
          DIRECTORY
      ================================================= */}

      <section
        id="student-directory"
        className="scroll-mt-24 border-t border-[#DCEEF2] bg-white/70 py-14 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* HEADER */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#087EA4]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#087EA4]">
                <FaUserGraduate />
                Student Directory
              </div>

              <h2 className="text-3xl font-black tracking-tight text-[#123B4A] sm:text-4xl">
                All Students
              </h2>

              <p className="mt-2 text-sm text-[#55727D] sm:text-base">
                Showing{" "}
                <span className="font-bold text-[#087EA4]">
                  {visibleStudentCount}
                </span>{" "}
                student
                {visibleStudentCount !== 1
                  ? "s"
                  : ""}
              </p>
            </div>

            {/* SEARCH */}
            <div className="w-full lg:max-w-md">
              <div className="relative">
                <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#55727D]" />

                <input
                  type="text"
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value
                    )
                  }
                  placeholder="Search by name, ID, batch..."
                  className="h-12 w-full rounded-2xl border border-[#D6E9EE] bg-white pl-11 pr-11 text-sm font-medium text-[#123B4A] outline-none transition placeholder:text-[#8AA1A9] focus:border-[#087EA4] focus:ring-4 focus:ring-[#087EA4]/10"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() =>
                      setSearch("")
                    }
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-[#55727D] transition hover:bg-[#F0FAFC] hover:text-[#087EA4]"
                  >
                    <FaTimes className="text-xs" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {!loading && filteredStudents.length > 0 && (
            <div className="mt-8" aria-label="Browse students by batch">
              <div className="mb-4 flex items-end justify-between gap-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#087EA4]">Explore the student directory</p>
                  <p className="mt-1 text-sm font-medium text-[#55727D]">Browse students by batch</p>
                </div>
                {activeBatch !== "all" && (
                  <button type="button" onClick={() => { setActiveBatch("all"); setExpandedBatch(null); }} className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#087EA4] transition hover:text-[#075985]">Clear batch</button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => { setActiveBatch("all"); setExpandedBatch(null); }}
                  aria-pressed={activeBatch === "all"}
                  className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold transition-all duration-200 ${activeBatch === "all" ? "border-[#087EA4] bg-[#087EA4] text-white shadow-[0_8px_24px_rgba(8,126,164,0.2)]" : "border-[#087EA4]/10 bg-white/75 text-[#55727D] hover:-translate-y-0.5 hover:border-[#087EA4]/25 hover:text-[#087EA4]"}`}
                >
                  <FaUsers size={10} />
                  <span>All batches</span>
                  <span className={`rounded-full px-2 py-0.5 text-[9px] ${activeBatch === "all" ? "bg-white/15 text-white" : "bg-[#F0FAFC] text-[#55727D]"}`}>{filteredStudents.length}</span>
                </button>
                {groupedStudents.filter(([batch]) => batch !== "Unknown").map(([batch, members]) => {
                  const active = activeBatch === batch;
                  return (
                    <button
                      key={batch}
                      type="button"
                      onClick={() => { setActiveBatch(batch); setExpandedBatch(batch); }}
                      aria-pressed={active}
                      className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold transition-all duration-200 ${active ? "border-[#087EA4] bg-[#087EA4] text-white shadow-[0_8px_24px_rgba(8,126,164,0.2)]" : "border-[#087EA4]/10 bg-white/75 text-[#55727D] hover:-translate-y-0.5 hover:border-[#087EA4]/25 hover:text-[#087EA4]"}`}
                    >
                      <FaGraduationCap size={10} className={active ? "text-white" : "text-[#087EA4]/70"} />
                      <span>Batch {batch}</span>
                      <span className={`rounded-full px-2 py-0.5 text-[9px] ${active ? "bg-white/15 text-white" : "bg-[#F0FAFC] text-[#55727D]"}`}>{members.length}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* =================================================
              CONTENT
          ================================================= */}

          {loading ? (
            <StudentGridSkeleton />
          ) : visibleStudentCount > 0 ? (
            <div className="mt-10 space-y-14">
              {visibleGroups.map(([batch, members]) => {
                const isExpanded = expandedBatch === batch;
                const cards = isExpanded ? members : members.slice(0, previewCount);
                const session = getSession(members[0] || {});
                return (
                  <section key={batch} aria-labelledby={`student-batch-${batch}`}>
                    <div className="mb-6 flex flex-col gap-4 border-b border-[#087EA4]/10 pb-4 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#087EA4]/10 text-sm font-bold text-[#087EA4]">{batch === "Unknown" ? "—" : batch}</span>
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#0891B2]">Session {session || "Details unavailable"}</p>
                            <h3 id={`student-batch-${batch}`} className="mt-0.5 text-xl font-semibold tracking-tight text-[#123B4A]">{batch === "Unknown" ? "Batch details unavailable" : `${getBatchOrdinal(batch)} Batch`}</h3>
                          </div>
                        </div>
                        <p className="mt-2 text-xs text-[#55727D]">{members.length} student{members.length === 1 ? "" : "s"} in this batch</p>
                      </div>
                      {activeBatch !== "all" && isExpanded ? (
                        <button type="button" onClick={() => { setActiveBatch("all"); setExpandedBatch(null); }} className="inline-flex min-h-10 w-fit items-center gap-2 rounded-xl border border-[#087EA4]/15 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[.12em] text-[#087EA4] shadow-sm transition hover:bg-[#F0FAFC]">All batches <FaArrowRight className="rotate-180" size={9} /></button>
                      ) : members.length > previewCount ? (
                        <button type="button" onClick={() => { setExpandedBatch(batch); document.getElementById(`student-batch-${batch}`)?.scrollIntoView({ behavior: "smooth", block: "start" }); }} className="inline-flex min-h-10 w-fit items-center gap-2 rounded-xl border border-[#087EA4]/15 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[.12em] text-[#087EA4] shadow-sm transition hover:bg-[#F0FAFC]">View all {members.length} <FaArrowRight size={9} /></button>
                      ) : null}
                    </div>
                    <motion.div layout className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                      <AnimatePresence mode="popLayout">
                        {cards.map((student, index) => (
                          <StudentCard key={student.id || `${getStudentId(student)}-${index}`} student={student} index={index} onClick={() => setSelectedStudent(student)} />
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  </section>
                );
              })}
            </div>
          ) : (
            <EmptyState
              search={search}
              onReset={() => setSearch("")}
            />
          )}
        </div>
      </section>

      {/* =================================================
          STUDENT MODAL
      ================================================= */}

      <ModalPortal>
      <AnimatePresence>
        {selectedStudent && (
          <StudentModal
            student={selectedStudent}
            onClose={() =>
              setSelectedStudent(null)
            }
          />
        )}
      </AnimatePresence>
      </ModalPortal>
    </main>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  icon,
  value,
  label,
  className = "",
}: {
  icon: ReactNode;
  value: number;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-[#D6E9EE] bg-white/80 p-4 shadow-sm backdrop-blur ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#087EA4]/10 text-[#087EA4]">
          {icon}
        </div>

        <div className="min-w-0">
          <div className="text-2xl font-black leading-none text-[#123B4A]">
            <CountUp value={value} />
          </div>

          <p className="mt-1 truncate text-xs font-semibold text-[#55727D]">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MINI STAT
========================================================= */

function MiniStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-[#DCEEF2] bg-[#F0FAFC] p-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#55727D]">
        {label}
      </p>

      <p className="mt-1 truncate text-sm font-black text-[#123B4A]">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   STUDENT CARD
========================================================= */

function StudentCard({
  student,
  index,
  onClick,
}: {
  student: Student;
  index: number;
  onClick: () => void;
}) {
  const name = getStudentName(student);
  const banglaName = getBanglaName(student);
  const imageUrl = getImageUrl(
    student.photo
  );
  const batch = getBatch(student);
  const semester = getSemester(student);
  const session = getSession(student);
  const status = student.present_status?.trim() || "Current student";
  const address = getAddress(student);

  return (
    <motion.article
      layout
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.96,
      }}
      transition={{
        duration: 0.35,
        delay: Math.min(index * 0.04, 0.25),
      }}
      whileHover={{
        y: -5,
      }}
      className="group relative overflow-hidden rounded-[1.75rem] border border-[#DCEEF2] bg-white shadow-[0_10px_34px_rgba(8,67,86,0.06)] transition-all duration-300 hover:border-[#A9D9E3] hover:shadow-[0_22px_54px_rgba(8,67,86,0.12)]"
    >
      <div className="h-1 bg-gradient-to-r from-[#075985] via-[#087EA4] to-[#2DD4BF]" />

      <div className="p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[1.35rem] bg-[#E9F6F8] ring-1 ring-[#DCEEF2]">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={name}
                fill
                sizes="96px"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#075985] to-[#0891B2] text-xl font-bold text-white">
                {getInitials(name)}
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h3 className="min-w-0 flex-1 text-lg font-bold leading-snug tracking-tight text-[#123B4A] sm:text-xl">
                {name}
              </h3>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#BDE5E9] bg-[#EFFAFA] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#087EA4]">
                <FaGraduationCap /> Batch {batch}
              </span>
            </div>

            {banglaName && banglaName !== name && (
              <p className="mt-1 truncate text-sm text-[#55727D]" lang="bn">
                {banglaName}
              </p>
            )}

            {student.isVerified && <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-bold text-emerald-700"><FaCheckCircle aria-hidden="true" /> Verified PSTU record</span>}

            <span className="mt-3 inline-flex max-w-full items-center gap-2 rounded-full bg-[#F4F8FA] px-2.5 py-1 text-[11px] font-semibold text-[#55727D]">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#22B8A5]" />
              <span className="truncate">{status}</span>
            </span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2.5 border-t border-[#E9F2F4] pt-4">
          <InfoRow
            icon={<FaBookOpen />}
            label="Session"
            value={session}
          />

          <InfoRow
            icon={<FaBookOpen />}
            label="Semester"
            value={semester}
          />
        </div>

        {address !== "Not available" && (
          <div className="mt-4 flex min-w-0 items-start gap-2.5 rounded-xl bg-[#F7FBFC] px-3 py-2.5 text-xs leading-5 text-[#55727D]">
            <FaMapMarkerAlt className="mt-1 shrink-0 text-[#087EA4]" />
            <span className="line-clamp-2">{address}</span>
          </div>
        )}

        <button
          type="button"
          onClick={onClick}
          className="mt-5 flex min-h-11 w-full items-center justify-between rounded-xl border border-[#D9EBEF] bg-white px-4 py-3 text-sm font-semibold text-[#087EA4] transition-all hover:border-[#087EA4] hover:bg-[#087EA4] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087EA4] focus-visible:ring-offset-2"
        >
          <span>View student profile</span>
          <FaArrowRight className="text-xs transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </motion.article>
  );
}

/* =========================================================
   INFO ROW
========================================================= */

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-[#F7FCFD] p-3">
      <div className="flex items-center gap-2">
        <span className="text-xs text-[#087EA4]">
          {icon}
        </span>

        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8AA1A9]">
          {label}
        </span>
      </div>

      <p className="mt-1 truncate text-xs font-bold text-[#123B4A]">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   SKELETON
========================================================= */

function StudentGridSkeleton() {
  return (
    <div className="mt-9 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map(
        (_, index) => (
          <div
            key={index}
            className="animate-pulse overflow-hidden rounded-[1.5rem] border border-[#DCEEF2] bg-white p-5"
          >
            <div className="flex gap-4">
              <div className="h-20 w-20 shrink-0 rounded-2xl bg-[#E8F5F8]" />

              <div className="flex-1">
                <div className="h-5 w-3/4 rounded bg-[#E8F5F8]" />

                <div className="mt-3 h-3 w-1/2 rounded bg-[#E8F5F8]" />

                <div className="mt-3 h-3 w-2/3 rounded bg-[#E8F5F8]" />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2">
              <div className="h-14 rounded-xl bg-[#F0FAFC]" />
              <div className="h-14 rounded-xl bg-[#F0FAFC]" />
            </div>

            <div className="mt-5 h-11 rounded-xl bg-[#F0FAFC]" />
          </div>
        )
      )}
    </div>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState({
  search,
  onReset,
}: {
  search: string;
  onReset: () => void;
}) {
  return (
    <div className="mt-10 rounded-[2rem] border border-dashed border-[#CFE5EA] bg-white px-6 py-16 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F0FAFC] text-2xl text-[#087EA4]">
        <FaSearch />
      </div>

      <h3 className="mt-5 text-xl font-black text-[#123B4A]">
        No students found
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#55727D]">
        We couldn't find students matching
        {search
          ? ` "${search}"`
          : " the directory"}
        .
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-6 rounded-xl bg-[#087EA4] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#087EA4]/20 transition hover:bg-[#075985]"
      >
        Clear search
      </button>
    </div>
  );
}

/* =========================================================
   STUDENT MODAL
========================================================= */

function StudentModal({
  student,
  onClose,
}: {
  student: Student;
  onClose: () => void;
}) {
  const { user } = useAuth();
  const name = getStudentName(student);
  const banglaName = getBanglaName(student);
  const imageUrl = getImageUrl(
    student.photo
  );
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [imageUrl]);

  const reportProfile = async () => {
    if (!user) {
      toast.error("Sign in to report a profile.");
      return;
    }
    const message = window.prompt("What information is incorrect? Please describe it in at least 10 characters.");
    if (!message?.trim()) return;
    try {
      await axios.post("/api/profile/report", { targetUid: student.uid, message });
      toast.success("Report sent to the faculty team for review.");
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Could not send the report.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#123B4A]/50 p-4 backdrop-blur-md"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 25,
          scale: 0.97,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: 15,
          scale: 0.98,
        }}
        transition={{
          type: "spring",
          stiffness: 280,
          damping: 25,
        }}
        className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[1.75rem] border border-white/70 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.22)] sm:rounded-[2rem]"
      >
        {/* CLOSE */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close profile"
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#55727D] shadow-md backdrop-blur transition hover:bg-[#F0FAFC] hover:text-[#087EA4]"
        >
          <FaTimes />
        </button>

        {/* HEADER */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#064D70] via-[#087EA4] to-[#0C8EA4] px-5 pb-7 pt-8 text-white sm:px-8 sm:pb-8">
          <div className="pointer-events-none absolute -right-14 -top-20 h-56 w-56 rounded-full border-[24px] border-white/[0.07]" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-40 w-40 rounded-full bg-[#2DD4BF]/10 blur-3xl" />

          <div className="relative flex flex-col items-center gap-5 sm:flex-row sm:items-end">
            <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-[1.6rem] border-[3px] border-white/40 bg-white/10 shadow-[0_14px_35px_rgba(0,0,0,0.2)] sm:h-40 sm:w-40">
              {imageUrl && !imageFailed ? (
                <Image
                  src={imageUrl}
                  alt={name}
                  fill
                  sizes="(min-width: 640px) 160px, 128px"
                  className="object-cover"
                  onError={() => setImageFailed(true)}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-white/15 text-4xl font-black">
                  {getInitials(name)}
                </div>
              )}
            </div>

            <div className="min-w-0 text-center sm:text-left">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
                Student directory
              </p>

              <h2 className="mt-1 break-words text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
                {name}
              </h2>
              {student.isVerified && <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold text-white"><FaCheckCircle aria-hidden="true" /> Verified PSTU record</span>}

              {banglaName &&
                banglaName !== name && (
                  <p className="mt-1 text-sm text-white/75">
                    {banglaName}
                  </p>
                )}
              <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90">Batch {getBatch(student)}</span>
                {getSession(student) !== "Not available" && <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90">Session {getSession(student)}</span>}
              </div>
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="p-5 sm:p-8">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-8 w-1 rounded-full bg-[#087EA4]" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#087EA4]">Academic profile</p>
              <h3 className="mt-0.5 text-lg font-bold text-[#123B4A]">Student details</h3>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <DetailBox
              icon={<FaGraduationCap />}
              label="Batch"
              value={getBatch(student)}
            />

            <DetailBox
              icon={<FaBookOpen />}
              label="Session"
              value={getSession(student)}
            />

            <DetailBox
              icon={<FaBookOpen />}
              label="Current Semester"
              value={getSemester(student)}
            />

            <DetailBox
              icon={<FaMapMarkerAlt />}
              label="Status"
              value={
                student.present_status ||
                student.status ||
                "Current Student"
              }
            />
          </div>

          {/* CONTACT */}
          {(student.email ||
            student.phone ||
            getAddress(student) !==
              "Not available") && (
            <div className="mt-8 border-t border-[#E7F0F2] pt-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-8 w-1 rounded-full bg-[#2DD4BF]" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#087EA4]">Stay connected</p>
                  <h3 className="mt-0.5 text-lg font-bold text-[#123B4A]">Contact & address</h3>
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {student.email && (
                  <ContactRow
                    icon={<FaEnvelope />}
                    label="Email"
                    value={student.email}
                  />
                )}

                {student.phone && (
                  <ContactRow
                    icon={<FaPhone />}
                    label="Phone"
                    value={student.phone}
                  />
                )}

                {getAddress(student) !==
                  "Not available" && (
                  <ContactRow
                    icon={
                      <FaMapMarkerAlt />
                    }
                    label="Address"
                    value={getAddress(
                      student
                    )}
                    className="sm:col-span-2"
                  />
                )}
              </div>
            </div>
          )}

          {student.uid && (
            <div className="mt-6 border-t border-[#E7F0F2] pt-4">
              <button type="button" onClick={() => void reportProfile()} className="min-h-11 rounded-xl border border-[#DCEEF2] px-4 py-2 text-sm font-semibold text-[#55727D] transition hover:bg-[#F0FAFC] hover:text-[#087EA4]" aria-label={`Report incorrect information for ${name}`}>
                Report incorrect information
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* =========================================================
   DETAIL BOX
========================================================= */

function DetailBox({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-[#DCEEF2] bg-[#F8FCFD] p-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-[#087EA4]">
          {icon}
        </span>

        <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#8AA1A9]">
          {label}
        </span>
      </div>

      <p className="mt-2 break-words text-sm font-bold text-[#123B4A]">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   CONTACT ROW
========================================================= */

function ContactRow({
  icon,
  label,
  value,
  className = "",
}: {
  icon: ReactNode;
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={`flex items-start gap-3 rounded-xl border border-[#DCEEF2] bg-white p-3 ${className}`}>
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#087EA4]/10 text-xs text-[#087EA4]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#8AA1A9]">
          {label}
        </p>

        <p className="mt-0.5 break-words text-sm font-semibold text-[#123B4A]">
          {value}
        </p>
      </div>
    </div>
  );
}
