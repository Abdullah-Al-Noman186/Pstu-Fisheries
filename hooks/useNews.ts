import { useState, useEffect } from "react";
import axios from "axios";
import { News } from "@/types";

export function useNews(category?: string, limit?: number) {
  const [news, setNews]       = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = new URLSearchParams();
    if (category) q.set("category", category);
    if (limit)    q.set("limit", String(limit));
    axios.get(`/api/news?${q.toString()}`)
      .then(({ data }) => { if (data.success) setNews(data.data); })
      .finally(() => setLoading(false));
  }, [category, limit]);

  return { news, loading };
}