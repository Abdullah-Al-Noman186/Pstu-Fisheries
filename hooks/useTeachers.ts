import { useState, useEffect } from "react";
import axios from "axios";
import { Teacher } from "@/types";

export function useTeachers(department?: string) {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);

  useEffect(() => {
    const url = department ? `/api/teachers?department=${department}` : "/api/teachers";
    axios.get(url)
      .then(({ data }) => { if (data.success) setTeachers(data.data); })
      .catch(() => setError("Failed to load teachers"))
      .finally(() => setLoading(false));
  }, [department]);

  return { teachers, loading, error };
}