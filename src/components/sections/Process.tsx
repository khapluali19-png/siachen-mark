import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const steps = [
  { n: "01", title: "Discovery", desc: "We audit your current presence — ads, website, social, tracking — before recommending anything." },
  { n: "02", title: "Strategy", desc: "A data-backed plan built around your goals, audience, and budget. No guesswork." },
  { n: "03", title: "Design", desc: "Creative that reflects your brand and is built to perform, not just look good." },
  { n: "04", title: "Launch", desc: "Campaigns, content, and tracking go live together — every platform connected from day one." },
  { n: "05", title: "Measure", desc: "We track what matters and report clearly — so you always know what's working and why." },
  { n: "06", title: "Optimise", desc: "Continuous improvement based on real data. Your results compound over time." },
];

export default function Process() {
  return (
    <section className="bg-[var(--color-background)] py-20 px-6">
      <Container>
        <SectionHeading
          label="How We Work"
          title="A Process Built for Results"
          subtitle="From first conversation to ongoing growth — here's how we work."
          center
          className="mb-12"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div key={s.n} className="border border-[var(--color-border)] rounded-[var(--radius-lg)] p-8">
              <p className="text-3xl font-extrabold text-[var(--color-navy)] opacity-20">{s.n}</p>
              <h3 className="mt-2 font-bold text-[var(--color-navy)] text-lg">{s.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
