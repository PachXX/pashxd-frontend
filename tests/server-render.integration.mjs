import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { render } from '../dist-ssr/entry-server.js';
import { renderPage } from '../server/render-page.mjs';
import handler from '../api/render.js';

const template = await readFile(new URL('../dist-ssr/template.html', import.meta.url), 'utf8');
const post = { slug: 'published-after-build', title: 'A newly published article', content: '<p>This article was not present at build time.</p>', excerpt: '</script><script>unsafe()</script>', created_at: '2026-10-07T00:00:00Z', author: 'Pashx Dashboard Team' };

test('newly published articles have complete HTML, metadata and safe hydration data', async () => {
  const response = await renderPage({ route: `/blog/${post.slug}`, template, render, fetchBlog: async slug => { assert.equal(slug, post.slug); return post; } });
  assert.equal(response.status, 200);
  assert.match(response.html, /This article was not present at build time/);
  assert.match(response.html, /<title[^>]*>A newly published article<\/title>/);
  assert.match(response.html, /property="og:type" content="article"/);
  assert.match(response.html, /"@type":"BlogPosting"/);
  assert.match(response.html, /data-prerender-path="\/blog\/published-after-build"/);
  assert.match(response.html, /\\u003c\/script>/);
});

test('removed articles return a rendered noindex 404 rather than a loading shell', async () => {
  const response = await renderPage({ route: '/blog/removed', template, render, fetchBlog: async () => null });
  assert.equal(response.status, 404);
  assert.match(response.html, /Article not found/);
  assert.match(response.html, /name="robots" content="noindex/);
  assert.doesNotMatch(response.html, /Loading article/);
});

test('unknown routes return 404 and safely escape the root route attribute', async () => {
  const response = await renderPage({ route: '/missing"<x>', template, render, fetchBlog: async () => { throw new Error('Must not fetch'); } });
  assert.equal(response.status, 404);
  assert.match(response.html, /data-prerender-path="\/missing&quot;&lt;x&gt;"/);
  assert.match(response.html, /name="robots" content="noindex/);
});

test('the blog list reflects current published content, including an empty list', async () => {
  const response = await renderPage({ route: '/resources', template, render, fetchBlog: async () => ({ blogs: [] }) });
  assert.equal(response.status, 200);
  assert.match(response.html, /Pashx Dashboard Blog/);
});

test('mismatched article responses fail instead of rendering another article', async () => {
  await assert.rejects(renderPage({ route: '/blog/wrong-slug', template, render, fetchBlog: async () => post }), /Invalid article response/);
});

function responseRecorder() {
  return { headers: {}, setHeader(key, value) { this.headers[key] = value; }, status(code) { this.code = code; return this; }, end(body) { this.body = body; return this; } };
}

test('API outages return a retryable noindex 503, not a false article 404', async () => {
  const original = globalThis.fetch;
  globalThis.fetch = async () => ({ status: 503, ok: false });
  try {
    const res = responseRecorder();
    await handler({ method: 'GET', query: { route: '/blog/example' } }, res);
    assert.equal(res.code, 503);
    assert.equal(res.headers['Retry-After'], '60');
    assert.equal(res.headers['X-Robots-Tag'], 'noindex');
    assert.match(res.body, /temporarily unavailable/);
    assert.doesNotMatch(res.body, /Article API returned/);
  } finally { globalThis.fetch = original; }
});

test('HEAD sends no body and unsupported methods are rejected', async () => {
  const head = responseRecorder();
  await handler({ method: 'HEAD', query: { route: '/missing' } }, head);
  assert.equal(head.code, 404);
  assert.equal(head.body, undefined);
  const post = responseRecorder();
  await handler({ method: 'POST', query: { route: '/missing' } }, post);
  assert.equal(post.code, 405);
  assert.equal(post.headers.Allow, 'GET, HEAD');
});
