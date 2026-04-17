import {
  ClipboardList,
  Calculator,
  ShoppingCart,
  Truck,
  LayoutDashboard,
  BarChart3,
} from "lucide-react";

import { useScrollReveal } from "../../hooks/useScrollReveal";
import Container from "../layout/Container";

const steps = [
  { icon: ClipboardList, title: "Project", desc: "Define scope & budget" },
  { icon: Calculator, title: "BOQ", desc: "Material breakdown" },
  { icon: ShoppingCart, title: "Procurement", desc: "Auto-generate POs" },
  { icon: Truck, title: "Delivery", desc: "Track & verify" },
  { icon: LayoutDashboard, title: "Execution", desc: "Manage & report" },
  { icon: BarChart3, title: "Insights", desc: "AI analytics" },
];

const iconBoxClass = `
  relative z-10
  w-14 h-14 md:w-16 md:h-16
  rounded-2xl
  bg-white
  border border-slate-200
  flex items-center justify-center
  shadow-sm
  transition-all duration-300
  group-hover:-translate-y-3
  group-hover:shadow-[0_15px_40px_rgba(22,163,74,0.25)]
  group-hover:border-green-400/40
`;

export default function HowItWorks() {
  const ref = useScrollReveal();

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 bg-gradient-to-b from-white to-slate-50/60"
    >
      <Container>

        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0A2540] mb-4">
            From Project to Insights{" "}
            <span className="bg-gradient-to-r from-[#16A34A] to-[#22C55E] bg-clip-text text-transparent">
              in One Flow
            </span>
          </h2>
          <p className="text-sm md:text-base text-slate-500">
            A connected workflow eliminating gaps between procurement,
            delivery, and execution.
          </p>
        </div>

        {/* FLOW */}
        <div className="relative">

          {/* Desktop horizontal gradient line — aligned to icon center (top-8 = 32px = half of h-16) */}
          <div className="hidden md:block absolute top-8 left-[calc(8.33%+28px)] right-[calc(8.33%+28px)] h-[3px] rounded-full bg-gradient-to-r from-green-200 via-green-400 to-green-200 opacity-40" />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-x-4 gap-y-10 md:gap-8">

            {steps.map((step, i) => {
              const isLast = i === steps.length - 1;

              return (
                <div
                  key={step.title}
                  className="flex flex-col items-center text-center group relative pt-3 md:pt-0"
                >
                  {/* GLOW BACKGROUND */}
                  <div className="absolute w-20 h-20 bg-green-400/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition duration-500" />

                  {/* Step number badge — mobile & tablet only, gives sequential context in grid layout */}
                  <div className="md:hidden absolute top-0 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-green-50 border border-green-300 flex items-center justify-center shadow-sm">
                    <span className="text-[10px] font-bold text-green-700 leading-none">
                      {i + 1}
                    </span>
                  </div>

                  {/* ICON */}
                  <div className={iconBoxClass}>
                    <step.icon className="h-5 w-5 md:h-6 md:w-6 text-[#16A34A]" />
                  </div>

                  {/* TEXT */}
                  <div className="mt-3 md:mt-4 font-semibold text-[#0A2540] text-sm">
                    {step.title}
                  </div>
                  <div className="text-xs text-slate-400 mt-1 max-w-[110px] group-hover:text-slate-600 transition">
                    {step.desc}
                  </div>

                  {/* Desktop connector dot — hidden on last step to avoid orphan dot */}
                  {!isLast && (
                    <div className="hidden md:block absolute top-8 w-2 h-2 bg-green-400 rounded-full -right-1 opacity-60" />
                  )}
                </div>
              );
            })}

          </div>
        </div>
      </Container>
    </section>
  );
}