import { CheckCircle2, X, ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const plans = [
  {
    name: "Starter",
    tagline: "For small teams and single-site operations",
    price: "$499",
    period: "/month",
    popular: false,
    limits: ["30 Suppliers", "20 Active Projects", "10 Users"],
    features: [
      { label: "Order Management", included: true },
      { label: "Supplier Network", included: true },
      { label: "Delivery Tracking", included: true },
      { label: "Basic Analytics", included: true },
      { label: "Email Support", included: true },
      { label: "API Access", included: false },
      { label: "AI Intelligence", included: false },
      { label: "Custom Onboarding", included: false },
    ],
  },
  {
    name: "Professional",
    tagline: "For mid-size companies scaling operations",
    price: "$1,499",
    period: "/month",
    popular: true,
    limits: ["150 Suppliers", "100 Active Projects", "50 Users"],
    features: [
      { label: "Order Management", included: true },
      { label: "Supplier Network", included: true },
      { label: "Delivery Tracking", included: true },
      { label: "Advanced Analytics", included: true },
      { label: "Priority Support", included: true },
      { label: "API Access", included: true },
      { label: "AI Intelligence", included: true },
      { label: "Custom Onboarding", included: false },
    ],
  },
  {
    name: "Enterprise",
    tagline: "For large organizations with complex needs",
    price: "Custom",
    period: "",
    popular: false,
    limits: ["Unlimited Suppliers", "Unlimited Projects", "Unlimited Users"],
    features: [
      { label: "Order Management", included: true },
      { label: "Supplier Network", included: true },
      { label: "Delivery Tracking", included: true },
      { label: "Custom Analytics", included: true },
      { label: "Dedicated Support Manager", included: true },
      { label: "Full API + Webhooks", included: true },
      { label: "AI Intelligence + Custom Models", included: true },
      { label: "White-Glove Onboarding", included: true },
    ],
  },
];

const addons = [
  { name: "Procurement Module", desc: "Catalogs, ordering, approval workflows, mobile app, automation", included: ["Starter", "Professional", "Enterprise"] },
  { name: "Delivery & Logistics Module", desc: "Digital delivery notes, photo verification, warehouse receipt, mobile app", included: ["Professional", "Enterprise"] },
  { name: "Invoice Matching Module", desc: "3-way matching, automated sorting, price checking, document pipeline", included: ["Professional", "Enterprise"] },
  { name: "AI Copilot", desc: "Delay prediction, cost overrun detection, smart vendor recommendations", included: ["Enterprise"] },
];

const faqs = [
  { q: "How does pricing work?", a: "Pricing is based on your base license (determined by number of suppliers, projects, and users) plus optional add-on modules. Contact us for a custom quote tailored to your specific needs." },
  { q: "Can I start with one module and add more later?", a: "Absolutely. Most customers start with Procurement and add Delivery and Invoice Matching as they scale. Your base license stays the same." },
  { q: "Is there a free trial?", a: "We offer a guided pilot program where we onboard your team on a live project. This lets you see real value before committing. Contact us to learn more." },
  { q: "What support is included?", a: "All plans include standard email support. Professional plans get priority support with faster response times. Enterprise customers get a dedicated success manager." },
  { q: "How long does implementation take?", a: "Most teams are live within 2-4 weeks. Enterprise deployments with custom integrations typically take 6-8 weeks with our dedicated onboarding team." },
  { q: "Does PashxD integrate with our existing ERP?", a: "Yes. We integrate with SAP, Tally, Zoho, Odoo, MS Business Central, QuickBooks, and more. API access is available on Professional and Enterprise plans." },
];

export default function PricingPage() {
  const ref = useScrollReveal();

  return (
    <div data-testid="pricing-page" ref={ref} className="pt-20">
      {/* Hero */}
      <section className="py-24 bg-white relative">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 50% 30%, rgba(16, 185, 129, 0.08) 0%, transparent 50%)`,
        }} />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <span className="reveal text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">Pricing</span>
          <h1 className="reveal text-4xl sm:text-5xl lg:text-6xl tracking-tighter font-black mt-4 mb-6 text-gray-900" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
            Plans That Scale With You
          </h1>
          <p className="reveal reveal-delay-1 text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto">
            Choose a base license, add the modules you need. Transparent pricing that grows with your operations.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="py-16 section-alt">
        <div className="max-w-7xl mx-auto px-6">
          <div className="reveal grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                data-testid={`pricing-plan-${plan.name.toLowerCase()}`}
                className={`relative bg-white rounded-2xl p-8 border transition-all duration-300 card-glow shadow-sm ${
                  plan.popular ? "border-emerald-300 shadow-lg shadow-emerald-100" : "border-gray-100"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>{plan.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">{plan.tagline}</p>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-black text-gray-900 font-mono-data">{plan.price}</span>
                  {plan.period && <span className="text-sm text-gray-400">{plan.period}</span>}
                </div>

                <Link to="/contact">
                  <Button
                    data-testid={`pricing-cta-${plan.name.toLowerCase()}`}
                    className={`w-full rounded-full h-10 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                      plan.popular
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    {plan.price === "Custom" ? "Contact Sales" : "Get Started"} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="space-y-2 mb-4">
                    {plan.limits.map((l) => (
                      <div key={l} className="flex items-center gap-2 text-sm">
                        <Zap className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="text-gray-700 font-medium">{l}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {plan.features.map((f) => (
                      <div key={f.label} className="flex items-center gap-2 text-sm">
                        {f.included ? (
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        ) : (
                          <X className="h-3.5 w-3.5 text-gray-300" />
                        )}
                        <span className={f.included ? "text-gray-600" : "text-gray-300"}>{f.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-on Modules */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="reveal text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">Modules</span>
            <h2 className="text-3xl sm:text-4xl tracking-tight font-bold mt-4 text-gray-900" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
              Add-On Modules
            </h2>
            <p className="text-gray-500 mt-4">Pick the modules that match your workflow. Add more as you scale.</p>
          </div>

          <div className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {addons.map((addon) => (
              <div key={addon.name} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm card-glow transition-all duration-300">
                <h4 className="text-sm font-semibold text-gray-900 mb-2" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>{addon.name}</h4>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">{addon.desc}</p>
                <div className="flex flex-wrap gap-1">
                  {addon.included.map((plan) => (
                    <span key={plan} className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[9px] font-medium border border-emerald-100">
                      {plan}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 section-alt">
        <div className="max-w-3xl mx-auto px-6">
          <div className="reveal text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">FAQ</span>
            <h2 className="text-3xl sm:text-4xl tracking-tight font-bold mt-4 text-gray-900" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
              Frequently Asked Questions
            </h2>
          </div>

          <Accordion type="single" collapsible className="reveal space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-white border border-gray-100 rounded-xl px-6 shadow-sm" data-testid={`faq-item-${i}`}>
                <AccordionTrigger className="text-sm font-semibold text-gray-900 hover:text-emerald-600 py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-500 leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="reveal bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-12 shadow-xl shadow-emerald-600/20">
            <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
              Ready to Get Started?
            </h2>
            <p className="text-emerald-100 mb-8 max-w-lg mx-auto text-sm">
              Get a custom quote based on your team size, modules, and integration needs. Our team responds within 2 hours.
            </p>
            <Link to="/contact">
              <Button data-testid="pricing-bottom-cta" className="bg-white hover:bg-gray-50 text-emerald-700 h-12 px-8 rounded-full text-sm font-semibold shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                Get Custom Pricing <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
