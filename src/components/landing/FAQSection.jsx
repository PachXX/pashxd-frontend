import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Container from "../layout/Container";
import { trackFaqOpen } from "../../analytics/events";

/**
 * Objection handling.
 *
 * These are the five questions that decide the deal, answered on the page
 * rather than in the third call. The answers are deliberately concrete and
 * occasionally unflattering — "no, we are not your ERP", "yes, it will be
 * wrong sometimes" — because a buyer who finds the limitation themselves after
 * a confident page stops trusting everything else on it.
 *
 * Built on local state rather than src/components/ui/accordion.jsx: that file
 * is a shadcn drop-in written against Tailwind v4 utilities (`data-open:`,
 * `size-4`, `not-last:`) which this project's Tailwind v3 build does not
 * generate, so its open/closed styling would silently not apply.
 */

const FAQS = [
  {
    q: "Is this replacing our ERP?",
    a: "No. Your ERP stays the system of record and PashX writes to it. Autopilot lives in the layer your ERP was never built for — the email and WhatsApp traffic that arrives before anything becomes a record. If we ever ask you to migrate your ledger, we have lost the plot.",
  },
  {
    q: "What happens when the AI gets it wrong?",
    a: "It will, and the product is designed around that. Every extracted field carries a confidence score; anything under your threshold goes to the exception queue with the original message next to it, and a person approves, edits or rejects. Your edit is recorded and is what the matching improves on. Nothing outbound and nothing written to your ERP happens without that approval until you decide otherwise.",
  },
  {
    q: "How long until it is actually live?",
    a: "Weeks, on one workflow, against your real message traffic — not a sandbox. Onboarding is connecting a mailbox or WhatsApp number, loading your supplier and project master data, and running Autopilot in observe-only mode so you can see what it would have done before it does anything.",
  },
  {
    q: "Do our suppliers have to use a portal?",
    a: "No, and this is the point. Supplier portals fail because suppliers do not log into them. Autopilot works with how your suppliers already contact you — WhatsApp, email, a PDF attachment, a photo of a delivery challan. Nobody on their side is asked to change anything or learn anything.",
  },
  {
    q: "What does it cost?",
    a: "A pilot is scoped on one workflow, priced against the volume of messages and orders it handles, with the baseline measured before it starts so both sides can see whether it worked. We would rather agree the measurement up front than argue about attribution at renewal. Talk to us and we will size it against your actual order volume.",
  },
  {
    q: "Where does our data go?",
    a: "Into your PashX workspace. Your messages and records are not used to train shared models. Integration credentials are held in a managed secret store rather than in the database, access is role-based and enforced server-side, and everything Autopilot did is exportable as an audit trail. Formal certifications are in progress and will be published here with their report dates when they complete, not before.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    const isOpening = openIndex !== index;
    setOpenIndex(isOpening ? index : null);
    if (isOpening) trackFaqOpen(FAQS[index].q);
  };

  return (
    <section id="faq" className="scroll-mt-24 bg-slate-50 py-20 md:py-28">
      <Container className="max-w-3xl">
        <div className="mb-12 text-center md:mb-16">
          <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-brand-green">
            BEFORE YOU ASK
          </p>
          <h2 className="text-3xl font-bold leading-tight text-brand-navy md:text-[40px]">
            The questions that{" "}
            <span className="bg-gradient-to-r from-brand-green-mid to-brand-green-light bg-clip-text text-transparent">
              decide this
            </span>
          </h2>
        </div>

        <div className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q}>
                <h3>
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                    id={`faq-question-${i}`}
                    className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left transition hover:bg-slate-50/70 md:px-6"
                  >
                    <span className="text-[15px] font-semibold text-brand-navy md:text-base">
                      {item.q}
                    </span>
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500">
                      {isOpen ? (
                        <Minus className="h-3.5 w-3.5" />
                      ) : (
                        <Plus className="h-3.5 w-3.5" />
                      )}
                    </span>
                  </button>
                </h3>

                {/* Rendered only when open: the answers are long, and keeping
                    six of them permanently in the DOM behind max-height:0 also
                    keeps them in the accessibility tree for screen readers. */}
                {isOpen && (
                  <div
                    id={`faq-answer-${i}`}
                    role="region"
                    aria-labelledby={`faq-question-${i}`}
                    className="px-5 pb-5 md:px-6 md:pb-6"
                  >
                    <p className="text-sm leading-relaxed text-slate-500 md:text-[15px]">
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
