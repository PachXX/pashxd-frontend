import { useState } from "react";
import { ArrowRight, CircleDot } from "lucide-react";
import Container from "../layout/Container";
import CtaLink, { DEMO_PATH } from "../CtaLink";

/**
 * The workflows PashX Autopilot runs, stated as trigger → what it does →
 * what you get.
 *
 * This is the land-and-expand story made concrete. The first card is the wedge
 * we actually ship first; the rest are marked by status so the page never
 * implies something is live when it is in design. If a workflow's status here
 * stops matching reality, that is a bug, not a copy nitpick — this table is
 * what a prospect will hold us to in the demo.
 */

const STATUS_STYLES = {
  live: "bg-green-50 text-green-700 border-green-200",
  pilot: "bg-blue-50 text-blue-700 border-blue-200",
  design: "bg-slate-100 text-slate-600 border-slate-200",
};

const STATUS_LABEL = {
  live: "Shipping first",
  pilot: "In pilot",
  design: "On the roadmap",
};

const WORKFLOWS = [
  {
    id: "po-followup",
    name: "Purchase order follow-up",
    status: "live",
    trigger:
      "A PO has been issued and the supplier has not confirmed quantity, rate or date.",
    does: [
      "Reads confirmations arriving by email or WhatsApp, in whatever format they come",
      "Matches them to the open PO and its BOQ lines, field by field",
      "Chases the supplier on a schedule and escalates if the thread goes quiet",
      "Raises an exception the moment a date or rate moves",
    ],
    outcome:
      "Your open-order book is accurate every morning without anyone re-reading a thread.",
  },
  {
    id: "delivery",
    name: "Delivery & goods receipt",
    status: "live",
    trigger:
      "Material is dispatched, or a delivery note or site photo lands in the inbox.",
    does: [
      "Pulls challan number, quantities and vehicle details off the document",
      "Reconciles what arrived against what was ordered",
      "Flags short, excess and substituted deliveries at the gate",
      "Records the receipt against the PO so billing has something to sit on",
    ],
    outcome:
      "Short deliveries are caught on site, not discovered during month-end reconciliation.",
  },
  {
    id: "invoice",
    name: "Invoice matching",
    status: "pilot",
    trigger: "A supplier invoice arrives, in any format, from any channel.",
    does: [
      "Extracts line items, taxes and totals",
      "Matches invoice against purchase order and goods receipt",
      "Detects price drift against the quoted rate, duplicates, and quantity gaps",
      "Routes only the mismatches to finance",
    ],
    outcome:
      "Finance reviews exceptions instead of keying and cross-checking every invoice.",
  },
  {
    id: "documents",
    name: "Supplier & subcontractor documents",
    status: "design",
    trigger:
      "A compliance document is missing or about to expire — test certificate, insurance, licence, safety induction.",
    does: [
      "Tracks which document is required against which supplier and project",
      "Chases the responsible contact until the document arrives",
      "Reads the returned document and checks validity dates",
      "Escalates anything that will lapse before the work does",
    ],
    outcome:
      "Nobody discovers a lapsed certificate on the day an inspector asks for it.",
  },
];

export default function WorkflowsSection() {
  const [activeId, setActiveId] = useState(WORKFLOWS[0].id);
  const active = WORKFLOWS.find((w) => w.id === activeId) ?? WORKFLOWS[0];

  return (
    <section id="workflows" className="scroll-mt-24 bg-[#F8FAFC] py-20 md:py-28">
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-brand-green">
            THE WORKFLOWS
          </p>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-brand-navy md:text-[40px]">
            Start with one.{" "}
            <span className="bg-gradient-to-r from-brand-green-mid to-brand-green-light bg-clip-text text-transparent">
              Expand when it earns it.
            </span>
          </h2>
          <p className="text-base text-slate-500 md:text-lg">
            Autopilot goes live on a single workflow, against your real message
            traffic. Nothing else changes until that one is working.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-12">
          {/* Selector */}
          <div
            role="tablist"
            aria-label="Autopilot workflows"
            className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
          >
            {WORKFLOWS.map((w) => {
              const isActive = w.id === active.id;
              return (
                <button
                  key={w.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`workflow-panel-${w.id}`}
                  id={`workflow-tab-${w.id}`}
                  onClick={() => setActiveId(w.id)}
                  className={`min-w-[240px] shrink-0 rounded-2xl border p-4 text-left transition-all duration-300 lg:min-w-0 ${
                    isActive
                      ? "border-brand-green/30 bg-white shadow-lg"
                      : "border-slate-200 bg-white/60 hover:border-slate-300 hover:bg-white"
                  }`}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <CircleDot
                      className={`h-4 w-4 shrink-0 ${
                        isActive ? "text-brand-green" : "text-slate-300"
                      }`}
                    />
                    <span className="text-[15px] font-semibold text-brand-navy">
                      {w.name}
                    </span>
                  </div>
                  <span
                    className={`inline-block rounded-full border px-2.5 py-[3px] text-[11px] font-semibold ${
                      STATUS_STYLES[w.status]
                    }`}
                  >
                    {STATUS_LABEL[w.status]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detail */}
          <div
            role="tabpanel"
            id={`workflow-panel-${active.id}`}
            aria-labelledby={`workflow-tab-${active.id}`}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
          >
            <div className="mb-6">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Triggered when
              </p>
              <p className="text-base leading-relaxed text-brand-navy">
                {active.trigger}
              </p>
            </div>

            <div className="mb-6">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                What Autopilot does
              </p>
              <ul className="space-y-2.5">
                {active.does.map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                    <span className="text-sm leading-relaxed text-slate-600">
                      {line}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-green-100 bg-green-50/60 p-4">
              <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-brand-green">
                What you get
              </p>
              <p className="text-sm leading-relaxed text-brand-navy">
                {active.outcome}
              </p>
            </div>

            <div className="mt-7">
              <CtaLink
                to={DEMO_PATH}
                location="workflows"
                label={`See ${active.name} in action`}
                variant="primary"
                size="md"
              >
                See this workflow on your data
                <ArrowRight className="h-4 w-4" />
              </CtaLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
