import { Link } from "react-router-dom";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import Container from "../layout/Container";

// ─── Step data ────────────────────────────────────────────────────────────────
const STEPS = [
  { id: 1, label: "BoQ",         sub: "Baselined",          state: "done"    },
  { id: 2, label: "Procurement", sub: "Vendors locked",     state: "done"    },
  { id: 3, label: "Execution",   sub: "In progress",        state: "active"  },
  { id: 4, label: "Quality",     sub: "Stage-gated",        state: "pending" },
  { id: 5, label: "Billing",     sub: "On installed value", state: "pending" },
  { id: 6, label: "Possession",  sub: "Certificate",        state: "pending" },
];

// ─── KPI cards ────────────────────────────────────────────────────────────────
const KPIS = [
  {
    label: "Budget Used",
    value: "82%",
    valueClass: "text-white",
    sub: "₹38.4CR / ₹46.8CR · ON BUDGET",
    subClass: "text-green-400 font-semibold",
  },
  {
    label: "Completion",
    value: "64%",
    valueClass: "text-white",
    sub: "Execution stage",
    subClass: "text-blue-400 font-semibold",
  },
  {
    label: "Cash Position",
    value: "+₹6.2Cr",
    valueClass: "text-green-400",
    sub: "In the flow ahead of outflow",
    subClass: "text-green-400 font-semibold",
  },
  {
    label: "Open Snags",
    value: "12",
    valueClass: "text-white",
    sub: "4 ageing > 7 days",
    subClass: "text-yellow-400 font-semibold",
  },
];

// ─── Spend bars ───────────────────────────────────────────────────────────────
const BARS = [
  { label: "Civil",    pct: 71, color: "bg-green-400" },
  { label: "MEP",      pct: 58, color: "bg-blue-400"  },
  { label: "Finishes", pct: 34, color: "bg-indigo-400" },
  { label: "External", pct: 92, color: "bg-yellow-400" },
];

// ─── Activity feed ────────────────────────────────────────────────────────────
const ACTIVITY = [
  {
    dot: "bg-green-400",
    text: (
      <>
        Vendor invoice <strong className="text-white">#INV-228</strong> 3-way matched &amp; cleared — ₹42.1L released.
      </>
    ),
  },
  {
    dot: "bg-blue-400",
    text: (
      <>
        Stage 3 (Execution) progress updated to <strong className="text-white">64%</strong> from site DPR.
      </>
    ),
  },
  {
    dot: "bg-yellow-400",
    text: (
      <>
        Snag <strong className="text-white">#S-091</strong> raised on Block A flooring — assigned to vendor.
      </>
    ),
  },
  {
    dot: "bg-indigo-400",
    text: (
      <>
        Change order <strong className="text-white">CO-07</strong> approved &amp; re-baselined to BoQ.
      </>
    ),
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function StepCircle({ step }) {
  if (step.state === "done")
    return (
      <div className="w-7 h-7 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-bold z-10 relative">
        ✓
      </div>
    );
  if (step.state === "active")
    return (
      <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold z-10 relative">
        {step.id}
      </div>
    );
  return (
    <div className="w-7 h-7 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-slate-500 text-xs font-bold z-10 relative">
      {step.id}
    </div>
  );
}

function Stepper() {
  return (
    <div className="flex items-start w-full mb-5">
      {STEPS.map((step, i) => (
        <div key={step.id} className="flex items-start flex-1">
          {/* Step node */}
          <div className="flex flex-col items-center gap-1 flex-shrink-0">
            <StepCircle step={step} />
            <span
              className={`text-[9px] font-semibold text-center leading-tight ${
                step.state === "active" ? "text-blue-400" : step.state === "done" ? "text-white" : "text-slate-500"
              }`}
            >
              {step.label}
            </span>
            <span className="text-[8px] text-slate-600 text-center leading-tight">{step.sub}</span>
          </div>

          {/* Connector line (not after last) */}
          {i < STEPS.length - 1 && (
            <div
              className={`flex-1 h-[2px] mt-[13px] ${
                step.state === "done" ? "bg-green-600" : "bg-white/10"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function KpiCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
      {KPIS.map((k) => (
        <div key={k.label} className="bg-white/5 rounded-xl p-3">
          <p className="text-[9px] font-bold tracking-widest uppercase text-slate-500 mb-1">{k.label}</p>
          <p className={`text-xl font-bold leading-none mb-1 ${k.valueClass}`}>{k.value}</p>
          <p className={`text-[9px] leading-snug ${k.subClass}`}>{k.sub}</p>
        </div>
      ))}
    </div>
  );
}

function SpendBars() {
  return (
    <div className="bg-white/5 rounded-xl p-4 flex flex-col justify-between">
      <p className="text-[9px] font-bold tracking-widest uppercase text-slate-500 mb-3">
        Spend by work head — budget vs actual
      </p>
      <div className="space-y-2.5">
        {BARS.map((b) => (
          <div key={b.label} className="flex items-center gap-2">
            <span className="text-[10px] text-slate-400 w-12 shrink-0">{b.label}</span>
            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${b.color}`}
                style={{ width: `${b.pct}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-300 font-medium w-7 text-right shrink-0">{b.pct}%</span>
          </div>
        ))}
      </div>

      {/* AI Alert bubble */}
      <div className="mt-4 bg-white rounded-xl px-4 py-3 flex items-start gap-2.5 shadow-xl border border-slate-100 w-fit max-w-full">
        <div className="w-2 h-2 rounded-full bg-green-500 mt-1 shrink-0" />
        <div>
          <p className="text-xs font-semibold text-slate-800">AI Alert</p>
          <p className="text-[10px] text-slate-500 leading-snug">
            Delay predicted: Project #47 — cement delivery 3 days late
          </p>
        </div>
      </div>
    </div>
  );
}

function ActivityFeed() {
  return (
    <div className="bg-white/5 rounded-xl p-4">
      <p className="text-[9px] font-bold tracking-widest uppercase text-slate-500 mb-3">Recent activity</p>
      <div className="space-y-3">
        {ACTIVITY.map((a, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className={`w-2 h-2 rounded-full shrink-0 mt-0.5 ${a.dot}`} />
            <p className="text-[10px] text-slate-400 leading-snug">{a.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Dashboard shell ──────────────────────────────────────────────────────────

function Dashboard() {
  return (
    <div className="relative animate-float bg-[#0B0F14] rounded-2xl p-4 md:p-6 w-full max-w-[860px] border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.5)]">

      {/* Top bar */}
      <div className="flex items-center gap-2 mb-5">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div className="bg-white/7 rounded-md px-3 py-1 text-[10px] text-slate-400 ml-1 border border-white/10">
          app.pashxd.com / projects / skyline-residences
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-[11px] text-slate-300 font-medium hidden sm:block">
            Skyline Residences — Tower B
          </span>
          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-[9px] font-bold text-white">
            SK
          </div>
        </div>
      </div>

      {/* Progress stepper */}
      <Stepper />

      {/* KPI row */}
      <KpiCards />

      {/* Bottom panels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <SpendBars />
        <ActivityFeed />
      </div>
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

export default function HeroSection() {
  const ref = useScrollReveal();

  return (
    <section
      ref={ref}
      className="relative pt-28 md:pt-36 pb-20 md:pb-28 bg-white overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-green-50/40" />

      <Container className="relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT */}
          <div>

            {/* Badge */}
            <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 border border-green-100 mb-6 md:mb-8">
              <div className="w-2 h-2 rounded-full bg-[#15803D] animate-pulse" />
              <span className="text-[11px] md:text-[12px] font-semibold uppercase tracking-widest text-[#15803D]">
                AI-Powered Operations
              </span>
            </div>

            {/* Heading */}
            <h1 className="reveal text-[2.25rem] sm:text-[3rem] md:text-[3.6rem] lg:text-[4.8rem] leading-[1.05] font-extrabold text-[#0A2540] mb-6 md:mb-8">
              The Operating System for{" "}
              <span className="text-[#15803D]">Physical Operations</span>
            </h1>

            {/* Subtext */}
            <p className="reveal reveal-delay-1 text-base md:text-xl text-slate-500 leading-relaxed mb-8 md:mb-10 max-w-xl">
              Unify procurement, project execution, and AI-driven decision-making
              in one platform. Stop managing operations across disconnected tools.
            </p>

            {/* Buttons */}
            <div className="reveal reveal-delay-2 flex flex-wrap gap-4 md:gap-5 mb-10 md:mb-12">
              <Link
                to="/contact"
                className="bg-[#15803D] hover:bg-[#166534] text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-sm md:text-base font-semibold transition-all duration-300 shadow-lg shadow-green-600/20 hover:-translate-y-[2px]"
              >
                Book a Demo →
              </Link>
              <Link
                to="/product"
                className="border border-slate-200 px-6 md:px-8 py-3 md:py-4 rounded-full text-sm md:text-base font-semibold text-slate-600 hover:bg-slate-50 transition-all duration-300"
              >
                ▶ See Platform
              </Link>
            </div>

            {/* KPIs */}
            <div className="reveal reveal-delay-3 flex flex-wrap gap-8 md:gap-16 text-sm">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-[#15803D]">50%</div>
                <div className="text-slate-400 mt-1">Faster Procurement</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-[#15803D]">3x</div>
                <div className="text-slate-400 mt-1">Cost Visibility</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-[#15803D]">90%</div>
                <div className="text-slate-400 mt-1">Automation Rate</div>
              </div>
            </div>

          </div>

          {/* RIGHT — DASHBOARD */}
          <div className="relative flex justify-center lg:justify-end">

            {/* Glow */}
            <div className="absolute w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-green-300/30 blur-[140px] rounded-full" />

            {/* New dashboard */}
            <div className="reveal reveal-delay-2 relative w-full max-w-[860px]">
              <Dashboard />
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}