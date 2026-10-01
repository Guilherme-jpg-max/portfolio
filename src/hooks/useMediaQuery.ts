import { useCallback, useSyncExternalStore } from "react";

/** Mesmo breakpoint usado pelo Tailwind (`md`) para alternar o layout mobile. */
export const MOBILE_QUERY = "(max-width: 768px)";

/**
 * Assina uma media query. No servidor (e na hidratação) retorna `false`, e o
 * valor real é aplicado logo em seguida no cliente.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export function useIsMobile(): boolean {
  return useMediaQuery(MOBILE_QUERY);
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
