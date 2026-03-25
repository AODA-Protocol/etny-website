# ETNY Website — Landing Page Design

**Date:** 2026-03-25
**Style reference:** delora.build
**Target:** Investor + early adopter landing page with tech showcase animations

---

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Next.js 15 (App Router) | SSG, SEO, scalable |
| Styles | Tailwind CSS 4 | Fast dev, dark theme |
| Animations | Framer Motion | Scroll-triggered, GPU-accelerated |
| Font | Geist + Geist Mono | Matches Delora aesthetic, optimized for Next.js |
| Deploy | Vercel | Zero-config, edge CDN |
| Language | TypeScript | Type safety |

---

## Visual Identity

- **Background:** Near-black `#0a0a0a`
- **Primary text:** White `#ffffff`
- **Muted text:** `rgba(255,255,255,0.3)` — 30% opacity
- **Accent:** Soft blue `rgb(114, 162, 240)` — for action words only
- **Borders:** `rgba(255,255,255,0.1)`
- **Glow:** Purple radial gradient, subtle breathing animation (8s loop)
- **Typography:** Geist (headings, 48-56px, regular weight), Geist Mono (body, labels, nav — 14-16px, uppercase)
- **Bracket labels:** `[ SECTION ]` — mono, uppercase, 30% opacity
- **Selective emphasis:** Key phrases at 100% white, surrounding text at 30%
- **Buttons:** Ghost (white border, transparent bg) and Filled (white bg)

---

## Sections

### 1. Header + Hero

**Header** — transparent, fixed. Left: "ETNY" logo (monospace). Right: nav links (PROTOCOL, SECURITY, ROADMAP, DOCS) in Geist Mono uppercase. CTA "Join Waitlist" ghost button.

**Hero** — centered on black bg.
- Bracket label: `[ PROTOCOL ]`
- Headline (Geist, 48-56px): "Transfer wallet ownership. Off-chain."
- Description (Geist Mono, 30% opacity, keywords white): "**Zero gas.** Zero trace. **~2 seconds.** Powered by MPC resharing inside TEE enclaves."
- Two CTAs: "Join Waitlist" (filled white) + "Read Docs" (ghost + arrow)
- Purple radial glow behind text, breathing animation 8s
- Bounce-arrow scroll indicator at bottom

### 2. How It Works

- Label: `[ HOW IT WORKS ]`
- Headline: "Transfer in 3 steps"
- Vertical timeline with thin line `rgba(255,255,255,0.1)`

**01 — Connect**
> Receiver generates an **ephemeral invite link**. Sender scans QR or opens link. **No accounts. No registration.**

**02 — Reshare**
> MPC protocol generates **new key shards** inside TEE enclaves. Old shards stay active until receiver confirms. **Private key never exists in whole form.**

**03 — Done**
> Receiver confirms. Old shards are **tombstoned**. Ownership transferred. **Same wallet address. Zero on-chain trace.**

- Right side / scroll: abstract animation of key "flowing" between nodes (lines, dots, glow)
- Steps appear via scroll-trigger (fade-in + slide, Framer Motion)

### 3. Key Features

- Label: `[ FEATURES ]`
- Headline: "Why ETNY"
- 4 cards in a row (2x2 mobile). Dark bg `#0a0a0a`, thin border `rgba(255,255,255,0.1)`, border-radius 5px.

| Card | Large value | Description |
|------|------------|-------------|
| Gas fees | `0` | No blockchain transaction during transfer |
| On-chain trace | `0` | Address stays the same. No from→to visible |
| Transfer time | `~2s` | MPC resharing completes in under 2 seconds |
| Key exposure | `Never` | Private key never exists in whole form — anywhere, ever |

- Values: Geist 40-48px, white
- Descriptions: Geist Mono 14px, 30% opacity, keywords white
- Staggered scroll animation (100ms delay between cards)
- Hover: border brightens to `rgba(255,255,255,0.2)`

### 4. Security

- Label: `[ SECURITY ]`
- Headline: "Built on zero trust"
- 3 horizontal blocks separated by thin lines

**MPC Resharing**
> Wallet ownership transfers via **key resharing**, not blockchain transactions. The private key is split into shards — **it never exists in whole form**.

**TEE Enclaves**
> Each node runs inside a **hardware-isolated enclave** (Intel SGX / AWS Nitro). Shards are **sealed in silicon** — not even node operators can access them.

**Shamir 3-of-5**
> Server-side shard is split into **5 sub-shards** across independent nodes. Any **3 are sufficient** to operate. No single point of failure.

- Right/scroll: animated 5-node visualization. 3 active (white), 2 dormant (30% opacity). Pulsing connection lines between active nodes. Slow loop (10-12s).

### 5. Roadmap

- Label: `[ ROADMAP ]`
- Headline: "What's ahead"
- Horizontal timeline (vertical on mobile)
- Current phase highlighted with accent blue + glow

| Phase | Name | Details |
|-------|------|---------|
| Q1 2026 | Foundation | Protocol architecture. Protobuf contracts. State machine. Mock TEE. |
| Q2 2026 | Core Protocol | MPC integration. DKG + signing. Transfer protocol. P2P consensus. |
| Q3 2026 | Testnet | Real SGX enclaves. Multi-node testing. Security audit. |
| Q4 2026 | Mainnet | Public launch. Mobile app. Multichain support. |

- Sequential scroll animation left to right
- Current phase has soft glow around dot

### 6. Footer

- Top separator line `rgba(255,255,255,0.1)`
- Three columns (Geist Mono, uppercase, 14px):

| Protocol | Community | Developers |
|----------|-----------|------------|
| How it works | Twitter | GitHub |
| Security | Telegram | Docs |
| Roadmap | Discord | API Reference |

- Links: 30% opacity, hover → 100% white
- Bottom: "ETNY" logo left, "ETNY Protocol 2026. All rights reserved." right, 30% opacity
- Subtle purple gradient glow behind footer
