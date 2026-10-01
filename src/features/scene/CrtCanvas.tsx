import { Suspense, type RefObject } from "react";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { RetroPC } from "./RetroPC";
import { ScrollCamera } from "./ScrollCamera";
import { sceneColors } from "./theme";
import { useNormalizedMouse } from "./useNormalizedMouse";

/** Configuração da cena por tipo de dispositivo: mobile renderiza mais leve. */
const SCENE_CONFIG = {
  desktop: {
    dpr: [1, 2],
    camera: { position: [0, 0.3, 3.2], fov: 42 },
    fog: [sceneColors.void, 8, 18],
    bloomIntensity: 1.0,
  },
  mobile: {
    dpr: [1, 1.2],
    camera: { position: [0, 0.55, 5.5], fov: 50 },
    fog: [sceneColors.void, 10, 20],
    bloomIntensity: 0.7,
  },
} as const;

type Props = {
  /** Progresso do scroll (0–1), lido a cada frame. */
  progress: RefObject<number>;
};

export function CrtCanvas({ progress }: Props) {
  const isMobile = useIsMobile();
  const mouse = useNormalizedMouse();
  const config = isMobile ? SCENE_CONFIG.mobile : SCENE_CONFIG.desktop;

  return (
    <Canvas
      dpr={[...config.dpr]}
      camera={{ position: [...config.camera.position], fov: config.camera.fov }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      style={{ background: sceneColors.void }}
    >
      <fog attach="fog" args={[...config.fog]} />
      <Suspense fallback={null}>
        <RetroPC mouse={mouse} scrollProgress={progress} />
        <ScrollCamera progress={progress} mouse={mouse} isMobile={isMobile} />
        <EffectComposer multisampling={0}>
          <Bloom
            intensity={config.bloomIntensity}
            luminanceThreshold={0.35}
            luminanceSmoothing={0.4}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.4} darkness={0.4} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
