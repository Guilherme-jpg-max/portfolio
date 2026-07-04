import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { Suspense, useEffect, useRef, useState } from "react";
import { RetroPC } from "./RetroPC";
import * as THREE from "three";

const WAYPOINTS = [
  { pos: [0, 0.3, 3.2], look: [0, 0.4, 0] },
  { pos: [2.2, 0.6, 3.6], look: [0.2, 0.1, 0] },
  { pos: [-2.4, 0.2, 3.4], look: [-0.4, 0.0, 0] },
  { pos: [0, 0.5, 2.6], look: [0, 0.5, 0] },
];

const MOBILE_LOOK_WAYPOINTS = [
  { look: [0, 0.55, 0.79] },
  { look: [0, 0.5, 0.79] },
  { look: [0, 0.5, 0.79] },
  { look: [0, 0.55, 0.79] },
];

const SCREEN_WIDTH = 1.9;
const SCREEN_HEIGHT = 1.35;
const SCREEN_Z = 0.79;

const FIT_MARGIN = 1.15;

function getMobileDistance(fovDeg: number, aspect: number) {
  const halfV = (fovDeg * Math.PI) / 180 / 2;
  const halfH = Math.atan(Math.tan(halfV) * aspect);

  const targetHalfW = (SCREEN_WIDTH / 2) * FIT_MARGIN;
  const targetHalfH = (SCREEN_HEIGHT / 2) * FIT_MARGIN;

  const distForWidth = targetHalfW / Math.tan(halfH);
  const distForHeight = targetHalfH / Math.tan(halfV);

  const dist = Math.max(distForWidth, distForHeight);

  return THREE.MathUtils.clamp(dist, 1.8, 8);
}

function ScrollCamera({
  progress,
  mouseX,
  mouseY,
  isMobile,
}: {
  progress: number;
  mouseX: number;
  mouseY: number;
  isMobile: boolean;
}) {
  const { camera, size } = useThree();
  const desired = useRef(new THREE.Vector3());
  const target = useRef(new THREE.Vector3());

  useFrame(() => {
    if (isMobile) {
      const aspect = size.width / size.height;
      const fov = (camera as THREE.PerspectiveCamera).fov ?? 50;
      const distance = getMobileDistance(fov, aspect);

      const p = Math.max(0, Math.min(1, progress)) * (MOBILE_LOOK_WAYPOINTS.length - 1);
      const i = Math.floor(p);
      const t = p - i;
      const a = MOBILE_LOOK_WAYPOINTS[i];
      const b = MOBILE_LOOK_WAYPOINTS[Math.min(i + 1, MOBILE_LOOK_WAYPOINTS.length - 1)];
      const lookY = THREE.MathUtils.lerp(a.look[1], b.look[1], t);

      const parallaxX = 0.03;
      const parallaxY = 0.02;

      desired.current.set(
        mouseX * parallaxX,
        lookY + mouseY * parallaxY,
        SCREEN_Z + distance,
      );
      target.current.set(0, lookY, SCREEN_Z);
    } else {
      const p = Math.max(0, Math.min(1, progress)) * (WAYPOINTS.length - 1);
      const i = Math.floor(p);
      const t = p - i;
      const a = WAYPOINTS[i];
      const b = WAYPOINTS[Math.min(i + 1, WAYPOINTS.length - 1)];

      desired.current.set(
        THREE.MathUtils.lerp(a.pos[0], b.pos[0], t) + mouseX * 0.2,
        THREE.MathUtils.lerp(a.pos[1], b.pos[1], t) + mouseY * 0.15,
        THREE.MathUtils.lerp(a.pos[2], b.pos[2], t),
      );
      target.current.set(
        THREE.MathUtils.lerp(a.look[0], b.look[0], t),
        THREE.MathUtils.lerp(a.look[1], b.look[1], t),
        THREE.MathUtils.lerp(a.look[2], b.look[2], t),
      );
    }

    camera.position.lerp(desired.current, 0.07);
    camera.lookAt(target.current);
  });
  return null;
}

export function CrtCanvas({ progress }: { progress: number }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mql.matches);

    update();
    mql.addEventListener("change", update);

    const onMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };
    window.addEventListener("mousemove", onMove);

    return () => {
      mql.removeEventListener("change", update);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <Canvas
      dpr={isMobile ? [1, 1.2] : [1, 2]}
      camera={{ position: isMobile ? [0, 0.55, 5.5] : [0, 0.3, 3.2], fov: isMobile ? 50 : 42 }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      style={{ background: "#0F0505" }}
    >
      <fog attach="fog" args={isMobile ? ["#0F0505", 10, 20] : ["#0F0505", 8, 18]} />
      <Suspense fallback={null}>
        <RetroPC mouseX={mouse.x} mouseY={mouse.y} scrollProgress={progress} />
        <ScrollCamera progress={progress} mouseX={mouse.x} mouseY={mouse.y} isMobile={isMobile} />
        <EffectComposer multisampling={0}>
          <Bloom
            intensity={isMobile ? 0.7 : 1.0}
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