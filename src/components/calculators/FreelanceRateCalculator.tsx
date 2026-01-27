"use client";

import { useState } from "react";
import { calculateFreelanceRate } from "@/lib/calculators";
import { formatCurrency } from "@/lib/formatting";

interface FreelanceRateCalculatorProps {
  defaultAnnualIncome?: number;
}

export default function FreelanceRateCalculator({
  defaultAnnualIncome,
}: FreelanceRateCalculatorProps) {
  const [annualIncome, setAnnualIncome] = useState<string>(
    defaultAnnualIncome ? String(defaultAnnualIncome) : "60000"
  );
  const [billableHours, setBillableHours] = useState<string>("30");
  const [weeksPerYear, setWeeksPerYear] = useState<string>("48");
  const [overhead, setOverhead] = useState<string>("20");
  const [results, setResults] = useState<{
    hourlyRate: number;
    dayRate: number;
    monthlyRevenue: number;
    annualRevenue: number;
  } | null>(null);

  function handleCalculate(e: React.FormEvent) {
    e.preventDefault();
    const income = parseFloat(annualIncome);
    const hours = parseFloat(billableHours);
    const weeks = parseFloat(weeksPerYear);
    const oh = parseFloat(overhead);

    if (isNaN(income) || isNaN(hours) || isNaN(weeks) || isNaN(oh)) return;
    if (income <= 0 || hours <= 0 || weeks <= 0 || oh < 0) return;

    const result = calculateFreelanceRate(income, hours, weeks, oh);
    setResults({
      hourlyRate: result.hourlyRate,
      dayRate: result.dayRate,
      monthlyRevenue: result.monthlyRevenue,
      annualRevenue: result.monthlyRevenue * 12,
    });
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-4">
        Freelance Rate Calculator
      </h2>
      <form onSubmit={handleCalculate} className="space-y-4">
        <div>
          <label htmlFor="annualIncome" className="block text-sm font-medium text-gray-700 mb-1">
            Desired Annual Income ($)
          </label>
          <input
            id="annualIncome"
            type="number"
            min="0"
            step="1000"
            value={annualIncome}
            onChange={(e) => setAnnualIncome(e.target.value)}
            className="w-full px-4 py-3 border border-card-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g. 60000"
            required
          />
        </div>

        <div>
          <label htmlFor="billableHours" className="block text-sm font-medium text-gray-700 mb-1">
            Billable Hours Per Week
          </label>
          <input
            id="billableHours"
            type="number"
            min="1"
            max="80"
            step="1"
            value={billableHours}
            onChange={(e) => setBillableHours(e.target.value)}
            className="w-full px-4 py-3 border border-card-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g. 30"
            required
          />
        </div>

        <div>
          <label htmlFor="weeksPerYear" className="block text-sm font-medium text-gray-700 mb-1">
            Working Weeks Per Year
          </label>
          <input
            id="weeksPerYear"
            type="number"
            min="1"
            max="52"
            step="1"
            value={weeksPerYear}
            onChange={(e) => setWeeksPerYear(e.target.value)}
            className="w-full px-4 py-3 border border-card-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g. 48"
            required
          />
        </div>

        <div>
          <label htmlFor="overhead" className="block text-sm font-medium text-gray-700 mb-1">
            Overhead Percentage (%)
          </label>
          <input
            id="overhead"
            type="number"
            min="0"
            max="100"
            step="1"
            value={overhead}
            onChange={(e) => setOverhead(e.target.value)}
            className="w-full px-4 py-3 border border-card-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g. 20"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-hover transition-colors"
        >
          Calculate Freelance Rate
        </button>
      </form>

      {results && (
        <div className="mt-6 space-y-3">
          <h3 className="text-lg font-semibold text-foreground">
            Your Recommended Rates
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">Hourly Rate</p>
              <p className="text-xl font-bold text-primary">
                {formatCurrency(results.hourlyRate)}
              </p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">Day Rate (8hr)</p>
              <p className="text-xl font-bold text-primary">
                {formatCurrency(results.dayRate)}
              </p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">Monthly Revenue Target</p>
              <p className="text-xl font-bold text-foreground">
                {formatCurrency(results.monthlyRevenue)}
              </p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">Effective Annual Revenue</p>
              <p className="text-xl font-bold text-foreground">
                {formatCurrency(results.annualRevenue)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
