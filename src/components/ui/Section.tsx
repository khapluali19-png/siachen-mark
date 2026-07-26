import { cn } from "@/lib/utils";

export default function Section({
  children,
  className,
  inverse = false,
}: {
  children: React.ReactNode;
  className?: string;
  inverse?: boolean;
}) {
  return (
    <section
      className={cn(
        "py-20 px-6",
        inverse
          ? "bg-[var(--color-navy)]"
          : "bg-[var(--color-background)]",
        className
      )}
    >
      {children}
    </section>
  );
}
