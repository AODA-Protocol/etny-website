"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/button";

const NAV_ITEMS = [
  { label: "Protocol", href: "#how-it-works" },
  { label: "Security", href: "#security" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Docs", href: "https://docs.etny.io" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen ? "bg-surface-0/80 backdrop-blur-md" : ""
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center">
          <img src="/images/white.svg" alt="ETNY" className="h-8 w-auto" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-mono text-sm uppercase tracking-wide text-white/30 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
          <Button variant="ghost" href="#waitlist">
            Join Waitlist
          </Button>
        </nav>

        {/* Hamburger button */}
        <button
          className="md:hidden relative w-6 h-5 flex flex-col justify-between"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`block h-px w-full bg-white transition-all duration-200 origin-center ${
              mobileOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-full bg-white transition-opacity duration-200 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-px w-full bg-white transition-all duration-200 origin-center ${
              mobileOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-white/10 bg-surface-0/95 backdrop-blur-md">
          <div className="max-w-[1200px] mx-auto px-6 py-4 flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="font-mono text-sm uppercase tracking-wide text-white/60 hover:text-white transition-colors py-1"
              >
                {item.label}
              </a>
            ))}
            <Button variant="ghost" href="#waitlist" onClick={() => setMobileOpen(false)}>
              Join Waitlist
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
