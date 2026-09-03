import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PortfolioHero from "@/components/sections/portfolio/PortfolioHero";
import FeaturedProjects from "@/components/sections/portfolio/FeaturedProjects";
import ClientResults from "@/components/sections/portfolio/ClientResults";
import PortfolioTestimonials from "@/components/sections/portfolio/PortfolioTestimonials";
import CTA from "@/components/sections/CTA";
import { getPageMetadata } from "@/lib/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata(
    "portfolio",
    "Portfolio & Case Studies — Our Work",
    "Client engagements across performance marketing, branding, web design, and SEO. See the work we do and the business problems we solve."
  );
}

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PortfolioHero />
        <FeaturedProjects />
        <ClientResults />
        <PortfolioTestimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
