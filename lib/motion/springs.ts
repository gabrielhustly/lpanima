/**
 * Spring presets canônicos — usar via `transition={{ ...springs.snappy }}`.
 */
export const springs = {
  snappy: { stiffness: 400, damping: 30 },
  gentle: { stiffness: 200, damping: 26 },
  bouncy: { stiffness: 350, damping: 18 },
  instant: { stiffness: 1000, damping: 35 },
  release: { stiffness: 200, damping: 20 },
} as const;