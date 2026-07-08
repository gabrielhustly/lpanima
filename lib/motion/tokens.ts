/**
 * Motion tokens — durações e easings canônicos.
 * Nunca hardcodar durations/easings inline nos componentes.
 */
export const motionTokens = {
  instant: "0.1s",
  fast: "0.2s",
  normal: "0.3s",
  slow: "0.5s",
  crawl: "0.8s",
} as const;

export const easings = {
  standard: [0.4, 0.0, 0.2, 1] as const,
  emphasis: [0.0, 0.0, 0.2, 1] as const,
};