import type { Project } from "./types";

const GITHUB = "https://github.com/Guilherme-jpg-max";

export const projects: Project[] = [
  {
    id: "sistema-fechamento",
    name: "sistema-fechamento",
    experienceId: "maria-pitanga",
    stack: "React · TypeScript · Hono · Drizzle · Workers · D1",
    stackShort: "React · D1",
    blurb:
      "Trocou as planilhas das 4 lojas por um sistema em produção: vendas, despesas, folha, metas e estoque por lote, com CMV calculado, mês travado após o fechamento e exportação para Excel.",
    mobile: {
      stack: "React · Hono · Workers · D1",
      blurb: "Fechamento mensal das 4 lojas em produção, com CMV, estoque e exportação para Excel.",
    },
    github: null,
  },
  {
    id: "geo-fabril",
    name: "geo-fabril",
    experienceId: "box3-software",
    stack: "C# · .NET · EF Core · SQL Server · React",
    stackShort: "C# · SQL Server",
    blurb:
      "Para uma das maiores fabricantes de calçados do Brasil: mapa do armazém em coordenadas X, Y, Z, com cada posição numa grade em React e alerta para pallets em posição inconsistente.",
    mobile: {
      stack: "C# · .NET · SQL Server · React",
      blurb: "Mapa X, Y, Z do armazém de uma grande fabricante de calçados.",
    },
    github: null,
  },
  {
    id: "leitor-rfid",
    name: "leitor-rfid",
    experienceId: "box3-software",
    stack: "React · TypeScript · Tailwind",
    stackShort: "React · RFID",
    blurb:
      "Front-end completo da leitura de tags RFID dos pallets, usado no chão de fábrica de uma grande fabricante de calçados nos coletores Zebra e nos leitores de pulso.",
    mobile: {
      stack: "React · TS · Tailwind",
      blurb: "Leitura RFID de pallets em coletores Zebra e leitores de pulso.",
    },
    github: null,
  },
  {
    id: "rateio-pagamentos",
    name: "rateio-pagamentos",
    experienceId: "box3-software",
    stack: "C# · .NET · React · TypeScript",
    stackShort: "C# · React",
    blurb:
      "Rateio de pagamentos recorrentes: regra de negócio no back-end e interface em React, com persistência precisa dos percentuais.",
    mobile: {
      stack: "C# · .NET · React · TS",
      blurb: "Rateio de pagamentos recorrentes, da regra de negócio à interface.",
    },
    github: null,
  },
  {
    id: "update-notification",
    name: "update-notification",
    experienceId: "box3-software",
    stack: "ASP.NET Core · EF Core · SQLite · React",
    stackShort: "C# · SQLite",
    blurb:
      "API em ASP.NET Core que registra cada versão do sistema e suas novidades, sem versões duplicadas; o cliente em React mostra o changelog com seletor de versões.",
    mobile: {
      stack: "ASP.NET Core · SQLite · React",
      blurb: "API de versões e novidades, com changelog navegável em React.",
    },
    github: null,
  },
  {
    id: "chamados-app",
    name: "chamados-app",
    experienceId: "box3-software",
    stack: "React · TypeScript · Vite · Axios",
    stackShort: "React · Vite",
    blurb:
      "O teste técnico que abriu a porta da Box3: chamados e atendimentos com login JWT, rotas protegidas, filtros no back-end, autocomplete assíncrono e geolocalização no cadastro.",
    mobile: {
      stack: "React · TS · Vite · Axios",
      blurb: "O teste técnico que abriu a porta da Box3: chamados com JWT e filtros.",
    },
    github: `${GITHUB}/Teste-frontend-Box3`,
  },
  {
    id: "technical-assistance",
    name: "technical-assistance",
    experienceId: null,
    stack: "Node.js · Express · MongoDB · JWT",
    stackShort: "Node · Mongo",
    blurb:
      "API REST para assistência técnica: entrada de aparelhos com foto, orçamentos, relatório em PDF, login com código por e-mail (2FA), log de requisições e documentação em Swagger.",
    mobile: {
      stack: "Node · Express · MongoDB",
      blurb: "API de assistência técnica com 2FA por e-mail e relatório em PDF.",
    },
    github: `${GITHUB}/Technical-assistance`,
  },
  {
    id: "back-end-mercado",
    name: "back-end-mercado",
    experienceId: null,
    stack: "Node.js · Express · PostgreSQL · JWT",
    stackShort: "Node · Postgres",
    blurb:
      "API do supermercado online: catálogo, pedidos e rotas de admin, com validação de entrada, senhas com bcrypt, Helmet e CORS restrito. Feita na disciplina de Web 1 e publicada no Render.",
    mobile: {
      stack: "Node · Express · PostgreSQL",
      blurb: "API do supermercado online com pedidos, admin e deploy no Render.",
    },
    github: `${GITHUB}/back-end-mercado`,
  },
  {
    id: "front-mercado",
    name: "front-mercado",
    experienceId: null,
    stack: "React 19 · TypeScript · Tailwind",
    stackShort: "React · Tailwind",
    blurb:
      "Loja do supermercado online consumindo a API: catálogo por categoria, ofertas, carrinho, checkout e área do cliente com histórico de pedidos. Publicada na Vercel.",
    mobile: {
      stack: "React 19 · TS · Tailwind",
      blurb: "Loja do supermercado com carrinho, checkout e área do cliente.",
    },
    github: `${GITHUB}/projeto-front-mercado`,
  },
  {
    id: "portfolio",
    name: "portfolio",
    experienceId: null,
    stack: "React 19 · TanStack · Three.js",
    stackShort: "React · Three",
    blurb:
      "Este site: estética CRT, cena 3D em Three.js, SSR com TanStack Start e deploy automático na Cloudflare Workers, com lint estrito e testes no CI.",
    mobile: {
      stack: "React 19 · TanStack · Three.js",
      blurb: "Este site — estética CRT e cena 3D.",
    },
    github: `${GITHUB}/portfolio`,
  },
];
