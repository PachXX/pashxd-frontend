import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  Truck,
  Clock,
  Star,
  Shield,
  Zap,
  ArrowRight,
  Package,
  Factory,
  Store,
  MapPin,
  CreditCard,
  BarChart3,
  ChevronRight,
  Timer,
  Globe,
  BadgeCheck,
} from "lucide-react";

/* ────────────────────────────────────────
   DATA
   ──────────────────────────────────────── */

const CATEGORIES = [
  { name: "Cement & Concrete", count: "2,400+", icon: "▣" },
  { name: "Steel & Metals", count: "3,100+", icon: "◈" },
  { name: "Electrical", count: "5,600+", icon: "⚡" },
  { name: "Plumbing & Pipes", count: "1,800+", icon: "◎" },
  { name: "Wood & Timber", count: "1,200+", icon: "▤" },
  { name: "Tiles & Flooring", count: "2,900+", icon: "▦" },
  { name: "Paints & Coatings", count: "1,500+", icon: "◉" },
  { name: "Safety & Tools", count: "4,200+", icon: "⛨" },
];

const PRODUCTS = [
  { name: "OPC 53 Grade Cement", brand: "UltraTech", price: "€6.20", unit: "/bag", rating: 4.8, reviews: 342, delivery: "48 hrs", tag: "Bestseller", img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=400&fit=crop" },
  { name: "TMT Steel Rebar 12mm", brand: "Tata Steel", price: "€48.50", unit: "/bundle", rating: 4.9, reviews: 218, delivery: "48 hrs", tag: "Top Rated", img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&h=400&fit=crop" },
  { name: "PVC Conduit Pipe 25mm", brand: "Finolex", price: "€3.40", unit: "/meter", rating: 4.6, reviews: 189, delivery: "48 hrs", tag: "Fast Delivery", img: "https://images.unsplash.com/photo-1635424710928-0544e8512eae?w=400&h=400&fit=crop" },
  { name: "Vitrified Floor Tiles", brand: "Kajaria", price: "€12.80", unit: "/sqm", rating: 4.7, reviews: 156, delivery: "24 hrs", tag: "New Arrival", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=400&fit=crop" },
  { name: "Exterior Emulsion Paint", brand: "Asian Paints", price: "€85.00", unit: "/drum", rating: 4.8, reviews: 124, delivery: "24 hrs", tag: "Popular", img: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=400&fit=crop" },
  { name: "Plywood Sheet 18mm", brand: "Century Ply", price: "€42.00", unit: "/sheet", rating: 4.5, reviews: 98, delivery: "48 hrs", tag: "Quality", img: "https://images.unsplash.com/photo-1614964237818-ded9b5d48173?w=400&h=400&fit=crop" },
  { name: "Brass Gate Valve 25mm", brand: "Jaquar", price: "€18.50", unit: "/piece", rating: 4.7, reviews: 87, delivery: "24 hrs", tag: "Certified", img: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=400&fit=crop" },
  { name: "LED Tube Light 20W", brand: "Philips", price: "€8.90", unit: "/piece", rating: 4.9, reviews: 203, delivery: "24 hrs", tag: "Bestseller", img: "https://images.unsplash.com/photo-1550985616-10810253b84d?w=400&h=400&fit=crop" },
  { name: "Safety Helmet Hard Hat", brand: "3M", price: "€15.20", unit: "/piece", rating: 4.6, reviews: 145, delivery: "48 hrs", tag: "Safety First", img: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=400&h=400&fit=crop" },
];

const SELLER_TYPES = [
  { icon: Factory, title: "Manufacturers", desc: "Sell directly from your factory at wholesale prices. Cut out middlemen and access project buyers across Europe.", count: "10+", badge: "Direct Pricing" },
  { icon: Store, title: "Distributors", desc: "Expand beyond your city. List your warehouse inventory and let PashxD handle logistics, payments, and buyer acquisition.", count: "12+", badge: "Wider Reach" },
  { icon: Package, title: "Specialty Vendors", desc: "Imported fixtures, niche chemicals, specialty components — the long-tail catalog that big distributors don't carry.", count: "3+", badge: "Unique Catalog" },
];

const HOW_STEPS = [
  { num: "01", title: "Search or scan BOQ", desc: "Find materials by name, spec, or upload your BOQ to auto-populate a smart cart.", icon: Search },
  { num: "02", title: "Compare & choose", desc: "AI ranks vendors by price, distance, rating, and delivery speed.", icon: BarChart3 },
  { num: "03", title: "Buy or RFQ", desc: "Standard items: instant checkout. Custom specs or bulk: send RFQ.", icon: ShoppingCart },
  { num: "04", title: "Track to site", desc: "Real-time GPS tracking, photo proof at delivery, digital GRN.", icon: Truck },
  { num: "05", title: "Pay on terms", desc: "Net 30/60/90 credit lines. Escrow protection. Auto-matched invoices.", icon: CreditCard },
];

const STATS = [
  { value: "25+", label: "Verified Vendors" },
  { value: "1,000+", label: "Products Listed" },
  { value: "48 hrs", label: "Avg. Delivery" },
  { value: "99.2%", label: "Order Accuracy" },
];

const COUNTRIES = ["UAE", "Saudi Arabia", "India", "Qatar", "Oman", "Germany", "Poland", "Netherlands", "France", "Italy"];

/* ────────────────────────────────────────
   REVEAL COMPONENT
   ──────────────────────────────────────── */

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          obs.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: "translateY(28px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ────────────────────────────────────────
   MARKETPLACE PAGE
   ──────────────────────────────────────── */

export default function MarketplacePage() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeSellerTab, setActiveSellerTab] = useState(0);

  return (
    <div className="bg-white text-[#0A2540] overflow-x-hidden">

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-12 sm:pb-16 md:pb-20 bg-gradient-to-br from-green-50 via-white to-emerald-50">
        {/* Animated gradient background */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-100 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-100 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto">
              {/* Live badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-200 bg-green-50 mb-6 sm:mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-green-700 text-xs font-semibold tracking-widest uppercase">
                  Marketplace is Live
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.08] mb-4 sm:mb-6">
                The Fastest Way to Buy{" "}
                <span className="text-[#15803D]">Building Materials</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10">
                25+ verified vendors and growing. 1,000+ products. AI-powered pricing.
                Delivery to your site within 48 hours. Built into PashxD.
              </p>
            </div>
          </Reveal>

          {/* Search Box */}
          <Reveal delay={150}>
            <div className="max-w-xl mx-auto mb-10 sm:mb-14">
              <div className={`flex items-center gap-2 sm:gap-3 bg-white border-2 rounded-xl sm:rounded-2xl px-3 sm:px-5 py-1.5 sm:py-2 shadow-lg shadow-black/5 transition-all duration-300 ${searchFocused ? "border-[#15803D] shadow-green-600/10" : "border-slate-200"}`}>
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search cement, steel, tiles, pipes..."
                  className="flex-1 border-none outline-none text-sm sm:text-base text-[#0A2540] bg-transparent py-2 sm:py-3 placeholder:text-slate-400"
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
                <button className="bg-[#15803D] hover:bg-[#166534] text-white text-xs sm:text-sm font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl flex items-center gap-1.5 transition-all duration-200 flex-shrink-0">
                  Search
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 hidden sm:block" />
                </button>
              </div>
            </div>
          </Reveal>

          {/* Stats */}
          <Reveal delay={300}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
              {STATS.map((s) => (
                <div key={s.label} className="text-center py-4 sm:py-6">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#15803D] leading-none">{s.value}</div>
                  <div className="text-xs sm:text-sm text-slate-500 mt-1 sm:mt-2">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ CATEGORIES ═══════════════ */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#15803D] mb-2 sm:mb-3">Browse categories</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 sm:mb-3">Every Material Your Site Needs</h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 mb-8 sm:mb-10 max-w-lg">From structural steel to finishing paint — search by spec, grade, brand, or certification.</p>
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
            {CATEGORIES.map((c, i) => (
              <Reveal key={c.name} delay={i * 50}>
                <div className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 bg-white border border-slate-200 rounded-xl cursor-pointer transition-all duration-250 hover:border-[#15803D] hover:shadow-md hover:-translate-y-0.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-green-50 rounded-lg flex items-center justify-center text-base sm:text-lg flex-shrink-0">{c.icon}</div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-semibold text-[#0A2540] truncate">{c.name}</div>
                    <div className="text-[10px] sm:text-xs text-slate-500">{c.count} products</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FEATURED PRODUCTS ═══════════════ */}
      <section className="py-12 sm:py-16 md:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6 sm:mb-8">
              <div>
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#15803D] mb-2 sm:mb-3">Trending now</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">Top Products This Week</h2>
              </div>
              <a href="#" className="flex items-center gap-1 text-[#15803D] font-semibold text-sm hover:gap-2 transition-all">
                View all products <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </Reveal>

          {/* Horizontal scroll on mobile, grid on larger */}
          <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 sm:pb-0 snap-x snap-mandatory sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 sm:overflow-visible">
            {PRODUCTS.map((p, i) => (
              <Reveal key={p.name} delay={i * 60}>
                <div className="min-w-[200px] sm:min-w-0 snap-start bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-[#15803D] cursor-pointer">
                  <div className="relative h-36 sm:h-44 bg-slate-100 overflow-hidden">
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
                    <span className="absolute top-2 left-2 bg-[#15803D] text-white text-[10px] sm:text-xs font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md">{p.tag}</span>
                  </div>
                  <div className="p-3 sm:p-4">
                    <div className="text-[10px] sm:text-xs text-slate-500 font-medium">{p.brand}</div>
                    <div className="text-xs sm:text-sm font-bold text-[#0A2540] mt-0.5 mb-1.5 sm:mb-2 line-clamp-1">{p.name}</div>
                    <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {p.rating}
                      </span>
                      <span>({p.reviews})</span>
                    </div>
                    <div className="flex items-baseline justify-between mt-2.5 sm:mt-3 pt-2.5 sm:pt-3 border-t border-slate-100">
                      <div>
                        <span className="text-lg sm:text-xl font-extrabold text-[#0A2540]">{p.price}</span>
                        <span className="text-xs text-slate-500">{p.unit}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] sm:text-xs text-[#15803D] font-semibold">
                        <Clock className="w-3 h-3" />
                        {p.delivery}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ COUNTRIES STRIP ═══════════════ */}
      <section className="py-4 sm:py-5 bg-green-50 border-y border-slate-200 overflow-hidden">
        <div className="flex items-center gap-3 px-4 sm:px-6 mb-2">
          <Globe className="w-4 h-4 text-[#15803D] flex-shrink-0" />
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-[#15803D]">Available in these countries</span>
        </div>
        <div className="overflow-hidden">
          <div className="flex animate-marquee-scroll w-max">
            {[...COUNTRIES, ...COUNTRIES].map((c, i) => (
              <span key={i} className="flex items-center gap-2 px-4 sm:px-6 text-xs sm:text-sm font-semibold text-slate-600 whitespace-nowrap">
                <span className="w-1.5 h-1.5 bg-[#15803D] rounded-full" />
                {c}
              </span>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes marquee-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee-scroll {
            animation: marquee-scroll 25s linear infinite;
          }
          .animate-marquee-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-[#0B0F14] text-white relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#15803D]/8 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-green-400 mb-2 sm:mb-3">How it works</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-2 sm:mb-3">Search to Site in 5 Steps</h2>
            <p className="text-sm sm:text-base text-slate-400 mb-8 sm:mb-12 max-w-lg">From finding materials to receiving them at your construction site — everything in one flow.</p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            {HOW_STEPS.map((s, i) => (
              <Reveal key={s.num} delay={i * 80}>
                <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-5 sm:p-6 transition-all duration-300 hover:bg-white/[0.07] hover:border-green-500/20 hover:-translate-y-1">
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#15803D]/20 leading-none mb-3 sm:mb-4">{s.num}</div>
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#15803D]/15 flex items-center justify-center mb-3 sm:mb-4">
                    <s.icon className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                  </div>
                  <div className="text-sm sm:text-base font-bold text-white mb-1.5 sm:mb-2">{s.title}</div>
                  <div className="text-xs sm:text-sm text-slate-400 leading-relaxed">{s.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FROM SOURCING TO DELIVERY ═══════════════ */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <Reveal>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg mb-5 sm:mb-6">
                  <Timer className="w-3.5 h-3.5 text-amber-700" />
                  <span className="text-[10px] sm:text-xs font-bold text-amber-700 uppercase tracking-wider">Delivered within 48 hours</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 sm:mb-5 leading-tight">
                  From Sourcing to{" "}
                  <span className="text-[#15803D]">Delivery</span>
                </h2>

                <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed mb-6 sm:mb-8">
                  PashxD connects you to verified vendors across Europe and delivers materials
                  directly to your site. Browse, compare, order, and track — all in one place,
                  with delivery guaranteed within 48 hours.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {[
                    { icon: Zap, text: "48-hour delivery guarantee" },
                    { icon: MapPin, text: "Available in 10 countries" },
                    { icon: Package, text: "1,000+ products in catalog" },
                    { icon: Truck, text: "End-to-end shipment tracking" },
                  ].map((f) => (
                    <div key={f.text} className="flex items-start gap-2.5 sm:gap-3">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <f.icon className="w-4 h-4 text-[#15803D]" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-[#0A2540] leading-snug pt-1.5">{f.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Right — Dashboard Card */}
            <Reveal delay={200}>
              <div className="bg-[#0B0F14] rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-white/5 shadow-2xl">
                {/* Window dots */}
                <div className="flex items-center gap-2 mb-4 sm:mb-5">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  </div>
                  <span className="text-[10px] sm:text-xs text-slate-600 ml-2">Order Fulfillment — Live View</span>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
                  {[
                    { l: "Items in Stock", v: "842", c: "text-green-400" },
                    { l: "Orders Today", v: "127", c: "text-green-400" },
                    { l: "Avg Dispatch", v: "14 min", c: "text-yellow-400" },
                    { l: "Active Drivers", v: "18", c: "text-green-400" },
                  ].map((k) => (
                    <div key={k.l} className="bg-white/[0.04] rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/5">
                      <div className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-wider">{k.l}</div>
                      <div className={`text-lg sm:text-2xl font-bold ${k.c} mt-1 font-mono`}>{k.v}</div>
                    </div>
                  ))}
                </div>

                {/* Live dispatches */}
                <div className="bg-white/[0.04] rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/5">
                  <div className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-wider mb-2 sm:mb-3">Live dispatches</div>
                  {[
                    { id: "ORD-4821", item: "OPC Cement × 50", status: "En Route", time: "12 min ago", color: "text-green-400" },
                    { id: "ORD-4820", item: "TMT Rebar × 20", status: "Picked", time: "8 min ago", color: "text-yellow-400" },
                    { id: "ORD-4819", item: "PVC Pipes × 100", status: "Delivered", time: "23 min ago", color: "text-slate-500" },
                  ].map((o) => (
                    <div key={o.id} className="grid grid-cols-4 py-1.5 sm:py-2 border-b border-white/[0.04] last:border-0 text-[10px] sm:text-xs items-center">
                      <span className="text-green-400 font-mono">{o.id}</span>
                      <span className="text-slate-400 col-span-1 truncate">{o.item}</span>
                      <span className={`${o.color} font-semibold`}>{o.status}</span>
                      <span className="text-slate-600 text-right">{o.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════ SELLERS ═══════════════ */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#15803D] mb-2 sm:mb-3">Sell on PashxD</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 sm:mb-3">Your Store. Your Prices. Our Reach.</h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 mb-8 sm:mb-12 max-w-lg">Whether you manufacture, distribute, or import — PashxD gives you a digital storefront with active buyers.</p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {SELLER_TYPES.map((s, i) => (
              <Reveal key={s.title} delay={i * 100}>
                <div
                  className={`bg-white border rounded-xl p-5 sm:p-6 md:p-8 transition-all duration-300 cursor-pointer relative overflow-hidden ${
                    activeSellerTab === i
                      ? "border-[#15803D] shadow-lg shadow-green-600/5"
                      : "border-slate-200 hover:border-[#15803D]/50 hover:shadow-md"
                  }`}
                  onMouseEnter={() => setActiveSellerTab(i)}
                >
                  {/* Active indicator */}
                  <div className={`absolute top-0 left-0 w-1 transition-all duration-300 ${activeSellerTab === i ? "h-full bg-[#15803D]" : "h-0"}`} />

                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-green-50 border border-green-200 flex items-center justify-center flex-shrink-0">
                      <s.icon className="w-5 h-5 text-[#15803D]" />
                    </div>
                    <div>
                      <div className="text-base sm:text-lg font-bold">{s.title}</div>
                      <div className="text-[10px] sm:text-xs text-[#15803D] font-semibold">{s.count} on platform</div>
                    </div>
                  </div>

                  <span className="inline-block text-[10px] sm:text-xs font-semibold px-2.5 py-1 bg-green-50 text-[#15803D] rounded-md mb-2 sm:mb-3">{s.badge}</span>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ TRUST ═══════════════ */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-8 sm:mb-12">
              <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-[#15803D] mx-auto mb-3" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2">Built on Trust</h2>
              <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-md mx-auto">Every vendor verified. Every transaction protected. Every delivery guaranteed.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { icon: BadgeCheck, title: "KYB Verified Vendors", desc: "Trade license, GST, factory audits" },
              { icon: Shield, title: "Escrow Protection", desc: "Payment released after delivery" },
              { icon: Star, title: "Ratings & Reviews", desc: "Transparent vendor scoring" },
              { icon: Globe, title: "Compliance Ready", desc: "IS, DIN, EN, ASTM certifications" },
            ].map((t, i) => (
              <Reveal key={t.title} delay={i * 80}>
                <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 transition-all duration-200 hover:border-[#15803D] hover:shadow-md">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-green-50 flex items-center justify-center mb-3">
                    <t.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#15803D]" />
                  </div>
                  <div className="text-sm sm:text-base font-bold mb-1">{t.title}</div>
                  <div className="text-xs sm:text-sm text-slate-500">{t.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="pb-12 sm:pb-16 md:pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="bg-gradient-to-br from-[#15803D] via-[#166534] to-[#14532d] rounded-xl sm:rounded-2xl px-6 sm:px-10 md:px-16 py-12 sm:py-16 md:py-20 text-center relative overflow-hidden">
              {/* Decorative glows */}
              <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/5 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute -bottom-24 -right-16 w-80 h-80 bg-white/5 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-3 sm:mb-4">
                  Start Buying. Start Selling.
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-green-200 mb-8 sm:mb-10 max-w-md mx-auto">
                  Join 25+ verified vendors and growing project teams already using PashxD Marketplace.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-white text-[#166534] px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base shadow-lg shadow-black/15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    Sign Up as Buyer
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-transparent border-2 border-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base transition-all duration-300 hover:border-white/60 hover:-translate-y-0.5"
                  >
                    Register as Vendor
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}