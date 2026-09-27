
"use client";

import { useTeachers } from "@/hooks/useTeachers";
import TeacherCard from "@/components/teachers/TeacherCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Department } from "@/types";

export default function DeptTeachers({
  deptKey,
}: {
  deptKey: Department;
}) {
  const { teachers, loading } = useTeachers(deptKey);

  return (
    <div className="w-full">
      {/* Loading state */}
      {loading ? (
        <div className="flex min-h-[280px] items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {/* Faculty grid */}
          {teachers.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {teachers.map((teacher, index) => (
                <TeacherCard
                  key={teacher._id}
                  teacher={teacher}
                  index={index}
                />
              ))}
            </div>
          ) : (
            /* Empty state */
            <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-[#087EA4]/10 bg-[#F0FAFC]/60 px-6 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0891B2]/[0.08]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#0891B2]/50" />
              </div>

              <h3 className="text-base font-semibold text-[#123B4A]">
                No Faculty Members Yet
              </h3>

              <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#55727D]">
                Faculty information for this department has not been listed
                yet. Please check back later.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

