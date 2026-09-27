"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import {
  FaFish,
  FaEnvelope,
  FaCheckCircle,
  FaArrowLeft,
  FaArrowRight,
  FaShieldAlt,
} from "react-icons/fa";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const { forgotPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    setLoading(true);

    try {
      await forgotPassword(email.trim());
      setSent(true);
      toast.success("Password reset email sent!");
    } catch {
      toast.error(
        "Could not send reset email. Check the address and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020b18] px-4 pb-12 pt-28 text-white">
      {/* Background Atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute left-1/2 top-1/3 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-teal-400/5 blur-[100px]" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative z-10 mx-auto w-full max-w-md"
      >
        {/* Brand */}
        <div className="mb-8 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 shadow-[0_0_40px_rgba(34,211,238,0.12)]"
          >
            <div className="absolute inset-0 rounded-2xl bg-cyan-400/10 blur-xl" />

            <FaFish className="relative text-3xl text-cyan-300" />
          </motion.div>

          <h1 className="font-display text-2xl font-bold tracking-tight text-white">
            Reset Password
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Faculty of Fisheries — PSTU
          </p>
        </div>

        {/* Main Glass Card */}
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#061522]/90 p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-8">
          {/* Top Glow */}
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

          {/* Corner Glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />

          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="py-5 text-center"
              >
                {/* Success Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.15,
                    type: "spring",
                    stiffness: 180,
                  }}
                  className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10"
                >
                  <FaCheckCircle className="text-4xl text-emerald-400" />
                </motion.div>

                <h2 className="font-display mb-2 text-xl font-bold text-white">
                  Email Sent!
                </h2>

                <p className="mb-6 text-sm leading-6 text-slate-400">
                  We sent a password reset link to{" "}
                  <strong className="break-all font-medium text-slate-200">
                    {email}
                  </strong>
                  . Check your inbox and follow the instructions.
                </p>

                {/* Security Notice */}
                <div className="mb-6 flex items-start gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 text-left">
                  <FaShieldAlt className="mt-0.5 shrink-0 text-cyan-400" />

                  <p className="text-xs leading-5 text-slate-500">
                    For your security, the reset link may expire after a
                    limited time. If you don&apos;t see the email, check your
                    spam or junk folder.
                  </p>
                </div>

                <Link
                  href="/login"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300"
                >
                  <FaArrowLeft className="text-xs transition-transform duration-200 group-hover:-translate-x-1" />
                  Back to Sign In
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                {/* Heading */}
                <div className="mb-7">
                  <h2 className="font-display text-xl font-bold text-white">
                    Forgot your password?
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    No worries. Enter your email address and we&apos;ll send
                    you a secure password reset link.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-slate-300"
                    >
                      Email Address
                    </label>

                    <div className="group relative">
                      <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-500 transition-colors duration-200 group-focus-within:text-cyan-400" />

                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        autoComplete="email"
                        required
                        className="w-full rounded-xl border border-white/[0.08] bg-[#020b18]/80 py-3 pl-11 pr-4 text-sm text-white placeholder:text-slate-600 outline-none transition-all duration-200 focus:border-cyan-400/40 focus:bg-[#020b18] focus:ring-2 focus:ring-cyan-400/10"
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.01 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    className="group relative w-full overflow-hidden rounded-xl border border-cyan-300/20 bg-cyan-400/10 py-3.5 text-sm font-semibold text-cyan-100 shadow-[0_0_30px_rgba(34,211,238,0.08)] transition-all duration-300 hover:border-cyan-300/40 hover:bg-cyan-400/15 hover:shadow-[0_0_35px_rgba(34,211,238,0.14)] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {/* Shine */}
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                    <span className="relative flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-200/30 border-t-cyan-300" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Reset Link
                          <FaArrowRight className="text-xs transition-transform duration-200 group-hover:translate-x-1" />
                        </>
                      )}
                    </span>
                  </motion.button>
                </form>

                {/* Login Link */}
                <div className="mt-7 border-t border-white/[0.06] pt-6 text-center">
                  <p className="text-sm text-slate-500">
                    Remember your password?{" "}
                    <Link
                      href="/login"
                      className="font-medium text-cyan-400 transition-colors hover:text-cyan-300"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-600">
          <FaFish className="text-cyan-500/50" />
          <span>Faculty of Fisheries · PSTU</span>
        </div>
      </motion.div>
    </main>
  );
}