import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const faqs = [
  {
    q: "How quickly do you respond?",
    a: "We aim to reply within a few hours on business days. WhatsApp is the fastest channel if you need a quick answer.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes. We work remotely with clients across Pakistan and internationally. Time zones haven't been a barrier.",
  },
  {
    q: "What happens after I submit the form?",
    a: "We review your message, then reach out to schedule a short discovery call — no pressure, no generic pitch deck.",
  },
  {
    q: "Do you offer one-off projects or only retainers?",
    a: "Both. Some clients start with a one-off project (a brand identity, a website) and move to ongoing work. Others come for long-term growth partnerships from day one.",
  },
  {
    q: "Is there a minimum budget?",
    a: "We don't publish a fixed minimum, but we're honest early if a project isn't the right fit. Reach out and we'll tell you straight.",
  },
];

export default function ContactFAQ() {
  return (
    <section className="py-20 px-6 bg-[var(--color-off-white)]">
      <Container className="max-w-3xl">
        <SectionHeading
          label="FAQ"
          title="Common Questions"
          center
          className="mb-10"
        />
        <div className="space-y-3">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-background)] overflow-hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between px-6 py-4 font-semibold text-[var(--color-navy)] list-none select-none">
                {item.q}
                <span className="ml-4 shrink-0 text-[var(--color-muted)] transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="px-6 pb-5 text-sm text-[var(--color-muted)] leading-relaxed">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
