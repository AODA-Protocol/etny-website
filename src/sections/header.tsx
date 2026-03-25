"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/button";

const NAV_ITEMS = [
  { label: "Protocol", href: "#how-it-works" },
  { label: "Security", href: "#security" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Docs", href: "https://docs.aoda.io" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-surface-0/80 backdrop-blur-md" : ""
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-mono text-lg font-semibold tracking-wider">
          AODA
        </a>
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
      </div>
    </header>
  );
}
