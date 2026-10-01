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
    <main className="min-h-[75vh] bg-[#F0FAFC] px-4 py-12">
      <form onSubmit={submit} className="mx-auto mt-8 max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-[#087EA4]">PSTU Fisheries</p>
        <h1 className="mt-2 text-3xl font-black text-[#123B4A]">Sign in</h1>
        <p className="mt-2 text-sm text-[#55727D]">Use the email and password from your PSTU registration.</p>
        <label className="mt-6 block text-sm font-semibold">Email
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3" />
        </label>
        <label className="mt-4 block text-sm font-semibold">Password
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3" />
        </label>
        <div className="mt-2 text-right">
          <button type="button" disabled={busy || resetting} onClick={() => void resetPassword()} className="text-sm font-semibold text-[#087EA4] hover:underline disabled:opacity-60">
            {resetting ? "Sending reset link…" : "Forgot password?"}
          </button>
        </div>
        <button disabled={busy} className="mt-6 w-full rounded-xl bg-[#087EA4] px-5 py-3 font-bold text-white disabled:opacity-60">{busy ? "Signing in…" : "Sign in"}</button>
        <button type="button" disabled={busy} onClick={() => void google()} className="mt-3 w-full rounded-xl border border-slate-200 px-5 py-3 font-semibold text-[#123B4A] disabled:opacity-60">Continue with Google</button>
        <p className="mt-5 text-center text-sm text-[#55727D]">New here? <Link className="font-bold text-[#087EA4]" href="/register">Register with your PSTU ID</Link></p>
      </form>
    </main>
  );
}
