"use client";
import { useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";

const stats = [
  { value: 100, suffix: "+", label: "Clients Served", desc: "Across Pakistan and 15+ countries" },
  { value: 15,  suffix: "+", label: "Countries",      desc: "Global client base" },
  { value: 3.8, suffix: "x", label: "Average ROAS",   desc: "Across paid media campaigns" },
  { value: 98,  suffix: "%", label: "Client Satisfaction", desc: "Based on client feedback" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return;
      started.current = true;
      const isDecimal = target % 1 !== 0;
      const duration = 1600;
      const start = performance.now();
      function tick(now: number) {
        const p = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        const cur = isDecimal
          ? parseFloat((ease * target).toFixed(1))
          : Math.round(ease * target);
        setCount(cur);
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Stats() {
  return (
    <section className="bg-[var(--color-navy)] py-20 px-6" aria-label="Agency statistics">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/10">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`text-center px-6 py-6 group reveal reveal-delay-${i + 1}`}
            >
              <p className="text-4xl md:text-5xl font-extrabold text-white tabular-nums tracking-tight font-display">
                <Counter target={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm font-semibold text-white uppercase tracking-widest">
                {s.label}
              </p>
              <p className="mt-1 text-xs text-[var(--color-on-navy)] opacity-60">
                {s.desc}
              </p>
              <div className="mt-4 mx-auto w-6 h-0.5 bg-[var(--color-navy-bright)] rounded-full transition-all duration-300 group-hover:w-12" aria-hidden="true" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
