"use client";

import { track } from "@/lib/analytics";
import { HustlyLogo } from "./logo";

/**
 * Header — V1 style: glass pill sticky, logo + CTA lime.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto max-w-7xl px-4 pt-3">
        <div className="glass flex items-center justify-between rounded-full px-3 py-2 shadow-soft">
          <a
            href="/"
            aria-label="Hustly, início"
            className="flex items-center pl-1"
          >
            <HustlyLogo className="h-10 w-auto md:h-12" priority />
          </a>

          <nav aria-label="Navegação principal" className="hidden items-center gap-7 text-sm font-medium text-foreground/70 md:flex">
            <a href="#features" className="hover:text-foreground">Como funciona</a>
            <a href="#ferramentas" className="hover:text-foreground">Ferramentas</a>
            <a href="#beneficios" className="hover:text-foreground">Benefícios</a>
            <a href="#faq" className="hover:text-foreground">FAQ</a>
          </nav>

          <a
            href="https://www.hustly.me"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Login Universidade, entrar na plataforma Hustly"
            onClick={() => track("cta_header_click")}
            className="flex min-h-[44px] items-center rounded-full bg-hustly-lime px-5 py-2 text-sm font-bold text-hustly-purple-ink transition-colors hover:bg-hustly-lime/90"
          >
            Entrar
          </a>
        </div>
      </div>
    </header>
  );
}