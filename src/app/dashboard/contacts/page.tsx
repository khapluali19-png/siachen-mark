import { db } from "@/lib/db";
import Topbar from "@/components/admin/Topbar";
import ContactsTable, { type Lead } from "@/components/admin/ContactsTable";

export const dynamic = "force-dynamic";

export default async function ContactsPage() {
  const submissions = await db.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  const leads: Lead[] = submissions.map((s) => ({
    id: s.id,
    name: s.name,
    company: s.company,
    email: s.email,
    phone: s.phone,
    industry: s.industry,
    service: s.service,
    budget: s.budget,
    message: s.message,
    sourcePage: s.sourcePage,
    status: s.status,
    notes: s.notes,
    createdAt: s.createdAt.toISOString(),
  }));

  return (
    <>
      <Topbar title="Contact Submissions" />
      <main className="flex-1 p-6">
        <ContactsTable initialLeads={leads} />
      </main>
    </>
  );
}
