/**
 * Analytics — camada de tracking segura.
 * Envia o evento para o Plausible (se carregado) e para o backend próprio
 * (/api/event), que persiste a contagem no KV para a página /dados.
 */
export function track(event: string, props?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;

  const w = window as Window & { plausible?: (...args: unknown[]) => void };
  w.plausible?.(event, { props });

  try {
    const body = JSON.stringify({ event, props });
    const sent =
      typeof navigator !== "undefined" &&
      typeof navigator.sendBeacon === "function" &&
      navigator.sendBeacon("/api/event", body);

    if (!sent) {
      fetch("/api/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {
        /* noop — tracking nunca deve quebrar a página */
      });
    }
  } catch {
    /* noop */
  }
}