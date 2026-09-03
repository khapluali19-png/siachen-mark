import Container from "@/components/ui/Container";

const stack = [
  { label: "Meta Pixel", desc: "Browser-side signals" },
  { label: "Conversions API", desc: "Server-side reliability" },
  { label: "Google Tag Manager", desc: "Event orchestration" },
  { label: "GA4 + Looker", desc: "Attribution & reporting" },
];

export default function Tracking() {
  return (
    <section className="bg-[var(--color-navy)] py-24 px-6" aria-labelledby="tracking-heading">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — Statement */}
          <div className="reveal">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-on-navy)] opacity-60 mb-4">
              Our Approach
            </p>
            <h2
              id="tracking-heading"
              className="text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight mb-6"
            >
              Anyone Can Run Ads.{" "}
              <span className="text-[var(--color-on-navy)]">
                Not Everyone Can Make Them Profitable.
              </span>
            </h2>
            <p className="text-[var(--color-on-navy)] opacity-80 text-lg leading-relaxed max-w-lg">
              Most agencies stop at running ads and handing over a results screenshot. We connect every platform into one measurement system before any campaign runs — so your data compounds over time instead of disappearing after each campaign.
            </p>
          </div>

          {/* Right — Tracking stack visual */}
          <div className="reveal reveal-delay-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-on-navy)] opacity-60 mb-6">
              Our Measurement Stack
            </p>
            <div className="space-y-3">
              {stack.map((s, i) => (
                <div
                  key={s.label}
                  className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-[var(--radius-md)] px-5 py-4 hover:bg-white/8 transition-colors"
                >
                  {/* Step number */}
                  <span
                    className="w-7 h-7 rounded-full bg-[var(--color-navy-bright)] flex items-center justify-center text-white text-xs font-bold shrink-0"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>

                  {/* Connector line */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white text-sm">{s.label}</p>
                    <p className="text-[var(--color-on-navy)] text-xs opacity-70 mt-0.5">{s.desc}</p>
                  </div>

                  {/* Active indicator */}
                  <span
                    className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"
                    aria-label="Active"
                  />
                </div>
              ))}
            </div>

            {/* Footer note */}
            <p className="mt-5 text-xs text-[var(--color-on-navy)] opacity-50 leading-relaxed">
              Every client gets a full tracking audit before their first campaign goes live.
            </p>
          </div>

        </div>
      </Container>
    </section>
  );
}
