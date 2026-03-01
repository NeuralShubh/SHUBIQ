# SHUBIQ — Intelligence That Wins

Personal brand website of **Shubham Patil (NeuralShubh)**.

Built with **Next.js 14**, **TypeScript**, **Tailwind CSS**.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open in browser
http://localhost:3000
```

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🌐 Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or simply push to GitHub and connect the repo to [vercel.com](https://vercel.com) — it auto-deploys.

## 🗂️ Project Structure

```
src/
  app/
    components/
      Cursor.tsx       # Custom gold cursor
      Navbar.tsx       # Sticky nav with scroll detection
      Hero.tsx         # Full-screen landing section
      About.tsx        # About + skills section
      Services.tsx     # 4-column services grid
      Projects.tsx     # GitHub projects portfolio
      Products.tsx     # Upcoming products showcase
      Marquee.tsx      # Scrolling ticker
      Contact.tsx      # Contact + social links
      Footer.tsx       # Footer with navigation
      GoldLine.tsx     # Section divider
      Reveal.tsx       # Scroll-triggered animation wrapper
    data.ts            # All content/data in one place
    globals.css        # Base styles + Tailwind
    layout.tsx         # Root layout + fonts + metadata
    page.tsx           # Main page assembly
```

## ✏️ Customizing Content

All content lives in **`src/app/data.ts`**:
- Update `PROJECTS` when you ship new work
- Add to `UPCOMING` for new product launches
- Modify `SERVICES` as your offerings evolve
- Edit `SOCIAL_LINKS` if handles change

## 🎨 Design System

- **Brand**: SHUBIQ · `#C9A84C` Gold on `#080808` Black
- **Fonts**: Cinzel (headings) · Cormorant Garamond (body) · Rajdhani (labels)
- **Theme**: Dark Premium · Luxury · Intelligence

---

© 2025 SHUBIQ · Shubham Patil
