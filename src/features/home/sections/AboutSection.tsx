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
          <SectionHeading label="// 02_about.md">
            quem
            <br />
            sou
            <br />
            eu.
          </SectionHeading>
        </div>

        <div className="md:col-span-7 space-y-6">
          <NotePanel label={aboutNotes.whoami.label} className="rotate-[-0.15deg]">
            <NoteText>{aboutNotes.whoami.text}</NoteText>
          </NotePanel>

          <NotePanel
            label={aboutNotes.path.label}
            className="rotate-[0.1deg]"
            style={{ animationDelay: "120ms" }}
          >
            <NoteText>{aboutNotes.path.text}</NoteText>
          </NotePanel>

          <NotePanel label="ls ~/skills" style={{ animationDelay: "240ms" }}>
            <dl className="space-y-4 sm:space-y-3 font-mono text-xs">
              {skillGroups.map((group) => (
                <div
                  key={group.label}
                  className="grid gap-2 sm:grid-cols-[6rem_1fr] sm:items-start"
                >
                  <dt className="text-warm-paper/40 sm:py-1">{group.label}</dt>
                  <dd className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="border border-ember px-2 py-1 text-warm-paper/80 hover:text-hot-signal hover:border-signal transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
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
