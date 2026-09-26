"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Alumni, DEPARTMENTS, Department } from "@/types";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { FaSearch, FaUserGraduate } from "react-icons/fa";
import AlumniCard from "@/components/alumni/AlumniCard";
import AlumniModal from "@/components/alumni/AlumniModal";

const deptKeys = ["ALL", ...Object.keys(DEPARTMENTS)] as const;

export default function AlumniPage() {
  const [activeDept, setActiveDept]       = useState("ALL");
  const [search, setSearch]               = useState("");
  const [alumni, setAlumni]               = useState<Alumni[]>([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState<string | null>(null);
  const [selectedAlumni, setSelectedAlumni] = useState<Alumni | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const url = activeDept === "ALL"
      ? "/api/alumni"
      : `/api/alumni?department=${activeDept}`;

    axios.get(url)
      .then(({ data }) => {
        if (data.success) setAlumni(data.data);
        else setError(data.error);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [activeDept]);

  const filtered = alumni.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.organization?.toLowerCase().includes(search.toLowerCase()) ||
    a.currentPosition?.toLowerCase().includes(search.toLowerCase()) ||
    a.location?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pt-20 min-h-screen bg-wave-gradient">
      {/* Modal */}
      <AlumniModal
        alumni={selectedAlumni}
        onClose={() => setSelectedAlumni(null)}
      />

      {/* Hero */}
      <div className="bg-ocean-gradient text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold mb-3">
            Alumni Network
          </motion.h1>
          <p className="text-ocean-200 text-lg">
            Graduates of Faculty of Fisheries making an impact worldwide
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search */}
        <div className="relative max-w-md mx-auto mb-8">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-ocean-400 text-sm" />
          <input type="text" placeholder="Search by name, position, organization..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-ocean-200 focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-100 text-sm bg-white" />
        </div>

        {/* Department filter */}
        {/* <div className="flex flex-wrap gap-2 justify-center mb-10">
          {deptKeys.map(k => (
            <button key={k} onClick={() => setActiveDept(k)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeDept === k
                  ? "bg-ocean-700 text-white shadow-md"
                  : "bg-white text-ocean-600 border border-ocean-200 hover:border-ocean-400"
              }`}>
              {k === "ALL" ? "All" : k}
            </button>
          ))}
        </div> */}

        {error && <div className="text-center py-10 text-red-500 text-sm">{error}</div>}
        {loading && <LoadingSpinner message="Loading alumni..." />}

        {!loading && !error && (
          <>
            <p className="text-center text-ocean-500 text-sm mb-8">
              {filtered.length} alumni registered — click any card to view full profile
            </p>

            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <div className="w-20 h-20 bg-ocean-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUserGraduate className="text-ocean-300 text-3xl" />
                </div>
                <p className="text-gray-500 text-lg font-medium mb-2">
                  {search || activeDept !== "ALL" ? "No alumni found" : "No alumni registered yet"}
                </p>
                <p className="text-gray-400 text-sm">
                  {search || activeDept !== "ALL"
                    ? "Try a different search or filter"
                    : "Alumni will appear here once they register and complete their profile."
                  }
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((a, i) => (
                  <AlumniCard
                    key={a._id}
                    alumni={a}
                    index={i}
                    onClick={() => setSelectedAlumni(a)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}