import { cn } from "@/lib/utils";

export default function ServiceCard({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-[var(--color-background)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-8 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow",
        className
      )}
    >
      <h3 className="font-bold text-[var(--color-navy)] text-lg">{title}</h3>
      <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed">{description}</p>
    </div>
  );
}
