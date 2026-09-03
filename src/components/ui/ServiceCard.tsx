import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ServiceCard({
  icon,
  title,
  outcome,
  description,
  href = "/services",
  className,
}: {
  icon: React.ReactNode;
  title: string;
  outcome: string;
  description: string;
  href?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "premium-card group relative bg-white border border-[var(--color-border)] rounded-[var(--radius-lg)] p-7 shadow-[var(--shadow-sm)] flex flex-col justify-between",
        "border-l-[3px] border-l-transparent hover:border-l-[var(--color-navy-bright)]",
        className
      )}
    >
      <div>
        {/* Icon */}
        <div className="w-11 h-11 rounded-[var(--radius-md)] bg-[var(--color-off-white)] flex items-center justify-center mb-5 text-[var(--color-navy-bright)] group-hover:bg-[var(--color-navy)] group-hover:text-white transition-colors duration-200">
          {icon}
        </div>

        {/* Title */}
        <h3 className="font-bold text-[var(--color-navy)] text-base mb-2 group-hover:text-[var(--color-navy-bright)] transition-colors duration-200">{title}</h3>

        {/* Outcome pill */}
        <p className="text-xs font-semibold text-[var(--color-navy-bright)] uppercase tracking-wide mb-3">
          {outcome}
        </p>

        {/* Description */}
        <p className="text-sm text-[var(--color-muted)] leading-relaxed">{description}</p>
      </div>

      {/* CTA */}
      <div className="mt-5 pt-3 border-t border-transparent group-hover:border-[var(--color-border)]/50 transition-colors">
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-navy)] group-hover:text-[var(--color-navy-bright)] transition-colors"
          tabIndex={0}
        >
          Learn More
          <svg
            viewBox="0 0 16 16"
            className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
