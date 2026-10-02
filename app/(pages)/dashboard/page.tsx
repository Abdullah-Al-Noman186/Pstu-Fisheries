"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCamera, FaCheck, FaGraduationCap, FaSpinner, FaUser } from "react-icons/fa";
import { useAuth } from "@/contexts/AuthContext";
import { FIELDS } from "@/lib/profileFields";
import { uploadToCloudinary } from "@/lib/cloudinary";

type RecordData = Record<string, string>;
const empty: RecordData = { status: "current_student" };
const sections = ["Identity", "Personal", "Contact", "Work & study", "About"];

export default function DashboardPage() {
  const { user, loading, refreshUser } = useAuth();
  const router = useRouter();
  const [record, setRecord] = useState<RecordData>(empty);
  const [busy, setBusy] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [linked, setLinked] = useState(false);

  const recordFromApi = (data: RecordData) => ({ ...empty, ...Object.fromEntries(Object.entries(data).map(([key, value]) => [key, value == null ? "" : String(value)])) });

  const loadRecord = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/profile");
      if (data.success && data.data) {
        const nextRecord = recordFromApi(data.data);
        setRecord(nextRecord);
        const isLinked = Boolean(nextRecord.id_no && nextRecord.reg_no);
        setLinked(isLinked);
      }
    } catch (error: any) {
      if (error?.response?.status !== 409) toast.error("Could not load your profile.");
    } finally { setLoaded(true); }
  }, []);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
    if (user) void loadRecord();
  }, [loading, user, router, loadRecord]);

  const bySection = useMemo(() => Object.fromEntries(sections.map((section) => [section, FIELDS.filter((field) => field.section === section)])), []);
  const setValue = (key: string, value: string) => {
    setRecord((current) => ({ ...current, [key]: value }));
  };

  const uploadPhoto = async (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) { toast.error("Choose an image file."); return; }
    setBusy(true);
    try { setValue("photo", await uploadToCloudinary(file)); toast.success("Photo uploaded. Save your profile to apply it."); }
    catch (error: any) { toast.error(error?.message || "Photo upload failed."); }
    finally { setBusy(false); }
  };

  const save = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setBusy(true);
    try {
      if (!linked) {
        toast.error("This account has no matching PSTU record. Please contact the faculty administrator.");
        setBusy(false);
        return;
      }
      const { data } = await axios.put("/api/profile", record);
      const savedRecord = recordFromApi(data.data || record);
      setRecord(savedRecord);
      await refreshUser();
      toast.success("Profile saved.");
    } catch (error: any) { toast.error(error?.response?.data?.error || "Could not save your profile."); }
    finally { setBusy(false); }
  };

  if (loading || !user || !loaded) return <div className="min-h-[70vh] pt-20 grid place-items-center text-[#55727D]">Loading your dashboard…</div>;

  return (
    <main className="min-h-screen bg-[#F0FAFC] px-3 pb-10 pt-5 sm:px-6 sm:pt-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit rounded-3xl border border-[#087EA4]/10 bg-white p-4 shadow-[0_12px_38px_rgba(7,89,133,0.06)] sm:p-5 lg:sticky lg:top-28">
          <div className="flex min-w-0 items-center gap-3 border-b border-[#087EA4]/10 pb-4 sm:pb-5">
            {record.photo ? <img src={record.photo} alt="Profile" className="h-14 w-14 rounded-2xl object-cover" /> : <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#087EA4]/10 text-[#087EA4]"><FaUser /></div>}
            <div className="min-w-0"><p className="truncate font-bold text-[#123B4A]">{record.name || user.name}</p><p className="mt-1 text-xs capitalize text-[#55727D]">{record.status === "alumni" ? "Alumni" : "Current student"}</p></div>
          </div>
          <nav aria-label="Dashboard navigation" className="mt-3 flex gap-2 overflow-x-auto pb-1 sm:mt-4 lg:flex-col">
            <a href="#profile" className="flex min-h-11 shrink-0 items-center gap-2.5 rounded-xl bg-[#087EA4]/8 px-3.5 py-2.5 text-sm font-bold text-[#087EA4] sm:px-4"><FaUser /> Dashboard</a>
            <Link href="/Ouralumni" className="flex min-h-11 shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-[#55727D] transition hover:bg-[#087EA4]/5 hover:text-[#087EA4] sm:px-4"><FaGraduationCap /> Our Alumni</Link>
            <Link href="/ourstudent" className="flex min-h-11 shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-[#55727D] transition hover:bg-[#087EA4]/5 hover:text-[#087EA4] sm:px-4"><FaGraduationCap /> Our Students</Link>
          </nav>
        </aside>

        <section id="profile" className="scroll-mt-28 rounded-3xl border border-[#087EA4]/10 bg-white p-4 shadow-[0_18px_55px_rgba(7,89,133,0.07)] sm:p-7 lg:p-9">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="min-w-0"><p className="text-[11px] font-bold uppercase tracking-[.2em] text-[#087EA4]">Your account</p><h1 className="mt-2 text-2xl font-black tracking-tight text-[#123B4A] sm:text-3xl">Profile dashboard</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-[#55727D]">Your saved details appear on the student or alumni directory.</p></div>
            <label className="inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#087EA4]/15 bg-white px-4 py-3 text-sm font-bold text-[#087EA4] shadow-sm transition hover:bg-[#087EA4]/5 sm:w-auto"><FaCamera /> Upload photo<input className="sr-only" type="file" accept="image/*" onChange={(e) => void uploadPhoto(e.target.files?.[0])} /></label>
          </div>
          {record.photo && <div className="mt-5 flex items-center gap-4"><img src={record.photo} alt="Profile preview" className="h-16 w-16 rounded-2xl object-cover" /><span className="text-sm text-[#55727D]">This photo will show in your navbar and directory after saving.</span></div>}
          {!linked ? <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900">We couldn’t automatically find a PSTU record connected to this account. Please contact the faculty administrator to link the correct record.</div> : <form onSubmit={save} className="mt-6 space-y-5 sm:space-y-6">
            {sections.map((section) => <div key={section} className="rounded-2xl border border-[#087EA4]/10 bg-[#FBFEFF] p-4 sm:p-5"><h2 className="mb-4 text-[11px] font-black uppercase tracking-[.18em] text-[#087EA4]">{section}</h2><div className="grid gap-4 sm:grid-cols-2">{bySection[section].map((field) => <label key={field.key} className={`block text-sm font-semibold text-[#123B4A] ${field.type === "textarea" ? "sm:col-span-2" : ""}`}>{field.label}{field.key === "status" ? <select value={record.status || "current_student"} onChange={(e) => setValue(field.key, e.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-[#087EA4]/15 bg-white px-4 py-3 transition focus:border-[#087EA4]"> <option value="current_student">Current student</option><option value="alumni">Alumni</option></select> : field.type === "select" ? <select value={record[field.key] || ""} onChange={(e) => setValue(field.key, e.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-[#087EA4]/15 bg-white px-4 py-3 transition focus:border-[#087EA4]"><option value="">Select…</option>{field.options?.map((option) => <option key={option} value={option}>{option}</option>)}</select> : field.type === "textarea" ? <textarea rows={4} value={record[field.key] || ""} onChange={(e) => setValue(field.key, e.target.value)} className="mt-2 w-full rounded-xl border border-[#087EA4]/15 bg-white px-4 py-3 outline-none transition focus:border-[#087EA4]" /> : <input type={field.type || "text"} readOnly={field.readOnly} value={record[field.key] || ""} onChange={(e) => setValue(field.key, e.target.value)} className={`mt-2 min-h-12 w-full rounded-xl border bg-white px-4 py-3 outline-none transition focus:border-[#087EA4] ${field.readOnly ? "border-slate-100 bg-slate-50 text-slate-500" : "border-[#087EA4]/15"}`} />}</label>)}</div></div>)}
            <div className="pt-1 sm:flex sm:justify-end"><button disabled={busy} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#087EA4] px-6 py-3 font-bold text-white shadow-[0_8px_24px_rgba(8,126,164,0.2)] transition hover:bg-[#075985] disabled:opacity-60 sm:w-auto">{busy ? <FaSpinner className="animate-spin" /> : <FaCheck />} Save profile</button></div>
          </form>}
        </section>
      </div>
    </main>
  );
}
