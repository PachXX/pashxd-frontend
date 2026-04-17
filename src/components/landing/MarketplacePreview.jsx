import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "../layout/Container";
import {
  ArrowRight,
  Package,
  Truck,
  ShieldCheck,
  Zap,
  Search,
  CreditCard,
  BarChart3,
  Factory,
  BadgeCheck,
} from "lucide-react";

/* ────────────────────────────────────────
   Animated counter hook
   ──────────────────────────────────────── */
function CountUp({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const step = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function MarketplacePreview() {
  const categories = [
    "Cement & Concrete",
    "Steel & Metals",
    "Electrical",
    "Plumbing",
    "Wood & Timber",
    "Tiles & Flooring",
    "Paints",
    "Safety & Tools",
  ];

  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-32 overflow-hidden bg-[#0A2540]">
      {/* ── Background Effects ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Green glow top-right */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#15803D]/10 rounded-full blur-[120px]" />
        {/* Green glow bottom-left */}
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-[#15803D]/8 rounded-full blur-[100px]" />
      </div>

      <Container className="relative z-10">
        {/* ══════════════ TOP SECTION ══════════════ */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-20 items-center mb-12 sm:mb-16 md:mb-24">
          {/* Left — Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/20 bg-green-500/10 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-green-400 text-xs font-semibold tracking-widest uppercase">
                Marketplace is Live
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[3.4rem] font-bold text-white leading-[1.15] sm:leading-[1.1] lg:leading-[1.08] mb-4 sm:mb-6">
              Source, Compare &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
                Buy Materials
              </span>{" "}
              — All in One Place
            </h2>

            {/* Description */}
            <p className="text-slate-400 text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8 max-w-lg">
              PashxD Marketplace connects you with verified vendors across
              10 countries. Compare prices, check quality certifications,
              order instantly — and track delivery to your site within 48 hours.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-10">
              <Link
                to="/marketplace"
                className="group inline-flex items-center justify-center gap-2 bg-[#15803D] hover:bg-[#166534] text-white px-6 sm:px-7 py-3.5 sm:py-4 rounded-full font-semibold transition-all duration-300 hover:-translate-y-[2px] shadow-lg shadow-green-900/30 text-sm sm:text-base"
              >
                Explore Marketplace
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 border border-white/15 hover:border-white/30 text-white/90 hover:text-white px-6 sm:px-7 py-3.5 sm:py-4 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base"
              >
                Become a Vendor
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>KYB Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>Escrow Protected</span>
              </div>
              <div className="flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>Quality Certified</span>
              </div>
            </div>
          </div>

          {/* Right — Dashboard Preview Card */}
          <div className="mt-8 lg:mt-0">
            <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 backdrop-blur-sm">
              {/* Mini search bar */}
              <div className="flex items-center gap-2 sm:gap-3 bg-white/[0.06] border border-white/[0.08] rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 mb-4 sm:mb-6">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500 flex-shrink-0" />
                <span className="text-slate-500 text-xs sm:text-sm truncate">
                  Search cement, steel, tiles...
                </span>
                <div className="ml-auto px-2.5 sm:px-3 py-1 bg-[#15803D] text-white text-[10px] sm:text-xs font-semibold rounded-md sm:rounded-lg flex-shrink-0">
                  Search
                </div>
              </div>

              {/* Category pills */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                {categories.map((cat, i) => (
                  <span
                    key={cat}
                    className={`text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border transition-all duration-200 ${
                      i === 0
                        ? "bg-green-500/15 border-green-500/30 text-green-400"
                        : "bg-white/[0.04] border-white/[0.08] text-slate-400 hover:border-white/20"
                    }`}
                  >
                    {cat}
                  </span>
                ))}
              </div>

              {/* Product preview cards */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
                {[
                  {
                    name: "OPC 53 Cement",
                    brand: "UltraTech",
                    price: "€6.20/bag",
                    rating: "4.8",
                    tag: "Bestseller",
                  },
                  {
                    name: "TMT Rebar 12mm",
                    brand: "Tata Steel",
                    price: "€48.50/bundle",
                    rating: "4.9",
                    tag: "Top Rated",
                  },
                  {
                    name: "LED Light 20W",
                    brand: "Philips",
                    price: "€8.90/piece",
                    rating: "4.9",
                    tag: "Popular",
                  },
                  {
                    name: "Safety Helmet",
                    brand: "3M",
                    price: "€15.20/piece",
                    rating: "4.6",
                    tag: "Safety",
                  },
                ].map((p) => (
                  <div
                    key={p.name}
                    className="bg-white/[0.04] border border-white/[0.06] rounded-lg sm:rounded-xl p-2.5 sm:p-3 hover:border-green-500/20 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                      <span className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 bg-green-500/15 text-green-400 rounded font-medium">
                        {p.tag}
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-yellow-400">
                        ★ {p.rating}
                      </span>
                    </div>
                    <div className="text-white text-xs sm:text-sm font-semibold mb-0.5 line-clamp-1">
                      {p.name}
                    </div>
                    <div className="text-slate-500 text-[10px] sm:text-xs mb-1.5 sm:mb-2">{p.brand}</div>
                    <div className="text-green-400 text-xs sm:text-sm font-bold">
                      {p.price}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom stats bar */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <div className="bg-white/[0.04] rounded-md sm:rounded-lg p-2 sm:p-3 text-center border border-white/[0.05]">
                  <div className="text-green-400 text-base sm:text-lg font-bold">
                    <CountUp target={25} suffix="+" />
                  </div>
                  <div className="text-slate-500 text-[9px] sm:text-[10px] uppercase tracking-wider">
                    Vendors
                  </div>
                </div>
                <div className="bg-white/[0.04] rounded-md sm:rounded-lg p-2 sm:p-3 text-center border border-white/[0.05]">
                  <div className="text-green-400 text-base sm:text-lg font-bold">
                    <CountUp target={1000} suffix="+" />
                  </div>
                  <div className="text-slate-500 text-[9px] sm:text-[10px] uppercase tracking-wider">
                    Products
                  </div>
                </div>
                <div className="bg-white/[0.04] rounded-md sm:rounded-lg p-2 sm:p-3 text-center border border-white/[0.05]">
                  <div className="text-green-400 text-base sm:text-lg font-bold">48h</div>
                  <div className="text-slate-500 text-[9px] sm:text-[10px] uppercase tracking-wider">
                    Delivery
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════ BOTTOM — VALUE PROPS ══════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {[
            {
              icon: Search,
              title: "Smart Search",
              desc: "Find by name, spec, grade, or upload your BOQ to auto-match products",
              color: "text-blue-400",
              bg: "bg-blue-500/10",
              border: "border-blue-500/15",
            },
            {
              icon: BarChart3,
              title: "AI Price Comparison",
              desc: "Transparent pricing across vendors — ranked by cost, quality & distance",
              color: "text-emerald-400",
              bg: "bg-emerald-500/10",
              border: "border-emerald-500/15",
            },
            {
              icon: Truck,
              title: "48h Delivery",
              desc: "From order to site in 48 hours across 10 countries with live tracking",
              color: "text-amber-400",
              bg: "bg-amber-500/10",
              border: "border-amber-500/15",
            },
            {
              icon: CreditCard,
              title: "Flexible Payment",
              desc: "Net 30/60/90 credit lines, escrow protection, and auto-matched invoices",
              color: "text-purple-400",
              bg: "bg-purple-500/10",
              border: "border-purple-500/15",
            },
          ].map((item) => (
            <div
              key={item.title}
              className={`group bg-white/[0.03] ${item.border} border rounded-xl p-5 sm:p-6 hover:bg-white/[0.06] transition-all duration-300`}
            >
              <div
                className={`w-10 h-10 sm:w-11 sm:h-11 ${item.bg} rounded-xl flex items-center justify-center mb-3 sm:mb-4`}
              >
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <h3 className="text-white font-semibold text-sm sm:text-base mb-1.5 sm:mb-2">
                {item.title}
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* ══════════════ VENDOR / BUYER CTA STRIP ══════════════ */}
        <div className="mt-12 sm:mt-16 md:mt-20 grid md:grid-cols-2 gap-3 sm:gap-4">
          {/* Buyer Card */}
          <div className="group relative bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/15 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:border-green-500/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-green-500/15 rounded-xl flex items-center justify-center flex-shrink-0">
                <Package className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
              </div>
              <h3 className="text-white font-bold text-base sm:text-lg">For Buyers</h3>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
              Stop wasting days on phone calls and quote cycles. Browse verified
              products, compare prices instantly, and order with delivery
              guaranteed to your site.
            </p>
            <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
              {[
                "Instant pricing — no more waiting for quotes",
                "AI-matched materials to your project BOQ",
                "Full delivery tracking to your site",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-xs sm:text-sm text-slate-400"
                >
                  <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              to="/marketplace"
              className="inline-flex items-center gap-2 text-green-400 font-semibold text-xs sm:text-sm group-hover:gap-3 transition-all duration-300"
            >
              Sign Up as Buyer
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Link>
          </div>

          {/* Vendor Card */}
          <div className="group relative bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/15 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:border-blue-500/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-500/15 rounded-xl flex items-center justify-center flex-shrink-0">
                <Factory className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
              </div>
              <h3 className="text-white font-bold text-base sm:text-lg">
                For Vendors & Suppliers
              </h3>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
              Get a digital storefront and reach thousands of project buyers
              across Europe, Middle East & India. PashxD handles logistics,
              payments, and buyer acquisition.
            </p>
            <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
              {[
                "List products and start selling in minutes",
                "Access buyers across 10 countries",
                "Automated payments and analytics dashboard",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-xs sm:text-sm text-slate-400"
                >
                  <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-blue-400 font-semibold text-xs sm:text-sm group-hover:gap-3 transition-all duration-300"
            >
              Register as Vendor
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Link>
          </div>
        </div>

        {/* ══════════════ COUNTRIES STRIP ══════════════ */}
        <div className="mt-8 sm:mt-12 flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-3">
          <span className="text-slate-600 text-[10px] sm:text-xs uppercase tracking-widest font-semibold">
            Available in
          </span>
          {[
            "UAE",
            "Saudi Arabia",
            "India",
            "Qatar",
            "Oman",
            "Germany",
            "Poland",
            "Netherlands",
            "France",
            "Italy",
          ].map((country) => (
            <span
              key={country}
              className="flex items-center gap-1 sm:gap-1.5 text-slate-400 text-xs sm:text-sm"
            >
              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-green-500 rounded-full flex-shrink-0" />
              {country}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}