import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { CrtCanvas } from "@/components/CrtCanvas";
import { LogTicker } from "@/components/LogTicker";
import { SmartLink } from "@/components/SmartLink";
import { FileText, Github, Linkedin, Lock, MessageCircle, type LucideIcon } from "lucide-react";
import { channels } from "@/content/channels";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { skillGroups } from "@/content/skills";
import type { ChannelKind } from "@/content/types";

const CHANNEL_ICONS: Record<ChannelKind, LucideIcon> = {
  whatsapp: MessageCircle,
  linkedin: Linkedin,
  github: Github,
  resume: FileText,
};

export const Route = createFileRoute("/")({
  component: Portfolio,
});

function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [bootDone, setBootDone] = useState(false);
  const [reduced, setReduced] = useState(false);

  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(0);
  const scrubberRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(projects.length / pageSize);
  const pagedProjects = projects.slice(currentPage * pageSize, currentPage * pageSize + pageSize);

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(page, 0), totalPages - 1));
  };

  const handleScrubberDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const updateFromEvent = (ev: MouseEvent | React.MouseEvent) => {
      if (!scrubberRef.current) return;
      const rect = scrubberRef.current.getBoundingClientRect();
      const ratio = (ev.clientX - rect.left) / rect.width;
      const page = Math.floor(ratio * totalPages);
      goToPage(page);
    };

    updateFromEvent(e);

    const onMove = (ev: MouseEvent) => updateFromEvent(ev);
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "h" || e.key === "ArrowLeft") goToPage(currentPage - 1);
      if (e.key === "l" || e.key === "ArrowRight") goToPage(currentPage + 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [currentPage, totalPages]);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    const update = () => setPageSize(mql.matches ? 2 : 4);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    setCurrentPage((p) => Math.min(p, Math.max(0, Math.ceil(projects.length / pageSize) - 1)));
  }, [pageSize]);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const max = el.scrollHeight - window.innerHeight;
      setProgress(Math.max(0, Math.min(1, window.scrollY / max)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative bg-void text-warm-paper">
      <div className="fixed inset-0 z-0">
        <CrtCanvas progress={reduced ? 0.3 : progress} />
        <div className="pointer-events-none absolute inset-0 crt-scanlines crt-vignette" />
        <div
          className="pointer-events-none absolute inset-0 opacity-60 mix-blend-screen"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(196,30,30,0.22) 0%, transparent 70%)",
          }}
        />
      </div>

      <LogTicker />
      <header className="fixed top-0 inset-x-0 z-30 border-b border-ember/40 bg-void/70 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-3 flex items-center justify-between font-mono text-[10px] md:text-[11px] uppercase tracking-[0.1em] md:tracking-[0.25em]">
          <div className="flex items-center gap-2 md:gap-3 text-warm-paper/70">
            <span className="w-2 h-2 rounded-full bg-hot-signal shadow-[0_0_8px_#FF6B4A]" />
            <span>root@dev</span>
            <span className="hidden md:inline text-warm-paper/40">
              — session {new Date().getFullYear()}
            </span>
          </div>
          <nav className="flex items-center gap-3 md:gap-5 text-warm-paper/60">
            {[
              ["#terminal", "01_boot", "boot"],
              ["#about", "02_about", "about"],
              ["#work", "03_work", "work"],
              ["#contact", "04_contact", "contact"],
            ].map(([href, fullLabel, shortLabel]) => (
              <a key={href} href={href} className="group hover:text-hot-signal transition-colors">
                <span className="hidden md:inline text-signal opacity-0 group-hover:opacity-100 transition-opacity">
                  &gt;{" "}
                </span>
                <span className="hidden md:inline">{fullLabel}</span>
                <span className="md:hidden">{shortLabel}</span>
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="relative z-10">
        <section
          id="terminal"
          className="relative min-h-screen flex items-center justify-center px-6 pt-24"
        >
          <div
            className={`absolute bottom-10 left-1/2 -translate-x-1/2 text-center font-mono text-[10px] uppercase tracking-[0.4em] text-warm-paper/40 transition-opacity ${
              bootDone ? "opacity-100" : "opacity-0"
            }`}
          >
            ↓ scroll to pull the camera back ↓
          </div>
        </section>

        <section id="about" className="min-h-screen flex items-center px-6 py-24">
          <div className="mx-auto max-w-6xl w-full grid md:grid-cols-12 gap-8">
            <div className="md:col-span-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-signal mb-4">
                // 02_sobre.md
              </p>
              <h2 className="font-mono text-3xl md:text-5xl uppercase tracking-wider text-warm-paper text-signal-glow">
                notas
                <br />
                sobre meu
                <br />
                trabalho.
              </h2>
            </div>

            <div className="md:col-span-7 space-y-6">
              <div className="panel-ember p-6 rounded-md rotate-[-0.15deg] fade-up">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-hot-signal mb-3">
                  ~/about.md · foco atual
                </p>
                <p className="font-serif text-lg leading-relaxed text-warm-paper/90">
                  Sou desenvolvedor Full Stack Jr, estudante do 7º semestre de Sistemas de
                  Informação no IFCE. Atuei como estagiário na Box3 Software, trabalhando com C# e
                  .NET no back-end e React/TypeScript no front-end.
                </p>
              </div>

              <div
                className="panel-ember p-6 rounded-md rotate-[0.1deg] fade-up"
                style={{ animationDelay: "120ms" }}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-hot-signal mb-3">
                  ~/experience.log · trajetória
                </p>
                <p className="font-serif text-lg leading-relaxed text-warm-paper/90">
                  No meu estágio anterior desenvolvi um módulo de georreferenciamento fabril com
                  lógica de coordenadas cartesianas e a funcionalidade completa de rateio de
                  pagamentos recorrentes, do back-end ao front-end. Também refatorei código legado
                  de jQuery para React/TypeScript.
                </p>
              </div>

              <div
                className="panel-ember p-6 rounded-md fade-up"
                style={{ animationDelay: "240ms" }}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-hot-signal mb-3">
                  ls ~/skills
                </p>
                <div className="space-y-3">
                  {skillGroups.map((group) => (
                    <div
                      key={group.label}
                      className="flex flex-wrap items-center gap-2 font-mono text-xs"
                    >
                      <span className="text-warm-paper/40 w-24 shrink-0">{group.label}</span>
                      {group.items.map((s) => (
                        <span
                          key={s}
                          className="border border-ember px-2 py-1 text-warm-paper/80 hover:text-hot-signal hover:border-signal transition-colors"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="px-6 py-24">
          <div className="mx-auto max-w-6xl w-full">
            <div className="mb-8 flex items-end justify-between">
              <span className="hidden md:block font-mono text-[10px] uppercase tracking-[0.3em] text-warm-paper/40">
                {projects.length} files · sorted by recency
              </span>
            </div>

            <div key={currentPage} className="grid md:grid-cols-2 gap-3 auto-rows-fr">
              {pagedProjects.map((p, i) => {
                const isPrivate = !p.github;
                const Wrapper = isPrivate ? "div" : "a";

                return (
                  <Wrapper
                    key={p.id}
                    {...(!isPrivate && {
                      href: p.github ?? undefined,
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                    className={`panel-ember p-4 rounded-md group relative overflow-hidden fade-up block ${
                      isPrivate ? "cursor-default" : "cursor-pointer"
                    }`}
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(ellipse at top, rgba(255,107,74,0.12), transparent 70%)",
                      }}
                    />
                    <div className="relative flex items-start justify-between mb-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-warm-paper/40">
                        /{p.id}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-hot-signal border border-ember px-2 py-0.5">
                        {p.status}
                      </span>
                    </div>
                    <h3 className="relative font-mono text-xl uppercase tracking-wider text-warm-paper group-hover:text-hot-glow transition-all mb-1.5">
                      {p.name}
                    </h3>
                    <p className="relative font-mono text-[11px] text-signal mb-3 tracking-wider">
                      {p.stack}
                    </p>
                    <p className="relative font-serif text-sm leading-relaxed text-warm-paper/85 line-clamp-3">
                      {p.blurb}
                    </p>
                    <div className="relative mt-4 pt-3 border-t border-ember/40 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-warm-paper/50 group-hover:text-hot-signal transition-colors">
                      {isPrivate ? (
                        <span className="flex items-center gap-2">
                          <Lock size={12} />
                          private repository
                        </span>
                      ) : (
                        <>
                          <span className="flex items-center gap-2">
                            <Github size={12} />
                            view source
                          </span>
                          <span>→</span>
                        </>
                      )}
                    </div>
                  </Wrapper>
                );
              })}
            </div>

            {totalPages > 1 && (
              <div className="mt-6 select-none">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-warm-paper/40 mb-2">
                  root@dev:~/work$ fetching page {currentPage + 1} of {totalPages}...
                </p>

                <div
                  ref={scrubberRef}
                  onMouseDown={handleScrubberDown}
                  className="relative h-6 flex items-center cursor-pointer group/scrub"
                >
                  <div className="relative w-full h-2 flex gap-[2px]">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <div
                        key={i}
                        className={`flex-1 h-full rounded-[1px] transition-all duration-300 ${
                          i <= currentPage
                            ? "bg-hot-signal shadow-[0_0_8px_rgba(255,107,74,0.6)]"
                            : "bg-ember/25"
                        } ${i === currentPage ? "brightness-125" : ""}`}
                      />
                    ))}
                  </div>

                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-hot-signal shadow-[0_0_10px_rgba(255,107,74,0.9)] transition-all duration-300 pointer-events-none"
                    style={{
                      left: `calc(${((currentPage + 0.5) / totalPages) * 100}% - 6px)`,
                    }}
                  />
                </div>

                <div className="flex items-center justify-between mt-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-warm-paper/40">
                    [h] prev · [l] next · click to jump
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-hot-signal">
                    {currentPage + 1}/{totalPages} pages ·{" "}
                    {Math.round(((currentPage + 1) / totalPages) * 100)}%
                  </span>
                </div>
              </div>
            )}
          </div>
        </section>

        <section id="contact" className="min-h-screen flex items-center px-6 py-24">
          <div className="mx-auto max-w-3xl w-full">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-signal mb-4 text-center">
              // 04_contact.sh
            </p>
            <h2 className="font-mono text-3xl md:text-5xl uppercase tracking-wider text-warm-paper text-signal-glow text-center mb-4">
              open a<br />
              channel.
            </h2>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-warm-paper/40 text-center mb-10">
              ls ~/channels · escolha por onde falar comigo
            </p>

            <div className="grid sm:grid-cols-2 gap-3">
              {channels.map((c, i) => {
                const Icon = CHANNEL_ICONS[c.kind];
                const target = c.to !== undefined ? { to: c.to } : { href: c.href };

                return (
                  <SmartLink
                    key={c.id}
                    {...target}
                    className="panel-ember p-5 rounded-md group relative overflow-hidden fade-up flex items-center gap-4"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(ellipse at top, rgba(255,107,74,0.12), transparent 70%)",
                      }}
                    />
                    <div className="relative flex items-center justify-center w-10 h-10 rounded-md border border-ember text-warm-paper/70 group-hover:text-hot-signal group-hover:border-signal transition-colors shrink-0">
                      <Icon size={18} />
                    </div>
                    <div className="relative min-w-0">
                      <p className="font-mono text-sm uppercase tracking-[0.2em] text-warm-paper group-hover:text-hot-signal transition-colors">
                        {c.label}
                      </p>
                      <p className="font-mono text-[11px] text-warm-paper/50 truncate">
                        {c.detail}
                      </p>
                    </div>
                    <span className="relative ml-auto font-mono text-warm-paper/30 group-hover:text-hot-signal transition-colors">
                      →
                    </span>
                  </SmartLink>
                );
              })}
            </div>
          </div>
        </section>

        <footer className="relative z-10 border-t border-ember/40 bg-void/80 backdrop-blur-sm px-6 py-4">
          <div className="mx-auto max-w-7xl flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-warm-paper/40">
            <span>uptime: {new Date().getFullYear() - profile.careerStartYear}y</span>
            <span>
              status: <span className="text-hot-signal">available</span>
            </span>
            <span className="hidden md:inline">© signed with sha-256</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
