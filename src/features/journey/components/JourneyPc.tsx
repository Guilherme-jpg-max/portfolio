import type { Ref } from "react";
import { cx } from "@/lib/cx";
import type { Journey } from "../useJourney";
import type { LineKind } from "../terminal";
import { hardwareButton } from "./HardwareButton";

type Props = {
  journey: Journey;
  compact: boolean;
  slotRef: Ref<HTMLDivElement>;
};

const LINE_CLASS: Record<LineKind, string> = {
  command: "text-hot-signal journey-glow",
  output: "text-warm-paper journey-glow-soft",
  title: "text-warm-paper journey-glow-soft font-semibold",
  accent: "text-signal-soft journey-glow-soft",
};

export function JourneyPc({ journey, compact, slotRef }: Props) {
  const { state, disk, eject } = journey;
  const diskIn = state.inserted !== null && !state.flying;
  const readme = state.mode === "readme" && disk !== null;

  return (
    <div className="relative">
      <div
        aria-hidden
        className="journey-halo pointer-events-none absolute left-1 top-3 h-[260px] w-[350px] max-w-full rounded-[50%] blur-[16px] lg:left-[34px] lg:top-6 lg:h-[380px] lg:w-[560px] lg:blur-[20px] bg-[radial-gradient(ellipse_at_center,rgba(196,30,30,0.33)_0%,transparent_65%)]"
      />

      <div className="relative perspective-[1000px] lg:perspective-[1500px]">
        <div className="journey-float-sm lg:journey-float lg:w-full lg:max-w-[620px]">
          <div
            className={cx(
              "border border-ember-deep bg-[linear-gradient(160deg,var(--color-crt-casing-hi)_0%,var(--color-crt-casing)_45%,var(--color-crt-casing-lo)_100%)]",
              "rounded-2xl px-3 pt-3 lg:rounded-[22px] lg:px-5 lg:pt-5",
              "shadow-[0_8px_0_#120604,0_14px_0_#0D0403,0_30px_60px_rgba(0,0,0,0.7)]",
              "lg:shadow-[10px_8px_0_#120604,18px_14px_0_#0D0403,0_40px_90px_rgba(0,0,0,0.7)]",
            )}
          >
            <Screen journey={journey} compact={compact} />

            <div className="flex h-[62px] items-center justify-between gap-3 pl-1.5 pr-1 lg:h-[92px] lg:pl-[18px] lg:pr-[22px]">
              <div className="flex min-w-0 items-center gap-2.5 lg:gap-3.5">
                <div
                  ref={slotRef}
                  className="relative h-6 w-[118px] shrink-0 rounded-[3px] border border-crt-seam bg-crt-slot shadow-[inset_0_2px_6px_rgba(0,0,0,0.8)] lg:h-[30px] lg:w-[170px] lg:rounded"
                >
                  <div className="absolute inset-x-3 top-2.5 h-[3px] rounded-sm bg-[#050101] lg:inset-x-[18px] lg:top-[13px] lg:h-1" />
                  {diskIn && (
                    <div className="absolute left-[34px] top-2 h-[5px] w-[50px] rounded-[1px] bg-warm-paper opacity-70 lg:left-[45px] lg:top-2.5 lg:h-1.5 lg:w-[80px]" />
                  )}
                </div>
                <DriveStatus journey={journey} compact={compact} />
              </div>

              <div className="flex shrink-0 items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.14em] lg:gap-2.5 lg:text-[10px] lg:tracking-[0.18em]">
                {diskIn && (
                  <button
                    type="button"
                    onClick={eject}
                    aria-label={compact ? "Ejetar disquete" : undefined}
                    className={cx(
                      hardwareButton(),
                      "cursor-pointer hover:border-hot-signal hover:text-hot-signal",
                    )}
                  >
                    {compact ? "⏏" : "⏏ ejetar"}
                  </button>
                )}
                {readme && disk.github && (
                  <a
                    href={disk.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={hardwareButton(true)}
                  >
                    {compact ? "código ↗" : "ver código ↗"}
                  </a>
                )}
                {readme && !disk.github && (
                  <span className={cx(hardwareButton(), "opacity-75")}>
                    {!compact && <LockIcon />}
                    privado
                  </span>
                )}
                {!compact && (
                  <span
                    aria-hidden
                    className="ml-1.5 size-2.5 rounded-full bg-hot-signal shadow-[0_0_10px_var(--color-hot-signal)]"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="mx-auto h-3 w-[110px] border border-t-0 border-crt-seam bg-[linear-gradient(180deg,var(--color-crt-bezel),var(--color-void))] lg:h-[18px] lg:w-[150px]" />
          <div className="mx-auto hidden h-2.5 w-[260px] rounded-[3px] border border-crt-seam bg-crt-bezel lg:block" />
        </div>
      </div>
    </div>
  );
}

function Screen({ journey, compact }: { journey: Journey; compact: boolean }) {
  const { state, screen, screenDone, prompt } = journey;
  return (
    <div
      aria-hidden
      className={cx(
        "crt-scanlines relative overflow-hidden border-2 border-crt-shadow after:opacity-60",
        "bg-[radial-gradient(ellipse_at_center,#2C0606_0%,var(--color-crt-screen)_65%,#0B0101_100%)]",
        "h-[196px] rounded-[11px] shadow-[inset_0_0_40px_rgba(0,0,0,0.9),0_0_0_4px_var(--color-crt-bezel)]",
        "lg:h-[clamp(220px,40vh,300px)] lg:rounded-2xl lg:shadow-[inset_0_0_60px_rgba(0,0,0,0.9),0_0_0_6px_var(--color-crt-bezel)]",
      )}
    >
      <div className="journey-roll" />
      <div
        className={cx(
          "relative origin-center px-[13px] py-[11px] font-mono text-[10.5px] leading-[1.6] transition-[transform,opacity] duration-150 ease-out",
          "lg:px-[22px] lg:py-[18px] lg:text-[13px] lg:leading-[1.7]",
          state.flicker ? "scale-y-[0.02] opacity-30" : "scale-y-100 opacity-100",
        )}
      >
        {screen.map((line, i) => (
          <div key={i} className={cx("whitespace-pre-wrap", LINE_CLASS[line.kind])}>
            {line.text ? <ScreenText text={line.text} /> : " "}
          </div>
        ))}
        {screenDone && (
          <div className="journey-glow text-hot-signal">
            {compact ? "$" : prompt} <span className="journey-cursor" />
          </div>
        )}
      </div>
    </div>
  );
}

/** Blocos (barra de leitura e cursor) desenhados em CSS: na fonte mono eles vêm de outra fonte e esticam a linha. */
const BLOCK_CLASS: Record<string, string> = {
  "█": "bg-current",
  "░": "bg-current opacity-25",
  "▊": "w-[0.5em] bg-hot-signal",
};

function ScreenText({ text }: { text: string }) {
  return text
    .split(/([█░▊])/)
    .map((part, i) =>
      part in BLOCK_CLASS ? (
        <span
          key={i}
          className={cx("inline-block h-[1em] w-[0.6em] align-[-0.15em]", BLOCK_CLASS[part])}
        />
      ) : (
        part
      ),
    );
}

function DriveStatus({ journey, compact }: { journey: Journey; compact: boolean }) {
  const { state, disk } = journey;
  const led = (
    <span
      className={cx(
        "size-[7px] rounded-full",
        state.inserted !== null
          ? "bg-hot-signal shadow-[0_0_8px_var(--color-hot-signal)]"
          : "bg-ember-deep shadow-[0_0_8px_var(--color-ember-deep)]",
        state.mode === "reading" && "journey-led-busy",
      )}
    />
  );
  if (compact) return <span aria-hidden>{led}</span>;
  return (
    <div
      aria-hidden
      className="flex min-w-0 flex-col gap-1 font-mono text-[9px] tracking-[0.2em] text-warm-paper/60"
    >
      <span className="flex items-center gap-1.5 whitespace-nowrap">{led}A:</span>
      <span className="truncate">{disk ? disk.name.slice(0, 14) : "vazio"}</span>
    </div>
  );
}

function LockIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
