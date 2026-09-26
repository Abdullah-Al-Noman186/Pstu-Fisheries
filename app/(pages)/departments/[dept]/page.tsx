import { DEPARTMENTS, Department } from "@/types";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import DeptTeachers from "@/components/departments/DeptTeachers";

export default async function DeptPage({ params }: { params: Promise<{ dept: string }> }) {
  const { dept } = await params;
  const deptKey  = dept.toUpperCase() as Department;
  const deptName = DEPARTMENTS[deptKey];

  if (!deptName) notFound();

  return (
    <div className="pt-20 min-h-screen bg-wave-gradient">
      <div className="bg-ocean-gradient text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/departments"
            className="inline-flex items-center gap-2 text-ocean-300 hover:text-white text-sm mb-6 transition-colors">
            <FaArrowLeft /> All Departments
          </Link>
          <div>
            <span className="font-mono font-bold text-teal-400 text-lg">{deptKey}</span>
            <h1 className="text-3xl md:text-4xl font-display font-bold mt-1">{deptName}</h1>
          </div>
        </div>
      </div>
      <DeptTeachers deptKey={deptKey} />
    </div>
  );
}