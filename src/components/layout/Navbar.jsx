import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

import BrandMark from "../BrandMark";
import { trackCtaClick } from "../../analytics/events";

export default function Navbar() {
  const location = useLocation();
  const menuButton = useRef(null);
  const drawer = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Determine admin URL based on environment
  const ADMIN_URL = import.meta.env.MODE === 'production'
    ? 'https://admin.pashx.com'
    : 'http://localhost:5174';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [menuPath, setMenuPath] = useState(location.pathname);
  if (menuPath !== location.pathname) {
    setMenuPath(location.pathname);
    setMobileOpen(false);
  }

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia('(min-width: 1280px)');
    const closeOnDesktop = () => { if (desktop.matches) setMobileOpen(false); };
    const onKey = (event) => {
      if (event.key === 'Escape') { setMobileOpen(false); menuButton.current?.focus(); }
      if (event.key === 'Tab') {
        const links = drawer.current?.querySelectorAll('a[href]');
        if (!links?.length) return;
        if (event.shiftKey && document.activeElement === links[0]) { event.preventDefault(); menuButton.current?.focus(); }
        else if (!event.shiftKey && document.activeElement === links[links.length - 1]) { event.preventDefault(); menuButton.current?.focus(); }
        else if (document.activeElement === menuButton.current) { event.preventDefault(); links[event.shiftKey ? links.length - 1 : 0].focus(); }
      }
    };
    desktop.addEventListener('change', closeOnDesktop);
    document.addEventListener('keydown', onKey);
    drawer.current?.querySelector('a[href]')?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener('change', closeOnDesktop);
      document.removeEventListener('keydown', onKey);
    };
  }, [mobileOpen]);

  // "Platform" leads the list because it is where the Industrial OS story went
  // when the homepage narrowed to Autopilot — without it that narrative has no
  // entry point in the navigation at all.
  const navItems = [
    { name: "Platform", path: "/platform" },
    { name: "Product", path: "/product" },
    { name: "Pricing", path: "/pricing" },
    { name: "Industries", path: "/industries" },
    { name: "Blog", path: "/resources" },
    { name: "About", path: "/about" },
    { name: "Marketplace", path: "/marketplace" }
  ];

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 w-full z-50
          transition-all duration-300
          ${
            scrolled
              ? "bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm"
              : "bg-white/70 backdrop-blur border-b border-slate-100"
          }
        `}
      >
        <div
          className={`
            max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
            flex items-center justify-between relative
            transition-all duration-300
            ${scrolled ? "h-[68px] md:h-[76px]" : "h-[76px] md:h-[96px]"}
          `}
        >
          {/* LOGO */}
          <Link to="/" aria-label="Pashx Dashboard home" className="flex items-center gap-2 z-10">
            <BrandMark />
            <span className="text-2xl font-semibold tracking-tight text-brand-navy">PxD</span>
          </Link>

          {/* CENTER NAV — DESKTOP ONLY */}
          {/* gap tightened when "Platform" made this a seven-item row — at the
              old gap-8/gap-12 the centred nav collided with the logo and the
              CTA between the md and lg breakpoints. */}
          <nav className="absolute left-1/2 -translate-x-1/2 hidden xl:flex items-center gap-5 lg:gap-8 text-[14px] lg:text-[15px] font-medium text-slate-500">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link key={item.name} to={item.path} className="relative group">
                  <span
                    className={`
                      transition-all duration-200
                      ${isActive ? "text-[#0A2540]" : "hover:text-[#0A2540]"}
                    `}
                  >
                    {item.name}
                  </span>
                  <span
                    className={`
                      absolute left-0 -bottom-1 h-[2px] bg-[#15803D]
                      transition-all duration-300
                      ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                    `}
                  />
                </Link>
              );
            })}
          </nav>

          {/* RIGHT — Login + Book a Demo + Hamburger */}
          <div className="flex items-center gap-2 md:gap-3 z-10">
            {/* LOGIN — desktop only */}
            <a
              href={ADMIN_URL}
              className="hidden xl:inline-block text-slate-600 hover:text-[#0A2540] font-medium transition-all duration-300 text-sm"
            >
              Log in
            </a>

            {/* BOOK A DEMO */}
            <Link
              to="/book-demo"
              onClick={() => trackCtaClick("navbar", "Book a Demo", "/book-demo")}
              className={`
                hidden sm:inline-block
                bg-[#15803D] hover:bg-[#166534]
                text-white rounded-full font-semibold
                transition-all duration-300 shadow-md
                hover:shadow-green-600/20 hover:-translate-y-[1px]
                ${scrolled ? "px-4 py-2 text-xs md:px-6 md:py-2.5 md:text-sm" : "px-5 py-2.5 text-xs md:px-7 md:py-3 md:text-sm"}
              `}
            >
              Book a Demo
            </Link>

            {/* HAMBURGER — MOBILE ONLY */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden w-10 h-10 flex items-center justify-center rounded-lg text-[#0A2540] hover:bg-slate-100 transition"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              ref={menuButton}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE NAV DRAWER */}
      <div
        className={`
          xl:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm
          transition-opacity duration-300
          ${mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setMobileOpen(false)}
      />

      <aside
        id="mobile-navigation"
        ref={drawer}
        aria-label="Mobile navigation"
        className={`
          xl:hidden fixed top-0 right-0 bottom-0 z-40 w-[80%] max-w-[340px]
          bg-white shadow-2xl
          flex flex-col
          transition-transform duration-300 ease-out
          ${mobileOpen ? "translate-x-0 visible" : "translate-x-full invisible"}
        `}
      >
        <div className="h-[80px] border-b border-slate-100 flex items-center px-6">
          <BrandMark className="h-10 w-10" /><span className="ml-3 text-xl font-semibold text-brand-navy">PxD</span>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 py-8">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`
                      block px-4 py-3 rounded-xl text-base font-semibold transition
                      ${
                        isActive
                          ? "bg-green-50 text-[#15803D] border border-green-100"
                          : "text-[#0A2540] hover:bg-slate-50"
                      }
                    `}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-6 border-t border-slate-100 space-y-3">
          <a
            href={ADMIN_URL}
            className="block w-full text-center text-slate-600 hover:text-[#0A2540] font-medium py-2 transition-all duration-300 text-sm"
          >
            Log in
          </a>

          <Link
            to="/book-demo"
            onClick={() => {
              trackCtaClick("mobile_drawer", "Book a Demo", "/book-demo");
              setMobileOpen(false);
            }}
            className="block w-full text-center bg-[#15803D] hover:bg-[#166534] text-white rounded-full font-semibold py-3.5 text-sm shadow-md shadow-green-600/20 transition"
          >
            Book a Demo
          </Link>

          <p className="text-[11px] text-slate-400 text-center pt-2">
            © {new Date().getFullYear()} Pashx Dashboard
          </p>
        </div>
      </aside>
    </>
  );
}
