export type Box = { left: number; top: number; width: number; height: number };
export type Size = { width: number; height: number };

export type FlightPath = {
  /** Canto superior esquerdo do disquete no início, em coordenadas da janela. */
  left: number;
  top: number;
  /** Deslocamento do centro da lombada até o centro do drive. */
  dx: number;
  dy: number;
};

const center = (box: Box) => ({ x: box.left + box.width / 2, y: box.top + box.height / 2 });

/** O disquete nasce centrado no item clicado e voa até o centro do drive. */
export function planFlight(from: Box, to: Box, disk: Size): FlightPath {
  const start = center(from);
  const end = center(to);
  return {
    left: start.x - disk.width / 2,
    top: start.y - disk.height / 2,
    dx: end.x - start.x,
    dy: end.y - start.y,
  };
}
