import Image from "next/image";

/**
 * HustlyLogo — logo oficial (ícone "H" 3D + wordmark "hustly").
 * Assets em /public/brand/:
 *   - hustly-logo.png  (logo colorido, 1872×720)
 *   - logo-branco.png  (logo branco para fundos escuros)
 *
 * - `className` controla o tamanho renderizado (ex.: "h-8 w-auto").
 * - `invert` usa o logo branco oficial (logo-branco.png) em vez de filtro CSS.
 * - `priority` carrega a imagem com prioridade (LCP).
 */
export function HustlyLogo({
  className = "h-8 w-auto",
  invert = false,
  priority = false,
}: {
  className?: string;
  invert?: boolean;
  priority?: boolean;
}) {
  return (
    <Image
      src={invert ? "/brand/logo-branco.png" : "/brand/hustly-logo.png"}
      alt="Hustly"
      width={1872}
      height={720}
      priority={priority}
      className={className}
    />
  );
}
