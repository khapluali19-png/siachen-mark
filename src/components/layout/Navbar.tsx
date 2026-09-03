import { db } from "@/lib/db";
import { getSiteSettings } from "@/lib/settings";
import NavbarClient, { NavLink } from "./NavbarClient";

const DEFAULT_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default async function Navbar() {
  const [settings, dbItems] = await Promise.all([
    getSiteSettings(),
    db.navigationItem.findMany({
      where: { enabled: true },
      orderBy: { order: "asc" },
    }).catch(() => []),
  ]);

  const links: NavLink[] = dbItems.length > 0
    ? dbItems.map((item) => ({
        href: item.href,
        label: item.label,
        isExternal: item.isExternal,
      }))
    : DEFAULT_LINKS;

  return (
    <NavbarClient
      links={links}
      logo={settings.headerLogo || settings.logo}
      siteName={settings.siteName}
      headerCtaText={settings.headerCtaText}
      headerCtaHref={settings.headerCtaHref}
      headerCtaEnabled={settings.headerCtaEnabled}
      headerWhatsAppEnabled={settings.headerWhatsAppEnabled}
      whatsappNumber={settings.whatsappNumber}
    />
  );
}
