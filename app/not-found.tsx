import Link from "next/link";
import { FaFish } from "react-icons/fa";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[65svh] max-w-xl flex-col items-center justify-center px-5 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#DCEBF0] bg-white text-[#087EA4] shadow-sm">
        <FaFish size={22} aria-hidden="true" />
      </div>
      <p className="eyebrow mt-6">
        Page not found
      </p>
      <h1 className="page-title mt-3">
        We couldn’t find that page
      </h1>
      <p className="page-lead mt-3">
        The address may be outdated or the page may have moved.
      </p>
      <Link
        href="/"
        className="mt-7 inline-flex min-h-11 items-center rounded-xl bg-[#087EA4] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#075985]"
      >
        Return to home
      </Link>
    </section>
  );
}
