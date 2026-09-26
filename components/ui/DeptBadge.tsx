import { DEPARTMENTS, Department } from "@/types";

const colors: Record<Department, string> = {
  AQC: "bg-blue-100 text-blue-700",
  FBG: "bg-emerald-100 text-emerald-700",
  FMN: "bg-violet-100 text-violet-700",
  FST: "bg-amber-100 text-amber-700",
  MFO: "bg-cyan-100 text-cyan-700",
};

export default function DeptBadge({ dept }: { dept: Department }) {
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colors[dept]}`}>
      {dept}
    </span>
  );
}