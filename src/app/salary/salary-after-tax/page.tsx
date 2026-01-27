import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdPlaceholder from "@/components/AdPlaceholder";
import FAQSection from "@/components/FAQSection";
import SiloLinks from "@/components/SiloLinks";
import SalaryAfterTaxCalculator from "@/components/calculators/SalaryAfterTaxCalculator";

export const metadata: Metadata = {
  title: "Salary After Tax Calculator \u2013 Calculate Your Net Pay",
  description:
    "Use our free salary after tax calculator to find out your net take-home pay after income tax and social security deductions. Supports multiple countries with accurate tax brackets.",
};

const faqs = [
  {
    question: "What is salary after tax?",
    answer:
      "Salary after tax, also known as net pay or take-home pay, is the amount of money you receive after all mandatory deductions have been subtracted from your gross salary. These deductions typically include income tax and social security contributions. Your salary after tax represents the actual amount deposited into your bank account each pay period.",
  },
  {
    question: "How is income tax calculated on my salary?",
    answer:
      "Income tax is calculated using a progressive bracket system in most countries. This means different portions of your income are taxed at different rates. For example, your first portion of earnings may be taxed at a lower rate, while income above certain thresholds is taxed at progressively higher rates. Many countries also offer a personal allowance, which is a portion of your income that is tax-free.",
  },
  {
    question: "What is the difference between gross salary and net salary?",
    answer:
      "Gross salary is your total earnings before any deductions are applied. Net salary is what remains after subtracting income tax, social security contributions, and any other mandatory deductions. The difference between your gross and net salary represents the total amount paid in taxes and contributions. Your effective tax rate shows this difference as a percentage of your gross income.",
  },
  {
    question: "Does the calculator account for social security contributions?",
    answer:
      "Yes, this calculator includes employee-side social security contributions for each country. Social security rates vary significantly between countries. Some countries like Australia have no employee social security contribution, while others like France and the Netherlands have rates above 20%. The calculator applies each country's specific rate to give you an accurate net salary figure.",
  },
];

export default function SalaryAfterTaxPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Salary", href: "/salary" },
            { label: "Salary After Tax" },
          ]}
        />

        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          Salary After Tax Calculator
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Calculate your net take-home pay after income tax and social security
          deductions. Select your country and enter your gross annual salary to
          see a full breakdown.
        </p>

        <div className="mt-8">
          <SalaryAfterTaxCalculator />
        </div>

        <AdPlaceholder slot="below-calculator" className="mt-8" />

        <section className="mt-10 space-y-4 text-foreground leading-relaxed">
          <h2 className="text-2xl font-semibold">
            Understanding Your Salary After Tax
          </h2>
          <p>
            Knowing your salary after tax is essential for effective financial
            planning. Your gross salary, the figure quoted in your employment
            contract, differs significantly from the amount that actually lands
            in your bank account each month. The gap between these two numbers is
            made up of income tax and social security contributions, both of
            which are mandatory deductions handled by your employer before you
            receive your pay.
          </p>
          <p>
            Income tax systems in most countries use a progressive structure,
            meaning your earnings are divided into brackets, each taxed at a
            different rate. Lower portions of your income are taxed at a reduced
            rate, while earnings above certain thresholds attract higher rates.
            Many countries also provide a personal allowance, a portion of your
            income on which no tax is charged, reducing your overall tax burden.
          </p>
          <p>
            Social security contributions fund public programs such as pensions,
            healthcare, and unemployment insurance. The rates vary widely across
            countries, from zero in some jurisdictions to over 20% in others.
            When budgeting or comparing job offers across borders, it is critical
            to account for both income tax and social security to understand your
            true take-home pay. This calculator simplifies that process by
            applying each country&apos;s official tax brackets and contribution
            rates to your stated gross salary, delivering an instant and
            transparent breakdown of your net income.
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
