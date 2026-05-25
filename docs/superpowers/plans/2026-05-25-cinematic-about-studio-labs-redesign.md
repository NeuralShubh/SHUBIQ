# Cinematic About, Studio, and Labs Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the About section, Studio hero, and Labs hero into one premium dark cinematic visual system with strong mobile-first layout, image-led composition, and consistent brand polish.

**Architecture:** Keep the work focused on the existing section components rather than introducing a new page framework. Add one reusable cinematic media helper only if it removes duplication cleanly, then use it across the About section, Studio hero, and Labs hero so the pages feel like one family instead of three disconnected experiences.

**Tech Stack:** Next.js App Router, React 19, Framer Motion, Tailwind CSS, next/image, local `public/` assets.

---

### Task 1: Build the shared cinematic media treatment

**Files:**
- Create: `src/app/components/CinematicMediaFrame.tsx`
- Modify: `src/app/components/Hero.tsx`

- [ ] **Step 1: Add the shared media frame**

Create a small reusable component that renders:
- a dark image container with rounded corners
- a gradient wash overlay
- a small badge layer in the top-left
- an optional stat strip or caption band at the bottom

Use it with the existing hero image so the new About, Studio, and Labs sections can reuse the same visual language.

- [ ] **Step 2: Wire the hero to the new frame**

Update the homepage hero to keep the same premium direction and share the same image treatment so the new sections match the first screen.

- [ ] **Step 3: Verify the helper compiles**

Run:
```bash
npm run build
```
Expected: the build still reaches the static generation phase without new type errors from the shared component.

### Task 2: Redesign the About section

**Files:**
- Modify: `src/app/components/About.tsx`
- Create/Modify assets in: `public/`

- [ ] **Step 1: Replace the current text-heavy grid with an editorial split layout**

Keep the section mobile-first, but make it feel premium:
- left side: strong headline, concise brand story, one premium CTA
- right side: one cinematic image card with a branded overlay and 3 compact proof cards

Use the same dark background treatment and the `nexgravision-logo.png` asset so About feels like a continuation of the homepage rather than a separate block.

- [ ] **Step 2: Keep the messaging concise and high-end**

Reduce the body copy to shorter, more confident paragraphs and replace the current generic card grid with a tighter set of 3 to 4 brand pillars.

- [ ] **Step 3: Check the mobile stack**

Make sure the section reads top-to-bottom cleanly on a phone:
headline, copy, CTA, image, proof cards.

### Task 3: Redesign the Studio hero

**Files:**
- Modify: `src/app/shubiq-studio/StudioPage.tsx`
- Modify: `src/app/shubiq-studio/studioContent.ts` if any Studio copy needs tightening
- Create/Modify assets in: `public/`

- [ ] **Step 1: Replace the current animated-heavy hero with a one-screen cinematic layout**

Rework `StudioHero()` so it becomes an image-led hero:
- left side: eyebrow, logo, large headline, short supporting paragraph, two CTAs
- right side: one premium dark image panel with overlays, a small brand badge, and a compact stats block

Keep the section within one screen on desktop and readable without scrolling on mobile.

- [ ] **Step 2: Match the same visual system as About**

Reuse the same background philosophy, border softness, glow intensity, and typography hierarchy so the Studio page feels like the same premium studio family.

- [ ] **Step 3: Reduce motion to purposeful accents**

Remove or tone down the looping decorative animation so the hero feels calmer, more expensive, and easier to read.

### Task 4: Redesign the Labs hero

**Files:**
- Modify: `src/app/shubiq-labs/LabsPageClient.tsx`
- Modify: `src/app/data-labs.ts` if copy needs tightening
- Create/Modify assets in: `public/`

- [ ] **Step 1: Rebuild the Labs hero as a cinematic launch page**

Keep the Labs identity but make it match the same dark premium system:
- strong headline
- concise product description
- one primary CTA and one secondary CTA
- a large image or command-style visual panel on the right
- a compact row of metrics or status pills below

- [ ] **Step 2: Keep the labs content hierarchy focused**

Trim the visual noise above the fold so the product division reads as polished and serious rather than busy.

- [ ] **Step 3: Preserve the rest of the page**

Leave the deeper Labs content mostly intact so the redesign focuses on the hero and first impression without destabilizing the product detail sections.

### Task 5: Verify and ship

**Files:**
- Inspect: all modified files from Tasks 1-4

- [ ] **Step 1: Run the production build**

Run:
```bash
npm run build
```
Expected: build succeeds with no new route prerender errors or type errors.

- [ ] **Step 2: Sanity-check the rendered pages**

Open the local site and confirm:
- About reads as premium and image-led
- Studio hero fits as a one-screen cinematic layout
- Labs hero matches the same dark premium style
- the logo appears consistently across all three sections

- [ ] **Step 3: Commit and push**

Run:
```bash
git add -A
git commit -m "feat: redesign about studio and labs visuals"
git push origin main
```
