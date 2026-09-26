"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import { uploadToCloudinary } from "@/lib/cloudinary";
import {
  FaHome, FaUser, FaUsers, FaNewspaper,
  FaFlask, FaSignOutAlt, FaUserGraduate,
  FaChalkboardTeacher, FaCamera, FaSpinner
} from "react-icons/fa";

const roleLinks: Record<string, { label: string; href: string; icon: React.ReactNode }[]> = {
  admin: [
    { label: "Dashboard",       href: "/dashboard",     icon: <FaHome /> },
    { label: "My Profile",      href: "/profile",       icon: <FaUser /> },
    { label: "Teachers",        href: "/admin/teachers",icon: <FaChalkboardTeacher /> },
    { label: "Alumni",          href: "/admin/alumni",  icon: <FaUserGraduate /> },
    { label: "News",            href: "/admin/news",    icon: <FaNewspaper /> },
    { label: "Research",        href: "/admin/research",icon: <FaFlask /> },
    { label: "Users",           href: "/admin/users",   icon: <FaUsers /> },
  ],
  teacher: [
    { label: "Dashboard",       href: "/dashboard",     icon: <FaHome /> },
    { label: "My Profile",      href: "/profile",       icon: <FaUser /> },
    { label: "My Publications", href: "/teacher",       icon: <FaFlask /> },
  ],
  student: [
    { label: "Dashboard",       href: "/dashboard",     icon: <FaHome /> },
    { label: "My Profile",      href: "/profile",       icon: <FaUser /> },
    { label: "My Record",       href: "/student",       icon: <FaUserGraduate /> },
  ],
  alumni: [
    { label: "Dashboard",       href: "/dashboard",     icon: <FaHome /> },
    { label: "My Profile",      href: "/profile",       icon: <FaUser /> },
    { label: "Alumni Page",     href: "/alumni-profile",icon: <FaUsers /> },
  ],
};

export default function Sidebar() {
  const { user, signOut, refreshUser } = useAuth();
  const pathname                       = usePathname();
  const router                         = useRouter();
  const fileRef                        = useRef<HTMLInputElement>(null);
  const links                          = roleLinks[user?.role || "student"] || [];

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress]   = useState(0);
  const [preview, setPreview]     = useState<string | null>(null);

  const handleAvatarClick = () => fileRef.current?.click();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file"); return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5MB"); return;
    }

    // Show instant local preview
    setPreview(URL.createObjectURL(file));
    setUploading(true);
    setProgress(0);

    // Simulate progress since Cloudinary fetch has no progress events
    const timer = setInterval(() => {
      setProgress(p => p < 85 ? p + 10 : p);
    }, 200);

    try {
      const url = await uploadToCloudinary(file);
      clearInterval(timer);
      setProgress(100);
      setPreview(url);

      // Save to profile in DB
      await axios.put("/api/profile", { photo: url });
      await refreshUser();

      toast.success("Profile photo updated!");
    } catch (err) {
      clearInterval(timer);
      toast.error("Upload failed. Try again.");
      setPreview(null);
    } finally {
      setUploading(false);
      setProgress(0);
    }

    e.target.value = "";
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const photoSrc = preview || user?.photo || null;

  return (
    <aside className="w-64 flex-shrink-0 hidden md:block">
      <div className="bg-white rounded-2xl shadow-md border border-ocean-100 p-5 sticky top-24">

        {/* ── Avatar ── */}
        <div className="flex flex-col items-center text-center pb-5 border-b border-ocean-50 mb-4">

          {/* Clickable avatar with hover overlay */}
          <div
            className="relative group cursor-pointer mb-3"
            onClick={handleAvatarClick}
            title="Click to change photo">

            {/* Photo or initials */}
            {photoSrc ? (
              <Image
                src={photoSrc}
                alt={user?.name || "Profile"}
                width={80} height={80}
                className="w-20 h-20 rounded-full object-cover ring-4 ring-ocean-100 group-hover:ring-ocean-300 transition-all duration-200"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-ocean-gradient flex items-center justify-center text-white text-2xl font-bold ring-4 ring-ocean-100 group-hover:ring-ocean-300 transition-all duration-200 select-none">
                {user?.name?.[0]?.toUpperCase() || "?"}
              </div>
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 rounded-full bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {uploading ? (
                <>
                  <FaSpinner className="text-white text-base animate-spin mb-0.5" />
                  <span className="text-white text-[10px] font-bold leading-tight">{progress}%</span>
                </>
              ) : (
                <>
                  <FaCamera className="text-white text-base mb-0.5" />
                  <span className="text-white text-[10px] font-semibold leading-tight">Change</span>
                </>
              )}
            </div>

            {/* Circular progress ring */}
            {uploading && (
              <svg
                className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
                viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="37"
                  fill="none"
                  stroke="rgba(255,255,255,0.25)"
                  strokeWidth="3" />
                <circle cx="40" cy="40" r="37"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 37}`}
                  strokeDashoffset={`${2 * Math.PI * 37 * (1 - progress / 100)}`}
                  className="transition-all duration-300" />
              </svg>
            )}
          </div>

          {/* Hidden file input */}
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Upload hint */}
          <p className="text-[10px] text-gray-400 mb-2 leading-tight">
            {uploading ? `Uploading... ${progress}%` : "Click photo to change"}
          </p>

          {/* User info */}
          <p className="font-display font-bold text-gray-900 text-sm leading-tight truncate max-w-[180px]">
            {user?.name}
          </p>
          <p className="text-xs text-gray-400 mt-0.5 truncate max-w-[180px]">
            {user?.email}
          </p>

          {/* Role badge */}
          <span className="mt-2 text-xs font-semibold px-3 py-1 rounded-full bg-ocean-100 text-ocean-700 capitalize">
            {user?.role}
          </span>

          {/* Department badge */}
          {user?.department && (
            <span className="mt-1 text-xs text-ocean-400 font-medium">
              {user.department}
            </span>
          )}
        </div>

        {/* ── Navigation links ── */}
        <nav className="space-y-1">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                pathname === link.href
                  ? "bg-ocean-700 text-white shadow-sm"
                  : "text-gray-600 hover:bg-ocean-50 hover:text-ocean-700"
              }`}>
              <span className="text-base flex-shrink-0">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ── Sign out ── */}
        <button
          onClick={handleSignOut}
          className="mt-5 w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all duration-150">
          <FaSignOutAlt className="flex-shrink-0" /> Sign Out
        </button>
      </div>
    </aside>
  );
}