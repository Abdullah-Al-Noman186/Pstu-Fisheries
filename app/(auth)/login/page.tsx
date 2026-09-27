"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import {
  FaFish,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaLock,
  FaEnvelope,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const { signInWithEmail, signInWithGoogle } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmail(email, password);
      toast.success("Welcome back!");
      router.push("/");
    } catch (err: any) {
      const msg =
        err?.code === "auth/invalid-credential"
          ? "Invalid email or password"
          : err?.code === "auth/too-many-requests"
          ? "Too many attempts. Try again later."
          : "Login failed. Please try again.";

      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithGoogle();
      toast.success("Welcome back!");
      router.push("/");
    } catch {
      toast.error("Google sign-in failed.");
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020b18] px-4 pb-12 pt-28 sm:px-6">
      {/* =========================================================
          BACKGROUND ATMOSPHERE
      ========================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Main cyan glow */}

        <div
          className="
            absolute left-1/2 top-20
            h-[420px] w-[420px]
            -translate-x-1/2
            rounded-full
            bg-cyan-400/[0.055]
            blur-[130px]
          "
        />

        {/* Left glow */}

        <div
          className="
            absolute -left-40 top-1/3
            h-[360px] w-[360px]
            rounded-full
            bg-sky-500/[0.045]
            blur-[120px]
          "
        />

        {/* Right glow */}

        <div
          className="
            absolute -right-40 bottom-10
            h-[400px] w-[400px]
            rounded-full
            bg-teal-400/[0.035]
            blur-[130px]
          "
        />

        {/* Subtle radial background */}

        <div
          className="
            absolute inset-0
            bg-[radial-gradient(circle_at_50%_20%,rgba(34,211,238,0.035),transparent_35%)]
          "
        />

        {/* Grid */}

        <div
          className="
            absolute inset-0
            opacity-[0.025]
            [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]
            [background-size:70px_70px]
          "
        />
      </div>

      {/* =========================================================
          LOGIN CONTAINER
      ========================================================== */}

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.55,
          ease: "easeOut",
        }}
        className="relative z-10 mx-auto w-full max-w-md"
      >
        {/* =======================================================
            BRAND
        ======================================================== */}

        <div className="mb-8 text-center">
          {/* Logo */}

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.1,
              duration: 0.45,
            }}
            className="relative mx-auto mb-5 h-16 w-16"
          >
            {/* Glow */}

            <div className="absolute inset-0 rounded-full bg-cyan-400/[0.12] blur-xl" />

            {/* Logo container */}

            <div
              className="
                relative flex h-16 w-16
                items-center justify-center
                overflow-hidden rounded-2xl
                border border-white/[0.10]
                bg-white/[0.035]
                shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_15px_40px_rgba(0,0,0,0.25)]
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

          <p className="mb-1 text-[9px] font-medium uppercase tracking-[0.3em] text-cyan-300/50">
            PSTU • Bangladesh
          </p>

          <h1 className="font-display text-2xl font-bold tracking-tight text-white sm:text-[26px]">
            Faculty of Fisheries
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Sign in to continue to your account
          </p>
        </div>

        {/* =======================================================
            GLASS CARD
        ======================================================== */}

        <div
          className="
            relative overflow-hidden
            rounded-3xl
            border border-white/[0.08]
            bg-[#061522]/90
            p-6
            shadow-[0_30px_90px_rgba(0,0,0,0.45)]
            backdrop-blur-2xl
            sm:p-8
          "
        >
          {/* Card glow */}

          <div
            className="
              pointer-events-none
              absolute -right-24 -top-24
              h-48 w-48
              rounded-full
              bg-cyan-400/[0.055]
              blur-[80px]
            "
          />

          <div
            className="
              pointer-events-none
              absolute -bottom-24 -left-24
              h-48 w-48
              rounded-full
              bg-sky-400/[0.035]
              blur-[80px]
            "
          />

          {/* Top glass highlight */}

          <div
            className="
              pointer-events-none
              absolute inset-x-10 top-0
              h-px
              bg-gradient-to-r
              from-transparent
              via-cyan-300/20
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
                  border border-cyan-400/10
                  bg-cyan-400/[0.055]
                  text-cyan-300/80
                "
              >
                <FaFish size={12} />
              </div>

              <div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-cyan-300/40">
                  Account Access
                </p>

                <h2 className="mt-0.5 text-lg font-semibold text-white">
                  Welcome back
                </h2>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-slate-600">
              Enter your credentials to access the Faculty of Fisheries
              portal.
            </p>
          </div>

          {/* =====================================================
              FORM
          ====================================================== */}

          <form onSubmit={handleLogin} className="relative space-y-5">
            {/* Email */}

            <div>
              <label
                htmlFor="email"
                className="
                  mb-2 block
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                  text-slate-500
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
                    text-slate-700
                  "
                />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  autoComplete="email"
                  className="
                    w-full
                    rounded-xl
                    border border-white/[0.07]
                    bg-white/[0.025]
                    py-3
                    pl-10
                    pr-4
                    text-sm
                    text-slate-200
                    outline-none
                    placeholder:text-slate-700
                    transition-all duration-200
                    focus:border-cyan-300/20
                    focus:bg-white/[0.04]
                    focus:ring-2
                    focus:ring-cyan-400/[0.06]
                  "
                />
              </div>
            </div>

            {/* Password */}

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="
                    block
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-slate-500
                  "
                >
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="
                    text-[10px]
                    font-medium
                    text-cyan-300/50
                    transition-colors
                    hover:text-cyan-200
                  "
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <FaLock
                  className="
                    pointer-events-none
                    absolute left-4 top-1/2
                    -translate-y-1/2
                    text-[11px]
                    text-slate-700
                  "
                />

                <input
                  id="password"
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  required
                  autoComplete="current-password"
                  className="
                    w-full
                    rounded-xl
                    border border-white/[0.07]
                    bg-white/[0.025]
                    py-3
                    pl-10
                    pr-11
                    text-sm
                    text-slate-200
                    outline-none
                    placeholder:text-slate-700
                    transition-all duration-200
                    focus:border-cyan-300/20
                    focus:bg-white/[0.04]
                    focus:ring-2
                    focus:ring-cyan-400/[0.06]
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
                    text-slate-700
                    transition-colors
                    hover:text-cyan-300/70
                  "
                >
                  {showPw ? (
                    <FaEyeSlash size={13} />
                  ) : (
                    <FaEye size={13} />
                  )}
                </button>
              </div>
            </div>

            {/* =================================================
                SIGN IN BUTTON
            ================================================== */}

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
                border border-cyan-300/15
                bg-cyan-400/[0.09]
                py-3
                text-sm
                font-semibold
                text-cyan-100
                shadow-[0_10px_30px_rgba(34,211,238,0.06)]
                transition-all duration-300
                hover:border-cyan-300/25
                hover:bg-cyan-400/[0.13]
                hover:shadow-[0_12px_35px_rgba(34,211,238,0.10)]
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
                  via-white/10
                  to-transparent
                  transition-transform
                  duration-700
                  group-hover:translate-x-full
                "
              />

              <span className="relative">
                {loading ? "Signing in..." : "Sign In"}
              </span>

              {!loading && (
                <FaArrowRight
                  size={10}
                  className="
                    relative
                    transition-transform
                    duration-200
                    group-hover:translate-x-1
                  "
                />
              )}
            </motion.button>
          </form>

          {/* =====================================================
              DIVIDER
          ====================================================== */}

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/[0.06]" />
            </div>

            <div className="relative flex justify-center">
              <span
                className="
                  bg-[#061522]
                  px-3
                  text-[9px]
                  uppercase
                  tracking-[0.15em]
                  text-slate-700
                "
              >
                Or continue with
              </span>
            </div>
          </div>

          {/* =====================================================
              GOOGLE
          ====================================================== */}

          <motion.button
            type="button"
            onClick={handleGoogle}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.99 }}
            className="
              flex w-full
              items-center
              justify-center
              gap-3
              rounded-xl
              border border-white/[0.07]
              bg-white/[0.025]
              py-3
              text-sm
              font-medium
              text-slate-400
              transition-all duration-200
              hover:border-white/[0.12]
              hover:bg-white/[0.045]
              hover:text-slate-200
            "
          >
            <FcGoogle className="text-lg" />

            <span>Continue with Google</span>
          </motion.button>

          {/* =====================================================
              REGISTER
          ====================================================== */}

          <p className="mt-7 text-center text-xs text-slate-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="
                font-medium
                text-cyan-300/60
                transition-colors
                hover:text-cyan-200
              "
            >
              Register here
            </Link>
          </p>
        </div>

        {/* =======================================================
            FOOTER
        ======================================================== */}

        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-white/[0.05]" />

            <FaFish className="text-[9px] text-cyan-300/20" />

            <span className="h-px w-8 bg-white/[0.05]" />
          </div>

          <p className="mt-3 text-[9px] uppercase tracking-[0.18em] text-slate-700">
            Faculty of Fisheries • PSTU
          </p>
        </div>
      </motion.div>
    </main>
  );
}