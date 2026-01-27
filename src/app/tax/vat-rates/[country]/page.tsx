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
import VATCalculator from "@/components/calculators/VATCalculator";
import { vatRates } from "@/data/vat-rates";
import { formatPercent } from "@/lib/formatting";

interface PageProps {
  params: Promise<{ country: string }>;
}

export async function generateStaticParams() {
  return vatRates.map((c) => ({ country: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country } = await params;
  const data = vatRates.find((c) => c.slug === country);
  if (!data) return {};

  return {
    title: `${data.name} VAT Calculator \u2013 ${formatPercent(data.standardRate)} VAT Rate`,
    description: `Calculate VAT for ${data.name} with the standard rate of ${formatPercent(data.standardRate)}. Add or remove ${data.name} VAT instantly with our free calculator.`,
  };
}

export default async function CountryVATPage({ params }: PageProps) {
  const { country } = await params;
  const data = vatRates.find((c) => c.slug === country);

  if (!data) notFound();

  const otherCountries = vatRates.filter((c) => c.slug !== data.slug);

  const faqs = [
    {
      question: `What is the standard VAT rate in ${data.name}?`,
      answer: `The standard VAT rate in ${data.name} is ${formatPercent(data.standardRate)}. This rate applies to most goods and services unless a reduced rate or exemption is specified.`,
    },
    {
      question: `Does ${data.name} have reduced VAT rates?`,
      answer:
        data.reducedRates.length > 0
          ? `Yes, ${data.name} applies reduced VAT rates of ${data.reducedRates.map((r) => formatPercent(r)).join(", ")} to certain categories of goods and services such as food, medicine, or public transport.`
          : `${data.name} does not currently apply reduced VAT rates. The standard rate of ${formatPercent(data.standardRate)} applies uniformly to taxable goods and services.`,
    },
    {
      question: `How do I add VAT to a price in ${data.name}?`,
      answer: `To add VAT at ${formatPercent(data.standardRate)}, multiply the net amount by ${(data.standardRate / 100).toFixed(4)} and add the result to the original price. For example, on a ${data.currencySymbol}100 item the VAT would be ${data.currencySymbol}${(100 * data.standardRate / 100).toFixed(2)}, giving a gross price of ${data.currencySymbol}${(100 + 100 * data.standardRate / 100).toFixed(2)}.`,
    },
    {
      question: `How do I remove VAT from a price in ${data.name}?`,
      answer: `To remove VAT at ${formatPercent(data.standardRate)} from a gross price, divide the amount by ${(1 + data.standardRate / 100).toFixed(4)}. The result is the net price before VAT. The difference between the gross and net amounts is the VAT component.`,
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
            { label: "VAT Rates", href: "/tax/vat-rates" },
            { label: data.name },
          ]}
        />

        <h1 className="mb-2 text-3xl font-bold text-foreground">
          {data.name} VAT Calculator
        </h1>
        <p className="mb-8 text-lg text-muted-foreground">
          Calculate VAT for {data.name} using the standard rate of{" "}
          {formatPercent(data.standardRate)}.
        </p>

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-card-border bg-card p-5 text-center">
            <p className="text-sm text-muted-foreground">Standard Rate</p>
            <p className="mt-1 text-3xl font-bold text-primary">
              {formatPercent(data.standardRate)}
            </p>
          </div>
          <div className="rounded-xl border border-card-border bg-card p-5 text-center">
            <p className="text-sm text-muted-foreground">Reduced Rates</p>
            <p className="mt-1 text-3xl font-bold text-foreground">
              {data.reducedRates.length > 0
                ? data.reducedRates.map((r) => formatPercent(r)).join(", ")
                : "\u2014"}
            </p>
          </div>
          <div className="rounded-xl border border-card-border bg-card p-5 text-center">
            <p className="text-sm text-muted-foreground">Currency</p>
            <p className="mt-1 text-3xl font-bold text-foreground">
              {data.currency} ({data.currencySymbol})
            </p>
          </div>
        </div>

        <CalculatorCard>
          <VATCalculator
            defaultRate={data.standardRate}
            currencySymbol={data.currencySymbol}
          />
        </CalculatorCard>

        <AdPlaceholder slot="below-calculator" className="mt-8" />

        <section className="mt-8 space-y-4 text-foreground leading-relaxed">
          <h2 className="text-2xl font-semibold">
            VAT in {data.name}
          </h2>
          <p>
            {data.name} applies a standard VAT rate of{" "}
            {formatPercent(data.standardRate)} on most taxable goods and
            services.{" "}
            {data.reducedRates.length > 0
              ? `Reduced rates of ${data.reducedRates.map((r) => formatPercent(r)).join(" and ")} are available for specific categories such as essential goods, cultural services, and public transportation.`
              : "There are currently no reduced rates; the standard rate applies uniformly to all taxable supplies."}{" "}
            Businesses operating in {data.name} that exceed the VAT registration
            threshold must charge VAT on their sales and file periodic returns
            with the tax authority.
          </p>
          <p>
            When invoicing in {data.currency}, remember to clearly show the net
            amount, the VAT amount, and the gross total. This calculator
            pre-fills the {formatPercent(data.standardRate)} rate so you can
            quickly verify amounts on invoices and receipts without manual
            arithmetic.
          </p>
        </section>

        <FAQSection faqs={faqs} />

        <section className="mt-8">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            VAT Rates in Other Countries
          </h2>
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
            {otherCountries.map((c) => (
              <Link
                key={c.slug}
                href={`/tax/vat-rates/${c.slug}`}
                className="rounded-lg border border-card-border px-4 py-3 text-sm hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">{c.name}</span>
                <span className="ml-2 text-muted-foreground">
                  {formatPercent(c.standardRate)}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <SiloLinks silo="tax" currentPath={`/tax/vat-rates/${data.slug}`} />
      </main>
      <SiteFooter />
    </>
  );
}
