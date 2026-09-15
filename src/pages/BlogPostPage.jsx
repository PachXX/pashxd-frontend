import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";
import Container from "../components/layout/Container";
import SEOHead from "../components/SEOHead";
import { useSsrBlogPost } from "../context/SsrDataContext-shared.js";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import "../styles/blog-content.css";
import { fetchBlogJson, blogDate, blogAuthor } from "../lib/blog";



/**
 * Article bodies (custom_html) carry their own <h1 class="post-title"> — the
 * CMS template repeats the headline inside the content, and the page already
 * renders the article title as the one real <h1> above the body. Two <h1>s
 * on a page splits the heading structure crawlers read, so any <h1> inside
 * the article body is demoted to <h2> before injection. <pre>/<style>/<script>
 * blocks are skipped: they often contain code samples that legitimately show
 * raw HTML with <h1> (or <title>) tags, which must not be rewritten.
 */
function demoteArticleH1s(html) {
  if (!html) return html;
  let processed = "";
  let cursor = 0;
  const skip = /<(pre|style|script)[\s>][\s\S]*?<\/\1>/gi;
  let match;
  while ((match = skip.exec(html)) !== null) {
    processed += html.slice(cursor, match.index);
    processed += match[0];
    cursor = match.index + match[0].length;
  }
  processed += html.slice(cursor);
  return processed
    .replace(/<h1([\s>])/gi, "<h2$1")
    .replace(/<\/h1>/gi, "</h2>");
}

/**
 * ID of the JSON <script> tag that scripts/prerender.mjs inlines next to the
 * static markup of every prerendered blog post. Reading it lets the client
 * boot from the exact post the server rendered instead of blanking the page
 * with the loading skeleton until the API responds again.
 */
const SSR_BLOG_DATA_ID = "ssr-blog-data";

// Parsed once per page load and cached: React StrictMode double-invokes state
// initializers in development, and the second call must see the same payload
// (re-reading after removing the tag would return null and drop the content).
let embeddedPostCache = null;
let embeddedPostRead = false;
function readEmbeddedBlogPost() {
  if (embeddedPostRead) return embeddedPostCache;
  embeddedPostRead = true;
  if (typeof document === "undefined") return null;
  const el = document.getElementById(SSR_BLOG_DATA_ID);
  if (!el) return null;
  try {
    const data = JSON.parse(el.textContent || "null");
    el.remove(); // one-shot: a client-side nav to another slug must refetch
    embeddedPostCache = data && data.blogPost ? data.blogPost : null;
  } catch {
    embeddedPostCache = null;
  }
  return embeddedPostCache;
}

export default function BlogPostPage() {
  const { slug } = useParams();
  // During the build-time prerender the post arrives via SsrDataContext; in
  // the browser the same payload is read back from the inlined <script> tag,
  // so hydration starts from identical markup (no spinner flash, no refetch).
  const ssrPost = useSsrBlogPost();
  const [storedPost, setPost] = useState(() => {
    const initial = ssrPost || readEmbeddedBlogPost();
    return initial?.slug === slug ? initial : null;
  });
  const [request, setRequest] = useState({ slug, loading: !storedPost, error: null });
  const [retry, setRetry] = useState(0);
  const post = storedPost?.slug === slug ? storedPost : null;
  const loading = !post && (request.slug !== slug || request.loading);
  const error = request.slug === slug ? request.error : null;

  useEffect(() => {
    const controller = new AbortController();
    // Revalidate even when static HTML supplied the post: admin edits and
    // unpublishing must be reflected without waiting for another site build.
    fetchBlogJson(encodeURIComponent(slug), controller.signal).then(data => {
      if (controller.signal.aborted) return;
      if (data.slug !== slug) throw new Error('Article response did not match its URL');
      setPost(data);
      setRequest({ slug, loading: false, error: null });
    }).catch(err => {
      if (controller.signal.aborted) return;
      if (err.status === 404) setPost(null);
      setRequest({ slug, loading: false, error: err.status === 404 ? 'missing' : 'network' });
    });
    return () => controller.abort();
  }, [slug, retry]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#15803D]"></div>
          <p className="text-slate-500 mt-4">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <SEOHead title={error === 'network' ? "Article temporarily unavailable | Pashx Dashboard" : "Article Not Found | Pashx Dashboard"} description="Explore articles from Pashx Dashboard." path={`/blog/${slug}`} noIndex />
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#0A2540] mb-4">{error === 'network' ? 'Unable to load this article' : 'Article not found'}</h1>
          <p className="text-slate-500 mb-8">{error === 'network' ? 'Please try again. There may be a temporary connection problem.' : 'This article may have been removed or is no longer published.'}</p>
          {error === 'network' && <button className="block mx-auto mb-6 text-brand-green underline" onClick={() => { setRequest({ slug, loading: true, error: null }); setRetry(n => n + 1); }}>Try again</button>}
          <Link
            to="/resources"
            className="inline-flex items-center gap-2 text-[#15803D] font-semibold hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Resources
          </Link>
        </div>
      </div>
    );
  }

  const metaDescription =
    post.meta_description || post.excerpt || `${post.title}. Analysis and practical guidance from Pashx Dashboard.`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.meta_title || post.title,
    "description": metaDescription,
    "image": post.og_image || post.cover_image || undefined,
    "datePublished": post.published_at || post.created_at,
    "dateModified": post.updated_at || post.created_at,
    "author": { "@type": blogAuthor(post.author) === "Pashx Dashboard Team" ? "Organization" : "Person", "name": blogAuthor(post.author) },
    "publisher": {
      "@type": "Organization",
      "name": "Pashx Dashboard",
      "logo": { "@type": "ImageObject", "url": "https://pashx.com/og-image.png" },
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": `https://pashx.com/blog/${post.slug}` },
  };

  return (
    <div className="pt-28 md:pt-36 pb-20">
      <SEOHead
        title={post.meta_title || post.title}
        description={metaDescription}
        path={`/blog/${post.slug}`}
        image={post.og_image || post.cover_image || undefined}
        type="article"
        publishedTime={post.published_at || post.created_at}
        modifiedTime={post.updated_at}
        author={blogAuthor(post.author)}
        jsonLd={jsonLd}
      />
      {error === 'network' && <Container><p role="status" className="mb-6 text-sm text-amber-800">Showing the last available version. <button className="underline" onClick={() => setRetry(n => n + 1)}>Retry update</button></p></Container>}
      {/* Back Button */}
      <Container className="mb-8">
        <Link
          to="/resources"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-[#15803D] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Resources
        </Link>
      </Container>

      {/* Hero */}
      <Container className="!max-w-4xl">
        {/* Category & Meta */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          {post.category && (
            <span className="px-3 py-1 rounded-full bg-green-50 text-[#15803D] text-sm border border-green-100 font-medium">
              {post.category}
            </span>
          )}
          <span className="text-sm text-slate-500 flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <time dateTime={post.published_at || post.created_at}>{blogDate(post.published_at || post.created_at)}</time>
          </span>
          {post.reading_time && (
            <span className="text-sm text-slate-500 flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.reading_time} min read
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A2540] leading-tight mb-6">
          {post.title}
        </h1>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8">
            {post.excerpt}
          </p>
        )}

        <div className="mb-8 border-y border-slate-200 py-5 text-sm">
          <p className="font-semibold text-brand-navy">By {blogAuthor(post.author)}</p>
          {post.author_bio && <p className="mt-2 max-w-2xl leading-relaxed text-slate-600">{post.author_bio}</p>}
          {post.updated_at && blogDate(post.updated_at) !== blogDate(post.published_at || post.created_at) && <p className="mt-2 text-xs text-slate-500">Updated <time dateTime={post.updated_at}>{blogDate(post.updated_at)}</time></p>}
        </div>
        {/* Cover Image */}
        {post.cover_image && (
          <div className="mb-12 rounded-2xl overflow-hidden shadow-xl">
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Content - ✅ FIXED: Support both Markdown and HTML */}
        <article className="blog-post-body prose prose-lg prose-slate max-w-none
          prose-headings:text-[#0A2540] prose-headings:font-bold
          prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
          prose-a:text-[#15803D] prose-a:no-underline hover:prose-a:underline
          prose-strong:text-[#0A2540]
          prose-code:text-[#15803D] prose-code:bg-green-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
          prose-pre:bg-slate-900 prose-pre:text-slate-100
          prose-img:rounded-xl prose-img:shadow-lg
        ">
          {/* Render Markdown — bodies must not add their own <h1> on top of
              the article title rendered above, so h1s from the markdown are
              rendered as h2s. */}
          {post.content_type === 'markdown' || !post.content_type ? (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: (props) => <h2 {...props} />,
              }}
            >
              {post.content}
            </ReactMarkdown>
          ) : null}

          {/* Render HTML */}
          {post.content_type === 'html' && post.custom_html ? (
            <>
              {post.custom_css && (
                <style dangerouslySetInnerHTML={{__html: post.custom_css}} />
              )}
              <div dangerouslySetInnerHTML={{__html: demoteArticleH1s(post.custom_html)}} />
            </>
          ) : null}
        </article>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-slate-200">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-4 h-4 text-slate-400" />
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 text-sm text-slate-600 border-t border-slate-200 pt-6">Questions or corrections? <Link to="/contact" className="text-brand-green underline">Contact our team</Link>. <Link to="/resources" className="text-brand-green underline">Read more articles</Link>.</div>
        {/* CTA */}
        <div className="mt-16 p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200">
          <h3 className="text-xl font-bold text-[#0A2540] mb-3">
            Ready to transform your operations?
          </h3>
          <p className="text-slate-600 mb-6">
            See how Pashx Dashboard can help streamline your procurement and execution workflows.
          </p>
          <Link
            to="/book-demo"
            className="inline-flex items-center gap-2 bg-[#15803D] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#166534] transition"
          >
            Book a Demo
          </Link>
        </div>
      </Container>
    </div>
  );
}
