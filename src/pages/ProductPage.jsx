import {
  ShoppingCart,
  Truck,
  FileCheck,
  Network,
  LayoutDashboard,
  ListTodo,
  Calculator,
  MapPin,
  Brain,
  TrendingDown,
  UserCheck,
  Zap,
  ArrowRight,
  Database,
  Lock,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Container from "../components/layout/Container";

const procurementFeatures = [
  { icon: ShoppingCart, title: "Order Management", desc: "Configurable approval chains, multi-level authorization, and automated PO generation from BOQ items." },
  { icon: Network, title: "Supplier Network", desc: "Rate contracts, performance scoring, and a centralized vendor database with complete transaction history." },
  { icon: Truck, title: "Delivery Tracking", desc: "Real-time shipment tracking, digital delivery notes with photo verification, and automated GRN generation." },
  { icon: FileCheck, title: "Invoice Matching", desc: "Automated 3-way matching of PO, delivery, and invoice. ZUGFeRD, PDF, and XML support." },
];
const executionFeatures = [
  { icon: LayoutDashboard, title: "Project Dashboards", desc: "Unified view with milestones, Gantt charts, and critical path analysis across all active projects." },
  { icon: ListTodo, title: "Task & Workflow", desc: "Customizable workflows with automated assignments, dependencies, and escalation rules." },
  { icon: Calculator, title: "BOQ-Based Planning", desc: "Link bill of quantities directly to procurement and execution — budget vs. actual at every level." },
  { icon: MapPin, title: "Site Progress", desc: "Mobile-first daily progress reports with photo documentation, completion tracking, and snag management." },
];
const aiFeatures = [
  { icon: Brain, title: "Delay Prediction", desc: "Machine learning models analyze historical patterns, weather, and supply chain data to predict delays." },
  { icon: TrendingDown, title: "Cost Overrun Detection", desc: "Continuous budget trajectory monitoring with automated alerts when costs deviate from plan." },
  { icon: UserCheck, title: "Smart Supplier Recs", desc: "AI-powered vendor recommendations based on pricing, reliability, location, and capacity." },
  { icon: Zap, title: "Workflow Automation", desc: "Intelligent routing of approvals, notifications, and escalations based on project context." },
];
const integrations = [
  { name: "SAP", desc: "ERP" },
  { name: "Tally", desc: "Accounting" },
  { name: "Zoho", desc: "CRM" },
  { name: "MS BC", desc: "Business Central" },
  { name: "Odoo", desc: "ERP" },
  { name: "QuickBooks", desc: "Finance" },
];

function FeatureGrid({ features, accentColor }) {
  const map = {
    green: "text-[#15803D] bg-green-50 border-green-100",
    blue: "text-blue-600 bg-blue-50 border-blue-100",
    amber: "text-amber-600 bg-amber-50 border-amber-100",
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {features.map((f) => (
        <div
          key={f.title}
          className="bg-white border border-slate-200 rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-green-200 transition-all duration-300"
        >
          <div className={`w-10 h-10 rounded-lg ${map[accentColor]} border flex items-center justify-center mb-4`}>
            <f.icon className="h-5 w-5" />
          </div>
          <h3 className="text-base font-semibold mb-2 text-[#0A2540]">
            {f.title}
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
        </div>
      ))}
    </div>
  );
}

function DarkDashboard({ title, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-xl">
      <div
        className="flex items-center gap-2 px-4 py-3 border-b border-white/5"
        style={{ background: "#111114" }}
      >
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/60" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
          <div className="w-2 h-2 rounded-full bg-emerald-500/60" />
        </div>
        <span className="text-[10px] text-slate-500 ml-2 font-mono-data">
          {title}
        </span>
      </div>
      <div className="p-4" style={{ background: "#0c0c0f" }}>
        {children}
      </div>
    </div>
  );
}

export default function ProductPage() {
  const ref = useScrollReveal();

  return (
    <div data-testid="product-page" ref={ref} className="pt-20 md:pt-24">

      {/* ============ HERO ============ */}
      <section className="py-16 md:py-24 bg-white relative">
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 40%, rgba(21, 128, 61, 0.08) 0%, transparent 50%)`,
          }}
        />
        <Container className="relative max-w-4xl text-center">
          <span className="reveal text-xs font-bold uppercase tracking-[0.25em] text-[#15803D]">
            Product
          </span>
          <h1 className="reveal text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight font-extrabold mt-4 mb-5 md:mb-6 text-[#0A2540] leading-[1.1]">
            One Platform for Your{" "}
            <span className="bg-gradient-to-r from-[#15803D] to-[#22C55E] bg-clip-text text-transparent">
              Entire Operation
            </span>
          </h1>
          <p className="reveal reveal-delay-1 text-base md:text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
            PashxD combines procurement automation, project execution, and AI-driven intelligence into a single workspace designed for enterprises managing physical operations at scale.
          </p>
        </Container>
      </section>

      {/* ============ PROCUREMENT ============ */}
      <section id="procurement" className="py-16 md:py-24 bg-slate-50">
        <Container>
          <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#15803D]">
                Pillar 01
              </span>
              <h2 className="text-3xl sm:text-4xl tracking-tight font-bold mt-4 mb-5 md:mb-6 text-[#0A2540] leading-tight">
                Procurement OS
              </h2>
              <p className="text-slate-500 text-base leading-relaxed mb-6 md:mb-8">
                From order to invoice — automated. Manage your entire procurement lifecycle with configurable workflows, real-time tracking, and automated invoice matching.
              </p>
              <FeatureGrid features={procurementFeatures} accentColor="green" />
            </div>
            <div className="lg:sticky lg:top-24">
              <DarkDashboard title="Procurement OS">
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {[
                    { l: "Total POs", v: "4,283", c: "+12%" },
                    { l: "Delivered", v: "3,891", c: "90.8%" },
                    { l: "Pending", v: "392", c: "-5%" },
                  ].map((k) => (
                    <div
                      key={k.l}
                      className="rounded-lg p-3 border border-white/5"
                      style={{ background: "#15151a" }}
                    >
                      <div className="text-[9px] text-slate-500 uppercase tracking-wider">{k.l}</div>
                      <div className="text-lg font-bold font-mono-data text-green-400 mt-1">{k.v}</div>
                      <div className="text-[9px] text-slate-600">{k.c}</div>
                    </div>
                  ))}
                </div>
                <div
                  className="rounded-lg border border-white/5 p-3"
                  style={{ background: "#15151a" }}
                >
                  <div className="text-[9px] uppercase tracking-wider text-slate-500 mb-2">
                    Spend by Category
                  </div>
                  {[
                    { cat: "Steel & Metals", pct: 38, val: "$2.4M" },
                    { cat: "Cement & Concrete", pct: 25, val: "$1.6M" },
                    { cat: "Electrical", pct: 18, val: "$1.1M" },
                    { cat: "Finishing", pct: 12, val: "$780K" },
                  ].map((c) => (
                    <div key={c.cat} className="flex items-center gap-3 mb-2 last:mb-0">
                      <span className="text-[10px] text-slate-500 w-24 md:w-28 truncate">{c.cat}</span>
                      <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500/60 rounded-full"
                          style={{ width: `${c.pct}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-mono-data text-white w-12 md:w-14 text-right">
                        {c.val}
                      </span>
                    </div>
                  ))}
                </div>
              </DarkDashboard>
            </div>
          </div>
        </Container>
      </section>

      {/* ============ EXECUTION ============ */}
      <section id="execution" className="py-16 md:py-24 bg-white">
        <Container>
          <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
            <div className="order-2 lg:order-1 lg:sticky lg:top-24">
              <DarkDashboard title="Execution Layer">
                <div className="grid grid-cols-2 gap-3 mb-3">
                  {[
                    { l: "Active Projects", v: "56" },
                    { l: "Completion Rate", v: "78%" },
                  ].map((k) => (
                    <div
                      key={k.l}
                      className="rounded-lg p-3 border border-white/5"
                      style={{ background: "#15151a" }}
                    >
                      <div className="text-[9px] text-slate-500 uppercase tracking-wider">{k.l}</div>
                      <div className="text-lg font-bold font-mono-data text-blue-400 mt-1">{k.v}</div>
                    </div>
                  ))}
                </div>
                <div
                  className="rounded-lg border border-white/5 p-3"
                  style={{ background: "#15151a" }}
                >
                  <div className="text-[9px] uppercase tracking-wider text-slate-500 mb-3">
                    Project Timeline
                  </div>
                  {[
                    { n: "Tower 3 - Foundation", w: "85%", c: "bg-green-500" },
                    { n: "Store #142 - Fit-Out", w: "45%", c: "bg-amber-500" },
                    { n: "Warehouse - Structure", w: "92%", c: "bg-blue-500" },
                    { n: "Solar Farm - Phase 2", w: "31%", c: "bg-green-500" },
                  ].map((p) => (
                    <div key={p.n} className="mb-3 last:mb-0">
                      <div className="flex justify-between mb-1">
                        <span className="text-[10px] text-white truncate">{p.n}</span>
                        <span className="text-[10px] font-mono-data text-slate-500">{p.w}</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full ${p.c} rounded-full`} style={{ width: p.w }} />
                      </div>
                    </div>
                  ))}
                </div>
              </DarkDashboard>
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-blue-600">
                Pillar 02
              </span>
              <h2 className="text-3xl sm:text-4xl tracking-tight font-bold mt-4 mb-5 md:mb-6 text-[#0A2540] leading-tight">
                Execution Layer
              </h2>
              <p className="text-slate-500 text-base leading-relaxed mb-6 md:mb-8">
                Projects delivered — on time, on budget. Manage tasks, track site progress, and keep every stakeholder aligned from design to handover.
              </p>
              <FeatureGrid features={executionFeatures} accentColor="blue" />
            </div>
          </div>
        </Container>
      </section>

      {/* ============ AI ============ */}
      <section id="ai" className="py-16 md:py-24 bg-slate-50">
        <Container>
          <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-600">
                Pillar 03
              </span>
              <h2 className="text-3xl sm:text-4xl tracking-tight font-bold mt-4 mb-5 md:mb-6 text-[#0A2540] leading-tight">
                AI Intelligence Layer
              </h2>
              <p className="text-slate-500 text-base leading-relaxed mb-6 md:mb-8">
                Decisions powered by data, not guesswork. PashxD's AI layer analyzes your operations to predict problems, optimize costs, and automate workflows.
              </p>
              <FeatureGrid features={aiFeatures} accentColor="amber" />
            </div>
            <div className="lg:sticky lg:top-24">
              <DarkDashboard title="AI Intelligence">
                <div
                  className="rounded-lg p-3 border border-amber-500/20 mb-3"
                  style={{ background: "#15151a" }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="h-3.5 w-3.5 text-amber-400" />
                    <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider">
                      AI Copilot
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 leading-relaxed">
                    "Based on current procurement patterns and weather data, I predict a 3-day delay on cement delivery for Project #47. Recommend rerouting to Vendor B."
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    { s: "critical", t: "Cost overrun alert: Tower 3 electrical +$18K projected" },
                    { s: "warning", t: "Invoice mismatch: PO-7820 vs INV-3421 — $4,200 difference" },
                    { s: "success", t: "Project #31 on track for early completion — 5 days ahead" },
                  ].map((a, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-2 rounded-lg p-3 border ${
                        a.s === "critical"
                          ? "border-red-500/20"
                          : a.s === "warning"
                          ? "border-amber-500/20"
                          : "border-green-500/20"
                      }`}
                      style={{ background: "#15151a" }}
                    >
                      <div
                        className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${
                          a.s === "critical"
                            ? "bg-red-500"
                            : a.s === "warning"
                            ? "bg-amber-500"
                            : "bg-green-500"
                        }`}
                      />
                      <span className="text-[11px] text-slate-400">{a.t}</span>
                    </div>
                  ))}
                </div>
              </DarkDashboard>
            </div>
          </div>
        </Container>
      </section>

      {/* ============ INTEGRATIONS ============ */}
      <section id="integrations" className="py-16 md:py-24 bg-white">
        <Container className="text-center">
          <span className="reveal text-xs font-bold uppercase tracking-[0.25em] text-[#15803D]">
            Integrations
          </span>
          <h2 className="reveal text-3xl sm:text-4xl tracking-tight font-bold mt-4 mb-3 md:mb-4 text-[#0A2540]">
            Seamlessly Integrated
          </h2>
          <p className="reveal text-slate-500 max-w-lg mx-auto mb-10 md:mb-12 text-base">
            PashxD connects with your existing ERP, accounting, and business systems.
          </p>
          <div className="reveal grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
            {integrations.map((int) => (
              <div
                key={int.name}
                className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col items-center shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-green-200 transition-all duration-300"
              >
                <Database className="h-6 w-6 text-[#15803D]/70 mb-2" />
                <span className="text-sm font-semibold text-[#0A2540]">{int.name}</span>
                <span className="text-[10px] text-slate-400">{int.desc}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ============ SECURITY ============ */}
      <section className="py-16 md:py-24 bg-slate-50">
        <Container className="max-w-4xl text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-50 border border-green-100 mb-5 mx-auto">
            <Lock className="reveal h-6 w-6 text-[#15803D]" />
          </div>
          <h2 className="reveal text-2xl sm:text-3xl md:text-4xl tracking-tight font-bold mb-4 text-[#0A2540] leading-tight">
            Enterprise-Grade Security
          </h2>
          <p className="reveal text-slate-500 mb-8 text-base md:text-lg">
            SOC 2 compliant, end-to-end encryption, role-based access control, and audit trails for every action.
          </p>
          <div className="reveal flex flex-wrap gap-2 md:gap-3 justify-center">
            {["SOC 2 Type II", "256-bit Encryption", "RBAC", "SSO Ready", "Audit Logs"].map((s) => (
              <span
                key={s}
                className="px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-green-50 text-[#15803D] border border-green-100 text-xs font-medium"
              >
                {s}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-16 md:py-24 bg-white">
        <Container className="max-w-4xl">
          <div className="reveal relative bg-gradient-to-br from-[#15803D] to-[#166534] rounded-3xl p-8 md:p-12 text-center shadow-[0_20px_60px_rgba(21,128,61,0.25)] overflow-hidden">

            {/* Ambient glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-400/20 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative">
              <h2 className="text-2xl sm:text-3xl md:text-4xl tracking-tight font-bold mb-4 md:mb-6 text-white leading-tight">
                Ready to Unify Your Operations?
              </h2>
              <p className="text-green-100 mb-8 max-w-lg mx-auto text-sm md:text-base">
                Book a personalized demo and see how PashxD transforms your workflows.
              </p>
              <Link to="/book-demo">
                <Button
                  data-testid="product-cta"
                  className="bg-white hover:bg-slate-50 text-[#15803D] h-12 px-7 md:px-8 rounded-full text-sm md:text-base font-semibold shadow-lg hover:-translate-y-[2px] transition-all duration-300"
                >
                  Book a Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}