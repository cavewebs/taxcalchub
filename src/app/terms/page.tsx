import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "TaxCalBase terms of use and disclaimer.",
};

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Terms of Use</h1>
        <div className="prose prose-gray max-w-none space-y-4 text-gray-700">
          <p>Last updated: January 2025</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8">
            Disclaimer
          </h2>
          <p>
            The calculators and information provided on TaxCalBase are for
            general informational purposes only. They should not be considered
            financial, tax, or legal advice. While we strive for accuracy, tax
            laws and rates change frequently, and individual circumstances vary.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8">
            Accuracy
          </h2>
          <p>
            We make reasonable efforts to keep calculator data current and
            accurate, but we do not guarantee the completeness or accuracy of any
            information on this site. Always consult a qualified tax professional
            or financial advisor for advice specific to your situation.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8">
            Limitation of Liability
          </h2>
          <p>
            TaxCalBase shall not be liable for any losses or damages arising from
            the use of information or calculators provided on this website. Users
            rely on the results at their own risk.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8">
            Intellectual Property
          </h2>
          <p>
            All content, design, and code on TaxCalBase is the property of the
            site owner. Unauthorized reproduction or distribution is prohibited.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8">
            Changes to Terms
          </h2>
          <p>
            We reserve the right to modify these terms at any time. Continued
            use of the site constitutes acceptance of updated terms.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
