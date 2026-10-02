import HeroSection       from "@/components/home/HeroSection";
import StatsSection      from "@/components/home/StatsSection";
import DepartmentsSection from "@/components/home/DepartmentsSection";
import FeaturedAlumni    from "@/components/home/FeaturedAlumni";
import ArchiveSection    from "@/components/home/ArchiveSection";
import { HomeDataProvider } from "@/contexts/HomeDataContext";

export default function HomePage() {
  return (
    <HomeDataProvider>
      <HeroSection />
      <StatsSection />
      <DepartmentsSection />
      <FeaturedAlumni />
      <ArchiveSection />
    </HomeDataProvider>
  );
}
