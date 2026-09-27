
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import {
  FaFish,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaUser,
  FaEnvelope,
  FaLock,
  FaGraduationCap,
  FaChalkboardTeacher,
  FaUsers,
  FaIdCard,
  FaCalendarAlt,
} from "react-icons/fa";
import { DEPARTMENTS, Department } from "@/types";
import toast from "react-hot-toast";

const deptKeys = Object.keys(DEPARTMENTS) as Department[];

type Role = "teacher" | "alumni" | "student";

const roleInfo = {
  student: {
    icon: FaGraduationCap,
    title: "Student",
    description: "Current students of Faculty of Fisheries, PSTU",
  },
  teacher: {
    icon: FaChalkboardTeacher,
    title: "Teacher",
    description: "Faculty members and researchers",
  },
  alumni: {
    icon: FaUsers,
    title: "Alumni",
    description: "Graduates of Faculty of Fisheries, PSTU",
  },
};

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student" as Role,
    department: "" as Department | "",
    studentId: "",
    batch: "",
  });

  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const { registerWithEmail } = useAuth();
  const router = useRouter();

  const set = (field: string, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleRoleChange = (role: Role) => {
    set("role", role);

    if (role === "teacher") {
      set("studentId", "");
      set("batch", "");
    }

    if (role === "alumni") {
      set("studentId", "");
      set("department", "");
    }

    if (role === "student") {
      set("department", "");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error("Please enter your full name");
      return;
    }

    if (!form.email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (form.role === "teacher" && !form.department) {
      toast.error("Please select a department");
      return;
    }

    if (form.role === "student") {
      if (!form.studentId) {
        toast.error("Please enter your Student ID");
        return;
      }

      if (!form.batch) {
        toast.error("Please enter your Batch Year");
        return;
      }
    }

    if (form.role === "alumni" && !form.batch) {
      toast.error("Please enter your Batch Year");
      return;
    }

    setLoading(true);

    try {
      await registerWithEmail({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,

        department:
          form.role === "teacher"
            ? form.department || undefined
            : undefined,

        studentId:
          form.role === "student"
            ? form.studentId
            : undefined,

        batch:
          form.role === "student" || form.role === "alumni"
            ? Number(form.batch)
            : undefined,
      });

      toast.success("Account created! Welcome.");
      router.push("/");
    } catch (err: any) {
      const msg =
        err?.code === "auth/email-already-in-use"
          ? "Email already registered. Please sign in."
          : "Registration failed. Try again.";

      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = form.password.length;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F0FAFC] px-4 pb-12 pt-28 sm:px-6">
      {/* =========================================================
          BACKGROUND ATMOSPHERE
      ========================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Main ocean glow */}
        <div
          className="
            absolute left-1/2 top-10
            h-[520px] w-[520px]
            -translate-x-1/2
            rounded-full
            bg-[#087EA4]/[0.06]
            blur-[140px]
          "
        />

        {/* Left aqua glow */}
        <div
          className="
            absolute -left-44 top-1/3
            h-[420px] w-[420px]
            rounded-full
            bg-[#0891B2]/[0.055]
            blur-[130px]
          "
        />

        {/* Right seafoam glow */}
        <div
          className="
            absolute -right-44 bottom-0
            h-[450px] w-[450px]
            rounded-full
            bg-[#2DD4BF]/[0.08]
            blur-[130px]
          "
        />

        {/* Soft radial atmosphere */}
        <div
          className="
            absolute inset-0
            bg-[radial-gradient(circle_at_50%_15%,rgba(8,126,164,0.06),transparent_38%)]
          "
        />

        {/* Subtle grid */}
        <div
          className="
            absolute inset-0
            opacity-[0.035]
            [background-image:linear-gradient(rgba(8,126,164,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(8,126,164,0.35)_1px,transparent_1px)]
            [background-size:70px_70px]
          "
        />

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-white/30 to-transparent" />
      </div>

      {/* =========================================================
          REGISTER CONTAINER
      ========================================================== */}

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.55,
          ease: "easeOut",
        }}
        className="relative z-10 mx-auto w-full max-w-xl"
      >
        {/* =======================================================
            BRAND
        ======================================================== */}

        <div className="mb-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.1,
              duration: 0.45,
            }}
            className="relative mx-auto mb-5 h-16 w-16"
          >
            {/* Logo glow */}
            <div className="absolute inset-0 rounded-full bg-[#2DD4BF]/20 blur-xl" />

            <div
              className="
                relative flex h-16 w-16
                items-center justify-center
                overflow-hidden rounded-2xl
                border border-[#087EA4]/15
                bg-white
                shadow-[0_15px_40px_rgba(8,126,164,0.12)]
              "
            >
              <img
                src="/logo.png"
                alt="PSTU Logo"
                width={58}
                height={58}
                className="h-[58px] w-[58px] rounded-full object-cover"
              />
            </div>
          </motion.div>

          <p className="mb-1 text-[9px] font-medium uppercase tracking-[0.3em] text-[#0891B2]">
            PSTU • Bangladesh
          </p>

          <h1 className="font-display text-2xl font-bold tracking-tight text-[#123B4A] sm:text-[26px]">
            Faculty of Fisheries
          </h1>

          <p className="mt-2 text-sm text-[#55727D]">
            Create your account and join the community
          </p>
        </div>

        {/* =======================================================
            REGISTER CARD
        ======================================================== */}

        <div
          className="
            relative overflow-hidden
            rounded-3xl
            border border-[#087EA4]/10
            bg-white/95
            p-6
            shadow-[0_30px_90px_rgba(8,126,164,0.10)]
            backdrop-blur-2xl
            sm:p-8
          "
        >
          {/* Card atmosphere */}

          <div
            className="
              pointer-events-none
              absolute -right-24 -top-24
              h-48 w-48
              rounded-full
              bg-[#2DD4BF]/10
              blur-[80px]
            "
          />

          <div
            className="
              pointer-events-none
              absolute -bottom-24 -left-24
              h-48 w-48
              rounded-full
              bg-[#087EA4]/[0.06]
              blur-[80px]
            "
          />

          {/* Top highlight */}

          <div
            className="
              pointer-events-none
              absolute inset-x-10 top-0
              h-px
              bg-gradient-to-r
              from-transparent
              via-[#2DD4BF]/50
              to-transparent
            "
          />

          {/* =====================================================
              HEADER
          ====================================================== */}

          <div className="relative mb-7">
            <div className="mb-2 flex items-center gap-2.5">
              <div
                className="
                  flex h-8 w-8
                  items-center justify-center
                  rounded-xl
                  border border-[#087EA4]/10
                  bg-[#087EA4]/[0.06]
                  text-[#087EA4]
                "
              >
                <FaFish size={12} />
              </div>

              <div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-[#0891B2]">
                  Create Account
                </p>

                <h2 className="mt-0.5 text-lg font-semibold text-[#123B4A]">
                  Join Faculty of Fisheries
                </h2>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-[#55727D]">
              Create an account to access the Faculty of Fisheries portal.
            </p>
          </div>

          {/* =====================================================
              FORM
          ====================================================== */}

          <form onSubmit={handleRegister} className="relative space-y-5">
            {/* ===================================================
                ROLE SELECTOR
            ==================================================== */}

            <div>
              <label
                className="
                  mb-2 block
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                  text-[#55727D]
                "
              >
                I am a
              </label>

              <div className="grid grid-cols-3 gap-2">
                {(["student", "teacher", "alumni"] as const).map(
                  (role) => {
                    const RoleIcon = roleInfo[role].icon;
                    const active = form.role === role;

                    return (
                      <motion.button
                        key={role}
                        type="button"
                        onClick={() => handleRoleChange(role)}
                        whileTap={{ scale: 0.98 }}
                        className={`
                          group relative
                          overflow-hidden
                          rounded-xl
                          border
                          px-2 py-3
                          transition-all duration-200
                          ${
                            active
                              ? "border-[#087EA4]/20 bg-[#087EA4]/[0.08] text-[#075985]"
                              : "border-[#087EA4]/10 bg-[#F0FAFC]/70 text-[#55727D] hover:border-[#0891B2]/20 hover:bg-[#F0FAFC] hover:text-[#123B4A]"
                          }
                        `}
                      >
                        {active && (
                          <span
                            className="
                              absolute inset-0
                              bg-gradient-to-br
                              from-[#2DD4BF]/10
                              to-transparent
                            "
                          />
                        )}

                        <span className="relative flex flex-col items-center gap-1.5">
                          <RoleIcon
                            className={`
                              text-sm
                              ${
                                active
                                  ? "text-[#087EA4]"
                                  : "text-[#55727D] group-hover:text-[#0891B2]"
                              }
                            `}
                          />

                          <span className="text-[10px] font-semibold capitalize">
                            {role}
                          </span>
                        </span>
                      </motion.button>
                    );
                  }
                )}
              </div>

              <p className="mt-2 text-center text-[10px] leading-relaxed text-[#55727D]">
                {roleInfo[form.role].description}
              </p>
            </div>

            {/* ===================================================
                INPUT HELPERS
            ==================================================== */}

            <div>
              <label
                htmlFor="name"
                className="
                  mb-2 block
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                  text-[#55727D]
                "
              >
                Full Name
              </label>

              <div className="relative">
                <FaUser
                  className="
                    pointer-events-none
                    absolute left-4 top-1/2
                    -translate-y-1/2
                    text-[11px]
                    text-[#087EA4]/60
                  "
                />

                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Your full name"
                  required
                  autoComplete="name"
                  className="
                    w-full
                    rounded-xl
                    border border-[#087EA4]/10
                    bg-[#F0FAFC]/50
                    py-3
                    pl-10
                    pr-4
                    text-sm
                    text-[#123B4A]
                    outline-none
                    placeholder:text-[#55727D]/60
                    transition-all duration-200
                    focus:border-[#087EA4]/30
                    focus:bg-white
                    focus:ring-2
                    focus:ring-[#0891B2]/[0.08]
                  "
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="
                  mb-2 block
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                  text-[#55727D]
                "
              >
                Email Address
              </label>

              <div className="relative">
                <FaEnvelope
                  className="
                    pointer-events-none
                    absolute left-4 top-1/2
                    -translate-y-1/2
                    text-[11px]
                    text-[#087EA4]/60
                  "
                />

                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="your@email.com"
                  required
                  autoComplete="email"
                  className="
                    w-full
                    rounded-xl
                    border border-[#087EA4]/10
                    bg-[#F0FAFC]/50
                    py-3
                    pl-10
                    pr-4
                    text-sm
                    text-[#123B4A]
                    outline-none
                    placeholder:text-[#55727D]/60
                    transition-all duration-200
                    focus:border-[#087EA4]/30
                    focus:bg-white
                    focus:ring-2
                    focus:ring-[#0891B2]/[0.08]
                  "
                />
              </div>
            </div>

            {/* ===================================================
                ROLE-SPECIFIC FIELDS
            ==================================================== */}

            <AnimatePresence mode="wait">
              {/* STUDENT */}

              {form.role === "student" && (
                <motion.div
                  key="student-fields"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="studentId"
                        className="
                          mb-2 block
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-[0.12em]
                          text-[#55727D]
                        "
                      >
                        Student ID
                      </label>

                      <div className="relative">
                        <FaIdCard
                          className="
                            pointer-events-none
                            absolute left-4 top-1/2
                            -translate-y-1/2
                            text-[11px]
                            text-[#087EA4]/60
                          "
                        />

                        <input
                          id="studentId"
                          type="text"
                          value={form.studentId}
                          onChange={(e) =>
                            set("studentId", e.target.value)
                          }
                          placeholder="e.g. 2021331001"
                          required
                          className="
                            w-full
                            rounded-xl
                            border border-[#087EA4]/10
                            bg-[#F0FAFC]/50
                            py-3
                            pl-10
                            pr-3
                            text-sm
                            text-[#123B4A]
                            outline-none
                            placeholder:text-[#55727D]/60
                            transition-all duration-200
                            focus:border-[#087EA4]/30
                            focus:bg-white
                            focus:ring-2
                            focus:ring-[#0891B2]/[0.08]
                          "
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="student-batch"
                        className="
                          mb-2 block
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-[0.12em]
                          text-[#55727D]
                        "
                      >
                        Batch Year
                      </label>

                      <div className="relative">
                        <FaCalendarAlt
                          className="
                            pointer-events-none
                            absolute left-4 top-1/2
                            -translate-y-1/2
                            text-[11px]
                            text-[#087EA4]/60
                          "
                        />

                        <input
                          id="student-batch"
                          type="number"
                          value={form.batch}
                          onChange={(e) =>
                            set("batch", e.target.value)
                          }
                          placeholder="e.g. 2021"
                          required
                          min="2000"
                          max="2099"
                          className="
                            w-full
                            rounded-xl
                            border border-[#087EA4]/10
                            bg-[#F0FAFC]/50
                            py-3
                            pl-10
                            pr-3
                            text-sm
                            text-[#123B4A]
                            outline-none
                            placeholder:text-[#55727D]/60
                            transition-all duration-200
                            focus:border-[#087EA4]/30
                            focus:bg-white
                            focus:ring-2
                            focus:ring-[#0891B2]/[0.08]
                          "
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TEACHER */}

              {form.role === "teacher" && (
                <motion.div
                  key="teacher-fields"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <label
                    htmlFor="department"
                    className="
                      mb-2 block
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      text-[#55727D]
                    "
                  >
                    Department
                  </label>

                  <div className="relative">
                    <FaGraduationCap
                      className="
                        pointer-events-none
                        absolute left-4 top-1/2
                        z-10
                        -translate-y-1/2
                        text-[11px]
                        text-[#087EA4]/60
                      "
                    />

                    <select
                      id="department"
                      value={form.department}
                      onChange={(e) =>
                        set("department", e.target.value)
                      }
                      required
                      className="
                        w-full
                        appearance-none
                        rounded-xl
                        border border-[#087EA4]/10
                        bg-[#F0FAFC]/50
                        py-3
                        pl-10
                        pr-4
                        text-sm
                        text-[#123B4A]
                        outline-none
                        transition-all duration-200
                        focus:border-[#087EA4]/30
                        focus:bg-white
                        focus:ring-2
                        focus:ring-[#0891B2]/[0.08]
                      "
                    >
                      <option
                        value=""
                        className="bg-white text-[#55727D]"
                      >
                        Select your department
                      </option>

                      {deptKeys.map((key) => (
                        <option
                          key={key}
                          value={key}
                          className="bg-white text-[#123B4A]"
                        >
                          {key} — {DEPARTMENTS[key]}
                        </option>
                      ))}
                    </select>
                  </div>
                </motion.div>
              )}

              {/* ALUMNI */}

              {form.role === "alumni" && (
                <motion.div
                  key="alumni-fields"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <label
                    htmlFor="alumni-batch"
                    className="
                      mb-2 block
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      text-[#55727D]
                    "
                  >
                    Batch Year
                  </label>

                  <div className="relative">
                    <FaCalendarAlt
                      className="
                        pointer-events-none
                        absolute left-4 top-1/2
                        -translate-y-1/2
                        text-[11px]
                        text-[#087EA4]/60
                      "
                    />

                    <input
                      id="alumni-batch"
                      type="number"
                      value={form.batch}
                      onChange={(e) =>
                        set("batch", e.target.value)
                      }
                      placeholder="e.g. 2018"
                      required
                      min="2000"
                      max="2099"
                      className="
                        w-full
                        rounded-xl
                        border border-[#087EA4]/10
                        bg-[#F0FAFC]/50
                        py-3
                        pl-10
                        pr-4
                        text-sm
                        text-[#123B4A]
                        outline-none
                        placeholder:text-[#55727D]/60
                        transition-all duration-200
                        focus:border-[#087EA4]/30
                        focus:bg-white
                        focus:ring-2
                        focus:ring-[#0891B2]/[0.08]
                      "
                    />
                  </div>

                  <p className="mt-2 text-[10px] text-[#55727D]">
                    Enter the year of your graduating batch.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ===================================================
                PASSWORD
            ==================================================== */}

            <div>
              <label
                htmlFor="password"
                className="
                  mb-2 block
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                  text-[#55727D]
                "
              >
                Password
              </label>

              <div className="relative">
                <FaLock
                  className="
                    pointer-events-none
                    absolute left-4 top-1/2
                    -translate-y-1/2
                    text-[11px]
                    text-[#087EA4]/60
                  "
                />

                <input
                  id="password"
                  type={showPw ? "text" : "password"}
                  value={form.password}
                  onChange={(e) =>
                    set("password", e.target.value)
                  }
                  placeholder="Minimum 6 characters"
                  required
                  autoComplete="new-password"
                  className="
                    w-full
                    rounded-xl
                    border border-[#087EA4]/10
                    bg-[#F0FAFC]/50
                    py-3
                    pl-10
                    pr-11
                    text-sm
                    text-[#123B4A]
                    outline-none
                    placeholder:text-[#55727D]/60
                    transition-all duration-200
                    focus:border-[#087EA4]/30
                    focus:bg-white
                    focus:ring-2
                    focus:ring-[#0891B2]/[0.08]
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowPw((show) => !show)}
                  aria-label={
                    showPw ? "Hide password" : "Show password"
                  }
                  className="
                    absolute right-3
                    top-1/2
                    -translate-y-1/2
                    rounded-lg
                    p-1.5
                    text-[#55727D]
                    transition-colors
                    hover:text-[#087EA4]
                  "
                >
                  {showPw ? (
                    <FaEyeSlash size={13} />
                  ) : (
                    <FaEye size={13} />
                  )}
                </button>
              </div>

              {/* Password strength */}

              {passwordStrength > 0 && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`
                          h-1 flex-1
                          rounded-full
                          transition-all duration-300
                          ${
                            passwordStrength >= i * 3
                              ? i <= 1
                                ? "bg-red-400"
                                : i <= 2
                                ? "bg-amber-400"
                                : i <= 3
                                ? "bg-[#0891B2]"
                                : "bg-[#2DD4BF]"
                              : "bg-[#087EA4]/10"
                          }
                        `}
                      />
                    ))}
                  </div>

                  <p className="mt-1 text-[9px] text-[#55727D]">
                    {passwordStrength < 6
                      ? "Too short"
                      : passwordStrength < 9
                      ? "Weak"
                      : passwordStrength < 12
                      ? "Good"
                      : "Strong"}
                  </p>
                </div>
              )}
            </div>

            {/* ===================================================
                CONFIRM PASSWORD
            ==================================================== */}

            <div>
              <label
                htmlFor="confirmPassword"
                className="
                  mb-2 block
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                  text-[#55727D]
                "
              >
                Confirm Password
              </label>

              <div className="relative">
                <FaLock
                  className="
                    pointer-events-none
                    absolute left-4 top-1/2
                    -translate-y-1/2
                    text-[11px]
                    text-[#087EA4]/60
                  "
                />

                <input
                  id="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) =>
                    set("confirmPassword", e.target.value)
                  }
                  placeholder="Repeat your password"
                  required
                  autoComplete="new-password"
                  className={`
                    w-full
                    rounded-xl
                    border
                    bg-[#F0FAFC]/50
                    py-3
                    pl-10
                    pr-4
                    text-sm
                    text-[#123B4A]
                    outline-none
                    placeholder:text-[#55727D]/60
                    transition-all duration-200
                    ${
                      form.confirmPassword &&
                      form.password !== form.confirmPassword
                        ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-400/[0.08]"
                        : "border-[#087EA4]/10 focus:border-[#087EA4]/30 focus:bg-white focus:ring-2 focus:ring-[#0891B2]/[0.08]"
                    }
                  `}
                />
              </div>

              {form.confirmPassword &&
                form.password !== form.confirmPassword && (
                  <p className="mt-1.5 text-[10px] text-red-500">
                    Passwords do not match
                  </p>
                )}

              {form.confirmPassword &&
                form.password === form.confirmPassword && (
                  <p className="mt-1.5 text-[10px] text-[#0891B2]">
                    Passwords match
                  </p>
                )}
            </div>

            {/* ===================================================
                SUBMIT
            ==================================================== */}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={!loading ? { y: -1 } : undefined}
              whileTap={!loading ? { scale: 0.99 } : undefined}
              className="
                group
                relative
                flex w-full
                items-center
                justify-center
                gap-2
                overflow-hidden
                rounded-xl
                border border-[#087EA4]/20
                bg-[#087EA4]
                py-3
                text-sm
                font-semibold
                text-white
                shadow-[0_10px_30px_rgba(8,126,164,0.18)]
                transition-all duration-300
                hover:bg-[#075985]
                hover:shadow-[0_12px_35px_rgba(8,126,164,0.24)]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {/* Shine */}

              <span
                className="
                  absolute inset-0
                  -translate-x-full
                  bg-gradient-to-r
                  from-transparent
                  via-white/15
                  to-transparent
                  transition-transform
                  duration-700
                  group-hover:translate-x-full
                "
              />

              {loading ? (
                <>
                  <svg
                    className="relative h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="3"
                    />

                    <path
                      className="opacity-90"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z"
                    />
                  </svg>

                  <span className="relative">
                    Creating account...
                  </span>
                </>
              ) : (
                <>
                  <span className="relative">
                    Create Account
                  </span>

                  <FaArrowRight
                    size={10}
                    className="
                      relative
                      transition-transform
                      duration-200
                      group-hover:translate-x-1
                    "
                  />
                </>
              )}
            </motion.button>
          </form>

          {/* =====================================================
              LOGIN
          ====================================================== */}

          <p className="mt-7 text-center text-xs text-[#55727D]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="
                font-semibold
                text-[#087EA4]
                transition-colors
                hover:text-[#075985]
              "
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* =======================================================
            FOOTER
        ======================================================== */}

        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-[#087EA4]/15" />

            <FaFish className="text-[9px] text-[#2DD4BF]" />

            <span className="h-px w-8 bg-[#087EA4]/15" />
          </div>

          <p className="mt-3 text-[9px] uppercase tracking-[0.18em] text-[#55727D]">
            Faculty of Fisheries • PSTU
          </p>
        </div>
      </motion.div>
    </main>
  );
}

