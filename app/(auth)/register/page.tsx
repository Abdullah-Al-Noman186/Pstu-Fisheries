"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { FaFish, FaEye, FaEyeSlash } from "react-icons/fa";
import { DEPARTMENTS, Department } from "@/types";
import toast from "react-hot-toast";

const deptKeys = Object.keys(DEPARTMENTS) as Department[];

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student" as "teacher" | "alumni" | "student",
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

    // Teacher requires Department
    if (form.role === "teacher" && !form.department) {
      toast.error("Please select a department");
      return;
    }

    // Student requires Student ID + Batch
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

    // Alumni requires Batch only
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

        // Teacher only
        department:
          form.role === "teacher"
            ? form.department || undefined
            : undefined,

        // Student only
        studentId:
          form.role === "student"
            ? form.studentId
            : undefined,

        // Student + Alumni
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

  return (
    <div className="min-h-screen bg-ocean-gradient flex items-center justify-center p-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <img src="/logo.png" alt="PSTU Logo" width={56} height={56} className="rounded-full object-cover transition-all" />
          </div>

          <h1 className="text-2xl font-display font-bold text-white">
            Create Account
          </h1>

          <p className="text-ocean-200 text-sm mt-1">
            Faculty of Fisheries — PSTU
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleRegister} className="space-y-4">

            {/* Role Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                I am a
              </label>

              <div className="grid grid-cols-3 gap-2">
                {(["student", "teacher", "alumni"] as const).map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => {
                      set("role", role);

                      // Clear fields that don't belong to the selected role
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
                    }}
                    className={`py-2.5 rounded-xl text-sm font-semibold capitalize border-2 transition-all ${
                      form.role === role
                        ? "bg-ocean-700 text-white border-ocean-700 shadow-md"
                        : "border-ocean-200 text-ocean-600 hover:border-ocean-400 bg-white"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>

              <p className="text-xs text-gray-400 mt-2 text-center">
                {form.role === "student" &&
                  "Current students of Faculty of Fisheries, PSTU"}

                {form.role === "teacher" &&
                  "Faculty members and researchers"}

                {form.role === "alumni" &&
                  "Graduates of Faculty of Fisheries, PSTU"}
              </p>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>

              <input
                type="text"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Your full name"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-ocean-200 focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-100 text-sm"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>

              <input
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-ocean-200 focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-100 text-sm"
              />
            </div>

            {/* ========================= */}
            {/* STUDENT FIELDS             */}
            {/* ========================= */}

            {form.role === "student" && (
              <motion.div
                key="student-fields"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                <div className="grid grid-cols-2 gap-3">

                  {/* Student ID */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Student ID
                    </label>

                    <input
                      type="text"
                      value={form.studentId}
                      onChange={(e) =>
                        set("studentId", e.target.value)
                      }
                      placeholder="e.g. 2021331001"
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-ocean-200 focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-100 text-sm"
                    />
                  </div>

                  {/* Batch */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Batch Year
                    </label>

                    <input
                      type="number"
                      value={form.batch}
                      onChange={(e) =>
                        set("batch", e.target.value)
                      }
                      placeholder="e.g. 2021"
                      required
                      min="2000"
                      max="2099"
                      className="w-full px-4 py-2.5 rounded-xl border border-ocean-200 focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-100 text-sm"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* ========================= */}
            {/* TEACHER FIELDS             */}
            {/* ========================= */}

            {form.role === "teacher" && (
              <motion.div
                key="teacher-fields"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>

                <select
                  value={form.department}
                  onChange={(e) =>
                    set("department", e.target.value)
                  }
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-ocean-200 focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-100 text-sm bg-white"
                >
                  <option value="">Select your department</option>

                  {deptKeys.map((key) => (
                    <option key={key} value={key}>
                      {key} — {DEPARTMENTS[key]}
                    </option>
                  ))}
                </select>
              </motion.div>
            )}

            {/* ========================= */}
            {/* ALUMNI FIELDS              */}
            {/* ========================= */}

            {form.role === "alumni" && (
              <motion.div
                key="alumni-fields"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">
                   Batch
                </label>

                <input
                  type="number"
                  value={form.batch}
                  onChange={(e) =>
                    set("batch", e.target.value)
                  }
                  placeholder="e.g. 2018"
                  required
                  min="2000"
                  max="2099"
                  className="w-full px-4 py-2.5 rounded-xl border border-ocean-200 focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-100 text-sm"
                />

                <p className="text-xs text-gray-400 mt-1.5">
                  Enter your batch.
                </p>
              </motion.div>
            )}

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={form.password}
                  onChange={(e) =>
                    set("password", e.target.value)
                  }
                  placeholder="Minimum 6 characters"
                  required
                  className="w-full px-4 py-2.5 pr-11 rounded-xl border border-ocean-200 focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-100 text-sm"
                />

                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPw ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Password strength */}
              {form.password.length > 0 && (
                <div className="mt-1.5 flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        form.password.length >= i * 3
                          ? i <= 1
                            ? "bg-red-400"
                            : i <= 2
                            ? "bg-amber-400"
                            : i <= 3
                            ? "bg-yellow-400"
                            : "bg-teal-500"
                          : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>

              <input
                type="password"
                value={form.confirmPassword}
                onChange={(e) =>
                  set("confirmPassword", e.target.value)
                }
                placeholder="Repeat your password"
                required
                className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 text-sm transition-colors ${
                  form.confirmPassword &&
                  form.password !== form.confirmPassword
                    ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                    : "border-ocean-200 focus:border-ocean-500 focus:ring-ocean-100"
                }`}
              />

              {form.confirmPassword &&
                form.password !== form.confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">
                    Passwords do not match
                  </p>
                )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-ocean-700 hover:bg-ocean-800 text-white font-semibold py-3 rounded-xl transition-all duration-200 disabled:opacity-60 text-sm shadow-md"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />

                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>

                  Creating account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Login */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-ocean-600 hover:text-ocean-800 font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}