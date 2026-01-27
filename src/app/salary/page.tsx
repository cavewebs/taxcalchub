import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { countries } from "@/data/countries";

export const metadata: Metadata = {
  title: "Salary Calculators - Calculate Your Take Home Pay",
  description:
    "Free salary calculators to help you understand your take-home pay, convert annual salary to hourly rates, and calculate salary after tax for multiple countries.",
};

const calculators = [
  {
    href: "/salary/salary-after-tax",
    title: "Salary After Tax Calculator",
    description:
      "Calculate your net salary after income tax and social security deductions. See exactly how much of your gross salary you take home each year across multiple countries.",
  },
  {
    href: "/salary/take-home-pay",
    title: "Take Home Pay Calculator",
    description:
      "Break down your annual salary into weekly, bi-weekly, or monthly take-home pay. Understand your paycheck after all deductions are applied for your chosen pay frequency.",
  },
  {
    href: "/salary/salary-to-hourly",
    title: "Salary to Hourly Converter",
    description:
      "Convert your annual salary into an hourly rate, daily rate, weekly pay, and monthly pay. Useful for comparing job offers or understanding the true value of your time.",
  },
];

export default function SalaryIndexPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          Salary Calculators
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Free tools to calculate your take-home pay, convert salary figures, and
          understand your income after tax deductions.
        </p>

        <section className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {calculators.map((calc) => (
            <Link
              key={calc.href}
              href={calc.href}
              className="group rounded-xl border border-card-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {calc.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {calc.description}
              </p>
            </Link>
          ))}
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-foreground">
            Salary After Tax by Country
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Calculate your salary after tax for a specific country with localized
            tax brackets and social security rates.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {countries.map((country) => (
              <Link
                key={country.slug}
                href={`/salary/salary-after-tax/${country.slug}`}
                className="rounded-lg border border-card-border px-4 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                {country.name} Salary After Tax
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
