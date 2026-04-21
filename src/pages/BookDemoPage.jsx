import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import Container from "../components/layout/Container";
const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
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
   if (!formData.name || !formData.email || !formData.company) {
     setError("Please fill all required fields");
     return;
   }

   setSubmitting(true);

   try {
     const payload = {
       name: formData.name,
       email: formData.email,
       company: formData.company,
       role: formData.companySize || "",
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
     });

     if (!response.ok) {
       throw new Error("Submission failed");
     }

     const data = await response.json();
     console.log("[BookDemo] Submitted:", data);

     setSubmitted(true);

   } catch (err) {
     console.error(err);
     setError("Something went wrong. Please try again.");
   } finally {
     setSubmitting(false);
   }
 };

  // ============ SUCCESS SCREEN ============
  if (submitted) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-slate-50 to-white">
        <Container className="max-w-3xl">

          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 border border-green-100 mb-6">
              <CheckCircle2 className="w-8 h-8 text-[#15803D]" />
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-[#0A2540] mb-4">
              Thanks, {formData.name.split(" ")[0]}!{" "}
              <span className="bg-gradient-to-r from-[#15803D] to-[#22C55E] bg-clip-text text-transparent">
                Let's book your demo.
              </span>
            </h1>

            <p className="text-slate-500 text-base md:text-lg max-w-xl mx-auto">
              We've received your details. Pick a time below that works for you — our team will walk you through how PashxD fits your workflow.
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
              className="text-sm text-slate-500 hover:text-[#15803D] transition"
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
    <div className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-slate-50 to-white">
      <Container className="max-w-5xl">

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">

          {/* LEFT — Pitch */}
          <div className="lg:col-span-2">
            <p className="text-xs tracking-[0.25em] uppercase text-[#15803D] font-semibold mb-5">
              Book a Demo
            </p>

            <h1 className="text-3xl md:text-4xl font-extrabold text-[#0A2540] leading-[1.1] mb-5">
              See PashxD in{" "}
              <span className="bg-gradient-to-r from-[#15803D] to-[#22C55E] bg-clip-text text-transparent">
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
                  <div className="w-5 h-5 rounded-full bg-green-50 border border-green-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3 h-3 text-[#15803D]" />
                  </div>
                  <span className="text-sm text-slate-700">{item}</span>
                </li>
              ))}
            </ul>

            {/* Trust */}
            <div className="mt-10 pt-8 border-t border-slate-200">
              <p className="text-xs text-slate-400 uppercase tracking-widest mb-3">
                Trusted by 500+ teams
              </p>
              <div className="flex flex-wrap gap-2">
                {["SOC 2", "GDPR", "99.9% Uptime"].map((badge) => (
                  <span
                    key={badge}
                    className="px-3 py-1 rounded-full bg-green-50 text-[#15803D] text-xs border border-green-100 font-medium"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Form */}
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
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm text-[#0A2540] placeholder:text-slate-400 focus:outline-none focus:border-[#15803D] focus:ring-2 focus:ring-green-100 transition resize-none"
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
                className="mt-6 w-full flex items-center justify-center gap-2 bg-[#15803D] hover:bg-[#166534] disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-full font-semibold py-4 text-sm shadow-lg shadow-green-600/20 hover:-translate-y-[1px] transition-all duration-300"
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
                By submitting, you agree to our{" "}
                <a href="/privacy" className="underline hover:text-[#15803D]">Privacy Policy</a>.
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
    <label htmlFor={htmlFor} className="block text-xs font-semibold text-[#0A2540] mb-1.5">
      {children}
    </label>
  );
}

function Input(props) {
  return (
    <input
      {...props}
      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm text-[#0A2540] placeholder:text-slate-400 focus:outline-none focus:border-[#15803D] focus:ring-2 focus:ring-green-100 transition"
    />
  );
}

function Select({ children, ...props }) {
  return (
    <select
      {...props}
      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm text-[#0A2540] bg-white focus:outline-none focus:border-[#15803D] focus:ring-2 focus:ring-green-100 transition"
    >
      {children}
    </select>
  );
}