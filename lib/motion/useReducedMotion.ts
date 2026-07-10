"use client";

import { useReducedMotion as useReducedMotionMotion } from "motion/react";

/**
 * Re-export SSR-safe do hook useReducedMotion de motion/react.
 * Retorna false durante SSR, valor real no client.
 */
export function useReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useReducedMotionMotion() ?? false;
}