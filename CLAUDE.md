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
src/content/   site.json, es.json, en.json (career facts, copied by hand from the branding repo, do not edit here); copy.json (site copy), code.json, apps.json, labs.json, privacy.json (owned by this repo, edit here)
src/layouts/   Base.astro (head, SEO, JSON-LD, `js` class and loader state)
src/components/  Home.astro, Code.astro, Apps.astro, Lab.astro, Privacy.astro (page bodies shared by both languages)
  layout/      Nav, ProjectsMenu, Logo, Loader, Footer
  sections/    Hero, Stats, Marquee, About, Experience, Stack, Services, Ecosystem, Contact
  project/     ProjectCard (code and apps entries: engineering card, or client case when the entry has `asks`)
  lab/         LabCard
  ui/          Globe, McpDiagram (inline SVG, tokens only)
src/lib/       content.ts, i18n.ts, skills.ts (globe and marquee labels come from the skills in the JSON)
src/styles/    tokens.css (brand tokens), fonts.css, loader.css, global.css
src/pages/     index.astro (EN, default), es/index.astro (ES), code/, apps/, lab/, privacy/ (EN) and the same under es/ (ES), sitemap.xml.ts
public/cv/     CV PDFs (ES and EN)
public/images/ project screenshots, WebP: code/<id>/, apps/<id>/ (apps images use fictional data only)
public/fonts/  self-hosted woff2 fonts (no Google Fonts)
design/brand/  full brand kit, versioned (source of tokens, fonts, favicon, OG), never deployed or imported
```

## Rules

- **All files in this repo are written in English**: code, comments, README, commit messages. Site text is the exception: it comes from `src/content/` in Spanish and English.
- Never write profile text by hand in components. Everything comes from `src/content/`. Only `site.json`, `es.json` and `en.json` are copied by hand from the branding repo (career facts: headline, summary, experience, skills, stats, About chips and "How I work"). `copy.json` (site copy: hero, section titles, services, Beyond the CV, contact, footer line, meta; decision 011), `code.json`, `apps.json` and `labs.json` belong to this repo: edit them here, and a copy from the branding repo must skip them. `code.json` and `apps.json` share one shape (`Project` in `content.ts`): an `active` entry gets a card on its page and a linked menu item; a `soon` entry gets only a menu item with a `Soon` tag. A key must not exist in both `copy.json` and `es.json` / `en.json`; `content.ts` fails the build if it does.
- Interface labels and anchors ("About", "Contact", "Download CV") live in `src/lib/i18n.ts`. Profile text lives in `src/content/`.
- This repo is public. Never add a phone number, private documents, or client names other than BBVA, Credicorp, Banco de Bogotá, and Banco Popular. AI appears in "How I work" in About (decision 010 of the branding repo), in the MCP service, and in the `/apps` case (SPEC 07); never in the headline, the hero, Stats or the About paragraph. No "AI Engineer", no "Senior", no AI level labels, no unbacked skills (RAG, LLMs, embeddings), and no AI text that mentions ITC or its clients.
- **`/apps` client is anonymous**: "an auto-repair business in Medellín". No business name, logo, business figures, staff or customer names, and no link to its host or repo. Screenshots use fictional data, generic names and a placeholder logo, and the owner approves each one. The privacy policy names no client or app.
- Use the latest stable version of Astro and every dependency. Before using any library API, check its current docs with the Context7 plugin instead of relying on memory.
- Keep it simple: one home per language with six anchors, plus one page per project category (`/code`, `/apps`, `/lab`, and the same under `/es/`), and the privacy policy at `/privacy`, `/es/privacy` (SPEC 06: generic for every app on a `jotaeme.dev` subdomain that uses Sign in with Google; not linked from the footer; name no client or app in it). Categories are Code · Apps · Lab and they are pages, not subdomains: only a project that runs gets its own subdomain (`lab-n8n.jotaeme.dev`). `free` is merged into `apps`, with a `Free` / `Paid` tag per app on its future page. Home anchors: `#sobre-mi`, `#experiencia`, `#stack`, `#servicios`, `#ecosistema`, `#contacto` (English: `#about`, `#experience`, `#stack`, `#services`, `#ecosystem`, `#contact`).
- Beyond the CV, the `code`, `apps` and `lab` tiles each link to their page, and so does the footer network. Host lines read `jotaeme.dev/<id>`. Each lab card links to its own subdomain and repo from `labs.json`.
- **Projects menu** (`Nav` + `ProjectsMenu`): one markup, a full-width panel on desktop (hover, click, Enter, Space) and an accordion in the mobile panel. Columns come from `code.json`, `apps.json` and `labs.json`; adding an entry to any of them adds an item with no component change. Code and Apps items link to their category page; `soon` items have no link and show a `Soon` tag; Lab items open their subdomain. Each column ends with a "See all" link to its page. Repo-style names (kebab-case) use the mono face; plain titles use the sans face. Without JavaScript, "Projects" is a plain link to the home section. Below 820 px the bar holds only the logo and the burger icon; "Let's talk" and the language switch live in the panel.
- Colors, fonts, radii, and timings come only from `src/styles/tokens.css`. No hex color in `global.css` or in components; use `var(--jm-*)`. Category colors are `--jm-code`, `--jm-apps` and `--jm-lab`; the hero status dot uses `--jm-available`. `--jm-accent` is only for the cursor, main buttons (including "Let's talk"), section labels, focus, link hover, the `.dev` part of the wordmark, and the loader. No amber in the globe, stats, or timeline.
- Dark theme only. Hidden entrance and loader states exist only under the `js` class on `<html>`, so the site works without JavaScript. The loader runs once per session (`sessionStorage` key `jm:loader-seen`). Honor `prefers-reduced-motion` (globe, marquee, scroll reveal, hover, tilt). Scroll reveal uses `animation-timeline: view()` under `@supports`.
- Do not commit or push unless the user asks.
