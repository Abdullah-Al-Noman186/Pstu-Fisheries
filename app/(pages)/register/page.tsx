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
    <main className="min-h-[75vh] bg-[#F0FAFC] px-4 py-12">
      <form onSubmit={submit} className="mx-auto mt-4 max-w-lg rounded-3xl bg-white p-8 shadow-xl">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-[#087EA4]">PSTU Fisheries</p>
        <h1 className="mt-2 text-3xl font-black text-[#123B4A]">Register</h1>
        <p className="mt-2 text-sm text-[#55727D]">Your Student ID and Registration number must match a record in MongoDB. Your name and profile data will be loaded from that record.</p>
        <label className="mt-6 block text-sm font-semibold">Student ID
          <input required inputMode="numeric" value={studentId} onChange={(e) => setStudentId(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3" />
        </label>
        <label className="mt-4 block text-sm font-semibold">Registration No
          <input required inputMode="numeric" value={regNo} onChange={(e) => setRegNo(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3" />
        </label>
        <label className="mt-4 block text-sm font-semibold">Email
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3" />
        </label>
        <label className="mt-4 block text-sm font-semibold">Password
          <input type="password" minLength={6} required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3" />
        </label>
        <button disabled={busy} className="mt-6 w-full rounded-xl bg-[#087EA4] px-5 py-3 font-bold text-white disabled:opacity-60">{busy ? "Checking record…" : "Register"}</button>
        <p className="mt-5 text-center text-sm text-[#55727D]">Already registered? <Link className="font-bold text-[#087EA4]" href="/login">Sign in</Link></p>
      </form>
    </main>
  );
}
