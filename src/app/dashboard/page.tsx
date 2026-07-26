import { db } from "@/lib/db";
import Topbar from "@/components/admin/Topbar";
import DashboardCard from "@/components/admin/DashboardCard";

export default async function DashboardPage() {
  const [contacts, newsletter, media, projects] = await Promise.all([
    db.contactSubmission.count(),
    db.newsletterSubscriber.count({ where: { active: true } }),
    db.mediaFile.count(),
    db.portfolioProject.count(),
  ]);

  const unread = await db.contactSubmission.count({ where: { read: false } });

  return (
    <>
      <Topbar title="Dashboard" />
      <main className="flex-1 p-6 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard title="Contact Submissions" value={contacts} sub={`${unread} unread`} accent />
          <DashboardCard title="Newsletter Subscribers" value={newsletter} />
          <DashboardCard title="Media Files" value={media} />
          <DashboardCard title="Portfolio Projects" value={projects} />
        </div>

        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-background)] p-6">
          <p className="font-semibold text-[var(--color-navy)] mb-4">Recent Contact Submissions</p>
          <RecentContacts />
        </div>
      </main>
    </>
  );
}

async function RecentContacts() {
  const submissions = await db.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  if (!submissions.length) {
    return <p className="text-sm text-[var(--color-muted)]">No submissions yet.</p>;
  }

  return (
    <div className="divide-y divide-[var(--color-border)]">
      {submissions.map((s) => (
        <div key={s.id} className="py-3 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[var(--color-navy)]">{s.name}</p>
            <p className="text-xs text-[var(--color-muted)]">{s.email} · {s.service ?? "—"}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs text-[var(--color-muted)]">{new Date(s.createdAt).toLocaleDateString()}</p>
            {!s.read && <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-[var(--color-navy)] text-white text-[10px] font-semibold">New</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
