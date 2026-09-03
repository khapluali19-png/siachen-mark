import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function UserExtensionPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const plan = (session.user as any).plan || "FREE";
  const isUnlimited = plan === "UNLIMITED";

  const apiBase = process.env.NEXTAUTH_URL || "http://localhost:3000";

  return (
    <>
      <header className="sticky top-0 z-10 flex items-center px-6 py-4 bg-[var(--color-background)] border-b border-[var(--color-border)]">
        <h1 className="font-bold text-[var(--color-navy)] text-lg">Chrome Extension</h1>
      </header>

      <main className="flex-1 p-6 space-y-5">
        {/* Status card */}
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-background)] p-6">
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-[var(--radius-lg)] bg-[var(--color-navy)] flex items-center justify-center text-white text-2xl shrink-0">🔌</div>
            <div className="flex-1">
              <p className="text-lg font-bold text-[var(--color-navy)]">Siachen Mark GBP Auditor</p>
              <p className="text-sm text-[var(--color-muted)] mt-1">Google Business Profile audit tool for Chrome</p>
              <div className="flex items-center gap-3 mt-3">
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${isUnlimited ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"}`}>
                  Your plan: {isUnlimited ? "✨ Unlimited" : "🆓 Free (10 scans)"}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-5 border-t border-[var(--color-border)]">
            {/* Chrome Web Store button - placeholder until published */}
            <div className="inline-flex items-center gap-3 px-4 py-3 rounded-[var(--radius-lg)] border-2 border-dashed border-[var(--color-border)] bg-[var(--color-off-white)]">
              <span className="text-2xl">🏪</span>
              <div>
                <p className="text-sm font-semibold text-[var(--color-navy)]">Chrome Web Store</p>
                <p className="text-xs text-[var(--color-muted)]">Extension not yet published. Install manually (developer mode).</p>
              </div>
            </div>
          </div>
        </div>

        {/* Manual install instructions */}
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-background)] p-6">
          <p className="font-semibold text-[var(--color-navy)] mb-4">📦 Manual Installation (Developer Mode)</p>
          <ol className="space-y-3 text-sm text-[var(--color-muted)]">
            {[
              "Download the extension folder from your project: F:\\Siachen mark office\\extension",
              'Open Chrome and go to chrome://extensions',
              'Enable "Developer mode" toggle (top right)',
              'Click "Load unpacked" and select the extension folder',
              "The Siachen Mark icon will appear in your Chrome toolbar",
              "Click the icon → Enter your email and password to log in",
              "Navigate to Google Maps and click Audit on any business",
            ].map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="w-5 h-5 rounded-full bg-[var(--color-navy)] text-white text-xs flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* API info for extension */}
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-background)] p-6">
          <p className="font-semibold text-[var(--color-navy)] mb-4">🔗 Extension API Endpoint</p>
          <p className="text-xs text-[var(--color-muted)] mb-2">The extension communicates with:</p>
          <code className="block bg-[var(--color-off-white)] px-4 py-2 rounded-[var(--radius-md)] text-sm text-[var(--color-navy)] font-mono break-all">
            {apiBase}/api/extension/
          </code>
          <p className="text-xs text-[var(--color-muted)] mt-2">Your account credentials are used to authenticate. No passwords are stored in the extension.</p>
        </div>

        {/* Plan limits */}
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-background)] p-6">
          <p className="font-semibold text-[var(--color-navy)] mb-4">📊 Your Extension Permissions</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 rounded-[var(--radius-lg)] bg-[var(--color-off-white)]">
              <p className="text-xs text-[var(--color-muted)] mb-1">GBP Audits</p>
              <p className="font-bold text-[var(--color-navy)]">{isUnlimited ? "Unlimited" : "10 total"}</p>
            </div>
            <div className="p-3 rounded-[var(--radius-lg)] bg-[var(--color-off-white)]">
              <p className="text-xs text-[var(--color-muted)] mb-1">Report Download</p>
              <p className="font-bold text-[var(--color-navy)]">{isUnlimited ? "✅ Yes" : "✅ Yes"}</p>
            </div>
            <div className="p-3 rounded-[var(--radius-lg)] bg-[var(--color-off-white)]">
              <p className="text-xs text-[var(--color-muted)] mb-1">Competitor Analysis</p>
              <p className="font-bold text-[var(--color-navy)]">{isUnlimited ? "✅ Yes" : "❌ Unlimited only"}</p>
            </div>
            <div className="p-3 rounded-[var(--radius-lg)] bg-[var(--color-off-white)]">
              <p className="text-xs text-[var(--color-muted)] mb-1">Dashboard Sync</p>
              <p className="font-bold text-[var(--color-navy)]">✅ Yes</p>
            </div>
          </div>
          {!isUnlimited && (
            <p className="mt-4 text-xs text-blue-600 bg-blue-50 px-3 py-2 rounded-[var(--radius-md)]">
              💡 Contact your admin to upgrade to Unlimited for more scans and features.
            </p>
          )}
        </div>
      </main>
    </>
  );
}
