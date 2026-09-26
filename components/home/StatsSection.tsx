"use client";
import { FaUserGraduate, FaBook, FaAward, FaFlask, FaGlobe } from "react-icons/fa";
import StatCard from "@/components/ui/StatCard";

const stats = [
  { value: "5",    label: "Departments",      icon: <FaBook /> },
  { value: "30+",  label: "Faculty Members",  icon: <FaUserGraduate /> },
  { value: "500+",label: "Alumni Worldwide", icon: <FaGlobe /> },
  { value: "200+", label: "Publications",     icon: <FaFlask /> },
  { value: "15+",  label: "Years of Excellence", icon: <FaAward /> },
];

export default function StatsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {stats.map((s, i) => (
            <StatCard key={i} value={s.value} label={s.label} icon={s.icon} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}