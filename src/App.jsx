import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

// Pages
import Landing from "./pages/Landing";
import ProductPage from "./pages/ProductPage";
import PricingPage from "./pages/PricingPage";
import IndustriesPage from "./pages/IndustriesPage";
import AboutPage from "./pages/AboutPage";
import ResourcesPage from "./pages/ResourcesPage"; // ✅ ADD THIS
import ContactPage from "./pages/ContactPage";

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

/* ================= APP ================= */
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <div className="min-h-screen bg-white text-[#0A2540] flex flex-col">

        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>

            {/* Landing */}
            <Route path="/" element={<Landing />} />

            {/* Core Pages */}
            <Route path="/product" element={<ProductPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/industries" element={<IndustriesPage />} />
            <Route path="/about" element={<AboutPage />} />

            {/* ✅ NEW: Resources */}
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/contact" element={<ContactPage />} />

          </Routes>
        </main>

        {/* Footer */}
        <Footer />

      </div>
    </BrowserRouter>
  );
}