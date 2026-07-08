"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type KeyboardEvent } from "react";
import { track } from "@/lib/analytics";
import { springs } from "@/lib/motion/springs";

type FAQItem = { question: string; answer: string };
type FAQProps = { items: FAQItem[]; defaultOpen?: number };

/** Plus/Minus toggle icon — SVG inline custom */
function ToggleIcon({ open }: { open: boolean }) {
  return (
    <motion.svg
      className="h-5 w-5 text-lp-muted"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ ...springs.snappy, duration: 0.2 }}
    >
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </motion.svg>
  );
}

/**
 * FAQ — acordeão de perguntas frequentes.
 * Apenas 1 item aberto por vez. ESC fecha o item aberto.
 * Anima height (exceção permitida pela spec — accordion).
 */
export function FAQ({ items, defaultOpen }: FAQProps) {
  const reduce = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen ?? null);

  const toggle = (i: number) => {
    const isOpen = openIndex === i;
    if (isOpen) {
      track("faq_close", { question: items[i].question });
      setOpenIndex(null);
    } else {
      track("faq_open", { question: items[i].question });
      setOpenIndex(i);
    }
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && openIndex !== null) {
      track("faq_close", { question: items[openIndex].question });
      setOpenIndex(null);
    }
  };

  return (
    <section className="bg-lp-bg px-4 py-24 md:py-32" onKeyDown={onKeyDown}>
      <div className="container mx-auto max-w-2xl">
        <div className="mb-12">
          <p className="lp-eyebrow mb-3 text-lp-accent">Perguntas que alunos fazem</p>
          <h2 className="lp-h2 text-lp-text">Antes de você clicar em Entrar</h2>
        </div>

        <div className="space-y-3">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;
            return (
              <div
                key={item.question}
                className="overflow-hidden rounded-[10px] border border-lp-border bg-lp-bg-elev"
              >
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5"
                >
                  <span className="font-manrope text-base font-semibold text-lp-text md:text-lg">
                    {item.question}
                  </span>
                  <ToggleIcon open={isOpen} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      animate={
                        reduce
                          ? { opacity: 1 }
                          : { height: "auto", opacity: 1 }
                      }
                      exit={
                        reduce
                          ? { opacity: 0 }
                          : { height: 0, opacity: 0 }
                      }
                      transition={
                        reduce
                          ? { duration: 0 }
                          : { ...springs.gentle, duration: 0.3 }
                      }
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-lp-muted md:px-6 md:pb-6 md:text-base">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}