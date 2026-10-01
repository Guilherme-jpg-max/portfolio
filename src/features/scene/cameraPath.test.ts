import { describe, expect, it } from "vitest";
import {
  DESKTOP_WAYPOINTS,
  MOBILE_LOOK_HEIGHTS,
  getMobileDistance,
  lerp,
  locateSegment,
  sampleDesktopPath,
  sampleMobileLookHeight,
} from "./cameraPath";

describe("lerp", () => {
  it("interpola linearmente", () => {
    expect(lerp(0, 10, 0)).toBe(0);
    expect(lerp(0, 10, 0.25)).toBe(2.5);
    expect(lerp(0, 10, 1)).toBe(10);
  });
});

describe("locateSegment", () => {
  it("localiza o trecho e a fração dentro dele", () => {
    expect(locateSegment(0.5, 3)).toEqual({ from: 1, to: 2, t: 0 });
    expect(locateSegment(0.25, 3)).toEqual({ from: 0, to: 1, t: 0.5 });
  });

  it("fica no último ponto no fim e limita valores fora de 0–1", () => {
    expect(locateSegment(1, 4)).toEqual({ from: 3, to: 3, t: 0 });
    expect(locateSegment(2, 4)).toEqual({ from: 3, to: 3, t: 0 });
    expect(locateSegment(-1, 4)).toEqual({ from: 0, to: 1, t: 0 });
  });
});

describe("sampleDesktopPath", () => {
  it("começa no primeiro waypoint e termina no último", () => {
    expect(sampleDesktopPath(0)).toEqual(DESKTOP_WAYPOINTS[0]);
    expect(sampleDesktopPath(1)).toEqual(DESKTOP_WAYPOINTS.at(-1));
  });

  it("passa exatamente pelos waypoints intermediários", () => {
    const { pos } = sampleDesktopPath(1 / 3);
    DESKTOP_WAYPOINTS[1].pos.forEach((value, axis) => expect(pos[axis]).toBeCloseTo(value));
  });
});

describe("sampleMobileLookHeight", () => {
  it("segue as alturas configuradas", () => {
    expect(sampleMobileLookHeight(0)).toBe(MOBILE_LOOK_HEIGHTS[0]);
    expect(sampleMobileLookHeight(1)).toBe(MOBILE_LOOK_HEIGHTS.at(-1));
  });
});

describe("getMobileDistance", () => {
  it("afasta mais a câmera em telas estreitas (retrato)", () => {
    expect(getMobileDistance(50, 390 / 844)).toBeGreaterThan(getMobileDistance(50, 844 / 390));
  });

  it("respeita os limites de distância", () => {
    expect(getMobileDistance(50, 0.05)).toBe(8);
    expect(getMobileDistance(170, 4)).toBe(1.8);
  });
});
