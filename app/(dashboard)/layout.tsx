
"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F0FAFC] text-[#123B4A]">
        {/* Atmospheric background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Top-left ocean glow */}
          <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#0891B2]/[0.07] blur-[130px]" />

          {/* Right ocean glow */}
          <div className="absolute -right-40 top-[35%] h-[520px] w-[520px] rounded-full bg-[#087EA4]/[0.045] blur-[140px]" />

          {/* Bottom seafoam glow */}
          <div className="absolute bottom-[-250px] left-[30%] h-[500px] w-[500px] rounded-full bg-[#2DD4BF]/[0.055] blur-[140px]" />

          {/* Ocean grid */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(8,126,164,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(8,126,164,0.8) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="relative">
          <LoadingSpinner message="Loading your account..." />
        </div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F0FAFC] pt-16 text-[#123B4A]">
      {/* =====================================================
          ATMOSPHERIC BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* Top-left glow */}
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#0891B2]/[0.07] blur-[130px]" />

        {/* Right glow */}
        <div className="absolute -right-40 top-[35%] h-[520px] w-[520px] rounded-full bg-[#087EA4]/[0.045] blur-[140px]" />

        {/* Bottom glow */}
        <div className="absolute bottom-[-250px] left-[30%] h-[500px] w-[500px] rounded-full bg-[#2DD4BF]/[0.055] blur-[140px]" />

        {/* Subtle secondary glow */}
        <div className="absolute left-[45%] top-[10%] h-[300px] w-[300px] rounded-full bg-[#075985]/[0.025] blur-[120px]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(8,126,164,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(8,126,164,0.8) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* =====================================================
          DASHBOARD CONTENT
      ====================================================== */}

      <div className="relative mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-8 lg:px-8">
        <div className="flex items-start gap-5 lg:gap-6">
          {/* =================================================
              SIDEBAR
          ================================================== */}

          <Sidebar />

          {/* =================================================
              MAIN CONTENT
          ================================================== */}

          <main className="min-w-0 flex-1">
            {children}
          </main>
        </div>
      </div>

      {/* =====================================================
          BOTTOM ATMOSPHERIC LINE
      ====================================================== */}

      <div className="pointer-events-none fixed bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#087EA4]/15 to-transparent" />
    </main>
  );
}

