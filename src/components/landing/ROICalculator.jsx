import { useState } from "react";
import { Calculator, Clock, TrendingUp } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function ROICalculator() {
  const ref = useScrollReveal();

  const [orders, setOrders] = useState(500);
  const [avgValue, setAvgValue] = useState(5000);
  const [projects, setProjects] = useState(20);

  const monthlySpend = orders * avgValue;
  const monthlySavings = monthlySpend * 0.08;
  const yearlySavings = monthlySavings * 12;

  return (
    <section ref={ref} className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs tracking-[0.2em] text-green-600 font-semibold mb-3">
            ROI CALCULATOR
          </p>

          <h2 className="text-4xl font-bold text-[#0A2540] mb-4">
            See Your Potential Savings
          </h2>

          <p className="text-slate-500">
            Enter your operational data to see how PashxD can impact your bottom line.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* LEFT PANEL */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">

            <div className="flex items-center gap-2 mb-8">
              <Calculator className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-[#0A2540] text-lg">
                Your Operations
              </h3>
            </div>

            {/* SLIDER STYLE */}
            <style>
              {`
              input[type=range] {
                -webkit-appearance: none;
                width: 100%;
                height: 6px;
                border-radius: 999px;
                background: #E2E8F0;
                outline: none;
              }

              input[type=range]::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 18px;
                height: 18px;
                border-radius: 50%;
                background: #16A34A;
                cursor: pointer;
                box-shadow: 0 4px 10px rgba(22,163,74,0.4);
              }
              `}
            </style>

            {/* SLIDER 1 */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-slate-600">Monthly Purchase Orders</span>
                <span className="text-green-600 font-semibold">{orders}</span>
              </div>

              <input
                type="range"
                min="50"
                max="5000"
                value={orders}
                onChange={(e) => setOrders(Number(e.target.value))}
              />

              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>50</span>
                <span>5,000</span>
              </div>
            </div>

            {/* SLIDER 2 */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-slate-600">Average PO Value</span>
                <span className="text-green-600 font-semibold">
                  ${(avgValue / 1000).toFixed(0)}K
                </span>
              </div>

              <input
                type="range"
                min="500"
                max="50000"
                step="500"
                value={avgValue}
                onChange={(e) => setAvgValue(Number(e.target.value))}
              />

              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>$500</span>
                <span>$50K</span>
              </div>
            </div>

            {/* SLIDER 3 */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-slate-600">Active Projects</span>
                <span className="text-green-600 font-semibold">{projects}</span>
              </div>

              <input
                type="range"
                min="1"
                max="200"
                value={projects}
                onChange={(e) => setProjects(Number(e.target.value))}
              />

              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>1</span>
                <span>200</span>
              </div>
            </div>

            {/* RESULT */}
            <div className="pt-6 border-t border-slate-100">
              <p className="text-sm text-slate-400 mb-1">
                Monthly procurement spend
              </p>
              <p className="text-3xl font-bold text-[#0A2540]">
                ${(monthlySpend / 1000000).toFixed(1)}M
              </p>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div>

            {/* BIG CARD */}
            <div className="bg-gradient-to-br from-[#15803D] to-[#166534] text-white rounded-2xl p-8 shadow-[0_20px_50px_rgba(22,163,74,0.35)] mb-6">

              <p className="text-sm opacity-80 mb-2">
                Estimated Annual Savings
              </p>

              <h3 className="text-5xl font-extrabold mb-2 tracking-tight">
                ${(yearlySavings / 1000000).toFixed(1)}M
              </h3>

              <p className="opacity-80 text-sm">
                per year with PashxD
              </p>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-4 mb-6">

              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <p className="text-green-600 text-xl">$</p>
                <p className="font-bold text-lg text-[#0A2540]">
                  ${(monthlySavings / 1000).toFixed(0)}K
                </p>
                <p className="text-xs text-slate-400">
                  Monthly procurement savings (8%)
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <Clock className="text-blue-500 mb-1" />
                <p className="font-bold text-lg text-[#0A2540]">150h</p>
                <p className="text-xs text-slate-400">
                  Hours saved monthly on processing
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <TrendingUp className="text-orange-500 mb-1" />
                <p className="font-bold text-lg text-[#0A2540]">$15K</p>
                <p className="text-xs text-slate-400">
                  Cost overruns prevented monthly
                </p>
              </div>
            </div>

            {/* CTA */}
            <button className="w-full bg-gradient-to-r from-[#15803D] to-[#16A34A] hover:scale-[1.02] transition-all duration-300 text-white py-4 rounded-full font-semibold shadow-[0_10px_25px_rgba(22,163,74,0.3)]">
              Get Your Custom ROI Report
            </button>

          </div>

        </div>
      </div>
    </section>
  );
}