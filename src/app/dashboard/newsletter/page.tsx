import { db } from "@/lib/db";
import Topbar from "@/components/admin/Topbar";

export default async function NewsletterPage() {
  const subscribers = await db.newsletterSubscriber.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <>
      <Topbar title="Newsletter Subscribers" />
      <main className="flex-1 p-6">
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-background)] overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[var(--color-off-white)] border-b border-[var(--color-border)]">
              <tr>
                {["Email", "Status", "Joined"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {subscribers.map((s) => (
                <tr key={s.id} className="hover:bg-[var(--color-off-white)] transition-colors">
                  <td className="px-4 py-3 text-[var(--color-navy)]">{s.email}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${s.active ? "bg-green-100 text-green-700" : "bg-[var(--color-off-white)] text-[var(--color-muted)]"}`}>
                      {s.active ? "Active" : "Unsubscribed"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[var(--color-muted)]">{new Date(s.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {!subscribers.length && (
                <tr><td colSpan={3} className="px-4 py-8 text-center text-[var(--color-muted)]">No subscribers yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
