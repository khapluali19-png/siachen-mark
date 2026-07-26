import { db } from "@/lib/db";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero, { type HeroData } from "@/components/sections/Hero";
import TrustedBy from "@/components/sections/TrustedBy";
import Stats from "@/components/sections/Stats";
import ServicesPreview from "@/components/sections/ServicesPreview";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Tracking from "@/components/sections/Tracking";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";

export default async function Home() {
  const row = await db.heroContent.findFirst().catch(() => null);
  const heroData: HeroData | null = row
    ? {
        badge: row.badge,
        headline: row.headline,
        subline: row.subline,
        ctaPrimary: row.ctaPrimary,
        ctaPrimaryHref: row.ctaPrimaryHref,
        ctaSecondary: row.ctaSecondary,
        ctaSecondaryHref: row.ctaSecondaryHref,
        stats: Array.isArray(row.stats) ? (row.stats as { v: string; l: string }[]) : null,
      }
    : null;

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero data={heroData} />
        <TrustedBy />
        <Stats />
        <ServicesPreview />
        <WhyChooseUs />
        <Tracking />
        <Process />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
