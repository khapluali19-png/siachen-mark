import Container from "@/components/ui/Container";

const features = [
  {
    n: "01",
    title: "Full-Funnel Measurement",
    desc: "We connect Meta Pixel, Conversions API, GTM, and GA4 into one system before any campaign runs — so your data compounds instead of disappearing.",
  },
  {
    n: "02",
    title: "No Outsourcing",
    desc: "Every deliverable — ads, design, copy, tracking — is handled in-house. You always know who is responsible for your results.",
  },
  {
    n: "03",
    title: "Strategy Before Spend",
    desc: "We audit your current presence and build a data-backed plan before recommending any budget. No guesswork, no wasted spend.",
  },
  {
    n: "04",
    title: "Creative That Converts",
    desc: "Our creative is built to perform, not just look good. Every asset is tied to a measurable goal and iterated based on real performance data.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-background)] py-24 px-6" aria-labelledby="why-heading">
      {/* Ambient background light on white section */}
      <div
        className="pointer-events-none absolute top-1/4 -right-24 w-[480px] h-[480px] rounded-full bg-blue-100/60 opacity-70 blur-3xl animate-float-slow"
        aria-hidden="true"
      />
      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — Editorial text */}
          <div className="reveal">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-navy-bright)] mb-3">
              Why Siachen Mark
            </p>
            <h2
              id="why-heading"
              className="text-3xl md:text-4xl font-extrabold text-[var(--color-navy)] leading-tight tracking-tight mb-6"
            >
              Most Agencies Stop at Running Ads.
              <br />
              <span className="text-[var(--color-muted)] font-semibold">We Build the System.</span>
            </h2>
            <p className="text-[var(--color-muted)] text-lg leading-relaxed mb-8 max-w-lg">
              The difference between a campaign that breaks even and one that compounds is a measurement system built right, a strategy grounded in data, and a team that treats your budget like their own.
            </p>

            {/* Trust signals */}
            <div className="flex flex-col gap-3">
              {[
                "Strategy-led campaigns — not just ad runs",
                "Conversion-focused execution across every channel",
                "Transparent weekly reporting — no black boxes",
                "Continuous optimisation as standard",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 w-5 h-5 rounded-full bg-[var(--color-off-white)] border border-[var(--color-border)] flex items-center justify-center shrink-0"
                    aria-hidden="true"
                  >
                    <svg
                      viewBox="0 0 12 12"
                      className="w-3 h-3 text-[var(--color-navy-bright)]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 6l3 3 5-5" />
                    </svg>
                  </span>
                  <span className="text-sm text-[var(--color-foreground)] leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <div
                key={f.n}
                className={`reveal reveal-delay-${i + 1} bg-[var(--color-off-white)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-6 hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5 transition-all duration-200`}
              >
                <p className="text-3xl font-extrabold text-[var(--color-navy)] opacity-15 leading-none mb-3 font-display">
                  {f.n}
                </p>
                <h3 className="font-bold text-[var(--color-navy)] text-base mb-2">{f.title}</h3>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}
