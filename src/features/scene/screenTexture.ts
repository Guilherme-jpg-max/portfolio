import * as THREE from "three";
import { sceneColors } from "./theme";

const WIDTH = 512;
const HEIGHT = 384;
const PADDING = 20;
const LINE_HEIGHT = 22;
const SCANLINE_SPACING = 3;
const FONT = "600 16px 'JetBrains Mono', ui-monospace, monospace";

export type ScreenTexture = {
  texture: THREE.CanvasTexture;
  ctx: CanvasRenderingContext2D;
};

/** Cria o canvas 2D usado como textura (e emissão) da tela do monitor. */
export function createScreenTexture(): ScreenTexture {
  const canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D indisponível para a textura da tela.");

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.colorSpace = THREE.SRGBColorSpace;
  return { texture, ctx };
}

/**
 * Desenha o terminal: fundo, scanlines, linhas de texto e vinheta. Linhas que
 * começam com `root@dev` saem na cor de prompt; um `_` final vira o cursor.
 */
export function drawScreen(
  ctx: CanvasRenderingContext2D,
  lines: readonly string[],
  showCursor: boolean,
): void {
  ctx.fillStyle = sceneColors.screen;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  ctx.fillStyle = "rgba(0,0,0,0.28)";
  for (let y = 0; y < HEIGHT; y += SCANLINE_SPACING) {
    ctx.fillRect(0, y, WIDTH, 1);
  }

  ctx.font = FONT;
  ctx.textBaseline = "top";
  lines.forEach((line, i) => {
    ctx.fillStyle = line.startsWith("root@dev") ? sceneColors.hotSignal : sceneColors.warmPaper;
    const text = line.replace(/_$/, showCursor ? "▊" : " ");
    ctx.fillText(text, PADDING, PADDING + i * LINE_HEIGHT);
  });

  const vignette = ctx.createRadialGradient(
    WIDTH / 2,
    HEIGHT / 2,
    40,
    WIDTH / 2,
    HEIGHT / 2,
    WIDTH * 0.7,
  );
  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(1, "rgba(30,3,3,0.75)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
}
