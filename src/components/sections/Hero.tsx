"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";

/* ── scroll-reveal hook ── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("revealed")),
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ── tiny inline SVG dashboard illustration ── */
function DashboardIllustration({ style }: { style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 480 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      aria-hidden="true"
      className="w-full h-full"
    >
      {/* card bg */}
      <rect width="480" height="320" rx="16" fill="#0a1e6e" fillOpacity=".85" />

      {/* top bar */}
      <rect x="16" y="16" width="448" height="36" rx="8" fill="#1a2f8a" />
      <circle cx="36" cy="34" r="8" fill="#0035ca" />
      <rect x="52" y="28" width="80" height="12" rx="4" fill="#c9d4ff" fillOpacity=".4" />
      <rect x="360" y="26" width="88" height="16" rx="6" fill="#0035ca" />

      {/* ROAS card */}
      <rect x="16" y="64" width="136" height="80" rx="10" fill="#1a2f8a" />
      <rect x="28" y="76" width="48" height="8" rx="3" fill="#c9d4ff" fillOpacity=".5" />
      <text x="28" y="118" fontFamily="sans-serif" fontSize="26" fontWeight="800" fill="white">3.8x</text>
      <rect x="28" y="128" width="60" height="6" rx="3" fill="#0035ca" fillOpacity=".7" />

      {/* Revenue card */}
      <rect x="164" y="64" width="136" height="80" rx="10" fill="#1a2f8a" />
      <rect x="176" y="76" width="56" height="8" rx="3" fill="#c9d4ff" fillOpacity=".5" />
      <text x="176" y="118" fontFamily="sans-serif" fontSize="22" fontWeight="800" fill="white">$48K</text>
      <rect x="176" y="128" width="72" height="6" rx="3" fill="#0035ca" fillOpacity=".7" />

      {/* CTR card */}
      <rect x="312" y="64" width="152" height="80" rx="10" fill="#0035ca" />
      <rect x="324" y="76" width="44" height="8" rx="3" fill="white" fillOpacity=".4" />
      <text x="324" y="118" fontFamily="sans-serif" fontSize="26" fontWeight="800" fill="white">+64%</text>
      <rect x="324" y="128" width="80" height="6" rx="3" fill="white" fillOpacity=".3" />

      {/* chart area */}
      <rect x="16" y="156" width="296" height="148" rx="10" fill="#1a2f8a" />
      <rect x="28" y="168" width="80" height="8" rx="3" fill="#c9d4ff" fillOpacity=".5" />
      {/* bar chart */}
      {[
        [28, 40], [56, 70], [84, 55], [112, 85], [140, 65],
        [168, 90], [196, 75], [224, 95], [252, 80],
      ].map(([x, h], i) => (
        <rect
          key={i}
          x={x + 16}
          y={284 - h}
          width="18"
          height={h}
          rx="4"
          fill={i === 7 ? "#0035ca" : "#c9d4ff"}
          fillOpacity={i === 7 ? "1" : "0.35"}
        />
      ))}

      {/* meta / google panels */}
      <rect x="324" y="156" width="140" height="68" rx="10" fill="#1a2f8a" />
      <rect x="336" y="168" width="36" height="8" rx="3" fill="#c9d4ff" fillOpacity=".5" />
      <rect x="336" y="182" width="100" height="6" rx="3" fill="#0035ca" fillOpacity=".6" />
      <rect x="336" y="194" width="80" height="6" rx="3" fill="#c9d4ff" fillOpacity=".2" />
      <rect x="336" y="206" width="60" height="6" rx="3" fill="#c9d4ff" fillOpacity=".2" />

      <rect x="324" y="236" width="140" height="68" rx="10" fill="#1a2f8a" />
      <rect x="336" y="248" width="44" height="8" rx="3" fill="#c9d4ff" fillOpacity=".5" />
      <rect x="336" y="262" width="100" height="6" rx="3" fill="#0035ca" fillOpacity=".6" />
      <rect x="336" y="274" width="80" height="6" rx="3" fill="#c9d4ff" fillOpacity=".2" />
      <rect x="336" y="286" width="60" height="6" rx="3" fill="#c9d4ff" fillOpacity=".2" />
    </svg>
  );
}

const MARQUEE = [
  "Performance Marketing", "SEO & Content", "Meta Ads", "Google Ads",
  "Branding", "Web Development", "Analytics", "Automation", "Social Media",
];

const DEFAULT_STATS = [
  { v: "100+", l: "Clients" },
  { v: "15+", l: "Countries" },
  { v: "3.8x", l: "Avg ROAS" },
  { v: "98%", l: "Satisfaction" },
];

export interface HeroData {
  badge?: string | null;
  headline?: string | null;
  subline?: string | null;
  ctaPrimary?: string | null;
  ctaPrimaryHref?: string | null;
  ctaSecondary?: string | null;
  ctaSecondaryHref?: string | null;
  stats?: { v: string; l: string }[] | null;
}

export default function Hero({ data }: { data?: HeroData | null }) {
  const badge = data?.badge || "Digital Growth Agency · Pakistan";
  const subline = data?.subline || "Siachen Mark builds brands, drives qualified traffic, and turns clicks into customers — with full-funnel tracking from day one.";
  const ctaPrimary = data?.ctaPrimary || "Start Your Growth";
  const ctaPrimaryHref = data?.ctaPrimaryHref || "/contact";
  const ctaSecondary = data?.ctaSecondary || "See Our Work";
  const ctaSecondaryHref = data?.ctaSecondaryHref || "/portfolio";
  const stats = data?.stats && data.stats.length ? data.stats : DEFAULT_STATS;
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);
  useReveal();

  function handleMouse(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setOffset({ x, y });
  }

  return (
    <section
      ref={ref}
      onMouseMove={handleMouse}
      className="relative overflow-hidden bg-[var(--color-navy)] px-6 pt-24 pb-28"
    >
      {/* Animated blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[var(--color-navy-bright)] opacity-20 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-[400px] h-[400px] rounded-full bg-[var(--color-navy-dim)] opacity-30 blur-3xl animate-blob" style={{ animationDelay: "3s" }} />

      {/* Spinning ring */}
      <div
        className="pointer-events-none absolute top-16 right-[10%] w-64 h-64 rounded-full border border-[var(--color-on-navy)] opacity-10 animate-spin-slow"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — copy */}
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[var(--radius-full)] border border-white/20 bg-white/10 backdrop-blur-md text-[var(--color-on-navy)] text-xs font-semibold uppercase tracking-widest mb-6 shadow-[0_2px_16px_rgba(0,53,202,0.25)] animate-fade-in">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" style={{ animation: "pulse-ring 2s ease-out infinite" }} />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {badge}
            </span>
            <h1
              className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-white leading-[1.1] tracking-tight animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              {data?.headline ? (
                data.headline
              ) : (
                <>
                  Performance.<br />
                  <span
                    className="text-transparent bg-clip-text"
                    style={{
                      backgroundImage: "linear-gradient(90deg,#c9d4ff,#0035ca)",
                      backgroundSize: "200% 200%",
                      animation: "gradient-shift 4s ease infinite",
                    }}
                  >
                    Growth.
                  </span>{" "}
                  Impact.
                </>
              )}
            </h1>
            <p
              className="mt-6 text-lg text-[var(--color-on-navy)] max-w-lg leading-relaxed animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              {subline}
            </p>
            <div
              className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-up"
              style={{ animationDelay: "0.3s" }}
            >
              <a
                href={ctaPrimaryHref}
                className="group relative inline-flex items-center justify-center px-8 py-3.5 rounded-[var(--radius-full)] bg-white text-[var(--color-navy)] font-semibold text-sm overflow-hidden transition-all hover:shadow-[0_0_32px_rgba(0,53,202,0.5)]"
              >
                <span className="relative z-10">{ctaPrimary}</span>
              </a>
              <a
                href={ctaSecondaryHref}
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-[var(--radius-full)] border border-[var(--color-on-navy)] text-[var(--color-on-navy)] font-semibold text-sm hover:bg-white/10 transition-colors"
              >
                {ctaSecondary}
              </a>
            </div>

            {/* Stat pills */}
            <div
              className="mt-12 flex flex-wrap gap-4 animate-fade-up"
              style={{ animationDelay: "0.4s" }}
            >
              {stats.map((s) => (
                <div
                  key={s.l}
                  className="flex flex-col items-center px-5 py-3 rounded-[var(--radius-lg)] border border-[var(--color-navy-dim)] bg-white/5 backdrop-blur-sm"
                >
                  <span className="text-xl font-extrabold text-white">{s.v}</span>
                  <span className="text-xs text-[var(--color-on-navy)]">{s.l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — dashboard illustration */}
          <div
            className="relative hidden lg:block animate-fade-in"
            style={{
              animationDelay: "0.5s",
              transform: `perspective(900px) rotateY(${offset.x * -6}deg) rotateX(${offset.y * 4}deg)`,
              transition: "transform 0.12s ease-out",
            }}
          >
            {/* Glow */}
            <div className="absolute inset-0 rounded-[var(--radius-xl)] bg-[var(--color-navy-bright)] opacity-20 blur-2xl scale-95" />
            <div className="relative rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-lg)] border border-[var(--color-navy-dim)] animate-float">
              <DashboardIllustration />
            </div>
            {/* Floating ROAS badge */}
            <div className="absolute -top-4 -right-4 bg-white rounded-[var(--radius-lg)] px-4 py-2 shadow-[var(--shadow-md)] animate-float-slow">
              <p className="text-xs text-[var(--color-muted)]">ROAS</p>
              <p className="text-lg font-extrabold text-[var(--color-navy)]">3.8×</p>
            </div>
            {/* Floating revenue badge */}
            <div className="absolute -bottom-4 -left-4 bg-[var(--color-navy-bright)] rounded-[var(--radius-lg)] px-4 py-2 shadow-[var(--shadow-md)] animate-float" style={{ animationDelay: "1.5s" }}>
              <p className="text-xs text-[var(--color-on-navy)]">Revenue</p>
              <p className="text-lg font-extrabold text-white">+64%</p>
            </div>
          </div>
        </div>
      </Container>

      {/* Scrolling marquee */}
      <div className="relative mt-20 overflow-hidden border-t border-[var(--color-navy-dim)] pt-6">
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={i} className="text-sm font-medium text-[var(--color-on-navy)] opacity-60 uppercase tracking-widest">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
