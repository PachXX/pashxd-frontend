import {
  Building2,
  Store,
  Factory,
  Zap,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

import { useScrollReveal } from "../hooks/useScrollReveal";

import constructionImg from "../assets/industries/construction.jpg";
import retailImg from "../assets/industries/retail.jpg";
import industrialImg from "../assets/industries/industrial.jpg";
import energyImg from "../assets/industries/energy.jpg";

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
    metrics: [
      { value: "45%", label: "Faster procurement" },
      { value: "$2M+", label: "Savings" },
      { value: "90%", label: "On-time delivery" },
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
    metrics: [
      { value: "3x", label: "Faster rollouts" },
      { value: "30%", label: "Cost reduction" },
      { value: "100+", label: "Stores" },
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
    metrics: [
      { value: "60%", label: "Faster POs" },
      { value: "25%", label: "Better pricing" },
      { value: "99%", label: "Compliance" },
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
    metrics: [
      { value: "40%", label: "Cost visibility" },
      { value: "20%", label: "Fewer delays" },
      { value: "$5M+", label: "Projects" },
    ],
  },
];

export default function IndustriesPage() {
  const ref = useScrollReveal();

  return (
    <div ref={ref} className="pt-24">

      {/* HERO */}
      <section className="py-28 bg-white text-center">
        <p className="reveal text-xs tracking-[0.3em] uppercase text-green-600 font-semibold mb-4">
          Industries
        </p>

        <h1 className="reveal text-[48px] sm:text-[64px] font-extrabold text-[#0A2540] leading-[1.05] mb-6">
          Built for Real-World Operations
        </h1>

        <p className="reveal reveal-delay-1 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          From construction sites to retail stores, PashxD adapts to the unique needs of every industry that builds, manages, and delivers physical operations.
        </p>
      </section>

      {/* INDUSTRIES */}
      {industries.map((ind, i) => (
        <section key={ind.id} className={`py-24 ${i % 2 === 0 ? "bg-slate-50" : "bg-white"}`}>
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

            {/* TEXT */}
            <div className={`${i % 2 !== 0 ? "lg:order-2" : ""} space-y-6`}>

              {/* TOP LABEL */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-50 border border-green-100 flex items-center justify-center">
                  <ind.icon className="w-5 h-5 text-green-600" />
                </div>

                <span className="text-xs tracking-[0.25em] uppercase text-green-600 font-semibold">
                  {ind.tagline}
                </span>
              </div>

              {/* TITLE */}
              <h2 className="text-[40px] font-bold text-[#0A2540] leading-tight">
                {ind.title}
              </h2>

              {/* DESC */}
              <p className="text-slate-500 text-lg leading-relaxed">
                {ind.desc}
              </p>

              {/* USE CASES */}
              <div className="space-y-3 pt-2">
                {ind.useCases.map((u) => (
                  <div key={u} className="flex gap-3 items-start">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-1" />
                    <span className="text-slate-600 text-sm">{u}</span>
                  </div>
                ))}
              </div>

              {/* METRICS */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                {ind.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="
                      bg-white
                      border border-slate-200
                      rounded-xl
                      p-5
                      text-center
                      shadow-sm
                      hover:shadow-md
                      transition
                    "
                  >
                    <div className="text-3xl font-bold text-green-600">
                      {m.value}
                    </div>
                    <div className="text-xs text-slate-400 mt-2">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* IMAGE */}
            <div className={i % 2 !== 0 ? "lg:order-1" : ""}>
              <img
                src={ind.image}
                alt={ind.title}
                className="w-full h-[420px] object-cover rounded-2xl shadow-xl"
              />
            </div>

          </div>
        </section>
      ))}

      {/* PREMIUM CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">

          <div className="
            bg-gradient-to-r from-[#2F7A57] to-[#3F8F6A]
            rounded-3xl
            p-16
            text-center
            shadow-[0_30px_80px_rgba(0,0,0,0.15)]
          ">

            <h2 className="text-4xl font-bold text-white mb-6">
              Don't See Your Industry?
            </h2>

            <p className="text-green-100 max-w-xl mx-auto mb-10 text-lg">
              PashxD is built to adapt. If you manage physical operations, we can customize the platform for your needs.
            </p>

            <a
              href="https://calendly.com/shahil-talenlio-letstalk/letstalk"
              target="_blank"
              className="
                inline-flex items-center gap-2
                bg-white text-green-700
                px-10 py-4 rounded-full
                font-semibold
                hover:scale-[1.03]
                transition
              "
            >
              Talk to Us <ArrowRight className="w-4 h-4" />
            </a>

          </div>

        </div>
      </section>

    </div>
  );
}