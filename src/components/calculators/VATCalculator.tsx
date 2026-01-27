"use client";

import { useState } from "react";
import { calculateVAT } from "@/lib/calculators";
import { formatCurrency, formatPercent } from "@/lib/formatting";

interface VATCalculatorProps {
  defaultRate?: number;
  currencySymbol?: string;
}

export default function VATCalculator({
  defaultRate = 20,
  currencySymbol = "$",
}: VATCalculatorProps) {
  const [amount, setAmount] = useState<string>("1000");
  const [rate, setRate] = useState<string>(String(defaultRate));
  const [calcType, setCalcType] = useState<"add" | "remove">("add");
  const [results, setResults] = useState<{
    net: number;
    vat: number;
    gross: number;
  } | null>(null);

  function handleCalculate(e: React.FormEvent) {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    const parsedRate = parseFloat(rate);
    if (isNaN(parsedAmount) || parsedAmount < 0) return;
    if (isNaN(parsedRate) || parsedRate < 0) return;

    const inclusive = calcType === "remove";
    const result = calculateVAT(parsedAmount, parsedRate, inclusive);
    setResults(result);
  }

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-foreground">
        VAT Calculator
      </h2>
      <form onSubmit={handleCalculate} className="space-y-4">
        <div>
          <label
            htmlFor="vat-amount"
            className="mb-1 block text-sm font-medium text-foreground"
          >
            Amount
          </label>
          <input
            id="vat-amount"
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 border border-card-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g. 1000"
            required
          />
        </div>

        <div>
          <label
            htmlFor="vat-rate"
            className="mb-1 block text-sm font-medium text-foreground"
          >
            VAT Rate (%)
          </label>
          <input
            id="vat-rate"
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="w-full px-4 py-3 border border-card-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g. 20"
            required
          />
        </div>

        <fieldset>
          <legend className="mb-2 text-sm font-medium text-foreground">
            Calculation Type
          </legend>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="calc-type"
                value="add"
                checked={calcType === "add"}
                onChange={() => setCalcType("add")}
                className="accent-primary"
              />
              <span className="text-sm text-foreground">Add VAT</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="calc-type"
                value="remove"
                checked={calcType === "remove"}
                onChange={() => setCalcType("remove")}
                className="accent-primary"
              />
              <span className="text-sm text-foreground">Remove VAT</span>
            </label>
          </div>
        </fieldset>

        <button
          type="submit"
          className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-hover transition-colors"
        >
          Calculate VAT
        </button>
      </form>

      {results && (
        <div className="mt-6 space-y-3">
          <h3 className="text-lg font-semibold text-foreground">
            VAT Breakdown
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">Net Amount</p>
              <p className="text-xl font-bold text-foreground">
                {formatCurrency(results.net, currencySymbol)}
              </p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">
                VAT ({formatPercent(parseFloat(rate) || 0)})
              </p>
              <p className="text-xl font-bold text-foreground">
                {formatCurrency(results.vat, currencySymbol)}
              </p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">Gross Amount</p>
              <p className="text-xl font-bold text-primary">
                {formatCurrency(results.gross, currencySymbol)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
