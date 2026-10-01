# guilhermecarlos@portfolio

Portfólio pessoal com estética de terminal CRT: um monitor 3D que reage ao scroll e ao mouse, com as seções do site por cima.

**Produção:** https://guilherme-carlos.guilhermecarlos.workers.dev

## Stack

- React 19 + TanStack Start/Router (SSR, rotas por arquivo)
- Tailwind CSS v4
- Three.js via React Three Fiber, drei e postprocessing
- Cloudflare Workers (deploy com Wrangler)
- Vitest + Testing Library, ESLint (com jsx-a11y) e Prettier

## Começando

Requer Node 24.

```bash
npm install
npm run dev        # http://localhost:8080
```

| Script              | O que faz                                                |
| ------------------- | -------------------------------------------------------- |
| `npm run dev`       | Servidor de desenvolvimento                              |
| `npm run build`     | Build de produção                                        |
| `npm run preview`   | Serve o build localmente                                 |
| `npm run check`     | Formatação, lint, typecheck, testes e build (o mesmo CI) |
| `npm run lint`      | ESLint, falha com qualquer aviso                         |
| `npm run typecheck` | `tsc --noEmit`                                           |
| `npm test`          | Testes (Vitest)                                          |
| `npm run format`    | Formata o projeto com Prettier                           |
| `npm run deploy`    | Build + `wrangler deploy` manual                         |

## Arquitetura

```
src/
  content/        conteúdo tipado (perfil, projetos, skills, currículo, texto do monitor)
  features/
    home/         HomePage, sections/ (Hero, About, Work, Contact) e components/
    resume/       página /curriculo
    scene/        cena 3D: SceneBackground → CrtCanvas → RetroPC + ScrollCamera
  components/     peças compartilhadas (SiteHeader, SiteFooter, SmartLink, ...)
  hooks/          useMediaQuery, usePagination, useScrollProgress, useIsClient
  lib/            utilitários puros e a página de erro do SSR
  routes/         apenas definições de rota (ver src/routes/README.md)
  data/           commit-stats.json, atualizado diariamente pelo GitHub Actions
```

Decisões principais:

- **Conteúdo separado da apresentação.** Para mudar textos, projetos ou contatos, edite `src/content/`. Os componentes não guardam dados.
- **A cena 3D carrega sob demanda, só no cliente.** O three.js fica num chunk próprio e o resto do site não espera por ele.
- **Nada de re-render por frame.** O scroll e o mouse ficam em refs lidos dentro do `useFrame`, e a textura da tela só é redesenhada quando o cursor pisca.
- **Lógica testável em funções puras.** O caminho da câmera (`scene/cameraPath.ts`) e a paginação (`hooks/usePagination.ts`) são testados sem renderizar a cena.

### Trocar o PDF do currículo

1. Coloque o novo arquivo em `public/`.
2. Atualize `profile.resumePdf.url` em `src/content/profile.ts`.

## CI/CD

O workflow `.github/workflows/ci.yml` roda `npm run check` em todo push e PR. Em push na `main` com as checagens passando, ele publica no Cloudflare Workers.

O deploy precisa de dois secrets no repositório (Settings → Secrets and variables → Actions):

- `CLOUDFLARE_API_TOKEN`: token com o template "Edit Cloudflare Workers"
- `CLOUDFLARE_ACCOUNT_ID`: ID da conta Cloudflare

Sem os secrets, o job de deploy é ignorado com um aviso, e o CI continua verde.

O workflow `update-commit-stats.yml` atualiza `src/data/commit-stats.json` uma vez por dia.
