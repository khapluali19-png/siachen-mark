import { db } from "@/lib/db";
import Topbar from "@/components/admin/Topbar";
import Link from "next/link";
export default async function TestimonialsAdminPage() {
  const items = await db.testimonial.findMany({ orderBy: { order: "asc" } });

  return (
    <>
      <Topbar title="Testimonials" />
      <main className="flex-1 p-6">
        <div className="mb-4 flex justify-end">
          <Link href="/dashboard/testimonials/new" className="px-4 py-2 rounded-[var(--radius-md)] bg-[var(--color-navy)] text-white text-sm font-semibold hover:bg-[var(--color-navy-bright)] transition-colors">
            Add Testimonial
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((t) => (
            <div key={t.id} className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-background)] p-6">
              <p className="text-sm text-[var(--color-foreground)] italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-[var(--color-navy)]">{t.name}</p>
                  <p className="text-xs text-[var(--color-muted)]">{t.role}</p>
                </div>
                <a href={`/dashboard/testimonials/${t.id}`} className="text-xs text-[var(--color-navy-bright)] hover:underline">Edit</a>
              </div>
            </div>
          ))}
          {!items.length && (
            <p className="text-sm text-[var(--color-muted)]">No testimonials yet.</p>
          )}
        </div>
      </main>
    </>
  );
}
