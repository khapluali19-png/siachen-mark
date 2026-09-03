import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

const nav = [
  { label: "🏠 Overview",  href: "/user" },
  { label: "📊 Reports",   href: "/user/reports" },
  { label: "🔌 Extension", href: "/user/extension" },
  { label: "👤 Profile",   href: "/user/profile" },
];

export default async function UserLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  // Admins go to /dashboard, regular users stay here
  if ((session.user as any).role === "ADMIN") redirect("/dashboard");

  return (
    <div className="flex min-h-screen bg-[var(--color-off-white)]">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0 bg-[var(--color-navy)] min-h-screen">
        <div className="px-6 py-5 border-b border-white/10">
          <p className="font-extrabold text-white text-lg">Siachen Mark</p>
          <p className="text-xs text-[var(--color-on-navy)] mt-0.5">GBP Audit Tool</p>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-0.5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center px-3 py-2 rounded-[var(--radius-md)] text-sm font-medium transition-colors text-[var(--color-on-navy)] hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="px-4 py-4 border-t border-white/10">
          <p className="text-xs text-[var(--color-on-navy)] truncate">{session.user.email}</p>
          <form action="/api/auth/signout" method="POST">
            <button type="submit" className="mt-2 text-xs text-red-300 hover:text-red-100 transition-colors">
              Sign out →
            </button>
          </form>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {children}
      </div>
    </div>
  );
}
