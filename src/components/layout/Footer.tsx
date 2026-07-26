import Link from "next/link";
import Container from "@/components/ui/Container";

const services = [
  "Performance Marketing",
  "SEO & Content",
  "Social Media",
  "Web Design",
  "Branding & Design",
  "Full-Funnel Tracking",
];

const company = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--color-navy)] text-white">
      {/* CTA band */}
      <div className="border-b border-[var(--color-navy-dim)]">
        <Container className="py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xl font-extrabold">Ready to grow?</p>
            <p className="text-sm text-[var(--color-on-navy)] mt-1">
              Let&apos;s build something that actually moves the needle.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 px-7 py-3 rounded-[var(--radius-full)] bg-white text-[var(--color-navy)] font-semibold text-sm hover:bg-[var(--color-off-white)] transition-colors"
          >
            Start a Project
          </Link>
        </Container>
      </div>

      {/* Main grid */}
      <Container className="py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="sm:col-span-2 md:col-span-1">
          <p className="font-extrabold text-xl tracking-tight">Siachen Mark</p>
          <p className="mt-2 text-sm text-[var(--color-on-navy)] leading-relaxed max-w-xs">
            A performance-first digital agency helping brands grow across Pakistan and beyond.
          </p>
          <div className="mt-5 flex gap-4">
            <a
              href="https://wa.me/923488868517"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-9 h-9 rounded-full border border-[var(--color-navy-dim)] flex items-center justify-center text-[var(--color-on-navy)] hover:bg-white/10 transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.845L.057 23.5l5.797-1.522A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.51-5.17-1.4l-.37-.22-3.44.9.92-3.35-.24-.38A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/company/109209003"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-full border border-[var(--color-navy-dim)] flex items-center justify-center text-[var(--color-on-navy)] hover:bg-white/10 transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <p className="font-semibold text-xs uppercase tracking-widest mb-5 text-[var(--color-on-navy)]">Services</p>
          <ul className="space-y-2.5 text-sm text-[var(--color-on-navy)]">
            {services.map((s) => (
              <li key={s}>
                <Link href="/services" className="hover:text-white transition-colors">{s}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <p className="font-semibold text-xs uppercase tracking-widest mb-5 text-[var(--color-on-navy)]">Company</p>
          <ul className="space-y-2.5 text-sm text-[var(--color-on-navy)]">
            {company.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="font-semibold text-xs uppercase tracking-widest mb-5 text-[var(--color-on-navy)]">Contact</p>
          <ul className="space-y-2.5 text-sm text-[var(--color-on-navy)]">
            <li>
              <a href="tel:+923488868517" className="hover:text-white transition-colors">+92 348 8868517</a>
            </li>
            <li>
              <a href="https://wa.me/923488868517" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp</a>
            </li>
            <li>Islamabad, Pakistan</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-[var(--color-navy-dim)] py-5 text-center text-xs text-[var(--color-on-navy)]">
        © {new Date().getFullYear()} Siachen Mark. All rights reserved.
      </div>
    </footer>
  );
}
