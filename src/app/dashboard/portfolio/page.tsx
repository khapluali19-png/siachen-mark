import { db } from "@/lib/db";
import Topbar from "@/components/admin/Topbar";

export default async function PortfolioAdminPage() {
  const projects = await db.portfolioProject.findMany({ orderBy: { order: "asc" } });

  return (
    <>
      <Topbar title="Portfolio" />
      <main className="flex-1 p-6">
        <div className="mb-4 flex justify-end">
          <a href="/dashboard/portfolio/new" className="px-4 py-2 rounded-[var(--radius-md)] bg-[var(--color-navy)] text-white text-sm font-semibold hover:bg-[var(--color-navy-bright)] transition-colors">
            Add Project
          </a>
        </div>
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-background)] overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[var(--color-off-white)] border-b border-[var(--color-border)]">
              <tr>
                {["Title", "Category", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-[var(--color-off-white)] transition-colors">
                  <td className="px-4 py-3 font-medium text-[var(--color-navy)]">{p.title}</td>
                  <td className="px-4 py-3 text-[var(--color-muted)]">{p.category}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${p.published ? "bg-green-100 text-green-700" : "bg-[var(--color-off-white)] text-[var(--color-muted)]"}`}>
                      {p.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <a href={`/dashboard/portfolio/${p.id}`} className="text-xs text-[var(--color-navy-bright)] hover:underline">Edit</a>
                  </td>
                </tr>
              ))}
              {!projects.length && (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-[var(--color-muted)]">No projects yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
