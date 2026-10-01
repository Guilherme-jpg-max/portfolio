import type { CSSProperties, ReactNode } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { aboutNotes } from "@/content/about";
import { skillGroups } from "@/content/skills";
import { cx } from "@/lib/cx";

export function AboutSection() {
  return (
    <section id="about" className="min-h-screen flex items-center px-6 py-24">
      <div className="mx-auto max-w-6xl w-full grid md:grid-cols-12 gap-8">
        <div className="md:col-span-5">
          <SectionHeading label="// 02_sobre.md">
            notas
            <br />
            sobre meu
            <br />
            trabalho.
          </SectionHeading>
        </div>

        <div className="md:col-span-7 space-y-6">
          <NotePanel label={aboutNotes.focus.label} className="rotate-[-0.15deg]">
            <NoteText>{aboutNotes.focus.text}</NoteText>
          </NotePanel>

          <NotePanel
            label={aboutNotes.experience.label}
            className="rotate-[0.1deg]"
            style={{ animationDelay: "120ms" }}
          >
            <NoteText>{aboutNotes.experience.text}</NoteText>
          </NotePanel>

          <NotePanel label="ls ~/skills" style={{ animationDelay: "240ms" }}>
            <div className="space-y-3">
              {skillGroups.map((group) => (
                <div
                  key={group.label}
                  className="flex flex-wrap items-center gap-2 font-mono text-xs"
                >
                  <span className="text-warm-paper/40 w-24 shrink-0">{group.label}</span>
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="border border-ember px-2 py-1 text-warm-paper/80 hover:text-hot-signal hover:border-signal transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </NotePanel>
        </div>
      </div>
    </section>
  );
}

type NotePanelProps = {
  label: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

function NotePanel({ label, children, className, style }: NotePanelProps) {
  return (
    <div className={cx("panel-ember p-6 rounded-md", className, "fade-up")} style={style}>
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-hot-signal mb-3">
        {label}
      </p>
      {children}
    </div>
  );
}

function NoteText({ children }: { children: ReactNode }) {
  return <p className="font-serif text-lg leading-relaxed text-warm-paper/90">{children}</p>;
}
