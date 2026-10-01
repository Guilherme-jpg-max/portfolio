import { useRef, type MouseEvent as ReactMouseEvent } from "react";
import { pageFromRatio } from "@/hooks/usePagination";
import { cx } from "@/lib/cx";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

/** Barra de progresso clicável/arrastável no estilo terminal. */
export function ProjectPager({ currentPage, totalPages, onPageChange }: Props) {
  const scrubberRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (event: ReactMouseEvent<HTMLDivElement>) => {
    const updateFromEvent = (ev: { clientX: number }) => {
      const scrubber = scrubberRef.current;
      if (!scrubber) return;
      const rect = scrubber.getBoundingClientRect();
      onPageChange(pageFromRatio((ev.clientX - rect.left) / rect.width, totalPages));
    };

    updateFromEvent(event);

    const onMove = (ev: MouseEvent) => updateFromEvent(ev);
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const percent = Math.round(((currentPage + 1) / totalPages) * 100);

  return (
    <div className="mt-6 select-none">
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-warm-paper/40 mb-2">
        root@dev:~/work$ fetching page {currentPage + 1} of {totalPages}...
      </p>

      <div
        ref={scrubberRef}
        onMouseDown={handleMouseDown}
        className="relative h-6 flex items-center cursor-pointer group/scrub"
      >
        <div className="relative w-full h-2 flex gap-[2px]">
          {Array.from({ length: totalPages }, (_, i) => (
            <div
              key={i}
              className={cx(
                "flex-1 h-full rounded-[1px] transition-all duration-300",
                i <= currentPage
                  ? "bg-hot-signal shadow-[0_0_8px_rgba(255,107,74,0.6)]"
                  : "bg-ember/25",
                i === currentPage && "brightness-125",
              )}
            />
          ))}
        </div>

        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-hot-signal shadow-[0_0_10px_rgba(255,107,74,0.9)] transition-all duration-300 pointer-events-none"
          style={{ left: `calc(${((currentPage + 0.5) / totalPages) * 100}% - 6px)` }}
        />
      </div>

      <div className="flex items-center justify-between mt-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-warm-paper/40">
          [h] prev · [l] next · click to jump
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-hot-signal">
          {currentPage + 1}/{totalPages} pages · {percent}%
        </span>
      </div>
    </div>
  );
}
