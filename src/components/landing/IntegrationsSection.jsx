import { Mail, MessageCircle, FileText, Webhook } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import Container from "../layout/Container";

// LOGOS
import sap from "../../assets/logos/sap.png";
import zoho from "../../assets/logos/zoho.png";
import quickbooks from "../../assets/logos/quickbooks.png";
import oracle from "../../assets/logos/oracle.png";
import microsoft from "../../assets/logos/microsoft.png";
import tally from "../../assets/logos/tally.png";
import odoo from "../../assets/logos/odoo.png";
import excel from "../../assets/logos/excel.png";

/**
 * Where data comes in, and where approved work goes out.
 *
 * The previous version rendered these eight logos in an orbit around the PashX
 * mark with no qualification, which reads as "we have built connectors for all
 * of these". What exists in the backend today is a generic outbound webhook
 * layer plus per-customer API work — a real and defensible capability, and a
 * different claim. Each destination therefore carries an explicit status, and
 * `status` here must track what is actually deployed.
 */

const INTAKE = [
  { icon: Mail, name: "Email", detail: "A shared mailbox, or forwarding rules from the one you already use." },
  { icon: MessageCircle, name: "WhatsApp", detail: "A WhatsApp Business number your suppliers already message." },
  { icon: FileText, name: "Documents", detail: "PDFs, scans and spreadsheets — quotes, challans, invoices, certificates." },
  { icon: Webhook, name: "Forms & webhooks", detail: "Site apps and project systems posting events straight in." },
];

/**
 * status:
 *   "live"     — a shipped, tested path today
 *   "pilot"    — working against at least one real customer instance
 *   "request"  — no connector yet; delivered per engagement over the API
 */
const DESTINATIONS = [
  { name: "Webhooks / REST API", desc: "Any system that can receive JSON", logo: null, status: "live" },
  { name: "Excel / CSV", desc: "Export and scheduled drops", logo: excel, status: "live" },
  { name: "Tally", desc: "Finance", logo: tally, status: "pilot" },
  { name: "Zoho", desc: "CRM and Books", logo: zoho, status: "pilot" },
  { name: "Microsoft 365", desc: "Mail and files", logo: microsoft, status: "pilot" },
  { name: "SAP", desc: "ERP", logo: sap, status: "request" },
  { name: "Oracle", desc: "ERP", logo: oracle, status: "request" },
  { name: "Odoo", desc: "ERP", logo: odoo, status: "request" },
  { name: "QuickBooks", desc: "Accounting", logo: quickbooks, status: "request" },
];

const STATUS_META = {
  live: { label: "Live", className: "bg-green-50 text-green-700 border-green-200" },
  pilot: { label: "In pilot", className: "bg-blue-50 text-blue-700 border-blue-200" },
  request: { label: "On request", className: "bg-slate-100 text-slate-600 border-slate-200" },
};

export default function IntegrationsSection() {
  const ref = useScrollReveal();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50/60 py-20 md:py-28"
    >
      <Container>
        <div className="reveal mx-auto mb-14 max-w-2xl text-center md:mb-20">
          <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-brand-green">
            CONNECTS TO WHAT YOU RUN
          </p>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-brand-navy md:text-[40px]">
            Messages in.{" "}
            <span className="bg-gradient-to-r from-brand-green-mid to-brand-green-light bg-clip-text text-transparent">
              Approved records out.
            </span>
          </h2>
          <p className="text-base text-slate-500 md:text-lg">
            Autopilot does not ask your suppliers to change how they contact you,
            and it does not ask you to change your system of record.
          </p>
        </div>

        {/* INTAKE */}
        <div className="reveal mb-14 md:mb-16">
          <p className="mb-6 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
            Where work comes in
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-5">
            {INTAKE.map((c) => (
              <div
                key={c.name}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-green-100 bg-green-50">
                  <c.icon className="h-5 w-5 text-brand-green" />
                </div>
                <h3 className="mb-1.5 text-[15px] font-semibold text-brand-navy">
                  {c.name}
                </h3>
                <p className="text-sm leading-relaxed text-slate-500">{c.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* DESTINATIONS */}
        <div className="reveal reveal-delay-1">
          <p className="mb-6 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
            Where approved actions go
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {DESTINATIONS.map((d) => {
              const meta = STATUS_META[d.status];
              return (
                <div
                  key={d.name}
                  className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3.5 transition-all duration-300 hover:border-slate-300 hover:shadow-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-50">
                    {d.logo ? (
                      <img
                        src={d.logo}
                        alt=""
                        className="h-6 w-6 object-contain"
                      />
                    ) : (
                      <Webhook className="h-5 w-5 text-slate-400" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-brand-navy">
                      {d.name}
                    </p>
                    <p className="truncate text-xs text-slate-400">{d.desc}</p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-[3px] text-[11px] font-semibold ${meta.className}`}
                  >
                    {meta.label}
                  </span>
                </div>
              );
            })}
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-slate-400">
            &ldquo;On request&rdquo; means there is no packaged connector yet —
            the sync runs over our API or your integration layer, scoped during
            onboarding. We would rather say that than imply a button exists.
          </p>
        </div>
      </Container>
    </section>
  );
}
