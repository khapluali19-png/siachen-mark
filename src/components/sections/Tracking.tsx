import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Tracking() {
  return (
    <section className="bg-[var(--color-background)] py-20 px-6">
      <Container className="max-w-3xl mx-auto text-center">
        <SectionHeading
          title="Anyone Can Run Ads. Not Everyone Can Make Them Profitable."
          subtitle="Most agencies stop at running ads and handing over a results screenshot. Siachen Mark connects every platform — Meta Pixel, Conversions API, GTM, GA4 — into one measurement system before any campaign runs, so data compounds over time instead of disappearing after each campaign."
          center
        />
      </Container>
    </section>
  );
}
