import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Topbar from "@/components/admin/Topbar";
import ServiceForm from "../ServiceForm";
import Link from "next/link";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = await db.service.findUnique({ where: { id } });
  if (!service) notFound();

  return (
    <>
      <Topbar title={`Edit ${service.title}`} />
      <main className="flex-1 p-6 max-w-4xl space-y-4">
        <div className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
          <Link href="/dashboard/services" className="hover:underline">Services</Link>
          <span>/</span>
          <span className="font-semibold text-[var(--color-navy)]">{service.title}</span>
        </div>
        <ServiceForm service={service} />
      </main>
    </>
  );
}
