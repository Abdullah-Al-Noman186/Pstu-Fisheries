"use client";
import { useAuth } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaUsers, FaUserGraduate, FaNewspaper, FaFlask, FaPlus, FaFlag } from "react-icons/fa";

interface ReportItem { _id: string; message: string; status: string; createdAt: string; target?: { name?: string; role?: string } | null; }

export default function AdminPage() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [reportsLoading, setReportsLoading] = useState(false);

  useEffect(() => {
    if (activeTab !== "reports" || !user || user.role !== "admin") return;
    setReportsLoading(true);
    axios.get("/api/profile/report").then(({ data }) => setReports(data.data || [])).catch(() => toast.error("Could not load profile reports.")).finally(() => setReportsLoading(false));
  }, [activeTab, user]);

  if (loading) return <div className="pt-24 text-center">Loading...</div>;
  if (!user || user.role !== "admin") { redirect("/"); }

  const tabs = [
    { id: "overview", label: "Overview",   icon: <FaUsers /> },
    { id: "teachers", label: "Teachers",   icon: <FaUsers /> },
    { id: "alumni",   label: "Alumni",     icon: <FaUserGraduate /> },
    { id: "news",     label: "News",       icon: <FaNewspaper /> },
    { id: "research", label: "Research",   icon: <FaFlask /> },
    { id: "reports", label: "Profile reports", icon: <FaFlag /> },
  ];

  return (
    <div className="pt-20 min-h-screen bg-wave-gradient">
      <div className="bg-ocean-gradient text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-display font-bold">Admin Panel</h1>
          <p className="text-ocean-200 mt-1">Manage faculty, alumni, news, and research content</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id ? "bg-ocean-700 text-white" : "bg-white text-ocean-600 border border-ocean-200 hover:border-ocean-400"
              }`}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { label: "Total Teachers", value: "—", color: "bg-blue-50 text-blue-600" },
              { label: "Total Alumni",   value: "—", color: "bg-emerald-50 text-emerald-600" },
              { label: "News Posts",     value: "—", color: "bg-violet-50 text-violet-600" },
              { label: "Publications",   value: "—", color: "bg-amber-50 text-amber-600" },
            ].map((item, i) => (
              <div key={i} className={`card-fish p-6 text-center ${item.color}`}>
                <p className="text-3xl font-display font-bold mb-1">{item.value}</p>
                <p className="text-sm font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "reports" && (
          <section className="card-fish space-y-4 p-5 sm:p-8" aria-labelledby="profile-reports-title">
            <h2 id="profile-reports-title" className="font-display text-xl font-bold text-ocean-900">Reported profile information</h2>
            {reportsLoading ? <p role="status" className="text-sm text-gray-500">Loading reports…</p> : reports.length ? reports.map((report) => <article key={report._id} className="rounded-xl border border-ocean-100 p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="font-semibold text-ocean-900">{report.target?.name || "Profile unavailable"} <span className="text-xs font-normal capitalize text-gray-500">{report.target?.role}</span></p><p className="mt-1 text-xs text-gray-500">Reported {new Date(report.createdAt).toLocaleDateString()} · {report.status}</p></div><div className="flex gap-2">{report.status === "pending" && <button type="button" onClick={async () => { try { await axios.patch("/api/profile/report", { id: report._id, status: "reviewed" }); setReports((current) => current.map((item) => item._id === report._id ? { ...item, status: "reviewed" } : item)); } catch { toast.error("Could not update the report."); } }} className="rounded-lg border border-ocean-200 px-3 py-2 text-xs font-semibold text-ocean-700">Mark reviewed</button>}<button type="button" onClick={async () => { try { await axios.patch("/api/profile/report", { id: report._id, status: "resolved" }); setReports((current) => current.filter((item) => item._id !== report._id)); } catch { toast.error("Could not update the report."); } }} className="rounded-lg bg-ocean-700 px-3 py-2 text-xs font-semibold text-white">Resolve</button></div></div><p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-gray-700">{report.message}</p></article>) : <p className="text-sm text-gray-500">No profile reports are waiting for review.</p>}
          </section>
        )}

        {/* Placeholder panels for each section */}
        {activeTab !== "overview" && activeTab !== "reports" && (
          <div className="card-fish p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display font-bold text-ocean-900 text-xl capitalize">Manage {activeTab}</h2>
              <button className="btn-ocean flex items-center gap-2 text-sm py-2 px-4">
                <FaPlus /> Add New
              </button>
            </div>
            <p className="text-gray-400 text-sm">
              Connect your admin forms here. Use POST /api/{activeTab} to create, PUT /api/{activeTab}/[id] to update, DELETE to remove.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
