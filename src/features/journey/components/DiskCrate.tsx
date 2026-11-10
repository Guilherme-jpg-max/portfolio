import type { CSSProperties } from "react";
import type { Project } from "@/content/types";
import { cx } from "@/lib/cx";
import { JOURNEY_TIMING } from "../journeyMachine";
import { crateCount, crateHint } from "../labels";

type Props = {
  phaseId: string;
  projects: readonly Project[];
  inserted: number | null;
  entering: boolean;
  compact: boolean;
  onInsert: (index: number, from: HTMLElement) => void;
};

/** Cores das bordas das lombadas, alternadas. */
const EDGES = ["bg-hot-signal", "bg-signal", "bg-warm-paper", "bg-ember-dim"] as const;
const edgeOf = (index: number) => EDGES[index % EDGES.length];
const iconOf = (project: Project) => (project.github ? "↗" : "⌂");

function enterStyle(entering: boolean, index: number, compact: boolean): CSSProperties {
  const offset = compact ? "translateY(24px)" : "translateX(60px)";
  return {
    opacity: entering ? 0 : 1,
    transform: entering ? offset : "none",
    transition: "opacity .35s ease, transform .35s ease",
    transitionDelay: entering
      ? "0ms"
      : `${JOURNEY_TIMING.spineDelay + index * JOURNEY_TIMING.spineStagger}ms`,
  };
}

export function DiskCrate({ phaseId, projects, inserted, entering, compact, onInsert }: Props) {
  const empty = projects.length === 0;

  return (
    <div className="flex min-h-0 flex-col lg:h-full">
      <div className="mb-2 flex items-baseline justify-between font-mono text-[9.5px] uppercase tracking-[0.2em] text-warm-paper/60 lg:mb-2.5 lg:text-[10.5px] lg:tracking-[0.22em]">
        <span>
          {compact ? "caixa" : "caixa de disquetes"} ·{" "}
          <span className="text-hot-signal">{phaseId}</span>
        </span>
        <span>{crateCount(projects.length)}</span>
      </div>

      <div
        className={cx(
          "relative min-h-0 rounded-[4px_4px_10px_10px] border border-t-[3px] border-ember-deep border-t-ember-dim",
          "bg-[linear-gradient(180deg,rgba(42,20,16,0.55)_0%,rgba(15,5,5,0.9)_100%)]",
          compact
            ? "h-[132px] shadow-[inset_0_-24px_30px_rgba(0,0,0,0.6)]"
            : "flex-1 py-3.5 pl-7 pr-3.5 shadow-[inset_0_-30px_40px_rgba(0,0,0,0.6),0_20px_50px_rgba(0,0,0,0.5)]",
        )}
      >
        <ul
          aria-label={`Disquetes de ${phaseId}`}
          className={cx(
            "journey-scroll-thin m-0 list-none p-0",
            compact
              ? "flex h-full items-start gap-2.5 overflow-x-auto px-3 pb-2.5 pt-[18px]"
              : "flex h-full flex-col gap-[7px] overflow-y-auto pr-1",
          )}
        >
          {projects.map((project, i) => (
            <li
              key={`${phaseId}-${project.id}`}
              className="shrink-0"
              style={enterStyle(entering, i, compact)}
            >
              {i === inserted ? (
                <InDrive name={project.name} compact={compact} />
              ) : compact ? (
                <Disk project={project} index={i} onInsert={onInsert} />
              ) : (
                <Spine project={project} index={i} onInsert={onInsert} />
              )}
            </li>
          ))}
        </ul>

        {empty && (
          <p className="absolute inset-0 m-0 flex flex-col items-center justify-center text-center font-mono text-[10px] uppercase leading-[1.9] tracking-[0.16em] text-warm-paper/60 lg:text-[11px] lg:leading-loose lg:tracking-[0.18em]">
            <span>caixa vazia</span>
            <span>{compact ? "fase de base" : "fase de base — sem projetos de código"}</span>
          </p>
        )}

        {!compact && (
          <div
            aria-hidden
            className="absolute -left-px top-[40%] h-[70px] w-3.5 rounded-r-[3px] bg-ember-dim"
          />
        )}
      </div>

      {compact && (
        <p className="mb-0 mt-3.5 min-h-[1em] font-mono text-[9.5px] uppercase tracking-[0.16em] text-warm-paper/60">
          {crateHint(projects.length)}
        </p>
      )}
    </div>
  );
}

type ItemProps = {
  project: Project;
  index: number;
  onInsert: Props["onInsert"];
};

function Spine({ project, index, onInsert }: ItemProps) {
  return (
    <button
      type="button"
      onClick={(event) => onInsert(index, event.currentTarget)}
      aria-label={`Inserir disquete ${project.name}`}
      className={cx(
        "block w-full cursor-pointer rounded-[3px] border border-ember-deep p-0 text-left text-warm-paper",
        "bg-[linear-gradient(90deg,var(--color-crt-panel)_0%,#1E0D0A_100%)]",
        "transition-[transform,border-color,box-shadow] duration-200 ease-out",
        "hover:-translate-x-3.5 hover:border-hot-signal hover:shadow-[0_0_18px_rgba(196,30,30,0.35)]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hot-signal",
      )}
    >
      <span className="flex h-9 items-center gap-3 pr-3.5">
        <span className={cx("w-1.5 self-stretch rounded-l-[2px]", edgeOf(index))} />
        <span className="relative size-[22px] shrink-0 rounded-[1px_5px_1px_1px] border border-ember-dim bg-crt-seam">
          <span className="absolute left-[5px] top-0 h-[7px] w-2.5 bg-ember-dim" />
          <span className="absolute inset-x-[3px] bottom-[3px] h-[7px] bg-warm-paper" />
        </span>
        <span className="truncate font-mono text-xs uppercase tracking-[0.08em]">
          {project.name}
        </span>
        <span className="grow" />
        <span className="whitespace-nowrap font-mono text-[10px] text-hot-signal">
          {project.stackShort}
        </span>
        <span aria-hidden className="w-3.5 text-right font-mono text-[10px] text-warm-paper/60">
          {iconOf(project)}
        </span>
      </span>
    </button>
  );
}

function Disk({ project, index, onInsert }: ItemProps) {
  return (
    <button
      type="button"
      onClick={(event) => onInsert(index, event.currentTarget)}
      aria-label={`Inserir disquete ${project.name}`}
      className="block cursor-pointer border-0 bg-transparent p-0 focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-hot-signal"
    >
      <span className="relative block h-[90px] w-[86px] rounded-[3px_12px_3px_3px] border border-ember-dim bg-crt-panel shadow-[0_8px_18px_rgba(0,0,0,0.5)]">
        <span className="absolute left-6 top-0 h-6 w-[38px] bg-ember-deep">
          <span className="absolute right-[7px] top-[5px] h-3.5 w-2 bg-crt-bezel" />
        </span>
        <span className={cx("absolute left-1.5 top-1.5 size-1 rounded-full", edgeOf(index))} />
        <span className="absolute inset-x-1.5 bottom-1.5 h-12 overflow-hidden rounded-[2px] bg-warm-paper p-[5px] text-left">
          <span className="block break-all font-mono text-[8.5px] font-semibold leading-[1.2] text-crt-seam">
            {project.name}
          </span>
          <span className="mt-[3px] block font-mono text-[7.5px] text-ember-dim">
            {project.stackShort} <span aria-hidden>{iconOf(project)}</span>
          </span>
        </span>
      </span>
    </button>
  );
}

function InDrive({ name, compact }: { name: string; compact: boolean }) {
  if (compact) {
    return (
      <div className="flex h-[90px] w-[86px] items-center justify-center rounded-[3px_12px_3px_3px] border border-dashed border-ember-dim p-1.5 text-center font-mono text-[8.5px] uppercase tracking-[0.12em] text-hot-signal">
        no drive A:
      </div>
    );
  }
  return (
    <div className="flex h-[38px] items-center rounded-[3px] border border-dashed border-ember-dim px-3.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-hot-signal">
      ▸ {name} — no drive A:
    </div>
  );
}
