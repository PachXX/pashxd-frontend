import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { logPageView } from "./analytics/googleAnalytics";

// Pages
import Landing from "./pages/Landing";
import PlatformPage from "./pages/PlatformPage";
import ProductPage from "./pages/ProductPage";
import PricingPage from "./pages/PricingPage";
import IndustriesPage from "./pages/IndustriesPage";
import AboutPage from "./pages/AboutPage";
import ResourcesPage from "./pages/ResourcesPage";
import ContactPage from "./pages/ContactPage";
import BookDemoPage from "./pages/BookDemoPage";
import LoginPage from "./pages/LoginPage";
import MarketplacePage from "./pages/MarketplacePage";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import AdminLeadsPage from "./pages/AdminLeadsPage";
import BlogPostPage from './pages/BlogPostPage';

// Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import CookieConsentBanner from "./components/CookieConsentBanner";

/* ================= SCROLL TO TOP + GA PAGE VIEW ================= */
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // A cross-page anchor (e.g. /#workflows from /platform) lands here with a
    // hash and a fresh pathname. Unconditionally scrolling to 0 would swallow
    // it — the browser's own hash handling has already been pre-empted by the
    // router — so honour the target when there is one.
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        logPageView(pathname);
        return;
      }
    }
    window.scrollTo(0, 0);
    logPageView(pathname);
  }, [pathname, hash]);

  return null;
}

/* ================= LAYOUT ================= */
function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white text-[#0A2540] flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

/* ================= ROUTES =================
   Everything inside the router, with no router of its own. The browser entry
   wraps this in BrowserRouter (below); the build-time prerenderer wraps the
   same tree in StaticRouter (src/entry-server.jsx). Keeping one route table
   is the point — a route that exists in only one of them is a page that
   either cannot be prerendered or 404s in the browser.

   ScrollToTop and CookieConsentBanner stay in the browser entry: both are
   DOM-only side effects with nothing to contribute to static HTML. */
export function AppRoutes() {
  return (
    <Routes>

        {/* Public pages WITH layout */}
        <Route path="/" element={<Layout><Landing /></Layout>} />
        {/* The Industrial OS narrative that used to occupy the homepage. */}
        <Route path="/platform" element={<Layout><PlatformPage /></Layout>} />
        <Route path="/product" element={<Layout><ProductPage /></Layout>} />
        <Route path="/pricing" element={<Layout><PricingPage /></Layout>} />
        <Route path="/industries" element={<Layout><IndustriesPage /></Layout>} />
        <Route path="/about" element={<Layout><AboutPage /></Layout>} />
        <Route path="/resources" element={<Layout><ResourcesPage /></Layout>} />
        <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
        <Route path="/marketplace" element={<Layout><MarketplacePage /></Layout>} />
        <Route path="/book-demo" element={<Layout><BookDemoPage /></Layout>} />
        <Route path="/terms" element={<Layout><Terms /></Layout>} />
        <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
        {/* Blog posts render inside the same Layout so their static HTML
            carries the site-wide nav and footer links (crawlers follow them)
            instead of being an orphan article page. */}
        <Route path="/blog/:slug" element={<Layout><BlogPostPage /></Layout>} />
        {/* Auth pages WITHOUT layout */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/login" element={<LoginPage />} />

        {/* Admin */}
        <Route path="/admin/leads" element={<AdminLeadsPage />} />

      </Routes>
  );
}

/* ================= APP (browser entry) ================= */
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <CookieConsentBanner />
      <AppRoutes />
    </BrowserRouter>
  );
}