"use client";

import { useEffect, useRef } from "react";

export default function MouseSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: -1000, y: -1000 });
  const currentPos = useRef({ x: -1000, y: -1000 });
  const isVisible = useRef(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Only run on devices with a fine pointer (mouse/trackpad) and when reduced-motion is not preferred
    const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!finePointerQuery.matches || reducedMotionQuery.matches) {
      return;
    }

    const el = spotlightRef.current;
    if (!el) return;

    function handleMouseMove(e: MouseEvent) {
      targetPos.current.x = e.clientX;
      targetPos.current.y = e.clientY;

      if (!isVisible.current) {
        isVisible.current = true;
        if (el) el.style.opacity = "1";
      }
    }

    function handleMouseLeave() {
      isVisible.current = false;
      if (el) el.style.opacity = "0";
    }

    function handleMouseEnter(e: MouseEvent) {
      targetPos.current.x = e.clientX;
      targetPos.current.y = e.clientY;
      currentPos.current.x = e.clientX;
      currentPos.current.y = e.clientY;
      isVisible.current = true;
      if (el) el.style.opacity = "1";
    }

    // Smooth lerp animation loop without triggering React re-renders
    function renderLoop() {
      // Ease factor 0.08 for responsive yet luxurious, smooth ambient glide
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.08;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.08;

      if (el && isVisible.current) {
        el.style.transform = `translate3d(${currentPos.current.x.toFixed(1)}px, ${currentPos.current.y.toFixed(1)}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(renderLoop);
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    rafId.current = requestAnimationFrame(renderLoop);

    // Watch for OS reduced-motion setting changes
    function handleMotionChange(e: MediaQueryListEvent) {
      if (e.matches && el) {
        el.style.opacity = "0";
      }
    }

    reducedMotionQuery.addEventListener("change", handleMotionChange);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      reducedMotionQuery.removeEventListener("change", handleMotionChange);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden select-none"
    >
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute top-0 left-0 w-[720px] h-[720px] rounded-full transition-opacity duration-300 opacity-0 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(60, 130, 255, 0.20) 0%, rgba(0, 53, 202, 0.14) 25%, rgba(10, 30, 110, 0.07) 48%, rgba(0, 53, 202, 0.02) 68%, transparent 82%)",
          filter: "blur(50px)",
        }}
      />
    </div>
  );
}
