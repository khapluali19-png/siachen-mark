import Container from "@/components/ui/Container";
import Link from "next/link";
import MagneticCTA from "@/components/ui/MagneticCTA";

export default function ServicesHero() {
  return (
    <section
      className="relative overflow-hidden bg-[var(--color-navy)] py-24 px-6 text-white"
      aria-labelledby="services-page-heading"
    >
      {/* Subtle dot grid */}
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
          Our Services
        </p>

        <h1
          id="services-page-heading"
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.08] font-display mb-6"
        >
          Everything Your Brand Needs to Grow.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-white">
            In One Place.
          </span>
        </h1>

        <p className="text-lg text-[var(--color-on-navy)] max-w-2xl leading-relaxed mb-8 opacity-90">
          From strategy to design to tracking — we build the full system, not just run the ads. Every service is built around measurable outcomes for your business.
        </p>

        <div className="flex flex-wrap gap-4 items-center">
          <MagneticCTA>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-[var(--radius-full)] bg-white text-[var(--color-navy)] font-semibold text-sm hover:bg-[var(--color-off-white)] transition-all duration-200 shadow-lg"
            >
              Book a Strategy Call
              <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </MagneticCTA>

          <a
            href="#services-overview"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-[var(--radius-full)] border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-all duration-200"
          >
            Browse Services
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M8 3v10M4 9l4 4 4-4" />
            </svg>
          </a>
        </div>
      </Container>
    </section>
  );
}
