import { db } from "@/lib/db";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import VectorPortrait from "@/components/ui/VectorPortrait";
import Image from "next/image";
const FALLBACK = [
  {
    name: "Basharat Ali",
    role: "Founder",
    title: "Digital Marketing Expert",
    bio: "Basharat leads digital marketing at Siachen Mark. Over 3+ years, he's worked with 100+ clients across Pakistan and 15+ countries, covering performance marketing, SEO, social strategy, email marketing, and WhatsApp automation. With a Computer Science background, he brings an analytical, test-and-measure approach to every campaign.",
    linkedin: "https://linkedin.com/in/basharat-ali-digital-marketing",
    stats: [{ v: "100+", l: "Clients" }, { v: "15+", l: "Countries" }, { v: "3+", l: "Years" }],
    accentColor: "#0a1e6e", skinTone: "#d4956a", hairColor: "#1a0e05",
  },
  {
    name: "Mushtaq Ali",
    role: "Co-Founder",
    title: "Senior Graphic Designer",
    bio: "Mushtaq is our Senior Graphic Designer, specialising in company profiles, corporate profiles, and product catalog design. With 5+ years of experience across institutes, agencies, and private companies, he builds corporate design solutions that are clean, professional, and built to earn trust.",
    linkedin: "https://linkedin.com/in/mushtaq-ali-524424321",
    stats: [{ v: "5+", l: "Years" }, { v: "200+", l: "Designs" }, { v: "50+", l: "Brands" }],
    accentColor: "#0035ca", skinTone: "#c8845a", hairColor: "#0e0805",
  },
];

const PALETTE = [
  { accentColor: "#0a1e6e", skinTone: "#d4956a", hairColor: "#1a0e05" },
  { accentColor: "#0035ca", skinTone: "#c8845a", hairColor: "#0e0805" },
  { accentColor: "#1a2f8a", skinTone: "#e8b090", hairColor: "#2d1a0e" },
];

export default async function Founders() {
  const rows = await db.teamMember.findMany({
    where: { isFounder: true, published: true },
    orderBy: { order: "asc" },
  }).catch(() => []);

  const founders = rows.length
    ? rows.map((m, i) => ({
        name: m.name,
        role: m.role,
        title: m.title ?? "",
        bio: m.bio ?? "",
        linkedin: m.linkedin ?? "#",
        stats: Array.isArray(m.stats) ? (m.stats as { v: string; l: string }[]) : [],
        image: m.image,
        ...PALETTE[i % PALETTE.length],
      }))
    : FALLBACK.map((f) => ({ ...f, image: null }));

  return (
    <section className="bg-[var(--color-background)] py-24 px-6">
      <Container>
        <SectionHeading label="Leadership" title="Meet the Founders" center className="mb-14" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {founders.map((f, i) => (
            <article
              key={f.name}
              className="reveal group relative rounded-[var(--radius-xl)] border border-[var(--color-border)] overflow-hidden shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] transition-all duration-300"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="h-1.5 w-full" style={{ background: f.accentColor }} />
              <div className="p-8 flex flex-col sm:flex-row gap-8">
                <div className="shrink-0 flex flex-col items-center gap-3">
                  <div
                    className="w-32 h-32 rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-md)] animate-float"
                    style={{ animationDelay: `${i * 0.8}s` }}
                  >
                    {f.image ? (
  <Image
    src={f.image}
    alt={f.name}
    fill
    className="object-cover"
  />
) : (
                      <VectorPortrait
                        name={f.name}
                        accentColor={f.accentColor}
                        skinTone={f.skinTone}
                        hairColor={f.hairColor}
                        className="w-full h-full"
                      />
                      
                    )}
                  </div>
                  {f.stats.length > 0 && (
                    <div className="flex gap-3">
                      {f.stats.map((s) => (
                        <div key={s.l} className="text-center">
                          <p className="text-base font-extrabold text-[var(--color-navy)]">{s.v}</p>
                          <p className="text-[10px] text-[var(--color-muted)] uppercase tracking-wide">{s.l}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="inline-block px-3 py-1 rounded-[var(--radius-full)] text-xs font-semibold uppercase tracking-widest mb-3"
                    style={{ background: `${f.accentColor}18`, color: f.accentColor }}>
                    {f.role}
                  </span>
                  <h3 className="font-extrabold text-[var(--color-navy)] text-xl">{f.name}</h3>
                  {f.title && <p className="text-sm font-semibold text-[var(--color-muted)] mt-0.5">{f.title}</p>}
                  {f.bio && <p className="mt-4 text-sm text-[var(--color-muted)] leading-relaxed">{f.bio}</p>}
                  {f.linkedin && f.linkedin !== "#" && (
                    <a
                      href={f.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-navy)] hover:text-[var(--color-navy-bright)] transition-colors"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      LinkedIn Profile
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
