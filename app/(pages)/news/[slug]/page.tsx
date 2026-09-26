"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { News } from "@/types";
import { format } from "date-fns";
import { FaCalendar, FaUser, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const [news, setNews]       = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [slug, setSlug]       = useState("");

  useEffect(() => {
    params.then(p => {
      setSlug(p.slug);
      axios.get(`/api/news?slug=${p.slug}`)
        .then(({ data }) => { if (data.success && data.data[0]) setNews(data.data[0]); })
        .finally(() => setLoading(false));
    });
  }, [params]);

  if (loading) return <div className="pt-24"><LoadingSpinner /></div>;
  if (!news) return <div className="pt-24 text-center text-gray-400 py-20">Article not found.</div>;

  return (
    <div className="pt-20 min-h-screen bg-wave-gradient">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <Link href="/news" className="inline-flex items-center gap-2 text-ocean-600 hover:text-ocean-800 text-sm font-medium mb-8 transition-colors">
          <FaArrowLeft /> Back to News
        </Link>
        <div className="card-fish p-8">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-ocean-100 text-ocean-700 uppercase">{news.category}</span>
            <span className="flex items-center gap-1.5 text-xs text-gray-400"><FaCalendar className="text-ocean-400" /> {format(new Date(news.publishedAt), "dd MMMM yyyy")}</span>
            <span className="flex items-center gap-1.5 text-xs text-gray-400"><FaUser className="text-ocean-400" /> {news.author}</span>
          </div>
          <h1 className="font-display font-bold text-ocean-900 text-2xl md:text-3xl leading-tight mb-6">{news.title}</h1>
          <div className="prose prose-sm prose-ocean max-w-none text-gray-600 leading-relaxed whitespace-pre-line">{news.content}</div>
        </div>
      </div>
    </div>
  );
}