import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function ReportsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const reports = await db.auditReport.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      businessName: true,
      query: true,
      address: true,
      score: true,
      grade: true,
      issuesCount: true,
      rating: true,
      reviewCount: true,
      createdAt: true,
    },
  });

  return (
    <>
      <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[var(--color-background)] border-b border-[var(--color-border)]">
        <h1 className="font-bold text-[var(--color-navy)] text-lg">My Reports</h1>
        <span className="text-sm text-[var(--color-muted)]">{reports.length} report{reports.length !== 1 ? "s" : ""}</span>
      </header>

      <main className="flex-1 p-6">
        {reports.length === 0 ? (
          <div className="text-center py-20 text-[var(--color-muted)]">
            <p className="text-5xl mb-4">📋</p>
            <p className="text-lg font-semibold text-[var(--color-navy)]">No reports yet</p>
            <p className="text-sm mt-2">Install the Chrome extension and audit a Google Business Profile to see reports here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {reports.map((r) => {
              const scoreColor = r.score >= 80 ? "text-emerald-600 bg-emerald-50" : r.score >= 60 ? "text-yellow-600 bg-yellow-50" : "text-red-600 bg-red-50";
              return (
                <div
                  key={r.id}
                  className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-background)] p-5 flex items-start justify-between gap-4 hover:shadow-[var(--shadow-md)] transition-shadow"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[var(--color-navy)] truncate">{r.businessName}</p>
                    {r.address && <p className="text-xs text-[var(--color-muted)] mt-0.5 truncate">📍 {r.address}</p>}
                    <div className="flex items-center gap-4 mt-2 flex-wrap">
                      <span className="text-xs text-[var(--color-muted)]">🔍 {r.query}</span>
                      {r.rating != null && <span className="text-xs text-[var(--color-muted)]">⭐ {r.rating} ({r.reviewCount ?? 0} reviews)</span>}
                      {r.issuesCount > 0 && <span className="text-xs text-orange-600">⚠️ {r.issuesCount} issues</span>}
                    </div>
                    <p className="text-xs text-[var(--color-muted)] mt-2">{new Date(r.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="flex flex-col items-end gap-3 shrink-0">
                    <div className={`px-3 py-1.5 rounded-[var(--radius-lg)] text-center min-w-[56px] ${scoreColor}`}>
                      <p className="text-xs font-medium">{r.grade}</p>
                      <p className="text-lg font-extrabold leading-none">{r.score}</p>
                    </div>
                    <Link
                      href={`/user/reports/${r.id}`}
                      className="text-xs font-semibold text-[var(--color-navy-bright)] hover:underline"
                    >
                      View →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}
