import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const values = [
  { title: "Results Over Vanity Metrics", desc: "ROAS, conversions, and leads — not follower counts or impressions alone." },
  { title: "Full-Funnel Accountability", desc: "We connect every platform into one measurement system before any campaign runs." },
  { title: "Design as a Business Tool", desc: "Every design decision is made to build trust and drive results — not decoration." },
  { title: "Honesty in Growth Tactics", desc: "Legit audience targeting only. We never fabricate details or use scraped data." },
  { title: "Transparent Economics", desc: "Ad spend is billed separately, at cost, with no markup — always." },
  { title: "Analytical Rigor + Creative Care", desc: "Testing, measuring, adjusting — while still caring how a brand sounds and looks." },
];

export default function CoreValues() {
  return (
    <section className="bg-[var(--color-off-white)] py-20 px-6">
      <Container>
        <SectionHeading
          label="What We Stand For"
          title="Our Values"
          subtitle="Not a self-declared list — these are principles repeated consistently across every proposal, poster, and client engagement."
          center
          className="mb-12"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {values.map((v) => (
            <div key={v.title} className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow-sm)]">
              <h3 className="font-bold text-[var(--color-navy)] text-base">{v.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
