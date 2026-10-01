import { cx } from "@/lib/cx";

type Props = {
  /** Exibe a dica de rolagem (com fade) quando `true`. */
  showScrollHint: boolean;
};

/** Primeira tela: vazia de propósito, para a cena 3D ficar em destaque. */
export function HeroSection({ showScrollHint }: Props) {
  return (
    <section
      id="terminal"
      className="relative min-h-screen flex items-center justify-center px-6 pt-24"
    >
      <div
        className={cx(
          "absolute bottom-10 left-1/2 -translate-x-1/2 text-center font-mono text-[10px] uppercase tracking-[0.4em] text-warm-paper/40 transition-opacity",
          showScrollHint ? "opacity-100" : "opacity-0",
        )}
      >
        ↓ scroll to pull the camera back ↓
      </div>
    </section>
  );
}
