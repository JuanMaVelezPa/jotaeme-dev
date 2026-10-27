# SPEC 02 — Ecosystem cursor blink, installable PWA, and mobile review

> **Status:** Implemented
> **Depends on:** SPEC 01 (Implemented; the file paths below assume its structure)
> **Date:** 2026-10-27
> **Objective:** Make the `jm|` cursors in the Ecosystem section blink like the header logo, make `jotaeme.dev` an installable PWA with basic offline support, and fix any layout problem found reviewing the site on phone viewports with Playwright.

## Why this spec exists

Three small adjustments that touch the same pages and ship together. The PWA part is limited to the root origin: a PWA is installed per origin, so `apps.`, `free.` and `lab.jotaeme.dev` will need their own manifest and service worker once they exist.

## Scope

**In:**

- `src/components/sections/Ecosystem.astro`: both cursors (`.tile .cursor` and `.wordmark .cursor`) blink with the existing `jm-blink` animation and `--jm-dur-blink`. Each keeps its subdomain color (`--sub`); amber is not used.
- Blink pauses while the loader runs (`.loader-on`) and is disabled under `prefers-reduced-motion: reduce`, same as `Logo.astro`.
- Complete `public/site.webmanifest`: `id`, `start_url`, `scope`, `lang`, `description`, separate `any` and `maskable` icon entries, `display: standalone`, theme and background color taken from `--jm-bg` value.
- Service worker `public/sw.js`, registered from `src/layouts/Base.astro`, that precaches the app shell and serves it offline: `/`, `/es/`, `/404`, fonts, icons, favicon and both CV PDFs.
- Mobile meta tags in `Base.astro`: `apple-mobile-web-app-capable`, `apple-mobile-web-app-title`, `apple-mobile-web-app-status-bar-style`, `viewport-fit=cover` if needed.
- Maskable icon asset (`public/maskable-512.png`) if the current 192/512 PNGs do not have the required safe zone.
- Documented folder structure for the files this spec adds or changes (see "Folder structure").
- Responsive review with the Playwright MCP at 360×800, 390×844 and 430×932, in EN (`/`) and ES (`/es/`), covering every section, the nav menu, the loader, and the globe. Fixes for overflow, overlap, clipped text or touch targets under 44 px.
- A short "PWA and subdomains" section in `README.md` documenting how to replicate the manifest and service worker on each subdomain (own `scope`, name, and `theme_color`).

**Out of scope (for future specs):**

- Manifest or service worker for `apps.`, `free.` and `lab.jotaeme.dev` (the subdomains do not exist yet).
- Custom "Install" button or in-page install prompt.
- Push notifications, background sync, and any runtime caching of third-party requests.
- Playwright tests or `@playwright/test` dependency in the repo; the review is manual through the MCP.
- Light theme or any visual redesign beyond fixes found in the review.
- A reusable manifest template inside `design/brand/`.

## Folder structure

Only the files this spec touches are marked. Everything else stays where `CLAUDE.md` documents it.

```text
jotaeme-dev/
├── design/brand/                   (unchanged, never deployed; nothing is added here)
├── public/
│   ├── android-chrome-192.png      (unchanged, precached)
│   ├── android-chrome-512.png      (unchanged, precached)
│   ├── apple-touch-icon.png        (unchanged, precached)
│   ├── favicon.ico, favicon.svg    (unchanged, precached)
│   ├── og.png, robots.txt          (unchanged)
│   ├── maskable-512.png            NEW, only if the safe zone is missing
│   ├── site.webmanifest            CHANGED: full fields, separate any/maskable icons
│   ├── sw.js                       NEW: must live at the root so its scope is "/"
│   ├── _headers                    NEW, only if sw.js caching needs no-cache (see Risks)
│   ├── cv/                         (unchanged, precached: JuanManuel_Velez_CV_EN.pdf, JuanManuel_Velez_CV_ES.pdf)
│   └── fonts/                      (unchanged, precached)
├── specs/
│   ├── .spec-config.yml            (unchanged, already tracked)
│   ├── 01-project-structure.md     (unchanged, Implemented)
│   └── 02-ecosystem-cursor-pwa-mobile.md   this spec
├── src/
│   ├── components/
│   │   ├── Home.astro              CHANGED only if the mobile review finds a problem
│   │   ├── layout/                 Nav, Logo, Loader, Footer: CHANGED only if the mobile review finds a problem
│   │   ├── sections/
│   │   │   ├── Ecosystem.astro     CHANGED: blinking .cursor, loader pause, reduced motion
│   │   │   └── ...                 CHANGED only if the mobile review finds a problem
│   │   └── ui/Globe.astro          CHANGED only if the mobile review finds a problem
│   ├── layouts/
│   │   └── Base.astro              CHANGED: iOS/Android meta tags, service worker registration
│   ├── lib/                        (unchanged)
│   ├── pages/                      (unchanged: index.astro, es/index.astro, 404.astro, sitemap.xml.ts)
│   └── styles/                     CHANGED only for mobile fixes, tokens only
└── README.md                       CHANGED: "PWA and subdomains" section
```

Rules for the layout:

- PWA files (`sw.js`, `site.webmanifest`, icons) stay flat in `public/`. A service worker only controls the path it is served from, so it cannot go in a subfolder.
- No new folders under `src/` beyond those defined in SPEC 01. The service worker registration is a small inline script in `Base.astro`, next to the existing loader script.
- Nothing is added to `design/`.

## Data model

This feature introduces no new data structures beyond the service worker cache name:

```js
// public/sw.js
const CACHE = 'jm-shell-v1'; // bump the suffix to invalidate old caches
const PRECACHE = ['/', '/es/', '/404', /* fonts, icons, favicon, CV PDFs */];
```

Strategy: precache on `install`, delete caches other than `CACHE` on `activate`. Navigations and `.pdf` requests are `network-first`: they try the network, refresh the cache with the response, and fall back to the cached copy (for navigations, then to the cached `/`) only when offline. Every other same-origin GET (fonts, icons, hashed `/_astro/` files) is `cache-first`, because its URL changes when its content changes.

## Implementation plan

1. Ecosystem cursor: add `animation: jm-blink var(--jm-dur-blink) steps(1) infinite` to `.cursor`, the keyframes, the `.loader-on` pause rule, and the reduced-motion rule. Manual test: `npm run dev`, see both cursors blink in each card, in EN and ES.
2. Review `public/site.webmanifest` and complete its fields. Generate a maskable icon if the safe zone is missing. Manual test: Chrome DevTools > Application > Manifest shows no errors.
3. Add `public/sw.js` with precache, activate cleanup, and fetch handler.
4. Register the service worker in `Base.astro` with a small script (production only, after `load`, guarded by `'serviceWorker' in navigator`). Add the iOS/Android meta tags. Manual test: `npm run build && npm run preview`, DevTools shows the worker active and the install option appears.
5. Run the Playwright MCP review at the three viewports in EN and ES, list the problems found, and fix them in the affected components using `var(--jm-*)` tokens only.
6. Re-run the Playwright review to confirm each fix, and check reduced-motion and `js`-disabled behavior still hold.
7. Document PWA and subdomain replication in `README.md`.

## Acceptance criteria

- [x] In `/` and `/es/`, the cursor in every Ecosystem tile and every wordmark blinks with the same 1.1 s step cycle as the header logo.
- [x] Ecosystem cursors keep the `--jm-apps`, `--jm-free` and `--jm-lab` colors; no amber is added.
- [x] With `prefers-reduced-motion: reduce`, the Ecosystem cursors do not animate.
- [x] While the loader is visible, the Ecosystem cursors are paused.
- [x] `site.webmanifest` loads with no errors in DevTools > Application > Manifest and declares `id`, `start_url`, `scope`, `lang`, and a `maskable` icon.
- [x] `npm run build && npm run preview` registers `/sw.js` and Chrome offers "Install app".
- [x] After a first visit, switching the network to Offline and reloading `/`, `/es/` and a CV PDF still renders them.
- [x] Changing `CACHE` to a new name removes the old cache on activation.
- [x] Online, a changed `/` or CV PDF is served on the next load without bumping `CACHE`.
- [x] iOS meta tags are present in the `<head>` of both languages.
- [x] At 360, 390 and 430 px wide, in EN and ES, `document.documentElement.scrollWidth <= window.innerWidth` on every page.
- [x] At those widths, no text is clipped or overlapped in any of the six sections, the nav menu opens and closes, and interactive elements measure at least 44×44 px.
- [x] `npm run build` finishes without errors or warnings, and no hex color is introduced in `global.css` or components.
- [x] The site still works with JavaScript disabled.

## Decisions

- **Yes:** blink Ecosystem cursors in their subdomain color. `CLAUDE.md` reserves `--jm-accent` for specific uses and the Ecosystem section is not one of them.
- **Yes:** hand-written `public/sw.js`. One static site with a small fixed asset list does not justify a Workbox or Vite PWA dependency.
- **No:** `@vite-pwa/astro` or Workbox. Extra dependency and build complexity for a precache list.
- **Yes:** network-first for pages and CV PDFs, cache-first for static assets. Pages and PDFs keep the same URL when their content changes, so an online visitor must always get the latest version without a manual `CACHE` bump. Offline still works from the last cached copy.
- **Yes:** versioned cache name. Bumping `CACHE` is only needed to drop assets that no longer exist (old hashed files) or to change the precache list.
- **Yes:** PWA only on `jotaeme.dev`, documented for subdomains. Origins are separate and the subdomains do not exist yet.
- **No:** custom install button. Browser-native install UI is enough and adds no i18n labels.
- **Yes:** Playwright through the MCP, no repo tests. Keeps the repo dependency-free and the review is one-off.
- **Yes:** 360, 390 and 430 px as target widths. They cover small Android, iPhone standard, and iPhone Plus/Max.

## Risks

| Risk | Mitigation |
| ---- | ---------- |
| Stale content after a deploy | Pages and PDFs are network-first, so online visitors get the new version. Static assets are cache-first but their URLs are hashed. Bump `CACHE` when the precache list changes and document it in `README.md`. |
| Cloudflare Pages caching `sw.js` too long | Document adding a `public/_headers` rule with `Cache-Control: no-cache` for `/sw.js` if updates do not propagate. |
| Service worker interferes with `astro dev` | Register only in production builds (`import.meta.env.PROD`). |
| Precache list drifts from real asset names | Verify each URL returns 200 in the offline acceptance check. |
| Maskable icon crops the logo | Generate it with a 40% safe zone and check it in DevTools > Manifest preview. |

## What is **not** in this spec

- Manifest or service worker for `apps.`, `free.` and `lab.jotaeme.dev`.
- In-page install button, push notifications, or background sync.
- Playwright test suite or new dependencies.
- Any visual redesign beyond fixing problems found on mobile.

Each one of those, if it lands, goes in its own spec.
