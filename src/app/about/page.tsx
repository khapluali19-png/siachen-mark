import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutHero from "@/components/sections/about/AboutHero";
import CompanyStory from "@/components/sections/about/CompanyStory";
import MissionVision from "@/components/sections/about/MissionVision";
import CoreValues from "@/components/sections/about/CoreValues";
import Founders from "@/components/sections/about/Founders";
import Team from "@/components/sections/about/Team";
import Timeline from "@/components/sections/about/Timeline";
import WhySiachenMark from "@/components/sections/about/WhySiachenMark";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "About — Siachen Mark",
  description: "Building brands and driving results. Learn about the Siachen Mark team, story, and approach.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <AboutHero />
        <CompanyStory />
        <MissionVision />
        <CoreValues />
        <Timeline />
        <Founders />
        <Team />
        <WhySiachenMark />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
