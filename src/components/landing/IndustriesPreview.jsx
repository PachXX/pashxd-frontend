import {
  HardHat,
  Store,
  Factory,
  Zap,
} from "lucide-react";

import { useScrollReveal } from "../../hooks/useScrollReveal";

// ✅ LOCAL IMAGES (RECOMMENDED)
import constructionImg from "../../assets/industries/construction.jpg";
import retailImg from "../../assets/industries/retail.jpg";
import industrialImg from "../../assets/industries/industrial.jpg";
import energyImg from "../../assets/industries/energy.jpg";

const industries = [
  {
    title: "Construction",
    desc: "Manage multi-site projects, track material procurement, and coordinate subcontractors from a single platform.",
    icon: HardHat,
    image: constructionImg,
  },
  {
    title: "Retail Fit-Out",
    desc: "Scale store rollouts across locations with standardized BOQs, vendor management, and timeline tracking.",
    icon: Store,
    image: retailImg,
  },
  {
    title: "Industrial & Equipment",
    desc: "Streamline equipment procurement, maintenance scheduling, and facility management workflows.",
    icon: Factory,
    image: industrialImg,
  },
  {
    title: "Energy & Infrastructure",
    desc: "Track large-scale infrastructure projects with complex procurement chains and multi-vendor coordination.",
    icon: Zap,
    image: energyImg,
  },
];

export default function IndustriesPreview() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-16">

          <div>
            <p className="text-xs tracking-[0.25em] text-green-600 font-semibold mb-3">
              INDUSTRIES
            </p>

            <h2 className="text-4xl font-bold text-[#0A2540]">
              Built for Real-World Operations
            </h2>
          </div>

          <a
            href="#"
            className="mt-4 md:mt-0 text-green-600 font-medium hover:underline transition"
          >
            View all industries →
          </a>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {industries.map((item, i) => (
            <div
              key={i}
              className="
                group relative rounded-2xl overflow-hidden
                border border-slate-200 bg-white
                shadow-sm transition-all duration-500
                hover:-translate-y-2 hover:shadow-xl
                hover:border-green-200
              "
            >

              {/* IMAGE */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="
                    w-full h-full object-cover
                    transition-all duration-700 ease-out
                    group-hover:scale-105
                    group-hover:brightness-110
                  "
                />

                {/* ✅ PREMIUM GRADIENT OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/60 to-white/10" />
              </div>

              {/* CONTENT */}
              <div className="p-6 relative">

                {/* ICON */}
                <div
                  className="
                    w-12 h-12 rounded-xl
                    bg-green-50 border border-green-100
                    flex items-center justify-center mb-4
                    transition-all duration-300
                    group-hover:bg-green-100 group-hover:scale-105
                  "
                >
                  <item.icon className="w-5 h-5 text-green-600" />
                </div>

                {/* TITLE */}
                <h3 className="text-lg font-semibold text-[#0A2540] mb-2">
                  {item.title}
                </h3>

                {/* DESC */}
                <p className="text-sm text-slate-500 leading-relaxed">
                  {item.desc}
                </p>

              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}