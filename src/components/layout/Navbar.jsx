import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import logo from "../../assets/logos/pashxd-logo.png";

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navItems = [
    { name: "Product", path: "/product" },
    { name: "Pricing", path: "/pricing" },
    { name: "Industries", path: "/industries" },
    { name: "Resources", path: "/resources" },
    { name: "About", path: "/about" },
    { name: "Marketplace", path: "/marketplace"  }
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
            ${scrolled ? "h-[72px] md:h-[88px]" : "h-[80px] md:h-[140px]"}
          `}
        >

          {/* LOGO */}
          <Link to="/" className="flex items-center z-10">
            <img
              src={logo}
              alt="PashxD"
              className={`
                object-contain transition-all duration-300
                ${scrolled ? "h-10 md:h-14" : "h-12 md:h-28"}
              `}
            />
          </Link>

          {/* CENTER NAV — DESKTOP ONLY */}
          <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8 lg:gap-12 text-[15px] font-medium text-slate-500">

            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link key={item.name} to={item.path} className="relative group">
                  <span
                    className={`
                      transition-all duration-200
                      ${
                        isActive
                          ? "text-[#0A2540]"
                          : "hover:text-[#0A2540]"
                      }
                    `}
                  >
                    {item.name}
                  </span>

                  {/* Underline animation */}
                  <span
                    className={`
                      absolute left-0 -bottom-1 h-[2px] bg-[#15803D]
                      transition-all duration-300
                      ${
                        isActive
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }
                    `}
                  />
                </Link>
              );
            })}

          </nav>

          {/* RIGHT — Login + Book a Demo + Hamburger */}
          <div className="flex items-center gap-2 md:gap-3 z-10">

            {/* LOGIN — desktop only */}
            <Link
              to="/login"
              className={`
                hidden md:inline-block
                text-slate-600 hover:text-[#0A2540]
                font-medium transition-all duration-300
                ${scrolled ? "text-sm" : "text-sm"}
              `}
            >
              Log in
            </Link>

            {/* BOOK A DEMO — hidden on very small screens */}
            <Link
              to="/book-demo"
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
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg text-[#0A2540] hover:bg-slate-100 transition"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

          </div>

        </div>
      </header>

      {/* ===== MOBILE NAV DRAWER ===== */}

      {/* Backdrop */}
      <div
        className={`
          md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm
          transition-opacity duration-300
          ${mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setMobileOpen(false)}
      />

      {/* Drawer */}
      <aside
        className={`
          md:hidden fixed top-0 right-0 bottom-0 z-40 w-[80%] max-w-[340px]
          bg-white shadow-2xl
          flex flex-col
          transition-transform duration-300 ease-out
          ${mobileOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >

        {/* Drawer header spacer */}
        <div className="h-[80px] border-b border-slate-100 flex items-center px-6">
          <img src={logo} alt="PashxD" className="h-10 object-contain" />
        </div>

        {/* Nav links */}
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

        {/* Drawer footer — Login + CTA */}
        <div className="p-6 border-t border-slate-100 space-y-3">

          <Link
            to="/login"
            onClick={() => setMobileOpen(false)}
            className="block w-full text-center border border-slate-200 hover:bg-slate-50 text-[#0A2540] rounded-full font-semibold py-3 text-sm transition"
          >
            Log in
          </Link>

          <Link
            to="/book-demo"
            onClick={() => setMobileOpen(false)}
            className="block w-full text-center bg-[#15803D] hover:bg-[#166534] text-white rounded-full font-semibold py-3.5 text-sm shadow-md shadow-green-600/20 transition"
          >
            Book a Demo
          </Link>

          <p className="text-[11px] text-slate-400 text-center pt-2">
            © {new Date().getFullYear()} PashxD
          </p>
        </div>

      </aside>
    </>
  );
}