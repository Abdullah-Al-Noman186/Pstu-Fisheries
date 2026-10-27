"use client";

import Link from "next/link";
import { FaExclamationCircle, FaRedoAlt } from "react-icons/fa";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="mx-auto flex min-h-[65svh] max-w-xl flex-col items-center justify-center px-5 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF5F8] text-[#087EA4]">
        <FaExclamationCircle size={22} aria-hidden="true" />
      </div>
      <p className="eyebrow mt-6">
        A temporary issue
      </p>
      <h1 className="page-title mt-3">
        This page didn’t load
      </h1>
      <p className="page-lead mt-3">
        A temporary error interrupted this page. Try loading it again or return home.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#087EA4] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#075985]"
        >
          <FaRedoAlt size={12} aria-hidden="true" />
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex min-h-11 items-center rounded-xl border border-[#DCEBF0] bg-white px-5 text-sm font-semibold text-[#466671] transition-colors hover:bg-[#F7FAFB]"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
