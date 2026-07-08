"use client";

import { useInView as useInViewMotion, type UseInViewOptions } from "motion/react";
import { type RefObject } from "react";

/**
 * Re-export SSR-safe do hook useInView de motion/react.
 * Defaults: once=true, amount=0.3.
 */
export function useInView(
  ref: RefObject<HTMLElement | null>,
  options?: UseInViewOptions
) {
  return useInViewMotion(ref, {
    once: options?.once ?? true,
    amount: options?.amount ?? 0.3,
    ...options,
  });
}