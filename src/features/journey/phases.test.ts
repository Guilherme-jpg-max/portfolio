import { describe, expect, it } from "vitest";
import type { Experience, Project, SidePhase } from "@/content/types";
import { buildPhases, initialPhaseId } from "./phases";

const side: SidePhase = {
  id: "pessoais",
  company: "Pessoais & IFCE",
  shortName: "Pessoais",
  role: "faculdade",
  periodLabel: "desde 2023",
  yearLabel: "2023+",
  summary: "estudos",
};

function experience(id: string, start: Experience["start"], end: Experience["end"]): Experience {
  return {
    id,
    role: `cargo ${id}`,
    company: `Empresa ${id}`,
    shortName: id,
    tag: null,
    start,
    end,
    highlight: false,
    summary: `resumo ${id}`,
    bullets: [],
  };
}

function project(id: string, experienceId: string | null): Project {
  return { id, name: id, experienceId, stack: "", stackShort: "", blurb: "", github: null };
}

describe("buildPhases", () => {
  const experiences = [
    experience("atual", "2026-06", null),
    experience("antiga", "2023-03", "2024-11"),
    experience("meio", "2025-10", "2026-07"),
  ];

  it("abre com a fase pessoal e segue da experiência mais antiga até a atual", () => {
    const phases = buildPhases(experiences, [], side);
    expect(phases.map((phase) => phase.id)).toEqual(["pessoais", "antiga", "meio", "atual"]);
  });

  it("agrupa os projetos pela experiência, mantendo a ordem do arquivo", () => {
    const projects = [
      project("p1", "meio"),
      project("solto", null),
      project("p2", "meio"),
      project("p3", "atual"),
    ];
    const byId = Object.fromEntries(
      buildPhases(experiences, projects, side).map((phase) => [
        phase.id,
        phase.projects.map((p) => p.id),
      ]),
    );
    expect(byId).toEqual({ pessoais: ["solto"], antiga: [], meio: ["p1", "p2"], atual: ["p3"] });
  });

  it("marca a experiência atual na linha do tempo", () => {
    const phases = buildPhases(experiences, [], side);
    const current = phases.find((phase) => phase.current);
    expect(current?.id).toBe("atual");
    expect(current?.roleLine).toBe("cargo atual · atual");
    expect(current?.periodLabel).toBe("jun 2026 — hoje");
  });

  it("junta a tag ao cargo", () => {
    const withTag = { ...experience("estagio", "2025-10", "2026-07"), tag: "Estágio" };
    const [, phase] = buildPhases([withTag], [], side);
    expect(phase.cargo).toBe("cargo estagio · Estágio");
    expect(phase.yearLabel).toBe("2025");
  });
});

describe("initialPhaseId", () => {
  it("começa na experiência atual", () => {
    const phases = buildPhases(
      [experience("atual", "2026-06", null), experience("antiga", "2023-03", "2024-11")],
      [],
      side,
    );
    expect(initialPhaseId(phases)).toBe("atual");
  });

  it("sem experiência atual, começa na última fase", () => {
    const phases = buildPhases([experience("antiga", "2023-03", "2024-11")], [], side);
    expect(initialPhaseId(phases)).toBe("antiga");
  });
});
