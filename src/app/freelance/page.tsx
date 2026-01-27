import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import { freelanceRoles } from "@/data/freelance-roles";
import { formatCurrency } from "@/lib/formatting";

export const metadata: Metadata = {
  title: "Freelance Calculators – Rate & Income Tools",
  description:
    "Free freelance calculators to find your ideal hourly rate, convert day rates to salary, and calculate annual income from hourly pay. Tools built for freelancers and contractors.",
};

const calculators = [
  {
    href: "/freelance/freelance-rate-calculator",
    title: "Freelance Rate Calculator",
    description:
      "Determine the hourly and day rate you need to charge to meet your annual income goals, factoring in billable hours, time off, and business overhead costs.",
  },
  {
    href: "/freelance/day-rate-to-salary",
    title: "Day Rate to Salary Calculator",
    description:
      "Convert a contractor day rate into its equivalent annual, monthly, and weekly salary so you can compare freelance earnings with permanent employment offers.",
  },
  {
    href: "/freelance/hourly-to-annual",
    title: "Hourly to Annual Salary Calculator",
    description:
      "Translate an hourly wage into a full-year salary figure, including monthly, weekly, and daily breakdowns for easy comparison across pay structures.",
  },
];

export default function FreelancePage() {
  return (
    <>
      <SiteHeader />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Freelance" },
          ]}
        />

        <h1 className="text-3xl font-bold text-foreground mb-4">
          Freelance Calculators
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Whether you are setting your rates for the first time or evaluating a
          contract offer, these calculators help you understand exactly what you
          need to earn as a freelancer or contractor.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          {calculators.map((calc) => (
            <Link
              key={calc.href}
              href={calc.href}
              className="rounded-xl border border-card-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-lg font-semibold text-foreground mb-2">
                {calc.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {calc.description}
              </p>
            </Link>
          ))}
        </div>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Popular Freelance Roles
          </h2>
          <p className="text-muted-foreground mb-4">
            Explore average rates and use a pre-configured calculator for
            specific freelance roles.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {freelanceRoles.map((role) => (
              <Link
                key={role.slug}
                href={`/freelance/freelance-rate/${role.slug}`}
                className="flex items-center justify-between rounded-lg border border-card-border bg-card px-4 py-3 hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">{role.name}</span>
                <span className="text-sm text-muted-foreground">
                  {formatCurrency(role.avgHourlyRate)}/hr
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
