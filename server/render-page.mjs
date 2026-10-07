import { assemblePage } from './document.mjs';

// Only public published content is fetched; request paths never select a host.
export async function renderPage({ route, template, render, fetchBlog }) {
  let data;
  let status = 404;
  if (route === '/resources') {
    const result = await fetchBlog('');
    const posts = Array.isArray(result) ? result : result.blogs;
    if (!Array.isArray(posts)) throw new Error('Invalid article list');
    data = { blogPosts: posts };
    status = 200;
  } else if (/^\/blog\/[^/]+$/.test(route)) {
    const slug = decodeURIComponent(route.slice('/blog/'.length));
    const result = await fetchBlog(encodeURIComponent(slug));
    if (result === null) {
      data = { blogMissing: true };
    } else {
      const post = result.blog || result;
      if (post.slug !== slug || typeof post.content !== 'string' || !post.title) {
        throw new Error('Invalid article response');
      }
      data = { blogPost: post };
      status = 200;
    }
  }
  const { html, head } = render(route, data);
  return { status, html: assemblePage(template, route, html, head, data) };
}
