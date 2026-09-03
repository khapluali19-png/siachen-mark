import { db } from "@/lib/db";
import Topbar from "@/components/admin/Topbar";
import SeoEditForm from "./SeoEditForm";
import Link from "next/link";
import { getSiteSettings } from "@/lib/settings";

export default async function SeoEditPage({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const [meta, settings] = await Promise.all([
    db.seoMeta.findUnique({ where: { page } }),
    getSiteSettings(),
  ]);

  const pageMeta = meta || {
    id: "",
    page,
    title: "",
    description: "",
    ogTitle: "",
    ogDesc: "",
    ogImage: "",
    canonical: "",
    robots: "index, follow",
    twitterCard: "summary_large_image",
    schema: null,
    blogPostId: null,
    updatedAt: new Date(),
  };

  return (
    <>
      <Topbar title={`SEO — ${page.toUpperCase()}`} />
      <main className="flex-1 p-6 max-w-3xl space-y-4">
        <div className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
          <Link href="/dashboard/seo" className="hover:underline">SEO Pages</Link>
          <span>/</span>
          <span className="capitalize font-semibold text-[var(--color-navy)]">{page}</span>
        </div>

        <SeoEditForm meta={pageMeta} page={page} globalSettings={settings} />
      </main>
    </>
  );
}
