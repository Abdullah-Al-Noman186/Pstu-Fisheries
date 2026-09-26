import { useState, useEffect } from "react";
import axios from "axios";

export interface Stats {
  totalUsers:    number;
  totalTeachers: number;
  totalAlumni:   number;
  totalNews:     number;
  totalResearch: number;
  byRole: {
    student: number;
    teacher: number;
    alumni:  number;
    admin:   number;
  };
  newToday:     number;
  newThisMonth: number;
  recentUsers: {
    _id:        string;
    name:       string;
    email:      string;
    role:       string;
    department?: string;
    createdAt:  string;
    photo?:     string;
  }[];
}

export function useStats() {
  const [stats, setStats]   = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/stats");
      if (data.success) setStats(data.data);
      else setError(data.error);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStats(); }, []);

  return { stats, loading, error, refetch: fetchStats };
}