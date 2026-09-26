"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { DEPARTMENTS, Department, Teacher } from "@/types";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { FaChalkboardTeacher } from "react-icons/fa";
import TeacherCard from "@/components/teachers/TeacherCard";
import TeacherModal from "@/components/teachers/TeacherModal";

const deptKeys = ["ALL", ...Object.keys(DEPARTMENTS)] as const;

export default function TeachersPage() {
  const [activeDept, setActiveDept]           = useState("ALL");
  const [teachers, setTeachers]               = useState<Teacher[]>([]);
  const [loading, setLoading]                 = useState(true);
  const [error, setError]                     = useState<string | null>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const url = activeDept === "ALL"
      ? "/api/teachers"
      : `/api/teachers?department=${activeDept}`;

    axios.get(url)
      .then(({ data }) => {
        if (data.success) setTeachers(data.data);
        else setError(data.error);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [activeDept]);

  return (
    <div className="pt-20 min-h-screen bg-wave-gradient">
      {/* Modal */}
      <TeacherModal
        teacher={selectedTeacher}
        onClose={() => setSelectedTeacher(null)}
      />

      {/* Hero */}
      <div className="bg-ocean-gradient text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold mb-3">
            Our Faculty Members
          </motion.h1>
          <p className="text-ocean-200 text-lg">
            Meet the dedicated professors and researchers shaping the future of fisheries
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {deptKeys.map(k => (
            <button key={k} onClick={() => setActiveDept(k)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeDept === k
                  ? "bg-ocean-700 text-white shadow-md"
                  : "bg-white text-ocean-600 border border-ocean-200 hover:border-ocean-400"
              }`}>
              {k === "ALL" ? "All Departments" : `${k} — ${DEPARTMENTS[k as Department]}`}
            </button>
          ))}
        </div>

        {error && (
          <div className="text-center py-10 text-red-500 text-sm">{error}</div>
        )}

        {loading && <LoadingSpinner message="Loading faculty members..." />}

        {!loading && !error && (
          <>
            <p className="text-center text-ocean-500 text-sm mb-8">
              {teachers.length} faculty member{teachers.length !== 1 ? "s" : ""} — click any card to view full profile
            </p>

            {teachers.length === 0 ? (
              <div className="text-center py-24">
                <div className="w-20 h-20 bg-ocean-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaChalkboardTeacher className="text-ocean-300 text-3xl" />
                </div>
                <p className="text-gray-500 text-lg font-medium mb-2">No faculty members yet</p>
                <p className="text-gray-400 text-sm">
                  Faculty members will appear here once they register and complete their profile.
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {teachers.map((t, i) => (
                  <TeacherCard
                    key={t._id}
                    teacher={t}
                    index={i}
                    onClick={() => setSelectedTeacher(t)}
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