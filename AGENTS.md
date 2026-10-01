# Ember Glow Desk

Portfólio full-stack em **TanStack Start** (React + Vite), publicado no **Cloudflare Workers**.

## Stack

- React 19 + TanStack Router/Start (SSR)
- Tailwind CSS v4 (tokens da paleta em `src/styles.css`)
- Three.js / React Three Fiber (cena 3D)
- Cloudflare Workers via `@cloudflare/vite-plugin` e Wrangler
- Vitest + Testing Library

## Arquitetura

Veja o `README.md` para a árvore completa. Regras:

- Conteúdo (textos, projetos, contatos, currículo) fica em `src/content/`, tipado em `types.ts`. Componentes não guardam dados.
- Arquivos em `src/routes/` só definem rotas e apontam para páginas em `src/features/`.
- A cena 3D (`src/features/scene/`) é carregada com lazy, só no cliente. Valores lidos a cada frame (scroll, mouse) ficam em refs, nunca em estado.
- Cores usadas em WebGL/canvas ficam em `src/features/scene/theme.ts`, espelhando os tokens do CSS.
- Lógica não trivial vai em funções puras ou hooks, com teste ao lado (`*.test.ts`).

## Convenções de rotas

Veja `src/routes/README.md` — roteamento baseado em arquivos do TanStack Router.

## Scripts

- `npm run dev` — servidor de desenvolvimento
- `npm run build` — build de produção
- `npm run preview` — pré-visualiza o build de produção
- `npm run check` — formatação, lint, typecheck, testes e build (o mesmo do CI)
- `npm run lint` — ESLint (falha com qualquer aviso)
- `npm run typecheck` — TypeScript sem emitir arquivos
- `npm test` — testes com Vitest
- `npm run format` — formata o código com Prettier
- `npm run deploy` — build + deploy manual no Cloudflare
