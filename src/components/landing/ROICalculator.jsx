import { useMemo, useState } from "react";
import { ArrowRight, Calculator, Clock, ShieldAlert } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import Container from "../layout/Container";
import CtaLink, { DEMO_PATH } from "../CtaLink";
import { trackRoiCalculated } from "../../analytics/events";

/**
 * ROI calculator.
 *
 * The previous version multiplied monthly procurement spend by a hardcoded 8%
 * and called the result "savings". Nothing justifies that number, it scales
 * with spend rather than with anything PashX does, and a CFO who spots it
 * discounts the entire page.
 *
 * This version only models what Autopilot mechanically changes: coordination
 * time (messages that no longer need a human to read, chase and re-key) and
 * exception leakage (billing errors caught before payment instead of after).
 * Every assumption is a visible input the user can argue with, the automation
 * rate is deliberately conservative, and the working is printed underneath so
 * the output is a starting point for a conversation rather than a claim.
 */

// ─── Model constants ─────────────────────────────────────────────────────────
// AUTOMATION_RATE: share of routine coordination messages that clear without a
// human. Held well under what a demo can show, because the honest number for a
// new deployment on messy real-world data is not the best-case number.
const AUTOMATION_RATE = 0.6;
// Share of the value flagged as an exception that would otherwise have been
// paid out or absorbed. Conservative: most disputes are partially recovered.
const LEAKAGE_RECOVERY_RATE = 0.35;
const MONTHS = 12;

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function Slider({ id, label, hint, value, min, max, step, format, onChange }) {
  return (
    <div className="mb-7 last:mb-0">
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm font-medium text-brand-navy">
          {label}
        </label>
        <span className="text-sm font-semibold tabular-nums text-brand-green">
          {format(value)}
        </span>
      </div>
      <input
        id={id}
        type="range"
        className="roi-slider"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      {hint && <p className="mt-2 text-xs text-slate-400">{hint}</p>}
    </div>
  );
}

export default function ROICalculator() {
  const ref = useScrollReveal();

  const [messages, setMessages] = useState(1200);
  const [minutesEach, setMinutesEach] = useState(6);
  const [hourlyCost, setHourlyCost] = useState(600);
  const [monthlySpend, setMonthlySpend] = useState(25000000); // ₹2.5 Cr
  const [errorRate, setErrorRate] = useState(1.5); // % of spend that arrives wrong

  const model = useMemo(() => {
    const hoursToday = (messages * minutesEach) / 60;
    const hoursSaved = hoursToday * AUTOMATION_RATE;
    const timeValue = hoursSaved * hourlyCost;

    const disputedValue = monthlySpend * (errorRate / 100);
    const leakageRecovered = disputedValue * LEAKAGE_RECOVERY_RATE;

    const monthly = timeValue + leakageRecovered;

    return {
      hoursToday: Math.round(hoursToday),
      hoursSaved: Math.round(hoursSaved),
      timeValue: Math.round(timeValue),
      disputedValue: Math.round(disputedValue),
      leakageRecovered: Math.round(leakageRecovered),
      monthly: Math.round(monthly),
      annual: Math.round(monthly * MONTHS),
    };
  }, [messages, minutesEach, hourlyCost, monthlySpend, errorRate]);

  return (
    <section
      ref={ref}
      className="bg-gradient-to-b from-white to-slate-50/40 py-20 md:py-28"
    >
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-brand-green">
            WHAT IT IS WORTH
          </p>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-brand-navy md:text-[40px]">
            Two things change.{" "}
            <span className="bg-gradient-to-r from-brand-green-mid to-brand-green-light bg-clip-text text-transparent">
              Only two.
            </span>
          </h2>
          <p className="text-base text-slate-500 md:text-lg">
            Coordination time your team stops spending, and billing errors caught
            before the money leaves. Every assumption below is yours to change.
          </p>
        </div>

        <div className="grid items-start gap-6 md:gap-10 lg:grid-cols-2">
          {/* ─── INPUTS ─────────────────────────────────────────────── */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.04)] md:p-8">
            <div className="mb-6 flex items-center gap-3 md:mb-8">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-green-100 bg-green-50">
                <Calculator className="h-5 w-5 text-brand-green" />
              </div>
              <h3 className="text-base font-semibold text-brand-navy md:text-lg">
                Your operation
              </h3>
            </div>

            <style>
              {`
              .roi-slider {
                -webkit-appearance: none;
                appearance: none;
                width: 100%;
                height: 8px;
                border-radius: 999px;
                background: #E2E8F0;
                outline: none;
                cursor: pointer;
              }
              .roi-slider::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 20px;
                height: 20px;
                border-radius: 999px;
                background: #15803D;
                border: 3px solid #fff;
                box-shadow: 0 2px 8px rgba(21,128,61,0.35);
                cursor: pointer;
              }
              .roi-slider::-moz-range-thumb {
                width: 20px;
                height: 20px;
                border-radius: 999px;
                background: #15803D;
                border: 3px solid #fff;
                box-shadow: 0 2px 8px rgba(21,128,61,0.35);
                cursor: pointer;
              }
              .roi-slider:focus-visible {
                outline: 2px solid #15803D;
                outline-offset: 4px;
              }
              `}
            </style>

            <Slider
              id="roi-messages"
              label="Supplier messages a month"
              hint="Order confirmations, delivery updates, rate revisions, document chases — across email and WhatsApp."
              value={messages}
              min={100}
              max={10000}
              step={100}
              format={(v) => v.toLocaleString("en-IN")}
              onChange={setMessages}
            />
            <Slider
              id="roi-minutes"
              label="Minutes a person spends on each"
              hint="Reading it, working out which order it belongs to, replying, and putting it somewhere."
              value={minutesEach}
              min={2}
              max={20}
              step={1}
              format={(v) => `${v} min`}
              onChange={setMinutesEach}
            />
            <Slider
              id="roi-hourly"
              label="Loaded cost of that person, per hour"
              value={hourlyCost}
              min={200}
              max={3000}
              step={50}
              format={(v) => inr.format(v)}
              onChange={setHourlyCost}
            />
            <Slider
              id="roi-spend"
              label="Monthly procurement spend"
              value={monthlySpend}
              min={2500000}
              max={500000000}
              step={2500000}
              format={(v) => inr.format(v)}
              onChange={setMonthlySpend}
            />
            <Slider
              id="roi-error"
              label="Share of spend that arrives wrong"
              hint="Rate drift against the quote, short deliveries, duplicate or mis-taxed invoices."
              value={errorRate}
              min={0.2}
              max={5}
              step={0.1}
              format={(v) => `${v.toFixed(1)}%`}
              onChange={setErrorRate}
            />
          </div>

          {/* ─── OUTPUT ─────────────────────────────────────────────── */}
          <div className="rounded-2xl border border-slate-200 bg-brand-navy p-5 text-white shadow-[0_20px_60px_rgba(10,37,64,0.25)] md:p-8">
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Indicative annual value
            </p>
            <p className="mb-8 text-4xl font-extrabold tabular-nums text-green-400 md:text-5xl">
              {inr.format(model.annual)}
            </p>

            <div className="mb-6 rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4 text-green-400" />
                <p className="text-sm font-semibold text-white">
                  Coordination time
                </p>
              </div>
              <p className="text-sm leading-relaxed text-slate-300">
                Your team spends about{" "}
                <strong className="text-white tabular-nums">
                  {model.hoursToday.toLocaleString("en-IN")} hours
                </strong>{" "}
                a month on these messages. At a {Math.round(AUTOMATION_RATE * 100)}%
                automation rate that returns{" "}
                <strong className="text-white tabular-nums">
                  {model.hoursSaved.toLocaleString("en-IN")} hours
                </strong>{" "}
                — {inr.format(model.timeValue)} a month.
              </p>
            </div>

            <div className="mb-8 rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="mb-2 flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-green-400" />
                <p className="text-sm font-semibold text-white">
                  Exceptions caught in time
                </p>
              </div>
              <p className="text-sm leading-relaxed text-slate-300">
                {inr.format(model.disputedValue)} of monthly spend arrives wrong
                on your own estimate. Catching it before payment rather than
                after recovers{" "}
                <strong className="text-white tabular-nums">
                  {inr.format(model.leakageRecovered)}
                </strong>{" "}
                a month at a {Math.round(LEAKAGE_RECOVERY_RATE * 100)}% recovery
                assumption.
              </p>
            </div>

            <CtaLink
              to={DEMO_PATH}
              location="roi_calculator"
              variant="primary-gradient"
              size="md"
              className="w-full"
              onClick={() =>
                trackRoiCalculated({
                  orders: messages,
                  suppliers: null,
                  annualSaving: model.annual,
                })
              }
            >
              Pressure-test this on your numbers
              <ArrowRight className="h-4 w-4" />
            </CtaLink>

            <p className="mt-5 text-xs leading-relaxed text-slate-400">
              This is arithmetic on your inputs, not a result PashX has measured
              at your company. The automation and recovery rates above are
              deliberately conservative; a pilot measures your real baseline
              before and after.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
