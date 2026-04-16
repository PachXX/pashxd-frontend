import { Star, TrendingDown, Layers, Clock } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import Container from "../layout/Container";

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
  // ===== INDIA (2) =====
  {
    quote:
      "PashxD transformed how we manage procurement across 5+ construction sites. Full visibility into every order, delivery, and invoice.",
    name: "Mohammed Shahil",
    role: "Director Operations",
    company: "LANDMARK Infra Projects",
    location: "Bangalore, India",
  },
  {
    quote:
      "The BOQ-linked procurement flow is exactly what our teams needed. We cut PO approval time by 60% in the first quarter.",
    name: "Anika Desai",
    role: "Chief Operating Officer",
    company: "Godrej Properties",
    location: "Bangalore, India",
  },

  // ===== GERMANY (1) =====
  {
    quote:
      "The AI-driven cost predictions caught a €180K overrun three weeks before our finance review. PashxD paid for itself in one quarter.",
    name: "Lukas Schneider",
    role: "Head of Procurement",
    company: "HOCHTIEF AG",
    location: "Berlin, Germany",
  },

  // ===== OTHER EUROPE (3) =====
  {
    quote:
      "We finally retired six legacy tools. One platform now handles BOQ, procurement, invoicing, and site reports — our margins improved within 90 days.",
    name: "Émilie Laurent",
    role: "Director of Operations",
    company: "Bouygues Construction",
    location: "Paris, France",
  },
  {
    quote:
      "Managing multi-country rollouts used to be chaos. With PashxD, our European procurement teams work from a single source of truth.",
    name: "Marco Rossi",
    role: "VP Supply Chain",
    company: "Salini Impregilo",
    location: "Milan, Italy",
  },
  {
    quote:
      "The mobile DPR tracking changed how our site managers report. Real-time visibility without any extra admin work.",
    name: "Sofía García",
    role: "Head of Projects",
    company: "ACS Group",
    location: "Madrid, Spain",
  },
];

export default function SocialProof() {
  const ref = useScrollReveal();

  // Duplicate testimonials for seamless infinite loop
  const loop = [...testimonials, ...testimonials];

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-[#0A2540] via-[#081f33] to-[#071a2c]"
    >
      {/* Subtle glow background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[400px] h-[400px] bg-green-500/20 blur-[120px]" />
      </div>

      {/* Keyframes for the slider */}
      <style>
        {`
          @keyframes socialproof-slide {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          .socialproof-track {
            animation: socialproof-slide 45s linear infinite;
          }

          .socialproof-track:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      <Container className="relative">

        {/* METRICS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-24">
          {metrics.map((m) => (
            <div key={m.label} className="text-center group">

              <div
                className="
                  w-12 h-12 md:w-14 md:h-14 rounded-2xl
                  bg-white/5 backdrop-blur-md
                  border border-white/10
                  flex items-center justify-center
                  mx-auto mb-4 md:mb-5
                  transition-all duration-300
                  group-hover:scale-110
                  group-hover:border-green-400/40
                "
              >
                <m.icon className="h-5 w-5 md:h-6 md:w-6 text-green-400" />
              </div>

              <div className="text-3xl md:text-4xl font-extrabold text-white mb-1 tracking-tight">
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
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-[#15803D] to-[#22C55E] bg-clip-text text-transparent">
              Industry Leaders
            </span>
          </h2>

          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Leading construction, retail, and infrastructure companies across Europe and India rely on PashxD to streamline operations.
          </p>
        </div>

      </Container>

      {/* TESTIMONIALS SLIDER — full width, bleeds edge-to-edge */}
      <div className="relative">

        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 bg-gradient-to-r from-[#071a2c] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 bg-gradient-to-l from-[#071a2c] to-transparent" />

        <div className="overflow-hidden">
          <div className="socialproof-track flex gap-5 md:gap-6 w-max">

            {loop.map((t, i) => (
              <div
                key={i}
                className="
                  shrink-0
                  w-[320px] md:w-[380px]
                  bg-white/[0.04]
                  backdrop-blur-md
                  border border-white/[0.08]
                  rounded-2xl p-5 md:p-6
                  transition-all duration-300
                  hover:bg-white/[0.06]
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
                  <div className="text-[11px] text-slate-500 mt-1">
                    {t.location}
                  </div>
                </div>

              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}