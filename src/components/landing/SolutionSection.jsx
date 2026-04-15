export default function SolutionSection() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">

        {/* LEFT */}
        <div>

          <p className="text-xs tracking-[0.2em] uppercase text-green-700 mb-6 font-semibold">
            The Solution
          </p>

          <h2 className="text-[2.8rem] sm:text-[3.2rem] font-bold text-[#0A2540] leading-[1.15] mb-6">
            One Workspace for Procurement,
            <br />
            Projects, and Decisions
          </h2>

          <p className="text-slate-500 text-lg leading-relaxed mb-8 max-w-xl">
            PashxD brings your entire operational workflow into a single intelligent platform.
            From placing an order to tracking site progress to getting AI-powered cost predictions —
            everything lives in one place.
          </p>

          <div className="space-y-4 text-slate-600 text-[15px]">
            {[
              "Unified procurement & execution",
              "Real-time cost tracking",
              "AI-powered decision making",
              "Vendor collaboration hub",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border border-green-500 flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full" />
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>

        </div>

        {/* RIGHT */}
        <div className="flex justify-center">

          <div className="bg-white border border-slate-200 rounded-2xl p-6 w-[420px] shadow-lg space-y-4">

            <div className="flex items-center gap-5 p-4 rounded-xl bg-slate-50">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center text-sm font-bold text-green-600 bg-green-50">
                01
              </div>
              <div>
                <h4 className="font-semibold text-[#0A2540]">Procurement OS</h4>
                <p className="text-sm text-slate-500">Manage orders, suppliers, deliveries</p>
              </div>
            </div>

            <div className="flex items-center gap-5 p-4 rounded-xl bg-slate-50">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center text-sm font-bold text-blue-600 bg-blue-50">
                02
              </div>
              <div>
                <h4 className="font-semibold text-[#0A2540]">Execution Layer</h4>
                <p className="text-sm text-slate-500">Track projects, tasks, site progress</p>
              </div>
            </div>

            <div className="flex items-center gap-5 p-4 rounded-xl bg-slate-50">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center text-sm font-bold text-orange-500 bg-orange-50">
                03
              </div>
              <div>
                <h4 className="font-semibold text-[#0A2540]">AI Intelligence</h4>
                <p className="text-sm text-slate-500">Predict delays, optimize costs</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}