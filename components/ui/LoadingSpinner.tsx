
export default function LoadingSpinner({
  message = "Loading...",
}: {
  message?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      {/* Spinner */}
      <div className="relative flex h-12 w-12 items-center justify-center">
        {/* Outer subtle ring */}
        <div className="absolute inset-0 rounded-full border border-white/[0.06]" />

        {/* Animated ring */}
        <div
          className="
            h-10 w-10
            rounded-full
            border-2
            border-white/[0.06]
            border-t-cyan-300
            animate-spin
          "
        />

        {/* Center glow */}
        <div className="absolute h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.7)]" />
      </div>

      {/* Message */}
      <p className="mt-4 text-xs font-medium tracking-wide text-slate-500">
        {message}
      </p>
    </div>
  );
}

