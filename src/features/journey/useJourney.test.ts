import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Project } from "@/content/types";
import type { JourneyPhase } from "./phases";
import { useJourney } from "./useJourney";

const project: Project = {
  id: "app",
  name: "app",
  experienceId: "atual",
  stack: "React",
  stackShort: "React",
  blurb: "Um app.",
  github: "https://github.com/u/app",
};

function phase(id: string, current: boolean, projects: Project[] = []): JourneyPhase {
  return {
    id,
    company: id,
    shortName: id,
    cargo: "cargo",
    roleLine: "cargo",
    periodLabel: "2025",
    yearLabel: "2025",
    current,
    summary: "resumo",
    projects,
  };
}

const phases = [phase("antiga", false), phase("atual", true, [project])];

/** Avança em passos pequenos para o React renderizar e agendar o próximo timer da animação. */
function advance(ms: number, step = 10) {
  for (let t = 0; t < ms; t += step) act(() => void vi.advanceTimersByTime(step));
}

describe("useJourney", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("abre na fase atual com a tela completa", () => {
    const { result } = renderHook(() =>
      useJourney(phases, { compact: true, reducedMotion: false }),
    );
    expect(result.current.phase.id).toBe("atual");
    expect(result.current.screenDone).toBe(true);
  });

  it("ao trocar de fase, digita a tela nova até o fim", () => {
    const { result } = renderHook(() =>
      useJourney(phases, { compact: true, reducedMotion: false }),
    );
    act(() => result.current.select("antiga"));
    expect(result.current.screen).toEqual([]);

    advance(5000);
    expect(result.current.screenDone).toBe(true);
    expect(result.current.screen.at(-1)?.text).toBe("  resumo");
  });

  it("insere o disquete, lê e abre o README", () => {
    const { result } = renderHook(() =>
      useJourney(phases, { compact: true, reducedMotion: false }),
    );
    act(() => result.current.insert(0));
    expect(result.current.state.mode).toBe("reading");
    expect(result.current.screenDone).toBe(false);

    advance(5000);
    expect(result.current.state.mode).toBe("readme");
    expect(result.current.disk?.id).toBe("app");
    expect(result.current.screenDone).toBe(true);
  });

  it("com movimento reduzido, não usa timers", () => {
    const { result } = renderHook(() => useJourney(phases, { compact: true, reducedMotion: true }));
    act(() => result.current.insert(0));
    expect(result.current.state.mode).toBe("readme");
    expect(result.current.screenDone).toBe(true);
  });
});
