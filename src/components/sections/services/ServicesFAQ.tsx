import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const faqs = [
  {
    q: "What services does Siachen Mark offer?",
    a: "We cover the full digital growth stack: performance marketing, SEO, social media management, website design & development, branding & graphic design, and full-funnel tracking & automation.",
  },
  {
    q: "How is ad spend billed?",
    a: "Ad spend is always kept separate from our management fee — you pay the ad platform (Meta, Google, LinkedIn) directly, at cost, with no markup. Our fee covers strategy, content, design, and campaign management.",
  },
  {
    q: "Do you work with businesses outside Pakistan?",
    a: "Yes — we've worked with 100+ clients across Pakistan and 15+ countries abroad, spanning clinics, hotels, resorts, wholesalers, manufacturers, and technical consultancies.",
  },
  {
    q: "Do you offer a free audit before starting?",
    a: "Often, yes — for social pages, websites, and Google Business Profiles, we typically start with a complimentary audit to understand what's actually working before recommending a strategy or budget.",
  },
  {
    q: "Can you build a website for my business?",
    a: "Yes — we build both WordPress-based and fully custom websites, designed around your brand's colors, logo, and goals, with mobile-responsiveness and speed built in from the start.",
  },
];

export default function ServicesFAQ() {
  return (
    <section className="bg-[var(--color-background)] py-20 px-6">
      <Container className="max-w-3xl">
        <SectionHeading label="FAQ" title="Common Questions" center className="mb-12" />
        <div className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
          {faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-semibold text-[var(--color-navy)]">
                {f.q}
                <span className="text-xl shrink-0 group-open:rotate-45 transition-transform" aria-hidden="true">+</span>
              </summary>
              <p className="mt-3 text-sm text-[var(--color-muted)] leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
