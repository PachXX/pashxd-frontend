// Container component inline
function Container({ children, className = "" }) {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-12 sm:pt-36 sm:pb-16 bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <Container>
          <div className="max-w-4xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A2540] mb-4">
              Privacy Policy
            </h1>
            <p className="text-base sm:text-lg text-slate-600">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </Container>
      </section>

      {/* Content Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <Container>
          <div className="max-w-4xl">

            <div className="space-y-8">

              <div>
                <h2 className="text-2xl font-bold text-[#0A2540] mb-4">1. Introduction</h2>
                <p className="text-slate-700 leading-relaxed">
                  PashxD ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Industrial OS & Construction Management ERP platform and B2B Marketplace.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#0A2540] mb-4">2. Information We Collect</h2>

                <h3 className="text-xl font-semibold text-[#0A2540] mb-3 mt-6">2.1 Information You Provide</h3>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li><strong>Account Information:</strong> Name, email address, company name, phone number, job title</li>
                  <li><strong>Business Information:</strong> Company registration details, tax identification, trade licenses</li>
                  <li><strong>Project Data:</strong> Bills of Quantities (BOQs), project details, procurement requirements</li>
                  <li><strong>Payment Information:</strong> Billing address, payment method details (processed securely through third-party payment processors)</li>
                  <li><strong>Communications:</strong> Support requests, feedback, and correspondence with our team</li>
                </ul>

                <h3 className="text-xl font-semibold text-[#0A2540] mb-3 mt-6">2.2 Information Collected Automatically</h3>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li><strong>Usage Data:</strong> Pages viewed, features used, time spent on platform, search queries</li>
                  <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
                  <li><strong>Cookies and Tracking:</strong> We use cookies and similar technologies to enhance user experience</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#0A2540] mb-4">3. How We Use Your Information</h2>
                <p className="text-slate-700 leading-relaxed mb-3">We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>Provide, maintain, and improve our ERP platform and marketplace services</li>
                  <li>Process transactions and manage vendor-buyer relationships</li>
                  <li>Automate procurement workflows and BOQ matching</li>
                  <li>Facilitate delivery tracking and logistics coordination</li>
                  <li>Provide customer support and respond to inquiries</li>
                  <li>Send administrative updates, security alerts, and account notifications</li>
                  <li>Conduct analytics and improve our AI-powered features</li>
                  <li>Comply with legal obligations and prevent fraud</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#0A2540] mb-4">4. Information Sharing</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  We share information with third parties when you explicitly consent, such as when connecting buyers with verified vendors on our marketplace. We work with trusted third-party service providers for cloud hosting, payment processing, analytics, and logistics.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#0A2540] mb-4">5. Data Security</h2>
                <p className="text-slate-700 leading-relaxed mb-3">We implement industry-standard security measures including:</p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>Encryption of data in transit (SSL/TLS) and at rest</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Access controls and authentication protocols</li>
                  <li>Secure data centers with redundancy and backup systems</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#0A2540] mb-4">6. Your Rights</h2>
                <p className="text-slate-700 leading-relaxed mb-3">You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>Access and update your account information</li>
                  <li>Request a copy of your data (data portability)</li>
                  <li>Request deletion of your account and data</li>
                  <li>Opt out of marketing communications</li>
                  <li>Control cookies through browser settings</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#0A2540] mb-4">7. International Data Transfers</h2>
                <p className="text-slate-700 leading-relaxed">
                  PashxD operates globally across UAE, Saudi Arabia, India, Qatar, Oman, Germany, Poland, Netherlands, France, and Italy.
                  Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards
                  are in place including EU Standard Contractual Clauses (SCCs) and compliance with GDPR.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#0A2540] mb-4">8. Contact Us</h2>
                <p className="text-slate-700 leading-relaxed mb-3">If you have questions about this Privacy Policy, please contact us:</p>
                <ul className="space-y-2 text-slate-700">
                  <li><strong>Email:</strong> privacy@pashx.com</li>
                  <li><strong>General:</strong> info@pashx.com</li>
                  <li><strong>Phone:</strong> +49 157 7802062</li>
                </ul>
              </div>

              <div className="mt-12 p-6 bg-green-50 border border-green-200 rounded-xl">
                <h3 className="text-xl font-bold text-[#15803D] mb-2">Your Privacy Matters</h3>
                <p className="text-slate-700 leading-relaxed">
                  At PashxD, we believe transparency builds trust. If you have concerns about how your data is handled,
                  our team is here to help. We're committed to protecting your information and giving you control over your data.
                </p>
              </div>

            </div>

          </div>
        </Container>
      </section>
    </div>
  );
}