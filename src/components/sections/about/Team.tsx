import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import VectorPortrait from "@/components/ui/VectorPortrait";

const team = [
  {
    name: "Kamran Sarwar",
    role: "Social Media Executive",
    dept: "Marketing",
    exp: "2+ yrs",
    quote: "I combine creativity with strategy to create content that connects, engages, and delivers measurable growth.",
    accentColor: "#0a1e6e",
    skinTone: "#d4956a",
    hairColor: "#1a0e05",
  },
  {
    name: "Naira Zehra",
    role: "Performance Marketer",
    dept: "Paid Media",
    exp: "3+ yrs",
    quote: "I combine creativity with analytics to run smart campaigns that maximize performance.",
    accentColor: "#0035ca",
    skinTone: "#c8845a",
    hairColor: "#2d1a0e",
  },
  {
    name: "Malika Zahid",
    role: "Graphic Designer",
    dept: "Design",
    exp: "3+ yrs",
    quote: "I focus on creativity, consistency, and clarity to design visuals that connect with the audience.",
    accentColor: "#1a2f8a",
    skinTone: "#e8b090",
    hairColor: "#0e0805",
  },
  {
    name: "Zeshan",
    role: "Video Editor",
    dept: "Content",
    exp: "2+ yrs",
    quote: "I focus on creativity, timing, and details to deliver videos that leave a lasting impact.",
    accentColor: "#0a1e6e",
    skinTone: "#c07850",
    hairColor: "#1a0e05",
  },
  {
    name: "Khalid",
    role: "WordPress Developer",
    dept: "Development",
    exp: "4+ yrs",
    quote: "I focus on clean code, modern design, and seamless functionality.",
    accentColor: "#0035ca",
    skinTone: "#d4956a",
    hairColor: "#2d1a0e",
  },
];

export default function Team() {
  return (
    <section className="bg-[var(--color-off-white)] py-24 px-6">
      <Container>
        <SectionHeading
          label="The People"
          title="Meet the Team"
          subtitle="Real people. Real skill. No outsourcing, no guesswork."
          center
          className="mb-14"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {team.map((m, i) => (
            <article
              key={m.name}
              className="reveal group bg-[var(--color-background)] border border-[var(--color-border)] rounded-[var(--radius-xl)] p-6 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] hover:-translate-y-1 transition-all duration-300"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-[var(--radius-lg)] overflow-hidden shrink-0 shadow-[var(--shadow-sm)]">
                  <VectorPortrait
                    name={m.name}
                    accentColor={m.accentColor}
                    skinTone={m.skinTone}
                    hairColor={m.hairColor}
                    className="w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--color-navy)] text-base">{m.name}</h3>
                  <p className="text-xs font-semibold text-[var(--color-navy-bright)]">{m.role}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--color-off-white)] border border-[var(--color-border)] text-[var(--color-muted)] font-medium">
                      {m.dept}
                    </span>
                    <span className="text-[10px] text-[var(--color-muted)]">{m.exp}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed italic">&ldquo;{m.quote}&rdquo;</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
