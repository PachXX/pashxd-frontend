import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import logo from "../../assets/logos/pashxd-logo.png";

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Product", path: "/product" },
    { name: "Pricing", path: "/pricing" },
    { name: "Industries", path: "/industries" },
    { name: "Resources", path: "/resources" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];

  return (
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
          max-w-7xl mx-auto px-6
          flex items-center justify-between relative
          transition-all duration-300
          ${scrolled ? "h-[88px]" : "h-[140px]"}
        `}
      >

        {/* LOGO */}
        <Link to="/" className="flex items-center z-10">
          <img
            src={logo}
            alt="PashxD"
            className={`
              object-contain transition-all duration-300
              ${scrolled ? "h-14" : "h-28"}
            `}
          />
        </Link>

        {/* CENTER NAV */}
        <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-12 text-[15px] font-medium text-slate-500">

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

        {/* CTA — FIXED (Calendly) */}
        <div className="z-10">
          <a
            href="https://calendly.com/shahil-talenlio-letstalk/letstalk"
            target="_blank"
            rel="noopener noreferrer"
            className={`
              bg-[#15803D] hover:bg-[#166534]
              text-white rounded-full font-semibold
              transition-all duration-300 shadow-md
              hover:shadow-green-600/20 hover:-translate-y-[1px]
              ${scrolled ? "px-6 py-2.5 text-sm" : "px-8 py-3 text-sm"}
            `}
          >
            Book a Demo
          </a>
        </div>

      </div>
    </header>
  );
}