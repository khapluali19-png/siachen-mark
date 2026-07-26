import Link from "next/link";
import Container from "@/components/ui/Container";

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-24 px-6">
      {/* Gradient background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(135deg, var(--color-navy) 0%, var(--color-navy-bright) 60%, var(--color-navy-dim) 100%)",
          backgroundSize: "200% 200%",
          animation: "gradient-shift 8s ease infinite",
        }}
      />
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white opacity-5 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white opacity-5 blur-3xl animate-blob" style={{ animationDelay: "4s" }} />

      <Container className="relative text-center">
        <span className="inline-block px-4 py-1.5 rounded-[var(--radius-full)] border border-white/20 text-white/70 text-xs font-semibold uppercase tracking-widest mb-6">
          Let&apos;s Work Together
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
          Your Growth Is<br className="hidden sm:block" /> Our Mission.
        </h2>
        <p className="mt-5 text-[var(--color-on-navy)] max-w-xl mx-auto text-lg leading-relaxed">
          Let&apos;s build your brand, reach more customers, and hit your business goals — together.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-[var(--radius-full)] bg-white text-[var(--color-navy)] font-semibold text-sm hover:shadow-[0_0_32px_rgba(255,255,255,0.3)] transition-all"
          >
            Start a Project
          </Link>
          <a
            href="https://wa.me/923488868517"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-[var(--radius-full)] border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
          >
            WhatsApp Us
          </a>
        </div>
      </Container>
    </section>
  );
}
