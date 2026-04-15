import sap from "../../assets/logos/sap.png";
import zoho from "../../assets/logos/zoho.png";
import oracle from "../../assets/logos/oracle.png";
import microsoft from "../../assets/logos/microsoft.png";
import quickbooks from "../../assets/logos/quickbooks.png";
import tally from "../../assets/logos/tally.png";

export default function TrustStrip() {
  const logos = [
    { name: "SAP", src: sap },
    { name: "Zoho", src: zoho },
    { name: "Oracle", src: oracle },
    { name: "Microsoft", src: microsoft },
    { name: "QuickBooks", src: quickbooks },
    { name: "Tally", src: tally },
  ];

  // 🔁 duplicate logos for seamless loop
  const extendedLogos = [...logos, ...logos];

  return (
    <section className="py-24 bg-white border-y border-slate-100">

      <div className="max-w-7xl mx-auto px-6 text-center mb-14">
        <p className="text-base tracking-[0.35em] uppercase text-slate-400">
          TRUSTED BY TEAMS USING
        </p>
      </div>

      {/* MARQUEE */}
      <div className="marquee">

        <div className="marquee-track gap-24 items-center">

          {extendedLogos.map((logo, i) => (
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
                className="h-20 md:h-24 lg:h-28 object-contain"
              />
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}