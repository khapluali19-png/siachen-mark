import Container from "@/components/ui/Container";
import { getSiteSettings } from "@/lib/settings";

export default async function MissionVision() {
  const settings = await getSiteSettings();

  return (
    <section className="bg-[var(--color-navy)] py-20 px-6">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-[var(--radius-lg)] p-8 border border-[var(--color-navy-dim)]">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-on-navy)]">
              {settings.missionTitle || "Our Mission"}
            </p>
            <p className="mt-4 text-white text-lg leading-relaxed font-medium">
              {settings.missionText ||
                "To drive measurable business growth for every client by combining strategy, design, and data — so marketing spend turns into real customers, not guesswork."}
            </p>
          </div>
          <div className="rounded-[var(--radius-lg)] p-8 border border-[var(--color-navy-dim)]">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-on-navy)]">
              {settings.visionTitle || "Our Vision"}
            </p>
            <p className="mt-4 text-white text-lg leading-relaxed font-medium">
              {settings.visionText ||
                "We believe design should build trust, not just look good — and that marketing without tracking is just guessing. Every project combines strategic thinking, strong creative, and real data at every step."}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
