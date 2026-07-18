import SEOHead from "../components/SEOHead";
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

const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://pashx.com/#organization",
      "name": "PashxD",
      "url": "https://pashx.com",
      "logo": "https://pashx.com/favicon-512x512.png",
      "description": "PashxD is an AI-native Industrial Operating System unifying procurement, operations, CRM, ERP, finance, and execution into one intelligent platform for companies that operate in the physical world -- manufacturing, construction, industrial equipment, retail, energy, trading, and logistics.",
      "sameAs": [
        "https://www.linkedin.com/company/pashx-ai",
        "https://www.instagram.com/pashx.ai",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://pashx.com/#website",
      "url": "https://pashx.com",
      "name": "PashxD",
      "publisher": { "@id": "https://pashx.com/#organization" },
    },
  ],
};

export default function Landing() {
  return (
    <div className="bg-white w-full overflow-x-hidden">
      <SEOHead
        title="PashxD -- AI-Powered Industrial OS for Real World Operations"
        description="Streamline industrial workflows, reduce operational costs, and optimize processes with PashxD's AI-powered platform. Built for real-world operations teams."
        path="/"
        jsonLd={ORG_JSON_LD}
      />

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