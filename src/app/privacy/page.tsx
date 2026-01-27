import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "TaxCalBase privacy policy. Learn how we handle your data.",
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <div className="prose prose-gray max-w-none space-y-4 text-gray-700">
          <p>Last updated: January 2025</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8">
            Information We Collect
          </h2>
          <p>
            TaxCalBase does not collect personal information. All calculations
            are performed entirely in your browser. No calculation inputs or
            results are transmitted to our servers or stored in any database.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8">
            Analytics
          </h2>
          <p>
            We may use privacy-respecting analytics tools to understand how
            visitors use our site. This data is aggregated and does not identify
            individual users.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8">
            Advertising
          </h2>
          <p>
            This site may display advertisements from third-party ad networks.
            These networks may use cookies to serve relevant ads. You can manage
            cookie preferences through your browser settings.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8">Cookies</h2>
          <p>
            TaxCalBase itself does not set cookies. Third-party services such as
            analytics or advertising providers may set their own cookies. Please
            refer to their respective privacy policies for details.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8">Contact</h2>
          <p>
            If you have questions about this privacy policy, please contact us
            at privacy@taxcalbase.com.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
