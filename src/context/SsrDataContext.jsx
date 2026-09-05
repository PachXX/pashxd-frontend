import { createContext, useContext } from "react";

/**
 * SSR data channel between the build-time prerenderer (src/entry-server.jsx)
 * and pages that normally load their content from the API in a useEffect.
 *
 * The prerenderer renders each route once at build time with renderToString,
 * which never runs effects — so a page like BlogPostPage would otherwise only
 * be able to render its "Loading…" skeleton into the static HTML that crawlers
 * read. The prerenderer fetches the real content itself and hands it down
 * through this provider; the page seeds its initial state from it.
 *
 * On the client this provider is absent, and the page instead reads the same
 * payload back from a JSON <script> tag the prerenderer inlined next to the
 * markup (see scripts/prerender.mjs and the readEmbeddedBlogPost helper in
 * BlogPostPage), so hydration starts from the exact markup the server sent
 * instead of blanking it with a spinner.
 */
export const SsrDataContext = createContext(null);

export function SsrDataProvider({ value, children }) {
  return (
    <SsrDataContext.Provider value={value || null}>
      {children}
    </SsrDataContext.Provider>
  );
}

/** The blog post payload supplied for the currently rendered route, if any. */
export function useSsrBlogPost() {
  const ctx = useContext(SsrDataContext);
  return ctx && ctx.blogPost ? ctx.blogPost : null;
}

/** The blog index (list of posts) supplied for routes that render the grid. */
export function useSsrBlogList() {
  const ctx = useContext(SsrDataContext);
  return ctx && Array.isArray(ctx.blogPosts) ? ctx.blogPosts : null;
}
