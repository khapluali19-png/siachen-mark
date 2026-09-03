import { db } from "@/lib/db";
import Topbar from "@/components/admin/Topbar";
import SettingsForm from "./SettingsForm";

export default async function SettingsPage() {
  const settings = await db.siteSetting.findMany().catch(() => []);
  const map = Object.fromEntries(settings.map((s) => [s.key, s.value]));

  return (
    <>
      <Topbar title="Website Settings" />
      <main className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-[var(--color-navy)]">Website Settings</h1>
          <p className="text-xs text-[var(--color-muted)]">
            Control every part of your website from here — branding, contact details, navigation, social media, SEO, and tracking codes. 
            Changes are saved instantly and reflected across the live website.
          </p>
        </div>
        <SettingsForm settings={map} />
      </main>
    </>
  );
}
