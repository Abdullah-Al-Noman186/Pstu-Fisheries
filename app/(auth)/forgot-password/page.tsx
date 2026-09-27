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
    <main className="relative min-h-screen overflow-hidden bg-[#F0FAFC] px-4 pb-12 pt-28 text-[#123B4A]">
      {/* =========================================================
          BACKGROUND ATMOSPHERE
      ========================================================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Ocean Blue Glow */}
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#0891B2]/[0.10] blur-[120px]" />

        {/* Deep Ocean Glow */}
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#075985]/[0.08] blur-[120px]" />

        {/* Seafoam Glow */}
        <div className="absolute left-1/2 top-1/3 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-[#2DD4BF]/[0.08] blur-[100px]" />

        {/* Subtle Grid */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(7,89,133,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(7,89,133,0.07) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        {/* Soft Center Glow */}
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0891B2]/[0.025] blur-[100px]" />
      </div>

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative z-10 mx-auto w-full max-w-md"
      >
        {/* =======================================================
            BRAND
        ======================================================= */}
        <div className="mb-8 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#087EA4]/15 bg-white shadow-[0_15px_45px_rgba(7,89,133,0.10)]"
          >
            {/* Icon Glow */}
            <div className="absolute inset-0 rounded-2xl bg-[#2DD4BF]/20 blur-xl" />

            {/* Inner Highlight */}
            <div className="absolute inset-1 rounded-xl border border-[#0891B2]/10" />

            <FaFish className="relative text-3xl text-[#087EA4]" />
          </motion.div>

          <h1 className="font-display text-2xl font-bold tracking-tight text-[#075985]">
            Reset Password
          </h1>

          <p className="mt-1 text-sm text-[#55727D]">
            Faculty of Fisheries — PSTU
          </p>
        </div>

        {/* =======================================================
            MAIN CARD
        ======================================================= */}
        <div className="relative overflow-hidden rounded-3xl border border-[#087EA4]/12 bg-white/95 p-6 shadow-[0_30px_90px_rgba(7,89,133,0.12)] backdrop-blur-2xl sm:p-8">
          {/* Top Ocean Line */}
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0891B2]/70 to-transparent" />

          {/* Corner Glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#2DD4BF]/10 blur-3xl" />

          {/* Bottom Glow */}
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-40 w-40 rounded-full bg-[#087EA4]/[0.06] blur-3xl" />

          <AnimatePresence mode="wait">
            {sent ? (
              /* =================================================
                 SUCCESS STATE
              ================================================= */
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 py-5 text-center"
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
                  className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-[#2DD4BF]/30 bg-[#2DD4BF]/10 shadow-[0_12px_35px_rgba(45,212,191,0.12)]"
                >
                  <FaCheckCircle className="text-4xl text-[#0891B2]" />
                </motion.div>

                <h2 className="font-display mb-2 text-xl font-bold text-[#075985]">
                  Email Sent!
                </h2>

                <p className="mb-6 text-sm leading-6 text-[#55727D]">
                  We sent a password reset link to{" "}
                  <strong className="break-all font-medium text-[#123B4A]">
                    {email}
                  </strong>
                  . Check your inbox and follow the instructions.
                </p>

                {/* Security Notice */}
                <div className="mb-6 flex items-start gap-3 rounded-2xl border border-[#087EA4]/10 bg-[#F0FAFC] p-4 text-left">
                  <FaShieldAlt className="mt-0.5 shrink-0 text-[#087EA4]" />

                  <p className="text-xs leading-5 text-[#55727D]">
                    For your security, the reset link may expire after a
                    limited time. If you don&apos;t see the email, check your
                    spam or junk folder.
                  </p>
                </div>

                {/* Back To Login */}
                <Link
                  href="/login"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-[#087EA4] transition-colors hover:text-[#075985]"
                >
                  <FaArrowLeft className="text-xs transition-transform duration-200 group-hover:-translate-x-1" />
                  Back to Sign In
                </Link>
              </motion.div>
            ) : (
              /* =================================================
                 RESET FORM
              ================================================= */
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                {/* Heading */}
                <div className="mb-7">
                  <h2 className="font-display text-xl font-bold text-[#075985]">
                    Forgot your password?
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[#55727D]">
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
                      className="mb-2 block text-sm font-medium text-[#123B4A]"
                    >
                      Email Address
                    </label>

                    <div className="group relative">
                      <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#55727D] transition-colors duration-200 group-focus-within:text-[#0891B2]" />

                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        autoComplete="email"
                        required
                        className="w-full rounded-xl border border-[#087EA4]/15 bg-[#F0FAFC]/70 py-3 pl-11 pr-4 text-sm text-[#123B4A] placeholder:text-[#55727D]/60 outline-none transition-all duration-200 focus:border-[#0891B2]/40 focus:bg-white focus:ring-2 focus:ring-[#0891B2]/10"
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.01 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    className="group relative w-full overflow-hidden rounded-xl border border-[#087EA4]/20 bg-[#087EA4] py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(8,126,164,0.18)] transition-all duration-300 hover:bg-[#075985] hover:shadow-[0_15px_35px_rgba(7,89,133,0.22)] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {/* Shine */}
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                    <span className="relative flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
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
                <div className="mt-7 border-t border-[#087EA4]/10 pt-6 text-center">
                  <p className="text-sm text-[#55727D]">
                    Remember your password?{" "}
                    <Link
                      href="/login"
                      className="font-medium text-[#087EA4] transition-colors hover:text-[#075985]"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* =======================================================
            FOOTER
        ======================================================= */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#55727D]">
          <FaFish className="text-[#0891B2]/60" />
          <span>Faculty of Fisheries · PSTU</span>
        </div>
      </motion.div>
    </main>
  );
}