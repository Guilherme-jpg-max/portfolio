import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { CrtCanvas } from "@/components/CrtCanvas";
import { BootSequence } from "@/components/BootSequence";
import { LogTicker } from "@/components/LogTicker";
import { Github, Lock } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Portfolio,
});

const PROJECTS = [
  {
    id: "01",
    name: "geo-fabril",
    stack: "C# · .NET · PostgreSQL",
    blurb:
      "Factory georeferencing module for stock and production mapping. Cartesian (X, Y, Z) coordinate logic on top of C# APIs.",
    status: "internal Box3 Software",
    github: null,
  },
  {
    id: "02",
    name: "rateio-pagamentos",
    stack: "C# · .NET · React · TypeScript",
    blurb:
      "Recurring payment split feature for a finance module. Backend business rules through an interactive React frontend, with precise percentage persistence.",
    status: "internal Box3 Software",
    github: null,
  },
  {
    id: "03",
    name: "update-notification",
    stack: "C# · .NET · SQLite · React",
    blurb:
      "Full API + client ecosystem for software update notifications: version control, smart alert dispatch with logging, and a release history dashboard.",
    status: "internal Box3 Software",
    github: null,
  },
  {
    id: "04",
    name: "technical-assistance",
    stack: "Node.js · Express · MongoDB Atlas · Mongoose · JWT",
    blurb:
      "API REST para gerenciamento de uma assistência técnica, com controle de entrada de aparelhos, orçamentos e autenticação com segundo fator de segurança.",
    status: "Faculdade",
    github: "https://github.com/Guilherme-jpg-max/Technical-assistance",
  },
    {
    id: "05",
    name: "technical-assistance",
    stack: "Node.js · Express · MongoDB Atlas · Mongoose · JWT",
    blurb:
      "API REST para gerenciamento de uma assistência técnica, com controle de entrada de aparelhos, orçamentos e autenticação com segundo fator de segurança.",
    status: "Faculdade",
    github: "https://github.com/Guilherme-jpg-max/Technical-assistance",
  },
    {
    id: "06",
    name: "technical-assistance",
    stack: "Node.js · Express · MongoDB Atlas · Mongoose · JWT",
    blurb:
      "API REST para gerenciamento de uma assistência técnica, com controle de entrada de aparelhos, orçamentos e autenticação com segundo fator de segurança.",
    status: "Faculdade",
    github: "https://github.com/Guilherme-jpg-max/Technical-assistance",
  },
    {
    id: "07",
    name: "technical-assistance",
    stack: "Node.js · Express · MongoDB Atlas · Mongoose · JWT",
    blurb:
      "API REST para gerenciamento de uma assistência técnica, com controle de entrada de aparelhos, orçamentos e autenticação com segundo fator de segurança.",
    status: "Faculdade",
    github: "https://github.com/Guilherme-jpg-max/Technical-assistance",
  },
    {
    id: "08",
    name: "technical-assistance",
    stack: "Node.js · Express · MongoDB Atlas · Mongoose · JWT",
    blurb:
      "API REST para gerenciamento de uma assistência técnica, com controle de entrada de aparelhos, orçamentos e autenticação com segundo fator de segurança.",
    status: "Faculdade",
    github: "https://github.com/Guilherme-jpg-max/Technical-assistance",
  },
    {
    id: "09",
    name: "technical-assistance",
    stack: "Node.js · Express · MongoDB Atlas · Mongoose · JWT",
    blurb:
      "API REST para gerenciamento de uma assistência técnica, com controle de entrada de aparelhos, orçamentos e autenticação com segundo fator de segurança.",
    status: "Faculdade",
    github: "https://github.com/Guilherme-jpg-max/Technical-assistance",
  },
    {
    id: "10",
    name: "technical-assistance",
    stack: "Node.js · Express · MongoDB Atlas · Mongoose · JWT",
    blurb:
      "API REST para gerenciamento de uma assistência técnica, com controle de entrada de aparelhos, orçamentos e autenticação com segundo fator de segurança.",
    status: "Faculdade",
    github: "https://github.com/Guilherme-jpg-max/Technical-assistance",
  },
];

const STACK = [
  "typescript",
  "C#",
  "JavaScript",
  "python",
  "react",
  "postgres",
  ".NET",
  "docker",
  "ASP NET CORE",
  "websockets",
];

function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [bootDone, setBootDone] = useState(false);
  const [reduced, setReduced] = useState(false);

  // ── paginação dos projetos ──
  const PAGE_SIZE = 4;
  const [currentPage, setCurrentPage] = useState(0);
  const scrubberRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(PROJECTS.length / PAGE_SIZE);
  const pagedProjects = PROJECTS.slice(
    currentPage * PAGE_SIZE,
    currentPage * PAGE_SIZE + PAGE_SIZE
  );

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
        <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em]">
          <div className="flex items-center gap-3 text-warm-paper/70">
            <span className="w-2 h-2 rounded-full bg-hot-signal shadow-[0_0_8px_#FF6B4A]" />
            <span>root@dev</span>
            <span className="hidden md:inline text-warm-paper/40">
              — session {new Date().getFullYear()}
            </span>
          </div>
          <nav className="flex items-center gap-5 text-warm-paper/60">
            {[
              ["#terminal", "01_boot"],
              ["#about", "02_about"],
              ["#work", "03_work"],
              ["#contact", "04_contact"],
            ].map(([href, label]) => (
              <a key={href} href={href} className="group hover:text-hot-signal transition-colors">
                <span className="text-signal opacity-0 group-hover:opacity-100 transition-opacity">
                  &gt;{" "}
                </span>
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="relative z-10">
        <section id="terminal" className="relative min-h-screen flex items-center justify-center px-6 pt-24">
          <div
            className={`absolute bottom-10 left-1/2 -translate-x-1/2 text-center font-mono text-[10px] uppercase tracking-[0.4em] text-warm-paper/40 transition-opacity ${
              bootDone ? "opacity-100" : "opacity-0"
            }`}
          >
            ↓ scroll to pull the camera back ↓
          </div>
        </section>

        {/* ── SECTION 2: ABOUT ── */}
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
              <div className="panel-ember p-6 rounded-md rotate-[-0.6deg] fade-up">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-hot-signal mb-3">
                  post-it #1
                </p>
                <p className="font-serif text-lg leading-relaxed text-warm-paper/90">
                  Atualmente atuo com Desenvolvimento de Software, com foco em C# e no ecossistema .NET,
                  porém venho 
                  Contribuindo para o desenvolvimento web com React e TypeScript, aplicando
                  boas práticas de desenvolvimento.
                </p>
              </div>
              <div
                className="panel-ember p-6 rounded-md rotate-[0.4deg] fade-up"
                style={{ animationDelay: "120ms" }}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-hot-signal mb-3">
                  post-it #2
                </p>
                <p className="font-serif text-lg leading-relaxed text-warm-paper/90">
                  Minha trajetória inclui projetos práticos como o desenvolvimento de um
                  sistema de gestão para uma lanchonete e a criação de uma plataforma de
                  aluguel de bicicletas, que solidificaram minhas habilidades em lógica,
                  modelagem de dados e entrega de software.
                </p>
              </div>
              <div
                className="panel-ember p-6 rounded-md fade-up"
                style={{ animationDelay: "240ms" }}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-hot-signal mb-3">
                  ls ~/skills
                </p>
                <div className="flex flex-wrap gap-2 font-mono text-xs">
                  {STACK.map((s) => (
                    <span
                      key={s}
                      className="border border-ember px-2 py-1 text-warm-paper/80 hover:text-hot-signal hover:border-signal transition-colors"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 3: WORK ── */}
        <section id="work" className="px-6 py-24">
          <div className="mx-auto max-w-6xl w-full">
            <div className="mb-8 flex items-end justify-between">
              {/* <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-signal mb-4">
                  // 03_work/
                </p>
                <h2 className="font-mono text-3xl md:text-5xl uppercase tracking-wider text-warm-paper text-signal-glow">
                  selected
                  <br />
                  output
                </h2>
              </div> */}
              <span className="hidden md:block font-mono text-[10px] uppercase tracking-[0.3em] text-warm-paper/40">
                {PROJECTS.length} files · sorted by recency
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
                      href: p.github,
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

            {/* ── PAGE SCRUBBER ── */}
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
                  {/* track */}
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

                  {/* draggable cursor knob */}
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
                    {currentPage + 1}/{totalPages} pages · {Math.round(((currentPage + 1) / totalPages) * 100)}%
                  </span>
                </div>
              </div>
            )}
          </div>
        </section>

        <section id="contact" className="min-h-screen flex items-center px-6 py-24">
          <div className="mx-auto max-w-2xl w-full">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-signal mb-4 text-center">
              // 04_contact.sh
            </p>
            <h2 className="font-mono text-3xl md:text-5xl uppercase tracking-wider text-warm-paper text-signal-glow text-center mb-10">
              open a<br />
              channel.
            </h2>
            <form
              className="panel-ember crt-flicker p-6 md:p-10 rounded-md font-mono text-sm"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget as HTMLFormElement;
                form.reset();
                (document.getElementById("send-ack") as HTMLElement).style.opacity = "1";
              }}
            >
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-ember/60">
                <span className="w-2 h-2 rounded-full bg-hot-signal shadow-[0_0_8px_#FF6B4A]" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-warm-paper/50">
                  session · encrypted
                </span>
              </div>

              <label className="block mb-4">
                <span className="text-hot-signal">root@dev:~$</span>{" "}
                <span className="text-warm-paper/60">--name</span>
                <input
                  required
                  type="text"
                  className="mt-1 w-full bg-transparent border-b border-ember focus:border-signal outline-none py-2 text-warm-paper placeholder:text-warm-paper/30"
                  placeholder="your name"
                />
              </label>

              <label className="block mb-4">
                <span className="text-hot-signal">root@dev:~$</span>{" "}
                <span className="text-warm-paper/60">--reply-to</span>
                <input
                  required
                  type="email"
                  className="mt-1 w-full bg-transparent border-b border-ember focus:border-signal outline-none py-2 text-warm-paper placeholder:text-warm-paper/30"
                  placeholder="you@domain.tld"
                />
              </label>

              <label className="block mb-6">
                <span className="text-hot-signal">root@dev:~$</span>{" "}
                <span className="text-warm-paper/60">--message</span>
                <textarea
                  required
                  rows={4}
                  className="mt-1 w-full bg-transparent border border-ember focus:border-signal outline-none p-3 text-warm-paper placeholder:text-warm-paper/30 resize-none"
                  placeholder="what are you building?"
                />
              </label>

              <button
                type="submit"
                className="w-full border border-signal bg-signal/10 hover:bg-signal/25 text-warm-paper font-mono uppercase tracking-[0.3em] text-xs py-3 transition-all hover:text-hot-glow"
              >
                $ send --now
              </button>

              <div
                id="send-ack"
                className="mt-4 text-center text-[11px] text-hot-signal opacity-0 transition-opacity"
              >
                {"> transmission acknowledged. reply within 48h."}
              </div>
            </form>

            <div className="mt-10 flex justify-center gap-6 font-mono text-[10px] uppercase tracking-[0.3em] text-warm-paper/50">
              <a
                href="https://github.com/Guilherme-jpg-max"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-hot-signal transition-colors"
              >
                github
              </a>
              <span className="text-ember">·</span>
              <a
                href="https://www.linkedin.com/in/guilhermecarlos03/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-hot-signal transition-colors"
              >
                linkedin
              </a>
            </div>
          </div>
        </section>

        {/* Footer status */}
        <footer className="relative z-10 border-t border-ember/40 bg-void/80 backdrop-blur-sm px-6 py-4">
          <div className="mx-auto max-w-7xl flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-warm-paper/40">
            <span>uptime: {new Date().getFullYear() - 2017}y</span>
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