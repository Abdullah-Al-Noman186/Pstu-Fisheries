
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

const roleStyles: Record<
  string,
  {
    text: string;
    bg: string;
    border: string;
    dot: string;
  }
> = {
  admin: {
    text: "text-[#C2415B]",
    bg: "bg-[#C2415B]/[0.07]",
    border: "border-[#C2415B]/15",
    dot: "bg-[#C2415B]",
  },
  teacher: {
    text: "text-[#087EA4]",
    bg: "bg-[#0891B2]/[0.08]",
    border: "border-[#0891B2]/18",
    dot: "bg-[#0891B2]",
  },
  student: {
    text: "text-[#6D5CC6]",
    bg: "bg-[#8B7ED8]/[0.08]",
    border: "border-[#8B7ED8]/18",
    dot: "bg-[#8B7ED8]",
  },
  alumni: {
    text: "text-[#A16207]",
    bg: "bg-[#F59E0B]/[0.08]",
    border: "border-[#F59E0B]/18",
    dot: "bg-[#F59E0B]",
  },
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

  const currentRoleStyle =
    roleStyles[user?.role || ""] || {
      text: "text-[#087EA4]",
      bg: "bg-[#0891B2]/[0.08]",
      border: "border-[#0891B2]/15",
      dot: "bg-[#0891B2]",
    };

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

    const localPreview = URL.createObjectURL(file);

    setPreview(localPreview);
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

      await axios.put("/api/profile", {
        photo: url,
      });

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

      URL.revokeObjectURL(localPreview);
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
          rounded-[26px]
          border border-[#087EA4]/10
          bg-white/80
          shadow-[0_18px_55px_rgba(8,126,164,0.07)]
          backdrop-blur-xl
        "
      >
        {/* =====================================================
            ATMOSPHERE
        ===================================================== */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#0891B2]/[0.07] blur-[80px]" />

          <div className="absolute -bottom-28 -left-20 h-48 w-48 rounded-full bg-[#2DD4BF]/[0.06] blur-[80px]" />

          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(8,126,164,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(8,126,164,0.8) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        {/* =====================================================
            USER PROFILE
        ===================================================== */}

        <div className="relative px-5 pb-5 pt-6">
          <div className="relative flex flex-col items-center text-center">
            {/* Avatar */}
            <div
              className={`group relative mb-3.5 ${
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
                <div className="relative h-20 w-20 overflow-hidden rounded-[22px] border border-[#087EA4]/15 bg-[#F0FAFC] shadow-[0_10px_28px_rgba(8,126,164,0.10)]">
                  <Image
                    key={photoSrc}
                    src={photoSrc}
                    alt={user?.name || "Profile"}
                    fill
                    sizes="80px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ) : (
                <div
                  className="
                    flex h-20 w-20
                    items-center justify-center
                    rounded-[22px]
                    border border-[#0891B2]/15
                    bg-[#0891B2]/[0.08]
                    text-2xl font-bold
                    text-[#087EA4]
                    shadow-[0_10px_28px_rgba(8,126,164,0.07)]
                    transition-all duration-300
                    group-hover:border-[#087EA4]/30
                    group-hover:bg-[#0891B2]/[0.11]
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
                  rounded-[22px]
                  bg-[#123B4A]/65
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

              {/* Upload progress */}
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
                    stroke="rgba(8,126,164,0.12)"
                    strokeWidth="3"
                  />

                  <circle
                    cx="40"
                    cy="40"
                    r="37"
                    fill="none"
                    stroke="rgba(8,126,164,0.9)"
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

              {/* Camera badge */}
              {!uploading && (
                <span className="absolute -bottom-1.5 -right-1.5 flex h-7 w-7 items-center justify-center rounded-lg border-2 border-white bg-[#087EA4] text-white shadow-md">
                  <FaCamera size={9} />
                </span>
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
            <p className="mb-2 text-[8px] font-semibold uppercase tracking-[0.13em] text-[#55727D]/50">
              {uploading
                ? `Uploading · ${progress}%`
                : "Click photo to change"}
            </p>

            {/* Name */}
            <p className="max-w-[190px] truncate font-display text-sm font-bold leading-tight text-[#123B4A]">
              {user?.name || "User"}
            </p>

            {/* Email */}
            <p className="mt-1 max-w-[190px] truncate text-[10px] text-[#55727D]/70">
              {user?.email}
            </p>

            {/* Role */}
            {user?.role && (
              <span
                className={`
                  mt-3
                  inline-flex items-center gap-1.5
                  rounded-full
                  border
                  ${currentRoleStyle.border}
                  ${currentRoleStyle.bg}
                  px-3 py-1
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.14em]
                  ${currentRoleStyle.text}
                `}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${currentRoleStyle.dot}`}
                />
                {user.role}
              </span>
            )}

            {/* Department */}
            {user?.department && (
              <p className="mt-2 text-[9px] font-medium text-[#55727D]/65">
                {user.department}
              </p>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="mx-5 h-px bg-gradient-to-r from-transparent via-[#087EA4]/10 to-transparent" />

        {/* =====================================================
            NAVIGATION
        ===================================================== */}

        <nav className="relative space-y-1 px-3 py-4">
          <p className="mb-2 px-3 text-[8px] font-bold uppercase tracking-[0.2em] text-[#55727D]/55">
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
                        border-[#087EA4]/15
                        bg-[#087EA4]/[0.07]
                        text-[#075985]
                        shadow-[0_6px_18px_rgba(8,126,164,0.05)]
                      `
                      : `
                        border-transparent
                        text-[#55727D]
                        hover:border-[#087EA4]/10
                        hover:bg-[#F0FAFC]
                        hover:text-[#123B4A]
                      `
                  }
                `}
              >
                {/* Active indicator */}
                {isActive && (
                  <span className="absolute bottom-2 left-0 top-2 w-1 rounded-r-full bg-gradient-to-b from-[#075985] to-[#2DD4BF]" />
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
                        ? "bg-[#0891B2]/[0.10] text-[#087EA4]"
                        : "bg-[#F0FAFC] text-[#55727D]/65 group-hover:bg-[#0891B2]/[0.07] group-hover:text-[#087EA4]"
                    }
                  `}
                >
                  {link.icon}
                </span>

                <span>{link.label}</span>

                {/* Active dot */}
                {isActive && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#0891B2] shadow-[0_0_8px_rgba(8,145,178,0.35)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* =====================================================
            SIGN OUT
        ===================================================== */}

        <div className="relative px-3 pb-4">
          <div className="h-px bg-[#087EA4]/10" />

          <button
            type="button"
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
              text-[#55727D]
              transition-all duration-200
              hover:border-[#C2415B]/15
              hover:bg-[#C2415B]/[0.06]
              hover:text-[#C2415B]
            "
          >
            <span
              className="
                flex h-7 w-7
                items-center justify-center
                rounded-lg
                bg-[#F0FAFC]
                text-xs
                text-[#55727D]/70
                transition-colors
                group-hover:bg-[#C2415B]/[0.07]
                group-hover:text-[#C2415B]
              "
            >
              <FaSignOutAlt />
            </span>

            <span>Sign Out</span>
          </button>
        </div>

        {/* =====================================================
            BOTTOM IDENTITY
        ===================================================== */}

        <div className="relative border-t border-[#087EA4]/10 bg-[#F0FAFC]/40 px-5 py-3">
          <div className="flex items-center justify-between">
            <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#55727D]/50">
              Faculty of Fisheries
            </span>

            <span className="font-mono text-[8px] font-semibold text-[#087EA4]/45">
              PSTU
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

