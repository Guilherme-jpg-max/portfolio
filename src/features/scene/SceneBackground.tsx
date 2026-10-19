import { lazy, Suspense, type RefObject } from "react";
import { useIsClient } from "@/hooks/useIsClient";
import { sceneColors } from "./theme";

const CrtCanvas = lazy(() => import("./CrtCanvas").then((m) => ({ default: m.CrtCanvas })));

type Props = {
  progress: RefObject<number>;
};

export function SceneBackground({ progress }: Props) {
  const isClient = useIsClient();
  const placeholder = <div className="h-full w-full" style={{ background: sceneColors.void }} />;

  return (
    <div className="fixed inset-0 z-0">
      {isClient ? (
        <Suspense fallback={placeholder}>
          <CrtCanvas progress={progress} />
        </Suspense>
      ) : (
        placeholder
      )}
      <div className="pointer-events-none absolute inset-0 crt-scanlines crt-vignette" />
      <div
        className="pointer-events-none absolute inset-0 opacity-60 mix-blend-screen"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(196,30,30,0.22) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
