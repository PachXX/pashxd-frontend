import { createContext, useContext } from 'react';
export const SsrDataContext = createContext(null);

export function useSsrBlogPost() {
  const ctx = useContext(SsrDataContext);
  return ctx && ctx.blogPost ? ctx.blogPost : null;
}

export function useSsrBlogList() {
  const ctx = useContext(SsrDataContext);
  return ctx && Array.isArray(ctx.blogPosts) ? ctx.blogPosts : null;
}
