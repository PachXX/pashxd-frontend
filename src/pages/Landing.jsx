import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import SEOHead from "../components/SEOHead";
import Container from "../components/layout/Container";
import CtaLink from "../components/CtaLink";
import HeroSection from "../components/landing/HeroSection.jsx";
import TrustStrip from "../components/landing/TrustStrip.jsx";
import HowItWorks from "../components/landing/HowItWorks.jsx";
import IndustriesPreview from "../components/landing/IndustriesPreview.jsx";
import IntegrationsSection from "../components/landing/IntegrationsSection.jsx";

import ProblemSection from "../components/landing/ProblemSection.jsx";
import SolutionSection from "../components/landing/SolutionSection.jsx";
import CoreFeatures from "../components/landing/CoreFeatures.jsx";
import ROICalculator from "../components/landing/ROICalculator.jsx";
import MarketplacePreview from "../components/landing/MarketplacePreview.jsx";
import SocialProof from "../components/landing/SocialProof.jsx";

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": "https://pashx.com/#organization", name: "Pashx Dashboard", url: "https://pashx.com", logo: "https://pashx.com/favicon-512x512.png", description: "A connected workspace for procurement, project execution, and AI-assisted industrial operations.", sameAs: ["https://www.linkedin.com/company/pashx-ai", "https://www.instagram.com/pashx.ai"] },
    { "@type": "WebSite", "@id": "https://pashx.com/#website", name: "Pashx Dashboard", url: "https://pashx.com", publisher: { "@id": "https://pashx.com/#organization" } },
    { "@type": "SoftwareApplication", name: "Pashx Dashboard", applicationCategory: "BusinessApplication", operatingSystem: "Web", url: "https://pashx.com", description: "Connect procurement, project execution, and AI-assisted coordination in one operational workspace.", publisher: { "@id": "https://pashx.com/#organization" } },
  ],
};
export default function Landing() {
  const landingRef = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const sections = landingRef.current.querySelectorAll('section:not(.os-hero)');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('px-section-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.02 });
    sections.forEach(section => { section.classList.add('px-section-reveal'); observer.observe(section); });
    return () => { observer.disconnect(); sections.forEach(section => section.classList.remove('px-section-reveal', 'px-section-visible')); };
  }, []);
  return (
    <div ref={landingRef} className="px-landing w-full bg-white">
      <SEOHead title="Pashx Dashboard | The Operating System for Physical Operations" description="Connect procurement, project execution, and AI in one workspace. Pashx Dashboard brings orders, site updates, and operational decisions together." path="/" jsonLd={JSON_LD} />
      <HeroSection />
      <TrustStrip />
      <ProblemSection />
      <div id="platform" className="scroll-mt-24"><SolutionSection /></div>
      <MarketplacePreview />
      <CoreFeatures />
      <div id="workflows" className="scroll-mt-24"><HowItWorks /></div>
      <ROICalculator />
      <IndustriesPreview />
      <IntegrationsSection />
      <SocialProof />
      <section className="border-y border-slate-200 bg-slate-50 py-12"><Container className="flex flex-col sm:flex-row justify-between gap-6 sm:items-center"><div><p className="os-section-label">From the Pashx Dashboard journal</p><h2 className="text-2xl font-semibold text-brand-navy">Ideas for better-run operations.</h2><p className="text-slate-600 mt-3">Explore our latest articles on procurement, projects, and AI.</p></div><CtaLink to="/resources" location="homepage_blog" variant="secondary">Read the blog <ArrowRight size={16} /></CtaLink></Container></section>
      <Container><section className="os-closing"><div><p className="os-section-label !text-green-300">Build with a connected operation</p><h2>Bring your next project<br />into one clear view.</h2><p>Walk us through your procurement and project workflows. We’ll show you where Pashx Dashboard fits, and what to connect first.</p></div><CtaLink location="final_cta" label="Book a demo" className="shrink-0">Book a demo <ArrowRight size={17} /></CtaLink></section></Container>
    </div>
  );
}
