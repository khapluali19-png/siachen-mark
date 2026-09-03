import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Link from "next/link";
import { getSiteSettings } from "@/lib/settings";
import MagneticCTA from "@/components/ui/MagneticCTA";

const reasons = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Full team, in-house",
    desc: "No outsourcing. Ads, design, video, and web are all handled by our own people — so you always know who's accountable.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "Tracking-first",
    desc: "We build your measurement stack — Meta Pixel, CAPI, GTM, GA4 — before spending on ads. No tracking means no learnings.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
    title: "Transparent pricing",
    desc: "Ad spend is billed directly to the platform, at cost. You only pay for our strategy, execution, and management.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Proven frameworks",
    desc: "We don't test unproven theories on your budget. We apply tested campaign structures adapted to your specific market.",
  },
];

export default async function WhySiachenMark() {
  const settings = await getSiteSettings();

  return (
    <section className="bg-[var(--color-off-white)] py-24 px-6" aria-labelledby="why-sm-heading">
      <Container>
        <SectionHeading
          id="why-sm-heading"
          label="Why Us"
          title={settings.whySectionTitle || "What Makes Us Different"}
          subtitle={settings.whySectionSubtitle || "Most agencies optimize for billable hours. We optimize for your results."}
          center
          className="mb-12"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className={`reveal reveal-delay-${(i % 4) + 1} premium-card bg-[var(--color-background)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow-sm)]`}
            >
              <div className="w-10 h-10 rounded-lg bg-[var(--color-off-white)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-navy)] mb-4">
                {r.icon}
              </div>
              <h3 className="font-bold text-[var(--color-navy)] text-base mb-2">{r.title}</h3>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>

        {/* Section CTA */}
        <div className="mt-12 text-center">
          <MagneticCTA>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[var(--radius-full)] bg-[var(--color-navy)] text-white font-semibold text-sm hover:bg-[var(--color-navy-bright)] transition-colors duration-200 shadow-[var(--shadow-sm)]"
            >
              Start with a Free Audit
              <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </MagneticCTA>
          <p className="mt-3 text-sm text-[var(--color-muted)]">No commitment. We&apos;ll tell you what&apos;s worth fixing first.</p>
        </div>
      </Container>
    </section>
  );
}
