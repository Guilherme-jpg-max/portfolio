import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";
import type { Project } from "@/content/types";
import {
  JOURNEY_TIMING,
  initialJourneyState,
  isTyping,
  journeyReducer,
  type JourneyState,
} from "./journeyMachine";
import { initialPhaseId, type JourneyPhase } from "./phases";
import { buildScreen, promptFor, screenCost, typeScreen, type ScreenLine } from "./terminal";

type Options = {
  compact: boolean;
  reducedMotion: boolean;
};

export type Journey = {
  state: JourneyState;
  phase: JourneyPhase;
  phaseIndex: number;
  disk: Project | null;
  screen: ScreenLine[];
  /** Tela terminada: mostra o prompt final com o cursor piscando. */
  screenDone: boolean;
  prompt: string;
  select: (phaseId: string) => void;
  insert: (index: number) => void;
  eject: () => void;
};

export function useJourney(phases: readonly JourneyPhase[], options: Options): Journey {
  const { compact, reducedMotion } = options;
  const [state, dispatch] = useReducer(journeyReducer, phases, (all) =>
    initialJourneyState(initialPhaseId(all)),
  );

  const phaseIndex = Math.max(
    0,
    phases.findIndex((phase) => phase.id === state.phaseId),
  );
  const phase = phases[phaseIndex];
  const disk = state.inserted === null ? null : (phase.projects[state.inserted] ?? null);

  const fullScreen = useMemo(
    () => buildScreen({ phase, mode: state.mode, disk, progress: state.progress, compact }),
    [phase, state.mode, disk, state.progress, compact],
  );
  const total = screenCost(fullScreen);
  const typed = typeScreen(fullScreen, state.typed);

  useTimeout(state.entering, JOURNEY_TIMING.enter, () => dispatch({ type: "enterDone" }));
  useTimeout(state.flicker, JOURNEY_TIMING.flicker, () => dispatch({ type: "flickerDone" }));
  useTimeout(state.flying, JOURNEY_TIMING.fly, () => dispatch({ type: "flyDone" }));
  useInterval(state.mode === "reading" && !state.flying, JOURNEY_TIMING.readStep, () =>
    dispatch({ type: "readTick" }),
  );
  const typing = isTyping(state);
  useInterval(typing, JOURNEY_TIMING.typeChar, () => dispatch({ type: "typeTick", total }));

  const select = useCallback(
    (phaseId: string) => dispatch({ type: "select", phaseId, instant: reducedMotion }),
    [reducedMotion],
  );
  const insert = useCallback(
    (index: number) => dispatch({ type: "insert", index, instant: reducedMotion }),
    [reducedMotion],
  );
  const eject = useCallback(
    () => dispatch({ type: "eject", instant: reducedMotion }),
    [reducedMotion],
  );

  return {
    state,
    phase,
    phaseIndex,
    disk,
    screen: typed.lines,
    screenDone: typed.done && state.mode !== "reading",
    prompt: promptFor(phase, compact),
    select,
    insert,
    eject,
  };
}

/** Timer que só reinicia quando `active` ou `ms` mudam, chamando sempre o callback mais recente. */
function useTimer(repeat: boolean, active: boolean, ms: number, callback: () => void) {
  const latest = useRef(callback);
  useEffect(() => {
    latest.current = callback;
  });

  useEffect(() => {
    if (!active) return;
    const run = () => latest.current();
    if (repeat) {
      const id = window.setInterval(run, ms);
      return () => window.clearInterval(id);
    }
    const id = window.setTimeout(run, ms);
    return () => window.clearTimeout(id);
  }, [repeat, active, ms]);
}

function useTimeout(active: boolean, ms: number, onDone: () => void) {
  useTimer(false, active, ms, onDone);
}

function useInterval(active: boolean, ms: number, onTick: () => void) {
  useTimer(true, active, ms, onTick);
}
