import type { SkillGroup } from "./types";

export const skillGroups: SkillGroup[] = [
  {
    label: "linguagens",
    items: ["C#", "TypeScript", "JavaScript", "Python"],
  },
  {
    label: "frameworks",
    items: [
      ".NET",
      "ASP.NET Core",
      "Entity Framework",
      "Node.js",
      "Express",
      "Hono",
      "React",
      "Tailwind CSS",
    ],
  },
  {
    label: "dados/infra",
    items: [
      "SQL Server",
      "PostgreSQL",
      "MySQL",
      "SQLite",
      "MongoDB",
      "Dapper",
      "REST APIs",
      "Cloudflare Workers",
    ],
  },
];
