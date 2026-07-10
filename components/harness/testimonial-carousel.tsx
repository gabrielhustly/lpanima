"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useState, type KeyboardEvent } from "react";
import { track } from "@/lib/analytics";
import { springs } from "@/lib/motion/springs";

type Testimonial = {
  avatar: string;
  name: string;
  role: string;
  quote: string;
  result?: string;
};
type TestimonialCarouselProps = {
  testimonials: Testimonial[];
  autoplay?: boolean;
};

/** Arrow icons — SVG inline custom */
function ArrowLeft() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ArrowRight() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * TestimonialCarousel — carrossel de depoimentos com fotos reais.
 * Swipe manual (botões + dots + drag). Autoplay DEFAULT false.
 * AnimatePresence mode="wait". Keyboard: setas esq/dir.
 */
export function TestimonialCarousel({
  testimonials,
  autoplay = false,
}: TestimonialCarouselProps) {
  const reduce = useReducedMotion();
  const [[index, direction], setState] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);

  const paginate = useCallback(
    (dir: number) => {
      setState(([current]) => {
        const next = (current + dir + testimonials.length) % testimonials.length;
        track("testimonial_swipe", { from: current, to: next });
        if (next === testimonials.length - 1) track("testimonial_complete");
        return [next, dir];
      });
    },
    [testimonials.length]
  );

  const goTo = (i: number) => {
    setState(([current]) => {
      track("testimonial_swipe", { from: current, to: i });
      if (i === testimonials.length - 1) track("testimonial_complete");
      return [i, i > current ? 1 : -1];
    });
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") paginate(-1);
    if (e.key === "ArrowRight") paginate(1);
  };

  // Autoplay (default false)
  if (autoplay && !paused && !reduce) {
    setTimeout(() => paginate(1), 6000);
  }

  const t = testimonials[index];
  const variants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: reduce ? 0 : dir > 0 ? 40 : -40,
    }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({
      opacity: 0,
      x: reduce ? 0 : dir > 0 ? -40 : 40,
    }),
  };

  return (
    <section className="bg-lp-cream px-4 py-24 md:py-32">
      <div className="container mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <p className="lp-eyebrow mb-3 text-lp-cta">Quem já entrou</p>
          <h2 className="lp-h2 text-lp-text-dark">Alunos que já estão na frente.</h2>
        </div>

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Depoimentos de alunos"
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onKeyDown={onKeyDown}
          tabIndex={0}
        >
          <div className="min-h-[280px] rounded-[20px] border border-black/5 bg-white p-8 shadow-sm md:p-10">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ ...springs.gentle, duration: 0.3 }}
                aria-live="polite"
              >
                {t.result && (
                  <span className="mb-4 inline-block rounded-full bg-lp-accent/15 px-3 py-1 text-sm font-bold text-lp-accent">
                    {t.result}
                  </span>
                )}
                <blockquote className="lp-quote text-lg leading-relaxed text-lp-text-dark md:text-xl">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <footer className="mt-6 flex items-center gap-3">
                  {/* Avatar placeholder — substituir por URL real */}
                  <span
                    aria-hidden
                    className="grid h-12 w-12 place-items-center overflow-hidden rounded-full bg-lp-cta/10 text-sm font-extrabold text-lp-cta"
                  >
                    {t.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </span>
                  <span>
                    <span className="block font-manrope font-bold text-lp-text-dark">{t.name}</span>
                    <span className="block text-sm text-lp-text-dark/60">{t.role}</span>
                  </span>
                </footer>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label="Depoimento anterior"
              className="grid h-11 w-11 min-h-[44px] min-w-[44px] place-items-center rounded-full border border-black/10 bg-white text-lp-text-dark transition-colors hover:bg-lp-cta hover:text-white"
            >
              <ArrowLeft />
            </button>

            <div className="flex items-center gap-2" role="tablist" aria-label="Selecionar depoimento">
              {testimonials.map((item, i) => (
                <button
                  key={item.name}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Ir para depoimento ${i + 1} de ${testimonials.length}`}
                  onClick={() => goTo(i)}
                  className={`h-2.5 rounded-full transition-all ${
                    i === index ? "w-6 bg-lp-cta" : "w-2.5 bg-black/20"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label="Próximo depoimento"
              className="grid h-11 w-11 min-h-[44px] min-w-[44px] place-items-center rounded-full border border-black/10 bg-white text-lp-text-dark transition-colors hover:bg-lp-cta hover:text-white"
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}