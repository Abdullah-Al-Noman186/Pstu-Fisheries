"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { DEPARTMENTS, Department } from "@/types";

export default function StudentPage() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    axios.get("/api/profile").then(({ data }) => { if (data.success) setProfile(data.data); });
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-2xl font-display font-bold text-ocean-900 mb-6">My Academic Record</h1>

      {profile && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Student ID", value: profile.studentId || "—" },
              { label: "Batch",      value: profile.batch     || "—" },
              { label: "Semester",   value: profile.semester  || "—" },
              { label: "CGPA",       value: profile.cgpa      || "—" },
            ].map((s, i) => (
              <div key={i} className="card-fish p-5 text-center">
                <p className="text-2xl font-display font-bold text-ocean-900">{s.value}</p>
                <p className="text-xs text-gray-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="card-fish p-6">
            <h3 className="font-display font-bold text-ocean-900 mb-4">Student Information</h3>
            <div className="space-y-3">
              {[
                ["Full Name",   profile.name],
                ["Email",       profile.email],
                ["Department",  profile.department ? DEPARTMENTS[profile.department as Department] : "—"],
                ["Phone",       profile.phone || "—"],
                ["Address",     profile.address || "—"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between py-2 border-b border-ocean-50 last:border-0">
                  <span className="text-sm text-gray-500">{label}</span>
                  <span className="text-sm font-medium text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}