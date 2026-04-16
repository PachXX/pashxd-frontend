import {
  ShoppingCart,
  LayoutDashboard,
  Brain,
  Link2,
  Building2,
  Store,
  Home,
  Briefcase,
  Zap,
  HardHat,
  Hotel,
  HeartPulse,
  GraduationCap,
  Factory,
} from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import Container from "../layout/Container";
import pashxdLogo from "../../assets/logos/pashxd-logo2.jpg";

const projectTypes = [
  { icon: Store, label: "Retail" },
  { icon: Building2, label: "Offices" },
  { icon: Home, label: "Residential" },
  { icon: Briefcase, label: "Commercial" },
  { icon: Zap, label: "Energy" },
  { icon: Factory, label: "Corporate" },
  { icon: HardHat, label: "Developers" },
  { icon: Hotel, label: "Hospitality" },
  { icon: HeartPulse, label: "Healthcare" },
  { icon: GraduationCap, label: "Education" },
];

export default function SolutionSection() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="py-20 md:py-28 bg-white relative overflow-hidden">

      {/* Keyframes */}
      <style>
        {`
          @keyframes orbit-rotate-slow {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }

          @keyframes orbit-rotate-fast {
            from { transform: rotate(0deg); }
            to   { transform: rotate(-360deg); }
          }

          @keyframes hub-pulse-ring {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50%      { transform: scale(1.2); opacity: 1; }
          }

          @keyframes satellite-float {
            0%, 100% { transform: translateY(0); }
            50%      { transform: translateY(-6px); }
          }

          @keyframes type-fade-in {
            from { opacity: 0; transform: translateY(8px) scale(0.95); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
          }

          .solution-orbit-outer { animation: orbit-rotate-slow 45s linear infinite; }
          .solution-orbit-inner { animation: orbit-rotate-fast 30s linear infinite; }

          .solution-hub-ring::before {
            content: '';
            position: absolute;
            inset: -8px;
            border-radius: 9999px;
            border: 2px solid rgba(21, 128, 61, 0.35);
            animation: hub-pulse-ring 3s ease-in-out infinite;
          }

          .solution-hub-ring::after {
            content: '';
            position: absolute;
            inset: -18px;
            border-radius: 9999px;
            border: 1px solid rgba(21, 128, 61, 0.18);
            animation: hub-pulse-ring 3s ease-in-out infinite 0.6s;
          }

          .sat-float-1 { animation: satellite-float 4s ease-in-out infinite; }
          .sat-float-2 { animation: satellite-float 4s ease-in-out infinite 1s; }
          .sat-float-3 { animation: satellite-float 4s ease-in-out infinite 2s; }
          .sat-float-4 { animation: satellite-float 4s ease-in-out infinite 3s; }

          .type-card {
            animation: type-fade-in 0.5s ease-out backwards;
          }
        `}
      </style>

      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-green-200/30 blur-[140px] rounded-full" />
      </div>

      <Container className="relative">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
          <p className="reveal text-xs tracking-[0.25em] uppercase text-[#15803D] mb-5 font-semibold">
            The Solution
          </p>

          <h2 className="reveal text-3xl sm:text-4xl md:text-[2.8rem] font-bold text-[#0A2540] leading-[1.1] mb-5">
            Built for Every Operation,{" "}
            <span className="bg-gradient-to-r from-[#15803D] to-[#22C55E] bg-clip-text text-transparent">
              Unified in One Platform
            </span>
          </h2>

          <p className="reveal reveal-delay-1 text-slate-500 text-base md:text-lg leading-relaxed">
            From retail fit-outs to energy infrastructure — PashxD adapts to your workflow.
            Every project type, every operation, connected through one intelligent platform.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start">

          {/* ===== LEFT — Project Types Card ===== */}
          <div className="reveal reveal-delay-1 relative bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-[0_10px_40px_rgba(10,37,64,0.06)]">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg md:text-xl font-bold text-[#0A2540]">
                Project Types
              </h3>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#15803D] font-semibold bg-green-50 border border-green-100 px-2.5 py-1 rounded-full">
                10+ Verticals
              </span>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {projectTypes.map((type, i) => (
                <div
                  key={type.label}
                  className="type-card group flex flex-col items-center justify-center gap-2.5 bg-slate-50 hover:bg-green-50 border border-slate-100 hover:border-green-200 rounded-xl py-5 md:py-6 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-md"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-400/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition duration-500" />
                    <div className="relative w-10 h-10 md:w-11 md:h-11 rounded-full bg-green-100/60 group-hover:bg-white flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                      <type.icon className="w-4.5 h-4.5 md:w-5 md:h-5 text-[#15803D]" strokeWidth={1.75} />
                    </div>
                  </div>
                  <span className="text-xs md:text-sm font-semibold text-[#0A2540]">
                    {type.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Connected indicator */}
            <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span>All verticals unified on PashxD</span>
            </div>

          </div>

          {/* ===== RIGHT — Animated Hub and Spoke ===== */}
          <div className="reveal reveal-delay-2 relative flex items-center justify-center min-h-[500px] md:min-h-[560px]">

            {/* Soft card background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-green-50/40 rounded-3xl border border-slate-100" />

            {/* Hub content */}
            <div className="relative w-full h-[500px] md:h-[560px] flex items-center justify-center">

              {/* Outer orbit ring — slow rotation */}
              <div className="solution-orbit-outer absolute w-[340px] h-[340px] md:w-[400px] md:h-[400px]">
                <div className="w-full h-full rounded-full border-2 border-dashed border-green-300/40" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.8)]" />
              </div>

              {/* Inner orbit ring — counter rotation */}
              <div className="solution-orbit-inner absolute w-[220px] h-[220px] md:w-[260px] md:h-[260px]">
                <div className="w-full h-full rounded-full border border-green-200/60" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              </div>

              {/* UNIFIED OS label */}
              <span className="absolute top-[calc(50%-190px)] md:top-[calc(50%-220px)] left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-full border border-green-200 text-[10px] md:text-[11px] tracking-[0.25em] font-bold text-[#15803D] uppercase shadow-sm z-20">
                Unified OS
              </span>

              {/* Connection lines + FLOWING DATA PULSES */}
              <svg
                className="absolute w-[340px] h-[340px] md:w-[400px] md:h-[400px] pointer-events-none"
                viewBox="0 0 400 400"
              >
                <defs>
                  <linearGradient id="solLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#15803D" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#22C55E" stopOpacity="0.15" />
                  </linearGradient>
                </defs>

                {/* 4 spokes */}
                <line x1="200" y1="200" x2="200" y2="60" stroke="url(#solLineGrad)" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="200" y1="200" x2="60" y2="200" stroke="url(#solLineGrad)" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="200" y1="200" x2="340" y2="200" stroke="url(#solLineGrad)" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="200" y1="200" x2="200" y2="340" stroke="url(#solLineGrad)" strokeWidth="1.5" strokeDasharray="4 4" />

                {/* Flowing pulses INTO the hub */}
                <circle r="4" fill="#22C55E">
                  <animateMotion dur="2s" repeatCount="indefinite" begin="0s" path="M 200 60 L 200 200" />
                  <animate attributeName="opacity" values="0;1;1;0" dur="2s" repeatCount="indefinite" begin="0s" />
                </circle>
                <circle r="4" fill="#22C55E">
                  <animateMotion dur="2s" repeatCount="indefinite" begin="0.5s" path="M 60 200 L 200 200" />
                  <animate attributeName="opacity" values="0;1;1;0" dur="2s" repeatCount="indefinite" begin="0.5s" />
                </circle>
                <circle r="4" fill="#22C55E">
                  <animateMotion dur="2s" repeatCount="indefinite" begin="1s" path="M 340 200 L 200 200" />
                  <animate attributeName="opacity" values="0;1;1;0" dur="2s" repeatCount="indefinite" begin="1s" />
                </circle>
                <circle r="4" fill="#22C55E">
                  <animateMotion dur="2s" repeatCount="indefinite" begin="1.5s" path="M 200 340 L 200 200" />
                  <animate attributeName="opacity" values="0;1;1;0" dur="2s" repeatCount="indefinite" begin="1.5s" />
                </circle>
              </svg>

              {/* Central PashxD Hub */}
              <div className="relative z-10 group solution-hub-ring">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400/40 to-green-600/20 blur-2xl scale-150" />

                <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-white p-2 shadow-[0_0_40px_rgba(21,128,61,0.3),0_20px_40px_rgba(0,0,0,0.08)] border border-green-100">
                  <img
                    src={pashxdLogo}
                    alt="PashxD"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>

              {/* Satellites */}
              <div className="absolute top-[calc(50%-170px)] md:top-[calc(50%-200px)] left-1/2 -translate-x-1/2 z-10 sat-float-1">
                <Satellite icon={ShoppingCart} label="Procurement" />
              </div>

              <div className="absolute left-[calc(50%-170px)] md:left-[calc(50%-200px)] top-1/2 -translate-y-1/2 z-10 sat-float-2">
                <Satellite icon={LayoutDashboard} label="Execution" />
              </div>

              <div className="absolute right-[calc(50%-170px)] md:right-[calc(50%-200px)] top-1/2 -translate-y-1/2 z-10 sat-float-3">
                <Satellite icon={Brain} label="AI Intelligence" />
              </div>

              <div className="absolute bottom-[calc(50%-170px)] md:bottom-[calc(50%-200px)] left-1/2 -translate-x-1/2 z-10 sat-float-4">
                <Satellite icon={Link2} label="Integrations" />
              </div>

            </div>

          </div>

        </div>

      </Container>
    </section>
  );
}

/* ===== Satellite Helper ===== */

function Satellite({ icon: Icon, label }) {
  return (
    <div className="flex flex-col items-center gap-1.5 group">
      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110 group-hover:border-green-300 group-hover:shadow-[0_0_25px_rgba(34,197,94,0.4)]">
        <Icon className="w-5 h-5 md:w-6 md:h-6 text-[#15803D]" />
      </div>
      <span className="text-[10px] md:text-xs font-semibold text-[#0A2540] whitespace-nowrap bg-white/80 backdrop-blur px-2 py-0.5 rounded-full">
        {label}
      </span>
    </div>
  );
}