import Container from "@/components/ui/Container";

const industries = [
  "Healthcare & Clinics",
  "Hospitality & Hotels",
  "E-commerce & Retail",
  "Real Estate",
  "Manufacturing",
  "Technical Consultancy",
  "Logistics & Freight",
  "Education",
  "Food & Beverage",
  "Professional Services",
  "Technology & SaaS",
  "Beauty & Wellness",
];

export default function TrustedBy() {
  return (
    <section
      className="bg-[var(--color-off-white)] py-12 px-6 border-y border-[var(--color-border)] overflow-hidden"
      aria-label="Industries served"
    >
      <Container>
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)] mb-7">
          Serving businesses across industries
        </p>
      </Container>

      <div className="relative">
        <div
          className="pointer-events-none absolute left-0 top-0 h-full w-20 z-10"
          style={{ background: "linear-gradient(to right, var(--color-off-white), transparent)" }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-0 top-0 h-full w-20 z-10"
          style={{ background: "linear-gradient(to left, var(--color-off-white), transparent)" }}
          aria-hidden="true"
        />
        <div className="flex w-max animate-marquee gap-4" aria-hidden="true">
          {[...industries, ...industries].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius-full)] border border-[var(--color-border)] bg-white text-sm font-medium text-[var(--color-navy)] whitespace-nowrap shadow-[var(--shadow-sm)]"
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-[var(--color-navy-bright)] shrink-0"
                aria-hidden="true"
              />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
