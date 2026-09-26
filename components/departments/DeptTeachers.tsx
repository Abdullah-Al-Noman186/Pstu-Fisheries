"use client";
import { useTeachers } from "@/hooks/useTeachers";
import TeacherCard from "@/components/teachers/TeacherCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Department } from "@/types";

export default function DeptTeachers({ deptKey }: { deptKey: Department }) {
  const { teachers, loading } = useTeachers(deptKey);

  return (
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
  );
}