import { cn } from "@/lib/utils";

export default function StatCard({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("text-center", className)}>
      <p className="text-4xl font-extrabold text-white">{value}</p>
      <p className="mt-1 text-sm text-[var(--color-on-navy)]">{label}</p>
    </div>
  );
}
