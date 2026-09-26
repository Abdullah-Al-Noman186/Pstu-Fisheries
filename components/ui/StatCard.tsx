"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props { value: string; label: string; icon: ReactNode; delay?: number; }

export default function StatCard({ value, label, icon, delay = 0 }: Props) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }} viewport={{ once: true }}
      className="bg-white rounded-2xl p-6 text-center shadow-md border border-ocean-100 hover:shadow-lg transition-shadow">
      <div className="w-14 h-14 bg-ocean-50 rounded-full flex items-center justify-center mx-auto mb-4 text-ocean-600 text-2xl">
        {icon}
      </div>
      <p className="text-3xl font-display font-bold text-ocean-900 mb-1">{value}</p>
      <p className="text-sm text-ocean-500">{label}</p>
    </motion.div>
  );
}