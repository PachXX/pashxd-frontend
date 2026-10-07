import SEOHead from "../components/SEOHead";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import Container from "../components/layout/Container";
import {
  trackDemoSubmit,
  trackDemoError,
  trackCalendlyOpen,
} from "../analytics/events";
const API = ''; // Same-origin proxy in local previews and production.
const companySizes = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "501-1000 employees",
  "1000+ employees",
];

const industries = [
  "Construction",
  "Retail Fit-Out",
  "Industrial & Equipment",
  "Energy & Infrastructure",
  "Real Estate",
  "Manufacturing",
  "Other",
];

const CALENDLY_URL = "https://calendly.com/shahil-talenlio-letstalk/letstalk";

export default function BookDemoPage() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    companySize: "",
    phone: "",
    industry: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e) => {
   e.preventDefault();
   setError("");

   // ✅ Basic validation (added)
   if (!formData.name.trim() || !formData.email.trim() || !formData.company.trim()) {
     setError("Please fill all required fields");
     return;
   }

   setSubmitting(true);

   try {
     const payload = {
       name: formData.name.trim(),
       email: formData.email.trim(),
       company: formData.company.trim(),
       company_size: formData.companySize || "",
       industry: formData.industry || "",
       message: formData.message || "",
       phone: formData.phone || "", // ✅ added
     };

     const response = await fetch(`${API}/api/demo-requests`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(payload),
       signal: AbortSignal.timeout(20000),
     });

     if (!response.ok) {
       throw new Error("Submission failed");
     }

     await response.json();

     // The conversion. Fired after the server accepted the lead, not on click,
     // so the GA4 number means "we have this lead" rather than "someone pressed
     // a button". The Calendly embed renders on the next screen, so the
     // scheduler impression is counted here too.
     trackDemoSubmit("book_demo_page");
     trackCalendlyOpen("book_demo_success");

     setSubmitted(true);

   } catch (err) {
     console.error(err);
     trackDemoError(err?.message || "unknown");
     setError("Something went wrong. Please try again.");
   } finally {
     setSubmitting(false);
   }
 };

  // ============ SUCCESS SCREEN ============
  if (submitted) {
    return (
            <div className="min-h-screen pt-32 pb-20 bg-linear-to-b from-slate-50 to-white">
      <SEOHead
        title="Book a Free Demo | Pashx Dashboard"
        description="Schedule a free personalized demo of Pashx Dashboard's AI-powered industrial OS. See how we can streamline your operations and reduce costs."
        path="/book-demo"
      />
        <Container className="max-w-3xl">

          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 border border-green-100 mb-6">
              <CheckCircle2 className="w-8 h-8 text-brand-green" />
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-brand-navy mb-4">
              Thanks, {formData.name.trim().split(/\s+/)[0]}!{" "}
              <span className="bg-linear-to-r from-[#15803D] to-[#22C55E] bg-clip-text text-transparent">
                Let's book your demo.
              </span>
            </h1>

            <p className="text-slate-500 text-base md:text-lg max-w-xl mx-auto">
              We've received your details. Pick a time below that works for you -- our team will walk you through how Pashx Dashboard fits your workflow.
            </p>
          </div>

          {/* Calendly Embed */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 md:p-6 shadow-xl">
            <iframe
              src={CALENDLY_URL}
              width="100%"
              height="700"
              frameBorder="0"
              className="rounded-xl"
              title="Schedule a demo"
            />
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => navigate("/")}
              className="text-sm text-slate-500 hover:text-brand-green transition"
            >
              ← Back to home
            </button>
          </div>

        </Container>
      </div>
    );
  }

  // ============ FORM SCREEN ============
  return (
    <div className="min-h-screen pt-32 pb-20 bg-linear-to-b from-slate-50 to-white">
      {/* The SEOHead used to live only in the post-submission branch above, so
          the form screen — the state every crawler and unfurler actually
          receives — shipped with no title or description. Both branches must
          carry it. */}
      <SEOHead
        title="Book a Free Demo | Pashx Dashboard"
        description="Schedule a free personalized demo of Pashx Dashboard's AI-powered industrial OS. See how we can streamline your operations and reduce costs."
        path="/book-demo"
      />
      <Container className="max-w-5xl">

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">

          {/* LEFT -- Pitch */}
          <div className="lg:col-span-2">
            <p className="text-xs tracking-[0.25em] uppercase text-brand-green font-semibold mb-5">
              Book a Demo
            </p>

            <h1 className="text-3xl md:text-4xl font-extrabold text-brand-navy leading-[1.1] mb-5">
              See Pashx Dashboard in{" "}
              <span className="bg-linear-to-r from-[#15803D] to-[#22C55E] bg-clip-text text-transparent">
                action.
              </span>
            </h1>

            <p className="text-slate-500 text-base md:text-lg leading-relaxed mb-8">
              Tell us a bit about your operations and we'll tailor the demo to your workflow.
            </p>

            <ul className="space-y-4">
              {[
                "30-minute personalized walkthrough",
                "Custom ROI analysis for your company",
                "Live Q&A with a product specialist",
                "No commitment, no sales pressure",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-50 border border-green-200 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3 h-3 text-brand-green" />
                  </div>
                  <span className="text-sm text-slate-700">{item}</span>
                </li>
              ))}
            </ul>

            {/* Trust */}
            <div className="mt-10 pt-8 border-t border-slate-200">
              <p className="text-xs text-slate-400 uppercase tracking-widest mb-3">
                See how PxD fits your workflow
              </p>
              <div className="flex flex-wrap gap-2">
                {["Guided demo", "Your use case", "No obligation"].map((badge) => (
                  <span
                    key={badge}
                    className="px-3 py-1 rounded-full bg-green-50 text-brand-green text-xs border border-green-100 font-medium"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT -- Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xl"
            >
              <div className="grid sm:grid-cols-2 gap-4 md:gap-5">

                {/* Name */}
                <div className="sm:col-span-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Smith"
                  />
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email">Work Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 555 000 0000"
                  />
                </div>

                {/* Company */}
                <div>
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Acme Corp"
                  />
                </div>

                {/* Company Size */}
                <div>
                  <Label htmlFor="companySize">Company Size *</Label>
                  <Select
                    id="companySize"
                    name="companySize"
                    required
                    value={formData.companySize}
                    onChange={handleChange}
                  >
                    <option value="">Select size</option>
                    {companySizes.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </Select>
                </div>

                {/* Industry */}
                <div className="sm:col-span-2">
                  <Label htmlFor="industry">Industry *</Label>
                  <Select
                    id="industry"
                    name="industry"
                    required
                    value={formData.industry}
                    onChange={handleChange}
                  >
                    <option value="">Select industry</option>
                    {industries.map((i) => (
                      <option key={i} value={i}>{i}</option>
                    ))}
                  </Select>
                </div>

                {/* Message */}
                <div className="sm:col-span-2">
                  <Label htmlFor="message">What would you like to achieve? (optional)</Label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your current pain points or what you're hoping to learn..."
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm text-brand-navy placeholder:text-slate-400 focus:outline-hidden focus:border-brand-green focus:ring-2 focus:ring-green-100 transition resize-none"
                  />
                </div>

              </div>

              {/* Error */}
              {error && (
                <div className="mt-5 p-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="mt-6 w-full flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green-hover disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-full font-semibold py-4 text-sm shadow-lg shadow-green-600/20 hover:-translate-y-px transition-all duration-300"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Continue to Schedule
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="mt-4 text-[11px] text-slate-400 text-center">
                Read our{" "}
                <a href="/privacy" className="underline hover:text-brand-green">Privacy Policy</a>.
                We'll never share your info.
              </p>
            </form>
          </div>

        </div>

      </Container>
    </div>
  );
}

/* ===== Reusable form controls ===== */

function Label({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="block text-xs font-semibold text-brand-navy mb-1.5">
      {children}
    </label>
  );
}

function Input(props) {
  return (
    <input
      {...props}
      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm text-brand-navy placeholder:text-slate-400 focus:outline-hidden focus:border-brand-green focus:ring-2 focus:ring-green-100 transition"
    />
  );
}

function Select({ children, ...props }) {
  return (
    <select
      {...props}
      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm text-brand-navy bg-white focus:outline-hidden focus:border-brand-green focus:ring-2 focus:ring-green-100 transition"
    >
      {children}
    </select>
  );
}
