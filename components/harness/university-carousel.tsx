"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { track } from "@/lib/analytics";
import { useEffect } from "react";

/**
 * UniversityCarousel — faixa de logos de universidades parceiras.
 * Scroll infinito horizontal com marquee duplo (loop seamless).
 * Fica logo abaixo do Header, antes do Hero.
 */

const universities = [
  { name: "Centro Universitário dos Guararapes", src: "/brand/universities/guararapes.png" },
  { name: "FADERGS", src: "/brand/universities/fadergs.png" },
  { name: "IBMR", src: "/brand/universities/ibmr.png" },
  { name: "Centro Universitário Ritter dos Reis", src: "/brand/universities/ritter-dos-reis.png" },
  { name: "UNA", src: "/brand/universities/una.png" },
  { name: "UniBH", src: "/brand/universities/unibh.png" },
  { name: "UniSociesc", src: "/brand/universities/unisociesc.webp" },
  { name: "Faculdade Ages", src: "/brand/universities/ages.png" },
  { name: "Faculdade da Saúde e Ecologia Humana", src: "/brand/universities/saude-ecologia-humana.png" },
  { name: "Faculdade Internacional da Paraíba", src: "/brand/universities/faculdade-paraiba.png" },
  { name: "Faculdade Milton Campos", src: "/brand/universities/milton-campos.png" },
  { name: "Universidade Anhembi Morumbi", src: "/brand/universities/anhembi-morumbi.png" },
  { name: "Universidade do Sul de Santa Catarina", src: "/brand/universities/unisul.png" },
  { name: "Universidade Potiguar", src: "/brand/universities/potiguar.png" },
  { name: "Universidade Salvador", src: "/brand/universities/salvador.png" },
  { name: "Universidade São Judas Tadeu", src: "/brand/universities/sao-judas.png" },
];

export function UniversityCarousel() {
  const reduce = useReducedMotion();

  useEffect(() => {
    track("university_carousel_view");
  }, []);

  // Duplicamos o array para criar o loop infinito (marquee)
  const loop = [...universities, ...universities];

  return (
    <section
      aria-label="Universidades parceiras"
      className="relative overflow-hidden border-b border-hustly-purple-ink/5 bg-hustly-cream py-7 md:py-9"
    >
      <div className="container mx-auto max-w-7xl px-4 text-center">
        <motion.p
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-display text-sm font-bold tracking-tight text-hustly-purple-ink/80 sm:text-base md:text-lg"
        >
          Sua universidade já adquiriu a{" "}
          <span className="text-gradient-purple">melhor IA para educação!</span>
        </motion.p>
      </div>

      {/* Marquee — scroll infinito */}
      <div
        className="relative mt-6 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <motion.div
          className="flex w-max items-center gap-10 px-5"
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {loop.map((uni, i) => (
            <div
              key={`${uni.name}-${i}`}
              className="relative flex h-12 w-28 shrink-0 items-center justify-center md:h-14 md:w-36"
            >
              <Image
                src={uni.src}
                alt={uni.name}
                fill
                className="object-contain"
                sizes="144px"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
