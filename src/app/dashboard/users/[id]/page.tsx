"use client";
import { useEffect, useState } from "react";

type Report = {
  id: string; businessName: string; query: string;
  score: number; grade: string; createdAt: string;
};

type UserDetail = {
  id: string; name: string | null; email: string; role: string;
  plan: string; scanCount: number; createdAt: string; lastLoginAt: string | null;
  auditReports: Report[];
};

export default function AdminUserDetailPage({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState({ text: "", ok: true });

  useEffect(() => {
    fetch(`/api/admin/users/${params.id}`)
      .then((r) => r.json())
      .then((d) => { setUser(d); setLoading(false); });
  }, [params.id]);

  async function changePlan(plan: "FREE" | "UNLIMITED") {
    const res = await fetch(`/api/admin/users/${params.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    });
    if (res.ok) {
      const updated = await res.json();
      setUser((u) => u ? { ...u, plan: updated.plan } : u);
      setMsg({ text: `✅ Plan changed to ${plan}`, ok: true });
    } else {
      setMsg({ text: "❌ Failed to update plan", ok: false });
    }
    setTimeout(() => setMsg({ text: "", ok: true }), 3000);
  }

  if (loading) return <div className="p-6 text-sm text-[var(--color-muted)]">Loading…</div>;
  if (!user) return <div className="p-6 text-sm text-red-500">User not found.</div>;

  const isUnlimited = user.plan === "UNLIMITED";

  return (
    <div className="flex-1 p-6 space-y-5 max-w-3xl">
      <a href="/dashboard/users" className="text-xs text-[var(--color-muted)] hover:text-[var(--color-navy)]">← Back to Users</a>

      {msg.text && (
        <div className={`px-4 py-2 rounded-[var(--radius-md)] text-sm font-medium ${msg.ok ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
          {msg.text}
        </div>
      )}

      {/* Profile card */}
      <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-background)] p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xl font-bold text-[var(--color-navy)]">{user.name || "—"}</p>
            <p className="text-sm text-[var(--color-muted)]">{user.email}</p>
            <div className="flex items-center gap-2 mt-3">
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${isUnlimited ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"}`}>
                {isUnlimited ? "✨ Unlimited" : "🆓 Free"}
              </span>
              <span className="text-xs text-[var(--color-muted)]">{user.role === "ADMIN" ? "👑 Admin" : "👤 User"}</span>
            </div>
          </div>
          {user.role !== "ADMIN" && (
            <div className="flex gap-2">
              <button
                onClick={() => changePlan("UNLIMITED")}
                disabled={isUnlimited}
                className="px-3 py-1.5 text-xs font-semibold bg-emerald-100 text-emerald-700 rounded-[var(--radius-md)] hover:bg-emerald-200 disabled:opacity-40 transition-colors"
              >
                ↑ Set Unlimited
              </button>
              <button
                onClick={() => changePlan("FREE")}
                disabled={!isUnlimited}
                className="px-3 py-1.5 text-xs font-semibold bg-red-100 text-red-700 rounded-[var(--radius-md)] hover:bg-red-200 disabled:opacity-40 transition-colors"
              >
                ↓ Set Free
              </button>
            </div>
          )}
        </div>

        <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-5 pt-5 border-t border-[var(--color-border)] text-sm">
          <div><dt className="text-xs text-[var(--color-muted)]">Total Scans</dt><dd className="font-bold text-[var(--color-navy)] text-lg">{user.scanCount}</dd></div>
          <div><dt className="text-xs text-[var(--color-muted)]">Reports Saved</dt><dd className="font-bold text-[var(--color-navy)] text-lg">{user.auditReports.length}</dd></div>
          <div><dt className="text-xs text-[var(--color-muted)]">Joined</dt><dd className="text-[var(--color-navy)] mt-0.5">{new Date(user.createdAt).toLocaleDateString()}</dd></div>
          <div><dt className="text-xs text-[var(--color-muted)]">Last Login</dt><dd className="text-[var(--color-navy)] mt-0.5">{user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : "Never"}</dd></div>
        </dl>
      </div>

      {/* Reports */}
      <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-background)] p-5">
        <p className="font-semibold text-[var(--color-navy)] mb-4">Audit Reports ({user.auditReports.length})</p>
        {user.auditReports.length === 0 ? (
          <p className="text-sm text-[var(--color-muted)]">No reports yet.</p>
        ) : (
          <div className="divide-y divide-[var(--color-border)]">
            {user.auditReports.map((r) => {
              const c = r.score >= 80 ? "bg-emerald-100 text-emerald-700" : r.score >= 60 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700";
              return (
                <div key={r.id} className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-[var(--color-navy)]">{r.businessName}</p>
                    <p className="text-xs text-[var(--color-muted)]">{r.query} · {new Date(r.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${c}`}>{r.grade} {r.score}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
