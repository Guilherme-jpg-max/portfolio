/** Brilho radial que aparece no hover de um card com a classe `group`. */
export function GlowOverlay() {
  return (
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
      style={{
        background: "radial-gradient(ellipse at top, rgba(255,107,74,0.12), transparent 70%)",
      }}
    />
  );
}
