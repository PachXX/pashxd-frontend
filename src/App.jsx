import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { createElement, lazy, Suspense, useEffect } from "react";
import { logPageView } from "./analytics/googleAnalytics";

const pageModules = import.meta.glob('./pages/*.jsx');
const browserPages = Object.fromEntries(Object.entries(pageModules).map(([path, load]) => [path.split('/').pop().replace('.jsx', ''), lazy(load)]));

// Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import NotFoundPage from "./pages/NotFoundPage";
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
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
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
    <div className="min-h-screen bg-white text-brand-navy flex flex-col">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-100 focus:bg-white focus:p-3">Skip to content</a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="grow">{children}</main>
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

   ScrollToTop runs inside each page boundary after its lazy content resolves.
   CookieConsentBanner remains in the browser entry. */
export function AppRoutes({ pages = browserPages }) {
  const { Landing, PlatformPage, ProductPage, PricingPage, IndustriesPage, AboutPage, ResourcesPage, ContactPage, BookDemoPage, MarketplacePage, Terms, Privacy, BlogPostPage } = pages;
  const page = (PageComponent) => <Suspense fallback={<div role="status" className="min-h-[60vh] pt-40 text-center">Loading page…</div>}>{createElement(PageComponent)}<ScrollToTop /></Suspense>;
  return (
    <Routes>

        {/* Public pages WITH layout */}
        <Route path="/" element={<Layout>{page(Landing)}</Layout>} />
        {/* The Industrial OS narrative that used to occupy the homepage. */}
        <Route path="/platform" element={<Layout>{page(PlatformPage)}</Layout>} />
        <Route path="/product" element={<Layout>{page(ProductPage)}</Layout>} />
        <Route path="/pricing" element={<Layout>{page(PricingPage)}</Layout>} />
        <Route path="/industries" element={<Layout>{page(IndustriesPage)}</Layout>} />
        <Route path="/about" element={<Layout>{page(AboutPage)}</Layout>} />
        <Route path="/blog" element={<Layout>{page(ResourcesPage)}</Layout>} />
        <Route path="/resources" element={<Layout>{page(ResourcesPage)}</Layout>} />
        <Route path="/contact" element={<Layout>{page(ContactPage)}</Layout>} />
        <Route path="/marketplace" element={<Layout>{page(MarketplacePage)}</Layout>} />
        <Route path="/book-demo" element={<Layout>{page(BookDemoPage)}</Layout>} />
        <Route path="/terms" element={<Layout>{page(Terms)}</Layout>} />
        <Route path="/privacy" element={<Layout>{page(Privacy)}</Layout>} />
        {/* Blog posts render inside the same Layout so their static HTML
            carries the site-wide nav and footer links (crawlers follow them)
            instead of being an orphan article page. */}
        <Route path="/blog/:slug" element={<Layout>{page(BlogPostPage)}</Layout>} />
        {/* Auth pages WITHOUT layout */}
        <Route path="/login" element={<AdminRedirect />} />
        <Route path="/admin/login" element={<AdminRedirect />} />

        {/* Admin */}
        <Route path="/admin/leads" element={<AdminRedirect path="/contacts" />} />

        <Route path="*" element={<Layout><NotFoundPage /></Layout>} />
      </Routes>
  );
}

function AdminRedirect({ path = '/login' }) {
  const destination = `${import.meta.env.PROD ? 'https://admin.pashx.com' : 'http://localhost:5174'}${path}`;
  useEffect(() => { window.location.replace(destination); }, [destination]);
  return <main className="p-12"><p>Opening Pashx Dashboard… <a href={destination} className="underline">Continue to the dashboard</a></p></main>;
}

/* ================= APP (browser entry) ================= */
export default function App() {
  return (
    <BrowserRouter>
      <CookieConsentBanner />
      <AppRoutes />
    </BrowserRouter>
  );
}
