import { describe, expect, it } from "vitest";
import type { Project } from "@/content/types";
import type { JourneyPhase } from "./phases";
import { OUTPUT_COST, TYPING_CURSOR, buildScreen, screenCost, typeScreen } from "./terminal";

const disk: Project = {
  id: "geo-fabril",
  name: "geo-fabril",
  experienceId: "box3",
  stack: "C# · .NET",
  stackShort: "C#",
  blurb: "Mapa da fábrica.",
  github: null,
};

const phase: JourneyPhase = {
  id: "box3",
  company: "Box3",
  shortName: "Box3",
  cargo: "Full Stack · Estágio",
  roleLine: "Full Stack · Estágio",
  periodLabel: "out 2025 — jul 2026",
  yearLabel: "2025",
  current: false,
  summary: "resumo",
  projects: [disk, { ...disk, id: "b", name: "rateio", github: "https://github.com/u/rateio" }],
};

const texts = (lines: { text: string }[]) => lines.map((line) => line.text);

describe("buildScreen", () => {
  it("na fase, entra na pasta, mostra o cargo e lista os disquetes", () => {
    const lines = buildScreen({ phase, mode: "phase", disk: null, progress: 0, compact: false });
    expect(texts(lines)).toEqual([
      "guilherme@jornada:~$ cd ~/box3",
      "~/box3$ cat cargo.txt",
      "  Full Stack · Estágio  ·  out 2025 — jul 2026",
      "~/box3$ ls disquetes/",
      "  geo-fabril   rateio",
      "",
      "  » insira um disquete da caixa para ler o README",
    ]);
  });

  it("sem projetos, mostra o resumo da fase", () => {
    const empty = { ...phase, projects: [] };
    const lines = buildScreen({
      phase: empty,
      mode: "phase",
      disk: null,
      progress: 0,
      compact: true,
    });
    expect(texts(lines)).toEqual([
      "$ cd ~/box3",
      "  Full Stack · Estágio",
      "  out 2025 — jul 2026",
      "$ cat resumo.txt",
      "  resumo",
    ]);
  });

  it("enquanto lê, mostra a barra de progresso", () => {
    const lines = buildScreen({ phase, mode: "reading", disk, progress: 4, compact: false });
    expect(lines[1].text).toBe("  lendo disquete A:  [████░░░░░░]  40%");
  });

  it("no README, diz se o código é privado ou público", () => {
    const priv = buildScreen({ phase, mode: "readme", disk, progress: 10, compact: false });
    expect(texts(priv)).toEqual([
      "~/box3$ cat geo-fabril/README.md",
      "# GEO-FABRIL",
      "stack  C# · .NET",
      "",
      "Mapa da fábrica.",
      "",
      "código  repositório privado (projeto interno)",
    ]);

    const pub = buildScreen({
      phase,
      mode: "readme",
      disk: phase.projects[1],
      progress: 10,
      compact: true,
    });
    expect(pub.at(-1)?.text).toBe("→ código público, botão abaixo");
  });

  it("no celular, usa os textos curtos quando o projeto tem", () => {
    const short = { ...disk, mobile: { stack: "C#", blurb: "Mapa." } };
    const lines = buildScreen({ phase, mode: "readme", disk: short, progress: 10, compact: true });
    expect(texts(lines).slice(2, 4)).toEqual(["C#", "Mapa."]);

    const full = buildScreen({ phase, mode: "readme", disk, progress: 10, compact: true });
    expect(texts(full).slice(2, 4)).toEqual(["C# · .NET", "Mapa da fábrica."]);
  });
});

describe("typeScreen", () => {
  const lines = buildScreen({ phase, mode: "reading", disk, progress: 0, compact: true });
  const commandLength = lines[0].text.length;

  it("digita o comando letra a letra, com cursor", () => {
    const { lines: visible, done } = typeScreen(lines, 3);
    expect(visible).toEqual([{ kind: "command", text: `$ m${TYPING_CURSOR}` }]);
    expect(done).toBe(false);
  });

  it("mostra a saída inteira de uma vez depois do comando", () => {
    const { lines: visible, done } = typeScreen(lines, commandLength + 1);
    expect(texts(visible)).toEqual(texts(lines));
    expect(done).toBe(false);
  });

  it("termina quando o orçamento cobre a tela toda", () => {
    expect(screenCost(lines)).toBe(commandLength + OUTPUT_COST);
    expect(typeScreen(lines, screenCost(lines)).done).toBe(true);
    expect(typeScreen(lines, Number.POSITIVE_INFINITY).lines).toEqual(lines);
  });

  it("não mostra nada antes de começar", () => {
    expect(typeScreen(lines, 0).lines).toEqual([]);
  });
});
