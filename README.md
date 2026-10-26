# jotaeme.dev

Personal site of **Juan Manuel Vélez Parra**, Java Backend Engineer in Medellín, Colombia.

🌐 **Live:** [jotaeme.dev](https://jotaeme.dev) · [Español](https://jotaeme.dev/es/)

## What it is

A small, fast, static site with one page per language:

- English at `/` (default) and Spanish at `/es/`, with a language switcher.
- Fixed menu with a mobile version, a hero with a CSS 3D globe, highlights, and a technology marquee.
- Sections: About, Experience, Stack, Services, Beyond the CV (no links yet), and Contact.
- CV downloads in English and Spanish.
- SEO basics: Open Graph, `hreflang`, `sitemap.xml`, and JSON-LD `Person`.
- Dark theme from the `jotaeme-brand` kit, with self-hosted fonts (no third-party requests).
- Scroll reveal, card hover, and a loader on the first visit of each session. Everything respects `prefers-reduced-motion`. Without JavaScript, all content is visible.
- No framework on the client: plain HTML and CSS, plus two tiny inline scripts.

## Tech

- [Astro](https://astro.build) (static output)
- TypeScript
- [Cloudflare Pages](https://pages.cloudflare.com) for hosting, with the domain on Cloudflare

## Run it locally

You need Node.js 22.23.4 or newer.

```bash
npm install
npm run dev
```

Open [localhost:4321](http://localhost:4321).

| Command           | What it does                      |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start the dev server              |
| `npm run build`   | Build the site into `dist/`       |
| `npm run preview` | Serve the built site locally      |

## Project structure

```text
src/
├── components/   Nav, Logo, Loader, Hero, Globe, Stats, Marquee, About, Experience,
│                 Stack, Services, Ecosystem, Contact, Footer
├── lib/          content.ts, skills.ts (globe and marquee labels from the skills)
├── content/      site.json, es.json, en.json (all profile text)
├── layouts/      Base.astro (head, SEO, JSON-LD)
├── pages/        index.astro (EN), es/index.astro (ES), 404.astro, sitemap.xml.ts
├── styles/       tokens.css (brand tokens), fonts.css, loader.css, global.css
└── i18n.ts       interface labels and anchors per language
public/
├── cv/           CV PDFs (EN and ES)
├── fonts/        self-hosted woff2 fonts
├── og.png        share image (1200×630)
└── favicon, manifest, robots.txt
jotaeme-brand/    full brand kit (logos, tokens, fonts, guidelines)
jotaeme-site/     design reference (static HTML), versioned and not deployed
```

## How the content works

All profile text lives in `src/content/`. These files are copied by hand from a curated content folder in a private repository, so only content approved for publishing reaches this repo. Please edit the text there, not here.

Interface labels such as "About" or "Contact" live in `src/i18n.ts`.

## Styles

All colors, fonts, radii, and timings come from `src/styles/tokens.css` (a copy of `jotaeme-brand/tokens/tokens.css`). Use `var(--jm-*)` and never write a hex color in `global.css` or in components. The accent color (`--jm-accent`) is only for the cursor, main buttons, section labels, focus, link hover, the `.dev` part of the wordmark, and the loader.

## Deploy

Every push to `main` builds and deploys the site on Cloudflare Pages.

- Build command: `npm run build`
- Output directory: `dist`

## Contact

[juanmavelezpa@gmail.com](mailto:juanmavelezpa@gmail.com) · [LinkedIn](https://www.linkedin.com/in/juanmavelezpa) · [GitHub](https://github.com/JuanMaVelezPa)
