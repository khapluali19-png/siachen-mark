import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const reasons = [
  { title: "Full team, in-house", desc: "No outsourcing. Ads, design, video, and web are all handled by our own people." },
  { title: "Tracking-first", desc: "We build your measurement stack before spending a rupee on ads." },
  { title: "Transparent pricing", desc: "Ad spend billed at cost, no markup — you always know where money goes." },
  { title: "Proven range", desc: "100+ clients, 15+ countries, across nearly every industry." },
];

export default function WhySiachenMark() {
  return (
    <section className="bg-[var(--color-off-white)] py-20 px-6">
      <Container>
        <SectionHeading label="Why Us" title="Why Siachen Mark" center className="mb-12" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r) => (
            <div key={r.title} className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow-sm)]">
              <h3 className="font-bold text-[var(--color-navy)] text-base">{r.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
