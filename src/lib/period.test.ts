import { describe, expect, it } from "vitest";
import { compareNewestFirst, formatJourneyPeriod, formatResumePeriod } from "./period";

describe("formatResumePeriod", () => {
  it("formata início e fim", () => {
    expect(formatResumePeriod("2025-10", "2026-07")).toBe("out/2025 – jul/2026");
  });

  it("marca a experiência atual", () => {
    expect(formatResumePeriod("2026-06", null)).toBe("jun/2026 – atual");
  });
});

describe("formatJourneyPeriod", () => {
  it("mostra os dois anos quando são diferentes", () => {
    expect(formatJourneyPeriod("2023-03", "2024-11")).toBe("mar 2023 — nov 2024");
  });

  it("junta o ano quando início e fim são no mesmo ano", () => {
    expect(formatJourneyPeriod("2025-08", "2025-09")).toBe("ago — set 2025");
  });

  it("usa 'hoje' para a experiência atual", () => {
    expect(formatJourneyPeriod("2026-06", null)).toBe("jun 2026 — hoje");
  });
});

describe("compareNewestFirst", () => {
  it("põe a atual primeiro e depois ordena pelo início, do mais recente", () => {
    const items = [
      { id: "a", start: "2023-03", end: "2024-11" },
      { id: "atual", start: "2020-01", end: null },
      { id: "b", start: "2025-10", end: "2026-07" },
    ] as const;
    expect([...items].sort(compareNewestFirst).map((item) => item.id)).toEqual(["atual", "b", "a"]);
  });
});
