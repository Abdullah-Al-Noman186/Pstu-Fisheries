
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
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020b18] text-white">

        {/* Atmospheric background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-cyan-400/[0.045] blur-[130px]" />

          <div className="absolute -right-40 top-[35%] h-[520px] w-[520px] rounded-full bg-cyan-400/[0.025] blur-[140px]" />

          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
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
    <main className="relative min-h-screen overflow-hidden bg-[#020b18] pt-16 text-white">

      {/* =====================================================
          ATMOSPHERIC BACKGROUND
      ====================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Top-left glow */}
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-cyan-400/[0.045] blur-[130px]" />

        {/* Right glow */}
        <div className="absolute -right-40 top-[35%] h-[520px] w-[520px] rounded-full bg-cyan-400/[0.025] blur-[140px]" />

        {/* Bottom glow */}
        <div className="absolute bottom-[-250px] left-[30%] h-[500px] w-[500px] rounded-full bg-sky-500/[0.02] blur-[140px]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* =====================================================
          DASHBOARD
      ====================================================== */}
      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        <div className="flex items-start gap-5 lg:gap-6">

          {/* =================================================
              SIDEBAR
          ================================================== */}
          <aside className="shrink-0">
            <Sidebar />
          </aside>

          {/* =================================================
              MAIN CONTENT
          ================================================== */}
          <main className="min-w-0 flex-1">
            {children}
          </main>

        </div>

      </div>

    </main>
  );
}

