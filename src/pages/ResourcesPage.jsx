import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, FileText, Video, ArrowRight, Clock } from "lucide-react";
import Container from "../components/layout/Container";

const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const resources = [
  {
    icon: FileText,
    title: "Construction Management Framework",
    desc: "A practical framework covering procurement, execution, and cost control.",
    type: "PDF",
  },
  {
    icon: Video,
    title: "PashxD Product Tour",
    desc: "See how the platform works in under 5 minutes.",
    type: "Video",
  },
  {
    icon: BookOpen,
    title: "ROI Calculator Guide",
    desc: "Calculate savings from unified operations.",
    type: "PDF",
  },
];

const categoryColors = {
  "Technology": "bg-blue-50 text-blue-600 border-blue-100",
  "Industry": "bg-purple-50 text-purple-600 border-purple-100",
  "Product": "bg-green-50 text-[#15803D] border-green-100",
  "News": "bg-red-50 text-red-600 border-red-100",
  "Tutorial": "bg-amber-50 text-amber-600 border-amber-100",
  "Case Study": "bg-cyan-50 text-cyan-600 border-cyan-100",
};

export default function ResourcesPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${API}/api/blogs/`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setBlogs(data.blogs || []);
      setError(false);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 md:pt-24">

      {/* HERO */}
      <section className="py-20 md:py-28 bg-[#F8FAFC]">
        <Container className="text-center">
          <p className="text-xs md:text-sm font-semibold tracking-[0.25em] text-[#15803D] uppercase mb-5 md:mb-6 animate-fade-in">
            Resources
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-[3.5rem] leading-[1.1] font-extrabold text-[#0A2540] tracking-tight max-w-4xl mx-auto mb-5 md:mb-6 animate-fade-in-up">
            Insights &{" "}
            <span className="bg-gradient-to-r from-[#15803D] to-[#22C55E] bg-clip-text text-transparent">
              Best Practices
            </span>
          </h1>

          <p className="text-base md:text-lg text-slate-500 max-w-xl mx-auto leading-relaxed animate-fade-in-up animation-delay-100">
            Learn how leading teams optimize procurement, execution, and operations with AI.
          </p>
        </Container>
      </section>

      {/* FEATURED RESOURCES */}
      <section className="py-16 md:py-20 bg-white">
        <Container>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0A2540] mb-8 md:mb-10 text-center">
            Featured Resources
          </h2>

          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {resources.map((r, i) => (
              <div
                key={r.title}
                className="bg-white border border-slate-200 rounded-2xl p-6 md:p-7 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-green-200 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center">
                    <r.icon className="w-5 h-5 text-[#15803D]" />
                  </div>

                  <span className="text-[10px] bg-slate-100 px-2.5 py-1 rounded-full text-slate-500 font-semibold uppercase tracking-wider">
                    {r.type}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-[#0A2540] mb-2">
                  {r.title}
                </h3>

                <p className="text-sm text-slate-500 leading-relaxed">
                  {r.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* BLOG ARTICLES */}
      <section className="py-20 md:py-24 bg-[#F8FAFC]">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0A2540]">
              Latest Articles
            </h2>
            {!loading && !error && (
              <span className="text-sm text-slate-500">
                {blogs.length} article{blogs.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-[#15803D]"></div>
              <p className="text-slate-500 mt-4">Loading articles...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20 bg-white border border-red-200 rounded-2xl p-8">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-red-500" />
              </div>
              <p className="text-red-600 text-lg font-medium mb-2">Failed to load articles</p>
              <p className="text-slate-500 text-sm mb-6">Please check your connection and try again</p>
              <button
                onClick={fetchBlogs}
                className="px-6 py-2 bg-[#15803D] text-white rounded-full hover:bg-[#166534] transition"
              >
                Retry
              </button>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl p-8">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-slate-300" />
              </div>
              <p className="text-slate-700 text-lg font-medium mb-2">No articles published yet</p>
              <p className="text-slate-500 text-sm">Check back soon for insights and best practices!</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {blogs.map((post, i) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group block animate-fade-in-up"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {/* IMAGE */}
                  <div className="overflow-hidden bg-slate-50">
                    {post.cover_image ? (
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="h-44 md:h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="h-44 md:h-48 w-full bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
                        <FileText className="w-12 h-12 text-green-600/40" />
                      </div>
                    )}
                  </div>

                  {/* CONTENT */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      {post.category && (
                        <span
                          className={`text-[10px] md:text-xs px-2 py-1 rounded-full border font-medium ${
                            categoryColors[post.category] ||
                            "bg-gray-50 text-gray-500 border-gray-100"
                          }`}
                        >
                          {post.category}
                        </span>
                      )}

                      {post.reading_time > 0 && (
                        <span className="text-[10px] md:text-xs text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.reading_time} min read
                        </span>
                      )}
                    </div>

                    <h3 className="text-base md:text-lg font-semibold text-[#0A2540] group-hover:text-[#15803D] transition-colors leading-snug line-clamp-2 mb-2">
                      {post.title}
                    </h3>

                    {post.excerpt && (
                      <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed mb-3">
                        {post.excerpt}
                      </p>
                    )}

                    <p className="text-xs text-slate-400">
                      {new Date(post.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24 bg-white">
        <Container className="max-w-4xl">
          <div className="bg-gradient-to-br from-[#15803D] to-[#166534] rounded-3xl p-8 md:p-12 text-center shadow-[0_20px_60px_rgba(21,128,61,0.25)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-400/20 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                Want to See PashxD in Action?
              </h2>

              <p className="text-green-100 mb-8 text-sm md:text-base max-w-lg mx-auto">
                Book a personalized demo and transform your operations.
              </p>

              <Link
                to="/book-demo"
                className="inline-flex items-center gap-2 bg-white text-[#15803D] px-7 md:px-8 py-3.5 md:py-4 rounded-full text-sm md:text-base font-semibold hover:-translate-y-[2px] transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Book a Demo <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}