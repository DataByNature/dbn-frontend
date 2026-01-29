import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms of Service | DatabyNature",
  description: "Terms of Service for DatabyNature - data, airtime, and bill payments.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FAFBFC] text-text-navy">
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-10 h-10 relative overflow-hidden rounded-xl">
              <Image src="/dbn.jpg" alt="DBN" fill className="object-cover" />
            </div>
            <span className="font-bold text-xl text-text-navy">DatabyNature</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-text-navy hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-text-navy mb-2">Terms of Service</h1>
        <p className="text-gray-500 mb-10">Last updated: {new Date().toLocaleDateString("en-US")}</p>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-text-navy mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              By accessing or using DatabyNature (&quot;the Service&quot;), you agree to be bound by these Terms of Service.
              If you do not agree, do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-navy mb-3">2. Use of the Service</h2>
            <p className="text-gray-600 leading-relaxed">
              You may use the Service to purchase data, airtime, and pay bills at discounted rates, and to resell such
              services where permitted. You must provide accurate information and keep your account secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-navy mb-3">3. Wallet and Payments</h2>
            <p className="text-gray-600 leading-relaxed">
              Funds in your wallet are held for the purpose of completing transactions on the platform. Refunds and
              withdrawals are subject to our policies and applicable regulations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-navy mb-3">4. Prohibited Conduct</h2>
            <p className="text-gray-600 leading-relaxed">
              You may not use the Service for illegal activity, fraud, or to violate any applicable laws. We reserve
              the right to suspend or terminate accounts that breach these terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-navy mb-3">5. Changes</h2>
            <p className="text-gray-600 leading-relaxed">
              We may update these terms from time to time. Continued use of the Service after changes constitutes
              acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-navy mb-3">6. Contact</h2>
            <p className="text-gray-600 leading-relaxed">
              For questions about these terms, contact us through the support options on our website.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 text-base font-medium rounded-lg bg-primary-deep hover:bg-primary-deep/90 text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>
      </main>
    </div>
  );
}
