"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/contexts/AuthContext";

export default function RegisterPage() {
  const { registerWithEmail } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [studentId, setStudentId] = useState("");
  const [regNo, setRegNo] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    try {
      await registerWithEmail({ email, password, role: "student", studentId, regNo });
      toast.success("PSTU record matched. Your account is ready.");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error?.response?.data?.error || error?.message || "Registration failed.");
    } finally { setBusy(false); }
  };

  return (
    <main className="relative isolate min-h-[75vh] overflow-hidden bg-[#F0FAFC] px-4 py-10 sm:py-16">
      <div aria-hidden="true" className="pointer-events-none absolute -left-28 top-10 h-72 w-72 rounded-full bg-[#2DD4BF]/10 blur-[90px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-28 bottom-0 h-80 w-80 rounded-full bg-[#087EA4]/[0.08] blur-[100px]" />
      <form onSubmit={submit} className="relative mx-auto w-full max-w-lg rounded-3xl border border-[#087EA4]/10 bg-white p-5 shadow-[0_24px_70px_rgba(7,89,133,0.11)] sm:mt-2 sm:p-8">
        <p className="text-[11px] font-bold uppercase tracking-[.22em] text-[#087EA4]">PSTU Fisheries</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-[#123B4A]">Register</h1>
        <p className="mt-2 text-sm text-[#55727D]">Your Student ID and Registration number must match a record in MongoDB. Your name and profile data will be loaded from that record.</p>
        <label className="mt-6 block text-sm font-semibold">Student ID
          <input required inputMode="numeric" autoComplete="off" value={studentId} onChange={(e) => setStudentId(e.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-[#087EA4]/15 bg-[#FBFEFF] px-4 py-3 outline-none transition focus:border-[#087EA4] focus:bg-white" />
        </label>
        <label className="mt-4 block text-sm font-semibold">Registration No
          <input required inputMode="numeric" autoComplete="off" value={regNo} onChange={(e) => setRegNo(e.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-[#087EA4]/15 bg-[#FBFEFF] px-4 py-3 outline-none transition focus:border-[#087EA4] focus:bg-white" />
        </label>
        <label className="mt-4 block text-sm font-semibold">Email
          <input type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-[#087EA4]/15 bg-[#FBFEFF] px-4 py-3 outline-none transition focus:border-[#087EA4] focus:bg-white" />
        </label>
        <label className="mt-4 block text-sm font-semibold">Password
          <input type="password" autoComplete="new-password" minLength={6} required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-[#087EA4]/15 bg-[#FBFEFF] px-4 py-3 outline-none transition focus:border-[#087EA4] focus:bg-white" />
        </label>
        <button disabled={busy} className="mt-6 min-h-12 w-full rounded-xl bg-[#087EA4] px-5 py-3 font-bold text-white shadow-[0_8px_22px_rgba(8,126,164,0.18)] transition hover:bg-[#075985] disabled:opacity-60">{busy ? "Checking record…" : "Register"}</button>
        <p className="mt-5 text-center text-sm text-[#55727D]">Already registered? <Link className="font-bold text-[#087EA4]" href="/login">Sign in</Link></p>
      </form>
    </main>
  );
}
