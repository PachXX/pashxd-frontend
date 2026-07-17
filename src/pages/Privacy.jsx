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
                <p className="text-slate-700 leading-relaxed mt-3">
                  <strong>Data Controller:</strong> For the purposes of the EU/UK General Data Protection Regulation (GDPR), PashxD is the data controller responsible for your personal data. Questions or requests about how we handle your data should be directed to our Data Protection Contact — see Section 9.
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
                <p className="text-slate-700 leading-relaxed mb-3">
                  If the GDPR, UK GDPR, or a similar data protection law applies to you, you have the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li><strong>Right to Access:</strong> request confirmation of what personal data we hold about you and a copy of it</li>
                  <li><strong>Right to Rectification:</strong> ask us to correct inaccurate or incomplete data</li>
                  <li><strong>Right to Erasure ("right to be forgotten"):</strong> ask us to delete your personal data, subject to legal retention requirements</li>
                  <li><strong>Right to Restrict Processing:</strong> ask us to limit how we use your data in certain circumstances</li>
                  <li><strong>Right to Data Portability:</strong> receive your data in a structured, commonly-used, machine-readable format, or have it transferred to another provider</li>
                  <li><strong>Right to Object:</strong> object to processing based on legitimate interests, including direct marketing</li>
                  <li><strong>Right to Withdraw Consent:</strong> where processing is based on consent, withdraw it at any time without affecting prior lawful processing</li>
                  <li><strong>Right to Lodge a Complaint:</strong> file a complaint with your local data protection supervisory authority</li>
                </ul>
                <p className="text-slate-700 leading-relaxed mt-3">
                  To exercise any of these rights, contact us using the details in Section 9. We aim to respond to verified requests within 30 days.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#0A2540] mb-4">7. Data Retention</h2>
                <p className="text-slate-700 leading-relaxed">
                  We retain personal data only for as long as necessary to provide our services and fulfill the purposes described
                  in this policy, including legal, accounting, and reporting obligations. As a general rule:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700 mt-3">
                  <li><strong>Account and customer data:</strong> retained for the duration of the business relationship, plus up to 7 years afterward where required for tax, contractual, or legal record-keeping</li>
                  <li><strong>Prospect / outreach data</strong> (contacts we have not entered a customer relationship with): retained for up to 24 months from last contact, or until you ask us to delete it, whichever comes first</li>
                  <li><strong>Marketing communications records:</strong> retained until you unsubscribe or object, plus a reasonable period to honor that preference</li>
                </ul>
                <p className="text-slate-700 leading-relaxed mt-3">
                  When data is no longer needed, we delete or anonymize it. You can request earlier deletion at any time (Section 6).
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#0A2540] mb-4">8. International Data Transfers</h2>
                <p className="text-slate-700 leading-relaxed">
                  PashxD operates globally across UAE, Saudi Arabia, India, Qatar, Oman, Germany, Poland, Netherlands, France, and Italy.
                  Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards
                  are in place including EU Standard Contractual Clauses (SCCs) and compliance with GDPR.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#0A2540] mb-4">9. Contact Us</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  If you have questions about this Privacy Policy, or want to exercise any of the rights described in Section 6
                  (access, correction, deletion, portability, objection, etc.), contact us:
                </p>
                <ul className="space-y-2 text-slate-700">
                  <li><strong>Data Protection Contact:</strong> privacy@pashx.com</li>
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