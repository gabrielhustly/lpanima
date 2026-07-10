/**
 * Footer — simples, uma linha com copyright.
 * Sem CTAs competindo aqui (o FinalCTA já fechou a página).
 */
import { HustlyLogo } from "./logo";

export function Footer() {
  return (
    <footer className="border-t border-lp-border bg-lp-bg px-4 py-8">
      <div className="container mx-auto flex max-w-6xl flex-col items-center gap-3 text-center">
        <HustlyLogo className="h-7 w-auto" invert />
        <p className="text-sm text-lp-muted">
          © {new Date().getFullYear()} Hustly. Plataforma para quem executa.
        </p>
      </div>
    </footer>
  );
}