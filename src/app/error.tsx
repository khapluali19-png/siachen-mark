"use client";

import { useEffect } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";

export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected runtime error safely without leaking to UI
    console.error("[Application Error]:", error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--color-off-white)] py-20 px-6">
      <Container className="max-w-xl text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center text-red-600">
          <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-navy)] font-display mb-3">
          Something went wrong
        </h1>

        <p className="text-sm text-[var(--color-muted)] mb-8 leading-relaxed">
          An unexpected issue occurred while rendering this page. You can try refreshing or returning to our homepage.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="px-6 py-3 rounded-[var(--radius-full)] bg-[var(--color-navy)] text-white font-semibold text-sm hover:bg-[var(--color-navy-bright)] transition-colors shadow-sm"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 rounded-[var(--radius-full)] border border-[var(--color-border)] bg-white text-[var(--color-navy)] font-semibold text-sm hover:bg-[var(--color-off-white)] transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </Container>
    </main>
  );
}
