import { Timer, FileWarning, MessagesSquare, ShieldCheck } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import Container from "../layout/Container";

/**
 * Replaces the previous SocialProof section.
 *
 * That section carried named testimonials attributed to real, identifiable
 * people at Godrej Properties, HOCHTIEF, Bouygues, Salini Impregilo and ACS —
 * quotes nobody at those firms gave, alongside invented figures ("€180K
 * overrun"). Publishing them is false endorsement, and one prospect checking a
 * single name ends the deal and the reputation with it. They are gone and must
 * not come back until a real customer has signed off on their own words.
 *
 * What replaces them is the honest version of proof at this stage: the
 * baseline PashX measures during a pilot, and what the company will and will
 * not claim before it has the data. Every number below is a *measurement the
 * customer takes on their own operation*, not a result PashX asserts.
 */

const MEASURES = [
  {
    icon: MessagesSquare,
    title: "Follow-ups sent without a human",
    detail:
      "Every supplier chase Autopilot sends on its own, counted against the ones your team still had to write.",
  },
  {
    icon: Timer,
    title: "Hours returned to the procurement desk",
    detail:
      "Time your team spends reading, re-keying and chasing before Autopilot, measured again after four weeks live.",
  },
  {
    icon: FileWarning,
    title: "Exceptions caught before the invoice",
    detail:
      "Rate changes, short deliveries and missing documents flagged at the point they happen — not at month-end reconciliation.",
  },
];

const COMMITMENTS = [
  "One workflow live first. Purchase-order follow-up, then we expand.",
  "Every action scored, logged and reversible. Nothing autonomous on day one.",
  "Your ERP stays the system of record. PashX writes to it, never replaces it.",
];

export default function ProofSection() {
  const ref = useScrollReveal();

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-brand-navy via-brand-navy-deep to-[#071a2c]"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[400px] h-[400px] bg-green-500/20 blur-[120px]" />
      </div>

      <Container className="relative">
        {/* HEADING */}
        <div className="reveal max-w-2xl mx-auto text-center mb-14 md:mb-20">
          <p className="text-xs tracking-[0.25em] text-green-400 font-semibold mb-4">
            HOW WE PROVE IT
          </p>
          <h2 className="text-[28px] sm:text-[32px] md:text-[40px] font-extrabold text-white mb-5 leading-[1.1] tracking-tight">
            We measure your baseline{" "}
            <span className="bg-gradient-to-r from-brand-green-mid to-brand-green-light bg-clip-text text-transparent">
              before we claim anything
            </span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed">
            PashX Autopilot is in early access with a small group of operating
            teams. Rather than quote numbers we cannot show you the working for,
            here is exactly what a pilot measures on your own operation.
          </p>
        </div>

        {/* WHAT A PILOT MEASURES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-14 md:mb-20">
          {MEASURES.map((m, i) => (
            <div
              key={m.title}
              className={`reveal reveal-delay-${i + 1} rounded-2xl p-6 bg-white/[0.04] backdrop-blur-md border border-white/[0.08] transition-all duration-300 hover:bg-white/[0.06] hover:border-green-400/20`}
            >
              <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5">
                <m.icon className="h-5 w-5 text-green-400" />
              </div>
              <h3 className="text-[15px] font-semibold text-white mb-2">
                {m.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">{m.detail}</p>
            </div>
          ))}
        </div>

        {/* PILOT COMMITMENTS */}
        <div className="reveal rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 md:p-8">
          <div className="flex items-center gap-3 mb-5">
            <ShieldCheck className="h-5 w-5 text-green-400 shrink-0" />
            <p className="text-xs tracking-[0.2em] uppercase text-slate-400 font-semibold">
              What every pilot commits to
            </p>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {COMMITMENTS.map((c) => (
              <li key={c} className="flex items-start gap-3">
                <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                <span className="text-sm text-slate-300 leading-relaxed">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
