import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Link from "next/link";
import { db } from "@/lib/db";

type IconKey = "ads" | "social" | "seo" | "web" | "analytics" | "brand";

const DEFAULT_SERVICES = [
  {
    title: "Performance Marketing",
    slug: "performance-marketing",
    shortDescription: "Anyone can run ads. Not everyone can make them profitable.",
    description: "We build, launch, and optimize paid campaigns across Meta, Google, and LinkedIn — backed by real audience research, not guesswork. Every campaign is tracked from click to conversion.",
    features: ["Campaign setup & optimization", "Audience research & retargeting", "Local Services Ads (LSA)", "A/B testing", "ROI/ROAS reporting"],
    icon: "ads",
  },
  {
    title: "Social Media Management",
    slug: "social-media-management",
    shortDescription: "Not every business should be on every platform.",
    description: "We choose the platforms that match your customers — then build a consistent, scheduled content system so your page always looks active and professional.",
    features: ["Page setup & audits", "Monthly content calendars", "Organic posting (reels, carousels, stories)", "Community management", "LinkedIn growth strategy"],
    icon: "social",
  },
  {
    title: "SEO & Local Search",
    slug: "seo-local-search",
    shortDescription: "SEO begins before you publish content.",
    description: "We start with a full technical and on-page audit — no blanket strategy applied before we know what's actually broken. Then we fix the foundation: speed, structure, metadata, and local visibility.",
    features: ["Technical & on-page SEO audits", "Google Business Profile & Maps optimization", "Schema markup", "Content & blog strategy"],
    icon: "seo",
  },
  {
    title: "Website Design & Development",
    slug: "web-design-development",
    shortDescription: "Your website is your digital home. Not your social media page.",
    description: "Social media attracts visitors. Your website converts them. We build fast, mobile-first websites — WordPress or fully custom — designed around one clear goal per page.",
    features: ["WordPress & custom builds", "Landing pages", "Mobile-responsive design", "Speed optimization"],
    icon: "web",
  },
  {
    title: "Full-Funnel Tracking & Analytics",
    slug: "tracking-analytics",
    shortDescription: "Your ads are blind without tracking.",
    description: "Most agencies stop at a results screenshot. We connect every platform — Meta Pixel, Conversions API, GTM, GA4 — into one measurement system before a single campaign runs.",
    features: ["Meta Pixel & Conversions API setup", "GTM & GA4 setup", "Full-funnel reporting dashboards"],
    icon: "analytics",
  },
  {
    title: "Branding & Graphic Design",
    slug: "branding-graphic-design",
    shortDescription: "People judge your business before reading your content.",
    description: "From logos to full brand identity systems, company profiles, and product catalogs — we design with purpose, not decoration.",
    features: ["Logo & brand identity", "Company & corporate profiles", "Product catalogs", "Brochures & print materials"],
    icon: "brand",
  },
];

function ServiceIcon({ icon }: { icon?: string | null }) {
  const common = { fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const k = (icon || "ads").toLowerCase();

  if (k.includes("social") || k.includes("media")) {
    return (
      <svg viewBox="0 0 48 48" className="w-7 h-7" {...common}>
        <circle cx="13" cy="14" r="5" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="35" cy="14" r="5" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="24" cy="33" r="5" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="2.5" />
        <path d="M16 17l6 12M32 17l-6 12" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.6" />
      </svg>
    );
  }
  if (k.includes("seo") || k.includes("search")) {
    return (
      <svg viewBox="0 0 48 48" className="w-7 h-7" {...common}>
        <circle cx="21" cy="21" r="12" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="2.5" />
        <path d="M30 30l10 10" stroke="currentColor" strokeWidth="2.5" />
        <path d="M15 22l4 4 8-9" stroke="currentColor" strokeWidth="2.5" />
      </svg>
    );
  }
  if (k.includes("web") || k.includes("dev")) {
    return (
      <svg viewBox="0 0 48 48" className="w-7 h-7" {...common}>
        <rect x="6" y="9" width="36" height="26" rx="3" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="2.5" />
        <path d="M6 16h36" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="11" cy="12.5" r="1" fill="currentColor" />
        <circle cx="15" cy="12.5" r="1" fill="currentColor" />
        <path d="M18 40h12M24 35v5" stroke="currentColor" strokeWidth="2.5" />
      </svg>
    );
  }
  if (k.includes("analytics") || k.includes("track")) {
    return (
      <svg viewBox="0 0 48 48" className="w-7 h-7" {...common}>
        <path d="M8 8v30a2 2 0 0 0 2 2h30" stroke="currentColor" strokeWidth="2.5" />
        <rect x="14" y="26" width="6" height="10" rx="1.5" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="2.5" />
        <rect x="24" y="19" width="6" height="17" rx="1.5" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="2.5" />
        <rect x="34" y="13" width="6" height="23" rx="1.5" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="2.5" />
      </svg>
    );
  }
  if (k.includes("brand") || k.includes("design")) {
    return (
      <svg viewBox="0 0 48 48" className="w-7 h-7" {...common}>
        <path d="M18 30l-9 9a4 4 0 0 0 6 6l9-9" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.12" />
        <path d="M22 26l14-14a4 4 0 0 1 6 6L28 32" stroke="currentColor" strokeWidth="2.5" />
        <path d="M20 24l4 4" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="14" cy="40" r="1.5" fill="currentColor" />
      </svg>
    );
  }

  // Default ads icon
  return (
    <svg viewBox="0 0 48 48" className="w-7 h-7" {...common}>
      <path d="M6 30V18a3 3 0 0 1 3-3h6l14-8v34l-14-8H9a3 3 0 0 1-3-3Z" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="2.5" />
      <path d="M35 18a8 8 0 0 1 0 12" stroke="currentColor" strokeWidth="2.5" />
      <path d="M40 13a15 15 0 0 1 0 22" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.5" />
    </svg>
  );
}

export default async function ServicesGrid() {
  const dbServices = await db.service
    .findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    })
    .catch(() => []);

  const services = dbServices.length ? dbServices : DEFAULT_SERVICES;

  return (
    <section id="services-overview" className="bg-[var(--color-background)] py-20 px-6" aria-labelledby="services-overview-heading">
      <Container>
        <SectionHeading id="services-overview-heading" label="What We Offer" title="Our Core Growth Services" center className="mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s, i) => {
            const slug = s.slug || s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
            const shortDesc = s.shortDescription || "";

            return (
              <div
                key={s.id || s.title}
                className={`reveal reveal-delay-${(i % 2) + 1} premium-card group relative overflow-hidden border border-[var(--color-border)] rounded-[var(--radius-xl)] p-8 bg-white shadow-[var(--shadow-sm)] flex flex-col justify-between`}
              >
                {/* hover glow */}
                <div className="pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full bg-[var(--color-navy)] opacity-0 group-hover:opacity-[0.06] blur-2xl transition-opacity duration-500" />

                <div>
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-14 h-14 rounded-[var(--radius-lg)] grid place-items-center bg-[var(--color-off-white)] border border-[var(--color-border)] text-[var(--color-navy)] group-hover:bg-[var(--color-navy)] group-hover:text-white transition-colors duration-300">
                      <ServiceIcon icon={s.icon || s.slug} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-extrabold text-[var(--color-navy)] text-xl leading-tight">
                        <Link href={`/services/${slug}`} className="hover:text-[var(--color-navy-bright)] transition-colors">
                          {s.title}
                        </Link>
                      </h3>
                      {shortDesc && (
                        <p className="mt-1 text-xs font-semibold text-[var(--color-navy-bright)] uppercase tracking-wide">
                          {shortDesc}
                        </p>
                      )}
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-[var(--color-muted)] leading-relaxed line-clamp-3">
                    {s.description}
                  </p>

                  {s.features && s.features.length > 0 && (
                    <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                      {s.features.slice(0, 4).map((item) => (
                        <li key={item} className="text-xs text-[var(--color-muted)] flex items-start gap-2">
                          <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[var(--color-navy-bright)]" fill="none">
                            <path d="M3 8.5l3 3 7-7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
                  <Link
                    href={`/services/${slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-navy)] group-hover:text-[var(--color-navy-bright)] transition-colors"
                  >
                    View Details & Outcomes
                    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
