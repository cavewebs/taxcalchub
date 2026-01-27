import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CalculatorCard from "@/components/CalculatorCard";
import AdPlaceholder from "@/components/AdPlaceholder";
import FAQSection from "@/components/FAQSection";
import SiloLinks from "@/components/SiloLinks";
import Breadcrumbs from "@/components/Breadcrumbs";
import SalesTaxCalculator from "@/components/calculators/SalesTaxCalculator";
import { usStates } from "@/data/us-states";
import { formatPercent } from "@/lib/formatting";

export const metadata: Metadata = {
  title: "US Sales Tax Calculator \u2013 Calculate Sales Tax by State",
  description:
    "Free US sales tax calculator. Select any state to compute state and local sales tax on your purchases. Compare combined sales tax rates across all 50 states.",
};

const faqs = [
  {
    question: "How is US sales tax different from VAT?",
    answer:
      "Sales tax in the United States is applied only at the final point of sale to the consumer, whereas VAT is charged at every stage of production and distribution. Another key difference is that US sales tax rates and rules are set by individual states and localities rather than by the federal government, leading to significant variation across the country.",
  },
  {
    question: "Do all US states charge sales tax?",
    answer:
      "No. Five states \u2013 Alaska, Delaware, Montana, New Hampshire, and Oregon \u2013 do not impose a state-level sales tax. However, some localities within Alaska do levy local sales taxes. The remaining 45 states and the District of Columbia all charge sales tax at varying rates.",
  },
  {
    question: "What is local sales tax?",
    answer:
      "Local sales tax is an additional tax imposed by cities, counties, or special districts on top of the state sales tax. Local rates vary widely even within a single state, so the combined rate you pay depends on the exact location of the purchase. This calculator uses average local rates as a representative estimate.",
  },
  {
    question: "Are groceries and clothing taxed?",
    answer:
      "It depends on the state. Many states exempt groceries from sales tax or apply a reduced rate. Clothing is taxable in most states, but a few \u2013 such as New York, Pennsylvania, and New Jersey \u2013 exempt clothing purchases below a certain dollar threshold. Always check your specific state's rules for exemptions.",
  },
];

export default function SalesTaxPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tax", href: "/tax" },
            { label: "Sales Tax Calculator" },
          ]}
        />

        <h1 className="mb-6 text-3xl font-bold text-foreground">
          US Sales Tax Calculator
        </h1>

        <CalculatorCard>
          <SalesTaxCalculator />
        </CalculatorCard>

        <AdPlaceholder slot="below-calculator" className="mt-8" />

        <section className="mt-8 space-y-4 text-foreground leading-relaxed">
          <h2 className="text-2xl font-semibold">
            Understanding US Sales Tax
          </h2>
          <p>
            Unlike most countries that use a single national value-added tax, the
            United States relies on a patchwork of state and local sales taxes.
            There is no federal sales tax, so rates are determined entirely at
            the state and sub-state level. This means the amount of sales tax you
            pay can vary significantly depending on where you make a purchase.
          </p>
          <p>
            State sales tax rates range from 0% in states like Delaware and
            Oregon to 7.25% in California, the highest base state rate in the
            nation. On top of the state rate, cities and counties can add their
            own local taxes, pushing the combined rate even higher. Louisiana and
            Tennessee, for example, have some of the highest combined rates in
            the country once local taxes are factored in.
          </p>
          <p>
            Sales tax applies to most tangible personal property and some
            services, though exemptions vary by state. Groceries, prescription
            medications, and clothing are commonly exempt or taxed at a reduced
            rate. For online purchases, sellers are generally required to collect
            sales tax in any state where they have a significant economic
            presence following the 2018 Supreme Court decision in South Dakota v.
            Wayfair. Use this calculator to estimate the tax on any purchase in
            your state, and browse the table below for a quick comparison of
            rates across all 50 states.
          </p>
        </section>

        <AdPlaceholder slot="mid-content" className="mt-8" />

        <FAQSection faqs={faqs} />

        <section className="mt-8">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">
            Sales Tax Rates by State
          </h2>
          <div className="overflow-x-auto rounded-lg border border-card-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-card-border bg-muted">
                  <th className="px-4 py-3 text-left font-semibold text-foreground">
                    State
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-foreground">
                    State Rate
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-foreground">
                    Avg. Local Rate
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-foreground">
                    Combined Rate
                  </th>
                </tr>
              </thead>
              <tbody>
                {usStates.map((state, index) => (
                  <tr
                    key={state.slug}
                    className={`border-b border-card-border ${
                      index % 2 === 0 ? "bg-card" : "bg-muted/50"
                    }`}
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/tax/sales-tax/${state.slug}`}
                        className="font-medium text-primary hover:underline"
                      >
                        {state.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-right text-foreground">
                      {formatPercent(state.stateTaxRate)}
                    </td>
                    <td className="px-4 py-3 text-right text-muted-foreground">
                      {formatPercent(state.avgLocalRate)}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-foreground">
                      {formatPercent(state.combinedRate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <SiloLinks silo="tax" currentPath="/tax/sales-tax" />
      </main>
      <SiteFooter />
    </>
  );
}
