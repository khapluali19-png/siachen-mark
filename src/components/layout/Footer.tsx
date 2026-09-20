import Link from "next/link";
import Container from "@/components/ui/Container";
import { getSiteSettings } from "@/lib/settings";
import TrackedLink from "@/components/ui/TrackedLink";
import MagneticCTA from "@/components/ui/MagneticCTA";

const services = [
  { label: "Meta Ads", href: "/services" },
  { label: "Google Ads", href: "/services" },
  { label: "SEO & Content", href: "/services" },
  { label: "Social Media", href: "/services" },
  { label: "Web Design", href: "/services" },
  { label: "Lead Generation", href: "/services" },
];

const company = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
  { label: "Chrome Extension", href: "/user/extension" },
];

export default async function Footer() {
  const settings = await getSiteSettings();

  const socialLinks = [
    {
      id: "whatsapp",
      label: "WhatsApp",
      url: settings.whatsappNumber ? `https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, "")}` : (settings.whatsapp ? `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}` : null),
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.845L.057 23.5l5.797-1.522A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.51-5.17-1.4l-.37-.22-3.44.9.92-3.35-.24-.38A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        </svg>
      ),
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      url: settings.linkedinUrl,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      id: "facebook",
      label: "Facebook",
      url: settings.facebookUrl,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      id: "instagram",
      label: "Instagram",
      url: settings.instagramUrl,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
    {
      id: "youtube",
      label: "YouTube",
      url: settings.youtubeUrl,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      id: "tiktok",
      label: "TikTok",
      url: settings.tiktokUrl,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.16 1.18 2.09 2.35 2.27.64.11 1.31.03 1.91-.22.84-.34 1.48-1.07 1.74-1.94.13-.48.16-.98.16-1.47V.02z" />
        </svg>
      ),
    },
    {
      id: "twitter",
      label: "X (Twitter)",
      url: settings.twitterUrl,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
  ].filter((item) => Boolean(item.url && item.url.trim()));

  return (
    <footer className="bg-[var(--color-navy)] text-white">
      {/* CTA band */}
      {settings.footerCtaEnabled && (
        <div className="border-b border-[var(--color-navy-dim)]">
          <Container className="py-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xl font-extrabold tracking-tight">Ready to grow?</p>
              <p className="text-sm text-[var(--color-on-navy)] mt-1 opacity-80">
                Book a strategy call and let&apos;s build something that actually moves the needle.
              </p>
            </div>
            <MagneticCTA>
              <TrackedLink
                href={settings.footerCtaHref || "/contact"}
                trackingType="strategy_call"
                trackingLocation="footer_band"
                className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-[var(--radius-full)] bg-white text-[var(--color-navy)] font-semibold text-sm hover:bg-[var(--color-off-white)] transition-colors"
              >
                {settings.footerCtaText || "Book a Strategy Call"}
                <svg
                  viewBox="0 0 16 16"
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </TrackedLink>
            </MagneticCTA>
          </Container>
        </div>
      )}

      {/* Main grid */}
      <Container className="py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="sm:col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-white/10 text-white text-xs font-black" aria-hidden="true">
              SM
            </span>
            <p className="font-extrabold text-lg tracking-tight">{settings.siteName}</p>
          </div>
          <p className="text-sm text-[var(--color-on-navy)] opacity-70 leading-relaxed max-w-xs">
            {settings.footerDescription || settings.siteDescription}
          </p>

          {/* Socials */}
          <div className="mt-5 flex flex-wrap gap-2.5">
            {socialLinks.map((item) => (
              <a
                key={item.id}
                href={item.url!}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${settings.siteName} on ${item.label}`}
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-[var(--color-on-navy)] hover:bg-white/10 hover:border-white/30 hover:text-white transition-colors"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <p className="font-semibold text-xs uppercase tracking-widest mb-5 text-[var(--color-on-navy)] opacity-60">
            Services
          </p>
          <ul className="space-y-2.5 text-sm text-[var(--color-on-navy)] opacity-80">
            {services.map((s) => (
              <li key={s.label}>
                <Link href={s.href} className="hover:text-white hover:opacity-100 transition-colors">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <p className="font-semibold text-xs uppercase tracking-widest mb-5 text-[var(--color-on-navy)] opacity-60">
            Company
          </p>
          <ul className="space-y-2.5 text-sm text-[var(--color-on-navy)] opacity-80">
            {company.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white hover:opacity-100 transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="font-semibold text-xs uppercase tracking-widest mb-5 text-[var(--color-on-navy)] opacity-60">
            Contact
          </p>
          <ul className="space-y-2.5 text-sm text-[var(--color-on-navy)] opacity-80">
            {settings.phone && (
              <li>
                <TrackedLink
                  href={`tel:${settings.phone.replace(/[^0-9+]/g, "")}`}
                  trackingType="phone"
                  trackingLocation="footer"
                  className="hover:text-white hover:opacity-100 transition-colors"
                >
                  {settings.phoneDisplay || settings.phone}
                </TrackedLink>
              </li>
            )}
            {settings.whatsappNumber || settings.whatsapp ? (
              <li>
                <TrackedLink
                  href={`https://wa.me/${(settings.whatsappNumber || settings.whatsapp).replace(/[^0-9]/g, "")}`}
                  trackingType="whatsapp"
                  trackingLocation="footer"
                  className="hover:text-white hover:opacity-100 transition-colors"
                >
                  WhatsApp
                </TrackedLink>
              </li>
            ) : null}
            {settings.contactEmail && (
              <li>
                <TrackedLink
                  href={`mailto:${settings.contactEmail}`}
                  trackingType="email"
                  trackingLocation="footer"
                  className="hover:text-white hover:opacity-100 transition-colors"
                >
                  {settings.contactEmail}
                </TrackedLink>
              </li>
            )}
            <li className="opacity-70">{settings.address || "Islamabad, Pakistan"}</li>
          </ul>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-[var(--color-navy-dim)] py-5">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--color-on-navy)] opacity-50">
          <p>&copy; {new Date().getFullYear()} {settings.siteName}. {settings.footerCopyright || "All rights reserved."}</p>
          <p>{settings.address || "Islamabad, Pakistan"} &mdash; Serving clients globally</p>
        </Container>
      </div>
    </footer>
  );
}
