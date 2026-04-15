import {
  BookOpen,
  FileText,
  Video,
  ArrowRight,
  Clock,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";

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
  "Best Practices": "bg-emerald-50 text-emerald-600 border-emerald-100",
  Procurement: "bg-purple-50 text-purple-600 border-purple-100",
};

/* ================= PAGE ================= */

export default function ResourcesPage() {
  const ref = useScrollReveal();

  return (
    <div ref={ref} className="pt-24">

      {/* ================= HERO ================= */}
      <section className="py-28 bg-[#F8FAFC] text-center">

        <p className="reveal text-sm font-semibold tracking-[0.25em] text-[#15803D] uppercase mb-6">
          Resources
        </p>

        <h1 className="reveal text-[3rem] sm:text-[4rem] lg:text-[3.2rem] leading-[1.05] font-extrabold text-[#0A2540] tracking-tight max-w-5xl mx-auto">
          Insights & Best Practices
        </h1>

        <p className="reveal reveal-delay-1 text-lg text-slate-500 max-w-xl mx-auto mt-6">
          Learn how leading teams optimize procurement, execution, and operations with AI.
        </p>

      </section>

      {/* ================= FEATURED ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="reveal text-2xl font-bold text-[#0A2540] mb-10 text-center">
            Featured Resources
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {resources.map((r, i) => (
              <div
                key={r.title}
                className={`reveal reveal-delay-${i + 1} bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition`}
              >
                <div className="w-10 h-10 rounded-lg bg-green-50 border border-green-100 flex items-center justify-center mb-4">
                  <r.icon className="w-5 h-5 text-[#15803D]" />
                </div>

                <span className="text-xs bg-slate-100 px-2 py-1 rounded-full text-slate-500">
                  {r.type}
                </span>

                <h3 className="text-lg font-semibold mt-3 text-[#0A2540]">
                  {r.title}
                </h3>

                <p className="text-sm text-slate-500 mt-2">
                  {r.desc}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= BLOG ================= */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="reveal text-3xl font-bold text-[#0A2540] mb-12">
            Latest Articles
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {blogPosts.map((post, i) => (
              <article
                key={post.title}
                className={`reveal reveal-delay-${Math.min(i + 1, 4)}
                  bg-white border border-slate-200 rounded-2xl overflow-hidden
                  shadow-sm hover:shadow-xl transition-all duration-300 group`}
              >

                {/* IMAGE */}
                <div className="overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-5">

                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span
                      className={`text-xs px-2 py-1 rounded-full border ${
                        categoryColors[post.category] ||
                        "bg-gray-50 text-gray-500 border-gray-100"
                      }`}
                    >
                      {post.category}
                    </span>

                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-[#0A2540] group-hover:text-[#15803D] transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-sm text-slate-500 mt-2 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <p className="text-xs text-slate-400 mt-4">
                    {post.date}
                  </p>

                </div>

              </article>
            ))}

          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 bg-white text-center">

       <h2 className="reveal text-3xl font-bold text-[#0A2540] mb-6">
         Want to See{" "}
         <span className="bg-gradient-to-r from-[#16A34A] to-[#22C55E] bg-clip-text text-transparent">
           PashxD
         </span>{" "}
         in Action?
       </h2>
        <p className="reveal text-slate-500 mb-8">
          Book a personalized demo and transform your operations.
        </p>

        <a
          href="https://calendly.com/shahil-talenlio-letstalk/letstalk"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#15803D] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#166534] transition"
        >
          Book a Demo <ArrowRight className="w-4 h-4" />
        </a>

      </section>

    </div>
  );
}