import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const results = [
  { stat: "+64%", label: "Appointment inquiries", project: "Healthcare" },
  { stat: "3.2x", label: "ROAS achieved", project: "Healthcare" },
  { stat: "2.8x", label: "Organic traffic growth", project: "Logistics" },
  { stat: "+180%", label: "Instagram engagement", project: "E-commerce" },
];

export default function ClientResults() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-navy)] py-24 px-6">
      <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[var(--color-navy-bright)] opacity-20 blur-3xl animate-blob" />
      <Container className="relative">
        <SectionHeading
          label="Results"
          title="Numbers That Matter"
          subtitle="Representative outcomes from recent client engagements across industries."
          center
          className="mb-14 text-white [&_h2]:text-white [&_p]:text-[var(--color-on-navy)]"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {results.map((r, i) => (
            <div
              key={r.label}
              className="reveal text-center rounded-[var(--radius-xl)] border border-[var(--color-navy-dim)] bg-white/5 backdrop-blur-sm p-6"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <p className="text-4xl font-extrabold text-white">{r.stat}</p>
              <p className="mt-1 text-sm text-[var(--color-on-navy)]">{r.label}</p>
              <p className="mt-2 text-xs text-[var(--color-on-navy)] opacity-60 uppercase tracking-wide">{r.project}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
