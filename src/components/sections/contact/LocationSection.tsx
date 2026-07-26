import Container from "@/components/ui/Container";

/* 3D-ish vector map illustration (abstract, brand-colored) */
function MapIllustration() {
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <rect width="400" height="300" rx="16" fill="#0a1e6e" />
      {/* grid streets */}
      {[60, 120, 180, 240].map((y) => (
        <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#1a2f8a" strokeWidth="2" />
      ))}
      {[80, 160, 240, 320].map((x) => (
        <line key={x} x1={x} y1="0" x2={x} y2="300" stroke="#1a2f8a" strokeWidth="2" />
      ))}
      {/* river / diagonal */}
      <path d="M0 220 Q140 160 220 200 T400 150" stroke="#0035ca" strokeWidth="10" strokeLinecap="round" opacity=".5" fill="none" />
      {/* blocks */}
      <rect x="92" y="72" width="56" height="36" rx="4" fill="#1a2f8a" opacity=".7" />
      <rect x="172" y="132" width="56" height="36" rx="4" fill="#1a2f8a" opacity=".7" />
      <rect x="252" y="72" width="56" height="36" rx="4" fill="#1a2f8a" opacity=".7" />
    </svg>
  );
}

export default function LocationSection() {
  return (
    <section className="py-20 px-6">
      <Container>
        <div className="relative rounded-[var(--radius-xl)] border border-[var(--color-border)] overflow-hidden shadow-[var(--shadow-lg)]">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Map side with animated pin */}
            <div className="relative min-h-[320px] bg-[var(--color-navy)]">
              <div className="absolute inset-0 p-6">
                <MapIllustration />
              </div>
              {/* Animated pin + pulse */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                {/* pulsing rings */}
                <span className="absolute w-16 h-16 rounded-full bg-[var(--color-navy-bright)]"
                  style={{ animation: "pulse-ring 2.4s ease-out infinite" }} />
                <span className="absolute w-16 h-16 rounded-full bg-[var(--color-navy-bright)]"
                  style={{ animation: "pulse-ring 2.4s ease-out infinite", animationDelay: "1.2s" }} />
                {/* pin */}
                <div className="relative z-10 animate-float">
                  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="white" aria-hidden="true">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Glassmorphism info side */}
            <div className="relative p-8 sm:p-10 bg-[var(--color-off-white)]">
              <h2 className="text-2xl font-bold text-[var(--color-navy)]">Visit or Reach Out</h2>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                Based in Islamabad, working with clients across Pakistan and beyond.
              </p>

              <dl className="mt-8 space-y-5">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)]">Location</dt>
                  <dd className="mt-1 text-[var(--color-navy)] font-medium">Islamabad, Pakistan</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)]">Phone / WhatsApp</dt>
                  <dd className="mt-1">
                    <a href="tel:+923488868517" className="text-[var(--color-navy)] font-medium hover:text-[var(--color-navy-bright)] transition-colors">+92 348 8868517</a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)]">Business Hours</dt>
                  <dd className="mt-1 text-[var(--color-navy)] font-medium">Mon–Sat · 10:00 AM – 7:00 PM (PKT)</dd>
                </div>
              </dl>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Islamabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-[var(--radius-full)] bg-[var(--color-navy)] text-white font-semibold text-sm hover:bg-[var(--color-navy-bright)] transition-colors"
                >
                  Get Directions
                </a>
                <a
                  href="https://wa.me/923488868517"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-[var(--radius-full)] border border-[var(--color-navy)] text-[var(--color-navy)] font-semibold text-sm hover:bg-[var(--color-background)] transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
