import { Target, Users, Globe, ArrowRight } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

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

// ✅ ONLY REAL FOUNDER
const team = [
  {
    name: "Shahil Mohideen",
    role: "Founder & CEO",
    image: shahil,
    desc: "Founder of PashxD, focused on transforming physical operations through AI-driven systems, automation, and scalable enterprise infrastructure.",
  },
];

// ✅ CLEAN + REAL TIMELINE
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
    <div ref={ref} className="pt-24">

      {/* HERO */}
     <section className="py-28 bg-[#F8FAFC] text-center">

       {/* Small Label */}
       <p className="
         text-sm
         font-semibold
         tracking-[0.25em]
         text-[#15803D]
         uppercase
         mb-6
         reveal
       ">
         About PashxD
       </p>

       {/* BIG HEADING */}
       <h1 className="
         reveal
         text-[4rem] sm:text-[3rem] lg:text-[3.5rem]
         leading-[1.50]
         font-extrabold
         text-[#0A2540]
         tracking-tight
         max-w-6xl
         mx-auto
       ">
         Building the OS for Physical Operations
       </h1>

        <p className="reveal reveal-delay-1 text-lg text-slate-500 max-w-2xl mx-auto">
          We're on a mission to bring the same level of software intelligence that powers digital businesses to the companies that build and maintain the physical world
        </p>
      </section>

      {/* STORY */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-green-600 font-semibold mb-4">
              Our Journey
            </p>

            <h2 className="text-4xl font-bold text-[#0A2540] mb-6">
              Born from the Chaos of Real Operations
            </h2>

            <p className="text-slate-500 mb-4">
PashxD was born when our founders experienced firsthand the painful fragmentation of managing large-scale physical operations. Procurement in spreadsheets, execution in disconnected tools, and decisions based on outdated data.            </p>

            <p className="text-slate-500">
              Today, we are building a unified platform powered by AI to bring clarity, control, and scalability to enterprise operations.
            </p>
          </div>

          {/* RIGHT TIMELINE */}
          <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
            {milestones.map((m, i) => (
              <div key={m.year} className="flex gap-4 mb-6 last:mb-0">

                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-green-600 rounded-full" />
                  {i < milestones.length - 1 && (
                    <div className="w-[1px] h-full bg-green-200 mt-1" />
                  )}
                </div>

                <div>
                  <div className="text-sm font-bold text-green-600">
                    {m.year}
                  </div>
                  <div className="text-sm text-slate-500">
                    {m.event}
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* VALUES */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">

          <p className="text-xs tracking-[0.2em] uppercase text-green-600 font-semibold mb-4">
            Our Values
          </p>

          <h2 className="text-4xl font-bold text-[#0A2540]">
            What Drives Us
          </h2>

        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto px-6">
          {values.map((v) => (
            <div
              key={v.title}
              className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm hover:shadow-md transition"
            >
              <div className="w-12 h-12 bg-green-50 border border-green-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <v.icon className="w-6 h-6 text-green-600" />
              </div>

              <h3 className="text-lg font-semibold text-[#0A2540] mb-2">
                {v.title}
              </h3>

              <p className="text-sm text-slate-500">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FOUNDER */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center mb-16">

          <p className="text-xs tracking-[0.2em] uppercase text-green-600 font-semibold mb-4">
            Founder
          </p>

          <h2 className="text-4xl font-bold text-[#0A2540]">
            Meet the Founder
          </h2>

        </div>

        <div className="flex justify-center">
          {team.map((t) => (
            <div
              key={t.name}
              className="bg-white border border-slate-200 rounded-2xl p-8 shadow-md text-center max-w-sm"
            >

              <img
                src={t.image}
                alt={t.name}
                className="w-28 h-28 rounded-full object-cover mx-auto mb-4 border-4 border-green-100"
              />

              <h3 className="text-xl font-semibold text-[#0A2540]">
                {t.name}
              </h3>

              <p className="text-green-600 text-sm mb-3">
                {t.role}
              </p>

              <p className="text-sm text-slate-500 leading-relaxed">
                {t.desc}
              </p>

            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">

          <div className="bg-gradient-to-r from-[#2F7A57] to-[#3F8F6A] rounded-3xl p-12 shadow-xl">

            <h2 className="text-3xl font-bold text-white mb-4">
              Join Us in Transforming Operations
            </h2>

            <p className="text-green-100 mb-8">
              Let’s build the future of physical operations together.
            </p>

            <a
              href="https://calendly.com/shahil-talenlio-letstalk/letstalk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-green-700 px-8 py-4 rounded-full font-semibold hover:scale-[1.03] transition"
            >
              Get in Touch <ArrowRight className="w-4 h-4" />
            </a>

          </div>

        </div>
      </section>

    </div>
  );
}