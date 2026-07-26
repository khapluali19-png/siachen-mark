import { cn } from "@/lib/utils";

export default function Avatar({
  src,
  alt,
  size = "md",
  className,
}: {
  src?: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = { sm: "w-8 h-8", md: "w-12 h-12", lg: "w-16 h-16" };

  return (
    <div
      className={cn(
        "rounded-full bg-[var(--color-off-white)] overflow-hidden flex items-center justify-center",
        sizes[size],
        className
      )}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span className="text-[var(--color-navy)] font-bold text-sm">
          {alt.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
}
