import { db } from "@/lib/db";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Image from "next/image";

const FALLBACK_TEAM = [
  {
    id: "fb-1",
    name: "Kamran Sarwar",
    role: "Social Media Executive",
    department: "Marketing",
    skills: ["Social Strategy", "Content Creation", "Community Management"],
    bio: "I combine creativity with strategy to create content that connects, engages, and delivers measurable growth.",
    image: null,
    linkedin: "https://www.linkedin.com/company/109209003",
    email: "kamran@siachenmark.com",
  },
  {
    id: "fb-2",
    name: "Naira Zehra",
    role: "Performance Marketer",
    department: "Paid Media",
    skills: ["Meta Ads", "Google Ads", "Conversion Tracking"],
    bio: "I combine creativity with analytics to run smart campaigns that maximize ROI.",
    image: null,
    linkedin: "https://www.linkedin.com/company/109209003",
    email: "naira@siachenmark.com",
  },
  {
    id: "fb-3",
    name: "Malika Zahid",
    role: "Graphic Designer",
    department: "Design",
    skills: ["Brand Identity", "Ad Creatives", "Catalog Design"],
    bio: "I focus on creativity, consistency, and clarity to design visuals that build trust.",
    image: null,
    linkedin: "https://www.linkedin.com/company/109209003",
    email: "malika@siachenmark.com",
  },
  {
    id: "fb-4",
    name: "Zeshan",
    role: "Video Editor",
    department: "Content",
    skills: ["Reels & Shorts", "Motion Graphics", "Video Production"],
    bio: "I focus on timing, storytelling, and visual impact to craft high-converting video ads.",
    image: null,
    linkedin: "https://www.linkedin.com/company/109209003",
    email: "zeshan@siachenmark.com",
  },
  {
    id: "fb-5",
    name: "Khalid",
    role: "WordPress & Web Developer",
    department: "Development",
    skills: ["Web Development", "UI/UX Optimization", "Speed & Security"],
    bio: "I focus on clean code, modern responsive design, and seamless user experiences.",
    image: null,
    linkedin: "https://www.linkedin.com/company/109209003",
    email: "khalid@siachenmark.com",
  },
];

export default async function Team() {
  const dbMembers = await db.teamMember
    .findMany({
      where: { published: true, isFounder: false },
      orderBy: { order: "asc" },
    })
    .catch(() => []);

  const team = dbMembers.length ? dbMembers : FALLBACK_TEAM;

  return (
    <section className="bg-[var(--color-off-white)] py-24 px-6" aria-labelledby="team-heading">
      <Container>
        <SectionHeading
          id="team-heading"
          label="The People"
          title="Meet the Team Behind Your Growth"
          subtitle="Real strategists, designers, and developers working together in-house — no guesswork, no outsourcing."
          center
          className="mb-14"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((m, i) => (
            <article
              key={m.id || m.name}
              className={`reveal reveal-delay-${(i % 3) + 1} premium-card group bg-white border border-[var(--color-border)] rounded-[var(--radius-xl)] p-7 shadow-[var(--shadow-sm)] flex flex-col justify-between`}
            >
              <div>
                {/* Header info */}
                <div className="flex items-start gap-4 mb-5">
                  <div className="relative w-16 h-16 rounded-[var(--radius-lg)] overflow-hidden shrink-0 bg-[var(--color-navy)] text-white shadow-sm flex items-center justify-center">
                    {m.image ? (
                      <Image
                        src={m.image}
                        alt={m.name}
                        fill
                        sizes="64px"
                        className="image-hover-zoom object-cover"
                      />
                    ) : (
                      <span className="text-xl font-extrabold tracking-tight select-none">
                        {m.name.charAt(0)}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-extrabold text-[var(--color-navy)] text-lg leading-snug group-hover:text-[var(--color-navy-bright)] transition-colors">
                      {m.name}
                    </h3>
                    <p className="text-xs font-bold text-[var(--color-navy-bright)] mt-0.5 uppercase tracking-wide">
                      {m.role}
                    </p>
                    {m.department && (
                      <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-[var(--color-off-white)] border border-[var(--color-border)] text-[var(--color-muted)] font-semibold">
                        {m.department}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bio quote */}
                {m.bio && (
                  <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-5 italic">
                    &ldquo;{m.bio}&rdquo;
                  </p>
                )}

                {/* Skills tags */}
                {m.skills && m.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {m.skills.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[var(--color-off-white)] text-[var(--color-navy)] border border-[var(--color-border)]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action links */}
              <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
                {m.linkedin ? (
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${m.name}'s LinkedIn profile`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-navy)] hover:text-[var(--color-navy-bright)] transition-colors"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C23.2.774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </a>
                ) : <span />}

                {m.email && (
                  <a
                    href={`mailto:${m.email}`}
                    className="text-xs font-semibold text-[var(--color-muted)] hover:text-[var(--color-navy)] transition-colors"
                  >
                    Email →
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
