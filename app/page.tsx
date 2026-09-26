import HeroSection       from "@/components/home/HeroSection";
import StatsSection      from "@/components/home/StatsSection";
import DepartmentsSection from "@/components/home/DepartmentsSection";
import FeaturedAlumni    from "@/components/home/FeaturedAlumni";
import NewsSection       from "@/components/home/NewsSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <DepartmentsSection />
      <FeaturedAlumni />
      <NewsSection />
    </>
  );
}