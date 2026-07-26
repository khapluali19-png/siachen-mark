import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedProjects from "@/components/sections/portfolio/FeaturedProjects";
import PortfolioCategories from "@/components/sections/portfolio/PortfolioCategories";
import ClientResults from "@/components/sections/portfolio/ClientResults";
import PortfolioTestimonials from "@/components/sections/portfolio/PortfolioTestimonials";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Portfolio — Siachen Mark",
  description: "Case studies and client results from Siachen Mark. Real work, real outcomes.",
};

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHeader
          title="Work That Speaks for Itself."
          subtitle="A selection of projects across performance marketing, branding, web, and SEO."
        />
        <PortfolioCategories />
        <FeaturedProjects />
        <ClientResults />
        <PortfolioTestimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
