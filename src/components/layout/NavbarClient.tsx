"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Container from "@/components/ui/Container";
import { trackStrategyCallClick, trackWhatsAppClick } from "@/lib/tracking";

export interface NavLink {
  href: string;
  label: string;
  isExternal?: boolean;
}

interface NavbarClientProps {
  links: NavLink[];
  logo?: string;
  siteName?: string;
  headerCtaText?: string;
  headerCtaHref?: string;
  headerCtaEnabled?: boolean;
  headerWhatsAppEnabled?: boolean;
  whatsappNumber?: string;
}

export default function NavbarClient({
  links,
  logo = "/logo.png",
  siteName = "Siachen Mark",
  headerCtaText = "Book a Strategy Call",
  headerCtaHref = "/contact",
  headerCtaEnabled = true,
  headerWhatsAppEnabled = false,
  whatsappNumber = "923488868517",
}: NavbarClientProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const waHref = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}`;

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close mobile on navigation
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_#e5e7eb] py-0"
          : "bg-white border-b border-[var(--color-border)] py-0"
      }`}
    >
      <Container className="h-16 flex items-center justify-between relative">
        {/* Logo */}
        <Link
          href="/"
          className="font-extrabold text-xl tracking-tight text-[var(--color-navy)] flex items-center gap-2.5 shrink-0"
          aria-label={`${siteName} — Home`}
        >
          {logo && logo !== "/logo.png" ? (
            <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0">
              <Image src={logo} alt={siteName} fill className="object-contain" />
            </div>
          ) : (
            <span
              className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--color-navy)] text-white text-xs font-black select-none shrink-0"
              aria-hidden="true"
            >
              SM
            </span>
          )}
          <span>{siteName}</span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation">
          <ul className="hidden md:flex items-center gap-1">
            {links.map((l) => {
              const active =
                l.href === "/"
                  ? pathname === "/"
                  : pathname === l.href || pathname.startsWith(l.href + "/");

              if (l.isExternal) {
                return (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 text-sm font-medium rounded-md text-[var(--color-muted)] hover:text-[var(--color-navy)] hover:bg-[var(--color-off-white)] transition-colors"
                    >
                      {l.label} ↗
                    </a>
                  </li>
                );
              }

              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`relative px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                      active
                        ? "text-[var(--color-navy)] bg-[var(--color-off-white)]"
                        : "text-[var(--color-muted)] hover:text-[var(--color-navy)] hover:bg-[var(--color-off-white)]"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          {headerWhatsAppEnabled && (
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("navbar_desktop")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[var(--radius-full)] border border-emerald-300 text-emerald-700 bg-emerald-50/70 text-xs font-bold hover:bg-emerald-100 transition-colors"
              aria-label="Chat on WhatsApp"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.845L.057 23.5l5.797-1.522A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.51-5.17-1.4l-.37-.22-3.44.9.92-3.35-.24-.38A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              WhatsApp
            </a>
          )}

          {headerCtaEnabled && (
            <Link
              href={headerCtaHref}
              onClick={() => trackStrategyCallClick("navbar_desktop")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[var(--radius-full)] bg-[var(--color-navy)] text-white text-sm font-semibold hover:bg-[var(--color-navy-bright)] transition-colors duration-200 shadow-[var(--shadow-sm)]"
            >
              {headerCtaText}
              <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 text-[var(--color-navy)] rounded-md hover:bg-[var(--color-off-white)] transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu-drawer"
        >
          <span
            className={`block w-5 h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${
              mobileOpen ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div
            className="md:hidden fixed inset-0 top-16 bg-black/20 backdrop-blur-[2px] z-40"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
        )}

        <div
          id="mobile-menu-drawer"
          role="dialog"
          aria-label="Mobile navigation"
          className={`md:hidden fixed top-16 left-0 right-0 bg-white border-b border-[var(--color-border)] z-50 transition-all duration-300 ease-out ${
            mobileOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <nav className="px-6 py-5 flex flex-col gap-1">
            {links.map((l) => {
              const active =
                l.href === "/"
                  ? pathname === "/"
                  : pathname === l.href || pathname.startsWith(l.href + "/");

              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`text-base font-medium px-3 py-2.5 rounded-md transition-colors ${
                    active
                      ? "text-[var(--color-navy)] bg-[var(--color-off-white)]"
                      : "text-[var(--color-foreground)] hover:text-[var(--color-navy)] hover:bg-[var(--color-off-white)]"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </Link>
              );
            })}

            {headerCtaEnabled && (
              <div className="mt-3 pt-4 border-t border-[var(--color-border)]">
                <Link
                  href={headerCtaHref}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-[var(--radius-full)] bg-[var(--color-navy)] text-white text-sm font-semibold hover:bg-[var(--color-navy-bright)] transition-colors"
                  onClick={() => {
                    trackStrategyCallClick("navbar_mobile");
                    setMobileOpen(false);
                  }}
                >
                  {headerCtaText}
                  <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </Container>
    </header>
  );
}
