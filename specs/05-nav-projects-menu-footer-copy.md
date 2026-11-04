# SPEC 05 — Mobile nav, Projects menu, one-row footer and human copy

> **Status:** Implemented
> **Depends on:** SPEC 04 (Implemented), personal-branding repo SPEC 05 and decision 010
> **Date:** 2026-10-29
> **Objective:** Put the nav behind a burger icon on small screens, add an Apple-style Projects menu with three categories (Code · Apps · Lab), shrink the footer to one row, and rewrite the site copy so it reads like a developer talking, not like generated text.

## Why this spec exists

This spec closes the "Ideas for SPEC 05" list of SPEC 04, with changes the owner decided on 2026-10-29:

- **Mobile nav.** Under 820 px the bar holds the logo, `EN / ES`, "Let's talk" and a "Menu" pill. It is too crowded: in Spanish at 320 px, `Hablemos` and `Menú` do not fit (measured in SPEC 04).
- **Projects menu.** Visitors should see the projects from the nav, like the Apple product menu, and reach `lab-n8n` in one click.
- **Footer.** It should be thinner, one row, like apple.com. No legal text: the site sets no cookies, has no analytics and no forms, and contact is a `mailto` link. It does not process personal data, so a privacy or legal note does not apply.
- **Copy.** Headlines and taglines sound generated ("reliable, secure, and built to last", "Everything I build lives here", "the whole backend path"). The owner wants plain developer language with light industry jargon.

The project categories also change. This is a decision of the owner:

- **Categories are pages, not subdomains.** `/lab` exists, and `/code` and `/apps` come later. Only a project that runs gets its own subdomain (`lab-n8n.jotaeme.dev`).
- **`free` merges into `apps`.** Visitors group things by what they are, not by price. Each app gets a `Free` or `Paid` tag on its own page. This leaves one empty category instead of two.
- **`code` is new.** It holds backend projects that show engineering skill, starting with `spring-web` and `devsu-microservicios`. For a recruiter, this is the strongest proof of Java backend work.
- **`apps` stays `apps`, not "Clients" or "Products".** It holds things the owner sells or licenses, and client work as case studies when a client allows it. "Clients" was rejected for three reasons. On a page that names BBVA and Banco de Bogotá, it reads as the employer's clients. An empty "Clients · Soon" reads as "has no clients". It may also look like freelance work next to a full-time job. This closes the open "apps → products" item of SPEC 04.
- **`lab` stays.** It holds personal infrastructure that only the owner uses (`lab-n8n`).

Text ownership also changes. This is a decision of the owner:

- Until now, all site text was born in the personal-branding repo (`/mnt/data/apps/PersonalBranding`) and followed `branding/profile.md` → `sitio/*.json` → a copy in `src/content/`. That makes sense for **career facts**, which must match the CV and LinkedIn. It does not make sense for **site copy** (hero, section titles, services, Beyond the CV, contact, footer), which appears nowhere else and is about the site's voice.
- From this spec on, the site copy is owned by this repo, in `src/content/copy.json`, and is edited here, like `labs.json`. The branding repo keeps the career facts and changes only once: those keys leave `sitio/*.json`, and its docs point here.
- The CV, LinkedIn and GitHub do not change. None of them uses the site copy or the project categories.

## Scope

**In:**

- **Mobile nav (≤ 820 px):** the bar shows only the logo and a burger icon (three lines that become an X), with the accessible names "Open menu" / "Close menu". The panel holds the section links, Projects (as an accordion), the language switch and "Let's talk" as a full-width button at the end. The panel fills the screen height below the bar and locks page scroll while it is open. Without JavaScript, the links stay visible as today.
- **Language switch in the panel:** two clear options (`English` · `Español`), with the active one marked and `aria-current`. The desktop `EN / ES` switch does not change.
- **Projects menu on desktop (> 820 px):** "Projects" becomes a disclosure button. It opens a full-width panel under the bar, with one column per category in the order Code · Apps · Lab. It opens on click, Enter or Space, and also on hover. It closes on Escape, on an outside click, when the pointer leaves the nav, and when focus leaves the panel. Each column shows:
  - **Code:** `spring-web` and `devsu-microservicios` as plain text with a `Soon` tag. No links until their page exists.
  - **Apps:** only `Soon`.
  - **Lab:** each lab from `labs.json` with its status dot. The item links to its `live` URL (new tab, `rel="noopener noreferrer"`). A "See all Lab →" link goes to `/lab/` or `/es/lab/`.
  - The panel also has a link to the home `#ecosystem` / `#ecosistema` section.
  - Without JavaScript, "Projects" stays a plain link to the home section.
- **Projects in the mobile panel:** the same three categories as an accordion (a button with `aria-expanded`), closed by default.
- **Footer:** one row at ≥ 768 px, with the copyright on the left and the network (`code · apps · lab`, only `lab` linked) plus "Top ↑" on the right. Less vertical padding than today. Under 768 px it takes at most two lines. The `jotaeme.dev` item leaves the network. No legal or privacy text.
- **Ecosystem section ("Beyond the CV"):** the tiles change from `apps · free · lab` to `code · apps · lab`. Every host line reads `jotaeme.dev/<id>`, and none uses `<id>.jotaeme.dev`. Only `lab` is linked.
- **Category colors (a rename, not a new palette):** `code` takes everything `free` had: the green `#7AD1A0`, the tile, the footer bar and the menu column. `apps` and `lab` keep their colors and styles. In `src/styles/tokens.css`, `--jm-free` is renamed to `--jm-code`, the comment "Subdomain colors" becomes "Category colors", and the three commented subdomain overrides are removed (categories are pages now). The hero "open to work" dot also uses that green today (`Hero.astro`). It gets its own name, `--jm-available: #7AD1A0`, so a status color does not depend on a category name. Nothing changes on screen.
- **Ownership split:** the site-copy keys move from `es.json` / `en.json` into a new `src/content/copy.json` owned by this repo. `content.ts` merges both, so the components do not change. The keys are listed in "Data model".
- **Copy review:** a row-by-row review table of the texts listed in "Copy in review". The owner approves, edits or rejects each row before any text changes. The approved texts go to `copy.json`, `i18n.ts` and `labs.json`, all in this repo.
- **Branding repo, one time only:** remove the moved keys from `sitio/es.json` and `sitio/en.json` (the career facts stay). Replace the site-copy part of the "Copy del sitio" section of `branding/profile.md` with a pointer to `jotaeme-dev/src/content/copy.json`. Add decision 011 to `decisiones.md` (text ownership split, categories Code · Apps · Lab as pages, `free` merged into `apps`). Update `sitio/README.md` (schema and the sync `diff`) and `CLAUDE.md`. Then copy the reduced `es.json` and `en.json` here.
- **This repo:** `CLAUDE.md` (structure, the category rule, the Projects menu, `projects.json`), with `CACHE` bumped in `public/sw.js`.

**Out of scope (for future specs):**

- The `/code` and `/apps` pages and their content. Each gets its own spec and its own design. Cleaning up the `spring-web` and `devsu-microservicios` repos on GitHub comes before `/code`.
- Links to GitHub repos in the menu.
- Legal or privacy pages and cookie banners.
- Copy on LinkedIn, GitHub, the CV and the email signature. None of them changes.
- The career facts, which stay in the branding repo with their current text: `titular` (decision 002), `resumen` (shared with LinkedIn), `experiencia`, `habilidades`, `estadisticas`, and `sobre_mi.chips` / `metodo_*` ("How I work", decision 010).
- A new desktop language switch, a light theme, search, analytics and a blog.
- The brand kit in `design/brand/` (its `tokens.css` and the `subdomains/free/` logos and manifest). It is the reference archive and is not imported. Making the `code` versions goes in a short spec of its own. The icons and favicons are only `jm` on the green and can be copied. The `jm|code` logos and `og-code.png` are generated from the kit fonts. The guideline PDFs have no source file and stay as they are.

## Folder structure

```text
jotaeme-dev/
├── public/sw.js                          CHANGED: bump CACHE
├── specs/05-nav-projects-menu-footer-copy.md   this spec
├── src/
│   ├── content/
│   │   ├── es.json, en.json              CHANGED: copied from the branding repo, now career facts only
│   │   ├── copy.json                     NEW: site copy in ES and EN (owned by this repo)
│   │   ├── labs.json                     CHANGED only for approved copy rows
│   │   └── projects.json                 NEW: menu items for code and apps (owned by this repo)
│   ├── components/
│   │   ├── layout/Nav.astro              CHANGED: burger icon, panel, language switch, Let's talk in panel
│   │   ├── layout/ProjectsMenu.astro     NEW: desktop panel and mobile accordion, one markup
│   │   ├── layout/Footer.astro           CHANGED: one row, network code/apps/lab
│   │   ├── sections/Ecosystem.astro      CHANGED: ids code/apps/lab, host lines jotaeme.dev/<id>
│   │   └── sections/Hero.astro           CHANGED: status dot uses --jm-available
│   ├── lib/
│   │   ├── content.ts                    CHANGED: merges copy.json into each language, typed export of projects
│   │   └── i18n.ts                       CHANGED: menu labels, approved copy rows
│   └── styles/tokens.css                 CHANGED: --jm-free renamed to --jm-code, --jm-available added, subdomain overrides removed
└── CLAUDE.md                             CHANGED

PersonalBranding/
├── branding/profile.md                   CHANGED: site-copy part replaced by a pointer to copy.json
├── sitio/es.json, en.json                CHANGED: moved keys removed
├── sitio/README.md                       CHANGED: schema and sync diff
├── decisiones.md                         CHANGED: decision 011
└── CLAUDE.md                             CHANGED: ownership rule
```

## Data model

```ts
// src/content/copy.json: site copy, owned by this repo. Same key names as before,
// so the components keep reading content[locale].hero, .ecosistema, and so on.
type SiteCopy = {
	hero: { eyebrow: string; bajada: string; destacado: string; boton_contacto: string };
	sobre_mi: { titular: string };          // chips and metodo_* stay in es/en.json
	experiencia_seccion: { titulo: string };
	stack: { titulo: string; descripcion: string };
	servicios: { titulo: string; descripcion: string }[];
	servicios_seccion: { titulo: string };
	ecosistema: { titulo: string; titular: string; descripcion: string;
		tarjetas: { id: 'code' | 'apps' | 'lab'; estado: string; titulo: string; descripcion: string }[] };
	contacto: { titular: string };
	pie: string;
	meta: { titulo: string; descripcion: string };
};
// File shape: { "es": SiteCopy, "en": SiteCopy }

// src/lib/content.ts: content[locale] = branding JSON + copy.json[locale],
// with sobre_mi merged field by field. A key must not exist in both files.
```

What stays in `es.json` / `en.json` (career facts, owned by the branding repo): `titular`, `resumen`, `experiencia`, `habilidades`, `estadisticas`, `sobre_mi.chips`, `sobre_mi.metodo_titulo` and `sobre_mi.metodo_puntos`.

```ts
// src/content/projects.json: menu items of categories without their own data file yet.
// Lab items come from labs.json. When /code or /apps get a page, their spec decides
// whether the items move to a richer file such as code.json.
type ProjectItem = {
	id: string;                     // 'spring-web', kebab-case
	category: 'code' | 'apps';
	name: string;                   // shown as is in both languages
	order: number;
	href?: string;                  // empty in this spec: no links until a page exists
};
```

First content:

```json
[
	{ "id": "spring-web", "category": "code", "name": "spring-web", "order": 1 },
	{ "id": "devsu-microservicios", "category": "code", "name": "devsu-microservicios", "order": 2 }
]
```

Tiles in `copy.json` (`ecosistema.tarjetas`), in this order: `code`, `apps`, `lab`. Each keeps `{ id, estado, titulo, descripcion }`. The titles are the same in both languages (`Code`, `Apps`, `Lab`), like `Stack`. The `estado` and `descripcion` texts come from the review table.

New labels in `src/lib/i18n.ts` (final wording from the review table):

```ts
projectsMenu: { soon: 'Soon', seeAll: 'See all', overview: 'All projects', open: 'Open', close: 'Close' },
languages: { en: 'English', es: 'Español' },
```

Category order and color (a rename of what exists, no new color):

| Before | After | Color token | Hex |
| --- | --- | --- | --- |
| `free` | `code` | `--jm-free` → `--jm-code` | `#7AD1A0` (green) |
| `apps` | `apps` | `--jm-apps` (unchanged) | `#8AB4F8` (blue) |
| `lab` | `lab` | `--jm-lab` (unchanged) | `#B9A3FF` (violet) |
| hero status dot | hero status dot | `--jm-free` → `--jm-available` | `#7AD1A0` (same green) |

The menu columns, the Ecosystem tiles (`.c-free` → `.c-code`) and the footer bars use these tokens.

## Copy in review

### Rules for the new copy

- Use short sentences. Put the fact or the verb first. The English is B1: the owner must be able to read it aloud and defend it in an interview.
- Use light dev jargon only where a team would really say it: "ship", "in production", "end to end", "on call", "side projects", "self-hosted". Spanish uses the same register a Colombian dev team uses: "en producción", "de punta a punta", "proyectos propios".
- Avoid adjective triads ("reliable, secure, and built to last"), two-beat slogans ("Less X, better Y"), and metaphors such as "lives here", "the hub", "journey", "path" or "ecosystem". Avoid buzzwords such as "seamless", "robust", "leverage", "passionate", "cutting-edge" and "empower".
- Do not use "Senior", do not put AI outside the "How I work" block, and do not name clients other than those in decision 006.
- Spanish is written first. English is an adaptation, not a literal translation.

### Keys in the table

- `copy.json`: `hero.eyebrow`, `hero.bajada`, `hero.destacado`, `hero.boton_contacto`, `sobre_mi.titular`, `experiencia_seccion.titulo`, `stack.titulo`, `stack.descripcion`, `servicios[*]`, `servicios_seccion.titulo`, `ecosistema.titulo`, `ecosistema.titular`, `ecosistema.descripcion`, `ecosistema.tarjetas[*]` (new set `code` / `apps` / `lab`; the Lab `estado` "Private" is reviewed too), `contacto.titular`, `pie`, `meta.titulo`, `meta.descripcion`.
- `i18n.ts`: `ecosystem.label` ("Projects"), `talk`, `top`, `menu.*`, `loader.text`, `lab.intro`, `lab.meta.description`, `footerNetwork`, and the new `projectsMenu.*` labels.
- `labs.json`: `summary` and `highlights` of `lab-n8n`.

Table format (in `specs/05-copy-review.md`, a temporary file deleted before the final commit):

```text
| # | key | current ES | current EN | proposal ES | proposal EN | why | owner decision |
```

The owner decision is one of: `approve`, `edit: <text>` or `reject` (keep the current text).

## Implementation plan

1. **Baseline.** Run `npm run build` and save `dist/index.html`, `dist/es/index.html`, `dist/lab/index.html` and `dist/es/lab/index.html` outside the repo. Take Playwright screenshots of the nav and footer at 360 and 1280 px, EN and ES.
2. **Ownership split, same text.** Create `src/content/copy.json` with the site-copy keys moved as they are from `es.json` / `en.json`, and make `content.ts` merge it and throw at build time if a key exists in both files. Remove those keys from `sitio/es.json` and `sitio/en.json` in the branding repo and copy both files here. `dist/` must be identical to the baseline.
3. **Branding repo docs.** In the branding repo, replace the site-copy part of the "Copy del sitio" section of `branding/profile.md` with a pointer to `jotaeme-dev/src/content/copy.json`. Add decision 011 to `decisiones.md`, and update `sitio/README.md` (schema and sync `diff`) and `CLAUDE.md`. Nothing more changes there in this spec.
4. **Review table.** Write `specs/05-copy-review.md` with every key from "Copy in review", following the rules. **Stop.** The owner decides each row. Nothing changes until every row has a decision.
5. **Copy and tiles.** Apply the approved rows to `copy.json`, `i18n.ts` and `labs.json`, including the new tile set `code` / `apps` / `lab`. Rename `--jm-free` to `--jm-code` and add `--jm-available` in `tokens.css`, and point `Hero.astro` to `--jm-available`. Update `Ecosystem.astro` for the ids `code` / `apps` / `lab` and the `jotaeme.dev/<id>` host lines. Delete `specs/05-copy-review.md`. `npm run build` passes.
6. **Mobile bar.** In `Nav.astro`, replace the "Menu" pill with the burger icon. Move "Let's talk" and the language switch into the panel under 820 px. Make the panel full height with a scroll lock. The desktop bar must look the same as the baseline.
7. **Projects data.** Add `src/content/projects.json` and its typed export in `content.ts`.
8. **Desktop Projects menu.** Build `ProjectsMenu.astro` and wire it into `Nav.astro` as a disclosure button with the full-width panel and the open and close rules from Scope. Without JavaScript it stays a link. Entrance motion runs only under `.js` with `prefers-reduced-motion: no-preference`. Use only tokens.
9. **Mobile Projects accordion.** Render the same `ProjectsMenu` inside the mobile panel as an accordion, closed by default.
10. **Footer.** Make `Footer.astro` one row at ≥ 768 px and at most two lines below that, with the network `code · apps · lab`. Keep 44×44 px tap targets with less padding.
11. **Wrap-up.** Bump `CACHE` in `public/sw.js`. Update `CLAUDE.md`: structure, `copy.json` and `projects.json` as owned by this repo (only `es.json`, `en.json` and `site.json` are copied by hand), the rule that categories are pages (`/lab`, later `/code` and `/apps`) and only running projects get subdomains, and the Projects menu.
12. **Verification.** Use Playwright MCP at 320, 360, 390, 430, 768, 820, 1024, 1280 and 1440 px, EN and ES, on the home and `/lab`. Check keyboard-only navigation of the menu and the burger, JavaScript disabled, and `prefers-reduced-motion: reduce`. Compare the screenshots with step 1.

## Acceptance criteria

- [x] At 320 to 820 px, the bar shows only the logo and the burger icon. No text label, "Let's talk" or language switch is in the bar.
- [x] At 320 px in Spanish, the bar fits with no element touching the screen edge, and `document.documentElement.scrollWidth <= window.innerWidth`.
- [x] The burger has `aria-expanded`, `aria-controls` and the accessible names "Open menu" / "Close menu" ("Abrir menú" / "Cerrar menú"). The icon changes to an X when open.
- [x] With the mobile panel open, the page behind does not scroll. Escape closes the panel and returns focus to the burger. Tapping a link closes it.
- [x] The mobile panel contains the section links, the Projects accordion, `English` · `Español` with the active one marked `aria-current="true"`, and "Let's talk" as the last element.
- [x] On desktop, "Projects" is a `<button>` with `aria-expanded`. Click, Enter and Space toggle the panel. Hovering opens it. Escape closes it and returns focus to the button. An outside click closes it. Moving focus past its last link closes it.
- [x] The panel shows Code (`spring-web`, `devsu-microservicios`, each with `Soon` and no `<a>`), Apps (`Soon`, no `<a>`), and Lab (`lab-n8n` linking to `https://lab-n8n.jotaeme.dev` with `target="_blank"` and `rel="noopener noreferrer"`, plus "See all Lab" linking to `/lab/` in EN and `/es/lab/` in ES).
- [x] Adding an active lab to `labs.json` adds it to the Lab column with no component change. Adding an object to `projects.json` adds it to its column.
- [x] With JavaScript disabled, "Projects" is a link to the home ecosystem section and every nav link is reachable.
- [x] At ≥ 768 px, the footer is one row. Below 768 px it takes at most two lines. It contains no legal or privacy text. Its network list is `code · apps · lab`, and only `lab` has an `<a>`.
- [x] The Ecosystem section shows three tiles in the order `code`, `apps`, `lab`, with host lines `jotaeme.dev/code`, `jotaeme.dev/apps` and `jotaeme.dev/lab`. No `free` tile and no `*.jotaeme.dev` category host remains.
- [x] `grep -rn "jm-free\|c-free" src` returns nothing. `--jm-code` and `--jm-available` are defined only in `tokens.css`, both `#7AD1A0`. `--jm-apps` and `--jm-lab` keep their values.
- [x] The hero status dot and the `apps` and `lab` tiles look the same as the baseline screenshots, and the `code` tile has the green the `free` tile had.
- [x] Every key listed in "Copy in review" has an owner decision in the table, and the site shows exactly the approved text in both languages.
- [x] After step 2, `dist/` is identical to the baseline (the split moved text without changing it).
- [x] No key exists in both `copy.json` and `es.json` / `en.json`. `sitio/es.json` and `sitio/en.json` in the branding repo contain only the career-fact keys listed in "Data model".
- [x] The `diff` from the branding repo's `sitio/README.md` shows no output for `site.json`, `es.json` and `en.json`.
- [x] The branding repo's `decisiones.md` contains decision 011. Its `CLAUDE.md` and `sitio/README.md` say that the site copy lives in `jotaeme-dev/src/content/copy.json`, and this repo's `CLAUDE.md` says that `copy.json` is owned here.
- [x] Nothing changes in the branding repo's `cv/`, `branding/linkedin.md` or `branding/github.md`.
- [x] `specs/05-copy-review.md` no longer exists.
- [x] At every width from step 12, interactive elements are at least 44×44 px and there is no horizontal overflow.
- [x] With `prefers-reduced-motion: reduce`, the menu, the panel and the burger open with no animation.
- [x] No hex color is added outside `tokens.css`. No phone number, private document, "Senior", AI mention outside "How I work", or client outside decision 006 is added.
- [x] `npm run build` finishes without errors or warnings.

## Implementation notes

Differences between the plan and what was built, found during the work:

- **Components that read the JSON directly.** `pages/index.astro`, `pages/es/index.astro` and `Hero.astro` imported `es.json` / `en.json`, so they lost `meta` and `hero` after the split. Each now reads from `content` in `content.ts` (an import change only, no markup change). `Stats.astro` and `skills.ts` read only career facts and did not change.
- **Branding repo path.** The repo is at `/home/jmvelez/jmvelez/PersonalBranding`, not `/mnt/data/apps/PersonalBranding`. Its changes are in the working tree, not committed.
- **`sobre_mi` is in both files by design.** `content.ts` merges it field by field and fails the build if a sub-key (not the object) exists in both.
- **Footer under 430 px.** The approved `pie` wraps to two lines below 430 px, which would make three lines with the network row. The component splits `pie` at ` · ` and hides the city part below 430 px. `copy.json` keeps the full text. Decision of the owner.
- **New timing token.** `--jm-dur-fast: .2s` was added to `tokens.css` for the menu and burger motion (rule: timings come only from tokens). The nav's old `.2s` literals now use it.
- **Footer step order.** The footer's `free` entry was renamed to `code` in step 5, because removing `--jm-free` broke it. Step 10 did the rest.
- **Burger placement.** The burger button comes before the panel in the DOM, so Tab goes from it into the open menu. Found in the step 12 keyboard test.
- **Selector specificity.** Astro scoped CSS raises specificity, so the rule that hides the plain "Projects" link when JavaScript is on uses `.nav-links a.projects-link`.
- **Unused labels.** `projectsMenu.open` and `projectsMenu.close` exist in `i18n.ts` but are not used: a button whose name changes with its state clashes with `aria-expanded`.
- **Playwright MCP.** Its browser profile was locked by another machine, so step 12 ran with standalone `playwright-core` and a throwaway profile.
- **Not verifiable here.** Scroll lock on iOS Safari at 390 px, and the feel of the hover-open menu with a real mouse, need a check on real devices.

## Decisions

- **Yes:** one spec for the nav, the footer, the menu and the copy, saved and worked in this repo. The owner chose this.
- **Yes:** the site copy is owned by this repo (`copy.json`), and the career facts stay in the branding repo. The site's voice and jargon change with its design and appear nowhere else, while the facts must match the CV and LinkedIn. **No:** keeping every text in `profile.md`, which forces each site tweak through two repos. **No:** editing `es.json` / `en.json` here, which would break the hand-copy sync and its `diff` check.
- **Yes:** the same key names in `copy.json`, merged in `content.ts`. Components do not change, and step 2 can be checked against the baseline.
- **Yes:** on mobile, logo plus burger only, with "Let's talk" and the language switch in the panel. It solves the 320 px overflow and follows the apple.com pattern.
- **No:** keeping "Let's talk" or `EN / ES` in the mobile bar. Either one brings back the crowding.
- **Yes:** an Apple-style full-width panel for Projects. **No:** a small dropdown, because the owner wanted the Apple look. **No:** keeping Projects as a plain anchor.
- **Yes:** three categories, Code · Apps · Lab, as pages (`/code`, `/apps`, `/lab`). Only running projects get subdomains.
- **Yes:** `free` merged into `apps`, with a `Free` / `Paid` tag per app on its future page. **No:** four categories with two empty columns.
- **Yes:** `code` as the name. It is short, works in both languages, and tells a recruiter what they will find. **No:** "Builds" (confused with CI builds). **No:** "Showcase" (sounds like marketing).
- **Yes:** `apps`, not "Clients", "Products" or "Work". See "Why this spec exists". "Work" was also rejected because it clashes with the Experience section.
- **Yes:** category names are the same in EN and ES and match the URLs. Descriptions are translated.
- **Yes:** empty categories show a `Soon` column, so the visitor sees the whole map.
- **No:** links to the `spring-web` and `devsu-microservicios` repos. They need cleanup first, and the rule "no page, no link" stays.
- **Yes:** `projects.json` owned by this repo, like `labs.json`. Menu items are project data, not profile copy.
- **Yes:** rename `--jm-free` to `--jm-code` instead of adding an alias. `code` takes the place of `free`, so the green moves with it and no new color is added. **No:** keeping `--jm-free` with an alias on top, which leaves a dead name in the code.
- **Yes:** `--jm-available` for the hero status dot. It is the same green, but a status should not be named after a category.
- **No:** touching `design/brand/` in this spec. It is a reference archive that the site does not import, and the owner chose to do its `code` version in a separate spec.
- **Yes:** a one-row footer with no legal text. The site collects no personal data (no cookies, analytics or forms), so Colombian data-protection rules (Ley 1581) do not call for a policy page. The owner asked for no legal text when it does not apply.
- **No:** `jotaeme.dev` in the footer network. The logo and the copyright already name the site.
- **Yes:** copy reviewed row by row in a temporary table (`specs/05-copy-review.md`), like decision 009. It is deleted before the final commit, and the result lives in `copy.json`. **No:** fixing the texts inside this spec, because the owner wants to judge each one.
- **Yes:** "dev direct" tone with light jargon. **No:** heavy slang ("battle-tested", "happy path"), which is hard to defend at B1 and can sound forced. **No:** flat text with no voice.
- **Yes:** copy review limited to the site. LinkedIn, GitHub and the CV get their own spec if needed.

## Risks

| Risk | Mitigation |
| ---- | ---------- |
| Hover-open menu flickers or traps the pointer between "Projects" and the panel | Keep a short close delay. The panel touches the bar, with no gap. Click always works as a fallback. Verify in step 12. |
| Scroll lock on iOS Safari leaves the page shifted or stuck | Lock with a class on `<html>` and remove it on close, Escape, link tap and resize past 820 px. Check at 390 px. |
| Two copies of the menu markup (desktop and mobile) drift apart | One `ProjectsMenu.astro`, with the layout changed by CSS only. |
| New copy drifts from LinkedIn or the CV | Only site copy moves here. The headline, the About paragraph and the career facts stay in the branding repo with their current text. |
| A later copy from the branding repo brings back the moved keys | The branding repo's `sitio/*.json` no longer has them, its README says so, and `content.ts` fails the build if a key exists in both files. |
| The tile id change from `free` to `code` breaks styles keyed on `.c-free` | Step 5 updates `Ecosystem.astro` together with the JSON, and the build plus a screenshot check it. |
| `sw.js` serves the old shell | `CACHE` is bumped in step 11. Navigations are network-first (SPEC 02). |

## What is **not** in this spec

- The `/code` and `/apps` pages, and cleanup of the GitHub repos.
- Legal or privacy pages, and cookie banners.
- Copy on LinkedIn, GitHub, the CV or the signature, plus the career facts: the headline, the About paragraph, "How I work", experience, stats and skills.
- A new desktop language switch, a light theme, analytics and a blog.

Each one, if it lands, goes in its own spec.
