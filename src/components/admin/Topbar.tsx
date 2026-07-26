"use client";
import { signOut, useSession } from "next-auth/react";

export default function Topbar({ title }: { title: string }) {
  const { data: session } = useSession();
  return (
    <header className="h-14 border-b border-[var(--color-border)] bg-[var(--color-background)] flex items-center justify-between px-6 shrink-0">
      <p className="font-semibold text-[var(--color-navy)]">{title}</p>
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--color-muted)]">{session?.user?.email}</span>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="text-xs font-medium text-[var(--color-muted)] hover:text-[var(--color-navy)] transition-colors"
        >
          Sign out
        </button>
      </div>
    </header>
  );
}
