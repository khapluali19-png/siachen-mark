import { db } from "@/lib/db";
import Topbar from "@/components/admin/Topbar";
import Link from "next/link";
import { getSiteSettings } from "@/lib/settings";

const SEO_PAGES = [
  { key: "home", label: "Homepage (/)" },
  { key: "services", label: "Services (/services)" },
  { key: "about", label: "About Us (/about)" },
  { key: "portfolio", label: "Portfolio (/portfolio)" },
  { key: "contact", label: "Contact (/contact)" },
  { key: "blog", label: "Blog (/blog)" },
  { key: "careers", label: "Careers (/careers)" },
];

export default async function SEOAdminPage() {
  const [metas, settings] = await Promise.all([
    db.seoMeta.findMany({ where: { page: { in: SEO_PAGES.map((p) => p.key) } } }),
    getSiteSettings(),
  ]);

  const map = Object.fromEntries(metas.map((m) => [m.page!, m]));

  return (
    <>
      <Topbar title="Page-Level SEO Management" />
      <main className="flex-1 p-6 max-w-4xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[var(--color-navy)]">Page Metadata & Social Sharing</h1>
            <p className="text-xs text-[var(--color-muted)]">
              Customize title tags, meta descriptions, Open Graph cards, and robots directives for each public route.
            </p>
          </div>
          <Link
            href="/dashboard/settings"
            className="px-4 py-2 text-xs font-semibold rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white text-[var(--color-navy)] hover:bg-[var(--color-off-white)] transition-colors"
          >
            ⚙️ Global SEO Defaults →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {SEO_PAGES.map(({ key, label }) => {
            const meta = map[key];
            const displayTitle = meta?.title || `${settings.siteName} (Global Default)`;
            const displayDesc = meta?.description || settings.defaultMetaDescription;
            const hasCustom = Boolean(meta?.title || meta?.description || meta?.ogTitle);

            return (
              <div
                key={key}
                className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-[var(--color-navy)] text-base">{label}</p>
                    {hasCustom ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        Custom SEO
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                        Inheriting Global
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-medium text-[var(--color-navy-bright)] truncate">
                    Title: {displayTitle}
                  </p>
                  <p className="text-xs text-[var(--color-muted)] line-clamp-2">
                    {displayDesc || "No description set"}
                  </p>
                </div>
                <Link
                  href={`/dashboard/seo/${key}`}
                  className="shrink-0 inline-flex items-center justify-center px-5 py-2.5 rounded-[var(--radius-md)] bg-[var(--color-navy)] text-white text-sm font-semibold hover:bg-[var(--color-navy-bright)] transition-colors shadow-sm"
                >
                  Edit SEO
                </Link>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
