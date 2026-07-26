import { cn } from "@/lib/utils";

export default function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-[var(--radius-full)] text-xs font-semibold bg-[var(--color-off-white)] text-[var(--color-navy)]",
        className
      )}
    >
      {children}
    </span>
  );
}
