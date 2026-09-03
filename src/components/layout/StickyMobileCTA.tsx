"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { trackWhatsAppClick, trackStrategyCallClick } from "@/lib/tracking";

interface StickyMobileCTAProps {
  whatsappNumber?: string;
}

export default function StickyMobileCTA({ whatsappNumber }: StickyMobileCTAProps) {
  const [visible, setVisible] = useState(false);
  const waHref = `https://wa.me/${(whatsappNumber || "923488868517").replace(/[^0-9]/g, "")}`;

  useEffect(() => {
    function onScroll() {
      // Show after user scrolls 300px — they've seen the hero CTA already
      setVisible(window.scrollY > 300);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-label="Quick contact options"
    >
      <div className="bg-white border-t border-[var(--color-border)] shadow-[0_-4px_16px_rgba(10,30,110,0.12)] px-4 py-3 flex gap-3">
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick("sticky_mobile_bar")}
          aria-label="Chat on WhatsApp"
          className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-[var(--radius-md)] bg-[#25D366] text-white font-semibold text-sm active:opacity-90 transition-opacity"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.845L.057 23.5l5.797-1.522A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.51-5.17-1.4l-.37-.22-3.44.9.92-3.35-.24-.38A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
          </svg>
          WhatsApp
        </a>
        <Link
          href="/contact"
          onClick={() => trackStrategyCallClick("sticky_mobile_bar")}
          className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-[var(--radius-md)] bg-[var(--color-navy)] text-white font-semibold text-sm active:opacity-90 transition-opacity"
        >
          Book a Call
        </Link>
      </div>
    </div>
  );
}
