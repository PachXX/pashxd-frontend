import { ShoppingCart, Truck, FileCheck, Network, LayoutDashboard, ListTodo, Calculator, MapPin, Brain, TrendingDown, UserCheck, Zap, ArrowRight, Database, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";

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
  { name: "SAP", desc: "ERP" }, { name: "Tally", desc: "Accounting" }, { name: "Zoho", desc: "CRM" },
  { name: "MS BC", desc: "Business Central" }, { name: "Odoo", desc: "ERP" }, { name: "QuickBooks", desc: "Finance" },
];

function FeatureGrid({ features, accentColor }) {
  const map = { emerald: "text-emerald-600 bg-emerald-50 border-emerald-100", blue: "text-blue-600 bg-blue-50 border-blue-100", amber: "text-amber-600 bg-amber-50 border-amber-100" };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {features.map((f) => (
        <div key={f.title} className="bg-white border border-gray-100 rounded-xl p-6 card-glow shadow-sm transition-all duration-300">
          <div className={`w-10 h-10 rounded-lg ${map[accentColor]} border flex items-center justify-center mb-4`}><f.icon className="h-5 w-5" /></div>
          <h3 className="text-base font-semibold mb-2 text-gray-900" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>{f.title}</h3>
          <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
        </div>
      ))}
    </div>
  );
}

function DarkDashboard({ title, children }) {
  return (
    <div className="dashboard-dark rounded-2xl border border-gray-200 overflow-hidden shadow-xl">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5" style={{ background: '#111114' }}>
        <div className="flex gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500/60" /><div className="w-2 h-2 rounded-full bg-yellow-500/60" /><div className="w-2 h-2 rounded-full bg-emerald-500/60" /></div>
        <span className="text-[10px] text-gray-500 ml-2 font-mono-data">{title}</span>
      </div>
      <div className="p-4" style={{ background: '#0c0c0f' }}>{children}</div>
    </div>
  );
}

export default function ProductPage() {
  const ref = useScrollReveal();
  return (
    <div data-testid="product-page" ref={ref} className="pt-20">
      <section className="py-24 bg-white relative">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `radial-gradient(circle at 30% 40%, rgba(16,185,129,0.08) 0%, transparent 50%)` }} />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <span className="reveal text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">Product</span>
          <h1 className="reveal text-4xl sm:text-5xl lg:text-6xl tracking-tighter font-black mt-4 mb-6 text-gray-900" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>One Platform for Your Entire Operation</h1>
          <p className="reveal reveal-delay-1 text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto">PashxD combines procurement automation, project execution, and AI-driven intelligence into a single workspace designed for enterprises managing physical operations at scale.</p>
        </div>
      </section>

      {/* Procurement */}
      <section id="procurement" className="py-24 section-alt">
        <div className="max-w-7xl mx-auto px-6">
          <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">Pillar 01</span>
              <h2 className="text-3xl sm:text-4xl tracking-tight font-bold mt-4 mb-6 text-gray-900" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>Procurement OS</h2>
              <p className="text-gray-500 text-base leading-relaxed mb-8">From order to invoice — automated. Manage your entire procurement lifecycle with configurable workflows, real-time tracking, and automated invoice matching.</p>
              <FeatureGrid features={procurementFeatures} accentColor="emerald" />
            </div>
            <div className="sticky top-24">
              <DarkDashboard title="Procurement OS">
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {[{ l: "Total POs", v: "4,283", c: "+12%" }, { l: "Delivered", v: "3,891", c: "90.8%" }, { l: "Pending", v: "392", c: "-5%" }].map((k) => (
                    <div key={k.l} className="rounded-lg p-3 border border-white/5" style={{ background: '#15151a' }}>
                      <div className="text-[9px] text-gray-500 uppercase tracking-wider">{k.l}</div>
                      <div className="text-lg font-bold font-mono-data text-emerald-400 mt-1">{k.v}</div>
                      <div className="text-[9px] text-gray-600">{k.c}</div>
                    </div>
                  ))}
                </div>
                <div className="rounded-lg border border-white/5 p-3" style={{ background: '#15151a' }}>
                  <div className="text-[9px] uppercase tracking-wider text-gray-500 mb-2">Spend by Category</div>
                  {[{ cat: "Steel & Metals", pct: 38, val: "$2.4M" }, { cat: "Cement & Concrete", pct: 25, val: "$1.6M" }, { cat: "Electrical", pct: 18, val: "$1.1M" }, { cat: "Finishing", pct: 12, val: "$780K" }].map((c) => (
                    <div key={c.cat} className="flex items-center gap-3 mb-2 last:mb-0">
                      <span className="text-[10px] text-gray-500 w-28 truncate">{c.cat}</span>
                      <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-emerald-500/60 rounded-full" style={{ width: `${c.pct}%` }} /></div>
                      <span className="text-[10px] font-mono-data text-white w-14 text-right">{c.val}</span>
                    </div>
                  ))}
                </div>
              </DarkDashboard>
            </div>
          </div>
        </div>
      </section>

      {/* Execution */}
      <section id="execution" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="order-2 lg:order-1 sticky top-24">
              <DarkDashboard title="Execution Layer">
                <div className="grid grid-cols-2 gap-3 mb-3">
                  {[{ l: "Active Projects", v: "56" }, { l: "Completion Rate", v: "78%" }].map((k) => (
                    <div key={k.l} className="rounded-lg p-3 border border-white/5" style={{ background: '#15151a' }}>
                      <div className="text-[9px] text-gray-500 uppercase tracking-wider">{k.l}</div>
                      <div className="text-lg font-bold font-mono-data text-blue-400 mt-1">{k.v}</div>
                    </div>
                  ))}
                </div>
                <div className="rounded-lg border border-white/5 p-3" style={{ background: '#15151a' }}>
                  <div className="text-[9px] uppercase tracking-wider text-gray-500 mb-3">Project Timeline</div>
                  {[{ n: "Tower 3 - Foundation", w: "85%", c: "bg-emerald-500" }, { n: "Store #142 - Fit-Out", w: "45%", c: "bg-amber-500" }, { n: "Warehouse - Structure", w: "92%", c: "bg-blue-500" }, { n: "Solar Farm - Phase 2", w: "31%", c: "bg-emerald-500" }].map((p) => (
                    <div key={p.n} className="mb-3 last:mb-0">
                      <div className="flex justify-between mb-1"><span className="text-[10px] text-white">{p.n}</span><span className="text-[10px] font-mono-data text-gray-500">{p.w}</span></div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden"><div className={`h-full ${p.c} rounded-full`} style={{ width: p.w }} /></div>
                    </div>
                  ))}
                </div>
              </DarkDashboard>
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">Pillar 02</span>
              <h2 className="text-3xl sm:text-4xl tracking-tight font-bold mt-4 mb-6 text-gray-900" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>Execution Layer</h2>
              <p className="text-gray-500 text-base leading-relaxed mb-8">Projects delivered — on time, on budget. Manage tasks, track site progress, and keep every stakeholder aligned from design to handover.</p>
              <FeatureGrid features={executionFeatures} accentColor="blue" />
            </div>
          </div>
        </div>
      </section>

      {/* AI */}
      <section id="ai" className="py-24 section-alt">
        <div className="max-w-7xl mx-auto px-6">
          <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">Pillar 03</span>
              <h2 className="text-3xl sm:text-4xl tracking-tight font-bold mt-4 mb-6 text-gray-900" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>AI Intelligence Layer</h2>
              <p className="text-gray-500 text-base leading-relaxed mb-8">Decisions powered by data, not guesswork. PashxD's AI layer analyzes your operations to predict problems, optimize costs, and automate workflows.</p>
              <FeatureGrid features={aiFeatures} accentColor="amber" />
            </div>
            <div className="sticky top-24">
              <DarkDashboard title="AI Intelligence">
                <div className="rounded-lg p-3 border border-amber-500/20 mb-3" style={{ background: '#15151a' }}>
                  <div className="flex items-center gap-2 mb-2"><Brain className="h-3.5 w-3.5 text-amber-400" /><span className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider">AI Copilot</span></div>
                  <div className="text-xs text-gray-400 leading-relaxed">"Based on current procurement patterns and weather data, I predict a 3-day delay on cement delivery for Project #47. Recommend rerouting to Vendor B."</div>
                </div>
                <div className="space-y-2">
                  {[{ s: "critical", t: "Cost overrun alert: Tower 3 electrical +$18K projected" }, { s: "warning", t: "Invoice mismatch: PO-7820 vs INV-3421 — $4,200 difference" }, { s: "success", t: "Project #31 on track for early completion — 5 days ahead" }].map((a, i) => (
                    <div key={i} className={`flex items-start gap-2 rounded-lg p-3 border ${a.s === "critical" ? "border-red-500/20" : a.s === "warning" ? "border-amber-500/20" : "border-emerald-500/20"}`} style={{ background: '#15151a' }}>
                      <div className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${a.s === "critical" ? "bg-red-500" : a.s === "warning" ? "bg-amber-500" : "bg-emerald-500"}`} />
                      <span className="text-[11px] text-gray-400">{a.t}</span>
                    </div>
                  ))}
                </div>
              </DarkDashboard>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section id="integrations" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="reveal text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">Integrations</span>
          <h2 className="reveal text-3xl sm:text-4xl tracking-tight font-bold mt-4 mb-4 text-gray-900" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>Seamlessly Integrated</h2>
          <p className="reveal text-gray-500 max-w-lg mx-auto mb-12">PashxD connects with your existing ERP, accounting, and business systems.</p>
          <div className="reveal grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {integrations.map((int) => (
              <div key={int.name} className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col items-center card-glow shadow-sm transition-all duration-300">
                <Database className="h-6 w-6 text-emerald-500/60 mb-2" /><span className="text-sm font-semibold text-gray-900">{int.name}</span><span className="text-[10px] text-gray-400">{int.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="py-24 section-alt">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Lock className="reveal h-8 w-8 text-emerald-600 mx-auto mb-4" />
          <h2 className="reveal text-2xl sm:text-3xl tracking-tight font-bold mb-4 text-gray-900" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>Enterprise-Grade Security</h2>
          <p className="reveal text-gray-500 mb-8">SOC 2 compliant, end-to-end encryption, role-based access control, and audit trails for every action.</p>
          <div className="reveal flex flex-wrap gap-4 justify-center">
            {["SOC 2 Type II", "256-bit Encryption", "RBAC", "SSO Ready", "Audit Logs"].map((s) => (
              <span key={s} className="px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 text-xs font-medium">{s}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="reveal text-3xl sm:text-4xl tracking-tight font-bold mb-6 text-gray-900" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>Ready to Unify Your Operations?</h2>
          <Link to="/contact"><Button data-testid="product-cta" className="bg-emerald-600 hover:bg-emerald-700 text-white h-12 px-8 rounded-full text-sm font-semibold shadow-lg shadow-emerald-600/20 hover:-translate-y-0.5 transition-all duration-300">Book a Demo <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
        </div>
      </section>
    </div>
  );
}
