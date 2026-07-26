interface DashboardCardProps {
  title: string;
  value: string | number;
  sub?: string;
  accent?: boolean;
}

export default function DashboardCard({ title, value, sub, accent }: DashboardCardProps) {
  return (
    <div
      className={`rounded-[var(--radius-xl)] border p-6 ${
        accent
          ? "bg-[var(--color-navy)] border-[var(--color-navy-dim)] text-white"
          : "bg-[var(--color-background)] border-[var(--color-border)]"
      }`}
    >
      <p className={`text-xs font-semibold uppercase tracking-widest ${accent ? "text-[var(--color-on-navy)]" : "text-[var(--color-muted)]"}`}>
        {title}
      </p>
      <p className={`mt-2 text-3xl font-extrabold ${accent ? "text-white" : "text-[var(--color-navy)]"}`}>
        {value}
      </p>
      {sub && (
        <p className={`mt-1 text-xs ${accent ? "text-[var(--color-on-navy)]" : "text-[var(--color-muted)]"}`}>
          {sub}
        </p>
      )}
    </div>
  );
}
