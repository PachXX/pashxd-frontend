import SEOHead from "../components/SEOHead";
import HeroSection from "../components/landing/HeroSection.jsx";
import TrustStrip from "../components/landing/TrustStrip.jsx";
import ProblemSection from "../components/landing/ProblemSection.jsx";
import AutopilotFlow from "../components/landing/AutopilotFlow.jsx";
import ExceptionCockpit from "../components/landing/ExceptionCockpit.jsx";
import WorkflowsSection from "../components/landing/WorkflowsSection.jsx";
import IntegrationsSection from "../components/landing/IntegrationsSection.jsx";
import ROICalculator from "../components/landing/ROICalculator.jsx";
import SecuritySection from "../components/landing/SecuritySection.jsx";
import IndustriesPreview from "../components/landing/IndustriesPreview.jsx";
import ProofSection from "../components/landing/ProofSection.jsx";
import FAQSection from "../components/landing/FAQSection.jsx";
import CTASection from "../components/landing/CTASection.jsx";

/**
 * Homepage.
 *
 * Reordered around one workflow claim instead of a platform category. The page
 * now argues in sequence: here is the promise (hero) → here is the day you
 * actually have (problem) → here is the mechanism (flow) → here is why it is
 * safe (cockpit) → here is exactly what ships (workflows) → here is how it
 * reaches your systems (integrations) → here is what it is worth (ROI) → here
 * is what finance will ask (security) → who it is for (industries) → what we
 * will and will not claim (proof) → objections (FAQ) → close.
 *
 * Removed from the homepage rather than deleted:
 *  - SolutionSection / CoreFeatures / HowItWorks: the "Industrial OS, three
 *    pillars" story. It is the destination, not the doorway, and it now lives
 *    on /platform where a buyer who wants the full scope can find it.
 *  - MarketplacePreview: still at /marketplace. On the homepage it introduced a
 *    second, unrelated business model halfway through the argument.
 *  - SocialProof: deleted outright. See ProofSection for why.
 */

const AUTOPILOT_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://pashx.com/#organization",
      name: "PashxD",
      url: "https://pashx.com",
      logo: "https://pashx.com/favicon-512x512.png",
      description:
        "PashX Autopilot captures operational requests from email, WhatsApp, documents and project systems, then coordinates suppliers, purchase orders, deliveries, invoices and exceptions for construction, industrial, infrastructure, retail and project-operations teams.",
      sameAs: [
        "https://www.linkedin.com/company/pashx-ai",
        "https://www.instagram.com/pashx.ai",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://pashx.com/#website",
      url: "https://pashx.com",
      name: "PashxD",
      publisher: { "@id": "https://pashx.com/#organization" },
    },
    {
      // SoftwareApplication is what makes the page eligible to be understood as
      // a product rather than a company brochure. No aggregateRating and no
      // review nodes: we have no verifiable reviews, and inventing them is the
      // structured-data version of the testimonials that were just removed.
      "@type": "SoftwareApplication",
      "@id": "https://pashx.com/#autopilot",
      name: "PashX Autopilot",
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Procurement and project coordination automation",
      operatingSystem: "Web",
      url: "https://pashx.com",
      publisher: { "@id": "https://pashx.com/#organization" },
      description:
        "PashX Autopilot turns fragmented operational communication into completed actions. It captures requests from email, WhatsApp, documents and forms, classifies and extracts them into structured data, matches them to suppliers, projects, BOQs, purchase orders, invoices and deliveries, follows up with suppliers and subcontractors, detects delays and mismatches, escalates exceptions for human approval, and syncs approved actions to connected systems with a full audit trail.",
      featureList: [
        "Intake from email, WhatsApp, documents and forms",
        "Classification and structured field extraction",
        "Matching to suppliers, projects, BOQs, purchase orders and deliveries",
        "Automated supplier and subcontractor follow-up",
        "Delay, price change, missing document and invoice mismatch detection",
        "Confidence scoring with human approval for low-confidence actions",
        "Exception management cockpit",
        "Audit trail and system-of-record synchronisation",
      ],
      offers: {
        "@type": "Offer",
        // Priced per engagement; stating a number we do not publish would be
        // worse than stating none. Availability signals it is a real product.
        availability: "https://schema.org/InStock",
        priceCurrency: "INR",
      },
    },
  ],
};

export default function Landing() {
  return (
    <div className="w-full overflow-x-hidden bg-white">
      <SEOHead
        title="PashX Autopilot — Procurement & Project Coordination on Autopilot"
        description="PashX Autopilot turns procurement and project requests from email, WhatsApp, documents and systems into completed, coordinated actions — with human approval."
        path="/"
        jsonLd={AUTOPILOT_JSON_LD}
      />

      <HeroSection />
      <TrustStrip />
      <ProblemSection />
      <AutopilotFlow />
      <ExceptionCockpit />
      <WorkflowsSection />
      <IntegrationsSection />
      <ROICalculator />
      <SecuritySection />
      <IndustriesPreview />
      <ProofSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}
