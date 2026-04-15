import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";

import logo from "../../../assets/logos/pashxd-logo2.jpg";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

          {/* LEFT */}
          <div className="md:col-span-4">

            <Link to="/" className="flex items-center gap-4 mb-6">
              <img
                src={logo}
                alt="PashxD"
                className="h-14 w-14 rounded-2xl object-cover shadow-md"
              />
              <span className="text-2xl font-semibold text-[#0A2540]">
                Pash<span className="text-green-600">xD</span>
              </span>
            </Link>

            <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
              The operating system for building and scaling physical operations —
              procurement, execution, and AI-driven decisions in one platform.
            </p>

            {/* SOCIAL */}
            <div className="flex gap-4 mt-8">

              <a
                href="https://www.linkedin.com/company/pashx-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-green-600 hover:border-green-200 transition"
              >
                <FaLinkedinIn size={16} />
              </a>

              <a
                href="https://www.instagram.com/pashx.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-green-600 hover:border-green-200 transition"
              >
                <FaInstagram size={16} />
              </a>

              <a
                href="mailto:info@pashx.com"
                className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-green-600 hover:border-green-200 transition"
              >
                <Mail size={16} />
              </a>

            </div>
          </div>

          {/* PRODUCT */}
          <div className="md:col-span-2">
            <h4 className="text-xs tracking-[0.2em] text-green-600 font-semibold mb-6">
              PRODUCT
            </h4>
            <ul className="space-y-4 text-sm text-slate-600">
              <li><Link to="/product#procurement">Procurement OS</Link></li>
              <li><Link to="/product#execution">Execution Layer</Link></li>
              <li><Link to="/product#ai">AI Intelligence</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
            </ul>
          </div>

          {/* COMPANY */}
          <div className="md:col-span-2">
            <h4 className="text-xs tracking-[0.2em] text-green-600 font-semibold mb-6">
              COMPANY
            </h4>
            <ul className="space-y-4 text-sm text-slate-600">
              <li><Link to="/about">About</Link></li>
              <li><Link to="/industries">Industries</Link></li>
              <li><Link to="/resources">Resources</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* RESOURCES */}
          <div className="md:col-span-2">
            <h4 className="text-xs tracking-[0.2em] text-green-600 font-semibold mb-6">
              RESOURCES
            </h4>
            <ul className="space-y-4 text-sm text-slate-600">
              <li>Documentation</li>
              <li>Case Studies</li>
              <li>Blog</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="md:col-span-2">
            <h4 className="text-xs tracking-[0.2em] text-green-600 font-semibold mb-6">
              CONTACT
            </h4>
            <ul className="space-y-4 text-sm text-slate-600">
              <li>info@pashx.com</li>
              <li>shahil@pashx.com</li>
              <li>+49 157 7802062</li>
            </ul>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="border-t border-slate-200 mt-16 pt-6 flex justify-between items-center">

          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} PashxD
          </p>

          <div className="flex gap-6 text-sm text-slate-400">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>

        </div>

      </div>
    </footer>
  );
}