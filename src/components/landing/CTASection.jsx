import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import Container from "../layout/Container";
import CtaLink, { DEMO_PATH } from "../CtaLink";

/**
 * Closing CTA.
 *
 * Two changes from the previous version. The headline was "Stop managing
 * operations across 10 tools", which sells a replacement project nobody wants
 * to start; it now closes on the same promise the hero opened with. And the
 * primary button linked straight out to a raw Calendly URL, so the strongest
 * intent on the page left the site without touching the demo form or being
 * attributable — every primary CTA now goes to DEMO_PATH, which owns the
 * Calendly embed and fires the conversion event.
 */
export default function CTASection() {
  const ref = useScrollReveal();

  return (
    <section
      ref={ref}
      className="bg-gradient-to-b from-white to-slate-50 py-20 md:py-32"
    >
      <Container className="max-w-5xl">
        <div className="reveal relative overflow-hidden rounded-3xl border border-white/10 bg-brand-navy p-8 text-center shadow-[0_25px_80px_rgba(0,0,0,0.25)] sm:p-14 md:p-20">
          {/* Glow */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-green-mid/20 via-transparent to-brand-green-light/10" />
            <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 bg-green-500/20 blur-[140px]" />
          </div>

          <div className="relative">
            <h2 className="reveal mb-6 text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
              Put one workflow{" "}
              <span className="text-green-400">on autopilot</span>
            </h2>

            <p className="reveal reveal-delay-1 mx-auto mb-8 max-w-xl text-base leading-relaxed text-slate-300 md:mb-10 md:text-lg">
              Bring us a week of your supplier messages. We will show you what
              Autopilot would have extracted, matched and chased — before you
              commit to anything.
            </p>

            <div className="reveal reveal-delay-2 flex flex-wrap justify-center gap-4 md:gap-5">
              <CtaLink
                to={DEMO_PATH}
                location="final_cta"
                variant="primary-gradient"
              >
                See PashX Autopilot in action
                <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
              </CtaLink>

              <CtaLink to="#workflows" location="final_cta" variant="on-dark">
                Explore the workflows
              </CtaLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
