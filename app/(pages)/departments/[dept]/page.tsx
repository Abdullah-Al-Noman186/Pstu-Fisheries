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
      accent: "text-[#087EA4]",
      soft: "bg-[#0891B2]/[0.08]",
      glow: "bg-[#2DD4BF]/[0.10]",
      description:
        "Aquatic production, culture systems, and sustainable farming.",
    },

    FBG: {
      accent: "text-[#075985]",
      soft: "bg-[#087EA4]/[0.08]",
      glow: "bg-[#2DD4BF]/[0.10]",
      description:
        "Fish biology, genetics, biodiversity, and aquatic life.",
    },

    FMN: {
      accent: "text-[#087EA4]",
      soft: "bg-[#0891B2]/[0.08]",
      glow: "bg-[#087EA4]/[0.06]",
      description:
        "Fisheries resources, management, conservation, and policy.",
    },

    FST: {
      accent: "text-[#075985]",
      soft: "bg-[#2DD4BF]/[0.10]",
      glow: "bg-[#0891B2]/[0.06]",
      description:
        "Fish processing, quality, technology, and value addition.",
    },

    MFO: {
      accent: "text-[#087EA4]",
      soft: "bg-[#0891B2]/[0.08]",
      glow: "bg-[#075985]/[0.06]",
      description:
        "Marine fisheries, oceanography, and coastal systems.",
    },
  };

  const style = deptStyles[deptKey];

  return (
    <div className="min-h-screen bg-[#F0FAFC] text-[#123B4A]">
      <DeptPageContent
        deptKey={deptKey}
        deptName={deptName}
        style={style}
      />
    </div>
  );
}