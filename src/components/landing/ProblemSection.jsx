import { FileSpreadsheet, Unlink, Users, Eye } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import Container from "../layout/Container";

const problems = [
  {
    icon: FileSpreadsheet,
    title: "Procurement in Spreadsheets",
    desc: "Orders, approvals, and vendor data scattered across emails, WhatsApp, and Excel — no single source of truth.",
  },
  {
    icon: Unlink,
    title: "Projects in Disconnected Tools",
    desc: "Execution tracked in one tool, procurement in another. Teams operate in silos with no connected workflow.",
  },
  {
    icon: Users,
    title: "Vendors Outside Workflows",
    desc: "Supplier communication is manual. Delivery tracking, invoice matching, and disputes happen outside the system.",
  },
  {
    icon: Eye,
    title: "Costs Tracked Too Late",
    desc: "No real-time budget vs. actual visibility. Cost overruns are discovered weeks after they happen.",
  },
];

export default function ProblemSection() {
  const ref = useScrollReveal();

  return (
    <section
      ref={ref}
      className="py-20 md:py-24 bg-slate-50 min-h-[60vh]"
    >
      <Container>

        {/* Heading */}
        <div className="reveal max-w-2xl mx-auto text-center mb-14 md:mb-20">
          <h2 className="text-[28px] sm:text-[32px] md:text-[40px] font-extrabold text-[#0A2540] mb-5 leading-[1.1] tracking-tight">
            Too Many Tools.{" "}
            <span className="bg-gradient-to-r from-[#16A34A] to-[#22C55E] bg-clip-text text-transparent">
              No Real Control.
            </span>
          </h2>

          <p className="text-slate-500 text-base md:text-lg leading-relaxed">
            Enterprises lose millions every year because operations are fragmented
            across disconnected systems.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">

          {problems.map((p, i) => (
            <div
              key={p.title}
              className={`
                reveal reveal-delay-${(i % 4) + 1}
                group relative rounded-2xl p-5 md:p-6
                bg-white/70 backdrop-blur
                border border-slate-200/60
                shadow-sm transition-all duration-300
                hover:shadow-xl hover:-translate-y-2
                hover:border-[#16A34A]/30
              `}
            >

              {/* Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#16A34A]/0 to-[#22C55E]/0 group-hover:from-[#16A34A]/10 group-hover:to-[#22C55E]/10 transition duration-300 pointer-events-none" />

              {/* Icon */}
              <div className="relative w-10 h-10 md:w-11 md:h-11 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center mb-4 md:mb-5 group-hover:scale-110 transition">
                <p.icon className="h-5 w-5 text-red-500" />
              </div>

              {/* Title */}
              <h3 className="relative text-[15px] font-semibold text-[#0A2540] mb-2">
                {p.title}
              </h3>

              {/* Description */}
              <p className="relative text-sm text-slate-500 leading-relaxed">
                {p.desc}
              </p>

            </div>
          ))}

        </div>

      </Container>
    </section>
  );
}