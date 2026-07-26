import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
};

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-[var(--radius-full)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary: "bg-[var(--color-navy)] text-white hover:bg-[var(--color-navy-bright)]",
    outline: "border border-[var(--color-navy)] text-[var(--color-navy)] hover:bg-[var(--color-off-white)]",
    ghost: "text-[var(--color-navy)] hover:bg-[var(--color-off-white)]",
  };

  const sizes = {
    sm: "text-sm px-4 py-1.5",
    md: "text-sm px-6 py-2.5",
    lg: "text-base px-8 py-3",
  };

  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}
