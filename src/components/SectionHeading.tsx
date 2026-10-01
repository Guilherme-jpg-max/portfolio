import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

type Props = {
  /** Rótulo em estilo de arquivo exibido acima do título (ex.: `// 02_sobre.md`). */
  label: string;
  children: ReactNode;
  centered?: boolean;
};

export function SectionHeading({ label, children, centered = false }: Props) {
  return (
    <>
      <p
        className={cx(
          "font-mono text-[11px] uppercase tracking-[0.3em] text-signal mb-4",
          centered && "text-center",
        )}
      >
        {label}
      </p>
      <h2
        className={cx(
          "font-mono text-3xl md:text-5xl uppercase tracking-wider text-warm-paper text-signal-glow",
          centered && "text-center mb-4",
        )}
      >
        {children}
      </h2>
    </>
  );
}
