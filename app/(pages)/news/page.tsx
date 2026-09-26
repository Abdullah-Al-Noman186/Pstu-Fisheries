"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { format } from "date-fns";
import { FaCalendar } from "react-icons/fa";
import { useNews } from "@/hooks/useNews";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useState } from "react";

const categories = ["all", "news", "notice", "event", "achievement"] as const;

const catColors: Record<string, string> = {
  news: "bg-blue-100 text-blue-700", notice: "bg-red-100 text-red-700",
  event: "bg-green-100 text-green-700", achievement: "bg-amber-100 text-amber-700",
};

export default function NewsPage() {
  const [activeCat, setActiveCat] = useState("all");
  const { news, loading } = useNews(activeCat === "all" ? undefined : activeCat, 50);

  return (
    <div className="pt-20 min-h-screen bg-wave-gradient">
      <div className="bg-ocean-gradient text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold mb-3">News & Events</motion.h1>
          <p className="text-ocean-200 text-lg">Latest updates from the Faculty of Fisheries</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map(c => (
            <button key={c} onClick={() => setActiveCat(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                activeCat === c ? "bg-ocean-700 text-white shadow-md" : "bg-white text-ocean-600 border border-ocean-200 hover:border-ocean-400"
              }`}>
              {c === "all" ? "All" : c}
            </button>
          ))}
        </div>

        {loading ? <LoadingSpinner /> : (
          <div className="grid md:grid-cols-2 gap-5">
            {news.map((item, i) => (
              <motion.article key={item._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }} viewport={{ once: true }}
                className="card-fish overflow-hidden group">
                <div className="h-1.5 bg-ocean-gradient" />
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${catColors[item.category] || "bg-gray-100 text-gray-600"}`}>
                      {item.category.toUpperCase()}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-gray-400">
                      <FaCalendar className="text-ocean-400" />
                      {format(new Date(item.publishedAt), "dd MMM yyyy")}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-gray-900 text-sm leading-snug mb-2 group-hover:text-ocean-700 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-3 mb-3">{item.excerpt}</p>
                  <Link href={`/news/${item.slug}`} className="text-ocean-600 text-xs font-medium hover:underline">Read more →</Link>
                </div>
              </motion.article>
            ))}
            {news.length === 0 && <p className="col-span-2 text-center py-20 text-gray-400">No posts found.</p>}
          </div>
        )}
      </div>
    </div>
  );
}