import { describe, expect, it } from "vitest";
import { crateCount, crateHint, railPosition } from "./labels";

describe("rótulos da jornada", () => {
  it("conta os disquetes da caixa", () => {
    expect(crateCount(0)).toBe("vazia");
    expect(crateCount(1)).toBe("1 disquete");
    expect(crateCount(4)).toBe("4 disquetes");
  });

  it("só sugere arrastar quando a caixa passa de 3 disquetes", () => {
    expect(crateHint(0)).toBe("");
    expect(crateHint(3)).toBe("toque no disquete para ler no PC");
    expect(crateHint(4)).toBe("← arraste a caixa para ver todos →");
  });

  it("centraliza o indicador na coluna da fase", () => {
    expect(railPosition(0, 5)).toBe("10%");
    expect(railPosition(4, 5)).toBe("90%");
  });
});
