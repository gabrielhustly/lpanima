"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";

/**
 * ScrollProgress — barra fixa no topo, scaleX 0→1 com useScroll.
 * Dispara scroll_25/50/75/100 nos thresholds.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const [pct, setPct] = useState(0);
  const fired = new Set<number>();

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const p = Math.min(100, (window.scrollY / scrollable) * 100);
      setPct(Math.round(p));
      for (const t of [25, 50, 75, 100]) {
        if (p >= t && !fired.has(t)) {
          fired.add(t);
          track(`scroll_${t}`, { depth: t });
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      role="progressbar"
      aria-label="Progresso de leitura da página"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-lp-accent"
      style={{ scaleX: reduce ? scrollYProgress : scaleX }}
    />
  );
}