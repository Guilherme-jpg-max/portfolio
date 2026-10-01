import type { SkillGroup } from "./types";

/** Resumo de skills exibido na home (o currículo tem a stack detalhada). */
export const skillGroups: SkillGroup[] = [
  {
    label: "linguagens",
    items: ["C#", "typescript", "JavaScript", "python"],
  },
  {
    label: "frameworks",
    items: [".NET", "ASP NET CORE", "entity framework", "react", "tailwindcss"],
  },
  {
    label: "dados/infra",
    items: ["postgresql", "mysql", "sqlite", "dapper", "REST APIs"],
  },
];
