
import { DEPARTMENTS, Department } from "@/types";
import { notFound } from "next/navigation";
import DeptPageContent from "@/components/departments/DeptPageContent";

export default async function DeptPage({
  params,
}: {
  params: Promise<{ dept: string }>;
}) {
  const { dept } = await params;

  const deptKey = dept.toUpperCase() as Department;
  const deptName = DEPARTMENTS[deptKey];

  if (!deptName) {
    notFound();
  }

  const deptStyles: Record<
    Department,
    {
      accent: string;
      soft: string;
      glow: string;
      description: string;
    }
  > = {
    AQC: {
      accent: "text-cyan-300",
      soft: "bg-cyan-400/[0.08]",
      glow: "bg-cyan-400/[0.04]",
      description:
        "Aquatic production, culture systems, and sustainable farming.",
    },

    FBG: {
      accent: "text-emerald-300",
      soft: "bg-emerald-400/[0.08]",
      glow: "bg-emerald-400/[0.04]",
      description:
        "Fish biology, genetics, biodiversity, and aquatic life.",
    },

    FMN: {
      accent: "text-violet-300",
      soft: "bg-violet-400/[0.08]",
      glow: "bg-violet-400/[0.04]",
      description:
        "Fisheries resources, management, conservation, and policy.",
    },

    FST: {
      accent: "text-amber-300",
      soft: "bg-amber-400/[0.08]",
      glow: "bg-amber-400/[0.04]",
      description:
        "Fish processing, quality, technology, and value addition.",
    },

    MFO: {
      accent: "text-sky-300",
      soft: "bg-sky-400/[0.08]",
      glow: "bg-sky-400/[0.04]",
      description:
        "Marine fisheries, oceanography, and coastal systems.",
    },
  };

  const style = deptStyles[deptKey];

  return (
    <DeptPageContent
      deptKey={deptKey}
      deptName={deptName}
      style={style}
    />
  );
}

