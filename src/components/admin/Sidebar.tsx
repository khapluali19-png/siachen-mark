"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Dashboard",    href: "/dashboard" },
  { label: "Hero",         href: "/dashboard/hero" },
  { label: "Services",     href: "/dashboard/services" },
  { label: "Portfolio",    href: "/dashboard/portfolio" },
  { label: "Testimonials", href: "/dashboard/testimonials" },
  { label: "FAQ",          href: "/dashboard/faq" },
  { label: "Team",         href: "/dashboard/team" },
  { label: "Blog",         href: "/dashboard/blog" },
  { label: "Careers",      href: "/dashboard/careers" },
  { label: "SEO",          href: "/dashboard/seo" },
  { label: "Media",        href: "/dashboard/media" },
  { label: "Contacts",     href: "/dashboard/contacts" },
  { label: "Newsletter",   href: "/dashboard/newsletter" },
  { label: "Settings",     href: "/dashboard/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:flex flex-col w-60 shrink-0 bg-[var(--color-navy)] min-h-screen">
      <div className="px-6 py-5 border-b border-[var(--color-navy-dim)]">
        <p className="font-extrabold text-white text-lg">Siachen Mark</p>
        <p className="text-xs text-[var(--color-on-navy)] mt-0.5">Admin Panel</p>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-0.5">
          {nav.map((item) => {
            const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-[var(--radius-md)] text-sm font-medium transition-colors",
                    active
                      ? "bg-[var(--color-navy-bright)] text-white"
                      : "text-[var(--color-on-navy)] hover:bg-white/10 hover:text-white"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
