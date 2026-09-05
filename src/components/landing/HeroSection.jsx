import { ArrowRight, Check, MessageCircle, Pencil, RefreshCw } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import Container from "../layout/Container";
import CtaLink, { DEMO_PATH } from "../CtaLink";

/**
 * Hero.
 *
 * The previous hero rendered an invented project dashboard — ₹38.4CR of budget,
 * a snag ticket number, four KPI tiles — at ~9px type. Two problems: none of it
 * is real, and a KPI dashboard is not what makes PashX different (every ERP has
 * one). What is different is the *chain*: a WhatsApp message becomes structured
 * procurement data, scored, and a human approves it.
 *
 * So the hero visual is that chain, rendered at readable size, showing the one
 * screen the product is actually organised around. Nothing here asserts a
 * customer result; it illustrates a mechanism.
 */

// ─── Extracted fields shown in the cockpit card ───────────────────────────────
// Confidence values illustrate the mechanism (per-field scoring). They are not
// a claimed accuracy rate — which is why no aggregate accuracy number appears
// anywhere on this page.
const EXTRACTED = [
  { label: "Purchase order", value: "PO-2214 · Skyline Tower B", confidence: 97 },
  { label: "Supplier", value: "Sri Balaji Steels", confidence: 96 },
  { label: "Item", value: "TMT Fe500D · 16mm · 24 T", confidence: 94 },
  { label: "Promised date", value: "18 Aug → 23 Aug (5 days late)", confidence: 71 },
];

function ConfidenceChip({ value }) {
  const low = value < 85;
  return (
    <span
      className={`shrink-0 rounded-full px-2 py-[3px] text-[11px] font-semibold tabular-nums ${
        low
          ? "bg-amber-400/15 text-amber-300 border border-amber-400/25"
          : "bg-green-400/15 text-green-300 border border-green-400/25"
      }`}
      title={low ? "Below threshold — needs a human" : "Above threshold"}
    >
      {value}%
    </span>
  );
}

function CockpitCard() {
  return (
    <div className="relative animate-float w-full max-w-[560px] rounded-2xl border border-white/10 bg-brand-ink p-4 md:p-5 shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
      {/* Window chrome */}
      <div className="mb-4 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
        </div>
        <div className="ml-1 rounded-md border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[11px] text-slate-400">
          Autopilot · exceptions
        </div>
        <span className="ml-auto rounded-full border border-amber-400/25 bg-amber-400/15 px-2.5 py-1 text-[11px] font-semibold text-amber-300">
          Needs review
        </span>
      </div>

      {/* 1 — the raw inbound message */}
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] p-3.5">
        <div className="mb-2 flex items-center gap-2">
          <MessageCircle className="h-3.5 w-3.5 text-green-400" />
          <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
            WhatsApp · supplier
          </span>
        </div>
        <p className="text-[13px] leading-relaxed text-slate-300">
          “Sir 16mm ka load ready hai but truck Monday niklega, 23rd ko site pe
          pahunchega. Rate 68,400 hi rahega.”
        </p>
      </div>

      {/* connector */}
      <div className="my-1 flex justify-center">
        <div className="h-4 w-px bg-gradient-to-b from-white/10 to-green-400/40" />
      </div>

      {/* 2 — what Autopilot pulled out of it */}
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] p-3.5">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-slate-500">
          Extracted &amp; matched
        </p>
        <dl className="space-y-2.5">
          {EXTRACTED.map((f) => (
            <div key={f.label} className="flex items-center gap-3">
              <dt className="w-[92px] shrink-0 text-[11px] text-slate-500">
                {f.label}
              </dt>
              <dd className="min-w-0 flex-1 truncate text-[13px] font-medium text-white">
                {f.value}
              </dd>
              <ConfidenceChip value={f.confidence} />
            </div>
          ))}
        </dl>
      </div>

      {/* 3 — the decision a human owns */}
      <div className="mt-3 rounded-xl border border-white/[0.08] bg-white/[0.04] p-3.5">
        <p className="mb-3 text-[12px] leading-snug text-slate-300">
          <span className="font-semibold text-amber-300">Delay detected.</span>{" "}
          Draft chaser to site engineer and re-baseline the delivery date?
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-green-500 px-3 py-1.5 text-[12px] font-semibold text-white">
            <Check className="h-3.5 w-3.5" /> Approve
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-[12px] font-semibold text-slate-300">
            <Pencil className="h-3.5 w-3.5" /> Edit
          </span>
          <span className="ml-auto inline-flex items-center gap-1.5 text-[11px] text-slate-500">
            <RefreshCw className="h-3 w-3" /> then syncs to your ERP
          </span>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const ref = useScrollReveal();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-white pt-28 pb-20 md:pt-36 md:pb-28"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-green-50/40" />

      <Container className="relative">
        {/* min-w-0 on both columns: a grid item defaults to min-width:auto, so
            the cockpit card's fixed-width label column and non-wrapping rows
            pushed the whole track to ~401px inside a 375px viewport. The
            section's overflow-hidden hid the overflow instead of preventing
            it, which is how the headline ended up clipped on phones. */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ─── LEFT: the promise ─────────────────────────────────────── */}
          <div className="min-w-0">
            <div className="reveal mb-6 inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-4 py-1.5 md:mb-8">
              <div className="h-2 w-2 animate-pulse rounded-full bg-brand-green" />
              <span className="text-[11px] font-semibold uppercase tracking-widest text-brand-green md:text-[12px]">
                Procurement &amp; project coordination autopilot
              </span>
            </div>

            <h1 className="reveal mb-6 text-[2.5rem] font-extrabold leading-[1.05] text-brand-navy sm:text-[3.25rem] md:mb-8 md:text-[3.75rem] lg:text-[4.5rem]">
              Your operations,{" "}
              <span className="text-brand-green">on autopilot.</span>
            </h1>

            <p className="reveal reveal-delay-1 mb-8 max-w-xl text-base leading-relaxed text-slate-500 md:mb-10 md:text-xl">
              PashX captures requests from email, WhatsApp, documents and project
              systems — then coordinates suppliers, purchase orders, deliveries,
              invoices and exceptions in one operational workspace. It chases the
              follow-ups. You approve the judgement calls.
            </p>

            <div className="reveal reveal-delay-2 mb-8 flex flex-wrap gap-4 md:gap-5">
              <CtaLink to={DEMO_PATH} location="hero" variant="primary">
                See PashX Autopilot in action
                <ArrowRight className="h-4 w-4" />
              </CtaLink>
              <CtaLink to="#workflows" location="hero" variant="secondary">
                Explore the workflows
              </CtaLink>
            </div>

            {/* Under-CTA microproof. Deliberately claims capability and posture,
                never a customer outcome — there is no data behind an outcome
                claim yet, and the previous "50% / 3x / 90%" tiles had none. */}
            <ul className="reveal reveal-delay-3 flex flex-col gap-2.5 text-sm text-slate-500 sm:flex-row sm:flex-wrap sm:gap-x-7">
              {[
                "Live on one workflow in weeks",
                "Every action scored, logged, reversible",
                "Your ERP stays the system of record",
              ].map((point) => (
                <li key={point} className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-brand-green" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* ─── RIGHT: the mechanism ──────────────────────────────────── */}
          <div className="relative flex min-w-0 justify-center lg:justify-end">
            <div className="absolute h-[400px] w-[400px] rounded-full bg-green-300/30 blur-[140px] md:h-[560px] md:w-[560px]" />
            <div className="reveal reveal-delay-2 relative w-full min-w-0 max-w-[560px]">
              <CockpitCard />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
