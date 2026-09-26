"use client";
import { useAuth } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";
import { useState } from "react";
import { FaUsers, FaUserGraduate, FaNewspaper, FaFlask, FaPlus } from "react-icons/fa";

export default function AdminPage() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  if (loading) return <div className="pt-24 text-center">Loading...</div>;
  if (!user || user.role !== "admin") { redirect("/"); }

  const tabs = [
    { id: "overview", label: "Overview",   icon: <FaUsers /> },
    { id: "teachers", label: "Teachers",   icon: <FaUsers /> },
    { id: "alumni",   label: "Alumni",     icon: <FaUserGraduate /> },
    { id: "news",     label: "News",       icon: <FaNewspaper /> },
    { id: "research", label: "Research",   icon: <FaFlask /> },
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

        {/* Placeholder panels for each section */}
        {activeTab !== "overview" && (
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