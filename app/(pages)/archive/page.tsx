"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@/contexts/AuthContext";
import { uploadToCloudinary } from "@/lib/cloudinary";

import {
  FaArchive,
  FaAward,
  FaBookOpen,
  FaCamera,
  FaCheckCircle,
  FaChevronDown,
  FaClock,
  FaCloudUploadAlt,
  FaGraduationCap,
  FaImage,
  FaLeaf,
  FaPlus,
  FaSearch,
  FaTimes,
  FaTrophy,
  FaUniversity,
  FaUser,
  FaUsers,
  FaFlask,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";

/* ============================================================
   TYPES
============================================================ */

interface ArchiveItem {
  _id?: string;
  id?: string;

  title: string;
  description: string;

  image: string;

  category:
    | "Achievement"
    | "Research"
    | "Event"
    | "Award"
    | "Fieldwork"
    | "Student Success"
    | "Faculty News";

  year?: string;
  location?: string;

  createdAt?: string;

  author?: {
    name?: string;
    email?: string;
    photo?: string;
  };

  postedBy?: string;
}

/* ============================================================
   CATEGORY CONFIG
============================================================ */

const CATEGORIES = [
  "All",
  "Achievement",
  "Research",
  "Event",
  "Award",
  "Fieldwork",
  "Student Success",
  "Faculty News",
];

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Achievement: <FaTrophy />,
  Research: <FaFlask />,
  Event: <FaCalendarAlt />,
  Award: <FaAward />,
  Fieldwork: <FaMapMarkerAlt />,
  "Student Success": <FaGraduationCap />,
  "Faculty News": <FaUniversity />,
};

const CATEGORY_COLORS: Record<string, string> = {
  Achievement:
    "bg-[#087EA4]/10 text-[#087EA4] border-[#087EA4]/10",

  Research:
    "bg-[#0891B2]/10 text-[#0891B2] border-[#0891B2]/10",

  Event:
    "bg-[#2DD4BF]/10 text-[#087EA4] border-[#2DD4BF]/10",

  Award:
    "bg-amber-50 text-amber-700 border-amber-100",

  Fieldwork:
    "bg-emerald-50 text-emerald-700 border-emerald-100",

  "Student Success":
    "bg-sky-50 text-sky-700 border-sky-100",

  "Faculty News":
    "bg-indigo-50 text-indigo-700 border-indigo-100",
};

/* ============================================================
   DEMO DATA
   Remove this once /api/archive is connected.
============================================================ */

const DEMO_ARCHIVE: ArchiveItem[] = [
  {
    id: "demo-1",
    title: "Faculty Research Achievement",
    description:
      "Our faculty members continue to contribute to fisheries and marine science research through collaborative academic work.",
    image: "/Hero.png",
    category: "Achievement",
    year: "2026",
    location: "Patuakhali",
    postedBy: "Faculty of Fisheries",
  },
  {
    id: "demo-2",
    title: "Marine Field Research",
    description:
      "Students and teachers participated in practical field activities focused on aquatic ecosystems and fisheries resources.",
    image: "/Hero.png",
    category: "Fieldwork",
    year: "2026",
    location: "Coastal Bangladesh",
    postedBy: "Faculty Community",
  },
  {
    id: "demo-3",
    title: "Student Academic Success",
    description:
      "Celebrating the academic achievements and contributions of our students across the Faculty of Fisheries.",
    image: "/Hero.png",
    category: "Student Success",
    year: "2026",
    location: "PSTU",
    postedBy: "Faculty of Fisheries",
  },
];

/* ============================================================
   MAIN PAGE
============================================================ */

export default function ArchivePage() {
  const { user } = useAuth();

  const [archive, setArchive] =
    useState<ArchiveItem[]>(DEMO_ARCHIVE);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedItem, setSelectedItem] =
    useState<ArchiveItem | null>(null);

  const [loading, setLoading] = useState(false);

  /* ==========================================================
     FORM
  ========================================================== */

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("Achievement");

  const [year, setYear] = useState(
    new Date().getFullYear().toString()
  );

  const [location, setLocation] = useState("");

  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const [imagePreview, setImagePreview] =
    useState("");

  /* ==========================================================
     LOAD ARCHIVE
  ========================================================== */

  useEffect(() => {
    const loadArchive = async () => {
      try {
        const response = await axios.get("/api/archive");

        if (
          response.data &&
          Array.isArray(response.data)
        ) {
          setArchive(response.data);
        } else if (
          response.data?.archive &&
          Array.isArray(response.data.archive)
        ) {
          setArchive(response.data.archive);
        }
      } catch {
        // Demo data remains visible when API is not connected.
      }
    };

    loadArchive();
  }, []);

  /* ==========================================================
     FILTER
  ========================================================== */

  const filteredArchive = useMemo(() => {
    const query = search.trim().toLowerCase();

    return archive.filter((item) => {
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.location?.toLowerCase().includes(query);

      const matchesCategory =
        category === "All" ||
        item.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [archive, search, category]);

  /* ==========================================================
     IMAGE SELECT
  ========================================================== */

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5MB.");
      return;
    }

    setImageFile(file);

    const preview = URL.createObjectURL(file);

    setImagePreview(preview);
  };

  /* ==========================================================
     RESET FORM
  ========================================================== */

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setSelectedCategory("Achievement");
    setYear(new Date().getFullYear().toString());
    setLocation("");
    setImageFile(null);
    setImagePreview("");
  };

  /* ==========================================================
     SUBMIT
  ========================================================== */

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!user) {
      toast.error("Please login before adding to the archive.");
      return;
    }

    if (!title.trim()) {
      toast.error("Please enter a title.");
      return;
    }

    if (!description.trim()) {
      toast.error("Please write a short description.");
      return;
    }

    if (!imageFile) {
      toast.error("Please upload an image.");
      return;
    }

    try {
      setLoading(true);

      const image = await uploadToCloudinary(imageFile);
      const response = await axios.post("/api/archive", {
        title: title.trim(),
        description: description.trim(),
        category: selectedCategory,
        year,
        location: location.trim(),
        image,
      });
      const newItem: ArchiveItem | undefined = response.data?.archive;
      if (!newItem?.title) throw new Error("The archive story was not saved.");
      setArchive((current) => [newItem, ...current]);

      toast.success(
        "Success story added to the Faculty Archive!"
      );

      resetForm();
      setShowAddModal(false);
    } catch (error: any) {
      console.error(error);

      toast.error(
        error?.response?.data?.error || error?.message || "Unable to add the archive story. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ==========================================================
     STATS
  ========================================================== */

  const achievementCount = archive.filter(
    (item) =>
      item.category === "Achievement" ||
      item.category === "Award"
  ).length;

  const eventCount = archive.filter(
    (item) => item.category === "Event"
  ).length;

  return (
    <main className="min-h-screen bg-[#F0FAFC] text-[#123B4A]">

      {/* ======================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden pt-24">

        {/* Background glow */}

        <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-[#2DD4BF]/15 blur-[130px]" />

        <div className="pointer-events-none absolute -right-40 top-0 h-[420px] w-[420px] rounded-full bg-[#087EA4]/10 blur-[140px]" />

        <div className="pointer-events-none absolute left-1/2 top-20 h-64 w-64 -translate-x-1/2 rounded-full bg-[#0891B2]/8 blur-[110px]" />

        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-14 sm:px-8 lg:px-10 lg:pb-20 lg:pt-20">

          <div className="grid items-center gap-12 lg:grid-cols-[1fr_390px]">

            {/* LEFT */}

            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
              }}
            >

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#087EA4]/10 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-xl">

                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#087EA4]/10 text-[#087EA4]">
                  <FaArchive size={10} />
                </span>

                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#087EA4]">
                  Faculty Archive
                </span>

              </div>

              <h1 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-tight text-[#123B4A] sm:text-5xl lg:text-6xl">

                Stories that{" "}

                <span className="relative inline-block text-[#087EA4]">

                  define us

                  <span className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-[#2DD4BF]/50" />

                </span>

              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-[#55727D] sm:text-lg">

                Explore the achievements, research, fieldwork,
                events and memorable moments that shape the
                Faculty of Fisheries.

              </p>

              <div className="mt-8 flex flex-wrap gap-3">

                <StatCard
                  icon={<FaArchive />}
                  value={archive.length}
                  label="Archive Stories"
                />

                <StatCard
                  icon={<FaTrophy />}
                  value={achievementCount}
                  label="Achievements"
                />

                <StatCard
                  icon={<FaCalendarAlt />}
                  value={eventCount}
                  label="Events"
                />

              </div>

            </motion.div>

            {/* RIGHT VISUAL */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.94,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.7,
                delay: 0.1,
              }}
              className="relative hidden lg:block"
            >

              <div className="relative mx-auto aspect-square max-w-[350px]">

                <div className="absolute inset-4 rounded-[3rem] bg-gradient-to-br from-[#087EA4]/15 via-[#2DD4BF]/10 to-transparent blur-2xl" />

                <div className="absolute inset-0 rotate-6 rounded-[3rem] border border-[#087EA4]/8 bg-white/40" />

                <div className="absolute inset-0 overflow-hidden rounded-[3rem] border border-white/80 bg-white/75 p-7 shadow-[0_30px_80px_rgba(7,89,133,0.13)] backdrop-blur-2xl">

                  <div className="flex h-full flex-col items-center justify-center text-center">

                    <div className="relative">

                      <div className="absolute inset-0 rounded-full bg-[#2DD4BF]/20 blur-2xl" />

                      <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-[#087EA4]/10 bg-gradient-to-br from-[#087EA4]/10 to-[#2DD4BF]/10 text-[#087EA4]">
                        <FaArchive size={44} />
                      </div>

                    </div>

                    <h2 className="mt-7 text-2xl font-black text-[#123B4A]">
                      Our Story
                    </h2>

                    <p className="mt-2 max-w-[230px] text-xs leading-6 text-[#55727D]">
                      A living collection of the moments,
                      achievements and memories of our
                      Faculty.
                    </p>

                    <div className="mt-6 flex items-center gap-2 rounded-full bg-[#2DD4BF]/10 px-4 py-2">

                      <FaCheckCircle
                        className="text-[#0891B2]"
                        size={11}
                      />

                      <span className="text-[10px] font-bold text-[#087EA4]">
                        Faculty Community
                      </span>

                    </div>

                  </div>

                </div>

              </div>

            </motion.div>

          </div>

        </div>

      </section>

      {/* ======================================================
          ARCHIVE
      ====================================================== */}

      <section className="border-t border-[#087EA4]/6 bg-white/55 py-12 sm:py-16">

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          {/* HEADER */}

          <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <div>

              <div className="mb-2 flex items-center gap-2">

                <span className="h-1.5 w-1.5 rounded-full bg-[#2DD4BF]" />

                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#087EA4]">
                  Explore
                </span>

              </div>

              <h2 className="text-2xl font-black tracking-tight text-[#123B4A] sm:text-3xl">
                Faculty Archive
              </h2>

              <p className="mt-2 text-sm text-[#55727D]">
                Discover stories and moments from our
                faculty community.
              </p>

            </div>

            {/* ADD */}

            {user ? (
              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="
                  inline-flex items-center justify-center gap-2
                  rounded-2xl
                  bg-[#087EA4]
                  px-5 py-3
                  text-xs font-black
                  text-white
                  shadow-[0_8px_25px_rgba(8,126,164,0.20)]
                  transition-all
                  hover:-translate-y-0.5
                  hover:bg-[#075985]
                "
              >
                <FaPlus size={10} />
                Add to Archive
              </button>
            ) : (
              <div className="rounded-2xl border border-[#087EA4]/10 bg-white px-4 py-3 text-xs font-semibold text-[#55727D] shadow-sm">
                Login to share a faculty story
              </div>
            )}

          </div>

          {/* SEARCH */}

          <div className="mb-8 rounded-3xl border border-[#087EA4]/10 bg-white/90 p-3 shadow-[0_12px_45px_rgba(7,89,133,0.07)] backdrop-blur-xl">

            <div className="flex flex-col gap-3 md:flex-row">

              <div className="relative flex-1">

                <FaSearch
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#087EA4]/60"
                  size={13}
                />

                <input
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search archive stories..."
                  className="
                    h-12 w-full rounded-2xl
                    border border-[#087EA4]/8
                    bg-[#F0FAFC]/60
                    pl-11 pr-4
                    text-sm font-medium
                    text-[#123B4A]
                    outline-none
                    transition
                    placeholder:text-[#55727D]/55
                    focus:border-[#087EA4]/30
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[#087EA4]/5
                  "
                />

              </div>

              <div className="relative min-w-[210px]">

                <select
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value)
                  }
                  className="
                    h-12 w-full
                    appearance-none
                    rounded-2xl
                    border border-[#087EA4]/8
                    bg-[#F0FAFC]/60
                    px-4 pr-10
                    text-sm font-semibold
                    text-[#123B4A]
                    outline-none
                    focus:border-[#087EA4]/30
                    focus:bg-white
                  "
                >

                  {CATEGORIES.map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item === "All"
                        ? "All Categories"
                        : item}
                    </option>
                  ))}

                </select>

                <FaChevronDown
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#55727D]"
                  size={10}
                />

              </div>

            </div>

          </div>

          {/* GRID */}

          {filteredArchive.length > 0 ? (

            <motion.div
              layout
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >

              {filteredArchive.map(
                (item, index) => (
                  <ArchiveCard
                    key={
                      item._id ||
                      item.id ||
                      `${item.title}-${index}`
                    }
                    item={item}
                    index={index}
                    onClick={() =>
                      setSelectedItem(item)
                    }
                  />
                )
              )}

            </motion.div>

          ) : (

            <div className="rounded-3xl border border-[#087EA4]/10 bg-white px-6 py-16 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#087EA4]/8 text-[#087EA4]">
                <FaArchive size={20} />
              </div>

              <h3 className="mt-5 text-lg font-black">
                No archive stories found
              </h3>

              <p className="mt-2 text-sm text-[#55727D]">
                Try a different search or category.
              </p>

            </div>

          )}

        </div>

      </section>

      {/* ======================================================
          ADD MODAL
      ====================================================== */}

      <AnimatePresence>

        {showAddModal && user && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
              fixed inset-0 z-[100]
              flex items-center justify-center
              bg-[#123B4A]/40
              p-4
              backdrop-blur-md
            "
            onMouseDown={(event) => {
              if (
                event.target === event.currentTarget
              ) {
                setShowAddModal(false);
              }
            }}
          >

            <motion.div
              initial={{
                opacity: 0,
                y: 25,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 15,
                scale: 0.97,
              }}
              className="
                max-h-[92vh]
                w-full max-w-2xl
                overflow-y-auto
                rounded-[2rem]
                border border-white
                bg-white
                shadow-[0_30px_100px_rgba(7,89,133,0.25)]
              "
            >

              {/* MODAL HEADER */}

              <div className="relative overflow-hidden border-b border-[#087EA4]/8 bg-gradient-to-br from-[#F0FAFC] via-white to-[#E9FBF8] px-6 py-6">

                <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#2DD4BF]/15 blur-[70px]" />

                <div className="relative flex items-start justify-between">

                  <div>

                    <div className="mb-2 flex items-center gap-2">

                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#087EA4]/10 text-[#087EA4]">
                        <FaPlus size={10} />
                      </span>

                      <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#087EA4]">
                        Share with Faculty
                      </span>

                    </div>

                    <h2 className="text-xl font-black text-[#123B4A]">
                      Add to Archive
                    </h2>

                    <p className="mt-1 text-xs text-[#55727D]">
                      Share a success, achievement,
                      event or memorable moment.
                    </p>

                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setShowAddModal(false)
                    }
                    className="
                      flex h-9 w-9
                      items-center justify-center
                      rounded-xl
                      border border-[#087EA4]/8
                      bg-white
                      text-[#55727D]
                      shadow-sm
                      hover:bg-[#F0FAFC]
                      hover:text-[#087EA4]
                    "
                  >
                    <FaTimes size={12} />
                  </button>

                </div>

              </div>

              {/* FORM */}

              <form
                onSubmit={handleSubmit}
                className="space-y-5 p-6"
              >

                {/* IMAGE */}

                <div>

                  <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.15em] text-[#55727D]">
                    Featured Image
                  </label>

                  <label
                    className="
                      relative block cursor-pointer
                      overflow-hidden
                      rounded-2xl
                      border-2 border-dashed
                      border-[#087EA4]/15
                      bg-[#F0FAFC]/60
                      transition
                      hover:border-[#087EA4]/30
                      hover:bg-[#F0FAFC]
                    "
                  >

                    {imagePreview ? (

                      <div className="relative h-64">

                        <Image
                          src={imagePreview}
                          alt="Preview"
                          fill
                          unoptimized
                          className="object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-[#123B4A]/60 to-transparent" />

                        <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-[10px] font-bold text-[#087EA4] backdrop-blur">
                          <FaCamera size={9} />
                          Change image
                        </div>

                      </div>

                    ) : (

                      <div className="flex h-52 flex-col items-center justify-center px-5 text-center">

                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#087EA4] shadow-sm">
                          <FaCloudUploadAlt size={23} />
                        </div>

                        <p className="mt-4 text-sm font-black text-[#123B4A]">
                          Upload a faculty moment
                        </p>

                        <p className="mt-1 text-xs text-[#55727D]">
                          JPG, PNG or WebP · Maximum 5MB
                        </p>

                      </div>

                    )}

                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleImageChange}
                      className="hidden"
                    />

                  </label>

                </div>

                {/* TITLE */}

                <FormField label="Title">

                  <input
                    value={title}
                    onChange={(event) =>
                      setTitle(event.target.value)
                    }
                    placeholder="e.g. Faculty Research Achievement"
                    className={inputClass}
                  />

                </FormField>

                {/* CATEGORY + YEAR */}

                <div className="grid gap-4 sm:grid-cols-2">

                  <FormField label="Category">

                    <select
                      value={selectedCategory}
                      onChange={(event) =>
                        setSelectedCategory(
                          event.target.value
                        )
                      }
                      className={inputClass}
                    >

                      {CATEGORIES.filter(
                        (item) => item !== "All"
                      ).map((item) => (
                        <option
                          key={item}
                          value={item}
                        >
                          {item}
                        </option>
                      ))}

                    </select>

                  </FormField>

                  <FormField label="Year">

                    <input
                      value={year}
                      onChange={(event) =>
                        setYear(event.target.value)
                      }
                      placeholder="2026"
                      className={inputClass}
                    />

                  </FormField>

                </div>

                {/* LOCATION */}

                <FormField label="Location (Optional)">

                  <input
                    value={location}
                    onChange={(event) =>
                      setLocation(event.target.value)
                    }
                    placeholder="e.g. PSTU, Patuakhali"
                    className={inputClass}
                  />

                </FormField>

                {/* DESCRIPTION */}

                <FormField label="Story / Description">

                  <textarea
                    value={description}
                    onChange={(event) =>
                      setDescription(
                        event.target.value
                      )
                    }
                    rows={5}
                    placeholder="Tell the faculty community about this achievement, event or memorable moment..."
                    className={`${inputClass} resize-none py-3`}
                  />

                </FormField>

                {/* USER */}

                <div className="flex items-center gap-3 rounded-2xl border border-[#087EA4]/8 bg-[#F0FAFC]/60 p-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#087EA4] shadow-sm">
                    <FaUser size={12} />
                  </div>

                  <div className="min-w-0">

                    <p className="text-[9px] font-bold uppercase tracking-wider text-[#55727D]">
                      Posting as
                    </p>

                    <p className="truncate text-xs font-black text-[#123B4A]">
                      {user.name ||
                        user.email ||
                        "Faculty Community Member"}
                    </p>

                  </div>

                  <FaCheckCircle
                    className="ml-auto text-[#0891B2]"
                    size={13}
                  />

                </div>

                {/* SUBMIT */}

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    flex h-12 w-full
                    items-center justify-center gap-2
                    rounded-2xl
                    bg-[#087EA4]
                    text-xs font-black
                    text-white
                    shadow-[0_8px_25px_rgba(8,126,164,0.20)]
                    transition
                    hover:bg-[#075985]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >

                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Publishing...
                    </>
                  ) : (
                    <>
                      <FaCloudUploadAlt size={12} />
                      Publish to Faculty Archive
                    </>
                  )}

                </button>

              </form>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

      {/* ======================================================
          DETAIL MODAL
      ====================================================== */}

      <AnimatePresence>

        {selectedItem && (

          <ArchiveDetailModal
            item={selectedItem}
            onClose={() =>
              setSelectedItem(null)
            }
          />

        )}

      </AnimatePresence>

    </main>
  );
}

/* ============================================================
   STAT CARD
============================================================ */

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-[#087EA4]/10 bg-white/85 px-5 py-3.5 shadow-[0_8px_30px_rgba(7,89,133,0.06)] backdrop-blur-xl">

      <div className="flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#087EA4]/10 text-[#087EA4]">
          {icon}
        </div>

        <div>

          <p className="text-lg font-black text-[#123B4A]">
            {value}
          </p>

          <p className="text-[9px] font-bold uppercase tracking-wider text-[#55727D]">
            {label}
          </p>

        </div>

      </div>

    </div>
  );
}

/* ============================================================
   ARCHIVE CARD
============================================================ */

function ArchiveCard({
  item,
  index,
  onClick,
}: {
  item: ArchiveItem;
  index: number;
  onClick: () => void;
}) {
  const categoryClass =
    CATEGORY_COLORS[item.category] ||
    "bg-[#087EA4]/10 text-[#087EA4] border-[#087EA4]/10";

  return (
    <motion.button
      type="button"
      layout
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        margin: "-40px",
      }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.05, 0.25),
      }}
      whileHover={{
        y: -6,
      }}
      onClick={onClick}
      className="
        group overflow-hidden
        rounded-3xl
        border border-[#087EA4]/10
        bg-white
        text-left
        shadow-[0_8px_30px_rgba(7,89,133,0.06)]
        transition-all
        hover:border-[#087EA4]/20
        hover:shadow-[0_20px_55px_rgba(7,89,133,0.12)]
      "
    >

      {/* IMAGE */}

      <div className="relative h-60 overflow-hidden">

        <Image
          src={item.image || "/Hero.png"}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#123B4A]/75 via-transparent to-transparent" />

        {/* CATEGORY */}

        <div
          className={`
            absolute left-4 top-4
            flex items-center gap-1.5
            rounded-full
            border
            px-3 py-1.5
            text-[9px]
            font-black
            uppercase
            tracking-wider
            backdrop-blur-md
            ${categoryClass}
          `}
        >

          {CATEGORY_ICONS[item.category]}

          {item.category}

        </div>

        {/* YEAR */}

        {item.year && (
          <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[9px] font-black text-[#123B4A] backdrop-blur">
            {item.year}
          </div>
        )}

        {/* BOTTOM IMAGE TEXT */}

        <div className="absolute bottom-4 left-4 right-4">

          <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/70">
            Faculty Archive
          </p>

        </div>

      </div>

      {/* CONTENT */}

      <div className="p-5">

        <h3 className="line-clamp-2 text-base font-black leading-6 text-[#123B4A]">
          {item.title}
        </h3>

        <p className="mt-2 line-clamp-3 text-xs leading-6 text-[#55727D]">
          {item.description}
        </p>

        {/* META */}

        <div className="mt-5 flex items-center justify-between border-t border-[#087EA4]/7 pt-4">

          <div className="flex min-w-0 items-center gap-2">

            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#F0FAFC] text-[#087EA4]">
              <FaUser size={9} />
            </div>

            <div className="min-w-0">

              <p className="truncate text-[9px] font-bold text-[#123B4A]">
                {item.author?.name ||
                  item.postedBy ||
                  "Faculty Community"}
              </p>

              {item.location && (
                <p className="truncate text-[8px] text-[#55727D]">
                  {item.location}
                </p>
              )}

            </div>

          </div>

          <span className="text-[10px] font-black text-[#087EA4] transition group-hover:translate-x-1">
            View →
          </span>

        </div>

      </div>

    </motion.button>
  );
}

/* ============================================================
   FORM FIELD
============================================================ */

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>

      <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.15em] text-[#55727D]">
        {label}
      </label>

      {children}

    </div>
  );
}

/* ============================================================
   INPUT STYLE
============================================================ */

const inputClass = `
  h-12 w-full
  rounded-2xl
  border border-[#087EA4]/10
  bg-[#F0FAFC]/60
  px-4
  text-sm font-medium
  text-[#123B4A]
  outline-none
  transition
  placeholder:text-[#55727D]/50
  focus:border-[#087EA4]/30
  focus:bg-white
  focus:ring-4
  focus:ring-[#087EA4]/5
`;

/* ============================================================
   DETAIL MODAL
============================================================ */

function ArchiveDetailModal({
  item,
  onClose,
}: {
  item: ArchiveItem;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="
        fixed inset-0 z-[110]
        flex items-center justify-center
        bg-[#123B4A]/45
        p-4
        backdrop-blur-md
      "
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget
        ) {
          onClose();
        }
      }}
    >

      <motion.div
        initial={{
          opacity: 0,
          y: 25,
          scale: 0.97,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: 15,
          scale: 0.97,
        }}
        className="
          max-h-[90vh]
          w-full max-w-3xl
          overflow-y-auto
          rounded-[2rem]
          bg-white
          shadow-[0_30px_100px_rgba(7,89,133,0.25)]
        "
      >

        <div className="relative h-72 overflow-hidden sm:h-96">

          <Image
            src={item.image || "/Hero.png"}
            alt={item.title}
            fill
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#123B4A]/80 via-transparent to-transparent" />

          <button
            type="button"
            onClick={onClose}
            className="
              absolute right-4 top-4
              flex h-10 w-10
              items-center justify-center
              rounded-xl
              bg-white/90
              text-[#55727D]
              shadow-lg
              backdrop-blur
              hover:text-[#087EA4]
            "
          >
            <FaTimes size={12} />
          </button>

          <div className="absolute bottom-5 left-5 right-5">

            <div className="mb-3 flex flex-wrap gap-2">

              <span
                className={`
                  flex items-center gap-1.5
                  rounded-full
                  border
                  px-3 py-1.5
                  text-[9px]
                  font-black
                  uppercase
                  tracking-wider
                  backdrop-blur
                  ${CATEGORY_COLORS[item.category]}
                `}
              >
                {CATEGORY_ICONS[item.category]}
                {item.category}
              </span>

              {item.year && (
                <span className="rounded-full bg-white/90 px-3 py-1.5 text-[9px] font-black text-[#123B4A] backdrop-blur">
                  {item.year}
                </span>
              )}

            </div>

            <h2 className="max-w-2xl text-2xl font-black leading-tight text-white sm:text-3xl">
              {item.title}
            </h2>

          </div>

        </div>

        <div className="p-6 sm:p-8">

          <p className="text-sm leading-7 text-[#55727D]">
            {item.description}
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">

            <div className="rounded-2xl border border-[#087EA4]/8 bg-[#F0FAFC]/60 p-4">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#087EA4] shadow-sm">
                  <FaUser size={11} />
                </div>

                <div>

                  <p className="text-[8px] font-bold uppercase tracking-wider text-[#55727D]">
                    Shared by
                  </p>

                  <p className="mt-1 text-xs font-black text-[#123B4A]">
                    {item.author?.name ||
                      item.postedBy ||
                      "Faculty Community"}
                  </p>

                </div>

              </div>

            </div>

            {item.location && (
              <div className="rounded-2xl border border-[#087EA4]/8 bg-[#F0FAFC]/60 p-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#087EA4] shadow-sm">
                    <FaMapMarkerAlt size={11} />
                  </div>

                  <div>

                    <p className="text-[8px] font-bold uppercase tracking-wider text-[#55727D]">
                      Location
                    </p>

                    <p className="mt-1 text-xs font-black text-[#123B4A]">
                      {item.location}
                    </p>

                  </div>

                </div>

              </div>
            )}

          </div>

        </div>

      </motion.div>

    </motion.div>
  );
}
