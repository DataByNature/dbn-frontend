import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | DatabyNature",
  description: "Privacy Policy for DatabyNature - how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
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
        <h1 className="text-4xl font-bold text-text-navy mb-2">Privacy Policy</h1>
        <p className="text-gray-500 mb-10">Last updated: {new Date().toLocaleDateString("en-US")}</p>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-text-navy mb-3">1. Information We Collect</h2>
            <p className="text-gray-600 leading-relaxed">
              We collect information you provide when you register (e.g. email, phone number), when you fund your
              wallet or make transactions, and when you contact support. We also collect usage data to improve the
              Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-navy mb-3">2. How We Use Your Information</h2>
            <p className="text-gray-600 leading-relaxed">
              We use your information to operate the Service, process transactions, verify your identity, send
              important notices, and improve our products. We do not sell your personal data to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-navy mb-3">3. Data Security</h2>
            <p className="text-gray-600 leading-relaxed">
              We use industry-standard measures to protect your data, including encryption and secure storage. You
              are responsible for keeping your login credentials safe.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-navy mb-3">4. Sharing and Disclosure</h2>
            <p className="text-gray-600 leading-relaxed">
              We may share data with service providers who help us run the platform (e.g. payment processors, hosting).
              We may also disclose information when required by law or to protect our rights and users.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-navy mb-3">5. Your Rights</h2>
            <p className="text-gray-600 leading-relaxed">
              Depending on your location, you may have rights to access, correct, or delete your personal data. Contact
              us to exercise these rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-navy mb-3">6. Changes to This Policy</h2>
            <p className="text-gray-600 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of material changes via the
              Service or by email.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-navy mb-3">7. Contact</h2>
            <p className="text-gray-600 leading-relaxed">
              For privacy-related questions or requests, contact us through the support options on our website.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <Link href="/">
            <Button className="gap-2 bg-primary-deep hover:bg-primary-deep/90 text-white">
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
