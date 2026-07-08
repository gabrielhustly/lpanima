# FAQ spec

Acordeão de perguntas frequentes comuns. Job: reduzir fricção mental antes do CTA final ("se eu entrar, posso cancelar? e se não funcionar para mim?").

## Layout
- Background dark break / cream (última descanso visual)
- Section header: eyebrow "PERGUNTAS QUE ALUNOS FAZEM" + H2 "Antes de você clicar em Entrar"
- Stack vertical de itens
- Cada item:
  - Botão `<button aria-expanded>` com a pergunta (Manrope 600, 17-18px)
  - Icons "+" no descanso, "−" quando aberto (toggle animated)
  - Painel de resposta colapsável (Manrope 400, 15-16px, `var(--lp-muted)`)
- Border sutil entre itens: `1px solid var(--lp-border)`

## Props
```ts
type FAQItem = { question: string; answer: string };
type FAQProps = { items: FAQItem[]; defaultOpen?: number };
```

## Comportamento
- Apenas 1 item aberto por vez (accordion puro)
- Click em pergunta aberta fecha
- Tab navega pelos botões
- Enter/Space abre/fecha o focado
- ESC fecha o item atualmente aberto

## Animações
- AnimatePresence `mode="wait"` ao redor do content
- Height animado via `motion/react` com `initial={{ height: 0, opacity: 0 }}` + `animate={{ height: 'auto', opacity: 1 }}` + exit reverse — usar layout em V2 se realocar
- ⚠️ Animação de height/opacity é exceção permitida porque esse é o padrão acordão, transform alone não funciona aqui. Use `motion/react` height animation ONLY neste caso específico.
- Icon de toggle: rotate 90deg (do +) → 0 (no `−`) com `fast` spring `snappy`
- `prefers-reduced-motion`: height animation instantânea, só fade

## Acessibilidade
- `aria-expanded` no toggle button
- `aria-controls` apontando para o painel
- Painel `id` matching + `role="region"` + `aria-labelledby`
- Keyboard navigation completa: tab, enter/space, escape

## Tracking
- Click to open: `track('faq_open', { question })`
- Click to close: `track('faq_close', { question })`

## Anti-patterns
- ❌ Mais de 1 item aberto simultaneamente (overwhelming)
- ❌ Copy duplicando a informação do Hero
- ❌ FAQ antes da seção de proof — fica depois do proof, antes do final CTA
- ❌ Mais de 6 perguntas (vira docs, não FAQ)
- ❌ Question mark em body sentence case — perguntas mesmo têm "?" sim