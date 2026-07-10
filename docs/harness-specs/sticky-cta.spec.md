# StickyCTA spec

CTA persistente que aparece após 50% de scroll. Garante que o aluno sempre tenha o botão de login a 1 toque, não importa onde ele esteja na página.

## Variantes

### Mobile
- Fixed bottom, full width, z-index 40
- Padding 12px + safe-area-inset-bottom
- Background `var(--lp-bg-elev)` + border-top 1px `var(--lp-border)`
- Botão CTA full width, radius 3px, padding 14px 24px
- Aparece quando scrollYProgress > 0.5

### Desktop
- Fixed bottom right, radius 10px, padding 16px 28px
- Box-shadow sutil (não pesado), `var(--lp-cta)` bg
- Aparece quando scrollYProgress > 0.6
- Tamanho reduzido (não full width)

## Comportamento
- Entrada: AnimatePresence com `mode="wait"`, animação `y: 100px → 0` mobile, `scale: 0.9 + opacity` desktop
- Saída (quando scroll volta < 50%): reverso, `fast` duration
- Não anima duas vezes seguidas (debounce no scroll listener — motion handle internamente)

## Copy
- "Entrar agora" (curto, mobile-friendly)
- Sublabel opcional desktop: "é grátis começar"

## Acessibilidade
- `aria-label="Entrar na plataforma"`
- Não esconde conteúdo atrás dele: ao final do scroll, padding-bottom extra na última seção (96px mobile) para não tampar o final CTA final
- `prefers-reduced-motion`: aparece sem animar

## Tracking
- Click: `track('cta_sticky_click', { variant: 'mobile' | 'desktop' })`
- Impression (aparece uma vez): `track('cta_sticky_impression')`

## Anti-patterns
- ❌ Banner sticky por toda a duração (cansativo)
- ❌ Com copy longa atrapalhando o botão
- ❌ Sticky CTA competing com o final CTA — quando o final CTA está visível, esconder o sticky (intersection observer ou checagem de scroll)