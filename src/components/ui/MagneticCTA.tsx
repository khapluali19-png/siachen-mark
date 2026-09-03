"use client";

import { useEffect, useRef } from "react";

interface MagneticCTAProps {
  children: React.ReactNode;
  className?: string;
  maxMovement?: number; // Maximum movement in pixels (default 3px)
}

export default function MagneticCTA({
  children,
  className = "",
  maxMovement = 3,
}: MagneticCTAProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const isHovered = useRef(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isFinePointer || isReducedMotion) {
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    function renderLoop() {
      // Smooth interpolation (lerp)
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.12;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.12;

      if (el) {
        el.style.transform = `translate3d(${currentPos.current.x.toFixed(2)}px, ${currentPos.current.y.toFixed(2)}px, 0)`;
      }

      // Keep running if hovered or still returning to (0,0)
      const dist = Math.hypot(currentPos.current.x, currentPos.current.y);
      if (isHovered.current || dist > 0.05) {
        rafId.current = requestAnimationFrame(renderLoop);
      } else {
        if (el) el.style.transform = "translate3d(0, 0, 0)";
        rafId.current = null;
      }
    }

    function handleMouseMove(e: MouseEvent) {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate pull distance proportional to cursor offset from center
      const rawX = (e.clientX - centerX) * 0.15;
      const rawY = (e.clientY - centerY) * 0.15;

      // Clamp to maximum movement (subtle 2-3px)
      targetPos.current.x = Math.max(-maxMovement, Math.min(maxMovement, rawX));
      targetPos.current.y = Math.max(-maxMovement, Math.min(maxMovement, rawY));

      if (!rafId.current) {
        rafId.current = requestAnimationFrame(renderLoop);
      }
    }

    function handleMouseEnter() {
      isHovered.current = true;
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(renderLoop);
      }
    }

    function handleMouseLeave() {
      isHovered.current = false;
      targetPos.current.x = 0;
      targetPos.current.y = 0;
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(renderLoop);
      }
    }

    el.addEventListener("mousemove", handleMouseMove, { passive: true });
    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [maxMovement]);

  return (
    <div
      ref={containerRef}
      className={`inline-flex will-change-transform ${className}`}
      style={{ transform: "translate3d(0, 0, 0)" }}
    >
      {children}
    </div>
  );
}
