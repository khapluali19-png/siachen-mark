import { db } from "@/lib/db";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Image from "next/image";
import TrackedLink from "@/components/ui/TrackedLink";

type MockupKey = "clinic" | "freight" | "ecommerce" | "restaurant" | "realestate" | "saas";

interface DefaultProject {
  id?: string;
  name: string;
  category: string;
  services: string[];
  focus: { label: string; detail: string }[];
  desc: string;
  accent: string;
  mockup: MockupKey;
  coverImage?: string | null;
}

const DEFAULT_PROJECTS: DefaultProject[] = [
  {
    name: "Aesthetic Wellness Clinic",
    category: "Healthcare",
    services: ["Performance Marketing", "Meta Ads", "Conversion Tracking"],
    focus: [
      { label: "Targeting", detail: "Local High-Intent" },
      { label: "Funnel", detail: "CAPI + Booking" },
      { label: "Focus", detail: "Lead Quality" },
    ],
    desc: "Full-funnel growth setup for an aesthetic clinic — from Meta campaigns to end-to-end conversion tracking and patient inquiry management.",
    accent: "#0035ca",
    mockup: "clinic",
  },
  {
    name: "B2B Freight & Logistics",
    category: "Logistics",
    services: ["SEO", "Web Design", "LinkedIn Content"],
    focus: [
      { label: "SEO", detail: "Technical Audit" },
      { label: "UX", detail: "Corporate Profile" },
      { label: "Reach", detail: "B2B Decision Makers" },
    ],
    desc: "Website redesign, technical SEO, and founder-led LinkedIn content strategy for a commercial freight operator.",
    accent: "#0a1e6e",
    mockup: "freight",
  },
  {
    name: "Artisan E-commerce Brand",
    category: "E-commerce",
    services: ["Branding", "Social Media", "Short-form Video"],
    focus: [
      { label: "Visuals", detail: "Product Catalog" },
      { label: "Content", detail: "Reels & Shorts" },
      { label: "Branding", detail: "Identity System" },
    ],
    desc: "Brand identity, product catalog design, and short-form video creative built to build trust and highlight craftsmanship.",
    accent: "#1a2f8a",
    mockup: "ecommerce",
  },
  {
    name: "Fine-Dining Restaurant",
    category: "Hospitality",
    services: ["Local SEO", "Google Business", "Social Media"],
    focus: [
      { label: "Maps", detail: "Profile Optimization" },
      { label: "Media", detail: "Visual Menus" },
      { label: "Local", detail: "Geo-Targeting" },
    ],
    desc: "Local search dominance and a consistent content system that keeps tables booked through peak dining hours.",
    accent: "#0035ca",
    mockup: "restaurant",
  },
  {
    name: "Real-Estate Developer",
    category: "Real Estate",
    services: ["Lead Gen", "Landing Pages", "GA4 Tracking"],
    focus: [
      { label: "Landing", detail: "High-Converting Page" },
      { label: "Ads", detail: "Meta & Google" },
      { label: "Analytics", detail: "GA4 Funnel" },
    ],
    desc: "High-intent lead generation with dedicated landing pages and full GA4 measurement for a property development launch.",
    accent: "#0a1e6e",
    mockup: "realestate",
  },
  {
    name: "B2B SaaS Platform",
    category: "Technology",
    services: ["Google Ads", "SEO", "Analytics"],
    focus: [
      { label: "PPC", detail: "Search Intent Ads" },
      { label: "Content", detail: "SEO Hub" },
      { label: "Tracking", detail: "Signup Funnel" },
    ],
    desc: "Search and content strategy that turned a quiet product page into a predictable trial-signup acquisition engine.",
    accent: "#1a2f8a",
    mockup: "saas",
  },
];

function Mockup({ variant, accent }: { variant: MockupKey; accent: string }) {
  return (
    <div className="relative w-full h-44 overflow-hidden" style={{ background: `linear-gradient(135deg, ${accent}14, ${accent}05)` }}>
      <svg viewBox="0 0 320 180" className="w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {variant === "clinic" && (
          <g>
            <rect x="120" y="30" width="140" height="120" rx="8" fill="white" />
            <rect x="120" y="30" width="140" height="26" rx="8" fill={accent} />
            <circle cx="134" cy="43" r="4" fill="white" fillOpacity="0.8" />
            <rect x="136" y="72" width="108" height="8" rx="4" fill={accent} fillOpacity="0.25" />
            <rect x="136" y="88" width="80" height="6" rx="3" fill={accent} fillOpacity="0.15" />
            <rect x="136" y="104" width="72" height="18" rx="9" fill={accent} />
            <path d="M60 96h20v-14h14v14h20v14h-20v14H80v-14H60z" fill={accent} fillOpacity="0.9" />
          </g>
        )}
        {variant === "freight" && (
          <g>
            <path d="M40 120h150v-40H150l-16-22H40z" fill="white" />
            <path d="M190 120h50l24-30h-74z" fill={accent} />
            <circle cx="80" cy="128" r="14" fill={accent} />
            <circle cx="80" cy="128" r="6" fill="white" />
            <circle cx="220" cy="128" r="14" fill={accent} />
            <circle cx="220" cy="128" r="6" fill="white" />
            <path d="M40 60h120M40 74h90" stroke={accent} strokeWidth="4" strokeOpacity="0.3" strokeLinecap="round" />
          </g>
        )}
        {variant === "ecommerce" && (
          <g>
            <rect x="70" y="34" width="180" height="112" rx="10" fill="white" />
            <rect x="86" y="50" width="60" height="48" rx="6" fill={accent} fillOpacity="0.18" />
            <rect x="160" y="50" width="60" height="48" rx="6" fill={accent} fillOpacity="0.35" />
            <rect x="86" y="108" width="90" height="7" rx="3.5" fill={accent} fillOpacity="0.3" />
            <rect x="86" y="122" width="60" height="7" rx="3.5" fill={accent} fillOpacity="0.15" />
            <circle cx="212" cy="122" r="14" fill={accent} />
            <path d="M206 122h12M212 116v12" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        )}
        {variant === "restaurant" && (
          <g>
            <circle cx="160" cy="90" r="52" fill="white" />
            <circle cx="160" cy="90" r="38" fill={accent} fillOpacity="0.12" />
            <circle cx="160" cy="90" r="20" fill={accent} fillOpacity="0.3" />
            <path d="M118 60v40M114 60v18a4 4 0 0 0 8 0V60" stroke={accent} strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M206 60c-6 0-10 8-10 20s4 14 4 14v6" stroke={accent} strokeWidth="4" strokeLinecap="round" fill="none" />
          </g>
        )}
        {variant === "realestate" && (
          <g>
            <path d="M100 84l60-42 60 42v56a4 4 0 0 1-4 4h-40v-40h-32v40h-40a4 4 0 0 1-4-4z" fill="white" />
            <path d="M88 88l72-50 72 50" stroke={accent} strokeWidth="5" strokeLinecap="round" fill="none" />
            <rect x="144" y="108" width="32" height="24" rx="3" fill={accent} fillOpacity="0.25" />
            <circle cx="200" cy="60" r="12" fill={accent} />
            <path d="M195 60l4 4 6-8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </g>
        )}
        {variant === "saas" && (
          <g>
            <rect x="70" y="34" width="180" height="112" rx="10" fill="white" />
            <rect x="70" y="34" width="180" height="22" rx="10" fill={accent} fillOpacity="0.15" />
            <path d="M90 118l30-28 26 18 40-46" stroke={accent} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <circle cx="186" cy="62" r="4" fill={accent} />
            <rect x="90" y="130" width="40" height="6" rx="3" fill={accent} fillOpacity="0.2" />
            <rect x="140" y="130" width="40" height="6" rx="3" fill={accent} fillOpacity="0.2" />
          </g>
        )}
      </svg>
    </div>
  );
}

export default async function FeaturedProjects() {
  const dbProjects = await db.portfolioProject.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  }).catch(() => []);

  const projectList = dbProjects.length > 0
    ? dbProjects.map((p, idx) => ({
        id: p.id,
        name: p.title,
        category: p.category,
        services: p.services.length ? p.services : ["Performance Marketing", "Strategy"],
        focus: [
          { label: "Objective", detail: p.category },
          { label: "Strategy", detail: p.result || "Full-Funnel Growth" },
          { label: "Delivery", detail: "Verified System" },
        ],
        desc: p.description,
        accent: idx % 2 === 0 ? "#0035ca" : "#0a1e6e",
        mockup: (["clinic", "freight", "ecommerce", "restaurant", "realestate", "saas"][idx % 6]) as MockupKey,
        coverImage: p.coverImage,
      }))
    : DEFAULT_PROJECTS;

  return (
    <section id="portfolio-projects" className="bg-[var(--color-background)] py-24 px-6">
      <Container>
        <SectionHeading
          label="Our Work"
          title="Client Engagement Highlights"
          subtitle="Projects across healthcare, logistics, hospitality, real estate, and technology — showing the approach, the work, and the objective."
          center
          className="mb-14"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectList.map((p, i) => (
            <article
              key={p.name}
              className={`reveal reveal-delay-${(i % 3) + 1} premium-card group relative flex flex-col rounded-[var(--radius-xl)] border border-[var(--color-border)] overflow-hidden bg-white shadow-[var(--shadow-sm)]`}
            >
              {/* Media / Mockup */}
              <div className="relative overflow-hidden">
                {p.coverImage ? (
                  <div className="relative w-full h-44 overflow-hidden bg-gray-100">
                    <Image
                      src={p.coverImage}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="image-hover-zoom object-cover"
                    />
                  </div>
                ) : (
                  <div className="overflow-hidden">
                    <Mockup variant={p.mockup} accent={p.accent} />
                  </div>
                )}
                <span
                  className="absolute top-3 left-3 px-3 py-1 rounded-[var(--radius-full)] text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-sm shadow-sm"
                  style={{ background: `${p.accent}e6` }}
                >
                  {p.category}
                </span>
              </div>

              <div className="flex flex-col flex-1 p-6">
                <h3 className="font-extrabold text-[var(--color-navy)] text-lg leading-tight">{p.name}</h3>
                <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed flex-1">{p.desc}</p>

                {/* Qualitative Focus Areas */}
                <div className="mt-5 grid grid-cols-3 gap-2 rounded-[var(--radius-lg)] bg-[var(--color-off-white)] border border-[var(--color-border)] p-3">
                  {p.focus.map((f) => (
                    <div key={f.label} className="text-center">
                      <p className="text-[10px] text-[var(--color-muted)] uppercase tracking-wide">{f.label}</p>
                      <p className="text-xs font-extrabold mt-0.5" style={{ color: p.accent }}>{f.detail}</p>
                    </div>
                  ))}
                </div>

                {/* Service tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.services.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded-[var(--radius-full)] bg-[var(--color-off-white)] border border-[var(--color-border)] text-xs font-medium text-[var(--color-navy)]"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Case study CTA */}
                <div className="mt-5 pt-4 border-t border-[var(--color-border)]">
                  <TrackedLink
                    href="/contact"
                    trackingType="strategy_call"
                    trackingLocation={`portfolio_card_${p.name.toLowerCase().replace(/[^a-z0-9]+/g, "_")}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-navy)] group-hover:text-[var(--color-navy-bright)] transition-colors"
                  >
                    Discuss Similar Project
                    <svg viewBox="0 0 20 20" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none">
                      <path d="M4 10h11M11 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </TrackedLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
