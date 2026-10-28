# SPEC 04 — Lab page at jotaeme.dev/lab

> **Status:** Implemented
> **Depends on:** SPEC 01 (Implemented), SPEC 02 (Implemented), SPEC 03 (Implemented)
> **Date:** 2026-10-28
> **Objective:** Add a bilingual `/lab` page (`/es/lab` in Spanish) to `jotaeme.dev` that presents each lab as a card for recruiters and for the owner, starting with `lab-n8n`, and link the Lab tile of the Ecosystem section to it.

## Why this spec exists

The first draft of this spec created a separate site at `lab.jotaeme.dev`. That was dropped: one lab does not justify a repo, a deploy and a duplicated navigation, and a recruiter finds everything faster inside one site. The decision rule is:

- **The list of projects of a category is a page of `jotaeme.dev`** (`/lab`, later `/apps`, `/free`). It is a hub: it explains what the category is and sends the visitor to each project.
- **A project that runs is its own subdomain** (`lab-n8n.jotaeme.dev`, a future arcade games app). Each card links to it and to its repo.

The page names (`/lab`, `/apps`, `/free`) follow the existing Ecosystem card ids and the subdomain names reserved in the brand, so a future `lab.jotaeme.dev` hub, if ever needed, keeps the same name. `lab.jotaeme.dev` does not exist, so no redirect is created.

Each category page is designed on its own, with its own composition inside the brand (tokens, fonts, dark theme). This spec does not create a reusable category template: `/free` and `/apps` get their own specs and their own design.

The site is multilingual with separate URLs per language (`/` and `/es/`), `hreflang` pairs, a self-referencing canonical on each page and `x-default` pointing to English. That is the pattern search engines recommend, so it stays. The new page follows it: same slug in both languages (`/lab`, `/es/lab`), no automatic redirect by browser language.

## Scope

**In:**

- Page `/lab` (EN) and `/es/lab` (ES) with a header, one intro sentence, and a card per lab.
- Each card shows, without any click: title, summary, 2–3 highlights, stack tags, status, access badge, and links. It answers what it does, with which technologies, whether it really runs, and where the code is.
- The `live` URL is always a link; `access` only changes the badge: `Public` or `Private · login required` (Cloudflare Access). External links use `rel="noopener noreferrer"` and open in a new tab. The GitHub link appears when `repo` is set.
- Lab data in `src/content/labs.json`, one object per lab, text in both languages. Adding a lab = adding one object.
- Each card has an `id` anchor (`#n8n`) so a lab can be linked directly.
- Navigation: the page uses the same `Nav` and `Footer`; on `/lab` the section links go to the home sections (`/#about`, `/es/#sobre-mi`), the language switch goes to the same page in the other language; there is no back button or breadcrumb, because the logo and the nav links already lead to the home.
- `Base.astro` accepts an optional `path` prop (default: home) used for `canonical`, `hreflang`, `og:url` and the language switch, so any page can use it.
- SEO from SPEC 03 applied to the page: one `<title>`, one `<h1>`, `description`, `canonical`, `hreflang` `en`/`es`/`x-default`, Open Graph and Twitter tags, `Person` JSON-LD with `mainEntityOfPage` equal to the page canonical.
- `src/pages/sitemap.xml.ts` lists the home and the lab page, each with `lastmod` and alternates.
- `public/sw.js` precaches `/lab/` and `/es/lab/`, and `CACHE` is bumped.
- `src/components/sections/Ecosystem.astro`: the Lab tile links to the localized `/lab` page. The host line of that tile reads `jotaeme.dev/lab` instead of the non-existent `lab.jotaeme.dev`. `apps` and `free` tiles stay plain text.
- `src/components/layout/Footer.astro`: the `lab` item of the network list links to the localized `/lab` page (`aria-current="page"` on that page). `jotaeme.dev`, `apps` and `free` stay plain text.
- `CLAUDE.md`: update the structure, the "one page per language" rule, the "Beyond the CV has no links" rule, and note that `src/content/labs.json` is owned by this repo.

**Out of scope (for future specs):**

- `/apps` and `/free` pages. Each gets its own spec and its own design.
- A reusable category-page component or template.
- A detail page per lab (`/lab/n8n`) with write-up, screenshots or diagram. Built when a lab has that material; the card anchors keep working.
- `lab.jotaeme.dev` as a site or as a redirect.
- Making `lab-n8n.jotaeme.dev` public or changing its Cloudflare Access setup.
- Fetching lab data from the GitHub API or READMEs.
- Search, filters, tags, pagination.
- Changing `estado` of the Lab card in `src/content/*.json` (owned by the personal-branding repo; reported, not edited here).
- Analytics.
- Items parked for SPEC 05, see "Ideas for SPEC 05".

## Folder structure

```text
jotaeme-dev/
├── public/sw.js                         CHANGED: precache /lab/ and /es/lab/, bump CACHE
├── specs/04-lab-page.md                 this spec
├── src/
│   ├── assets/icons/n8n.svg            NEW: monochrome glyph of the lab's main tool
│   ├── content/labs.json               NEW: list of labs, EN and ES text (owned by this repo)
│   ├── components/
│   │   ├── Lab.astro                   NEW: body of the lab page, shared by both languages
│   │   ├── lab/LabCard.astro           NEW: one lab card
│   │   ├── layout/Nav.astro            CHANGED: section links and language switch aware of `path`; nav links at least 44 px wide and never wrapped
│   │   ├── layout/Footer.astro         CHANGED: `lab` item is a link
│   │   └── sections/Ecosystem.astro    CHANGED: Lab tile is a link
│   ├── layouts/Base.astro              CHANGED: `path` prop
│   ├── lib/
│   │   ├── content.ts                  CHANGED: typed export of labs
│   │   └── i18n.ts                     CHANGED: labels for the lab page
│   └── pages/
│       ├── lab/index.astro             NEW: EN
│       ├── es/lab/index.astro          NEW: ES
│       └── sitemap.xml.ts              CHANGED: lists both pages
├── CLAUDE.md                            CHANGED
└── (everything else unchanged)
```

## Data model

```ts
// src/content/labs.json — array item
type Lab = {
	id: string;                       // 'n8n', stable, kebab-case, used as DOM id
	icon?: string;                    // 'n8n', file name in src/assets/icons/ (monochrome SVG); no tile when absent
	order: number;                    // ascending; lower first
	status: 'active' | 'paused' | 'archived';
	access: 'public' | 'private';     // of the live URL, not of the repo
	stack: string[];                  // ['n8n', 'Ollama', 'Docker Compose', 'Cloudflare Access']
	live?: string;                    // 'https://lab-n8n.jotaeme.dev'
	repo?: string;                    // 'https://github.com/JuanMaVelezPa/lab-n8n'
	es: { title: string; summary: string; highlights: string[] };
	en: { title: string; summary: string; highlights: string[] };
};

// src/layouts/Base.astro
interface Props {
	title: string;
	description: string;
	path?: string;                    // '' (home) or 'lab'; default ''
}
```

First entry:

```json
{
	"id": "n8n",
	"order": 1,
	"status": "active",
	"access": "private",
	"stack": [],
	"live": "https://lab-n8n.jotaeme.dev",
	"repo": "https://github.com/JuanMaVelezPa/lab-n8n",
	"es": { "title": "", "summary": "", "highlights": [] },
	"en": { "title": "", "summary": "", "highlights": [] }
}
```

The empty fields are filled in step 3 from the real `lab-n8n` README: two daily email automations (news digest and bilingual daily Gospel), local AI with Ollama so text is not sent to an external service, users and settings from Google Sheets, three Docker Compose containers, remote access through Cloudflare Tunnel and Access. The religious content is described plainly as what it is.

Conventions:

- Lab text lives only in `labs.json`; interface labels ("Private · login required", "Source code", "Back to home") live in `src/lib/i18n.ts`. Status and access labels are translated through `i18n.ts`.
- `src/content/` is otherwise copied from the personal-branding repo; `labs.json` is the exception and `CLAUDE.md` says so.
- `live` renders as a link when present; `repo` renders as a link when present; neither leaves an empty element when absent.

## Implementation plan

1. Baseline: `npm run build` and save `dist/index.html`, `dist/es/index.html` and `dist/sitemap.xml` outside the repo.
2. Add the `path` prop to `Base.astro` and thread it into `Nav.astro` (language switch, and section links pointing to the home when `path` is not home). The home output must stay identical to the baseline.
3. Add `src/content/labs.json` with the `lab-n8n` entry filled from its README, and the typed export in `content.ts`. If the README is unclear, stop and ask for the text instead of inventing it.
4. Add the lab page labels to `src/lib/i18n.ts` (EN and ES).
5. Add `LabCard.astro`, `Lab.astro` and both pages. The composition is designed for this page alone (use the `frontend-design` skill), with tokens only and `--jm-lab` as the category color. Motion: one staged entrance of the header on load (title and intro, with a blinking cursor after the `<h1>`), highlight rules drawn on scroll, a pulse on the active status dot, and a hover glow on the card; all of it only under `.js`, behind `prefers-reduced-motion: no-preference`, and with `animation-timeline: view()` under `@supports`. Check Astro docs with Context7 for the routing and trailing-slash behavior before choosing the canonical form.
6. Update `sitemap.xml.ts` to list both pages and `sw.js` to precache them, bumping `CACHE`.
7. Link the Lab tile in `Ecosystem.astro` and change its host line. Update `CLAUDE.md`.
8. Link the `lab` item in the `Footer.astro` network list to the localized `/lab` page; it is on every page, so it also appears on the lab pages.
9. Audit `dist/` for the four pages (SPEC 03 checks) and diff the home against the baseline.
10. Responsive verification with Playwright MCP on `/lab` and `/es/lab` at 320, 360, 390, 430, 768, 820, 1024, 1280 and 1440 px: no horizontal overflow, interactive elements at least 44×44 px, the lab list goes from one to two columns when there is room (cards are at least 30rem wide), the badges, stack tags, buttons and footer wrap without clipping, and the nav menu and the Ecosystem tile still work.
11. Playwright MCP visual review at 360, 390 and 430 px, EN and ES: the page, the animations, reduced motion and JavaScript disabled.

## Acceptance criteria

- [x] `/lab` and `/es/lab` build and render the same labs, each in its own language.
- [x] The card for `lab-n8n` shows title, summary, highlights, stack, status and the GitHub link without any click, and `/lab#n8n` scrolls to it.
- [x] `lab-n8n.jotaeme.dev` is an `<a>` with `rel="noopener noreferrer"` and the badge `Private · login required` (ES: `Privado · requiere login`).
- [x] Setting `access` to `public` changes the badge to `Public` with no component change; adding a second object to `labs.json` adds a second card in both languages, ordered by `order`; a lab without `repo` renders no repo link.
- [x] Each lab page has exactly one `<title>`, one `<h1>`, one `canonical` equal to its own URL, `hreflang` `en`, `es` and `x-default` pointing to the two lab pages, and the `robots` meta from SPEC 03.
- [x] The `ld+json` of the lab page parses and its `mainEntityOfPage` equals that page's canonical.
- [x] `dist/sitemap.xml` lists the home and the lab page in both languages, each with `lastmod` and the three alternates; `404.html` stays `noindex` and absent.
- [x] On `/lab`, the nav section links go to the home sections and the language switch goes to the other language of `/lab`, not to the home.
- [x] `dist/index.html` and `dist/es/index.html` differ from the baseline only in the Lab tile link and host line, and the footer `lab` link.
- [x] The footer `lab` item links to `/lab/` (EN) and `/es/lab/` (ES), has `aria-current="page"` on the lab page, and is at least 44×44 px; `jotaeme.dev`, `apps` and `free` in the footer contain no `<a>`.
- [x] The Lab tile links to `/lab` (EN) and `/es/lab` (ES); the `apps` and `free` tiles contain no `<a>`.
- [x] After a first visit and going offline, `/lab/` and `/es/lab/` still render.
- [x] At 320, 360, 390, 430, 768, 820, 1024, 1280 and 1440 px, `document.documentElement.scrollWidth <= window.innerWidth` and interactive elements are at least 44×44 px; the lab cards sit in one column on narrow screens and side by side when there is room.
- [x] No hex color is added; with `prefers-reduced-motion: reduce` nothing animates; with JavaScript disabled the page is readable.
- [x] No phone number, private document or client name other than BBVA, Credicorp, Banco de Bogotá and Banco Popular is added.
- [x] `npm run build` finishes without errors or warnings.

## Decisions

- **Yes:** the category page lives inside `jotaeme.dev` (`/lab`). One site means one navigation, one SEO identity and one deploy; subdirectories are the usual recommendation unless the section needs a different stack or identity.
- **No:** a separate `lab-hub` site on `lab.jotaeme.dev`. It would duplicate the nav, footer and deploy for a single card.
- **No:** a redirect from `lab.jotaeme.dev`. The subdomain does not exist, so there is nothing to redirect.
- **Yes:** projects that run keep their own subdomains. Each card is the bridge to them.
- **Yes:** `/lab`, singular, equal to the Ecosystem id and the reserved subdomain name. Singular vs plural has no SEO effect; matching the existing names keeps the ecosystem consistent. `/apps` and `/free` follow the same rule when they are built. The visible title comes from the JSON, not from the slug.
- **Yes:** same slug in both languages (`/es/lab`). A translated slug adds hreflang mapping work for no gain: "lab" reads the same in Spanish.
- **Yes:** keep the language setup (`/` English, `/es/` Spanish, `hreflang`, `x-default`, self-referencing canonical, no automatic redirect by browser language).
- **No:** a reusable category template. Each category page is designed independently within the brand.
- **Yes:** `labs.json` in `src/content/`, marked as owned by this repo. Profile text must not be hard-coded in components, and a data file outside `src/content/` would split the content in two places.
- **Yes:** the protected live URL is a visible link with a `Private · login required` badge. Cloudflare Access is the security, not hiding the URL (it is already in the public repo); the link helps the owner navigate and shows a recruiter that a real system runs behind it.
- **Yes:** recruiter-first card, readable without clicking. The private demo cannot be seen by visitors, so the card and the public repo are the proof.
- **Yes:** detail pages later, one per lab, when each has material for them.
- **Yes:** names were reviewed against what each category really is. `lab` is accurate and stays. `free` stays and its visible title becomes "Free apps" (ES: "Apps gratuitas"), because "Open apps" suggests open source. Both changes are made first in the personal-branding repo and copied here; this spec does not edit `src/content/*.json`.
- **Pending (not decided):** whether `apps` (commercial products, titled "Products") becomes `products`. The owner will think about it later; it touches `--jm-apps`, the `jm|apps` wordmark and the card id in the branding repo. It does not affect this spec, which only builds `/lab`.
- **Yes:** the Lab tile host line shows `jotaeme.dev/lab` while `lab.jotaeme.dev` does not exist.

- **No:** a back button or breadcrumb on the lab page. The sticky nav already has the logo and the home section links, and big sites (Apple) do not repeat a way back at the top. It would take space from the title.

## Ideas for SPEC 05

Not decided and not part of this spec. To review, discuss and write as `specs/05-*.md`:

- **Navbar:** an Apple-style projects menu in the nav that opens on hover, focus or tap and lists `Lab → n8n`, with `apps` and `free` as plain text. It can read `labs.json`, so a new lab appears by itself. Needs keyboard and `Escape` handling, and a mobile version next to the existing menu.
- **Navbar on small screens** (seen while verifying responsiveness in SPEC 04):
  - Replace the word "Menu" / "Menú" on the toggle button with a burger icon (keep the accessible name "Open menu" / "Close menu").
  - The "Let's talk" / "Hablemos" button is too big on small screens next to the logo, the language switch and the toggle: make it smaller there (or move it into the open menu). Measured in SPEC 04: in Spanish at 320 px, `Hablemos` plus `Menú` do not fit in the bar, and the toggle runs into the right padding (it even touches the screen edge when the browser shows a classic scrollbar).
  - Improve the `EN / ES` language switch: today it is small mono text that reads as one link. Make it clearer which language is active and which one it switches to, with a comfortable tap target.
- **Natural copy:** review the site texts in Spanish and English so they sound like a developer talking (plain words, common dev vocabulary) and not like generated text. Part of it lives in the branding repo.
- **Footer:** improve it and add a copyright line and a legal part (what a personal site needs, for example a short legal or privacy note). Research before deciding.

## Risks

| Risk | Mitigation |
| ---- | ---------- |
| `Base.astro` and `Nav.astro` assume the home page (canonical, hreflang, language switch, `#anchors`) | Step 2 adds `path` and diffs the home output against the baseline before any new page exists. |
| Trailing slash differs between canonical, sitemap and what Cloudflare serves (`/lab` vs `/lab/`) | Step 5 checks Astro's behavior and the preview; one form is used everywhere and verified in the audit. |
| `sw.js` caches the old shell | `CACHE` is bumped in step 6; navigations are network-first (SPEC 02). |
| Ecosystem JSON still says `Private` for Lab while the page is public | `src/content/*.json` belongs to the personal-branding repo; report it and change it there. |
| `lab-n8n` git history contains secrets or personal data | Current files were reviewed on 2026-10-28 (no secrets, phone numbers or client names); step 3 also checks the history before the page links to the repo. |
| Lab text written without reading the repo | Step 3 reads the README; if it is unclear, stop and ask. |
| `labs.json` in `src/content/` is overwritten by a hand copy from the branding repo | `CLAUDE.md` marks it as owned by this repo; the copy must skip it. |

## What is **not** in this spec

- `/apps` and `/free` pages.
- A shared category template.
- Detail pages per lab.
- Any `lab.jotaeme.dev` site or redirect.
- Changes to the access of `lab-n8n.jotaeme.dev`.
- Edits to the personal-branding JSON files.

Each one of those, if it lands, goes in its own spec.
