# PainList spec

Lista de 3 dores específicas que o aluno sente. Job: fazê-lo reconhecer sua própria dor (estágio Tension, 3-10s).

## Layout
- Stack vertical
- Background: dark `var(--lp-bg)`
- Section header: eyebrow "ISSO SOA FAMILIAR?" + H2 "Você está preso no lugar errado"
- Cada item é uma linha com:
  - Marker custom (✗ ou ícone gráfico, `var(--lp-cta)` red)
  - Headline da dor (Manrope 700, 18-22px)
  - Descrição (Manrope 400, 15-16px, `var(--lp-muted)`)
- Não "soldado" como checklist de produto — vendem a dor, não a solução

## Props
```ts
type Pain = { title: string; description: string };
type PainListProps = { pains: Pain[] };
```

## Animações
- Conteúdo estático (não há cards para hover)
- Stagger na entrada: cada item entra com delay: `index * 80ms`, fade + `x: -16px → 0`
- O marker tem um micro-pulse no início do entrance (escalado 1.1 → 1) quick 100ms signal
- `prefers-reduced-motion`: todas entradas fade-only 200ms

## Acessibilidade
- Lista usa `<ul role="list">`
- Markers têm `aria-hidden="true"` (decorativos)

## Tracking
- Quando os 3 itens entram: `track('pain_view', { count: 3 })`
- Se hover em item (desktop): `track('pain_hover', { title })`

## Anti-patterns
- ❌ Pain genérico ("você quer mais dinheiro") — ser específico
- ❌ Mais de 4 dores (satura / soa como reclamação)
- ❌ Use ✅ check mark — dores usam ✗ vermelho
- ❌ Colocar solução nessa seção — a dor aqui, a solução depois

## Copy de exemplo
- "Toda terça={( new module edition alert )} — você publica um curso que ninguém termina" (placeholder metafórico)
- "Sua biblioteca Notion está virando cemitério de ideias nunca executadas"
- "Você comprou 'passive income course' e ainda vendeu R$ 0"