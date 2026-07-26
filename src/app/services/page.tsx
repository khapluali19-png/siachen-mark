import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ServicesHero from "@/components/sections/services/ServicesHero";
import ServicesGrid from "@/components/sections/services/ServicesGrid";
import ServicesProcess from "@/components/sections/services/ServicesProcess";
import PricingCTA from "@/components/sections/services/PricingCTA";
import ServicesFAQ from "@/components/sections/services/ServicesFAQ";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Services — Siachen Mark",
  description: "Performance marketing, SEO, social media, web design, branding, and full-funnel tracking — the complete digital growth stack.",
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ServicesHero />
        <ServicesGrid />
        <ServicesProcess />
        <PricingCTA />
        <ServicesFAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
