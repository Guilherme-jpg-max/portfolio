import { profile } from "@/content/profile";

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-ember/40 bg-void/80 backdrop-blur-sm px-6 py-4">
      <div className="mx-auto max-w-7xl flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-warm-paper/40">
        <span>uptime: {new Date().getFullYear() - profile.careerStartYear}y</span>
        <span>
          status: <span className="text-hot-signal">available</span>
        </span>
        <span className="hidden md:inline">© signed with sha-256</span>
      </div>
    </footer>
  );
}
