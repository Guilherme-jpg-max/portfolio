import type { Project } from "./types";

const GITHUB = "https://github.com/Guilherme-jpg-max";

export const projects: Project[] = [
  {
    id: "sistema-fechamento",
    name: "sistema-fechamento",
    experienceId: "maria-pitanga",
    stack: "React · TypeScript · Tailwind · Workers · D1",
    stackShort: "React · D1",
    blurb:
      "Fechamento mensal das 4 unidades — entradas, despesas, estoque, folha e metas — num só lugar, substituindo planilhas manuais.",
    mobile: {
      stack: "React · TS · Workers · D1",
      blurb: "Fechamento mensal das 4 unidades num só lugar, substituindo planilhas manuais.",
    },
    github: null,
  },
  {
    id: "geo-fabril",
    name: "geo-fabril",
    experienceId: "box3-software",
    stack: "C# · .NET · PostgreSQL",
    stackShort: "C# · Postgres",
    blurb:
      "Módulo de georreferenciamento fabril para mapear estoque e produção, com coordenadas cartesianas (X, Y, Z) sobre APIs em C#.",
    mobile: {
      stack: "C# · .NET · PostgreSQL",
      blurb: "Georreferenciamento fabril com coordenadas X, Y, Z para mapear estoque e produção.",
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
    stack: "C# · .NET · SQLite · React",
    stackShort: "C# · SQLite",
    blurb:
      "API + cliente para controle de versões, alertas de atualização com log e painel de histórico de releases.",
    mobile: {
      stack: "C# · .NET · SQLite · React",
      blurb: "API + cliente para controle de versões e alertas de atualização.",
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
      "O teste técnico que abriu a porta da Box3: gestão de chamados com JWT, paginação, filtros e autocomplete assíncrono.",
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
      "API REST para assistência técnica: entrada de aparelhos, orçamentos e autenticação com segundo fator.",
    mobile: {
      stack: "Node · Express · MongoDB",
      blurb: "API de assistência técnica com segundo fator de autenticação.",
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
      "API de supermercado com catálogo, carrinho, pedidos e painel administrativo com dashboard.",
    mobile: {
      stack: "Node · Express · PostgreSQL",
      blurb: "API de supermercado com carrinho, pedidos e painel admin.",
    },
    github: `${GITHUB}/back-end-mercado`,
  },
  {
    id: "front-mercado",
    name: "front-mercado",
    experienceId: null,
    stack: "React 19 · TypeScript · Tailwind",
    stackShort: "React · Tailwind",
    blurb: "Front do e-commerce de supermercado: produtos, ofertas, detalhes e conta do usuário.",
    mobile: {
      stack: "React 19 · TS · Tailwind",
      blurb: "Front do e-commerce de supermercado consumindo a API.",
    },
    github: `${GITHUB}/projeto-front-mercado`,
  },
  {
    id: "portfolio",
    name: "portfolio",
    experienceId: null,
    stack: "React 19 · TanStack · Three.js",
    stackShort: "React · Three",
    blurb: "Este site — estética CRT, cena 3D e deploy na Cloudflare Workers.",
    mobile: {
      stack: "React 19 · TanStack · Three.js",
      blurb: "Este site — estética CRT e cena 3D.",
    },
    github: `${GITHUB}/portfolio`,
  },
];
