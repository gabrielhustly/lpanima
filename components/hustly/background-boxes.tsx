"use client";

import React from "react";
import { motion } from "motion/react";

/**
 * BackgroundBoxes — interactive grid (Aceternity-inspired) com paleta Hustly.
 * Hover em cada célula pinta com uma cor da marca via motion/react.
 * Extraído da V1, adaptado de framer-motion para motion/react.
 */

type BoxesProps = {
  className?: string;
  intensity?: "subtle" | "normal";
  density?: "low" | "normal";
};

const BoxesCore = ({
  className,
  intensity = "normal",
  density = "normal",
  ...rest
}: BoxesProps) => {
  const rowsCount = density === "low" ? 60 : 120;
  const colsCount = density === "low" ? 40 : 80;
  const rows = new Array(rowsCount).fill(1);
  const cols = new Array(colsCount).fill(1);

  const colors = [
    "hsl(265 90% 58%)",
    "hsl(75 95% 60%)",
    "hsl(75 90% 75%)",
    "hsl(280 85% 50%)",
    "hsl(265 90% 70%)",
    "hsl(0 0% 100%)",
  ];

  const getRandomColor = () =>
    colors[Math.floor(Math.random() * colors.length)];

  const opacity = intensity === "subtle" ? "opacity-40" : "opacity-100";

  return (
    <div
      style={{
        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      className={`absolute -top-1/4 left-1/4 z-0 flex h-full w-full -translate-x-1/2 -translate-y-1/2 p-4 ${opacity} ${className ?? ""}`}
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div
          key={`row-${i}`}
          className="relative h-8 w-16 border-l border-white/10"
        >
          {cols.map((_, j) => (
            <motion.div
              whileHover={{
                backgroundColor: getRandomColor(),
                transition: { duration: 0 },
              }}
              animate={{
                transition: { duration: 2 },
              }}
              key={`col-${j}`}
              className="relative h-8 w-16 border-r border-t border-white/10"
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="pointer-events-none absolute -left-[22px] -top-[14px] h-6 w-10 stroke-white/10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);

/**
 * DarkBoxesBackground — wrapper pronto para usar em seções escuras.
 * Aplica o gradiente dark + Boxes + máscara radial pra fade nas bordas.
 */
export function DarkBoxesBackground({
  intensity = "subtle",
  density = "low",
  className,
}: {
  intensity?: "subtle" | "normal";
  density?: "low" | "normal";
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      >
        <div className="pointer-events-auto absolute inset-0">
          <Boxes intensity={intensity} density={density} />
        </div>
      </div>
    </div>
  );
}