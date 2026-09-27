
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  value: string;
  label: string;
  icon: ReactNode;
  delay?: number;
}

export default function StatCard({
  value,
  label,
  icon,
  delay = 0,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="
        group relative overflow-hidden
        rounded-2xl
        border border-white/[0.06]
        bg-white/[0.025]
        p-6
        text-center
        backdrop-blur-sm
        transition-all duration-300
        hover:-translate-y-1
        hover:border-cyan-300/[0.12]
        hover:bg-white/[0.04]
      "
    >
      {/* Ambient glow */}
      <div
        className="
          pointer-events-none
          absolute -right-16 -top-16
          h-32 w-32
          rounded-full
          bg-cyan-400/[0.035]
          blur-[60px]
          transition-all duration-500
          group-hover:bg-cyan-400/[0.07]
        "
      />

      {/* Accent line */}
      <div
        className="
          absolute left-0 top-0
          h-px w-full
          bg-gradient-to-r
          from-transparent
          via-cyan-300/30
          to-transparent
          opacity-60
          transition-opacity duration-300
          group-hover:opacity-100
        "
      />

      <div className="relative">
        {/* Icon */}
        <div
          className="
            mx-auto mb-4
            flex h-12 w-12
            items-center justify-center
            rounded-xl
            border border-cyan-400/[0.10]
            bg-cyan-400/[0.05]
            text-lg
            text-cyan-300
            transition-all duration-300
            group-hover:border-cyan-300/[0.20]
            group-hover:bg-cyan-400/[0.08]
            group-hover:shadow-[0_0_24px_rgba(34,211,238,0.08)]
          "
        >
          {icon}
        </div>

        {/* Value */}
        <p
          className="
            font-display
            text-3xl
            font-bold
            tracking-tight
            text-white
            transition-colors duration-300
            group-hover:text-cyan-100
          "
        >
          {value}
        </p>

        {/* Label */}
        <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
          {label}
        </p>
      </div>
    </motion.div>
  );
}

