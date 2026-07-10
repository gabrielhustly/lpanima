# ScrollProgress spec

Barra de progresso fixa no topo da viewport, indicando quanto falta pro CTA final. Subliminarmente empurra o visitante a continuar rolando para completar a "leitura" — sinal psicológico de progresso + objetivo.

## Posicionamento
- Fixed top, z-index 50
- Full width, altura 4px
- Background: `var(--lp-bg-elev)` (escura sobre dark) ou `var(--lp-cream)` (escura sobre cream break) — adaptar à seção atual é bônus; versão V1 apenas escuro sobre bg
- Preenchimento: `var(--lp-accent)` verde, scaleX 0→1

## Comportamento
- Largura do fill = `useScroll()` (scrollYProgress) mapeado para scaleX
- Origin: `transformOrigin: 'left'`
- Transition: nenhum (instantâneo, smooth nativo do RAF do motion/react)

## Acessibilidade
- `role="progressbar"` 
- `aria-valuemin="0"`, `aria-valuemax="100"`, `aria-valuenow` atualizado
- `aria-label="Progresso de leitura da página"`

## Reduced motion
- Quando `useReducedMotion()` é true, ainda mostra a barra (não há transform perceptível para suprimir — é só scaleX do scroll). Decision: manter.

## Tracking
- Ao cruzar 25%, 50%, 75%, 100%, dispara `track('scroll_N', { depth: N })`

## Anti-patterns
- ❌ Animação de loader spinning no início
- ❌ Gradiente na barra (use accent sólido)
- ❌ Mais de 4px de altura (vira distração)