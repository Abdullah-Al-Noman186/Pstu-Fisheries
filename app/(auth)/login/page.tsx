"use client";

import { useState, useEffect } from "react";
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
  FaIdCard,
} from "react-icons/fa";

import { FcGoogle } from "react-icons/fc";

import toast from "react-hot-toast";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  getAdditionalUserInfo,
  sendEmailVerification,
} from "firebase/auth";

import "@/lib/firebase";

/* =========================================================
   STYLES
========================================================= */

const inputCls =
  "w-full rounded-xl border border-[#087EA4]/10 bg-[#F0FAFC]/50 py-3 pl-10 pr-4 text-sm text-[#123B4A] outline-none placeholder:text-[#55727D]/60 transition-all duration-200 focus:border-[#087EA4]/30 focus:bg-white focus:ring-2 focus:ring-[#0891B2]/[0.08]";

const labelCls =
  "mb-2 block text-[10px] font-semibold uppercase tracking-[0.12em] text-[#55727D]";

const iconCls =
  "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[11px] text-[#087EA4]/60";

/* =========================================================
   PAGE
========================================================= */

export default function LoginPage() {
  const [tab, setTab] = useState<"signin" | "claim">("signin");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [studentId, setStudentId] = useState("");
  const [regNo, setRegNo] = useState("");

  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const { signInWithEmail, signInWithGoogle } = useAuth();

  const router = useRouter();

  /* =========================================================
     READ CLAIM TAB FROM URL
  ========================================================= */

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("tab") === "claim") {
      setTab("claim");
    }
  }, []);

  /* =========================================================
     REDIRECT TO PERSONAL DASHBOARD
  ========================================================= */

  const goToDashboard = () => {
    router.replace("/dashboard");
  };

  /* =========================================================
     NORMAL EMAIL LOGIN
  ========================================================= */

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      toast.error("Enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      await signInWithEmail(email, password);

      toast.success("Welcome back!");

      /*
       * IMPORTANT:
       * Previously this was:
       *
       * router.push("/profile/edit");
       *
       * Now users go directly to their
       * personal dashboard.
       */

      goToDashboard();
    } catch (err: any) {
      toast.error(
        err?.code === "auth/invalid-credential"
          ? "Invalid email or password."
          : err?.code === "auth/too-many-requests"
          ? "Too many attempts. Try again later."
          : "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     GOOGLE LOGIN
  ========================================================= */

  const handleGoogleSignIn = async () => {
    if (loading) return;

    setLoading(true);

    try {
      await signInWithGoogle();

      toast.success("Welcome back!");

      /*
       * Google users also go to the
       * personal dashboard.
       */

      goToDashboard();
    } catch (err: any) {
      toast.error(
        err?.code === "auth/popup-closed-by-user"
          ? "Google sign-in was cancelled."
          : "Google sign-in failed."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     CLAIM EXISTING PROFILE
  ========================================================= */

  const claim = async (mode: "email" | "google") => {
    if (!studentId.trim() || !regNo.trim()) {
      toast.error("Enter your Student ID and Registration No.");
      return;
    }

    if (mode === "email" && (!email.trim() || password.length < 6)) {
      toast.error(
        "Enter an email and a password (minimum 6 characters)."
      );
      return;
    }

    setLoading(true);

    const auth = getAuth();

    let created = false;

    try {
      let user: any;

      /* ---------------------------------------------
         GOOGLE
      --------------------------------------------- */

      if (mode === "google") {
        const credential = await signInWithPopup(
          auth,
          new GoogleAuthProvider()
        );

        user = credential.user;

        created =
          !!getAdditionalUserInfo(credential)?.isNewUser;
      }

      /* ---------------------------------------------
         EMAIL
      --------------------------------------------- */

      else {
        try {
          const credential =
            await createUserWithEmailAndPassword(
              auth,
              email,
              password
            );

          user = credential.user;
          created = true;
        } catch (err: any) {
          /*
           * Existing Firebase account:
           * simply sign the user in.
           */

          if (err?.code === "auth/email-already-in-use") {
            const credential =
              await signInWithEmailAndPassword(
                auth,
                email,
                password
              );

            user = credential.user;
          } else {
            throw err;
          }
        }
      }

      /* ---------------------------------------------
         EMAIL VERIFICATION
      --------------------------------------------- */

      await user.reload();

      /*
       * Google accounts normally don't need
       * this email verification flow.
       */

      if (mode === "email" && !user.emailVerified) {
        await sendEmailVerification(user);

        await auth.signOut();

        toast.success(
          "Verification link sent to your email. Verify your email, then come back and claim your profile.",
          {
            duration: 9000,
          }
        );

        return;
      }

      /* ---------------------------------------------
         CLAIM PROFILE API
      --------------------------------------------- */

      const token = await user.getIdToken(true);

      const res = await fetch("/api/claim", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          studentId: studentId.trim(),
          regNo: regNo.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        /*
         * If a newly-created Firebase account
         * fails to claim a profile, clean it up.
         */

        if (created) {
          await user.delete().catch(() => {});
        } else {
          await auth.signOut();
        }

        throw new Error(
          data.error || "Could not verify your details."
        );
      }

      /* ---------------------------------------------
         SUCCESS
      --------------------------------------------- */

      toast.success("Profile linked successfully!");

      /*
       * IMPORTANT:
       *
       * Previously:
       * router.push("/profile/edit");
       *
       * Now:
       * user goes directly to personal dashboard.
       */

      goToDashboard();
    } catch (err: any) {
      toast.error(
        err?.code === "auth/wrong-password" ||
          err?.code === "auth/invalid-credential"
          ? "That email is already registered. Use its correct password."
          : err?.code === "auth/weak-password"
          ? "Password is too weak."
          : err?.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     CLAIM FORM SUBMIT
  ========================================================= */

  const submitClaim = (e: React.FormEvent) => {
    e.preventDefault();

    claim("email");
  };

  /* =========================================================
     PASSWORD FIELD
  ========================================================= */

  const PasswordField = (
    <div>
      <label
        htmlFor="password"
        className={labelCls}
      >
        Password
      </label>

      <div className="relative">
        <FaLock className={iconCls} />

        <input
          id="password"
          type={showPw ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={
            tab === "claim"
              ? "Create a password"
              : "Your password"
          }
          required
          autoComplete={
            tab === "claim"
              ? "new-password"
              : "current-password"
          }
          className={inputCls + " pr-11"}
        />

        <button
          type="button"
          onClick={() => setShowPw((s) => !s)}
          aria-label={
            showPw
              ? "Hide password"
              : "Show password"
          }
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-[#55727D] transition-colors hover:text-[#087EA4]"
        >
          {showPw ? (
            <FaEyeSlash size={13} />
          ) : (
            <FaEye size={13} />
          )}
        </button>
      </div>
    </div>
  );

  /* =========================================================
     EMAIL FIELD
  ========================================================= */

  const EmailField = (
    <div>
      <label
        htmlFor="email"
        className={labelCls}
      >
        Email Address
      </label>

      <div className="relative">
        <FaEnvelope className={iconCls} />

        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          autoComplete="email"
          className={inputCls}
        />
      </div>
    </div>
  );

  /* =========================================================
     SUBMIT BUTTON
  ========================================================= */

  const SubmitBtn = ({
    text,
  }: {
    text: string;
  }) => (
    <motion.button
      type="submit"
      disabled={loading}
      whileHover={!loading ? { y: -1 } : undefined}
      whileTap={
        !loading ? { scale: 0.99 } : undefined
      }
      className="group flex w-full items-center justify-center gap-2 rounded-xl border border-[#087EA4]/20 bg-[#087EA4] py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(8,126,164,0.18)] transition-all duration-300 hover:bg-[#075985] disabled:cursor-not-allowed disabled:opacity-50"
    >
      <span>
        {loading ? "Please wait..." : text}
      </span>

      {!loading && (
        <FaArrowRight
          size={10}
          className="transition-transform duration-200 group-hover:translate-x-1"
        />
      )}
    </motion.button>
  );

  /* =========================================================
     UI
  ========================================================= */

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F0FAFC] px-4 pb-12 pt-28 sm:px-6">
      {/* Background decoration */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-10 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-[#087EA4]/[0.06] blur-[135px]" />

        <div className="absolute -right-40 bottom-10 h-[410px] w-[410px] rounded-full bg-[#2DD4BF]/[0.075] blur-[130px]" />

        <div className="absolute -left-40 bottom-20 h-[350px] w-[350px] rounded-full bg-[#0891B2]/[0.05] blur-[120px]" />
      </div>

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
          duration: 0.55,
          ease: "easeOut",
        }}
        className="relative z-10 mx-auto w-full max-w-md"
      >
        {/* =====================================================
            BRAND
        ===================================================== */}

        <div className="mb-8 text-center">
          <div className="relative mx-auto mb-5 h-16 w-16">
            <div className="absolute inset-0 rounded-full bg-[#2DD4BF]/20 blur-xl" />

            <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-[#087EA4]/15 bg-white shadow-[0_15px_40px_rgba(8,126,164,0.12)]">
              <img
                src="/logo.png"
                alt="PSTU Logo"
                width={58}
                height={58}
                className="h-[58px] w-[58px] rounded-full object-cover"
              />
            </div>
          </div>

          <p className="mb-1 text-[9px] font-medium uppercase tracking-[0.3em] text-[#0891B2]">
            PSTU • Bangladesh
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-[#123B4A] sm:text-[26px]">
            Faculty of Fisheries
          </h1>

          <p className="mt-2 text-sm text-[#55727D]">
            {tab === "signin"
              ? "Sign in to access your personal dashboard"
              : "Link your student record to create your account"}
          </p>
        </div>

        {/* =====================================================
            CARD
        ===================================================== */}

        <div className="relative overflow-hidden rounded-3xl border border-[#087EA4]/10 bg-white/95 p-6 shadow-[0_30px_90px_rgba(8,126,164,0.10)] backdrop-blur-2xl sm:p-8">
          {/* Tabs */}

          <div className="mb-7 grid grid-cols-2 gap-1 rounded-xl bg-[#F0FAFC] p-1">
            {(["signin", "claim"] as const).map(
              (t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={`rounded-lg py-2 text-xs font-semibold transition-all ${
                    tab === t
                      ? "bg-white text-[#087EA4] shadow-sm"
                      : "text-[#55727D] hover:text-[#123B4A]"
                  }`}
                >
                  {t === "signin"
                    ? "Sign in"
                    : "Claim profile"}
                </button>
              )
            )}
          </div>

          {/* Header */}

          <div className="mb-6 flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#087EA4]/10 bg-[#087EA4]/[0.06] text-[#087EA4]">
              <FaFish size={12} />
            </div>

            <div>
              <p className="text-[9px] uppercase tracking-[0.2em] text-[#0891B2]">
                {tab === "signin"
                  ? "Personal Dashboard"
                  : "First time here?"}
              </p>

              <h2 className="mt-0.5 text-lg font-semibold text-[#123B4A]">
                {tab === "signin"
                  ? "Welcome back"
                  : "Verify your identity"}
              </h2>
            </div>
          </div>

          {/* ===================================================
              SIGN IN
          =================================================== */}

          {tab === "signin" && (
            <form
              onSubmit={handleLogin}
              className="space-y-5"
            >
              {EmailField}

              {PasswordField}

              <div className="text-right">
                <Link
                  href="/forgot-password"
                  className="text-[10px] font-medium text-[#087EA4] hover:text-[#075985]"
                >
                  Forgot password?
                </Link>
              </div>

              <SubmitBtn text="Sign In" />
            </form>
          )}

          {/* ===================================================
              CLAIM PROFILE
          =================================================== */}

          {tab === "claim" && (
            <form
              onSubmit={submitClaim}
              className="space-y-5"
            >
              <div className="grid grid-cols-2 gap-3">
                {/* Student ID */}

                <div>
                  <label
                    htmlFor="sid"
                    className={labelCls}
                  >
                    Student ID
                  </label>

                  <div className="relative">
                    <FaIdCard className={iconCls} />

                    <input
                      id="sid"
                      value={studentId}
                      onChange={(e) =>
                        setStudentId(
                          e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 7)
                        )
                      }
                      placeholder="1604006"
                      inputMode="numeric"
                      required
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* Registration */}

                <div>
                  <label
                    htmlFor="reg"
                    className={labelCls}
                  >
                    Reg No
                  </label>

                  <div className="relative">
                    <FaIdCard className={iconCls} />

                    <input
                      id="reg"
                      value={regNo}
                      onChange={(e) =>
                        setRegNo(
                          e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 5)
                        )
                      }
                      placeholder="06664"
                      inputMode="numeric"
                      required
                      className={inputCls}
                    />
                  </div>
                </div>
              </div>

              {EmailField}

              {PasswordField}

              <SubmitBtn text="Verify & Create Account" />
            </form>
          )}

          {/* ===================================================
              DIVIDER
          =================================================== */}

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#087EA4]/10" />
            </div>

            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-[9px] uppercase tracking-[0.15em] text-[#55727D]">
                Or continue with
              </span>
            </div>
          </div>

          {/* ===================================================
              GOOGLE
          =================================================== */}

          <motion.button
            type="button"
            onClick={() =>
              tab === "signin"
                ? handleGoogleSignIn()
                : claim("google")
            }
            disabled={loading}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.99 }}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#087EA4]/10 bg-[#F0FAFC]/50 py-3 text-sm font-medium text-[#55727D] transition-all duration-200 hover:border-[#087EA4]/20 hover:bg-[#F0FAFC] hover:text-[#123B4A] disabled:opacity-50"
          >
            <FcGoogle className="text-lg" />

            <span>
              {tab === "signin"
                ? "Continue with Google"
                : "Verify with Google"}
            </span>
          </motion.button>

          {/* ===================================================
              CLAIM INFORMATION
          =================================================== */}

          {tab === "claim" && (
            <p className="mt-5 text-center text-[11px] leading-relaxed text-[#55727D]">
              Your Student ID and Registration No must
              match our Faculty records. Each profile can
              be claimed once.
            </p>
          )}
        </div>

        {/* =====================================================
            FOOTER
        ===================================================== */}

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