import { describe, expect, it } from "vitest";
import {
  TYPED_ALL,
  initialJourneyState,
  isTyping,
  journeyReducer,
  type JourneyAction,
  type JourneyState,
} from "./journeyMachine";
import { READ_STEPS } from "./terminal";

const run = (state: JourneyState, ...actions: JourneyAction[]) =>
  actions.reduce(journeyReducer, state);

describe("journeyReducer", () => {
  const start = initialJourneyState("box3");

  it("começa com a tela da fase já digitada", () => {
    expect(start).toMatchObject({ phaseId: "box3", mode: "phase", typed: TYPED_ALL });
    expect(isTyping(start)).toBe(false);
  });

  it("ao trocar de fase, pisca, faz as lombadas entrarem e digita do zero", () => {
    const next = run(start, { type: "select", phaseId: "kodland", instant: false });
    expect(next).toMatchObject({ phaseId: "kodland", flicker: true, entering: true, typed: 0 });
    expect(isTyping(next)).toBe(false);

    const typing = run(next, { type: "flickerDone" }, { type: "enterDone" });
    expect(isTyping(typing)).toBe(true);
  });

  it("ignora a fase que já está ativa", () => {
    expect(run(start, { type: "select", phaseId: "box3", instant: false })).toBe(start);
  });

  it("digita até o total e então marca a tela como completa", () => {
    let state = run(
      start,
      { type: "select", phaseId: "kodland", instant: false },
      { type: "flickerDone" },
    );
    state = run(state, { type: "typeTick", total: 2 });
    expect(state.typed).toBe(1);
    state = run(state, { type: "typeTick", total: 2 });
    expect(state.typed).toBe(TYPED_ALL);
  });

  it("inserir: voa, lê o disquete passo a passo e abre o README", () => {
    let state = run(start, { type: "insert", index: 2, instant: false });
    expect(state).toMatchObject({ inserted: 2, mode: "reading", flying: true, progress: 0 });

    state = run(state, { type: "readTick" });
    expect(state.progress).toBe(0);

    state = run(state, { type: "flyDone" });
    for (let i = 0; i < READ_STEPS; i++) state = run(state, { type: "readTick" });
    expect(state).toMatchObject({ mode: "reading", progress: READ_STEPS });

    state = run(state, { type: "readTick" });
    expect(state).toMatchObject({ mode: "readme", flicker: true, typed: 0 });
  });

  it("ejetar devolve o disquete e volta para a tela da fase", () => {
    const withDisk = run(start, { type: "insert", index: 0, instant: true });
    expect(withDisk).toMatchObject({ mode: "readme", inserted: 0 });

    const ejected = run(withDisk, { type: "eject", instant: false });
    expect(ejected).toMatchObject({
      mode: "phase",
      inserted: null,
      flicker: true,
      typed: TYPED_ALL,
    });
  });

  it("trocar de fase tira o disquete do drive", () => {
    const state = run(
      start,
      { type: "insert", index: 1, instant: true },
      { type: "select", phaseId: "kodland", instant: false },
    );
    expect(state).toMatchObject({ phaseId: "kodland", inserted: null, mode: "phase" });
  });

  it("com movimento reduzido, troca tudo na hora", () => {
    const selected = run(start, { type: "select", phaseId: "kodland", instant: true });
    expect(selected).toMatchObject({ flicker: false, entering: false, typed: TYPED_ALL });

    const inserted = run(selected, { type: "insert", index: 0, instant: true });
    expect(inserted).toMatchObject({ mode: "readme", flying: false, typed: TYPED_ALL });
  });
});
