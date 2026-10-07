const escapeAttribute = (value) => value.replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));

export function assemblePage(template, route, html, head, ssrData) {
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
    .replace('<div id="root"></div>', `<div id="root" data-prerender-path="${escapeAttribute(route)}">${html}</div>`);

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

