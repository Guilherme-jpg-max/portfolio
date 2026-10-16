import type { SkillGroup } from "./types";

/** Resumo de skills exibido na home (o currículo tem a stack detalhada). */
export const skillGroups: SkillGroup[] = [
  {
    label: "linguagens",
    items: ["C#", "TypeScript", "JavaScript", "Python"],
  },
  {
    label: "frameworks",
    items: [".NET", "ASP.NET Core", "Entity Framework", "React", "Tailwind CSS"],
  },
  {
    label: "dados/infra",
    items: ["PostgreSQL", "MySQL", "SQLite", "Dapper", "REST APIs"],
  },
];
