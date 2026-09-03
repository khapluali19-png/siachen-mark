import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const pillars = [
  { title: "Full Attributable Funnels", desc: "Every click, lead, and sale mapped cleanly in GTM, GA4, and CAPI." },
  { title: "In-House Execution", desc: "No white-label outsourcing. Strategy, copy, design, and ads managed directly." },
  { title: "Audience-First Targeting", desc: "Granular buyer persona segmentation across Meta, Google, and LinkedIn." },
  { title: "Continuous Optimization", desc: "Weekly creative refreshes and bid adjustments based on true ROAS." },
];

export default function ClientResults() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-navy)] py-24 px-6">
      <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[var(--color-navy-bright)] opacity-20 blur-3xl" />
      <Container className="relative">
        <SectionHeading
          label="Our Standards"
          title="Engineered for Sustainable Growth"
          subtitle="We focus on transparent, scalable systems built around real business objectives."
          center
          className="mb-14 text-white [&_h2]:text-white [&_p]:text-[var(--color-on-navy)]"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className="reveal text-left rounded-[var(--radius-xl)] border border-white/10 bg-white/5 backdrop-blur-sm p-6"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center mb-4 text-sky-300 font-bold text-sm">
                0{i + 1}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
              <p className="text-xs text-[var(--color-on-navy)] opacity-80 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
