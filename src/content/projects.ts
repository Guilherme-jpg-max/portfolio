import type { Project } from "./types";

/** Projetos exibidos na home, do mais recente para o mais antigo. */
export const projects: Project[] = [
  {
    id: "01",
    name: "geo-fabril",
    stack: "C# · .NET · PostgreSQL",
    blurb:
      "Módulo de georreferenciamento fabril para mapeamento de estoque e produção. Lógica de coordenadas cartesianas (X, Y, Z) sobre APIs em C#.",
    status: "Interno Box3 Software",
    github: null,
  },
  {
    id: "02",
    name: "rateio-pagamentos",
    stack: "C# · .NET · React · TypeScript",
    blurb:
      "Funcionalidade de rateio de pagamentos recorrentes para um módulo financeiro. Regras de negócio no backend com frontend interativo em React, com persistência precisa dos percentuais.",
    status: "Interno Box3 Software",
    github: null,
  },
  {
    id: "03",
    name: "update-notification",
    stack: "C# · .NET · SQLite · React",
    blurb:
      "Ecossistema completo de API + cliente para notificação de atualizações de software: controle de versões, disparo inteligente de alertas com log e um painel de histórico de releases.",
    status: "Interno Box3 Software",
    github: null,
  },
  {
    id: "04",
    name: "technical-assistance",
    stack: "Node.js · Express · MongoDB Atlas · Mongoose · JWT",
    blurb:
      "API REST para gerenciamento de uma assistência técnica, com controle de entrada de aparelhos, orçamentos e autenticação com segundo fator de segurança.",
    status: "Faculdade",
    github: "https://github.com/Guilherme-jpg-max/Technical-assistance",
  },
  {
    id: "05",
    name: "Portfolio",
    stack: "React 19 · TypeScript · TanStack Router · Tailwind v4",
    blurb:
      "Site pessoal com estética dark CRT/terminal, construído para reunir e apresentar meus projetos de forma direta e com identidade visual própria.",
    status: "Pessoal",
    github: "https://github.com/Guilherme-jpg-max/portfolio",
  },
  {
    id: "06",
    name: "chamados-app",
    stack: "React · TypeScript · Vite · React Router v6 · Axios · React Select",
    blurb:
      "Teste técnico para vaga de estágio front-end: sistema de gerenciamento de chamados com autenticação JWT, listagem paginada, filtros, criação de registros e autocomplete assíncrono consumindo API REST.",
    status: "Teste de estágio",
    github: "https://github.com/Guilherme-jpg-max/Teste-frontend-Box3",
  },
  {
    id: "07",
    name: "projeto-front-mercado",
    stack: "React 19 · TypeScript · Vite · Tailwind CSS · Axios · React Router",
    blurb:
      "Frontend de e-commerce de supermercado, com listagem de produtos, ofertas, página de detalhes, conta do usuário e notificações via toast, consumindo a API REST do backend.",
    status: "Pessoal",
    github: "https://github.com/Guilherme-jpg-max/projeto-front-mercado",
  },
  {
    id: "08",
    name: "back-end-mercado",
    stack: "Node.js · Express · PostgreSQL · JWT · Bcrypt",
    blurb:
      "API REST completa para sistema de supermercado, com autenticação JWT, catálogo de produtos, carrinho e pedidos, painel administrativo com dashboard de estatísticas e proteção de rotas por papel.",
    status: "Pessoal",
    github: "https://github.com/Guilherme-jpg-max/back-end-mercado",
  },
];
