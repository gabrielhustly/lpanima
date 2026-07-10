"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import { track } from "@/lib/analytics";
import { springs } from "@/lib/motion/springs";

type Pain = { title: string; description: string };
type PainListProps = { pains: Pain[] };

/** Marker custom — ✗ vermelho em SVG inline */
function PainMarker() {
  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6 shrink-0 text-lp-cta"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.25" />
      <path d="M8 8l8 8M16 8l-8 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * PainList — 3 dores específicas, stagger reveal.
 * Estágio Tension (3-10s).
 */
export function PainList({ pains }: PainListProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLUListElement>(null);
  const viewFired = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !viewFired.current) {
          viewFired.current = true;
          track("pain_view", { count: pains.length });
        }
      },
      { threshold: 0.3 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [pains.length]);

  return (
    <section className="bg-lp-bg px-4 py-24 md:py-32">
      <div className="container mx-auto max-w-3xl">
        <div className="mb-12">
          <p className="lp-eyebrow mb-3 text-lp-cta">Isso soa familiar?</p>
          <h2 className="lp-h2 text-lp-text">Você está preso no lugar errado.</h2>
        </div>

        <ul ref={ref} role="list" className="space-y-6 md:space-y-8">
          {pains.map((pain, i) => (
            <motion.li
              key={pain.title}
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: -24, y: 8 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ ...springs.gentle, duration: 0.5, delay: i * 0.12 }}
              className="group flex gap-4 rounded-2xl p-3 -mx-3 transition-colors hover:bg-lp-bg-elev/50"
              onMouseEnter={() => track("pain_hover", { title: pain.title })}
            >
              <motion.span
                initial={reduce ? false : { scale: 0, rotate: -45 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ ...springs.bouncy, duration: 0.5, delay: i * 0.12 + 0.1 }}
                className="shrink-0"
              >
                <PainMarker />
              </motion.span>
              <div>
                <h3 className="font-manrope text-lg font-bold text-lp-text md:text-xl">
                  {pain.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-lp-muted md:text-base">
                  {pain.description}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}