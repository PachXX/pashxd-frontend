# Routing and prerendering

`vercel.json` cannot hold comments, so the reasoning lives here.

## The per-route rewrites

`npm run build` runs three steps:

1. `vite build` — the client bundle.
2. `vite build --ssr src/entry-server.jsx --outDir dist-ssr` — a Node-loadable
   copy of the app used only at build time.
3. `node scripts/prerender.mjs` — renders each public marketing route to static
   HTML and writes `dist/<route>/index.html`, with that page's real `<title>`,
   description, canonical, Open Graph tags and JSON-LD already in the `<head>`.

Without prerendering, anything that reads HTML without executing JavaScript —
link unfurlers, non-JS crawlers, a plain `curl` — saw an empty `<div id="root">`
and the placeholder title from `index.html`. All the per-page metadata that
`SEOHead` renders through react-helmet-async only appeared after hydration.

The block of one-route-per-line rewrites in `vercel.json` points each route at
its own generated file **explicitly**, rather than relying on implicit
directory-index resolution. If that resolution ever does not happen, the route
falls through to the `/(.*) → /index.html` catch-all and is served the
homepage's markup and metadata under its own URL — which is worse than not
prerendering at all, and looks like success from the browser because the SPA
hydrates over it and renders the right page anyway. Being explicit makes the
failure mode a 404 during review instead of silently wrong metadata in
production.

**When adding a public marketing route, change three places:**

1. `src/App.jsx` — the `AppRoutes` table (used by both the browser and the
   prerenderer).
2. `scripts/prerender.mjs` — the `ROUTES` array.
3. `vercel.json` — a rewrite above the catch-all.

Miss step 2 and the route ships client-rendered with no metadata. Miss step 3
and it ships with the homepage's metadata.

## Blog posts ARE prerendered

Earlier versions of this file deliberately skipped `/blog/:slug` because
content comes from the API. That left every blog URL on the SPA catch-all:
crawlers received the homepage document (or, pre-prerendering, an empty
shell) under each post's URL — which is why the audit found zero content
across the blog.

Now `scripts/prerender.mjs` fetches the post list and every post's full detail
from the backend at build time and writes `dist/blog/<slug>/index.html` for
each one, exactly like the static routes. Each file contains the rendered
article body, its real `<title>`/description/JSON-LD, the site nav and footer,
and an inline `#ssr-blog-data` JSON payload so the client can hydrate from the
same content instead of blanking the page while it refetches. The trade-off is
the standard SSG one: an edited post is refreshed on the next deploy.

Vercel evaluates filesystem routes **before** rewrites, so no per-post rewrite
entries are needed: a `dist/blog/<slug>/index.html` file is served for
`GET /blog/<slug>` directly. A post published after a deploy has no static
file yet and falls through to the `/(.*)` catch-all until the next build.

## What is deliberately not prerendered

- `/login`, `/admin/*` — authenticated screens with nothing public to emit.

These still work: they fall through to the catch-all and boot as the SPA, which
is exactly how the whole site behaved before.

## Verifying locally

`vite preview` does **not** reproduce Vercel's routing: it applies its own SPA
fallback, so `curl localhost:4173/platform` returns the *homepage* document
even though `dist/platform/index.html` exists and is correct. That is a quirk
of the preview server, not a broken build — and it is a live demonstration of
why the explicit rewrites above are not optional.

To check the output itself, request the file path:

```bash
curl -s http://localhost:4173/platform/index.html | grep -o "<title[^>]*>[^<]*</title>"
```

Per-route serving can only be confirmed on a real Vercel deployment (a preview
deployment is enough).

## Hydration

`src/main.jsx` calls `hydrateRoot` when `#root` already has children and
`createRoot` when it does not, so the same entry point serves both the
prerendered production build and `vite dev` (which serves the untouched
`index.html` with an empty root).

`scripts/prerender.mjs` strips the placeholder `<title>` from the template
before injecting Helmet's tags. That placeholder has to stay in `index.html`
for dev mode, but in a prerendered file it would sit *above* the real title,
and crawlers read the first match. The script asserts exactly one `<title>`
per page and fails the build otherwise.
