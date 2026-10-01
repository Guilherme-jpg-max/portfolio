import type { Education, Experience, ResumeProject } from "./types";

export const summary =
  "Estudante do 7º semestre de Sistemas de Informação no IFCE, com propósito de construir soluções de software que resolvam problemas reais de negócio. Atuei recentemente como Desenvolvedor Full Stack na Box3 Software, trabalhando com C#, .NET e React/TypeScript no desenvolvimento de sistemas desde o levantamento de requisitos com usuários finais até a entrega de funcionalidades do back-end ao front-end. Antes disso, atuei como Tutor de Programação na Kodland Brasil, ensinando lógica de programação e Python. Tenho também uma trajetória anterior em atendimento ao cliente e gestão administrativa, que me deu uma base sólida em comunicação, resolução de conflitos e organização. Busco novas oportunidades para continuar crescendo como desenvolvedor full stack em times que valorizem código bem estruturado, aprendizado constante e colaboração.";

export const stack: Record<string, string[]> = {
  "back-end": ["C#", ".NET (Core/Framework)", "Entity Framework", "REST APIs", "Dapper"],
  "front-end": ["React.js", "TypeScript", "JavaScript (ES6+)", "TailwindCSS"],
  "banco de dados": ["PostgreSQL", "MySQL", "SQLite", "Otimização de queries"],
  ferramentas: ["Git/GitHub", "Versionamento de código", "Axios", "TailwindCSS"],
};

export const experiences: Experience[] = [
  {
    role: "Desenvolvedor Full Stack",
    company: "Box3 Software",
    tag: "Estágio",
    period: "out/2025 – jul/2026",
    highlight: true,
    bullets: [
      "Atuação presencial com clientes para compreender o uso real do sistema, mapear fluxos de trabalho e coletar requisitos diretos com usuários finais.",
      "Desenvolvimento do módulo de georreferenciamento fabril, com lógica de coordenadas cartesianas (X, Y, Z) e integração com PostgreSQL e APIs em C#.",
      "Implementação completa da funcionalidade de rateio de pagamentos recorrentes, do back-end à interface front-end.",
      "Refatoração de código legado em jQuery para React/TypeScript, elevando a performance de carregamento em 40%.",
      "Participação ativa na correção de bugs críticos via Backoffice, garantindo 99,5% de estabilidade operacional.",
    ],
  },
  {
    role: "Tutor de Programação",
    company: "Kodland Brasil",
    tag: null,
    period: "ago/2025 – set/2025",
    highlight: false,
    bullets: [
      "Ensino de lógica de programação e Python para diferentes faixas etárias, com foco em didática e comunicação técnica simplificada.",
    ],
  },
  {
    role: "Atendente / Administrativo",
    company: "M A Romão Costa LTDA",
    tag: null,
    period: "mar/2023 – nov/2024",
    highlight: false,
    bullets: [
      "Desenvolvimento de soft skills em resolução de conflitos, comunicação interpessoal e relacionamento com cliente.",
      "Responsabilidade pela gestão de fluxo de caixa e conciliações bancárias diárias.",
    ],
  },
];

export const resumeProjects: ResumeProject[] = [
  {
    name: "UpdateNotification Ecosystem",
    tag: "Interno · Box3",
    stack: "C#, .NET, SQLite, React, TypeScript",
    bullets: [
      "Desenvolvimento de solução completa (API + Client) para gerenciamento de notificações de atualização de software.",
      "Back-end robusto em C# para controle de versões e disparo inteligente de alertas com logging.",
      "Interface responsiva para visualização de histórico de releases e status.",
    ],
  },
  {
    name: "Teste Técnico Box3 — Consumo de API",
    tag: null,
    stack: "React, Axios, TailwindCSS",
    bullets: [
      "Aplicação desenvolvida para demonstrar proficiência em chamadas assíncronas, tratamento robusto de erros e consumo de dados externos.",
      "Implementação de layout responsivo e componentização eficiente para reutilização de código.",
    ],
  },
  {
    name: "App de Leitura de Códigos de Barras de Pallets/Caixas",
    tag: null,
    stack: "React, TailwindCSS, Axios, Responsive Design",
    bullets: [
      "Aplicação web para leitura e processamento de códigos de barras e tags RFID de pallets/caixas.",
      "Compatibilidade com múltiplos dispositivos, como smartphones Android, smartwatches e scanners portáteis.",
      "Interface otimizada com TailwindCSS e integração de APIs via Axios para sincronização de dados em tempo real.",
    ],
  },
];

export const education: Education = {
  degree: "Bacharelado em Sistemas de Informação",
  institution: "Instituto Federal de Ciência e Tecnologia do Ceará (IFCE) — Crato, CE",
  graduation: "Previsão de formatura: dez/2026",
  note: "Atividade recente: desenvolvimento de TCC focado em Sistema de Georreferenciamento para Monitoramento de Anomalias e Gestão de Zonas de Manejo na Irrigação por Gotejamento da Bananicultura.",
};

export const competencies = [
  "Comunicação clara e objetiva, com facilidade para transmitir conceitos técnicos.",
  "Rapidez e autonomia para aprender novas tecnologias e metodologias.",
  "Proatividade para identificar melhorias, refatorar código legado e propor soluções otimizadas.",
  "Colaboração em equipes multifuncionais e ambientes remotos.",
];

export const languages = [
  "Português — nativo",
  "Inglês — intermediário (boa leitura técnica e escrita de documentações)",
];
