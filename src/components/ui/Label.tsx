import { cn } from "@/lib/utils";

export default function Label({
  children,
  htmlFor,
  className,
}: {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("block text-sm font-medium text-[var(--color-foreground)] mb-1", className)}
    >
      {children}
    </label>
  );
}
