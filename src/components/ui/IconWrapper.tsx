import { cn } from "@/lib/utils";

export default function IconWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-12 h-12 rounded-[var(--radius-md)] bg-[var(--color-off-white)] flex items-center justify-center text-[var(--color-navy)]",
        className
      )}
    >
      {children}
    </div>
  );
}
