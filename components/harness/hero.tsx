"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { track } from "@/lib/analytics";
import { springs } from "@/lib/motion/springs";
import { PixelIcon } from "@/components/hustly/pixel-icon";

/**
 * Hero — primeira seção. Design visual da V1: roxo+lima, glow blobs, glass,
 * phone mockup com float animation, PixelIcon. Estágio Hook.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // Parallax suave no glow blob
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const blobY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const blobOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  useEffect(() => {
    track("hero_view");
  }, []);

  const fadeUp = {
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { ...springs.gentle, duration: 0.6 },
  };

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-hero px-4 pt-10 pb-16 md:pt-20 md:pb-28"
    >
      {/* glow blobs — V1 signature com parallax */}
      <motion.div
        aria-hidden
        style={reduce ? undefined : { y: blobY, opacity: blobOpacity }}
        className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-hustly-purple/30 blur-[120px]"
      />
      <motion.div
        aria-hidden
        style={reduce ? undefined : { y: blobY, opacity: blobOpacity }}
        className="pointer-events-none absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-hustly-lime/30 blur-[120px]"
      />

      <div className="container relative z-10 mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
        {/* Copy */}
        <div className="flex flex-col items-start gap-5">
          <motion.span
            className="lp-eyebrow inline-flex items-center gap-2 text-hustly-purple"
            {...fadeUp}
            transition={{ ...springs.gentle, duration: 0.5 }}
          >
            <PixelIcon name="gift" size={20} className="text-hustly-purple" accentClassName="fill-hustly-lime" />
            Benefício oficial{" "}
            <Image
              src="/brand/anima-logo.png"
              alt="Ânima"
              width={160}
              height={48}
              className="inline-block h-9 w-auto align-middle md:h-10"
            />
          </motion.span>

          <motion.h1
            className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-hustly-purple-ink sm:text-5xl md:text-6xl lg:text-7xl"
            {...fadeUp}
            transition={{ ...springs.gentle, duration: 0.5, delay: 0.05 }}
          >
            Uma IA que <span className="text-gradient-purple">sabe quem você é</span>. Não só o que você pergunta.
          </motion.h1>

          <motion.p
            className="max-w-xl text-base text-foreground/70 sm:text-lg"
            {...fadeUp}
            transition={{ ...springs.gentle, duration: 0.5, delay: 0.1 }}
          >
            O ChatGPT, Claude, Gemini ou Perplexity não sabem seu curso, sua fase ou o que você já dominou. A Hustly sim, e é grátis pra você, aluno Ânima.
          </motion.p>

          <motion.div
            className="mt-2 flex flex-wrap items-center gap-3"
            {...fadeUp}
            transition={{ ...springs.gentle, duration: 0.5, delay: 0.18 }}
          >
            <a
              href="https://alunos.hustly.app.br/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Entrar agora na plataforma HUSTLY"
              onClick={() => track("cta_hero_click")}
              className="lp-cta-btn group flex min-h-[48px] items-center gap-2 px-6 py-3 text-base font-semibold"
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
            </a>
            <a
              href="#proof"
              onClick={() => track("hero_secondary_click")}
              className="flex min-h-[48px] items-center rounded-full border border-hustly-purple-ink/15 bg-white/70 px-6 py-3 text-base font-semibold text-hustly-purple-ink backdrop-blur transition-colors hover:bg-white"
            >
              Ver resultados
            </a>
          </motion.div>

          {/* Trust chips — V1 style */}
          <motion.div
            className="mt-2 flex flex-wrap gap-2 text-xs font-medium text-foreground/60"
            {...fadeUp}
            transition={{ ...springs.gentle, duration: 0.5, delay: 0.22 }}
          >
            <span className="rounded-full bg-white/70 px-3 py-1 backdrop-blur">100% gratuito</span>
            <span className="rounded-full bg-white/70 px-3 py-1 backdrop-blur">Sabe seu curso e fase</span>
            <span className="rounded-full bg-white/70 px-3 py-1 backdrop-blur">Login Universidade</span>
          </motion.div>
        </div>

        {/* Phone mockup — V1 style com float animation + parallax */}
        <motion.div
          className="relative mx-auto w-full max-w-[340px]"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...springs.bouncy, duration: 0.7, delay: 0.25 }}
          style={reduce ? undefined : { y: phoneY }}
        >
          <div
            aria-hidden
            className="absolute -inset-6 rounded-[3rem] bg-gradient-purple opacity-30 blur-2xl"
          />
          <div className={`relative ${reduce ? "" : "animate-float-slow"} rounded-[2.4rem] border border-white/40 bg-gradient-dark p-3 shadow-card`}>
            <div className="overflow-hidden rounded-[2rem] bg-hustly-purple-ink p-5 text-white">
              <div className="mb-4 flex items-center justify-between text-xs opacity-80">
                <span>Olá, Ana 👋</span>
                <span className="font-mono">9:41</span>
              </div>
              <h3 className="text-lg font-semibold">Meu Dia</h3>
              <p className="mb-4 text-xs opacity-70">3 estudos rápidos • 12 min</p>
              <div className="space-y-2">
                {[
                  { t: "Direito Constitucional", s: "Resumo + Quiz", c: "bg-hustly-lime/90 text-hustly-purple-ink" },
                  { t: "Cálculo II", s: "Flashcards", c: "bg-white/10" },
                  { t: "Desafio do dia", s: "+50 XP", c: "bg-white/10" },
                ].map((i) => (
                  <div key={i.t} className={`flex items-center justify-between rounded-2xl ${i.c} px-3 py-2.5`}>
                    <div>
                      <p className="text-sm font-semibold">{i.t}</p>
                      <p className="text-[11px] opacity-80">{i.s}</p>
                    </div>
                    <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden>
                      <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px]">
                <div className="rounded-xl bg-white/10 py-2">
                  <PixelIcon name="fire" size={16} className="mx-auto mb-0.5 text-hustly-lime" accentClassName="fill-hustly-lime" />
                  <p className="font-bold">7</p>
                  <p className="opacity-70">streak</p>
                </div>
                <div className="rounded-xl bg-white/10 py-2">
                  <PixelIcon name="trophy" size={16} className="mx-auto mb-0.5 text-hustly-lime" accentClassName="fill-hustly-lime" />
                  <p className="font-bold">Lv 12</p>
                  <p className="opacity-70">nível</p>
                </div>
                <div className="rounded-xl bg-white/10 py-2">
                  <PixelIcon name="coin" size={16} className="mx-auto mb-0.5 text-hustly-lime" accentClassName="fill-hustly-lime" />
                  <p className="font-bold">820</p>
                  <p className="opacity-70">coins</p>
                </div>
              </div>
            </div>
          </div>

          {/* Floating badges — V1 signature */}
          {!reduce && (
            <>
              <div className="absolute -left-4 top-10 hidden animate-float-slower rounded-2xl bg-white px-3 py-2 text-xs font-semibold shadow-card sm:block">
                <span className="text-gradient-purple">+50 XP</span>
              </div>
              <div className="absolute -right-4 bottom-16 hidden animate-float-slow rounded-2xl bg-hustly-lime px-3 py-2 text-xs font-semibold text-hustly-purple-ink shadow-card sm:block">
                🔥 Streak 7 dias
              </div>
            </>
          )}
        </motion.div>
      </div>

      {/* Scroll indicator — sinal para descer */}
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="text-[10px] font-medium uppercase tracking-widest text-hustly-purple-ink/40">Role</span>
        <div className="flex h-[42px] w-[26px] justify-center rounded-full border-2 border-hustly-purple/30 pt-1.5">
          <motion.div
            className="h-2 w-1 rounded-full bg-hustly-purple"
            animate={reduce ? {} : { y: [0, 14, 0], opacity: [0, 1, 0] }}
            transition={reduce ? {} : { duration: 1.8, ease: "easeInOut", repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}