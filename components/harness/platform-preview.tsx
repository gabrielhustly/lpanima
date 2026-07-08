"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { springs } from "@/lib/motion/springs";

type Screen = {
  videoSrc: string;
  poster?: string;
  alt: string;
  title: string;
  caption: string;
};
type PlatformPreviewProps = { screens: Screen[] };

/** Close icon — SVG inline custom */
function CloseIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * PlatformPreview — tour visual da plataforma em 3 telas.
 * Mobile-first: scroll-snap horizontal com vídeos grandes.
 * Desktop: grid 3-cols com hover lift + glow.
 * Modal ao clicar (role=dialog, ESC, focus trap, scroll lock).
 */
export function PlatformPreview({ screens }: PlatformPreviewProps) {
  const reduce = useReducedMotion();
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const viewFired = useRef<Set<number>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax leve no heading
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const headingY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Track screen_view when each screen enters viewport
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    screens.forEach((screen, i) => {
      const el = document.getElementById(`screen-${i}`);
      if (!el) return;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !viewFired.current.has(i)) {
            viewFired.current.add(i);
            track("screen_view", { title: screen.title });
          }
        },
        { threshold: 0.5 }
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [screens]);

  // Modal: ESC + scroll lock
  useEffect(() => {
    if (modalIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        track("screen_zoom_close", { title: screens[modalIndex].title });
        setModalIndex(null);
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [modalIndex, screens]);

  const openModal = (i: number) => {
    track("screen_zoom", { title: screens[i].title });
    setModalIndex(i);
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-lp-bg px-4 py-20 md:py-32">
      {/* Glow blobs decorativos */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-hustly-purple/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-hustly-lime/15 blur-[120px]"
      />

      <div className="relative z-10 mx-auto max-w-[95rem] px-4 md:px-6">
        {/* Heading com parallax */}
        <motion.div
          style={reduce ? undefined : { y: headingY, opacity: headingOpacity }}
          className="mb-10 text-center md:mb-16"
        >
          <motion.p
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ ...springs.gentle, duration: 0.4 }}
            className="lp-eyebrow mb-3 text-lp-accent"
          >
            O que você vai usar
          </motion.p>
          <motion.h2
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ ...springs.gentle, duration: 0.5, delay: 0.08 }}
            className="lp-h2 text-lp-text"
          >
            Uma ferramenta personalizada para o seu dia a dia e com todo o poder da IA.
          </motion.h2>
        </motion.div>

        {/* Mobile: scroll-snap horizontal com vídeos grandes. Desktop: grid 3-cols */}
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0">
          {screens.map((screen, i) => (
            <motion.div
              key={screen.title}
              id={`screen-${i}`}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ ...springs.gentle, duration: 0.6, delay: i * 0.12 }}
              className="w-[60vw] shrink-0 snap-center sm:w-[45vw] md:w-auto md:shrink"
            >
              <motion.button
                type="button"
                onClick={() => openModal(i)}
                aria-label={`Ver maior: ${screen.title}`}
                className="group block w-full text-left"
                whileHover={reduce ? undefined : { y: -6 }}
                transition={{ ...springs.snappy, duration: 0.3 }}
              >
                {/* Video preview — auto-play, muted, loop */}
                <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[28px] border border-lp-border bg-lp-bg-elev shadow-[0_8px_40px_-8px_rgba(0,0,0,0.4)] transition-all duration-300 group-hover:border-lp-accent/50 group-hover:shadow-[0_12px_50px_-8px_hsl(265_90%_58%/0.35)]">
                  <video
                    className="h-full w-full object-contain"
                    poster={screen.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    aria-label={screen.alt}
                  >
                    <source src={screen.videoSrc} type="video/mp4" />
                  </video>
                  {/* Overlay com ícone de expandir */}
                  <div className="pointer-events-none absolute inset-0 flex items-end justify-end p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-lp-cta/90 text-white shadow-lg backdrop-blur-sm">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </div>
                <p className="mt-3 font-manrope text-base font-bold text-lp-text md:text-lg">{screen.title}</p>
                <p className="text-sm text-lp-muted">{screen.caption}</p>
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Hint de scroll no mobile */}
        <motion.p
          initial={reduce ? { opacity: 0 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-4 text-center text-xs text-lp-muted md:hidden"
        >
          ← Arraste para ver mais →
        </motion.p>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              track("screen_zoom_close", { title: screens[modalIndex].title });
              setModalIndex(null);
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`modal-title-${modalIndex}`}
          >
            <motion.div
              initial={reduce ? { opacity: 0 } : { scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { scale: 0.92, opacity: 0, y: 20 }}
              transition={{ ...springs.bouncy, duration: 0.4 }}
              className="relative w-full max-w-3xl p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => {
                  track("screen_zoom_close", { title: screens[modalIndex].title });
                  setModalIndex(null);
                }}
                aria-label="Fechar"
                className="absolute -top-2 right-0 z-10 grid h-11 w-11 place-items-center rounded-full bg-lp-bg-elev text-lp-text transition-colors hover:bg-lp-cta"
              >
                <CloseIcon />
              </button>
              <h3 id={`modal-title-${modalIndex}`} className="sr-only">
                {screens[modalIndex].title}
              </h3>
              <div className="aspect-[9/16] w-full overflow-hidden rounded-[28px] border border-lp-border bg-lp-bg-elev shadow-[0_20px_60px_-10px_rgba(0,0,0,0.6)]">
                <video
                  className="h-full w-full object-contain"
                  poster={screens[modalIndex].poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  aria-label={screens[modalIndex].alt}
                >
                  <source src={screens[modalIndex].videoSrc} type="video/mp4" />
                </video>
              </div>
              <p className="mt-3 text-center text-lp-muted">{screens[modalIndex].caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}