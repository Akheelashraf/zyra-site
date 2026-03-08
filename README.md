# Zyra Builds – Company Website

Production-ready Next.js site for **Zyra Builds**.  
Stack: Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion.

---

## Prerequisites: Node.js and npm

**You need Node.js (and npm) installed before running the project.**

- **Step-by-step (beginner-safe):** open **NODE_INSTALL.md** in this folder.
- **Quick:** [nodejs.org](https://nodejs.org) → download **LTS** → run installer → restart Terminal.

After installation, run:

```bash
cd /Users/akheelashraf/Documents/5_ZYRA_DIGITAL/Website/zyra-site
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project structure (overview)

- `src/app` – App Router pages and layout  
- `src/components` – Reusable UI (ui, navigation, cards, buttons, forms)  
- `src/sections` – Page sections (Hero, Services, Projects, etc.)  
- `src/styles` – Global CSS and Zyra brand variables  
- `src/data` – Content (services, projects, company)  
- `src/assets` – Images, icons, logos, videos, 3D assets  
- `src/lib`, `src/hooks`, `src/utils`, `src/animations` – Utilities and shared logic  

---

## Framer & Spline

- **Framer**: Use for high-fidelity design and export; you can copy components or styles into this repo, or embed Framer pages via iframe if needed.  
- **Spline**: The Hero section includes a placeholder area for a Spline 3D embed. You can use the official [Spline React runtime](https://spline.design/) or an iframe embed. Add the Spline script/component inside `src/sections/hero/Hero.tsx` when ready.

---

## Deploy on Vercel

### 1. Push to GitHub

- Create a new repository on [GitHub](https://github.com).
- In Terminal, from the project folder (`zyra-site`), run:
  ```bash
  git init
  git add .
  git commit -m "Initial commit"
  git branch -M main
  git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
  git push -u origin main
  ```
- Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your GitHub details.

### 2. Import into Vercel

- Go to [vercel.com](https://vercel.com), sign in (or use GitHub).
- Click **Add New** → **Project**.
- Import your GitHub repo. Vercel will detect Next.js.
- Leave **Build Command** as `npm run build` and **Output Directory** as default.
- Click **Deploy**. The first build may take a minute.

### 3. After deploy

- Your site will be live at `https://your-project.vercel.app`.
- Root (`/`) redirects to `/en`. Use `/en` or `/ar` for language-specific pages. No environment variables are required for basic deployment.
- To connect a custom domain: Project → **Settings** → **Domains** → add your domain and follow the DNS steps Vercel shows.

### 4. Favicon and social images

- See **src/app/ICON_AND_SOCIAL_IMAGES.md** for where to add `icon.png`, `apple-icon.png`, and `opengraph-image.png` so the site looks correct in browser tabs and when shared on social media.

The project includes a `vercel.json` that aligns with this workflow.
