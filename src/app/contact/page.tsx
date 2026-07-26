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

export const metadata: Metadata = {
  title: "Contact Us — Siachen Mark",
  description:
    "Get in touch with Siachen Mark. Tell us about your business and what you need — we'll take it from there.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHeader
          title="Contact Us. We're Here to Help!"
          subtitle="No call centers, no bots. Tell us what you're working on and we'll get back to you directly."
        />

        {/* Form + Info */}
        <section className="py-20 px-6">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <ContactForm />
              </div>
              <aside>
                <ContactInfo />
              </aside>
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
