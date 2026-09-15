// Use the site's API proxy so browser requests never cross origins or follow
// the older Cloud Run backend's HTTPS-to-HTTP trailing-slash redirect.
export const BLOG_API = '';

export async function fetchBlogJson(path, signal) {
  const response = await fetch(`${BLOG_API}/api/blogs${path ? `/${path}` : ''}`, { signal, cache: 'no-store' });
  if (!response.ok) {
    const error = new Error('Unable to load articles');
    error.status = response.status;
    throw error;
  }
  return response.json();
}

export function blogDate(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

export function blogAuthor(value) {
  return !value || value === 'PashxD Team' ? 'Pashx Dashboard Team' : value;
}
