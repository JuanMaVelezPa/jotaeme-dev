# SPEC 01 — Project structure cleanup

> **Status:** Implemented
> **Depends on:** none (SPEC 02 depends on this one)
> **Date:** 2026-10-27
> **Objective:** Reorganize `src/` by role, remove the duplicated page composition, and move the brand kit out of the repo root, without changing the HTML the site produces.

## Why this spec exists

The repo grew in SPEC 03 of the personal-branding repo and now has three structural problems:

- `src/components/` holds 14 files with no grouping: layout pieces, page sections, and one visual widget are mixed.
- `src/pages/index.astro` and `src/pages/es/index.astro` repeat 12 imports and the same composition. They differ only in the locale.
- `jotaeme-brand/` (about 4 MB) and `jotaeme-site/` (a design reference already converted to Astro) sit in the root next to the app code, and are never deployed.

This is a pure refactor. It runs before SPEC 02 so the cursor, PWA, and mobile work land in the final structure.

## Scope

**In:**

- Group `src/components/` into `layout/`, `sections/`, and `ui/`.
- Add `src/components/Home.astro`, which receives no props, reads the locale with `getLocale(Astro.currentLocale)`, and renders the full page body. Both pages become a `Base` plus `<Home />`.
- Move `src/i18n.ts` to `src/lib/i18n.ts`, so `src/` has only `components/`, `content/`, `layouts/`, `lib/`, `pages/`, `styles/`.
- Move `jotaeme-brand/` to `design/brand/`.
- Delete `jotaeme-site/`: it was only a visual reference, SPEC 03 steps 12 to 19 converted it, and git history keeps it.
- Audit every other tracked file for references (`grep` plus a successful build). Delete only what has no reference, and record each deletion with its reason in the "Deleted files" list below at implementation time.
- Update `CLAUDE.md` (structure block and the `jotaeme-brand/`, `jotaeme-site/` lines) and `README.md` (project structure) to match.
- Update the comments in `src/styles/loader.css` and `src/styles/tokens.css` that point to `jotaeme-brand/`.

**Out of scope (for future specs):**

- Any visual or behavioral change. The built HTML and CSS must stay equivalent.
- Editing `src/content/*.json`. They are copied by hand from the personal-branding repo.
- Moving the brand kit to another repo (see Decisions).
- Updating decision 008 and the `CLAUDE.md` of the personal-branding repo, which mention `jotaeme-brand/` and `jotaeme-site/` paths. This is a follow-up in that repo.
- Renaming components, CSS classes, anchors, or JSON keys.
- Adding linting, formatting, or test tooling.

## Folder structure

Target tree. `MOVED` files keep their content except for import paths.

```text
jotaeme-dev/
├── design/
│   └── brand/                      MOVED from jotaeme-brand/ (source of tokens, fonts, favicon, OG)
├── public/                         (unchanged by this spec)
├── specs/
├── src/
│   ├── components/
│   │   ├── Home.astro              NEW: page body shared by both languages
│   │   ├── layout/
│   │   │   ├── Nav.astro           MOVED
│   │   │   ├── Logo.astro          MOVED
│   │   │   ├── Loader.astro        MOVED
│   │   │   └── Footer.astro        MOVED
│   │   ├── sections/
│   │   │   ├── Hero.astro          MOVED
│   │   │   ├── Stats.astro         MOVED
│   │   │   ├── Marquee.astro       MOVED
│   │   │   ├── About.astro         MOVED
│   │   │   ├── Experience.astro    MOVED
│   │   │   ├── Stack.astro         MOVED
│   │   │   ├── Services.astro      MOVED
│   │   │   ├── Ecosystem.astro     MOVED
│   │   │   └── Contact.astro       MOVED
│   │   └── ui/
│   │       └── Globe.astro         MOVED
│   ├── content/                    (unchanged, copied by hand)
│   ├── layouts/Base.astro          (imports updated)
│   ├── lib/
│   │   ├── content.ts
│   │   ├── i18n.ts                 MOVED from src/i18n.ts
│   │   └── skills.ts
│   ├── pages/
│   │   ├── index.astro             CHANGED: Base + Home
│   │   ├── es/index.astro          CHANGED: Base + Home
│   │   ├── 404.astro
│   │   └── sitemap.xml.ts
│   └── styles/                     (unchanged apart from comments)
├── CLAUDE.md                       CHANGED
└── README.md                       CHANGED
```

Rules for the layout:

- `layout/` is what wraps every page (navigation, brand mark, loader, footer). `sections/` are the page bands in scroll order. `ui/` is a reusable widget with no section of its own.
- A component goes in `sections/` only if it renders one band of the home page.
- `design/` is never imported by app code and never deployed. Only files copied from it into `public/` or `src/styles/` reach the site.
- Nothing is added under `src/` outside the six folders above.

## Data model

This refactor introduces no new data structures. Only module paths change.

## Implementation plan

1. Baseline: run `npm run build` and save the `dist/` HTML of `/`, `/es/`, and `/404` outside the repo for later comparison.
2. Move `src/i18n.ts` to `src/lib/i18n.ts` with `git mv` and fix every import. Build passes.
3. Create `components/layout/`, `sections/`, and `ui/`, `git mv` each component, and fix imports inside them and in `Base.astro` and both pages. Build passes.
4. Add `src/components/Home.astro` and reduce both pages to `Base` plus `<Home />`, with title and description still taken from the locale JSON. Build passes.
5. `git mv jotaeme-brand design/brand` and update path comments in `loader.css`, `tokens.css`, and the kit's own README if it names its folder.
6. Run the reference audit on every other tracked file. Delete `jotaeme-site/` and any unreferenced file, and fill the "Deleted files" list.
7. Update `CLAUDE.md` and `README.md` structure sections.
8. Rebuild and diff the `dist/` HTML against the baseline from step 1.

## Deleted files

Filled in during step 6. Format: `path — reason — evidence`.

- `jotaeme-site/` — design reference already converted to Astro in SPEC 03 steps 12 to 19 — superseded, recoverable from git history.

Audit result: no other tracked file was deleted. Every file under `src/` has an importer, every file in `public/` is referenced by `src/`, `public/site.webmanifest`, or `src/content/site.json` (`robots.txt` is served by convention and named in `README.md`), and `.nvmrc`, `.editorconfig`, and `tsconfig.json` are tool configuration.

## Acceptance criteria

- [ ] `npm run build` finishes with no errors or warnings.
- [ ] The built `dist/index.html`, `dist/es/index.html`, and `dist/404.html` have the same body markup as the baseline, ignoring Astro's hashed scoped-style class names.
- [ ] `dist/` contains the same files as the baseline, apart from the hashed CSS names.
- [ ] `src/` contains only `components/`, `content/`, `layouts/`, `lib/`, `pages/`, and `styles/`.
- [ ] `src/components/` contains `Home.astro` and exactly the three folders `layout/`, `sections/`, and `ui/`.
- [ ] `src/pages/index.astro` and `src/pages/es/index.astro` each import only `Base`, `Home`, and their locale JSON.
- [ ] `grep -rn "jotaeme-brand\|jotaeme-site" . --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=dist --exclude-dir=specs` returns nothing.
- [ ] `design/brand/` exists, `jotaeme-brand/` and `jotaeme-site/` do not.
- [ ] Every file removed in step 6 is listed under "Deleted files" with its reason.
- [ ] `CLAUDE.md` and `README.md` describe the new tree and name no path that no longer exists.
- [ ] `npm run dev` serves `/` and `/es/` with no console errors, and the loader, globe, and language switcher still work.

## Decisions

- **Yes:** group by role (`layout`, `sections`, `ui`). With 14 components this is enough structure and each folder answers a clear question.
- **No:** one folder per feature with its own CSS. Over-engineering for scoped styles in single files.
- **Yes:** a shared `Home.astro` instead of two duplicated pages. A section change today needs two edits and can drift.
- **No:** `src/pages/[lang]/index.astro` dynamic route. It would change the URL scheme, and English must stay at `/` without a prefix.
- **Yes:** keep the brand kit in this repo, under `design/brand/`. Decision 008 of the personal-branding repo requires it to be public here, and the personal-branding repo holds private material (`privado/`, `certificados/`), so the kit cannot move there.
- **No:** a third repo for the kit. It is the source of tokens, fonts, favicon, and the future `apps`, `free`, and `lab` assets, and the PWA work in SPEC 02 and the subdomains will keep pulling from it.
- **Yes:** delete `jotaeme-site/`. It is a superseded mock-up with off-token colors and Google Fonts, and git history keeps it.
- **Yes:** delete only files with no reference, verified by grep and build. No file is removed on a hunch.
- **Yes:** move `i18n.ts` into `lib/`, so `src/` has no loose files at its top level.
- **No:** touching `src/content/`. The personal-branding repo owns it.

## Risks

| Risk | Mitigation |
| ---- | ---------- |
| A missed import breaks a page | Build after each of steps 2 to 4; the final HTML diff in step 8 catches the rest. |
| Scoped-style hashes change and the HTML diff is noisy | Compare after stripping `data-astro-cid-*` attributes and hashed class names. |
| Brand kit assets are used by path from somewhere outside `src/` | The `grep` in the acceptance criteria covers the whole repo, not just `src/`. |
| The personal-branding repo still documents the old paths | Out of scope here; listed as a follow-up so the doc drift is known. |

## What is **not** in this spec

- Visual, behavioral, or content changes.
- Cursor blink, PWA, and mobile fixes (SPEC 02).
- Moving the brand kit to another repository.
- Changes inside the personal-branding repo.
- New tooling (lint, format, tests).

Each one of those, if it lands, goes in its own spec.
