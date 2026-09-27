
import { Department } from "@/types";

const styles: Record<
  Department,
  {
    badge: string;
    dot: string;
  }
> = {
  AQC: {
    badge:
      "border-blue-400/10 bg-blue-400/[0.06] text-blue-300",
    dot: "bg-blue-300",
  },

  FBG: {
    badge:
      "border-emerald-400/10 bg-emerald-400/[0.06] text-emerald-300",
    dot: "bg-emerald-300",
  },

  FMN: {
    badge:
      "border-violet-400/10 bg-violet-400/[0.06] text-violet-300",
    dot: "bg-violet-300",
  },

  FST: {
    badge:
      "border-amber-400/10 bg-amber-400/[0.06] text-amber-300",
    dot: "bg-amber-300",
  },

  MFO: {
    badge:
      "border-cyan-400/10 bg-cyan-400/[0.06] text-cyan-300",
    dot: "bg-cyan-300",
  },
};

export default function DeptBadge({
  dept,
}: {
  dept: Department;
}) {
  const style = styles[dept];

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5
        rounded-full
        border
        px-2.5
        py-1
        text-[10px]
        font-semibold
        uppercase
        tracking-[0.08em]
        backdrop-blur-sm
        transition-all
        duration-200
        ${style.badge}
      `}
    >
      <span
        className={`
          h-1.5
          w-1.5
          shrink-0
          rounded-full
          ${style.dot}
        `}
      />

      {dept}
    </span>
  );
}

