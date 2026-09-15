import SEOHead from "../components/SEOHead";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, FileText, Search } from "lucide-react";
import Container from "../components/layout/Container";
import { useSsrBlogList } from "../context/SsrDataContext-shared.js";
import { fetchBlogJson, blogDate, blogAuthor } from "../lib/blog";

function embeddedPosts() {
  if (typeof document === 'undefined') return null;
  try {
    return JSON.parse(document.getElementById('ssr-blog-data')?.textContent || 'null')?.blogPosts || null;
  } catch { return null; }
}

export default function ResourcesPage() {
  const ssrBlogs = useSsrBlogList();
  const [blogs, setBlogs] = useState(() => ssrBlogs || embeddedPosts() || []);
  const [loading, setLoading] = useState(() => !(ssrBlogs || embeddedPosts()));
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All topics');

  useEffect(() => {
    const controller = new AbortController();
    fetchBlogJson('', controller.signal).then(data => {
      if (controller.signal.aborted) return;
      if (!Array.isArray(data.blogs)) throw new Error('Invalid article list');
      setBlogs(data.blogs);
      setError(false);
    }).catch(err => {
      if (err.name !== 'AbortError' && !controller.signal.aborted) setError(true);
    }).finally(() => {
      if (!controller.signal.aborted) setLoading(false);
    });
    return () => controller.abort();
  }, [retry]);

  const categories = ['All topics', ...new Set(blogs.map(post => post.category).filter(Boolean))];
  const filtered = blogs.filter(post => (category === 'All topics' || category === post.category) &&
    `${post.title} ${post.excerpt || ''} ${post.author || ''}`.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="pt-24">
      <SEOHead title="Pashx Dashboard Blog | Procurement, Projects & Operations" description="Articles from Pashx Dashboard on procurement, project execution, and AI-assisted operations. Explore practical guides, product updates, and industry perspectives." path="/resources" />
      <section className="bg-[#f4f8f5] py-16 md:py-24 border-b border-slate-200">
        <Container>
          <p className="text-xs font-semibold tracking-[.2em] uppercase text-brand-green mb-5">The Pashx Dashboard journal</p>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-brand-navy max-w-3xl leading-[1.1]">A clearer view of<br /><span className="text-brand-green">real-world operations.</span></h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">Practical guides, product updates, and perspectives on procurement, project execution, and AI. Written by the people behind Pashx Dashboard.</p>
          <Link to="/about" className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-brand-green hover:underline">Meet Pashx Dashboard <ArrowRight size={16} /></Link>
        </Container>
      </section>
      <section className="py-14 md:py-20">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div><h2 className="text-2xl font-semibold text-brand-navy">Latest articles</h2><p className="text-sm text-slate-500 mt-2">Explore a topic or find a specific question.</p></div>
            <div className="flex flex-col sm:flex-row gap-3">
              <label className="relative"><span className="sr-only">Search articles</span><Search size={17} className="absolute left-3 top-3.5 text-slate-400" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search articles" className="w-full rounded-lg border border-slate-300 pl-10 pr-3 py-3 text-sm" /></label>
              <label><span className="sr-only">Filter by topic</span><select value={category} onChange={e => setCategory(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-3 text-sm bg-white">{categories.map(name => <option key={name}>{name}</option>)}</select></label>
            </div>
          </div>
          {error && <div role="status" className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">{blogs.length ? 'Showing the last available articles. We could not refresh the list.' : 'Articles are temporarily unavailable.'} <button className="underline font-semibold ml-2" onClick={() => { setLoading(!blogs.length); setRetry(n => n + 1); }}>Try again</button></div>}
          {loading ? <p role="status" className="py-16 text-center text-slate-500">Loading articles…</p> : !filtered.length ? <p className="py-16 text-center text-slate-500">{blogs.length ? 'No articles match your search. Try another topic or keyword.' : error ? 'Please try again shortly.' : 'Our first articles are on their way. Check back soon.'}</p> : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(post => <Link key={post.id || post.slug} to={`/blog/${post.slug}`} className="group flex flex-col rounded-xl border border-slate-200 overflow-hidden hover:border-green-400 hover:shadow-lg transition focus-visible:outline-2 focus-visible:outline-green-700">
                <div className="h-48 bg-green-50 overflow-hidden flex items-center justify-center">{post.cover_image ? <img src={post.cover_image} alt="" loading="lazy" className="w-full h-full object-cover" onError={event => { event.currentTarget.style.display = 'none'; }} /> : <FileText className="text-green-700/40" size={40} />}</div>
                <div className="p-6 flex flex-col flex-1"><div className="flex flex-wrap items-center gap-3 mb-4 text-xs"><span className="font-medium text-brand-green">{post.category || 'Insights'}</span>{post.reading_time > 0 && <span className="flex items-center gap-1 text-slate-500"><Clock size={12} />{post.reading_time} min read</span>}</div>
                  <h3 className="text-xl font-semibold text-brand-navy leading-snug group-hover:text-brand-green">{post.title}</h3>
                  {post.excerpt && <p className="mt-3 text-sm leading-relaxed text-slate-600 line-clamp-3">{post.excerpt}</p>}
                  <div className="mt-auto pt-6 text-xs text-slate-500"><p className="font-medium text-slate-700 mb-1">{blogAuthor(post.author)}</p><time dateTime={post.published_at || post.created_at}>{blogDate(post.published_at || post.created_at)}</time></div>
                </div>
              </Link>)}
            </div>
          )}
          <div className="mt-16 border-t border-slate-200 pt-8 flex flex-col sm:flex-row justify-between gap-4 text-sm text-slate-600"><p>Have a question or spotted something we should correct?</p><Link className="font-semibold text-brand-green hover:underline" to="/contact">Contact the Pashx Dashboard team →</Link></div>
        </Container>
      </section>
    </div>
  );
}
