"use client";

import { SectionLabel } from "@/components/section-label";
import { SectionTitle } from "@/components/section-title";
import { AnimatedSection } from "@/components/animated-section";

const STEPS = [
  {
    number: "01",
    title: "Connect",
    description: (
      <>
        Receiver generates an <strong>ephemeral invite link</strong>. Sender
        scans QR or opens link. <strong>No accounts. No registration.</strong>
      </>
    ),
  },
  {
    number: "02",
    title: "Reshare",
    description: (
      <>
        MPC protocol generates <strong>new key shards</strong> inside TEE
        enclaves. Old shards stay active until receiver confirms.{" "}
        <strong>Private key never exists in whole form.</strong>
      </>
    ),
  },
  {
    number: "03",
    title: "Done",
    description: (
      <>
        Receiver confirms. Old shards are <strong>tombstoned</strong>. Ownership
        transferred. <strong>Same wallet address. Zero on-chain trace.</strong>
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
          <SectionTitle>Transfer in 3 steps</SectionTitle>
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
