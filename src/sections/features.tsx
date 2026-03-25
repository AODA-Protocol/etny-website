"use client";

import { SectionLabel } from "@/components/section-label";
import { SectionTitle } from "@/components/section-title";
import { AnimatedSection } from "@/components/animated-section";

function IconGasFees() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="rgba(114,162,240,0.5)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      {/* Gas pump with X — no fees */}
      <rect x="10" y="14" width="18" height="24" rx="2" />
      <path d="M14 14V10a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4" />
      <rect x="14" y="19" width="10" height="6" rx="1" />
      <path d="M28 20l4-4 4 4v12a2 2 0 0 1-2 2h0a2 2 0 0 1-2-2v-4h-4" />
      {/* X mark */}
      <line x1="33" y1="36" x2="39" y2="42" stroke="rgba(114,162,240,0.8)" strokeWidth="1.5" />
      <line x1="39" y1="36" x2="33" y2="42" stroke="rgba(114,162,240,0.8)" strokeWidth="1.5" />
    </svg>
  );
}

function IconTrace() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="rgba(114,162,240,0.5)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      {/* Eye with slash — invisible */}
      <path d="M6 24s6-12 18-12 18 12 18 12-6 12-18 12S6 24 6 24z" />
      <circle cx="24" cy="24" r="5" />
      <line x1="8" y1="40" x2="40" y2="8" stroke="rgba(114,162,240,0.8)" strokeWidth="1.5" />
    </svg>
  );
}

function IconSpeed() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="rgba(114,162,240,0.5)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      {/* Lightning bolt — speed */}
      <polygon points="22,6 10,26 20,26 16,42 38,20 26,20 30,6" fill="rgba(114,162,240,0.08)" stroke="rgba(114,162,240,0.5)" />
    </svg>
  );
}

function IconKey() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="rgba(114,162,240,0.5)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      {/* Shattered key — never whole */}
      <circle cx="14" cy="18" r="7" />
      <circle cx="14" cy="18" r="3" />
      <path d="M19.5 23.5L30 34" />
      <path d="M26 30l4 0" />
      <path d="M30 34l4 0" />
      {/* Break line */}
      <line x1="23" y1="25" x2="25" y2="29" stroke="rgba(114,162,240,0.8)" strokeWidth="1.5" strokeDasharray="2 2" />
      {/* Second fragment */}
      <path d="M33 37l5 5" opacity="0.4" />
      <path d="M36 38l3 0" opacity="0.4" />
    </svg>
  );
}

const FEATURES = [
  {
    value: "0",
    label: "Gas fees",
    icon: <IconGasFees />,
    description: (
      <>
        <strong>No blockchain transaction</strong> during transfer
      </>
    ),
  },
  {
    value: "0",
    label: "On-chain trace",
    icon: <IconTrace />,
    description: (
      <>
        Address stays the same. <strong>No from→to visible</strong>
      </>
    ),
  },
  {
    value: "~2s",
    label: "Transfer time",
    icon: <IconSpeed />,
    description: (
      <>
        MPC resharing completes in <strong>under 2 seconds</strong>
      </>
    ),
  },
  {
    value: "Never",
    label: "Key exposure",
    icon: <IconKey />,
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
          <SectionTitle>Why ETNY</SectionTitle>
        </AnimatedSection>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((feature, i) => (
            <AnimatedSection key={feature.label} delay={i * 0.1}>
              <div className="p-6 rounded-[5px] border border-white/10 bg-surface-0 hover:border-white/20 transition-colors group">
                <div className="mb-4 opacity-60 group-hover:opacity-100 transition-opacity">
                  {feature.icon}
                </div>
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
