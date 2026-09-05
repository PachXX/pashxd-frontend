import { Gauge, UserCheck, ScrollText, SlidersHorizontal } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import Container from "../layout/Container";

/**
 * The control section.
 *
 * Everything before this on the page says "the software acts on your behalf",
 * which is exactly the sentence that makes an operations director nervous —
 * their downside on a wrong autonomous action is a wrong delivery, a wrong
 * payment, or a supplier relationship. This section exists to answer that
 * objection before the pricing conversation, and it is why the confidence
 * score is a first-class object in the product rather than an internal detail.
 *
 * The queue below mirrors what the real cockpit shows: score, what was matched,
 * and who has to decide. Nothing autonomous ships on day one.
 */

const CONTROLS = [
  {
    icon: Gauge,
    title: "A score on every field",
    desc: "Extraction and matching each produce a confidence value. It is stored with the record, not thrown away after the decision.",
  },
  {
    icon: SlidersHorizontal,
    title: "Thresholds you set",
    desc: "You choose what Autopilot may do alone and where it must stop. Start with everything routed to a human; loosen it once you trust the numbers.",
  },
  {
    icon: UserCheck,
    title: "Approve, edit, or reject",
    desc: "Low-confidence items queue up with the original message side by side with what was extracted. Your edit is the correction the system learns from.",
  },
  {
    icon: ScrollText,
    title: "A trail that survives audit",
    desc: "Every extraction, score, edit, approval, message sent and sync event is logged and attributable. Nothing the AI did is a black box after the fact.",
  },
];

const QUEUE = [
  {
    ref: "PO-2214",
    summary: "Delivery slipped 5 days — Sri Balaji Steels",
    score: 71,
    owner: "Needs review",
  },
  {
    ref: "INV-0982",
    summary: "Rate ₹68,400 vs quoted ₹66,900 — 2.2% over",
    score: 64,
    owner: "Needs review",
  },
  {
    ref: "GRN-455",
    summary: "Short delivery: 22 T received against 24 T ordered",
    score: 88,
    owner: "Auto-flagged",
  },
  {
    ref: "PO-2190",
    summary: "Confirmation matched, dates unchanged",
    score: 96,
    owner: "Auto-approved",
  },
];

function ScoreBar({ value }) {
  const low = value < 85;
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-14 overflow-hidden rounded-full bg-slate-200">
        <div
          className={`h-full rounded-full ${low ? "bg-amber-400" : "bg-green-500"}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span
        className={`w-9 text-right text-xs font-semibold tabular-nums ${
          low ? "text-amber-600" : "text-green-600"
        }`}
      >
        {value}%
      </span>
    </div>
  );
}

export default function ExceptionCockpit() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="bg-white py-20 md:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT — the argument */}
          <div>
            <p className="reveal mb-4 text-xs font-semibold tracking-[0.25em] text-brand-green">
              THE EXCEPTION COCKPIT
            </p>
            <h2 className="reveal mb-5 text-3xl font-bold leading-tight text-brand-navy md:text-[40px]">
              Autonomy you{" "}
              <span className="bg-gradient-to-r from-brand-green-mid to-brand-green-light bg-clip-text text-transparent">
                grant, not assume
              </span>
            </h2>
            <p className="reveal reveal-delay-1 mb-10 text-base leading-relaxed text-slate-500 md:text-lg">
              Autopilot does not get to be confidently wrong on your behalf. Work
              it is sure about clears; work it is not lands in one queue with the
              evidence attached, and a person decides.
            </p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {CONTROLS.map((c, i) => (
                <div key={c.title} className={`reveal reveal-delay-${(i % 4) + 1}`}>
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-green-100 bg-green-50">
                    <c.icon className="h-5 w-5 text-brand-green" />
                  </div>
                  <h3 className="mb-1.5 text-[15px] font-semibold text-brand-navy">
                    {c.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-500">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — the queue */}
          <div className="reveal reveal-delay-2">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(10,37,64,0.10)]">
              <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-5 py-4">
                <div>
                  <p className="text-sm font-semibold text-brand-navy">
                    Today&apos;s queue
                  </p>
                  <p className="text-xs text-slate-400">
                    2 need a person · 2 cleared on their own
                  </p>
                </div>
                <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-semibold text-amber-700">
                  Threshold 85%
                </span>
              </div>

              <ul className="divide-y divide-slate-100">
                {QUEUE.map((item) => (
                  <li
                    key={item.ref}
                    className="flex flex-col gap-3 px-5 py-4 transition hover:bg-slate-50/70 sm:flex-row sm:items-center sm:gap-4"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold text-slate-500">
                          {item.ref}
                        </span>
                        <span
                          className={`rounded-full px-2 py-[2px] text-[10px] font-semibold uppercase tracking-wide ${
                            item.owner === "Auto-approved"
                              ? "bg-green-50 text-green-700"
                              : item.owner === "Auto-flagged"
                              ? "bg-slate-100 text-slate-600"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {item.owner}
                        </span>
                      </div>
                      <p className="truncate text-sm text-brand-navy">
                        {item.summary}
                      </p>
                    </div>
                    <ScoreBar value={item.score} />
                  </li>
                ))}
              </ul>

              <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-3">
                <p className="text-xs text-slate-400">
                  Every row expands to the original message, the fields extracted
                  from it, and the full history of what changed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
