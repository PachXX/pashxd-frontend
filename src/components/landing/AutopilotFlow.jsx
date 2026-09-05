import {
  Inbox,
  ScanLine,
  GitCompareArrows,
  Send,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import Container from "../layout/Container";

/**
 * The Autopilot chain — replaces the old "How It Works" strip.
 *
 * The previous version walked Project → BOQ → Procurement → Delivery →
 * Execution → Insights, which describes a project lifecycle, not a product.
 * Any ERP diagram looks like that. This one walks what the software does to a
 * single inbound message, because that loop is the thing being sold and the
 * thing a buyer has to believe is possible.
 *
 * Step 6 deliberately ends at "syncs", not at "and then it runs your business":
 * the product's whole safety story is that a human sits at step 5.
 */

const STEPS = [
  {
    icon: Inbox,
    title: "Capture",
    desc: "Email, WhatsApp, PDFs and spreadsheets, web forms, and events from your project systems — all land in one queue.",
  },
  {
    icon: ScanLine,
    title: "Classify & extract",
    desc: "Autopilot decides what the message is — quote, PO confirmation, delivery note, invoice, query — and pulls the fields out as structured data.",
  },
  {
    icon: GitCompareArrows,
    title: "Match",
    desc: "Fields are resolved against your suppliers, projects, BOQ lines, purchase orders and goods receipts. Every match carries a score.",
  },
  {
    icon: Send,
    title: "Follow up",
    desc: "Unconfirmed orders, missing documents and silent subcontractors get chased on a schedule, in thread, until they answer.",
  },
  {
    icon: AlertTriangle,
    title: "Detect & escalate",
    desc: "Delays, price changes, quantity mismatches and missing paperwork are raised as exceptions. Only these reach a person.",
  },
  {
    icon: RefreshCw,
    title: "Sync",
    desc: "Approved outcomes are written back to PashX and pushed to your ERP or finance system, with the full trail attached.",
  },
];

export default function AutopilotFlow() {
  const ref = useScrollReveal();

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="scroll-mt-24 bg-gradient-to-b from-white to-slate-50/60 py-20 md:py-28"
    >
      <Container>
        <div className="reveal mx-auto mb-14 max-w-2xl text-center md:mb-20">
          <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-brand-green">
            WHAT AUTOPILOT DOES
          </p>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-brand-navy md:text-[40px]">
            From a message to a{" "}
            <span className="bg-gradient-to-r from-brand-green-mid to-brand-green-light bg-clip-text text-transparent">
              completed action
            </span>
          </h2>
          <p className="text-base text-slate-500 md:text-lg">
            Six steps, run on every inbound message. Steps one to four happen
            without you. Step five is where you come in.
          </p>
        </div>

        <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {STEPS.map((step, i) => {
            const isHumanStep = i === 4;
            return (
              <li
                key={step.title}
                className={`reveal reveal-delay-${(i % 6) + 1} group relative rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${
                  isHumanStep
                    ? "border-amber-200 ring-1 ring-amber-100"
                    : "border-slate-200 hover:border-brand-green-mid/30"
                }`}
              >
                <div className="mb-5 flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-transform group-hover:scale-105 ${
                      isHumanStep
                        ? "border-amber-200 bg-amber-50"
                        : "border-slate-200 bg-slate-50"
                    }`}
                  >
                    <step.icon
                      className={`h-5 w-5 ${
                        isHumanStep ? "text-amber-600" : "text-brand-green-mid"
                      }`}
                    />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-widest text-slate-400">
                      Step {i + 1}
                    </span>
                    <h3 className="text-[17px] font-semibold text-brand-navy">
                      {step.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-slate-500">
                  {step.desc}
                </p>

                {isHumanStep && (
                  <p className="mt-4 inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-amber-700">
                    Human decides
                  </p>
                )}
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
