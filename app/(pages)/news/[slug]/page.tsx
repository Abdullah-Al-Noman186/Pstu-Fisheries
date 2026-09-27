
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { News } from "@/types";
import { format } from "date-fns";
import {
  FaCalendar,
  FaUser,
  FaArrowLeft,
  FaNewspaper,
} from "react-icons/fa";
import Link from "next/link";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [slug, setSlug] = useState("");

  useEffect(() => {
    params.then((p) => {
      setSlug(p.slug);

      axios
        .get(`/api/news?slug=${p.slug}`)
        .then(({ data }) => {
          if (data.success && data.data[0]) {
            setNews(data.data[0]);
          }
        })
        .catch(() => {
          setNews(null);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  }, [params]);

  /* =========================================================
     LOADING
  ========================================================= */
  if (loading) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F0FAFC] pt-20">
        {/* Background atmosphere */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#0891B2]/[0.06] blur-[130px]" />

          <div className="absolute -right-40 top-[35%] h-[500px] w-[500px] rounded-full bg-[#2DD4BF]/[0.06] blur-[140px]" />
        </div>

        <div className="relative">
          <LoadingSpinner />
        </div>
      </main>
    );
  }

  /* =========================================================
     NOT FOUND
  ========================================================= */
  if (!news) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[#F0FAFC] pt-20 text-[#123B4A]">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#0891B2]/[0.06] blur-[130px]" />

          <div className="absolute -right-40 top-[35%] h-[500px] w-[500px] rounded-full bg-[#2DD4BF]/[0.06] blur-[140px]" />

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(8,126,164,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(8,126,164,0.5) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="relative mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#087EA4]/10 bg-white shadow-[0_15px_40px_rgba(8,126,164,0.07)]">
            <FaNewspaper className="text-xl text-[#087EA4]/60" />
          </div>

          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#087EA4]">
            Faculty News
          </p>

          <h1 className="font-display text-2xl font-bold text-[#123B4A] sm:text-3xl">
            Article not found
          </h1>

          <p className="mt-3 max-w-md text-sm leading-relaxed text-[#55727D]">
            The article you are looking for may have been removed or is no
            longer available.
          </p>

          <Link
            href="/news"
            className="group mt-8 inline-flex items-center gap-2 rounded-xl border border-[#087EA4]/15 bg-white px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#087EA4] shadow-sm transition-all duration-200 hover:border-[#087EA4]/25 hover:bg-[#F0FAFC] hover:shadow-md"
          >
            <FaArrowLeft
              size={9}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            Back to News
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F0FAFC] pt-20 text-[#123B4A]">
      {/* =====================================================
          ATMOSPHERIC OCEAN BACKGROUND
      ====================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top-left ocean glow */}
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#0891B2]/[0.07] blur-[130px]" />

        {/* Right aqua glow */}
        <div className="absolute -right-40 top-[35%] h-[520px] w-[520px] rounded-full bg-[#2DD4BF]/[0.07] blur-[140px]" />

        {/* Bottom glow */}
        <div className="absolute -bottom-60 left-[30%] h-[500px] w-[500px] rounded-full bg-[#087EA4]/[0.045] blur-[140px]" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(8,126,164,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(8,126,164,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* =====================================================
          ARTICLE
      ====================================================== */}
      <section className="relative px-4 py-12 sm:px-6 md:py-16">
        <div className="mx-auto max-w-3xl">
          {/* Back navigation */}
          <Link
            href="/news"
            className="group mb-10 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#55727D] transition-colors hover:text-[#087EA4]"
          >
            <FaArrowLeft
              size={10}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            Back to News
          </Link>

          {/* Article card */}
          <article className="relative overflow-hidden rounded-3xl border border-[#087EA4]/10 bg-white/80 shadow-[0_20px_60px_rgba(8,126,164,0.07)] backdrop-blur-sm">
            {/* Ocean accent */}
            <div className="h-1 w-full bg-gradient-to-r from-[#075985] via-[#087EA4] to-[#2DD4BF]" />

            <div className="p-6 sm:p-8 md:p-10">
              {/* =================================================
                  ARTICLE META
              ================================================== */}
              <div className="mb-6 flex flex-wrap items-center gap-3">
                {/* Category */}
                <span className="rounded-md border border-[#0891B2]/15 bg-[#0891B2]/[0.08] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#087EA4]">
                  {news.category}
                </span>

                {/* Date */}
                <span className="flex items-center gap-1.5 text-xs font-medium text-[#55727D]">
                  <FaCalendar className="text-[#0891B2]/70" />

                  {format(
                    new Date(news.publishedAt),
                    "dd MMMM yyyy"
                  )}
                </span>

                {/* Author */}
                <span className="flex items-center gap-1.5 text-xs font-medium text-[#55727D]">
                  <FaUser className="text-[#0891B2]/70" />

                  {news.author}
                </span>
              </div>

              {/* =================================================
                  TITLE
              ================================================== */}
              <h1 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-[#123B4A] sm:text-4xl md:text-[2.7rem]">
                {news.title}
              </h1>

              {/* Divider */}
              <div className="my-7 h-px bg-gradient-to-r from-[#087EA4]/15 via-[#0891B2]/10 to-transparent" />

              {/* =================================================
                  ARTICLE CONTENT
              ================================================== */}
              <div className="whitespace-pre-line text-sm leading-[1.9] text-[#55727D] sm:text-base">
                {news.content}
              </div>

              {/* =================================================
                  ARTICLE FOOTER
              ================================================== */}
              <div className="mt-10 border-t border-[#087EA4]/10 pt-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#55727D]">
                      Published by
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#123B4A]">
                      {news.author}
                    </p>
                  </div>

                  <Link
                    href="/news"
                    className="group inline-flex items-center gap-2 self-start rounded-xl border border-[#087EA4]/10 bg-[#F0FAFC] px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#087EA4] transition-all duration-200 hover:border-[#087EA4]/20 hover:bg-white hover:shadow-sm sm:self-auto"
                  >
                    All News

                    {/* <FaArrowRight
                      size={8}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    /> */}
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* =====================================================
          BOTTOM NAVIGATION
      ====================================================== */}
      <section className="relative border-t border-[#087EA4]/10 bg-white/40 px-4 py-10 sm:px-6">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <Link
            href="/news"
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#55727D] transition-colors hover:text-[#087EA4]"
          >
            <FaArrowLeft
              size={9}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            News
          </Link>

          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#087EA4] opacity-70">
            ARTICLE

            {/* <FaArrowRight size={8} /> */}
          </div>
        </div>
      </section>
    </main>
  );
}

