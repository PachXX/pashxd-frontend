import { Link } from "react-router-dom";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function HeroSection() {
  const ref = useScrollReveal();

  return (
    <section
      ref={ref}
      className="relative pt-36 pb-28 bg-white overflow-hidden scale-[0.85] sm:scale-90 md:scale-95 lg:scale-100 origin-top"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-green-50/40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT */}
          <div>

            {/* Badge */}
            <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 border border-green-100 mb-8">
              <div className="w-2 h-2 rounded-full bg-[#15803D] animate-pulse" />
              <span className="text-[12px] font-semibold uppercase tracking-widest text-[#15803D]">
                AI-Powered Operations
              </span>
            </div>

            {/* Heading */}
            <h1 className="reveal text-[3.6rem] sm:text-[4.8rem] leading-[1.02] font-extrabold text-[#0A2540] mb-8">
              The Operating System for{" "}
              <span className="text-[#15803D]">
                Physical Operations
              </span>
            </h1>

            {/* Subtext */}
            <p className="reveal reveal-delay-1 text-xl text-slate-500 leading-relaxed mb-10 max-w-xl">
              Unify procurement, project execution, and AI-driven decision-making
              in one platform. Stop managing operations across disconnected tools.
            </p>

            {/* Buttons */}
            <div className="reveal reveal-delay-2 flex flex-wrap gap-5 mb-12">

              <Link
                to="/contact"
                className="
                  bg-[#15803D] hover:bg-[#166534]
                  text-white
                  px-8 py-4
                  rounded-full
                  text-base font-semibold
                  transition-all duration-300
                  shadow-lg shadow-green-600/20
                  hover:-translate-y-[2px]
                "
              >
                Book a Demo →
              </Link>

              <Link
                to="/product"
                className="
                  border border-slate-200
                  px-8 py-4
                  rounded-full
                  text-base font-semibold
                  text-slate-600
                  hover:bg-slate-50
                  transition-all duration-300
                "
              >
                ▶ See Platform
              </Link>

            </div>

            {/* KPI */}
            <div className="reveal reveal-delay-3 flex gap-16 text-sm">

              <div>
                <div className="text-3xl font-bold text-[#15803D]">50%</div>
                <div className="text-slate-400 mt-1">Faster Procurement</div>
              </div>

              <div>
                <div className="text-3xl font-bold text-[#15803D]">3x</div>
                <div className="text-slate-400 mt-1">Cost Visibility</div>
              </div>

              <div>
                <div className="text-3xl font-bold text-[#15803D]">90%</div>
                <div className="text-slate-400 mt-1">Automation Rate</div>
              </div>

            </div>

          </div>

          {/* RIGHT — DASHBOARD */}
          <div className="relative flex justify-center lg:justify-end">

            {/* Glow */}
            <div className="absolute w-[600px] h-[600px] bg-green-300/30 blur-[140px] rounded-full" />

            {/* Dashboard */}
            <div className="reveal reveal-delay-2 relative animate-float bg-[#0B0F14] rounded-2xl p-8 w-full max-w-[860px] border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.5)]">

              {/* Top bar */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <span className="text-sm text-slate-400 ml-2">
                  PashxD Dashboard
                </span>
              </div>

              {/* KPI */}
              <div className="grid grid-cols-2 gap-5 mb-6 text-white">

                <div className="bg-white/5 rounded-xl p-5">
                  <p className="text-sm text-slate-400">ACTIVE ORDERS</p>
                  <h3 className="text-3xl font-bold text-green-400 mt-2">2,847</h3>
                  <p className="text-sm text-slate-500">+12.5% vs last month</p>
                </div>

                <div className="bg-white/5 rounded-xl p-5">
                  <p className="text-sm text-slate-400">PROJECTS</p>
                  <h3 className="text-3xl font-bold mt-2">156</h3>
                  <p className="text-sm text-green-400">18 at risk</p>
                </div>

                <div className="bg-white/5 rounded-xl p-5">
                  <p className="text-sm text-slate-400">COST SAVINGS</p>
                  <h3 className="text-3xl font-bold text-green-400 mt-2">$1.2M</h3>
                  <p className="text-sm text-slate-500">This quarter</p>
                </div>

                <div className="bg-white/5 rounded-xl p-5">
                  <p className="text-sm text-slate-400">AI ALERTS</p>
                  <h3 className="text-3xl font-bold text-yellow-400 mt-2">23</h3>
                  <p className="text-sm text-green-400">5 critical</p>
                </div>

              </div>

              {/* Table */}
              <div className="bg-white/5 rounded-xl p-5 text-sm text-white">
                <p className="text-slate-400 mb-4">RECENT ORDERS</p>

                <div className="space-y-3">
                  <div className="grid grid-cols-4">
                    <span className="text-green-400">PO-4821</span>
                    <span className="text-slate-400">Steel Corp</span>
                    <span className="text-green-400">Delivered</span>
                    <span className="text-right">$48,200</span>
                  </div>

                  <div className="grid grid-cols-4">
                    <span className="text-green-400">PO-4820</span>
                    <span className="text-slate-400">BuildMat</span>
                    <span className="text-blue-400">In Transit</span>
                    <span className="text-right">$23,150</span>
                  </div>

                  <div className="grid grid-cols-4">
                    <span className="text-green-400">PO-4819</span>
                    <span className="text-slate-400">CemTech</span>
                    <span className="text-yellow-400">Processing</span>
                    <span className="text-right">$67,800</span>
                  </div>
                </div>
              </div>

              {/* Floating AI Alert */}
              <div className="absolute -bottom-8 left-8 bg-white rounded-xl px-5 py-4 shadow-xl border border-slate-200 w-[320px] animate-float">
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500 mt-1" />
                  <div>
                    <p className="text-base font-semibold text-slate-800">AI Alert</p>
                    <p className="text-sm text-slate-500">
                      Delay predicted: Project #47 — cement delivery 3 days late
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}