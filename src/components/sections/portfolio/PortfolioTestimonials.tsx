import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const testimonials = [
  {
    quote: "Our appointment bookings finally have a system behind them — not just guesswork.",
    name: "Dr. S. Rahman",
    role: "Clinic Director · Healthcare",
    initials: "SR",
  },
  {
    quote: "They didn't just build us a website. They built us a way to actually get found.",
    name: "M. Tanveer",
    role: "Operations Lead · Logistics",
    initials: "MT",
  },
  {
    quote: "Our brand finally looks like the product we make.",
    name: "A. Rehman",
    role: "Founder · E-commerce",
    initials: "AR",
  },
];

export default function PortfolioTestimonials() {
  return (
    <section className="bg-[var(--color-off-white)] py-24 px-6">
      <Container>
        <SectionHeading
          label="Client Feedback"
          title="What Clients Say"
          subtitle="Outcomes and experiences from recent client partnerships."
          center
          className="mb-14"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              className="reveal group relative bg-[var(--color-background)] border border-[var(--color-border)] rounded-[var(--radius-xl)] p-8 shadow-[var(--shadow-sm)] flex flex-col transition-all duration-300 hover:shadow-[var(--shadow-lg)] hover:-translate-y-1"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="absolute top-6 right-8 text-6xl font-serif leading-none text-[var(--color-navy)] opacity-10 select-none" aria-hidden="true">&ldquo;</span>
              <blockquote className="text-[var(--color-foreground)] leading-relaxed flex-1 text-[0.95rem]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-navy)] flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-white">{t.initials}</span>
                </div>
                <div>
                  <p className="font-semibold text-[var(--color-navy)] text-sm">{t.name}</p>
                  <p className="text-xs text-[var(--color-muted)]">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
