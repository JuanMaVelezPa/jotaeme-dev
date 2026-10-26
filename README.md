# jotaeme.dev

Personal site of **Juan Manuel Vélez Parra**, Java Backend Engineer in Medellín, Colombia.

🌐 **Live:** [jotaeme.dev](https://jotaeme.dev) · [Español](https://jotaeme.dev/es/)

## What it is

A small, fast, static site with one page per language:

- English at `/` (default) and Spanish at `/es/`, with a language switcher.
- Sections: About, Experience and skills, Services, and Contact.
- CV downloads in English and Spanish.
- SEO basics: Open Graph, `hreflang`, `sitemap.xml`, and JSON-LD `Person`.
- Plain HTML and CSS. No client-side JavaScript.

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
├── components/   Header, Footer, Section
├── content/      site.json, es.json, en.json (all profile text)
├── layouts/      Base.astro (head, SEO, JSON-LD)
├── pages/        index.astro (EN), es/index.astro (ES), 404.astro, sitemap.xml.ts
├── styles/       global.css
└── i18n.ts       interface labels and anchors per language
public/
├── cv/           CV PDFs (EN and ES)
└── robots.txt
```

## How the content works

All profile text lives in `src/content/`. These files are copied by hand from a curated content folder in a private repository, so only content approved for publishing reaches this repo. Please edit the text there, not here.

Interface labels such as "About" or "Contact" live in `src/i18n.ts`.

## Deploy

Every push to `main` builds and deploys the site on Cloudflare Pages.

- Build command: `npm run build`
- Output directory: `dist`

## Contact

[juanmavelezpa@gmail.com](mailto:juanmavelezpa@gmail.com) · [LinkedIn](https://www.linkedin.com/in/juanmavelezpa) · [GitHub](https://github.com/JuanMaVelezPa)
