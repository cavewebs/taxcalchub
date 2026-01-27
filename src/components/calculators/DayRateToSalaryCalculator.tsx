"use client";

import { useState } from "react";
import { dayRateToAnnual, annualToDayRate } from "@/lib/calculators";
import { formatCurrency } from "@/lib/formatting";

export default function DayRateToSalaryCalculator() {
  const [dayRate, setDayRate] = useState<string>("500");
  const [daysPerWeek, setDaysPerWeek] = useState<string>("5");
  const [weeksPerYear, setWeeksPerYear] = useState<string>("48");
  const [results, setResults] = useState<{
    annualSalary: number;
    monthlySalary: number;
    weeklySalary: number;
    reverseDayRate: number;
  } | null>(null);

  function handleCalculate(e: React.FormEvent) {
    e.preventDefault();
    const rate = parseFloat(dayRate);
    const days = parseFloat(daysPerWeek);
    const weeks = parseFloat(weeksPerYear);

    if (isNaN(rate) || isNaN(days) || isNaN(weeks)) return;
    if (rate <= 0 || days <= 0 || weeks <= 0) return;

    const annual = dayRateToAnnual(rate, days, weeks);
    const monthly = annual / 12;
    const weekly = rate * days;
    const reverseDay = annualToDayRate(annual, days, weeks);

    setResults({
      annualSalary: annual,
      monthlySalary: monthly,
      weeklySalary: weekly,
      reverseDayRate: reverseDay,
    });
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-4">
        Day Rate to Salary Calculator
      </h2>
      <form onSubmit={handleCalculate} className="space-y-4">
        <div>
          <label htmlFor="dayRate" className="block text-sm font-medium text-gray-700 mb-1">
            Day Rate ($)
          </label>
          <input
            id="dayRate"
            type="number"
            min="0"
            step="10"
            value={dayRate}
            onChange={(e) => setDayRate(e.target.value)}
            className="w-full px-4 py-3 border border-card-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g. 500"
            required
          />
        </div>

        <div>
          <label htmlFor="daysPerWeek" className="block text-sm font-medium text-gray-700 mb-1">
            Working Days Per Week
          </label>
          <input
            id="daysPerWeek"
            type="number"
            min="1"
            max="7"
            step="1"
            value={daysPerWeek}
            onChange={(e) => setDaysPerWeek(e.target.value)}
            className="w-full px-4 py-3 border border-card-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g. 5"
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

        <button
          type="submit"
          className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-hover transition-colors"
        >
          Convert Day Rate
        </button>
      </form>

      {results && (
        <div className="mt-6 space-y-3">
          <h3 className="text-lg font-semibold text-foreground">
            Salary Equivalent
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">Annual Salary</p>
              <p className="text-xl font-bold text-primary">
                {formatCurrency(results.annualSalary)}
              </p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">Monthly Salary</p>
              <p className="text-xl font-bold text-foreground">
                {formatCurrency(results.monthlySalary)}
              </p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">Weekly Salary</p>
              <p className="text-xl font-bold text-foreground">
                {formatCurrency(results.weeklySalary)}
              </p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">Verified Day Rate</p>
              <p className="text-xl font-bold text-foreground">
                {formatCurrency(results.reverseDayRate)}
              </p>
            </div>
          </div>
          <div className="rounded-lg border border-card-border p-4 text-center">
            <p className="text-sm text-muted-foreground">
              A {formatCurrency(parseFloat(dayRate))} day rate equals a {formatCurrency(results.annualSalary)} annual salary
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
