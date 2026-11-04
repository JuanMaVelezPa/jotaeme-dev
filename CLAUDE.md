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
src/content/   site.json, es.json, en.json (career facts, copied by hand from the branding repo, do not edit here); copy.json (site copy), labs.json, projects.json (owned by this repo, edit here)
src/layouts/   Base.astro (head, SEO, JSON-LD, `js` class and loader state)
src/components/  Home.astro, Lab.astro (page bodies shared by both languages)
  layout/      Nav, ProjectsMenu, Logo, Loader, Footer
  sections/    Hero, Stats, Marquee, About, Experience, Stack, Services, Ecosystem, Contact
  lab/         LabCard
  ui/          Globe
src/lib/       content.ts, i18n.ts, skills.ts (globe and marquee labels come from the skills in the JSON)
src/styles/    tokens.css (brand tokens), fonts.css, loader.css, global.css
src/pages/     index.astro (EN, default), es/index.astro (ES), lab/index.astro (EN), es/lab/index.astro (ES), sitemap.xml.ts
public/cv/     CV PDFs (ES and EN)
public/fonts/  self-hosted woff2 fonts (no Google Fonts)
design/brand/  full brand kit, versioned (source of tokens, fonts, favicon, OG), never deployed or imported
```

## Rules

- **All files in this repo are written in English**: code, comments, README, commit messages. Site text is the exception: it comes from `src/content/` in Spanish and English.
- Never write profile text by hand in components. Everything comes from `src/content/`. Only `site.json`, `es.json` and `en.json` are copied by hand from the branding repo (career facts: headline, summary, experience, skills, stats, About chips and "How I work"). `copy.json` (site copy: hero, section titles, services, Beyond the CV, contact, footer line, meta; decision 011), `labs.json` and `projects.json` belong to this repo: edit them here, and a copy from the branding repo must skip them. A key must not exist in both `copy.json` and `es.json` / `en.json`; `content.ts` fails the build if it does.
- Interface labels and anchors ("About", "Contact", "Download CV") live in `src/lib/i18n.ts`. Profile text lives in `src/content/`.
- This repo is public. Never add a phone number, private documents, or client names other than BBVA, Credicorp, Banco de Bogotá, and Banco Popular. AI appears only as the method block "How I work" in About (decision 010 of the branding repo): no AI in the headline, no level labels, no project links.
- Use the latest stable version of Astro and every dependency. Before using any library API, check its current docs with the Context7 plugin instead of relying on memory.
- Keep it simple: one home per language with six anchors, plus one page per project category (`/lab` so far, `/es/lab`; `/code` and `/apps` get their own specs). Categories are Code · Apps · Lab and they are pages, not subdomains: only a project that runs gets its own subdomain (`lab-n8n.jotaeme.dev`). `free` is merged into `apps`, with a `Free` / `Paid` tag per app on its future page. Home anchors: `#sobre-mi`, `#experiencia`, `#stack`, `#servicios`, `#ecosistema`, `#contacto` (English: `#about`, `#experience`, `#stack`, `#services`, `#ecosystem`, `#contact`).
- Beyond the CV, only the Lab tile links (to `/lab`, `/es/lab`). The `code` and `apps` tiles have no links until their pages exist: show the name as plain text only. Host lines read `jotaeme.dev/<id>`. Each lab card links to its own subdomain and repo from `labs.json`.
- **Projects menu** (`Nav` + `ProjectsMenu`): one markup, a full-width panel on desktop (hover, click, Enter, Space) and an accordion in the mobile panel. Columns come from `projects.json` (Code, Apps) and `labs.json` (Lab); adding an entry to either file adds an item with no component change. Items without a page have no link and show a `Soon` tag. Without JavaScript, "Projects" is a plain link to the home section. Below 820 px the bar holds only the logo and the burger icon; "Let's talk" and the language switch live in the panel.
- Colors, fonts, radii, and timings come only from `src/styles/tokens.css`. No hex color in `global.css` or in components; use `var(--jm-*)`. Category colors are `--jm-code`, `--jm-apps` and `--jm-lab`; the hero status dot uses `--jm-available`. `--jm-accent` is only for the cursor, main buttons (including "Let's talk"), section labels, focus, link hover, the `.dev` part of the wordmark, and the loader. No amber in the globe, stats, or timeline.
- Dark theme only. Hidden entrance and loader states exist only under the `js` class on `<html>`, so the site works without JavaScript. The loader runs once per session (`sessionStorage` key `jm:loader-seen`). Honor `prefers-reduced-motion` (globe, marquee, scroll reveal, hover, tilt). Scroll reveal uses `animation-timeline: view()` under `@supports`.
- Do not commit or push unless the user asks.
