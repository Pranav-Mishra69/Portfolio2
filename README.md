# Alex Morgan — Cinematic 3D Portfolio

An award-style portfolio site built with React 19, React Three Fiber, and
Framer Motion — featuring a cinematic WebGL hero, glassmorphic UI, scroll-
driven reveals, and interactive 3D skill visualizations.

![Stack](https://img.shields.io/badge/React-19-7C5CFF) ![Stack](https://img.shields.io/badge/Three.js-R3F-34E0F1) ![Stack](https://img.shields.io/badge/Tailwind-CSS-FF4FCB)

---

## Tech stack

| Layer        | Tools |
|--------------|-------|
| Framework    | React 19, Vite |
| 3D           | Three.js, React Three Fiber, Drei, @react-three/postprocessing |
| Animation    | Framer Motion, GSAP, Lenis (smooth scroll) |
| Forms        | React Hook Form, Zod |
| Styling      | Tailwind CSS (custom theme) |
| Routing      | React Router |
| SEO          | React Helmet Async |
| Icons        | Lucide React |

## Getting started

### Prerequisites

- Node.js **18+** (Node 20 LTS recommended)
- npm 9+ (or pnpm / yarn if you prefer — lockfile not included)

### Install & run

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:5173`.

### Build for production

```bash
npm run build
npm run preview   # serve the production build locally to sanity-check
```

Output is written to `dist/`.

### Lint

```bash
npm run lint
```

---

## Project structure

```
src/
├── assets/            # models, textures, images, fonts (add your own)
├── components/
│   ├── common/        # Button, SectionTitle, Loader, GlassCard, AnimatedText
│   ├── three/         # HeroScene, FloatingParticles, GeometricCluster,
│   │                  # SkillSphere, ExperienceScene, Lights
│   └── layout/        # Navbar, Footer, PageTransition
├── sections/           # Hero, About, Projects, Experience, Skills, Contact
├── pages/              # Home.jsx, NotFound.jsx (route targets)
├── hooks/              # useLenis, useMouseParallax, useScrollProgress, useIntersection
├── data/               # projects.js, skills.js, experience.js
├── styles/             # globals.css (Tailwind layers + custom utilities)
├── App.jsx
├── main.jsx
└── routes.jsx
```

## Customizing content

All copy and structured content lives in `src/data/`:

- **`projects.js`** — title, description, tags, demo/GitHub links, year
- **`skills.js`** — categories (Frontend, 3D, Backend, Tools) with per-skill
  proficiency, used both by the radar chart in About and the 3D skill
  spheres in Skills
- **`experience.js`** — role, company, period, description, highlights

Update your name, title, and bio directly in `src/sections/Hero.jsx` and
`src/sections/About.jsx`. Social links live in `src/components/layout/Footer.jsx`
and `src/sections/Contact.jsx`.

### Replacing placeholder images

Project card visuals currently render as gradient placeholders
(`src/sections/Projects.jsx`). Drop real screenshots into
`src/assets/images/` and swap the placeholder `<div>` for an `<img>` tag
referencing the imported asset.

### Wiring up the contact form

`src/sections/Contact.jsx` currently logs submissions to the console after
a simulated delay. To make it functional, replace the `onSubmit` handler
with a call to your endpoint of choice:

- **Formspree / Getform** — POST the form data directly, no backend needed
- **Resend / SendGrid** — call from a small serverless function (Vercel
  Function, Netlify Function, or Cloudflare Pages Function)
- **Your own API** — point `fetch()` at your backend

## Performance notes

- All sections below the fold are **lazy-loaded** via `React.lazy` +
  `Suspense`, including all Three.js scenes (`HeroScene`, `SkillSphere`,
  `ExperienceScene`) — these are the heaviest bundles, so keeping them
  off the critical path matters most.
- `vite.config.js` manually chunks `three` + R3F/Drei/postprocessing,
  Framer Motion + GSAP, and core React/Router into separate vendor
  bundles for better caching.
- Canvas `dpr` is capped at `[1, 1.5]` across all three scenes to avoid
  over-rendering on high-DPI displays, which is the single biggest WebGL
  performance lever on mobile.
- `prefers-reduced-motion` disables Lenis smooth scroll entirely and
  shortens all CSS animation/transition durations via a global media query
  in `globals.css`.

## Accessibility

- Skip-to-content link, visible focus rings (`:focus-visible`), and ARIA
  labels on icon-only buttons (social links, mobile menu toggle).
- Form fields use proper `<label htmlFor>` pairing and `aria-invalid` /
  `aria-describedby` wiring for validation errors (see `Contact.jsx`).
- Decorative elements (aurora background, noise overlay, cursor spotlight,
  wireframe spheres) are marked `aria-hidden="true"`.
- Color contrast was checked against WCAG AA for body text on the dark
  background; if you change the palette in `tailwind.config.js`, re-check
  contrast for `text-muted` and `text-muted-dim`.

---

## Deployment

### Vercel

1. Push this repo to GitHub/GitLab/Bitbucket.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Framework preset: **Vite** (auto-detected).
4. Build command: `npm run build` · Output directory: `dist`
5. Deploy — Vercel handles SPA routing (React Router) automatically via
   its default rewrite behavior for Vite projects. If you hit 404s on
   refresh for nested routes, add a `vercel.json`:

   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
   }
   ```

### Netlify

1. Push this repo to your git provider.
2. New site from Git at [app.netlify.com](https://app.netlify.com).
3. Build command: `npm run build` · Publish directory: `dist`
4. Add a `public/_redirects` file so client-side routes don't 404 on
   refresh:

   ```
   /*    /index.html   200
   ```

5. Deploy.

### Cloudflare Pages

1. Push this repo to your git provider.
2. New project at [pages.cloudflare.com](https://pages.cloudflare.com),
   connect the repo.
3. Framework preset: **Vite**. Build command: `npm run build` · Build
   output directory: `dist`
4. For SPA routing, add a `public/_redirects` file (same as Netlify above)
   or configure a `functions/[[path]].js` catch-all — the `_redirects`
   approach is simplest for a static Vite SPA.
5. Deploy.

---

## License

This codebase is provided as a starting template — adapt freely for your
own portfolio.
