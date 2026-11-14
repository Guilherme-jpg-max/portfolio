import type { SidePhase } from "./types";

export const journeyCopy = {
  kicker: "// 03 — jornada",
  title: "Experiência.",
  intro:
    "Cada fase da minha carreira guarda uma caixa de disquetes, um para cada projeto. Escolha uma fase, insira um disquete no computador e leia o README do projeto.",
  steps: ["Escolha a fase", "Insira um disquete"],
  mobileHint: "Toque numa fase e depois num disquete",
} as const;

/** Abre a linha do tempo e guarda os projetos com `experienceId: null`. */
export const sidePhase: SidePhase = {
  id: "pessoais",
  company: "Pessoais & IFCE",
  shortName: "Pessoais & IFCE",
  role: "faculdade e projetos próprios",
  periodLabel: "desde 2023",
  yearLabel: "2023+",
  summary: "Projetos da faculdade (IFCE) e estudos por conta própria.",
};
