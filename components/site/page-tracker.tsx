"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const VISITOR_KEY = "hustly_visitor_id";

function getVisitorId(): string {
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

/**
 * PageTracker — registra uma entrada na página (pageview) a cada navegação.
 * Não conta a própria página /dados. Silencioso em caso de erro.
 */
export function PageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.startsWith("/dados")) return;

    const visitorId = getVisitorId();
    const controller = new AbortController();

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visitorId, path: pathname }),
      signal: controller.signal,
      keepalive: true,
    }).catch(() => {
      /* noop — tracking nunca deve quebrar a página */
    });

    return () => controller.abort();
  }, [pathname]);

  return null;
}
