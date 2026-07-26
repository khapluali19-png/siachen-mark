const channels = [
  {
    label: "WhatsApp",
    value: "+92 348 8868517",
    href: "https://wa.me/923488868517",
    note: "Fastest way to reach us — usually a reply within hours.",
  },
  {
    label: "Phone",
    value: "+92 348 8868517",
    href: "tel:+923488868517",
    note: "Prefer to talk? Give us a call during business hours.",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/company/109209003",
    href: "https://www.linkedin.com/company/109209003",
    note: "Follow along and connect with the team.",
  },
];

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[var(--color-navy)]">Reach us directly</h2>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          No call centers, no bots. You&rsquo;ll talk to the people who actually do the work.
        </p>
      </div>

      <ul className="space-y-4">
        {channels.map((c) => (
          <li
            key={c.label}
            className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-background)] p-5"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">
              {c.label}
            </p>
            <a
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="mt-1 block text-base font-semibold text-[var(--color-navy)] hover:text-[var(--color-navy-bright)] transition-colors"
            >
              {c.value}
            </a>
            <p className="mt-1 text-sm text-[var(--color-muted)]">{c.note}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
