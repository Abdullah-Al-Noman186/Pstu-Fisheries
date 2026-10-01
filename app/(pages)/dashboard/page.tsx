"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  const { user, firebaseUser, loading, refreshUser } = useAuth();
  const router = useRouter();
  const [record, setRecord] = useState<RecordData>(empty);
  const [busy, setBusy] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [linked, setLinked] = useState(false);
  const [lookupOpen, setLookupOpen] = useState(false);
  const [lookupId, setLookupId] = useState("");
  const [lookupRegNo, setLookupRegNo] = useState("");
  const dirtyFields = useRef(new Set<string>());

  const recordFromApi = (data: RecordData) => ({ ...empty, ...Object.fromEntries(Object.entries(data).map(([key, value]) => [key, value == null ? "" : String(value)])) });

  const loadRecord = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/profile");
      if (data.success && data.data) {
        const nextRecord = recordFromApi(data.data);
        setRecord(nextRecord);
        const isLinked = Boolean(nextRecord.id_no && nextRecord.reg_no);
        setLinked(isLinked);
        setLookupOpen(!isLinked);
        setLookupId("");
        setLookupRegNo("");
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
    dirtyFields.current.add(key);
    setRecord((current) => ({ ...current, [key]: value }));
  };

  const claim = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!firebaseUser) return;
    setBusy(true);
    try {
      const token = await firebaseUser.getIdToken();
      await axios.post("/api/claim", { studentId: lookupId, regNo: lookupRegNo }, { headers: { Authorization: `Bearer ${token}` } });
      await loadRecord();
      setLinked(true);
      setLookupOpen(false);
      dirtyFields.current.clear();
      await refreshUser();
      toast.success("Your PSTU record is connected.");
    } catch (error: any) { toast.error(error?.response?.data?.error || "Could not match that ID and registration number."); }
    finally { setBusy(false); }
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
      let recordToSave = record;
      if (!linked) {
        if (!lookupId.trim() || !lookupRegNo.trim()) {
          toast.error("Enter your Student ID and Registration number to load your MongoDB record first.");
          setBusy(false);
          return;
        }
        if (!firebaseUser) throw new Error("Please sign in again to connect your record.");
        const token = await firebaseUser.getIdToken();
        await axios.post("/api/claim", { studentId: lookupId, regNo: lookupRegNo }, { headers: { Authorization: `Bearer ${token}` } });
        const profileResponse = await axios.get("/api/profile");
        const loadedRecord = recordFromApi(profileResponse.data.data || {});
        const changedValues = Object.fromEntries(Array.from(dirtyFields.current).filter((key) => !["id_no", "reg_no"].includes(key)).map((key) => [key, record[key] ?? ""]));
        recordToSave = { ...loadedRecord, ...changedValues };
        setLinked(true);
        setLookupOpen(false);
      }
      const { data } = await axios.put("/api/profile", recordToSave);
      const savedRecord = recordFromApi(data.data || recordToSave);
      setRecord(savedRecord);
      dirtyFields.current.clear();
      await refreshUser();
      toast.success("Profile saved.");
    } catch (error: any) { toast.error(error?.response?.data?.error || "Could not save your profile."); }
    finally { setBusy(false); }
  };

  if (loading || !user || !loaded) return <div className="min-h-[70vh] pt-20 grid place-items-center text-[#55727D]">Loading your dashboard…</div>;

  return (
    <main className="min-h-screen bg-[#F0FAFC] px-3 pb-10 pt-6 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit rounded-3xl bg-white p-5 shadow-sm lg:sticky lg:top-28">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
            {record.photo ? <img src={record.photo} alt="Profile" className="h-14 w-14 rounded-2xl object-cover" /> : <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#087EA4]/10 text-[#087EA4]"><FaUser /></div>}
            <div className="min-w-0"><p className="truncate font-bold text-[#123B4A]">{record.name || user.name}</p><p className="mt-1 text-xs capitalize text-[#55727D]">{record.status === "alumni" ? "Alumni" : "Current student"}</p></div>
          </div>
          <nav className="mt-4 space-y-2">
            <a href="#profile" className="flex items-center gap-3 rounded-xl bg-[#087EA4]/8 px-4 py-3 text-sm font-bold text-[#087EA4]"><FaUser /> Dashboard</a>
            <Link href="/Ouralumni" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#55727D] hover:bg-[#087EA4]/5 hover:text-[#087EA4]"><FaGraduationCap /> Our Alumni</Link>
            <Link href="/ourstudent" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#55727D] hover:bg-[#087EA4]/5 hover:text-[#087EA4]"><FaGraduationCap /> Our Students</Link>
          </nav>
        </aside>

        <section id="profile" className="rounded-3xl bg-white p-5 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-6">
            <div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#087EA4]">Your account</p><h1 className="mt-2 text-3xl font-black text-[#123B4A]">Profile dashboard</h1><p className="mt-2 text-sm text-[#55727D]">Your saved details appear on the student or alumni directory.</p></div>
            <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-[#087EA4]/15 px-4 py-3 text-sm font-bold text-[#087EA4] hover:bg-[#087EA4]/5"><FaCamera /> Upload photo<input className="hidden" type="file" accept="image/*" onChange={(e) => void uploadPhoto(e.target.files?.[0])} /></label>
          </div>
          {record.photo && <div className="mt-5 flex items-center gap-4"><img src={record.photo} alt="Profile preview" className="h-16 w-16 rounded-2xl object-cover" /><span className="text-sm text-[#55727D]">This photo will show in your navbar and directory after saving.</span></div>}
          {linked && !lookupOpen && <button type="button" onClick={() => setLookupOpen(true)} className="mt-5 rounded-xl border border-[#087EA4]/20 px-4 py-2 text-sm font-bold text-[#087EA4] hover:bg-[#087EA4]/5">Change linked PSTU record</button>}
          {lookupOpen && <form onSubmit={claim} className="mt-6 rounded-2xl border border-[#087EA4]/15 bg-[#F0FAFC] p-5"><h2 className="font-bold text-[#123B4A]">{linked ? "Use a different PSTU record" : "Load your PSTU record"}</h2><p className="mt-1 text-sm text-[#55727D]">Enter the matching student ID and registration number to load that MongoDB record into this dashboard.</p><div className="mt-4 grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-[#123B4A]">Student ID<input required inputMode="numeric" value={lookupId} onChange={(e) => setLookupId(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-[#087EA4]" /></label><label className="text-sm font-semibold text-[#123B4A]">Registration number<input required inputMode="numeric" value={lookupRegNo} onChange={(e) => setLookupRegNo(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-[#087EA4]" /></label></div><button disabled={busy} className="mt-4 rounded-xl bg-[#087EA4] px-5 py-3 font-bold text-white disabled:opacity-60">{busy ? "Loading record…" : "Load record"}</button></form>}
          <form onSubmit={save} className="mt-6 space-y-8">
            {sections.map((section) => <div key={section}><h2 className="mb-4 text-xs font-black uppercase tracking-[.17em] text-[#087EA4]">{section}</h2><div className="grid gap-4 sm:grid-cols-2">{bySection[section].map((field) => <label key={field.key} className={`block text-sm font-semibold text-[#123B4A] ${field.type === "textarea" ? "sm:col-span-2" : ""}`}>{field.label}{field.key === "status" ? <select value={record.status || "current_student"} onChange={(e) => setValue(field.key, e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3"><option value="current_student">Current student</option><option value="alumni">Alumni</option></select> : field.type === "select" ? <select value={record[field.key] || ""} onChange={(e) => setValue(field.key, e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3"><option value="">Select…</option>{field.options?.map((option) => <option key={option} value={option}>{option}</option>)}</select> : field.type === "textarea" ? <textarea rows={4} value={record[field.key] || ""} onChange={(e) => setValue(field.key, e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#087EA4]" /> : <input type={field.type || "text"} readOnly={field.readOnly} value={record[field.key] || ""} onChange={(e) => setValue(field.key, e.target.value)} className={`mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:border-[#087EA4] ${field.readOnly ? "border-slate-100 bg-slate-50 text-slate-500" : "border-slate-200"}`} />}</label>)}</div></div>)}
            <button disabled={busy} className="flex items-center justify-center gap-2 rounded-xl bg-[#087EA4] px-6 py-3 font-bold text-white shadow-md hover:bg-[#075985] disabled:opacity-60">{busy ? <FaSpinner className="animate-spin" /> : <FaCheck />} Save profile</button>
          </form>
        </section>
      </div>
    </main>
  );
}
