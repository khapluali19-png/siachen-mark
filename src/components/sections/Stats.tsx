"use client";
import { useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";

const stats = [
  { value: 100, suffix: "+", label: "Clients Served" },
  { value: 15,  suffix: "+", label: "Countries" },
  { value: 3.8, suffix: "x", label: "Average ROAS" },
  { value: 98,  suffix: "%", label: "Client Satisfaction" },
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
      const duration = 1400;
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

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="bg-[var(--color-navy)] py-16 px-6">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center group">
              <p className="text-4xl md:text-5xl font-extrabold text-white tabular-nums">
                <Counter target={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm font-medium text-[var(--color-on-navy)] uppercase tracking-widest">
                {s.label}
              </p>
              <div className="mt-3 mx-auto w-8 h-0.5 bg-[var(--color-navy-bright)] rounded-full transition-all group-hover:w-16" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
