import type { LinkProps } from "@tanstack/react-router";

export type Project = {
  id: string;
  name: string;
  stack: string;
  blurb: string;
  status: string;
  /** URL do repositório; `null` quando o código é privado. */
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
  role: string;
  company: string;
  tag: string | null;
  period: string;
  highlight: boolean;
  bullets: string[];
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
