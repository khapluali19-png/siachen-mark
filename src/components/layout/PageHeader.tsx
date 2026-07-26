import { cn } from "@/lib/utils";

export default function PageHeader({
  title,
  subtitle,
  className,
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn("bg-[var(--color-off-white)] py-16 px-6", className)}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-navy)] leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg text-[var(--color-muted)] max-w-2xl">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
