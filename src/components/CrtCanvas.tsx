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

function ScrollCamera({
  progress,
  mouseX,
  mouseY,
}: {
  progress: number;
  mouseX: number;
  mouseY: number;
}) {
  const { camera } = useThree();
  const desired = useRef(new THREE.Vector3());
  const target = useRef(new THREE.Vector3());

  useFrame(() => {
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

    camera.position.lerp(desired.current, 0.07);
    camera.lookAt(target.current);
  });
  return null;
}

export function CrtCanvas({ progress }: { progress: number }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    const onMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <Canvas
      dpr={isMobile ? [1, 1.2] : [1, 2]}
      camera={{ position: [0, 0.3, 3.2], fov: 42 }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      style={{ background: "#0F0505" }}
    >
      <fog attach="fog" args={["#0F0505", 4, 10]} />
      <Suspense fallback={null}>
        <RetroPC mouseX={mouse.x} mouseY={mouse.y} scrollProgress={progress} />
        <ScrollCamera progress={progress} mouseX={mouse.x} mouseY={mouse.y} />
        <EffectComposer multisampling={0}>
          <Bloom
            intensity={isMobile ? 0.9 : 1.4}
            luminanceThreshold={0.15}
            luminanceSmoothing={0.4}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.2} darkness={0.9} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
