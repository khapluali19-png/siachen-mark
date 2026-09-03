import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";

export default async function ReportDetailPage({ params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const report = await db.auditReport.findUnique({ where: { id: params.id } });

  if (!report) notFound();

  // Ownership check — users can only see their own reports
  if (report.userId !== session.user.id) {
    return (
      <main className="flex-1 p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">🔒</p>
          <p className="text-lg font-semibold text-[var(--color-navy)]">Access Denied</p>
          <p className="text-sm text-[var(--color-muted)] mt-1">You don't have permission to view this report.</p>
          <Link href="/user/reports" className="mt-4 inline-block text-sm text-[var(--color-navy-bright)] hover:underline">
            ← Back to my reports
          </Link>
        </div>
      </main>
    );
  }

  const scoreColor = report.score >= 80 ? "text-emerald-600 bg-emerald-50 border-emerald-200"
    : report.score >= 60 ? "text-yellow-600 bg-yellow-50 border-yellow-200"
    : "text-red-600 bg-red-50 border-red-200";

  const data = report.data as Record<string, any>;

  return (
    <>
      <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[var(--color-background)] border-b border-[var(--color-border)]">
        <div>
          <Link href="/user/reports" className="text-xs text-[var(--color-muted)] hover:text-[var(--color-navy)]">
            ← Reports
          </Link>
          <h1 className="font-bold text-[var(--color-navy)] text-lg mt-0.5 truncate">{report.businessName}</h1>
        </div>
        <a
          href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(report, null, 2))}`}
          download={`${report.businessName.replace(/\s+/g, "_")}_audit.json`}
          className="px-3 py-1.5 text-xs font-semibold bg-[var(--color-navy)] text-white rounded-[var(--radius-md)] hover:bg-[var(--color-navy-dim)] transition-colors"
        >
          ⬇ Download JSON
        </a>
      </header>

      <main className="flex-1 p-6 space-y-5">
        {/* Score card */}
        <div className={`rounded-[var(--radius-xl)] border p-6 flex items-center gap-6 ${scoreColor}`}>
          <div className="text-center min-w-[80px]">
            <p className="text-5xl font-extrabold">{report.score}</p>
            <p className="text-lg font-bold mt-1">{report.grade}</p>
          </div>
          <div>
            <p className="font-semibold text-lg">{report.businessName}</p>
            {report.address && <p className="text-sm mt-0.5">📍 {report.address}</p>}
            {report.phone && <p className="text-sm mt-0.5">📞 {report.phone}</p>}
            {report.website && <a href={report.website} target="_blank" rel="noopener noreferrer" className="text-sm mt-0.5 block hover:underline">🌐 {report.website}</a>}
          </div>
        </div>

        {/* Business Info */}
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-background)] p-5">
          <p className="font-semibold text-[var(--color-navy)] mb-4">Business Information</p>
          <dl className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
            <InfoRow label="Search Query" value={report.query} />
            {report.rating != null && <InfoRow label="Rating" value={`⭐ ${report.rating}`} />}
            {report.reviewCount != null && <InfoRow label="Reviews" value={String(report.reviewCount)} />}
            <InfoRow label="Issues Found" value={`${report.issuesCount} issues`} />
            <InfoRow label="Audit Date" value={new Date(report.createdAt).toLocaleString()} />
          </dl>
        </div>

        {/* Issues / Detailed data */}
        {data && typeof data === "object" && Object.keys(data).length > 0 && (
          <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-background)] p-5">
            <p className="font-semibold text-[var(--color-navy)] mb-4">Audit Details</p>
            <div className="space-y-3">
              {Object.entries(data).map(([key, val]) => {
                if (typeof val === "object" && val !== null) {
                  return (
                    <div key={key} className="border border-[var(--color-border)] rounded-[var(--radius-md)] p-3">
                      <p className="text-xs font-semibold text-[var(--color-navy)] uppercase tracking-wide mb-2">
                        {key.replace(/_/g, " ")}
                      </p>
                      <pre className="text-xs text-[var(--color-muted)] overflow-auto max-h-32 whitespace-pre-wrap">
                        {JSON.stringify(val, null, 2)}
                      </pre>
                    </div>
                  );
                }
                return (
                  <div key={key} className="flex items-start gap-2 text-sm">
                    <span className="text-[var(--color-muted)] min-w-[140px] shrink-0">{key.replace(/_/g, " ")}:</span>
                    <span className="text-[var(--color-navy)] font-medium">{String(val)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-[var(--color-muted)]">{label}</dt>
      <dd className="text-sm font-medium text-[var(--color-navy)] mt-0.5">{value}</dd>
    </div>
  );
}
