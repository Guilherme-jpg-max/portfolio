import { Link } from "@tanstack/react-router";

const STACK = {
  "back-end": ["C#", ".NET (Core/Framework)", "Entity Framework", "REST APIs", "Dapper"],
  "front-end": ["React.js", "TypeScript", "JavaScript (ES6+)", "TailwindCSS"],
  "banco de dados": ["PostgreSQL", "MySQL", "SQLite", "Otimização de queries"],
  ferramentas: ["Git/GitHub", "Versionamento de código", "Axios", "TailwindCSS"],
};

const EXPERIENCIAS = [
  {
    cargo: "Desenvolvedor Full Stack",
    empresa: "Box3 Software",
    tag: "Estágio",
    periodo: "out/2025 – jul/2026",
    destaque: true,
    bullets: [
      "Atuação presencial com clientes para compreender o uso real do sistema, mapear fluxos de trabalho e coletar requisitos diretos com usuários finais.",
      "Desenvolvimento do módulo de georreferenciamento fabril, com lógica de coordenadas cartesianas (X, Y, Z) e integração com PostgreSQL e APIs em C#.",
      "Implementação completa da funcionalidade de rateio de pagamentos recorrentes, do back-end à interface front-end.",
      "Refatoração de código legado em jQuery para React/TypeScript, elevando a performance de carregamento em 40%.",
      "Participação ativa na correção de bugs críticos via Backoffice, garantindo 99,5% de estabilidade operacional.",
    ],
  },
  {
    cargo: "Tutor de Programação",
    empresa: "Kodland Brasil",
    tag: null,
    periodo: "ago/2025 – set/2025",
    destaque: false,
    bullets: [
      "Ensino de lógica de programação e Python para diferentes faixas etárias, com foco em didática e comunicação técnica simplificada.",
    ],
  },
  {
    cargo: "Atendente / Administrativo",
    empresa: "M A Romão Costa LTDA",
    tag: null,
    periodo: "mar/2023 – nov/2024",
    destaque: false,
    bullets: [
      "Desenvolvimento de soft skills em resolução de conflitos, comunicação interpessoal e relacionamento com cliente.",
      "Responsabilidade pela gestão de fluxo de caixa e conciliações bancárias diárias.",
    ],
  },
];

const PROJETOS = [
  {
    nome: "UpdateNotification Ecosystem",
    tag: "Interno · Box3",
    stack: "C#, .NET, SQLite, React, TypeScript",
    bullets: [
      "Desenvolvimento de solução completa (API + Client) para gerenciamento de notificações de atualização de software.",
      "Back-end robusto em C# para controle de versões e disparo inteligente de alertas com logging.",
      "Interface responsiva para visualização de histórico de releases e status.",
    ],
  },
  {
    nome: "Teste Técnico Box3 — Consumo de API",
    tag: null,
    stack: "React, Axios, TailwindCSS",
    bullets: [
      "Aplicação desenvolvida para demonstrar proficiência em chamadas assíncronas, tratamento robusto de erros e consumo de dados externos.",
      "Implementação de layout responsivo e componentização eficiente para reutilização de código.",
    ],
  },
  {
    nome: "App de Leitura de Códigos de Barras de Pallets/Caixas",
    tag: null,
    stack: "React, TailwindCSS, Axios, Responsive Design",
    bullets: [
      "Aplicação web para leitura e processamento de códigos de barras e tags RFID de pallets/caixas.",
      "Compatibilidade com múltiplos dispositivos, como smartphones Android, smartwatches e scanners portáteis.",
      "Interface otimizada com TailwindCSS e integração de APIs via Axios para sincronização de dados em tempo real.",
    ],
  },
];

const CURRICULO_PDF_URL = "/Curriculo_Guilherme%20Carlos.pdf";
// Atualize este nome sempre que trocar o arquivo do currículo.

export function CurriculoPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-void px-6 py-16 text-warm-paper/80 font-mono sm:px-12">
      <div className="pointer-events-none absolute inset-0 crt-scanlines crt-vignette" />
      <div className="relative z-10 mx-auto max-w-3xl rounded-md border border-ember/30 bg-void/80 p-6 backdrop-blur-sm sm:p-10">
        <div className="mb-12">
          <Link
            to="/"
            className="text-[10px] uppercase tracking-[0.3em] text-warm-paper/40 hover:text-hot-signal transition-colors"
          >
            ← voltar
          </Link>
          <p className="mt-6 text-sm text-ember">guilherme@portfolio:~$ cat curriculo.txt</p>
          <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-warm-paper tracking-tight">
            Guilherme Carlos Sousa da Silva
          </h1>
          <p className="mt-1 text-sm text-warm-paper/60">
            Desenvolvedor Full Stack Jr · C# · .NET · React · TypeScript · MySQL · PostgreSQL
          </p>
          <p className="mt-2 text-[12px] text-warm-paper/50">
            (88) 92171-5211 · guilhermecarlostrabalho@gmail.com · Crato, Ceará, Brasil
          </p>

          <a
            href={CURRICULO_PDF_URL}
            download="curriculo-guilherme.pdf"
            className="mt-6 inline-block border border-ember/50 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-warm-paper/70 hover:border-hot-signal hover:text-hot-signal transition-colors"
          >
            [ baixar pdf completo ]
          </a>
        </div>

        <Section title="resumo">
          <p className="text-sm leading-relaxed text-warm-paper/70">
            Estudante do 7º semestre de Sistemas de Informação no IFCE, com propósito de construir
            soluções de software que resolvam problemas reais de negócio. Atuei recentemente como
            Desenvolvedor Full Stack na Box3 Software, trabalhando com C#, .NET e React/TypeScript
            no desenvolvimento de sistemas desde o levantamento de requisitos com usuários finais
            até a entrega de funcionalidades do back-end ao front-end. Antes disso, atuei como Tutor
            de Programação na Kodland Brasil, ensinando lógica de programação e Python. Tenho também
            uma trajetória anterior em atendimento ao cliente e gestão administrativa, que me deu
            uma base sólida em comunicação, resolução de conflitos e organização. Busco novas
            oportunidades para continuar crescendo como desenvolvedor full stack em times que
            valorizem código bem estruturado, aprendizado constante e colaboração.
          </p>
        </Section>

        <Section title="stack">
          <div className="grid gap-4 sm:grid-cols-2">
            {Object.entries(STACK).map(([categoria, itens]) => (
              <div key={categoria}>
                <p className="text-[10px] uppercase tracking-[0.2em] text-ember mb-2">
                  {categoria}
                </p>
                <div className="flex flex-wrap gap-2">
                  {itens.map((item) => (
                    <span
                      key={item}
                      className="border border-warm-paper/20 px-2 py-1 text-[11px] text-warm-paper/70"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* experiência */}
        <Section title="experiência">
          <div className="space-y-8">
            {EXPERIENCIAS.map((exp) => (
              <div
                key={exp.cargo + exp.empresa}
                className={
                  exp.destaque
                    ? "border-l-2 border-hot-signal pl-4"
                    : "pl-4 border-l border-warm-paper/10"
                }
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-sm font-semibold text-warm-paper">
                    {exp.cargo} <span className="text-warm-paper/50">· {exp.empresa}</span>
                  </h3>
                  <span className="text-[10px] text-warm-paper/40">{exp.periodo}</span>
                </div>
                {exp.tag && (
                  <span className="text-[10px] uppercase tracking-[0.2em] text-hot-signal">
                    {exp.tag}
                  </span>
                )}
                <ul className="mt-2 space-y-1.5">
                  {exp.bullets.map((b) => (
                    <li
                      key={b}
                      className="text-[13px] leading-relaxed text-warm-paper/60 flex gap-2"
                    >
                      <span className="text-ember">›</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* projetos */}
        <Section title="projetos de destaque">
          <div className="space-y-6">
            {PROJETOS.map((proj) => (
              <div key={proj.nome}>
                <h3 className="text-sm font-semibold text-warm-paper">
                  {proj.nome}{" "}
                  {proj.tag && <span className="text-warm-paper/40 text-[11px]">({proj.tag})</span>}
                </h3>
                <p className="text-[11px] text-ember mt-0.5">{proj.stack}</p>
                <ul className="mt-2 space-y-1.5">
                  {proj.bullets.map((b) => (
                    <li
                      key={b}
                      className="text-[13px] leading-relaxed text-warm-paper/60 flex gap-2"
                    >
                      <span className="text-ember">›</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section title="formação">
          <h3 className="text-sm font-semibold text-warm-paper">
            Bacharelado em Sistemas de Informação
          </h3>
          <p className="text-[13px] text-warm-paper/60 mt-1">
            Instituto Federal de Ciência e Tecnologia do Ceará (IFCE) — Crato, CE
          </p>
          <p className="text-[11px] text-warm-paper/40 mt-1">Previsão de formatura: dez/2026</p>
          <p className="text-[13px] leading-relaxed text-warm-paper/60 mt-2 flex gap-2">
            <span className="text-ember">›</span>
            <span>
              Atividade recente: desenvolvimento de TCC focado em Sistema de Georreferenciamento
              para Monitoramento de Anomalias e Gestão de Zonas de Manejo na Irrigação por
              Gotejamento da Bananicultura.
            </span>
          </p>
        </Section>

        <div className="grid gap-8 sm:grid-cols-2">
          <Section title="competências">
            <ul className="space-y-2 text-[13px] leading-relaxed text-warm-paper/60">
              <li>
                <span className="text-ember">›</span> Comunicação clara e objetiva, com facilidade
                para transmitir conceitos técnicos.
              </li>
              <li>
                <span className="text-ember">›</span> Rapidez e autonomia para aprender novas
                tecnologias e metodologias.
              </li>
              <li>
                <span className="text-ember">›</span> Proatividade para identificar melhorias,
                refatorar código legado e propor soluções otimizadas.
              </li>
              <li>
                <span className="text-ember">›</span> Colaboração em equipes multifuncionais e
                ambientes remotos.
              </li>
            </ul>
          </Section>

          <Section title="idiomas">
            <ul className="space-y-2 text-[13px] leading-relaxed text-warm-paper/60">
              <li>Português — nativo</li>
              <li>Inglês — intermediário (boa leitura técnica e escrita de documentações)</li>
            </ul>
          </Section>
        </div>

        <div className="mt-16 pt-8 border-t border-warm-paper/10 flex justify-center gap-6 font-mono text-[10px] uppercase tracking-[0.3em] text-warm-paper/50">
          <a
            href="https://wa.me/5588921715211?text=Ol%C3%A1%2C%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20falar%20sobre%20uma%20oportunidade!"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-hot-signal transition-colors"
          >
            whatsapp
          </a>
          <span className="text-ember">·</span>
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
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <p className="text-[10px] uppercase tracking-[0.3em] text-ember mb-3"># {title}</p>
      {children}
    </section>
  );
}
