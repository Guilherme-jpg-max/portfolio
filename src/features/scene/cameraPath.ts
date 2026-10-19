import { clamp } from "@/lib/math";

export type Vec3 = readonly [number, number, number];

type Waypoint = { pos: Vec3; look: Vec3 };

export const DESKTOP_WAYPOINTS: readonly Waypoint[] = [
  { pos: [0, 0.3, 3.2], look: [0, 0.4, 0] },
  { pos: [2.2, 0.6, 3.6], look: [0.2, 0.1, 0] },
  { pos: [-2.4, 0.2, 3.4], look: [-0.4, 0.0, 0] },
  { pos: [0, 0.5, 2.6], look: [0, 0.5, 0] },
];

export const MOBILE_LOOK_HEIGHTS: readonly number[] = [0.55, 0.5, 0.5, 0.55];

export const SCREEN = { width: 1.9, height: 1.35, z: 0.79 } as const;

const FIT_MARGIN = 1.15;
const MOBILE_DISTANCE_RANGE = { min: 1.8, max: 8 } as const;

export function lerp(from: number, to: number, t: number): number {
  return (1 - t) * from + t * to;
}

function lerpVec3(from: Vec3, to: Vec3, t: number): Vec3 {
  return [lerp(from[0], to[0], t), lerp(from[1], to[1], t), lerp(from[2], to[2], t)];
}

export function locateSegment(progress: number, count: number) {
  const position = clamp(progress, 0, 1) * (count - 1);
  const from = Math.floor(position);
  return { from, to: Math.min(from + 1, count - 1), t: position - from };
}

export function sampleDesktopPath(progress: number): Waypoint {
  const { from, to, t } = locateSegment(progress, DESKTOP_WAYPOINTS.length);
  const a = DESKTOP_WAYPOINTS[from];
  const b = DESKTOP_WAYPOINTS[to];
  return { pos: lerpVec3(a.pos, b.pos, t), look: lerpVec3(a.look, b.look, t) };
}

export function sampleMobileLookHeight(progress: number): number {
  const { from, to, t } = locateSegment(progress, MOBILE_LOOK_HEIGHTS.length);
  return lerp(MOBILE_LOOK_HEIGHTS[from], MOBILE_LOOK_HEIGHTS[to], t);
}

export function getMobileDistance(fovDeg: number, aspect: number): number {
  const halfV = (fovDeg * Math.PI) / 180 / 2;
  const halfH = Math.atan(Math.tan(halfV) * aspect);

  const distForWidth = ((SCREEN.width / 2) * FIT_MARGIN) / Math.tan(halfH);
  const distForHeight = ((SCREEN.height / 2) * FIT_MARGIN) / Math.tan(halfV);

  return clamp(
    Math.max(distForWidth, distForHeight),
    MOBILE_DISTANCE_RANGE.min,
    MOBILE_DISTANCE_RANGE.max,
  );
}
