import type { CSSProperties, ReactNode } from "react";
import { Github, Lock } from "lucide-react";
import { GlowOverlay } from "@/components/GlowOverlay";
import type { Project } from "@/content/types";

type Props = {
  project: Project;
  style?: CSSProperties;
};

export function ProjectCard({ project, style }: Props) {
  const body = (
    <>
      <GlowOverlay />
      <div className="relative flex items-start justify-between mb-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-warm-paper/40">
          /{project.id}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-hot-signal border border-ember px-2 py-0.5">
          {project.status}
        </span>
      </div>
      <h3 className="relative font-mono text-xl uppercase tracking-wider text-warm-paper group-hover:text-hot-glow transition-all mb-1.5">
        {project.name}
      </h3>
      <p className="relative font-mono text-[11px] text-signal mb-3 tracking-wider">
        {project.stack}
      </p>
      <p className="relative font-serif text-sm leading-relaxed text-warm-paper/85 line-clamp-3">
        {project.blurb}
      </p>
      <div className="relative mt-4 pt-3 border-t border-ember/40 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-warm-paper/50 group-hover:text-hot-signal transition-colors">
        {project.github ? (
          <>
            <FooterLabel icon={<Github size={12} />}>view source</FooterLabel>
            <span>→</span>
          </>
        ) : (
          <FooterLabel icon={<Lock size={12} />}>private repository</FooterLabel>
        )}
      </div>
    </>
  );

  const baseClass = "panel-ember p-4 rounded-md group relative overflow-hidden fade-up block";

  if (!project.github) {
    return (
      <div className={`${baseClass} cursor-default`} style={style}>
        {body}
      </div>
    );
  }

  return (
    <a
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClass} cursor-pointer`}
      style={style}
    >
      {body}
    </a>
  );
}

function FooterLabel({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <span className="flex items-center gap-2">
      {icon}
      {children}
    </span>
  );
}
