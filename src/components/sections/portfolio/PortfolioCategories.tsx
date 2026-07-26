import Container from "@/components/ui/Container";


const categories = [
  "All",
  "Performance Marketing",
  "Branding & Design",
  "Web Development",
  "Social Media",
  "SEO",
];

export default function PortfolioCategories() {
  return (
    <section className="bg-[var(--color-off-white)] py-10 px-6 border-b border-[var(--color-border)]">
      <Container>
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((c) => (
            <span
              key={c}
              className="px-4 py-2 rounded-[var(--radius-full)] border border-[var(--color-border)] text-sm font-medium text-[var(--color-navy)] bg-[var(--color-background)] cursor-pointer hover:bg-[var(--color-navy)] hover:text-white transition-colors"
            >
              {c}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
