/**
 * Build-time prerenderer.
 *
 * Runs after `vite build` (client) and `vite build --ssr` (server bundle).
 * For each public route it renders the app to HTML, splices the markup and the
 * Helmet-produced <head> tags into the built index.html, and writes the result
 * to dist/<route>/index.html.
 *
 * Why this exists: the site is a client-rendered SPA whose per-page titles,
 * descriptions, canonicals, Open Graph tags and JSON-LD are all produced by
 * react-helmet-async *after* hydration. Anything that reads HTML without
 * executing JavaScript — link unfurlers, crawlers, any HTML-only fetch of the
 * page — saw an empty root and the placeholder title in index.html.
 *
 * Blog posts ARE prerendered here too. Their content lives in the backend API,
 * so this script fetches the post list and every post's full detail at build
 * time, renders each /blog/:slug to dist/blog/<slug>/index.html with the real
 * body copy, and inlines the post JSON next to the markup so the client can
 * hydrate from the exact same content instead of blanking the page while it
 * refetches. The trade-off is the normal SSG one: a post edited after deploy
 * is refreshed on the next deploy. Vercel evaluates filesystem routes before
 * rewrites, so the generated files are served as-is for their exact URLs; a
 * brand-new post published after a deploy still falls through to the SPA
 * catch-all until the next build.
 *
 * What it deliberately does NOT prerender:
 *   - /login, /admin/* — authenticated screens with nothing public to emit.
 *
 * Failure policy: this script exits non-zero on any route that fails to
 * render. Silently shipping a route with an empty <div id="root"> would look
 * exactly like success while quietly reverting this route to the old
 * behaviour, and nobody would notice until a share preview came back blank.
 *
 * Blog data source: the same API the client calls. It can rate-limit bursts
 * (429), so fetching retries with backoff against a rotating list of known
 * hosts. If every host is unreachable, a last-known-good snapshot written to
 * scripts/.prerender-cache/blogs.json by the previous successful run is used
 * rather than letting the whole deploy fail; the log says which source won.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const ssrEntry = path.join(root, "dist-ssr", "entry-server.js");
const cacheDir = path.join(__dirname, ".prerender-cache");
const blogCacheFile = path.join(cacheDir, "blogs.json");

/** Public marketing routes worth having as static HTML. */
const ROUTES = [
  "/",
  "/platform",
  "/product",
  "/pricing",
  "/industries",
  "/about",
  "/resources",
  "/contact",
  "/marketplace",
  "/book-demo",
  "/terms",
  "/privacy",
];

/** Known backend API hosts, tried in order on 429/5xx/network failure. */
const API_HOSTS = [
  process.env.VITE_API_URL || "https://pashxd-api-q2ccs4ytaq-ew.a.run.app",
  "https://pashxd-api-214145020309.europe-west1.run.app",
  "https://pashxd-backend.onrender.com",
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Fetch JSON with retry + backoff across all known API hosts. */
async function fetchJson(pathname, attempt = 0) {
  const host = API_HOSTS[attempt % API_HOSTS.length];
  const url = host.replace(/\/$/, "") + pathname;
  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(25000),
    });
    if (res.status === 429 || res.status >= 500) {
      throw new Error(`HTTP ${res.status} from ${host}`);
    }
    if (!res.ok) throw new Error(`HTTP ${res.status} from ${host}`);
    return await res.json();
  } catch (err) {
    const tries = attempt + 1;
    const totalHosts = API_HOSTS.length;
    const cycles = Math.floor(tries / totalHosts);
    if (cycles < 2) {
      // Back off longer on rate limits (429) than on plain errors.
      const backoff = (err.message.includes("429") ? 15000 : 3000) * (cycles + 1);
      console.warn(`  … ${url} failed (${err.message}); retrying in ${backoff / 1000}s`);
      await sleep(backoff);
      return fetchJson(pathname, attempt + 1);
    }
    throw new Error(`giving up on ${pathname} after ${tries} attempts: ${err.message}`);
  }
}

/**
 * Loads the full blog surface: the index (list order, exactly as the API
 * returns it — /resources renders it) plus every post's full detail (the
 * list endpoint omits meta_title/meta_description, which the detail endpoint
 * includes). Cached under scripts/.prerender-cache/blogs.json so a build can
 * still run when the API is rate-limiting or down.
 */
async function fetchBlogContent() {
  const list = await fetchJson("/api/blogs");
  const index = Array.isArray(list) ? list : list.blogs;
  if (!Array.isArray(index) || index.length === 0) {
    throw new Error("blog list endpoint returned no posts");
  }
  // Fetch details with modest concurrency (the API rate-limits bursts).
  const postsOut = [];
  let cursor = 0;
  async function worker() {
    while (cursor < index.length) {
      const item = index[cursor++];
      const slug = item.slug || item.id;
      try {
        const detail = await fetchJson(`/api/blogs/${encodeURIComponent(slug)}`);
        postsOut.push(detail.blog || detail);
      } catch (err) {
        console.warn(`  … skipping post "${slug}": ${err.message}`);
      }
    }
  }
  await Promise.all([worker(), worker(), worker(), worker()]);
  if (postsOut.length === 0) {
    throw new Error("could not fetch a single blog post detail");
  }
  if (postsOut.length < index.length) {
    console.warn(
      `  ⚠ fetched ${postsOut.length}/${index.length} blog posts; ${index.length - postsOut.length} will not be prerendered.`
    );
  }
  const posts = postsOut.sort((a, b) => (a.slug || "").localeCompare(b.slug || ""));
  return { index, posts };
}

async function loadBlogContent() {
  try {
    const fresh = await fetchBlogContent();
    try {
      await mkdir(cacheDir, { recursive: true });
      await writeFile(blogCacheFile, JSON.stringify(fresh), "utf-8");
      console.log(`  ℹ blog content fetched live from the API (${fresh.index.length} posts)`);
    } catch (cacheErr) {
      console.warn(`  ⚠ could not write blog cache: ${cacheErr.message}`);
    }
    return fresh;
  } catch (err) {
    console.warn(`  ⚠ live blog fetch failed: ${err.message}`);
    try {
      const cached = JSON.parse(await readFile(blogCacheFile, "utf-8"));
      const index = cached.index || cached;
      const posts = cached.posts || cached;
      console.warn(`  ℹ falling back to cached blog snapshot (${index.length} posts)`);
      return { index, posts };
    } catch {
      throw new Error(
        "blog content is unavailable (live API failed and no cache exists). " +
          "Refusing to ship blog routes as empty SPA shells — fix the API or " +
          "restore the cache and rebuild."
      );
    }
  }
}

/** Where a route's index.html goes inside dist/. */
function outputPathFor(route) {
  return route === "/"
    ? path.join(distDir, "index.html")
    : path.join(distDir, route.replace(/^\//, ""), "index.html");
}

/**
 * Turn a rendered route into a complete HTML document: strip the dev-mode
 * placeholder <title>, inject Helmet's head tags, and drop the markup into
 * the #root mount point. Enforces exactly one <title> per page.
 */
function assemblePage(template, route, html, head, ssrData) {
  if (!html || html.length < 500) {
    throw new Error(
      `Route ${route} rendered ${html?.length ?? 0} bytes of HTML, which means ` +
        "it did not actually render. Refusing to write an empty page."
    );
  }

  // index.html carries a placeholder <title> for `vite dev`, where Helmet
  // only takes over after hydration. In a prerendered file it would sit
  // *above* the real one, and a crawler reads the first match — so every page
  // would still report the old homepage title. Strip it here rather than
  // deleting it from index.html, which dev mode still needs.
  let page = template
    .replace(/\n?\s*<title>[\s\S]*?<\/title>/, "")
    .replace("</head>", `    ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);

  // For data-driven routes (blog posts) the client must be able to hydrate
  // from the same content the server rendered, otherwise it would blank the
  // page and refetch. Inline the payload as JSON right after the markup.
  if (ssrData) {
    const safeJson = JSON.stringify(ssrData).replace(/</g, "\\u003c");
    page = page.replace(
      "</body>",
      `  <script id="ssr-blog-data" type="application/json">${safeJson}</script>\n</body>`
    );
  }

  // Count titles in the <head> only. Article bodies are free to include
  // code samples containing literal <title> markup (e.g. a pasted HTML
  // wireframe) — those live inside #root and never affect document.title.
  const headEnd = page.indexOf("</head>");
  const headSection = headEnd === -1 ? page : page.slice(0, headEnd);
  const titleCount = (headSection.match(/<title[\s>]/g) || []).length;
  if (titleCount !== 1) {
    throw new Error(
      `Route ${route} produced ${titleCount} <title> tags. Exactly one is ` +
        "required — more than one means crawlers read the wrong page title."
    );
  }
  return page;
}

async function writeRoute(template, route, ssrData, { render }) {
  const { html, head } = render(route, ssrData);
  const page = assemblePage(template, route, html, head, ssrData);
  const outFile = outputPathFor(route);
  await mkdir(path.dirname(outFile), { recursive: true });
  await writeFile(outFile, page, "utf-8");
  console.log(
    `  prerendered ${route.padEnd(16)} → ${path.relative(root, outFile).padEnd(30)} ${(page.length / 1024).toFixed(1)} kB`
  );
  return outFile;
}

async function main() {
  const template = await readFile(path.join(distDir, "index.html"), "utf-8");
  const { render } = await import(ssrEntry);

  if (!template.includes('<div id="root"></div>')) {
    throw new Error(
      'dist/index.html does not contain the expected `<div id="root"></div>` ' +
        "mount point — prerendering would produce pages the client cannot hydrate."
    );
  }

  let count = 0;

  // 1) Static marketing routes. /resources renders the blog index, so it is
  //    deferred until the blog content has been fetched below.
  const blogRoutes = new Set(["/resources"]);

  // 2) Blog content — comes from the API; fetch it now so crawlers receive
  //    full articles (not loading shells) and the /resources grid ships with
  //    its links to every post instead of an empty list.
  const { index: blogIndex, posts } = await loadBlogContent();

  for (const route of ROUTES) {
    const ssrData = route === "/resources" ? { blogPosts: blogIndex } : undefined;
    await writeRoute(template, route, ssrData, { render });
    count += 1;
    blogRoutes.delete(route);
  }

  // 3) Each blog post as its own page.
  for (const post of posts) {
    const slug = post.slug;
    if (!slug) {
      console.warn(`  ⚠ skipping blog post without a slug (id: ${post.id})`);
      continue;
    }
    await writeRoute(template, `/blog/${slug}`, { blogPost: post }, { render });
    count += 1;
  }

  console.log(
    `\n✓ prerendered ${count} pages (${ROUTES.length} routes + ${posts.length} blog posts)`
  );
}

main().catch((err) => {
  console.error("\n✗ prerender failed:", err);
  process.exit(1);
});
