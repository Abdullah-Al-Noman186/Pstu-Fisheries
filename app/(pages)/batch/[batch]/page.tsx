"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { FaArrowLeft, FaCalendarAlt, FaGraduationCap, FaUsers } from "react-icons/fa";
import Link from "next/link";
import AlumniCard from "@/components/alumni/AlumniCard";
import AlumniModal from "@/components/alumni/AlumniModal";
import type { Alumni } from "@/types";

export default function AlumniBatchPage() {
  const params = useParams<{ batch: string }>();
  const batch = Number(params.batch);
  const [members, setMembers] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<Alumni | null>(null);

  useEffect(() => {
    if (!Number.isFinite(batch) || batch < 1) {
      setError("That batch number is not valid.");
      setLoading(false);
      return;
    }
    let active = true;
    axios.get(`/api/alumni?batch=${batch}`).then(({ data }) => {
      if (active && data.success) setMembers(data.data || []);
      else if (active) setError(data.error || "Could not load this batch.");
    }).catch((requestError) => {
      if (active) setError(requestError?.response?.data?.error || "Could not load this batch.");
    }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [batch]);

  const session = useMemo(() => members.find((member) => member.session)?.session || "Session details unavailable", [members]);

  return (
    <main className="min-h-screen bg-[#F0FAFC] px-4 pb-20 pt-28 text-[#123B4A] sm:px-6">
      <AlumniModal alumni={selected} onClose={() => setSelected(null)} />
      <div className="mx-auto max-w-7xl">
        <Link href="/Ouralumni" className="inline-flex min-h-10 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-[#087EA4] hover:bg-white"><FaArrowLeft aria-hidden="true" /> Alumni directory</Link>
        <section className="mt-5 rounded-3xl border border-[#087EA4]/10 bg-white p-6 shadow-sm sm:p-9">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-[#087EA4]"><FaGraduationCap aria-hidden="true" /> Alumni batch</p>
          <h1 className="mt-3 font-display text-3xl font-bold sm:text-5xl">Batch {batch}</h1>
          <p className="mt-2 flex items-center gap-2 text-sm text-[#55727D]"><FaCalendarAlt aria-hidden="true" /> {session}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2 rounded-xl bg-[#F0FAFC] px-4 py-3 text-sm font-semibold"><FaUsers className="text-[#087EA4]" aria-hidden="true" /> {members.length} alumni profiles</span>
            <Link href={`/archive?category=Reunion&batch=${batch}`} className="rounded-xl border border-[#DCEEF2] px-4 py-3 text-sm font-semibold text-[#087EA4] hover:bg-[#F7FCFD]">Batch {batch} reunion announcements</Link>
          </div>
        </section>
        {loading ? <p role="status" className="py-14 text-center text-sm text-[#55727D]">Loading batch profiles…</p> : error ? <p role="alert" className="py-14 text-center text-sm text-rose-700">{error}</p> : members.length ? <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{members.map((member, index) => <AlumniCard key={member._id} alumni={member} index={index} onClick={() => setSelected(member)} />)}</div> : <div className="mt-8 rounded-2xl border border-dashed border-[#DCEEF2] bg-white p-8 text-center text-sm text-[#55727D]">No alumni profiles are listed for this batch yet.</div>}
      </div>
    </main>
  );
}
