import { describe, expect, it } from "vitest";
import { planFlight } from "./flight";

describe("planFlight", () => {
  it("centra o disquete no item clicado e aponta para o centro do drive", () => {
    const spine = { left: 900, top: 200, width: 400, height: 40 };
    const slot = { left: 100, top: 500, width: 200, height: 30 };
    expect(planFlight(spine, slot, { width: 92, height: 96 })).toEqual({
      left: 1100 - 46,
      top: 220 - 48,
      dx: 200 - 1100,
      dy: 515 - 220,
    });
  });
});
