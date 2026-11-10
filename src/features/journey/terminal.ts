import type { Project } from "@/content/types";
import type { JourneyPhase } from "./phases";

export type ScreenMode = "phase" | "reading" | "readme";

/** `command` é digitado letra a letra; os demais aparecem de uma vez. */
export type LineKind = "command" | "output" | "title" | "accent";

export type ScreenLine = { kind: LineKind; text: string };

export type ScreenInput = {
  phase: JourneyPhase;
  mode: ScreenMode;
  disk: Project | null;
  /** Passos já lidos do disquete, de 0 a `READ_STEPS`. */
  progress: number;
  /** Tela do celular: comandos e textos mais curtos. */
  compact: boolean;
};

export const READ_STEPS = 10;
/** Custo, em "letras", de cada linha que não é comando. */
export const OUTPUT_COST = 3;
export const TYPING_CURSOR = "▊";

const command = (text: string): ScreenLine => ({ kind: "command", text });
const output = (text: string): ScreenLine => ({ kind: "output", text });

export function promptFor(phase: JourneyPhase, compact: boolean): string {
  return compact ? "$" : `~/${phase.id}$`;
}

function repoName(url: string): string {
  return url.split("/").pop() ?? url;
}

export function buildScreen({ phase, mode, disk, progress, compact }: ScreenInput): ScreenLine[] {
  const ps = promptFor(phase, compact);

  if (mode === "reading") {
    const steps = Math.min(Math.max(progress, 0), READ_STEPS);
    const bar = "█".repeat(steps) + "░".repeat(READ_STEPS - steps);
    const percent = `${steps * 10}%`;
    return [
      command(`${ps} mount /dev/fd0`),
      output(
        compact ? `  lendo A: [${bar}] ${percent}` : `  lendo disquete A:  [${bar}]  ${percent}`,
      ),
    ];
  }

  if (mode === "readme" && disk) {
    const code = disk.github
      ? compact
        ? "→ código público, botão abaixo"
        : `código  github.com/…/${repoName(disk.github)}  → botão abaixo`
      : compact
        ? "→ repositório privado"
        : "código  repositório privado (projeto interno)";
    const stack = compact ? (disk.mobile?.stack ?? disk.stack) : disk.stack;
    const blurb = compact ? (disk.mobile?.blurb ?? disk.blurb) : disk.blurb;
    const lines: ScreenLine[] = [
      command(compact ? "$ cat README.md" : `${ps} cat ${disk.name}/README.md`),
      { kind: "title", text: `# ${disk.name.toUpperCase()}` },
      { kind: "accent", text: compact ? stack : `stack  ${stack}` },
    ];
    if (!compact) lines.push(output(""));
    lines.push(output(blurb));
    if (!compact) lines.push(output(""));
    lines.push({ kind: "accent", text: code });
    return lines;
  }

  const lines: ScreenLine[] = compact
    ? [command(`$ cd ~/${phase.id}`), output(`  ${phase.cargo}`), output(`  ${phase.periodLabel}`)]
    : [
        command(`guilherme@jornada:~$ cd ~/${phase.id}`),
        command(`${ps} cat cargo.txt`),
        output(`  ${phase.cargo}  ·  ${phase.periodLabel}`),
      ];

  if (phase.projects.length === 0) {
    lines.push(command(`${ps} cat resumo.txt`), output(`  ${phase.summary}`));
    return lines;
  }

  const names = phase.projects.map((project) => project.name).join(compact ? "  " : "   ");
  lines.push(command(`${ps} ls disquetes/`), output(`  ${names}`));
  if (compact) {
    lines.push(output("  » toque num disquete abaixo"));
  } else {
    lines.push(output(""), output("  » insira um disquete da caixa para ler o README"));
  }
  return lines;
}

/** Quantas "letras" a digitação precisa para mostrar a tela inteira. */
export function screenCost(lines: readonly ScreenLine[]): number {
  return lines.reduce(
    (total, line) => total + (line.kind === "command" ? line.text.length : OUTPUT_COST),
    0,
  );
}

/** Mostra a tela até `typed` letras, com o cursor no fim do comando que está sendo digitado. */
export function typeScreen(
  lines: readonly ScreenLine[],
  typed: number,
): { lines: ScreenLine[]; done: boolean } {
  const visible: ScreenLine[] = [];
  let budget = typed;
  for (const line of lines) {
    if (budget <= 0) break;
    if (line.kind === "command") {
      const partial = budget < line.text.length;
      visible.push({
        ...line,
        text: partial ? line.text.slice(0, budget) + TYPING_CURSOR : line.text,
      });
      budget -= line.text.length;
    } else {
      visible.push(line);
      budget -= OUTPUT_COST;
    }
  }
  return { lines: visible, done: typed >= screenCost(lines) };
}
