# SPEC 03 — SEO gaps and verification

> **Status:** Implemented
> **Depends on:** SPEC 01 (Implemented), SPEC 02 (Implemented)
> **Date:** 2026-10-28
> **Objective:** Close the remaining SEO gaps in `jotaeme.dev` (social tags, robots directive, richer Person JSON-LD, sitemap `lastmod`) and verify the result on both languages with a build-output audit.

## Why this spec exists

The site already ships the SEO basics in `src/layouts/Base.astro` and `src/pages/sitemap.xml.ts`: `title`, `description`, `canonical`, `hreflang` (`en`, `es`, `x-default`), Open Graph with a 1200×630 `og.png`, `twitter:card`, a `Person` JSON-LD block, a sitemap with alternates, and `robots.txt` pointing to it. This spec does not rebuild any of that. It adds what is missing and checks that every language emits consistent, valid output.

Gaps found in the current code:

- No `og:image:alt`, and no `twitter:title`, `twitter:description`, `twitter:image`, `twitter:image:alt`.
- No explicit `robots` meta (`index, follow, max-image-preview:large`).
- `viewport` is `width=device-width` without `initial-scale=1`.
- The `Person` JSON-LD has no `@id`, `jobTitle`, `knowsLanguage` or `mainEntityOfPage`, and is identical in both locales except for `description`.
- `sitemap.xml` has no `<lastmod>`.

## Scope

**In:**

- `src/layouts/Base.astro`:
  - `<meta name="robots" content="index, follow, max-image-preview:large" />`.
  - `viewport` becomes `width=device-width, initial-scale=1`.
  - `og:image:alt` and `twitter:image:alt`, localized.
  - `twitter:title`, `twitter:description`, `twitter:image`.
  - `Person` JSON-LD extended with `@id` (`<site>/#person`), `jobTitle`, `knowsLanguage` (`["es", "en"]`), `mainEntityOfPage` (the canonical URL of the current locale), and `inLanguage` is not used on `Person` (it is not a valid property there).
- `src/lib/i18n.ts`: one new interface label per language for the image alt text (`ogAlt`).
- `src/pages/sitemap.xml.ts`: `<lastmod>` with the build date (`YYYY-MM-DD`) on each `<url>`.
- `jobTitle` comes from the locale JSON (the existing headline or role field); no profile text is written by hand in the layout.
- Audit of the built `dist/` for `/`, `/es/`, `/404` and `sitemap.xml`, with the result recorded in the PR description or the implementation notes (not committed as a file).

**Out of scope (for future specs):**

- One OG image per locale, or dynamic OG generation at build time.
- `WebSite` or `ProfilePage` JSON-LD nodes.
- Search Console or Bing verification tags.
- `public/_headers` for Cloudflare (SPEC 02 already documents it for `sw.js`).
- Analytics of any kind.
- Changes to `src/content/*.json` (the personal-branding repo owns them). If `jobTitle` has no suitable field there, it is reported and handled in that repo, not invented here.
- New content pages, a blog, or new routes.
- Any dependency (`@astrojs/sitemap`, SEO plugins).

## Folder structure

```text
jotaeme-dev/
├── specs/
│   └── 03-seo.md                   this spec
├── src/
│   ├── layouts/Base.astro          CHANGED: meta tags, extended JSON-LD
│   ├── lib/i18n.ts                 CHANGED: ogAlt label (EN, ES)
│   └── pages/sitemap.xml.ts        CHANGED: lastmod
└── (everything else unchanged)
```

No new files or folders under `src/` or `public/`.

## Data model

This feature introduces no new data files. Two small shape changes:

```ts
// src/lib/i18n.ts — added to each language entry of `ui`
ogAlt: string; // alt text of public/og.png, in that language

// Base.astro — Person node after the change
{
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${site.sitio_web}/#person`,
  name, url, description,          // unchanged
  jobTitle,                        // from the locale JSON
  knowsLanguage: ['es', 'en'],
  mainEntityOfPage: canonical,
  address, knowsAbout, sameAs,     // unchanged
}
```

## Implementation plan

1. Baseline: `npm run build` and save `dist/index.html`, `dist/es/index.html`, `dist/sitemap.xml` outside the repo to diff later.
2. Add `ogAlt` to `src/lib/i18n.ts` (EN and ES). Build passes.
3. In `Base.astro`: add the `robots` meta, `initial-scale=1`, `og:image:alt`, and the `twitter:*` tags. Build passes.
4. Extend the `Person` JSON-LD with `@id`, `jobTitle`, `knowsLanguage` and `mainEntityOfPage`. Confirm which locale JSON field feeds `jobTitle`; if none fits, stop and report instead of hardcoding text.
5. Add `<lastmod>` to `sitemap.xml.ts`.
6. Rebuild and audit `dist/` for both languages (see acceptance criteria). Diff against the baseline to confirm only the intended tags changed.
7. Run `npm run preview` and check `/`, `/es/` and `/sitemap.xml` in the browser (Playwright MCP is fine): one `<title>`, one `<h1>`, one canonical per page, JSON-LD parses.

## Acceptance criteria

- [x] `dist/index.html` and `dist/es/index.html` each contain exactly one `<title>`, one `meta[name=description]`, one `link[rel=canonical]`, and one `meta[name=robots]` with `index, follow, max-image-preview:large`.
- [x] Each page has `og:image:alt` and `twitter:image:alt` in its own language, and `twitter:title`, `twitter:description`, `twitter:image` equal to the corresponding `og:*` values.
- [x] `canonical` of `/` is `https://jotaeme.dev/` and of `/es/` is `https://jotaeme.dev/es/`; each page lists `hreflang` `en`, `es` and `x-default` pointing to those URLs.
- [x] The `ld+json` block of each page parses as JSON and contains `@id`, `jobTitle`, `knowsLanguage` and `mainEntityOfPage` equal to that page's canonical.
- [x] `jobTitle` and `description` differ between `/` and `/es/` and come from the locale JSON.
- [x] `dist/sitemap.xml` has both URLs, each with `<lastmod>` in `YYYY-MM-DD` format and the three `xhtml:link` alternates.
- [x] `dist/404.html` keeps `noindex` and is absent from the sitemap.
- [x] `robots.txt` still allows all and names `https://jotaeme.dev/sitemap.xml`.
- [x] No phone number, no new client names, and no hex color are added; the site still works with JavaScript disabled.
- [x] `npm run build` finishes without errors or warnings.

## Decisions

- **Yes:** close gaps and verify, not rebuild. Most SEO is already in place; a rewrite adds risk without gain.
- **Yes:** extend `Person` only. It is the entity the site is about; `WebSite` and `ProfilePage` add little for a one-page personal site.
- **Yes:** `@id` plus `mainEntityOfPage`. It makes the entity stable across both language pages.
- **No:** `inLanguage` on `Person`; it is not a valid property there. `knowsLanguage` expresses the spoken languages.
- **Yes:** keep one `og.png` and localize only its alt text. The image is brand artwork; two assets are not worth the maintenance yet.
- **No:** dynamic OG generation. It would add `satori`/`sharp` for a single static card.
- **Yes:** `lastmod` from the build date. The site is static and redeploys on change; it is accurate enough and needs no extra data.
- **No:** Search Console/Bing verification tags and analytics. They need tokens or a privacy decision and are separate concerns.
- **No:** `@astrojs/sitemap`. The hand-written route already covers alternates, and Spec 02 set the precedent of avoiding dependencies for small static needs.
- **Yes:** `max-image-preview:large` so social/search surfaces can show the full OG image.

## Risks

| Risk | Mitigation |
| ---- | ---------- |
| No locale JSON field fits `jobTitle` | Stop at step 4 and report; fix in the personal-branding repo rather than hardcoding profile text here. |
| `lastmod` changes on every build even if content did not | Acceptable for this site; if it becomes noise, derive it from the git commit date in a later spec. |
| Cached social previews keep the old card | Not a code issue; re-scrape with each platform's debugger after deploy. |
| Invalid JSON-LD property silently ignored by crawlers | Acceptance criterion parses the block; manual check with Google's Rich Results Test after deploy. |

## What is **not** in this spec

- Per-locale OG images or dynamic OG generation.
- `WebSite` / `ProfilePage` structured data.
- Search engine verification, analytics, or Cloudflare `_headers`.
- Content, copy, or visual changes.

Each one of those, if it lands, goes in its own spec.
