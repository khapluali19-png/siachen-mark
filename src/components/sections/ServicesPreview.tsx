import Container from "@/components/ui/Container";
import ServiceCard from "@/components/ui/ServiceCard";
import SectionHeading from "@/components/ui/SectionHeading";

const services = [
  { title: "Performance Marketing", desc: "Data-driven campaigns that turn ad spend into real leads." },
  { title: "Branding & Design", desc: "Design that builds trust before your content is even read." },
  { title: "Websites That Convert", desc: "Fast, mobile-first sites built to turn visitors into customers." },
  { title: "Full-Funnel Tracking", desc: "So your growth compounds — not disappears — after every campaign." },
];

export default function ServicesPreview() {
  return (
    <section className="bg-[var(--color-off-white)] py-20 px-6">
      <Container>
        <SectionHeading title="What We Do" center className="mb-12" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {services.map((s) => (
            <ServiceCard key={s.title} title={s.title} description={s.desc} />
          ))}
        </div>
      </Container>
    </section>
  );
}
