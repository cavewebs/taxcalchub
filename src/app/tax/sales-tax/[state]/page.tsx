import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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

interface PageProps {
  params: Promise<{ state: string }>;
}

export async function generateStaticParams() {
  return usStates.map((s) => ({ state: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state } = await params;
  const data = usStates.find((s) => s.slug === state);
  if (!data) return {};

  return {
    title: `${data.name} Sales Tax Calculator \u2013 ${formatPercent(data.combinedRate)} Combined Rate`,
    description: `Calculate sales tax in ${data.name} (${data.abbreviation}). State rate: ${formatPercent(data.stateTaxRate)}, average local rate: ${formatPercent(data.avgLocalRate)}, combined rate: ${formatPercent(data.combinedRate)}.`,
  };
}

export default async function StateSalesTaxPage({ params }: PageProps) {
  const { state } = await params;
  const data = usStates.find((s) => s.slug === state);

  if (!data) notFound();

  const hasNoStateTax = data.stateTaxRate === 0 && data.avgLocalRate === 0;
  const otherStates = usStates.filter((s) => s.slug !== data.slug);

  const faqs = [
    {
      question: `What is the sales tax rate in ${data.name}?`,
      answer: hasNoStateTax
        ? `${data.name} does not impose a state-level sales tax. ${data.avgLocalRate > 0 ? `However, some localities within ${data.name} may charge local sales taxes averaging ${formatPercent(data.avgLocalRate)}.` : "There are also no local sales taxes, making it one of the few states with no sales tax at all."}`
        : `The state sales tax rate in ${data.name} is ${formatPercent(data.stateTaxRate)}. When combined with the average local rate of ${formatPercent(data.avgLocalRate)}, the typical combined sales tax rate is ${formatPercent(data.combinedRate)}.`,
    },
    {
      question: `Does ${data.name} have local sales taxes?`,
      answer:
        data.avgLocalRate > 0
          ? `Yes, localities in ${data.name} can impose additional sales taxes. The average local rate is ${formatPercent(data.avgLocalRate)}, but the actual rate depends on the specific city or county where the purchase is made. Combined with the state rate of ${formatPercent(data.stateTaxRate)}, the average total is ${formatPercent(data.combinedRate)}.`
          : `${data.name} does not have local sales taxes. The state rate of ${formatPercent(data.stateTaxRate)} is the only sales tax applied to purchases statewide.`,
    },
    {
      question: `What items are exempt from sales tax in ${data.name}?`,
      answer: hasNoStateTax
        ? `Since ${data.name} does not impose a general sales tax, exemptions are not applicable in the traditional sense. Specific excise taxes may still apply to certain goods.`
        : `Sales tax exemptions in ${data.name} vary but commonly include prescription medications and certain medical devices. Many states also exempt or reduce the rate on groceries, clothing, and other essential items. Check with the ${data.name} Department of Revenue for a complete list of exempt items.`,
    },
    {
      question: `How do I file sales tax in ${data.name}?`,
      answer: hasNoStateTax
        ? `Because ${data.name} does not have a state sales tax, there is no state-level sales tax filing requirement. Businesses should verify whether any local jurisdictions require separate filings.`
        : `Businesses registered to collect sales tax in ${data.name} must file returns with the state's Department of Revenue on a monthly, quarterly, or annual basis depending on the volume of sales. Returns typically include the total taxable sales, the tax collected, and any allowable deductions or credits.`,
    },
  ];

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tax", href: "/tax" },
            { label: "Sales Tax", href: "/tax/sales-tax" },
            { label: data.name },
          ]}
        />

        <h1 className="mb-2 text-3xl font-bold text-foreground">
          {data.name} Sales Tax Calculator
        </h1>
        <p className="mb-8 text-lg text-muted-foreground">
          Calculate sales tax for purchases in {data.name} ({data.abbreviation}).
        </p>

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-card-border bg-card p-5 text-center">
            <p className="text-sm text-muted-foreground">State Tax Rate</p>
            <p className="mt-1 text-3xl font-bold text-foreground">
              {formatPercent(data.stateTaxRate)}
            </p>
          </div>
          <div className="rounded-xl border border-card-border bg-card p-5 text-center">
            <p className="text-sm text-muted-foreground">Avg. Local Rate</p>
            <p className="mt-1 text-3xl font-bold text-foreground">
              {formatPercent(data.avgLocalRate)}
            </p>
          </div>
          <div className="rounded-xl border border-card-border bg-card p-5 text-center">
            <p className="text-sm text-muted-foreground">Combined Rate</p>
            <p className="mt-1 text-3xl font-bold text-primary">
              {formatPercent(data.combinedRate)}
            </p>
          </div>
        </div>

        <CalculatorCard>
          <SalesTaxCalculator defaultStateSlug={data.slug} />
        </CalculatorCard>

        <AdPlaceholder slot="below-calculator" className="mt-8" />

        <section className="mt-8 space-y-4 text-foreground leading-relaxed">
          <h2 className="text-2xl font-semibold">
            Sales Tax in {data.name}
          </h2>
          {hasNoStateTax ? (
            <>
              <p>
                {data.name} is one of the few states in the US that does not
                impose a general state-level sales tax.{" "}
                {data.avgLocalRate > 0
                  ? `However, certain local jurisdictions within ${data.name} do levy their own sales taxes, with rates averaging around ${formatPercent(data.avgLocalRate)}. This means consumers may still encounter sales tax depending on where they shop.`
                  : `There are also no local sales taxes, making ${data.name} one of the most tax-friendly states in the country for retail purchases.`}
              </p>
              <p>
                While the absence of a sales tax is beneficial for consumers, the
                state makes up for the lost revenue through other taxes and fees.
                Businesses operating in {data.name} should still verify their
                obligations regarding any applicable local taxes or industry-specific
                excise taxes.
              </p>
            </>
          ) : (
            <>
              <p>
                {data.name} levies a state sales tax rate of{" "}
                {formatPercent(data.stateTaxRate)} on most retail purchases of
                tangible personal property and select services.{" "}
                {data.avgLocalRate > 0
                  ? `Local jurisdictions may add their own taxes, bringing the average combined rate to ${formatPercent(data.combinedRate)}. Actual local rates vary by city and county, so the total tax on a given purchase depends on where the transaction takes place.`
                  : `${data.name} does not permit local sales taxes, so the state rate of ${formatPercent(data.stateTaxRate)} is the only sales tax consumers pay.`}
              </p>
              <p>
                Common exemptions in many states include groceries, prescription
                drugs, and certain medical equipment, though specific exemptions
                vary. Businesses selling taxable goods or services in {data.name}{" "}
                must register for a sales tax permit and collect tax at the point
                of sale. Online sellers with sufficient economic nexus in{" "}
                {data.name} are also required to collect and remit sales tax.
              </p>
            </>
          )}
        </section>

        <FAQSection faqs={faqs} />

        <section className="mt-8">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Sales Tax in Other States
          </h2>
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
            {otherStates.map((s) => (
              <Link
                key={s.slug}
                href={`/tax/sales-tax/${s.slug}`}
                className="rounded-lg border border-card-border px-4 py-3 text-sm hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">{s.name}</span>
                <span className="ml-2 text-muted-foreground">
                  {formatPercent(s.combinedRate)}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <SiloLinks silo="tax" currentPath={`/tax/sales-tax/${data.slug}`} />
      </main>
      <SiteFooter />
    </>
  );
}
