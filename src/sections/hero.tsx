"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/section-label";
import { Button } from "@/components/button";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      {/* Purple glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent-purple/20 blur-[120px] animate-breathing pointer-events-none" />

      <div className="relative text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <SectionLabel>Protocol</SectionLabel>
        </motion.div>

        <motion.h1
          className="mt-6 text-[clamp(2.5rem,6vw,3.5rem)] font-sans font-normal leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Transfer wallet ownership.
          <br />
          Off-chain.
        </motion.h1>

        <motion.p
          className="mt-6 font-mono text-base text-white/30 leading-relaxed max-w-xl mx-auto [&>strong]:text-white [&>strong]:font-normal"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <strong>Zero gas.</strong> Zero trace.{" "}
          <strong>~2 seconds.</strong> Powered by MPC resharing inside
          TEE enclaves.
        </motion.p>

        <motion.div
          className="mt-10 flex items-center justify-center gap-4 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Button variant="filled" href="#waitlist">
            Join Waitlist
          </Button>
          <Button variant="ghost" href="https://docs.aoda.io">
            Read Docs →
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="2"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
