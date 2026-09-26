"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaLinkedin, FaMapMarkerAlt, FaBriefcase, FaTrophy } from "react-icons/fa";
import { DEPARTMENTS, Department } from "@/types";

export default function AlumniProfilePage() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    axios.get("/api/profile").then(({ data }) => { if (data.success) setProfile(data.data); });
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-2xl font-display font-bold text-ocean-900 mb-6">My Alumni Profile</h1>

      {profile && (
        <div className="space-y-5">
          {/* Public profile card */}
          <div className="card-fish p-6 bg-ocean-gradient text-white">
            <p className="text-ocean-200 text-xs mb-1 uppercase tracking-wider">Alumni — Faculty of Fisheries, PSTU</p>
            <h2 className="text-xl font-display font-bold mb-1">{profile.name}</h2>
            {profile.currentPosition && (
              <p className="flex items-center gap-2 text-ocean-200 text-sm">
                <FaBriefcase /> {profile.currentPosition} {profile.organization && `at ${profile.organization}`}
              </p>
            )}
            {profile.location && (
              <p className="flex items-center gap-2 text-ocean-200 text-sm mt-1">
                <FaMapMarkerAlt /> {profile.location}
              </p>
            )}
            <div className="flex items-center gap-3 mt-3">
              {profile.department && (
                <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">
                  {DEPARTMENTS[profile.department as Department]}
                </span>
              )}
              {profile.batch && (
                <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">Batch {profile.batch}</span>
              )}
              {profile.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
                  className="text-white hover:text-teal-300 transition-colors">
                  <FaLinkedin size={18} />
                </a>
              )}
            </div>
          </div>

          {profile.bio && (
            <div className="card-fish p-6">
              <h3 className="font-display font-bold text-ocean-900 mb-3">About</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{profile.bio}</p>
            </div>
          )}

          {profile.achievements?.length > 0 && (
            <div className="card-fish p-6">
              <h3 className="font-display font-bold text-ocean-900 mb-3 flex items-center gap-2"><FaTrophy className="text-amber-500" /> Achievements</h3>
              <ul className="space-y-2">
                {profile.achievements.map((a: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 flex-shrink-0" />{a}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {profile.testimonial && (
            <div className="card-fish p-6 border-l-4 border-ocean-500">
              <p className="text-gray-600 italic text-sm leading-relaxed">&ldquo;{profile.testimonial}&rdquo;</p>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}