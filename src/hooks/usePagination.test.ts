import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getTotalPages, pageFromRatio, usePagination } from "./usePagination";

const items = ["a", "b", "c", "d", "e", "f", "g", "h"];

describe("getTotalPages", () => {
  it("arredonda para cima", () => {
    expect(getTotalPages(8, 4)).toBe(2);
    expect(getTotalPages(9, 4)).toBe(3);
  });

  it("nunca retorna menos de uma página", () => {
    expect(getTotalPages(0, 4)).toBe(1);
  });
});

describe("pageFromRatio", () => {
  it("mapeia a posição na barra para a página", () => {
    expect(pageFromRatio(0, 4)).toBe(0);
    expect(pageFromRatio(0.3, 4)).toBe(1);
    expect(pageFromRatio(0.99, 4)).toBe(3);
  });
});

describe("usePagination", () => {
  it("começa na primeira página com os primeiros itens", () => {
    const { result } = renderHook(() => usePagination(items, 4));
    expect(result.current.currentPage).toBe(0);
    expect(result.current.totalPages).toBe(2);
    expect(result.current.pageItems).toEqual(["a", "b", "c", "d"]);
  });

  it("avança e volta sem sair do intervalo", () => {
    const { result } = renderHook(() => usePagination(items, 4));

    act(() => result.current.next());
    expect(result.current.pageItems).toEqual(["e", "f", "g", "h"]);

    act(() => result.current.next());
    expect(result.current.currentPage).toBe(1);

    act(() => result.current.prev());
    act(() => result.current.prev());
    expect(result.current.currentPage).toBe(0);
  });

  it("limita saltos fora do intervalo", () => {
    const { result } = renderHook(() => usePagination(items, 2));
    act(() => result.current.goTo(99));
    expect(result.current.currentPage).toBe(3);
    act(() => result.current.goTo(-5));
    expect(result.current.currentPage).toBe(0);
  });

  it("ajusta a página atual quando o tamanho da página aumenta", () => {
    const { result, rerender } = renderHook(({ size }) => usePagination(items, size), {
      initialProps: { size: 2 },
    });
    act(() => result.current.goTo(3));
    expect(result.current.currentPage).toBe(3);

    rerender({ size: 4 });
    expect(result.current.currentPage).toBe(1);
    expect(result.current.pageItems).toEqual(["e", "f", "g", "h"]);

    // A navegação continua a partir da página exibida, não da antiga.
    act(() => result.current.prev());
    expect(result.current.currentPage).toBe(0);
  });
});
