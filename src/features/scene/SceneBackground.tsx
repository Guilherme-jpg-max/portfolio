import { CrtCanvas } from "./CrtCanvas";

/** Cena 3D fixa atrás da página, com scanlines, vinheta e brilho vermelho por cima. */
export function SceneBackground({ progress }: { progress: number }) {
  return (
    <div className="fixed inset-0 z-0">
      <CrtCanvas progress={progress} />
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
