import Topbar from "@/components/admin/Topbar";
import ServiceForm from "../ServiceForm";
import Link from "next/link";

export default function NewServicePage() {
  return (
    <>
      <Topbar title="Add Service" />
      <main className="flex-1 p-6 max-w-4xl space-y-4">
        <div className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
          <Link href="/dashboard/services" className="hover:underline">Services</Link>
          <span>/</span>
          <span className="font-semibold text-[var(--color-navy)]">New Service</span>
        </div>
        <ServiceForm />
      </main>
    </>
  );
}
