"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { springs } from "@/lib/motion/springs";

type FinalCTAProps = {
  /** Data real de início da turma (ISO). Se fornecida, mostra countdown. */
  startDate?: string;
};

/**
 * FinalCTA — último empurrão antes do redirect para login.
 * Único CTA no viewport, full-width mobile / max-320px desktop.
 * Cream break para destacar do dark. Urgência honesta (só se startDate real).
 */
export function FinalCTA({ startDate }: FinalCTAProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const viewFired = useRef(false);

  useEffect(() => {
    if (inView && !viewFired.current) {
      viewFired.current = true;
      track("final_cta_view");
    }
  }, [inView]);

  // Countdown (apenas se startDate real)
  const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (!startDate) return;
    const target = new Date(startDate).getTime();
    const update = () => {
      const diff = target - Date.now();
      if (diff <= 0) {
        setTimeLeft(null);
        setExpired(true);
        track("timer_expired");
        return;
      }
      setTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [startDate]);

  const fadeUp = {
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { ...springs.gentle, duration: 0.6 },
  };

  return (
    <section
      id="final-cta"
      ref={ref}
      className="bg-lp-cream px-4 py-24 md:py-32"
    >
      <div className="mx-auto max-w-2xl text-center">
        <motion.p className="lp-eyebrow text-lp-cta" {...fadeUp}>
          Sua IA te espera
        </motion.p>

        <motion.h2
          className="lp-h2 mt-3 text-lp-text-dark"
          style={{ fontSize: "clamp(2rem, 1.5rem + 3vw, 3.5rem)" }}
          {...fadeUp}
          transition={{ ...springs.gentle, duration: 0.5, delay: 0.05 }}
        >
          Pare de explicar quem você é pra uma IA que esquece.
        </motion.h2>

        <motion.p
          className="mx-auto mt-5 max-w-md text-lg text-lp-muted-dark"
          {...fadeUp}
          transition={{ ...springs.gentle, duration: 0.5, delay: 0.1 }}
        >
          A Hustly já sabe seu curso, sua fase e seu jeito de aprender. E é grátis, benefício oficial Ânima.
        </motion.p>

        {/* Countdown (apenas se real) */}
        {timeLeft && !expired && (
          <motion.div
            className="mt-8 flex justify-center gap-3"
            {...fadeUp}
            transition={{ ...springs.gentle, duration: 0.5, delay: 0.15 }}
          >
            {([
              { v: timeLeft.d, l: "dias" },
              { v: timeLeft.h, l: "horas" },
              { v: timeLeft.m, l: "min" },
              { v: timeLeft.s, l: "seg" },
            ]).map((unit) => (
              <div
                key={unit.l}
                className="rounded-[10px] bg-lp-bg px-4 py-3 text-center"
              >
                <p className="font-manrope text-2xl font-extrabold tabular-nums text-lp-text">
                  {String(unit.v).padStart(2, "0")}
                </p>
                <p className="text-xs text-lp-muted">{unit.l}</p>
              </div>
            ))}
          </motion.div>
        )}

        <motion.div
          className="mt-8 flex flex-col items-center gap-3"
          {...fadeUp}
          transition={{ ...springs.gentle, duration: 0.5, delay: 0.2 }}
        >
          <motion.a
            href="https://www.hustly.me"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Entrar agora na plataforma HUSTLY"
            onClick={() => track("cta_final_click")}
            className="lp-cta-btn animate-pulse-glow group flex min-h-[56px] w-full max-w-[320px] items-center justify-center gap-2 px-10 py-4 text-base"
            initial={reduce ? false : { scale: 0.9, opacity: 0 }}
            whileInView={reduce ? undefined : { scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ ...springs.bouncy, duration: 0.5, delay: 0.3 }}
            whileHover={reduce ? undefined : { scale: 1.04 }}
            whileTap={reduce ? undefined : { scale: 0.98 }}
          >
            Entrar agora
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden
            >
              <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>
          <p className="text-xs text-lp-muted-dark">
            Grátis pra alunos Ânima · Sem assinatura · Login Universidade
          </p>
        </motion.div>
      </div>
    </section>
  );
}