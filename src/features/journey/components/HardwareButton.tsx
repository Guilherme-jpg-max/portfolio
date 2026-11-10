import { cx } from "@/lib/cx";

/** Botão "físico" do gabinete do PC. */
export const hardwareButton = (hot = false) =>
  cx(
    "inline-flex shrink-0 items-center whitespace-nowrap justify-center gap-1.5 lg:gap-[7px] rounded-[3px] border px-2.5 lg:px-3",
    "min-h-10 min-w-10 lg:min-h-[34px] lg:min-w-0 shadow-[0_2px_0_var(--color-crt-shadow)] no-underline",
    "transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hot-signal",
    hot
      ? "border-hot-signal bg-hot-signal text-void hover:border-warm-paper hover:bg-warm-paper hover:text-void"
      : "border-ember-deep bg-[linear-gradient(180deg,var(--color-crt-panel),var(--color-crt-bezel))] text-warm-paper/80",
  );
