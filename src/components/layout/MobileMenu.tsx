"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { trackStrategyCallClick } from "@/lib/tracking";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <button
        className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 text-[var(--color-navy)] rounded-md hover:bg-[var(--color-off-white)] transition-colors"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        <span
          className={`block w-5 h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${
            open ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${
            open ? "opacity-0 scale-x-0" : ""
          }`}
        />
        <span
          className={`block w-5 h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${
            open ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="md:hidden fixed inset-0 top-16 bg-black/20 backdrop-blur-[2px] z-40"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-label="Mobile navigation"
        className={`md:hidden fixed top-16 left-0 right-0 bg-white border-b border-[var(--color-border)] z-50 transition-all duration-300 ease-out ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <nav className="px-6 py-5 flex flex-col gap-1">
          {links.map((l) => {
            const active = l.href === "/" ? pathname === "/" : pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-base font-medium px-3 py-2.5 rounded-md transition-colors ${
                  active
                    ? "text-[var(--color-navy)] bg-[var(--color-off-white)]"
                    : "text-[var(--color-foreground)] hover:text-[var(--color-navy)] hover:bg-[var(--color-off-white)]"
                }`}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            );
          })}

          <div className="mt-3 pt-4 border-t border-[var(--color-border)]">
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-[var(--radius-full)] bg-[var(--color-navy)] text-white text-sm font-semibold hover:bg-[var(--color-navy-bright)] transition-colors"
              onClick={() => {
                trackStrategyCallClick("navbar_mobile");
                setOpen(false);
              }}
            >
              Book a Strategy Call
              <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
