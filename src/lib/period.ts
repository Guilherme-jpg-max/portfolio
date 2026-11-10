import type { YearMonth } from "@/content/types";

const MONTHS = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

function parse(value: YearMonth): { year: number; month: string } {
  const [year, month] = value.split("-").map(Number);
  return { year, month: MONTHS[month - 1] };
}

/** Currículo: `out/2025 – jul/2026`, `jun/2026 – atual`. */
export function formatResumePeriod(start: YearMonth, end: YearMonth | null): string {
  const from = parse(start);
  if (end === null) return `${from.month}/${from.year} – atual`;
  const to = parse(end);
  return `${from.month}/${from.year} – ${to.month}/${to.year}`;
}

/** Linha do tempo da jornada: `out 2025 — jul 2026`, `ago — set 2025`, `jun 2026 — hoje`. */
export function formatJourneyPeriod(start: YearMonth, end: YearMonth | null): string {
  const from = parse(start);
  if (end === null) return `${from.month} ${from.year} — hoje`;
  const to = parse(end);
  if (from.year === to.year) return `${from.month} — ${to.month} ${to.year}`;
  return `${from.month} ${from.year} — ${to.month} ${to.year}`;
}

/** Mais recente primeiro; a experiência atual (`end: null`) vem antes de todas. */
export function compareNewestFirst(
  a: { start: YearMonth; end: YearMonth | null },
  b: { start: YearMonth; end: YearMonth | null },
): number {
  if ((a.end === null) !== (b.end === null)) return a.end === null ? -1 : 1;
  return b.start.localeCompare(a.start);
}
