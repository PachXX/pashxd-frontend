import { useScrollReveal } from "../hooks/useScrollReveal";
import { Link } from "react-router-dom";
import Container from "../components/layout/Container";

import { Target, Users, Globe, ArrowRight } from "lucide-react";

// ✅ IMPORT FOUNDER IMAGE
import shahil from "../assets/logos/shahil.jpg";

const values = [
  {
    icon: Target,
    title: "Operational Precision",
    desc: "We believe every material, every delivery, and every cost should be tracked with precision. No more guesswork.",
  },
  {
    icon: Users,
    title: "Built for Teams",
    desc: "PashxD is designed for the people who actually do the work — site teams, procurement managers, project leads.",
  },
  {
    icon: Globe,
    title: "Enterprise Scale",
    desc: "From 5 projects to 500, our platform scales with your operations without losing speed or clarity.",
  },
];

const team = [
  {
    name: "Shahil Mohideen",
    role: "Founder & CEO",
    image: shahil,
    desc: "Founder of PashxD, focused on transforming physical operations through AI-driven systems, automation, and scalable enterprise infrastructure.",
  },
];

const milestones = [
  {
    year: "2024",
    event:
      "PashxD founded with a vision to unify procurement, execution, and AI for physical operations.",
  },
  {
    year: "Today",
    event:
      "Building scalable AI-driven systems for enterprises managing real-world operations.",
  },
];

export default function AboutPage() {
  const ref = useScrollReveal();

  return (
    <div ref={ref} className="pt-20 md:pt-24">

      {/* HERO */}
      <section className="py-20 md:py-28 bg-[#F8FAFC] text-center">
        <Container>

          <p className="reveal text-xs md:text-sm font-semibold tracking-[0.25em] text-[#15803D] uppercase mb-5 md:mb-6">
            About PashxD
          </p>

          <h1 className="reveal text-3xl sm:text-4xl md:text-[3.5rem] leading-[1.15] font-extrabold text-[#0A2540] tracking-tight max-w-4xl mx-auto mb-5 md:mb-6">
            Building the OS for{" "}
            <span className="bg-gradient-to-r from-[#15803D] to-[#22C55E] bg-clip-text text-transparent">
              Physical Operations
            </span>
          </h1>

          <p className="reveal reveal-delay-1 text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            We're on a mission to bring the same level of software intelligence that powers digital businesses to the companies that build and maintain the physical world.
          </p>

        </Container>
      </section>

      {/* STORY */}
      <section className="py-20 md:py-24 bg-slate-50">
        <Container>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* LEFT */}
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-[#15803D] font-semibold mb-4">
                Our Journey
              </p>

              <h2 className="text-3xl md:text-4xl font-bold text-[#0A2540] mb-5 md:mb-6 leading-tight">
                Born from the Chaos of Real Operations
              </h2>

              <p className="text-slate-500 mb-4 leading-relaxed">
                PashxD was born when our founders experienced firsthand the painful fragmentation of managing large-scale physical operations. Procurement in spreadsheets, execution in disconnected tools, and decisions based on outdated data.
              </p>

              <p className="text-slate-500 leading-relaxed">
                Today, we are building a unified platform powered by AI to bring clarity, control, and scalability to enterprise operations.
              </p>
            </div>

            {/* RIGHT TIMELINE */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
              {milestones.map((m, i) => (
                <div key={m.year} className="flex gap-4 mb-6 last:mb-0">

                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-[#15803D] rounded-full flex-shrink-0" />
                    {i < milestones.length - 1 && (
                      <div className="w-[1px] h-full bg-green-200 mt-1" />
                    )}
                  </div>

                  <div>
                    <div className="text-sm font-bold text-[#15803D]">
                      {m.year}
                    </div>
                    <div className="text-sm text-slate-500 mt-1 leading-relaxed">
                      {m.event}
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>

        </Container>
      </section>

      {/* VALUES */}
      <section className="py-20 md:py-24 bg-white">
        <Container>

          <div className="text-center mb-12 md:mb-16">

            <p className="text-xs tracking-[0.2em] uppercase text-[#15803D] font-semibold mb-4">
              Our Values
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-[#0A2540]">
              What Drives Us
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center"
              >
                <div className="w-12 h-12 bg-green-50 border border-green-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <v.icon className="w-6 h-6 text-[#15803D]" />
                </div>

                <h3 className="text-lg font-semibold text-[#0A2540] mb-2">
                  {v.title}
                </h3>

                <p className="text-sm text-slate-500 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>

        </Container>
      </section>

      {/* FOUNDER */}
      <section className="py-20 md:py-24 bg-slate-50">
        <Container>

          <div className="text-center mb-12 md:mb-16">

            <p className="text-xs tracking-[0.2em] uppercase text-[#15803D] font-semibold mb-4">
              Founder
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-[#0A2540]">
              Meet the Founder
            </h2>

          </div>

          <div className="flex justify-center">
            {team.map((t) => (
              <div
                key={t.name}
                className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-md text-center max-w-sm"
              >

                <img
                  src={t.image}
                  alt={t.name}
                  className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover mx-auto mb-4 border-4 border-green-100"
                />

                <h3 className="text-xl font-semibold text-[#0A2540]">
                  {t.name}
                </h3>

                <p className="text-[#15803D] text-sm mb-3 font-medium">
                  {t.role}
                </p>

                <p className="text-sm text-slate-500 leading-relaxed">
                  {t.desc}
                </p>

              </div>
            ))}
          </div>

        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24 bg-white">
        <Container className="max-w-4xl">

          <div className="bg-gradient-to-br from-[#15803D] to-[#166534] rounded-3xl p-8 md:p-12 text-center shadow-[0_20px_60px_rgba(21,128,61,0.25)] relative overflow-hidden">

            {/* Ambient glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-400/20 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                Join Us in Transforming Operations
              </h2>

              <p className="text-green-100 mb-8 text-sm md:text-base max-w-lg mx-auto">
                Let's build the future of physical operations together.
              </p>

              <Link
                to="/book-demo"
                className="inline-flex items-center gap-2 bg-white text-[#15803D] px-7 md:px-8 py-3.5 md:py-4 rounded-full text-sm md:text-base font-semibold hover:-translate-y-[2px] transition-all duration-300 shadow-lg"
              >
                Get in Touch <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </Container>
      </section>

    </div>
  );
}