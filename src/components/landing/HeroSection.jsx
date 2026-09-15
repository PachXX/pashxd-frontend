import { useState } from "react";
import { ArrowRight, Check, ArrowUpRight, Building2, CircleCheck, Clock3 } from "lucide-react";
import BrandMark from "../BrandMark";
import Container from "../layout/Container";
import CtaLink from "../CtaLink";
import "../../styles/landing.css";

const views = {
  Overview: { title: "Skyline Residences", subtitle: "Tower B · Project overview", stats: [["Budget used", "82%"], ["Completion", "64%"], ["Open snags", "12"]], rows: [["Civil works", 71], ["MEP installation", 58], ["Finishes", 34]], alert: "Cement delivery needs attention", detail: "A delivery delay may affect the next milestone. Review the supplier update before rescheduling." },
  Procurement: { title: "Materials, accounted for.", subtitle: "Tower B · Procurement", stats: [["Open orders", "24"], ["Confirmed", "18"], ["To review", "6"]], rows: [["Steel delivered", 85], ["Cement delivered", 62], ["Electrical delivered", 40]], alert: "Supplier confirmation pending", detail: "PO-2214 is awaiting a delivery date. Keep the order, supplier conversation and next action together." },
  Execution: { title: "Every site. One picture.", subtitle: "Tower B · Execution", stats: [["Tasks complete", "64%"], ["In progress", "28"], ["To inspect", "12"]], rows: [["Structure", 92], ["Services", 58], ["Interiors", 34]], alert: "Flooring inspection due", detail: "Block A is ready for quality review. Record the inspection before the next stage is approved." },
};

function Dashboard() {
  const [selected, setSelected] = useState("Overview");
  const view = views[selected];
  return (
    <div className="os-dashboard">
      <div className="os-dashboard-top"><span className="flex items-center gap-2 font-semibold"><BrandMark className="h-6 w-6" /> PxD <span className="font-normal text-slate-400">/ workspace</span></span><span className="os-example">Illustrative demo</span></div>
      <div className="os-dashboard-body">
        <div className="os-dashboard-heading"><div><p>{view.subtitle}</p><h2>{view.title}</h2></div><Building2 size={27} className="text-slate-400" /></div>
        <div className="os-tabs" role="group" aria-label="Dashboard preview">
          {Object.keys(views).map(name => <button key={name} type="button" aria-pressed={selected === name} onClick={() => setSelected(name)}>{name}</button>)}
        </div>
        <div aria-live="polite" aria-atomic="true">
          <div className="os-stats">{view.stats.map(([label, value]) => <div key={label}><p>{label}</p><strong>{value}</strong></div>)}</div>
          <div className="os-progress"><div className="flex items-center justify-between mb-5"><h3>Progress by workstream</h3><span className="text-xs text-slate-400">Sample project</span></div>{view.rows.map(([label, value]) => <div className="os-progress-row" key={label}><span>{label}</span><div><i style={{ width: `${value}%` }} /></div><b>{value}%</b></div>)}</div>
          <div className="os-alert"><Clock3 size={18} className="shrink-0 text-amber-300 mt-1" /><div><strong>{view.alert}</strong><p>{view.detail}</p></div></div>
        </div>
        <div className="os-dashboard-foot"><span><CircleCheck size={14} /> Connected project context</span><span>Human approval built in</span></div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="os-hero">
      <Container>
        <div className="os-hero-grid">
          <div className="min-w-0">
            <p className="os-eyebrow"><span /> Pashx Dashboard · AI-powered operations</p>
            <h1>The operating system for <em>physical operations.</em></h1>
            <p className="os-hero-description">Connect procurement, project execution, and AI in one workspace. Keep every order, site update, and decision moving in the same direction.</p>
            <div className="flex flex-wrap gap-3"><CtaLink location="hero" label="Book a demo">Book a demo <ArrowRight size={17} /></CtaLink><CtaLink to="#platform" location="hero" variant="secondary">Explore the platform <ArrowUpRight size={17} /></CtaLink></div>
            <div className="os-hero-notes"><span><Check size={15} /> Built around your workflows</span><span><Check size={15} /> Connects to your existing tools</span></div>
          </div>
          <div className="min-w-0 relative"><Dashboard /><p className="os-preview-caption">One connected view, from the first order to the final handover.</p></div>
        </div>
        <div className="os-lifecycle"><span>THE WHOLE PROJECT, CONNECTED</span><p>Plan <ArrowRight /> Procure <ArrowRight /> Deliver <ArrowRight /> Execute <ArrowRight /> Reconcile</p></div>
      </Container>
    </section>
  );
}
