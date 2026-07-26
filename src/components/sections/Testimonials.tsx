import { db } from "@/lib/db";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const ACCENTS = ["#0035ca", "#0a1e6e", "#1a2f8a"];

const FALLBACK = [
  { quote: "Our appointment bookings finally have a system behind them — not just guesswork. The Meta campaigns they built brought in patients we'd never have reached otherwise.", name: "Dr. S. Rahman", role: "Clinic Director", company: "Aesthetic Wellness Clinic", industry: "Healthcare", initials: "SR", accent: "#0035ca" },
  { quote: "They didn't just build us a website. They built us a way to actually get found. Six keywords on page one within three months — that's real SEO.", name: "M. Tanveer", role: "Operations Lead", company: "Tanveer Freight Solutions", industry: "Logistics", initials: "MT", accent: "#0a1e6e" },
  { quote: "Our brand finally looks like the product we make. The catalog design alone changed how buyers perceive us at trade shows.", name: "A. Rehman", role: "Founder", company: "Artisan Co.", industry: "E-commerce", initials: "AR", accent: "#1a2f8a" },
  { quote: "Tables were half-empty on weekdays. After the Google Business and social work, we're booked out Thursday through Sunday every week.", name: "K. Mirza", role: "Owner", company: "Mirza Fine Dining", industry: "Hospitality", initials: "KM", accent: "#0035ca" },
  { quote: "312 leads in the first launch week. The landing page and tracking setup they built made every rupee of ad spend accountable.", name: "F. Siddiqui", role: "Marketing Director", company: "Siddiqui Properties", industry: "Real Estate", initials: "FS", accent: "#0a1e6e" },
  { quote: "Free trial signups went up 140% in two months. They understood our funnel better than our previous agency ever did.", name: "Z. Baig", role: "Head of Growth", company: "Nexus SaaS", industry: "Technology", initials: "ZB", accent: "#1a2f8a" },
];

type TCard = { quote: string; name: string; role: string; company?: string | null; industry?: string | null; initials: string; accent: string };

function initials(name: string) { return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase(); }

const StarRow = () => (
  <div className="flex gap-0.5" aria-label="5 stars">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} viewBox="0 0 16 16" className="w-3.5 h-3.5 text-amber-400" fill="currentColor" aria-hidden="true">
        <path d="M8 1l1.85 3.75L14 5.5l-3 2.92.71 4.13L8 10.4l-3.71 2.15L5 8.42 2 5.5l4.15-.75z" />
      </svg>
    ))}
  </div>
);

const VerifiedBadge = () => (
  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-semibold text-emerald-700 uppercase tracking-wide">
    <svg viewBox="0 0 16 16" className="w-3 h-3" fill="currentColor" aria-hidden="true">
      <path d="M8 0l1.6 2.4 2.8-.4-.8 2.8 2 2-2 2 .8 2.8-2.8-.4L8 16l-1.6-2.4-2.8.4.8-2.8-2-2 2-2-.8-2.8 2.8.4z" fillOpacity="0.2" />
      <path d="M6 8l1.5 1.5 3-3" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
    Verified
  </span>
);

function TestimonialCard({ t }: { t: TCard }) {
  return (
    <figure
      className="relative shrink-0 w-80 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-background)]/80 backdrop-blur-sm p-6 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] hover:-translate-y-1 transition-all duration-300 mx-3"
    >
      {/* decorative quote */}
      <span className="absolute top-4 right-5 text-5xl font-serif leading-none text-[var(--color-navy)] opacity-[0.07] select-none" aria-hidden="true">&ldquo;</span>

      <div className="flex items-center justify-between mb-4">
        <StarRow />
        <VerifiedBadge />
      </div>

      <blockquote className="text-sm text-[var(--color-foreground)] leading-relaxed mb-5">
        &ldquo;{t.quote}&rdquo;
      </blockquote>

      <figcaption className="flex items-center gap-3 pt-4 border-t border-[var(--color-border)]">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold shadow-[var(--shadow-sm)]"
          style={{ background: t.accent }}
        >
          {t.initials}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-[var(--color-navy)] text-sm truncate">{t.name}</p>
          <p className="text-xs text-[var(--color-muted)] truncate">{t.role} · {t.company}</p>
        </div>
        <span className="ml-auto shrink-0 px-2.5 py-1 rounded-full bg-[var(--color-off-white)] border border-[var(--color-border)] text-[10px] font-semibold text-[var(--color-navy)] uppercase tracking-wide">
          {t.industry}
        </span>
      </figcaption>
    </figure>
  );
}

export default async function Testimonials() {
  const rows = await db.testimonial.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  }).catch(() => []);

  const testimonials: TCard[] = rows.length
    ? rows.map((t, i) => ({
        quote: t.quote,
        name: t.name,
        role: t.role,
        company: t.company,
        industry: t.industry,
        initials: initials(t.name),
        accent: ACCENTS[i % ACCENTS.length],
      }))
    : FALLBACK;
  return (
    <section className="bg-[var(--color-off-white)] py-24 overflow-hidden">
      <Container>
        <SectionHeading
          label="Client Stories"
          title="Results That Speak"
          subtitle="Real outcomes from real partnerships — across healthcare, logistics, hospitality, real estate, and technology."
          center
          className="mb-14"
        />
      </Container>

      {/* Marquee track — pause on hover via CSS group */}
      <div className="group relative">
        {/* fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-[var(--color-off-white)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-[var(--color-off-white)] to-transparent" />

        <div className="flex animate-marquee group-hover:[animation-play-state:paused] w-max">
          {[...testimonials, ...testimonials].map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
