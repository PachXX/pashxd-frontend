import { useState } from "react";
import { Link } from "react-router-dom";
import { Calculator, Clock, TrendingUp, DollarSign, ArrowRight } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import Container from "../layout/Container";

export default function ROICalculator() {
  const ref = useScrollReveal();

  const [orders, setOrders] = useState(500);
  const [avgValue, setAvgValue] = useState(5000);
  const [projects, setProjects] = useState(20);

  const monthlySpend = orders * avgValue;
  const monthlySavings = monthlySpend * 0.08;
  const yearlySavings = monthlySavings * 12;

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 bg-gradient-to-b from-white to-slate-50/40"
    >
      <Container>

        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <p className="text-xs tracking-[0.25em] text-[#15803D] font-semibold mb-3">
            ROI CALCULATOR
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-[#0A2540] mb-4 leading-tight">
            See Your Potential{" "}
            <span className="bg-gradient-to-r from-[#15803D] to-[#22C55E] bg-clip-text text-transparent">
              Savings
            </span>
          </h2>

          <p className="text-slate-500 text-base md:text-lg">
            Adjust the sliders to see how PashxD can impact your bottom line.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-10 items-start">

          {/* =============== LEFT PANEL =============== */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">

            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center flex-shrink-0">
                <Calculator className="w-5 h-5 text-[#15803D]" />
              </div>
              <h3 className="font-semibold text-[#0A2540] text-base md:text-lg">
                Your Operations
              </h3>
            </div>

            {/* SLIDER STYLES */}
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
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background: #15803D;
                cursor: pointer;
                box-shadow: 0 4px 12px rgba(21,128,61,0.5);
                border: 3px solid white;
                transition: transform 0.2s;
              }

              .roi-slider::-webkit-slider-thumb:hover,
              .roi-slider::-webkit-slider-thumb:active {
                transform: scale(1.15);
              }

              .roi-slider::-moz-range-thumb {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background: #15803D;
                cursor: pointer;
                box-shadow: 0 4px 12px rgba(21,128,61,0.5);
                border: 3px solid white;
              }
              `}
            </style>

            {/* SLIDER 1 */}
            <SliderField
              label="Monthly Purchase Orders"
              value={orders}
              displayValue={orders.toLocaleString()}
              min={50}
              max={5000}
              step={50}
              onChange={setOrders}
              minLabel="50"
              maxLabel="5,000"
            />

            {/* SLIDER 2 */}
            <SliderField
              label="Average PO Value"
              value={avgValue}
              displayValue={`$${(avgValue / 1000).toFixed(0)}K`}
              min={500}
              max={50000}
              step={500}
              onChange={setAvgValue}
              minLabel="$500"
              maxLabel="$50K"
            />

            {/* SLIDER 3 */}
            <SliderField
              label="Active Projects"
              value={projects}
              displayValue={projects}
              min={1}
              max={200}
              step={1}
              onChange={setProjects}
              minLabel="1"
              maxLabel="200"
              isLast
            />

            {/* RESULT */}
            <div className="pt-5 md:pt-6 border-t border-slate-100">
              <p className="text-xs md:text-sm text-slate-400 mb-1 uppercase tracking-wider font-medium">
                Monthly Procurement Spend
              </p>
              <p className="text-2xl md:text-3xl font-bold text-[#0A2540] font-mono-data">
                ${(monthlySpend / 1000000).toFixed(2)}M
              </p>
            </div>
          </div>

          {/* =============== RIGHT PANEL =============== */}
          <div className="space-y-5 md:space-y-6">

            {/* BIG CARD — SAVINGS */}
            <div className="relative bg-gradient-to-br from-[#15803D] to-[#166534] text-white rounded-2xl p-6 md:p-8 shadow-[0_20px_50px_rgba(21,128,61,0.35)] overflow-hidden">

              {/* Subtle glow */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-400/20 blur-3xl rounded-full" />

              <div className="relative">
                <p className="text-[11px] md:text-xs opacity-80 mb-2 uppercase tracking-widest font-semibold">
                  Estimated Annual Savings
                </p>

                <h3 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-2 tracking-tight font-mono-data">
                  ${(yearlySavings / 1000000).toFixed(2)}M
                </h3>

                <p className="opacity-80 text-sm">
                  per year with PashxD
                </p>
              </div>
            </div>

            {/* STATS — responsive grid (1 col on narrow mobile, 3 cols from sm) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">

              <StatCard
                icon={DollarSign}
                iconColor="text-[#15803D]"
                iconBg="bg-green-50 border-green-100"
                value={`$${(monthlySavings / 1000).toFixed(0)}K`}
                label="Monthly procurement savings (8%)"
              />

              <StatCard
                icon={Clock}
                iconColor="text-blue-600"
                iconBg="bg-blue-50 border-blue-100"
                value="150h"
                label="Hours saved monthly on processing"
              />

              <StatCard
                icon={TrendingUp}
                iconColor="text-amber-600"
                iconBg="bg-amber-50 border-amber-100"
                value="$15K"
                label="Cost overruns prevented monthly"
              />

            </div>

            {/* CTA */}
            <Link
              to="/book-demo"
              className="flex items-center justify-center gap-2 w-full bg-[#15803D] hover:bg-[#166534] hover:-translate-y-[2px] transition-all duration-300 text-white py-3.5 md:py-4 rounded-full text-sm md:text-base font-semibold shadow-lg shadow-green-600/20"
            >
              Get Your Custom ROI Report
              <ArrowRight className="w-4 h-4" />
            </Link>

            <p className="text-[11px] text-slate-400 text-center">
              * Savings calculated at 8% procurement efficiency, industry average for enterprise platforms.
            </p>

          </div>

        </div>
      </Container>
    </section>
  );
}

/* ============ Reusable Slider Field ============ */

function SliderField({
  label,
  value,
  displayValue,
  min,
  max,
  step = 1,
  onChange,
  minLabel,
  maxLabel,
  isLast = false,
}) {
  return (
    <div className={isLast ? "mb-6 md:mb-8" : "mb-6 md:mb-8"}>
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-slate-600 font-medium">{label}</span>
        <span className="text-[#15803D] font-bold text-base md:text-lg bg-green-50 px-3 py-0.5 rounded-full border border-green-100 min-w-[60px] text-center">
          {displayValue}
        </span>
      </div>

      <input
        type="range"
        className="roi-slider"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
      />

      <div className="flex justify-between text-[11px] text-slate-400 mt-2">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

/* ============ Reusable Stat Card ============ */

function StatCard({ icon: Icon, iconColor, iconBg, value, label }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 md:p-5 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-green-200 transition-all duration-300">
      <div className={`w-9 h-9 rounded-lg ${iconBg} border flex items-center justify-center mb-3`}>
        <Icon className={`w-4 h-4 ${iconColor}`} />
      </div>
      <p className="font-bold text-lg md:text-xl text-[#0A2540] font-mono-data">
        {value}
      </p>
      <p className="text-[11px] md:text-xs text-slate-500 mt-1 leading-snug">
        {label}
      </p>
    </div>
  );
}