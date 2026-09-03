import Container from "@/components/ui/Container";
import Link from "next/link";
import { getSiteSettings } from "@/lib/settings";
import MagneticCTA from "@/components/ui/MagneticCTA";

export default async function AboutHero() {
  const settings = await getSiteSettings();

  return (
    <section
      className="relative overflow-hidden bg-[var(--color-navy)] py-24 px-6 text-white"
      aria-labelledby="about-hero-heading"
    >
      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        aria-hidden="true"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Ambient floating glow element */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[var(--color-navy-bright)] opacity-25 blur-3xl animate-float-slow"
        aria-hidden="true"
      />

      <Container className="relative max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-on-navy)] mb-4">
          {settings.aboutHeroBadge || "About Siachen Mark"}
        </p>

        <h1
          id="about-hero-heading"
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.08] font-display mb-6"
        >
          {settings.aboutHeroTitle
            ? settings.aboutHeroTitle
            : (
              <>
                We Build Growth Systems.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-white">
                  Not Just Campaigns.
                </span>
              </>
            )}
        </h1>

        <p className="text-lg text-[var(--color-on-navy)] max-w-2xl leading-relaxed mb-8 opacity-90">
          {settings.aboutHeroDescription ||
            "Siachen Mark is a performance-first digital marketing agency built on one belief: marketing without measurement is guesswork. We combine strategy, creative, and data to build systems that compound — not campaigns that expire."}
        </p>

        <div className="flex flex-wrap gap-4 items-center">
          <MagneticCTA>
            <Link
              href={settings.aboutHeroPrimaryHref || "/contact"}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-[var(--radius-full)] bg-white text-[var(--color-navy)] font-semibold text-sm hover:bg-[var(--color-off-white)] transition-all duration-200 shadow-lg"
            >
              {settings.aboutHeroPrimaryCta || "Book a Strategy Call"}
              <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </MagneticCTA>

          <Link
            href={settings.aboutHeroSecondaryHref || "/services"}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-[var(--radius-full)] border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-all duration-200"
          >
            {settings.aboutHeroSecondaryCta || "Explore Our Services"}
          </Link>
        </div>

        {/* Quick stat strip */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { v: "100+", l: "Clients Served" },
            { v: "15+", l: "Countries" },
            { v: "3.8x", l: "Average ROAS" },
            { v: "98%", l: "Client Satisfaction" },
          ].map((s) => (
            <div key={s.l}>
              <p className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">{s.v}</p>
              <p className="text-[11px] font-medium text-[var(--color-on-navy)] opacity-70 uppercase tracking-wider mt-0.5">{s.l}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
