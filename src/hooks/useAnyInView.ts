import { useEffect, useState } from "react";

/** `true` enquanto algum elemento que casa com `selector` estiver visível na tela. */
export function useAnyInView(selector: string, threshold = 0.2): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll(selector));
    if (targets.length === 0 || typeof IntersectionObserver === "undefined") return;

    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        setInView(visible.size > 0);
      },
      { threshold },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [selector, threshold]);

  return inView;
}
