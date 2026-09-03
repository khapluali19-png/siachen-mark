import { db } from "@/lib/db";
import Topbar from "@/components/admin/Topbar";
import NavigationManager from "./NavigationManager";

export default async function NavigationAdminPage() {
  const items = await db.navigationItem.findMany({
    orderBy: { order: "asc" },
  }).catch(() => []);

  return (
    <>
      <Topbar title="Navigation & Header Menu" />
      <main className="flex-1 p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[var(--color-navy)]">Website Navigation Links</h1>
            <p className="text-xs text-[var(--color-muted)]">Control header links, URLs, and display order across desktop and mobile menus.</p>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-[var(--color-navy-bright)] hover:underline"
          >
            Preview Header ↗
          </a>
        </div>
        <NavigationManager initialItems={items} />
      </main>
    </>
  );
}
