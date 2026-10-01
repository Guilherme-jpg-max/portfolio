import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/** `false` no servidor e durante a hidratação; `true` assim que o cliente assume. */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}
