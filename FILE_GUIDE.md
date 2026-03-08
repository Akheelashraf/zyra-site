# Zyra Builds – File Guide (Beginner-Friendly)

This document explains **every file** in the project in simple terms.

---

## Root folder (zyra-site)

| File | What it does |
|------|----------------|
| **package.json** | Lists the project name, scripts (`npm run dev`, `npm run build`), and all dependencies (Next.js, React, Tailwind, Framer Motion, etc.). npm uses this to install packages. |
| **tsconfig.json** | TypeScript configuration: how strict the type-checking is and that `@/*` means the `src` folder (so we can write `@/components/...` instead of long paths). |
| **next.config.ts** | Next.js settings. Here we allow images from Framer and Spline domains so future embeds work. |
| **tailwind.config.ts** | Tailwind CSS config: which folders to scan for class names, and custom values (Zyra colors, container max-widths 1280px / 1440px). |
| **postcss.config.mjs** | Tells the build to run Tailwind (processes your CSS). |
| **next-env.d.ts** | Auto-generated TypeScript definitions for Next.js. Don’t edit. |
| **.eslintrc.json** | ESLint rules (code quality). Uses Next’s recommended setup. |
| **.gitignore** | Tells Git which files/folders to ignore (e.g. `node_modules`, `.next`). |
| **vercel.json** | Hints for Vercel: framework is Next.js, which commands to run for build and dev. |
| **README.md** | How to install Node, run the project, and deploy. |

---

## src/app (App Router – pages)

| File | What it does |
|------|----------------|
| **layout.tsx** | The “shell” of every page: loads global CSS, sets HTML lang, and wraps all pages. Also sets the default title and description for the site. |
| **page.tsx** | The **homepage**. It imports and renders in order: Navbar → Hero → BrandStatement → Services → Projects → Process → WhyChoose → CTA → Footer. |

---

## src/styles

| File | What it does |
|------|----------------|
| **variables.css** | Zyra brand colors as CSS variables (e.g. `--zyra-primary: #3E4FD3`). Use these in CSS or Tailwind for consistent branding. |
| **globals.css** | Imports variables, then Tailwind’s base/components/utilities. Adds body styles and optional utility classes like `container-zyra`. |

---

## src/components

**ui/Container.tsx**  
A reusable wrapper that centers content and limits width (1280px or 1440px). Used by sections so the layout stays consistent.

**navigation/Navbar.tsx**  
Top bar: logo “Zyra Builds”, links (Home, Services, Projects, About, Contact), and a “Get in touch” CTA button.

The **buttons**, **cards**, and **forms** folders are empty placeholders for future components (they only have `.gitkeep` so Git keeps the folders).

---

## src/sections

Each section is one part of the homepage:

| Section | File | Purpose |
|---------|------|--------|
| Hero | **hero/Hero.tsx** | Big headline, subtext, two buttons, and a placeholder area for a Spline 3D embed. |
| Brand | **brand/BrandStatement.tsx** | Short “who we are” or value statement. |
| Services | **services/Services.tsx** | Grid of service cards (content can come from `data/services.ts`). |
| Projects | **projects/Projects.tsx** | Grid of project cards (content from `data/projects.ts`). |
| Process | **process/Process.tsx** | Steps (e.g. 1, 2, 3) describing how you work. |
| Why us | **why/WhyChoose.tsx** | Reasons to choose Zyra Builds. |
| CTA | **cta/CTA.tsx** | Final call-to-action block (headline + “Get in touch” button). |
| Footer | **footer/Footer.tsx** | Logo, links, short tagline, and copyright. |

---

## src/data (content)

| File | What it does |
|------|----------------|
| **services.ts** | List of services (title, description). Edit here to change the Services section content. |
| **projects.ts** | List of projects (title, description, optional image/link). Edit here for the Projects section. |
| **company.ts** | Company name, tagline, about text, contact info. One place to update shared company details. |

---

## src/lib

| File | What it does |
|------|----------------|
| **utils.ts** | The `cn()` helper: merges Tailwind class names and handles conditionals. Used in components like Container and Navbar. |

---

## src/assets

Empty folders for your media (kept in Git via `.gitkeep`):

- **images** – Photos, graphics  
- **icons** – Icon files  
- **logos** – Logo files  
- **videos** – Video files  
- **3d** – 3D assets (e.g. for Spline)

---

## src/animations, src/hooks, src/utils

- **animations** – For Framer Motion or other animation helpers (currently empty).  
- **hooks** – For custom React hooks (empty).  
- **utils** – For other small helper functions (empty).

---

## Framer, Spline, and Vercel

- **Framer**: Design in Framer; copy components or styles into this codebase, or embed Framer pages via iframe if needed.  
- **Spline**: Hero has a dedicated placeholder; add the Spline embed (iframe or Spline React component) in `src/sections/hero/Hero.tsx`.  
- **Vercel**: Push the repo to GitHub and connect it in Vercel; it will detect Next.js and deploy. See README.md for steps.
