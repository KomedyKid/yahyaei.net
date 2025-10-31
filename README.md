<div align="center">
  <img src="./public/logo.png" alt="yahyaei.net logo" width="64" height="64" />
  
  <h1>yahyaei.net</h1>
  <p><strong>My personal website & project playground</strong></p>

  <p>
    <a href="https://nextjs.org"><img alt="Next.js" src="https://img.shields.io/badge/Next.js-15-000?logo=next.js&logoColor=white"></a>
    <a href="https://www.typescriptlang.org/"><img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white"></a>
    <a href="https://tailwindcss.com/"><img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-3-38BDF8?logo=tailwindcss&logoColor=white"></a>
    <a href="https://vercel.com/"><img alt="Deploy" src="https://img.shields.io/badge/Deploy-Vercel-000?logo=vercel&logoColor=white"></a>
  </p>

  <p>
    <a href="https://yahyaei.net"><strong>Live Site »</strong></a>
  </p>
</div>

## Overview

This repo contains my personal website built with Next.js (App Router). It includes a dynamic landing page with an interactive particle canvas, a redesigned glassy navbar with social links, and a Projects gallery featuring selected work from my GitHub.

## Features

- Interactive particle background on the home page
- Responsive, glassmorphic navbar with keyboard-friendly interactions
- Projects page with tech chips, star count, last updated, and quick links
- IB Score Converter utility page
- Type-safe, fast styling with Tailwind CSS

## Tech Stack

- Framework: Next.js 15, React 18, TypeScript
- Styling: Tailwind CSS, tailwindcss-animate
- UI/Icons/Animation: Lucide, Framer Motion/Motion

## Quick Start

Requirements: Node.js 18+

```bash
pnpm i   # or npm i / yarn
pnpm dev # or npm run dev / yarn dev
```

Open http://localhost:3000 to view the site.

## Scripts

- `dev`   – run the app in development
- `build` – build for production
- `start` – start the production server
- `lint`  – run Next lint

## Project Structure

```
yahyaei-net/
├─ app/                  # App Router pages
│  ├─ page.tsx           # Landing with particle canvas
│  ├─ projects/page.tsx  # Projects showcase
│  └─ ib-score-converter # IB Score Converter route
├─ components/           # Navbar, UI components
├─ hooks/                # Window event hooks (scroll, resize)
├─ public/               # Static assets (logo, images)
├─ tailwind.config.ts    # Tailwind setup
└─ next.config.mjs       # Next.js configuration
```

## Customization

- Social links: edit `components/Navbar.tsx`
- Projects list: update `app/projects/page.tsx`
- Branding: replace `public/logo.png` and tweak colors in Tailwind classes

## Deployment

The site is optimized for Vercel. Build and deploy with:

```bash
pnpm build
```

Then connect the repo to Vercel or deploy manually.

---

If you spot something off or have ideas, feel free to open an issue or PR.
