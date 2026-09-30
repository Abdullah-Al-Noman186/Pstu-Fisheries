
"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  FaSearch,
  FaTimes,
  FaUserGraduate,
  FaIdCard,
  FaBookOpen,
  FaCalendarAlt,
  FaCheckCircle,
  FaChevronDown,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaUsers,
} from "react-icons/fa";

/* ============================================================
   TYPES
============================================================ */

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

  registered?: boolean;
  status?: string;
}

/* ============================================================
   STUDENT DATA
============================================================ */

/*
  Change this import if your JSON is located somewhere else.

  Example:
  import studentsData from "@/data/students.json";
*/
import studentsData from "../../../scripts/data/students_status.json";

const students: Student[] = Array.isArray(studentsData)
  ? studentsData
  : (studentsData as any)?.students || [];

/* ============================================================
   HELPERS
============================================================ */
function getImageUrl(photo?: string) {
  if (!photo) return "";

  // Google Drive "open" URL
  const driveMatch = photo.match(/[?&]id=([^&]+)/);

  if (driveMatch) {
    return `https://drive.google.com/uc?export=view&id=${driveMatch[1]}`;
  }

  // Google Drive file URL
  const fileMatch = photo.match(/\/file\/d\/([^/]+)/);

  if (fileMatch) {
    return `https://drive.google.com/uc?export=view&id=${fileMatch[1]}`;
  }

  return photo;
}

function getStudentName(student: Student) {
  return (
    student.name ||
    student.name_bn ||
    student.bangla_name ||
    "Unnamed Student"
  );
}

function getBanglaName(student: Student) {
  return student.name_bn || student.bangla_name || "";
}

function getStudentId(student: Student) {
  return student.id_no || student.student_id || "Not available";
}

function getRegistration(student: Student) {
  return (
    student.reg_no ||
    student.registration_no ||
    "Not available"
  );
}

function getBatch(student: Student) {
  return String(
    student.batch_no ||
      student.batch ||
      "N/A"
  );
}

function getSession(student: Student) {
  return (
    student.batch_session ||
    student.session ||
    "Session not available"
  );
}

function getSemester(student: Student) {
  return (
    student.current_semester ||
    student.semester ||
    student.present_status ||
    "Current Student"
  );
}

function getInitials(name: string) {
  const words = name.trim().split(/\s+/);

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return (
    words[0][0] +
    words[words.length - 1][0]
  ).toUpperCase();
}

/* ============================================================
   MAIN PAGE
============================================================ */

export default function OurStudentPage() {
  const [search, setSearch] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("All");
  const [selectedStudent, setSelectedStudent] =
    useState<Student | null>(null);

  const [showFilters, setShowFilters] =
    useState(false);

  const [page, setPage] = useState(1);

  const studentsPerPage = 12;

  /* ============================================================
     CURRENT STUDENTS
  ============================================================ */

  const currentStudents = useMemo(() => {
    return students.filter((student) => {
      if (!student.status) return true;

      return (
        student.status.toLowerCase() ===
        "current_student"
      );
    });
  }, []);

  /* ============================================================
     BATCH LIST
  ============================================================ */

  const batches = useMemo(() => {
    const unique = new Set(
      currentStudents.map((student) =>
        getBatch(student)
      )
    );

    return [
      "All",
      ...Array.from(unique).sort((a, b) =>
        b.localeCompare(a, undefined, {
          numeric: true,
        })
      ),
    ];
  }, [currentStudents]);

  /* ============================================================
     FILTER STUDENTS
  ============================================================ */

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return currentStudents.filter((student) => {
      const name = getStudentName(student).toLowerCase();

      const banglaName =
        getBanglaName(student).toLowerCase();

      const studentId =
        getStudentId(student).toLowerCase();

      const registration =
        getRegistration(student).toLowerCase();

      const batch =
        getBatch(student).toLowerCase();

      const session =
        getSession(student).toLowerCase();

      const matchesSearch =
        !query ||
        name.includes(query) ||
        banglaName.includes(query) ||
        studentId.includes(query) ||
        registration.includes(query) ||
        batch.includes(query) ||
        session.includes(query);

      const matchesBatch =
        selectedBatch === "All" ||
        batch === selectedBatch;

      return (
        matchesSearch &&
        matchesBatch
      );
    });
  }, [
    currentStudents,
    search,
    selectedBatch,
  ]);

  /* ============================================================
     PAGINATION
  ============================================================ */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredStudents.length /
        studentsPerPage
    )
  );

  const paginatedStudents = filteredStudents.slice(
    (page - 1) * studentsPerPage,
    page * studentsPerPage
  );

  /* ============================================================
     RESET PAGE WHEN FILTER CHANGES
  ============================================================ */

  useEffect(() => {
    setPage(1);
  }, [search, selectedBatch]);

  /* ============================================================
     ESCAPE MODAL
  ============================================================ */

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

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  /* ============================================================
     BODY SCROLL LOCK
  ============================================================ */

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

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <main className="min-h-screen bg-[#F0FAFC] text-[#123B4A]">

      {/* ======================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden pt-24">

        {/* Background glow */}

        <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#2DD4BF]/15 blur-[120px]" />

        <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-[#087EA4]/12 blur-[130px]" />

        <div className="pointer-events-none absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 rounded-full bg-[#0891B2]/8 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-14 sm:px-8 lg:px-10 lg:pb-20 lg:pt-20">

          <div className="grid items-center gap-12 lg:grid-cols-[1fr_380px]">

            {/* =================================================
                HERO CONTENT
            ================================================= */}

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
              {/* Label */}

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#087EA4]/10 bg-white/80 px-3.5 py-2 shadow-sm backdrop-blur-xl">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#087EA4]/10 text-[#087EA4]">
                  <FaUsers size={9} />
                </span>

                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#087EA4]">
                  Student Community
                </span>
              </div>

              {/* Heading */}

              <h1 className="max-w-3xl text-4xl font-black leading-[1.08] tracking-tight text-[#123B4A] sm:text-5xl lg:text-6xl">
                Our{" "}
                <span className="relative inline-block text-[#087EA4]">
                  Students
                  <span className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-[#2DD4BF]/50" />
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-[#55727D] sm:text-lg">
                Explore the current student community of
                the Faculty of Fisheries, Patuakhali
                Science and Technology University.
              </p>

              {/* Stats */}

              <div className="mt-8 flex flex-wrap gap-3">

                <div className="rounded-2xl border border-[#087EA4]/10 bg-white/85 px-5 py-3.5 shadow-[0_8px_30px_rgba(7,89,133,0.06)] backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#087EA4]/10 text-[#087EA4]">
                      <FaUserGraduate size={14} />
                    </div>

                    <div>
                      <p className="text-lg font-black text-[#123B4A]">
                        {currentStudents.length}
                      </p>

                      <p className="text-[9px] font-bold uppercase tracking-wider text-[#55727D]">
                        Current Students
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#087EA4]/10 bg-white/85 px-5 py-3.5 shadow-[0_8px_30px_rgba(7,89,133,0.06)] backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2DD4BF]/10 text-[#0891B2]">
                      <FaGraduationCap size={14} />
                    </div>

                    <div>
                      <p className="text-lg font-black text-[#123B4A]">
                        {Math.max(
                          batches.length - 1,
                          0
                        )}
                      </p>

                      <p className="text-[9px] font-bold uppercase tracking-wider text-[#55727D]">
                        Batches
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>

            {/* =================================================
                HERO VISUAL
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.94,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.7,
                delay: 0.15,
              }}
              className="relative hidden lg:block"
            >
              <div className="relative mx-auto aspect-square max-w-[350px]">

                <div className="absolute inset-5 rounded-[3rem] bg-gradient-to-br from-[#087EA4]/15 via-[#2DD4BF]/10 to-transparent blur-2xl" />

                <div className="absolute inset-0 rotate-6 rounded-[3rem] border border-[#087EA4]/8 bg-white/40" />

                <div className="absolute inset-0 rounded-[3rem] border border-white/80 bg-white/70 p-8 shadow-[0_30px_80px_rgba(7,89,133,0.12)] backdrop-blur-2xl">

                  <div className="flex h-full flex-col items-center justify-center text-center">

                    <div className="relative mb-7">
                      <div className="absolute inset-0 rounded-full bg-[#2DD4BF]/20 blur-2xl" />

                      <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-[#087EA4]/10 bg-gradient-to-br from-[#087EA4]/10 to-[#2DD4BF]/10 text-[#087EA4]">
                        <FaUsers size={46} />
                      </div>
                    </div>

                    <p className="text-4xl font-black text-[#123B4A]">
                      {currentStudents.length}
                    </p>

                    <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-[#55727D]">
                      Students in the directory
                    </p>

                    <div className="mt-7 flex items-center gap-2 rounded-full bg-[#2DD4BF]/10 px-4 py-2">
                      <FaCheckCircle
                        className="text-[#0891B2]"
                        size={11}
                      />

                      <span className="text-[10px] font-bold text-[#087EA4]">
                        Current Student Directory
                      </span>
                    </div>

                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ======================================================
          DIRECTORY
      ====================================================== */}

      <section className="relative border-t border-[#087EA4]/6 bg-white/55 py-12 sm:py-16">

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          {/* ==================================================
              DIRECTORY HEADER
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              margin: "-80px",
            }}
            className="mb-7 flex flex-col justify-between gap-5 md:flex-row md:items-end"
          >
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2DD4BF]" />

                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#087EA4]">
                  Directory
                </span>
              </div>

              <h2 className="text-2xl font-black tracking-tight text-[#123B4A] sm:text-3xl">
                Current Student Directory
              </h2>

              <p className="mt-2 text-sm text-[#55727D]">
                Find students by name, ID, registration
                number, batch, or session.
              </p>
            </div>

            <div className="text-sm font-medium text-[#55727D]">
              Showing{" "}
              <span className="font-bold text-[#087EA4]">
                {filteredStudents.length}
              </span>{" "}
              students
            </div>
          </motion.div>

          {/* ==================================================
              SEARCH + FILTER
          ================================================== */}

          <div className="mb-8 rounded-3xl border border-[#087EA4]/10 bg-white/90 p-3 shadow-[0_12px_45px_rgba(7,89,133,0.07)] backdrop-blur-xl">

            <div className="flex flex-col gap-3 md:flex-row">

              {/* Search */}

              <div className="relative flex-1">
                <FaSearch
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#087EA4]/60"
                  size={13}
                />

                <input
                  type="text"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search by name, student ID, registration..."
                  className="
                    h-12 w-full rounded-2xl
                    border border-[#087EA4]/8
                    bg-[#F0FAFC]/60
                    pl-11 pr-10
                    text-sm font-medium
                    text-[#123B4A]
                    outline-none
                    transition-all
                    placeholder:text-[#55727D]/55
                    focus:border-[#087EA4]/30
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[#087EA4]/5
                  "
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-[#55727D] transition hover:bg-[#087EA4]/8 hover:text-[#087EA4]"
                  >
                    <FaTimes size={10} />
                  </button>
                )}
              </div>

              {/* Batch filter */}

              <div className="relative min-w-[190px]">
                <FaCalendarAlt
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#087EA4]/60"
                  size={12}
                />

                <select
                  value={selectedBatch}
                  onChange={(event) =>
                    setSelectedBatch(
                      event.target.value
                    )
                  }
                  className="
                    h-12 w-full
                    appearance-none
                    rounded-2xl
                    border border-[#087EA4]/8
                    bg-[#F0FAFC]/60
                    pl-10 pr-10
                    text-sm font-semibold
                    text-[#123B4A]
                    outline-none
                    transition-all
                    focus:border-[#087EA4]/30
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[#087EA4]/5
                  "
                >
                  {batches.map((batch) => (
                    <option
                      key={batch}
                      value={batch}
                    >
                      {batch === "All"
                        ? "All Batches"
                        : `Batch ${batch}`}
                    </option>
                  ))}
                </select>

                <FaChevronDown
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#55727D]"
                  size={10}
                />
              </div>

            </div>

            {/* Active filter */}

            {(search || selectedBatch !== "All") && (
              <div className="mt-3 flex flex-wrap items-center gap-2 px-2 pb-1">

                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#55727D]">
                  Active:
                </span>

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="flex items-center gap-2 rounded-full bg-[#087EA4]/8 px-3 py-1.5 text-[10px] font-bold text-[#087EA4]"
                  >
                    Search: {search}
                    <FaTimes size={8} />
                  </button>
                )}

                {selectedBatch !== "All" && (
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedBatch("All")
                    }
                    className="flex items-center gap-2 rounded-full bg-[#2DD4BF]/10 px-3 py-1.5 text-[10px] font-bold text-[#087EA4]"
                  >
                    Batch {selectedBatch}
                    <FaTimes size={8} />
                  </button>
                )}

              </div>
            )}
          </div>

          {/* ==================================================
              STUDENT GRID
          ================================================== */}

          {paginatedStudents.length > 0 ? (
            <motion.div
              layout
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {paginatedStudents.map(
                (student, index) => (
                  <StudentCard
                    key={
                      student.id ||
                      student.id_no ||
                      `${student.name}-${index}`
                    }
                    student={student}
                    index={index}
                    onClick={() =>
                      setSelectedStudent(student)
                    }
                  />
                )
              )}
            </motion.div>
          ) : (
            <EmptyState
              search={search}
              clear={() => {
                setSearch("");
                setSelectedBatch("All");
              }}
            />
          )}

          {/* ==================================================
              PAGINATION
          ================================================== */}

          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">

              <button
                type="button"
                disabled={page === 1}
                onClick={() =>
                  setPage((current) =>
                    Math.max(1, current - 1)
                  )
                }
                className="
                  rounded-xl border
                  border-[#087EA4]/10
                  bg-white
                  px-4 py-2.5
                  text-xs font-bold
                  text-[#55727D]
                  transition
                  hover:border-[#087EA4]/20
                  hover:text-[#087EA4]
                  disabled:cursor-not-allowed
                  disabled:opacity-35
                "
              >
                Previous
              </button>

              <div className="flex items-center gap-1">
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                )
                  .slice(
                    Math.max(0, page - 3),
                    Math.min(
                      totalPages,
                      page + 2
                    )
                  )
                  .map((number) => (
                    <button
                      key={number}
                      type="button"
                      onClick={() =>
                        setPage(number)
                      }
                      className={`
                        flex h-10 w-10
                        items-center justify-center
                        rounded-xl
                        text-xs font-bold
                        transition
                        ${
                          page === number
                            ? "bg-[#087EA4] text-white shadow-[0_6px_18px_rgba(8,126,164,0.20)]"
                            : "border border-[#087EA4]/8 bg-white text-[#55727D] hover:bg-[#F0FAFC] hover:text-[#087EA4]"
                        }
                      `}
                    >
                      {number}
                    </button>
                  ))}
              </div>

              <button
                type="button"
                disabled={page === totalPages}
                onClick={() =>
                  setPage((current) =>
                    Math.min(
                      totalPages,
                      current + 1
                    )
                  )
                }
                className="
                  rounded-xl border
                  border-[#087EA4]/10
                  bg-white
                  px-4 py-2.5
                  text-xs font-bold
                  text-[#55727D]
                  transition
                  hover:border-[#087EA4]/20
                  hover:text-[#087EA4]
                  disabled:cursor-not-allowed
                  disabled:opacity-35
                "
              >
                Next
              </button>

            </div>
          )}

        </div>
      </section>

      {/* ======================================================
          STUDENT MODAL
      ====================================================== */}

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

/* ============================================================
   STUDENT CARD
============================================================ */

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
  const studentId = getStudentId(student);
  const registration = getRegistration(student);
  const batch = getBatch(student);
  const session = getSession(student);
  const semester = getSemester(student);

  const isRegistered =
    student.registered === true ||
    student.registered === 1;

  return (
    <motion.button
      layout
      type="button"
      onClick={onClick}
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        margin: "-30px",
      }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.04, 0.2),
      }}
      whileHover={{
        y: -5,
      }}
      className="
        group relative overflow-hidden
        rounded-3xl
        border border-[#087EA4]/10
        bg-white
        text-left
        shadow-[0_8px_30px_rgba(7,89,133,0.06)]
        transition-all duration-300
        hover:border-[#087EA4]/20
        hover:shadow-[0_18px_50px_rgba(7,89,133,0.12)]
      "
    >

      {/* Card glow */}

      <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-[#2DD4BF]/8 blur-[60px] transition-all duration-500 group-hover:bg-[#2DD4BF]/15" />

      {/* ======================================================
          PHOTO AREA
      ====================================================== */}

      <div className="relative flex items-center gap-4 border-b border-[#087EA4]/7 p-5">

        {/* Avatar */}

        <div className="relative shrink-0">

          {student.photo ? (
            <Image
              src={getImageUrl(student.photo)}
              alt={name}
              width={72}
              height={72}
              className="
                h-[72px] w-[72px]
                rounded-2xl
                object-cover
                ring-1 ring-[#087EA4]/10
                transition-transform
                duration-300
                group-hover:scale-[1.03]
              "
            />
          ) : (
            <div
              className="
                flex h-[72px] w-[72px]
                items-center justify-center
                rounded-2xl
                bg-gradient-to-br
                from-[#087EA4]/10
                to-[#2DD4BF]/15
                text-xl font-black
                text-[#087EA4]
                ring-1 ring-[#087EA4]/10
              "
            >
              {getInitials(name)}
            </div>
          )}

          {/* Registered */}

          {isRegistered && (
            <div
              title="Registered"
              className="
                absolute -bottom-1 -right-1
                flex h-6 w-6
                items-center justify-center
                rounded-full
                border-2 border-white
                bg-[#0891B2]
                text-white
                shadow-sm
              "
            >
              <FaCheckCircle size={10} />
            </div>
          )}

        </div>

        {/* Name */}

        <div className="min-w-0 flex-1">

          <h3 className="truncate text-sm font-black text-[#123B4A]">
            {name}
          </h3>

          {banglaName && (
            <p className="mt-1 truncate text-xs text-[#55727D]">
              {banglaName}
            </p>
          )}

          <div className="mt-2 flex flex-wrap items-center gap-1.5">

            <span className="rounded-full bg-[#087EA4]/8 px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-[#087EA4]">
              Batch {batch}
            </span>

            {isRegistered && (
              <span className="flex items-center gap-1 rounded-full bg-[#2DD4BF]/10 px-2 py-1 text-[8px] font-bold text-[#087EA4]">
                <FaCheckCircle size={7} />
                Registered
              </span>
            )}

          </div>

        </div>

      </div>

      {/* ======================================================
          STUDENT INFORMATION
      ====================================================== */}

      <div className="space-y-3 p-5">

        {/* Student ID */}

        <InfoRow
          icon={<FaIdCard size={10} />}
          label="Student ID"
          value={studentId}
        />

        {/* Registration */}

        <InfoRow
          icon={<FaBookOpen size={10} />}
          label="Registration"
          value={registration}
        />

        {/* Session */}

        <InfoRow
          icon={<FaCalendarAlt size={10} />}
          label="Session"
          value={session}
        />

        {/* Semester */}

        <InfoRow
          icon={<FaGraduationCap size={10} />}
          label="Status"
          value={semester}
        />

      </div>

      {/* ======================================================
          VIEW PROFILE
      ====================================================== */}

      <div className="flex items-center justify-between border-t border-[#087EA4]/7 px-5 py-3">

        <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#55727D]">
          Student Profile
        </span>

        <span className="text-[10px] font-bold text-[#087EA4] transition-transform duration-300 group-hover:translate-x-1">
          View →
        </span>

      </div>

    </motion.button>
  );
}

/* ============================================================
   INFO ROW
============================================================ */

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#F0FAFC] text-[#087EA4]">
        {icon}
      </div>

      <div className="min-w-0 flex-1">

        <p className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#55727D]/70">
          {label}
        </p>

        <p className="truncate text-[11px] font-bold text-[#123B4A]">
          {value}
        </p>

      </div>

    </div>
  );
}

/* ============================================================
   EMPTY STATE
============================================================ */

function EmptyState({
  search,
  clear,
}: {
  search: string;
  clear: () => void;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        rounded-3xl
        border border-[#087EA4]/10
        bg-white
        px-6 py-16
        text-center
        shadow-[0_10px_35px_rgba(7,89,133,0.06)]
      "
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#087EA4]/8 text-[#087EA4]">
        <FaSearch size={20} />
      </div>

      <h3 className="mt-5 text-lg font-black text-[#123B4A]">
        No students found
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#55727D]">
        {search
          ? `No current student matches "${search}". Try searching with a different name, ID, registration number, or batch.`
          : "There are no students matching the selected filter."}
      </p>

      <button
        type="button"
        onClick={clear}
        className="
          mt-6 rounded-xl
          bg-[#087EA4]
          px-5 py-2.5
          text-xs font-bold
          text-white
          shadow-[0_6px_18px_rgba(8,126,164,0.18)]
          transition-all
          hover:bg-[#075985]
        "
      >
        Clear Filters
      </button>
    </motion.div>
  );
}

/* ============================================================
   STUDENT MODAL
============================================================ */

function StudentModal({
  student,
  onClose,
}: {
  student: Student;
  onClose: () => void;
}) {
  const name = getStudentName(student);
  const banglaName = getBanglaName(student);
  const studentId = getStudentId(student);
  const registration = getRegistration(student);
  const batch = getBatch(student);
  const session = getSession(student);
  const semester = getSemester(student);

  const isRegistered =
    student.registered === true ||
    student.registered === 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        bg-[#123B4A]/35
        p-4
        backdrop-blur-md
      "
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
          scale: 0.96,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: 15,
          scale: 0.97,
        }}
        transition={{
          duration: 0.25,
        }}
        className="
          relative
          max-h-[90vh]
          w-full max-w-xl
          overflow-y-auto
          rounded-[2rem]
          border border-white/70
          bg-white
          shadow-[0_30px_100px_rgba(7,89,133,0.22)]
        "
      >

        {/* ====================================================
            CLOSE
        ==================================================== */}

        <button
          type="button"
          onClick={onClose}
          className="
            absolute right-4 top-4 z-10
            flex h-9 w-9
            items-center justify-center
            rounded-xl
            border border-[#087EA4]/8
            bg-white/90
            text-[#55727D]
            shadow-sm
            backdrop-blur
            transition
            hover:bg-[#F0FAFC]
            hover:text-[#087EA4]
          "
        >
          <FaTimes size={12} />
        </button>

        {/* ====================================================
            PROFILE HEADER
        ==================================================== */}

        <div className="relative overflow-hidden bg-gradient-to-br from-[#F0FAFC] via-white to-[#E9FBF8] px-6 pb-7 pt-8">

          <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#2DD4BF]/12 blur-[70px]" />

          <div className="relative flex flex-col items-center text-center">

            {/* Avatar */}

            {student.photo ? (
              <Image
                src={student.photo}
                alt={name}
                width={110}
                height={110}
                className="
                  h-[110px] w-[110px]
                  rounded-[2rem]
                  object-cover
                  ring-4 ring-white
                  shadow-[0_12px_35px_rgba(7,89,133,0.12)]
                "
              />
            ) : (
              <div
                className="
                  flex h-[110px] w-[110px]
                  items-center justify-center
                  rounded-[2rem]
                  bg-gradient-to-br
                  from-[#087EA4]
                  to-[#2DD4BF]
                  text-3xl font-black
                  text-white
                  ring-4 ring-white
                  shadow-[0_12px_35px_rgba(7,89,133,0.12)]
                "
              >
                {getInitials(name)}
              </div>
            )}

            <h2 className="mt-5 text-xl font-black text-[#123B4A]">
              {name}
            </h2>

            {banglaName && (
              <p className="mt-1 text-sm text-[#55727D]">
                {banglaName}
              </p>
            )}

            <div className="mt-4 flex flex-wrap justify-center gap-2">

              <span className="rounded-full bg-[#087EA4]/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-[#087EA4]">
                Batch {batch}
              </span>

              {isRegistered && (
                <span className="flex items-center gap-1.5 rounded-full bg-[#2DD4BF]/12 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-[#087EA4]">
                  <FaCheckCircle size={8} />
                  Registered
                </span>
              )}

            </div>

          </div>
        </div>

        {/* ====================================================
            DETAILS
        ==================================================== */}

        <div className="p-6">

          <div className="mb-4 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2DD4BF]" />

            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#087EA4]">
              Academic Information
            </h3>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">

            <DetailBox
              icon={<FaIdCard />}
              label="Student ID"
              value={studentId}
            />

            <DetailBox
              icon={<FaBookOpen />}
              label="Registration Number"
              value={registration}
            />

            <DetailBox
              icon={<FaCalendarAlt />}
              label="Batch"
              value={batch}
            />

            <DetailBox
              icon={<FaCalendarAlt />}
              label="Session"
              value={session}
            />

            <DetailBox
              icon={<FaGraduationCap />}
              label="Current Semester / Status"
              value={semester}
            />

            <DetailBox
              icon={<FaCheckCircle />}
              label="Registration Status"
              value={
                isRegistered
                  ? "Registered"
                  : "Not Registered"
              }
            />

          </div>

          {/* ==================================================
              CONTACT
          ================================================== */}

          {(student.email ||
            student.phone ||
            student.permanent_address) && (
            <>
              <div className="mb-4 mt-7 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2DD4BF]" />

                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#087EA4]">
                  Contact Information
                </h3>
              </div>

              <div className="space-y-2">

                {student.email && (
                  <ContactRow
                    icon={<FaEnvelope />}
                    value={student.email}
                  />
                )}

                {student.phone && (
                  <ContactRow
                    icon={<FaPhone />}
                    value={student.phone}
                  />
                )}

                {student.permanent_address && (
                  <ContactRow
                    icon={<FaMapMarkerAlt />}
                    value={student.permanent_address}
                  />
                )}

              </div>
            </>
          )}

        </div>

      </motion.div>
    </motion.div>
  );
}

/* ============================================================
   DETAIL BOX
============================================================ */

function DetailBox({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-[#087EA4]/8 bg-[#F0FAFC]/55 p-4">

      <div className="flex items-start gap-3">

        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-[#087EA4] shadow-sm">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#55727D]/70">
            {label}
          </p>

          <p className="mt-1 break-words text-xs font-black text-[#123B4A]">
            {value}
          </p>
        </div>

      </div>

    </div>
  );
}

/* ============================================================
   CONTACT ROW
============================================================ */

function ContactRow({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-[#087EA4]/7 bg-[#F0FAFC]/50 px-4 py-3">

      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#087EA4] shadow-sm">
        {icon}
      </div>

      <span className="break-all text-xs font-medium text-[#55727D]">
        {value}
      </span>

    </div>
  );
}

