import { cn } from "@/lib/utils";

export default function SectionHeading({
  label,
  title,
  subtitle,
  center = false,
  className,
}: {
  label?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(center && "text-center", className)}>
      {label && (
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-navy)] mb-3">
          {label}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-navy)] leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-[var(--color-muted)] text-lg max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
