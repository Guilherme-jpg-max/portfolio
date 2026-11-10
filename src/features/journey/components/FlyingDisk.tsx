import type { CSSProperties } from "react";
import { cx } from "@/lib/cx";
import type { FlightPath } from "../flight";

export const FLYING_DISK_SIZE = {
  desktop: { width: 92, height: 96 },
  compact: { width: 74, height: 78 },
} as const;

type Props = { name: string; path: FlightPath; compact: boolean };

/** Disquete que sai da caixa e entra no drive A:. */
export function FlyingDisk({ name, path, compact }: Props) {
  const size = compact ? FLYING_DISK_SIZE.compact : FLYING_DISK_SIZE.desktop;
  const style = {
    left: path.left,
    top: path.top,
    width: size.width,
    height: size.height,
    "--fly-dx": `${path.dx}px`,
    "--fly-dy": `${path.dy}px`,
  } as CSSProperties;

  return (
    <div aria-hidden className="journey-disk-fly pointer-events-none fixed z-40" style={style}>
      <div
        className={cx(
          "relative size-full border border-hot-signal bg-crt-panel shadow-[0_0_26px_rgba(255,107,74,0.5)]",
          compact ? "rounded-[3px_11px_3px_3px]" : "rounded-[3px_13px_3px_3px]",
        )}
      >
        <div
          className={cx(
            "absolute top-0 bg-ember-deep",
            compact ? "left-5 h-[22px] w-[34px]" : "left-6 h-7 w-11",
          )}
        />
        <div
          className={cx(
            "absolute break-all bg-warm-paper font-mono text-crt-seam",
            compact
              ? "inset-x-1.5 bottom-1.5 h-[38px] p-1 text-[7px]"
              : "inset-x-2 bottom-2 h-[46px] p-[5px] text-[8px]",
          )}
        >
          {name}
        </div>
      </div>
    </div>
  );
}
