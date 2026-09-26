"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Research } from "@/types";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { FaExternalLinkAlt, FaBook, FaUsers } from "react-icons/fa";

const types = ["ALL", "journal", "conference", "thesis", "book"] as const;

export default function ResearchPage() {
  const [research, setResearch]     = useState<Research[]>([]);
  const [loading, setLoading]       = useState(true);
  const [activeType, setActiveType] = useState("ALL");

  useEffect(() => {
    setLoading(true);
    const q = activeType !== "ALL" ? `?type=${activeType}` : "";
    axios.get(`/api/research${q}`)
      .then(({ data }) => { if (data.success) setResearch(data.data); })
      .finally(() => setLoading(false));
  }, [activeType]);

  return (
    <div className="pt-20 min-h-screen bg-wave-gradient">
      <div className="bg-ocean-gradient text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold mb-3">Research & Publications</motion.h1>
          <p className="text-ocean-200 text-lg">Advancing knowledge in fisheries and aquatic sciences</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {types.map(t => (
            <button key={t} onClick={() => setActiveType(t)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                activeType === t ? "bg-ocean-700 text-white shadow-md" : "bg-white text-ocean-600 border border-ocean-200 hover:border-ocean-400"
              }`}>
              {t === "ALL" ? "All Types" : t}
            </button>
          ))}
        </div>

        {loading ? <LoadingSpinner /> : (
          <div className="space-y-4">
            {research.map((item, i) => (
              <motion.div key={item._id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }} viewport={{ once: true }}
                className="card-fish p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-ocean-100 text-ocean-700 capitalize">{item.type}</span>
                      <span className="text-xs text-gray-400">{item.year}</span>
                      {item.department && <span className="text-xs text-teal-600 font-medium">{item.department}</span>}
                    </div>
                    <h3 className="font-display font-bold text-gray-900 text-sm leading-snug mb-2">{item.title}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
                      <FaUsers className="text-ocean-400" /> {item.authors.join(", ")}
                    </div>
                    {item.journal && (
                      <p className="text-xs text-ocean-600 italic flex items-center gap-1"><FaBook className="text-ocean-400" /> {item.journal}</p>
                    )}
                    {item.abstract && (
                      <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">{item.abstract}</p>
                    )}
                  </div>
                  {item.link && (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-ocean-500 hover:text-ocean-700 flex-shrink-0 mt-1">
                      <FaExternalLinkAlt size={14} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
            {research.length === 0 && <p className="text-center py-20 text-gray-400">No publications found.</p>}
          </div>
        )}
      </div>
    </div>
  );
}