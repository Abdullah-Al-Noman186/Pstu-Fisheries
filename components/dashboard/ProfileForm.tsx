"use client";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { DEPARTMENTS, Department } from "@/types";
import { FaSave, FaUser, FaCamera, FaSpinner } from "react-icons/fa";
import Image from "next/image";
import { uploadToCloudinary } from "@/lib/cloudinary";

const deptKeys = Object.keys(DEPARTMENTS) as Department[];

export default function ProfileForm() {
  const { user, refreshUser }               = useAuth();
  const [profile, setProfile]               = useState<any>(null);
  const [loading, setLoading]               = useState(true);
  const [saving, setSaving]                 = useState(false);
  const [uploading, setUploading]           = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [preview, setPreview]               = useState<string | null>(null);
  const fileRef                             = useRef<HTMLInputElement>(null);

  useEffect(() => {
    axios.get("/api/profile")
      .then(({ data }) => { if (data.success) setProfile(data.data); })
      .finally(() => setLoading(false));
  }, []);

  const set = (field: string, value: any) =>
    setProfile((p: any) => ({ ...p, [field]: value }));

  const handlePhotoClick = () => fileRef.current?.click();

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { toast.error("Select an image file"); return; }
    if (file.size > 5 * 1024 * 1024)     { toast.error("Max 5MB");              return; }

    setPreview(URL.createObjectURL(file));
    setUploading(true);

    const timer = setInterval(() => {
      setUploadProgress(p => p < 85 ? p + 10 : p);
    }, 200);

    try {
      const url = await uploadToCloudinary(file);
      clearInterval(timer);
      setUploadProgress(100);
      setPreview(url);
      set("photo", url);

      // Save photo to DB immediately
      await axios.put("/api/profile", { ...profile, photo: url });

      // ← This updates user in AuthContext → Navbar + Sidebar re-render with new photo
      await refreshUser();

      toast.success("Photo updated! Navbar and sidebar updated.");
    } catch {
      clearInterval(timer);
      toast.error("Upload failed.");
      setPreview(null);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
    e.target.value = "";
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put("/api/profile", profile);
      // ← refreshUser re-fetches profile and updates name/photo/department in context
      await refreshUser();
      toast.success("Profile saved! Name updated across the site.");
    } catch {
      toast.error("Failed to save profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="space-y-6">
      {[1,2,3].map(i => (
        <div key={i} className="animate-pulse bg-white rounded-2xl border border-ocean-100 h-40" />
      ))}
    </div>
  );

  if (!profile) return (
    <div className="text-gray-400 text-center py-20">Profile not found.</div>
  );

  const photoSrc = preview || profile.photo || null;

  return (
    <form onSubmit={handleSave} className="space-y-6">

      {/* Avatar */}
      <div className="card-fish p-6">
        <div className="flex items-center gap-6">
          <div className="relative group flex-shrink-0 cursor-pointer" onClick={handlePhotoClick}>
            {photoSrc ? (
              <Image
                key={photoSrc}
                src={photoSrc} alt={profile.name || "Photo"} width={96} height={96}
                className="w-24 h-24 rounded-2xl object-cover ring-4 ring-ocean-100 group-hover:ring-ocean-300 transition-all" />
            ) : (
              <div className="w-24 h-24 rounded-2xl bg-ocean-gradient flex items-center justify-center text-white text-4xl font-bold ring-4 ring-ocean-100 group-hover:ring-ocean-300 transition-all select-none">
                {profile.name?.[0]?.toUpperCase()}
              </div>
            )}
            <div className="absolute inset-0 rounded-2xl bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {uploading ? (
                <><FaSpinner className="text-white text-xl animate-spin mb-1" /><span className="text-white text-xs font-bold">{uploadProgress}%</span></>
              ) : (
                <><FaCamera className="text-white text-xl mb-1" /><span className="text-white text-xs font-semibold">Change</span></>
              )}
            </div>
            {uploading && (
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/30 rounded-b-2xl overflow-hidden">
                <div className="h-full bg-teal-400 transition-all duration-200" style={{ width: `${uploadProgress}%` }} />
              </div>
            )}
          </div>

          <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp"
            onChange={handlePhotoChange} className="hidden" />

          <div className="flex-1">
            <p className="font-display font-bold text-gray-900 text-xl">{profile.name}</p>
            <p className="text-ocean-600 text-sm capitalize mt-0.5">
              {profile.role}{profile.department && ` · ${DEPARTMENTS[profile.department as Department]}`}
            </p>
            <p className="text-gray-400 text-xs mt-1">{profile.email}</p>
            <button type="button" onClick={handlePhotoClick} disabled={uploading}
              className="mt-3 inline-flex items-center gap-2 text-sm text-ocean-600 hover:text-ocean-800 font-medium border border-ocean-200 hover:border-ocean-400 px-3 py-1.5 rounded-lg transition-all disabled:opacity-50">
              {uploading
                ? <><FaSpinner className="animate-spin" /> Uploading {uploadProgress}%</>
                : <><FaCamera /> {photoSrc ? "Change Photo" : "Upload Photo"}</>
              }
            </button>
            <p className="text-xs text-gray-400 mt-1.5">JPG, PNG or WebP · Max 5MB</p>
          </div>
        </div>
      </div>

      {/* Basic info */}
      <div className="card-fish p-6">
        <h3 className="font-display font-bold text-ocean-900 mb-4 flex items-center gap-2">
          <FaUser className="text-ocean-500" /> Basic Information
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Full Name" value={profile.name}  onChange={v => set("name", v)} />
          <Field label="Email"     value={profile.email} onChange={v => set("email", v)} type="email" />
          <Field label="Phone"     value={profile.phone} onChange={v => set("phone", v)} placeholder="+880 XXXXXXXXXX" />
          <div>
            {/* <label className="block text-sm font-medium text-gray-700 mb-1">Department</label> */}
            {/* <select value={profile.department || ""} onChange={e => set("department", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-ocean-200 focus:outline-none focus:border-ocean-500 text-sm bg-white">
              <option value="">Select department</option>
              {deptKeys.map(k => <option key={k} value={k}>{k} — {DEPARTMENTS[k]}</option>)}
            </select> */}
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <input type="text" value={profile.address || ""} onChange={e => set("address", e.target.value)}
            placeholder="Your address"
            className="w-full px-4 py-2.5 rounded-xl border border-ocean-200 focus:outline-none focus:border-ocean-500 text-sm" />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
          <textarea value={profile.bio || ""} onChange={e => set("bio", e.target.value)}
            placeholder="A short bio about yourself..." rows={3}
            className="w-full px-4 py-2.5 rounded-xl border border-ocean-200 focus:outline-none focus:border-ocean-500 text-sm resize-none" />
        </div>
      </div>

      {/* Teacher fields */}
      {profile.role === "teacher" && (
        <div className="card-fish p-6">
          <h3 className="font-display font-bold text-ocean-900 mb-4">Academic Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Designation"  value={profile.designation}  onChange={v => set("designation", v)}         placeholder="e.g. Professor" />
            <Field label="Join Year"    value={profile.joinYear}     onChange={v => set("joinYear", Number(v))}     type="number" placeholder="e.g. 2010" />
            <Field label="Publications" value={profile.publications} onChange={v => set("publications", Number(v))} type="number" placeholder="Number of papers" />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Research Areas (comma separated)</label>
            <input type="text"
              value={Array.isArray(profile.researchAreas) ? profile.researchAreas.join(", ") : ""}
              onChange={e => set("researchAreas", e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean))}
              placeholder="e.g. Aquaculture, Genetics, Marine Biology"
              className="w-full px-4 py-2.5 rounded-xl border border-ocean-200 focus:outline-none focus:border-ocean-500 text-sm" />
          </div>
        </div>
      )}

      {/* Student fields */}
      {profile.role === "student" && (
        <div className="card-fish p-6">
          <h3 className="font-display font-bold text-ocean-900 mb-4">Student Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Student ID" value={profile.studentId} onChange={v => set("studentId", v)}        placeholder="e.g. 2021331001" />
            <Field label="Batch Year" value={profile.batch}     onChange={v => set("batch", Number(v))}     type="number" placeholder="e.g. 2021" />
            <Field label="Semester"   value={profile.semester}  onChange={v => set("semester", Number(v))}  type="number" placeholder="1–8" />
            <Field label="CGPA"       value={profile.cgpa}      onChange={v => set("cgpa", parseFloat(v))}  type="number" placeholder="e.g. 3.75" />
          </div>
        </div>
      )}

      {/* Alumni fields */}
      {profile.role === "alumni" && (
        <div className="card-fish p-6">
          <h3 className="font-display font-bold text-ocean-900 mb-4">Alumni Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Current Position" value={profile.currentPosition} onChange={v => set("currentPosition", v)} placeholder="e.g. Senior Scientist" />
            <Field label="Organization"     value={profile.organization}    onChange={v => set("organization", v)}    placeholder="e.g. BFRI" />
            <Field label="Location"         value={profile.location}        onChange={v => set("location", v)}        placeholder="e.g. Dhaka, Bangladesh" />
            <Field label="LinkedIn URL"     value={profile.linkedin}        onChange={v => set("linkedin", v)}        placeholder="https://linkedin.com/in/..." type="url" />
            <Field label="Batch Year"       value={profile.batch}           onChange={v => set("batch", Number(v))}   type="number" placeholder="e.g. 2015" />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Testimonial</label>
            <textarea value={profile.testimonial || ""} onChange={e => set("testimonial", e.target.value)}
              placeholder="Share your experience at PSTU Fisheries..." rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-ocean-200 focus:outline-none focus:border-ocean-500 text-sm resize-none" />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Achievements (comma separated)</label>
            <input type="text"
              value={Array.isArray(profile.achievements) ? profile.achievements.join(", ") : ""}
              onChange={e => set("achievements", e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean))}
              placeholder="e.g. National Award 2022, Best Researcher 2023"
              className="w-full px-4 py-2.5 rounded-xl border border-ocean-200 focus:outline-none focus:border-ocean-500 text-sm" />
          </div>
        </div>
      )}

      {/* Save */}
      <div className="flex items-center gap-4">
        <button type="submit" disabled={saving || uploading}
          className="btn-ocean flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
          {saving
            ? <><FaSpinner className="animate-spin" /> Saving...</>
            : <><FaSave /> Save Profile</>
          }
        </button>
        {uploading && (
          <p className="text-sm text-ocean-500 flex items-center gap-2">
            <FaSpinner className="animate-spin" /> Uploading photo... {uploadProgress}%
          </p>
        )}
      </div>
    </form>
  );
}

function Field({ label, value, onChange, type = "text", placeholder = "" }: {
  label: string; value: any; onChange: (v: string) => void; type?: string; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input type={type} value={value || ""} onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-xl border border-ocean-200 focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-100 text-sm" />
    </div>
  );
}