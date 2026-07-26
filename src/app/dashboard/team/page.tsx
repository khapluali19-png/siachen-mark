import { db } from "@/lib/db";
import Topbar from "@/components/admin/Topbar";

export default async function TeamAdminPage() {
  const members = await db.teamMember.findMany({ orderBy: { order: "asc" } });

  return (
    <>
      <Topbar title="Team" />
      <main className="flex-1 p-6">
        <div className="mb-4 flex justify-end">
          <a href="/dashboard/team/new" className="px-4 py-2 rounded-[var(--radius-md)] bg-[var(--color-navy)] text-white text-sm font-semibold hover:bg-[var(--color-navy-bright)] transition-colors">
            Add Member
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((m) => (
            <div key={m.id} className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-background)] p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[var(--color-navy)] flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-white">{m.name.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[var(--color-navy)] truncate">{m.name}</p>
                <p className="text-xs text-[var(--color-muted)]">{m.role}</p>
                {m.isFounder && <span className="text-[10px] font-semibold text-[var(--color-navy-bright)]">Founder</span>}
              </div>
              <a href={`/dashboard/team/${m.id}`} className="text-xs text-[var(--color-navy-bright)] hover:underline shrink-0">Edit</a>
            </div>
          ))}
          {!members.length && <p className="text-sm text-[var(--color-muted)]">No team members yet.</p>}
        </div>
      </main>
    </>
  );
}
