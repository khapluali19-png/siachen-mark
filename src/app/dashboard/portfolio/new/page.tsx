import Topbar from "@/components/admin/Topbar";
import PortfolioForm from "../PortfolioForm";

export default function NewPortfolioPage() {
  return (
    <>
      <Topbar title="Add Portfolio Project" />
      <main className="flex-1 p-6">
        <div className="mb-6">
          <a href="/dashboard/portfolio" className="text-xs font-semibold text-[var(--color-navy-bright)] hover:underline">
            ← Back to Portfolio List
          </a>
        </div>
        <PortfolioForm />
      </main>
    </>
  );
}
