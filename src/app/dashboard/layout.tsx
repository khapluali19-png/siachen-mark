import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import AdminProviders from "@/components/admin/AdminProviders";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  // Only ADMIN users can access /dashboard (CMS)
  if ((session.user as any).role !== "ADMIN") redirect("/user");

  return (
    <AdminProviders>
      <div className="flex min-h-screen bg-[var(--color-off-white)]">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          {children}
        </div>
      </div>
    </AdminProviders>
  );
}
