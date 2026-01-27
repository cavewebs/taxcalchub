import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AdPlaceholder from "@/components/AdPlaceholder";
import FAQSection from "@/components/FAQSection";
import SiloLinks from "@/components/SiloLinks";
import Breadcrumbs from "@/components/Breadcrumbs";
import { vatRates } from "@/data/vat-rates";
import { formatPercent } from "@/lib/formatting";

export const metadata: Metadata = {
  title: "VAT Rates by Country \u2013 Complete Global VAT Rate List",
  description:
    "Browse up-to-date VAT and GST rates for countries worldwide. View standard and reduced rates, and link to country-specific VAT calculators.",
};

const faqs = [
  {
    question: "What is the difference between VAT and GST?",
    answer:
      "VAT and GST are both consumption taxes applied to goods and services. The main difference is in name only \u2013 countries like the UK and EU members call it VAT, while countries like Australia, Canada, India, and New Zealand use the term GST. The underlying mechanism of taxing value added at each production stage is the same.",
  },
  {
    question: "Why do VAT rates differ between countries?",
    answer:
      "Each country sets its own VAT rate based on fiscal policy, government revenue needs, and economic conditions. Higher rates generate more tax revenue but can reduce consumer spending. Many countries also apply reduced rates to essential goods like food, medicine, and public transport to lessen the burden on lower-income households.",
  },
  {
    question: "What are reduced VAT rates?",
    answer:
      "Reduced VAT rates are lower rates applied to specific categories of goods and services, such as food, books, medical supplies, or public transportation. Countries use reduced rates to make essentials more affordable. Some items may even be zero-rated, meaning VAT applies at 0%, or fully exempt from VAT altogether.",
  },
  {
    question: "How often do VAT rates change?",
    answer:
      "VAT rates can change whenever a government decides to adjust its tax policy, though major changes are relatively infrequent. Temporary rate reductions sometimes occur during economic downturns. It is a good practice to check the current rate with your national tax authority before filing returns or issuing invoices.",
  },
];

export default function VATRatesPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tax", href: "/tax" },
            { label: "VAT Rates by Country" },
          ]}
        />

        <h1 className="mb-2 text-3xl font-bold text-foreground">
          VAT Rates by Country
        </h1>
        <p className="mb-8 text-lg text-muted-foreground">
          A complete reference of standard and reduced VAT/GST rates worldwide.
          Click any country to use its pre-configured VAT calculator.
        </p>

        <div className="overflow-x-auto rounded-lg border border-card-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-card-border bg-muted">
                <th className="px-4 py-3 text-left font-semibold text-foreground">
                  Country
                </th>
                <th className="px-4 py-3 text-right font-semibold text-foreground">
                  Standard Rate
                </th>
                <th className="px-4 py-3 text-right font-semibold text-foreground">
                  Reduced Rates
                </th>
              </tr>
            </thead>
            <tbody>
              {vatRates.map((country, index) => (
                <tr
                  key={country.slug}
                  className={`border-b border-card-border ${
                    index % 2 === 0 ? "bg-card" : "bg-muted/50"
                  }`}
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/tax/vat-rates/${country.slug}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {country.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-foreground">
                    {formatPercent(country.standardRate)}
                  </td>
                  <td className="px-4 py-3 text-right text-muted-foreground">
                    {country.reducedRates.length > 0
                      ? country.reducedRates.map((r) => formatPercent(r)).join(", ")
                      : "\u2014"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <AdPlaceholder slot="below-table" className="mt-8" />

        <section className="mt-8 space-y-4 text-foreground leading-relaxed">
          <h2 className="text-2xl font-semibold">
            Understanding Global VAT Rates
          </h2>
          <p>
            Value Added Tax is the most widespread form of consumption tax in the
            world, used by more than 170 countries to generate government
            revenue. Standard rates typically range from 5% in low-tax
            jurisdictions such as Canada and Japan to 25% or more in
            Scandinavian nations like Sweden, Denmark, and Norway. The European
            Union requires member states to maintain a minimum standard rate of
            15%, though most set theirs considerably higher.
          </p>
          <p>
            Many countries apply one or more reduced rates to categories of goods
            deemed essential. Groceries, pharmaceuticals, books, and public
            transportation often qualify for lower rates or zero-rating, meaning
            VAT is technically applied at 0% but the seller can still reclaim
            input VAT. Certain services such as healthcare and education may be
            exempt from VAT entirely, which means no VAT is charged and no input
            VAT can be recovered.
          </p>
          <p>
            For businesses operating internationally, keeping track of the
            correct VAT rate for each jurisdiction is critical. Incorrect
            invoicing can lead to penalties, delayed refunds, or compliance
            issues. This reference table is updated to reflect current standard
            and reduced rates so you can quickly verify the rate that applies to
            your transactions. Click on any country to access a dedicated VAT
            calculator pre-configured with that nation&apos;s standard rate.
          </p>
        </section>

        <FAQSection faqs={faqs} />

        <SiloLinks silo="tax" currentPath="/tax/vat-rates" />
      </main>
      <SiteFooter />
    </>
  );
}
