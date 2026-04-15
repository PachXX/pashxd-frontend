import { Mail, Phone, MapPin } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function ContactPage() {
  const ref = useScrollReveal();

  return (
    <div ref={ref} className="pt-24">

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* ================= LEFT ================= */}
            <div className="reveal">

              <p className="text-sm font-semibold tracking-[0.2em] text-[#15803D] uppercase mb-6">
                GET IN TOUCH
              </p>

              <h1 className="text-[48px] leading-[1.1] font-extrabold text-[#0A2540] mb-6">
                Book Your Demo
              </h1>

              <p className="text-lg text-slate-500 leading-relaxed mb-10 max-w-lg">
                See how PashxD can transform your operations. Fill out the form and our
                team will schedule a personalized demo for your use case.
              </p>

              {/* CONTACT INFO */}
              <div className="space-y-6">

                <Info icon={Mail} title="Email" value="shahil@pashx.com" />
                <Info icon={Phone} title="Phone" value="+49 157 7802062" />
                <Info icon={MapPin} title="Office" value="Berlin, Germany" />

              </div>

              {/* TRUST */}
              <div className="mt-12 pt-8 border-t border-slate-100">

                <p className="text-xs text-slate-400 uppercase tracking-widest mb-4">
                  TRUSTED BY 500+ TEAMS
                </p>

                <div className="flex gap-3 flex-wrap">
                  {["SOC 2 Compliant", "99.9% Uptime", "24/7 Support"].map((t) => (
                    <span
                      key={t}
                      className="px-4 py-1.5 rounded-full bg-green-50 text-[#15803D] text-xs border border-green-100"
                    >
                      {t}
                    </span>
                  ))}
                </div>

              </div>

            </div>

            {/* ================= RIGHT (CARD) ================= */}
            <div className="reveal reveal-delay-2">

              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl">

                {/* ✅ Calendly Embed */}
                <iframe
                  src="https://calendly.com/shahil-talenlio-letstalk/letstalk"
                  width="100%"
                  height="600"
                  frameBorder="0"
                  className="rounded-xl"
                />

              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

/* ================= COMPONENT ================= */

function Info({ icon: Icon, title, value }) {
  return (
    <div className="flex items-start gap-4">

      <div className="w-12 h-12 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center">
        <Icon className="w-5 h-5 text-[#15803D]" />
      </div>

      <div>
        <p className="text-sm font-semibold text-[#0A2540]">
          {title}
        </p>
        <p className="text-sm text-slate-500">
          {value}
        </p>
      </div>

    </div>
  );
}