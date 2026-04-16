import {
  BookOpen,
  FileText,
  Video,
  ArrowRight,
  Clock,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";
import Container from "../components/layout/Container";

/* ================= DATA ================= */

const blogPosts = [
  {
    title: "How AI Is Transforming Construction Procurement in 2025",
    category: "AI & Technology",
    readTime: "8 min",
    date: "Dec 15, 2025",
    excerpt:
      "Discover how AI-powered procurement platforms are reducing costs by up to 35% and eliminating manual invoice matching.",
    image:
      "https://images.unsplash.com/photo-1697305592218-d5d0c1bab2e3?w=600&h=400&fit=crop",
  },
  {
    title: "The Complete Guide to BOQ-Based Cost Tracking",
    category: "Best Practices",
    readTime: "12 min",
    date: "Dec 8, 2025",
    excerpt:
      "Learn how to link BOQ to procurement and execution for real-time visibility.",
    image:
      "https://images.unsplash.com/photo-1764114235891-66ff86abaf87?w=600&h=400&fit=crop",
  },
  {
    title: "5 Signs Your Procurement Process Needs an Upgrade",
    category: "Procurement",
    readTime: "5 min",
    date: "Nov 28, 2025",
    excerpt:
      "Still using spreadsheets? Here are the warning signs you're losing money.",
    image:
      "https://images.unsplash.com/photo-1764795850248-97a5e986b242?w=600&h=400&fit=crop",
  },
];

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
  "AI & Technology": "bg-blue-50 text-blue-600 border-blue-100",
  "Best Practices": "bg-green-50 text-[#15803D] border-green-100",
  Procurement: "bg-amber-50 text-amber-600 border-amber-100",
};

/* ================= PAGE ================= */

export default function ResourcesPage() {
  const ref = useScrollReveal();

  return (
    <div ref={ref} className="pt-20 md:pt-24">

      {/* ================= HERO ================= */}
      <section className="py-20 md:py-28 bg-[#F8FAFC]">
        <Container className="text-center">

          <p className="reveal text-xs md:text-sm font-semibold tracking-[0.25em] text-[#15803D] uppercase mb-5 md:mb-6">
            Resources
          </p>

          <h1 className="reveal text-3xl sm:text-4xl md:text-[3.5rem] leading-[1.1] font-extrabold text-[#0A2540] tracking-tight max-w-4xl mx-auto mb-5 md:mb-6">
            Insights &{" "}
            <span className="bg-gradient-to-r from-[#15803D] to-[#22C55E] bg-clip-text text-transparent">
              Best Practices
            </span>
          </h1>

          <p className="reveal reveal-delay-1 text-base md:text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
            Learn how leading teams optimize procurement, execution, and operations with AI.
          </p>

        </Container>
      </section>

      {/* ================= FEATURED ================= */}
      <section className="py-16 md:py-20 bg-white">
        <Container>

          <h2 className="reveal text-2xl md:text-3xl font-bold text-[#0A2540] mb-8 md:mb-10 text-center">
            Featured Resources
          </h2>

          <div className="grid md:grid-cols-3 gap-5 md:gap-6">

            {resources.map((r, i) => (
              <div
                key={r.title}
                className={`reveal reveal-delay-${i + 1} bg-white border border-slate-200 rounded-2xl p-6 md:p-7 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-green-200 transition-all duration-300`}
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

      {/* ================= BLOG ================= */}
      <section className="py-20 md:py-24 bg-[#F8FAFC]">
        <Container>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 md:mb-12">
            <h2 className="reveal text-2xl md:text-3xl font-bold text-[#0A2540]">
              Latest Articles
            </h2>
            <span className="text-sm text-slate-500">
              {blogPosts.length} articles
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">

            {blogPosts.map((post, i) => (
              <article
                key={post.title}
                className={`reveal reveal-delay-${Math.min(i + 1, 4)}
                  bg-white border border-slate-200 rounded-2xl overflow-hidden
                  shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer`}
              >

                {/* IMAGE */}
                <div className="overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-44 md:h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-5">

                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span
                      className={`text-[10px] md:text-xs px-2 py-1 rounded-full border font-medium ${
                        categoryColors[post.category] ||
                        "bg-gray-50 text-gray-500 border-gray-100"
                      }`}
                    >
                      {post.category}
                    </span>

                    <span className="text-[10px] md:text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-base md:text-lg font-semibold text-[#0A2540] group-hover:text-[#15803D] transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-sm text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <p className="text-xs text-slate-400 mt-4">
                    {post.date}
                  </p>

                </div>

              </article>
            ))}

          </div>
        </Container>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 md:py-24 bg-white">
        <Container className="max-w-4xl">

          <div className="bg-gradient-to-br from-[#15803D] to-[#166534] rounded-3xl p-8 md:p-12 text-center shadow-[0_20px_60px_rgba(21,128,61,0.25)] relative overflow-hidden">

            {/* Ambient glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-400/20 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative">
              <h2 className="reveal text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                Want to See PashxD in Action?
              </h2>

              <p className="reveal text-green-100 mb-8 text-sm md:text-base max-w-lg mx-auto">
                Book a personalized demo and transform your operations.
              </p>

              <Link
                to="/book-demo"
                className="inline-flex items-center gap-2 bg-white text-[#15803D] px-7 md:px-8 py-3.5 md:py-4 rounded-full text-sm md:text-base font-semibold hover:-translate-y-[2px] transition-all duration-300 shadow-lg"
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