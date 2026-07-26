import { db } from "@/lib/db";
import Topbar from "@/components/admin/Topbar";
import Link from "next/link";

export default async function BlogAdminPage() {
  const posts = await db.blogPost.findMany({ orderBy: { createdAt: "desc" }, take: 50 });

  return (
    <>
      <Topbar title="Blog" />
      <main className="flex-1 p-6">
        <div className="mb-4 flex justify-end">
           <Link href="/dashboard/blog/new" className="px-4 py-2 rounded-[var(--radius-md)] bg-[var(--color-navy)] text-white text-sm font-semibold hover:bg-[var(--color-navy-bright)] transition-colors">
            New Post
          </Link>
        </div>
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-background)] overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[var(--color-off-white)] border-b border-[var(--color-border)]">
              <tr>
                {["Title", "Status", "Date", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {posts.map((p) => (
                <tr key={p.id} className="hover:bg-[var(--color-off-white)] transition-colors">
                  <td className="px-4 py-3 font-medium text-[var(--color-navy)]">{p.title}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${p.published ? "bg-green-100 text-green-700" : "bg-[var(--color-off-white)] text-[var(--color-muted)]"}`}>
                      {p.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[var(--color-muted)]">{new Date(p.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <a href={`/dashboard/blog/${p.id}`} className="text-xs text-[var(--color-navy-bright)] hover:underline">Edit</a>
                  </td>
                </tr>
              ))}
              {!posts.length && (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-[var(--color-muted)]">No posts yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
