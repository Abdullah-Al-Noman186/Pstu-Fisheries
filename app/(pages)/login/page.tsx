"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const { signInWithEmail, signInWithGoogle } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [studentId, setStudentId] = useState("");
  const [regNo, setRegNo] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (Boolean(studentId.trim()) !== Boolean(regNo.trim())) { toast.error("Enter both your Student ID and Registration number, or leave both empty."); return; }
    setBusy(true);
    try {
      const fbUser = await signInWithEmail(email, password);
      if (studentId.trim() && regNo.trim()) {
        const token = await fbUser.getIdToken();
        await axios.post("/api/claim", { studentId, regNo }, { headers: { Authorization: `Bearer ${token}` } });
      }
      router.push("/dashboard");
    } catch (e: any) { toast.error(e?.response?.data?.error || e?.message || "Could not sign in or connect that PSTU record."); }
    finally { setBusy(false); }
  };
  const google = async () => { try { await signInWithGoogle(); router.push("/dashboard"); } catch (e: any) { toast.error(e?.message || "Could not sign in."); } };
  return <main className="min-h-[75vh] bg-[#F0FAFC] px-4 py-12"><form onSubmit={submit} className="mx-auto mt-8 max-w-md rounded-3xl bg-white p-8 shadow-xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#087EA4]">PSTU Fisheries</p><h1 className="mt-2 text-3xl font-black text-[#123B4A]">Sign in</h1><p className="mt-2 text-sm text-[#55727D]">Sign in to edit your student or alumni profile. Enter your PSTU ID and registration number to load your matching record immediately.</p><label className="mt-6 block text-sm font-semibold">Email<input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3" /></label><label className="mt-4 block text-sm font-semibold">Password<input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3" /></label><div className="mt-4 grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold">Student ID<input inputMode="numeric" value={studentId} onChange={(e) => setStudentId(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3" /></label><label className="text-sm font-semibold">Registration No<input inputMode="numeric" value={regNo} onChange={(e) => setRegNo(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3" /></label></div><p className="mt-2 text-xs text-[#55727D]">Both numbers are required to connect a PSTU student or alumni record.</p><button disabled={busy} className="mt-6 w-full rounded-xl bg-[#087EA4] px-5 py-3 font-bold text-white disabled:opacity-60">{busy ? "Signing in…" : "Sign in"}</button><button type="button" onClick={() => void google()} className="mt-3 w-full rounded-xl border border-slate-200 px-5 py-3 font-semibold text-[#123B4A]">Continue with Google</button><p className="mt-5 text-center text-sm text-[#55727D]">New here? <Link className="font-bold text-[#087EA4]" href="/register">Create an account</Link></p></form></main>;
}
