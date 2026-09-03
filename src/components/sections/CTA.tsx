import Link from "next/link";
import Container from "@/components/ui/Container";
import { getSiteSettings } from "@/lib/settings";
import TrackedLink from "@/components/ui/TrackedLink";
import MagneticCTA from "@/components/ui/MagneticCTA";

export default async function CTA() {
  const settings = await getSiteSettings();
  const waNumber = settings.whatsappNumber || "923488868517";
  const waHref = `https://wa.me/${waNumber.replace(/\D/g, "")}`;

  return (
    <section
      className="relative overflow-hidden bg-[var(--color-navy)] py-24 px-6"
      aria-labelledby="cta-heading"
    >
      {/* Subtle diagonal stripe pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #fff 0px, #fff 1px, transparent 1px, transparent 12px)",
        }}
      />

      {/* Ambient background glow and floating rings */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-[var(--color-navy-bright)] opacity-20 blur-3xl animate-ambient-pulse"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-20 -right-20 w-80 h-80 rounded-full border border-white/15 animate-float-slow"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-20 -left-20 w-80 h-80 rounded-full border border-white/15 animate-float-reverse"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="max-w-3xl mx-auto text-center reveal">
          <span className="inline-block px-3 py-1 rounded-sm border border-white/15 text-[var(--color-on-navy)] text-xs font-semibold uppercase tracking-widest mb-6">
            Let&apos;s Work Together
          </span>

          <h2
            id="cta-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-5"
          >
            {settings.globalCtaTitle || "Your Growth Is Our Mission."}
          </h2>

          <p className="text-[var(--color-on-navy)] max-w-xl mx-auto text-lg leading-relaxed mb-10">
            {settings.globalCtaSubtitle ||
              "Let's build your brand, reach more customers, and hit your business goals — with a strategy built around your actual numbers, not vanity metrics."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <MagneticCTA>
              <TrackedLink
                href={settings.strategyCallHref || "/contact"}
                trackingType="strategy_call"
                trackingLocation="global_cta_section"
                className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-[var(--radius-full)] bg-white text-[var(--color-navy)] font-semibold text-sm hover:bg-[var(--color-off-white)] transition-all duration-200 shadow-[0_2px_12px_rgba(255,255,255,0.15)]"
              >
                {settings.strategyCallText || "Book a Strategy Call"}
                <svg
                  viewBox="0 0 16 16"
                  className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </TrackedLink>
            </MagneticCTA>

            <MagneticCTA>
              <TrackedLink
                href={waHref}
                trackingType="whatsapp"
                trackingLocation="global_cta_section"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-[var(--radius-full)] border border-white/20 text-[var(--color-on-navy)] font-semibold text-sm hover:bg-white/8 hover:border-white/30 transition-all duration-200"
              >
                {/* WhatsApp icon */}
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.845L.057 23.5l5.797-1.522A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.51-5.17-1.4l-.37-.22-3.44.9.92-3.35-.24-.38A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
                WhatsApp Us
              </TrackedLink>
            </MagneticCTA>
          </div>

          {/* Secondary micro-CTA */}
          <p className="mt-8 text-sm text-[var(--color-on-navy)] opacity-60">
            Or{" "}
            <Link
              href="/contact"
              className="underline underline-offset-2 hover:opacity-100 transition-opacity"
            >
              request a free marketing audit
            </Link>{" "}
            — no commitment required.
          </p>
        </div>
      </Container>
    </section>
  );
}
