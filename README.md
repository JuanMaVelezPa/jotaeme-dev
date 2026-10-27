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
- Installable PWA with basic offline support (see "PWA and subdomains").
- Dark theme from the `design/brand` kit, with self-hosted fonts (no third-party requests).
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
├── components/   Home.astro (page body shared by both languages)
│   ├── layout/   Nav, Logo, Loader, Footer
│   ├── sections/ Hero, Stats, Marquee, About, Experience, Stack, Services, Ecosystem, Contact
│   └── ui/       Globe
├── lib/          content.ts, i18n.ts (interface labels and anchors), skills.ts
├── content/      site.json, es.json, en.json (all profile text)
├── layouts/      Base.astro (head, SEO, JSON-LD)
├── pages/        index.astro (EN), es/index.astro (ES), 404.astro, sitemap.xml.ts
└── styles/       tokens.css (brand tokens), fonts.css, loader.css, global.css
public/
├── cv/           CV PDFs (EN and ES)
├── fonts/        self-hosted woff2 fonts
├── og.png        share image (1200×630)
├── sw.js         service worker (must stay at the root)
└── favicon, site.webmanifest, robots.txt
design/
└── brand/        full brand kit (logos, tokens, fonts, guidelines), not deployed
```

## How the content works

All profile text lives in `src/content/`. These files are copied by hand from a curated content folder in a private repository, so only content approved for publishing reaches this repo. Please edit the text there, not here.

Interface labels such as "About" or "Contact" live in `src/lib/i18n.ts`.

## Styles

All colors, fonts, radii, and timings come from `src/styles/tokens.css` (a copy of `design/brand/tokens/tokens.css`). Use `var(--jm-*)` and never write a hex color in `global.css` or in components. The accent color (`--jm-accent`) is only for the cursor, main buttons, section labels, focus, link hover, the `.dev` part of the wordmark, and the loader.

## PWA and subdomains

`jotaeme.dev` is an installable PWA. It has two files, both flat in `public/` because a service worker only controls the path it is served from:

- `site.webmanifest`: `id`, `start_url`, `scope`, `lang`, icons (separate `any` and `maskable` entries), and the theme and background colors.
- `sw.js`: precaches the shell (`/`, `/es/`, fonts, icons, favicon, manifest, both CVs) and serves it offline. Pages and CV PDFs are network-first, so online visitors always get the latest version. Fonts, icons, and hashed `/_astro/` files are cache-first. It is registered from `src/layouts/Base.astro` in production builds only, so `npm run dev` is never affected.

Bump `CACHE` in `public/sw.js` (`jm-shell-v1` to `jm-shell-v2`) only when the precache list changes or old assets should be dropped. It is not needed to publish new content.

If a change does not show up in your own browser after `npm run build && npm run preview`, an old worker is serving its copy: DevTools > Application > Service Workers > Unregister, then Storage > Clear site data. If Cloudflare Pages keeps `/sw.js` cached for too long, add `public/_headers` with:

```text
/sw.js
  Cache-Control: no-cache
```

### Replicating it on a subdomain

A PWA is installed per origin, so `apps.`, `free.` and `lab.jotaeme.dev` need their own manifest and service worker once they exist. They do not share the ones from the root domain. For each subdomain:

1. Copy `site.webmanifest` and `sw.js` into its `public/` folder.
2. In the manifest, set a distinct `id`, `name`, `short_name`, and `description`. Keep `start_url` and `scope` as `/`, which is relative to the subdomain. Set `theme_color` to the subdomain accent from `tokens.css` and keep `background_color` as the page background.
3. Point the icons to that subdomain's own files, including a maskable one with a 40% safe zone.
4. In `sw.js`, change `CACHE` to a unique name (for example `jm-apps-v1`) and replace `PRECACHE` with that site's own pages and assets.
5. Add the manifest link, the iOS meta tags, and the registration script to its layout.

## Deploy

Every push to `main` builds and deploys the site on Cloudflare Pages.

- Build command: `npm run build`
- Output directory: `dist`

## Contact

[juanmavelezpa@gmail.com](mailto:juanmavelezpa@gmail.com) · [LinkedIn](https://www.linkedin.com/in/juanmavelezpa) · [GitHub](https://github.com/JuanMaVelezPa)
