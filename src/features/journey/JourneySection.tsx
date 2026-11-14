import { useCallback, useMemo, useRef, useState } from "react";
import { journeyCopy, sidePhase } from "@/content/journey";
import { projects } from "@/content/projects";
import { experiences } from "@/content/resume";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { DiskCrate } from "./components/DiskCrate";
import { FLYING_DISK_SIZE, FlyingDisk } from "./components/FlyingDisk";
import { JourneyPc } from "./components/JourneyPc";
import { JourneyRail } from "./components/JourneyRail";
import { planFlight, type FlightPath } from "./flight";
import { buildPhases } from "./phases";
import { useJourney } from "./useJourney";

const DESKTOP_QUERY = "(min-width: 1024px)";
/** A Jornada sempre anima, como no mockup aprovado, mesmo com "reduzir movimento" no sistema. */
const JOURNEY_OPTIONS = { reducedMotion: false } as const;

export function JourneySection() {
  const compact = !useMediaQuery(DESKTOP_QUERY);
  const phases = useMemo(() => buildPhases(experiences, projects, sidePhase), []);
  const journey = useJourney(phases, { ...JOURNEY_OPTIONS, compact });
  const { state, phase, disk, phaseIndex, insert } = journey;

  const slotRef = useRef<HTMLDivElement>(null);
  const [flight, setFlight] = useState<FlightPath | null>(null);

  const onInsert = useCallback(
    (index: number, from: HTMLElement) => {
      const slot = slotRef.current;
      if (slot) {
        const size = compact ? FLYING_DISK_SIZE.compact : FLYING_DISK_SIZE.desktop;
        setFlight(planFlight(from.getBoundingClientRect(), slot.getBoundingClientRect(), size));
      }
      insert(index);
    },
    [compact, insert],
  );

  return (
    <section
      id="jornada"
      data-hide-ticker
      aria-labelledby="jornada-title"
      className="relative isolate"
    >
      <div aria-hidden className="journey-backdrop absolute inset-x-0 -inset-y-16 -z-10" />

      <div
        className={
          "mx-auto grid w-full max-w-[1366px] grid-cols-[minmax(0,1fr)] gap-y-5 px-4 py-20 lg:min-h-svh lg:content-center " +
          "lg:grid-cols-[minmax(0,640px)_minmax(340px,544px)] lg:justify-between lg:gap-x-10 lg:gap-y-0 lg:px-14 lg:pb-3 lg:pt-[72px]"
        }
      >
        <header className="lg:col-span-2 lg:mb-4 lg:flex lg:items-start lg:justify-between">
          <div>
            <p className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-hot-signal lg:text-[11px]">
              {journeyCopy.kicker}
            </p>
            <h2
              id="jornada-title"
              className="m-0 text-[26px] font-normal leading-[1.1] lg:text-[32px]"
            >
              {journeyCopy.title}
            </h2>
            <p className="m-0 mt-2 max-w-[640px] text-sm leading-relaxed text-warm-paper/70">
              {journeyCopy.intro}
            </p>
          </div>
          <ol className="m-0 hidden list-none items-center gap-[22px] p-0 pt-2 font-mono text-[10.5px] uppercase tracking-[0.2em] text-warm-paper/60 lg:flex">
            {journeyCopy.steps.map((step, i) => (
              <li key={step}>
                <span className="text-hot-signal">{String(i + 1).padStart(2, "0")}</span> {step}
              </li>
            ))}
          </ol>
        </header>

        <div className="lg:col-span-2 lg:row-start-3 lg:mt-3">
          <JourneyRail
            phases={phases}
            activeIndex={phaseIndex}
            compact={compact}
            onSelect={journey.select}
          />
          <p className="m-0 mt-1 text-center font-mono text-[9.5px] uppercase tracking-[0.18em] text-warm-paper/60 lg:hidden">
            {journeyCopy.mobileHint}
          </p>
        </div>

        <div className="lg:row-start-2">
          <JourneyPc journey={journey} compact={compact} slotRef={slotRef} />
        </div>

        <div className="lg:row-start-2 lg:h-[clamp(332px,calc(40vh+112px),412px)] lg:self-start lg:pt-1">
          <DiskCrate
            phaseId={phase.id}
            projects={phase.projects}
            inserted={state.inserted}
            entering={state.entering}
            compact={compact}
            onInsert={onInsert}
          />
        </div>
      </div>

      {state.flying && flight && disk && (
        <FlyingDisk
          key={`${phase.id}-${state.inserted}`}
          name={disk.name}
          path={flight}
          compact={compact}
        />
      )}

      <p className="sr-only" aria-live="polite">
        {disk && state.mode === "readme"
          ? `${disk.name}: ${disk.stack}. ${disk.blurb} ${disk.github ? "Código público disponível." : "Repositório privado."}`
          : `${phase.company}, ${phase.cargo}, ${phase.periodLabel}. ${
              phase.projects.length
                ? `${phase.projects.length} projetos: ${phase.projects.map((p) => p.name).join(", ")}.`
                : phase.summary
            }`}
      </p>
    </section>
  );
}
