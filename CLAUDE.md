# CLAUDE.md

## Purpose

Public personal site of Juan Manuel Vélez Parra (Java Backend Engineer, Medellín, Colombia), deployed at `https://jotaeme.dev` on Cloudflare Pages. A static Astro site with two languages: English at `/` (default, no prefix) and Spanish at `/es/`.

## Commands

- `npm install`: install dependencies.
- `npm run dev`: dev server at `localhost:4321`.
- `npm run build`: build into `dist/` (Cloudflare Pages: build `npm run build`, output `dist`).
- `npm run preview`: serve `dist/`.

## Structure

```text
src/content/   site.json, es.json, en.json (copied by hand, do not edit here)
src/layouts/   Base.astro (head, SEO, JSON-LD, `js` class and loader state)
src/components/  Nav, Logo, Loader, Hero, Globe, Stats, Marquee, About, Experience,
                 Stack, Services, Ecosystem, Contact, Footer
src/lib/       content.ts, skills.ts (globe and marquee labels come from the skills in the JSON)
src/styles/    tokens.css (brand tokens), fonts.css, loader.css, global.css
src/pages/     index.astro (EN, default), es/index.astro (ES)
public/cv/     CV PDFs (ES and EN)
public/fonts/  self-hosted woff2 fonts (no Google Fonts)
jotaeme-brand/ full brand kit, versioned (source of tokens, fonts, favicon, OG)
jotaeme-site/  design reference (static HTML), versioned, never deployed or copied as is
```

## Rules

- **All files in this repo are written in English**: code, comments, README, commit messages. Site text is the exception: it comes from `src/content/` in Spanish and English.
- Never write profile text by hand in components. Everything comes from `src/content/`.
- Interface labels and anchors ("About", "Contact", "Download CV") live in `src/i18n.ts`. Profile text lives in `src/content/`.
- This repo is public. Never add a phone number, private documents, or client names other than BBVA, Credicorp, Banco de Bogotá, and Banco Popular. No AI positioning on the site.
- Use the latest stable version of Astro and every dependency. Before using any library API, check its current docs with the Context7 plugin instead of relying on memory.
- Keep it simple: one page per language, six anchors: `#sobre-mi`, `#experiencia`, `#stack`, `#servicios`, `#ecosistema`, `#contacto` (English: `#about`, `#experience`, `#stack`, `#services`, `#ecosystem`, `#contact`).
- Beyond the CV (apps, free, lab) has no links until those subdomains exist. Show the subdomain name as plain text only.
- Colors, fonts, radii, and timings come only from `src/styles/tokens.css`. No hex color in `global.css` or in components; use `var(--jm-*)`. `--jm-accent` is only for the cursor, main buttons (including "Let's talk"), section labels, focus, link hover, the `.dev` part of the wordmark, and the loader. No amber in the globe, stats, or timeline.
- Dark theme only. Hidden entrance and loader states exist only under the `js` class on `<html>`, so the site works without JavaScript. The loader runs once per session (`sessionStorage` key `jm:loader-seen`). Honor `prefers-reduced-motion` (globe, marquee, scroll reveal, hover, tilt). Scroll reveal uses `animation-timeline: view()` under `@supports`.
- Do not commit or push unless the user asks.
