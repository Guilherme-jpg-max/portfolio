import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function DeskScene({
  monitorIntensity = 3,
  mouseX = 0,
  mouseY = 0,
}: {
  monitorIntensity?: number;
  mouseX?: number;
  mouseY?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += (mouseX * 0.08 - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (-mouseY * 0.04 - groupRef.current.rotation.x) * 0.05;
    }
    if (lightRef.current) {
      const t = performance.now() * 0.002;
      lightRef.current.intensity =
        monitorIntensity * (0.92 + Math.sin(t * 2.3) * 0.05 + Math.sin(t * 7.1) * 0.03);
    }
  });

  const cables = useMemo(
    () =>
      Array.from({ length: 8 }).map((_, i) => ({
        x: -0.3 + Math.sin(i * 1.7) * 0.6,
        z: -0.4 + Math.cos(i * 2.1) * 0.3,
        r: 0.02 + (i % 3) * 0.005,
      })),
    [],
  );

  return (
    <group ref={groupRef} position={[0, -0.3, 0]}>
      <ambientLight intensity={0.02} color="#2B0A0A" />

      <mesh position={[0, -0.5, 0]} receiveShadow>
        <boxGeometry args={[6, 0.1, 3]} />
        <meshStandardMaterial color="#1a0808" roughness={0.9} metalness={0.1} />
      </mesh>

      <mesh position={[0, 1, -1.6]} receiveShadow>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#0a0303" roughness={1} />
      </mesh>

      <group position={[0, 0.2, -0.6]}>
        <mesh castShadow>
          <boxGeometry args={[2.4, 1.8, 1.6]} />
          <meshStandardMaterial color="#1f0808" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0, 0.81]}>
          <boxGeometry args={[2.1, 1.5, 0.05]} />
          <meshStandardMaterial color="#0d0303" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0, 0.84]}>
          <planeGeometry args={[1.8, 1.25]} />
          <meshBasicMaterial color="#3a0808" />
        </mesh>
        {[0.4, 0.28, 0.16, 0.04, -0.08, -0.2, -0.32, -0.44].map((y, i) => (
          <mesh key={i} position={[-0.4 + (i % 3) * 0.1, y, 0.845]}>
            <planeGeometry args={[0.4 + (i % 4) * 0.15, 0.04]} />
            <meshBasicMaterial color="#C41E1E" />
          </mesh>
        ))}
        <pointLight
          ref={lightRef}
          position={[0, 0, 1.2]}
          color="#C41E1E"
          intensity={monitorIntensity}
          distance={8}
          decay={1.6}
        />
        <mesh position={[0, -1.0, 0]}>
          <cylinderGeometry args={[0.15, 0.2, 0.4, 8]} />
          <meshStandardMaterial color="#1f0808" roughness={0.7} />
        </mesh>
        <mesh position={[0, -1.22, 0]}>
          <boxGeometry args={[0.8, 0.05, 0.6]} />
          <meshStandardMaterial color="#1f0808" roughness={0.7} />
        </mesh>
      </group>

      <group position={[0, -0.4, 0.5]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.8, 0.08, 0.55]} />
          <meshStandardMaterial color="#0f0404" roughness={0.5} metalness={0.3} />
        </mesh>
        {Array.from({ length: 5 }).map((_, row) =>
          Array.from({ length: 14 }).map((_, col) => (
            <mesh key={`${row}-${col}`} position={[-0.8 + col * 0.12, -0.35, 0.32 - row * 0.11]}>
              <boxGeometry args={[0.09, 0.04, 0.09]} />
              <meshStandardMaterial color="#1a0606" roughness={0.6} />
            </mesh>
          )),
        )}
      </group>

      <mesh position={[1.2, -0.4, 0.5]} castShadow>
        <sphereGeometry args={[0.15, 12, 8]} />
        <meshStandardMaterial color="#0f0404" roughness={0.5} />
      </mesh>

      <group position={[-1.6, -0.3, 0.4]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.18, 0.15, 0.35, 16]} />
          <meshStandardMaterial color="#2a0a0a" roughness={0.8} />
        </mesh>
        <mesh position={[0.22, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.08, 0.02, 8, 16]} />
          <meshStandardMaterial color="#2a0a0a" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.16, 0]}>
          <circleGeometry args={[0.16, 16]} />
          <meshStandardMaterial color="#0a0202" roughness={0.3} metalness={0.5} />
        </mesh>
      </group>

      <group position={[1.9, -0.25, -0.2]}>
        <mesh>
          <cylinderGeometry args={[0.2, 0.15, 0.3, 8]} />
          <meshStandardMaterial color="#1a0606" roughness={0.9} />
        </mesh>
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh
            key={i}
            position={[Math.sin(i * 1.3) * 0.15, 0.2 + i * 0.08, Math.cos(i * 1.3) * 0.15]}
            rotation={[Math.random() * 0.5, i * 1.3, Math.random() * 0.5]}
          >
            <coneGeometry args={[0.08, 0.35, 4]} />
            <meshStandardMaterial color="#0a0303" roughness={0.8} />
          </mesh>
        ))}
      </group>

      <mesh position={[-1.0, -0.44, 0.9]} rotation={[-Math.PI / 2, 0, 0.15]}>
        <planeGeometry args={[0.3, 0.3]} />
        <meshStandardMaterial color="#3a1a10" roughness={0.9} />
      </mesh>
      <mesh position={[-0.7, -0.44, 1.0]} rotation={[-Math.PI / 2, 0, -0.1]}>
        <planeGeometry args={[0.28, 0.28]} />
        <meshStandardMaterial color="#4a2015" roughness={0.9} />
      </mesh>

      {cables.map((c, i) => (
        <mesh key={i} position={[c.x, -0.42, c.z + 0.2]} rotation={[0, i, 0]}>
          <torusGeometry args={[0.15, c.r, 6, 12, Math.PI]} />
          <meshStandardMaterial color="#0a0303" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}
