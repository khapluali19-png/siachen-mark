import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/ui/Container";
import CTA from "@/components/sections/CTA";
import ContactForm from "@/components/sections/contact/ContactForm";
import ContactInfo from "@/components/sections/contact/ContactInfo";
import ContactFAQ from "@/components/sections/contact/ContactFAQ";
import LocationSection from "@/components/sections/contact/LocationSection";
import { getPageMetadata } from "@/lib/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata(
    "contact",
    "Contact Us — Book a Strategy Call",
    "Get in touch with Siachen Mark. Tell us about your business goals and marketing challenges — we'll take it from there."
  );
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHeader
          title="Contact Us. We're Here to Help!"
          subtitle="No call centers, no bots. Tell us what you're working on and we'll get back to you directly."
        />
        <section className="bg-[var(--color-background)] py-16 px-6">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <ContactForm />
              <ContactInfo />
            </div>
          </Container>
        </section>
        <LocationSection />
        <ContactFAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
