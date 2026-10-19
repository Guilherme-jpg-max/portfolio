import { cx } from "@/lib/cx";

type Props = {
  showScrollHint: boolean;
};

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
        ↓ role para afastar a câmera ↓
      </div>
    </section>
  );
}
