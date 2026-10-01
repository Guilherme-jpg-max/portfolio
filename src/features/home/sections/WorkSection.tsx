import { useEffect } from "react";
import { projects } from "@/content/projects";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { usePagination } from "@/hooks/usePagination";
import { ProjectCard } from "../components/ProjectCard";
import { ProjectPager } from "../components/ProjectPager";

const PAGE_SIZE = { desktop: 4, mobile: 2 } as const;

export function WorkSection() {
  const isMobile = useIsMobile();
  const { pageItems, currentPage, totalPages, goTo, prev, next } = usePagination(
    projects,
    isMobile ? PAGE_SIZE.mobile : PAGE_SIZE.desktop,
  );

  // Navegação estilo vim: h/← volta, l/→ avança. Atalhos com modificador
  // (ex.: Ctrl+L) e teclas digitadas em campos de texto ficam com o navegador.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey || isEditable(event.target)) return;
      if (event.key === "h" || event.key === "ArrowLeft") prev();
      if (event.key === "l" || event.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [prev, next]);

  return (
    <section id="work" className="px-6 py-24">
      <div className="mx-auto max-w-6xl w-full">
        <div className="mb-8 flex items-end justify-between">
          <span className="hidden md:block font-mono text-[10px] uppercase tracking-[0.3em] text-warm-paper/40">
            {projects.length} files · sorted by recency
          </span>
        </div>

        {/* A key reinicia a animação de entrada a cada troca de página. */}
        <div key={currentPage} className="grid md:grid-cols-2 gap-3 auto-rows-fr">
          {pageItems.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <ProjectPager currentPage={currentPage} totalPages={totalPages} onPageChange={goTo} />
        )}
      </div>
    </section>
  );
}

function isEditable(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
  );
}
