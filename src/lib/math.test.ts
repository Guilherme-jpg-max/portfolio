import { describe, expect, it } from "vitest";
import { cx } from "./cx";
import { clamp } from "./math";

describe("clamp", () => {
  it("mantém valores dentro do intervalo", () => {
    expect(clamp(0.4, 0, 1)).toBe(0.4);
  });

  it("limita abaixo do mínimo e acima do máximo", () => {
    expect(clamp(-3, 0, 1)).toBe(0);
    expect(clamp(7, 0, 1)).toBe(1);
  });
});

describe("cx", () => {
  it("junta classes e ignora valores falsy", () => {
    expect(cx("a", false, "b", null, undefined, "c")).toBe("a b c");
  });

  it("não deixa espaços sobrando quando a última classe é condicional", () => {
    expect(cx("a", false)).toBe("a");
  });
});
