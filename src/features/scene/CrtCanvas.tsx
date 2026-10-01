import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { RetroPC } from "./RetroPC";
import { ScrollCamera } from "./ScrollCamera";

const BACKGROUND = "#0F0505";

/** Configuração da cena por tipo de dispositivo: mobile renderiza mais leve. */
const SCENE_CONFIG = {
  desktop: {
    dpr: [1, 2],
    camera: { position: [0, 0.3, 3.2], fov: 42 },
    fog: [BACKGROUND, 8, 18],
    bloomIntensity: 1.0,
  },
  mobile: {
    dpr: [1, 1.2],
    camera: { position: [0, 0.55, 5.5], fov: 50 },
    fog: [BACKGROUND, 10, 20],
    bloomIntensity: 0.7,
  },
} as const;

/** Mouse normalizado para o intervalo -1..1 nos dois eixos. */
function useNormalizedMouse() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      setMouse({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return mouse;
}

export function CrtCanvas({ progress }: { progress: number }) {
  const isMobile = useIsMobile();
  const mouse = useNormalizedMouse();
  const config = isMobile ? SCENE_CONFIG.mobile : SCENE_CONFIG.desktop;

  return (
    <Canvas
      dpr={[...config.dpr]}
      camera={{ position: [...config.camera.position], fov: config.camera.fov }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      style={{ background: BACKGROUND }}
    >
      <fog attach="fog" args={[...config.fog]} />
      <Suspense fallback={null}>
        <RetroPC mouseX={mouse.x} mouseY={mouse.y} scrollProgress={progress} />
        <ScrollCamera progress={progress} mouseX={mouse.x} mouseY={mouse.y} isMobile={isMobile} />
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
