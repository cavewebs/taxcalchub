import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AdPlaceholder from "@/components/AdPlaceholder";

const silos = [
  {
    title: "Salary Calculators",
    href: "/salary",
    description:
      "Calculate your take-home pay, convert salary to hourly rates, and see how much you earn after tax in any country.",
    tools: [
      { label: "Salary After Tax", href: "/salary/salary-after-tax" },
      { label: "Take Home Pay", href: "/salary/take-home-pay" },
      { label: "Salary to Hourly", href: "/salary/salary-to-hourly" },
    ],
  },
  {
    title: "Tax Calculators",
    href: "/tax",
    description:
      "Add or remove VAT, look up VAT rates by country, and calculate US sales tax for any state.",
    tools: [
      { label: "VAT Calculator", href: "/tax/vat-calculator" },
      { label: "VAT Rates by Country", href: "/tax/vat-rates" },
      { label: "US Sales Tax", href: "/tax/sales-tax" },
    ],
  },
  {
    title: "Freelance Calculators",
    href: "/freelance",
    description:
      "Find your ideal freelance rate, convert day rates to salary equivalents, and calculate annual earnings from hourly rates.",
    tools: [
      {
        label: "Freelance Rate Calculator",
        href: "/freelance/freelance-rate-calculator",
      },
      { label: "Day Rate to Salary", href: "/freelance/day-rate-to-salary" },
      { label: "Hourly to Annual", href: "/freelance/hourly-to-annual" },
    ],
  },
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Free Financial Calculators
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Instant salary, tax, and freelance calculations. No sign-up
            required. Accurate results for professionals, freelancers, and
            businesses worldwide.
          </p>
        </section>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {silos.map((silo) => (
            <div
              key={silo.href}
              className="border border-card-border rounded-xl p-6 bg-card hover:shadow-lg transition-shadow"
            >
              <Link href={silo.href}>
                <h2 className="text-xl font-bold mb-2 text-primary hover:text-primary-hover">
                  {silo.title}
                </h2>
              </Link>
              <p className="text-gray-600 text-sm mb-4">{silo.description}</p>
              <ul className="space-y-2">
                {silo.tools.map((tool) => (
                  <li key={tool.href}>
                    <Link
                      href={tool.href}
                      className="text-sm text-primary hover:text-primary-hover hover:underline"
                    >
                      {tool.label} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <AdPlaceholder slot="below-calculator" />

        <section className="mt-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Why Use TaxCalcBase?</h2>
          <p className="text-gray-700 mb-4">
            TaxCalcBase provides free, accurate financial calculators designed for
            employees, freelancers, and small business owners. Whether you need
            to calculate your salary after tax, work out VAT on an invoice, or
            determine the right freelance rate for your skills, our tools
            deliver instant results without the need for spreadsheets or complex
            formulas.
          </p>
          <p className="text-gray-700 mb-4">
            Every calculator uses up-to-date tax brackets, VAT rates, and
            industry benchmarks. Results are calculated entirely in your browser
            for maximum speed and privacy. No data is stored or transmitted to
            any server.
          </p>
          <p className="text-gray-700">
            Built for speed and simplicity, TaxCalcBase works on any device.
            Bookmark the calculators you use most and come back whenever you need
            a quick financial answer.
          </p>
        </section>

        <AdPlaceholder slot="mid-content" className="mt-8" />
      </main>
      <SiteFooter />
    </>
  );
}
