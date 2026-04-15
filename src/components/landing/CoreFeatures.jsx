import {
  ShoppingCart,
  Network,
  Truck,
  FileCheck,
  LayoutDashboard,
  ListTodo,
  Calculator,
  MapPin,
  Brain,
  TrendingDown,
  UserCheck,
  Zap,
} from "lucide-react";

import { useState } from "react";

const tabs = [
  { id: "procurement", label: "Procurement OS" },
  { id: "execution", label: "Execution Layer" },
  { id: "ai", label: "AI Intelligence" },
];

export default function CoreFeatures() {
  const [active, setActive] = useState("procurement");

  return (
    <section className="py-28 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6">


        {/* HEADER */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.2em] text-green-600 font-semibold mb-4">
            CORE PLATFORM
          </p>

          <h2 className="text-[40px] font-bold text-[#0A2540] mb-4">
            Three Pillars, One Platform
          </h2>

          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            PashxD combines procurement, execution, and AI intelligence into a seamless operational engine.
          </p>
        </div>

        {/* TABS */}
        <div className="flex justify-center gap-10 border-b border-slate-200 mb-16">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`pb-4 text-sm font-medium transition ${
                active === tab.id
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-slate-400 hover:text-[#0A2540]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div>
            <p className="text-slate-400 mb-8 text-sm">
              {active === "procurement" && "From order to invoice — automated"}
              {active === "execution" && "Projects delivered — on time, on budget"}
              {active === "ai" && "Decisions powered by data, not guesswork"}
            </p>

            <div className="grid grid-cols-2 gap-6">
              {active === "procurement" && (
                <>
                  <Card icon={ShoppingCart} title="Order Management" desc="Create, approve, and track purchase orders with configurable workflows." />
                  <Card icon={Network} title="Supplier Network" desc="Manage vendors, contracts, and performance in one place." />
                  <Card icon={Truck} title="Delivery Tracking" desc="Real-time shipment visibility and tracking." />
                  <Card icon={FileCheck} title="Invoice Matching" desc="Automated 3-way matching of PO, delivery, and invoice." />
                </>
              )}

              {active === "execution" && (
                <>
                  <Card icon={LayoutDashboard} title="Project Dashboards" desc="Real-time progress, milestones, and tracking." />
                  <Card icon={ListTodo} title="Task Management" desc="Assign and track tasks across teams." />
                  <Card icon={Calculator} title="BOQ-Based Planning" desc="Budget vs actual tracking across projects." />
                  <Card icon={MapPin} title="Site Progress Tracking" desc="Live updates with field tracking." />
                </>
              )}

              {active === "ai" && (
                <>
                  <Card icon={Brain} title="Delay Prediction" desc="Predict project delays before they happen." />
                  <Card icon={TrendingDown} title="Cost Overrun Detection" desc="Detect cost overruns instantly." />
                  <Card icon={UserCheck} title="Smart Supplier Recs" desc="AI-powered vendor selection." />
                  <Card icon={Zap} title="Workflow Automation" desc="Automate approvals and operations." />
                </>
              )}
            </div>
          </div>

          {/* RIGHT DASHBOARD */}
          <div className="flex justify-center">
            {active === "procurement" && <ProcurementDashboard />}
            {active === "execution" && <ExecutionDashboard />}
            {active === "ai" && <AIDashboard />}
          </div>

        </div>
      </div>
    </section>
  );
}

/* CARD */
function Card({ icon: Icon, title, desc }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition hover:-translate-y-1">
      <Icon className="w-5 h-5 text-green-600 mb-4" />
      <h4 className="font-semibold text-[#0A2540] mb-2">{title}</h4>
      <p className="text-sm text-slate-500">{desc}</p>
    </div>
  );
}

/* PROCUREMENT DASHBOARD */
function ProcurementDashboard() {
  return (
    <DashboardWrapper title="Procurement Dashboard">
      <KPIGrid
        items={[
          { label: "ACTIVE POS", value: "847" },
          { label: "PENDING INVOICES", value: "124" },
          { label: "ON-TIME DELIVERY", value: "94.2%" },
        ]}
      />
      <Table
        rows={[
          ["PO-7821", "Steel Corp", "$148,200", "Approved", "green"],
          ["PO-7820", "CemTech Ltd", "$67,500", "In Review", "yellow"],
          ["PO-7819", "BuildMat Co", "$23,400", "Delivered", "blue"],
          ["PO-7818", "ElecPower", "$92,100", "Processing", "gray"],
        ]}
      />
    </DashboardWrapper>
  );
}

/* EXECUTION DASHBOARD — FULL FIX */
function ExecutionDashboard() {
  return (
    <DashboardWrapper title="Execution Dashboard">
      <KPIGrid
        items={[
          { label: "ACTIVE PROJECTS", value: "56", sub: "+4" },
          { label: "TASKS COMPLETE", value: "78%", sub: "+5%" },
          { label: "BUDGET UTILIZED", value: "64%", sub: "On Track" },
        ]}
      />

      <div className="bg-white/5 rounded-xl mt-4 overflow-hidden">
        <div className="grid grid-cols-4 text-xs text-slate-500 px-4 py-3 border-b border-white/10">
          <span>PROJECT</span>
          <span>PHASE</span>
          <span>PROGRESS</span>
          <span>STATUS</span>
        </div>

        {[
          ["Site A — Tower 3", "Foundation", "72%", "On Track", "green"],
          ["Store #142", "Interior", "45%", "At Risk", "yellow"],
          ["Warehouse Exp.", "Structure", "88%", "Ahead", "green"],
          ["Solar Farm P2", "Electrical", "31%", "On Track", "green"],
        ].map((row, i) => (
          <div key={i} className="grid grid-cols-4 px-4 py-3 text-sm border-b border-white/5 last:border-0">
            <span className="text-white">{row[0]}</span>
            <span className="text-slate-400">{row[1]}</span>
            <span className="text-white">{row[2]}</span>
            <span className={statusColor(row[4])}>{row[3]}</span>
          </div>
        ))}
      </div>
    </DashboardWrapper>
  );
}

/* AI DASHBOARD — FULL FIX */
function AIDashboard() {
  return (
    <DashboardWrapper title="AI Intelligence Panel">
      <KPIGrid
        items={[
          { label: "PREDICTIONS", value: "1,247", sub: "98.2% accuracy", color: "yellow" },
          { label: "ALERTS RESOLVED", value: "342", sub: "This month", color: "yellow" },
          { label: "COST SAVED", value: "$2.1M", sub: "AI-detected", color: "yellow" },
        ]}
      />

      <div className="mt-4 space-y-3">
        <Alert color="red" text="Project #47: Cement delivery 3 days late — reroute recommended" />
        <Alert color="yellow" text="Vendor XYZ: Invoice mismatch $4,200 — auto-escalated" />
        <Alert color="green" text="Project #31: On track to complete 5 days early" />
      </div>
    </DashboardWrapper>
  );
}

/* SHARED COMPONENTS */

function DashboardWrapper({ title, children }) {
  return (
    <div className="bg-[#0B0F14] rounded-2xl p-6 w-[580px] shadow-[0_30px_80px_rgba(0,0,0,0.5)] border border-white/5">
      <div className="text-slate-400 text-xs mb-4">{title}</div>
      {children}
    </div>
  );
}

function KPIGrid({ items }) {
  return (
    <div className="grid grid-cols-3 gap-4 text-white">
      {items.map((item, i) => (
        <div key={i} className="bg-white/5 rounded-xl p-4">
          <p className="text-xs text-slate-400">{item.label}</p>
          <h3 className={`text-xl font-bold mt-1 ${item.color === "yellow" ? "text-yellow-400" : "text-green-400"}`}>
            {item.value}
          </h3>
          {item.sub && <p className="text-xs text-slate-500 mt-1">{item.sub}</p>}
        </div>
      ))}
    </div>
  );
}

function Table({ rows }) {
  return (
    <div className="bg-white/5 rounded-xl mt-4 p-4 text-xs">
      {rows.map((r, i) => (
        <div key={i} className="grid grid-cols-4 py-2 border-b border-white/10 last:border-0">
          <span className="text-green-400">{r[0]}</span>
          <span className="text-slate-400">{r[1]}</span>
          <span className="text-white">{r[2]}</span>
          <span className={statusColor(r[4])}>{r[3]}</span>
        </div>
      ))}
    </div>
  );
}

function Alert({ color, text }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${alertBorder(color)} bg-white/5`}>
      <div className={`w-2 h-2 rounded-full ${alertDot(color)}`} />
      <span className="text-sm text-slate-300">{text}</span>
    </div>
  );
}

/* COLORS */
function statusColor(c) {
  if (c === "green") return "text-emerald-400";
  if (c === "yellow") return "text-yellow-400";
  return "text-slate-400";
}

function alertDot(c) {
  if (c === "red") return "bg-red-500";
  if (c === "yellow") return "bg-yellow-400";
  return "bg-emerald-400";
}

function alertBorder(c) {
  if (c === "red") return "border-red-500/20";
  if (c === "yellow") return "border-yellow-500/20";
  return "border-emerald-500/20";
}