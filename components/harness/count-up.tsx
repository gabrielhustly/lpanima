"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";

type CountUpProps = {
  to: number;
  from?: number;
  duration?: number;
  format?: "integer" | "currency-brl" | "comma";
  label: string;
  sublabel?: string;
  prefix?: string;
  suffix?: string;
};

/**
 * CountUp — número gigante animado de 0 até `to`, rodando UMA vez.
 * Respeita prefers-reduced-motion (pula direto pro valor final).
 */
export function CountUp({
  to,
  from = 0,
  duration = 1.6,
  format = "integer",
  label,
  sublabel,
  prefix = "",
  suffix = "",
}: CountUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(from);

  useEffect(() => {
    if (!inView) return;
    track("countup_trigger", { to, label });
    if (reduce) {
      setDisplay(to);
      return;
    }
    const controls = animate(from, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, to, from, duration, reduce, label]);

  const formatted = (() => {
    if (format === "currency-brl") {
      return display.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    }
    if (format === "comma") {
      return Math.round(display).toLocaleString("en-US");
    }
    return Math.round(display).toLocaleString("pt-BR");
  })();

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <span className="lp-number text-lp-accent">
        {prefix}
        {formatted}
        {suffix}
      </span>
      <p className="lp-eyebrow mt-3 text-lp-muted">{label}</p>
      {sublabel && (
        <p className="mt-1 text-sm text-lp-muted/70">{sublabel}</p>
      )}
    </div>
  );
}