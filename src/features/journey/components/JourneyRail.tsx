import { cx } from "@/lib/cx";
import { railPosition } from "../labels";
import type { JourneyPhase } from "../phases";

type Props = {
  phases: readonly JourneyPhase[];
  activeIndex: number;
  compact: boolean;
  onSelect: (phaseId: string) => void;
};

export function JourneyRail({ phases, activeIndex, compact, onSelect }: Props) {
  return (
    <nav aria-label="Fases da jornada" className="relative h-[86px] lg:h-[110px]">
      <div
        aria-hidden
        className="absolute inset-x-0 top-[25px] h-px bg-[linear-gradient(90deg,rgba(126,26,22,0.15),var(--color-ember-dim)_12%,var(--color-ember-dim)_86%,var(--color-hot-signal)_100%)] lg:top-[31px]"
      />
      {!compact && (
        <span
          aria-hidden
          className="absolute -right-1 top-[27px] font-mono text-[9px] text-hot-signal"
        >
          ▶
        </span>
      )}
      <div
        aria-hidden
        className="absolute top-[23px] h-[5px] w-12 -ml-6 rounded-[3px] bg-hot-signal shadow-[0_0_12px_var(--color-hot-signal)] transition-[left] duration-500 ease-[cubic-bezier(.6,0,.2,1)] lg:top-[29px] lg:w-[140px] lg:-ml-[70px] lg:shadow-[0_0_16px_var(--color-hot-signal),0_0_34px_rgba(196,30,30,0.6)]"
        style={{ left: railPosition(activeIndex, phases.length) }}
      />

      <ol
        className="absolute inset-0 m-0 grid list-none p-0"
        style={{ gridTemplateColumns: `repeat(${phases.length}, minmax(0, 1fr))` }}
      >
        {phases.map((phase, i) => {
          const on = i === activeIndex;
          return (
            <li key={phase.id} className="min-w-0">
              <button
                type="button"
                aria-pressed={on}
                onClick={() => onSelect(phase.id)}
                className="flex min-h-11 w-full cursor-pointer flex-col items-center border-0 bg-transparent p-0 text-center text-warm-paper focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-hot-signal lg:focus-visible:outline-offset-4"
              >
                <span
                  className={cx(
                    "h-3.5 font-mono text-[9px] tracking-[0.15em] lg:h-[18px] lg:text-[10px] lg:uppercase lg:tracking-[0.2em]",
                    on ? "text-hot-signal" : "text-warm-paper/60",
                  )}
                >
                  {compact ? phase.yearLabel : phase.periodLabel}
                </span>
                <span className="relative mt-1 size-3 lg:mt-1.5 lg:size-3.5">
                  {on && (
                    <span className="journey-ring absolute inset-0 rounded-full border border-hot-signal" />
                  )}
                  <span
                    className={cx(
                      "absolute inset-0 rounded-full border-2",
                      on
                        ? "border-hot-signal bg-hot-signal shadow-[0_0_14px_var(--color-hot-signal)]"
                        : "border-ember-dim bg-void",
                    )}
                  />
                </span>
                {compact ? (
                  <>
                    <span
                      className={cx(
                        "mt-2 text-[12.5px] leading-[1.2]",
                        on ? "text-warm-paper" : "text-warm-paper/70",
                      )}
                    >
                      {phase.shortName}
                    </span>
                    {phase.current && (
                      <span className="mt-[3px] bg-hot-signal px-[5px] py-px font-mono text-[8.5px] uppercase tracking-[0.18em] text-void">
                        atual
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    <span
                      className={cx(
                        "mt-2.5 whitespace-nowrap transition-[font-size] duration-300",
                        on ? "text-[21px] text-warm-paper" : "text-base text-warm-paper/75",
                      )}
                    >
                      {phase.company}
                    </span>
                    <span
                      className={cx(
                        "mt-0.5 font-mono text-[10px] tracking-[0.06em]",
                        on ? "text-hot-signal" : "text-warm-paper/60",
                      )}
                    >
                      {phase.roleLine}
                    </span>
                  </>
                )}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
