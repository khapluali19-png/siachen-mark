"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

type User = {
  id: string; name: string | null; email: string; role: string;
  plan: string; scanCount: number; createdAt: string; lastLoginAt: string | null;
  _count: { auditReports: number };
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: "", ok: true });
  const router = useRouter();

  const fetchUsers = useCallback(async (query: string, pg: number) => {
    setLoading(true);
    const res = await fetch(`/api/admin/users?q=${encodeURIComponent(query)}&page=${pg}`);
    if (res.ok) {
      const data = await res.json();
      setUsers(data.users);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchUsers(q, page);
  }, [fetchUsers, q, page]);

  async function changePlan(userId: string, plan: "FREE" | "UNLIMITED") {
    setMsg({ text: "", ok: true });
    const res = await fetch(`/api/admin/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    });
    if (res.ok) {
      setMsg({ text: `✅ Plan updated to ${plan}`, ok: true });
      fetchUsers(q, page);
    } else {
      const j = await res.json();
      setMsg({ text: `❌ ${j.error}`, ok: false });
    }
    setTimeout(() => setMsg({ text: "", ok: true }), 3000);
  }

  return (
    <div className="flex-1 p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[var(--color-navy)]">User Management</h2>
          <p className="text-sm text-[var(--color-muted)] mt-0.5">{total} registered users</p>
        </div>
      </div>

      {/* Alert */}
      {msg.text && (
        <div className={`px-4 py-2 rounded-[var(--radius-md)] text-sm font-medium ${msg.ok ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
          {msg.text}
        </div>
      )}

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or email…"
        value={q}
        onChange={(e) => { setQ(e.target.value); setPage(1); }}
        className="w-full max-w-sm px-4 py-2 border border-[var(--color-border)] rounded-[var(--radius-md)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-navy-bright)]"
      />

      {/* Table */}
      <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-background)] overflow-hidden">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] gap-0 border-b border-[var(--color-border)] px-4 py-2 text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wide">
          <span>User</span>
          <span>Plan</span>
          <span>Scans</span>
          <span>Reports</span>
          <span>Joined</span>
          <span>Actions</span>
        </div>

        {loading ? (
          <div className="px-4 py-8 text-center text-sm text-[var(--color-muted)]">Loading…</div>
        ) : users.length === 0 ? (
          <div className="px-4 py-8 text-center text-sm text-[var(--color-muted)]">No users found.</div>
        ) : (
          users.map((u) => (
            <div key={u.id} className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] gap-0 px-4 py-3 border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-off-white)] transition-colors items-center text-sm">
              {/* User info */}
              <div>
                <p className="font-semibold text-[var(--color-navy)] truncate">{u.name || "—"}</p>
                <p className="text-xs text-[var(--color-muted)] truncate">{u.email}</p>
                <p className="text-[10px] text-[var(--color-muted)] mt-0.5">
                  {u.role === "ADMIN" ? "👑 Admin" : "👤 User"} · Last login: {u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleDateString() : "Never"}
                </p>
              </div>

              {/* Plan badge */}
              <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold w-fit ${u.plan === "UNLIMITED" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"}`}>
                {u.plan === "UNLIMITED" ? "✨ Unlimited" : "🆓 Free"}
              </span>

              <span>{u.scanCount}</span>
              <span>{u._count.auditReports}</span>
              <span className="text-xs text-[var(--color-muted)]">{new Date(u.createdAt).toLocaleDateString()}</span>

              {/* Actions */}
              <div className="flex gap-2">
                {u.role !== "ADMIN" && (
                  <>
                    {u.plan === "FREE" ? (
                      <button
                        onClick={() => changePlan(u.id, "UNLIMITED")}
                        className="px-2 py-1 text-xs font-semibold bg-emerald-100 text-emerald-700 rounded-[var(--radius-sm)] hover:bg-emerald-200 transition-colors whitespace-nowrap"
                      >
                        ↑ Unlimited
                      </button>
                    ) : (
                      <button
                        onClick={() => changePlan(u.id, "FREE")}
                        className="px-2 py-1 text-xs font-semibold bg-red-100 text-red-700 rounded-[var(--radius-sm)] hover:bg-red-200 transition-colors whitespace-nowrap"
                      >
                        ↓ Free
                      </button>
                    )}
                  </>
                )}
                <button
                  onClick={() => router.push(`/dashboard/users/${u.id}`)}
                  className="px-2 py-1 text-xs font-semibold bg-[var(--color-off-white)] text-[var(--color-navy)] rounded-[var(--radius-sm)] hover:bg-[var(--color-border)] transition-colors"
                >
                  Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center gap-3 justify-center">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] disabled:opacity-40">← Prev</button>
          <span className="text-sm text-[var(--color-muted)]">Page {page} of {totalPages}</span>
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] disabled:opacity-40">Next →</button>
        </div>
      )}
    </div>
  );
}
