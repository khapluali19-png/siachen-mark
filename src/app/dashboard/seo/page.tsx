import { db } from "@/lib/db";
import Topbar from "@/components/admin/Topbar";

const SEO_PAGES = ["home", "services", "about", "portfolio", "contact"];

export default async function SEOAdminPage() {
  const metas = await db.seoMeta.findMany({ where: { page: { in: SEO_PAGES } } });
  const map = Object.fromEntries(metas.map((m) => [m.page!, m]));

  return (
    <>
      <Topbar title="SEO" />
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 gap-4">
          {SEO_PAGES.map((page) => {
            const meta = map[page];
            return (
              <div key={page} className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-background)] p-6 flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-[var(--color-navy)] capitalize">{page}</p>
                  <p className="text-xs text-[var(--color-muted)] mt-0.5 truncate max-w-lg">{meta?.title ?? "—"}</p>
                  <p className="text-xs text-[var(--color-muted)] truncate max-w-lg">{meta?.description ?? "—"}</p>
                </div>
                <a
                  href={`/dashboard/seo/${page}`}
                  className="shrink-0 px-4 py-2 rounded-[var(--radius-md)] bg-[var(--color-navy)] text-white text-sm font-semibold hover:bg-[var(--color-navy-bright)] transition-colors"
                >
                  Edit
                </a>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
