"use client";
import { useState } from "react";
import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden p-2 text-[var(--color-navy)]"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        <span className="block w-5 h-0.5 bg-current mb-1" />
        <span className="block w-5 h-0.5 bg-current mb-1" />
        <span className="block w-5 h-0.5 bg-current" />
      </button>

      {open && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-t border-[var(--color-border)] px-6 py-4 flex flex-col gap-4 z-50">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-[var(--color-foreground)] hover:text-[var(--color-navy)]"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-5 py-2 rounded-[var(--radius-full)] bg-[var(--color-navy)] text-white text-sm font-semibold"
            onClick={() => setOpen(false)}
          >
            Let&apos;s Talk
          </Link>
        </div>
      )}
    </>
  );
}
