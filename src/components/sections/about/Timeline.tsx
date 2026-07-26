import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const milestones = [
  { phase: "The Start", desc: "Founded by Basharat Ali and Mushtaq Ali — one marketer, one designer, one shared standard for quality." },
  { phase: "First Clients", desc: "Early work across clinics, wholesalers, and local businesses proved the model: strategy and design working together." },
  { phase: "Going Global", desc: "Grew to serve 100+ clients across Pakistan and 15+ countries — from resorts to technical consultancies." },
  { phase: "A Full Team", desc: "Expanded from two founders into a full in-house team: performance marketing, social, video, web, and design." },
  { phase: "Today", desc: "A full-funnel agency building the measurement systems most agencies skip — so client growth compounds." },
];

export default function Timeline() {
  return (
    <section className="bg-[var(--color-background)] py-20 px-6">
      <Container className="max-w-3xl">
        <SectionHeading
          label="Our Journey"
          title="How We've Grown"
          subtitle="Over 3+ years, from two founders to a full team. (Specific dates to be confirmed.)"
          className="mb-12"
        />
        <ol className="relative border-l border-[var(--color-border)] ml-3">
          {milestones.map((m) => (
            <li key={m.phase} className="mb-10 ml-6">
              <span className="absolute -left-2 flex items-center justify-center w-4 h-4 rounded-full bg-[var(--color-navy)]" aria-hidden="true" />
              <h3 className="font-bold text-[var(--color-navy)] text-base">{m.phase}</h3>
              <p className="mt-1 text-sm text-[var(--color-muted)] leading-relaxed">{m.desc}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
