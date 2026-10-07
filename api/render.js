import template from '../dist-ssr/template.js';
import { render } from '../dist-ssr/entry-server.js';
import { renderPage } from '../server/render-page.mjs';

const API = 'https://pashxd-api-214145020309.europe-west1.run.app';

async function fetchBlog(slug) {
  const response = await fetch(`${API}/api/blogs/${slug}`, {
    signal: AbortSignal.timeout(8000),
    headers: { Accept: 'application/json' },
  });
  if (response.status === 404 && slug) return null;
  if (!response.ok) throw new Error(`Article API returned ${response.status}`);
  return response.json();
}

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  if (!['GET', 'HEAD'].includes(req.method)) {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).end();
  }
  const path = req.query?.route;
  if (typeof path !== 'string' || !path.startsWith('/') || path.length > 2048 || (/[?#]/.test(path) || [...path].some(char => char.charCodeAt(0) < 32))) {
    return res.status(400).end();
  }
  const route = path.replace(/\/$/, '') || '/';
  try {
    const page = await renderPage({ route, template: await template, render, fetchBlog });
    if (page.status === 404) res.setHeader('X-Robots-Tag', 'noindex');
    return res.status(page.status).end(req.method === 'HEAD' ? undefined : page.html);
  } catch (error) {
    console.error('Public article rendering failed:', error.message);
    res.setHeader('X-Robots-Tag', 'noindex');
    res.setHeader('Retry-After', '60');
    return res.status(503).end(req.method === 'HEAD' ? undefined : '<!doctype html><html lang="en"><head><meta name="robots" content="noindex"><title>Temporarily unavailable | Pashx Dashboard</title></head><body><main><h1>This page is temporarily unavailable</h1><p>Please try again shortly.</p><a href="/">Pashx Dashboard home</a></main></body></html>');
  }
}
