import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const steps = [
  { n: "01", title: "Discovery & Audit", desc: "We review your current presence — ads, website, social pages, and tracking — before recommending anything." },
  { n: "02", title: "Strategy", desc: "We build a data-backed plan tied to your specific goals and budget, not a generic package." },
  { n: "03", title: "Setup & Tracking", desc: "Before any campaign runs, we connect your full measurement stack — Pixel, Conversions API, GTM, GA4." },
  { n: "04", title: "Launch", desc: "Campaigns, content, and design go live on schedule, with every asset reviewed before publishing." },
  { n: "05", title: "Optimize", desc: "We monitor performance weekly and adjust targeting, creative, and spend based on real data." },
  { n: "06", title: "Report", desc: "You receive clear, honest reporting — what worked, what didn't, and what's next." },
];

export default function ServicesProcess() {
  return (
    <section className="bg-[var(--color-off-white)] py-20 px-6">
      <Container>
        <SectionHeading label="How We Work" title="Our Process" center className="mb-12" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div key={s.n} className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow-sm)]">
              <span className="text-3xl font-extrabold text-[var(--color-navy)] opacity-20">{s.n}</span>
              <h3 className="mt-2 font-bold text-[var(--color-navy)] text-base">{s.title}</h3>
              <p className="mt-1 text-sm text-[var(--color-muted)] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
