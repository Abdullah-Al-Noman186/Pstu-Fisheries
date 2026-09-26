"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { DEPARTMENTS, Department } from "@/types";
import { FaArrowRight } from "react-icons/fa";

const deptKeys = Object.keys(DEPARTMENTS) as Department[];

const deptColors: Record<Department, string> = {
  AQC: "border-blue-400 hover:bg-blue-50",
  FBG: "border-emerald-400 hover:bg-emerald-50",
  FMN: "border-violet-400 hover:bg-violet-50",
  FST: "border-amber-400 hover:bg-amber-50",
  MFO: "border-cyan-400 hover:bg-cyan-50",
};

export default function DepartmentsPage() {
  return (
    <div className="pt-20 min-h-screen bg-wave-gradient">
      <div className="bg-ocean-gradient text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold mb-3">Departments</motion.h1>
          <p className="text-ocean-200 text-lg">Five specialized departments driving fisheries excellence</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="space-y-4">
          {deptKeys.map((key, i) => (
            <motion.div key={key} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }} viewport={{ once: true }}>
              <Link href={`/departments/${key.toLowerCase()}`}
                className={`block card-fish p-6 border-l-4 ${deptColors[key]} transition-all group`}>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-mono font-bold text-ocean-600 text-sm">{key}</span>
                    <h2 className="font-display font-bold text-gray-900 text-xl mt-1">{DEPARTMENTS[key]}</h2>
                  </div>
                  <FaArrowRight className="text-ocean-400 group-hover:text-ocean-700 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}