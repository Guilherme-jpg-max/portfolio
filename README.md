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
    home/         HomePage, sections/ (Hero, About, Contact) e components/
    journey/      seção Jornada: linha do tempo, PC e caixa de disquetes
    resume/       página /curriculo
    scene/        cena 3D: SceneBackground → CrtCanvas → RetroPC + ScrollCamera
  components/     peças compartilhadas (SiteHeader, SiteFooter, SmartLink, ...)
  hooks/          useMediaQuery, useScrollProgress, useIsClient
  lib/            utilitários puros e a página de erro do SSR
  routes/         apenas definições de rota (ver src/routes/README.md)
  data/           commit-stats.json, atualizado diariamente pelo GitHub Actions
```

Decisões principais:

- **Conteúdo separado da apresentação.** Para mudar textos, projetos ou contatos, edite `src/content/`. Os componentes não guardam dados.
- **A cena 3D carrega sob demanda, só no cliente.** O three.js fica num chunk próprio e o resto do site não espera por ele.
- **Nada de re-render por frame.** O scroll e o mouse ficam em refs lidos dentro do `useFrame`, e a textura da tela só é redesenhada quando o cursor pisca.
- **Lógica testável em funções puras.** O caminho da câmera (`scene/cameraPath.ts`) e a jornada (`journey/phases.ts`, `terminal.ts`, `journeyMachine.ts`) são testados sem renderizar nada.

### Adicionar uma experiência ou um projeto

Nenhum código muda, só o conteúdo:

1. **Experiência:** adicione um objeto em `experiences` (`src/content/resume.ts`) com um `id` único (vira a pasta mostrada no terminal, ex.: `~/box3-software`), `start` no formato `AAAA-MM` e `end: null` se for a atual. A ordem no arquivo não importa: a jornada ordena da mais antiga para a atual, e o currículo da mais recente para a mais antiga.
2. **Projeto:** adicione um objeto em `src/content/projects.ts` com `experienceId` apontando para o `id` da experiência. Com `experienceId: null`, ele vai para a fase **Pessoais & IFCE**. A ordem no arquivo é a ordem dos disquetes na caixa.

O `npm test` falha se algum `experienceId` apontar para uma experiência que não existe.

### Trocar o PDF do currículo

1. Coloque o novo arquivo em `public/`.
2. Atualize `profile.resumePdf.url` em `src/content/profile.ts`.

## Seção Jornada

A seção `#jornada` da home substitui a antiga lista paginada de projetos. Ela conta a trajetória em fases, e cada fase guarda os seus projetos como disquetes. O layout, os textos e o ritmo das animações seguem o mockup aprovado (versão "v2", notebook 1366×720 e celular 390×844). Qualquer mudança visual deve ser validada primeiro nele.

### Especificação

- **Fases:** _Pessoais & IFCE_ abre a linha do tempo, seguida das experiências em ordem cronológica até a atual (`end: null`), que vem selecionada ao carregar.
- **Desktop (≥ 1024px), tudo numa tela de notebook sem rolar:**
  - topo: `// 03 — jornada`, o título e os passos `01 escolha a fase · 02 insira um disquete`;
  - à esquerda, o PC em perspectiva (`rotateY ≈ 11°`), flutuando devagar, com halo pulsando atrás, tela CRT com scanlines e faixa de varredura, e embaixo o drive A: com LED e os botões físicos (`⏏ ejetar`, `ver código ↗` ou `privado`);
  - à direita, a caixa de disquetes: uma lombada por projeto com nome, stack curta e `↗` (público) ou `⌂` (privado). Cabem 9 sem rolar, e acima disso a caixa rola por dentro;
  - embaixo, a linha do tempo horizontal: período, ponto, empresa e cargo, com uma barra brilhante que desliza até a fase ativa e um pulso no ponto.
- **Celular (< 1024px):** título, linha do tempo com nomes curtos (`shortName`) e selo "atual", a dica `toque numa fase · depois num disquete`, o PC e a caixa como faixa horizontal de disquetes arrastável.
- **Tela do PC (terminal):**
  - fase: `cd ~/<id>`, `cat cargo.txt`, `ls disquetes/` e a dica para inserir um disquete. Fases sem projeto mostram `cat resumo.txt` com o `summary`;
  - lendo: `mount /dev/fd0` e a barra `[█████░░░░░] 50%`;
  - README: `cat <projeto>/README.md`, título, stack, descrição e status do código.
- **Animações:**
  - trocar de fase: as lombadas entram em sequência (70ms entre elas), a tela pisca como um CRT (~150ms) e os comandos são digitados letra a letra (24ms por letra), enquanto a saída aparece de uma vez;
  - inserir um disquete: ele voa da caixa até o drive (650ms), o LED pisca, a barra de leitura avança (10 passos de 55ms), a tela pisca e o README é digitado;
  - ejetar: o disquete volta para a caixa e a tela pisca.
- **Movimento reduzido:** a Jornada ignora essa preferência e sempre anima, como no mockup (decisão do autor). O resto do site continua respeitando. O hook `useJourney` ainda aceita `reducedMotion: true`, que troca a tela na hora.
- **Textos no celular:** um projeto pode ter `mobile: { stack, blurb }` com versões curtas para a tela do PC; sem isso, usa `stack` e `blurb`.

### Onde fica cada parte

```
src/content/journey.ts           textos da seção e a fase "Pessoais & IFCE"
src/features/journey/
  phases.ts                      monta as fases a partir de experiências + projetos
  terminal.ts                    linhas da tela do PC e efeito de digitação
  journeyMachine.ts              estados da seção (fase, disquete, leitura, README)
  useJourney.ts                  liga a máquina aos timers das animações
  JourneySection.tsx             layout da seção
  components/                    JourneyPc, DiskCrate, JourneyRail, FlyingDisk
```

### Plano de implementação

| Fase | Entrega                                                                                                                                                                               | Pronto quando                                                     |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| 1    | **Conteúdo:** `Experience` com `id`, `start`/`end`, `shortName` e `summary`; `Project` com `experienceId` e `stackShort`; Maria Pitanga (só a parte de dev) e o sistema de fechamento | testes de conteúdo passam (ids únicos, `experienceId` válido)     |
| 2    | **Lógica pura:** `phases.ts`, `terminal.ts` e `journeyMachine.ts`, com testes                                                                                                         | ordem das fases, linhas da tela, digitação e transições testadas  |
| 3    | **Desktop:** PC, caixa, linha do tempo e layout; a seção entra no lugar de `WorkSection` e o menu passa a apontar para `#jornada`                                                     | igual ao mockup em 1366×720, sem rolar                            |
| 4    | **Celular:** linha do tempo compacta, faixa horizontal de disquetes                                                                                                                   | igual ao mockup em 390×844, alvos de toque ≥ 40px                 |
| 5    | **Animações e acessibilidade:** voo do disquete, piscada, digitação (sempre ativas), botões com `aria-pressed`/`aria-label`                                                           | animações com o ritmo da especificação; navegável só pelo teclado |
| 6    | **Limpeza:** remover `WorkSection`, `ProjectCard`, `ProjectPager` e `usePagination`; atualizar este README                                                                            | `npm run check` verde e revisão visual lado a lado com o mockup   |

## CI/CD

O workflow `.github/workflows/ci.yml` roda `npm run check` em todo push e PR. Em push na `main` com as checagens passando, ele publica no Cloudflare Workers.

O deploy precisa de dois secrets no repositório (Settings → Secrets and variables → Actions):

- `CLOUDFLARE_API_TOKEN`: token com o template "Edit Cloudflare Workers"
- `CLOUDFLARE_ACCOUNT_ID`: ID da conta Cloudflare

Sem os secrets, o job de deploy é ignorado com um aviso, e o CI continua verde.

O workflow `update-commit-stats.yml` atualiza `src/data/commit-stats.json` uma vez por dia.
