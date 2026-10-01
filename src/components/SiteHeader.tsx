const NAV_ITEMS = [
  { href: "#terminal", label: "01_boot", shortLabel: "boot" },
  { href: "#about", label: "02_about", shortLabel: "about" },
  { href: "#work", label: "03_work", shortLabel: "work" },
  { href: "#contact", label: "04_contact", shortLabel: "contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="fixed top-0 inset-x-0 z-30 border-b border-ember/40 bg-void/70 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-3 flex items-center justify-between font-mono text-[10px] md:text-[11px] uppercase tracking-[0.1em] md:tracking-[0.25em]">
        <div className="flex items-center gap-2 md:gap-3 text-warm-paper/70">
          <span className="w-2 h-2 rounded-full bg-hot-signal shadow-[0_0_8px_#FF6B4A]" />
          <span>root@dev</span>
          <span className="hidden md:inline text-warm-paper/40">
            — session {new Date().getFullYear()}
          </span>
        </div>
        <nav className="flex items-center gap-3 md:gap-5 text-warm-paper/60">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group hover:text-hot-signal transition-colors"
            >
              <span className="hidden md:inline text-signal opacity-0 group-hover:opacity-100 transition-opacity">
                &gt;{" "}
              </span>
              <span className="hidden md:inline">{item.label}</span>
              <span className="md:hidden">{item.shortLabel}</span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
