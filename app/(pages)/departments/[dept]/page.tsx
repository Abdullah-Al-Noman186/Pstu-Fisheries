"use client";
import { use } from "react";
import { motion } from "framer-motion";
import { DEPARTMENTS, Department } from "@/types";
import { useTeachers } from "@/hooks/useTeachers";
import TeacherCard from "@/components/teachers/TeacherCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function DeptPage({ params }: { params: Promise<{ dept: string }> }) {
  const { dept } = use(params);
  const deptKey  = dept.toUpperCase() as Department;
  const deptName = DEPARTMENTS[deptKey];

  if (!deptName) notFound();

  const { teachers, loading } = useTeachers(deptKey);

  return (
    <div className="pt-20 min-h-screen bg-wave-gradient">
      <div className="bg-ocean-gradient text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/departments"
            className="inline-flex items-center gap-2 text-ocean-300 hover:text-white text-sm mb-6 transition-colors">
            <FaArrowLeft /> All Departments
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="font-mono font-bold text-teal-400 text-lg">{deptKey}</span>
            <h1 className="text-3xl md:text-4xl font-display font-bold mt-1">{deptName}</h1>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="font-display font-bold text-ocean-900 text-2xl mb-8">Faculty Members</h2>
        {loading ? <LoadingSpinner /> : (
          <>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {teachers.map((t, i) => <TeacherCard key={t._id} teacher={t} index={i} />)}
            </div>
            {teachers.length === 0 && (
              <p className="text-center py-20 text-gray-400">No faculty members listed yet.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}