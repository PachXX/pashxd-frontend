import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import Container from "./Container";

import logo from "../../assets/logos/pashxd-logo2.jpg";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <Container className="py-14 md:py-20">

        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-12">

          {/* LEFT — spans full width on mobile, 4 cols on desktop */}
          <div className="col-span-2 md:col-span-4">

            <Link to="/" className="flex items-center gap-3 mb-5 md:mb-6">
              <img
                src={logo}
                alt="PashxD"
                className="h-9 w-9 md:h-10 md:w-10 rounded-xl object-cover"
              />
              <span className="text-lg md:text-xl font-semibold text-[#0A2540]">
                Pash<span className="text-green-600">xD</span>
              </span>
            </Link>

            <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
              AI-Powered Industrial OS & Construction Management ERP with B2B Marketplace for Procurement.
            </p>

            {/* SOCIAL */}
            <div className="flex gap-3 md:gap-4 mt-6 md:mt-8">

              <a
                href="https://www.linkedin.com/company/pashx-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-green-600 hover:border-green-200 transition"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={15} />
              </a>

              <a
                href="https://www.instagram.com/pashx.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-green-600 hover:border-green-200 transition"
                aria-label="Instagram"
              >
                <FaInstagram size={15} />
              </a>

              <a
                href="mailto:info@pashx.com"
                className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-green-600 hover:border-green-200 transition"
                aria-label="Email"
              >
                <Mail size={15} />
              </a>

            </div>
          </div>

          {/* PRODUCT */}
          <div className="md:col-span-2">
            <h4 className="text-xs tracking-[0.2em] text-green-600 font-semibold mb-4 md:mb-6">
              PRODUCT
            </h4>
            <ul className="space-y-3 md:space-y-4 text-sm text-slate-600">
              <li><Link to="/product#procurement" className="hover:text-green-600 transition">Procurement OS</Link></li>
              <li><Link to="/product#execution" className="hover:text-green-600 transition">Execution Layer</Link></li>
              <li><Link to="/product#ai" className="hover:text-green-600 transition">AI Intelligence</Link></li>
              <li><Link to="/marketplace" className="hover:text-green-600 transition">Marketplace</Link></li>
              <li><Link to="/pricing" className="hover:text-green-600 transition">Pricing</Link></li>
            </ul>
          </div>

          {/* COMPANY */}
          <div className="md:col-span-2">
            <h4 className="text-xs tracking-[0.2em] text-green-600 font-semibold mb-4 md:mb-6">
              COMPANY
            </h4>
            <ul className="space-y-3 md:space-y-4 text-sm text-slate-600">
              <li><Link to="/about" className="hover:text-green-600 transition">About</Link></li>
              <li><Link to="/industries" className="hover:text-green-600 transition">Industries</Link></li>
              <li><Link to="/resources" className="hover:text-green-600 transition">Resources</Link></li>
              <li><Link to="/contact" className="hover:text-green-600 transition">Contact</Link></li>
            </ul>
          </div>

          {/* RESOURCES */}
          <div className="md:col-span-2">
            <h4 className="text-xs tracking-[0.2em] text-green-600 font-semibold mb-4 md:mb-6">
              RESOURCES
            </h4>
            <ul className="space-y-3 md:space-y-4 text-sm text-slate-600">
              <li>Documentation</li>
              <li>Case Studies</li>
              <li>Blog</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="col-span-2 md:col-span-2">
            <h4 className="text-xs tracking-[0.2em] text-green-600 font-semibold mb-4 md:mb-6">
              CONTACT
            </h4>
            <ul className="space-y-3 md:space-y-4 text-sm text-slate-600">
              <li>
                <a href="mailto:info@pashx.com" className="hover:text-green-600 transition">
                  info@pashx.com
                </a>
              </li>
              <li>
                <a href="mailto:shahil@pashx.com" className="hover:text-green-600 transition">
                  shahil@pashx.com
                </a>
              </li>
              <li>
                <a href="tel:+491577802062" className="hover:text-green-600 transition">
                  +49 157 7802062
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="border-t border-slate-200 mt-12 md:mt-16 pt-6 flex flex-col-reverse sm:flex-row justify-between items-start sm:items-center gap-4">

          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} PashxD. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-4 md:gap-6 text-sm text-slate-400">
            <Link to="/privacy" className="hover:text-green-600 transition">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-green-600 transition">Terms of Service</Link>
          </div>

        </div>

      </Container>
    </footer>
  );
}