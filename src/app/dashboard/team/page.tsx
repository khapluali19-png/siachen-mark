import { db } from "@/lib/db";
import Topbar from "@/components/admin/Topbar";
import Link from "next/link";
import Image from "next/image";

export default async function TeamAdminPage() {
  const members = await db.teamMember.findMany({ orderBy: { order: "asc" } });

  return (
    <>
      <Topbar title="Team Management" />
      <main className="flex-1 p-6 max-w-5xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[var(--color-navy)]">Team Members</h1>
            <p className="text-xs text-[var(--color-muted)]">
              Manage agency team profiles, roles, images, bios, and LinkedIn profiles.
            </p>
          </div>
          <Link
            href="/dashboard/team/new"
            className="px-4 py-2.5 rounded-[var(--radius-md)] bg-[var(--color-navy)] text-white text-sm font-semibold hover:bg-[var(--color-navy-bright)] transition-colors shadow-sm inline-flex items-center gap-1.5"
          >
            <span>+</span> Add Team Member
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {members.map((m) => (
            <div
              key={m.id}
              className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden bg-[var(--color-off-white)] border border-[var(--color-border)] shrink-0 flex items-center justify-center">
                    {m.image ? (
                      <Image
                        src={m.image}
                        alt={m.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-lg font-extrabold text-[var(--color-navy)]">
                        {m.name.charAt(0)}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        m.published
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {m.published ? "Active" : "Inactive"}
                    </span>
                    {m.isFounder && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                        Leadership
                      </span>
                    )}
                    {m.isFeatured && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="font-bold text-[var(--color-navy)] text-base">{m.name}</h3>
                <p className="text-xs font-semibold text-[var(--color-navy-bright)] mb-2">{m.role}</p>
                {m.bio && <p className="text-xs text-[var(--color-muted)] line-clamp-2 mb-3">{m.bio}</p>}

                {m.skills && m.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {m.skills.slice(0, 3).map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded text-[10px] bg-[var(--color-off-white)] text-[var(--color-navy)] font-medium">
                        {s}
                      </span>
                    ))}
                    {m.skills.length > 3 && (
                      <span className="text-[10px] text-[var(--color-muted)] align-middle">+{m.skills.length - 3}</span>
                    )}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-between text-xs">
                <span className="text-[var(--color-muted)]">Order: {m.order}</span>
                <div className="flex items-center gap-3">
                  <Link
                    href={`/dashboard/team/${m.id}`}
                    className="font-semibold text-[var(--color-navy-bright)] hover:underline"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {!members.length && (
            <div className="col-span-full rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-12 text-center text-sm text-[var(--color-muted)]">
              No team members added yet. Click &quot;Add Team Member&quot; to get started.
            </div>
          )}
        </div>
      </main>
    </>
  );
}
