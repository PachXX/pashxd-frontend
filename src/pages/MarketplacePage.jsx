import { useState, useEffect, useRef } from "react";
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
  CheckCircle2,
  ChevronRight,
  Timer,
  Warehouse,
  Globe,
  BadgeCheck,
  Layers,
  TrendingUp,
} from "lucide-react";

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
  { name: "OPC 53 Grade Cement", brand: "UltraTech", price: "€6.20", unit: "/bag", rating: 4.8, reviews: 342, delivery: "48 hrs", tag: "Bestseller", img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=200&h=200&fit=crop" },
  { name: "TMT Steel Rebar 12mm", brand: "Tata Steel", price: "€48.50", unit: "/bundle", rating: 4.9, reviews: 218, delivery: "48 hrs", tag: "Top Rated", img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=200&h=200&fit=crop" },
  { name: "PVC Conduit Pipe 25mm", brand: "Finolex", price: "€3.40", unit: "/meter", rating: 4.6, reviews: 189, delivery: "48 hrs", tag: "Fast Delivery", img: "https://images.unsplash.com/photo-1635424710928-0544e8512eae?w=200&h=200&fit=crop" },
  { name: "Vitrified Floor Tiles 600x600", brand: "Kajaria", price: "€12.80", unit: "/sqm", rating: 4.7, reviews: 156, delivery: "24 hrs", tag: "New Arrival", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200&h=200&fit=crop" },
  { name: "Exterior Emulsion Paint 20L", brand: "Asian Paints", price: "€85.00", unit: "/drum", rating: 4.8, reviews: 124, delivery: "24 hrs", tag: "Popular", img: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=200&h=200&fit=crop" },
  { name: "Plywood Sheet 18mm", brand: "Century Ply", price: "€42.00", unit: "/sheet", rating: 4.5, reviews: 98, delivery: "48 hrs", tag: "Quality", img: "https://images.unsplash.com/photo-1614964237818-ded9b5d48173?w=200&h=200&fit=crop" },
  { name: "Brass Gate Valve 25mm", brand: "Jaquar", price: "€18.50", unit: "/piece", rating: 4.7, reviews: 87, delivery: "24 hrs", tag: "Certified", img: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=200&h=200&fit=crop" },
  { name: "LED Tube Light 20W", brand: "Philips", price: "€8.90", unit: "/piece", rating: 4.9, reviews: 203, delivery: "24 hrs", tag: "Bestseller", img: "https://images.unsplash.com/photo-1550985616-10810253b84d?w=200&h=200&fit=crop" },
  { name: "Safety Helmet Hard Hat", brand: "3M", price: "€15.20", unit: "/piece", rating: 4.6, reviews: 145, delivery: "48 hrs", tag: "Safety First", img: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=200&h=200&fit=crop" },
];

const SELLER_TYPES = [
  { icon: Factory, title: "Manufacturers", desc: "Sell directly from your factory at wholesale prices. Cut out middlemen and access project buyers across Europe.", count: "10+", badge: "Direct Pricing" },
  { icon: Store, title: "Distributors", desc: "Expand beyond your city. List your warehouse inventory and let PashxD handle logistics, payments, and buyer acquisition.", count: "12+", badge: "Wider Reach" },
  { icon: Package, title: "Specialty Vendors", desc: "Imported fixtures, niche chemicals, specialty components — the long-tail catalog that big distributors don't carry.", count: "3+", badge: "Unique Catalog" },
];

const HOW_STEPS = [
  { num: "01", title: "Search or scan BOQ", desc: "Find materials by name, spec, or upload your BOQ to auto-populate a smart cart with matched products.", icon: Search },
  { num: "02", title: "Compare & choose", desc: "AI ranks vendors by price, distance, rating, and delivery speed. Not just cheapest — best fit for your project.", icon: BarChart3 },
  { num: "03", title: "Buy or RFQ", desc: "Standard items: instant checkout. Custom specs or bulk: send RFQ and get competing quotes in minutes.", icon: ShoppingCart },
  { num: "04", title: "Track to site", desc: "Real-time GPS tracking, photo proof at delivery, digital GRN. Everything syncs to your PashxD project.", icon: Truck },
  { num: "05", title: "Pay on terms", desc: "Net 30/60/90 credit lines. Escrow protection. Auto-matched invoices. Budget updated in real-time.", icon: CreditCard },
];

const STATS = [
  { value: "25+", label: "Verified vendors & growing" },
  { value: "1,000+", label: "Products listed" },
  { value: "48 hrs", label: "Avg. delivery" },
  { value: "99.2%", label: "Order accuracy" },
];

const AVAILABLE_COUNTRIES = ["UAE", "Saudi Arabia", "India", "Qatar", "Oman", "Germany", "Poland", "Netherlands", "France", "Italy"];

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("revealed"); obs.unobserve(el); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal-block ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function MarketplacePage() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeSellerTab, setActiveSellerTab] = useState(0);

  return (
    <div className="marketplace-landing">
      <style>{`
        .marketplace-landing {
          --green: #15803D;
          --green-dark: #166534;
          --green-light: #dcfce7;
          --green-50: #f0fdf4;
          --navy: #0A2540;
          --slate: #64748b;
          font-family: 'Cabinet Grotesk', system-ui, sans-serif;
          color: #0A2540;
          overflow-x: hidden;
        }

        .reveal-block {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .reveal-block.revealed {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .hero-gradient {
          background: linear-gradient(135deg, #f0fdf4 0%, #ffffff 40%, #ecfdf5 70%, #f0fdf4 100%);
          background-size: 200% 200%;
          animation: gradient-shift 12s ease infinite;
        }

        .search-box {
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 16px;
          padding: 6px 6px 6px 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: all 0.3s;
          box-shadow: 0 4px 24px rgba(0,0,0,0.04);
        }
        .search-box.focused {
          border-color: var(--green);
          box-shadow: 0 4px 32px rgba(21,128,61,0.12);
        }
        .search-box input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 16px;
          font-family: inherit;
          color: var(--navy);
          background: transparent;
        }
        .search-box input::placeholder { color: #94a3b8; }
        .search-btn {
          background: var(--green);
          color: white;
          border: none;
          border-radius: 12px;
          padding: 14px 28px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
          font-family: inherit;
        }
        .search-btn:hover { background: var(--green-dark); transform: translateY(-1px); }

        .cat-pill {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 20px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.25s;
          text-decoration: none;
        }
        .cat-pill:hover {
          border-color: var(--green);
          box-shadow: 0 4px 16px rgba(21,128,61,0.08);
          transform: translateY(-2px);
        }
        .cat-pill .cat-icon { font-size: 20px; width: 36px; height: 36px; background: var(--green-50); border-radius: 10px; display: flex; align-items: center; justify-content: center; }
        .cat-pill .cat-name { font-size: 14px; font-weight: 600; color: var(--navy); }
        .cat-pill .cat-count { font-size: 12px; color: var(--slate); }

        .product-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.3s;
          cursor: pointer;
        }
        .product-card:hover {
          box-shadow: 0 12px 40px rgba(0,0,0,0.08);
          transform: translateY(-4px);
          border-color: var(--green);
        }
        .product-card .p-img {
          height: 180px;
          background: #f8fafc;
          position: relative;
          overflow: hidden;
        }
        .product-card .p-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
        .product-card:hover .p-img img { transform: scale(1.06); }
        .product-card .p-tag {
          position: absolute;
          top: 12px;
          left: 12px;
          background: var(--green);
          color: white;
          font-size: 11px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 6px;
          letter-spacing: 0.02em;
        }
        .product-card .p-body { padding: 16px; }
        .product-card .p-brand { font-size: 12px; color: var(--slate); font-weight: 500; }
        .product-card .p-name { font-size: 15px; font-weight: 700; color: var(--navy); margin: 4px 0 8px; line-height: 1.3; }
        .product-card .p-meta { display: flex; align-items: center; gap: 12px; font-size: 12px; color: var(--slate); }
        .product-card .p-price-row { display: flex; align-items: baseline; justify-content: space-between; margin-top: 12px; padding-top: 12px; border-top: 1px solid #f1f5f9; }
        .product-card .p-price { font-size: 22px; font-weight: 800; color: var(--navy); }
        .product-card .p-unit { font-size: 13px; color: var(--slate); font-weight: 400; }
        .product-card .p-delivery { display: flex; align-items: center; gap: 4px; font-size: 12px; color: var(--green); font-weight: 600; }

        .dark-section {
          background: #0B0F14;
          color: white;
          position: relative;
          overflow: hidden;
        }
        .dark-section::before {
          content: '';
          position: absolute;
          top: -200px;
          right: -200px;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(21,128,61,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .step-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 28px;
          position: relative;
          transition: all 0.3s;
        }
        .step-card:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(21,128,61,0.3);
          transform: translateY(-3px);
        }
        .step-card .step-num {
          font-size: 48px;
          font-weight: 800;
          color: rgba(21,128,61,0.2);
          line-height: 1;
          margin-bottom: 16px;
        }
        .step-card .step-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(21,128,61,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }
        .step-card .step-title { font-size: 17px; font-weight: 700; margin-bottom: 8px; }
        .step-card .step-desc { font-size: 14px; color: #94a3b8; line-height: 1.6; }

        .seller-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 32px;
          transition: all 0.3s;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .seller-card.active {
          border-color: var(--green);
          box-shadow: 0 8px 32px rgba(21,128,61,0.1);
        }
        .seller-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 0;
          background: var(--green);
          border-radius: 0 2px 2px 0;
          transition: height 0.3s;
        }
        .seller-card.active::after { height: 100%; }

        .dark-store-strip {
          display: flex;
          gap: 0;
          animation: marquee 20s linear infinite;
          width: max-content;
        }
        .dark-store-strip .ds-city {
          padding: 0 32px;
          font-size: 14px;
          font-weight: 600;
          color: var(--slate);
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .dark-store-strip .ds-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); }

        .trust-badge {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          transition: all 0.2s;
        }
        .trust-badge:hover { border-color: var(--green); }

        .stat-block {
          text-align: center;
          padding: 24px;
        }
        .stat-block .stat-val {
          font-size: 36px;
          font-weight: 800;
          color: var(--green);
          line-height: 1;
        }
        .stat-block .stat-lbl {
          font-size: 14px;
          color: var(--slate);
          margin-top: 8px;
        }

        .cta-section {
          background: linear-gradient(135deg, var(--green) 0%, #166534 50%, #14532d 100%);
          border-radius: 24px;
          padding: 80px 48px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .cta-section::before {
          content: '';
          position: absolute;
          top: -100px;
          left: -100px;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 60%);
          pointer-events: none;
        }
        .cta-section::after {
          content: '';
          position: absolute;
          bottom: -120px;
          right: -80px;
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 60%);
          pointer-events: none;
        }

        .live-pulse {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          position: relative;
        }
        .live-pulse .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--green);
          position: relative;
        }
        .live-pulse .dot::after {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 2px solid var(--green);
          animation: pulse-ring 2s ease-out infinite;
        }

        .section-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }

        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
          .products-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .categories-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .sellers-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .trust-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="hero-gradient" style={{ paddingTop: "140px", paddingBottom: "80px", position: "relative" }}>
        <div className="section-container">
          <Reveal>
            <div style={{ textAlign: "center", maxWidth: 800, margin: "0 auto" }}>
              <div className="live-pulse" style={{ marginBottom: 20 }}>
                <span className="dot" />
                <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--green)" }}>
                  Marketplace is live
                </span>
              </div>

              <h1 style={{ fontSize: "clamp(36px, 5.5vw, 64px)", fontWeight: 800, lineHeight: 1.05, marginBottom: 24, color: "var(--navy)" }}>
                The Fastest Way to Buy{" "}
                <span style={{ color: "var(--green)" }}>Building Materials</span>
              </h1>

              <p style={{ fontSize: 19, color: "var(--slate)", lineHeight: 1.7, maxWidth: 600, margin: "0 auto 36px" }}>
                25+ verified vendors and growing. 1,000+ products. AI-powered pricing. Delivery to your site within 48 hours. Built into PashxD.
              </p>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div style={{ maxWidth: 640, margin: "0 auto 48px" }}>
              <div className={`search-box ${searchFocused ? "focused" : ""}`}>
                <Search style={{ width: 20, height: 20, color: "#94a3b8", flexShrink: 0 }} />
                <input
                  type="text"
                  placeholder="Search cement, steel, tiles, pipes..."
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
                <button className="search-btn">
                  Search <ArrowRight style={{ width: 16, height: 16 }} />
                </button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, maxWidth: 900, margin: "0 auto" }} className="stats-grid">
              {STATS.map((s) => (
                <div key={s.label} className="stat-block">
                  <div className="stat-val">{s.value}</div>
                  <div className="stat-lbl">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ CATEGORIES ═══════════════ */}
      <section style={{ padding: "80px 0", background: "white" }}>
        <div className="section-container">
          <Reveal>
            <p style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--green)", marginBottom: 12 }}>Browse categories</p>
            <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 12 }}>Every Material Your Site Needs</h2>
            <p style={{ fontSize: 17, color: "var(--slate)", marginBottom: 40, maxWidth: 520 }}>From structural steel to finishing paint — search by spec, grade, brand, or certification.</p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }} className="categories-grid">
            {CATEGORIES.map((c, i) => (
              <Reveal key={c.name} delay={i * 60}>
                <div className="cat-pill">
                  <div className="cat-icon">{c.icon}</div>
                  <div>
                    <div className="cat-name">{c.name}</div>
                    <div className="cat-count">{c.count} products</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FEATURED PRODUCTS ═══════════════ */}
      <section style={{ padding: "80px 0", background: "#f8fafc" }}>
        <div className="section-container">
          <Reveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--green)", marginBottom: 12 }}>Trending now</p>
                <h2 style={{ fontSize: 36, fontWeight: 800 }}>Top Products This Week</h2>
              </div>
              <a href="#" style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--green)", fontWeight: 600, fontSize: 15, textDecoration: "none" }}>
                View all products <ChevronRight style={{ width: 18, height: 18 }} />
              </a>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="products-grid">
            {PRODUCTS.map((p, i) => (
              <Reveal key={p.name} delay={i * 80}>
                <div className="product-card">
                  <div className="p-img">
                    <img src={p.img} alt={p.name} />
                    <div className="p-tag">{p.tag}</div>
                  </div>
                  <div className="p-body">
                    <div className="p-brand">{p.brand}</div>
                    <div className="p-name">{p.name}</div>
                    <div className="p-meta">
                      <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                        <Star style={{ width: 13, height: 13, fill: "#f59e0b", color: "#f59e0b" }} />
                        {p.rating}
                      </span>
                      <span>({p.reviews})</span>
                    </div>
                    <div className="p-price-row">
                      <div>
                        <span className="p-price">{p.price}</span>
                        <span className="p-unit">{p.unit}</span>
                      </div>
                      <div className="p-delivery">
                        <Clock style={{ width: 13, height: 13 }} />
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

      {/* ═══════════════ DARK STORE STRIP ═══════════════ */}
      <section style={{ padding: "24px 0", background: "var(--green-50)", overflow: "hidden", borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "0 24px", marginBottom: 8 }}>
          <Globe style={{ width: 16, height: 16, color: "var(--green)" }} />
          <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--green)" }}>Available in these countries</span>
        </div>
        <div style={{ overflow: "hidden" }}>
          <div className="dark-store-strip">
            {[...AVAILABLE_COUNTRIES, ...AVAILABLE_COUNTRIES].map((c, i) => (
              <span key={i} className="ds-city">
                <span className="ds-dot" />
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <section className="dark-section" style={{ padding: "100px 0" }}>
        <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
          <Reveal>
            <p style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", color: "#4ade80", marginBottom: 12 }}>How it works</p>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: "white", marginBottom: 12 }}>Search to Site in 5 Steps</h2>
            <p style={{ fontSize: 17, color: "#94a3b8", marginBottom: 48, maxWidth: 520 }}>From finding materials to receiving them at your construction site — everything in one flow.</p>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14 }} className="steps-grid">
            {HOW_STEPS.map((s, i) => (
              <Reveal key={s.num} delay={i * 100}>
                <div className="step-card">
                  <div className="step-num">{s.num}</div>
                  <div className="step-icon">
                    <s.icon style={{ width: 20, height: 20, color: "#4ade80" }} />
                  </div>
                  <div className="step-title">{s.title}</div>
                  <div className="step-desc">{s.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ BLINKIT SECTION ═══════════════ */}
      <section style={{ padding: "100px 0", background: "white" }}>
        <div className="section-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="hero-grid">
            <Reveal>
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", background: "#fef3c7", borderRadius: 8, marginBottom: 20 }}>
                  <Timer style={{ width: 14, height: 14, color: "#92400e" }} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#92400e", textTransform: "uppercase", letterSpacing: "0.1em" }}>Delivered within 48 hours</span>
                </div>
                <h2 style={{ fontSize: 40, fontWeight: 800, marginBottom: 16, lineHeight: 1.1 }}>
                  From Sourcing to{" "}
                  <span style={{ color: "var(--green)" }}>Delivery</span>
                </h2>
                <p style={{ fontSize: 17, color: "var(--slate)", lineHeight: 1.7, marginBottom: 32 }}>
                  PashxD connects you to verified vendors across Europe and delivers materials directly to your site. Browse, compare, order, and track — all in one place, with delivery guaranteed within 48 hours.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  {[
                    { icon: Zap, text: "48-hour delivery guarantee" },
                    { icon: MapPin, text: "Available in 10 countries" },
                    { icon: Package, text: "1,000+ products in catalog" },
                    { icon: Truck, text: "End-to-end shipment tracking" },
                  ].map((f) => (
                    <div key={f.text} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--green-50)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <f.icon style={{ width: 16, height: 16, color: "var(--green)" }} />
                      </div>
                      <span style={{ fontSize: 14, color: "var(--navy)", fontWeight: 500, lineHeight: 1.5 }}>{f.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div style={{ background: "#0B0F14", borderRadius: 20, padding: 32, border: "1px solid rgba(255,255,255,0.06)", boxShadow: "0 30px 80px rgba(0,0,0,0.3)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444" }} />
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#eab308" }} />
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e" }} />
                  </div>
                  <span style={{ fontSize: 11, color: "#64748b", marginLeft: 8 }}>Order Fulfillment — Live View</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                  {[
                    { l: "Items in Stock", v: "842", c: "#4ade80" },
                    { l: "Orders Today", v: "127", c: "#4ade80" },
                    { l: "Avg Dispatch", v: "14 min", c: "#facc15" },
                    { l: "Active Drivers", v: "18", c: "#4ade80" },
                  ].map((k) => (
                    <div key={k.l} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 16, border: "1px solid rgba(255,255,255,0.05)" }}>
                      <div style={{ fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em" }}>{k.l}</div>
                      <div style={{ fontSize: 24, fontWeight: 700, color: k.c, marginTop: 4, fontFamily: "monospace" }}>{k.v}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 16, border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Live dispatches</div>
                  {[
                    { id: "ORD-4821", item: "OPC Cement × 50", status: "En Route", time: "12 min ago", color: "#4ade80" },
                    { id: "ORD-4820", item: "TMT Rebar × 20", status: "Picked", time: "8 min ago", color: "#facc15" },
                    { id: "ORD-4819", item: "PVC Pipes × 100", status: "Delivered", time: "23 min ago", color: "#64748b" },
                  ].map((o) => (
                    <div key={o.id} style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr 0.8fr 0.8fr", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)", fontSize: 12, alignItems: "center" }}>
                      <span style={{ color: "#4ade80" }}>{o.id}</span>
                      <span style={{ color: "#94a3b8" }}>{o.item}</span>
                      <span style={{ color: o.color, fontWeight: 600 }}>{o.status}</span>
                      <span style={{ color: "#475569", textAlign: "right" }}>{o.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════ SELLERS ═══════════════ */}
      <section style={{ padding: "100px 0", background: "#f8fafc" }}>
        <div className="section-container">
          <Reveal>
            <p style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--green)", marginBottom: 12 }}>Sell on PashxD</p>
            <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 12 }}>Your Store. Your Prices. Our Reach.</h2>
            <p style={{ fontSize: 17, color: "var(--slate)", marginBottom: 48, maxWidth: 560 }}>Whether you manufacture, distribute, or import — PashxD gives you a digital storefront with thousands of active buyers.</p>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="sellers-grid">
            {SELLER_TYPES.map((s, i) => (
              <Reveal key={s.title} delay={i * 100}>
                <div
                  className={`seller-card ${activeSellerTab === i ? "active" : ""}`}
                  onMouseEnter={() => setActiveSellerTab(i)}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--green-50)", border: "1px solid #bbf7d0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <s.icon style={{ width: 22, height: 22, color: "var(--green)" }} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 18 }}>{s.title}</div>
                      <div style={{ fontSize: 12, color: "var(--green)", fontWeight: 600 }}>{s.count} on platform</div>
                    </div>
                  </div>
                  <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "4px 10px", background: "var(--green-light)", color: "var(--green)", borderRadius: 6, marginBottom: 12 }}>{s.badge}</span>
                  <p style={{ fontSize: 14, color: "var(--slate)", lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ TRUST ═══════════════ */}
      <section style={{ padding: "80px 0", background: "white" }}>
        <div className="section-container">
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <Shield style={{ width: 32, height: 32, color: "var(--green)", margin: "0 auto 12px" }} />
              <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Built on Trust</h2>
              <p style={{ fontSize: 17, color: "var(--slate)", maxWidth: 480, margin: "0 auto" }}>Every vendor verified. Every transaction protected. Every delivery guaranteed.</p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }} className="trust-grid">
            {[
              { icon: BadgeCheck, title: "KYB Verified Vendors", desc: "Trade license, GST, factory audits" },
              { icon: Shield, title: "Escrow Protection", desc: "Payment released after delivery" },
              { icon: Star, title: "Ratings & Reviews", desc: "Transparent vendor scoring" },
              { icon: Globe, title: "Compliance Ready", desc: "IS, DIN, EN, ASTM certifications" },
            ].map((t, i) => (
              <Reveal key={t.title} delay={i * 80}>
                <div className="trust-badge" style={{ flexDirection: "column", alignItems: "flex-start", padding: 20, gap: 0 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--green-50)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                    <t.icon style={{ width: 18, height: 18, color: "var(--green)" }} />
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{t.title}</div>
                  <div style={{ fontSize: 13, color: "var(--slate)" }}>{t.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section style={{ padding: "0 0 100px", background: "white" }}>
        <div className="section-container">
          <Reveal>
            <div className="cta-section">
              <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "white", marginBottom: 16, position: "relative", zIndex: 1 }}>
                Start Buying. Start Selling.
              </h2>
              <p style={{ fontSize: 17, color: "#bbf7d0", marginBottom: 36, maxWidth: 480, margin: "0 auto 36px", position: "relative", zIndex: 1 }}>
                Join 25+ verified vendors and growing project teams already using PashxD Marketplace.
              </p>
              <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", position: "relative", zIndex: 1 }}>
                <a href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "white", color: "var(--green-dark)", padding: "16px 32px", borderRadius: 50, fontWeight: 700, fontSize: 15, textDecoration: "none", transition: "all 0.2s", boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}>
                  Sign Up as Buyer <ArrowRight style={{ width: 16, height: 16 }} />
                </a>
                <a href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "white", padding: "16px 32px", borderRadius: 50, fontWeight: 700, fontSize: 15, textDecoration: "none", border: "2px solid rgba(255,255,255,0.3)", transition: "all 0.2s" }}>
                  Register as Vendor <ArrowRight style={{ width: 16, height: 16 }} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}