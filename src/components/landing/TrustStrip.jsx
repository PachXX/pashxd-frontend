import Container from "../layout/Container";

// ERP/Software Integration Logos
import sap from "../../assets/logos/sap.png";
import zoho from "../../assets/logos/zoho.png";
import oracle from "../../assets/logos/oracle.png";
import microsoft from "../../assets/logos/microsoft.png";
import quickbooks from "../../assets/logos/quickbooks.png";
import tally from "../../assets/logos/tally.png";

// Partner Logos
import bharath from "../../assets/logos/bharath.png";
import greyline from "../../assets/logos/greyline.png";
import hammernail from "../../assets/logos/hammer&nail.png";
import ilmtec from "../../assets/logos/ilmtec.png";
import mab from "../../assets/logos/mab.png";
import empact from "../../assets/logos/empact.png";
export default function TrustStrip() {
  const integrationLogos = [
    { name: "SAP", src: sap },
    { name: "Zoho", src: zoho },
    { name: "Oracle", src: oracle },
    { name: "Microsoft", src: microsoft },
    { name: "QuickBooks", src: quickbooks },
    { name: "Tally", src: tally },
  ];

  const partnerLogos = [
    { name: "Bharath", src: bharath },
    { name: "Greyline", src: greyline },
    { name: "Hammer & Nail", src: hammernail },
    { name: "ILMTEC", src: ilmtec },
    { name: "MAB", src: mab },
    { name: "Empact", src: empact },
  ];

  // 🔁 duplicate logos for seamless loop
  const extendedIntegrations = [...integrationLogos, ...integrationLogos];
  const extendedPartners = [...partnerLogos, ...partnerLogos];

  return (
    <section className="py-16 md:py-24 bg-white border-y border-slate-100">

      {/* ===== INTEGRATIONS ROW ===== */}
      {/* Header — wrapped in Container for consistent alignment */}
      <Container className="text-center mb-10 md:mb-14">
        <p className="text-xs md:text-base tracking-[0.35em] uppercase text-slate-400">
          TRUSTED BY TEAMS USING
        </p>
      </Container>

      {/* MARQUEE — intentionally outside Container so it bleeds edge-to-edge */}
      <div className="marquee">
        <div className="marquee-track gap-12 md:gap-24 items-center">
          {extendedIntegrations.map((logo, i) => (
            <div
              key={i}
              className="
                flex items-center justify-center
                opacity-80 hover:opacity-100
                transition duration-300
                hover:scale-110
              "
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="h-12 md:h-20 lg:h-24 object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ===== PARTNERS ROW ===== */}
      {/* Header */}
      <Container className="text-center mt-16 md:mt-20 mb-10 md:mb-14">
        <p className="text-xs md:text-base tracking-[0.35em] uppercase text-slate-400">
          TRUSTED PARTNERS
        </p>
      </Container>

      {/* MARQUEE — reverse direction for visual variety */}
      <div className="marquee marquee-reverse">
        <div className="marquee-track gap-12 md:gap-24 items-center">
          {extendedPartners.map((logo, i) => (
            <div
              key={i}
              className="
                flex items-center justify-center
                opacity-80 hover:opacity-100
                transition duration-300
                hover:scale-110
              "
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="h-12 md:h-20 lg:h-24 object-contain"
              />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}