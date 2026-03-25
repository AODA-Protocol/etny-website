const COLUMNS = [
  {
    title: "Protocol",
    links: [
      { label: "How it works", href: "#how-it-works" },
      { label: "Security", href: "#security" },
      { label: "Roadmap", href: "#roadmap" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Twitter", href: "https://twitter.com/etny_protocol" },
      { label: "Telegram", href: "https://t.me/etny_protocol" },
      { label: "Discord", href: "https://discord.gg/etny" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "GitHub", href: "https://github.com/ETNY-Protocol" },
      { label: "Docs", href: "https://docs.etny.io" },
      { label: "API Reference", href: "https://docs.etny.io/api" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative pt-20 pb-12 px-6">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-accent-purple/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto">
        <div className="h-px bg-white/10 mb-16" />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 mb-16">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="font-mono text-xs uppercase tracking-[0.15em] text-white/30 mb-4">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-mono text-sm text-white/30 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <img src="/images/white.svg" alt="ETNY" className="h-6 w-auto" />
          <span className="font-mono text-xs text-white/30">
            ETNY Protocol 2026. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
