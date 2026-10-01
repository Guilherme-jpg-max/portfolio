import { useEffect, useRef, type RefObject } from "react";

export type PointerPosition = { x: number; y: number };

/**
 * Posição do mouse normalizada para -1..1 nos dois eixos. Fica num ref (lido
 * no `useFrame`) para não re-renderizar a árvore 3D a cada movimento.
 */
export function useNormalizedMouse(): RefObject<PointerPosition> {
  const mouse = useRef<PointerPosition>({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      mouse.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      };
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return mouse;
}
