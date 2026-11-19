# SPEC 06 — Privacy policy page

> **Status:** Approved
> **Depends on:** SPEC 03 (Implemented), SPEC 04 (Implemented)
> **Date:** 2026-11-19
> **Objective:** Publish a bilingual privacy policy at `/privacy` and `/es/privacy` that covers this site and every app on a `jotaeme.dev` subdomain that uses "Sign in with Google", so the shared Google Cloud project can be published.

## Why this spec exists

The owner created one shared Google Cloud project, `jotaeme-login`, with a generic consent screen (app name `jotaeme`), for every app of theirs that only needs to know who the user is. Each app gets its own OAuth client. The first one is the MCP server at `autodiamante.jotaeme.dev`.

To move that consent screen from "Testing" to "In production", Google asks for a privacy policy URL on an authorized domain (`jotaeme.dev`). One page on this site serves every app of the project, and it does not change when a new app is added.

SPEC 05 kept the footer free of legal text because the site collects no personal data. That still holds for the site itself, so the page is not linked from the footer (see Decisions).

## Scope

**In:**

- Pages `/privacy` (EN) and `/es/privacy` (ES), same slug in both languages like `/lab`.
- Text in `src/content/privacy.json` (owned by this repo), with an `updated` date. `{email}` in a paragraph becomes a `mailto:` link to `site.email`, the address already public in Contact.
- Content: who is responsible, this site (no cookies, analytics or forms; `sessionStorage` flag for the loader; Cloudflare hosting), "Sign in with Google" (only email and `email_verified`, scopes `openid email`), use (identification and access only; no ads, no sale, no sharing except hosting providers or legal duty; in-app data belongs to whoever gave access; Google API Services User Data Policy and Limited Use), retention (sessions end after at most 30 days without use, stored only as a hash; sign-in records kept for security), rights under Colombian Law 1581 of 2012 and revoking access from the Google account, and changes.
- No client or app names: the policy is generic for `*.jotaeme.dev`.
- SEO from SPEC 03 through `Base.astro` with `path="privacy/"`: title, description, canonical, `hreflang`. One `<h1>`.
- `sitemap.xml` lists `privacy/`.
- `CLAUDE.md`: structure and the new content file.

**Out of scope (for future specs):**

- A footer or menu link to the policy.
- Terms of service.
- Per-app policies. An app that needs more data than email gets its own Google Cloud project and its own policy.
- Precaching the page in `public/sw.js`. Navigation is network-first, and the page is cached after the first visit.

## Folder structure

```text
jotaeme-dev/
├── specs/06-privacy-policy.md          this spec
├── src/
│   ├── content/privacy.json            NEW: policy text, EN and ES, and the update date
│   ├── components/Privacy.astro        NEW: body of the page, shared by both languages
│   ├── lib/content.ts                  CHANGED: typed export of the policy
│   ├── lib/i18n.ts                     CHANGED: page title, meta and "Last updated" label
│   └── pages/
│       ├── privacy/index.astro         NEW: EN
│       ├── es/privacy/index.astro      NEW: ES
│       └── sitemap.xml.ts              CHANGED: lists the page
└── CLAUDE.md                            CHANGED
```

## Implementation plan

1. Content file, component, both pages, labels, sitemap.
2. Build and check the generated HTML: one `<h1>`, canonical and `hreflang` pairs, the email link, the date in each language, and the sitemap entry.
3. Owner: review the text, commit, push and check `https://jotaeme.dev/privacy/` after the Cloudflare Pages deploy. Then paste that URL in **Google Auth Platform → Branding → Application privacy policy link** and publish the app.

## Acceptance criteria

- `https://jotaeme.dev/privacy/` and `https://jotaeme.dev/es/privacy/` return 200 with the policy in each language.
- Each page has one `<h1>`, a self-referencing canonical, `hreflang` `en`/`es`/`x-default`, and the update date in its language.
- The email appears as a `mailto:` link, and no `{email}` marker is left in the HTML.
- `sitemap.xml` lists both URLs.
- The text names no client or app.
- Colors and fonts come only from tokens.
- The Google consent screen accepts the URL, and the app can be published.

## Decisions

- **Yes:** one generic policy on this site for every app of the `jotaeme-login` Google Cloud project. The owner chose this over serving the page from the MCP server, which would tie a shared page to one app.
- **Yes:** `/privacy` in both languages, like `/lab`. **No:** `/es/privacidad`, which breaks the same-slug pattern that `Base.astro`, `hreflang` and the language switch rely on.
- **Yes:** the text in its own content file, `privacy.json`, owned by this repo like `labs.json`. **No:** `copy.json`, because a legal text with sections is not site copy.
- **No:** a footer link. SPEC 05 decided the footer has no legal text because the site collects no data, and Google only needs the URL on the consent screen. A link can be added later without touching the page.
- **Yes:** retention written as a commitment every app must keep (sessions end after at most 30 days without use, hashed). The first app, the MCP server, already does this.
