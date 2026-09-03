import Topbar from "@/components/admin/Topbar";
import TeamMemberForm from "../TeamMemberForm";
import Link from "next/link";

export default function NewTeamMemberPage() {
  return (
    <>
      <Topbar title="Add Team Member" />
      <main className="flex-1 p-6 max-w-4xl space-y-4">
        <div className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
          <Link href="/dashboard/team" className="hover:underline">Team</Link>
          <span>/</span>
          <span className="font-semibold text-[var(--color-navy)]">New Member</span>
        </div>
        <TeamMemberForm />
      </main>
    </>
  );
}
