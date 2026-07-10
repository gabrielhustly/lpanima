# TestimonialCarousel spec

Carrossel de depoimentos com fotos reais. Swipe horizontal manual + autoplay desativado (autoplay cansa e ainda конкуre com a atenção).

## Layout
- Container com `min-height` fixo (não muda entre slides — para o transition ser clean)
- Slide: avatar 48-56px circular + nome (Manrope 700 18px) + cargo (muted 14px) + quote em `Libre Baskerville` 20-24px line-height 1.6
- Background cream break section (`var(--lp-cream)`) quando o carrossel for uma seção descanso visual

## Props
```ts
type Testimonial = {
  avatar: string;       // URL real, jamais placeholder
  name: string;
  role: string;         // ex: "Aluno HUSTLY · Saiu do CLT em 4 meses"
  quote: string;
  result?: string;      // ex: "+R$ 12k mês 3"
};

type TestimonialCarouselProps = {
  testimonials: Testimonial[];
  autoplay?: boolean;   // DEFAULT false — recomendamos falso
};
```

## Comportamento
- Mostra 1 depoimento por vez
- Swipe horizontal manual — botões prev/next + dots abaixo + drag (touch)
- `AnimatePresence` com `mode="wait"` around each testimonial
- Transição entre slides: `x: 40 → 0 → -40` com opacity 1→0→1, `normal` duration
- `prefers-reduced-motion`: crossfade simples sem x
- Drag release: spring `release`

## Acessibilidade
- Container `role="region"` + `aria-roledescription="carousel"` + `aria-label`
- Botões prev/next têm `aria-label` descritivo
- Dots: buttons com `aria-label="Ir para depoimento N"`
- Tab order: os dots/botões são focusables, o conteúdo é estático
- Keyboard: setas esquerda/direita navegam (com `onKeyDown` no container)
- Pause autoplay (se ativo) quando recebe foco/keyboard

## Tracking
- Slide change: `track('testimonial_swipe', { from, to })`
- Quando o último é reached: `track('testimonial_complete')`

## Anti-patterns
- ❌ Autoplay racing (transição a cada 2s)
- ❌ 5 stars cliche sem contexto
- ❌ Avatares de stock ou placeholder "JD"
- ❌ Mais de 6 depoimentos por carrossel — subset por audiência (iniciante / avançado)
- ❌ Quote longo demais (>200 chars): corta ou expande com "ler mais"