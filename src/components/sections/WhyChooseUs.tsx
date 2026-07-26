import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const whyItems = [
  {
    title: "Full-Funnel Measurement",
    desc: "We connect Meta Pixel, Conversions API, GTM, and GA4 into one system before any campaign runs.",
  },
  {
    title: "No Outsourcing",
    desc: "Every deliverable — ads, design, copy, tracking — is handled in-house by our 7-person team.",
  },
  {
    title: "Strategy Before Spend",
    desc: "We audit your current presence and build a data-backed plan before recommending any budget.",
  },
  {
    title: "Design That Converts",
    desc: "Our creative is built to perform — not just look good. Every asset is tied to a measurable goal.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[var(--color-off-white)] py-20 px-6">
      <Container>
        <SectionHeading
          label="Why Siachen Mark"
          title="Performance. Growth. Impact."
          subtitle="Most agencies stop at running ads and handing over a screenshot. We build the system that makes every campaign smarter than the last."
          center
          className="mb-12"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {whyItems.map((item) => (
            <div
              key={item.title}
              className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-8 shadow-[var(--shadow-sm)]"
            >
              <h3 className="font-bold text-[var(--color-navy)] text-lg">{item.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
