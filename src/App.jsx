import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

// Pages
import Landing from "./pages/Landing";
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

/* ================= SCROLL TO TOP ================= */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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

/* ================= APP ================= */
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>

        {/* Public pages WITH layout */}
        <Route path="/" element={<Layout><Landing /></Layout>} />
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
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        {/* Auth pages WITHOUT layout */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/login" element={<LoginPage />} />

        {/* Admin */}
        <Route path="/admin/leads" element={<AdminLeadsPage />} />

      </Routes>
    </BrowserRouter>
  );
}