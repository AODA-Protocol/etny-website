# AODA Landing Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a Delora-style dark landing page for the AODA protocol with 6 sections, scroll animations, and Geist typography.

**Architecture:** Next.js 15 App Router with static export (SSG). Single-page layout with section components. Framer Motion for scroll-triggered animations. Tailwind CSS 4 for styling with custom design tokens.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS 4, Framer Motion, Geist fonts, pnpm

---

### Task 1: Scaffold Next.js project

**Files:**
- Create: project root via `create-next-app`
- Modify: `tailwind.config.ts` (add custom tokens)
- Modify: `app/layout.tsx` (fonts, metadata)
- Modify: `app/globals.css` (base styles)
- Delete: `app/page.tsx` (replace with our own)

**Step 1: Create Next.js project with Tailwind**

Run from `/Users/daniillogachev/Ma project/AODA-website`:
```bash
pnpm dlx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --no-import-alias --use-pnpm
```
Answer "No" to Turbopack if prompted.

Expected: Project scaffolded with `src/app/`, `tailwind.config.ts`, `package.json`

**Step 2: Install Framer Motion and Geist fonts**

```bash
pnpm add framer-motion geist
```

**Step 3: Configure Tailwind design tokens**

Replace `tailwind.config.ts`:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          0: "#0a0a0a",
          1: "#111118",
          2: "#1a1a24",
        },
        accent: {
          blue: "rgb(114, 162, 240)",
          purple: "rgb(139, 92, 246)",
        },
        muted: "rgba(255, 255, 255, 0.3)",
        border: "rgba(255, 255, 255, 0.1)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      animation: {
        "breathing": "breathing 8s ease-in-out infinite",
        "bounce-slow": "bounce-slow 2s ease-in-out infinite",
      },
      keyframes: {
        breathing: {
          "0%, 100%": { opacity: "0.15", transform: "scale(1)" },
          "50%": { opacity: "0.25", transform: "scale(1.05)" },
        },
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
```

**Step 4: Configure layout with Geist fonts and metadata**

Replace `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "AODA — Private Wallet Transfers",
  description:
    "Transfer crypto wallet ownership off-chain. Zero gas. Zero trace. Powered by MPC and TEE.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="bg-surface-0 text-white font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
```

**Step 5: Set base styles**

Replace `src/app/globals.css`:

```css
@import "tailwindcss";

html {
  scroll-behavior: smooth;
}

::selection {
  background: rgba(139, 92, 246, 0.3);
  color: white;
}

/* Thin scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #0a0a0a;
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
```

**Step 6: Create empty page and verify it runs**

Replace `src/app/page.tsx`:

```tsx
export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-sans text-white">AODA</h1>
    </main>
  );
}
```

Run:
```bash
pnpm dev
```
Expected: Page loads at localhost:3000 with "AODA" centered in Geist font on black bg.

**Step 7: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js project with Tailwind, Geist, Framer Motion"
```

---

### Task 2: Shared UI components

**Files:**
- Create: `src/components/section-label.tsx`
- Create: `src/components/section-title.tsx`
- Create: `src/components/highlight-text.tsx`
- Create: `src/components/button.tsx`
- Create: `src/components/animated-section.tsx`

**Step 1: Create SectionLabel component**

`src/components/section-label.tsx`:
```tsx
export function SectionLabel({ children }: { children: string }) {
  return (
    <span className="font-mono text-xs font-semibold tracking-[0.15em] uppercase text-white/30">
      [ {children} ]
    </span>
  );
}
```

**Step 2: Create SectionTitle component**

`src/components/section-title.tsx`:
```tsx
export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-sans font-normal text-white leading-tight">
      {children}
    </h2>
  );
}
```

**Step 3: Create HighlightText component**

For selective emphasis (30% opacity with white keywords):

`src/components/highlight-text.tsx`:
```tsx
export function HighlightText({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-sm leading-relaxed text-white/30 [&>strong]:text-white [&>strong]:font-normal">
      {children}
    </p>
  );
}
```

**Step 4: Create Button component**

`src/components/button.tsx`:
```tsx
interface ButtonProps {
  variant: "filled" | "ghost";
  children: React.ReactNode;
  href?: string;
}

export function Button({ variant, children, href }: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 px-6 py-3 rounded font-mono text-sm uppercase tracking-wide transition-all duration-200";
  const styles = {
    filled: "bg-white text-surface-0 hover:bg-white/90",
    ghost:
      "border border-white/20 text-white hover:border-white/40 bg-transparent",
  };

  const className = `${base} ${styles[variant]}`;

  if (href) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  return <button className={className}>{children}</button>;
}
```

**Step 5: Create AnimatedSection wrapper**

`src/components/animated-section.tsx`:
```tsx
"use client";

import { motion } from "framer-motion";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
}: AnimatedSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

**Step 6: Verify build**

```bash
pnpm build
```
Expected: Build succeeds with no errors.

**Step 7: Commit**

```bash
git add src/components/
git commit -m "feat: add shared UI components (labels, buttons, animations)"
```

---

### Task 3: Header + Hero section

**Files:**
- Create: `src/sections/header.tsx`
- Create: `src/sections/hero.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create Header**

`src/sections/header.tsx`:
```tsx
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
```

**Step 2: Create Hero**

`src/sections/hero.tsx`:
```tsx
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
```

**Step 3: Wire up page**

Replace `src/app/page.tsx`:
```tsx
import { Header } from "@/sections/header";
import { Hero } from "@/sections/hero";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
      </main>
    </>
  );
}
```

**Step 4: Verify in browser**

```bash
pnpm dev
```
Expected: Header with nav + hero with glow, headline, CTAs, scroll arrow. All animations play on load.

**Step 5: Commit**

```bash
git add src/sections/ src/app/page.tsx
git commit -m "feat: add header and hero section with glow animation"
```

---

### Task 4: How It Works section

**Files:**
- Create: `src/sections/how-it-works.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create HowItWorks section**

`src/sections/how-it-works.tsx`:
```tsx
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
                  {/* Step number */}
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
```

**Step 2: Add to page**

In `src/app/page.tsx`, add import and component:
```tsx
import { HowItWorks } from "@/sections/how-it-works";
```
Add `<HowItWorks />` after `<Hero />`.

**Step 3: Verify in browser**

Expected: 3 steps with timeline, staggered scroll animations.

**Step 4: Commit**

```bash
git add src/sections/how-it-works.tsx src/app/page.tsx
git commit -m "feat: add How It Works section with timeline"
```

---

### Task 5: Key Features section

**Files:**
- Create: `src/sections/features.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create Features section**

`src/sections/features.tsx`:
```tsx
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
```

**Step 2: Add to page**

In `src/app/page.tsx`, add import and `<Features />` after `<HowItWorks />`.

**Step 3: Verify in browser**

Expected: 4 cards in a row (desktop), 2x2 (tablet), stacked (mobile). Staggered animations. Hover effect on borders.

**Step 4: Commit**

```bash
git add src/sections/features.tsx src/app/page.tsx
git commit -m "feat: add Key Features section with metric cards"
```

---

### Task 6: Security section with node animation

**Files:**
- Create: `src/sections/security.tsx`
- Create: `src/components/node-visualization.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create NodeVisualization component**

`src/components/node-visualization.tsx`:
```tsx
"use client";

import { motion } from "framer-motion";

const NODES = [
  { x: 150, y: 40 },
  { x: 270, y: 120 },
  { x: 230, y: 250 },
  { x: 70, y: 250 },
  { x: 30, y: 120 },
];

const ACTIVE = [0, 1, 4]; // 3 active nodes
const CONNECTIONS = [
  [0, 1],
  [0, 4],
  [1, 4],
]; // connections between active

export function NodeVisualization() {
  return (
    <svg viewBox="0 0 300 300" className="w-full max-w-[300px] mx-auto">
      {/* Connection lines between active nodes */}
      {CONNECTIONS.map(([from, to], i) => (
        <motion.line
          key={`line-${i}`}
          x1={NODES[from].x}
          y1={NODES[from].y}
          x2={NODES[to].x}
          y2={NODES[to].y}
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
        />
      ))}

      {/* Pulsing glow on active connections */}
      {CONNECTIONS.map(([from, to], i) => (
        <motion.line
          key={`glow-${i}`}
          x1={NODES[from].x}
          y1={NODES[from].y}
          x2={NODES[to].x}
          y2={NODES[to].y}
          stroke="rgba(114, 162, 240, 0.3)"
          strokeWidth="2"
          animate={{ opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 1 }}
        />
      ))}

      {/* Nodes */}
      {NODES.map((node, i) => {
        const isActive = ACTIVE.includes(i);
        return (
          <g key={`node-${i}`}>
            {isActive && (
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="16"
                fill="none"
                stroke="rgba(114, 162, 240, 0.2)"
                strokeWidth="1"
                animate={{ r: [16, 22, 16], opacity: [0.3, 0.1, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              />
            )}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="6"
              fill={isActive ? "white" : "rgba(255,255,255,0.15)"}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            />
          </g>
        );
      })}
    </svg>
  );
}
```

**Step 2: Create Security section**

`src/sections/security.tsx`:
```tsx
"use client";

import { SectionLabel } from "@/components/section-label";
import { SectionTitle } from "@/components/section-title";
import { AnimatedSection } from "@/components/animated-section";
import { NodeVisualization } from "@/components/node-visualization";

const BLOCKS = [
  {
    title: "MPC Resharing",
    description: (
      <>
        Wallet ownership transfers via <strong>key resharing</strong>, not
        blockchain transactions. The private key is split into shards —{" "}
        <strong>it never exists in whole form</strong>.
      </>
    ),
  },
  {
    title: "TEE Enclaves",
    description: (
      <>
        Each node runs inside a <strong>hardware-isolated enclave</strong>{" "}
        (Intel SGX / AWS Nitro). Shards are{" "}
        <strong>sealed in silicon</strong> — not even node operators can
        access them.
      </>
    ),
  },
  {
    title: "Shamir 3-of-5",
    description: (
      <>
        Server-side shard is split into <strong>5 sub-shards</strong> across
        independent nodes. Any <strong>3 are sufficient</strong> to operate.
        No single point of failure.
      </>
    ),
  },
];

export function Security() {
  return (
    <section id="security" className="py-32 px-6">
      <div className="max-w-[1200px] mx-auto">
        <AnimatedSection>
          <SectionLabel>Security</SectionLabel>
          <SectionTitle>Built on zero trust</SectionTitle>
        </AnimatedSection>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-16 items-center">
          <div className="space-y-0">
            {BLOCKS.map((block, i) => (
              <AnimatedSection key={block.title} delay={i * 0.15}>
                <div
                  className={`py-8 ${
                    i < BLOCKS.length - 1 ? "border-b border-white/10" : ""
                  }`}
                >
                  <h3 className="font-mono text-base uppercase tracking-wide text-white mb-3">
                    {block.title}
                  </h3>
                  <p className="font-mono text-sm leading-relaxed text-white/30 max-w-lg [&>strong]:text-white [&>strong]:font-normal">
                    {block.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.3} className="hidden lg:block">
            <NodeVisualization />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
```

**Step 3: Add to page**

In `src/app/page.tsx`, add import and `<Security />` after `<Features />`.

**Step 4: Verify in browser**

Expected: 3 text blocks with dividers on the left, animated 5-node SVG on the right. Pulsing connections. 3 active, 2 dormant nodes.

**Step 5: Commit**

```bash
git add src/sections/security.tsx src/components/node-visualization.tsx src/app/page.tsx
git commit -m "feat: add Security section with animated node visualization"
```

---

### Task 7: Roadmap section

**Files:**
- Create: `src/sections/roadmap.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create Roadmap section**

`src/sections/roadmap.tsx`:
```tsx
"use client";

import { SectionLabel } from "@/components/section-label";
import { SectionTitle } from "@/components/section-title";
import { AnimatedSection } from "@/components/animated-section";

const MILESTONES = [
  {
    phase: "Q1 2026",
    name: "Foundation",
    details: "Protocol architecture. Protobuf contracts. State machine. Mock TEE.",
    status: "current" as const,
  },
  {
    phase: "Q2 2026",
    name: "Core Protocol",
    details: "MPC integration. DKG + signing. Transfer protocol. P2P consensus.",
    status: "future" as const,
  },
  {
    phase: "Q3 2026",
    name: "Testnet",
    details: "Real SGX enclaves. Multi-node testing. Security audit.",
    status: "future" as const,
  },
  {
    phase: "Q4 2026",
    name: "Mainnet",
    details: "Public launch. Mobile app. Multichain support.",
    status: "future" as const,
  },
];

export function Roadmap() {
  return (
    <section id="roadmap" className="py-32 px-6">
      <div className="max-w-[1200px] mx-auto">
        <AnimatedSection>
          <SectionLabel>Roadmap</SectionLabel>
          <SectionTitle>What&apos;s ahead</SectionTitle>
        </AnimatedSection>

        {/* Desktop: horizontal */}
        <div className="mt-16 hidden md:block">
          {/* Timeline line */}
          <div className="relative h-px bg-white/10 mb-12">
            {MILESTONES.map((m, i) => {
              const left = `${(i / (MILESTONES.length - 1)) * 100}%`;
              return (
                <AnimatedSection key={m.phase} delay={i * 0.15}>
                  <div
                    className="absolute -top-2"
                    style={{ left }}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        m.status === "current"
                          ? "border-accent-blue bg-accent-blue/20 shadow-[0_0_12px_rgba(114,162,240,0.4)]"
                          : "border-white/20 bg-surface-0"
                      }`}
                    />
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          <div className="grid grid-cols-4 gap-8">
            {MILESTONES.map((m, i) => (
              <AnimatedSection key={m.phase} delay={i * 0.15}>
                <div>
                  <span
                    className={`font-mono text-xs uppercase tracking-wide ${
                      m.status === "current"
                        ? "text-accent-blue"
                        : "text-white/30"
                    }`}
                  >
                    {m.phase}
                  </span>
                  <h3 className="mt-2 font-sans text-lg text-white">
                    {m.name}
                  </h3>
                  <p className="mt-2 font-mono text-sm text-white/30 leading-relaxed">
                    {m.details}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Mobile: vertical */}
        <div className="mt-16 md:hidden space-y-8">
          {MILESTONES.map((m, i) => (
            <AnimatedSection key={m.phase} delay={i * 0.1}>
              <div className="flex gap-4 items-start">
                <div
                  className={`mt-1 flex-shrink-0 w-3 h-3 rounded-full ${
                    m.status === "current"
                      ? "bg-accent-blue shadow-[0_0_12px_rgba(114,162,240,0.4)]"
                      : "bg-white/20"
                  }`}
                />
                <div>
                  <span
                    className={`font-mono text-xs uppercase tracking-wide ${
                      m.status === "current"
                        ? "text-accent-blue"
                        : "text-white/30"
                    }`}
                  >
                    {m.phase}
                  </span>
                  <h3 className="mt-1 font-sans text-lg text-white">
                    {m.name}
                  </h3>
                  <p className="mt-1 font-mono text-sm text-white/30 leading-relaxed">
                    {m.details}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Add to page**

In `src/app/page.tsx`, add import and `<Roadmap />` after `<Security />`.

**Step 3: Verify in browser**

Expected: Horizontal timeline (desktop), vertical (mobile). Current phase (Q1) highlighted in blue with glow.

**Step 4: Commit**

```bash
git add src/sections/roadmap.tsx src/app/page.tsx
git commit -m "feat: add Roadmap section with timeline"
```

---

### Task 8: Footer section

**Files:**
- Create: `src/sections/footer.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create Footer**

`src/sections/footer.tsx`:
```tsx
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
      { label: "Twitter", href: "https://twitter.com/aoda_protocol" },
      { label: "Telegram", href: "https://t.me/aoda_protocol" },
      { label: "Discord", href: "https://discord.gg/aoda" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "GitHub", href: "https://github.com/AODA-Protocol" },
      { label: "Docs", href: "https://docs.aoda.io" },
      { label: "API Reference", href: "https://docs.aoda.io/api" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative pt-20 pb-12 px-6">
      {/* Subtle purple glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-accent-purple/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto">
        {/* Top separator */}
        <div className="h-px bg-white/10 mb-16" />

        {/* Link columns */}
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

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-mono text-sm font-semibold tracking-wider">
            AODA
          </span>
          <span className="font-mono text-xs text-white/30">
            AODA Protocol 2026. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
```

**Step 2: Add to page**

In `src/app/page.tsx`, add import and `<Footer />` after `</main>` (outside main, before closing fragment).

**Step 3: Verify in browser**

Expected: 3-column footer with links, separator, bottom bar, subtle purple glow.

**Step 4: Commit**

```bash
git add src/sections/footer.tsx src/app/page.tsx
git commit -m "feat: add Footer section"
```

---

### Task 9: Final polish and deploy setup

**Files:**
- Modify: `src/app/page.tsx` (verify all sections)
- Create: `next.config.ts` (if needed for static export)
- Modify: `package.json` (add build script for static)

**Step 1: Verify full page builds**

```bash
pnpm build
```
Expected: Build succeeds with no errors.

**Step 2: Test production build locally**

```bash
pnpm start
```
Expected: All sections render, animations work, responsive layout correct.

**Step 3: Initial commit of design doc and push**

```bash
git add -A
git commit -m "feat: complete AODA landing page — all 6 sections with animations"
git push -u origin main
```

**Step 4: Deploy to Vercel**

Connect repo `AODA-Protocol/aoda-website` to Vercel via dashboard, or:
```bash
pnpm dlx vercel --yes
```
Expected: Site deployed and live.

---

## Task Summary

| Task | What | ~Time |
|------|------|-------|
| 1 | Scaffold Next.js + Tailwind + fonts | 5 min |
| 2 | Shared UI components | 5 min |
| 3 | Header + Hero | 5 min |
| 4 | How It Works | 5 min |
| 5 | Key Features | 5 min |
| 6 | Security + node animation | 5 min |
| 7 | Roadmap | 5 min |
| 8 | Footer | 3 min |
| 9 | Polish + deploy | 5 min |
