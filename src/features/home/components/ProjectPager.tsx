import { useRef, type PointerEvent } from "react";
import { pageFromRatio } from "@/hooks/usePagination";
import { cx } from "@/lib/cx";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

/**
 * Barra de progresso no estilo terminal: clique, arraste (mouse ou toque) ou
 * teclado escolhem a página. Exposta como slider para leitores de tela.
 */
export function ProjectPager({ currentPage, totalPages, onPageChange }: Props) {
  const scrubberRef = useRef<HTMLDivElement>(null);

  const jumpToPointer = (event: PointerEvent<HTMLDivElement>) => {
    const scrubber = scrubberRef.current;
    if (!scrubber) return;
    const rect = scrubber.getBoundingClientRect();
    onPageChange(pageFromRatio((event.clientX - rect.left) / rect.width, totalPages));
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    jumpToPointer(event);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) jumpToPointer(event);
  };

  const percent = Math.round(((currentPage + 1) / totalPages) * 100);

  return (
    <div className="mt-6 select-none">
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-warm-paper/40 mb-2">
        root@dev:~/work$ fetching page {currentPage + 1} of {totalPages}...
      </p>

      <div
        ref={scrubberRef}
        role="slider"
        tabIndex={0}
        aria-label="Página de projetos"
        aria-valuemin={1}
        aria-valuemax={totalPages}
        aria-valuenow={currentPage + 1}
        aria-valuetext={`Página ${currentPage + 1} de ${totalPages}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        className="relative h-6 flex items-center cursor-pointer touch-pan-y outline-none focus-visible:ring-1 focus-visible:ring-hot-signal/60 group/scrub"
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
