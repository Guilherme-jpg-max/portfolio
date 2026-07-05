import { Link } from "@tanstack/react-router";

const STACK = {
  "back-end": ["C#", ".NET (Core/Framework)", "Entity Framework", "REST APIs", "Dapper"],
  "front-end": ["React.js", "TypeScript", "JavaScript (ES6+)", "TailwindCSS"],
  "banco de dados": ["PostgreSQL", "MySQL", "SQLite", "Query optimization"],
  ferramentas: ["Git/GitHub", "Versionamento de código"],
};

const EXPERIENCIAS = [
  {
    cargo: "Desenvolvedor Full Stack",
    empresa: "Box3 Software",
    tag: "Estágio · Cargo Atual",
    periodo: "out/2025 – Presente",
    destaque: true,
    bullets: [
      "Atuação presencial com clientes: visitação às operações das empresas parceiras, mapeamento de fluxos de trabalho reais e coleta de requisitos com usuários finais.",
      "Sistema de georreferenciamento fabril: módulo completo para mapeamento de estoque e produção, com lógica de coordenadas cartesianas (X, Y, Z) via PostgreSQL e APIs C#.",
      "Gestão financeira: implementação completa do rateio de pagamentos recorrentes, do back-end à interface front-end.",
      "Refatoração de código legado de jQuery para React/TypeScript, elevando a performance de carregamento em 40%.",
      "Correção de bugs críticos via Backoffice, mantendo 99.5% de estabilidade operacional.",
    ],
  },
  {
    cargo: "Tutor de Programação",
    empresa: "Kodland Brasil",
    tag: null,
    periodo: "ago/2025 – set/2025",
    destaque: false,
    bullets: [
      "Ensino de lógica de programação e Python para múltiplas faixas etárias.",
    ],
  },
  {
    cargo: "Atendente / Administrativo",
    empresa: "M A Romão Costa LTDA",
    tag: null,
    periodo: "mar/2023 – nov/2024",
    destaque: false,
    bullets: [
      "Resolução de conflitos, comunicação interpessoal e gestão de relacionamento com cliente.",
      "Gestão de fluxo de caixa e conciliações bancárias diárias.",
    ],
  },
];

const PROJETOS = [
  {
    nome: "UpdateNotification Ecosystem",
    tag: "Interno · Box3",
    stack: "C#, .NET, SQLite, React, TypeScript",
    bullets: [
      "Solução completa (API + Client) para gerenciamento de notificações de atualização de software.",
      "API robusta em C# para controle de versões e disparo inteligente de alertas com logging.",
      "Interface para visualização de histórico de releases e status.",
    ],
  },
  {
    nome: "Teste Técnico Box3 — Consumo de API",
    tag: null,
    stack: "React, Axios, TailwindCSS",
    bullets: [
      "Aplicação para demonstrar chamadas assíncronas e tratamento robusto de erros.",
      "Layout responsivo e componentização eficiente para reutilização de código.",
    ],
  },
  {
    nome: "App de Leitura de Códigos de Barras",
    tag: null,
    stack: "React, TailwindCSS, Axios, Responsive Design",
    bullets: [
      "Aplicação web para leitura de códigos de barras e tags RFID de pallets/caixas.",
      "Compatível com smartphones Android, smartwatches e scanners portáteis.",
    ],
  },
];

export function CurriculoPage() {
  return (
    <main className="min-h-screen bg-black text-warm-paper/80 font-mono px-6 py-16 sm:px-12">
      <div className="mx-auto max-w-3xl">
        {/* header */}
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
            Desenvolvedor Full Stack · C# · .NET · React
          </p>

          <a
            href="/curriculo.pdf"
            download
            className="mt-6 inline-block border border-ember/50 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-warm-paper/70 hover:border-hot-signal hover:text-hot-signal transition-colors"
          >
            [ baixar pdf ]
          </a>
        </div>

        {/* resumo */}
        <Section title="resumo">
          <p className="text-sm leading-relaxed text-warm-paper/70">
            Desenvolvedor Full Stack com formação em andamento em Sistemas de
            Informação (7º semestre, IFCE). Experiência prática no
            desenvolvimento de aplicações web escaláveis, atuando
            principalmente com C#, .NET e React/TypeScript, com foco em
            resolver problemas de negócio através de código bem estruturado.
            Busco efetivação ou novas oportunidades para aplicar expertise no
            desenvolvimento de software.
          </p>
        </Section>

        {/* stack */}
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
                className={exp.destaque ? "border-l-2 border-hot-signal pl-4" : "pl-4 border-l border-warm-paper/10"}
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
                    <li key={b} className="text-[13px] leading-relaxed text-warm-paper/60 flex gap-2">
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
                  {proj.nome} {proj.tag && <span className="text-warm-paper/40 text-[11px]">({proj.tag})</span>}
                </h3>
                <p className="text-[11px] text-ember mt-0.5">{proj.stack}</p>
                <ul className="mt-2 space-y-1.5">
                  {proj.bullets.map((b) => (
                    <li key={b} className="text-[13px] leading-relaxed text-warm-paper/60 flex gap-2">
                      <span className="text-ember">›</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* formação */}
        <Section title="formação">
          <h3 className="text-sm font-semibold text-warm-paper">
            Bacharelado em Sistemas de Informação
          </h3>
          <p className="text-[13px] text-warm-paper/60 mt-1">
            Instituto Federal de Ciência e Tecnologia do Ceará (IFCE) — Crato, CE
          </p>
          <p className="text-[11px] text-warm-paper/40 mt-1">
            Previsão de formatura: dez/2026
          </p>
          <p className="text-[13px] leading-relaxed text-warm-paper/60 mt-2 flex gap-2">
            <span className="text-ember">›</span>
            <span>
              TCC: Sistema de Georreferenciamento para Monitoramento de
              Anomalias e Gestão de Zonas de Manejo na Irrigação por
              Gotejamento da Bananicultura.
            </span>
          </p>
        </Section>

        {/* competências + idiomas */}
        <div className="grid gap-8 sm:grid-cols-2">
          <Section title="competências">
            <ul className="space-y-2 text-[13px] leading-relaxed text-warm-paper/60">
              <li><span className="text-ember">›</span> Comunicação técnica clara e objetiva.</li>
              <li><span className="text-ember">›</span> Aprendizado rápido e autônomo de novas stacks.</li>
              <li><span className="text-ember">›</span> Proatividade em refatorar e otimizar código.</li>
              <li><span className="text-ember">›</span> Colaboração em times multifuncionais remotos.</li>
            </ul>
          </Section>

          <Section title="idiomas">
            <ul className="space-y-2 text-[13px] leading-relaxed text-warm-paper/60">
              <li>Português — nativo</li>
              <li>Inglês — intermediário (boa leitura técnica)</li>
            </ul>
          </Section>
        </div>

        {/* contato */}
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
      <p className="text-[10px] uppercase tracking-[0.3em] text-ember mb-3">
        # {title}
      </p>
      {children}
    </section>
  );
}