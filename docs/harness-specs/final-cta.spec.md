# FinalCTA spec

Última seção da LP. Job: o último empurrão antes do redirect para login. Estágio Action. Único CTA no viewport, full width, com urgência honesta.

## Layout
- Background: cream break `var(--lp-cream)` para destacar do dark
- Section padding generoso: 96-128px vertical desktop, 64px mobile
- Texto escuro (`var(--lp-text-dark)`) sobre cream
- Conteúdo centralizado, max-width 720px
- Anatomia:
  - Eyebrow uppercase 12px tracking wide (cor `var(--lp-cta)`)
  - H2 gigante (Manrope 800, clamp 32-56px): "Pronto para sua primeira execução?"
  - Sub (Manrope 400 18-20px, muted dark `#475569`): risk reversal
  - Timer de urgência (se real — início da próxima turma)
  - Botão único CTA full-width (mobile) / max 320px (desktop)
  - Microcopy abaixo do botão: "Cancele quando quiser · É grátis começar"

## CTA primário único
- `<a href="/login">` com `aria-label`
- Radius 3px, padding 18px 40px
- Background `var(--lp-cta)` vermelho-tijolo (contraste sobre cream)
- Hover: `var(--lp-cta-hover)` + `y: -2px` + box-shadow grow
- Label: "Entrar agora" ou "Começar agora"
- Icon seta inline direita opcional, `x: 4px` no hover (signal)

## Timer de urgência (apenas se real)
- Se houver início de turma real, mostrar countdown
- Hooks: `useCountdown(date)` — output `dias / horas / min / seg`
- Sem fake escassez (vide playbook anti-pattern)
- Visual: 4 blocos numéricos (dd/hh/mm/ss), radius 10px, bg dark, número grande, label pequena abaixo
- Atualiza a cada segundo (sem animar o número, só troca)

## Tracking
- Section in view (once): `track('final_cta_view')`
- CTA click: `track('cta_final_click')`
- Se timer hits 0: `track('timer_expired')`

## Animações
- Section reveal: fade + `y: 24px → 0`, `slow` duration, `viewport={{ once: true }}`
- Button: micro scale 1 → 1.02 → 1 no reveal (signal de vida)
- Set inline do botão no hover: `x: 4px` no icon, `fast`
- `prefers-reduced-motion`: só fade

## Acessibilidade
- Estado se click pressed: ripple visual, não animação de loading enganosa
- Touch target do CTA ≥ 56px altura
- `prefers-reduced-motion`: timer continua funcionando (não é motion é dado)

## Anti-patterns
- ❌ Sticky CTA competindo com este — quando esta seção está visível, sticky CTA se esconde (intersection observer)
- ❌ Mais de um botão nesta seção
- ❌ Urgência inventada ("última hora!!") sem real timer
- ❌ Contraste baixo do texto sobre cream (`#475569` sobre `#F5F4F3`: 7.0:1, ok)
- ❌ Embed de "vídeo de gurus" externo — mantém foco no botão