import { useEffect, useRef, type RefObject } from "react";
import { clamp } from "@/lib/math";

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
