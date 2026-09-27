
interface Props {
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function SectionHeader({
  title,
  subtitle,
  center = true,
}: Props) {
  return (
    <div
      className={`
        mb-10
        ${center ? "text-center" : "text-left"}
      `}
    >
      {/* Eyebrow / accent marker */}
      <div
        className={`
          mb-3 flex items-center gap-2
          ${center ? "justify-center" : "justify-start"}
        `}
      >
        <span className="h-px w-6 bg-cyan-300/30" />

        <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-cyan-300/50">
          PSTU · Fisheries
        </span>

        <span className="h-px w-6 bg-cyan-300/30" />
      </div>

      {/* Title */}
      <h2
        className="
          font-display
          text-2xl
          font-bold
          tracking-tight
          text-white
          sm:text-3xl
          md:text-4xl
        "
      >
        {title}
      </h2>

      {/* Minimal divider */}
      <div
        className={`
          mt-4
          flex items-center gap-2
          ${center ? "justify-center" : "justify-start"}
        `}
      >
        <span className="h-px w-10 bg-cyan-300/40" />

        <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.55)]" />

        <span className="h-px w-20 bg-gradient-to-r from-cyan-300/30 to-transparent" />
      </div>

      {/* Subtitle */}
      {subtitle && (
        <p
          className={`
            mt-4
            max-w-2xl
            text-sm
            leading-relaxed
            text-slate-500
            ${center ? "mx-auto" : ""}
          `}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

