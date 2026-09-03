"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { trackStrategyCallClick, trackEvent } from "@/lib/tracking";
import MagneticCTA from "@/components/ui/MagneticCTA";

/* ── scroll-reveal hook ── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("revealed")),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const MARQUEE = [
  "Performance Marketing", "SEO & Content", "Meta Ads", "Google Ads",
  "Lead Generation", "Web Development", "Analytics", "Brand Strategy", "Social Media",
];

const DEFAULT_STATS = [
  { v: "100+", l: "Clients Served" },
  { v: "15+", l: "Countries" },
  { v: "3.8x", l: "Average ROAS" },
  { v: "98%", l: "Client Satisfaction" },
];

export interface HeroSlideData {
  id?: string;
  badge?: string | null;
  headline?: string | null;
  subline?: string | null;
  ctaPrimary?: string | null;
  ctaPrimaryHref?: string | null;
  ctaSecondary?: string | null;
  ctaSecondaryHref?: string | null;
  backgroundImage?: string | null;
  stats?: { v: string; l: string }[] | null;
  slideDuration?: number;
}

export default function Hero({ slides }: { slides?: HeroSlideData[] | HeroSlideData | null }) {
  const slideList: HeroSlideData[] = Array.isArray(slides)
    ? slides
    : slides
    ? [slides]
    : [
        {
          badge: "Performance Marketing & Digital Growth Agency",
          headline: null,
          subline:
            "We help ambitious businesses acquire customers, grow revenue, and build brands they are proud of — through structured strategy, paid media, and creative execution.",
          ctaPrimary: "Book a Strategy Call",
          ctaPrimaryHref: "/contact",
          ctaSecondary: "Explore Our Services",
          ctaSecondaryHref: "/services",
          backgroundImage: null,
          stats: DEFAULT_STATS,
          slideDuration: 6,
        },
      ];

  const [activeIndex, setActiveIndex] = useState(0);
  useReveal();

  useEffect(() => {
    if (slideList.length <= 1) return;
    const currentDuration = (slideList[activeIndex]?.slideDuration || 6) * 1000;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slideList.length);
    }, currentDuration);
    return () => clearInterval(timer);
  }, [activeIndex, slideList]);

  const currentSlide = slideList[activeIndex] || slideList[0];

  const badge = currentSlide.badge || "Performance Marketing & Digital Growth Agency";
  const subline =
    currentSlide.subline ||
    "We help ambitious businesses acquire customers, grow revenue, and build brands they are proud of — through structured strategy, paid media, and creative execution.";
  const ctaPrimary = currentSlide.ctaPrimary || "Book a Strategy Call";
  const ctaPrimaryHref = currentSlide.ctaPrimaryHref || "/contact";
  const ctaSecondary = currentSlide.ctaSecondary || "Explore Our Services";
  const ctaSecondaryHref = currentSlide.ctaSecondaryHref || "/services";
  const stats = currentSlide.stats && currentSlide.stats.length ? currentSlide.stats : DEFAULT_STATS;
  const bgImage = currentSlide.backgroundImage;

  return (
    <section className="relative overflow-hidden bg-[var(--color-navy)] min-h-[70vh] sm:min-h-[80vh] lg:min-h-[90vh] flex flex-col justify-between text-white" aria-label="Hero">
      {/* Background Image with Dark Navy Contrast Overlay */}
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImage}
            alt="Hero Background"
            fill
            priority={activeIndex === 0}
            className="object-cover transition-opacity duration-700"
          />
          {/* Intelligent Dark Gradient Overlay for Contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-navy)] via-[var(--color-navy)]/90 to-[var(--color-navy)]/70" />
        </div>
      )}

      {/* Grid Pattern overlay when no bg image */}
      {!bgImage && (
        <div
          className="pointer-events-none absolute inset-0 z-0"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      )}

      {/* Ambient floating glow elements for visual depth */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[var(--color-navy-bright)] opacity-25 blur-3xl animate-float-slow" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-blue-600 opacity-20 blur-3xl animate-float-reverse" aria-hidden="true" />

      {/* Main hero content */}
      <div className="relative z-10 pt-16 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 flex-1 flex items-center">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Text content column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge */}
              <div className="reveal">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[var(--radius-full)] border border-white/20 bg-white/10 text-[var(--color-on-navy)] text-xs font-semibold uppercase tracking-widest backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                  {badge}
                </span>
              </div>

              {/* Headline */}
              <div className="reveal">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] font-display">
                  {currentSlide.headline ? (
                    currentSlide.headline
                  ) : (
                    <>
                      We Build Growth Systems That{" "}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-white">
                        Scale Revenue.
                      </span>
                    </>
                  )}
                </h1>
              </div>

              {/* Subline */}
              <div className="reveal">
                <p className="text-base sm:text-lg text-[var(--color-on-navy)] opacity-90 max-w-xl leading-relaxed font-normal">
                  {subline}
                </p>
              </div>

              {/* CTAs */}
              <div className="reveal flex flex-wrap gap-4 pt-2 items-center">
                <MagneticCTA>
                  <Link
                    href={ctaPrimaryHref}
                    onClick={() => trackStrategyCallClick("hero_primary")}
                    className="px-7 py-3.5 rounded-[var(--radius-full)] bg-white text-[var(--color-navy)] font-bold text-sm hover:bg-[var(--color-off-white)] transition-all duration-200 shadow-lg inline-flex items-center gap-2"
                  >
                    {ctaPrimary}
                    <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </Link>
                </MagneticCTA>

                <Link
                  href={ctaSecondaryHref}
                  onClick={() => trackEvent("cta_click", { location: "hero_secondary", label: ctaSecondary || "Explore Services" })}
                  className="px-7 py-3.5 rounded-[var(--radius-full)] border border-white/25 text-white font-semibold text-sm hover:bg-white/10 hover:border-white/40 transition-all duration-200"
                >
                  {ctaSecondary}
                </Link>
              </div>

              {/* Stat Pills */}
              <div className="reveal pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((s) => (
                  <div key={s.l}>
                    <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">{s.v}</p>
                    <p className="text-[11px] font-medium text-[var(--color-on-navy)] opacity-70 uppercase tracking-wider mt-0.5">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual/Image Card Column — desktop only */}
            <div className="hidden lg:block lg:col-span-5 reveal">
              <div className="animate-float relative rounded-[var(--radius-xl)] border border-white/15 bg-white/5 backdrop-blur-md p-6 shadow-2xl space-y-4">
                <div className="relative h-64 sm:h-72 rounded-[var(--radius-lg)] overflow-hidden border border-white/10">
                  <Image
                    src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop"
                    alt="Digital Performance Marketing Team at Work"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs font-semibold text-sky-300 uppercase tracking-widest">Full-Funnel Growth</p>
                    <p className="text-base font-extrabold mt-0.5">Strategy + Paid Media + Conversions</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white/8 rounded-lg p-3 border border-white/10">
                    <p className="font-bold text-white">Meta & Google Ads</p>
                    <p className="text-[10px] text-[var(--color-on-navy)] opacity-70 mt-0.5">Targeted acquisition</p>
                  </div>
                  <div className="bg-white/8 rounded-lg p-3 border border-white/10">
                    <p className="font-bold text-white">CAPI & GA4 Tracking</p>
                    <p className="text-[10px] text-[var(--color-on-navy)] opacity-70 mt-0.5">Full attribution</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </Container>
      </div>

      {/* Multi-slide indicators */}
      {slideList.length > 1 && (
        <div className="relative z-10 pb-6 flex justify-center items-center gap-2">
          {slideList.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === idx ? "w-8 bg-white" : "w-2 bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Bottom Marquee */}
      <div className="relative z-10 py-3 bg-black/25 border-t border-white/10 overflow-hidden">
        <div className="flex w-max animate-marquee gap-8 text-xs font-semibold tracking-wider text-[var(--color-on-navy)] uppercase opacity-80" aria-hidden="true">
          {[...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i} className="flex items-center gap-3">
              <span>{m}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
