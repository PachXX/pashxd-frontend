import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";
import Container from "../components/layout/Container";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`${API}/api/blogs/${slug}`);
      if (!response.ok) {
        setError(true);
        return;
      }
      const data = await response.json();
      setPost(data);

      // Update page title
      if (data.meta_title || data.title) {
        document.title = data.meta_title || data.title;
      }
    } catch (error) {
      console.error('Failed to fetch blog post:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

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

  if (error || !post) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#0A2540] mb-4">Article Not Found</h1>
          <p className="text-slate-500 mb-8">The article you're looking for doesn't exist.</p>
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

  return (
    <div className="pt-20 md:pt-24 pb-20">
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
      <Container className="max-w-4xl">
        {/* Category & Meta */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          {post.category && (
            <span className="px-3 py-1 rounded-full bg-green-50 text-[#15803D] text-sm border border-green-100 font-medium">
              {post.category}
            </span>
          )}
          <span className="text-sm text-slate-500 flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {new Date(post.created_at).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
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

        {/* Content */}
        <article className="prose prose-lg prose-slate max-w-none
          prose-headings:text-[#0A2540] prose-headings:font-bold
          prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
          prose-a:text-[#15803D] prose-a:no-underline hover:prose-a:underline
          prose-strong:text-[#0A2540]
          prose-code:text-[#15803D] prose-code:bg-green-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
          prose-pre:bg-slate-900 prose-pre:text-slate-100
          prose-img:rounded-xl prose-img:shadow-lg
        ">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
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

        {/* CTA */}
        <div className="mt-16 p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200">
          <h3 className="text-xl font-bold text-[#0A2540] mb-3">
            Ready to transform your operations?
          </h3>
          <p className="text-slate-600 mb-6">
            See how PashxD can help streamline your procurement and execution workflows.
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