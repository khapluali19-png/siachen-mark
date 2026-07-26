import Link from "next/link";
import Container from "@/components/ui/Container";
import MobileMenu from "@/components/layout/MobileMenu";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--color-background)] border-b border-[var(--color-border)]">
      <Container className="h-16 flex items-center justify-between relative">
        <Link href="/" className="font-extrabold text-xl tracking-tight text-[var(--color-navy)]">
          Siachen Mark
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-navy)] transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="hidden md:inline-flex items-center px-5 py-2 rounded-[var(--radius-full)] bg-[var(--color-navy)] text-white text-sm font-semibold hover:bg-[var(--color-navy-bright)] transition-colors"
        >
          Let&apos;s Talk
        </Link>

        <MobileMenu />
      </Container>
    </header>
  );
}
