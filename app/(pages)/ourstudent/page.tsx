"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import {
  FaArrowRight,
  FaBookOpen,
  FaBriefcase,
  FaChevronLeft,
  FaChevronRight,
  FaEnvelope,
  FaGraduationCap,
  FaIdCard,
  FaMapMarkerAlt,
  FaPhone,
  FaSearch,
  FaTimes,
  FaUserGraduate,
  FaUsers,
} from "react-icons/fa";

/* =========================================================
   TYPES
========================================================= */

interface Student {
  id?: string;

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
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedBatch, setSelectedBatch] =
    useState("All");

  const [selectedStudent, setSelectedStudent] =
    useState<Student | null>(null);

  const [page, setPage] = useState(1);

  const studentsPerPage = 12;

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

  /* =====================================================
     BATCHES
  ===================================================== */

  const batches = useMemo(() => {
    const unique = new Set<string>();

    currentStudents.forEach((student) => {
      const batch = getBatch(student);

      if (batch !== "Unknown") {
        unique.add(batch);
      }
    });

    return Array.from(unique).sort((a, b) => {
      const aNumber = Number(a);
      const bNumber = Number(b);

      if (
        !Number.isNaN(aNumber) &&
        !Number.isNaN(bNumber)
      ) {
        return bNumber - aNumber;
      }

      return b.localeCompare(a);
    });
  }, [currentStudents]);

  /* =====================================================
     BATCH COUNTS
  ===================================================== */

  const batchCounts = useMemo(() => {
    const counts = new Map<string, number>();

    currentStudents.forEach((student) => {
      const batch = getBatch(student);

      counts.set(
        batch,
        (counts.get(batch) ?? 0) + 1
      );
    });

    return counts;
  }, [currentStudents]);

  /* =====================================================
     FILTER STUDENTS
  ===================================================== */

  const filteredStudents = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    return currentStudents.filter((student) => {
      const batch = getBatch(student);

      const matchesBatch =
        selectedBatch === "All" ||
        batch === selectedBatch;

      if (!matchesBatch) return false;

      if (!query) return true;

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
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [
    currentStudents,
    search,
    selectedBatch,
  ]);

  /* =====================================================
     PAGINATION
  ===================================================== */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredStudents.length /
        studentsPerPage
    )
  );

  const paginatedStudents = useMemo(() => {
    const start =
      (page - 1) * studentsPerPage;

    return filteredStudents.slice(
      start,
      start + studentsPerPage
    );
  }, [filteredStudents, page]);

  /* =====================================================
     RESET PAGE WHEN FILTER CHANGES
  ===================================================== */

  useEffect(() => {
    setPage(1);
  }, [search, selectedBatch]);

  /* =====================================================
     BATCH SELECT
  ===================================================== */

  const selectBatch = (batch: string) => {
    setSelectedBatch(batch);
    setPage(1);

    window.setTimeout(() => {
      document
        .getElementById("student-directory")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  };

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
     PAGINATION NUMBERS
  ===================================================== */

  const paginationNumbers = useMemo(() => {
    const pages: number[] = [];

    const start = Math.max(
      1,
      page - 2
    );

    const end = Math.min(
      totalPages,
      page + 2
    );

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }, [page, totalPages]);

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

              <h1 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-tight text-[#123B4A] sm:text-5xl lg:text-6xl">
                Meet the students of{" "}
                <span className="bg-gradient-to-r from-[#075985] via-[#087EA4] to-[#0891B2] bg-clip-text text-transparent">
                  Fisheries
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-[#55727D] sm:text-lg">
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
                  value={
                    selectedBatch === "All"
                      ? currentStudents.length
                      : batchCounts.get(
                          selectedBatch
                        ) ?? 0
                  }
                  label={
                    selectedBatch === "All"
                      ? "Directory"
                      : `Batch ${selectedBatch}`
                  }
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

          {/* =================================================
              BATCH EXPLORER
          ================================================= */}

          <motion.section
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.25,
            }}
            className="mt-12"
          >
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#087EA4]">
                  Explore Students
                </p>

                <h2 className="mt-1 text-xl font-black text-[#123B4A] sm:text-2xl">
                  Find students by batch
                </h2>

                <p className="mt-1 text-sm text-[#55727D]">
                  Select a batch to quickly browse
                  its students.
                </p>
              </div>

              {selectedBatch !== "All" && (
                <button
                  type="button"
                  onClick={() =>
                    selectBatch("All")
                  }
                  className="self-start rounded-full border border-[#D6E9EE] bg-white px-4 py-2 text-xs font-bold text-[#087EA4] shadow-sm transition hover:border-[#087EA4] hover:bg-[#F0FAFC] sm:self-auto"
                >
                  Show all students
                </button>
              )}
            </div>

            {/* NO DROPDOWN / NO SCROLLBAR */}
            <div className="flex flex-wrap gap-2.5">
              {/* ALL */}
              <button
                type="button"
                onClick={() =>
                  selectBatch("All")
                }
                aria-pressed={
                  selectedBatch === "All"
                }
                className={`group flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-bold transition-all duration-200 ${
                  selectedBatch === "All"
                    ? "border-[#087EA4] bg-[#087EA4] text-white shadow-lg shadow-[#087EA4]/20"
                    : "border-[#D6E9EE] bg-white text-[#123B4A] hover:-translate-y-0.5 hover:border-[#087EA4] hover:text-[#087EA4] hover:shadow-md"
                }`}
              >
                <FaUsers className="text-xs" />

                <span>All Batches</span>

                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] ${
                    selectedBatch === "All"
                      ? "bg-white/20 text-white"
                      : "bg-[#F0FAFC] text-[#55727D]"
                  }`}
                >
                  {currentStudents.length}
                </span>
              </button>

              {/* INDIVIDUAL BATCHES */}
              {batches.map((batch) => {
                const count =
                  batchCounts.get(batch) ??
                  0;

                const active =
                  selectedBatch === batch;

                return (
                  <button
                    key={batch}
                    type="button"
                    onClick={() =>
                      selectBatch(batch)
                    }
                    aria-pressed={active}
                    className={`group flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-bold transition-all duration-200 ${
                      active
                        ? "border-[#087EA4] bg-[#087EA4] text-white shadow-lg shadow-[#087EA4]/20"
                        : "border-[#D6E9EE] bg-white text-[#123B4A] hover:-translate-y-0.5 hover:border-[#087EA4] hover:text-[#087EA4] hover:shadow-md"
                    }`}
                  >
                    <FaGraduationCap
                      className={`text-xs ${
                        active
                          ? "text-white"
                          : "text-[#087EA4]"
                      }`}
                    />

                    <span>
                      Batch {batch}
                    </span>

                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] ${
                        active
                          ? "bg-white/20 text-white"
                          : "bg-[#F0FAFC] text-[#55727D]"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.section>
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
                {selectedBatch === "All"
                  ? "All Students"
                  : `Batch ${selectedBatch}`}
              </h2>

              <p className="mt-2 text-sm text-[#55727D] sm:text-base">
                Showing{" "}
                <span className="font-bold text-[#087EA4]">
                  {filteredStudents.length}
                </span>{" "}
                student
                {filteredStudents.length !== 1
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

          {/* ACTIVE FILTER */}
          {(search ||
            selectedBatch !== "All") && (
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#55727D]">
                Active filters:
              </span>

              {selectedBatch !== "All" && (
                <button
                  type="button"
                  onClick={() =>
                    selectBatch("All")
                  }
                  className="inline-flex items-center gap-2 rounded-full bg-[#087EA4]/10 px-3 py-1.5 text-xs font-bold text-[#087EA4]"
                >
                  Batch {selectedBatch}
                  <FaTimes />
                </button>
              )}

              {search && (
                <button
                  type="button"
                  onClick={() =>
                    setSearch("")
                  }
                  className="inline-flex items-center gap-2 rounded-full bg-[#2DD4BF]/15 px-3 py-1.5 text-xs font-bold text-[#087EA4]"
                >
                  Search: "{search}"
                  <FaTimes />
                </button>
              )}
            </div>
          )}

          {/* =================================================
              CONTENT
          ================================================= */}

          {loading ? (
            <StudentGridSkeleton />
          ) : paginatedStudents.length > 0 ? (
            <>
              <motion.div
                layout
                className="mt-9 grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
              >
                <AnimatePresence mode="popLayout">
                  {paginatedStudents.map(
                    (student, index) => (
                      <StudentCard
                        key={
                          student.id ||
                          `${getStudentId(
                            student
                          )}-${index}`
                        }
                        student={student}
                        index={index}
                        onClick={() =>
                          setSelectedStudent(
                            student
                          )
                        }
                      />
                    )
                  )}
                </AnimatePresence>
              </motion.div>

              {/* PAGINATION */}
              {totalPages > 1 && (
                <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[#DCEEF2] pt-7 sm:flex-row">
                  <p className="text-sm text-[#55727D]">
                    Page{" "}
                    <span className="font-bold text-[#123B4A]">
                      {page}
                    </span>{" "}
                    of{" "}
                    <span className="font-bold text-[#123B4A]">
                      {totalPages}
                    </span>
                  </p>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      disabled={page === 1}
                      onClick={() =>
                        setPage((p) =>
                          Math.max(1, p - 1)
                        )
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D6E9EE] bg-white text-[#55727D] transition hover:border-[#087EA4] hover:text-[#087EA4] disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label="Previous page"
                    >
                      <FaChevronLeft className="text-xs" />
                    </button>

                    {paginationNumbers.map(
                      (number) => (
                        <button
                          key={number}
                          type="button"
                          onClick={() =>
                            setPage(number)
                          }
                          className={`flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm font-bold transition ${
                            page === number
                              ? "bg-[#087EA4] text-white shadow-md shadow-[#087EA4]/20"
                              : "border border-[#D6E9EE] bg-white text-[#55727D] hover:border-[#087EA4] hover:text-[#087EA4]"
                          }`}
                        >
                          {number}
                        </button>
                      )
                    )}

                    <button
                      type="button"
                      disabled={
                        page === totalPages
                      }
                      onClick={() =>
                        setPage((p) =>
                          Math.min(
                            totalPages,
                            p + 1
                          )
                        )
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D6E9EE] bg-white text-[#55727D] transition hover:border-[#087EA4] hover:text-[#087EA4] disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label="Next page"
                    >
                      <FaChevronRight className="text-xs" />
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <EmptyState
              search={search}
              selectedBatch={selectedBatch}
              onReset={() => {
                setSearch("");
                selectBatch("All");
              }}
            />
          )}
        </div>
      </section>

      {/* =================================================
          STUDENT MODAL
      ================================================= */}

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
  const studentId = getStudentId(student);
  const semester = getSemester(student);

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
      className="group relative overflow-hidden rounded-[1.5rem] border border-[#DCEEF2] bg-white shadow-[0_8px_35px_rgba(8,126,164,0.06)] transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(8,126,164,0.13)]"
    >
      {/* top accent */}
      <div className="h-1 bg-gradient-to-r from-[#075985] via-[#087EA4] to-[#2DD4BF]" />

      <div className="p-5">
        <div className="flex gap-4">
          {/* PHOTO */}
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-[#F0FAFC] ring-4 ring-[#F0FAFC]">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={name}
                fill
                sizes="80px"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#075985] to-[#0891B2] text-xl font-black text-white">
                {getInitials(name)}
              </div>
            )}
          </div>

          {/* INFO */}
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="truncate text-lg font-black text-[#123B4A]">
                  {name}
                </h3>

                {banglaName &&
                  banglaName !== name && (
                    <p className="mt-0.5 truncate text-xs text-[#55727D]">
                      {banglaName}
                    </p>
                  )}
              </div>

              <span className="shrink-0 rounded-full bg-[#087EA4]/10 px-2.5 py-1 text-[10px] font-black text-[#087EA4]">
                {batch}
              </span>
            </div>

            <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-[#55727D]">
              <FaIdCard className="text-[#087EA4]" />
              {studentId}
            </p>
          </div>
        </div>

        {/* DETAILS */}
        <div className="mt-5 grid grid-cols-2 gap-2">
          <InfoRow
            icon={<FaGraduationCap />}
            label="Batch"
            value={batch}
          />

          <InfoRow
            icon={<FaBookOpen />}
            label="Semester"
            value={semester}
          />
        </div>

        {/* BUTTON */}
        <button
          type="button"
          onClick={onClick}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#F0FAFC] py-3 text-xs font-black text-[#087EA4] transition-all hover:bg-[#087EA4] hover:text-white"
        >
          View profile
          <FaArrowRight className="text-[10px] transition-transform group-hover:translate-x-0.5" />
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
  selectedBatch,
  onReset,
}: {
  search: string;
  selectedBatch: string;
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
          : selectedBatch !== "All"
          ? ` batch ${selectedBatch}`
          : " your filters"}
        .
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-6 rounded-xl bg-[#087EA4] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#087EA4]/20 transition hover:bg-[#075985]"
      >
        Clear filters
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
  const name = getStudentName(student);
  const banglaName = getBanglaName(student);
  const imageUrl = getImageUrl(
    student.photo
  );

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
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-white/70 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.22)]"
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
        <div className="relative overflow-hidden bg-gradient-to-br from-[#075985] via-[#087EA4] to-[#0891B2] px-6 pb-8 pt-8 text-white sm:px-8">
          <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

          <div className="relative flex flex-col items-center gap-5 sm:flex-row sm:items-end">
            {/* PHOTO */}
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-[1.75rem] border-4 border-white/30 bg-white/10 shadow-xl">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={name}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-white/15 text-3xl font-black">
                  {getInitials(name)}
                </div>
              )}
            </div>

            <div className="min-w-0 text-center sm:text-left">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/65">
                Student Profile
              </p>

              <h2 className="mt-1 break-words text-2xl font-black sm:text-3xl">
                {name}
              </h2>

              {banglaName &&
                banglaName !== name && (
                  <p className="mt-1 text-sm text-white/75">
                    {banglaName}
                  </p>
                )}
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="p-6 sm:p-8">
          <div className="grid gap-3 sm:grid-cols-2">
            <DetailBox
              icon={<FaIdCard />}
              label="Student ID"
              value={getStudentId(
                student
              )}
            />

            <DetailBox
              icon={<FaIdCard />}
              label="Registration"
              value={getRegistration(
                student
              )}
            />

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
            <div className="mt-7">
              <h3 className="mb-3 text-sm font-black uppercase tracking-[0.12em] text-[#123B4A]">
                Contact & Address
              </h3>

              <div className="space-y-2">
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
                  />
                )}
              </div>
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
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-[#DCEEF2] bg-white p-3">
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