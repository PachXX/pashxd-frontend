import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function CTASection() {
  const ref = useScrollReveal();

  return (
    <section
      ref={ref}
      className="py-32 bg-gradient-to-b from-white to-slate-50"
    >
      <div className="max-w-5xl mx-auto px-6">

        <div
          className="
            reveal
            relative
            bg-[#0A2540]
            rounded-3xl
            p-14 md:p-20
            text-center
            overflow-hidden
            shadow-[0_25px_80px_rgba(0,0,0,0.25)]
            border border-white/10
          "
        >

          {/* Glow */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#16A34A]/20 via-transparent to-[#22C55E]/10" />
            <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 bg-green-500/20 blur-[140px]" />
          </div>

          <div className="relative">

            {/* HEADING */}
            <h2 className="reveal text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
              Stop Managing Operations Across{" "}
              <span className="text-green-400">10 Tools</span>
            </h2>

            {/* SUBTEXT */}
            <p className="reveal reveal-delay-1 text-slate-300 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Unify procurement, execution, and AI decision-making in one platform — and scale faster with complete visibility.
            </p>

            {/* BUTTONS */}
            <div className="reveal reveal-delay-2 flex flex-wrap gap-5 justify-center">

              {/* ✅ PRIMARY — CALENDLY */}
              <a
                href="https://calendly.com/shahil-talenlio-letstalk/letstalk"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex items-center gap-2
                  bg-gradient-to-r from-[#16A34A] to-[#22C55E]
                  hover:scale-[1.03]
                  text-white
                  px-10 py-4
                  rounded-full
                  text-base font-semibold
                  shadow-[0_10px_30px_rgba(34,197,94,0.4)]
                  transition-all duration-300
                "
              >
                Book a Demo
                <ArrowRight className="w-5 h-5" />
              </a>

              {/* SECONDARY */}
              <Link
                to="/product"
                className="
                  px-10 py-4
                  rounded-full
                  text-base font-semibold
                  border border-white/20
                  text-white
                  hover:bg-white/10
                  transition-all duration-300
                "
              >
                See Platform
              </Link>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}