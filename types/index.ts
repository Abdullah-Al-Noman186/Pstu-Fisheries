export type Department = "AQC" | "FBG" | "FMN" | "FST" | "MFO";

export const DEPARTMENTS: Record<Department, string> = {
  AQC: "Aquaculture",
  FBG: "Fisheries Biology & Genetics",
  FMN: "Fisheries Management",
  FST: "Fisheries Technology",
  MFO: "Marine Fisheries & Oceanography"
};

// Teacher comes from Profile with role=teacher
export interface Teacher {
  _id: string;
  uid?: string;
  name: string;
  designation?: string;
  department?: Department;
  email: string;
  phone?: string;
  photo?: string;
  bio?: string;
  education?: { degree: string; institution: string; year: number }[];
  publications?: number;
  researchAreas?: string[];
  joinYear?: number;
  isHOD?: boolean;
  order?: number;
  role?: "teacher";
}

// Alumni comes from Profile with role=alumni
export interface Alumni {
  _id: string;
  uid: string;
  name: string;
  email?: string;
  photo?: string;
  phone?: string;           // ← add this
  contact?: string;
  department?: Department;
  batch?: number;
  currentPosition?: string;
  organization?: string;
  location?: string;
  linkedin?: string;
  achievements?: string[];
  testimonial?: string;
  bio?: string;
  role: "alumni";
}

export interface News {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image?: string;
  category: "news" | "notice" | "event" | "achievement";
  department?: string;
  publishedAt: string;
  author: string;
}

export interface Research {
  _id: string;
  title: string;
  authors: string[];
  department: string;
  journal?: string;
  year: number;
  abstract?: string;
  link?: string;
  type: "journal" | "conference" | "thesis" | "book";
}

export interface User {
  uid: string;
  name: string;
  email: string;
  photo?: string;
  role: "admin" | "teacher" | "alumni" | "student";
  department?: string;
}
