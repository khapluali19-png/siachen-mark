import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export default function PricingCTA() {
  return (
    <section className="bg-[var(--color-background)] py-20 px-6">
      <Container className="max-w-3xl text-center">
        <SectionHeading
          label="Pricing"
          title="Transparent, Tiered, No Surprises."
          subtitle="Services are packaged into monthly plans, and ad spend is always billed separately — directly to the platform, at cost, with no markup. Our fee covers strategy, content, design, and campaign management."
          center
        />
        <Link
          href="/contact"
          className="mt-8 inline-block px-8 py-3 rounded-[var(--radius-full)] bg-[var(--color-navy)] text-white font-semibold hover:bg-[var(--color-navy-bright)] transition-colors"
        >
          Request a Custom Quote
        </Link>
      </Container>
    </section>
  );
}
