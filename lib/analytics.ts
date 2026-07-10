/**
 * Analytics — camada de tracking segura (Plausible por padrão).
 * Cai em noop se Plausible não estiver carregado.
 */
export function track(event: string, props?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  const w = window as Window & { plausible?: (...args: unknown[]) => void };
  w.plausible?.(event, { props });
}