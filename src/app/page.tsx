import { db } from "@/lib/db";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero, { type HeroSlideData } from "@/components/sections/Hero";
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
  const rows = await db.heroContent
    .findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    })
    .catch(() => []);

  const heroSlides: HeroSlideData[] = rows.map((row) => ({
    id: row.id,
    badge: row.badge,
    headline: row.headline,
    subline: row.subline,
    ctaPrimary: row.ctaPrimary,
    ctaPrimaryHref: row.ctaPrimaryHref,
    ctaSecondary: row.ctaSecondary,
    ctaSecondaryHref: row.ctaSecondaryHref,
    backgroundImage: row.backgroundImage,
    stats: Array.isArray(row.stats) ? (row.stats as { v: string; l: string }[]) : null,
    slideDuration: row.slideDuration || 6,
  }));

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero slides={heroSlides.length ? heroSlides : null} />
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
