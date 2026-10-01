import { Link } from "@tanstack/react-router";
import { profile } from "@/content/profile";
import {
  competencies,
  education,
  experiences,
  languages,
  resumeProjects,
  stack,
  summary,
} from "@/content/resume";

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
            {profile.fullName}
          </h1>
          <p className="mt-1 text-sm text-warm-paper/60">{profile.headline}</p>
          <p className="mt-2 text-[12px] text-warm-paper/50">
            {`${profile.phone} · ${profile.email} · ${profile.location}`}
          </p>

          <a
            href={profile.resumePdf.url}
            download={profile.resumePdf.downloadName}
            className="mt-6 inline-block border border-ember/50 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-warm-paper/70 hover:border-hot-signal hover:text-hot-signal transition-colors"
          >
            [ baixar pdf completo ]
          </a>
        </div>

        <Section title="resumo">
          <p className="text-sm leading-relaxed text-warm-paper/70">{summary}</p>
        </Section>

        <Section title="stack">
          <div className="grid gap-4 sm:grid-cols-2">
            {Object.entries(stack).map(([categoria, itens]) => (
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
            {experiences.map((exp) => (
              <div
                key={exp.role + exp.company}
                className={
                  exp.highlight
                    ? "border-l-2 border-hot-signal pl-4"
                    : "pl-4 border-l border-warm-paper/10"
                }
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-sm font-semibold text-warm-paper">
                    {exp.role} <span className="text-warm-paper/50">· {exp.company}</span>
                  </h3>
                  <span className="text-[10px] text-warm-paper/40">{exp.period}</span>
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
            {resumeProjects.map((proj) => (
              <div key={proj.name}>
                <h3 className="text-sm font-semibold text-warm-paper">
                  {proj.name}{" "}
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
          <h3 className="text-sm font-semibold text-warm-paper">{education.degree}</h3>
          <p className="text-[13px] text-warm-paper/60 mt-1">{education.institution}</p>
          <p className="text-[11px] text-warm-paper/40 mt-1">{education.graduation}</p>
          <p className="text-[13px] leading-relaxed text-warm-paper/60 mt-2 flex gap-2">
            <span className="text-ember">›</span>
            <span>{education.note}</span>
          </p>
        </Section>

        <div className="grid gap-8 sm:grid-cols-2">
          <Section title="competências">
            <ul className="space-y-2 text-[13px] leading-relaxed text-warm-paper/60">
              {competencies.map((item) => (
                <li key={item}>
                  <span className="text-ember">›</span> {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="idiomas">
            <ul className="space-y-2 text-[13px] leading-relaxed text-warm-paper/60">
              {languages.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Section>
        </div>

        <div className="mt-16 pt-8 border-t border-warm-paper/10 flex justify-center gap-6 font-mono text-[10px] uppercase tracking-[0.3em] text-warm-paper/50">
          <a
            href={profile.links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-hot-signal transition-colors"
          >
            whatsapp
          </a>
          <span className="text-ember">·</span>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-hot-signal transition-colors"
          >
            github
          </a>
          <span className="text-ember">·</span>
          <a
            href={profile.links.linkedin}
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
