import Link from "next/link";

interface SiloPage {
  href: string;
  label: string;
}

const SILO_MAP: Record<string, SiloPage[]> = {
  salary: [
    { href: "/salary/salary-after-tax", label: "Salary After Tax" },
    { href: "/salary/take-home-pay", label: "Take Home Pay Calculator" },
    { href: "/salary/salary-to-hourly", label: "Salary to Hourly Converter" },
  ],
  tax: [
    { href: "/tax/vat-calculator", label: "VAT Calculator" },
    { href: "/tax/vat-rates", label: "VAT Rates by Country" },
    { href: "/tax/sales-tax", label: "US Sales Tax Calculator" },
  ],
  freelance: [
    { href: "/freelance/freelance-rate-calculator", label: "Freelance Rate Calculator" },
    { href: "/freelance/day-rate-to-salary", label: "Day Rate to Salary" },
    { href: "/freelance/hourly-to-annual", label: "Hourly to Annual Salary" },
  ],
};

interface SiloLinksProps {
  silo: "salary" | "tax" | "freelance";
  currentPath: string;
}

export default function SiloLinks({ silo, currentPath }: SiloLinksProps) {
  const pages = SILO_MAP[silo];

  if (!pages) return null;

  return (
    <nav className="mt-8">
      <h2 className="mb-3 text-lg font-semibold text-foreground">
        Related Calculators
      </h2>
      <ul className="space-y-1">
        {pages.map((page) => {
          const isCurrent = currentPath === page.href;
          return (
            <li key={page.href}>
              {isCurrent ? (
                <span className="inline-block rounded px-3 py-1.5 text-sm font-medium bg-primary text-background">
                  {page.label}
                </span>
              ) : (
                <Link
                  href={page.href}
                  className="inline-block rounded px-3 py-1.5 text-sm text-primary hover:bg-muted transition-colors"
                >
                  {page.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
