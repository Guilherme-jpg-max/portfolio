/** Contagem no topo da caixa de disquetes. */
export function crateCount(count: number): string {
  if (count === 0) return "vazia";
  return `${count} ${count === 1 ? "disquete" : "disquetes"}`;
}

/** Dica abaixo da caixa no celular; com mais de 3 disquetes a faixa rola. */
export function crateHint(count: number): string {
  if (count > 3) return "← arraste a caixa para ver todos →";
  return count ? "toque no disquete para ler no PC" : "";
}

/** Centro da coluna da fase ativa, em %, para o indicador deslizante. */
export function railPosition(index: number, count: number): string {
  return `${((index + 0.5) / count) * 100}%`;
}
