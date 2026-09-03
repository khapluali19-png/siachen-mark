import Container from "@/components/ui/Container";
import ServiceCard from "@/components/ui/ServiceCard";
import SectionHeading from "@/components/ui/SectionHeading";
import Link from "next/link";
import { db } from "@/lib/db";

/* ── SVG icons (inline, no dependency) ── */
const MetaIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
  </svg>
);
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v4l3 3" />
  </svg>
);
const SocialIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 2h-3a5 5 0 0 0-5 5v3H6v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const CreativeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
  </svg>
);
const WebIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>
);
const SEOIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35M11 8v6M8 11h6" />
  </svg>
);
const LeadIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const EcomIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const DEFAULT_SERVICES = [
  {
    icon: <MetaIcon />,
    title: "Meta Ads",
    outcome: "More customers at lower cost",
    description:
      "Reach the right audiences and scale profitable campaigns using structured testing, creative rotation, and server-side conversion tracking.",
    href: "/services/performance-marketing",
  },
  {
    icon: <GoogleIcon />,
    title: "Google Ads",
    outcome: "Capture high-intent demand",
    description:
      "Search, Shopping, and Performance Max campaigns built to capture customers actively looking for your product or service.",
    href: "/services/performance-marketing",
  },
  {
    icon: <SocialIcon />,
    title: "Social Media Marketing",
    outcome: "Build audience & drive engagement",
    description:
      "Consistent, on-brand content across Instagram, Facebook, LinkedIn and TikTok — managed end-to-end by our in-house team.",
    href: "/services/social-media-management",
  },
  {
    icon: <SEOIcon />,
    title: "SEO & Local Search",
    outcome: "Rank for terms that bring revenue",
    description:
      "Technical SEO, content strategy, and link building — structured around keywords that drive qualified traffic, not just impressions.",
    href: "/services/seo-local-search",
  },
  {
    icon: <WebIcon />,
    title: "Web Design & Development",
    outcome: "Sites built to turn visitors into buyers",
    description:
      "Fast, mobile-first websites with conversion-optimised layouts, clear CTAs, and full analytics integration from day one.",
    href: "/services/web-design-development",
  },
  {
    icon: <LeadIcon />,
    title: "Full-Funnel Tracking",
    outcome: "Know your numbers with precision",
    description:
      "End-to-end tracking infrastructure with Meta Conversions API, Google Tag Manager, GA4, and custom conversion funnels.",
    href: "/services/tracking-analytics",
  },
  {
    icon: <CreativeIcon />,
    title: "Branding & Creative Design",
    outcome: "Visual identity that builds trust",
    description:
      "Company profiles, product catalogs, brand guidelines, and high-impact visual design built with commercial purpose.",
    href: "/services/branding-graphic-design",
  },
  {
    icon: <EcomIcon />,
    title: "Lead Generation",
    outcome: "Fill your pipeline with qualified leads",
    description:
      "Multi-channel lead gen systems combining paid media, dedicated landing pages, CRM integration, and automated follow-ups.",
    href: "/services/performance-marketing",
  },
];

function getServiceIcon(slugOrTitle: string) {
  const s = slugOrTitle.toLowerCase();
  if (s.includes("google")) return <GoogleIcon />;
  if (s.includes("social") || s.includes("media")) return <SocialIcon />;
  if (s.includes("seo") || s.includes("search")) return <SEOIcon />;
  if (s.includes("web") || s.includes("dev")) return <WebIcon />;
  if (s.includes("brand") || s.includes("creative") || s.includes("design")) return <CreativeIcon />;
  if (s.includes("track") || s.includes("analytics")) return <LeadIcon />;
  if (s.includes("ecom") || s.includes("lead")) return <EcomIcon />;
  return <MetaIcon />;
}

export default async function ServicesPreview() {
  const dbServices = await db.service
    .findMany({
      where: { published: true },
      orderBy: { order: "asc" },
      take: 8,
    })
    .catch(() => []);

  const items = dbServices.length > 0
    ? dbServices.map((s) => ({
        icon: getServiceIcon(s.slug || s.title),
        title: s.title,
        outcome: s.shortDescription || "Tailored growth outcome",
        description: s.description,
        href: `/services/${s.slug}`,
      }))
    : DEFAULT_SERVICES;

  return (
    <section className="bg-[var(--color-off-white)] py-24 px-6" aria-labelledby="services-heading">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <SectionHeading
            label="What We Do"
            title="Services That Drive Real Business Outcomes"
            subtitle="Every service we offer is built around one question: what will move the needle for your business?"
            id="services-heading"
          />
          <Link
            href="/services"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-2.5 rounded-[var(--radius-full)] border border-[var(--color-navy)] text-[var(--color-navy)] text-sm font-semibold hover:bg-[var(--color-navy)] hover:text-white transition-colors duration-200"
          >
            View All Services
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((s, i) => (
            <div key={s.title} className={`reveal reveal-delay-${Math.min((i % 4) + 1, 5)}`}>
              <ServiceCard
                icon={s.icon}
                title={s.title}
                outcome={s.outcome}
                description={s.description}
                href={s.href}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
