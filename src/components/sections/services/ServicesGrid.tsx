import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

type IconKey = "ads" | "social" | "seo" | "web" | "analytics" | "brand";

const services: {
  title: string;
  hook: string;
  desc: string;
  includes: string[];
  icon: IconKey;
}[] = [
  {
    title: "Performance Marketing",
    hook: "Anyone can run ads. Not everyone can make them profitable.",
    desc: "We build, launch, and optimize paid campaigns across Meta, Google, and LinkedIn — backed by real audience research, not guesswork. Every campaign is tracked from click to conversion.",
    includes: ["Campaign setup & optimization", "Audience research & retargeting", "Local Services Ads (LSA)", "A/B testing", "ROI/ROAS reporting"],
    icon: "ads",
  },
  {
    title: "Social Media Management",
    hook: "Not every business should be on every platform.",
    desc: "We choose the platforms that match your customers — then build a consistent, scheduled content system so your page always looks active and professional.",
    includes: ["Page setup & audits", "Monthly content calendars", "Organic posting (reels, carousels, stories)", "Community management", "LinkedIn growth strategy"],
    icon: "social",
  },
  {
    title: "SEO & Local Search",
    hook: "SEO begins before you publish content.",
    desc: "We start with a full technical and on-page audit — no blanket strategy applied before we know what's actually broken. Then we fix the foundation: speed, structure, metadata, and local visibility.",
    includes: ["Technical & on-page SEO audits", "Google Business Profile & Maps optimization", "Schema markup", "Content & blog strategy"],
    icon: "seo",
  },
  {
    title: "Website Design & Development",
    hook: "Your website is your digital home. Not your social media page.",
    desc: "Social media attracts visitors. Your website converts them. We build fast, mobile-first websites — WordPress or fully custom — designed around one clear goal per page.",
    includes: ["WordPress & custom builds", "Landing pages", "Mobile-responsive design", "Speed optimization"],
    icon: "web",
  },
  {
    title: "Full-Funnel Tracking & Analytics",
    hook: "Your ads are blind without tracking.",
    desc: "Most agencies stop at a results screenshot. We connect every platform — Meta Pixel, Conversions API, GTM, GA4 — into one measurement system before a single campaign runs.",
    includes: ["Meta Pixel & Conversions API setup", "GTM & GA4 setup", "Full-funnel reporting dashboards"],
    icon: "analytics",
  },
  {
    title: "Branding & Graphic Design",
    hook: "People judge your business before reading your content.",
    desc: "From logos to full brand identity systems, company profiles, and product catalogs — we design with purpose, not decoration.",
    includes: ["Logo & brand identity", "Company & corporate profiles", "Product catalogs", "Brochures & print materials"],
    icon: "brand",
  },
];

function ServiceIcon({ icon }: { icon: IconKey }) {
  const common = { fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (icon) {
    case "ads":
      return (
        <svg viewBox="0 0 48 48" className="w-7 h-7" {...common}>
          <path d="M6 30V18a3 3 0 0 1 3-3h6l14-8v34l-14-8H9a3 3 0 0 1-3-3Z" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="2.5" />
          <path d="M35 18a8 8 0 0 1 0 12" stroke="currentColor" strokeWidth="2.5" />
          <path d="M40 13a15 15 0 0 1 0 22" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.5" />
        </svg>
      );
    case "social":
      return (
        <svg viewBox="0 0 48 48" className="w-7 h-7" {...common}>
          <circle cx="13" cy="14" r="5" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="35" cy="14" r="5" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="24" cy="33" r="5" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="2.5" />
          <path d="M16 17l6 12M32 17l-6 12" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.6" />
        </svg>
      );
    case "seo":
      return (
        <svg viewBox="0 0 48 48" className="w-7 h-7" {...common}>
          <circle cx="21" cy="21" r="12" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="2.5" />
          <path d="M30 30l10 10" stroke="currentColor" strokeWidth="2.5" />
          <path d="M15 22l4 4 8-9" stroke="currentColor" strokeWidth="2.5" />
        </svg>
      );
    case "web":
      return (
        <svg viewBox="0 0 48 48" className="w-7 h-7" {...common}>
          <rect x="6" y="9" width="36" height="26" rx="3" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="2.5" />
          <path d="M6 16h36" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="11" cy="12.5" r="1" fill="currentColor" />
          <circle cx="15" cy="12.5" r="1" fill="currentColor" />
          <path d="M18 40h12M24 35v5" stroke="currentColor" strokeWidth="2.5" />
        </svg>
      );
    case "analytics":
      return (
        <svg viewBox="0 0 48 48" className="w-7 h-7" {...common}>
          <path d="M8 8v30a2 2 0 0 0 2 2h30" stroke="currentColor" strokeWidth="2.5" />
          <rect x="14" y="26" width="6" height="10" rx="1.5" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="2.5" />
          <rect x="24" y="19" width="6" height="17" rx="1.5" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="2.5" />
          <rect x="34" y="13" width="6" height="23" rx="1.5" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="2.5" />
        </svg>
      );
    case "brand":
      return (
        <svg viewBox="0 0 48 48" className="w-7 h-7" {...common}>
          <path d="M18 30l-9 9a4 4 0 0 0 6 6l9-9" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.12" />
          <path d="M22 26l14-14a4 4 0 0 1 6 6L28 32" stroke="currentColor" strokeWidth="2.5" />
          <path d="M20 24l4 4" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="14" cy="40" r="1.5" fill="currentColor" />
        </svg>
      );
  }
}

export default function ServicesGrid() {
  return (
    <section className="bg-[var(--color-background)] py-20 px-6">
      <Container>
        <SectionHeading label="What We Offer" title="Our Services" center className="mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="reveal group relative overflow-hidden border border-[var(--color-border)] rounded-[var(--radius-xl)] p-8 bg-[var(--color-background)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] hover:-translate-y-1 transition-all duration-300"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {/* hover glow */}
              <div className="pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full bg-[var(--color-navy)] opacity-0 group-hover:opacity-[0.06] blur-2xl transition-opacity duration-500" />

              <div className="flex items-start gap-4">
                <div className="shrink-0 w-14 h-14 rounded-[var(--radius-lg)] grid place-items-center bg-[var(--color-off-white)] border border-[var(--color-border)] text-[var(--color-navy)] group-hover:bg-[var(--color-navy)] group-hover:text-white transition-colors duration-300">
                  <ServiceIcon icon={s.icon} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-extrabold text-[var(--color-navy)] text-xl leading-tight">{s.title}</h3>
                  <p className="mt-1 text-sm font-semibold text-[var(--color-navy-bright)] italic">{s.hook}</p>
                </div>
              </div>

              <p className="mt-4 text-sm text-[var(--color-muted)] leading-relaxed">{s.desc}</p>

              <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                {s.includes.map((item) => (
                  <li key={item} className="text-xs text-[var(--color-muted)] flex items-start gap-2">
                    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[var(--color-navy-bright)]" fill="none">
                      <path d="M3 8.5l3 3 7-7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
