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
src/layouts/   Base.astro (head, SEO, language switcher, JSON-LD)
src/components/  Header, Footer, Section
src/pages/     index.astro (EN, default), es/index.astro (ES)
public/cv/     CV PDFs (ES and EN)
```

## Rules

- **All files in this repo are written in English**: code, comments, README, commit messages. Site text is the exception: it comes from `src/content/` in Spanish and English.
- Never write profile text by hand in components. Everything comes from `src/content/`.
- Interface labels and anchors ("About", "Contact", "Download CV") live in `src/i18n.ts`. Profile text lives in `src/content/`.
- This repo is public. Never add a phone number, private documents, or client names other than BBVA, Credicorp, Banco de Bogotá, and Banco Popular. No AI positioning on the site.
- Use the latest stable version of Astro and every dependency. Before using any library API, check its current docs with the Context7 plugin instead of relying on memory.
- Keep it simple: one page per language, anchors `#sobre-mi`, `#experiencia`, `#servicios`, `#contacto` (English: `#about`, `#experience`, `#services`, `#contact`).
- Do not commit or push unless the user asks.
