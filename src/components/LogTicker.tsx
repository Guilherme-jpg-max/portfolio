import { useEffect, useState } from "react";

const ENTRIES = [
  "[ok] daemon.service started",
  "[ok] tty0 attached to /dev/pts/1",
  "mem: 62% · uptime: 14d 03h",
  "net: eth0 up · 1.2 MB/s ↓",
  "cron: nightly backup queued",
  "gpu: idle · 42°C",
  "cache: warm · 98% hit",
  "auth: session refreshed",
  "fs: /home ro remounted",
  "kern: entropy pool healthy",
  "sync: git push origin main",
  "disk: /var 41% used",
  "[warn] rate-limit soft cap · 82%",
  "[ok] tls handshake · 34ms",
  "queue: 0 jobs pending",
];

export function LogTicker() {
  const [lines, setLines] = useState<string[]>(() => ENTRIES.slice(0, 6));

  useEffect(() => {
    const t = setInterval(() => {
      setLines((prev) => {
        const next = ENTRIES[Math.floor(Math.random() * ENTRIES.length)];
        return [...prev.slice(1), next];
      });
    }, 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed bottom-14 right-4 z-20 hidden md:block font-mono text-[10px] leading-relaxed text-warm-paper/25 max-w-[240px] text-right"
    >
      {lines.map((l, i) => (
        <div key={`${i}-${l}`} style={{ opacity: 0.25 + (i / lines.length) * 0.35 }}>
          {l}
        </div>
      ))}
    </div>
  );
}
