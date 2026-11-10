import { READ_STEPS, type ScreenMode } from "./terminal";

/** Ritmo das animações, em ms (o mesmo do mockup aprovado). */
export const JOURNEY_TIMING = {
  enter: 40,
  flicker: 150,
  fly: 650,
  readStep: 55,
  typeChar: 24,
  spineStagger: 70,
  spineDelay: 120,
} as const;

/** Tela inteira já digitada. */
export const TYPED_ALL = Number.POSITIVE_INFINITY;

export type JourneyState = {
  phaseId: string;
  mode: ScreenMode;
  /** Índice do projeto no drive, dentro da fase ativa. */
  inserted: number | null;
  flying: boolean;
  /** Letras já digitadas na tela; `TYPED_ALL` quando terminou. */
  typed: number;
  flicker: boolean;
  progress: number;
  /** Lombadas recém-trocadas, prestes a entrar na caixa. */
  entering: boolean;
};

export type JourneyAction =
  | { type: "select"; phaseId: string; instant: boolean }
  | { type: "insert"; index: number; instant: boolean }
  | { type: "eject"; instant: boolean }
  | { type: "enterDone" }
  | { type: "flickerDone" }
  | { type: "flyDone" }
  | { type: "readTick" }
  | { type: "typeTick"; total: number };

export function initialJourneyState(phaseId: string): JourneyState {
  return {
    phaseId,
    mode: "phase",
    inserted: null,
    flying: false,
    typed: TYPED_ALL,
    flicker: false,
    progress: 0,
    entering: false,
  };
}

export function isTyping(state: JourneyState): boolean {
  return state.typed !== TYPED_ALL && !state.flicker && state.mode !== "reading";
}

export function journeyReducer(state: JourneyState, action: JourneyAction): JourneyState {
  switch (action.type) {
    case "select":
      if (action.phaseId === state.phaseId) return state;
      if (action.instant) return initialJourneyState(action.phaseId);
      return {
        ...initialJourneyState(action.phaseId),
        typed: 0,
        flicker: true,
        entering: true,
      };

    case "insert":
      if (action.index === state.inserted) return state;
      if (action.instant) {
        return {
          ...state,
          inserted: action.index,
          mode: "readme",
          flying: false,
          typed: TYPED_ALL,
          flicker: false,
          progress: READ_STEPS,
        };
      }
      return {
        ...state,
        inserted: action.index,
        mode: "reading",
        flying: true,
        typed: TYPED_ALL,
        flicker: false,
        progress: 0,
      };

    case "eject":
      if (state.inserted === null) return state;
      return {
        ...state,
        inserted: null,
        mode: "phase",
        flying: false,
        typed: TYPED_ALL,
        flicker: !action.instant,
        progress: 0,
      };

    case "enterDone":
      return state.entering ? { ...state, entering: false } : state;

    case "flickerDone":
      return state.flicker ? { ...state, flicker: false } : state;

    case "flyDone":
      return state.flying ? { ...state, flying: false } : state;

    case "readTick": {
      if (state.mode !== "reading" || state.flying) return state;
      const progress = state.progress + 1;
      if (progress > READ_STEPS) return { ...state, mode: "readme", flicker: true, typed: 0 };
      return { ...state, progress };
    }

    case "typeTick": {
      if (!isTyping(state)) return state;
      const typed = state.typed + 1;
      return { ...state, typed: typed >= action.total ? TYPED_ALL : typed };
    }
  }
}
