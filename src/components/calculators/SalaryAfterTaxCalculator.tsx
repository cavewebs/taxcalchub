"use client";

import { useState } from "react";
import { countries } from "@/data/countries";
import { calculateTaxFromBrackets, calculateSocialSecurity, getMarginalRate } from "@/lib/calculators";
import { formatCurrency, formatPercent } from "@/lib/formatting";
import CalculatorCard from "@/components/CalculatorCard";

interface SalaryAfterTaxCalculatorProps {
  defaultCountrySlug?: string;
}

export default function SalaryAfterTaxCalculator({
  defaultCountrySlug,
}: SalaryAfterTaxCalculatorProps) {
  const initialCountry =
    countries.find((c) => c.slug === defaultCountrySlug) ?? countries[0];

  const [salary, setSalary] = useState<string>("50000");
  const [selectedSlug, setSelectedSlug] = useState<string>(
    initialCountry.slug
  );
  const [results, setResults] = useState<{
    gross: number;
    personalAllowance: number;
    incomeTax: number;
    socialSecurity: number;
    net: number;
    taxRate: number;
  } | null>(null);

  const selectedCountry =
    countries.find((c) => c.slug === selectedSlug) ?? countries[0];

  function handleCalculate(e: React.FormEvent) {
    e.preventDefault();
    const annualSalary = parseFloat(salary);
    if (isNaN(annualSalary) || annualSalary < 0) return;

    const bracketsWithMax = selectedCountry.taxBrackets.map((b) => ({
      ...b,
      max: b.max ?? Infinity,
    }));

    const incomeTax = calculateTaxFromBrackets(
      annualSalary,
      bracketsWithMax,
      selectedCountry.personalAllowance
    );
    const ssBracketsWithMax = selectedCountry.socialSecurityBrackets.map((b) => ({
      ...b,
      max: b.max ?? Infinity,
    }));
    const socialSecurity = calculateSocialSecurity(annualSalary, ssBracketsWithMax);
    const net = annualSalary - incomeTax - socialSecurity;
    const taxRate = getMarginalRate(annualSalary, bracketsWithMax, selectedCountry.personalAllowance);

    setResults({
      gross: annualSalary,
      personalAllowance: Math.min(
        selectedCountry.personalAllowance,
        annualSalary
      ),
      incomeTax,
      socialSecurity,
      net,
      taxRate,
    });
  }

  const sym = selectedCountry.currencySymbol;
  const ssLabel = selectedCountry.socialSecurityLabel;

  return (
    <CalculatorCard>
      <form onSubmit={handleCalculate} className="space-y-4">
        <div>
          <label
            htmlFor="salary"
            className="mb-1 block text-sm font-medium text-foreground"
          >
            Annual Salary ({selectedCountry.currency})
          </label>
          <input
            id="salary"
            type="number"
            min="0"
            step="100"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full px-4 py-3 border border-card-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g. 50000"
            required
          />
        </div>

        {!defaultCountrySlug && (
          <div>
            <label
              htmlFor="country"
              className="mb-1 block text-sm font-medium text-foreground"
            >
              Country
            </label>
            <select
              id="country"
              value={selectedSlug}
              onChange={(e) => setSelectedSlug(e.target.value)}
              className="w-full px-4 py-3 border border-card-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            >
              {countries.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name} ({c.currency})
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-hover transition-colors"
        >
          Calculate Take-Home Pay
        </button>
      </form>

      {results && (
        <div className="mt-6 space-y-5">
          <h3 className="text-lg font-semibold text-foreground">
            Your Salary Breakdown
          </h3>

          {/* Annual summary */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">Gross Salary</p>
              <p className="text-xl font-bold text-foreground">
                {formatCurrency(results.gross, sym)}
              </p>
            </div>
            {results.personalAllowance > 0 && (
              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm text-muted-foreground">
                  Personal Allowance (Tax-Free)
                </p>
                <p className="text-xl font-bold text-foreground">
                  {formatCurrency(results.personalAllowance, sym)}
                </p>
              </div>
            )}
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">Income Tax</p>
              <p className="text-xl font-bold text-foreground">
                {formatCurrency(results.incomeTax, sym)}
              </p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">{ssLabel}</p>
              <p className="text-xl font-bold text-foreground">
                {formatCurrency(results.socialSecurity, sym)}
              </p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">
                Net Salary (Take-Home)
              </p>
              <p className="text-xl font-bold text-primary">
                {formatCurrency(results.net, sym)}
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-card-border p-4 text-center">
            <p className="text-sm text-muted-foreground">Tax Rate</p>
            <p className="text-2xl font-bold text-foreground">
              {formatPercent(results.taxRate)}
            </p>
          </div>

          {/* Period breakdown */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground uppercase tracking-wide">
              Take-Home Pay Breakdown
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="pb-2 font-medium text-muted-foreground">
                      Period
                    </th>
                    <th className="pb-2 text-right font-medium text-muted-foreground">
                      Gross
                    </th>
                    <th className="pb-2 text-right font-medium text-muted-foreground">
                      Tax
                    </th>
                    <th className="pb-2 text-right font-medium text-muted-foreground">
                      {ssLabel}
                    </th>
                    <th className="pb-2 text-right font-medium text-muted-foreground">
                      Net
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { label: "Annual", divisor: 1 },
                    { label: "Monthly", divisor: 12 },
                    { label: "Weekly", divisor: 52 },
                    { label: "Daily", divisor: 260 },
                    { label: "Hourly", divisor: 2080 },
                  ].map(({ label, divisor }) => (
                    <tr key={label} className="hover:bg-muted/50">
                      <td className="py-2.5 font-medium text-foreground">
                        {label}
                      </td>
                      <td className="py-2.5 text-right text-foreground">
                        {formatCurrency(results.gross / divisor, sym)}
                      </td>
                      <td className="py-2.5 text-right text-foreground">
                        {formatCurrency(results.incomeTax / divisor, sym)}
                      </td>
                      <td className="py-2.5 text-right text-foreground">
                        {formatCurrency(
                          results.socialSecurity / divisor,
                          sym
                        )}
                      </td>
                      <td className="py-2.5 text-right font-semibold text-primary">
                        {formatCurrency(results.net / divisor, sym)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </CalculatorCard>
  );
}
