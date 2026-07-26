import { db } from "@/lib/db";
import Topbar from "@/components/admin/Topbar";
import SettingsForm from "./SettingsForm";

export default async function SettingsPage() {
  const settings = await db.siteSetting.findMany();
  const map = Object.fromEntries(settings.map((s) => [s.key, s.value]));

  return (
    <>
      <Topbar title="Settings" />
      <main className="flex-1 p-6 max-w-2xl">
        <SettingsForm settings={map} />
      </main>
    </>
  );
}
