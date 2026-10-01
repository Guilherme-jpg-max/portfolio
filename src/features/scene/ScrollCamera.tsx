import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { SCREEN, getMobileDistance, sampleDesktopPath, sampleMobileLookHeight } from "./cameraPath";

const PARALLAX = {
  desktop: { x: 0.2, y: 0.15 },
  mobile: { x: 0.03, y: 0.02 },
} as const;

/** Suavização aplicada a cada frame ao aproximar a câmera do alvo. */
const CAMERA_EASING = 0.07;

type Props = {
  progress: number;
  mouseX: number;
  mouseY: number;
  isMobile: boolean;
};

/** Move a câmera pelo caminho de waypoints conforme o scroll, com parallax do mouse. */
export function ScrollCamera({ progress, mouseX, mouseY, isMobile }: Props) {
  const { camera, size } = useThree();
  const desired = useRef(new THREE.Vector3());
  const target = useRef(new THREE.Vector3());

  useFrame(() => {
    if (isMobile) {
      const fov = (camera as THREE.PerspectiveCamera).fov ?? 50;
      const distance = getMobileDistance(fov, size.width / size.height);
      const lookY = sampleMobileLookHeight(progress);

      desired.current.set(
        mouseX * PARALLAX.mobile.x,
        lookY + mouseY * PARALLAX.mobile.y,
        SCREEN.z + distance,
      );
      target.current.set(0, lookY, SCREEN.z);
    } else {
      const { pos, look } = sampleDesktopPath(progress);

      desired.current.set(
        pos[0] + mouseX * PARALLAX.desktop.x,
        pos[1] + mouseY * PARALLAX.desktop.y,
        pos[2],
      );
      target.current.set(...look);
    }

    camera.position.lerp(desired.current, CAMERA_EASING);
    camera.lookAt(target.current);
  });

  return null;
}
