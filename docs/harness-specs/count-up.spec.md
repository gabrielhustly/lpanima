# CountUp spec

Número gigante animado de 0 até o valor final, rodando UMA vez quando entra no viewport. Símbolo psicológico de magnitude + outcome concreto.

## Layout
- Stack vertical: número grande + label abaixo + sublabel opcional
- Background: contexto da seção onde está inserido (dark ou cream break)
- Número: `font-size: clamp(48px, 8vw, 96px)`, Manrope 800, `var(--lp-accent)` ou `var(--lp-text)` dependendo do fundo
- Label: 14-16px, uppercase, tracking-wide, opacity 0.7

## Props
```ts
type CountUpProps = {
  to: number;
  from?: number;       // default 0
  duration?: number;   // default 1.6s — vem de tokens.crawl (se viável detalhar)
  format?: 'integer' | 'currency-brl' | 'comma';
  label: string;
  sublabel?: string;
  prefix?: string;     // ex: "R$ "
  suffix?: string;     // ex: " alunos ativos"
}
```

## Comportamento
- Trigger via `useInView(ref, { once: true, margin: '-20% 0px' })`
- Animação via `animate()` do motion/react ou `useMotionValue` + `useTransform` + `animate()` para o número
- Easing: `crawl` spring ou cubic-bezier durão — manter ~1.6s default
- Após completar, mantém o valor final (não loop)
- `prefers-reduced-motion`: pula direto pro valor final, sem animar

## Tracking
- Trigger: `track('countup_trigger', { to, label })`

## Anti-patterns
- ❌ Animação looping (ansiedade visual)
- ❌ Número sem label — precisa contexto
- ❌ Mais de 2 count-ups na mesma section (satura)
- ❌ Número > 7 dígitos ilegível em mobile — use `format: 'comma'`

## Variações do harness
- Variant 1: integer, "1.247 alunos ativos"
- Variant 2: currency BRL, "R$ 247.890 em resultados gerados"
- Variant 3: com prefix/suffix custom