import { Lock, KeyRound, ScrollText, DatabaseZap, EyeOff, Undo2 } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import Container from "../layout/Container";

/**
 * Security and governance.
 *
 * This section states controls that exist in the platform today — role-based
 * access, the audit trail in app/utils/audit.py, secrets held in Google Secret
 * Manager rather than the database, human approval before any outbound action.
 *
 * It deliberately carries no certification badges. SOC 2 and ISO 27001 marks
 * are audited attestations; rendering one PashX does not hold would be fraud,
 * not marketing, and it is the single easiest thing for a security reviewer to
 * check. When an audit completes, add the badge here with its report date.
 */

const CONTROLS = [
  {
    icon: Undo2,
    title: "Nothing irreversible without a human",
    desc: "Autopilot drafts and proposes. Sending to a supplier or writing to your ERP happens after an approval, until you raise the threshold yourself.",
  },
  {
    icon: ScrollText,
    title: "Complete audit trail",
    desc: "Every extraction, score, edit, approval and sync is recorded with who did it and when, and is exportable for an auditor.",
  },
  {
    icon: KeyRound,
    title: "Role-based access",
    desc: "Procurement, finance, site and admin see and approve different things. Permissions are enforced server-side, not hidden in the UI.",
  },
  {
    icon: Lock,
    title: "Credentials never sit in the database",
    desc: "Integration secrets are injected from a managed secret store at deploy time. There is no screen that saves an API key into a record.",
  },
  {
    icon: DatabaseZap,
    title: "Your data is yours",
    desc: "Your messages and records are not used to train shared models. Export or deletion on request, in a machine-readable format.",
  },
  {
    icon: EyeOff,
    title: "Only what the workflow needs",
    desc: "Autopilot reads the channels you connect it to and nothing else. Scope is set per workflow at onboarding, not granted wholesale.",
  },
];

export default function SecuritySection() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="bg-white py-20 md:py-28">
      <Container>
        <div className="reveal mx-auto mb-14 max-w-2xl text-center md:mb-16">
          <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-brand-green">
            SECURITY &amp; GOVERNANCE
          </p>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-brand-navy md:text-[40px]">
            Built to survive{" "}
            <span className="bg-gradient-to-r from-brand-green-mid to-brand-green-light bg-clip-text text-transparent">
              the questions finance asks
            </span>
          </h2>
          <p className="text-base text-slate-500 md:text-lg">
            An agent that talks to your suppliers and writes to your ledger has
            to be accountable for every action it takes.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
          {CONTROLS.map((c, i) => (
            <div
              key={c.title}
              className={`reveal reveal-delay-${(i % 6) + 1} rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50">
                <c.icon className="h-5 w-5 text-brand-navy" />
              </div>
              <h3 className="mb-2 text-[15px] font-semibold text-brand-navy">
                {c.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-500">{c.desc}</p>
            </div>
          ))}
        </div>

        <p className="reveal mx-auto mt-10 max-w-2xl text-center text-sm text-slate-400">
          Formal certification is in progress rather than complete, and we will
          publish each attestation here with its report date rather than before.
          Security documentation is available under NDA on request.
        </p>
      </Container>
    </section>
  );
}
