import { useScrollReveal } from "../../hooks/useScrollReveal";
import Container from "../layout/Container";

// LOGOS
import pashxdLogo from "../../assets/logos/pashxd-logo2.jpg";
import sap from "../../assets/logos/sap.png";
import zoho from "../../assets/logos/zoho.png";
import quickbooks from "../../assets/logos/quickbooks.png";
import oracle from "../../assets/logos/oracle.png";
import microsoft from "../../assets/logos/microsoft.png";
import tally from "../../assets/logos/tally.png";
import odoo from "../../assets/logos/odoo.png";
import excel from "../../assets/logos/excel.png";

const integrations = [
  { name: "SAP", desc: "ERP", logo: sap },
  { name: "Zoho", desc: "CRM", logo: zoho },
  { name: "QuickBooks", desc: "Accounting", logo: quickbooks },
  { name: "Oracle", desc: "ERP", logo: oracle },
  { name: "Microsoft", desc: "Office 365", logo: microsoft },
  { name: "Tally", desc: "Finance", logo: tally },
  { name: "Odoo", desc: "ERP", logo: odoo },
  { name: "Excel", desc: "Spreadsheets", logo: excel },
];

export default function IntegrationsSection() {
  const ref = useScrollReveal();

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-36 bg-gradient-to-b from-white to-slate-50/60 overflow-hidden"
    >
      {/* Keyframes for data flow animation */}
      <style>
        {`
          @keyframes pulse-glow {
            0%, 100% { transform: scale(1); opacity: 0.6; }
            50% { transform: scale(1.15); opacity: 1; }
          }

          .hub-pulse::before {
            content: '';
            position: absolute;
            inset: -8px;
            border-radius: 9999px;
            border: 2px solid rgba(21, 128, 61, 0.3);
            animation: pulse-glow 2.5s ease-in-out infinite;
          }

          .hub-pulse::after {
            content: '';
            position: absolute;
            inset: -18px;
            border-radius: 9999px;
            border: 1px solid rgba(21, 128, 61, 0.15);
            animation: pulse-glow 2.5s ease-in-out infinite 0.5s;
          }
        `}
      </style>

      <Container>

        {/* HEADER */}
        <div className="text-center max-w-4xl mx-auto mb-16 md:mb-24">

          <p className="text-xs md:text-sm tracking-[0.35em] text-[#15803D] font-semibold mb-5">
            INTEGRATIONS
          </p>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#0A2540] mb-6 leading-tight">
            Works With Your{" "}
            <span className="bg-gradient-to-r from-[#15803D] to-[#22C55E] bg-clip-text text-transparent">
              Existing Systems
            </span>
          </h2>

          <p className="text-slate-500 text-base md:text-xl leading-relaxed">
            Seamlessly integrates with ERP, CRM, accounting, and operations tools —
            without disrupting your workflows.
          </p>

        </div>

        {/* ===== CONNECTION HUB ===== */}
        <div className="relative max-w-5xl mx-auto">

          {/* Mobile: simple grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 md:hidden">
            {integrations.map((int) => (
              <LogoCard key={int.name} int={int} />
            ))}
          </div>

          {/* Desktop: hub with radial connections */}
          <div className="hidden md:block relative h-[600px]">

            {/* SVG connection lines + animated dots */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 1000 600"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="intLine" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#15803D" stopOpacity="0.05" />
                  <stop offset="50%" stopColor="#22C55E" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#15803D" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              {/* Connection lines — from each logo position to center (500, 300) */}
              {[
                { x: 120, y: 100, delay: 0 },
                { x: 380, y: 80,  delay: 0.3 },
                { x: 620, y: 80,  delay: 0.6 },
                { x: 880, y: 100, delay: 0.9 },
                { x: 120, y: 500, delay: 1.2 },
                { x: 380, y: 520, delay: 1.5 },
                { x: 620, y: 520, delay: 1.8 },
                { x: 880, y: 500, delay: 2.1 },
              ].map((pos, i) => (
                <g key={i}>
                  <line
                    x1={pos.x}
                    y1={pos.y}
                    x2="500"
                    y2="300"
                    stroke="url(#intLine)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  {/* Animated dot traveling along this line */}
                  <circle r="4" fill="#22C55E">
                    <animateMotion
                      dur="3s"
                      repeatCount="indefinite"
                      begin={`${pos.delay}s`}
                      path={`M ${pos.x} ${pos.y} L 500 300`}
                    />
                    <animate
                      attributeName="opacity"
                      values="0;1;1;0"
                      dur="3s"
                      repeatCount="indefinite"
                      begin={`${pos.delay}s`}
                    />
                  </circle>
                </g>
              ))}
            </svg>

            {/* Logo cards positioned in 8 spots around the hub */}
            <div className="absolute inset-0">
              <div className="absolute" style={{ left: "2%", top: "7%" }}>
                <LogoCard int={integrations[0]} />
              </div>
              <div className="absolute" style={{ left: "30%", top: "0%" }}>
                <LogoCard int={integrations[1]} />
              </div>
              <div className="absolute" style={{ right: "30%", top: "0%" }}>
                <LogoCard int={integrations[2]} />
              </div>
              <div className="absolute" style={{ right: "2%", top: "7%" }}>
                <LogoCard int={integrations[3]} />
              </div>

              <div className="absolute" style={{ left: "2%", bottom: "7%" }}>
                <LogoCard int={integrations[4]} />
              </div>
              <div className="absolute" style={{ left: "30%", bottom: "0%" }}>
                <LogoCard int={integrations[5]} />
              </div>
              <div className="absolute" style={{ right: "30%", bottom: "0%" }}>
                <LogoCard int={integrations[6]} />
              </div>
              <div className="absolute" style={{ right: "2%", bottom: "7%" }}>
                <LogoCard int={integrations[7]} />
              </div>

              {/* Central Hub with PashxD logo */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="hub-pulse relative">
                  <div className="relative w-32 h-32 rounded-full bg-white p-2 shadow-[0_20px_60px_rgba(10,37,64,0.35)] border border-slate-200">
                    <img
                      src={pashxdLogo}
                      alt="PashxD"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  {/* Label under hub */}
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#15803D] font-semibold">
                      Unified Hub
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom copy */}
        <div className="text-center mt-12 md:mt-16">
          <p className="text-sm text-slate-500">
            <span className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Two-way sync. Real-time data flow.
            </span>
          </p>
        </div>

      </Container>
    </section>
  );
}

/* ===== Helper ===== */

function LogoCard({ int }) {
  return (
    <div
      className="
        group
        bg-white
        border border-slate-200
        rounded-2xl p-5 md:p-6
        text-center
        shadow-sm
        transition-all duration-300
        hover:shadow-xl hover:-translate-y-2
        hover:border-green-200
        w-[140px] md:w-[160px]
      "
    >
      <div className="h-10 md:h-12 flex items-center justify-center mb-3">
        <img
          src={int.logo}
          alt={int.name}
          className="max-h-8 md:max-h-10 object-contain opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="text-sm md:text-base font-semibold text-[#0A2540]">
        {int.name}
      </div>
      <div className="text-[11px] md:text-xs text-slate-500 mt-1">
        {int.desc}
      </div>
    </div>
  );
}