import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export default function CompanyStory() {
  return (
    <section className="bg-[var(--color-background)] py-20 px-6">
      <Container className="max-w-3xl">
        <SectionHeading label="Our Story" title="How We Got Here" className="mb-8" />
        <div className="space-y-5 text-[var(--color-muted)] leading-relaxed">
          <p>
            Siachen Mark was founded by Basharat Ali, who leads digital marketing, and Mushtaq Ali, our senior graphic designer. Over 3+ years, we&apos;ve worked with 100+ clients across Pakistan and 15+ countries — clinics, hotels, resorts, wholesalers, manufacturers, bakeries, schools, and technical consultancies.
          </p>
          <p>
            We&apos;ve grown from two founders into a full team covering performance marketing, social media, video editing, web development, and design. Every service we offer exists because a real client needed it — and we built the capability to deliver it properly.
          </p>
          <p className="font-semibold text-[var(--color-navy)]">
            Creative by Passion. Strategic by Mind. Driven by Results.
          </p>
        </div>
      </Container>
    </section>
  );
}
