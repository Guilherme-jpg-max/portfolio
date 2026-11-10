import type { Experience, Project, SidePhase } from "@/content/types";
import { compareNewestFirst, formatJourneyPeriod } from "@/lib/period";

export type JourneyPhase = {
  id: string;
  company: string;
  shortName: string;
  /** Cargo mostrado na tela do PC (`cat cargo.txt`). */
  cargo: string;
  /** Linha abaixo da empresa na linha do tempo. */
  roleLine: string;
  periodLabel: string;
  yearLabel: string;
  current: boolean;
  summary: string;
  projects: Project[];
};

/**
 * A fase pessoal abre a linha do tempo; as experiências seguem da mais antiga
 * até a atual, cada uma com os projetos que apontam para ela.
 */
export function buildPhases(
  experiences: readonly Experience[],
  projects: readonly Project[],
  side: SidePhase,
): JourneyPhase[] {
  const projectsOf = (experienceId: string | null) =>
    projects.filter((project) => project.experienceId === experienceId);

  const chronological = [...experiences].sort((a, b) => compareNewestFirst(b, a));

  return [
    {
      id: side.id,
      company: side.company,
      shortName: side.shortName,
      cargo: side.role,
      roleLine: side.role,
      periodLabel: side.periodLabel,
      yearLabel: side.yearLabel,
      current: false,
      summary: side.summary,
      projects: projectsOf(null),
    },
    ...chronological.map((experience): JourneyPhase => {
      const current = experience.end === null;
      const cargo = experience.tag ? `${experience.role} · ${experience.tag}` : experience.role;
      return {
        id: experience.id,
        company: experience.company,
        shortName: experience.shortName,
        cargo,
        roleLine: current ? `${cargo} · atual` : cargo,
        periodLabel: formatJourneyPeriod(experience.start, experience.end),
        yearLabel: experience.start.slice(0, 4),
        current,
        summary: experience.summary,
        projects: projectsOf(experience.id),
      };
    }),
  ];
}

/** Abre na experiência atual; sem atual, na última fase. */
export function initialPhaseId(phases: readonly JourneyPhase[]): string {
  return (phases.find((phase) => phase.current) ?? phases[phases.length - 1]).id;
}
