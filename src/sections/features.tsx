"use client";

import { SectionLabel } from "@/components/section-label";
import { SectionTitle } from "@/components/section-title";
import { AnimatedSection } from "@/components/animated-section";

const FEATURES = [
  {
    value: "0",
    label: "Gas fees",
    description: (
      <>
        <strong>No blockchain transaction</strong> during transfer
      </>
    ),
  },
  {
    value: "0",
    label: "On-chain trace",
    description: (
      <>
        Address stays the same. <strong>No from→to visible</strong>
      </>
    ),
  },
  {
    value: "~2s",
    label: "Transfer time",
    description: (
      <>
        MPC resharing completes in <strong>under 2 seconds</strong>
      </>
    ),
  },
  {
    value: "Never",
    label: "Key exposure",
    description: (
      <>
        Private key <strong>never exists in whole form</strong> — anywhere, ever
      </>
    ),
  },
];

export function Features() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-[1200px] mx-auto">
        <AnimatedSection>
          <SectionLabel>Features</SectionLabel>
          <SectionTitle>Why AODA</SectionTitle>
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
                <p className="mt-3 font-mono text-sm leading-relaxed text-white/30 [&>strong]:text-white [&>strong]:font-normal">
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
