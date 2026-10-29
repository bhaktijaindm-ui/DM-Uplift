# UPLIFT — Digital Marketing Agency Portfolio

A high-performance, scroll-driven 3D single-page digital marketing agency portfolio built with **React**, **Three.js**, **GSAP ScrollTrigger**, **Framer Motion**, and **Tailwind CSS**.

---

## ⚡ Features

- **Interactive 3D Particle Text Intro**: High-resolution particle sampling with physics-based mouse dissipation and smooth restorative springs.
- **Compact Hero with 3D Orbital Scene**: Interactive Three.js scene featuring glassmorphic geometry, neon-blue lighting, and mouse-parallax motion.
- **Service Stack & Showcase**: Digital marketing services (Web Development, SEO, Social Media, Shoots, Paid Campaigns, Branding, Content & Reels) with interactive 3D card deck preview.
- **Timeline & Milestones**: Clean 4-card milestone grid showcasing proven track record and growth metrics.
- **Curated Projects Showcase**: Category-filtered client case studies with digital marketing analytics and visuals.
- **High-Conversion Contact & FAQ**: Glassmorphism inquiry form, quick FAQ accordion, and direct contact channels with text-wrapping safety.
- **Interactive Halftone Wordmark Footer**: Canvas-driven halftone dot grid with pointer-reactive springs and kinetic energy pulse.
- **Unified Design System**: Deep navy (`#040814`) theme with crisp white typography and neon-blue (`#2E7BFF` / `#00B4FF`) glowing accents. Zero large empty gaps, fully responsive layout.

---

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite 8](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **3D & Canvas**: [Three.js](https://threejs.org/) + Custom 2D Canvas Physics
- **Animations & Smooth Scroll**: [GSAP](https://gsap.com/) (ScrollTrigger) + [Lenis](https://lenis.darkroom.engineering/) + [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm / pnpm / yarn

### Installation

```bash
git clone <your-repo-url>
cd "Dm uplift"
npm install
```

### Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Production Build

```bash
npm run build
```

The production assets will be output to the `dist/` directory.

---

## 🌐 Deploy to GitHub Pages

This repository includes an automated GitHub Actions workflow (`.github/workflows/deploy.yml`).

1. Push your code to the `main` branch on GitHub:
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```
2. In your GitHub repository:
   - Go to **Settings** → **Pages**.
   - Under **Build and deployment** → **Source**, select **GitHub Actions**.
3. The deployment workflow will automatically run and publish your site to:
   `https://<your-username>.github.io/<your-repo-name>/`
