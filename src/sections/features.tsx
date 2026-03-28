"use client";

import { SectionLabel } from "@/components/section-label";
import { SectionTitle } from "@/components/section-title";
import { AnimatedSection } from "@/components/animated-section";

const FEATURES = [
  {
    value: "Real",
    label: "Physical Gold",
    description: (
      <>
        Not paper gold, not derivatives. Your tokens are backed by{" "}
        <strong>real gold in audited vaults.</strong>
      </>
    ),
  },
  {
    value: "Instant",
    label: "Liquidity",
    description: (
      <>
        Buy or sell anytime. <strong>Fiat back to your card</strong> in seconds,
        not days like traditional banks.
      </>
    ),
  },
  {
    value: "Proof",
    label: "Of Reserves",
    description: (
      <>
        Regular audits, <strong>transparent reserves</strong>. Always know your
        gold is there.
      </>
    ),
  },
  {
    value: "$5",
    label: "Minimum",
    description: (
      <>
        Start with as little as <strong>$5</strong>. No minimum investment, no
        barriers to entry.
      </>
    ),
  },
];

export function Features() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-[1200px] mx-auto">
        <AnimatedSection>
          <SectionLabel>Why ETNY</SectionLabel>
          <SectionTitle>Gold ownership, reimagined</SectionTitle>
        </AnimatedSection>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((feature, i) => (
            <AnimatedSection key={feature.label} delay={i * 0.1}>
              <div className="p-6 rounded-[5px] border border-white/10 bg-surface-0 hover:border-white/20 transition-colors">
                <span className="font-mono text-xs uppercase tracking-wide text-white/30">
                  {feature.label}
                </span>
                <div className="mt-2 text-[clamp(2rem,4vw,3rem)] font-sans font-normal text-white">
                  {feature.value}
                </div>
                <p className="mt-3 font-mono text-sm leading-relaxed text-white/50 [&>strong]:text-white [&>strong]:font-normal">
                  {feature.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
