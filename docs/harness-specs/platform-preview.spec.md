# PlatformPreview spec

Tour visual da plataforma HUSTLY. Job: mostrar (não descrever) o que o aluno vai usar no dia-a-dia — screenshots reais da plataforma, nunca mockups genéricos.

## Layout
- Background dark com cream break subsection (mixed dentro da seção é opcional)
- Section header: eyebrow "O QUE VOCÊ VAI USAR" + H2 "Plataforma HUSTLY em 3 telas"
- 3 telas em horizontal scroll-snap (mobile) / grid 3-cols (desktop):
  1. Dashboard main — mostra "próxima ação" + métricas
  2. Trilha de aprendizagem — visual de steps with checkpoints
  3. Comunidade / desafio ativo — feed de outros alunos executando
- Cada tela: screenshot real (PNG/WebP otimizado) com legenda abaixo

## Props
```ts
type Screen = {
  imageSrc: string;
  alt: string;
  title: string;
  caption: string;
};
type PlatformPreviewProps = { screens: Screen[] };
```

## Animações
- Entrada: stagger 80ms entre as 3 telas, fade + `y: 16px → 0`
- Mobile horizontal-snap-scroll: native CSS `scroll-snap` (não JS)
- `prefers-reduced-motion`: sem transforms, só fade

## Acessibilidade
- Imagens têm `alt` descritivo (descreve o que está na tela, não "screenshot do dashboard")
- Botões "Ver maior" abrem modal com a imagem ampla: `role="dialog"` + `aria-modal` + focus trap + ESC para fechar + scroll lock
- Snap scroll não bloqueia scroll vertical

## Modal
- Trigger: tap na tela
- AnimatePresence `mode="wait"`: scale 0.95 + fade in
- Background: opaque `rgba(0,0,0,0.85)` + blur
- Close: ESC + click backdrop + button X (44px touch target)
- `role="dialog"` + `aria-modal="true"` + `aria-labelledby` no título

## Tracking
- Each screen visible: `track('screen_view', { title })`
- Modal open: `track('screen_zoom', { title })`
- Modal close: `track('screen_zoom_close', { title })`

## Anti-patterns
- ❌ Mockup genérico (browser frame + placeholder)
- ❌ Mais de 3 telas (overshooting)
- ❌ Autoplaying video tour sem controle
- ❌ Animação parallax no scroll que re-layout