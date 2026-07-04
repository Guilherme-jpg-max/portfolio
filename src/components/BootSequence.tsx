import { useEffect, useState } from "react";
import commitStats from "../data/commit-stats.json";

interface Line {
  text: string;
  className?: string;
  delay?: number;
}

const LINES: Line[] = [
  { text: "BIOS v2.4.1 — POST OK", delay: 200 },
  { text: "Mounting /dev/persona ................ [ OK ]", delay: 250 },
  { text: "Loading identity module .............. [ OK ]", delay: 250 },
  { text: "Initializing shell ................... [ OK ]", delay: 300 },
  { text: "" },
  { text: "root@dev:~$ whoami", className: "text-hot-glow", delay: 400 },
  { text: "> Guilherme Carlos", className: "text-signal-glow text-2xl md:text-4xl tracking-widest" },
  { text: "> full-stack developer / systems", className: "text-warm-paper/80" },
  { text: "" },
  { text: "root@dev:~$ cat status.txt", className: "text-hot-glow", delay: 500 },
  { text: "status: available for new projects", className: "text-warm-paper" },
  { text: "based: remote — CET" },
  { text: "root@dev:~$ git log --all --oneline | wc -l", className: "text-hot-glow", delay: 400 },
  { text: `> ${commitStats.total.toLocaleString("pt-BR")} commits`, className: "text-warm-paper" },
  { text: "" },
  { text: "" },
];

export function BootSequence({
  onComplete,
  reducedMotion = false,
}: {
  onComplete?: () => void;
  reducedMotion?: boolean;
}) {
  const [visibleLines, setVisibleLines] = useState<number>(reducedMotion ? LINES.length : 0);
  const [charIndex, setCharIndex] = useState(0);
  const [done, setDone] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      onComplete?.();
      return;
    }
    if (visibleLines >= LINES.length) {
      setDone(true);
      onComplete?.();
      return;
    }
    const current = LINES[visibleLines];
    if (!current.text) {
      const t = setTimeout(() => {
        setVisibleLines((v) => v + 1);
        setCharIndex(0);
      }, 80);
      return () => clearTimeout(t);
    }
    if (charIndex < current.text.length) {
      const speed = current.className?.includes("text-2xl") ? 55 : 12;
      const t = setTimeout(() => setCharIndex((c) => c + 1), speed);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setVisibleLines((v) => v + 1);
        setCharIndex(0);
      }, current.delay ?? 60);
      return () => clearTimeout(t);
    }
  }, [visibleLines, charIndex, onComplete, reducedMotion]);

  return (
    <div className="font-mono text-sm md:text-base leading-relaxed">
      {LINES.slice(0, visibleLines).map((line, i) => (
        <div key={i} className={line.className ?? "text-warm-paper/70"}>
          {line.text || "\u00A0"}
        </div>
      ))}
      {!done && visibleLines < LINES.length && (
        <div className={LINES[visibleLines].className ?? "text-warm-paper/70"}>
          {LINES[visibleLines].text.slice(0, charIndex)}
          <span className="text-hot-signal cursor-blink">▊</span>
        </div>
      )}
      {done && (
        <div className="text-hot-glow">
          root@dev:~$ <span className="cursor-blink">▊</span>
        </div>
      )}
    </div>
  );
}
