import { cn } from "@/lib/utils";

export default function SectionHeading({
  label,
  title,
  subtitle,
  center = false,
  className,
  id,
}: {
  label?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
  id?: string;
}) {
  return (
    <div className={cn(center && "text-center", className)}>
      {label && (
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-navy-bright)] mb-3">
          {label}
        </p>
      )}
      <h2
        id={id}
        className="text-3xl md:text-4xl font-extrabold text-[var(--color-navy)] leading-tight tracking-tight"
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-[var(--color-muted)] text-lg leading-relaxed max-w-2xl",
            center && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
