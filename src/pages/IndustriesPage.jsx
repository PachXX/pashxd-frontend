import SEOHead from "../components/SEOHead";
import {
  Building2,
  Store,
  Factory,
  Zap,
  Cog,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

import { useScrollReveal } from "../hooks/useScrollReveal";
import Container from "../components/layout/Container";

import constructionImg from "../assets/industries/construction.jpg";
import retailImg from "../assets/industries/retail.jpg";
import industrialImg from "../assets/industries/industrial.jpg";
import energyImg from "../assets/industries/energy.jpg";
import manufacturingImg from "../assets/industries/manufacturing.jpg";

const industries = [
  {
    id: "construction",
    icon: Building2,
    title: "Construction",
    tagline: "Multi-site project management at scale",
    image: constructionImg,
    desc: "PashxD helps construction companies manage procurement across dozens of active sites and track deliveries in real-time.",
    useCases: [
      "Central procurement for all sites",
      "Real-time material tracking",
      "BOQ-linked cost tracking",
      "AI-powered delay prediction",
      "Automated invoice matching",
      "Mobile DPR tracking",
    ],
  },
  {
    id: "retail",
    icon: Store,
    title: "Retail Fit-Out",
    tagline: "Scale store rollouts with precision",
    image: retailImg,
    desc: "Standardized workflows for multi-location retail expansion.",
    useCases: [
      "BOQ templates",
      "Vendor benchmarking",
      "Rollout tracking",
      "Progress dashboards",
      "Rate contracts",
      "Snag tracking",
    ],
  },
  {
    id: "industrial",
    icon: Factory,
    title: "Industrial & Equipment",
    tagline: "Complex procurement simplified",
    image: industrialImg,
    desc: "Manage high-value equipment sourcing and lifecycle.",
    useCases: [
      "Approval workflows",
      "Vendor analytics",
      "Maintenance tracking",
      "Facility expansion",
      "Inventory automation",
      "Compliance logs",
    ],
  },
  {
    id: "manufacturing",
    icon: Cog,
    title: "Manufacturing",
    tagline: "BOM-driven production operations",
    image: manufacturingImg,
    desc: "Streamline production planning and procurement with BOM-linked workflows. Turn Bill of Materials into actionable purchase orders and track every component from supplier to shop floor.",
    useCases: [
      "BOM-linked procurement",
      "Multi-level BOM management",
      "Raw material planning",
      "Supplier performance tracking",
      "Production batch tracking",
      "Component cost analytics",
    ],
  },
  {
    id: "energy",
    icon: Zap,
    title: "Energy & Infrastructure",
    tagline: "Large-scale project execution",
    image: energyImg,
    desc: "Visibility across multi-year infrastructure projects.",
    useCases: [
      "Vendor coordination",
      "Contract management",
      "Milestone tracking",
      "Budget control",
      "Compliance",
      "Risk prediction",
    ],
  },
];

export default function IndustriesPage() {
  const ref = useScrollReveal();
  const { hash } = useLocation();

  // Scroll to anchor when route includes hash (e.g. /industries#construction)
  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
        }
      }, 100);
    }
  }, [hash]);

  return (
          <div ref={ref} className="pt-20 md:pt-24">
      <SEOHead
        title="Industries We Serve | PashxD AI Industrial Platform"
        description="PashxD powers AI-driven operations across construction, manufacturing, energy, retail, and more. See how we serve your industry."
        path="/industries"
      />

      {/* HERO */}
      <section className="py-20 md:py-28 bg-white">
        <Container className="text-center">
          <p className="reveal text-xs md:text-sm tracking-[0.3em] uppercase text-brand-green font-semibold mb-4 md:mb-5">
            Industries
          </p>

          <h1 className="reveal text-3xl sm:text-4xl md:text-[3.5rem] font-extrabold text-brand-navy leading-[1.1] mb-5 md:mb-6 max-w-4xl mx-auto">
            Built for{" "}
            <span className="bg-linear-to-r from-[#15803D] to-[#22C55E] bg-clip-text text-transparent">
              Real-World Operations
            </span>
          </h1>

          <p className="reveal reveal-delay-1 text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            From construction sites to retail stores, PashxD adapts to the unique needs of every industry that builds, manages, and delivers physical operations.
          </p>
        </Container>
      </section>

      {/* INDUSTRIES */}
      {industries.map((ind, i) => (
        <section
          key={ind.id}
          id={ind.id}
          className={`py-16 md:py-24 scroll-mt-24 ${i % 2 === 0 ? "bg-slate-50" : "bg-white"}`}
        >
          <Container>
            <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">

              {/* TEXT */}
              <div className={`${i % 2 !== 0 ? "lg:order-2" : ""} space-y-5 md:space-y-6`}>

                {/* TOP LABEL */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-50 border border-green-100 flex items-center justify-center shrink-0">
                    <ind.icon className="w-5 h-5 text-brand-green" />
                  </div>

                  <span className="text-xs tracking-[0.25em] uppercase text-brand-green font-semibold">
                    {ind.tagline}
                  </span>
                </div>

                {/* TITLE */}
                <h2 className="text-3xl md:text-[40px] font-bold text-brand-navy leading-tight">
                  {ind.title}
                </h2>

                {/* DESC */}
                <p className="text-slate-500 text-base md:text-lg leading-relaxed">
                  {ind.desc}
                </p>

                {/* USE CASES */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 pt-2">
                  {ind.useCases.map((u) => (
                    <div key={u} className="flex gap-2 items-start">
                      <CheckCircle2 className="w-4 h-4 text-brand-green mt-0.5 shrink-0" />
                      <span className="text-slate-600 text-sm">{u}</span>
                    </div>
                  ))}
                </div>

                {/* METRICS */}
                <div className="grid grid-cols-3 gap-3 md:gap-4 pt-4 md:pt-6">
                  {ind.useCases.slice(0, 3).map((capability) => (
                    <div key={capability} className="text-sm font-semibold text-brand-green">{capability}</div>
                  ))}
                </div>
              </div>

              {/* IMAGE */}
              <div className={i % 2 !== 0 ? "lg:order-1" : ""}>
                <img
                  src={ind.image}
                  alt={ind.title}
                  className="w-full h-64 sm:h-80 md:h-[420px] object-cover rounded-2xl shadow-xl"
                />
              </div>

            </div>
          </Container>
        </section>
      ))}

      {/* PREMIUM CTA */}
      <section className="py-20 md:py-24 bg-white">
        <Container className="max-w-5xl">

          <div className="bg-linear-to-br from-[#15803D] to-brand-green-hover rounded-3xl p-8 md:p-16 text-center shadow-[0_30px_80px_rgba(21,128,61,0.25)] relative overflow-hidden">

            {/* Ambient glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-green-400/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6 leading-tight">
                Don't See Your Industry?
              </h2>

              <p className="text-green-100 max-w-xl mx-auto mb-8 md:mb-10 text-sm md:text-lg">
                PashxD is built to adapt. If you manage physical operations, we can customize the platform for your needs.
              </p>

              <Link
                to="/book-demo"
                className="inline-flex items-center gap-2 bg-white text-brand-green px-7 md:px-10 py-3.5 md:py-4 rounded-full text-sm md:text-base font-semibold hover:translate-y-[-2px] transition-all duration-300 shadow-lg"
              >
                Talk to Us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </Container>
      </section>

    </div>
  );
}