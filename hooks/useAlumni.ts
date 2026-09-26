import { useState, useEffect } from "react";
import axios from "axios";
import { Alumni } from "@/types";

export function useAlumni(params?: { department?: string; featured?: boolean }) {
  const [alumni, setAlumni]   = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    const q = new URLSearchParams();
    if (params?.department) q.set("department", params.department);
    if (params?.featured)   q.set("featured", "true");
    axios.get(`/api/alumni?${q.toString()}`)
      .then(({ data }) => { if (data.success) setAlumni(data.data); })
      .catch(() => setError("Failed to load alumni"))
      .finally(() => setLoading(false));
  }, [params?.department, params?.featured]);

  return { alumni, loading, error };
}