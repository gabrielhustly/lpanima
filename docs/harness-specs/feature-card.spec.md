# FeatureCard spec

Card que mostra uma transformação da plataforma HUSTLY (não uma feature técnica). Hover lift + border accent.

## Layout
- Card standalone, radius 20px, bg `var(--lp-bg-elev)`, border 1px `var(--lp-border)`
- Padding 32px desktop, 24px mobile
- Estrutura vertical:
  - Ícone custom (24-32px, `var(--lp-accent)` ou `var(--lp-cta)`)
  - Título (Manrope 700, 20-24px)
  - Descrição (Manrope 400, 16px, `var(--lp-muted)`)
  - Optional badge/gold tag

## Props
```ts
type FeatureCardProps = {
  icon: ReactNode;       // SVG custom, não stock icon
  title: string;         // outcome, ex: "Aprenda fazendo"
  description: string;
  badge?: string;        // ex: "novo"
  highlight?: boolean;   // aplica borda gold
  href?: string;         // se clicable p/ detalhe
}
```

## Animações
- Entrada no viewport: fade + `y: 16px → 0`, `normal` duration, `gentle` spring, `viewport={{ once: true }}`
- Hover (desktop): `y: -4px` + border color → `var(--lp-accent)` + box-shadow grow sutil, `fast` duration
- Focus (keyboard): mesmo efeito do hover
- `prefers-reduced-motion`: hover sem transform, só border color

## Tracking
- Mouseenter (desktop): `track('feature_hover', { title })`
- Click (se href): `track('feature_click', { title })`

## Variações do harness
1. Default — apenas layout
2. Highlight — com badge gold + bordeira accent
3. Clickable — com href e href + seta no canto

## Anti-patterns
- ❌ Stock icon (lucide via CDN genérico) — usar ícone custom SVG inline
- ❌ Card interno a outro card
- ❌ Mais de 4 cards na mesma section (enche a tela e perde foco)
- ❌ Hover que muda layout / adiciona conteúdo (causa reflow)