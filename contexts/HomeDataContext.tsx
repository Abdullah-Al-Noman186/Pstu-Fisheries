"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Alumni } from "@/types";

export type HomeArchiveStory = {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  image?: string;
  category: string;
  year?: string;
  location?: string;
  createdAt?: string;
};

export type HomeData = {
  stats: { totalStudents: number; totalAlumni: number; totalTeachers: number; totalArchive: number };
  batches: { batch: string; count: number }[];
  featuredAlumni: Alumni[];
  archive: HomeArchiveStory[];
};

type HomeDataState = { data: HomeData | null; loading: boolean };
const HomeDataContext = createContext<HomeDataState>({ data: null, loading: true });

export function HomeDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/home")
      .then((response) => {
        if (response.data?.success && response.data.data) setData(response.data.data);
      })
      .catch((error) => console.error("Could not load homepage data:", error))
      .finally(() => setLoading(false));
  }, []);

  return <HomeDataContext.Provider value={{ data, loading }}>{children}</HomeDataContext.Provider>;
}

export function useHomeData() {
  return useContext(HomeDataContext);
}
