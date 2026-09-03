import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const steps = [
  {
    n: "01",
    title: "Discover",
    desc: "We audit your current presence — ads, website, analytics, tracking — before recommending anything.",
  },
  {
    n: "02",
    title: "Strategize",
    desc: "A data-backed growth plan built around your goals, audience, and budget. No guesswork, no generic playbooks.",
  },
  {
    n: "03",
    title: "Launch",
    desc: "Campaigns, creative, and tracking go live together — every platform connected from day one.",
  },
  {
    n: "04",
    title: "Optimize",
    desc: "Continuous improvement based on real performance data. We iterate every week until results compound.",
  },
  {
    n: "05",
    title: "Scale",
    desc: "Once the system is profitable, we scale what works — more budget, more channels, more growth.",
  },
];

export default function Process() {
  return (
    <section className="bg-[var(--color-off-white)] py-24 px-6" aria-labelledby="process-heading">
      <Container>
        <SectionHeading
          id="process-heading"
          label="How We Work"
          title="A Process Built for Results"
          subtitle="From first conversation to ongoing growth — a repeatable system designed to compound over time."
          center
          className="mb-16"
        />

        {/* Desktop: horizontal stepped timeline */}
        <div className="hidden lg:block relative">
          {/* Connecting line */}
          <div
            className="absolute top-8 left-[calc(10%+1.5rem)] right-[calc(10%+1.5rem)] h-px bg-[var(--color-border)]"
            aria-hidden="true"
          />

          <div className="grid grid-cols-5 gap-4">
            {steps.map((s, i) => (
              <div
                key={s.n}
                className={`reveal reveal-delay-${i + 1} group flex flex-col items-center text-center p-3 rounded-xl transition-all duration-200`}
              >
                {/* Step circle */}
                <div className="relative z-10 w-16 h-16 rounded-full border-2 border-[var(--color-border)] bg-white flex items-center justify-center mb-5 shadow-[var(--shadow-sm)] group-hover:border-[var(--color-navy-bright)] group-hover:scale-105 transition-all duration-200">
                  <span className="text-2xl font-extrabold text-[var(--color-navy)] opacity-30 group-hover:opacity-100 group-hover:text-[var(--color-navy-bright)] transition-all duration-200 leading-none font-display">
                    {s.n}
                  </span>
                </div>
                <h3 className="font-bold text-[var(--color-navy)] text-base mb-2 group-hover:text-[var(--color-navy-bright)] transition-colors">{s.title}</h3>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="lg:hidden relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-px bg-[var(--color-border)]"
            aria-hidden="true"
          />

          <div className="space-y-8 pl-12 sm:pl-16">
            {steps.map((s, i) => (
              <div
                key={s.n}
                className={`reveal reveal-delay-${Math.min(i + 1, 5)} relative`}
              >
                {/* Step number dot */}
                <div
                  className="absolute -left-10 w-8 h-8 rounded-full border-2 border-[var(--color-border)] bg-white flex items-center justify-center shadow-[var(--shadow-sm)]"
                  aria-hidden="true"
                >
                  <span className="text-xs font-extrabold text-[var(--color-navy)] opacity-50">
                    {i + 1}
                  </span>
                </div>

                <div className="premium-card bg-white border border-[var(--color-border)] rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow-sm)]">
                  <p className="text-2xl font-extrabold text-[var(--color-navy)] opacity-15 mb-2 font-display">
                    {s.n}
                  </p>
                  <h3 className="font-bold text-[var(--color-navy)] text-base mb-2">{s.title}</h3>
                  <p className="text-sm text-[var(--color-muted)] leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
