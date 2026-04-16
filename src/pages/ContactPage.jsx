import { Mail, Phone, MapPin, ArrowRight, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";
import Container from "../components/layout/Container";

export default function ContactPage() {
  const ref = useScrollReveal();

  return (
    <div ref={ref} className="pt-20 md:pt-24">

      <section className="py-16 md:py-24 bg-white">
        <Container>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* ================= LEFT ================= */}
            <div className="reveal">

              <p className="text-xs md:text-sm font-semibold tracking-[0.25em] text-[#15803D] uppercase mb-5 md:mb-6">
                GET IN TOUCH
              </p>

              <h1 className="text-3xl sm:text-4xl md:text-[48px] leading-[1.1] font-extrabold text-[#0A2540] mb-5 md:mb-6">
                Let's{" "}
                <span className="bg-gradient-to-r from-[#15803D] to-[#22C55E] bg-clip-text text-transparent">
                  Talk
                </span>
              </h1>

              <p className="text-base md:text-lg text-slate-500 leading-relaxed mb-8 md:mb-10 max-w-lg">
                Questions about the platform, pricing, or partnerships — we're here to help. Reach out directly or book a demo to see PashxD in action.
              </p>

              {/* CONTACT INFO */}
              <div className="space-y-5 md:space-y-6">
                <Info icon={Mail} title="Email" value="shahil@pashx.com" href="mailto:shahil@pashx.com" />
                <Info icon={Phone} title="Phone" value="+49 157 7802062" href="tel:+491577802062" />
                <Info icon={MapPin} title="Office" value="Berlin, Germany" />
              </div>

              {/* TRUST */}
              <div className="mt-10 md:mt-12 pt-6 md:pt-8 border-t border-slate-100">

                <p className="text-xs text-slate-400 uppercase tracking-widest mb-4">
                  TRUSTED BY 500+ TEAMS
                </p>

                <div className="flex gap-2 md:gap-3 flex-wrap">
                  {["SOC 2 Compliant", "99.9% Uptime", "24/7 Support"].map((t) => (
                    <span
                      key={t}
                      className="px-3 md:px-4 py-1.5 rounded-full bg-green-50 text-[#15803D] text-xs border border-green-100 font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>

              </div>

            </div>

            {/* ================= RIGHT (CTA CARD) ================= */}
            <div className="reveal reveal-delay-2">

              <div className="bg-gradient-to-br from-[#0A2540] via-[#0d2b4a] to-[#0A2540] rounded-2xl p-8 md:p-10 shadow-[0_20px_60px_rgba(10,37,64,0.2)] border border-white/10 relative overflow-hidden">

                {/* Ambient glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/20 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative">

                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-500/15 border border-green-400/20 mb-6">
                    <MessageSquare className="w-5 h-5 text-green-400" />
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                    Ready to see PashxD in action?
                  </h2>

                  <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-8">
                    Book a personalized 30-minute demo and our team will walk you through how PashxD fits your workflow — with a custom ROI analysis for your company.
                  </p>

                  {/* Benefits */}
                  <ul className="space-y-3 mb-8">
                    {[
                      "Tailored to your use case",
                      "Live Q&A with product specialist",
                      "No commitment, no sales pressure",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                        <span className="text-sm text-slate-300">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link
                    to="/book-demo"
                    className="inline-flex items-center justify-center gap-2 w-full bg-[#15803D] hover:bg-[#166534] text-white rounded-full font-semibold py-3.5 md:py-4 text-sm shadow-lg shadow-green-600/30 hover:-translate-y-[1px] transition-all duration-300"
                  >
                    Book a Demo
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <p className="text-[11px] text-slate-400 text-center mt-4">
                    Average response time: under 2 hours
                  </p>

                </div>

              </div>

            </div>

          </div>
        </Container>
      </section>

    </div>
  );
}

/* ================= COMPONENT ================= */

function Info({ icon: Icon, title, value, href }) {
  const content = (
    <>
      <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-[#15803D]" />
      </div>

      <div>
        <p className="text-xs md:text-sm font-semibold text-[#0A2540]">
          {title}
        </p>
        <p className="text-sm text-slate-500 group-hover:text-[#15803D] transition">
          {value}
        </p>
      </div>
    </>
  );

  if (href) {
    return (
      <a href={href} className="group flex items-start gap-4">
        {content}
      </a>
    );
  }

  return (
    <div className="flex items-start gap-4">
      {content}
    </div>
  );
}