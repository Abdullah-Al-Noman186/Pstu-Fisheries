"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const { signInWithEmail, signInWithGoogle, signOut, forgotPassword } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [resetting, setResetting] = useState(false);

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
      toast.error(error?.message || "Could not send the password reset email.");
    } finally {
      setResetting(false);
    }
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    try {
      await signInWithEmail(email, password);
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error?.response?.data?.error || error?.message || "Email or password is incorrect.");
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
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error?.response?.data?.error || error?.message || "Could not sign in with Google.");
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
        <button disabled={busy} className="mt-6 min-h-12 w-full rounded-xl bg-[#087EA4] px-5 py-3 font-bold text-white shadow-[0_8px_22px_rgba(8,126,164,0.18)] transition hover:bg-[#075985] disabled:opacity-60">{busy ? "Signing in…" : "Sign in"}</button>
        <button type="button" disabled={busy} onClick={() => void google()} className="mt-3 min-h-12 w-full rounded-xl border border-[#087EA4]/15 bg-white px-5 py-3 font-semibold text-[#123B4A] transition hover:bg-[#F0FAFC] disabled:opacity-60">Continue with Google</button>
        <p className="mt-5 text-center text-sm text-[#55727D]">New here? <Link className="font-bold text-[#087EA4]" href="/register">Register with your PSTU ID</Link></p>
      </form>
    </main>
  );
}
