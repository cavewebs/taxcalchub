import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import { vatRates } from "@/data/vat-rates";
import { usStates } from "@/data/us-states";

export const metadata: Metadata = {
  title: "Tax Calculators \u2013 VAT & Sales Tax Tools",
  description:
    "Free online tax calculators for VAT and US sales tax. Calculate VAT inclusive and exclusive amounts, look up VAT rates by country, and compute sales tax by state.",
};

const categories = [
  {
    title: "VAT Calculator",
    href: "/tax/vat-calculator",
    description:
      "Add or remove VAT from any amount instantly. Supports any VAT rate and works for both VAT-inclusive and VAT-exclusive calculations.",
  },
  {
    title: "VAT Rates by Country",
    href: "/tax/vat-rates",
    description:
      "Browse standard and reduced VAT rates for countries worldwide. Find the correct rate for your jurisdiction and link through to country-specific calculators.",
  },
  {
    title: "US Sales Tax Calculator",
    href: "/tax/sales-tax",
    description:
      "Calculate sales tax for any US state including state-level and average local tax rates. Compare combined rates across all 50 states.",
  },
];

const popularCountries = vatRates.slice(0, 8);
const popularStates = usStates.filter((s) =>
  ["california", "texas", "new-york", "florida", "illinois", "washington"].includes(
    s.slug
  )
);

export default function TaxSiloIndex() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tax Calculators" },
          ]}
        />

        <h1 className="mb-2 text-3xl font-bold text-foreground">
          Tax Calculators
        </h1>
        <p className="mb-8 text-lg text-muted-foreground">
          Free online tools for calculating VAT, GST, and US sales tax. Choose a
          calculator below to get started.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="group rounded-xl border border-card-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <h2 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {cat.title}
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {cat.description}
              </p>
            </Link>
          ))}
        </div>

        <section className="mt-12">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">
            Popular VAT Rates
          </h2>
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
            {popularCountries.map((country) => (
              <Link
                key={country.slug}
                href={`/tax/vat-rates/${country.slug}`}
                className="rounded-lg border border-card-border px-4 py-3 text-sm hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">
                  {country.name}
                </span>
                <span className="ml-2 text-muted-foreground">{country.standardRate}%</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">
            Popular State Sales Tax Rates
          </h2>
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
            {popularStates.map((state) => (
              <Link
                key={state.slug}
                href={`/tax/sales-tax/${state.slug}`}
                className="rounded-lg border border-card-border px-4 py-3 text-sm hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">
                  {state.name}
                </span>
                <span className="ml-2 text-muted-foreground">
                  {state.combinedRate}% combined
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
