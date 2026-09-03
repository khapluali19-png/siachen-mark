import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Topbar from "@/components/admin/Topbar";
import TeamMemberForm from "../TeamMemberForm";
import Link from "next/link";

export default async function EditTeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const member = await db.teamMember.findUnique({ where: { id } });
  if (!member) notFound();

  return (
    <>
      <Topbar title={`Edit ${member.name}`} />
      <main className="flex-1 p-6 max-w-4xl space-y-4">
        <div className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
          <Link href="/dashboard/team" className="hover:underline">Team</Link>
          <span>/</span>
          <span className="font-semibold text-[var(--color-navy)]">{member.name}</span>
        </div>
        <TeamMemberForm member={member} />
      </main>
    </>
  );
}
