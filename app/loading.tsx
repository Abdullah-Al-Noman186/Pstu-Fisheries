export default function Loading() {
  return (
    <section
      aria-label="Loading page"
      aria-busy="true"
      className="mx-auto min-h-[65svh] max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8"
    >
      <div className="h-4 w-32 animate-pulse rounded-full bg-[#DCEBF0]" />
      <div className="mt-5 h-10 max-w-md animate-pulse rounded-xl bg-[#DCEBF0] sm:h-12" />
      <div className="mt-4 h-4 max-w-xl animate-pulse rounded-full bg-[#E7F0F3]" />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="h-52 animate-pulse rounded-2xl border border-[#DCEBF0] bg-white/80"
          />
        ))}
      </div>
      <span className="sr-only">Loading page content…</span>
    </section>
  );
}
