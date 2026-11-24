# SPEC 07 — Code and Apps pages: Branch Hub and the first client MCP app

> **Status:** Implemented
> **Depends on:** SPEC 04 (Implemented), SPEC 05 (Implemented), SPEC 06 (Approved); for step 12 only, a branding-repo spec that adds `MCP` and `OAuth 2.1` to the skills, and `Astro` to the Frontend group (decision 012, not written yet)
> **Date:** 2026-11-24
> **Objective:** Publish `/code` with Branch Hub and `/apps` with the anonymous case of the first client MCP app in production, and present that AI work across the site as backend engineering.

## Why this spec exists

Two projects changed what the site can show. The owner decided this on 2026-11-24:

- **Branch Hub** (`github.com/JuanMaVelezPa/branch-hub`, public) is the updated `spring-web`: Spring Boot 4 on Java 25 with Clean Architecture, JWT plus an HttpOnly refresh cookie, a Kafka transactional outbox, Flyway, Testcontainers, an Angular 21 SPA, and Prometheus, Grafana and Alertmanager. It runs as a public demo at `code-branchhub.jotaeme.dev`, with a demo account, Swagger UI and a read-only Grafana at `code-branchhub-grafana.jotaeme.dev`. It replaces `spring-web` in the Code category.
- **The workshop MCP app** (private repo) is the owner's first app delivered to a paying client, and it is in production. It is an MCP server for claude.ai that is its own OAuth 2.1 authorization server (PKCE, dynamic client registration, Google sign-in, tokens stored as SHA-256). It runs every query through a read-only PostgreSQL role and logs each tool call. It loads the client's data from the Siigo API and Aliaddo Excel reports into PostgreSQL in three layers. It has 11 tools, some of which write with fixed SQL, and serves a web cash-closing page (`/cuadre`) with its own Google session.

**AI positioning.** Decision 004 of the branding repo left "a full AI positioning for a later spec, when the site and the projects exist". It also banned AI skills "without backing until there is a project". This app is that project. The owner wants to show it fully. The framing is a **backend engineer who connects business data to AI**, not an "AI Engineer": what sets the work apart is the auth, the data access limits and the data pipeline, and the owner can defend each of these in an interview. Still banned (decisions 004 and 010): AI in the headline, "AI Engineer", "Senior" or AI level labels, unbacked skills such as RAG, LLMs or embeddings (the app uses none of them), and any AI text that mentions ITC, its clients or its systems.

**The client is anonymous.** This repo is public, and its rule allows only BBVA, Credicorp, Banco de Bogotá and Banco Popular as client names. The case reads "an auto-repair business in Medellín" ("un taller automotriz en Medellín"): no business name, logo, business figures, staff or customer names, and no `autodiamante.jotaeme.dev` host. SPEC 06's rule (the privacy policy names no client or app) still holds.

## Scope

**In:**

- **`/code` and `/es/code`.** One card for Branch Hub with a summary, highlights, stack, links (live demo, source code, Swagger UI, Grafana), a short note on the public demo account, and screenshots. `devsu-microservicios` stays in `code.json` with `status: "soon"`: it appears in the Projects menu with a `Soon` tag and no link, and it does not appear on the page. `spring-web` is removed.
- **`/apps` and `/es/apps`.** One case-study card for the workshop MCP app, written first for a business owner and a recruiter who read fast (owner decision, 2026-11-24: lead with the outcome, an analyst with the business's real data, and keep the engineering detail one click away). The card shows, in this order: the title, tags, the outcome in large type, one line on how it works, examples of what the owner asks Claude for (questions and deliverables: Excel files, decks, dashboards), how the data stays protected in plain words, a "Let's talk" button to the home contact section, and the screenshot. A closed `Technical details` section (native `<details>`) holds:
  - Tags `Client` / `Cliente` and `In production` / `En producción`. `Client` joins the `Free` / `Paid` app kinds planned in SPEC 05.
  - The problem, what was built, and the engineering decisions (auth, read-only role, audit log, data pipeline, write tools with fixed SQL, cash-closing page).
  - An architecture diagram as inline SVG: claude.ai → Cloudflare Tunnel → MCP server → PostgreSQL, with Google sign-in, the Siigo API, and the Aliaddo Excel reports that arrive through Google Drive. It uses only tokens and generic labels.
  - Technical figures only: 11 tools, 3 connected systems (Siigo, the Aliaddo reports, Google Drive; owner decision, 2026-11-24, replacing "2 data sources"), in production since November 2026.
  - Screenshots made with **fictional data** (see "Screenshots").
  - No links: the repo is private and the server only lets in authorized emails.
- **Home:**
  - The `code` and `apps` tiles in "Beyond the CV" become `Active` and link to their pages, like `lab`. `ecosistema.descripcion` is rewritten (it says "each project that is running has its own subdomain", which no longer explains the three tiles).
  - A fourth service in `servicios`: connecting a business's data to Claude with MCP servers (final wording from the review table).
- **Projects menu:** the Code column shows `branch-hub` linking to `/code/` (plus `devsu-microservicios` with `Soon`). The Apps column shows the workshop case linking to `/apps/`. Each of the two columns gets "See all Code →" / "See all Apps →", like Lab. The `Soon` column state for an empty category stays in the component.
- **Footer network:** `code · apps · lab`, all three linked.
- **Data:** `src/content/code.json` and `src/content/apps.json`, owned by this repo, like `labs.json`. `projects.json` is deleted, and the menu reads the three files.
- **SEO:** both pages through `Base.astro` with `path="code/"` and `path="apps/"` (title, description, canonical, `hreflang`), one `<h1>` each, and `sitemap.xml` lists both.
- **Copy review:** a row-by-row table in `specs/07-copy-review.md` (temporary, deleted before the final commit), with the SPEC 05 rules and format.
- **Rules in `CLAUDE.md`:** the AI rule becomes "AI appears in 'How I work', in the MCP service, and in the `/apps` case; never in the headline", plus the structure, the anonymous-client rule for `/apps`, and the menu reading three files. `CACHE` bump in `public/sw.js`.
- **Stack (step 12, gated):** once the branding-repo spec is implemented, copy its `es.json` / `en.json` here so `MCP`, `OAuth 2.1` and `Astro` (Frontend, backed by this site) show in Stack and in the globe and marquee labels (`skills.ts`).

**Out of scope (for future specs):**

- The branding-repo spec itself: decision 012, the skills in `sitio/*.json`, the CV PDFs and LinkedIn. Only the copy of its result into this repo is in step 12.
- Naming the client, its logo, or a link to `autodiamante.jotaeme.dev`. This would need the client's written permission and a change to decision 006.
- AI in the hero, the headline (decision 002), Stats, or the About paragraph.
- Per-project detail pages (`/code/branch-hub`), `og` images per page, and `Free` / `Paid` apps (none exist yet).
- Cleaning up `devsu-microservicios` and showing it on `/code`.
- A public demo instance of the MCP server.

## Folder structure

```text
jotaeme-dev/
├── public/
│   ├── sw.js                                CHANGED: bump CACHE to jm-shell-v5
│   └── images/
│       ├── code/branch-hub/                 NEW: login, dashboard, branches, grafana (.webp)
│       └── apps/workshop-mcp/               NEW: cuadre, claude (.webp, fictional data)
├── specs/
│   ├── 07-code-and-apps-pages.md            this spec
│   └── 07-copy-review.md                    TEMPORARY: deleted before the final commit
├── src/
│   ├── content/
│   │   ├── code.json                        NEW: Code projects (owned by this repo)
│   │   ├── apps.json                        NEW: Apps projects (owned by this repo)
│   │   ├── projects.json                    DELETED
│   │   └── copy.json                        CHANGED: approved rows (tiles, ecosystem text, new service)
│   ├── components/
│   │   ├── Code.astro                       NEW: body of /code, shared by both languages
│   │   ├── Apps.astro                       NEW: body of /apps, shared by both languages
│   │   ├── project/ProjectCard.astro        NEW: card for code and apps entries (tags, links, gallery)
│   │   ├── ui/McpDiagram.astro              NEW: inline SVG architecture diagram, tokens only
│   │   ├── layout/ProjectsMenu.astro        CHANGED: reads code.json, apps.json, labs.json; links; See all
│   │   ├── layout/Footer.astro              CHANGED: code and apps linked
│   │   └── sections/Ecosystem.astro         CHANGED: code and apps link to their pages
│   ├── lib/
│   │   ├── content.ts                       CHANGED: typed exports of code and apps; projects removed
│   │   └── i18n.ts                          CHANGED: code.* and apps.* labels and meta
│   └── pages/
│       ├── code/index.astro                 NEW: EN
│       ├── es/code/index.astro              NEW: ES
│       ├── apps/index.astro                 NEW: EN
│       ├── es/apps/index.astro              NEW: ES
│       └── sitemap.xml.ts                   CHANGED: lists code/ and apps/
└── CLAUDE.md                                CHANGED
```

## Data model

```ts
// src/content/code.json and src/content/apps.json: same shape, owned by this repo.
type Project = {
	id: string;                        // kebab-case: 'branch-hub', 'workshop-mcp'
	order: number;
	status: 'active' | 'soon';         // 'soon': in the menu with a Soon tag, not on the page
	tags?: ('client' | 'free' | 'paid' | 'production')[];   // apps only
	stack: string[];
	links?: { kind: 'live' | 'repo' | 'docs' | 'metrics'; href: string }[];
	images?: { src: string; width: number; height: number }[];  // under /images/<category>/<id>/
	diagram?: 'mcp';                   // renders ui/McpDiagram.astro
	facts?: string[];                  // technical figures, same in both languages: '11', '2'
	es: ProjectText;
	en: ProjectText;
};

type ProjectText = {
	title: string;
	summary: string;
	highlights: string[];
	note?: string;                     // Branch Hub: the public demo account and the Saturday reset
	alts?: string[];                   // one per image, same order
	factLabels?: string[];             // one per fact: 'tools', 'connected systems'
	how?: string;                      // client case: one line on how it works
	asks?: string[];                   // client case: what the owner asks for; turns on the client layout
	trust?: string[];                  // client case: how the data stays protected, in plain words
};
```

First content (texts come from the review table):

- `code.json`: `branch-hub` (`active`, links `live` → `https://code-branchhub.jotaeme.dev`, `repo` → `https://github.com/JuanMaVelezPa/branch-hub`, `docs` → `https://code-branchhub.jotaeme.dev/swagger-ui.html`, `metrics` → `https://code-branchhub-grafana.jotaeme.dev`; four images), and `devsu-microservicios` (`soon`, no links).
- `apps.json`: `workshop-mcp` (`active`, tags `client` and `production`, no links, `diagram: "mcp"`, two images, facts `11` tools and `3` connected systems, plus "in production since November 2026" in the highlights).

New labels in `src/lib/i18n.ts`, one block per page like `lab`: `meta`, `title`, `intro`, `list`, `stack`, `highlights`, link names per `kind` (`Live demo`, `Source code`, `API docs`, `Grafana`), tag names (`Client`, `Free`, `Paid`, `In production`), and `projectsMenu.seeAll` reused for Code and Apps.

The `id` `workshop-mcp` and every file name and alt text under `public/images/apps/` are generic: none contains the client's name.

## Screenshots

- **Branch Hub:** `login`, `dashboard`, `branches` and `grafana`, from `branch-hub/docs/images/` (already demo data). Converted to WebP, at most 1600 px wide.
- **Cash-closing page:** rendered with the real template of the private repo (`render_cash_window`) from the fictional windows of `tests/cash_factory.py`, with no database. The logo is replaced by a neutral placeholder. The captured area does not include the browser bar or the host.
- **claude.ai conversation:** the owner captures it against an instance of the MCP server loaded with fictional data only. The question and the answer show no real names or figures. If that instance cannot run (see Risks), the case ships with the diagram and the cash-closing screenshot, and this image moves to a later spec.
- Every image has `width`, `height`, `loading="lazy"` and an alt text in each language. The owner reviews each workshop image before it is committed.

## Implementation plan

1. **Baseline.** Run `npm run build` and save `dist/` outside the repo. Take Playwright screenshots of the home tiles, the Projects menu and the footer at 360 and 1280 px, in EN and ES.
2. **Data files, same menu.** Create `code.json` and `apps.json` (`branch-hub` and `devsu-microservicios` as `soon`, and `workshop-mcp` as `soon`, with placeholder texts), type them in `content.ts`, delete `projects.json`, and make `ProjectsMenu.astro` read the three files. The menu looks as it does today, except that `spring-web` becomes `branch-hub`. `npm run build` passes.
3. **Review table.** Write `specs/07-copy-review.md` with every new or changed text: `copy.json` (`ecosistema.descripcion`, `ecosistema.titular` if needed, the `code` and `apps` tiles' `estado` and `descripcion`, the new `servicios` item), `code.json` and `apps.json` texts and alts, and the new `i18n.ts` labels and meta. Follow the SPEC 05 copy rules, plus: name no client, no ITC in any AI text, and only defensible technical claims. **Stop.** The owner decides each row. Nothing changes until every row has a decision.
4. **Apply copy.** Write the approved rows into `copy.json`, `code.json`, `apps.json` and `i18n.ts`. Delete `specs/07-copy-review.md`.
5. **Card and `/code`.** Build `ProjectCard.astro` (based on `LabCard.astro`: tags, links with `target="_blank"` and `rel="noopener noreferrer"`, an optional note, gallery, facts), `Code.astro`, and both `/code` pages. Add the Branch Hub WebP images. Set `branch-hub` to `active`.
6. **Diagram.** Build `ui/McpDiagram.astro` as inline SVG with tokens only and a text alternative (`<title>` and `<desc>`, translated).
7. **Screenshots of the workshop case.** Render the cash-closing page from `cash_factory` with the placeholder logo, capture it, convert it to WebP and put it under `public/images/apps/workshop-mcp/`. The owner captures the claude.ai screenshot against the fictional-data instance, or skips it as "Screenshots" allows. The owner approves both images.
8. **`/apps`.** Build `Apps.astro` and both `/apps` pages with the card, tags, diagram, facts and images. Set `workshop-mcp` to `active`.
9. **Wiring.** Link `code` and `apps` in `Ecosystem.astro` and `Footer.astro`. In `ProjectsMenu.astro`, link each active item to its page and add "See all" for Code and Apps. Add `code/` and `apps/` to `sitemap.xml.ts`.
10. **Wrap-up.** Bump `CACHE` to `jm-shell-v5`. Update `CLAUDE.md`: structure, `code.json` and `apps.json` owned here, `projects.json` gone, the new AI rule, the anonymous-client rule, all three tiles linked, and the menu reading three files.
11. **Verification.** Use Playwright at 320, 360, 390, 768, 820, 1024 and 1440 px, in EN and ES, on the home, `/code`, `/apps` and `/lab`. Check keyboard navigation of the menu, JavaScript disabled, and `prefers-reduced-motion: reduce`. Compare with step 1. Run the grep checks from the acceptance criteria.
12. **Stack (gated).** Only when the branding-repo spec is implemented: copy its `site.json`, `es.json` and `en.json` here and check that `MCP`, `OAuth 2.1` and `Astro` (Frontend group) show in Stack and in the globe and marquee labels. If that spec is not done when steps 1–11 close, this spec moves to `Implemented` with step 12 recorded as pending in "Implementation notes".

## Acceptance criteria

- [x] `/code/`, `/es/code/`, `/apps/` and `/es/apps/` build and show their content in each language, with one `<h1>`, a self-referencing canonical, and `hreflang` `en` / `es` / `x-default`.
- [x] `sitemap.xml` lists the four new URLs.
- [x] `/code` shows only Branch Hub, with links to the live demo, the GitHub repo, Swagger UI and Grafana, each with `target="_blank"` and `rel="noopener noreferrer"`. It shows four screenshots with `width`, `height`, `loading="lazy"` and alt text.
- [x] `/apps` shows the workshop case with the tags `Client` and `In production` (`Cliente`, `En producción`), the outcome, the owner's examples, the protections, a contact button to `#contact` / `#contacto`, and at least the cash-closing screenshot. The facts, the technical highlights, the stack and the diagram are in a `Technical details` section that opens without JavaScript. It has no `<a>` to a repo or to the MCP host.
- [x] `grep -rni "diamante" src public dist` returns nothing, and neither does a grep for the real business names in `catalog/` of the private repo.
- [x] No workshop image shows a real customer, supplier, staff name, business figure, logo or the `autodiamante.jotaeme.dev` host. The owner approved each image.
- [x] `grep -rn "spring-web" src` returns nothing. `src/content/projects.json` no longer exists.
- [x] Projects menu: Code shows `branch-hub` linking to `/code/` (`/es/code/` in ES) and `devsu-microservicios` with `Soon` and no `<a>`. Apps shows the workshop case linking to `/apps/`. Both columns have a "See all" link. Lab does not change.
- [x] Adding an `active` object to `code.json` or `apps.json` adds a card to its page and an item to the menu, with no component change. A `soon` object adds only a menu item with `Soon`.
- [x] The Ecosystem tiles `code`, `apps` and `lab` are all `Active` and link to their pages. The footer network links all three.
- [x] Services shows four items, with no horizontal overflow at 320 px.
- [x] The headline, the hero, Stats and the About paragraph contain no AI text, "AI Engineer", "Senior" or AI level label. No AI text mentions ITC or its clients. No skill says RAG, LLM or embeddings.
- [x] The diagram uses only `var(--jm-*)` colors and has a translated `<title>` and `<desc>`. No hex color is added outside `tokens.css`.
- [x] Every row in the review table has an owner decision, and the site shows exactly the approved text. `specs/07-copy-review.md` no longer exists.
- [x] `CLAUDE.md` states the new AI rule, the anonymous-client rule for `/apps`, and the `code.json` / `apps.json` ownership. `CACHE` in `public/sw.js` is `jm-shell-v5`.
- [x] At every width from step 11 there is no horizontal overflow, and interactive elements are at least 44×44 px. With JavaScript disabled, both pages and their links work.
- [x] `npm run build` finishes without errors or warnings.
- [x] Step 12: either `MCP`, `OAuth 2.1` and `Astro` show in Stack after the branding copy, or the step is recorded as pending in "Implementation notes".

## Implementation notes

Differences between the plan and what was built, found during the work:

- **Node.** Astro 7 needs Node ≥ 22.23.4. The build runs on Node 24 (`.nvmrc`), installed with nvm.
- **claude.ai screenshot skipped** (owner decision, step 7). It moves to a later spec. `/apps` ships with the diagram and the cash-closing screenshot, and its second alt text was removed.
- **Cash-closing screenshot.** The `cash_factory` segment names, expense groups, payment labels and invoice prefix matched the real catalog, so the capture replaces them with generic names (Taller, Lavado, Repuestos, Flotas; `FV`), replaces customer names that hinted at the business, swaps the logo for a neutral placeholder, and recolors the template's red to gray (owner decision). The render script lives outside the repo; the private repo is unchanged.
- **Card.** `ProjectCard.astro` has two layouts in one component. An engineering card (code): summary, decisions and stack on the left; links, note and screenshots on the right. A client case (an entry with `asks`): outcome, examples, protections and a contact button first, with facts, decisions, stack and diagram inside a closed `Technical details` (`<details>`). Screenshots are thumbnails that open the full image in a new tab. The stack keeps the chips with a hover lift.
- **Diagram.** Two drawings of one graph (wide and vertical), picked by a container query on the diagram's width, not the viewport. It shows Aliaddo Excel → Google Drive → PostgreSQL and the Siigo API → PostgreSQL (owner decision: 3 connected systems).
- **Copy after the review table.** The owner approved further rows in the session: the `/apps` client-first texts, the Drive texts, the `/apps` intro and meta description, the Apps tile and the fourth service.
- **Fonts.** Repo-style names (kebab-case) use the mono face in the card and the menu; plain titles use the sans face.
- **Step 12** also covers `Astro` in the Frontend group (owner decision, 2026-11-24).
- **Step 12 is pending.** On 2026-11-24, when steps 1–11 closed, the branding repo had no spec for decision 012 yet. When it is implemented there, copy its `site.json`, `es.json` and `en.json` here and check that `MCP`, `OAuth 2.1` and `Astro` show in Stack and in the globe and marquee labels.

## Decisions

- **Yes:** one spec for `/code` and `/apps`. They share the card, the data shape and the menu wiring, and splitting them would duplicate the work. It overrides the "each gets its own spec" line of SPEC 05 and `CLAUDE.md`. The owner chose this.
- **Yes:** Branch Hub replaces `spring-web`. It is the same project, updated. **No:** keeping both.
- **Yes:** `devsu-microservicios` stays as `Soon` in the menu and off the page until it is cleaned up. The "no page, no link" rule holds.
- **Yes:** an anonymous client ("an auto-repair business in Medellín"). The repo is public, and decision 006 lists only four clients. **No:** naming it, which needs written permission from the client and a change to decision 006. **No:** a made-up project name that hides who the client is but still reads as a brand.
- **Yes:** show the AI work fully, framed as backend engineering. It meets the condition that decision 004 set ("when there is a project"). The owner wants to make the most of it, and every claim (OAuth 2.1, read-only role, audit log, data pipeline) can be defended in an interview. **No:** AI in the headline, the hero or Stats, "AI Engineer", or unbacked skills. Those bans from decisions 004 and 010 stay.
- **Yes:** a fourth service about MCP servers in the home. `copy.json` is owned here. **No:** changing the headline (decision 002).
- **Yes:** `MCP` and `OAuth 2.1` as skills, plus `Astro` in the Frontend group (this site is built with it; owner decision, 2026-11-24), but through a separate branding-repo spec (decision 012), because skills are career facts that also go to the CV and LinkedIn. This spec only copies the result, in a gated last step, so it is not blocked.
- **Yes:** screenshots with fictional data, generated from the private repo's own test factory and template. **No:** real data with blurring, because one missed field leaks client data into a public repo. **No:** text only, which makes the case weaker.
- **Yes:** the `/apps` case speaks to a client first (owner decision, 2026-11-24). The title is "Claude as the business analyst" / "Claude como analista del negocio", and the outcome, examples, protections and contact button come first. The engineering detail (facts, highlights, stack, diagram) stays on the page under `Technical details`. **No:** leading with the architecture, which a business owner does not read. The new texts were approved by the owner row by row in the session, like the review table.
- **Yes:** tags `Client` + `In production`. `Client` joins `Free` / `Paid` as an app kind. **No:** `Paid`, which says the price model, not that a real client uses it.
- **Yes:** `code.json` and `apps.json` with the same shape, and `projects.json` removed. It follows the `labs.json` pattern. **No:** a bigger `projects.json` with category fields that only some entries use.
- **Yes:** a separate `ProjectCard.astro` next to `LabCard.astro`. Code and apps need tags, galleries, a diagram and facts, which labs do not. **No:** stretching `LabCard` with optional branches.
- **Yes:** the diagram as inline SVG with tokens. It follows the dark theme and the color rule. **No:** a Mermaid render or a PNG.
- **Yes:** a copy review table, as in SPEC 05. The owner chose it.

## Risks

| Risk | Mitigation |
| ---- | ---------- |
| A screenshot or text leaks client data or identity (name, logo, segment names, host) | Fictional data only, a placeholder logo, no browser bar, the owner approves each image, and the grep criteria. |
| `cash_factory` segment names mirror the real business layout and point to the client | Check them in step 7. If they match the real business, replace them with generic names in the capture. |
| claude.ai needs a public HTTPS connector, so a fictional-data MCP instance is hard to stand up | That screenshot is optional. The case ships with the diagram and the cash-closing screenshot. |
| AI copy overstates the work or drifts toward "AI Engineer" | The review table, the defensible-claims rule, and the grep and read criteria on the headline, hero and Stats. |
| The branding-repo spec is late and Stack never shows MCP | Step 12 is gated, and this spec can close without it, recorded in its notes. |
| Branch Hub's live demo is down when a recruiter clicks | The page still has the repo and the screenshots. The demo uptime belongs to the Branch Hub repo. |
| Images make the pages heavy | WebP at most 1600 px wide, `loading="lazy"`, and explicit sizes. |
| `sw.js` serves the old shell | `CACHE` is bumped in step 10. Navigation is network-first (SPEC 02). |

## What is **not** in this spec

- The branding-repo spec (decision 012, skills, CV and LinkedIn).
- Naming the client or linking to its server.
- AI in the headline, the hero, Stats or About.
- Per-project detail pages, `og` images per page, `Free` / `Paid` apps, the `devsu-microservicios` cleanup, and a public MCP demo.

Each one, if it lands, goes in its own spec.
