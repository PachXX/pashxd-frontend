import { useScrollReveal } from "../../hooks/useScrollReveal";

// LOGOS
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
      className="py-36 bg-gradient-to-b from-white to-slate-50/60"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center max-w-4xl mx-auto mb-24">

          <p className="text-sm tracking-[0.35em] text-green-600 font-semibold mb-5">
            INTEGRATIONS
          </p>

          <h2 className="text-5xl sm:text-6xl font-extrabold text-[#0A2540] mb-6 leading-tight">
            Works With Your{" "}
            <span className="bg-gradient-to-r from-[#15803D] to-[#22C55E] bg-clip-text text-transparent">
              Existing Systems
            </span>
          </h2>

          <p className="text-slate-500 text-xl leading-relaxed">
            Seamlessly integrates with ERP, CRM, accounting, and operations tools —
            without disrupting your workflows.
          </p>

        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 max-w-6xl mx-auto">

          {integrations.map((int) => (
            <div
              key={int.name}
              className="
                group
                bg-white
                border border-slate-200
                rounded-2xl p-10
                text-center
                shadow-sm
                transition-all duration-300
                hover:shadow-2xl hover:-translate-y-3
                hover:border-green-200
              "
            >

              {/* LOGO */}
              <div className="h-16 flex items-center justify-center mb-6">
                <img
                  src={int.logo}
                  alt={int.name}
                  className="
                    max-h-12 object-contain
                    opacity-70
                    transition-all duration-300
                    group-hover:opacity-100 group-hover:scale-110
                  "
                  loading="lazy"
                />
              </div>

              {/* NAME */}
              <div className="text-lg font-semibold text-[#0A2540]">
                {int.name}
              </div>

              {/* DESC */}
              <div className="text-sm text-slate-500 mt-2">
                {int.desc}
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}