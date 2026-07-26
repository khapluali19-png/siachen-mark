import { db } from "@/lib/db";
import Topbar from "@/components/admin/Topbar";

export default async function FAQAdminPage() {
  const items = await db.fAQ.findMany({ orderBy: { order: "asc" } });

  return (
    <>
      <Topbar title="FAQ" />
      <main className="flex-1 p-6">
        <div className="mb-4 flex justify-end">
          <a href="/dashboard/faq/new" className="px-4 py-2 rounded-[var(--radius-md)] bg-[var(--color-navy)] text-white text-sm font-semibold hover:bg-[var(--color-navy-bright)] transition-colors">
            Add FAQ
          </a>
        </div>
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-background)] overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[var(--color-off-white)] border-b border-[var(--color-border)]">
              <tr>
                {["Question", "Category", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {items.map((f) => (
                <tr key={f.id} className="hover:bg-[var(--color-off-white)] transition-colors">
                  <td className="px-4 py-3 font-medium text-[var(--color-navy)] max-w-xs truncate">{f.question}</td>
                  <td className="px-4 py-3 text-[var(--color-muted)]">{f.category ?? "—"}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${f.published ? "bg-green-100 text-green-700" : "bg-[var(--color-off-white)] text-[var(--color-muted)]"}`}>
                      {f.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <a href={`/dashboard/faq/${f.id}`} className="text-xs text-[var(--color-navy-bright)] hover:underline">Edit</a>
                  </td>
                </tr>
              ))}
              {!items.length && (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-[var(--color-muted)]">No FAQs yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
