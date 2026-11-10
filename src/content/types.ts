import type { LinkProps } from "@tanstack/react-router";

/** Mês no formato `AAAA-MM`, ex.: `"2025-10"`. */
export type YearMonth = `${number}-${number}`;

export type Project = {
  id: string;
  name: string;
  /** `id` da experiência em que o projeto foi feito; `null` = Pessoais & IFCE. */
  experienceId: string | null;
  stack: string;
  /** Versão curta da stack, usada na etiqueta do disquete. */
  stackShort: string;
  blurb: string;
  /** Textos mais curtos para a tela do PC no celular; sem eles, usa `stack` e `blurb`. */
  mobile?: { stack: string; blurb: string };
  github: string | null;
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export type ChannelKind = "whatsapp" | "linkedin" | "github" | "resume";

export type Channel = {
  id: string;
  kind: ChannelKind;
  label: string;
  detail: string;
} & ({ href: string; to?: never } | { to: LinkProps["to"]; href?: never });

export type Experience = {
  /** Identificador único; vira a pasta no terminal da jornada (`~/box3-software`). */
  id: string;
  role: string;
  company: string;
  /** Nome curto para a linha do tempo no celular. */
  shortName: string;
  tag: string | null;
  start: YearMonth;
  /** `null` = experiência atual. */
  end: YearMonth | null;
  highlight: boolean;
  /** Uma frase mostrada na tela do PC quando a fase não tem projetos. */
  summary: string;
  bullets: string[];
};

/** Fase da jornada que não é uma experiência profissional (faculdade e projetos próprios). */
export type SidePhase = {
  id: string;
  company: string;
  shortName: string;
  role: string;
  periodLabel: string;
  yearLabel: string;
  summary: string;
};

export type ResumeProject = {
  name: string;
  tag: string | null;
  stack: string;
  bullets: string[];
};

export type Education = {
  degree: string;
  institution: string;
  graduation: string;
  note: string;
};
