import { useRef } from "react";
import { LogTicker } from "@/components/LogTicker";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { useIsClient } from "@/hooks/useIsClient";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { SceneBackground } from "@/features/scene/SceneBackground";
import { AboutSection } from "./sections/AboutSection";
import { ContactSection } from "./sections/ContactSection";
import { HeroSection } from "./sections/HeroSection";
import { WorkSection } from "./sections/WorkSection";

/** Com movimento reduzido a câmera fica parada neste ponto do caminho. */
const REDUCED_MOTION_PROGRESS = { current: 0.3 };

export function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useScrollProgress(containerRef);
  const reducedMotion = usePrefersReducedMotion();
  const isClient = useIsClient();

  return (
    <div ref={containerRef} className="relative bg-void text-warm-paper">
      <SceneBackground progress={reducedMotion ? REDUCED_MOTION_PROGRESS : scrollProgress} />
      <LogTicker />
      <SiteHeader />

      <main className="relative z-10">
        <HeroSection showScrollHint={isClient} />
        <AboutSection />
        <WorkSection />
        <ContactSection />
        <SiteFooter />
      </main>
    </div>
  );
}
