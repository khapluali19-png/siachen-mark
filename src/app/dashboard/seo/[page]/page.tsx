import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Topbar from "@/components/admin/Topbar";
import SeoEditForm from "./SeoEditForm";

export default async function SeoEditPage({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const meta = await db.seoMeta.findUnique({ where: { page } });
  if (!meta) notFound();

  return (
    <>
      <Topbar title={`SEO — ${page}`} />
      <main className="flex-1 p-6 max-w-2xl">
        <SeoEditForm meta={meta} />
      </main>
    </>
  );
}
