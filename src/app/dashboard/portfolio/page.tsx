import { db } from "@/lib/db";
import Topbar from "@/components/admin/Topbar";
import Link from "next/link";

export default async function PortfolioAdminPage() {
  const projects = await db.portfolioProject.findMany({
    orderBy: { order: "asc" },
  }).catch(() => []);

  return (
    <>
      <Topbar title="Portfolio Management" />
      <main className="flex-1 p-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-[var(--color-navy)]">Client Projects & Case Studies</h1>
            <p className="text-xs text-[var(--color-muted)]">Manage public portfolio cards, challenges, solutions, and focus tags.</p>
          </div>
          <Link
            href="/dashboard/portfolio/new"
            className="px-4 py-2.5 rounded-[var(--radius-md)] bg-[var(--color-navy)] text-white text-sm font-semibold hover:bg-[var(--color-navy-bright)] transition-colors shadow-sm inline-flex items-center gap-2 self-start sm:self-auto"
          >
            <span>+</span> Add New Project
          </Link>
        </div>

        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-[var(--color-off-white)] border-b border-[var(--color-border)]">
              <tr>
                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-[var(--color-navy)]">Title & Client</th>
                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-[var(--color-navy)]">Category</th>
                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-[var(--color-navy)]">Order</th>
                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-[var(--color-navy)]">Status</th>
                <th className="px-5 py-3.5 text-right text-xs font-bold uppercase tracking-wider text-[var(--color-navy)]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-[var(--color-off-white)]/60 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-bold text-[var(--color-navy)]">{p.title}</p>
                    {p.clientName && <p className="text-xs text-[var(--color-muted)]">{p.clientName}</p>}
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-block px-2.5 py-1 rounded-md text-xs font-medium bg-[var(--color-off-white)] text-[var(--color-navy)] border border-[var(--color-border)]">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-mono text-xs text-[var(--color-muted)]">{p.order}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        p.published ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-700"
                      }`}>
                        {p.published ? "Published" : "Draft"}
                      </span>
                      {p.featured && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                          Featured
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/dashboard/portfolio/${p.id}`}
                        className="text-xs font-bold text-[var(--color-navy-bright)] hover:underline"
                      >
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
              {!projects.length && (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-[var(--color-muted)]">
                    <p className="font-semibold text-sm">No custom portfolio projects yet.</p>
                    <p className="text-xs mt-1">The public site is currently rendering default editorial projects.</p>
                    <Link
                      href="/dashboard/portfolio/new"
                      className="mt-4 inline-block px-4 py-2 rounded-md bg-[var(--color-navy)] text-white text-xs font-semibold"
                    >
                      Add Your First Project
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
