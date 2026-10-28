"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";

function friendlyAuthError(error: any, action: "sign-in" | "google" | "reset") {
  const code = String(error?.code || "");
  if (code === "auth/too-many-requests") {
    return "Firebase temporarily blocked requests after repeated attempts. Wait before trying again. Since accounts were cleared for a fresh start, use Register with your PSTU ID after the block clears.";
  }
  if (action === "sign-in" && ["auth/user-not-found", "auth/invalid-credential", "auth/wrong-password"].includes(code)) {
    return "This email and password do not match an active sign-in. If your account was cleared, register again with your PSTU ID and registration number.";
  }
  return error?.response?.data?.error || error?.message || (action === "reset" ? "Could not send the password reset email." : "Could not sign in.");
}

export default function LoginPage() {
  const { signInWithEmail, signInWithGoogle, signOut, forgotPassword, user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [rateLimited, setRateLimited] = useState(false);
  const [registrationNotice, setRegistrationNotice] = useState(false);

  useEffect(() => {
    setRegistrationNotice(new URLSearchParams(window.location.search).get("registered") === "1");
  }, []);

  useEffect(() => {
    if (!authLoading && user) router.replace("/dashboard");
  }, [authLoading, user, router]);

  const resetPassword = async () => {
    const normalizedEmail = email.trim();
    if (!normalizedEmail) {
      toast.error("Enter your account email first.");
      return;
    }
    setResetting(true);
    try {
      await forgotPassword(normalizedEmail);
      toast.success("If an account uses that email, a password reset link has been sent.");
    } catch (error: any) {
      if (error?.code === "auth/too-many-requests") setRateLimited(true);
      toast.error(friendlyAuthError(error, "reset"));
    } finally {
      setResetting(false);
    }
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    try {
      await signInWithEmail(email, password);
      router.replace("/dashboard");
    } catch (error: any) {
      if (error?.code === "auth/too-many-requests") setRateLimited(true);
      toast.error(friendlyAuthError(error, "sign-in"));
    } finally { setBusy(false); }
  };

  const google = async () => {
    if (!email.trim().includes("@")) { toast.error("Enter your registered email first."); return; }
    setBusy(true);
    try {
      const { data } = await axios.get(`/api/auth/check-email?email=${encodeURIComponent(email)}`);
      if (!data.registered) { toast.error("Register with your PSTU ID and Registration number first."); return; }
      const fbUser = await signInWithGoogle(email, password);
      if (!fbUser) return;
      if (fbUser.email?.toLowerCase() !== email.trim().toLowerCase()) {
        await signOut();
        toast.error("Choose the same email address used for your PSTU account.");
        return;
      }
      const token = await fbUser.getIdToken();
      await axios.post("/api/auth/verify", { token });
      router.replace("/dashboard");
    } catch (error: any) {
      if (error?.code === "auth/too-many-requests") setRateLimited(true);
      toast.error(friendlyAuthError(error, "google"));
    } finally { setBusy(false); }
  };

  return (
    <main className="relative isolate min-h-[75vh] overflow-hidden bg-[#F0FAFC] px-4 py-10 sm:py-16">
      <div aria-hidden="true" className="pointer-events-none absolute -left-28 top-10 h-72 w-72 rounded-full bg-[#2DD4BF]/10 blur-[90px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-28 bottom-0 h-80 w-80 rounded-full bg-[#087EA4]/[0.08] blur-[100px]" />
      <form onSubmit={submit} className="relative mx-auto w-full max-w-md rounded-3xl border border-[#087EA4]/10 bg-white p-5 shadow-[0_24px_70px_rgba(7,89,133,0.11)] sm:mt-2 sm:p-8">
        <p className="text-[11px] font-bold uppercase tracking-[.22em] text-[#087EA4]">PSTU Fisheries</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-[#123B4A]">Sign in</h1>
        <p className="mt-2 text-sm text-[#55727D]">Use the email and password from your PSTU registration.</p>
        {registrationNotice && <div role="status" className="mt-4 rounded-xl border border-[#087EA4]/15 bg-[#F0FAFC] px-4 py-3 text-sm leading-6 text-[#123B4A]">Registration is complete. Verify your email using the link we sent, then sign in here. Successful sign-in takes you to your personal dashboard.</div>}
        {rateLimited && <div role="alert" className="mt-4 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950">Firebase temporarily limited sign-in requests. Wait before trying again. If your old account was cleared, register again with the matching PSTU ID and registration number once requests are allowed.</div>}
        <label className="mt-6 block text-sm font-semibold">Email
          <input type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-[#087EA4]/15 bg-[#FBFEFF] px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-[#087EA4] focus:bg-white" />
        </label>
        <label className="mt-4 block text-sm font-semibold">Password
          <input type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-[#087EA4]/15 bg-[#FBFEFF] px-4 py-3 outline-none transition focus:border-[#087EA4] focus:bg-white" />
        </label>
        <div className="mt-2 text-right">
          <button type="button" disabled={busy || resetting} onClick={() => void resetPassword()} className="text-sm font-semibold text-[#087EA4] hover:underline disabled:opacity-60">
            {resetting ? "Sending reset link…" : "Forgot password?"}
          </button>
        </div>
        <button disabled={busy || rateLimited} className="mt-6 min-h-12 w-full rounded-xl bg-[#087EA4] px-5 py-3 font-bold text-white shadow-[0_8px_22px_rgba(8,126,164,0.18)] transition hover:bg-[#075985] disabled:opacity-60">{busy ? "Signing in…" : rateLimited ? "Temporarily limited" : "Sign in"}</button>
        <button type="button" disabled={busy || rateLimited} onClick={() => void google()} className="mt-3 min-h-12 w-full rounded-xl border border-[#087EA4]/15 bg-white px-5 py-3 font-semibold text-[#123B4A] transition hover:bg-[#F0FAFC] disabled:opacity-60">Continue with Google</button>
        <p className="mt-5 text-center text-sm text-[#55727D]">New here? <Link className="font-bold text-[#087EA4]" href="/register">Register with your PSTU ID</Link></p>
      </form>
    </main>
  );
}
