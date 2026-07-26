import { db } from "@/lib/db";
import Topbar from "@/components/admin/Topbar";
import HeroEditForm from "./HeroEditForm";

export const dynamic = "force-dynamic";

export default async function HeroAdminPage() {
  const hero = await db.heroContent.findFirst();
  return (
    <>
      <Topbar title="Hero" />
      <main className="flex-1 p-6 max-w-2xl">
        <HeroEditForm hero={hero} />
      </main>
    </>
  );
}
