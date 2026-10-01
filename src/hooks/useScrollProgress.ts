import { useEffect, useRef, type RefObject } from "react";
import { clamp } from "@/lib/math";

/**
 * Fração (0–1) da página já rolada, medida pela altura do elemento. Fica num
 * ref para quem lê a cada frame (a cena 3D) sem re-renderizar a página.
 */
export function useScrollProgress(container: RefObject<HTMLElement | null>): RefObject<number> {
  const progress = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const el = container.current;
      if (!el) return;
      const max = el.scrollHeight - window.innerHeight;
      progress.current = clamp(window.scrollY / max, 0, 1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [container]);

  return progress;
}
