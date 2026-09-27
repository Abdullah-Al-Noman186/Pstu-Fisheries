
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
    <main className="relative min-h-screen overflow-hidden bg-[#F0FAFC] px-4 pb-12 pt-28 sm:px-6">
      {/* =========================================================
          BACKGROUND ATMOSPHERE
      ========================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Main ocean glow */}
        <div
          className="
            absolute left-1/2 top-10
            h-[460px] w-[460px]
            -translate-x-1/2
            rounded-full
            bg-[#087EA4]/[0.06]
            blur-[135px]
          "
        />

        {/* Left aqua glow */}
        <div
          className="
            absolute -left-40 top-1/3
            h-[380px] w-[380px]
            rounded-full
            bg-[#0891B2]/[0.05]
            blur-[125px]
          "
        />

        {/* Right seafoam glow */}
        <div
          className="
            absolute -right-40 bottom-10
            h-[410px] w-[410px]
            rounded-full
            bg-[#2DD4BF]/[0.075]
            blur-[130px]
          "
        />

        {/* Soft radial background */}
        <div
          className="
            absolute inset-0
            bg-[radial-gradient(circle_at_50%_20%,rgba(8,126,164,0.055),transparent_36%)]
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

        {/* Bottom atmosphere */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-white/30 to-transparent" />
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
            <div className="absolute inset-0 rounded-full bg-[#2DD4BF]/20 blur-xl" />

            {/* Logo container */}
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
            Sign in to continue to your account
          </p>
        </div>

        {/* =======================================================
            LOGIN CARD
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
          {/* Card glow */}

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
                  Account Access
                </p>

                <h2 className="mt-0.5 text-lg font-semibold text-[#123B4A]">
                  Welcome back
                </h2>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-[#55727D]">
              Enter your credentials to access the Faculty of Fisheries
              portal.
            </p>
          </div>

          {/* =====================================================
              FORM
          ====================================================== */}

          <form onSubmit={handleLogin} className="relative space-y-5">
            {/* EMAIL */}

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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

            {/* PASSWORD */}

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
                    text-[#55727D]
                  "
                >
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="
                    text-[10px]
                    font-medium
                    text-[#087EA4]
                    transition-colors
                    hover:text-[#075985]
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
                    text-[#087EA4]/60
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
              <div className="w-full border-t border-[#087EA4]/10" />
            </div>

            <div className="relative flex justify-center">
              <span
                className="
                  bg-white
                  px-3
                  text-[9px]
                  uppercase
                  tracking-[0.15em]
                  text-[#55727D]
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
              border border-[#087EA4]/10
              bg-[#F0FAFC]/50
              py-3
              text-sm
              font-medium
              text-[#55727D]
              transition-all duration-200
              hover:border-[#087EA4]/20
              hover:bg-[#F0FAFC]
              hover:text-[#123B4A]
              hover:shadow-sm
            "
          >
            <FcGoogle className="text-lg" />

            <span>Continue with Google</span>
          </motion.button>

          {/* =====================================================
              REGISTER
          ====================================================== */}

          <p className="mt-7 text-center text-xs text-[#55727D]">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="
                font-semibold
                text-[#087EA4]
                transition-colors
                hover:text-[#075985]
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

