import { db } from "@/lib/db";
import Topbar from "@/components/admin/Topbar";
import MediaGrid from "@/components/admin/MediaGrid";

export const dynamic = "force-dynamic";

export default async function MediaPage() {
  const files = await db.mediaFile.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <>
      <Topbar title="Media Library" />
      <main className="flex-1 p-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-[var(--color-muted)]">{files.length} file{files.length !== 1 ? "s" : ""}</p>
          <a
            href="/dashboard/media/upload"
            className="px-4 py-2 rounded-[var(--radius-md)] bg-[var(--color-navy)] text-white text-sm font-semibold hover:bg-[var(--color-navy-bright)] transition-colors"
          >
            Upload Files
          </a>
        </div>
        {files.length === 0 ? (
          <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-background)] p-16 text-center text-sm text-[var(--color-muted)]">
            No files uploaded yet.
          </div>
        ) : (
          <MediaGrid files={files.map((f) => ({ id: f.id, name: f.name, url: f.url, type: f.type, size: f.size }))} />
        )}
      </main>
    </>
  );
}
