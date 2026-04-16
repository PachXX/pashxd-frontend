import {
  HardHat,
  Store,
  Factory,
  Zap,
  Cog,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import Container from "../layout/Container";

// ✅ LOCAL IMAGES
import constructionImg from "../../assets/industries/construction.jpg";
import retailImg from "../../assets/industries/retail.jpg";
import industrialImg from "../../assets/industries/industrial.jpg";
import energyImg from "../../assets/industries/energy.jpg";
import manufacturingImg from "../../assets/industries/manufacturing.jpg";

const industries = [
  {
    id: "construction",
    title: "Construction",
    desc: "Manage multi-site projects, track material procurement, and coordinate subcontractors from a single platform.",
    icon: HardHat,
    image: constructionImg,
  },
  {
    id: "retail",
    title: "Retail Fit-Out",
    desc: "Scale store rollouts across locations with standardized BOQs, vendor management, and timeline tracking.",
    icon: Store,
    image: retailImg,
  },
  {
    id: "industrial",
    title: "Industrial & Equipment",
    desc: "Streamline equipment procurement, maintenance scheduling, and facility management workflows.",
    icon: Factory,
    image: industrialImg,
  },
  {
    id: "manufacturing",
    title: "Manufacturing",
    desc: "BOM-driven production planning. Turn Bill of Materials into purchase orders and track every component from supplier to shop floor.",
    icon: Cog,
    image: manufacturingImg,
  },
  {
    id: "energy",
    title: "Energy & Infrastructure",
    desc: "Track large-scale infrastructure projects with complex procurement chains and multi-vendor coordination.",
    icon: Zap,
    image: energyImg,
  },
];

export default function IndustriesPreview() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="py-20 md:py-28 bg-white">
      <Container>

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 md:mb-16 gap-4">

          <div>
            <p className="text-xs tracking-[0.25em] text-[#15803D] font-semibold mb-3">
              INDUSTRIES
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-[#0A2540]">
              Built for{" "}
              <span className="bg-gradient-to-r from-[#15803D] to-[#22C55E] bg-clip-text text-transparent">
                Real-World Operations
              </span>
            </h2>
          </div>

          <Link
            to="/industries"
            className="inline-flex items-center gap-1.5 text-[#15803D] font-semibold text-sm hover:gap-2.5 transition-all duration-300"
          >
            View all industries <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* CARDS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 md:gap-6">

          {industries.map((item) => (
            <Link
              key={item.id}
              to={`/industries#${item.id}`}
              className="
                group relative rounded-2xl overflow-hidden
                border border-slate-200 bg-white
                shadow-sm transition-all duration-500
                hover:-translate-y-2 hover:shadow-xl
                hover:border-green-200
                focus:outline-none focus:ring-2 focus:ring-green-200 focus:ring-offset-2
              "
            >

              {/* IMAGE */}
              <div className="relative h-40 md:h-44 overflow-hidden">
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

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/60 to-white/10" />
              </div>

              {/* CONTENT */}
              <div className="p-5 relative">

                {/* ICON */}
                <div
                  className="
                    w-11 h-11 rounded-xl
                    bg-green-50 border border-green-100
                    flex items-center justify-center mb-4
                    transition-all duration-300
                    group-hover:bg-green-100 group-hover:scale-105
                  "
                >
                  <item.icon className="w-5 h-5 text-[#15803D]" />
                </div>

                {/* TITLE */}
                <h3 className="text-base font-semibold text-[#0A2540] mb-2 group-hover:text-[#15803D] transition-colors">
                  {item.title}
                </h3>

                {/* DESC */}
                <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
                  {item.desc}
                </p>

                {/* Subtle arrow on hover */}
                <div className="flex items-center gap-1 mt-4 text-xs font-semibold text-[#15803D] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Learn more <ArrowRight className="w-3 h-3" />
                </div>

              </div>
            </Link>
          ))}

        </div>
      </Container>
    </section>
  );
}