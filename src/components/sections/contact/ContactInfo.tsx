import { getSiteSettings } from "@/lib/settings";
import TrackedLink from "@/components/ui/TrackedLink";

export default async function ContactInfo() {
  const settings = await getSiteSettings();

  const phone = settings.phone || "+92 348 8868517";
  const rawPhone = phone.replace(/[^0-9+]/g, "");
  const whatsapp = settings.whatsappNumber || phone;
  const rawWhatsapp = whatsapp.replace(/[^0-9]/g, "");
  const email = settings.contactEmail || "contact@siachenmark.com";
  const linkedin = settings.linkedinUrl || "https://www.linkedin.com/company/109209003";

  const channels: {
    label: string;
    value: string;
    href: string;
    note: string;
    trackingType: "whatsapp" | "email" | "phone" | "custom";
  }[] = [
    {
      label: "WhatsApp",
      value: whatsapp,
      href: `https://wa.me/${rawWhatsapp}`,
      note: "Fastest way to reach our team — usually a reply within hours.",
      trackingType: "whatsapp",
    },
    {
      label: "Email",
      value: email,
      href: `mailto:${email}`,
      note: "Send us project briefs, RFPs, or general inquiries.",
      trackingType: "email",
    },
    {
      label: "Phone",
      value: phone,
      href: `tel:${rawPhone}`,
      note: "Prefer to talk directly? Give us a call during business hours.",
      trackingType: "phone",
    },
    {
      label: "LinkedIn",
      value: "Siachen Mark LinkedIn",
      href: linkedin,
      note: "Follow our team updates and strategic insights.",
      trackingType: "custom",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[var(--color-navy)] font-display">Reach us directly</h2>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          No call centers, no automated bots. You&rsquo;ll talk directly to the performance strategists who manage your campaigns.
        </p>
      </div>

      <ul className="space-y-4">
        {channels.map((c) => (
          <li
            key={c.label}
            className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-5 shadow-sm hover:border-[var(--color-navy)] transition-colors"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-navy-bright)]">
              {c.label}
            </p>
            <TrackedLink
              href={c.href}
              trackingType={c.trackingType}
              trackingLocation="contact_info_card"
              className="mt-1 block text-base font-extrabold text-[var(--color-navy)] hover:text-[var(--color-navy-bright)] transition-colors"
            >
              {c.value}
            </TrackedLink>
            <p className="mt-1 text-xs text-[var(--color-muted)]">{c.note}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
