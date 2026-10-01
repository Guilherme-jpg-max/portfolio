import { useEffect, useState, type RefObject } from "react";
import { clamp } from "@/lib/math";

/** Fração (0–1) da página já rolada, medida pela altura do elemento. */
export function useScrollProgress(ref: RefObject<HTMLElement | null>): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const max = el.scrollHeight - window.innerHeight;
      setProgress(clamp(window.scrollY / max, 0, 1));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref]);

  return progress;
}
