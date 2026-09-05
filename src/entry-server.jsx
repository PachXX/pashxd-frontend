import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
// react-router v7 collapsed the old `react-router-dom/server` entry point;
// StaticRouter is exported from `react-router` itself now. Importing it from
// the v6 path fails the SSR build outright rather than at runtime, which is
// the good outcome — but the working import is this one.
import { StaticRouter } from "react-router";
import { HelmetProvider } from "react-helmet-async";

import { AppRoutes } from "./App";
import { AuthProvider } from "./context/AuthContext.jsx";
import { SsrDataProvider } from "./context/SsrDataContext.jsx";

/**
 * Build-time entry point for prerendering. Never shipped to the browser.
 *
 * The site is a client-rendered SPA, so a crawler that does not execute
 * JavaScript — and every social-card unfurler — saw an empty <div id="root">
 * and the placeholder <title> from index.html. All the per-page metadata that
 * SEOHead renders through react-helmet-async only existed after hydration.
 *
 * This renders each marketing route to static HTML at build time and captures
 * the head tags Helmet produced for it, so the shipped index.html for that
 * route already contains its real title, description, canonical, Open Graph
 * tags and JSON-LD. The client bundle then hydrates over the top exactly as
 * before — nothing about the runtime app changes.
 *
 * `AppRoutes` is imported rather than `App` because App owns the BrowserRouter,
 * which cannot run without a DOM; StaticRouter takes its place here.
 *
 * @param {string} url    The route to render (e.g. "/blog/my-post").
 * @param {object} [ssrData] Per-route data the prerenderer already fetched
 *                          (e.g. { blogPost }). Passed through SsrDataProvider
 *                          so data-driven pages render real content instead of
 *                          their loading skeleton. Optional — static routes
 *                          render fine without it.
 */
export function render(url, ssrData) {
  const helmetContext = {};

  const html = renderToString(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <SsrDataProvider value={ssrData}>
          <AuthProvider>
            <StaticRouter location={url}>
              <AppRoutes />
            </StaticRouter>
          </AuthProvider>
        </SsrDataProvider>
      </HelmetProvider>
    </StrictMode>
  );

  const { helmet } = helmetContext;

  // Helmet's toString() output is already escaped markup. Order matters only
  // for readability; crawlers read the first matching tag, and index.html
  // deliberately ships no competing description/og tags.
  const head = helmet
    ? [
        helmet.title.toString(),
        helmet.meta.toString(),
        helmet.link.toString(),
        helmet.script.toString(),
      ]
        .filter(Boolean)
        .join("\n    ")
    : "";

  return { html, head };
}
