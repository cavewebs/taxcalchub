"use client";

import { useState } from "react";
import { usStates } from "@/data/us-states";
import { calculateSalesTax } from "@/lib/calculators";
import { formatCurrency, formatPercent } from "@/lib/formatting";

interface SalesTaxCalculatorProps {
  defaultStateSlug?: string;
}

export default function SalesTaxCalculator({
  defaultStateSlug,
}: SalesTaxCalculatorProps) {
  const initialState =
    usStates.find((s) => s.slug === defaultStateSlug) ?? usStates[0];

  const [amount, setAmount] = useState<string>("100");
  const [selectedSlug, setSelectedSlug] = useState<string>(initialState.slug);
  const [includeLocal, setIncludeLocal] = useState<boolean>(true);
  const [results, setResults] = useState<{
    subtotal: number;
    stateTax: number;
    localTax: number;
    total: number;
  } | null>(null);

  const selectedState =
    usStates.find((s) => s.slug === selectedSlug) ?? usStates[0];

  function handleCalculate(e: React.FormEvent) {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount < 0) return;

    const localRate = includeLocal ? selectedState.avgLocalRate : 0;
    const result = calculateSalesTax(
      parsedAmount,
      selectedState.stateTaxRate,
      localRate
    );
    setResults(result);
  }

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-foreground">
        US Sales Tax Calculator
      </h2>
      <form onSubmit={handleCalculate} className="space-y-4">
        <div>
          <label
            htmlFor="sales-amount"
            className="mb-1 block text-sm font-medium text-foreground"
          >
            Purchase Amount ($)
          </label>
          <input
            id="sales-amount"
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 border border-card-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g. 100"
            required
          />
        </div>

        <div>
          <label
            htmlFor="sales-state"
            className="mb-1 block text-sm font-medium text-foreground"
          >
            State
          </label>
          <select
            id="sales-state"
            value={selectedSlug}
            onChange={(e) => setSelectedSlug(e.target.value)}
            className="w-full px-4 py-3 border border-card-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
          >
            {usStates.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name} ({s.abbreviation})
              </option>
            ))}
          </select>
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={includeLocal}
            onChange={(e) => setIncludeLocal(e.target.checked)}
            className="accent-primary w-4 h-4"
          />
          <span className="text-sm text-foreground">
            Include average local tax ({formatPercent(selectedState.avgLocalRate)})
          </span>
        </label>

        <button
          type="submit"
          className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-hover transition-colors"
        >
          Calculate Sales Tax
        </button>
      </form>

      {results && (
        <div className="mt-6 space-y-3">
          <h3 className="text-lg font-semibold text-foreground">
            Sales Tax Breakdown
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">Subtotal</p>
              <p className="text-xl font-bold text-foreground">
                {formatCurrency(results.subtotal)}
              </p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">
                State Tax ({formatPercent(selectedState.stateTaxRate)})
              </p>
              <p className="text-xl font-bold text-foreground">
                {formatCurrency(results.stateTax)}
              </p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">
                Local Tax ({formatPercent(includeLocal ? selectedState.avgLocalRate : 0)})
              </p>
              <p className="text-xl font-bold text-foreground">
                {formatCurrency(results.localTax)}
              </p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-xl font-bold text-primary">
                {formatCurrency(results.total)}
              </p>
            </div>
          </div>
          <div className="rounded-lg border border-card-border p-4 text-center">
            <p className="text-sm text-muted-foreground">Combined Tax Rate</p>
            <p className="text-2xl font-bold text-foreground">
              {formatPercent(
                selectedState.stateTaxRate +
                  (includeLocal ? selectedState.avgLocalRate : 0)
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
