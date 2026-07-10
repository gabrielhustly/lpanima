# Hero spec

Primeira seção da LP. Job: parar o aluno em 3s e fazê-lo entender "isso é para mim, e tem um botão para entrar".

## Layout
- Full viewport height (100svh) ou próximo, com padding generoso
- Background: `var(--lp-bg)` dark
- Elemento gráfico de apoio: screenshot real da plataforma HUSTLY ou mockup, com parallax sutil (transformY 10-15% no scroll)
- Hierarquia visual: eyebrow (10-12px uppercase tracking wide) → H1 (clamp 48-72px Manrope 800) → subheadline (Manrope 400 18-20px `var(--lp-muted)`) → CTA primário → CTA secundário "Ver resultados"

## Copy (placeholder — substituir com real)
- Eyebrow: "PLATAFORMA HUSTLY"
- H1: "Saia do zero. Lance. Fature." (5 palavras)
- Sub: "Para quem está cansado de curso que não sai do PDF. Aprenda, execute, e mostre resultado — na mesma semana."
- CTA primário: "Entrar agora"
- CTA secundário: "Ver resultados" → scroll suave para proof section

## Animações (motion/react)
- H1: fade-in + `y: 16px → 0`, `slow` duration, `gentle` spring
- Sub: atraso 100ms, mesma duracão
- CTAs: stagger 80ms
- Mockup/screenshot: fade-in + `y: 24px → 0` após os textos, `slow` duration
- Tudo entra `viewport={{ once: true }}` (já está no viewport inicial)
- `prefers-reduced-motion`: tudo fade-only 200ms ou menos

## CTAs
- Primário: `<a href="/login">` radius 3px, padding 16px 32px, `var(--lp-cta)`, hover `var(--lp-cta-hover)` + `y: -2px` + box-shadow grow, label "Entrar agora", `aria-label="Entrar agora na plataforma HUSTLY"`, tracking `cta_hero_click`
- Secundário: link underline-only, `var(--lp-text)` muted hover, sem bg

## Tracking
- Mount: `track('hero_view')`
- CTA primary click: `track('cta_hero_click')`
- CTA secondary click: `track('hero_secondary_click')`

## Anti-patterns
- ❌ Headline centrada sobre gradient stock
- ❌ Dois CTAs primários competindo (só 1)
- ❌ Vídeo autoplaying com áudio no hero
- ❌ Stock photo de "pessoa feliz no laptop"
- ❌ Logo grande no topo (logo fica no header sticky, não no hero)

## Acessibilidade
- H1 único na página (este)
- Botões touch target ≥44px
- Contraste H1 sobre dark ≥ 4.5:1 (FAFAFA sobre 0A0A0B = 19.7:1, estável)
- Skip link no início da página (já no layout, fora do hero) pulando para a próxima seção