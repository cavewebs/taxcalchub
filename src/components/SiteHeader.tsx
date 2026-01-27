import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6">
        <Link href="/" className="inline-block">
          <span className="text-xl font-bold text-foreground">TaxCalcBase</span>
        </Link>
        <p className="mt-0.5 text-sm text-muted-foreground">Free Financial Calculators</p>
      </div>
    </header>
  );
}
