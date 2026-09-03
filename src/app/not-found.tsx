import Link from "next/link";
import Container from "@/components/ui/Container";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex items-center justify-center bg-[var(--color-off-white)] py-28 px-6">
        <Container className="max-w-2xl text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-[var(--color-navy)]/10 text-[var(--color-navy)] text-xs font-bold uppercase tracking-widest mb-6">
            404 &mdash; Page Not Found
          </span>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--color-navy)] tracking-tight font-display mb-4">
            Looking for something specific?
          </h1>

          <p className="text-base text-[var(--color-muted)] max-w-lg mx-auto mb-10 leading-relaxed">
            The page you requested couldn&apos;t be found or may have moved. Explore our core sections below to find what you need.
          </p>

          {/* Direct Navigation Links */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
            {[
              { label: "Home", href: "/" },
              { label: "Our Services", href: "/services" },
              { label: "Client Portfolio", href: "/portfolio" },
              { label: "Contact & WhatsApp", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="p-4 rounded-[var(--radius-lg)] bg-white border border-[var(--color-border)] text-sm font-bold text-[var(--color-navy)] hover:border-[var(--color-navy)] hover:shadow-sm transition-all text-center"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[var(--radius-full)] bg-[var(--color-navy)] text-white font-semibold text-sm hover:bg-[var(--color-navy-bright)] transition-colors shadow-sm"
          >
            <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M13 8H3M7 4L3 8l4 4" />
            </svg>
            Back to Home
          </Link>
        </Container>
      </main>
      <Footer />
    </>
  );
}
