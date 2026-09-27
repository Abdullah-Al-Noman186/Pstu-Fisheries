
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
  FaHome,
  FaUser,
  FaUsers,
  FaNewspaper,
  FaFlask,
  FaSignOutAlt,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaCamera,
  FaSpinner,
} from "react-icons/fa";

const roleLinks: Record<
  string,
  {
    label: string;
    href: string;
    icon: React.ReactNode;
  }[]
> = {
  admin: [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <FaHome />,
    },
    {
      label: "My Profile",
      href: "/profile",
      icon: <FaUser />,
    },
    {
      label: "Teachers",
      href: "/admin/teachers",
      icon: <FaChalkboardTeacher />,
    },
    {
      label: "Alumni",
      href: "/admin/alumni",
      icon: <FaUserGraduate />,
    },
    {
      label: "News",
      href: "/admin/news",
      icon: <FaNewspaper />,
    },
    {
      label: "Research",
      href: "/admin/research",
      icon: <FaFlask />,
    },
    {
      label: "Users",
      href: "/admin/users",
      icon: <FaUsers />,
    },
  ],

  teacher: [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <FaHome />,
    },
    {
      label: "My Profile",
      href: "/profile",
      icon: <FaUser />,
    },
    {
      label: "My Publications",
      href: "/teacher",
      icon: <FaFlask />,
    },
  ],

  student: [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <FaHome />,
    },
    {
      label: "My Profile",
      href: "/profile",
      icon: <FaUser />,
    },
    {
      label: "My Record",
      href: "/student",
      icon: <FaUserGraduate />,
    },
  ],

  alumni: [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <FaHome />,
    },
    {
      label: "My Profile",
      href: "/profile",
      icon: <FaUser />,
    },
    {
      label: "Alumni Page",
      href: "/alumni-profile",
      icon: <FaUsers />,
    },
  ],
};

export default function Sidebar() {
  const { user, signOut, refreshUser } = useAuth();

  const pathname = usePathname();
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const links =
    roleLinks[user?.role || "student"] || [];

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);

  /* =========================================================
     PHOTO UPLOAD
  ========================================================= */

  const handleAvatarClick = () => {
    if (!uploading) {
      fileRef.current?.click();
    }
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5MB.");
      e.target.value = "";
      return;
    }

    // Instant local preview
    setPreview(URL.createObjectURL(file));
    setUploading(true);
    setProgress(0);

    const timer = setInterval(() => {
      setProgress((p) => (p < 85 ? p + 10 : p));
    }, 200);

    try {
      const url = await uploadToCloudinary(file);

      clearInterval(timer);

      setProgress(100);
      setPreview(url);

      // Save photo
      await axios.put("/api/profile", {
        photo: url,
      });

      // Refresh AuthContext
      await refreshUser();

      toast.success("Profile photo updated!");
    } catch {
      clearInterval(timer);

      toast.error("Upload failed. Try again.");
      setPreview(null);
    } finally {
      setUploading(false);

      setTimeout(() => {
        setProgress(0);
      }, 300);
    }

    e.target.value = "";
  };

  /* =========================================================
     SIGN OUT
  ========================================================= */

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const photoSrc = preview || user?.photo || null;

  return (
    <aside className="hidden w-64 shrink-0 md:block">
      <div
        className="
          sticky top-24
          overflow-hidden
          rounded-2xl
          border border-white/[0.06]
          bg-white/[0.025]
          backdrop-blur-sm
        "
      >
        {/* =====================================================
            USER PROFILE
        ===================================================== */}

        <div className="relative px-5 pb-5 pt-6">
          {/* Background glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cyan-400/[0.035] blur-[70px]" />

          <div className="relative flex flex-col items-center text-center">
            {/* Avatar */}
            <div
              className={`group relative mb-4 ${
                uploading
                  ? "cursor-default"
                  : "cursor-pointer"
              }`}
              onClick={handleAvatarClick}
              title={
                uploading
                  ? "Uploading..."
                  : "Click to change photo"
              }
            >
              {photoSrc ? (
                <Image
                  key={photoSrc}
                  src={photoSrc}
                  alt={user?.name || "Profile"}
                  width={80}
                  height={80}
                  className="
                    h-20 w-20
                    rounded-full
                    border border-white/[0.08]
                    object-cover
                    transition-all duration-300
                    group-hover:border-cyan-300/30
                  "
                />
              ) : (
                <div
                  className="
                    flex h-20 w-20
                    items-center justify-center
                    rounded-full
                    border border-cyan-400/10
                    bg-cyan-400/[0.06]
                    text-2xl font-bold
                    text-cyan-300
                    transition-all duration-300
                    group-hover:border-cyan-300/30
                  "
                >
                  {user?.name?.[0]?.toUpperCase() || "?"}
                </div>
              )}

              {/* Hover overlay */}
              <div
                className="
                  absolute inset-0
                  flex flex-col
                  items-center justify-center
                  rounded-full
                  bg-black/65
                  opacity-0
                  transition-opacity duration-200
                  group-hover:opacity-100
                "
              >
                {uploading ? (
                  <>
                    <FaSpinner className="mb-1 animate-spin text-sm text-white" />
                    <span className="text-[9px] font-bold text-white">
                      {progress}%
                    </span>
                  </>
                ) : (
                  <>
                    <FaCamera className="mb-1 text-sm text-white" />
                    <span className="text-[9px] font-semibold text-white">
                      Change
                    </span>
                  </>
                )}
              </div>

              {/* Progress ring */}
              {uploading && (
                <svg
                  className="
                    pointer-events-none
                    absolute inset-0
                    h-full w-full
                    -rotate-90
                  "
                  viewBox="0 0 80 80"
                >
                  <circle
                    cx="40"
                    cy="40"
                    r="37"
                    fill="none"
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth="3"
                  />

                  <circle
                    cx="40"
                    cy="40"
                    r="37"
                    fill="none"
                    stroke="rgba(103,232,249,0.9)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 37}`}
                    strokeDashoffset={`${
                      2 *
                      Math.PI *
                      37 *
                      (1 - progress / 100)
                    }`}
                    className="transition-all duration-300"
                  />
                </svg>
              )}
            </div>

            {/* Hidden input */}
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Upload status */}
            <p className="mb-2 text-[9px] uppercase tracking-[0.12em] text-slate-700">
              {uploading
                ? `Uploading · ${progress}%`
                : "Click photo to change"}
            </p>

            {/* Name */}
            <p className="max-w-[190px] truncate font-display text-sm font-bold leading-tight text-white">
              {user?.name || "User"}
            </p>

            {/* Email */}
            <p className="mt-1 max-w-[190px] truncate text-[11px] text-slate-600">
              {user?.email}
            </p>

            {/* Role */}
            {user?.role && (
              <span
                className="
                  mt-3
                  rounded-full
                  border border-cyan-400/10
                  bg-cyan-400/[0.05]
                  px-3 py-1
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                  text-cyan-300/80
                "
              >
                {user.role}
              </span>
            )}

            {/* Department */}
            {user?.department && (
              <p className="mt-2 text-[10px] font-medium text-slate-600">
                {user.department}
              </p>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="mx-5 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

        {/* =====================================================
            NAVIGATION
        ===================================================== */}

        <nav className="space-y-1 px-3 py-4">
          <p className="mb-2 px-3 text-[9px] uppercase tracking-[0.2em] text-slate-700">
            Workspace
          </p>

          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  group
                  relative
                  flex items-center gap-3
                  rounded-xl
                  border
                  px-3 py-2.5
                  text-sm font-medium
                  transition-all duration-200

                  ${
                    isActive
                      ? `
                        border-cyan-400/[0.10]
                        bg-cyan-400/[0.08]
                        text-cyan-200
                      `
                      : `
                        border-transparent
                        text-slate-500
                        hover:border-white/[0.05]
                        hover:bg-white/[0.035]
                        hover:text-slate-200
                      `
                  }
                `}
              >
                {/* Active indicator */}
                {isActive && (
                  <span className="absolute bottom-2 left-0 top-2 w-px rounded-r-full bg-cyan-300" />
                )}

                {/* Icon */}
                <span
                  className={`
                    flex h-7 w-7
                    shrink-0
                    items-center justify-center
                    rounded-lg
                    text-xs
                    transition-all duration-200

                    ${
                      isActive
                        ? "bg-cyan-400/[0.08] text-cyan-300"
                        : "bg-white/[0.025] text-slate-600 group-hover:text-slate-300"
                    }
                  `}
                >
                  {link.icon}
                </span>

                <span>{link.label}</span>

                {/* Active dot */}
                {isActive && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.6)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* =====================================================
            SIGN OUT
        ===================================================== */}

        <div className="px-3 pb-4">
          <div className="h-px bg-white/[0.05]" />

          <button
            onClick={handleSignOut}
            className="
              group
              mt-3
              flex w-full
              items-center gap-3
              rounded-xl
              border border-transparent
              px-3 py-2.5
              text-sm font-medium
              text-slate-600
              transition-all duration-200
              hover:border-red-400/[0.08]
              hover:bg-red-400/[0.04]
              hover:text-red-300
            "
          >
            <span
              className="
                flex h-7 w-7
                items-center justify-center
                rounded-lg
                bg-white/[0.025]
                text-xs
                transition-colors
                group-hover:bg-red-400/[0.06]
                group-hover:text-red-300
              "
            >
              <FaSignOutAlt />
            </span>

            <span>Sign Out</span>
          </button>
        </div>

        {/* Bottom identity marker */}
        <div className="border-t border-white/[0.04] px-5 py-3">
          <div className="flex items-center justify-between">
            <span className="text-[8px] uppercase tracking-[0.18em] text-slate-700">
              Faculty of Fisheries
            </span>

            <span className="font-mono text-[8px] text-cyan-300/30">
              PSTU
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

