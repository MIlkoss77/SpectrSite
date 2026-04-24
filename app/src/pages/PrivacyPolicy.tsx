export default function PrivacyPolicy() {
  return (
    <main className="relative z-10 pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-black text-white mb-8 tracking-tight">Privacy Policy</h1>
        
        <div className="prose prose-invert max-w-none space-y-8 text-white/60">
          <section>
            <h2 className="text-xl font-bold text-white mb-4">1. Information We Collect</h2>
            <p>
              Spectr Trading collects minimal data required to provide our services. This includes your email address for account management, encrypted API keys for trading terminal functionality, and basic analytics to improve user experience.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">2. Use of Information</h2>
            <p>
              Your data is used strictly for service delivery. We do not sell your personal information or trading data to third parties. API keys are encrypted at rest and never shared.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">3. Data Security</h2>
            <p>
              We implement industry-standard security measures, including end-to-end encryption for sensitive data. However, no system is 100% secure, and users are responsible for securing their own credentials.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">4. Third-Party Services</h2>
            <p>
              We may use third-party analytics (e.g., Vercel Analytics) and payment processors (e.g., Stripe/Crypto gateways). These services have their own privacy policies.
            </p>
          </section>

          <section>
            <p className="text-xs italic mt-12">
              Last Updated: April 2026
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
