import type { SidePhase } from "./types";

export const journeyCopy = {
  kicker: "// 03 — jornada",
  title: "Do balcão ao full stack.",
  steps: ["escolha a fase", "insira um disquete"],
  mobileHint: "toque numa fase · depois num disquete",
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
