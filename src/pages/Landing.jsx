import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/landing/HeroSection.jsx";
import TrustStrip from "../components/landing/TrustStrip.jsx";
import ProblemSection from "../components/landing/ProblemSection.jsx";
import SolutionSection from "../components/landing/SolutionSection.jsx";
import CoreFeatures from "../components/landing/CoreFeatures";
import HowItWorks from "../components/landing/HowItWorks.jsx";
import ROICalculator from "../components/landing/ROICalculator.jsx";
import IndustriesPreview from "../components/landing/IndustriesPreview.jsx";
import IntegrationsSection from "../components/landing/IntegrationsSection.jsx";
import SocialProof from "../components/landing/SocialProof.jsx";
import CTASection from "../components/landing/CTASection.jsx";
import Footer from "../components/layout/Footer.jsx";
export default function Landing() {
  return (
    <div className="bg-white w-full overflow-x-hidden">

      {/* NAVBAR (fixed on top) */}
      <Navbar />

      {/* HERO */}
      <HeroSection />

      {/* TRUST STRIP */}
      <div className="mt-10">
        <TrustStrip />
      </div>

      {/* PROBLEM */}
      <section className="mt-20 border-t border-slate-100">
        <ProblemSection />
      </section>

      {/* SOLUTION */}
      <section className="mt-24">
        <SolutionSection />
      </section>

     {/* 🔥 CORE FEATURES (NEW PREMIUM SECTION) */}
            <section className="border-t border-slate-100">
              <CoreFeatures />
            </section>

             {/* HOW IT WORKS */}
                  <HowItWorks />
              {/* ROI CALCULATOR */}
                    <ROICalculator />

                    <IndustriesPreview />

                    <IntegrationsSection />

                       <SocialProof />
                       <CTASection />

    </div>
  );
}