import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useAnyInView } from "./useAnyInView";

type Callback = (entries: Array<{ target: Element; isIntersecting: boolean }>) => void;

describe("useAnyInView", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    document.body.innerHTML = "";
  });

  it("acompanha se algum alvo está visível", () => {
    let notify: Callback = () => {};
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        constructor(callback: Callback) {
          notify = callback;
        }
        observe() {}
        disconnect() {}
      },
    );
    const target = document.createElement("section");
    target.dataset.alvo = "";
    document.body.appendChild(target);

    const { result } = renderHook(() => useAnyInView("[data-alvo]"));
    expect(result.current).toBe(false);

    act(() => notify([{ target, isIntersecting: true }]));
    expect(result.current).toBe(true);

    act(() => notify([{ target, isIntersecting: false }]));
    expect(result.current).toBe(false);
  });
});
