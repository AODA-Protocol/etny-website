"use client";

import { SectionLabel } from "@/components/section-label";
import { SectionTitle } from "@/components/section-title";
import { AnimatedSection } from "@/components/animated-section";

const STEPS = [
  {
    number: "01",
    title: "Sign Up",
    description: (
      <>
        Create an account with <strong>email or Google</strong>. Your wallet is
        created automatically — <strong>no seed phrases, no extensions.</strong>
      </>
    ),
  },
  {
    number: "02",
    title: "Buy Gold",
    description: (
      <>
        Purchase <strong>ETNYG tokens</strong> with your bank card. Each ETNYG
        equals <strong>1 gram of real gold</strong>, backed by physical reserves.
      </>
    ),
  },
  {
    number: "03",
    title: "Own & Track",
    description: (
      <>
        See your gold balance in <strong>grams and dollars</strong>. Get notified
        about audits, reserves status, and <strong>price movements.</strong>
      </>
    ),
  },
  {
    number: "04",
    title: "Sell or Send",
    description: (
      <>
        Sell back to fiat <strong>instantly</strong> or send gold to anyone in
        seconds. <strong>Full liquidity, anytime.</strong>
      </>
    ),
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 px-6">
      <div className="max-w-[1200px] mx-auto">
        <AnimatedSection>
          <SectionLabel>How It Works</SectionLabel>
          <SectionTitle>Four steps to owning gold</SectionTitle>
        </AnimatedSection>

        <div className="mt-16 relative">
          {/* Vertical timeline line */}
          <div className="absolute left-[23px] top-0 bottom-0 w-px bg-white/10 hidden md:block" />

          <div className="space-y-16">
            {STEPS.map((step, i) => (
              <AnimatedSection key={step.number} delay={i * 0.15}>
                <div className="flex gap-8 items-start">
                  <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center font-mono text-sm text-white/30">
                    {step.number}
                  </div>
                  <div className="pt-2">
                    <h3 className="font-mono text-lg uppercase tracking-wide text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="font-mono text-sm leading-relaxed text-white/30 max-w-lg [&>strong]:text-white [&>strong]:font-normal">
                      {step.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
