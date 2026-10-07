/** Static marketing pages; articles and their index render from live published data. */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assemblePage } from '../server/document.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const routes = ['/', '/platform', '/product', '/pricing', '/industries', '/about', '/contact', '/marketplace', '/book-demo', '/terms', '/privacy'];

async function main() {
  const template = await readFile(path.join(dist, 'index.html'), 'utf8');
  if (!template.includes('<div id="root"></div>')) {
    throw new Error('Built HTML is missing the expected root mount point');
  }
  const { render } = await import(path.join(root, 'dist-ssr', 'entry-server.js'));
  // Keep the unrendered shell outside dist, available only to the server function.
  await writeFile(path.join(root, 'dist-ssr', 'template.html'), template);
  await writeFile(path.join(root, 'dist-ssr', 'template.js'), `export default ${JSON.stringify(template)};\n`);
  for (const route of routes) {
    const { html, head } = render(route);
    const output = route === '/' ? path.join(dist, 'index.html') : path.join(dist, route.slice(1), 'index.html');
    await mkdir(path.dirname(output), { recursive: true });
    await writeFile(output, assemblePage(template, route, html, head), 'utf8');
  }
  console.log(`Prerendered ${routes.length} marketing pages; blog HTML is rendered at request time.`);
}

main().catch(error => {
  console.error('Prerender failed:', error);
  process.exit(1);
});
