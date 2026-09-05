import { ArrowRight, Layers } from "lucide-react";
import SEOHead from "../components/SEOHead";
import Container from "../components/layout/Container";
import CtaLink, { DEMO_PATH } from "../components/CtaLink";
import SolutionSection from "../components/landing/SolutionSection.jsx";
import CoreFeatures from "../components/landing/CoreFeatures.jsx";
import HowItWorks from "../components/landing/HowItWorks.jsx";
import MarketplacePreview from "../components/landing/MarketplacePreview.jsx";

/**
 * The Industrial OS story.
 *
 * The homepage now sells one workflow, because a category pitch asks a buyer to
 * accept a rip-and-replace before they have seen anything work. That is a
 * sequencing decision, not a retreat from the vision — so the full platform
 * narrative moves here intact, for the reader who has already understood
 * Autopilot and wants to know where it goes.
 *
 * The sections below are the ones lifted off the homepage unchanged
 * (SolutionSection, CoreFeatures, HowItWorks, MarketplacePreview), so there is
 * exactly one copy of each and no divergence to maintain.
 */

const HORIZON = [
  {
    step: "Now",
    title: "Autopilot on one workflow",
    desc: "Purchase-order follow-up and delivery confirmation, running on your real message traffic with a human approving every action.",
  },
  {
    step: "Next",
    title: "The coordination layer widens",
    desc: "Invoice matching, document and compliance chasing, subcontractor coordination — each added once the one before it has earned its autonomy.",
  },
  {
    step: "Then",
    title: "The operating system underneath",
    desc: "Procurement, execution, cost and the vendor marketplace as one connected record, with Autopilot as the layer that keeps it current without anyone typing.",
  },
];

export default function PlatformPage() {
  return (
    <div className="w-full overflow-x-hidden bg-white">
      <SEOHead
        title="The PashX Platform — Industrial OS for Procurement, Execution and Cost"
        description="Where PashX Autopilot leads: one operating system for procurement, project execution, cost control and vendor sourcing — built for the physical world."
        path="/platform"
      />

      {/* ─── VISION HERO ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-green-50/40" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-4 py-1.5">
              <Layers className="h-3.5 w-3.5 text-brand-green" />
              <span className="text-[11px] font-semibold uppercase tracking-widest text-brand-green md:text-[12px]">
                The platform behind Autopilot
              </span>
            </div>

            <h1 className="mb-6 text-[2.25rem] font-extrabold leading-[1.05] text-brand-navy sm:text-[3rem] md:text-[3.5rem]">
              An operating system for{" "}
              <span className="text-brand-green">physical operations</span>
            </h1>

            <p className="mx-auto mb-9 max-w-2xl text-base leading-relaxed text-slate-500 md:text-xl">
              Autopilot is where PashX starts, not where it stops. Underneath it
              sits a connected record of procurement, execution, cost and
              suppliers — so that automating one workflow does not mean building
              another island.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <CtaLink to={DEMO_PATH} location="platform_hero" variant="primary">
                See PashX Autopilot in action
                <ArrowRight className="h-4 w-4" />
              </CtaLink>
              <CtaLink to="/#workflows" location="platform_hero" variant="secondary">
                Explore the workflows
              </CtaLink>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── SEQUENCING ───────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
            {HORIZON.map((h) => (
              <div
                key={h.step}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="mb-4 inline-block rounded-full border border-green-200 bg-green-50 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-brand-green">
                  {h.step}
                </span>
                <h2 className="mb-2 text-[17px] font-semibold text-brand-navy">
                  {h.title}
                </h2>
                <p className="text-sm leading-relaxed text-slate-500">{h.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── THE PLATFORM ITSELF ──────────────────────────────────────── */}
      <SolutionSection />
      <CoreFeatures />
      <HowItWorks />
      <MarketplacePreview />
    </div>
  );
}
