import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import commitStats from "../data/commit-stats.json";

export function RetroPC({
  mouseX = 0,
  mouseY = 0,
  scrollProgress = 0,
}: {
  mouseX?: number;
  mouseY?: number;
  scrollProgress?: number;
}) {
  const rigRef = useRef<THREE.Group>(null);
  const fanRef = useRef<THREE.Mesh>(null);
  const ledRef = useRef<THREE.MeshStandardMaterial>(null);
  const screenMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  const { texture, ctx, canvas } = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 384;
    const ctx = canvas.getContext("2d")!;
    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.colorSpace = THREE.SRGBColorSpace;
    return { texture, ctx, canvas };
  }, []);

  const linesRef = useRef<string[]>([
    "BIOS v2.4.1 — POST OK",
    "mounting /dev/persona ......... [ OK ]",
    "loading identity module ....... [ OK ]",
    "init shell .................... [ OK ]",
    "",
    "root@dev:~$ whoami",
    "> Guilherme Carlos",
    "> full-stack Developer / systems",
    "",
    "root@dev:~$ status",
    "available for new projects",
    "",
    "root@dev:~$ git log --all --oneline | wc -l",
    `> ${commitStats.total.toLocaleString("pt-BR")} commits`,
    "",
    "root@dev:~$ _",
  ]);

  const tick = useRef(0);
  useFrame((_, delta) => {
    tick.current += delta;
    const showCursor = Math.floor(tick.current * 2) % 2 === 0;

    ctx.fillStyle = "#1a0303";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgba(0,0,0,0.28)";
    for (let y = 0; y < canvas.height; y += 3) {
      ctx.fillRect(0, y, canvas.width, 1);
    }

    ctx.font = "600 16px 'JetBrains Mono', ui-monospace, monospace";
    ctx.textBaseline = "top";
    const pad = 20;
    linesRef.current.forEach((line, i) => {
      const isHeader = line.startsWith("> ALEX");
      const isPrompt = line.startsWith("root@dev");
      ctx.fillStyle = isHeader ? "#FF6B4A" : isPrompt ? "#FF6B4A" : "#F2E8DC";
      const text = line.replace(/_$/, showCursor ? "▊" : " ");
      ctx.fillText(text, pad, pad + i * 22);
    });

    const grad = ctx.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      40,
      canvas.width / 2,
      canvas.height / 2,
      canvas.width * 0.7,
    );
    grad.addColorStop(0, "rgba(0,0,0,0)");
    grad.addColorStop(1, "rgba(30,3,3,0.75)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    texture.needsUpdate = true;

    if (rigRef.current) {
      const targetY = mouseX * 0.5;
      const targetX = -mouseY * 0.25;
      rigRef.current.rotation.y += (targetY - rigRef.current.rotation.y) * 0.06;
      rigRef.current.rotation.x += (targetX - rigRef.current.rotation.x) * 0.06;
      rigRef.current.position.y = Math.sin(tick.current * 1.1) * 0.05;
      rigRef.current.rotation.z = Math.sin(scrollProgress * Math.PI) * 0.03;
    }

    if (fanRef.current) {
      fanRef.current.rotation.z += delta * 6;
    }
    if (ledRef.current) {
      const b = Math.floor(tick.current * 1.4) % 2 === 0 ? 3 : 0.3;
      ledRef.current.emissiveIntensity = b;
    }
    if (screenMatRef.current) {
      const f = 0.9 + Math.sin(tick.current * 9.1) * 0.05 + Math.sin(tick.current * 21) * 0.03;
      screenMatRef.current.emissiveIntensity = 1.4 * f;
    }
    if (lightRef.current) {
      const f = 0.9 + Math.sin(tick.current * 8.7) * 0.06 + Math.sin(tick.current * 19) * 0.03;
      lightRef.current.intensity = 4.5 * f;
    }
  });

  useEffect(() => () => texture.dispose(), [texture]);

  return (
    <group ref={rigRef} position={[0, 0, 0]}>
      <ambientLight intensity={0.05} color="#2B0A0A" />
      <pointLight position={[-3, 2, -3]} intensity={0.35} color="#7A1414" distance={10} />

      <group position={[0, 0.55, 0]}>
        <RoundedBox args={[2.4, 1.9, 1.5]} radius={0.08} smoothness={4} castShadow>
          <meshStandardMaterial color="#180606" roughness={0.75} metalness={0.15} />
        </RoundedBox>
        <mesh position={[0, 0, 0.76]}>
          <boxGeometry args={[2.15, 1.6, 0.05]} />
          <meshStandardMaterial color="#0a0202" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0, 0.79]}>
          <planeGeometry args={[1.9, 1.35]} />
          <meshStandardMaterial
            ref={screenMatRef}
            map={texture}
            emissiveMap={texture}
            emissive={"#C41E1E"}
            emissiveIntensity={1.4}
            toneMapped={false}
          />
        </mesh>
        <pointLight
          ref={lightRef}
          position={[0, 0, 1.6]}
          color="#C41E1E"
          intensity={4.5}
          distance={9}
          decay={1.5}
        />
        <mesh position={[0.9, -0.75, 0.78]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial
            ref={ledRef}
            color="#FF6B4A"
            emissive="#FF6B4A"
            emissiveIntensity={3}
            toneMapped={false}
          />
        </mesh>
        <mesh position={[-0.85, -0.75, 0.78]}>
          <planeGeometry args={[0.35, 0.03]} />
          <meshStandardMaterial color="#3a1010" emissive="#7A1414" emissiveIntensity={0.4} />
        </mesh>
      </group>

      <mesh position={[0, -0.55, 0]}>
        <cylinderGeometry args={[0.12, 0.16, 0.3, 12]} />
        <meshStandardMaterial color="#180606" roughness={0.7} />
      </mesh>
      <mesh position={[0, -0.72, 0]}>
        <boxGeometry args={[0.9, 0.05, 0.6]} />
        <meshStandardMaterial color="#180606" roughness={0.7} />
      </mesh>

      <group position={[-1.9, -0.35, 0.1]}>
        <RoundedBox args={[0.7, 1.1, 1.0]} radius={0.04} smoothness={3} castShadow>
          <meshStandardMaterial color="#160505" roughness={0.7} />
        </RoundedBox>
        <mesh position={[0.36, 0.15, 0]} rotation={[0, Math.PI / 2, 0]}>
          <circleGeometry args={[0.22, 20]} />
          <meshStandardMaterial color="#0a0202" side={THREE.DoubleSide} />
        </mesh>
        <mesh ref={fanRef} position={[0.37, 0.15, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.18, 0.015, 6, 16]} />
          <meshStandardMaterial color="#2a0808" emissive="#7A1414" emissiveIntensity={0.3} />
        </mesh>
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh
            key={i}
            position={[0.37, 0.15, 0]}
            rotation={[0, Math.PI / 2, (i * Math.PI * 2) / 5]}
          >
            <boxGeometry args={[0.005, 0.16, 0.04]} />
            <meshStandardMaterial color="#1a0505" />
          </mesh>
        ))}
        <mesh position={[0.36, -0.45, 0]} rotation={[0, Math.PI / 2, 0]}>
          <circleGeometry args={[0.015, 8]} />
          <meshStandardMaterial
            color="#FF6B4A"
            emissive="#FF6B4A"
            emissiveIntensity={2.5}
            toneMapped={false}
          />
        </mesh>
      </group>

      <group position={[0, -0.78, 0.95]}>
        <RoundedBox args={[1.8, 0.08, 0.55]} radius={0.02} smoothness={3} castShadow receiveShadow>
          <meshStandardMaterial color="#0f0303" roughness={0.55} metalness={0.25} />
        </RoundedBox>
        {Array.from({ length: 5 }).flatMap((_, row) =>
          Array.from({ length: 14 }).map((_, col) => (
            <mesh
              key={`${row}-${col}`}
              position={[-0.79 + col * 0.12, 0.06, -0.2 + row * 0.1]}
              castShadow
            >
              <boxGeometry args={[0.09, 0.04, 0.08]} />
              <meshStandardMaterial color="#1a0606" roughness={0.6} />
            </mesh>
          )),
        )}
      </group>

      <group position={[1.7, -0.55, 0.6]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.18, 0.15, 0.4, 20]} />
          <meshStandardMaterial color="#1a0505" roughness={0.85} />
        </mesh>
        <mesh position={[0.22, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.09, 0.02, 8, 16]} />
          <meshStandardMaterial color="#1a0505" roughness={0.85} />
        </mesh>
        <mesh position={[0, 0.19, 0]}>
          <circleGeometry args={[0.16, 20]} />
          <meshStandardMaterial color="#0a0202" roughness={0.2} metalness={0.6} />
        </mesh>
      </group>
    </group>
  );
}
