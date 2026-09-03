import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";

const FREE_LIMIT = 10;

export default async function UserDashboard() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true, name: true, email: true, plan: true,
      scanCount: true, createdAt: true, lastLoginAt: true,
      _count: { select: { auditReports: true } },
    },
  });

  if (!user) redirect("/login");

  const isUnlimited = user.plan === "UNLIMITED";
  const remaining = isUnlimited ? null : Math.max(0, FREE_LIMIT - user.scanCount);
  const usedPct = isUnlimited ? 100 : Math.min(100, (user.scanCount / FREE_LIMIT) * 100);

  const recentReports = await db.auditReport.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 5,
    select: { id: true, businessName: true, score: true, grade: true, createdAt: true },
  });

  return (
    <>
      {/* Topbar */}
      <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[var(--color-background)] border-b border-[var(--color-border)]">
        <h1 className="font-bold text-[var(--color-navy)] text-lg">Dashboard</h1>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${isUnlimited ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"}`}>
          {isUnlimited ? "✨ Unlimited" : "🆓 Free Plan"}
        </span>
      </header>

      <main className="flex-1 p-6 space-y-6">
        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card title="Plan" value={isUnlimited ? "Unlimited" : "Free"} color={isUnlimited ? "emerald" : "blue"} />
          <Card title="Total Scans" value={user.scanCount} />
          <Card title="Reports Saved" value={user._count.auditReports} />
          <Card title={isUnlimited ? "Scans Left" : "Remaining"} value={isUnlimited ? "∞" : remaining!} />
        </div>

        {/* Usage bar (free only) */}
        {!isUnlimited && (
          <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-background)] p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="font-semibold text-[var(--color-navy)]">Free Plan Usage</p>
              <span className="text-sm text-[var(--color-muted)]">{user.scanCount} / {FREE_LIMIT} scans used</span>
            </div>
            <div className="w-full h-2.5 bg-[var(--color-border)] rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${usedPct >= 90 ? "bg-red-500" : "bg-[var(--color-navy-bright)]"}`}
                style={{ width: `${usedPct}%` }}
              />
            </div>
            {remaining === 0 ? (
              <p className="mt-3 text-sm text-red-600 font-medium">
                ⚠️ Limit reached. Contact admin to upgrade to Unlimited.
              </p>
            ) : (
              <p className="mt-2 text-xs text-[var(--color-muted)]">{remaining} scans remaining on Free plan.</p>
            )}
          </div>
        )}

        {/* Account info */}
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-background)] p-5">
          <p className="font-semibold text-[var(--color-navy)] mb-4">Account Information</p>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <InfoRow label="Name" value={user.name || "—"} />
            <InfoRow label="Email" value={user.email} />
            <InfoRow label="Plan" value={isUnlimited ? "Unlimited ✨" : "Free 🆓"} />
            <InfoRow label="Member Since" value={new Date(user.createdAt).toLocaleDateString()} />
            <InfoRow label="Last Login" value={user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : "—"} />
            <InfoRow label="Total Reports" value={String(user._count.auditReports)} />
          </dl>
        </div>

        {/* Recent reports */}
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-background)] p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="font-semibold text-[var(--color-navy)]">Recent Reports</p>
            <Link href="/user/reports" className="text-xs text-[var(--color-navy-bright)] hover:underline">View all →</Link>
          </div>

          {recentReports.length === 0 ? (
            <div className="text-center py-8 text-[var(--color-muted)]">
              <p className="text-4xl mb-2">📋</p>
              <p className="text-sm">No reports yet. Install the Chrome extension to start auditing Google Business Profiles.</p>
            </div>
          ) : (
            <div className="divide-y divide-[var(--color-border)]">
              {recentReports.map((r) => (
                <div key={r.id} className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-[var(--color-navy)]">{r.businessName}</p>
                    <p className="text-xs text-[var(--color-muted)]">{new Date(r.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <ScoreBadge score={r.score} grade={r.grade} />
                    <Link href={`/user/reports/${r.id}`} className="text-xs text-[var(--color-navy-bright)] hover:underline">View →</Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

function Card({ title, value, color }: { title: string; value: string | number; color?: string }) {
  return (
    <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-background)] p-4">
      <p className="text-xs font-medium text-[var(--color-muted)] mb-1">{title}</p>
      <p className={`text-2xl font-extrabold ${color === "emerald" ? "text-emerald-600" : color === "blue" ? "text-blue-600" : "text-[var(--color-navy)]"}`}>
        {value}
      </p>
    </div>
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

function ScoreBadge({ score, grade }: { score: number; grade: string }) {
  const color = score >= 80 ? "bg-emerald-100 text-emerald-700" : score >= 60 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700";
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${color}`}>
      {grade} ({score})
    </span>
  );
}
