"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { format } from "date-fns";
import { FaCalendar, FaArrowRight } from "react-icons/fa";
import { useNews } from "@/hooks/useNews";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const categoryColors: Record<string, string> = {
  news:        "bg-blue-100 text-blue-700",
  notice:      "bg-red-100 text-red-700",
  event:       "bg-green-100 text-green-700",
  achievement: "bg-amber-100 text-amber-700",
};

export default function NewsSection() {
  const { news, loading } = useNews(undefined, 6);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} viewport={{ once: true }} className="flex items-end justify-between mb-12">
          <div>
            <h2 className="section-title text-left">News & Events</h2>
            <div className="wave-divider" />
          </div>
          <Link href="/news" className="hidden md:flex items-center gap-2 text-ocean-600 hover:text-ocean-800 font-medium text-sm transition-colors">
            All News <FaArrowRight />
          </Link>
        </motion.div>

        {loading ? <LoadingSpinner /> : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.slice(0, 6).map((item, i) => (
              <motion.article key={item._id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}
                className="card-fish overflow-hidden group">
                <div className="h-2 bg-ocean-gradient" />
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[item.category] || "bg-gray-100 text-gray-600"}`}>
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
                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-3 mb-4">{item.excerpt}</p>
                  <Link href={`/news/${item.slug}`}
                    className="inline-flex items-center gap-1.5 text-ocean-600 text-xs font-medium hover:gap-3 transition-all">
                    Read more <FaArrowRight className="text-xs" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}