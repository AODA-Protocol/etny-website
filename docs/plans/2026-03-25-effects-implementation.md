# ETNY Landing Effects Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Port 4 visual effects from E-Y project to ETNY landing: loading screen, isometric cubes, hero grid background, and WarpTransition (Launch App effect).

**Architecture:** Copy and adapt components from `/Users/daniillogachev/Ma project/E-Y/apps/website/src/`. Strip theme toggle (dark-only). Replace E-Y content with ETNY content. Integrate into existing Next.js 15 + Tailwind v4 + Framer Motion site.

**Tech Stack:** Next.js 15, Tailwind v4, Framer Motion (already installed), Canvas 2D (no new deps needed for cubes/warp). No Three.js — skip 3D particles, use grid background instead.

---

### Task 1: Add loading context and loading screen

**Files:**
- Create: `src/context/loading-context.tsx`
- Create: `src/components/loading-screen.tsx`
- Create: `src/components/page-wrapper.tsx`
- Modify: `src/app/layout.tsx`

**Step 1: Create loading context**

Create `src/context/loading-context.tsx`:
```tsx
'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface LoadingContextType {
  isLoaded: boolean
  setIsLoaded: (loaded: boolean) => void
}

const LoadingContext = createContext<LoadingContextType>({
  isLoaded: false,
  setIsLoaded: () => {},
})

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <LoadingContext.Provider value={{ isLoaded, setIsLoaded }}>
      {children}
    </LoadingContext.Provider>
  )
}

export function useLoading() {
  return useContext(LoadingContext)
}
```

**Step 2: Create loading screen**

Copy from E-Y, simplified for dark-only. Uses the color logo variants already in `public/images/`.

Create `src/components/loading-screen.tsx` — copy the full LoadingScreen component from E-Y at `/Users/daniillogachev/Ma project/E-Y/apps/website/src/components/ui/LoadingScreen.tsx`.

Adaptations needed:
- Remove `useTheme` import and `isDark` references — hardcode dark mode (always `true`)
- Replace `isDarkRef.current ? darkThemeVariants : lightThemeVariants` with just `darkThemeVariants`
- Replace `isDark ? '/images/logo_white.svg' : '/images/logo_black.svg'` with `'/images/logo_white.svg'`
- Replace `isDark ? '#000000' : '#ffffff'` with `'#000000'`
- Replace `isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)'` with `'rgba(255,255,255,0.4)'`
- Replace `isDark ? 'rgba(51,136,255,0.3)' : 'rgba(0,102,255,0.15)'` with `'rgba(51,136,255,0.3)'`
- Change "ETERNITY" text to "ETNY"

**Step 3: Create page wrapper**

Create `src/components/page-wrapper.tsx` — copy from E-Y PageWrapper, adapted:
```tsx
'use client'

import { motion } from 'framer-motion'
import { LoadingScreen } from '@/components/loading-screen'
import { LoadingProvider, useLoading } from '@/context/loading-context'

function PageContent({ children }: { children: React.ReactNode }) {
  const { isLoaded, setIsLoaded } = useLoading()

  return (
    <>
      <LoadingScreen
        duration={2000}
        onComplete={() => setIsLoaded(true)}
      />

      {isLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {children}
        </motion.div>
      )}
    </>
  )
}

export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <LoadingProvider>
      <PageContent>{children}</PageContent>
    </LoadingProvider>
  )
}
```

**Step 4: Wrap layout with PageWrapper**

In `src/app/layout.tsx`, import `PageWrapper` and wrap `{children}` with it. The PageWrapper must be inside the `<body>` tag.

**Step 5: Build and verify**

```bash
pnpm build
```

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: add loading screen with logo cycling animation"
```

---

### Task 2: Add FadeIn animation component

**Files:**
- Create: `src/components/fade-in.tsx`

**Step 1: Create FadeIn component**

Copy from E-Y at `/Users/daniillogachev/Ma project/E-Y/apps/website/src/components/animations/FadeIn.tsx`. This includes `FadeIn`, `StaggerContainer`, and `StaggerItem` — all three exports. No modifications needed, it's framework-agnostic.

**Step 2: Build and verify**

```bash
pnpm build
```

**Step 3: Commit**

```bash
git add src/components/fade-in.tsx
git commit -m "feat: add FadeIn animation components"
```

---

### Task 3: Add useCanvasPerf hook and IsometricBoxes

**Files:**
- Create: `src/hooks/use-canvas-perf.ts`
- Create: `src/components/isometric-boxes.tsx`
- Modify: `src/sections/security.tsx` (add cubes as background)

**Step 1: Create useCanvasPerf hook**

Copy from E-Y at `/Users/daniillogachev/Ma project/E-Y/apps/website/src/hooks/useCanvasPerf.ts`. No modifications needed.

**Step 2: Create IsometricBoxes component**

Copy from E-Y at `/Users/daniillogachev/Ma project/E-Y/apps/website/src/components/animations/IsometricBoxes.tsx`.

Adaptations:
- Remove `useTheme` import — hardcode `isDark = true` (replace `isDarkRef.current` with `true`)
- Keep `useCanvasPerf` import, update path to `@/hooks/use-canvas-perf`

**Step 3: Add IsometricBoxes to Security section as background**

In `src/sections/security.tsx`:
- Add `import { IsometricBoxes } from '@/components/isometric-boxes'`
- Add `<IsometricBoxes />` as first child inside the `<section>`, before the container div
- Add `pointer-events-none` to the canvas className is already there, but make sure the section has `overflow-hidden` and the container has `relative z-10`

**Step 4: Build and verify**

```bash
pnpm build
```

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add isometric cubes animation to Security section"
```

---

### Task 4: Add WarpTransition (Launch App effect)

**Files:**
- Create: `src/components/logo-path-data.ts`
- Create: `src/components/warp-transition.tsx`
- Modify: `src/app/page.tsx` (wrap with WarpProvider)
- Modify: `src/sections/hero.tsx` (add Launch App button with warp)

**Step 1: Create logo path data**

Copy from E-Y at `/Users/daniillogachev/Ma project/E-Y/apps/website/src/components/animations/logoPathData.ts`. No modifications needed — same ETNY logo paths.

**Step 2: Create WarpTransition**

Copy from E-Y at `/Users/daniillogachev/Ma project/E-Y/apps/website/src/components/animations/WarpTransition.tsx`.

Adaptations:
- Remove `useTheme` import — hardcode dark mode (`isDark = true`, `isDarkRef.current` → `true`)
- Update `APP_URL` to `'https://app.etny.io'` (or whatever the app URL will be)
- Change "ETERNITY" text to "ETNY"
- Update import path for logoPathData to `@/components/logo-path-data`

**Step 3: Wrap page with WarpProvider**

In `src/app/page.tsx`:
- Import `WarpProvider` from `@/components/warp-transition`
- Wrap the entire content (Header + main + Footer) with `<WarpProvider>`

**Step 4: Add Launch App button to Hero**

In `src/sections/hero.tsx`:
- Import `useWarp` from `@/components/warp-transition`
- Add `const { startWarp } = useWarp()` inside the Hero component
- Add a third CTA button "Launch App" that calls `startWarp` on click
- The button should be the filled variant with an onClick handler

**Step 5: Build and verify**

```bash
pnpm build
```

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: add WarpTransition effect for Launch App button"
```

---

### Task 5: Add hero grid background

**Files:**
- Modify: `src/app/globals.css` (add bg-grid pattern)
- Modify: `src/sections/hero.tsx` (add grid layers)

**Step 1: Add grid CSS pattern to globals.css**

Add to `src/app/globals.css`:
```css
.bg-grid {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
}
```

**Step 2: Add grid background layers to Hero**

In `src/sections/hero.tsx`, add two grid layers before the content:

1. Outer grid with radial fade mask (80% ellipse)
2. Inner grid with accent-blue tint and smaller mask (50% ellipse)

These go as the first children of the section, before the purple glow div.

**Step 3: Build and verify**

```bash
pnpm build
```

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add grid background to Hero section"
```

---

### Task 6: Update Hero with FadeIn animations

**Files:**
- Modify: `src/sections/hero.tsx`

**Step 1: Replace AnimatedSection with FadeIn**

In Hero, use `FadeIn` with blur effect for subtitle and CTA entrance instead of plain motion.div. Keep the existing staggered Framer Motion for the headline.

**Step 2: Build and verify**

```bash
pnpm build
```

**Step 3: Commit**

```bash
git add src/sections/hero.tsx
git commit -m "feat: enhance Hero with FadeIn blur animations"
```

---

### Task 7: Deploy and verify

**Step 1: Final build**

```bash
pnpm build
```

**Step 2: Push and deploy**

```bash
git push origin main
pnpm dlx vercel --yes --scope danylos-projects-30440ca9 --name etny-website
```

---

## Task Summary

| Task | What | ~Time |
|------|------|-------|
| 1 | Loading screen + context + PageWrapper | 5 min |
| 2 | FadeIn animation component | 2 min |
| 3 | IsometricBoxes + useCanvasPerf | 5 min |
| 4 | WarpTransition (Launch App) | 5 min |
| 5 | Hero grid background | 3 min |
| 6 | Hero FadeIn animations | 3 min |
| 7 | Deploy | 2 min |
