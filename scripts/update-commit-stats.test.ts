import { describe, expect, it } from "vitest";
import { buildYearlyQuery, sumYearlyTotals } from "./update-commit-stats";

describe("buildYearlyQuery", () => {
  const now = new Date("2026-10-01T12:00:00.000Z");

  it("cria um alias por ano cobrindo o ano inteiro", () => {
    const query = buildYearlyQuery([2024, 2025], now);
    expect(query).toContain(
      'y2024: contributionsCollection(from: "2024-01-01T00:00:00Z", to: "2024-12-31T23:59:59Z")',
    );
    expect(query).toContain('y2025: contributionsCollection(from: "2025-01-01T00:00:00Z"');
  });

  it("encerra o ano corrente no momento atual", () => {
    const query = buildYearlyQuery([2026], now);
    expect(query).toContain(
      'contributionsCollection(from: "2026-01-01T00:00:00Z", to: "2026-10-01T12:00:00.000Z")',
    );
  });
});

describe("sumYearlyTotals", () => {
  it("soma o total de todos os anos", () => {
    const year = (n: number) => ({ contributionCalendar: { totalContributions: n } });
    expect(sumYearlyTotals({ y2024: year(120), y2025: year(300), y2026: year(70) })).toBe(490);
  });
});
