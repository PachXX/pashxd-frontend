import HeroSection from "../components/landing/HeroSection.jsx";
import TrustStrip from "../components/landing/TrustStrip.jsx";
import ProblemSection from "../components/landing/ProblemSection.jsx";
import SolutionSection from "../components/landing/SolutionSection.jsx";
import CoreFeatures from "../components/landing/CoreFeatures.jsx";
import HowItWorks from "../components/landing/HowItWorks.jsx";
import ROICalculator from "../components/landing/ROICalculator.jsx";
import IndustriesPreview from "../components/landing/IndustriesPreview.jsx";
import IntegrationsSection from "../components/landing/IntegrationsSection.jsx";
import MarketplacePreview from "../components/landing/MarketplacePreview.jsx";
import SocialProof from "../components/landing/SocialProof.jsx";
import CTASection from "../components/landing/CTASection.jsx";

export default function Landing() {
  return (
    <div className="bg-white w-full overflow-x-hidden">

      {/* HERO */}
      <HeroSection />

      {/* TRUST STRIP */}
      <TrustStrip />

      {/* PROBLEM */}
      <ProblemSection />

      {/* SOLUTION */}
      <SolutionSection />

      {/* MARKETPLACE PREVIEW */}
      <MarketplacePreview />

      {/* CORE FEATURES */}
      <CoreFeatures />

      {/* HOW IT WORKS */}
      <HowItWorks />

      {/* ROI CALCULATOR */}
      <ROICalculator />

      {/* INDUSTRIES PREVIEW */}
      <IndustriesPreview />

      {/* INTEGRATIONS */}
      <IntegrationsSection />

      {/* SOCIAL PROOF */}
      <SocialProof />

      {/* CTA */}
      <CTASection />

    </div>
  );
}