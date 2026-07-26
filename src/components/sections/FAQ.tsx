"use client";
import { useState } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const faqs = [
  {
    q: "What services does Siachen Mark offer?",
    a: "We cover the full digital growth stack: performance marketing, SEO, social media management, website design & development, branding & graphic design, and full-funnel tracking & automation.",
  },
  {
    q: "Do you work with businesses outside Pakistan?",
    a: "Yes — we've worked with 100+ clients across Pakistan and 15+ countries abroad, spanning clinics, hotels, resorts, wholesalers, manufacturers, and technical consultancies.",
  },
  {
    q: "How is ad spend billed?",
    a: "Ad spend is always kept separate from our management fee — you pay the ad platform directly, at cost, with no markup. Our fee covers strategy, content, design, and campaign management.",
  },
  {
    q: "What makes your approach different?",
    a: "Most agencies stop at running ads. We connect every platform — Meta Pixel, Conversions API, Google Tag Manager, GA4 — into one measurement system before a single campaign runs, so your data compounds over time.",
  },
  {
    q: "Do you use purchased followers or fake engagement?",
    a: "No. Purchased followers suppress real organic reach because platforms interpret low engagement as low content relevance, throttling distribution for every future post.",
  },
  {
    q: "How do I get started?",
    a: "Reach out via WhatsApp or the contact form — tell us a bit about your business and we'll follow up with next steps.",
  },
];

function PlusIcon({ open }: { open: boolean }) {
  return (
    <span
      className="relative flex items-center justify-center w-7 h-7 rounded-full border border-[var(--color-border)] shrink-0 transition-colors duration-200"
      style={{ background: open ? "var(--color-navy)" : "transparent" }}
      aria-hidden="true"
    >
      <span
        className="absolute w-3 h-0.5 rounded-full transition-all duration-300"
        style={{ background: open ? "white" : "var(--color-navy)" }}
      />
      <span
        className="absolute w-0.5 h-3 rounded-full transition-all duration-300"
        style={{
          background: open ? "white" : "var(--color-navy)",
          transform: open ? "scaleY(0)" : "scaleY(1)",
        }}
      />
    </span>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-[var(--color-background)] py-24 px-6">
      <Container className="max-w-3xl">
        <SectionHeading label="FAQ" title="Questions, Answered" center className="mb-14" />
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className="rounded-[var(--radius-lg)] border border-[var(--color-border)] overflow-hidden transition-shadow duration-200"
                style={{ boxShadow: isOpen ? "var(--shadow-md)" : "none" }}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-[var(--color-navy)] text-sm sm:text-base">
                    {f.q}
                  </span>
                  <PlusIcon open={isOpen} />
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: isOpen ? "200px" : "0px", opacity: isOpen ? 1 : 0 }}
                >
                  <p className="px-6 pb-5 text-sm text-[var(--color-muted)] leading-relaxed">
                    {f.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
