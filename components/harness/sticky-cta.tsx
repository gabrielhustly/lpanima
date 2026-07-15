"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { springs } from "@/lib/motion/springs";

/**
 * StickyCTA — CTA persistente que aparece após 50% de scroll.
 * Mobile: barra full-width no bottom. Desktop: pill flutuante bottom-right.
 * Some quando o CTA final entra no viewport.
 */
export function StickyCTA() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const finalVisible = useRef(false);
  const impressionFired = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      const show = scrollYProgress.get() > 0.5 && !finalVisible.current;
      setVisible(show);
      if (show && !impressionFired.current) {
        impressionFired.current = true;
        track("cta_sticky_impression");
      }
    };
    const unsub = scrollYProgress.on("change", onScroll);
    return () => unsub();
  }, [scrollYProgress]);

  // Esconde quando a seção de CTA final está visível
  useEffect(() => {
    const el = document.getElementById("final-cta");
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        finalVisible.current = entry.isIntersecting;
        if (entry.isIntersecting) setVisible(false);
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const handleClick = (variant: "mobile" | "desktop") =>
    track("cta_sticky_click", { variant });

  const transition = reduce
    ? { duration: 0 }
    : { ...springs.snappy, duration: 0.2 };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Mobile: barra full-width */}
          <motion.div
            key="sticky-mobile"
            initial={reduce ? { opacity: 0 } : { y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { y: 100, opacity: 0 }}
            transition={transition}
            className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 md:hidden"
            style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
          >
            <a
              href="https://alunos.hustly.app.br/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Entrar na plataforma"
              onClick={() => handleClick("mobile")}
              className="lp-cta-btn flex min-h-[48px] items-center justify-center px-6 py-3.5 text-sm"
            >
              Entrar agora
            </a>
          </motion.div>

          {/* Desktop: pill flutuante bottom-right */}
          <motion.div
            key="sticky-desktop"
            initial={reduce ? { opacity: 0 } : { scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { scale: 0.9, opacity: 0 }}
            transition={transition}
            className="fixed bottom-6 right-6 z-40 hidden md:block"
          >
            <a
              href="https://alunos.hustly.app.br/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Entrar na plataforma"
              onClick={() => handleClick("desktop")}
              className="lp-cta-btn flex min-h-[48px] items-center gap-2 rounded-[10px] px-7 py-4 text-base"
            >
              Entrar agora
              <span className="text-xs font-normal text-lp-text/70">é grátis começar</span>
            </a>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}