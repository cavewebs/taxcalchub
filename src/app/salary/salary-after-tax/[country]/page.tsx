import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdPlaceholder from "@/components/AdPlaceholder";
import FAQSection from "@/components/FAQSection";
import SiloLinks from "@/components/SiloLinks";
import SalaryAfterTaxCalculator from "@/components/calculators/SalaryAfterTaxCalculator";
import { countries } from "@/data/countries";

interface PageProps {
  params: Promise<{ country: string }>;
}

export function generateStaticParams() {
  return countries.map((c) => ({ country: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country: slug } = await params;
  const country = countries.find((c) => c.slug === slug);
  if (!country) return {};

  return {
    title: `Salary After Tax Calculator \u2013 ${country.name}`,
    description: `Calculate your salary after tax in ${country.name}. See your net take-home pay in ${country.currency} after income tax and ${country.socialSecurityLabel} deductions.`,
  };
}

export default async function CountrySalaryAfterTaxPage({ params }: PageProps) {
  const { country: slug } = await params;
  const country = countries.find((c) => c.slug === slug);

  if (!country) {
    notFound();
  }

  const faqs = [
    {
      question: `How is income tax calculated in ${country.name}?`,
      answer: `Income tax in ${country.name} is calculated using a progressive bracket system. Your taxable income (after the personal allowance of ${country.currencySymbol}${country.personalAllowance.toLocaleString()}) is divided into brackets, each taxed at a different marginal rate. The calculator above applies ${country.name}'s official tax brackets to determine your total income tax liability.`,
    },
    {
      question: `What is the personal allowance in ${country.name}?`,
      answer: `The personal allowance in ${country.name} is ${country.currencySymbol}${country.personalAllowance.toLocaleString()}. This is the amount of income you can earn before income tax begins to apply. Income earned above this threshold is subject to tax at the applicable marginal rates.`,
    },
    {
      question: `What are the ${country.socialSecurityLabel} contributions in ${country.name}?`,
      answer: `${country.socialSecurityLabel} contributions in ${country.name} are calculated using official thresholds and rates that may vary at different income levels. These contributions fund public programs such as pensions, healthcare, and unemployment insurance. The calculator above applies the correct bracket-based rates to determine your total ${country.socialSecurityLabel} liability.`,
    },
    {
      question: `How much will I take home on a ${country.currencySymbol}50,000 salary in ${country.name}?`,
      answer: `Use the calculator above to see an exact breakdown. Enter ${country.currencySymbol}50,000 as your annual salary, and the calculator will apply ${country.name}'s income tax brackets and ${country.socialSecurityLabel} rate to show your net take-home pay, total deductions, and effective tax rate.`,
    },
  ];

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Salary", href: "/salary" },
            { label: "Salary After Tax", href: "/salary/salary-after-tax" },
            { label: country.name },
          ]}
        />

        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          Salary After Tax Calculator &ndash; {country.name}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Calculate your net take-home pay in {country.name} after income tax
          and {country.socialSecurityLabel} deductions. Enter your gross annual salary in{" "}
          {country.currency} to see a full breakdown.
        </p>

        <div className="mt-8">
          <SalaryAfterTaxCalculator defaultCountrySlug={country.slug} />
        </div>

        <AdPlaceholder slot="below-calculator" className="mt-8" />

        <section className="mt-10 space-y-4 text-foreground leading-relaxed">
          <h2 className="text-2xl font-semibold">
            Understanding Your Take-Home Pay in {country.name}
          </h2>
          <p>
            Working in {country.name} means your gross salary is subject to the
            country&apos;s income tax system and {country.socialSecurityLabel} contributions
            before it reaches your bank account. {country.name} uses a
            progressive income tax structure where higher portions of your
            earnings are taxed at increased rates. Understanding these
            deductions is the first step toward effective financial planning and
            accurate budgeting.
          </p>
          <p>
            {country.name} provides a personal allowance of{" "}
            {country.currencySymbol}
            {country.personalAllowance.toLocaleString()}, meaning income below
            this threshold is not subject to income tax. Beyond the personal
            allowance, your earnings are taxed according to the country&apos;s
            official tax brackets. In addition, {country.socialSecurityLabel}
            {" "}contributions are deducted from your gross salary based on
            official thresholds and rates to fund public services such as
            pensions and healthcare.
          </p>
          <p>
            When evaluating a job offer or planning household finances in{" "}
            {country.name}, always base your budget on your net salary rather
            than your gross figure. The difference between gross and net can be
            substantial, especially at higher income levels where marginal tax
            rates increase. This calculator gives you an instant and transparent
            view of your salary after tax in {country.currency}, including
            income tax, {country.socialSecurityLabel}, and your effective tax rate.
          </p>
        </section>

        <AdPlaceholder slot="mid-content" className="mt-8" />

        <FAQSection faqs={faqs} />

        <SiloLinks silo="salary" currentPath="/salary/salary-after-tax" />
      </main>
      <SiteFooter />
    </>
  );
}
