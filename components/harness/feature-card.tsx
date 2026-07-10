"use client";

import { motion, useReducedMotion } from "motion/react";
import { type ReactNode, useRef } from "react";
import { track } from "@/lib/analytics";
import { springs } from "@/lib/motion/springs";

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  badge?: string;
  highlight?: boolean;
  href?: string;
};

/**
 * FeatureCard — card de transformação com hover lift + border accent.
 * radius 20px, bg --lp-bg-elev, border --lp-border.
 */
export function FeatureCard({
  icon,
  title,
  description,
  badge,
  highlight = false,
  href,
}: FeatureCardProps) {
  const reduce = useReducedMotion();
  const hoverFired = useRef(false);

  const handleMouseEnter = () => {
    if (!hoverFired.current) {
      hoverFired.current = true;
      track("feature_hover", { title });
    }
  };

  const handleClick = () => {
    if (href) track("feature_click", { title });
  };

  const CardInner = () => (
    <>
      <div className="mb-5 text-lp-accent">{icon}</div>
      <div className="flex items-center gap-2">
        <h3 className="font-manrope text-xl font-bold text-lp-text md:text-2xl">
          {title}
        </h3>
        {badge && (
          <span className="rounded-full bg-lp-gold/20 px-2.5 py-0.5 text-xs font-semibold text-lp-gold">
            {badge}
          </span>
        )}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-lp-muted md:text-base">
        {description}
      </p>
      {href && (
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-lp-accent">
          Saber mais
          <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </>
  );

  const motionProps = {
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, amount: 0.3 },
    transition: { ...springs.gentle, duration: 0.5 },
    whileHover: reduce ? undefined : { y: -6, scale: 1.02 },
    whileFocus: reduce ? undefined : { y: -6, scale: 1.02 },
    onMouseEnter: handleMouseEnter,
    className: `group rounded-[20px] border p-6 transition-all duration-300 md:p-8 ${
      highlight
        ? "border-lp-gold/40 bg-lp-bg-elev hover:border-lp-accent hover:shadow-[0_12px_40px_-8px_hsl(265_90%_58%/0.3)]"
        : "border-lp-border bg-lp-bg-elev hover:border-lp-accent/60 hover:shadow-[0_12px_40px_-8px_hsl(265_90%_58%/0.2)]"
    }`,
  };

  if (href) {
    return (
      <motion.a
        href={href}
        onClick={handleClick}
        aria-label={`${title}, saber mais`}
        {...motionProps}
      >
        <CardInner />
      </motion.a>
    );
  }

  return (
    <motion.div {...motionProps}>
      <CardInner />
    </motion.div>
  );
}