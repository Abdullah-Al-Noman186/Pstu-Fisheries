"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import { motion } from "framer-motion";
import { FaFlask, FaBook, FaUsers } from "react-icons/fa";

export default function TeacherPage() {
  const { user }            = useAuth();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    axios.get("/api/profile").then(({ data }) => { if (data.success) setProfile(data.data); });
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-2xl font-display font-bold text-ocean-900 mb-6">My Academic Page</h1>

      {profile && (
        <div className="space-y-5">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Publications", value: profile.publications || 0, icon: <FaBook /> },
              { label: "Research Areas", value: profile.researchAreas?.length || 0, icon: <FaFlask /> },
              { label: "Students", value: "—", icon: <FaUsers /> },
            ].map((s, i) => (
              <div key={i} className="card-fish p-5 text-center">
                <div className="text-ocean-500 text-2xl mx-auto mb-2 flex justify-center">{s.icon}</div>
                <p className="text-2xl font-display font-bold text-ocean-900">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Research areas */}
          {profile.researchAreas?.length > 0 && (
            <div className="card-fish p-6">
              <h3 className="font-display font-bold text-ocean-900 mb-3">Research Areas</h3>
              <div className="flex flex-wrap gap-2">
                {profile.researchAreas.map((area: string, i: number) => (
                  <span key={i} className="bg-ocean-100 text-ocean-700 text-sm px-3 py-1 rounded-full font-medium">{area}</span>
                ))}
              </div>
            </div>
          )}

          {/* Bio */}
          {profile.bio && (
            <div className="card-fish p-6">
              <h3 className="font-display font-bold text-ocean-900 mb-3">About</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{profile.bio}</p>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}