// Container component inline
function Container({ children, className = "" }) {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-12 sm:pt-36 sm:pb-16 bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <Container>
          <div className="max-w-4xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A2540] mb-4">
              Terms of Service
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
                <h2 className="text-2xl font-bold text-[#0A2540] mb-4">1. Agreement to Terms</h2>
                <p className="text-slate-700 leading-relaxed">
                  By accessing or using PashxD's Industrial OS & Construction Management ERP platform and B2B Marketplace ("Platform"),
                  you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use the Platform.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#0A2540] mb-4">2. Eligibility</h2>
                <p className="text-slate-700 leading-relaxed mb-3">To use the Platform, you must:</p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>Be at least 18 years old</li>
                  <li>Have the legal capacity to enter into binding contracts</li>
                  <li>Represent a legitimate business entity for B2B transactions</li>
                  <li>Not be prohibited from using the Platform under applicable laws</li>
                  <li>Provide accurate and complete registration information</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#0A2540] mb-4">3. Account Registration</h2>
                <p className="text-slate-700 leading-relaxed mb-3">You agree to:</p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and update your information to keep it accurate</li>
                  <li>Maintain the security and confidentiality of your login credentials</li>
                  <li>Notify us immediately of any unauthorized access or security breach</li>
                </ul>
                <p className="text-slate-700 leading-relaxed mt-4">
                  You are responsible for all activities that occur under your account.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#0A2540] mb-4">4. Permitted Use</h2>
                <p className="text-slate-700 leading-relaxed mb-3">You may use the Platform to:</p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>Manage industrial and construction projects</li>
                  <li>Create and process Bills of Quantities (BOQs)</li>
                  <li>Source and procure materials from verified vendors</li>
                  <li>Track deliveries and manage logistics</li>
                  <li>Process payments and manage invoices</li>
                  <li>Access analytics and reporting features</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#0A2540] mb-4">5. Prohibited Use</h2>
                <p className="text-slate-700 leading-relaxed mb-3">You agree NOT to:</p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe intellectual property rights</li>
                  <li>Upload malicious code, viruses, or harmful software</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Scrape, crawl, or harvest data from the Platform</li>
                  <li>Engage in fraudulent transactions</li>
                  <li>Interfere with other users' access</li>
                  <li>Use the Platform for any illegal purpose</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#0A2540] mb-4">6. Marketplace Terms</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  All vendors undergo Know Your Business (KYB) verification including trade license checks,
                  GST validation, and factory audits. Vendors warrant that product descriptions are accurate
                  and products comply with quality standards.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  PashxD charges transaction fees and subscription fees as outlined in our pricing page.
                  Fees are subject to change with 30 days' notice.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#0A2540] mb-4">7. Payment Terms</h2>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>Subscription fees are billed in advance (monthly or annually)</li>
                  <li>Fees are non-refundable except as required by law</li>
                  <li>Marketplace transactions subject to 2-5% platform fees</li>
                  <li>Net 30/60/90 payment terms available to approved buyers</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#0A2540] mb-4">8. Intellectual Property</h2>
                <p className="text-slate-700 leading-relaxed">
                  The Platform, including all software, designs, text, graphics, and logos, is owned by PashxD
                  and protected by intellectual property laws. You retain ownership of content you upload but
                  grant PashxD a license to use it to provide our services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#0A2540] mb-4">9. Disclaimer</h2>
                <p className="text-slate-700 leading-relaxed">
                  The Platform is provided "as is" and "as available" without warranties of any kind.
                  We do not guarantee uninterrupted access or error-free operation. We are not responsible
                  for vendor product quality or delivery failures.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#0A2540] mb-4">10. Limitation of Liability</h2>
                <p className="text-slate-700 leading-relaxed">
                  To the maximum extent permitted by law, PashxD shall not be liable for indirect, incidental,
                  special, or consequential damages. Our total liability shall not exceed the fees you paid
                  in the 12 months preceding the claim.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#0A2540] mb-4">11. Termination</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  You may terminate your account at any time. We may suspend or terminate your account if you
                  violate these Terms, engage in fraudulent activities, or fail to pay fees.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#0A2540] mb-4">12. Governing Law</h2>
                <p className="text-slate-700 leading-relaxed">
                  These Terms are governed by the laws of Germany (for European operations) and the laws of
                  the UAE (for Middle Eastern operations). Disputes shall be resolved through binding arbitration.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#0A2540] mb-4">13. Contact Us</h2>
                <p className="text-slate-700 leading-relaxed mb-3">For questions about these Terms, contact us:</p>
                <ul className="space-y-2 text-slate-700">
                  <li><strong>Email:</strong> legal@pashx.com</li>
                  <li><strong>General:</strong> info@pashx.com</li>
                  <li><strong>Phone:</strong> +49 157 7802062</li>
                </ul>
              </div>

              <div className="mt-12 p-6 bg-green-50 border border-green-200 rounded-xl">
                <h3 className="text-xl font-bold text-[#15803D] mb-2">Questions About These Terms?</h3>
                <p className="text-slate-700 leading-relaxed">
                  We're here to help clarify any aspect of our Terms of Service.
                  Our legal and support teams are available to address your concerns.
                </p>
              </div>

            </div>

          </div>
        </Container>
      </section>
    </div>
  );
}