import { Star, TrendingDown, Layers, Clock } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const metrics = [
  {
    icon: TrendingDown,
    value: "30%",
    label: "Reduce Delays",
    desc: "Through AI-powered prediction",
  },
  {
    icon: Layers,
    value: "5+",
    label: "Tools Replaced",
    desc: "With one unified system",
  },
  {
    icon: Clock,
    value: "50%",
    label: "Faster Procurement",
    desc: "Automated workflows",
  },
];

const testimonials = [
  {
    quote:
      "PashxD transformed how we manage procurement across 40+ construction sites. Full visibility into every order, delivery, and invoice.",
    name: "Rajesh Mehta",
    role: "VP Operations",
    company: "Tata Projects",
  },
  {
    quote:
      "The AI layer predicted a $200K cost overrun on one of our retail rollouts — we caught it 3 weeks early. Game-changing.",
    name: "Sarah Chen",
    role: "Director of Procurement",
    company: "Reliance Retail",
  },
  {
    quote:
      "We replaced 6 different tools with PashxD. The unified workflow from BOQ to delivery tracking saves countless hours weekly.",
    name: "Michael Torres",
    role: "Head of Projects",
    company: "L&T Infrastructure",
  },
];

export default function SocialProof() {
  const ref = useScrollReveal();

  return (
    <section
      ref={ref}
      className="relative py-28 overflow-hidden bg-gradient-to-b from-[#0A2540] via-[#081f33] to-[#071a2c]"
    >
      {/* 🔥 subtle glow background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[400px] h-[400px] bg-green-500/20 blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* METRICS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-24">
          {metrics.map((m) => (
            <div key={m.label} className="text-center group">

              <div
                className="
                  w-14 h-14 rounded-2xl
                  bg-white/5 backdrop-blur-md
                  border border-white/10
                  flex items-center justify-center
                  mx-auto mb-5
                  transition-all duration-300
                  group-hover:scale-110
                  group-hover:border-green-400/40
                "
              >
                <m.icon className="h-6 w-6 text-green-400" />
              </div>

              <div className="text-4xl font-extrabold text-white mb-1 tracking-tight">
                {m.value}
              </div>

              <div className="text-sm font-semibold text-white mb-1">
                {m.label}
              </div>

              <div className="text-xs text-slate-400">
                {m.desc}
              </div>
            </div>
          ))}
        </div>

        {/* HEADING */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-[#16A34A] to-[#22C55E] bg-clip-text text-transparent">
              Industry Leaders
            </span>
          </h2>

          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Leading construction, retail, and infrastructure companies rely on PashxD to streamline operations.
          </p>
        </div>

        {/* TESTIMONIALS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="
                group
                bg-white/[0.04]
                backdrop-blur-md
                border border-white/[0.08]
                rounded-2xl p-6
                transition-all duration-300
                hover:bg-white/[0.06]
                hover:-translate-y-2
                hover:shadow-2xl
                hover:border-green-400/20
              "
            >

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    className="h-3.5 w-3.5 fill-green-400 text-green-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                “{t.quote}”
              </p>

              {/* Author */}
              <div className="border-t border-white/[0.06] pt-4">
                <div className="text-sm font-semibold text-white">
                  {t.name}
                </div>
                <div className="text-xs text-slate-400">
                  {t.role}, {t.company}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}